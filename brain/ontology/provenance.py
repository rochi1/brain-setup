"""Provenance — every entity and every fact must carry one of these."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass(frozen=True)
class Provenance:
    source_connector: str
    source_uri: str
    source_hash: str
    ingestion_run_id: str
    extractor_version: str
    confidence: float
    recorded_by: str
    recorded_at: datetime
    tenant_id: str
    page: Optional[int] = None
    section: Optional[str] = None

    def __post_init__(self) -> None:
        if not 0.0 <= self.confidence <= 1.0:
            raise ValueError("confidence must be between 0.0 and 1.0")
        if not self.tenant_id:
            raise ValueError("tenant_id is required")
        if not self.source_uri:
            raise ValueError("source_uri is required")
