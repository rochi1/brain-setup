# Phase 3 — Enterprise hardening (ongoing)

**Goal:** scale to all business units, all agents, full compliance footprint.

## Scope additions

- Multi-tenant onboarding self-service.
- All eight agents in `brain/agents/` live.
- Connectors complete: Microsoft Graph, Outlook, Plexa, Supabase, filesystem, plus any business-specific systems.
- Region-pinned data residency where required (AU, EU, US).
- High availability across all stateful components.
- Automated retention enforcement.
- Compliance evidence pack (SOC 2 / ISO 27001 / GDPR / industry-specific).
- Cost attribution per tenant.

## Capability targets

| Area | Target |
|---|---|
| Availability | 99.9% monthly for the API |
| RPO | 5 min |
| RTO | 1 h for API, 4 h for graph backends |
| Cross-tenant leakage | 0 (verified in CI + quarterly red-team) |
| Audit completeness | 100% of reads + writes + admin actions |
| Backup verification | Automatic monthly restore drill |
| Patch SLA | Critical CVE within 7 days |

## Governance and compliance

- Data Processing Agreements signed with each tenant.
- Sub-processor list maintained in `docs/governance/SUBPROCESSORS.md` (create when relevant).
- DSAR (data subject access request) workflow documented and rehearsed.
- Right-to-be-forgotten: hard delete across Postgres, Cognee, Graphiti, Mem0, object store, backups (subject to retention law).
- Encryption at rest on all stores; TLS 1.3 in transit.
- Customer-managed keys (CMK) optional for tier-1 tenants.

## Cost discipline

- Per-tenant cost dashboard: ingestion volume, storage, query volume, embedding tokens.
- Per-agent token budget with alerts.
- Monthly review of unused tenants / projects for archival.

## Continuous improvement

- Quarterly ontology review.
- Monthly model upgrade review (Claude / Perplexity / OpenAI versions).
- Weekly review of flagged answers.
- Bi-weekly review of ingestion failures and connector health.
