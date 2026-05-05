# Architecture Overview

## Goal

A **single, queryable, auditable brain** for the entire business — every project, contract, person, drawing, RFI, decision, and lesson learned — accessible to humans and to specialised agents through one stable API.

## Design principles

1. **One brain, many readers.** Every agent reads from and writes to the same knowledge core; no agent owns its own private silo.
2. **Graph-first, not chunk-first.** Entities and relationships are the primary representation; embeddings are an index, not the truth.
3. **Time is a first-class dimension.** Facts have validity intervals; the brain can answer "what was true on date X."
4. **Personal memory ≠ company memory.** Mem0 holds user/agent preferences and short-term scratch; Cognee holds the company truth.
5. **Provenance always.** Every fact carries source document, ingestion run, extractor version, and confidence.
6. **Tenant boundaries are enforced in the data model**, not just the API.
7. **Audit is non-optional.** Every read and write is logged with actor, scope, and purpose.
8. **Self-hostable.** No SaaS lock-in. All components run on customer infrastructure.

## High-level diagram

```
                      ┌──────────────────────────────────────────────┐
                      │                  Agents                      │
                      │  Tenders · BOQ · Contracts · Design · ...    │
                      │  (Claude / Perplexity / OpenAI orchestrators)│
                      └──────────────┬───────────────────────────────┘
                                     │ stable HTTP API
                      ┌──────────────▼───────────────┐
                      │       Brain API (FastAPI)    │
                      │  /ingest /search /project-   │
                      │  context /agent-memory /audit│
                      └─┬─────────┬────────┬─────────┘
                        │         │        │
              ┌─────────▼──┐  ┌───▼────┐  ┌▼────────────┐
              │  Cognee    │  │Graphiti│  │   Mem0      │
              │ company    │  │temporal│  │ user/agent  │
              │ brain      │  │ graph  │  │ memory      │
              │ (graph +   │  │ (time- │  │ (prefs,     │
              │  vector)   │  │ aware) │  │  scratch)   │
              └─────┬──────┘  └───┬────┘  └─────────────┘
                    │             │
              ┌─────▼─────────────▼──────┐
              │     System of Record     │
              │  Postgres / Supabase     │
              │  (RBAC, RLS, audit log)  │
              └─────────────┬────────────┘
                            │
              ┌─────────────▼─────────────────────────────┐
              │            Connectors / Ingestion         │
              │  Microsoft Graph · SharePoint · OneDrive  │
              │  Outlook · Plexa · Filesystem · Webhooks  │
              └───────────────────────────────────────────┘
```

## Components

### 1. Cognee — the company brain (core)

Cognee is the default backbone because it gives, in one engine:

- Hybrid graph + vector retrieval.
- Persistent, durable storage with traceable ingestion runs.
- Cross-agent knowledge sharing (no per-agent silo).
- Tenant isolation primitives.
- Self-hostable with multiple storage backends.

Used for:

- Document ingestion and chunking.
- Entity extraction and relationship building.
- Semantic search across the corpus.
- The default answer to *"what does the company know about X?"*

### 2. Graphiti — the temporal business graph

Cognee's graph captures *what is*; Graphiti captures *what was, when, and why it changed*. Critical for:

- Project timelines (tender → award → contract → variation → claim → close-out).
- RFI / variation / claim chains where dates and order matter.
- Subcontractor performance over time.
- Decision provenance ("we approved this scope on 2025-09-12, then varied it on 2025-11-03").
- Point-in-time queries: *"What did we know about RFI-247 before the November site meeting?"*

### 3. Mem0 — personal / agent memory

Mem0 is **not** the company brain. It holds:

- User preferences ("Sandra prefers cost summaries in AUD, not USD").
- Per-agent short-term scratch ("Tenders agent is currently working on Bid #4421").
- Conversation continuity across sessions.

Mem0 entries that turn out to be company-relevant facts get **promoted** into Cognee/Graphiti through an explicit pipeline — they do not silently leak into the company brain.

