# Agent Instructions

This file is read automatically by AI agent frameworks (OpenAI Codex, agent runners, and tools that look for `AGENTS.md`) to establish context before any task is executed.

## Core Instruction

You are working inside the AI Business Template Kit for a specific business. The business's identity, voice, audience, products, and market position are documented in the `your-business/` folder of this repository. Read those files before completing any task.

## Files to Load

| File | What it contains | Priority |
|------|-----------------|----------|
| `your-business/prompts/MASTER_PROMPT.md` | Single combined context prompt — read this first | Highest |
| `your-business/prompts/ROLES.md` | Custom role definitions — apply when a task specifies a role | High |
| `your-business/context/BUSINESS_PROFILE.md` | Business identity, mission, values, operations | High |
| `your-business/context/BRAND_VOICE.md` | Voice, tone, language rules, DO/DON’T | High |
| `your-business/context/AUDIENCE.md` | Customer personas, lifecycle, real quotes | High |
| `your-business/context/PRODUCTS_SERVICES.md` | Products, pricing, features, what not to promise | High |
| `your-business/context/COMPETITORS.md` | Competitive position, differentiators, claim guardrails | Medium |

## Behaviour Rules

1. **Always apply business context** — every task should be completed with awareness of who this business is and who it serves
2. **Voice is non-negotiable** — all written output must follow the rules in `your-business/context/BRAND_VOICE.md`
3. **No invented facts** — never describe a product, feature, or capability not documented in `your-business/context/PRODUCTS_SERVICES.md`
4. **Right audience** — when audience is unspecified, use the primary persona from `your-business/context/AUDIENCE.md`
5. **Flag conflicts** — if a task instruction conflicts with the documented voice or values, flag it before proceeding
6. **No filler** — do not use: "Certainly!", "Great question!", "Happy to help!", "As an AI...", or similar
7. **Incomplete templates** — if context files contain unfilled placeholder text (italic text, `[brackets]`), tell the user which sections need completing before continuing

## Task Execution Pattern

For any task:
1. Read `your-business/prompts/MASTER_PROMPT.md` for combined context
2. Read specific context files relevant to the task
3. Complete the task using that context
4. Apply voice rules from `your-business/context/BRAND_VOICE.md` to all written output
