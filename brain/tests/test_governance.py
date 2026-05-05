"""Permission and tenancy enforcement tests."""
from __future__ import annotations

import uuid

import pytest

from brain.core.context import Actor, RequestContext
from brain.governance.roles import has_permission
from brain.governance.tenancy import CrossTenantError, enforce_tenant


def test_default_deny_unknown_role():
    assert has_permission("nope", "read", "*") is False


def test_reader_can_read_not_write():
    assert has_permission("reader", "read", "*") is True
    assert has_permission("reader", "write", "rfi") is False


def test_tenant_admin_full_within_tenant():
    assert has_permission("tenant_admin", "read", "*")
    assert has_permission("tenant_admin", "write", "*")
    assert has_permission("tenant_admin", "admin", "users")


def test_enforce_tenant_blocks_cross_tenant():
    ctx = RequestContext(
        tenant_id="A", actor=Actor(type="user", id="u"), request_id=str(uuid.uuid4()),
    )
    enforce_tenant(ctx, "A")
    with pytest.raises(CrossTenantError):
        enforce_tenant(ctx, "B")
