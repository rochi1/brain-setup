# AI Output Review Process

> **What this file is:** A framework for reviewing AI-generated output before it's used. Defines who reviews what, what they're checking for, and how to handle output that needs changes.

---

## Why This Matters

AI output is a starting point, not a finished product. A review process ensures that:
- Output is accurate before it reaches customers or stakeholders
- Our voice and standards are maintained consistently
- Errors, hallucinations, or inappropriate content are caught before they cause damage
- The team builds good habits rather than blindly copy-pasting

The level of review should match the level of risk. A quick internal Slack message needs less scrutiny than a legal document or press release.

---

## Review Tiers

### Tier 1 — Self-Review (Low risk)

**Applies to:** Internal drafts, personal notes, rough brainstorms, low-stakes internal communications.

**Who reviews:** The person who created it — before using or sending.

**What to check:**
- [ ] Is it factually accurate? (Don't assume AI got the facts right)
- [ ] Does it represent us appropriately?
- [ ] Would I be comfortable if someone else saw this?
- [ ] Have I removed any AI-specific filler ("Certainly!", "As an AI...")?

**Time expectation:** 2–5 minutes.

---

### Tier 2 — Peer Review (Medium risk)

**Applies to:** Customer-facing content, outbound emails, social media posts, internal documents shared broadly, presentations.

**Who reviews:** One other team member — ideally the person closest to the subject matter or the audience.

**What to check:**
- [ ] Everything in Tier 1
- [ ] Is the information current and accurate?
- [ ] Does it sound like us — not like a generic AI?
- [ ] Is it appropriate for the audience and channel?
- [ ] Are there any claims that need verification or softening?
- [ ] Is the call to action clear and correct?

**Time expectation:** 5–15 minutes.

**Sign-off:** The reviewer confirms verbally, by message, or in whatever workflow tool is used (e.g. Notion, Linear, Asana).

---

### Tier 3 — Senior Review (High risk)

**Applies to:** Press releases, formal proposals, legal or compliance documents, content that makes specific claims about competitors, anything that represents an official position of the business.

**Who reviews:** A senior team member or the designated content / comms lead, as specified in `AI_POLICY.md`.

**What to check:**
- [ ] Everything in Tiers 1 and 2
- [ ] Are all factual claims verifiable?
- [ ] Are there any legal, compliance, or reputational risks?
- [ ] Does this align with current company strategy and messaging?
- [ ] Has the relevant stakeholder (legal, finance, leadership) been consulted where needed?
- [ ] Is final approval documented?

**Time expectation:** Variable — allow appropriate time, especially for external-facing content.

**Sign-off:** Written approval (email, documented in project management tool, or signed document for formal content).

---

## Review Checklist — Universal

Regardless of tier, use these questions as a baseline for any AI-generated content before it's used:

### Accuracy
- [ ] Are all specific facts, figures, and dates correct?
- [ ] Has the AI invented or assumed anything that isn't true? (Hallucinations happen)
- [ ] Have links, names, and references been verified?

### Voice & Brand
- [ ] Does this sound like us?
- [ ] Have generic AI phrases been removed?
- [ ] Is the tone appropriate for the audience and context?

### Audience
- [ ] Is this written for the right person?
- [ ] Does it address what that person actually needs to know?
- [ ] Are there any assumptions that don't apply to this specific audience?

### Completeness & Clarity
- [ ] Is anything important missing?
- [ ] Is anything confusing or ambiguous?
- [ ] Is the call to action (if any) clear?

### Risk
- [ ] Could any part of this mislead, offend, or cause harm?
- [ ] Does it make any commitments we can't keep?
- [ ] Does it contain any data that shouldn't be in the final output?

---

## Handling Output That Needs Changes

### Minor edits
Edit directly. No need to re-run the AI prompt unless the changes are substantial.

### Significant rework needed
Go back to the AI with specific feedback rather than trying to fix everything manually. Use the pattern:

```
The draft you gave me needs the following changes:

1. [Specific issue] — [What you want instead]
2. [Specific issue] — [What you want instead]
3. [Specific issue] — [What you want instead]

Please revise accordingly. Keep everything else the same.
```

### Output is fundamentally wrong
If the AI clearly misunderstood the task, start fresh with a better prompt. Don't try to salvage fundamentally broken output — it's faster to re-prompt well than to edit heavily.

---

## Feedback Loop

When AI output consistently misses the mark in a particular way, that's a signal to update your context files or prompts — not just fix the individual output.

| Pattern noticed | Likely fix |
|----------------|------------|
| Tone is consistently off | Update `BRAND_VOICE.md`, regenerate `MASTER_PROMPT.md` |
| Facts or product details are wrong | Update `PRODUCTS_SERVICES.md` or `BUSINESS_PROFILE.md` |
| Audience feels wrong | Update `AUDIENCE.md`, add persona notes |
| AI keeps using forbidden phrases | Add them explicitly to the Master Prompt constraints |
| Output format is never quite right | Add format instructions to the relevant task in `TASK_LIBRARY.md` |

---

## Review Log (Optional)

For high-stakes content, maintain a record of what was reviewed, who reviewed it, and when. Use whatever system your team already uses for approvals — this is the minimum to track:

| Date | Content | Tier | Reviewer | Approved? | Notes |
|------|---------|------|----------|-----------|-------|
| | | | | | |
| | | | | | |
