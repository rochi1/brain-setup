# Audit

## What gets audited

Everything that touches business data. No exceptions.

| Event class | Examples |
|---|---|
| **Read** | `/search`, `/project-context`, `/agent-memory` reads, fact lookups |
| **Write** | Ingestion runs, manual entity edits, decision recording |
| **Promote** | Mem0 → Cognee/Graphiti promotions |
| **Admin** | Role grants, connector configuration, secret rotation |
| **Auth** | Logins, token issuance, failed auth |
| **Delete** | Hard deletes, retention enforcement, DSAR fulfilments |

## Event shape

```json
{
  "audit_id": "uuid",
  "ts": "ISO-8601 UTC",
  "tenant_id": "uuid",
  "actor": {
    "type": "user|agent|connector|system",
    "id": "uuid",
    "subject": "human-readable"
  },
  "action": "search|ingest|read|write|promote|delete|admin|auth",
  "scope": {
    "project_id": "uuid?",
    "entity_type": "string?",
    "entity_id": "uuid?"
  },
  "purpose": "free-text or structured",
  "request": {
    "method": "GET|POST|...",
    "path": "/search",
    "hash": "sha256 of normalised request body"
  },
  "result": {
    "status": "ok|error",
    "summary": "string",
    "result_count": 12
  },
  "provenance_refs": ["uuid", "..."],
  "client": {
    "ip": "string",
    "user_agent": "string"
  }
}
```

## Storage

- Append-only Postgres table `audit_event`.
- DB-level constraint: no `UPDATE` or `DELETE` allowed (enforced by trigger).
- Daily export to S3 / Azure Blob with object lock for compliance retention.
- Optional streaming sink to a SIEM (Splunk, Sentinel, Datadog).

## Retention

| Tier | Retention | Storage |
|---|---|---|
| Hot (queryable) | 90 days | Postgres |
| Warm | 1 year | Object store (compressed JSON) |
| Cold | 7 years | Object store with object lock |

Retention is configurable per tenant for compliance reasons.

## Querying

`GET /audit` supports:

- `tenant_id` (required, scoped to caller's tenants)
- `actor_id`, `action`, `scope.project_id`, `scope.entity_id`
- `from`, `to` time range
- `limit`, `cursor`

Auditors (`role: auditor`) can read across actors but not see the underlying business data; the audit row is enough to reconstruct what happened, not the answer the user saw.

## Integrity

- Each event includes a `prev_hash` chained from the prior event for the same `(tenant_id, day)` partition.
- Tamper-evident: any modification breaks the chain and is detected by a daily verification job.

## What auditors can see vs. what they cannot

| Visible to auditor | Not visible to auditor |
|---|---|
| Who searched, when, with what request hash | The literal answer text shown to the user |
| Which entities were read or written | The full content of those entities |
| Connector run summaries | The raw documents themselves |
| Role and scope grants | Per-user personal Mem0 contents |

This separation is intentional: auditors verify *behaviour*; data access is governed by RBAC, not the audit role.
