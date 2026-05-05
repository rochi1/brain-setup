# Observability

## Three pillars

### Traces (OpenTelemetry)

Every API request generates a span. Spans propagate into:

- Service-layer calls.
- Cognee / Graphiti / Mem0 client calls (with backend tags).
- Postgres queries.
- Worker jobs (linked via trace context).

Recommended backend: any OTLP-compatible — Tempo, Honeycomb, Datadog, Grafana Cloud Traces.

### Metrics (Prometheus)

Required metrics per service:

- `brain_http_requests_total{route,method,status,tenant}`
- `brain_http_request_duration_seconds{route}`
- `brain_search_results_count{tenant}`
- `brain_ingestion_items_total{connector,tenant,status}`
- `brain_ingestion_lag_seconds{connector,tenant}`
- `brain_worker_queue_depth{queue}`
- `brain_cognee_call_duration_seconds{op}`
- `brain_graphiti_call_duration_seconds{op}`
- `brain_mem0_call_duration_seconds{op}`
- `brain_audit_events_written_total{action}`
- `brain_rbac_denials_total{tenant,role,action}`

### Logs (structured JSON)

Every log line carries:

- `trace_id`, `span_id`
- `tenant_id` (when known)
- `actor_id` (when known)
- `request_id`
- `severity`
- `event` (machine-readable name)

Logs **never** include raw business content — only IDs and counts. Content stays in the data plane.

## Dashboards (recommended)

| Dashboard | Purpose |
|---|---|
| **Brain — API** | RPS, latency p50/p95/p99, error rate, by route and tenant |
| **Brain — Ingestion** | Items ingested, lag, failures, per connector and tenant |
| **Brain — Stores** | Cognee/Graphiti/Mem0/Postgres latency and error rates |
| **Brain — Tenancy** | RBAC denials, cross-tenant query attempts, audit volume |
| **Brain — Cost** | Token spend, embedding spend, per agent and tenant |

## Alerts

| Alert | Threshold | Page |
|---|---|---|
| API error rate | > 2% over 5 min | yes |
| Search p95 latency | > 5 s over 10 min | yes |
| Ingestion lag | > 1 h for any active connector | yes |
| Worker queue depth | > 1000 sustained 15 min | yes |
| Audit write failures | any | yes (page immediately) |
| RBAC denials spike | > 5x baseline | warn (possible attack) |
| Backup job failure | any | page |
| Daily restore drill failure | any | page |

## Ownership

Each dashboard has a named owner and a runbook in `docs/runbooks/` (create when they exist).
