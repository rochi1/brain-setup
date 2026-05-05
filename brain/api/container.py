"""Tiny dependency container.

Constructs the brain's components once and hands them to API routes and the
CLI. Intentionally simple — no DI framework, no magic. Replace with whatever
you prefer if it grows.
"""
from __future__ import annotations

from dataclasses import dataclass

from brain.audit.log import AuditLog
from brain.graph.cognee_client import CogneeClient
from brain.graph.graphiti_client import GraphitiClient
from brain.graph.hybrid import HybridSearch
from brain.memory.mem0_client import Mem0Client


@dataclass
class Container:
    cognee: CogneeClient
    graphiti: GraphitiClient
    mem0: Mem0Client
    audit: AuditLog
    hybrid: HybridSearch


def build_default_container() -> Container:
    cognee = CogneeClient()
    graphiti = GraphitiClient()
    mem0 = Mem0Client()
    audit = AuditLog()
    hybrid = HybridSearch(cognee=cognee, graphiti=graphiti, mem0=mem0)
    return Container(cognee=cognee, graphiti=graphiti, mem0=mem0, audit=audit, hybrid=hybrid)
