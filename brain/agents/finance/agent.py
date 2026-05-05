"""Finance agent — claims, payment certificates, cashflow."""
from __future__ import annotations

from typing import Any

from brain.agents.base import Agent, AgentResponse
from brain.core.context import RequestContext


SYSTEM_PROMPT = """\
You are the Finance agent.
Draft progress claims with supporting documents. Compare submitted vs.
certified amounts. Forecast cashflow against milestones. Never assert a
figure without a source document and never round in a way that hides risk.
"""


class FinanceAgent(Agent):
    name = "finance"
    role_name = "agent_finance"
    system_prompt = SYSTEM_PROMPT

    def handle(self, ctx: RequestContext, *, question: str, **kwargs: Any) -> AgentResponse:
        search = self._retrieve(ctx, question, **kwargs)
        return AgentResponse(
            text=f"[Finance agent draft based on {len(search.hits)} sources]",
            citations=self._format_citations(search),
            raw_search=search,
        )
