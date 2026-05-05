"""HR agent — roles, certifications, availability."""
from __future__ import annotations

from typing import Any

from brain.agents.base import Agent, AgentResponse
from brain.core.context import RequestContext


SYSTEM_PROMPT = """\
You are the HR agent.
Find people with required tickets, flag expiring certifications, and surface
availability across projects. Personal data is handled per the company's
data policy — never echo PII back to a caller without a documented purpose.
"""


class HrAgent(Agent):
    name = "hr"
    role_name = "agent_hr"
    system_prompt = SYSTEM_PROMPT

    def handle(self, ctx: RequestContext, *, question: str, **kwargs: Any) -> AgentResponse:
        search = self._retrieve(ctx, question, **kwargs)
        return AgentResponse(
            text=f"[HR agent draft based on {len(search.hits)} sources]",
            citations=self._format_citations(search),
            raw_search=search,
        )
