# Tenancy

## Model

Multi-tenant single-deployment by default. Each tenant gets:

- A `tenant_id` (UUID).
- A logical isolation boundary across Postgres (RLS), Cognee (tenant scoping), Graphiti (graph or namespace per tenant), Mem0 (`tenant_id` on every call), object store (prefix), and audit (partition).

## Levels of isolation

| Level | What it means | When to use |
|---|---|---|
| **Logical** | Single deployment, RLS + scoping | Default for most tenants |
| **Schema** | Dedicated Postgres schema per tenant | Tenants with strict separation requirements |
| **Cluster** | Dedicated deployment per tenant | Highly regulated tenants, customer-managed keys |

Tier upgrades are operational changes, not architectural ones — the code path is identical.

## Boundary enforcement points

1. **API auth** — request must carry `tenant_id`; identity must be entitled to it.
2. **Service layer** — every service function takes `tenant_id` explicitly; no globals.
3. **Postgres** — RLS policies on all multi-tenant tables; CI test runs cross-tenant queries and asserts they fail.
4. **Cognee** — tenant id propagated to every Cognee call; the wrapper rejects calls without it.
5. **Graphiti** — separate graph per tenant (preferred) or strict namespace.
6. **Mem0** — `tenant_id` mandatory; per-tenant collection.
7. **Object store** — bucket prefix per tenant; IAM policies prevent cross-prefix reads.

## Adversarial test

Every CI run executes:

```
1. Insert a row in tenant A.
2. Authenticate as tenant B.
3. Attempt every read endpoint with A's IDs.
4. Expect 0 results, no errors revealing existence.
5. Repeat for graph, vector, and Mem0 layers.
```

This test gates merges to `main`.

## Onboarding a new tenant

1. Create tenant row + assign owning admin user.
2. Provision per-tenant credentials (Cognee scope, Graphiti graph, Mem0 collection).
3. Configure connectors (or connect via OAuth).
4. Seed roles.
5. Run smoke ingestion of one folder.
6. Verify cross-tenant adversarial test still passes with the new tenant present.
7. Hand over to tenant admin.

## Offboarding

1. Mark tenant as `offboarding`.
2. Suspend all connectors and agent identities.
3. Export tenant data on request (encrypted bundle).
4. Hard-delete from Postgres, Cognee, Graphiti, Mem0, object store within agreed SLA.
5. Update audit retention policy if the tenant data must persist for regulatory hold.
6. Final audit export delivered to tenant admin.
