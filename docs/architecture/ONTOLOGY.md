# Ontology

The shared vocabulary that every connector, agent, and graph layer agrees on.

If something cannot be expressed in this ontology, the ontology is wrong — fix it here first, then propagate to the connectors and agents.

## Core entities

| Entity | Purpose | Key relationships |
|---|---|---|
| **Project** | A delivered piece of work for a client | client, tenders, contracts, documents, RFIs, variations, claims, meetings, risks, decisions, lessons |
| **Tender** | A bid opportunity, won or lost | project (if awarded), client, documents, decisions |
| **Client** | An organisation that buys from us | projects, contacts, contracts |
| **Contact** | A person at a client, subcontractor, or internal team | organisation, role, projects |
| **Subcontractor** | An external trade or service provider | trades, contracts, packages, performance |
| **Trade** | A discipline (electrical, mechanical, joinery, …) | subcontractors, BOQ items |
| **Document** | Any source artefact — PDF, email, drawing, spec | project, source connector, provenance |
| **Drawing** | A drawing with revision history | project, document, RFIs |
| **RFI** | Request for information | project, raised_by, responded_by, documents |
| **Variation** | Change in scope, price, time | project, contract, decision |
| **Claim** | A monetary or time entitlement | project, contract, supporting documents |
| **Contract** | A signed agreement | project, client or subcontractor, clauses, variations, claims |
| **Meeting** | A point-in-time conversation with attendees and decisions | project, attendees, decisions |
| **Task** | A unit of work | project, owner, status |
| **Risk** | An identified threat or opportunity | project, owner, status, mitigation |
| **Decision** | A recorded choice with rationale | project, decided_by, alternatives, supersedes |
| **LessonLearned** | A retrospective insight | project, theme, applies_to_future_projects |

## Edge types (selected)

```
Project ─[HAS_TENDER]→ Tender
Project ─[FOR_CLIENT]→ Client
Project ─[HAS_CONTRACT]→ Contract
Project ─[HAS_DOCUMENT]→ Document
Project ─[HAS_RFI]→ RFI
Project ─[HAS_VARIATION]→ Variation
Project ─[HAS_CLAIM]→ Claim
Project ─[HAS_RISK]→ Risk
Project ─[HAS_DECISION]→ Decision
Project ─[HAS_LESSON]→ LessonLearned
RFI ─[REFERS_TO_DRAWING]→ Drawing
Variation ─[AMENDS]→ Contract
Claim ─[SUPPORTED_BY]→ Document
Decision ─[SUPERSEDES]→ Decision
Subcontractor ─[DELIVERS_TRADE]→ Trade
Subcontractor ─[ON_PROJECT]→ Project
Contact ─[WORKS_AT]→ Client | Subcontractor | InternalTeam
Document ─[INGESTED_FROM]→ ConnectorRun
```

## Temporal facts (Graphiti)

Every entity above can carry **time-stamped facts** with validity intervals:

- `Project.status = "in delivery" valid [2025-08-01, 2025-11-30]`
- `RFI-247.status = "open" valid [2025-09-12, 2025-09-21]`
- `Subcontractor X.rating = 4 valid [2024-01-01, 2025-06-30]`
- `Contract C.value = 4_200_000 valid [2025-04-01, 2025-09-15]` (then varied)

This lets the brain answer:

- *"What did we know about RFI-247 before the November site meeting?"*
- *"Which subcontractors were rated 4+ during 2024?"*
- *"What was the contract value at the time of variation 12?"*

## Provenance fields (every entity, every fact)

```
source_connector       e.g. "microsoft_graph", "plexa", "filesystem"
source_uri             e.g. "https://contoso.sharepoint.com/sites/.../doc.pdf"
source_hash            content hash for change detection
ingestion_run_id       FK to the ingestion run that produced it
extractor_version      version of the extractor that produced it
confidence             0.0–1.0
tenant_id              FK to tenant
created_at, updated_at
```

## Tenant scoping

Every entity is `tenant_id`-scoped at the database row level. There is no "global" entity except a small set of platform-owned reference data (e.g. countries, currencies). Cross-tenant joins are forbidden at the query layer and at the RLS policy layer.

## Extending the ontology

1. Add the entity class to `brain/ontology/entities.py`.
2. Add edges to `brain/ontology/edges.py`.
3. Add a Postgres migration in `migrations/`.
4. Update the seed in `seed/ontology.json`.
5. Update connectors that produce the new entity.
6. Update this document.

The ontology is owned by the platform team, not individual agents.
