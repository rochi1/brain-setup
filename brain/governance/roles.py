"""Roles and permission checks.

Default deny. Permissions are tuples of (action, resource).
"""
from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class Role:
    name: str
    permissions: frozenset[tuple[str, str]] = field(default_factory=frozenset)


def _perms(*pairs: tuple[str, str]) -> frozenset[tuple[str, str]]:
    return frozenset(pairs)


ROLES: dict[str, Role] = {
    "tenant_admin": Role("tenant_admin", _perms(
        ("read", "*"), ("write", "*"),
        ("admin", "users"), ("admin", "roles"), ("admin", "connectors"),
        ("read", "audit"),
    )),
    "project_lead": Role("project_lead", _perms(
        ("read", "*"), ("write", "project"), ("write", "rfi"),
        ("write", "variation"), ("write", "decision"), ("write", "risk"),
        ("write", "claim"), ("write", "meeting"), ("write", "task"),
    )),
    "contributor": Role("contributor", _perms(
        ("read", "*"), ("write", "rfi"), ("write", "task"),
    )),
    "reader": Role("reader", _perms(
        ("read", "*"),
    )),
    "auditor": Role("auditor", _perms(
        ("read", "audit"),
    )),
    "agent_tenders": Role("agent_tenders", _perms(
        ("read", "*"), ("write", "tender"),
    )),
    "agent_contracts": Role("agent_contracts", _perms(
        ("read", "*"), ("write", "contract"), ("write", "variation"),
    )),
    "agent_finance": Role("agent_finance", _perms(
        ("read", "*"), ("write", "claim"),
    )),
    "agent_design": Role("agent_design", _perms(
        ("read", "*"), ("write", "drawing"), ("write", "rfi"),
    )),
    "agent_site": Role("agent_site", _perms(
        ("read", "*"), ("write", "meeting"), ("write", "decision"),
        ("write", "risk"), ("write", "task"),
    )),
    "agent_procurement": Role("agent_procurement", _perms(
        ("read", "*"), ("write", "subcontractor"),
    )),
    "agent_hr": Role("agent_hr", _perms(
        ("read", "*"), ("write", "contact"),
    )),
    "agent_boq": Role("agent_boq", _perms(
        ("read", "*"),
    )),
    "connector_runner": Role("connector_runner", _perms(
        ("write", "document"), ("write", "provenance"),
    )),
    "platform_admin": Role("platform_admin", _perms(
        ("admin", "platform"),
    )),
}


def has_permission(role_name: str, action: str, resource: str) -> bool:
    role = ROLES.get(role_name)
    if role is None:
        return False
    if (action, "*") in role.permissions:
        return True
    if (action, resource) in role.permissions:
        return True
    return False
