"""Promote a Mem0 fact into the company brain.

Promotion is never silent. It produces an audit event and requires a
documented source. If you cannot describe where the fact came from, you
cannot promote it.
"""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Optional

from brain.audit.log import AuditLog
from brain.core.context import RequestContext
from brain.graph.cognee_client import CogneeClient, stable_doc_id
from brain.graph.graphiti_client import GraphitiClient, TemporalFact
from brain.memory.mem0_client import Mem0Client
from brain.ontology.provenance import Provenance


class PromotionError(Exception):
    pass


def promote(
    ctx: RequestContext,
    *,
    mem0_item_id: str,
    target: str,  # 'cognee' | 'graphiti' | 'both'
    source_uri: str,
    source_hash: str,
    confidence: float,
    extractor_version: str,
    cognee: CogneeClient,
    graphiti: GraphitiClient,
    mem0: Mem0Client,
    audit: AuditLog,
    fact_predicate: Optional[str] = None,
    fact_subject_id: Optional[str] = None,
    fact_subject_type: Optional[str] = None,
) -> None:
    items = mem0.list_for_owner(ctx, owner_id=ctx.actor.id, limit=1000)
    item = next((i for i in items if i.id == mem0_item_id), None)
    if item is None:
        raise PromotionError("mem0 item not found in caller's scope")

    if target not in ("cognee", "graphiti", "both"):
        raise PromotionError("target must be cognee | graphiti | both")

    provenance = Provenance(
        source_connector="mem0_promotion",
        source_uri=source_uri,
        source_hash=source_hash,
        ingestion_run_id=f"promo:{mem0_item_id}",
        extractor_version=extractor_version,
        confidence=confidence,
        recorded_by=ctx.actor.id,
        recorded_at=datetime.now(timezone.utc),
        tenant_id=ctx.tenant_id,
    )

    if target in ("cognee", "both"):
        cognee.add(
            ctx,
            document_id=stable_doc_id(source_uri, source_hash),
            text=item.text,
            metadata={"promoted_from_mem0": item.id, **item.metadata},
            provenance=provenance,
        )

    if target in ("graphiti", "both"):
        if not (fact_predicate and fact_subject_id and fact_subject_type):
            raise PromotionError(
                "graphiti promotion requires fact_predicate, fact_subject_id, fact_subject_type"
            )
        graphiti.add_fact(ctx, TemporalFact(
            id=f"promo:{mem0_item_id}",
            tenant_id=ctx.tenant_id,
            subject_type=fact_subject_type,
            subject_id=fact_subject_id,
            predicate=fact_predicate,
            object=item.text,
            valid_from=datetime.now(timezone.utc),
            recorded_by=ctx.actor.id,
            metadata={"promoted_from_mem0": item.id},
        ))

    audit.write(
        ctx,
        action="promote",
        scope={"mem0_item_id": mem0_item_id, "target": target},
        result={"status": "ok"},
    )
