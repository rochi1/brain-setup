# Why these tools — and where the original repo fell short

## The original repo

The original `brain-setup` repo is the **AI Business Template Kit**: a well-crafted set of markdown files (brand voice, audience, products, competitors, AI policy, master prompt) that businesses paste into a chat tool to give it context.

It is excellent at what it does. It is also explicitly **not** an AI brain:

| Capability | Template Kit | A real business brain |
|---|---|---|
| Static identity / voice | ✅ | ✅ |
| Persistent memory across sessions | ❌ | ✅ |
| Knowledge graph of entities | ❌ | ✅ |
| Time-aware facts | ❌ | ✅ |
| Multi-agent shared knowledge | ❌ | ✅ |
| Document ingestion | ❌ | ✅ |
| Provenance / audit | ❌ | ✅ |
| Tenant isolation | ❌ | ✅ |
| RBAC | ❌ | ✅ |
| Connectors to business systems | ❌ | ✅ |
| Self-hostable infrastructure | n/a | ✅ |

The Superbrain layer adds the right column without breaking the left.

## Why Cognee as the core

| Need | Cognee | Plain pgvector RAG | LangChain memory | Vendor SaaS (e.g. proprietary KB) |
|---|---|---|---|---|
| Hybrid graph + vector retrieval | ✅ native | ❌ vector only | ❌ chains, not stores | ⚠️ varies |
| Persistent, durable storage | ✅ | ✅ | ❌ in-process | ✅ but locked-in |
| Cross-agent knowledge sharing | ✅ first-class | ⚠️ DIY | ❌ | ⚠️ |
| Tenant isolation | ✅ | DIY | ❌ | ⚠️ |
| Traceability of ingestion | ✅ | DIY | ❌ | varies |
| Self-hosted | ✅ | ✅ | n/a | ❌ |
| Active project | ✅ | ✅ | ⚠️ | n/a |

Cognee is the smallest tool that covers all five of: graph + vector + persistence + cross-agent + tenant. That's why it is the default backbone.

## Why Graphiti as the temporal layer

Cognee's graph models *what is*. Construction, contracts, claims, and decisions need *what was, when, and in what order*.

| Need | Graphiti | Cognee alone | Custom event sourcing |
|---|---|---|---|
| Validity intervals on facts | ✅ | ❌ | DIY (months) |
| Point-in-time queries | ✅ | ❌ | DIY |
| Episode / event modelling | ✅ | ⚠️ | DIY |
| Relationship history | ✅ | ⚠️ | DIY |
| Drop-in to Neo4j | ✅ | n/a | n/a |

Graphiti slots in next to Cognee, not instead of it. They answer different questions.

## Why Mem0 — and only as personal memory

| Need | Mem0 | Cognee | Conversation history in Postgres |
|---|---|---|---|
| Per-user preferences | ✅ | overkill | DIY |
| Per-agent scratchpad | ✅ | overkill | DIY |
| Auto-extract relevant facts | ✅ | indirect | ❌ |
| Strong tenant + provenance for company facts | ⚠️ | ✅ | ✅ |
| Suitable as the *primary* business brain | ❌ | ✅ | ⚠️ |

Mem0 is the right shape for personalisation; the wrong shape for the company source of truth. We use it for personalisation only, with an explicit promotion pipeline into Cognee/Graphiti for facts that turn out to matter business-wide.

## Why Postgres / Supabase as the system of record

- **Authoritative** — graph + vector layers are derived; SoR is the truth.
- **Row-level security** — tenant boundaries enforced at the row, not just the app.
- **Audit log** — append-only, queryable, exportable.
- **Operational maturity** — backups, PITR, replication, well-understood.
- **Supabase** adds auth, RBAC, storage, edge functions for free if you want it.

## What the original repo was missing — concretely

| Gap | Why it matters | Filled by |
|---|---|---|
| No data plane | All knowledge lived in static markdown | `brain/graph/`, `brain/memory/` |
| No ingestion | No way to bring in real business documents | `brain/connectors/` |
| No ontology | No shared vocabulary across agents | `brain/ontology/` |
| No API | No stable contract for agents to consume | `brain/api/` |
| No agents | "Agent-agnostic" but no actual agent definitions for domains | `brain/agents/` |
| No audit | No record of who saw or changed what | `brain/audit/` |
| No tenancy | Single-business assumption baked in | `brain/governance/`, `migrations/` |
| No deployment | No path from markdown to running system | `infra/`, `docs/rollout/` |
| No temporal model | Cannot answer point-in-time questions | Graphiti |
| No personal vs company split | Risk of polluting company brain | Mem0 + promotion pipeline |
| No security model | No RBAC, no provenance, no data lifecycle | `docs/governance/` |

Everything the template kit did well — voice, audience, brand consistency — is preserved and now feeds into the brain as first-class context.
