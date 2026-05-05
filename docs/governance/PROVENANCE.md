# Provenance

## Why

Every fact the brain surfaces must be traceable to:

- The source artefact (document, email, drawing, system record).
- The connector run that ingested it.
- The extractor version that produced it.
- The confidence assigned at extraction.
- The actor (user, agent, system) that recorded it, if it was created in-app.

If a fact has no provenance, it does not enter the brain.

## Schema

Stored on every entity and every fact:

```
source_connector       text         # 'microsoft_graph', 'plexa', 'filesystem', 'manual'
source_uri             text         # canonical URL or path
source_hash            text         # sha256 of source content
ingestion_run_id       uuid         # FK to ingestion_run
extractor_version      text         # e.g. 'pdf-extractor@1.4.2'
confidence             numeric(3,2) # 0.00–1.00
recorded_by            uuid         # actor id
recorded_at            timestamptz
tenant_id              uuid
```

## Ingestion run record

```
ingestion_run:
  id, tenant_id, connector, started_at, finished_at,
  status, items_seen, items_ingested, items_skipped, items_failed,
  config_snapshot_hash, error_summary
```

Every run is queryable; every entity points back to its run.

## Surfacing provenance to the user

API responses always include a `provenance` block per fact:

```json
{
  "fact": "RFI-247 was responded to on 2025-09-21 by Site Team B",
  "provenance": [
    {
      "source": "RFI_247_response.pdf",
      "uri": "https://contoso.sharepoint.com/.../RFI_247_response.pdf",
      "page": 1,
      "section": "Response",
      "ingestion_run_id": "…",
      "confidence": 0.92
    }
  ]
}
```

Agents are required to surface provenance whenever they show a sourced fact.

## Conflicts

If two sources contradict, the brain returns **both** with their provenance and lets the caller decide. It does not silently pick a winner. Conflict resolution rules are domain-specific and live in the agent layer, not the core.

## Manual entries

Facts entered by a human (e.g. a recorded decision) get:

- `source_connector = "manual"`
- `recorded_by = <user_id>`
- `confidence = 1.0` (humans assert, not infer)
- A free-text `purpose` field captured at write time.

## Promotion from Mem0

When a Mem0 fact is promoted into Cognee/Graphiti, provenance includes:

- `source_connector = "mem0_promotion"`
- `mem0_fact_id` reference
- `promoted_by` (the actor that approved promotion)
- The original source that justified the promotion (if any).

Silent promotion is forbidden.
