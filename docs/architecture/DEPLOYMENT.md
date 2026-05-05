# Deployment topology

## Environments

| Env | Purpose | Notes |
|---|---|---|
| `local` | Developer laptops | docker-compose, single-tenant, sample data |
| `pilot` | One real business unit, one tenant | hardened auth, real connectors, monitored |
| `prod` | Multi-tenant production | HA Postgres, HA graph backend, full observability |

## Components and where they run

| Component | Local | Pilot | Prod |
|---|---|---|---|
| Brain API (FastAPI) | docker-compose | container on VM / ECS | k8s deployment |
| Workers | docker-compose | container on VM / ECS | k8s deployment with HPA |
| Postgres / Supabase | container | managed (Supabase / RDS) | managed, multi-AZ, PITR |
| Cognee | container | managed VM | k8s statefulset or managed |
| Graphiti backend (Neo4j) | container | managed VM | managed Neo4j Aura or k8s |
| Mem0 store | container | managed | managed |
| Object store | local volume | S3 / Azure Blob / SharePoint | S3 / Azure Blob |
| Observability | none | Grafana Cloud free tier | self-hosted or managed |

## Network and isolation

- Brain API behind authenticated reverse proxy (Cloudflare / Azure Front Door / ALB).
- Workers in a private subnet; no inbound public access.
- Cognee, Graphiti, Mem0 only reachable from API and worker subnets.
- Postgres only reachable from API, workers, and admin bastion.
- Connectors run inside workers; outbound traffic to Microsoft / Plexa goes through a single egress proxy with allow-listed domains for audit.

## Secrets

Never committed. Loaded from:

- Local: `.env` (gitignored).
- Pilot: cloud secret manager (AWS Secrets Manager / Azure Key Vault).
- Prod: cloud secret manager + per-pod IAM / managed identity.

Rotation cadence in [`docs/governance/RBAC.md`](../governance/RBAC.md).

## Backups

| Store | Backup | Retention | Restore SLO |
|---|---|---|---|
| Postgres | PITR + daily snapshot | 35 days | 1 h |
| Cognee data | Daily snapshot of underlying volume | 30 days | 4 h |
| Graphiti (Neo4j) | Daily dump | 30 days | 4 h |
| Mem0 | Daily snapshot | 14 days | 24 h |
| Object store | Versioning enabled | 90 days | n/a |

See [`docs/governance/BACKUPS.md`](../governance/BACKUPS.md).

## Scaling guidance

- API: stateless — scale on RPS.
- Workers: scale on queue depth; ingestion is bursty.
- Cognee: scale storage independently of compute; embedding workers can be split out.
- Graphiti: vertical scaling first; sharding only at very large scale.
- Postgres: read replicas for `/audit` and reporting; primary stays small.
