# RELD / Celeste — example agent setup

This is a worked example showing how a construction business with the RELD/Celeste profile would deploy the Superbrain. The architecture is generic — see [`GENERIC_BUSINESSES.md`](GENERIC_BUSINESSES.md) for non-construction shapes.

## Business shape

- A multi-disciplinary construction company.
- Project lifecycle: tender → award → design → procurement → site delivery → claims & close-out.
- Document-heavy: RFIs, drawings, specs, BOQs, contracts, variations, claims, daily reports.
- Systems already in play: Microsoft 365 (SharePoint, OneDrive, Outlook, Teams), Plexa for project management, Supabase for an internal app, mixed local file shares.

## Agents

| Agent | Primary scopes | Top tasks |
|---|---|---|
| **Tenders** | tenant + bid library + prior projects | Qualify a new RFP; find prior bids with similar scope; draft technical narrative; pull pricing benchmarks from won/lost history |
| **BOQ** | tenant + project | Compare current BOQ to prior projects; flag missing trades; identify duplicate or overlapping items; reconcile measured vs. priced |
| **Contracts** | tenant + project + contracts | Answer clause questions with citations; track obligations and notice deadlines; assess variation impact on contract value and program |
| **Design** | tenant + project + drawings + RFIs | Maintain drawing register; link RFIs to drawings; capture design intent and rationale; surface unresolved design questions |
| **Finance** | tenant + project + claims + contracts | Draft progress claims with supporting documents; compare submitted vs. certified; cashflow forecast against milestones |
| **HR** | tenant + people + certifications | Find people with required tickets; flag expiring tickets; surface availability across projects |
| **Procurement** | tenant + project + subcontractors + trades | Recommend subcontractors based on past performance; assemble package scope; track quote responses |
| **Site Management** | tenant + project + daily reports + safety | Summarise the week on site; surface safety incidents and trends; convert daily reports into structured decisions and risks |

## Connectors

| Connector | Source | Pulled data |
|---|---|---|
| Microsoft Graph | SharePoint + OneDrive | Project folders, drawings, specs, contracts, meeting minutes |
| Outlook | Mail + calendar | Project email threads, RFI correspondence, meeting context |
| Plexa | Projects + tasks + RFIs + variations | Project structure, RFI register, variation register, status changes |
| Supabase | Internal app | Custom records (whatever the internal app holds) |
| Filesystem | Local shares | Bulk archive ingestion during onboarding |

## Ontology emphasis

For this profile, the high-value entities are **Project, RFI, Variation, Claim, Contract, Drawing, Decision, Subcontractor, LessonLearned**. Graphiti carries:

- RFI lifecycles (raised → reviewed → responded → closed).
- Variation chains (raised → approved → priced → invoiced).
- Subcontractor performance over time.
- Decisions with supersessions (e.g. design choice changed twice during DD).

## Sample queries

| Question | What the brain does |
|---|---|
| *"What's the latest on RFI-247?"* | Cognee finds the RFI entity; Graphiti returns the current state and prior states with timestamps; provenance lists the responding email and the linked drawing revision. |
| *"On the September 12 site visit, what RFIs were still open?"* | Graphiti time-slice at 2025-09-12; returns RFIs with `status = "open"` valid at that moment; Cognee adds the document references. |
| *"Which subcontractors have done both fit-out and joinery for us in the last 3 years?"* | Cognee graph traversal across `Subcontractor → DELIVERS_TRADE` and `Subcontractor → ON_PROJECT`, filtered by Graphiti time window. |
| *"Draft a progress claim for Project X this month."* | Finance agent calls `/project-context/X`, pulls contract value, prior claims (Graphiti), variations (Graphiti), supporting documents (Cognee), and drafts in `BRAND_VOICE.md` style. |
| *"What did we decide about the façade on Project Y, and what was it before?"* | Graphiti returns the current decision plus all `SUPERSEDES` predecessors with rationales and meeting refs. |

## Deployment shape

- One tenant per legal entity (RELD, Celeste, joint ventures).
- Shared Cognee deployment with tenant scoping.
- Graphiti graph per tenant.
- Mem0 collection per tenant.
- Postgres with RLS.
- Microsoft Graph OAuth app registered once per tenant directory.
- Plexa API credentials per tenant.

## Specific governance notes

- **Drawings and IFC models** can be very large — store references and extracted metadata in the brain; keep the source binary in the existing object store.
- **Email** ingestion should redact personal addresses outside the company domain unless the tenant explicitly opts in.
- **Daily reports** often contain incident detail — confirm with the tenant whether incident text enters Cognee or only structured fields.
- **Tender data** for live bids is highly sensitive; consider a per-bid sub-tenant scope until award.
