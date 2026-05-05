# Backups, retention, and data lifecycle

## Backup matrix

| Store | Method | Frequency | Retention | RPO | RTO |
|---|---|---|---|---|---|
| Postgres | PITR + nightly snapshot | continuous + daily | 35 days | 5 min | 1 h |
| Cognee data volume | Snapshot | daily | 30 days | 24 h | 4 h |
| Graphiti (Neo4j) | `neo4j-admin dump` | daily | 30 days | 24 h | 4 h |
| Mem0 | Export job | daily | 14 days | 24 h | 24 h |
| Object store | Versioning + cross-region replication | continuous | 90 days | seconds | minutes |
| Audit log | Daily export to object lock | daily | 7 years | 24 h | 24 h |

## Restore drills

- **Monthly:** automated restore of yesterday's Postgres snapshot to a staging environment; smoke test runs and is asserted to pass.
- **Quarterly:** full disaster-recovery drill across Postgres + Cognee + Graphiti, timed against the RTOs above.
- **Annually:** simulated total loss of primary region; cold restore to secondary region.

Drill outcomes are recorded as audit events and reported to the owner.

## Data lifecycle policies

| Data | Lifecycle |
|---|---|
| Raw source documents | Retained per tenant policy (default 7 years); archived to cold storage after 1 year of inactivity |
| Cognee derived chunks | Re-derivable; recompute rather than back up indefinitely |
| Graphiti facts | Retained while the parent project is active + 7 years |
| Mem0 personal memory | Retained while the user is active; deleted on offboarding within 30 days |
| Audit log | 7 years (object lock) |
| Logs / traces | 30 days hot, 90 days cold |

## Right-to-be-forgotten

When a deletion is requested:

1. Identify all subject data across Postgres, Cognee, Graphiti, Mem0, object store.
2. Hard delete from primary stores.
3. Mark backups for redaction at next restore (because rewriting historical backups is impractical and often non-compliant).
4. Emit a deletion audit event.
5. Confirm to requestor with reference to the audit event.

If a legal hold conflicts with a deletion request, the legal hold wins and the requestor is informed.

## Encryption

- At rest: AES-256 on every store, customer-managed keys optional for tier-1 tenants.
- In transit: TLS 1.3, mTLS between API and internal services.
- Backup blobs: encrypted with a separate key from the live data.

## Verification

- Daily: integrity check on the audit chain.
- Weekly: backup integrity check (sample restore + count verification).
- Monthly: full restore drill (see above).

## Owner

A named individual is the **backup owner** for each tenant tier and is paged on backup failure or drill failure. Documented in the tenant runbook, not in this file.
