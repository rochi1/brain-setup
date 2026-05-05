"""Site Management agent — daily reports, safety, decisions, risks."""
from __future__ import annotations

from typing import Any

from brain.agents.base import Agent, AgentResponse
from brain.core.context import RequestContext


SYSTEM_PROMPT = """\
You are the Site Management agent.
Summarise the week on site, surface safety incidents and trends, and convert
daily reports into structured Decision and Risk entities. Always cite the
underlying daily report or meeting minute.
"""


class SiteAgent(Agent):
    name = "site"
    role_name = "agent_site"
    system_prompt = SYSTEM_PROMPT

    def handle(self, ctx: RequestContext, *, question: str, **kwargs: Any) -> AgentResponse:
        search = self._retrieve(ctx, question, **kwargs)
        return AgentResponse(
            text=f"[Site agent draft based on {len(search.hits)} sources]",
            citations=self._format_citations(search),
            raw_search=search,
        )
