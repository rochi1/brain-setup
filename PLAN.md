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

## Phase 1 — Wizard + ZIP Download

### 1.1 — Context Builder (AI-generated, paste-back flow)

> **Goal:** Keep the existing "generate a prompt → paste into your AI tool" flow — AI quality output is non-negotiable. Add a **paste-back step** after each file so the app captures the generated content and can include it in the ZIP.

The flow per context file:
1. User answers a few short questions in the app (just enough to generate a good prompt)
2. App produces a tailored prompt — user copies it and pastes into their AI tool of choice
3. AI generates the full context file content
4. User copies the AI output and pastes it back into the app
5. App stores it — repeat for each file, then ZIP everything at the end

- [ ] **Design the question set** — the minimum inputs needed to generate a high-quality prompt for each file
  - `BUSINESS_PROFILE.md` — name, one-line description, industry, business model
  - `BRAND_VOICE.md` — 3 tone words, 1–2 "we sound like / we don't sound like" examples
  - `AUDIENCE.md` — who the primary customer is (role, company type, main problem)
  - `PRODUCTS_SERVICES.md` — product/service names, rough pricing, 3 key features
  - `COMPETITORS.md` — 2–3 competitor names, one differentiator
- [ ] **Build multi-step form + prompt generator UI** — short input form → generated prompt to copy → textarea to paste AI output back
- [ ] **Add paste-back textarea per file** — with a "looks good" confirm before moving to next step
- [ ] **Basic validation** — check the paste-back field isn't empty before allowing progression
- [ ] **Generate two Master Prompt versions** — in the final step, produce both:
  - **`MASTER_PROMPT_inline.md`** — full self-contained prompt with all context inlined; user runs it in their AI tool and pastes result back; used for tools without file upload (Gemini Gems, one-off chats)
  - **`MASTER_PROMPT_files.md`** — short file-reference prompt, generated automatically by the app (no AI needed, no paste-back); used for tools that support file upload (ChatGPT Projects, Claude Projects, Cursor, Copilot)
- [ ] **Update the tool-selection step** — existing wizard already distinguishes file-upload vs non-file-upload tools; use this to tell the user which Master Prompt to use for their chosen tool
- [ ] **Preview screen** — show all collected files before download, allow re-doing any individual step

### 1.2 — UX & Quality of Life

- [ ] **localStorage persistence** — save all form inputs and paste-back content to `localStorage` after each step; on load, detect and restore an in-progress session with a "resume where you left off" prompt; clear on successful ZIP download
- [ ] **Per-file regenerate button** — on the preview screen, each file has a "Redo this file" button that takes the user back to that file's generate → paste-back step without resetting the rest
- [ ] **Context tooltip on each step** — a one-sentence "why this matters" explanation on every paste-back step so users understand what each file is for before confirming
- [ ] **Shareable pre-fill URL** — after the basic inputs (business name, industry, tool choice) are entered, generate a URL with those values as query params; user can copy and share it so a colleague can pick up from that point and complete the rest
- [ ] **Version stamp in the ZIP** — include date generated and wizard version number in the README inside the ZIP
- [ ] **Start over button** — visible throughout the wizard; clears all `localStorage` state and returns to step 0; requires a confirmation prompt so users don't lose progress accidentally

### 1.3 — ZIP Download

> _Previously 1.2_

> **Goal:** One button at the end of the wizard produces a complete, ready-to-use ZIP file in the browser.

- [ ] **Add JSZip library** — include via CDN (no build step needed, stays static)
- [ ] **Define ZIP structure** — mirror the `your-business/` folder layout:
  ```
  your-business/
    context/
      BUSINESS_PROFILE.md
      BRAND_VOICE.md
      AUDIENCE.md
      PRODUCTS_SERVICES.md
      COMPETITORS.md
    prompts/
      MASTER_PROMPT_inline.md  ← AI-generated, paste-back (for tools without file upload)
      MASTER_PROMPT_files.md   ← auto-generated by app, no paste-back (for tools with file upload)
      ROLES.md                 ← template copy + any custom roles from step 1.4
      TASK_LIBRARY.md          ← template copy + any custom tasks from step 1.4
    governance/
      AI_POLICY.md             ← AI-generated (paste-back, same as context files)
      DATA_RULES.md            ← template copy
  README.md                    ← next steps guide (see 1.3)
  ```
- [ ] **Trigger download** — `zip.generateAsync({ type: 'blob' })` → `saveAs()` via FileSaver.js
- [ ] **Name the ZIP** — use their business name from the form, e.g. `acme-ai-kit.zip`

### 1.5 — Custom Roles & Tasks (Optional Step)

> **Goal:** After the core context files are done, offer an optional step where the user can define custom AI roles and tasks specific to their business. Same paste-back pattern — generate a prompt, run it in their AI tool, paste the result back.

- [ ] **Ask if they want custom roles** — yes/no choice; if no, skip this step entirely
- [ ] **Role creation flow** — for each role:
  - Ask: role name, what this person does, what AI tasks they'd use it for
  - Generate a prompt that produces a well-structured role definition block (matching the `ROLES.md` format)
  - User pastes prompt into AI, pastes result back
  - Allow adding multiple roles, with a "+ Add another role" option
- [ ] **Ask if they want custom tasks** — separate yes/no
- [ ] **Task creation flow** — for each task:
  - Ask: task name, which role it belongs to, what the task does, any specific constraints
  - Generate a prompt that produces a reusable task prompt block (matching `TASK_LIBRARY.md` format)
  - User pastes prompt into AI, pastes result back
  - Allow multiple tasks
- [ ] **Append to template files** \u2014 custom roles/tasks are appended to the bottom of the template `ROLES.md` and `TASK_LIBRARY.md` in the ZIP; templates will be edited to end cleanly so appending works without any delimiter logic

---

### 1.4 — README Inside the ZIP

> **Goal:** Every person who downloads the ZIP gets a clear, standalone guide telling them exactly what to do next — including how to set up their intranet hub.

- [ ] **Write `README.md` content** covering:
  - What's in the ZIP and what each file is for
  - How to load files into ChatGPT / Claude / Gemini / Copilot
  - How to set up the AI Hub page (links to Phase 2 guides — see below)
  - How to update files when the business changes
  - Who to contact for help (placeholder for their internal owner)

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
