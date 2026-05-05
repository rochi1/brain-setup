"""Outlook connector — emails and calendar via Microsoft Graph.

Same auth flow as the SharePoint connector; separated for clarity because
ingestion shape and PII concerns differ.

Required redaction:
  - Personal email addresses outside the company domain are redacted unless
    the tenant has explicitly opted in.
  - Signature blocks are stripped to keep search clean.
  - Attachments are ingested as Document items; the email links to them.
"""
from __future__ import annotations

from typing import Any, Iterator

from brain.connectors.base import Connector, ConnectorItem
from brain.core.context import RequestContext


class OutlookConnector(Connector):
    name = "outlook"

    def __init__(self, client: Any = None) -> None:
        self._client = client

    def pull(self, ctx: RequestContext, config: dict[str, Any]) -> Iterator[ConnectorItem]:
        if self._client is None:
            raise NotImplementedError(
                "OutlookConnector requires a Graph client; see DEPLOYMENT.md."
            )
        return iter(())

    def healthcheck(self, config: dict[str, Any]) -> bool:
        return self._client is not None
