# Onboarding Checklist

> Use this to track your setup progress. Work through it top to bottom. Each section builds on the previous one.

---

## Phase 1 — Foundation (Do this first)

These four outputs are the minimum viable setup. Everything else can come later.

### Business Profile
- [ ] Ran the Business Profile prompt from [QUICK_START.md](QUICK_START.md)
- [ ] Reviewed and edited the output — it accurately describes the business
- [ ] Saved as `your-business/context/BUSINESS_PROFILE.md`

### Brand Voice
- [ ] Ran the Brand Voice prompt from [QUICK_START.md](QUICK_START.md)
- [ ] Reviewed the DO/DON’T table — it reflects how we actually communicate
- [ ] Tested the before/after rewrites — they sound like us
- [ ] Saved as `your-business/context/BRAND_VOICE.md`

### Master Prompt
- [ ] Generated the Master Prompt using outputs from Phase 1
- [ ] Tested it: started a fresh AI conversation, pasted the Master Prompt, asked a business-related question — the tone and context were correct
- [ ] Saved as `your-business/prompts/MASTER_PROMPT.md`
- [ ] Shared with the team (Slack pin, Notion, internal wiki, etc.)

### AI Policy
- [ ] Ran the AI Policy prompt from [QUICK_START.md](QUICK_START.md)
- [ ] Reviewed with at least one other person (manager, legal, or senior team member)
- [ ] Saved as `your-business/governance/AI_POLICY.md`
- [ ] Team has read and acknowledged the policy

**Phase 1 complete?** You have a working AI foundation. The rest makes it sharper.

---

## Phase 2 — Context Depth (Complete within first 2 weeks)

### Audience
- [ ] `your-business/context/AUDIENCE.md` exists with at least 2 customer personas
- [ ] Each persona includes: who they are, what they need, what they fear, how they talk
- [ ] Master Prompt updated to reference audience context

### Products & Services
- [ ] `your-business/context/PRODUCTS_SERVICES.md` exists
- [ ] Each product/service has: name, description, who it's for, key benefits, pricing range (if appropriate)
- [ ] Common objections and how to handle them are documented

### Competitors & Positioning
- [ ] `your-business/context/COMPETITORS.md` exists
- [ ] Includes 3–5 competitors with brief descriptions
- [ ] Our differentiation vs. each is clearly stated
- [ ] Positioning statement written and agreed on

---

## Phase 3 — Processes (Complete within first month)

### Content
- [ ] `processes/CONTENT_WORKFLOW.md` exists
- [ ] Covers: content types we produce, who approves what, where content lives
- [ ] AI's role in content creation is clearly defined (drafts only? final copy? ideation?)

### Customer Communications
- [ ] `processes/CUSTOMER_COMMS.md` exists
- [ ] Covers: email tone and format, support response guidelines, escalation rules
- [ ] AI output review step is built into the workflow before anything goes to a customer

### Reporting
- [ ] `processes/REPORTING.md` exists
- [ ] Covers: what data we regularly analyse, preferred formats, key metrics definitions

---

## Phase 4 — Tool Integration (Complete when team is ready)

Work through [SETUP_GUIDE.md](SETUP_GUIDE.md) for each tool your team uses:

- [ ] Context loaded into primary AI chat tool (ChatGPT / Claude / Gemini)
- [ ] Master Prompt added to shared team resource
- [ ] Coding tools configured (if applicable — `.cursorrules`, `.windsurfrules`, etc.)
- [ ] Automation workflows updated to include Master Prompt as system message (if applicable)
- [ ] API integrations updated to use Master Prompt as system context (if applicable)

---

## Phase 5 — Governance & Maintenance

- [ ] An owner is assigned for maintaining context files
- [ ] A recurring review is scheduled (quarterly is a good default)
- [ ] The team knows how to suggest updates to context files
- [ ] Version control is set up — context files are tracked in git
- [ ] A process exists for updating the Master Prompt when source files change

---

## Quick Health Check

Run this quick test monthly to confirm your AI setup is still working well:

1. Open a fresh AI conversation
2. Paste your `your-business/prompts/MASTER_PROMPT.md`
3. Ask: *"Write a 3-sentence intro for a new product email to our customers."*
4. Ask: *"Describe what our business does to someone who's never heard of us."*
5. Ask: *"What are we not a good fit for?"*

If the answers feel accurate, on-brand, and genuinely useful — your setup is healthy.  
If something feels off — identify which context file needs updating and update it.

---

## Notes & Decisions Log

Use this space to record any important decisions made during setup, or context that doesn't fit neatly into any other file.

| Date | Decision / Note | Owner |
|------|----------------|-------|
| | | |
| | | |
| | | |
