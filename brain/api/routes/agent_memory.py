from __future__ import annotations

from typing import Any, Optional

from brain.api.container import Container
from brain.core.context import RequestContext


def get_agent_memory(
    ctx: RequestContext,
    container: Container,
    *,
    agent_id: str,
    limit: int = 100,
) -> dict[str, Any]:
    items = container.mem0.list_for_owner(ctx, owner_id=agent_id, limit=limit)
    container.audit.write(
        ctx,
        action="read",
        scope={"agent_id": agent_id, "kind": "agent_memory"},
        result={"items": len(items)},
    )
    return {
        "agent_id": agent_id,
        "items": [
            {"id": m.id, "text": m.text, "metadata": m.metadata,
             "created_at": m.created_at.isoformat()}
            for m in items
        ],
    }


def post_agent_memory(
    ctx: RequestContext,
    container: Container,
    *,
    agent_id: str,
    text: str,
    metadata: Optional[dict[str, Any]] = None,
) -> dict[str, Any]:
    item = container.mem0.add(
        ctx, owner_id=agent_id, owner_type="agent",
        text=text, metadata=metadata,
    )
    container.audit.write(
        ctx,
        action="write",
        scope={"agent_id": agent_id, "kind": "agent_memory"},
        result={"item_id": item.id},
    )
    return {"id": item.id}
