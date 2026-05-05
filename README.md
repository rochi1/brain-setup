# AI Business Template Kit

> A model-agnostic, agent-agnostic collection of markdown templates, context files, and onboarding guides that give any business an instant AI foundation — from day one.

---

## What This Is

Most businesses start using AI by typing into a chat box with zero context, zero consistency, and zero memory. This repo fixes that.

**AI Business Template Kit** is a structured set of files you drop into your own repo (or hand to your AI of choice) to instantly give it:

- Who your business is
- How you communicate
- What your processes look like
- What good output looks like
- What it should never do

Works with any model or agent: ChatGPT, Claude, Gemini, Copilot, Cursor, n8n, custom APIs — anything that accepts a prompt or a context file.

---

## What's Inside

```
ai-template/
├── README.md                    ← You are here
├── AGENTS.md                    ← Auto-loaded by OpenAI Codex and agent runners
├── CLAUDE.md                    ← Auto-loaded by Claude Code and Claude-based agents
├── .cursorrules                 ← Auto-loaded by Cursor editor
├── .windsurfrules               ← Auto-loaded by Windsurf editor
│
├── .github/
│   └── copilot-instructions.md  ← Auto-loaded by GitHub Copilot
│
├── onboarding/
│   ├── QUICK_START.md           ← Start here — 4 prompts to set everything up
│   ├── SETUP_GUIDE.md           ← Step-by-step onboarding walkthrough
│   └── CHECKLIST.md             ← Onboarding completion checklist
│
├── context/
│   ├── BUSINESS_PROFILE.md      ← Who you are, what you do, your mission
│   ├── BRAND_VOICE.md           ← Tone, language rules, examples
│   ├── AUDIENCE.md              ← Customer personas and segments
│   ├── PRODUCTS_SERVICES.md     ← What you sell and how you describe it
│   └── COMPETITORS.md           ← Market context and positioning
│
├── prompts/
│   ├── MASTER_PROMPT.md         ← The single prompt that loads all context
│   ├── ROLES.md                 ← Reusable role definitions (marketer, analyst, etc.)
│   └── TASK_LIBRARY.md          ← Prebuilt prompts for common business tasks
│
├── processes/
│   ├── CONTENT_WORKFLOW.md      ← How content is created and approved
│   ├── CUSTOMER_COMMS.md        ← Email, chat, support response guidelines
│   └── REPORTING.md             ← How to summarise, analyse, and present data
│
├── governance/
│   ├── AI_POLICY.md             ← What AI can and cannot do in your org
│   ├── DATA_RULES.md            ← What data to share vs. keep out of AI tools
│   └── REVIEW_PROCESS.md        ← How AI output gets reviewed before use
│
└── examples/
    └── folio/                   ← Fully completed example (fictional B2B SaaS business)
        ├── context/             ← All 5 context files filled in
        └── prompts/             ← Completed master prompt
```

---

## Quick Start (4 Prompts)

You can set up your entire AI context in one sitting using these four prompts. Open your AI tool of choice, then work through them in order.

---

### Prompt 1 — Generate Your Business Profile

Paste this into your AI, answer the questions it asks, then save the output into `context/BUSINESS_PROFILE.md`:

```
I'm setting up a context file for my business so AI tools understand who we are.

Please ask me a series of questions — one at a time — to help build a complete business profile. Cover:
- Business name, industry, and what we do
- Our mission and values
- The problem we solve and for whom
- What makes us different
- Where we operate and how we sell
- Our current stage (startup, growth, enterprise, etc.)

After I answer all questions, format the output as a clean markdown document I can save as BUSINESS_PROFILE.md.
```

---

### Prompt 2 — Define Your Brand Voice

Paste this into your AI, then save the output into `context/BRAND_VOICE.md`:

```
I need to define my brand voice so that AI tools always write in a consistent style for my business.

Please ask me questions — one at a time — to understand:
- The feeling we want people to have when they read our content
- Words and phrases we love and use often
- Words and phrases we never use
- Our formality level (casual, professional, technical, etc.)
- Examples of writing we admire (from our own brand or others)
- What we never want to sound like

Then produce a BRAND_VOICE.md file with clear guidelines, a do/don't table, and 3 example rewrites showing our voice in action.
```

