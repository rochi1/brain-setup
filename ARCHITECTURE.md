# Architecture — AI Business Template Kit

> Developer reference for the `docs/` wizard app. Read this before touching any code.
> For the product roadmap, see `PLAN.md`. For AI agent instructions, see `AGENTS.md` / `CLAUDE.md`.

---

## Repository layout

```
ai-template/
├── docs/                    ← GitHub Pages root — everything served from here
│   ├── index.html           ← Setup wizard (ES module app)
│   ├── library.html         ← Prompt library (standalone page, no module system)
│   ├── style.css            ← Shared styles for both pages
│   ├── script.js            ← library.html JS (plain script, not a module)
│   └── js/                  ← ES module wizard app
│       ├── app.js           ← Entry point — render loop, navigation, boot
│       ├── state.js         ← Single state object + localStorage persistence
│       ├── tools.js         ← Tool definitions (ChatGPT, Claude, etc.)
│       ├── prompts.js       ← Context file config + prompt generators
│       ├── render.js        ← Shared UI helpers (progress bar, header, copy button)
│       ├── zip.js           ← ZIP assembly + download logic
│       └── steps/           ← One file per wizard step
│           ├── welcome.js
│           ├── tool.js
│           ├── context-builder.js
│           ├── roles-tasks.js
│           ├── preview.js
│           ├── upload.js
│           └── done.js
├── your-business/           ← User's own context files (fill these in)
├── templates/               ← Blank reference templates (read-only)
├── onboarding/              ← QUICK_START, SETUP_GUIDE, CHECKLIST
├── prompts/                 ← ROLES.md, TASK_LIBRARY.md (template copies)
├── governance/              ← REVIEW_PROCESS.md
├── examples/                ← Example filled context files (folio/)
├── PLAN.md                  ← Product roadmap
├── AGENTS.md                ← Auto-loaded by OpenAI Codex and agent runners
├── CLAUDE.md                ← Auto-loaded by Claude Code
└── .github/copilot-instructions.md  ← Auto-loaded by GitHub Copilot
```

---

## Branches

| Branch | Purpose |
|--------|---------|
| `master` | The template kit + wizard app — this is the product |
| `superbrain` | **Separate unrelated project** — agents, graph, memory, ontology, Docker/k8s/Terraform scaffolding. Do not merge into master. |

---

## Hosting & constraints

- **GitHub Pages** — static files only, no backend, no build step
- **No bundler** — ES Modules loaded natively by the browser (`type="module"` in `index.html`)
- **No npm** — zero dependencies installed locally; CDN libs only
- **Local dev** — `npx serve docs -p 3456` from repo root; open `http://localhost:3456`
- **CDN libraries** loaded in `index.html`:
  - JSZip 3.10.1 — `https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js`
  - FileSaver.js 2.0.5 — `https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js`

---

## The two pages

### `index.html` — Setup wizard

A single-page application driven by `docs/js/app.js`. All content is rendered into `<div id="app">` via `innerHTML`. There is no DOM diffing — each navigation call re-renders the entire app div.

### `library.html` — Prompt library

A standalone page using plain `script.js` (not part of the ES module system). Has its own role dropdown and cascading task dropdown. Custom roles/tasks defined via JS arrays inline in `script.js`. **Not connected to state.js** — it is a read-only reference page, not a wizard step.

---

## Module responsibilities (`docs/js/`)

| Module | Responsibility | Key exports |
|--------|---------------|-------------|
| `state.js` | Single source of truth for all wizard state. Handles localStorage read/write/clear. | `state`, `saveState()`, `loadState()`, `clearState()`, `APP_VERSION`, `STORAGE_KEY` |
| `tools.js` | Static config for each supported AI tool. | `TOOLS` — keyed object; each entry has `name`, `icon`, `desc`, `supportsFileUpload`, `uploadSteps` (HTML string) |
| `prompts.js` | Config for all context files (id, title, saveAs path, prompt generators). Also exports the `RAW` template base URL. | `CONTEXT_FILES`, `MASTER_PROMPT_STEP`, `ZIP_TEMPLATE_URLS`, `RAW` |
| `render.js` | Shared UI utilities: progress bar, header, copy-to-clipboard, HTML escape, code block builder. | `renderProgress()`, `renderHeader()`, `escapeHtml()`, `copyText()`, `codeBlock()` |
| `zip.js` | Assembles and triggers download of the ZIP. Fetches remote template files. Generates `MASTER_PROMPT_files.md` and `README.md`. | `buildAndDownloadZip()`, `generateFilesMasterPrompt()`, `generateReadme()` |
| `app.js` | Entry point. `render()` switch drives all navigation. Calls `render*` + `bind*` from step modules. | `render()`, `goStep()`, `confirmStartOver()`, `resumeFile()` |
| `steps/welcome.js` | Step 0 — welcome screen + resume banner. | `renderWelcome()`, `bindWelcome()` |
| `steps/tool.js` | Step 1 — tool selection grid. | `renderToolStep()`, `bindToolStep()` |
| `steps/context-builder.js` | Step 2 — business name/URL/logo screen + per-file prompt→paste flow. | `ALL_FILES`, `renderBusinessNameCapture()`, `bindBusinessNameCapture()`, `renderFilePromptPhase()`, `bindFilePromptPhase()`, `renderFilePastePhase()`, `bindFilePastePhase()` |
| `steps/roles-tasks.js` | Step 3 — custom roles gate→form→prompt→paste + tasks gate→form→prompt→paste. | `render/bind` functions for roles and tasks gate, form, prompt, paste phases |
| `steps/preview.js` | Step 4 — file checklist, redo buttons, shareable URL, ZIP download trigger. | `renderPreview()`, `bindPreview()` |
| `steps/upload.js` | Step 5 — tool-specific file upload instructions, file-reference master prompt copy. | `renderUpload()`, `bindUpload()` |
| `steps/done.js` | Step 6 — completion hero, what's next, resources. | `renderDone()`, `bindDone()` |

