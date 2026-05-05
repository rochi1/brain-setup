# Reporting

> **What this file is:** How AI is used to analyse data, summarise performance, and produce reports. Defines the metrics that matter, preferred formats, and prompts your team can reuse for regular reporting tasks.

---

## Key Metrics — What We Track

*Fill in the metrics that matter for your business. Delete the examples and replace with your own.*

### Business Performance
| Metric | Definition | Where it lives | Reported how often |
|--------|-----------|----------------|-------------------|
| *e.g. Monthly Recurring Revenue (MRR)* | *[Your definition]* | *[Tool / source]* | *Monthly* |
| *e.g. Customer Acquisition Cost (CAC)* | *[Your definition]* | *[Tool / source]* | *Monthly* |
| *e.g. Churn rate* | *[Your definition]* | *[Tool / source]* | *Monthly* |
| *[Metric]* | *[Definition]* | *[Source]* | *[Frequency]* |

### Marketing & Content
| Metric | Definition | Where it lives | Reported how often |
|--------|-----------|----------------|-------------------|
| *e.g. Website sessions* | *[Your definition]* | *[GA4 / other]* | *Weekly* |
| *e.g. Email open rate* | *[Your definition]* | *[Tool]* | *Per campaign* |
| *e.g. Lead volume* | *[Your definition]* | *[CRM]* | *Weekly* |
| *[Metric]* | *[Definition]* | *[Source]* | *[Frequency]* |

### Customer & Product
| Metric | Definition | Where it lives | Reported how often |
|--------|-----------|----------------|-------------------|
| *e.g. NPS score* | *[Your definition]* | *[Tool]* | *Quarterly* |
| *e.g. Support ticket volume* | *[Your definition]* | *[Tool]* | *Weekly* |
| *e.g. Feature adoption rate* | *[Your definition]* | *[Tool]* | *Monthly* |
| *[Metric]* | *[Definition]* | *[Source]* | *[Frequency]* |

---

## Report Types & Formats

### Weekly Snapshot

**Purpose:** Quick pulse check for the team — what's happening this week.  
**Audience:** Internal team  
**Format:** Short, bullet-driven. Numbers + one sentence of context. No extensive commentary.  
**Owner:** *[Role]*  
**Distributed via:** *[e.g. Slack, email, Notion]*

**AI prompt:**
```
Produce a weekly performance snapshot using the following data: [PASTE DATA]

Format:
**Week of [date]**

**Green (on track or improving):**
- [Metric]: [Number] — [one sentence context]

**Amber (watch closely):**
- [Metric]: [Number] — [one sentence context]

**Red (needs attention):**
- [Metric]: [Number] — [one sentence context]

**One thing to focus on this week:**
[Single most important action or observation]

Keep it short. No padding. If a metric is stable and unremarkable, it doesn't need to be mentioned.
```

---

### Monthly Report

**Purpose:** Review performance against targets; surface trends; make decisions.  
**Audience:** *[e.g. Leadership team / Board / Whole company]*  
**Format:** Narrative summary + key tables + 3–5 recommended actions  
**Owner:** *[Role]*  
**Distributed via:** *[e.g. Shared doc, presented in monthly meeting]*

**AI prompt:**
```
Produce a monthly performance report using the following data and context: [PASTE DATA]

Structure the report as:

1. **Executive Summary** (3–5 sentences) — what happened this month, the most important takeaway, and what it means for next month

2. **Key Metrics** — a table with: Metric | Target | Actual | vs Last Month | vs Last Year (where available)

3. **What Worked** — 3 specific things that drove positive results this month

4. **What Didn't** — 3 specific things that underperformed or caused problems, with honest assessment of why

5. **Trends to Watch** — emerging patterns (positive or negative) that aren't yet reflected in the numbers

6. **Recommended Actions** — 3–5 prioritised actions for next month, each with: action | owner | why it matters

Write for an audience of senior decision-makers who are time-poor. Lead with the most important thing. Don't bury bad news in the middle.
```

