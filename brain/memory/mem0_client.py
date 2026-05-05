"""Mem0 wrapper — personal / agent memory.

NOT the company brain. Holds preferences, scratchpads, conversation continuity.
Cross-tenant access is forbidden. Promoting a Mem0 fact into Cognee/Graphiti
must go through `brain.memory.promotion.promote()`, never silently.
"""
from __future__ import annotations

import logging
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Optional, Protocol

from brain.core.context import RequestContext

log = logging.getLogger(__name__)


@dataclass
class Mem0Item:
    id: str
    tenant_id: str
    owner_id: str  # user id or agent id
    owner_type: str  # 'user' | 'agent'
    text: str
    metadata: dict[str, Any] = field(default_factory=dict)
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))


class Mem0Backend(Protocol):
    def add(self, item: Mem0Item) -> None: ...
    def search(self, tenant_id: str, owner_id: Optional[str], query: str, limit: int) -> list[Mem0Item]: ...
    def list_for_owner(self, tenant_id: str, owner_id: str, limit: int) -> list[Mem0Item]: ...
    def delete(self, tenant_id: str, item_id: str) -> None: ...


class InMemoryMem0Backend:
    def __init__(self) -> None:
        self._items: dict[tuple[str, str], Mem0Item] = {}

    def add(self, item: Mem0Item) -> None:
        self._items[(item.tenant_id, item.id)] = item

    def search(self, tenant_id: str, owner_id: Optional[str], query: str, limit: int) -> list[Mem0Item]:
        q = query.lower()
        out: list[Mem0Item] = []
        for (tid, _), it in self._items.items():
            if tid != tenant_id:
                continue
            if owner_id and it.owner_id != owner_id:
                continue
            if q and q not in it.text.lower():
                continue
            out.append(it)
            if len(out) >= limit:
                break
        return out

    def list_for_owner(self, tenant_id: str, owner_id: str, limit: int) -> list[Mem0Item]:
        out = [it for (tid, _), it in self._items.items()
               if tid == tenant_id and it.owner_id == owner_id]
        return out[:limit]

    def delete(self, tenant_id: str, item_id: str) -> None:
        self._items.pop((tenant_id, item_id), None)


class Mem0Client:
    def __init__(self, backend: Optional[Mem0Backend] = None) -> None:
        self._backend: Mem0Backend = backend or InMemoryMem0Backend()

    def add(self, ctx: RequestContext, *, owner_id: str, owner_type: str,
            text: str, metadata: Optional[dict[str, Any]] = None,
            item_id: Optional[str] = None) -> Mem0Item:
        if owner_type not in ("user", "agent"):
            raise ValueError("owner_type must be 'user' or 'agent'")
        item = Mem0Item(
            id=item_id or f"{ctx.tenant_id}:{owner_id}:{datetime.now(timezone.utc).timestamp()}",
            tenant_id=ctx.tenant_id,
            owner_id=owner_id,
            owner_type=owner_type,
            text=text,
            metadata=metadata or {},
        )
        self._backend.add(item)
        log.info("mem0_add", extra={
            "event": "mem0_add",
            "tenant_id": ctx.tenant_id,
            "actor_id": ctx.actor.id,
        })
        return item

    def search(self, ctx: RequestContext, *, query: str, owner_id: Optional[str] = None,
               limit: int = 10) -> list[Mem0Item]:
        if not ctx.tenant_id:
            raise PermissionError("tenant_id required")
        # Default: search the caller's own memory unless an owner is given.
        target_owner = owner_id or ctx.actor.id
        return self._backend.search(ctx.tenant_id, target_owner, query, limit)

    def list_for_owner(self, ctx: RequestContext, *, owner_id: str, limit: int = 100) -> list[Mem0Item]:
        return self._backend.list_for_owner(ctx.tenant_id, owner_id, limit)

    def delete(self, ctx: RequestContext, *, item_id: str) -> None:
        self._backend.delete(ctx.tenant_id, item_id)
