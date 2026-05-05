"""Mem0 -> Cognee/Graphiti promotion tests."""
from __future__ import annotations

import uuid

import pytest

from brain.api.container import build_default_container
from brain.core.context import Actor, RequestContext
from brain.memory.promotion import PromotionError, promote


def _ctx() -> RequestContext:
    return RequestContext(
        tenant_id="tenant-A",
        actor=Actor(type="user", id="user-1"),
        request_id=str(uuid.uuid4()),
    )


def test_promote_to_cognee_creates_audit_event():
    c = build_default_container()
    ctx = _ctx()
    item = c.mem0.add(ctx, owner_id="user-1", owner_type="user",
                       text="Site team B handled RFI 247 on 2025-09-21")

    promote(
        ctx,
        mem0_item_id=item.id,
        target="cognee",
        source_uri="email://msg/abc",
        source_hash="abc123",
        confidence=0.9,
        extractor_version="manual@1",
        cognee=c.cognee, graphiti=c.graphiti, mem0=c.mem0, audit=c.audit,
    )

    audit_actions = [e.action for e in c.audit.query(ctx)]
    assert "promote" in audit_actions
    assert c.cognee.search(ctx, query="RFI 247"), "expected promoted text searchable"


def test_promote_to_graphiti_requires_fact_fields():
    c = build_default_container()
    ctx = _ctx()
    item = c.mem0.add(ctx, owner_id="user-1", owner_type="user", text="x")
    with pytest.raises(PromotionError):
        promote(
            ctx,
            mem0_item_id=item.id,
            target="graphiti",
            source_uri="x", source_hash="x",
            confidence=0.5, extractor_version="x",
            cognee=c.cognee, graphiti=c.graphiti, mem0=c.mem0, audit=c.audit,
        )
