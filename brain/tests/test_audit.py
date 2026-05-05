"""Audit log tests — append-only, hash-chained."""
from __future__ import annotations

import uuid

from brain.audit.log import AuditLog
from brain.core.context import Actor, RequestContext


def _ctx(tenant: str = "tenant-A") -> RequestContext:
    return RequestContext(
        tenant_id=tenant, actor=Actor(type="user", id="user-1"),
        request_id=str(uuid.uuid4()),
    )


def test_audit_chain_links_events():
    log = AuditLog()
    ctx = _ctx()
    e1 = log.write(ctx, action="search", scope={"q": "x"})
    e2 = log.write(ctx, action="search", scope={"q": "y"})
    assert e1.prev_hash is None
    assert e2.prev_hash == e1.self_hash


def test_audit_isolated_per_tenant():
    log = AuditLog()
    log.write(_ctx("A"), action="search")
    log.write(_ctx("B"), action="search")
    assert len(log.query(_ctx("A"))) == 1
    assert len(log.query(_ctx("B"))) == 1


def test_audit_filter_by_action():
    log = AuditLog()
    ctx = _ctx()
    log.write(ctx, action="search")
    log.write(ctx, action="ingest")
    assert len(log.query(ctx, action="search")) == 1
    assert len(log.query(ctx, action="ingest")) == 1
