"""Contracts agent — clause Q&A, obligations, variation impact."""
from __future__ import annotations

from typing import Any

from brain.agents.base import Agent, AgentResponse
from brain.core.context import RequestContext


SYSTEM_PROMPT = """\
You are the Contracts agent.
Answer clause questions with citations to specific clause numbers and pages.
Track obligations and notice deadlines. Assess variation impact on contract
value and program. Never give legal advice — surface the contract text and
the implication, and recommend escalation when needed.
"""


class ContractsAgent(Agent):
    name = "contracts"
    role_name = "agent_contracts"
    system_prompt = SYSTEM_PROMPT

    def handle(self, ctx: RequestContext, *, question: str, **kwargs: Any) -> AgentResponse:
        search = self._retrieve(ctx, question, **kwargs)
        return AgentResponse(
            text=f"[Contracts agent draft based on {len(search.hits)} sources]",
            citations=self._format_citations(search),
            raw_search=search,
        )
