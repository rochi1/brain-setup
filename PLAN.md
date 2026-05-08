# Product Plan — AI Business Template Kit

> **Status tracking:** Update the checkbox and status note next to each item as work progresses.
> **Last updated:** May 2026

---

## Overview

Expand the existing static wizard (currently hosted on GitHub Pages) into a two-phase product:

1. **Phase 1 — Wizard + ZIP Download:** The setup wizard guides a user through building their business context files, then packages everything into a downloadable ZIP. No backend required.
2. **Phase 2 — AI Hub Page:** Instructions and templates for building an AI Onboarding intranet page in Google Sites or SharePoint — with a prompt library, AI policy, training guides, and a simple way for editors to add new prompts and roles.

OAuth integration (Google Drive / Microsoft 365) is a **future phase** — not in scope for now. Manual download + clear setup instructions instead.

---

## Phase 1 — Wizard + ZIP Download ✅ Complete

### Architecture decisions made
- **ES Modules** — no build step; works on GitHub Pages; local dev via `npx serve docs`
- **Paste-back flow** — keeps AI quality; app never calls an AI API
- **Two master prompts** — `MASTER_PROMPT_files.md` (auto-generated, short) + `MASTER_PROMPT_inline.md` (AI-generated paste-back)
- **Step numbers** — 0=welcome, 1=tool, 2=context-builder, 3=roles-tasks, 4=preview-zip, 5=upload, 6=done
- **localStorage key** — `ai-kit-state-v2`

### 1.1 — Context Builder (AI-generated, paste-back flow) ✅

- [x] **Business name capture screen** — with website URL field and logo upload field
- [x] **Website URL injected into business-profile prompt** — AI fetches site first, skips already-answered questions
- [x] **Logo upload** — PNG/JPG/SVG/WebP; stored in-memory as `File`, filename persisted in state; included as `your-business/context/logo.<ext>` in ZIP
- [x] **Per-file prompt phase** — shows generated prompt, copy button, "I've got the output →" advance
- [x] **Per-file paste phase** — textarea with "what good looks like" hint, confirm/skip, draft auto-saves as user types
- [x] **Brand voice mode toggle** — "I have a brand guide" vs "starting from scratch" switches the prompt
- [x] **All 6 context files + Master Prompt** — business-profile, brand-voice, ai-policy, audience, products, competitors, then master-prompt as final step
- [x] **Optional/required badge** — per file; required files block download if missing
- [x] **Why it matters** — one-line explanation on every file step

### 1.2 — UX & Quality of Life ✅

- [x] **localStorage persistence** — full state saved after every interaction; resume banner on welcome screen
- [x] **Start over button** — visible on all steps 1–6; confirmation dialog before clearing
- [x] **Per-file redo buttons** — preview screen has "Redo" per file, routes back to that file's prompt phase
- [x] **Shareable URL** — encodes tool + business name as query params; shown on preview screen with copy button
- [x] **Version stamp in ZIP** — README inside ZIP includes generated date + kit version
- [x] **"Why it matters" tooltip** on every context file step

### 1.3 — ZIP Download ✅

- [x] **JSZip 3.10.1 + FileSaver.js 2.0.5** — loaded via CDN
- [x] **ZIP structure** mirrors `your-business/` folder layout
- [x] **Logo included** in `your-business/context/` if uploaded
- [x] **Template files fetched** from GitHub raw URLs at download time (ROLES.md, TASK_LIBRARY.md, DATA_RULES.md)
- [x] **ZIP named** from business name, e.g. `acme-corp-ai-kit.zip`
- [x] **Download status messages** — "Building ZIP…", "Fetching templates…", "✅ ZIP downloaded!"

### 1.4 — README Inside the ZIP ✅

- [x] **README.md generated** covering: what's in the package, which master prompt to use per tool, how to load into AI tool, how to update files
- [x] **Website URL and logo noted** in README when present

### 1.5 — Custom Roles & Tasks ✅

- [x] **Roles gate** — yes/no choice; "No" skips to tasks gate
- [x] **Role creation flow** — name + description + context fields → prompt generated → paste-back → "+ Add another role"
- [x] **Tasks gate** — separate yes/no
- [x] **Task creation flow** — name + description + input fields → prompt generated → paste-back → "+ Add another task"
- [x] **Appended to template files** — custom roles/tasks appended under `## Custom Roles` / `## Custom Tasks` headings in ZIP

### 1.6 — Tool selection + upload instructions ✅

- [x] **Tool grid** — ChatGPT, Claude, Gemini, Copilot, Cursor, Windsurf, Other
- [x] **`supportsFileUpload` flag** per tool — determines which master prompt recommended
- [x] **Upload step** — tool-specific instructions for loading files; file-reference master prompt shown with copy button for upload-capable tools

---

## Phase 2 — AI Hub Page (Instructions + Templates)

> **Goal:** Give people everything they need to build a professionally structured AI Onboarding page inside their existing tools — Google Sites or SharePoint. No custom hosting required on their end.

### 2.1 — Decide Hub Structure

The AI Hub page should contain these sections regardless of platform:

