# Content Workflow

> **What this file is:** How content gets created, reviewed, and published in your organisation — and where AI fits into each stage. Fill in the sections that apply to your business and delete the rest.

---

## Content We Produce

*List the content types your team regularly creates. Check all that apply and add your own.*

- [ ] Blog posts / articles
- [ ] Social media posts
- [ ] Email newsletters
- [ ] Marketing emails / campaigns
- [ ] Website copy
- [ ] Case studies
- [ ] Proposals / pitches
- [ ] Product documentation
- [ ] Internal communications
- [ ] Press releases / PR
- [ ] Video scripts
- [ ] Ad copy
- [ ] *[Other:]*

---

## Roles & Responsibilities

*Define who does what in your content process.*

| Role | Responsibility |
|------|---------------|
| *e.g. Content owner / Marketing lead* | *Sets the content strategy, approves final output* |
| *e.g. Writer / Creator* | *Produces first drafts using AI and own expertise* |
| *e.g. Reviewer* | *Checks accuracy, voice, and appropriateness* |
| *e.g. Subject matter expert* | *Consulted for technical accuracy on specialist topics* |
| *e.g. Publisher* | *Schedules and publishes final approved content* |

---

## The Content Workflow

### Stage 1 — Brief

Before any content is created (with or without AI), a brief should exist that answers:

- **What is this piece?** (Type, format, channel)
- **Who is it for?** (Persona, audience segment)
- **What should they think, feel, or do after consuming it?**
- **What's the key message?** (One sentence)
- **What's the CTA?** (If applicable)
- **Is there anything the AI or writer should know?** (Context, hooks, stats to include)

*Brief format:* *[Link to your brief template, or note where briefs are created — e.g. Notion, Asana, a shared doc]*

---

### Stage 2 — Creation (AI-assisted)

**Where AI helps most:** First drafts, structural outlines, headline options, repurposing existing content into new formats.

**How to use AI for content:**
1. Load your Master Prompt (`prompts/MASTER_PROMPT.md`)
2. Add the relevant role from `prompts/ROLES.md` (e.g. Senior Copywriter)
3. Use the relevant task prompt from `prompts/TASK_LIBRARY.md`
4. Fill in the brief details as the task input
5. Review, edit, and refine the output — don't use first drafts raw

**AI's role at this stage:** *[e.g. Draft generation only / Structural outline, then human writes / Full draft with light editing / Other]*

---

### Stage 3 — Review

Follow the tier system in `governance/REVIEW_PROCESS.md`.

| Content type | Review tier | Reviewer |
|--------------|-------------|---------|
| *e.g. Social media posts* | *Tier 2 — Peer* | *e.g. Marketing lead* |
| *e.g. Blog posts* | *Tier 2 — Peer* | *e.g. [Role]* |
| *e.g. Email campaigns* | *Tier 2 — Peer* | *e.g. [Role]* |
| *e.g. Press releases* | *Tier 3 — Senior* | *e.g. CEO / Comms lead* |
| *e.g. Customer proposals* | *Tier 3 — Senior* | *e.g. [Role]* |
| *[Content type]* | *[Tier]* | *[Reviewer]* |

---

### Stage 4 — Approval & Sign-off

*Describe how final approval works.*

*e.g. "All content is approved in [tool — Notion / Asana / email] before it goes to Stage 5. The approver marks the piece as approved with their name and the date. If approval is verbal, it's confirmed in writing in the relevant task/thread."*

---

### Stage 5 — Publishing

*Describe how content moves from approved to live.*

- **Who publishes:** *[Role]*
- **Scheduling tool:** *[e.g. Buffer, Later, HubSpot, direct platform]*
- **Review before publishing:** *[One final check — who does it, what do they look for?]*
- **What happens after publishing:** *[e.g. Posted in #content-published Slack channel, added to content tracker]*

---

## Content Calendar & Planning

*How do you plan content in advance?*

- **Planning cadence:** *[e.g. Monthly planning session, weekly check-in]*
- **Planning tool:** *[e.g. Notion, Airtable, Google Sheet, Trello]*
- **Lead time:** *[e.g. Blog posts need 5 days from brief to publish; social posts need 2 days]*
- **Who owns the calendar:** *[Role]*

---

## Content Library & Repurposing

*Where does finished content live, and how do you reuse it?*

- **Content is stored in:** *[e.g. Google Drive / Notion / [CMS name]]*
- **Folder structure:** *[Brief description or link]*
- **Repurposing rule:** *[e.g. Every blog post is repurposed into 3 social posts and one email section]*
- **AI's role in repurposing:** *[e.g. "Use TASK_LIBRARY.md — 'Repurpose content' task to adapt existing pieces to new formats"]*

---

## Quality Standards

*What does "good content" look like for your business?*

- Written in our brand voice (refer to `context/BRAND_VOICE.md`)
- *[Standard 2 — e.g. Every piece has a clear purpose and a clear CTA]*
- *[Standard 3 — e.g. No factual claims without a source or internal verification]*
- *[Standard 4 — e.g. Reviewed by at least one other person before publishing]*
- *[Standard 5 — e.g. Optimised for the platform it's published on]*

---

## What AI Should Never Do in Content

*Specific constraints beyond those in the Master Prompt, specific to content creation.*

- *e.g. Never generate statistics or research without flagging them for verification*
- *e.g. Never produce content that makes competitive comparisons without reviewing COMPETITORS.md first*
- *e.g. Never produce content for a persona without referencing AUDIENCE.md*
- *[Add your own]*

---

## Continuous Improvement

When content doesn't perform or consistently misses the mark, review:

1. Was the brief clear?
2. Was the right AI prompt / task used?
3. Was the review process followed?
4. Does a context file need updating?

Track issues and improvements in: *[e.g. a retrospective doc / monthly team review / content post-mortem template]*
