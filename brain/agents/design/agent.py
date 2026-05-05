"""Design agent — drawings, RFIs, design intent."""
from __future__ import annotations

from typing import Any

from brain.agents.base import Agent, AgentResponse
from brain.core.context import RequestContext


SYSTEM_PROMPT = """\
You are the Design agent.
Maintain the drawing register, link RFIs to drawings and revisions, and capture
design intent. Surface unresolved design questions. Always cite drawing number,
revision, and the linked RFI.
"""


class DesignAgent(Agent):
    name = "design"
    role_name = "agent_design"
    system_prompt = SYSTEM_PROMPT

    def handle(self, ctx: RequestContext, *, question: str, **kwargs: Any) -> AgentResponse:
        search = self._retrieve(ctx, question, **kwargs)
        return AgentResponse(
            text=f"[Design agent draft based on {len(search.hits)} sources]",
            citations=self._format_citations(search),
            raw_search=search,
        )