| Section | Content |
|---|---|
| **Welcome** | What AI is being used for in this business, who the AI policy owner is |
| **Getting Started** | Link to the setup wizard, link to download the ZIP |
| **Our AI Files** | Downloadable links to the generated context files |
| **AI Policy** | Inline or linked `AI_POLICY.md` |
| **Prompt Library** | Browsable list of prompts by role/task |
| **Roles** | List of defined AI roles with copy-paste prompt blocks |
| **Training Guides** | Video or written guides (placeholder structure) |
| **Add a Prompt** | Instructions/form for editors to submit new prompts |

### 2.2 — Google Sites Guide

- [ ] **Write step-by-step Google Sites setup guide** covering:
  - Creating a new site in Google Sites
  - Using the recommended page structure (section-by-section instructions)
  - Embedding Google Drive files for download (context files, policy doc)
  - Creating a collapsible accordion section for the prompt library
  - How to add/edit prompts as a page editor (just editing page sections — no code)
  - How to share the site internally (domain-only access)
- [ ] **Create a Google Sites page template** — build a public example site that can be duplicated
  - Note: Google Sites cannot be provisioned via API. The template must be duplicated manually.
  - Host the example at a known URL and document it
- [ ] **Store guide as** `docs/guides/google-sites-hub.md` (rendered in the main app as a step)

### 2.3 — SharePoint Guide

- [ ] **Write step-by-step SharePoint setup guide** covering:
  - Creating a Communication Site in SharePoint
  - Recommended page layout using SharePoint web parts
  - Uploading files to a Document Library (the generated ZIP contents)
  - Building the prompt library using a SharePoint List (structured: Role, Task, Prompt text, Tags)
  - Using the Quick Links web part for the Getting Started section
  - Setting permissions (site members vs visitors)
  - How editors add new prompts — adding a row to the SharePoint List, no code required
- [ ] **Create SharePoint site template (PnP template)** — exportable `.xml` / PnP provisioning template that IT admins can import
  - This is optional but high value for enterprise customers
- [ ] **Store guide as** `docs/guides/sharepoint-hub.md`

### 2.4 — Prompt Library as Editable Content

> **Goal:** Editors should be able to add prompts and roles without touching code or markdown files.

**Google Workspace option:**
- [ ] Build a **Google Sheets prompt library template** — columns: Role, Task Name, Prompt Text, Tags, Date Added, Added By
- [ ] Write instructions for embedding the sheet as a table on the Google Site
- [ ] Editors add a row → the sheet updates → the embedded view updates automatically

**Microsoft 365 option:**
- [ ] Build a **SharePoint List schema** — same columns as above
- [ ] The list powers the prompt section of the SharePoint page via the List web part
- [ ] Editors add a list item → it appears on the page immediately, no publishing needed

### 2.5 — Training Guides (Content to Write)

These are written guides included in the ZIP and linked from the hub page:

- [ ] **AI Policy explained** — plain English summary of `AI_POLICY.md` with context on why each rule exists
- [ ] **How to write a good prompt** — short practical guide, business-specific examples
- [ ] **How to use the Master Prompt** — what it is, how to paste it, what happens next
- [ ] **Role guide** — what each defined role does, when to use it, example outputs
- [ ] **Keeping your context up to date** — when and how to refresh the files

---

## Phase 3 — Future (Not in Scope Now)

> Document here so decisions are made deliberately, not by drift.

- [ ] OAuth — Google Drive upload (user authenticates, files land in Drive automatically)
- [ ] OAuth — Microsoft Graph upload (files go to OneDrive/SharePoint document library)
- [ ] SharePoint site provisioning via Graph API (create the hub page programmatically)
- [ ] In-app AI generation (form answers → API call → generated file content, replacing template substitution)
- [ ] Prompt library web app with its own database (Airtable / Supabase backed)

---

## Open Questions

| # | Question | Decision |
|---|---|---|
| 1 | Should the in-app form replace the existing wizard entirely, or run alongside it as a separate flow? | TBD |
| 2 | Do we ship the Google Sites guide first, or SharePoint first? | TBD |
| 3 | What's the minimum viable prompt library — how many prompts ship in the template? | TBD |
| 4 | Should training guides be `.md` files inside the ZIP, or web pages in the app? | TBD |
| 5 | Who is the primary target — Google Workspace orgs or Microsoft 365 orgs? | TBD |

---

## Build Order (Recommended)

```
Week 1–2:  Phase 1.1 — Design question set + build form UI
Week 3:    Phase 1.2 — UX & quality of life (localStorage, regenerate, tooltips, shareable URL)
Week 4:    Phase 1.3 — ZIP assembly + download
Week 5:    Phase 1.4 — README inside ZIP / write next-steps content
Week 6:    Phase 1.5 — Custom roles & tasks step
Week 7:    Phase 2.1 — Define hub structure
Week 8:    Phase 2.2 — Google Sites guide + example site
Week 9:    Phase 2.3 — SharePoint guide
Week 10:   Phase 2.4 — Prompt library templates (Sheets + SP List)
Week 11:   Phase 2.5 — Write training guides
```
