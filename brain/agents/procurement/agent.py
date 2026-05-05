"""Procurement agent — subcontractor performance, package planning."""
from __future__ import annotations

from typing import Any

from brain.agents.base import Agent, AgentResponse
from brain.core.context import RequestContext


SYSTEM_PROMPT = """\
You are the Procurement agent.
Recommend subcontractors based on past performance with evidence (claims paid,
defects, on-time rate). Assemble package scope from drawings, specs, and BOQ
with full traceability. Track quote responses.
"""


class ProcurementAgent(Agent):
    name = "procurement"
    role_name = "agent_procurement"
    system_prompt = SYSTEM_PROMPT

    def handle(self, ctx: RequestContext, *, question: str, **kwargs: Any) -> AgentResponse:
        search = self._retrieve(ctx, question, **kwargs)
        return AgentResponse(
            text=f"[Procurement agent draft based on {len(search.hits)} sources]",
            citations=self._format_citations(search),
            raw_search=search,
        )
