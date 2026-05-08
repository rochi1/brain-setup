# Folio — Example Implementation

> **This is a fictional business.** Every detail is made up for illustrative purposes. Use it as a reference for how to fill in your own templates — not as content to copy directly.

---

## About This Example

**Business:** Folio  
**What it is:** A client portal and project hub for creative agencies  
**Type:** B2B SaaS  
**Stage:** Growth-stage startup (~3 years old, 1,200 customers)

Folio was chosen as the example because it's a concrete, realistic business that exercises every part of the template system:
- A clearly defined niche audience with real, specific pain points
- Multiple product tiers with different features and pricing
- A distinct brand voice (direct, no-nonsense, built by agency people)
- Real competitors to position against
- Customer personas with enough texture to be genuinely useful

---

## Files in This Example

```
folio/
├── README.md                         ← You are here
├── context/
│   ├── BUSINESS_PROFILE.md
│   ├── BRAND_VOICE.md
│   ├── AUDIENCE.md
│   ├── PRODUCTS_SERVICES.md
│   ├── COMPETITORS.md
│   └── logo.svg                      ← Sample brand logo
├── prompts/
│   ├── MASTER_PROMPT_files.md        ← Short version for tools with file upload
│   ├── MASTER_PROMPT_inline.md       ← Self-contained version for any tool
│   ├── ROLES.md                      ← AI role definitions
│   └── TASK_LIBRARY.md               ← Reusable task prompts
├── governance/
│   ├── AI_POLICY.md                  ← Internal AI use policy
│   └── DATA_RULES.md                 ← Data classification framework
└── guides/
    ├── guide-ai-policy.md            ← Plain-English policy explainer
    ├── guide-writing-prompts.md      ← How to write effective prompts
    ├── guide-master-prompt.md        ← How to use the Master Prompt
    ├── guide-roles.md                ← Role library explained
    └── guide-keeping-current.md     ← Maintenance cadence and update process
```

---

## What to Look For

**In the context files:** Notice the level of specificity. Vague answers ("we value quality") are replaced with concrete ones ("we never ship a template without testing it with at least 3 active agencies first"). The more specific the context, the more accurate the AI output.

**In BRAND_VOICE.md:** The DO/DON'T table and before/after examples are where the real work happens. They're the difference between AI that sounds like your brand and AI that sounds like everyone else's.

**In AUDIENCE.md:** The "how they talk" and "real customer quotes" sections are the most underrated parts of the entire system. When AI uses your customers' own language, they notice.

**In MASTER_PROMPT_inline.md:** See how the context files compress into a single usable prompt. This is what gets pasted at the start of every session for tools without file upload.

**In MASTER_PROMPT_files.md:** The short-form version for tools that support file uploads (ChatGPT Projects, Claude Projects, Cursor). Upload the context files alongside it.

**In governance/:** A realistic AI policy and data rules document showing the level of specificity a growth-stage team needs — concrete tool names, real use cases, named roles, not placeholders.

**In guides/:** Platform-agnostic training guides written in Folio's voice — ready to link from an AI Hub page or share with the team directly.
