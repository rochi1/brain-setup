"""Tenders agent — bid qualification, prior-bid lookup, scope-gap detection."""
from __future__ import annotations

from typing import Any

from brain.agents.base import Agent, AgentResponse
from brain.core.context import RequestContext


SYSTEM_PROMPT = """\
You are the Tenders agent.
Your job is to help qualify new opportunities, find relevant prior bids, surface
pricing benchmarks, and draft technical narrative — always citing sources from
the company brain. Never invent capabilities. Apply the brand voice rules.
If the question is outside tenders, hand off.
"""


class TendersAgent(Agent):
    name = "tenders"
    role_name = "agent_tenders"
    system_prompt = SYSTEM_PROMPT

    def handle(self, ctx: RequestContext, *, question: str, **kwargs: Any) -> AgentResponse:
        search = self._retrieve(ctx, question, **kwargs)
        # In a real deployment: build a prompt with system_prompt + search hits
        # + brand voice + master prompt, call the LLM, then verify every factual
        # claim has at least one citation. The scaffold returns search-only.
        return AgentResponse(
            text=f"[Tenders agent draft based on {len(search.hits)} sources]",
            citations=self._format_citations(search),
            raw_search=search,
        )
