# Migration — from Template Kit to Superbrain

## Where you are now

You have the **AI Business Template Kit**: markdown files in `your-business/` describing voice, audience, products, competitors, AI policy, and a master prompt. You paste these into chat tools to give them context. There is no persistent system, no ingestion, no graph, no audit.

## What changes

You add the **Superbrain implementation layer** alongside the template kit. The kit becomes the **business identity input** to the brain; the brain becomes the **runtime** that holds and queries your knowledge.

Nothing in `your-business/`, `templates/`, `prompts/`, `processes/`, `governance/`, `examples/`, or `onboarding/` is removed. The migration is additive.

## How `your-business/` plugs into the brain

| Template Kit file | How the Superbrain uses it |
|---|---|
| `your-business/context/BUSINESS_PROFILE.md` | Loaded into agent system prompts; indexed in Cognee as the canonical "who we are" document |
| `your-business/context/BRAND_VOICE.md` | Mandatory style guard: every agent applies it before returning written output |
| `your-business/context/AUDIENCE.md` | Default persona resolution when an agent is unsure who the audience is |
| `your-business/context/PRODUCTS_SERVICES.md` | Source-of-truth lookup for product facts; agents must not invent beyond it |
| `your-business/context/COMPETITORS.md` | Background context for tenders/sales agents |
| `your-business/prompts/MASTER_PROMPT.md` | Default agent system prompt prefix |
| `your-business/prompts/ROLES.md` | Maps to agent definitions in `brain/agents/` |
| `your-business/governance/AI_POLICY.md` | Maps to enforced rules in `brain/governance/` |
| `your-business/governance/DATA_RULES.md` | Maps to ingestion redaction rules and connector allow-lists |

The brain reads `your-business/` at startup and on file change — same files, now wired into a runtime.

## Migration steps

### Step 0 — keep the template kit working

Nothing breaks. Existing users of the kit continue to use it as before.

### Step 1 — local stack

Bring up the local Superbrain stack:

```bash
make setup
make dev
```

This starts Postgres + Cognee + a worker + the API. The stack reads `your-business/` files and indexes them.

### Step 2 — choose one connector and one agent

Pick the simplest pairing:

- Connector: filesystem.
- Agent: Tenders or Contracts.

Point the filesystem connector at one project folder. Trigger ingestion. Ask the agent a question.

### Step 3 — promote to pilot

Follow [`docs/rollout/PHASE_2_PILOT.md`](../rollout/PHASE_2_PILOT.md). Add Microsoft Graph and Plexa connectors. Turn on Graphiti for time-aware queries. Add Mem0 for personalisation.

### Step 4 — enterprise

Follow [`docs/rollout/PHASE_3_ENTERPRISE.md`](../rollout/PHASE_3_ENTERPRISE.md).

## What to do with old prompt-paste workflows

You can keep them. They still work. But once the brain is live, agents pull richer context from the API (`/project-context/:id`) than any pasted prompt can carry — temporal facts, RFI status, contract values as of a date, decisions and their supersessions. Move workflows over as their value becomes obvious; don't force a big-bang switch.

## Conflicts to watch for

- **Voice drift.** The brain's agents must apply `BRAND_VOICE.md`. Add a CI test that runs sample outputs through a voice checker.
- **Stale facts.** `PRODUCTS_SERVICES.md` is hand-curated; product data scraped from internal systems via a connector may disagree. Flag the conflict, do not auto-resolve.
- **Policy gaps.** `AI_POLICY.md` may forbid certain data classes from reaching AI tools. Encode those as connector redaction rules, not just policy text.
