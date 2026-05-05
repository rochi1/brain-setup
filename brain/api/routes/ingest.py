from __future__ import annotations

from typing import Any

from brain.api.container import Container
from brain.connectors.filesystem import FilesystemConnector
from brain.connectors.microsoft import MicrosoftGraphConnector
from brain.connectors.outlook import OutlookConnector
from brain.connectors.plexa import PlexaConnector
from brain.connectors.supabase import SupabaseConnector
from brain.core.context import RequestContext
from brain.workers.ingest import run_ingestion


def _resolve_connector(name: str) -> Any:
    table = {
        "filesystem": FilesystemConnector(),
        "microsoft_graph": MicrosoftGraphConnector(),
        "outlook": OutlookConnector(),
        "plexa": PlexaConnector(),
        "supabase": SupabaseConnector(),
    }
    if name not in table:
        raise ValueError(f"unknown connector: {name}")
    return table[name]


def ingest(
    ctx: RequestContext,
    container: Container,
    *,
    connector: str,
    config: dict[str, Any],
) -> dict[str, Any]:
    conn = _resolve_connector(connector)
    result = run_ingestion(
        ctx,
        connector=conn,
        config=config,
        cognee=container.cognee,
        audit=container.audit,
    )
    return {
        "run_id": result.run.id,
        "connector": result.run.connector,
        "items_seen": result.run.items_seen,
        "items_ingested": result.run.items_ingested,
        "items_skipped": result.run.items_skipped,
        "items_failed": result.run.items_failed,
        "status": result.run.status,
    }
