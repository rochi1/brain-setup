"""Ingestion worker.

Orchestrates a connector run: pull items, write provenance, hand to Cognee
and Graphiti, emit audit events. Idempotent on (source_connector, source_uri,
source_hash).

Wire this to whichever queue you settle on (Celery / RQ / Temporal). The core
logic in `run_ingestion` is queue-agnostic and unit-testable.
"""
from __future__ import annotations

import logging
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Optional

from brain.audit.log import AuditLog
from brain.connectors.base import Connector, ConnectorRun
from brain.core.context import RequestContext
from brain.graph.cognee_client import CogneeClient, stable_doc_id

log = logging.getLogger(__name__)


@dataclass
class IngestionResult:
    run: ConnectorRun
    document_ids: list[str] = field(default_factory=list)


def run_ingestion(
    ctx: RequestContext,
    *,
    connector: Connector,
    config: dict[str, Any],
    cognee: CogneeClient,
    audit: AuditLog,
    run_id: Optional[str] = None,
) -> IngestionResult:
    run_id = run_id or str(uuid.uuid4())
    run = ConnectorRun(id=run_id, tenant_id=ctx.tenant_id, connector=connector.name)
    config = {**config, "run_id": run_id}

    audit.write(ctx, action="ingest", scope={
        "connector": connector.name, "run_id": run_id, "phase": "start"
    })

    seen_hashes: set[str] = set()
    document_ids: list[str] = []

    try:
        for item in connector.pull(ctx, config):
            run.items_seen += 1
            key = (item.provenance.source_uri, item.provenance.source_hash)
            if key in seen_hashes:
                run.items_skipped += 1
                continue
            seen_hashes.add(key)

            existing = cognee.get(ctx, document_id=stable_doc_id(*key))
            if existing and existing.provenance.source_hash == item.provenance.source_hash:
                run.items_skipped += 1
                continue

            doc_id = stable_doc_id(*key)
            cognee.add(
                ctx,
                document_id=doc_id,
                text=item.text,
                metadata={
                    "entity_type": item.entity_type,
                    "external_id": item.external_id,
                    **item.metadata,
                },
                provenance=item.provenance,
            )
            document_ids.append(doc_id)
            run.items_ingested += 1

        run.status = "ok"
    except Exception as exc:
        run.status = "error"
        run.error_summary = repr(exc)
        log.exception("ingestion failed")
        raise
    finally:
        run.finished_at = datetime.now(timezone.utc)
        audit.write(ctx, action="ingest", scope={
            "connector": connector.name, "run_id": run.id, "phase": "end",
        }, result={
            "status": run.status,
            "items_seen": run.items_seen,
            "items_ingested": run.items_ingested,
            "items_skipped": run.items_skipped,
            "items_failed": run.items_failed,
        })

    return IngestionResult(run=run, document_ids=document_ids)
