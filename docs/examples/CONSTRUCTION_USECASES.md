# Construction use cases

A catalogue of high-leverage tasks the Superbrain enables for a construction business.

## Tender phase

- **Bid/no-bid qualification** — pull prior similar projects, win/loss patterns, and current capacity.
- **Scope-gap detection** — compare an incoming RFP scope to the company's track record and flag gaps.
- **Pricing benchmarks** — find historical unit rates and adjustments by region and trade.
- **Compliance pre-flight** — check RFP against the company's compliance posture (insurance, certifications, safety record).

## Award and mobilisation

- **Contract clause Q&A** — citations from contract + amendments + correspondence.
- **Obligation register** — extract every "the Contractor shall…" with owner and due date.
- **Risk register seeding** — propose risks based on contract clauses, prior project lessons, and known site conditions.

## Design and procurement

- **Drawing register hygiene** — detect missing revisions, orphaned drawings, RFI references to obsolete revisions.
- **RFI triage** — group RFIs by drawing, by trade, by responsiveness; flag overdue items.
- **Subcontractor recommendation** — rank past performers per trade with evidence (claims, defects, on-time rate).
- **Package assembly** — build subcontract package scope from drawings, specs, and BOQ with traceability.

## Site delivery

- **Daily report digest** — convert free-text daily reports into structured decisions, risks, and observations.
- **Safety trend surfacing** — group near-misses and incidents over time; flag clusters.
- **Variation impact assessment** — compute time and cost impact with reference to the contract.
- **Meeting minute extraction** — turn minutes into Decisions with attendees, alternatives, and supersessions.

## Claims and close-out

- **Progress claim drafting** — assemble claim from contract value, variations, prior claims, and supporting docs.
- **Delay analysis** — Graphiti time-slice the project program against actuals.
- **Lessons learned capture** — interview project teams; structure into `LessonLearned` entities reusable on future tenders.

## Cross-project capabilities

- **"What do we know about client X?"** — projects, contacts, claims paid/disputed, contract types, past disputes.
- **"What do we know about subcontractor Y?"** — performance per trade, claim history, defect rate, areas of strength.
- **"What did we decide and why?"** — point-in-time decision log with full rationale chains.

Each of these maps to one or more agents in [`RELD_CELESTE_AGENTS.md`](RELD_CELESTE_AGENTS.md). Agents do not duplicate brain logic — they orchestrate API calls and apply voice.