### 4. Postgres / Supabase — system of record

The authoritative store for:

- Business records (projects, contacts, contracts) when sourced from internal apps.
- RBAC: roles, scopes, tenant assignments.
- Row-level security on every multi-tenant table.
- Audit log (append-only).
- Job state for workers.
- A pgvector fallback for environments where Cognee's vector store is not yet provisioned.

### 5. Object store

S3 / Azure Blob / SharePoint hold the source documents, drawings, photos, and email attachments. The brain stores **references and extracted content**, never the only copy of an artefact.

### 6. Connectors

Each connector implements one interface (`brain/connectors/base.py`) and one job: pull data from a source, normalise it into the ontology, hand it to the ingestion pipeline.

Initial connectors:

- **Microsoft Graph** — SharePoint, OneDrive, Teams files.
- **Outlook** — emails, calendar, contacts.
- **Plexa** — project management data (projects, tasks, RFIs, variations).
- **Supabase** — internal app tables.
- **Filesystem** — local folders for bulk loads and migration.

### 7. Ontology

The shared vocabulary across agents and connectors. See [`ONTOLOGY.md`](ONTOLOGY.md). Core entities:

`Project · Tender · Client · Contact · Subcontractor · Trade · Document · Drawing · RFI · Variation · Claim · Contract · Meeting · Task · Risk · Decision · LessonLearned`

### 8. Agents

Each domain agent is a thin orchestrator over the brain API. It does not have its own database. Initial agents:

- **Tenders** — bid analysis, qualification, prior-bid lookup.
- **BOQ** — bill of quantities reasoning, comparisons, gap detection.
- **Contracts** — clause Q&A, obligation tracking, variation impact.
- **Design** — drawing register, RFI linkage, design intent capture.
- **Finance** — claims, payment certificates, cashflow.
- **HR** — roles, certifications, availability.
- **Procurement** — subcontractor performance, package planning.
- **Site Management** — daily reports, safety, site decisions.

### 9. API surface

```
POST /ingest                  upload or trigger ingestion of a source
POST /search                  hybrid search (vector + graph + temporal)
GET  /project-context/{id}    full graph context for a project
GET  /agent-memory/{agent_id} read agent personal memory (Mem0)
POST /agent-memory/{agent_id} write agent personal memory
POST /promote-memory          promote Mem0 fact into Cognee/Graphiti
GET  /audit                   query the audit log
GET  /provenance/{fact_id}    trace a fact back to source
```

See [`brain/api/routes/`](../../brain/api/routes/) for the scaffolds.

## Data flow — ingestion

1. Connector pulls source (e.g. SharePoint folder, Plexa export).
2. Worker normalises into ontology (Document, Project, RFI, …).
3. Cognee runs entity extraction + chunking + embedding + graph build.
4. Graphiti receives time-stamped facts (status changes, approvals, decisions).
5. Provenance record written to Postgres (source URL, hash, ingestion run, extractor version).
6. Audit event emitted.

See [`DATA_FLOWS.md`](DATA_FLOWS.md).

## Data flow — query

1. Agent calls `/search` with question, tenant, and scope.
2. API resolves tenant + RBAC.
3. Cognee runs hybrid retrieval; Graphiti adds temporal facts; Mem0 layers personal context.
4. Results merged with provenance attached.
5. Audit event emitted.

## Limitations (current scaffold)

- Cognee/Graphiti/Mem0 client wrappers are interface-shaped but not fully wired to a running instance.
- No Microsoft Graph OAuth flow implemented — the connector defines the contract only.
- No production worker queue chosen — Celery/RQ/Temporal stubs; pick one before pilot.
- No Helm chart yet; `infra/k8s/` has placeholders.
- Test suite covers contracts and ontology validation, not end-to-end ingestion.
- See `docs/rollout/PHASE_2_PILOT.md` for the gap list before pilot.
