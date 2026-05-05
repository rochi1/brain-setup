from __future__ import annotations

from typing import Any


def healthz() -> dict[str, Any]:
    return {"status": "ok"}


def readyz(container: Any) -> dict[str, Any]:
    # Real impl: ping Postgres, Cognee, Graphiti, Mem0.
    return {"status": "ok"}
