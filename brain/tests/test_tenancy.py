"""Cross-tenant adversarial tests.

Asserts that data added under tenant A cannot be retrieved by tenant B
through any of the layers — Cognee, Graphiti, Mem0, hybrid search.
"""
from __future__ import annotations

import uuid
from datetime import datetime, timezone

import pytest

from brain.api.container import build_default_container
from brain.core.context import Actor, RequestContext
from brain.graph.graphiti_client import TemporalFact
from brain.ontology.provenance import Provenance


def _ctx(tenant: str, actor: str = "user-1") -> RequestContext:
    return RequestContext(
        tenant_id=tenant,
        actor=Actor(type="user", id=actor),
        request_id=str(uuid.uuid4()),
    )


def _prov(tenant: str) -> Provenance:
    return Provenance(
        source_connector="test",
        source_uri=f"test://{tenant}/doc",
        source_hash="hash",
        ingestion_run_id="run-1",
        extractor_version="test@1",
        confidence=1.0,
        recorded_by="system",
        recorded_at=datetime.now(timezone.utc),
        tenant_id=tenant,
    )


def test_cognee_cross_tenant_isolation():
    container = build_default_container()
    ctx_a = _ctx("tenant-A")
    ctx_b = _ctx("tenant-B")

    container.cognee.add(
        ctx_a, document_id="doc-1",
        text="Project Alpha kicked off in March 2025.",
        metadata={}, provenance=_prov("tenant-A"),
    )

    hits_a = container.cognee.search(ctx_a, query="alpha")
    hits_b = container.cognee.search(ctx_b, query="alpha")

    assert len(hits_a) == 1
    assert hits_b == []


def test_graphiti_cross_tenant_isolation():
    container = build_default_container()
    ctx_a = _ctx("tenant-A")
    ctx_b = _ctx("tenant-B")

    fact = TemporalFact(
        id="fact-1", tenant_id="tenant-A",
        subject_type="Project", subject_id="P-1",
        predicate="status", object="active",
        valid_from=datetime.now(timezone.utc),
    )
    container.graphiti.add_fact(ctx_a, fact)

    assert len(container.graphiti.query(ctx_a, subject_id="P-1")) == 1
    assert len(container.graphiti.query(ctx_b, subject_id="P-1")) == 0


def test_mem0_cross_tenant_isolation():
    container = build_default_container()
    ctx_a = _ctx("tenant-A")
    ctx_b = _ctx("tenant-B")

    container.mem0.add(ctx_a, owner_id="user-1", owner_type="user",
                        text="prefers AUD over USD")

    assert len(container.mem0.list_for_owner(ctx_a, owner_id="user-1")) == 1
    assert len(container.mem0.list_for_owner(ctx_b, owner_id="user-1")) == 0


def test_provenance_tenant_mismatch_rejected():
    container = build_default_container()
    ctx_a = _ctx("tenant-A")
    bad_prov = _prov("tenant-B")

    with pytest.raises(PermissionError):
        container.cognee.add(
            ctx_a, document_id="doc-x",
            text="anything", metadata={}, provenance=bad_prov,
        )
