"""Graphiti wrapper — temporal facts with validity intervals.

Used for time-aware questions (point-in-time, history, supersession).
The contract is intentionally narrow so the real Graphiti SDK or a Neo4j
driver can be swapped in without touching the API or agent layer.
"""
from __future__ import annotations

import logging
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Optional, Protocol

from brain.core.context import RequestContext

log = logging.getLogger(__name__)


@dataclass
class TemporalFact:
    id: str
    tenant_id: str
    subject_type: str
    subject_id: str
    predicate: str
    object: Any
    valid_from: datetime
    valid_to: Optional[datetime] = None
    recorded_by: Optional[str] = None
    recorded_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    metadata: dict[str, Any] = field(default_factory=dict)


class GraphitiBackend(Protocol):
    def add_fact(self, fact: TemporalFact) -> None: ...
    def query(
        self,
        tenant_id: str,
        subject_id: Optional[str],
        predicate: Optional[str],
        as_of: Optional[datetime],
        limit: int,
    ) -> list[TemporalFact]: ...
    def close_fact(self, tenant_id: str, fact_id: str, valid_to: datetime) -> None: ...


class InMemoryGraphitiBackend:
    def __init__(self) -> None:
        self._facts: list[TemporalFact] = []

    def add_fact(self, fact: TemporalFact) -> None:
        self._facts.append(fact)

    def query(
        self,
        tenant_id: str,
        subject_id: Optional[str],
        predicate: Optional[str],
        as_of: Optional[datetime],
        limit: int,
    ) -> list[TemporalFact]:
        out: list[TemporalFact] = []
        for f in self._facts:
            if f.tenant_id != tenant_id:
                continue
            if subject_id and f.subject_id != subject_id:
                continue
            if predicate and f.predicate != predicate:
                continue
            if as_of is not None:
                if f.valid_from > as_of:
                    continue
                if f.valid_to is not None and f.valid_to < as_of:
                    continue
            out.append(f)
            if len(out) >= limit:
                break
        return out

    def close_fact(self, tenant_id: str, fact_id: str, valid_to: datetime) -> None:
        for f in self._facts:
            if f.tenant_id == tenant_id and f.id == fact_id and f.valid_to is None:
                self._facts.remove(f)
                self._facts.append(TemporalFact(
                    id=f.id,
                    tenant_id=f.tenant_id,
                    subject_type=f.subject_type,
                    subject_id=f.subject_id,
                    predicate=f.predicate,
                    object=f.object,
                    valid_from=f.valid_from,
                    valid_to=valid_to,
                    recorded_by=f.recorded_by,
                    recorded_at=f.recorded_at,
                    metadata=f.metadata,
                ))
                return


class GraphitiClient:
    def __init__(self, backend: Optional[GraphitiBackend] = None) -> None:
        self._backend: GraphitiBackend = backend or InMemoryGraphitiBackend()

    def add_fact(self, ctx: RequestContext, fact: TemporalFact) -> None:
        if fact.tenant_id != ctx.tenant_id:
            raise PermissionError("fact tenant_id mismatch")
        self._backend.add_fact(fact)
        log.info("graphiti_add_fact", extra={
            "event": "graphiti_add_fact",
            "tenant_id": ctx.tenant_id,
            "actor_id": ctx.actor.id,
        })

    def query(
        self,
        ctx: RequestContext,
        *,
        subject_id: Optional[str] = None,
        predicate: Optional[str] = None,
        as_of: Optional[datetime] = None,
        limit: int = 100,
    ) -> list[TemporalFact]:
        if not ctx.tenant_id:
            raise PermissionError("tenant_id required")
        return self._backend.query(ctx.tenant_id, subject_id, predicate, as_of, limit)

    def close_fact(self, ctx: RequestContext, fact_id: str, valid_to: datetime) -> None:
        self._backend.close_fact(ctx.tenant_id, fact_id, valid_to)
