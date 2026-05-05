"""Plexa connector — projects, tasks, RFIs, variations, status changes.

Plexa exposes a REST API; the connector pages through projects and yields:

  - Project entity
  - RFI entities with status history (status changes become Graphiti facts)
  - Variation entities with cost/time impact
  - Task entities

Time-stamped status changes are emitted as TemporalFact via the worker, not
here. The connector's job is to produce normalised data + provenance.
"""
from __future__ import annotations

from typing import Any, Iterator

from brain.connectors.base import Connector, ConnectorItem
from brain.core.context import RequestContext


class PlexaConnector(Connector):
    name = "plexa"

    def __init__(self, client: Any = None) -> None:
        self._client = client

    def pull(self, ctx: RequestContext, config: dict[str, Any]) -> Iterator[ConnectorItem]:
        """Required config keys:
            base_url   API base for the tenant's Plexa instance
            api_key    Tenant-specific key
            since      ISO timestamp for incremental pulls
            run_id     Ingestion run id
        """
        if self._client is None:
            raise NotImplementedError(
                "PlexaConnector requires a Plexa API client; see DEPLOYMENT.md."
            )
        # Pseudocode:
        #   for project in client.list_projects(since=config['since']):
        #       yield Document/Project item
        #       for rfi in client.list_rfis(project.id, since=...):
        #           yield RFI item
        #           emit status-change TemporalFacts via the worker
        #       for var in client.list_variations(project.id, since=...):
        #           yield Variation item
        return iter(())

    def healthcheck(self, config: dict[str, Any]) -> bool:
        return self._client is not None
