"""Connector contract.

Every connector implements this interface:

  pull(ctx, config) -> Iterator[ConnectorItem]

The framework handles idempotency, audit, and ingestion. Connectors do one job:
fetch from a source and yield normalised items with provenance.
"""
from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Iterator, Optional

from brain.core.context import RequestContext
from brain.ontology.provenance import Provenance


@dataclass
class ConnectorItem:
    entity_type: str  # 'Document', 'RFI', 'Variation', ...
    external_id: str
    text: str
    metadata: dict[str, Any]
    provenance: Provenance


@dataclass
class ConnectorRun:
    id: str
    tenant_id: str
    connector: str
    started_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    finished_at: Optional[datetime] = None
    items_seen: int = 0
    items_ingested: int = 0
    items_skipped: int = 0
    items_failed: int = 0
    status: str = "running"
    error_summary: Optional[str] = None


class Connector(ABC):
    name: str = "base"

    @abstractmethod
    def pull(self, ctx: RequestContext, config: dict[str, Any]) -> Iterator[ConnectorItem]:
        ...

    def healthcheck(self, config: dict[str, Any]) -> bool:
        return True