---

### Prompt 3 — Build Your Master Prompt

Once you have your context files filled in, use this prompt to generate your `prompts/MASTER_PROMPT.md`:

```
I have the following context files about my business:
- BUSINESS_PROFILE.md
- BRAND_VOICE.md
- AUDIENCE.md (if available)
- PRODUCTS_SERVICES.md (if available)

[Paste the contents of each file below this line]

---

Using all of the above, write a single Master Prompt I can paste at the start of any AI conversation to instantly load my full business context. It should:
- Summarise who I am and what I do
- Set the tone and communication style
- Define what good output looks like
- Tell the AI what it should never do or say
- Be written to work with any AI model (not model-specific)

Format it as a clean, copy-paste-ready prompt block.
```

---

### Prompt 4 — Set Your AI Policy

Paste this into your AI, answer the questions, then save the output into `governance/AI_POLICY.md`:

```
I need a simple internal AI policy for my business — practical rules for how my team uses AI tools day to day.

Ask me questions about:
- What AI tools we currently use or plan to use
- What tasks AI is approved for
- What tasks require human review before AI output is used
- What data is off-limits for AI tools (customer data, financials, etc.)
- Any industry compliance requirements (GDPR, HIPAA, SOC2, etc.)

Then produce a clear, plain-English AI_POLICY.md that a non-technical team member can understand and follow.
```

---

## How to Use This Repo

### Option A — Drop Into Your Own Repo
1. Fork or copy this repo into your business's version control
2. Work through the [Quick Start](#quick-start-4-prompts) prompts above
3. Fill in the template files under `context/` with your outputs
4. Share the `prompts/MASTER_PROMPT.md` with your team as the standard starting point

### Option B — Always-On Auto-Load (Recommended for Coding Tools)

Several agent auto-load files are included in the repo. Once your `context/` files are filled in, these tools will read your business context automatically — no manual pasting required:

| File | Auto-loaded by |
|------|----------------|
| `.cursorrules` | Cursor |
| `.windsurfrules` | Windsurf |
| `.github/copilot-instructions.md` | GitHub Copilot |
| `AGENTS.md` | OpenAI Codex / agent runners |
| `CLAUDE.md` | Claude Code / Claude-based agents |

Just keep your context files up to date — the agent always has context.

### Option C — Use With a Chat Project Tool
- In **ChatGPT Projects**: Upload context files as project knowledge
- In **Claude Projects**: Add files to project knowledge base
- In **n8n / Make / Zapier**: Store MASTER_PROMPT as a reusable variable

### Option D — Give It to a Consultant or New Team Member
The `onboarding/` folder is designed to be handed to anyone — technical or not — as a self-contained setup guide.

---

## Principles

| Principle | What It Means |
|-----------|---------------|
| **Model agnostic** | No prompt syntax is specific to one AI. No reliance on memory, plugins, or proprietary features. |
| **Agent agnostic** | Works in chat UIs, coding tools, automation pipelines, or API calls equally well. |
| **Markdown first** | Plain text files that work anywhere — no proprietary formats, no lock-in. |
| **Fill-in, not start-from-scratch** | Every template has structure and guidance so you're never staring at a blank page. |
| **Living documents** | These files should be updated as your business evolves. Treat them like your codebase. |

---

## Contributing

This is designed to grow. If you've built a template, prompt, or process file that's worked well for your business or clients, contributions are welcome.

1. Fork the repo
2. Add your file to the appropriate folder
3. Include a brief description at the top of the file explaining what it's for and how to use it
4. Open a pull request

---

## Roadmap

- [ ] Starter templates for common industries (SaaS, agency, e-commerce, professional services)
- [ ] Role-specific prompt packs (marketing, sales, ops, support, finance)
- [ ] Automation-ready prompt formats (structured JSON output variants)
- [x] Example completed context files for a fictional business (`examples/folio/`)
- [x] Agent auto-load files for Cursor, Windsurf, Copilot, Claude Code, and OpenAI agents
- [ ] VS Code snippet pack for fast template insertion
- [ ] `CONTRIBUTING.md` — submission guidelines for new templates and examples

---

## License

MIT — use freely, adapt for your business, share with your team.
