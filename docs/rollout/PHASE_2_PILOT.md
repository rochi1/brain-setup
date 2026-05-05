# Phase 2 — Production pilot (6–10 weeks)

**Goal:** put the brain in front of real users on one business unit. Multiple agents, real connectors, real RBAC.

## Scope additions over Phase 1

- 3+ agents live (Tenders + Contracts + one of BOQ/Design/Site).
- Microsoft Graph connector with real OAuth, ingesting SharePoint + Outlook.
- Plexa connector for project data.
- Graphiti integrated for temporal queries.
- Mem0 for per-user personalisation, with explicit promotion pipeline.
- RBAC with roles, scopes, and tenant boundaries.
- Audit events streamed to a SIEM-compatible sink.
- Observability: traces in OpenTelemetry, metrics in Prometheus, dashboards in Grafana.
- Backups and restore drills.

## Success criteria

- Users say the brain saves them time on at least 3 recurring tasks.
- 95th-percentile `/search` latency under 2 s for warm queries.
- Zero cross-tenant leakage in adversarial tests.
- Restore drill from yesterday's backup succeeds in under 4 h.
- All facts surfaced to users carry provenance; ungrounded answers are rejected by the agent.
- Personal memory (Mem0) never leaks into company answers without explicit promotion.

## Hardening checklist

- [ ] Postgres RLS policies enabled on every multi-tenant table; CI test verifies.
- [ ] API rate limits per tenant.
- [ ] Per-agent API keys, not shared.
- [ ] Audit log append-only at the DB level.
- [ ] Secrets rotated on a schedule documented in `docs/governance/RBAC.md`.
- [ ] PII detection + redaction step before facts enter Cognee.
- [ ] Document deletion request path: deletes from Postgres + Cognee + Graphiti + Mem0 within SLA.
- [ ] Backup + restore drill executed and timed.
- [ ] OpenTelemetry traces flowing end-to-end.
- [ ] Grafana dashboards for: ingestion lag, search latency, error rate, tenant query mix.
- [ ] Adversarial cross-tenant test in CI.

## What pilot users do

1. Authenticate against the brain (SSO).
2. Use the agents inside their existing tools (Outlook plug-in, Teams app, internal chat, or a thin web UI).
3. Provide structured feedback — thumbs up/down + comment — captured in Postgres for review.
4. Flag bad answers; flagged answers go into a triage queue with full audit trail.

## Exit criteria into Phase 3

- Two consecutive weeks with no critical incidents.
- Backup/restore drill completed.
- Adversarial tests passing.
- Pilot users sign off in writing.