---

### Quarterly Business Review (QBR)

**Purpose:** Step back from the month-to-month and assess progress against longer-term goals.  
**Audience:** *[e.g. Leadership / Board / Investors]*  
**Format:** Slide narrative or written report — structured around goals, not just metrics  
**Owner:** *[Role]*

**AI prompt:**
```
Help me prepare a Quarterly Business Review for Q[X] [Year].

Context: [Paste quarterly data, goals set at the start of the quarter, and any major events]

Structure:
1. **Quarter in Review** — one paragraph on what defined this quarter
2. **Goals vs. Reality** — for each goal set at the start of the quarter: goal / outcome / why (if missed)
3. **Key Wins** — 3–5 with specific evidence
4. **Key Learnings** — what didn't work and what we now know
5. **Strategic Implications** — what does this quarter tell us about what to do next?
6. **Q[X+1] Priorities** — top 3 focus areas for next quarter with rationale

Be honest about underperformance. Decision-makers need the real picture, not a polished one.
```

---

### Ad Hoc Analysis

**Purpose:** Answer a specific business question using available data.

**AI prompt:**
```
Analyse the following data and answer this question: [YOUR QUESTION]

Data: [PASTE DATA]

In your analysis:
- State what the data actually shows (facts)
- Distinguish clearly between what you know and what you're inferring
- Flag any limitations in the data that affect confidence in the conclusion
- Give a direct answer to the question — don't just describe the data, interpret it
- End with: what should we do differently based on this?

Structure: Finding → Evidence → Confidence level → Recommendation
```

---

## Reporting Standards

These apply to all reports, AI-generated or not:

- **Lead with the takeaway** — the most important thing goes first, not last
- **Separate fact from interpretation** — be clear about what the data shows vs. what you think it means
- **Numbers need context** — "+20% sessions" means nothing without knowing the target, the trend, or what drove it
- **Bad news first** — don't soften difficult results by burying them after the good news
- **One owner per report** — if everyone is responsible, no one is
- **AI never interprets alone** — AI can structure and summarise; a human must validate the interpretation

---

## Reporting Calendar

*Map out your regular reporting rhythm.*

| Report | Frequency | Owner | Audience | Deadline | Distributed via |
|--------|-----------|-------|----------|----------|----------------|
| Weekly snapshot | Weekly | *[Role]* | *[Audience]* | *[e.g. Monday 9am]* | *[Channel]* |
| Monthly report | Monthly | *[Role]* | *[Audience]* | *[e.g. 5th of month]* | *[Channel]* |
| QBR | Quarterly | *[Role]* | *[Audience]* | *[e.g. First week of new quarter]* | *[Channel]* |
| *[Other]* | *[Frequency]* | *[Role]* | *[Audience]* | *[Deadline]* | *[Channel]* |

---

## Data Sources

*List where your data comes from so AI can be directed to the right source.*

| Data area | Source tool | Who has access | Export format |
|-----------|-------------|----------------|--------------|
| *e.g. Revenue / billing* | *[e.g. Stripe / Xero]* | *[Role]* | *[CSV / API / dashboard]* |
| *e.g. Website analytics* | *[e.g. GA4]* | *[Role]* | *[CSV / Looker Studio]* |
| *e.g. CRM / sales pipeline* | *[e.g. HubSpot]* | *[Role]* | *[CSV / report]* |
| *e.g. Customer support* | *[e.g. Intercom / Zendesk]* | *[Role]* | *[CSV / dashboard]* |
| *[Source]* | *[Tool]* | *[Access]* | *[Format]* |

---

## What AI Should Never Do in Reporting

- Invent or estimate figures that weren't in the source data
- Present inferences as facts
- Omit negative results or smooth over underperformance
- Make causal claims without evidence ("X caused Y" — usually requires more than correlation)
- Use the report format to tell leadership what they want to hear rather than what the data shows
