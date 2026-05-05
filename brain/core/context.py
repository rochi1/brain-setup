"""Per-request context.

Carried through the call stack so every service call sees the same tenant,
actor, request, and trace identifiers. Never pulled from globals.
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class Actor:
    type: str  # 'user' | 'agent' | 'connector' | 'system'
    id: str
    subject: Optional[str] = None


@dataclass(frozen=True)
class RequestContext:
    tenant_id: str
    actor: Actor
    request_id: str
    trace_id: Optional[str] = None
    purpose: Optional[str] = None

    def with_purpose(self, purpose: str) -> "RequestContext":
        return RequestContext(
            tenant_id=self.tenant_id,
            actor=self.actor,
            request_id=self.request_id,
            trace_id=self.trace_id,
            purpose=purpose,
        )
