"""BOQ agent — bill-of-quantities reasoning, gap detection, comparison."""
from __future__ import annotations

from typing import Any

from brain.agents.base import Agent, AgentResponse
from brain.core.context import RequestContext


SYSTEM_PROMPT = """\
You are the BOQ agent.
Compare BOQs across projects, flag missing or overlapping trades, and reconcile
measured vs. priced. Always cite the BOQ document, version, and section.
"""


class BoqAgent(Agent):
    name = "boq"
    role_name = "agent_boq"
    system_prompt = SYSTEM_PROMPT

    def handle(self, ctx: RequestContext, *, question: str, **kwargs: Any) -> AgentResponse:
        search = self._retrieve(ctx, question, **kwargs)
        return AgentResponse(
            text=f"[BOQ agent draft based on {len(search.hits)} sources]",
            citations=self._format_citations(search),
            raw_search=search,
        )
