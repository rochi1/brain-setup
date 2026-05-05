from __future__ import annotations

from datetime import datetime
from typing import Any, Optional

from brain.api.container import Container
from brain.core.context import RequestContext


def search(
    ctx: RequestContext,
    container: Container,
    *,
    query: str,
    limit: int = 10,
    as_of: Optional[str] = None,
    include_memory: bool = False,
) -> dict[str, Any]:
    parsed_as_of: Optional[datetime] = None
    if as_of:
        parsed_as_of = datetime.fromisoformat(as_of.replace("Z", "+00:00"))

    response = container.hybrid.search(
        ctx,
        query=query,
        limit=limit,
        as_of=parsed_as_of,
        include_memory=include_memory,
    )
    audit_event = container.audit.write(
        ctx,
        action="search",
        scope={"query_len": len(query)},
        result={"hits": len(response.hits), "facts": len(response.facts)},
        request_payload={"query": query, "limit": limit, "as_of": as_of},
    )

    return {
        "audit_id": audit_event.audit_id,
        "hits": [
            {
                "kind": h.kind,
                "score": h.score,
                "text": h.text,
                "metadata": h.metadata,
                "provenance": _prov(h.provenance) if h.provenance else None,
            }
            for h in response.hits
        ],
        "facts": [
            {
                "id": f.id,
                "subject_type": f.subject_type,
                "subject_id": f.subject_id,
                "predicate": f.predicate,
                "object": f.object,
                "valid_from": f.valid_from.isoformat(),
                "valid_to": f.valid_to.isoformat() if f.valid_to else None,
            }
            for f in response.facts
        ],
        "memory": [
            {"id": m.id, "owner_id": m.owner_id, "text": m.text}
            for m in response.memory
        ],
    }


def _prov(p: Any) -> dict[str, Any]:
    return {
        "source_connector": p.source_connector,
        "source_uri": p.source_uri,
        "source_hash": p.source_hash,
        "ingestion_run_id": p.ingestion_run_id,
        "extractor_version": p.extractor_version,
        "confidence": p.confidence,
        "page": p.page,
        "section": p.section,
    }
