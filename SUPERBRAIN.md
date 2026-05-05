# Superbrain — Business AI Brain Starter Kit

> A serious starter kit for building a **company-wide AI brain**: a unified memory, knowledge graph, and agent layer that any business can deploy on its own infrastructure.

This repository is two things at once:

1. **The original AI Business Template Kit** — markdown templates for brand voice, audience, products, competitors, and AI policy. Still here, untouched, in `templates/`, `your-business/`, `prompts/`, `processes/`, `governance/`, `examples/`. Use it to define **what** the AI should know about your business.
2. **The Superbrain implementation layer** (new) — a self-hostable architecture, scaffold, and operating manual for the **system** that stores, queries, and reasons over that knowledge — across documents, projects, emails, drawings, contracts, RFIs, variations, and decisions.

If the template kit is the **content**, the Superbrain is the **brain that holds it**.

---

## Why this exists

Most AI deployments inside businesses fail in the same way:

- A chatbot that has no memory of last week's conversation.
- A RAG pipeline that retrieves chunks but loses entity relationships.
- A Copilot that can't tell you who decided what, when, or why.
- Five agents that each rebuild the same context from scratch.
- No audit trail, no provenance, no tenant isolation, no single source of truth.

A real business brain needs:

- **Persistent memory** across sessions, agents, and users.
- **A knowledge graph** that captures relationships between projects, people, contracts, drawings, decisions.
- **Time-aware facts** — "what did we know about this RFI on March 12?"
- **Personalisation** per user/agent without polluting the company-wide brain.
- **Provenance** — every fact traceable to its source document and ingestion event.
- **Tenant boundaries** — multiple business units, projects, or clients can coexist safely.
- **Audit** — who asked what, who saw what, what was changed.

This is the architecture, blueprint, and starter scaffold to build that.

---

## The stack at a glance

| Layer | Tool | Role |
|---|---|---|
| **Company brain (core)** | [Cognee](https://github.com/topoteretes/cognee) | Hybrid graph + vector knowledge engine. Persistent, traceable, tenant-aware. The default `/search` and `/ingest` backbone. |
| **Temporal knowledge graph** | [Graphiti](https://github.com/getzep/graphiti) | Time-aware facts about projects, contracts, RFIs, claims, decisions. Answers point-in-time questions. |
| **Personal / agent memory** | [Mem0](https://github.com/mem0ai/mem0) | User and agent personalisation memory. **Not** the primary business brain. |
| **System of record** | Postgres / Supabase | Authoritative business data, RBAC, row-level security, vector extension fallback. |
| **Object store** | S3 / Azure Blob / SharePoint | Source documents, drawings, attachments, archives. |
| **Connectors** | Microsoft Graph, SharePoint, OneDrive, Outlook, Plexa, filesystem | Ingestion sources. |
| **Agent orchestration** | Claude (Anthropic), Perplexity, OpenAI | Specialised agents — Tenders, BOQ, Contracts, Design, Finance, HR, Procurement, Site. |
| **API surface** | FastAPI | `/ingest`, `/search`, `/project-context/:id`, `/agent-memory`, `/audit` |
| **Workers** | Celery / RQ / Temporal | Async ingestion, embedding, graph build, re-indexing. |
| **Observability** | OpenTelemetry + Prometheus + Grafana | Traces, metrics, logs across the brain. |

See [`docs/architecture/OVERVIEW.md`](docs/architecture/OVERVIEW.md) for the full architecture and [`docs/architecture/COMPARISON.md`](docs/architecture/COMPARISON.md) for why each tool was chosen.

---

## Repository layout (Superbrain additions)

```
brain/                       Implementation scaffold (Python + FastAPI)
├── api/                     HTTP API: /ingest, /search, /project-context, /agent-memory, /audit
├── core/                    Settings, config, logging, dependency wiring
├── connectors/              Ingestion sources (Microsoft Graph, Plexa, Supabase, FS, Outlook)
├── ontology/                Project, Tender, Contract, RFI, Variation, Claim, Decision, …
├── memory/                  Mem0 wrapper for user/agent personal memory
├── graph/                   Cognee + Graphiti adapters (company brain + temporal graph)
├── agents/                  Domain agents — tenders, boq, contracts, design, finance, hr, procurement, site
├── workers/                 Async ingestion + embedding + graph-build workers
├── audit/                   Audit log + provenance + access tracking
├── governance/              RBAC, tenant boundaries, data lifecycle policies
├── cli/                     Operator CLI (ingest, reindex, audit query, tenant ops)
├── scripts/                 One-off ops scripts
└── tests/                   Pytest suite

docs/
├── architecture/            OVERVIEW, COMPARISON, ONTOLOGY, DATA_FLOWS, DEPLOYMENT
├── rollout/                 PHASE_1_MVP, PHASE_2_PILOT, PHASE_3_ENTERPRISE
├── governance/              RBAC, AUDIT, TENANCY, PROVENANCE, BACKUPS, OBSERVABILITY
├── examples/                RELD_CELESTE_AGENTS, CONSTRUCTION_USECASES, GENERIC_BUSINESSES
└── migration/               FROM_TEMPLATE_KIT_TO_SUPERBRAIN

infra/
├── docker/                  docker-compose for local stack
├── k8s/                     Kustomize / Helm starting points
└── terraform/               Cloud bootstrap stubs

migrations/                  Postgres migrations
seed/                        Seed ontology + sample tenants
```

The original kit (`templates/`, `your-business/`, `prompts/`, `processes/`, `governance/`, `examples/`, `onboarding/`) is preserved unchanged so existing users are not disrupted.

---

## Where to go next

- **New here?** Read [`docs/architecture/OVERVIEW.md`](docs/architecture/OVERVIEW.md).
- **Comparing tools?** Read [`docs/architecture/COMPARISON.md`](docs/architecture/COMPARISON.md).
- **Planning a rollout?** Read [`docs/rollout/PHASE_1_MVP.md`](docs/rollout/PHASE_1_MVP.md).
- **Construction / RELD / Celeste use case?** Read [`docs/examples/RELD_CELESTE_AGENTS.md`](docs/examples/RELD_CELESTE_AGENTS.md).
- **Running it locally?** Read [`infra/docker/README.md`](infra/docker/README.md).

---

## Status

This is a **blueprint + scaffold**, not a finished product. Code paths, adapters, and connectors are intentionally thin — they define the contracts and module boundaries. Production deployment requires:

- Real credentials for Microsoft Graph / Plexa / Supabase.
- A running Cognee instance, a Graphiti backend (Neo4j or compatible), and a Mem0 store.
- A Postgres database with the migrations applied.
- A vector store (pgvector, Qdrant, or Cognee's default).

The repo is structured so each of these can be plugged in without rewiring the core.

See the [Limitations](#limitations) section at the bottom of [`docs/architecture/OVERVIEW.md`](docs/architecture/OVERVIEW.md) for the full list of known gaps.
