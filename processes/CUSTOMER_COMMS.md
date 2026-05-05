# Customer Communications

> **What this file is:** Guidelines for how AI is used in customer-facing communications — email, chat, support, and any other direct customer touchpoints. The goal is consistent, on-brand communication that never lets a customer feel like they're talking to a machine.

---

## Principles

These apply to all customer communications, AI-assisted or not:

1. **The customer's experience always comes first** — fast, accurate, and helpful beats clever
2. **AI drafts; humans send** — no AI output goes directly to a customer without a human reading it
3. **Honesty over polish** — if something went wrong, say so clearly. Don't use AI to dress up a bad situation with corporate language
4. **Consistency matters** — customers should get the same quality of communication regardless of who on the team is handling it

---

## Communication Types & AI's Role

### Inbound Support — Email

**AI's role:** *[e.g. Draft suggested responses / Summarise ticket context / Classify and triage / Full draft for review]*

**Workflow:**
1. *[e.g. Support ticket arrives in [tool]]*
2. *[e.g. AI draft generated using template below, or suggested in [tool]]*
3. *[e.g. Support agent reviews, edits, and personalises]*
4. *[e.g. Sends — no further approval needed for standard queries / escalates complex cases to [role]]*

**AI prompt for support responses:**
```
Draft a response to the following customer support email. 

Customer message: [PASTE MESSAGE]

Context about the customer (if known): [Account type / history / any relevant background]

Situation type: [e.g. Bug report / Billing question / Feature request / Complaint / How-to question]

The response should:
- Acknowledge what they've said and show we've understood
- Answer their question directly or explain the next step clearly
- Be written in our brand voice — warm but not gushing, direct but not curt
- Avoid corporate deflection phrases ("We apologise for any inconvenience caused")
- End with a clear next step or open door

If you don't have enough information to answer fully, draft a response that acknowledges the issue and confirms we'll follow up — with a realistic timeframe.
```

---

### Inbound Support — Live Chat

**AI's role:** *[e.g. Suggested replies / Not used in live chat / Chatbot for first response only]*

**Handoff rule:** *[e.g. "Chatbot handles FAQs. Any query involving payment, account access, or a complaint is handed to a human immediately. The handoff message is: 'Let me get someone from the team to help you with this directly.'"]*

**What AI should never handle in chat without human oversight:**
- Payment or billing disputes
- Account security issues
- Complaints or expressions of dissatisfaction
- Anything requiring a promise or commitment
- *[Add your own]*

---

### Outbound — Marketing Emails

See `processes/CONTENT_WORKFLOW.md` for the full content process.

**Customer-specific notes:**
- Segment carefully — AI can generate copy, but humans decide who receives it
- Personalisation fields must be reviewed before a send — AI can introduce incorrect merge logic
- Batch sends require Tier 2 review minimum (see `governance/REVIEW_PROCESS.md`)

---

### Outbound — Transactional Emails

*(Automated emails triggered by customer actions — welcome, confirmation, renewal, etc.)*

**AI's role here:** Template creation only. Once a transactional email template is approved, it runs without ongoing review for each instance — so the upfront review must be thorough.

**Review checklist for transactional email templates:**
- [ ] Trigger is correct and tested
- [ ] All dynamic fields (name, product, date) are mapped correctly
- [ ] Tone is appropriate for this moment in the customer journey
- [ ] There's a clear next step or contact point if something goes wrong
- [ ] Reviewed and signed off by *[Role]* before activation

---

### Difficult Conversations — Complaints, Refunds, Escalations

**AI's role:** Draft only. Use with extra care.

**What to watch for in AI-drafted complaint responses:**
- Over-apologising in a way that implies legal liability
- Vague promises ("We'll look into this") without a concrete timeline
- Missing the actual emotion — the customer is frustrated, not just seeking information
- Tone that's too clinical when warmth is needed

**Prompt for complaint responses:**
```
A customer has sent us a complaint. Draft a response.

Their message: [PASTE MESSAGE]

The facts of the situation: [What actually happened, from our side]

What we can offer: [e.g. Refund / Fix / Explanation / Apology only / Escalation]

The response must:
- Open by acknowledging what happened — not with "I apologise for any inconvenience" but with a genuine, specific acknowledgement
- Be honest about what went wrong if we're at fault
- State clearly what we're going to do and by when
- Not make promises we can't keep
- End with a direct contact point so they feel in good hands

Do not use the phrase "any inconvenience". Do not over-apologise. Sound like a person who gives a damn, not a support script.
```

---

## Voice in Customer Comms

Refer to `context/BRAND_VOICE.md` for the full guidelines. Customer comms specific notes:

| Situation | Tone adjustment |
|-----------|----------------|
| Standard support | *[e.g. Warm, efficient, friendly — not formal]* |
| Complaint / frustration | *[e.g. More empathetic, slower, human — resist the urge to jump to solutions immediately]* |
| Positive feedback / thanks | *[e.g. Genuine warmth — but not over the top. Don't reply to "Thanks!" with three paragraphs.]* |
| Bad news (outage, delay, error) | *[e.g. Direct and honest — what happened, what we're doing, what they should do]* |

---

## Response Time Standards

*Set your standards here so AI-assisted responses still meet expectations.*

| Channel | Target response time | Who is responsible |
|---------|---------------------|--------------------|
| *e.g. Support email* | *e.g. Within 4 business hours* | *e.g. Support team* |
| *e.g. Live chat* | *e.g. Within 5 minutes during business hours* | *e.g. Support team* |
| *e.g. Social media DMs* | *e.g. Within 24 hours* | *e.g. Marketing / Support* |
| *e.g. Formal complaints* | *e.g. Acknowledged within 1 hour, resolved within 48 hours* | *e.g. [Senior role]* |

---

## Escalation Path

*When a customer situation exceeds what the standard workflow handles, where does it go?*

| Trigger | Escalate to | How |
|---------|-------------|-----|
| *e.g. Customer threatening legal action* | *e.g. [Role]* | *e.g. Tag in ticket, notify by Slack immediately* |
| *e.g. Refund request over [amount]* | *e.g. [Role]* | *e.g. [Process]* |
| *e.g. Repeat complaint (3+ contacts)* | *e.g. [Role]* | *e.g. [Process]* |
| *e.g. Media / press enquiry* | *e.g. [Role]* | *e.g. Do not respond directly — forward immediately* |

---

## Things AI Must Never Do in Customer Comms

- Send anything directly to a customer without human review
- Make promises about refunds, timelines, or outcomes without human approval
- Discuss pricing, discounts, or commercial terms without checking current policy
- Reference other customers or internal information
- Use a tone that would embarrass the business if screenshotted and shared publicly
- *[Add your own]*
