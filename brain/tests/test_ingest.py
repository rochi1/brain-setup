"""End-to-end filesystem ingestion smoke test."""
from __future__ import annotations

import uuid
from pathlib import Path

from brain.api.container import build_default_container
from brain.connectors.filesystem import FilesystemConnector
from brain.core.context import Actor, RequestContext
from brain.workers.ingest import run_ingestion


def test_filesystem_ingest_idempotent(tmp_path: Path):
    (tmp_path / "doc1.md").write_text("Project Alpha kicked off in March 2025.")
    (tmp_path / "doc2.txt").write_text("Subcontractor Beta delivered the joinery.")

    container = build_default_container()
    ctx = RequestContext(
        tenant_id="tenant-A",
        actor=Actor(type="connector", id="fs-runner"),
        request_id=str(uuid.uuid4()),
    )
    connector = FilesystemConnector()

    r1 = run_ingestion(
        ctx, connector=connector, config={"root": str(tmp_path)},
        cognee=container.cognee, audit=container.audit,
    )
    assert r1.run.items_ingested == 2

    r2 = run_ingestion(
        ctx, connector=connector, config={"root": str(tmp_path)},
        cognee=container.cognee, audit=container.audit,
    )
    assert r2.run.items_ingested == 0
    assert r2.run.items_skipped == 2

    hits = container.cognee.search(ctx, query="Alpha")
    assert hits, "expected at least one hit for ingested content"
