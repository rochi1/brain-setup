"""Hybrid retrieval orchestrator.

Combines:
  - Cognee (graph + vector) — `what does the company know`
  - Graphiti (temporal)     — `what was true when`
  - Mem0 (personal)         — `what does this user/agent prefer`

Returned hits carry provenance. Agents that surface a fact MUST surface its
provenance.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Optional

from brain.core.context import RequestContext
from brain.graph.cognee_client import CogneeClient, CogneeHit
from brain.graph.graphiti_client import GraphitiClient, TemporalFact
from brain.memory.mem0_client import Mem0Client, Mem0Item
from brain.ontology.provenance import Provenance


@dataclass
class SearchHit:
    kind: str  # 'doc' | 'fact' | 'memory'
    score: float
    text: str
    metadata: dict[str, Any]
    provenance: Optional[Provenance] = None


@dataclass
class SearchResponse:
    hits: list[SearchHit] = field(default_factory=list)
    facts: list[TemporalFact] = field(default_factory=list)
    memory: list[Mem0Item] = field(default_factory=list)


class HybridSearch:
    def __init__(
        self,
        cognee: CogneeClient,
        graphiti: GraphitiClient,
        mem0: Mem0Client,
    ) -> None:
        self._cognee = cognee
        self._graphiti = graphiti
        self._mem0 = mem0

    def search(
        self,
        ctx: RequestContext,
        *,
        query: str,
        limit: int = 10,
        as_of: Optional[datetime] = None,
        include_memory: bool = False,
    ) -> SearchResponse:
        cognee_hits: list[CogneeHit] = self._cognee.search(ctx, query=query, limit=limit)
        facts: list[TemporalFact] = self._graphiti.query(ctx, as_of=as_of, limit=limit)
        memory: list[Mem0Item] = (
            self._mem0.search(ctx, query=query, limit=limit) if include_memory else []
        )
        hits = [
            SearchHit(
                kind="doc",
                score=h.score,
                text=h.snippet,
                metadata=h.metadata,
                provenance=h.provenance,
            )
            for h in cognee_hits
        ]
        return SearchResponse(hits=hits, facts=facts, memory=memory)
