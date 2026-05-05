"""Cognee wrapper.

Cognee is the company brain — hybrid graph + vector. This wrapper enforces
tenant scoping on every call and raises if a caller forgets to pass tenant_id.

The implementation uses a thin protocol so the real Cognee SDK can be plugged
in without touching the rest of the codebase. The default in-memory backend
is for local dev and tests only.
"""
from __future__ import annotations

import hashlib
import logging
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Optional, Protocol

from brain.core.context import RequestContext
from brain.ontology.provenance import Provenance

log = logging.getLogger(__name__)


@dataclass
class CogneeDocument:
    id: str
    tenant_id: str
    text: str
    metadata: dict[str, Any]
    provenance: Provenance
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))


@dataclass
class CogneeHit:
    document_id: str
    score: float
    snippet: str
    metadata: dict[str, Any]
    provenance: Provenance


class CogneeBackend(Protocol):
    def add(self, doc: CogneeDocument) -> None: ...
    def search(self, tenant_id: str, query: str, limit: int) -> list[CogneeHit]: ...
    def delete(self, tenant_id: str, document_id: str) -> None: ...
    def get(self, tenant_id: str, document_id: str) -> Optional[CogneeDocument]: ...


class InMemoryCogneeBackend:
    """Local-only backend for tests and `docker-compose up` smoke runs.

    Keyword search + simple containment scoring. Replace with the real Cognee
    SDK in pilot+.
    """

    def __init__(self) -> None:
        self._docs: dict[tuple[str, str], CogneeDocument] = {}

    def add(self, doc: CogneeDocument) -> None:
        self._docs[(doc.tenant_id, doc.id)] = doc

    def search(self, tenant_id: str, query: str, limit: int) -> list[CogneeHit]:
        q = query.lower().strip()
        if not q:
            return []
        scored: list[CogneeHit] = []
        for (tid, _), doc in self._docs.items():
            if tid != tenant_id:
                continue
            text = doc.text.lower()
            if q not in text:
                continue
            count = text.count(q)
            score = min(1.0, count / 10.0)
            idx = text.find(q)
            snippet = doc.text[max(0, idx - 80): idx + 120]
            scored.append(CogneeHit(
                document_id=doc.id,
                score=score,
                snippet=snippet,
                metadata=doc.metadata,
                provenance=doc.provenance,
            ))
        scored.sort(key=lambda h: h.score, reverse=True)
        return scored[:limit]

    def delete(self, tenant_id: str, document_id: str) -> None:
        self._docs.pop((tenant_id, document_id), None)

    def get(self, tenant_id: str, document_id: str) -> Optional[CogneeDocument]:
        return self._docs.get((tenant_id, document_id))


class CogneeClient:
    """Tenant-scoped wrapper.

    Every call requires a RequestContext. There is no path that bypasses tenancy.
    """

    def __init__(self, backend: Optional[CogneeBackend] = None) -> None:
        self._backend: CogneeBackend = backend or InMemoryCogneeBackend()

    def add(self, ctx: RequestContext, *, document_id: str, text: str,
            metadata: dict[str, Any], provenance: Provenance) -> None:
        self._require_tenant(ctx, provenance)
        doc = CogneeDocument(
            id=document_id,
            tenant_id=ctx.tenant_id,
            text=text,
            metadata=metadata,
            provenance=provenance,
        )
        self._backend.add(doc)
        log.info("cognee_add", extra={
            "event": "cognee_add",
            "tenant_id": ctx.tenant_id,
            "actor_id": ctx.actor.id,
        })

    def search(self, ctx: RequestContext, *, query: str, limit: int = 10) -> list[CogneeHit]:
        if not ctx.tenant_id:
            raise PermissionError("tenant_id required for search")
        hits = self._backend.search(ctx.tenant_id, query, limit)
        log.info("cognee_search", extra={
            "event": "cognee_search",
            "tenant_id": ctx.tenant_id,
            "actor_id": ctx.actor.id,
        })
        return hits

    def delete(self, ctx: RequestContext, *, document_id: str) -> None:
        self._backend.delete(ctx.tenant_id, document_id)

    def get(self, ctx: RequestContext, *, document_id: str) -> Optional[CogneeDocument]:
        return self._backend.get(ctx.tenant_id, document_id)

    @staticmethod
    def _require_tenant(ctx: RequestContext, provenance: Provenance) -> None:
        if not ctx.tenant_id:
            raise PermissionError("tenant_id required")
        if provenance.tenant_id != ctx.tenant_id:
            raise PermissionError("provenance tenant_id mismatch")


def stable_doc_id(source_uri: str, source_hash: str) -> str:
    return hashlib.sha256(f"{source_uri}::{source_hash}".encode()).hexdigest()
