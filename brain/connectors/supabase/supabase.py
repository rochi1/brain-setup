"""Supabase connector — pulls rows from internal app tables.

Configurable per-table mapping from row -> ConnectorItem so that the schema
of the internal app doesn't leak into the ontology. The mapping lives in
config, not code.
"""
from __future__ import annotations

from typing import Any, Iterator

from brain.connectors.base import Connector, ConnectorItem
from brain.core.context import RequestContext


class SupabaseConnector(Connector):
    name = "supabase"

    def __init__(self, client: Any = None) -> None:
        self._client = client

    def pull(self, ctx: RequestContext, config: dict[str, Any]) -> Iterator[ConnectorItem]:
        """Required config keys:
            url, service_key
            tables: [
              { name, entity_type, since_column, fields_to_text, metadata_fields }
            ]
            run_id
        """
        if self._client is None:
            raise NotImplementedError(
                "SupabaseConnector requires a supabase-py client; see DEPLOYMENT.md."
            )
        return iter(())

    def healthcheck(self, config: dict[str, Any]) -> bool:
        return self._client is not None
