"""Microsoft Graph connector — SharePoint / OneDrive / Teams files.

Contract is defined; OAuth flow + actual Graph SDK integration are deliberately
left as TODO so credential handling stays out of the open-source scaffold.
The pilot deployment must:

  1. Register an app in Entra ID (Azure AD).
  2. Grant `Sites.Read.All`, `Files.Read.All` (or narrower scopes).
  3. Use client-credentials or delegated flow per tenant policy.
  4. Provide credentials via the secret manager — never .env in prod.
"""
from __future__ import annotations

from typing import Any, Iterator

from brain.connectors.base import Connector, ConnectorItem
from brain.core.context import RequestContext


class MicrosoftGraphConnector(Connector):
    name = "microsoft_graph"

    def __init__(self, client: Any = None) -> None:
        # Inject a Graph client (msgraph-sdk-python or aiohttp wrapper).
        # Left None in the scaffold so unit tests can substitute a fake.
        self._client = client

    def pull(self, ctx: RequestContext, config: dict[str, Any]) -> Iterator[ConnectorItem]:
        """Required config keys:
            site_id        SharePoint site to enumerate (or 'all')
            drive_id       Optional drive within the site
            since          ISO timestamp; only items modified after this point
            run_id         Ingestion run id
        """
        if self._client is None:
            raise NotImplementedError(
                "MicrosoftGraphConnector requires a Graph client. "
                "Wire one up before pilot — see docs/architecture/DEPLOYMENT.md."
            )
        # Real implementation:
        #   1. Page through /sites/{site_id}/drives/{drive_id}/root/children (delta).
        #   2. For each file: GET /drive/items/{id}/content.
        #   3. Extract text (PDF/DOCX/XLSX/HTML/MD/TXT).
        #   4. Hash bytes for source_hash; canonical webUrl for source_uri.
        #   5. Yield ConnectorItem(entity_type='Document', ...) with provenance.
        return iter(())

    def healthcheck(self, config: dict[str, Any]) -> bool:
        return self._client is not None
