from __future__ import annotations

from typing import Any, Optional

from brain.api.container import Container
from brain.core.context import RequestContext


def get_audit(
    ctx: RequestContext,
    container: Container,
    *,
    action: Optional[str] = None,
    actor_id: Optional[str] = None,
) -> dict[str, Any]:
    events = container.audit.query(ctx, action=action, actor_id=actor_id)
    return {
        "tenant_id": ctx.tenant_id,
        "events": [e.to_dict() for e in events],
    }
