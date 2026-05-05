# Kubernetes (placeholder)

Production deployments use Kubernetes. This directory is intentionally empty
in the scaffold — pick one of:

- **Helm charts** owned per-component (api, worker, postgres, neo4j, cognee, mem0).
- **Kustomize** overlays for `pilot` and `prod`.
- A managed offering for stateful components (RDS / Aurora / Neo4j Aura) with
  Helm only for the stateless API + worker.

Build out before [`docs/rollout/PHASE_3_ENTERPRISE.md`](../../docs/rollout/PHASE_3_ENTERPRISE.md).
