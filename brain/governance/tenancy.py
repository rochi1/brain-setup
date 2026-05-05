"""Tenant boundary enforcement helpers."""
from __future__ import annotations

from brain.core.context import RequestContext


class CrossTenantError(PermissionError):
    pass


def enforce_tenant(ctx: RequestContext, resource_tenant_id: str) -> None:
    if not ctx.tenant_id:
        raise PermissionError("tenant_id required on context")
    if ctx.tenant_id != resource_tenant_id:
        raise CrossTenantError(
            f"actor in tenant {ctx.tenant_id} cannot access resource in {resource_tenant_id}"
        )
