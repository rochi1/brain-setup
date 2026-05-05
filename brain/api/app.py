"""FastAPI app factory.

FastAPI is imported lazily so the rest of the package and the CLI can be used
without the dependency installed (useful in CI sanity checks). If FastAPI is
missing, calling create_app() raises a clear error.
"""
from __future__ import annotations

import logging
from typing import Any

from brain.api.container import Container, build_default_container
from brain.core.logging import configure_logging
from brain.core.settings import get_settings

log = logging.getLogger(__name__)


def build_container() -> Container:
    return build_default_container()


def create_app(container: Container | None = None) -> Any:
    try:
        from fastapi import Body, FastAPI, HTTPException, Query, Request
    except ImportError as exc:  # pragma: no cover
        raise RuntimeError(
            "FastAPI is required to run the API. Install with: pip install -e .[api]"
        ) from exc

    from brain.api.auth import AuthError, context_from_headers
    from brain.api.routes.agent_memory import get_agent_memory, post_agent_memory
    from brain.api.routes.audit import get_audit
    from brain.api.routes.health import healthz, readyz
    from brain.api.routes.ingest import ingest as do_ingest
    from brain.api.routes.project_context import project_context
    from brain.api.routes.search import search as do_search

    settings = get_settings()
    configure_logging(settings.log_level)
    container = container or build_default_container()

    app = FastAPI(title="Superbrain API", version="0.1.0")

    def ctx_or_401(request: Request):
        try:
            return context_from_headers({k.lower(): v for k, v in request.headers.items()})
        except AuthError as exc:
            raise HTTPException(status_code=401, detail=str(exc))

    @app.get("/healthz")
    def _healthz():
        return healthz()

    @app.get("/readyz")
    def _readyz():
        return readyz(container)

    @app.post("/search")
    def _search(request: Request, body: dict = Body(...)):
        ctx = ctx_or_401(request)
        return do_search(
            ctx,
            container,
            query=body["query"],
            limit=body.get("limit", 10),
            as_of=body.get("as_of"),
            include_memory=body.get("include_memory", False),
        )

    @app.post("/ingest")
    def _ingest(request: Request, body: dict = Body(...)):
        ctx = ctx_or_401(request)
        try:
            return do_ingest(
                ctx,
                container,
                connector=body["connector"],
                config=body.get("config", {}),
            )
        except (ValueError, NotImplementedError) as exc:
            raise HTTPException(status_code=400, detail=str(exc))

    @app.get("/project-context/{project_id}")
    def _project_context(
        request: Request,
        project_id: str,
        as_of: str | None = Query(default=None),
        limit: int = Query(default=20, ge=1, le=200),
    ):
        ctx = ctx_or_401(request)
        return project_context(ctx, container, project_id=project_id, as_of=as_of, limit=limit)

    @app.get("/agent-memory/{agent_id}")
    def _get_agent_memory(request: Request, agent_id: str,
                           limit: int = Query(default=100, ge=1, le=1000)):
        ctx = ctx_or_401(request)
        return get_agent_memory(ctx, container, agent_id=agent_id, limit=limit)

    @app.post("/agent-memory/{agent_id}")
    def _post_agent_memory(request: Request, agent_id: str, body: dict = Body(...)):
        ctx = ctx_or_401(request)
        return post_agent_memory(
            ctx, container, agent_id=agent_id,
            text=body["text"], metadata=body.get("metadata"),
        )

    @app.get("/audit")
    def _audit(request: Request,
               action: str | None = Query(default=None),
               actor_id: str | None = Query(default=None)):
        ctx = ctx_or_401(request)
        return get_audit(ctx, container, action=action, actor_id=actor_id)

    log.info("api_started", extra={"event": "api_started"})
    return app
