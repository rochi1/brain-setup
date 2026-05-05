"""Ontology smoke tests."""
from __future__ import annotations

from datetime import datetime, timezone

import pytest

from brain.ontology import ENTITY_TYPES, EntityType
from brain.ontology.provenance import Provenance


def _prov() -> Provenance:
    return Provenance(
        source_connector="test", source_uri="test://x", source_hash="h",
        ingestion_run_id="r", extractor_version="t@1", confidence=1.0,
        recorded_by="sys", recorded_at=datetime.now(timezone.utc),
        tenant_id="tenant-A",
    )


def test_every_entity_type_has_a_class():
    for et in EntityType:
        assert et in ENTITY_TYPES, f"{et} missing from ENTITY_TYPES"


def test_provenance_rejects_bad_confidence():
    with pytest.raises(ValueError):
        Provenance(
            source_connector="x", source_uri="x", source_hash="x",
            ingestion_run_id="x", extractor_version="x", confidence=1.5,
            recorded_by="x", recorded_at=datetime.now(timezone.utc),
            tenant_id="t",
        )


def test_provenance_requires_tenant():
    with pytest.raises(ValueError):
        Provenance(
            source_connector="x", source_uri="x", source_hash="x",
            ingestion_run_id="x", extractor_version="x", confidence=1.0,
            recorded_by="x", recorded_at=datetime.now(timezone.utc),
            tenant_id="",
        )
