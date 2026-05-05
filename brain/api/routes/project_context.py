from __future__ import annotations

from datetime import datetime
from typing import Any, Optional

from brain.api.container import Container
from brain.core.context import RequestContext


def project_context(
    ctx: RequestContext,
    container: Container,
    *,
    project_id: str,
    as_of: Optional[str] = None,
    limit: int = 20,
) -> dict[str, Any]:
    parsed_as_of: Optional[datetime] = None
    if as_of:
        parsed_as_of = datetime.fromisoformat(as_of.replace("Z", "+00:00"))

    # Pull a focused slice of the brain for this project.
    docs = container.cognee.search(ctx, query=project_id, limit=limit)
    facts = container.graphiti.query(
        ctx, subject_id=project_id, as_of=parsed_as_of, limit=limit
    )
    memory = container.mem0.search(ctx, query=project_id, limit=limit)

    container.audit.write(
        ctx,
        action="read",
        scope={"project_id": project_id, "as_of": as_of},
        result={"docs": len(docs), "facts": len(facts), "memory": len(memory)},
    )

    return {
        "project_id": project_id,
        "as_of": as_of,
        "documents": [
            {
                "document_id": d.document_id,
                "score": d.score,
                "snippet": d.snippet,
                "provenance": {
                    "source_uri": d.provenance.source_uri,
                    "ingestion_run_id": d.provenance.ingestion_run_id,
                    "confidence": d.provenance.confidence,
                },
            }
            for d in docs
        ],
        "facts": [
            {
                "predicate": f.predicate,
                "object": f.object,
                "valid_from": f.valid_from.isoformat(),
                "valid_to": f.valid_to.isoformat() if f.valid_to else None,
            }
            for f in facts
        ],
        "memory": [
            {"owner_id": m.owner_id, "text": m.text} for m in memory
        ],
    }
