"""Append-only audit log.

Every read and write that touches business data emits one event. Events are
chained by hash so tampering is detectable.

In production this writes to Postgres with a trigger blocking UPDATE/DELETE.
For local/dev we use an in-memory list with the same chaining behaviour.
"""
from __future__ import annotations

import hashlib
import json
import threading
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Optional, Protocol

from brain.core.context import RequestContext


@dataclass(frozen=True)
class AuditEvent:
    audit_id: str
    ts: datetime
    tenant_id: str
    actor_type: str
    actor_id: str
    action: str
    scope: dict[str, Any]
    purpose: Optional[str]
    request_hash: str
    result: dict[str, Any]
    prev_hash: Optional[str]
    self_hash: str

    def to_dict(self) -> dict[str, Any]:
        return {
            "audit_id": self.audit_id,
            "ts": self.ts.isoformat(),
            "tenant_id": self.tenant_id,
            "actor": {"type": self.actor_type, "id": self.actor_id},
            "action": self.action,
            "scope": self.scope,
            "purpose": self.purpose,
            "request_hash": self.request_hash,
            "result": self.result,
            "prev_hash": self.prev_hash,
            "self_hash": self.self_hash,
        }


class AuditSink(Protocol):
    def append(self, event: AuditEvent) -> None: ...
    def latest_hash(self, tenant_id: str) -> Optional[str]: ...
    def query(self, tenant_id: str, **filters: Any) -> list[AuditEvent]: ...


class InMemoryAuditSink:
    def __init__(self) -> None:
        self._events: list[AuditEvent] = []
        self._lock = threading.Lock()

    def append(self, event: AuditEvent) -> None:
        with self._lock:
            self._events.append(event)

    def latest_hash(self, tenant_id: str) -> Optional[str]:
        with self._lock:
            for e in reversed(self._events):
                if e.tenant_id == tenant_id:
                    return e.self_hash
        return None

    def query(self, tenant_id: str, **filters: Any) -> list[AuditEvent]:
        with self._lock:
            out = [e for e in self._events if e.tenant_id == tenant_id]
        for k, v in filters.items():
            if v is None:
                continue
            if k == "action":
                out = [e for e in out if e.action == v]
            elif k == "actor_id":
                out = [e for e in out if e.actor_id == v]
        return out


def _hash_request(payload: Any) -> str:
    blob = json.dumps(payload, sort_keys=True, default=str).encode()
    return hashlib.sha256(blob).hexdigest()


def _self_hash(prev_hash: Optional[str], event_payload: dict[str, Any]) -> str:
    blob = (prev_hash or "") + json.dumps(event_payload, sort_keys=True, default=str)
    return hashlib.sha256(blob.encode()).hexdigest()


@dataclass
class AuditLog:
    sink: AuditSink = field(default_factory=InMemoryAuditSink)

    def write(
        self,
        ctx: RequestContext,
        *,
        action: str,
        scope: Optional[dict[str, Any]] = None,
        result: Optional[dict[str, Any]] = None,
        request_payload: Any = None,
    ) -> AuditEvent:
        prev = self.sink.latest_hash(ctx.tenant_id)
        ts = datetime.now(timezone.utc)
        scope = scope or {}
        result = result or {}
        request_hash = _hash_request(request_payload if request_payload is not None
                                     else {"action": action, "scope": scope})
        body = {
            "audit_id": str(uuid.uuid4()),
            "ts": ts.isoformat(),
            "tenant_id": ctx.tenant_id,
            "actor_type": ctx.actor.type,
            "actor_id": ctx.actor.id,
            "action": action,
            "scope": scope,
            "purpose": ctx.purpose,
            "request_hash": request_hash,
            "result": result,
        }
        h = _self_hash(prev, body)
        event = AuditEvent(
            audit_id=body["audit_id"],
            ts=ts,
            tenant_id=ctx.tenant_id,
            actor_type=ctx.actor.type,
            actor_id=ctx.actor.id,
            action=action,
            scope=scope,
            purpose=ctx.purpose,
            request_hash=request_hash,
            result=result,
            prev_hash=prev,
            self_hash=h,
        )
        self.sink.append(event)
        return event

    def query(self, ctx: RequestContext, **filters: Any) -> list[AuditEvent]:
        if not ctx.tenant_id:
            raise PermissionError("tenant_id required")
        return self.sink.query(ctx.tenant_id, **filters)
