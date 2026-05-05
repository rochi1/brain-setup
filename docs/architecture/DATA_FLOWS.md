# Data flows

## Ingestion

```
 Source system (Microsoft Graph / Plexa / FS / Outlook / Webhook)
      │
      ▼
 Connector (brain/connectors/<source>)
      │   normalises to ontology, writes raw artefact reference
      ▼
 Ingestion job (brain/workers/ingest.py)
      │
      ├── Postgres: Document row + provenance
      ├── Object store: blob copy if required
      ├── Cognee.add(): chunks, embeds, builds graph
      ├── Graphiti.add_episode(): time-stamped facts
      └── Audit: ingestion_run + per-entity events
```

### Idempotency

Every connector returns a stable `(source_connector, source_uri, source_hash)` tuple. The ingestion worker upserts on that key and skips work when the hash is unchanged.

### Failure handling

- Connector errors are retried with exponential backoff up to N attempts, then dead-lettered.
- Cognee/Graphiti writes are wrapped in a saga: if Graphiti fails after Cognee succeeded, the Cognee write is marked `pending_temporal` and re-attempted.
- Provenance is written **before** Cognee/Graphiti, so an orphaned Postgres row is the worst-case state.

## Query

```
 Agent / API caller
      │
      ▼
 POST /search { tenant, scope, question, as_of? }
      │
      ▼
 Tenant + RBAC resolution (brain/governance)
      │
      ▼
 Hybrid retrieval orchestrator (brain/graph/hybrid.py)
      │
      ├── Cognee.search()      ← graph + vector
      ├── Graphiti.query()     ← temporal facts (uses `as_of`)
      └── Mem0.search()        ← personal/agent context
      │
      ▼
 Merge + rank + attach provenance
      │
      ▼
 Response: { hits[], facts[], context, provenance, audit_id }
```

### `as_of`

If the caller supplies `as_of: 2025-09-12T17:00:00Z`, Graphiti returns only facts whose validity interval contains that timestamp, and Cognee chunks are filtered by `created_at <= as_of`.

## Project context

```
 GET /project-context/{project_id}
      │
      ▼
 Resolve project + tenant + RBAC
      │
      ▼
 Load:
   - Project entity + status
   - All linked entities (contracts, RFIs, variations, claims, meetings, decisions, risks)
   - Recent documents (top N by recency or relevance)
   - Open items (RFIs, claims, risks) with current status
   - Temporal slice (Graphiti) of decisions and status changes
   - Personal/agent memory relevant to this project (Mem0)
      │
      ▼
 Compact, ranked, provenance-tagged context blob ready for an LLM prompt
```

This is the single endpoint every domain agent should use to "warm up" before answering a project-specific question.

## Memory promotion

```
 Mem0 fact ("user prefers metric units")  ── stays in Mem0
 Mem0 fact ("RFI-247 was answered by site team on 2025-09-21")
                       │
                       │ flagged as company-relevant
                       ▼
              POST /promote-memory
                       │
                       ▼
       Validation: tenant scope, provenance, confidence
                       │
                       ▼
        Cognee.add(entity) + Graphiti.add_episode()
                       │
                       ▼
              Audit: promotion event
```

Promotion is **never silent** — it always emits an audit event and requires a documented source.

## Audit

Every read and write produces an audit event:

```
{
  "audit_id": "uuid",
  "ts": "2025-11-04T09:12:33Z",
  "tenant_id": "...",
  "actor": { "type": "user|agent|system", "id": "..." },
  "action": "search|ingest|read|write|promote|delete",
  "scope": { "project_id": "...", "entity_id": "..." },
  "purpose": "free-text or structured",
  "request_hash": "...",
  "result_summary": "..."
}
```

Audit events are append-only, written to Postgres, and exportable to a SIEM.
