# Phase 1 — MVP (4–6 weeks)

**Goal:** prove the brain on one project's worth of documents, one tenant, one agent, in an internal-only environment.

## Scope

- 1 tenant.
- 1 agent (start with **Tenders** or **Contracts** — they get the fastest "wow").
- 1 connector (filesystem or a single SharePoint site).
- API endpoints: `/ingest`, `/search`, `/project-context/:id`, `/audit`.
- No Mem0 yet — defer personalisation to Phase 2.
- Graphiti optional in Phase 1; Cognee mandatory.

## Success criteria

- A user can ask *"What do we know about Project X?"* and get an accurate, sourced answer.
- Every answer carries provenance (document name, page, section).
- Every search and ingestion appears in `/audit`.
- Re-ingesting the same source produces no duplicates.
- The system runs on `docker-compose up` for new developers.

## Deliverables

| # | Deliverable |
|---|---|
| 1 | Local docker-compose stack with Postgres + Cognee + API + worker |
| 2 | Filesystem connector ingesting one project folder |
| 3 | `/ingest` and `/search` working against Cognee |
| 4 | `/project-context/:id` returning a ranked, sourced context blob |
| 5 | Audit log writing to Postgres |
| 6 | One agent (Tenders or Contracts) calling the API and answering 10 benchmark questions |
| 7 | 10 benchmark questions + expected answers committed to `tests/benchmarks/` |
| 8 | Smoke test in CI that hits the API end-to-end |

## Out of scope (deliberately)

- Microsoft Graph OAuth flow.
- Plexa connector.
- Mem0 integration.
- Multi-tenant admin UI.
- Production-grade RBAC (basic API key + tenant header is enough for MVP).
- HA / failover.
- Any agent other than the chosen one.

## Risks and how to handle them

| Risk | Mitigation |
|---|---|
| Cognee ingestion quality on PDFs is low | Pre-process with a battle-tested OCR/PDF extractor before handing to Cognee |
| Graph build is too slow on first load | Batch ingest overnight; not on the critical path |
| Agent hallucinates beyond retrieved facts | Constrain prompt to cite at least one source per claim; reject ungrounded answers in tests |
| Provenance is incomplete | Refuse to merge a connector that doesn't produce full provenance — gate in CI |
