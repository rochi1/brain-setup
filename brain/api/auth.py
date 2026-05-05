"""API authentication.

In Phase 1 we accept a tenant + actor header pair. Phase 2 swaps this for
real OIDC + service-account tokens. The route handlers don't care which —
they receive a RequestContext.
"""
from __future__ import annotations

import uuid
from typing import Optional

from brain.core.context import Actor, RequestContext


class AuthError(Exception):
    pass


def context_from_headers(headers: dict[str, str]) -> RequestContext:
    tenant_id = headers.get("x-tenant-id") or headers.get("X-Tenant-Id")
    actor_id = headers.get("x-actor-id") or headers.get("X-Actor-Id")
    actor_type = headers.get("x-actor-type") or headers.get("X-Actor-Type") or "user"
    purpose = headers.get("x-purpose") or headers.get("X-Purpose")
    request_id = headers.get("x-request-id") or headers.get("X-Request-Id") or str(uuid.uuid4())
    trace_id: Optional[str] = headers.get("traceparent")

    if not tenant_id or not actor_id:
        raise AuthError("X-Tenant-Id and X-Actor-Id are required")
    if actor_type not in ("user", "agent", "connector", "system"):
        raise AuthError("X-Actor-Type must be user|agent|connector|system")

    return RequestContext(
        tenant_id=tenant_id,
        actor=Actor(type=actor_type, id=actor_id),
        request_id=request_id,
        trace_id=trace_id,
        purpose=purpose,
    )
