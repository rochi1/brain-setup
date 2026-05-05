"""Filesystem connector — bulk-load a folder of documents.

Used for onboarding (one-time archive ingestion) and for local development.
Yields one ConnectorItem per file, with content hash for idempotency.
"""
from __future__ import annotations

import hashlib
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterator

from brain.connectors.base import Connector, ConnectorItem
from brain.core.context import RequestContext
from brain.ontology.provenance import Provenance


SUPPORTED_TEXT_SUFFIXES = {".md", ".txt", ".html", ".csv", ".json"}


class FilesystemConnector(Connector):
    name = "filesystem"

    def pull(self, ctx: RequestContext, config: dict[str, Any]) -> Iterator[ConnectorItem]:
        root = Path(config["root"])
        if not root.exists() or not root.is_dir():
            raise FileNotFoundError(f"root path not found: {root}")

        run_id = config.get("run_id") or f"fs:{datetime.now(timezone.utc).timestamp()}"
        extractor_version = config.get("extractor_version", "filesystem@0.1")

        for path in root.rglob("*"):
            if not path.is_file():
                continue
            if path.suffix.lower() not in SUPPORTED_TEXT_SUFFIXES:
                continue
            try:
                raw = path.read_bytes()
            except OSError:
                continue
            text = raw.decode("utf-8", errors="replace")
            source_hash = hashlib.sha256(raw).hexdigest()
            uri = f"file://{path.resolve()}"
            provenance = Provenance(
                source_connector=self.name,
                source_uri=uri,
                source_hash=source_hash,
                ingestion_run_id=run_id,
                extractor_version=extractor_version,
                confidence=1.0,
                recorded_by=ctx.actor.id,
                recorded_at=datetime.now(timezone.utc),
                tenant_id=ctx.tenant_id,
            )
            yield ConnectorItem(
                entity_type="Document",
                external_id=str(path.relative_to(root)),
                text=text,
                metadata={
                    "path": str(path),
                    "size_bytes": len(raw),
                    "mime_hint": path.suffix.lower(),
                },
                provenance=provenance,
            )

    def healthcheck(self, config: dict[str, Any]) -> bool:
        root = config.get("root")
        return bool(root and os.path.isdir(root))
