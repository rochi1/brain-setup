# Role-based access control

## Principles

- **Default deny.** A user or agent has no access until granted explicitly.
- **Tenant first.** Every check is `(tenant_id, scope, action)` — never just `(user, action)`.
- **Least privilege per agent.** An agent gets only the scopes it needs.
- **Separation of duties.** The agent that ingests is not the agent that promotes facts to the company brain.
- **Auditable.** Every grant, revoke, and assumed-role action is in the audit log.

## Roles (starter set)

| Role | Scope examples | Typical assignee |
|---|---|---|
| `tenant_admin` | manage users, roles, connectors within a tenant | head of business unit |
| `project_lead` | full read/write within owned projects | project manager |
| `contributor` | read tenant + project; write only their own contributions | engineer, estimator, site team |
| `reader` | read-only within tenant | exec, finance, oversight |
| `auditor` | read audit logs; no business data writes | compliance, internal audit |
| `agent_tenders` | read tenant; read project; write tender entities | the Tenders agent identity |
| `agent_contracts` | read tenant; read/write contract + variation entities | the Contracts agent identity |
| `agent_finance` | read tenant; read claims + contracts; write claim drafts | the Finance agent identity |
| `connector_runner` | write Documents + provenance; no read of business answers | the connector worker identity |
| `platform_admin` | platform-wide ops; cannot read tenant business data | SRE / platform team |

## Scopes

Scopes are hierarchical:

```
tenant:{id}
tenant:{id}/project:{id}
tenant:{id}/project:{id}/contract:{id}
tenant:{id}/agent:{id}
```

Permissions are granted at the lowest scope that fits.

## Enforcement layers

1. **API auth middleware** — verifies token, resolves identity, attaches `(tenant_id, role, scopes)` to the request.
2. **Service layer** — refuses to call Cognee/Graphiti/Postgres unless scopes match.
3. **Postgres RLS** — every multi-tenant table has an RLS policy keyed on `tenant_id`. The service layer sets `SET LOCAL app.tenant_id = …` per transaction.
4. **Cognee tenant boundaries** — tenant id passed on every read and write; cross-tenant queries are rejected at the wrapper.
5. **Graphiti** — separate graph or namespace per tenant.
6. **Mem0** — `user_id` and `tenant_id` are mandatory on every call.

## Token lifetimes

| Identity | Token type | Max lifetime | Rotation |
|---|---|---|---|
| Human user | OIDC access token | 1 h | per refresh |
| Agent | service account token | 24 h | nightly |
| Connector worker | service account token | 24 h | nightly |
| Platform admin | hardware-key-backed | 1 h | per session |

## Secret rotation

| Secret | Rotation cadence |
|---|---|
| Database credentials | 90 days |
| OAuth client secrets (Microsoft, Plexa) | 90 days |
| Agent service tokens | 24 h (auto) |
| Webhook signing keys | 30 days |
| Encryption keys (CMK) | 365 days, with envelope re-encrypt |

## Adding a new role

1. Add to `seed/roles.json`.
2. Add scope template to `brain/governance/roles.py`.
3. Add a CI test asserting the role cannot read or write outside its scopes.
4. Document the addition in this file.
