"""Agent contract.

Agents are thin orchestrators over the brain API. They:

  1. Accept a request from a user or another agent.
  2. Build a prompt by combining:
        - The brand voice + master prompt from `your-business/`
        - Their domain-specific system prompt
        - Context retrieved from the brain (`/search` or `/project-context/:id`)
        - Personal memory (Mem0) when relevant
  3. Call the underlying LLM (Claude / Perplexity / OpenAI).
  4. Apply the brand-voice guard before returning.
  5. Cite sources (provenance) for every factual claim.

Agents do NOT have private databases. Every fact comes from the brain.
"""
from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, Optional

from brain.core.context import RequestContext
from brain.graph.hybrid import HybridSearch, SearchResponse


@dataclass
class AgentResponse:
    text: str
    citations: list[dict[str, Any]] = field(default_factory=list)
    raw_search: Optional[SearchResponse] = None
    metadata: dict[str, Any] = field(default_factory=dict)


class Agent(ABC):
    name: str = "base"
    role_name: str = "agent_base"
    system_prompt: str = ""

    def __init__(self, hybrid: HybridSearch) -> None:
        self._hybrid = hybrid

    @abstractmethod
    def handle(self, ctx: RequestContext, *, question: str, **kwargs: Any) -> AgentResponse:
        ...

    def _retrieve(self, ctx: RequestContext, question: str, **kwargs: Any) -> SearchResponse:
        return self._hybrid.search(
            ctx,
            query=question,
            limit=kwargs.get("limit", 10),
            as_of=kwargs.get("as_of"),
            include_memory=kwargs.get("include_memory", False),
        )

    @staticmethod
    def _format_citations(search: SearchResponse) -> list[dict[str, Any]]:
        out = []
        for h in search.hits:
            if h.provenance is None:
                continue
            out.append({
                "source_uri": h.provenance.source_uri,
                "page": h.provenance.page,
                "section": h.provenance.section,
                "confidence": h.provenance.confidence,
                "ingestion_run_id": h.provenance.ingestion_run_id,
            })
        return out