---

## State shape

All state lives in a single plain object in `state.js`. Key fields:

```js
{
  step: 0,             // 0–6, see step map below
  tool: null,          // key from TOOLS, e.g. 'chatgpt'
  os: 'mac'|'windows', // detected from userAgent
  brandVoiceMode: 'scratch'|'existing',
  businessName: '',
  websiteUrl: '',      // optional; injected into business-profile prompt
  logoName: '',        // filename only — persisted to localStorage
  _logoFile: null,     // File object — runtime only, NOT persisted
  files: {},           // { [fileId]: pastedContent }
  fileSubStep: -1,     // -1 = biz name screen; 0..n = file index into CONTEXT_FILES
  filePhase: 0,        // 0 = prompt phase, 1 = paste phase
  wantsCustomRoles: null,
  wantsCustomTasks: null,
  customRoles: [],     // [{ name, description, context, output }]
  customTasks: [],     // [{ name, description, input, output }]
  roleSubStep: 0,
  rolePhase: 0,        // 0=gate, 1=form, 2=prompt, 3=paste
  taskSubStep: 0,
  taskPhase: 0,        // 0=gate, 1=form, 2=prompt, 3=paste
}
```

**Persistence:** `saveState()` serialises all fields except `_logoFile` (File objects can't be JSON-serialised). `localStorage` key: `ai-kit-state-v2`. On resume, if `logoName` is set but `_logoFile` is null, a warning is shown prompting re-upload.

---

## Step map

| `state.step` | Screen |
|---|---|
| 0 | Welcome / resume |
| 1 | Tool selection |
| 2 | Context builder (substep: -1=biz name, 0..n=file) |
| 3 | Custom roles & tasks |
| 4 | Preview + ZIP download |
| 5 | Upload instructions |
| 6 | Done |

---

## Render pattern

Every step follows the same two-function pattern:

```js
renderXxx(options)  // returns an HTML string — assigned to root.innerHTML
bindXxx(options)    // runs after innerHTML set — attaches all event listeners
```

`app.js` calls them in sequence:

```js
root.innerHTML = renderHeader(...) + renderProgress(...) + renderXxx(...);
bindXxx(...);
```

**No virtual DOM, no framework.** Keep it this way — adding a framework requires a build step, which breaks GitHub Pages without a CI pipeline.

---

## ZIP structure

```
your-business/
  context/
    BUSINESS_PROFILE.md
    BRAND_VOICE.md
    AUDIENCE.md             (if generated)
    PRODUCTS_SERVICES.md    (if generated)
    COMPETITORS.md          (if generated)
    logo.<ext>              (if uploaded)
  prompts/
    MASTER_PROMPT_inline.md  ← AI-generated paste-back (for tools without file upload)
    MASTER_PROMPT_files.md   ← auto-generated by app (for tools with file upload)
    ROLES.md                 ← fetched from remote + custom roles appended
    TASK_LIBRARY.md          ← fetched from remote + custom tasks appended
  governance/
    AI_POLICY.md             (if generated)
    DATA_RULES.md            ← fetched from remote
README.md
```

**Remote template fetch base URL:**
```
https://raw.githubusercontent.com/rochi1/brain-setup/master/templates
```
Used in `zip.js` to fetch `ROLES.md`, `TASK_LIBRARY.md`, and `DATA_RULES.md` at download time. If the fetch fails, the file is omitted from the ZIP silently.

**ZIP filename:** `<business-name-slugified>-ai-kit.zip`

---

## Context file prompt system

Each file in `CONTEXT_FILES` (in `prompts.js`) has a `getPrompt()` function rather than a static string. This allows prompts to read live state at call time — e.g. the business-profile prompt checks `state.websiteUrl` and injects a "fetch this URL first" instruction when present.

The `brand-voice` file has a `hasModes: true` flag and two prompt modes:
- `existing` — user pastes in their brand guide; AI maps it to the template
- `scratch` — AI interviews the user to build the voice guide from scratch

Mode is stored in `state.brandVoiceMode` and toggled on the file's prompt screen.

---

## Adding a new context file

1. Add an entry to `CONTEXT_FILES` in `prompts.js` — provide `id`, `required`, `title`, `whyItMatters`, `saveAs`, `goodOutputLooks`, and `getPrompt()`
2. The context builder, preview, and ZIP assembly all loop over `CONTEXT_FILES` — no other files need changing for the file itself
3. If the file needs a remote template fetched into the ZIP, add its URL to `ZIP_TEMPLATE_URLS` in `prompts.js`

---

## Adding a new tool

1. Add an entry to `TOOLS` in `tools.js` with `name`, `icon`, `desc`, `supportsFileUpload`, and `uploadSteps` (HTML string)
2. The tool grid, upload step, and master prompt selection all read from `TOOLS` — no other files need changing

---

## Known constraints & decisions

| Decision | Rationale |
|---|---|
| No AI API calls | Keeps the app static/free; paste-back flow preserves output quality |
| `innerHTML` re-render (no diffing) | Simplest approach; performance is fine for a wizard with <10 steps |
| File objects not persisted | `File` can't be serialised to JSON; logo needs re-upload after page reload |
| Two master prompts | File-reference prompt is auto-generated (fast); inline prompt is AI-generated (higher quality for tools without upload) |
| CDN libs, no npm | Avoids build step requirement for GitHub Pages |
| `library.html` is separate | Prompt library predates the module rewrite; it's a read-only reference page with no shared state, keeping it decoupled is intentional |
