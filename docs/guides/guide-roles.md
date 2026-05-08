# Guide: AI Roles — What They Are and When to Use Them

> **What this is:** An explanation of the AI role system — what roles do, how they work, and which to use for different tasks.
>
> **Who it's for:** Anyone using the Prompt Library or writing prompts from scratch.

---

## What a role prompt does

A role prompt tells the AI what perspective, priorities, and constraints to bring to a task. Without a role, the AI defaults to a generic helpful-assistant mode — which tends to produce safe, inoffensive, and forgettable output.

With a role, the AI commits to a point of view:

> "Act as a Senior Copywriter who has been embedded with our brand for years."

Now the AI thinks like that person: it leads with the reader's interest, cuts filler, anchors to voice, and challenges weak copy.

Roles don't constrain the AI — they sharpen it.

---

## How roles + tasks work together

In the Prompt Library, you combine three things:

| Layer | What it does |
|-------|-------------|
| **Master Prompt** | Provides your business context (who you are, your voice, your audience) |
| **Role** | Sets the perspective and professional standards for this task |
| **Task** | Defines exactly what you want produced |

You can use all three, or just a task on its own. The more layers you add, the more focused the output — but even just selecting a task gives you a well-structured starting prompt.

---

## The role library

### Content & Marketing roles

**Senior Copywriter**
*Best for:* Blog posts, website copy, emails, ad copy, case studies, campaign content.

The copywriter role enforces craft discipline: lead with the reader's interest, earns every sentence, avoids filler openers and hollow CTAs. It asks you to state who you're writing for and what action or feeling you want before it writes a word. Use this whenever brand voice and persuasion quality matter.

---

**Content Strategist**
*Best for:* Content planning, audience targeting, editorial calendars, deciding what to write and why.

The strategist role connects content to outcomes. It maps to the customer journey (awareness / consideration / decision / retention), flags gaps, and always asks: why does this piece exist? Use this before briefing the copywriter — or as the copywriter's editor.

---

**Social Media Manager**
*Best for:* Platform-specific posts (LinkedIn, Instagram, X, etc.), comment responses, community content.

The social role produces native-feeling content for the specified platform — not copy-pasted from another channel. It hooks in the first line, avoids hollow CTAs, and refuses to write for a channel if you don't tell it which one. If no platform is specified, it will ask.

---

### Sales & Customer roles

**Sales Consultant**
*Best for:* Outreach emails, proposal copy, sales decks, objection handling, pitch scripts.

The sales role focuses on customer outcomes over features. It anticipates objections honestly, avoids pressure tactics, and ends with a clear next step. Use this for anything that moves a prospect toward a decision — written from a position of genuine helpfulness, not persuasion for its own sake.

---

**Customer Success Manager**
*Best for:* Customer emails, follow-ups, renewal conversations, escalation responses, onboarding communications.

The CSM role is a trusted advisor, not a support agent. It surfaces problems early, doesn't use deflection language ("We apologise for any inconvenience"), and closes the loop with real resolution — not vague reassurance. Use this for any customer-facing communication where the relationship is the product.

---

### Strategy & Analysis roles

**Business Analyst**
*Best for:* Problem analysis, research summaries, decision papers, requirement documents, feasibility assessments.

The analyst role structures complexity into actionable findings. It distinguishes between what we know and what we're assuming, leads with the key finding, and always connects analysis to a decision or action. Its output structure: situation → key findings → so what → recommended action → open questions.

---

**Strategic Advisor**
*Best for:* Strategic questions, options analysis, pressure-testing decisions, identifying second-order consequences.

The advisor role has a point of view. It challenges assumptions, thinks long-term, and says what it actually thinks — not what's comfortable to hear. Use it when you need genuine challenge, not validation.

---

### Operations roles

**Process Designer**
*Best for:* SOPs, process documentation, workflow design, handover guides, onboarding checklists.

The process designer role designs for the person doing the work — clear owners, clear steps, clear outputs. It identifies failure points (where processes typically break) and keeps things as simple as possible. Output: purpose → trigger → steps with owners → outputs → exception handling → review cadence.

---

**Data Analyst**
*Best for:* Interpreting data and reports, analysis of metrics, turning numbers into recommendations.

The data analyst role is focused on insight, not reporting. It asks what the data actually means for the business, flags correlation vs causation, and always states what was measured and what the key limitation is. Use it when you have data and need to understand what to do about it.

---

## Adding custom roles

The role library covers common business functions. If your team has specific roles that need consistent AI behaviour — an Account Manager who writes differently from a generic Sales Consultant, or a Technical Writer distinct from a Copywriter — add them in the Prompt Library.

When defining a custom role, include:
- The professional identity and experience level
- The top 3–4 priorities for this role
- What this role explicitly avoids
- Any required output structure or format

A well-defined custom role is reusable: every team member who needs that perspective gets it consistently.

---

*Roles and tasks are available in the [Prompt Library](library.html). Your custom roles from the setup wizard are in `your-business/prompts/ROLES.md`.*
