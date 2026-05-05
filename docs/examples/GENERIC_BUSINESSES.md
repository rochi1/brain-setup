# Generic business shapes

The Superbrain is not construction-specific. The same architecture maps cleanly onto:

## Professional services (consulting, legal, accounting)

| Construction term | Equivalent here |
|---|---|
| Project | Engagement / matter |
| Tender | Proposal / RFP response |
| RFI | Information request from client |
| Variation | Scope change |
| Claim | Invoice / billing dispute |
| Subcontractor | Sub-consultant / counsel |
| Drawing | Deliverable artefact |
| Decision | Strategic recommendation, advice memo |

Same ontology, different labels.

## Software & SaaS

| Construction term | Equivalent here |
|---|---|
| Project | Account / customer implementation |
| Tender | Sales opportunity |
| RFI | Technical question, support ticket |
| Variation | Custom requirement / SOW change |
| Drawing | Design doc / architecture diagram |
| Decision | ADR (architecture decision record) |
| Subcontractor | Implementation partner |

The temporal graph is especially useful for tracking customer implementation milestones, support escalation paths, and ADR supersessions.

## Manufacturing

| Construction term | Equivalent here |
|---|---|
| Project | Product line / production run |
| Tender | Customer quote |
| RFI | Engineering change request |
| Variation | ECN (engineering change notice) |
| Drawing | CAD revision |
| Subcontractor | Supplier / contract manufacturer |
| Claim | Warranty claim, supplier claim |

## Healthcare administration

The medical-record domain is regulated separately and falls outside the generic ontology — but adjacent admin workflows (procurement, vendor management, capital project delivery, policy decisions) map directly onto the construction ontology with minor renaming.

## Common pattern

Every domain has:

- **Engagements** that have **stakeholders**, **artefacts**, **decisions**, **changes**, **claims/disputes**, and **lessons**.
- **External parties** with **histories** and **performance**.
- **A time dimension** that matters.
- **A voice and audience** that should not drift.

Map your domain to the ontology in [`../architecture/ONTOLOGY.md`](../architecture/ONTOLOGY.md), extend where it doesn't fit, and the rest of the architecture works unchanged.
