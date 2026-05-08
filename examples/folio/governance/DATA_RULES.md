# Folio — Data Rules: What's Safe to Share With AI Tools

> **This is a fictional example.** It shows what a completed Data Rules document looks like for a growth-stage SaaS business. Use it as a reference when generating your own.

---

## The Core Principle

AI tools — including tools provided by major vendors — should be treated as external systems. Even where data processing agreements are in place, the default posture should be: **share only what's necessary to complete the task.**

When in doubt, anonymise before sharing.

---

## Data Classification

### 🟢 Green — Safe to Share

Data in this category can be used with AI tools freely.

| Data Type | Examples |
|-----------|---------|
| Public information | Folio website content, published pricing, press coverage, public product documentation |
| Anonymised / aggregated data | "Agency accounts with fewer than 5 projects" — no company names or identifying details |
| Generic internal content | Process docs, meeting templates, job descriptions without confidential specifics |
| Your own created content | Drafts, copy briefs, internal documentation you're working on |
| Non-confidential business context | Brand guidelines, product positioning, how the product works |

---

### 🟡 Amber — Use With Care

Data in this category can be used with AI tools but requires judgement. Remove identifiers where possible.

| Data Type | Guidance |
|-----------|---------|
| Customer feedback | Anonymise — replace agency names with "Agency A", remove contact names and emails. Aggregate themes rather than pasting raw support tickets. |
| Internal strategy documents | Remove specific financial targets, unannounced feature timelines, and partnership details before sharing |
| Sales pipeline data | Discuss in abstract terms — "an enterprise prospect in the US" not the company name or contact |
| Engineering architecture | Remove credentials, internal hostnames, and proprietary implementation details |
| Financial data | Historical public figures fine; MRR, churn, runway, margin — keep out |
| HR or team discussions | Abstract only — "a team member" not a name |

---

### 🔴 Red — Do Not Share

Data in this category must never be pasted into an AI tool.

| Data Type | Why |
|-----------|-----|
| Customer personal data | Names, emails, company names linked to tickets, IP addresses, payment details — GDPR applies |
| Customer usage data that identifies individuals | Session logs, activity tied to named accounts |
| Unpublished financial data | MRR, ARR, churn rate, runway, cap table, investor terms |
| Passwords or credentials | Never, under any circumstances — including internal API keys |
| Data covered by customer NDA or confidentiality agreement | Any information customers have shared with us in confidence |
| Staff personal data | Salary, performance reviews, medical information, personal circumstances |
| Legal privileged communications | Any communication with legal counsel |
| Unannounced roadmap specifics | Feature names, timelines, or decisions not yet public |

---

## Anonymising Data — Quick Guide

| Instead of | Use |
|------------|-----|
| Agency name "Bright Studio" | "Agency A" or "a mid-sized branding studio" |
| Contact "Alex Morgan, alex@brightstudio.com" | "the agency owner" |
| "Our MRR is $X" | "our revenue" or omit entirely |
| Specific churn figure | "our churn rate" — describe the problem without the number |
| Employee name in a scenario | "a team member" or "the person in this role" |

**Test:** After anonymising, ask — could someone reading this back-identify the individual, company, or internal figure? If yes, anonymise further.

---

## Tool-Specific Notes

| Tool | Data agreement in place? | Notes |
|------|--------------------------|-------|
| Claude (Anthropic) — Teams plan | Yes — Teams plan DPA; data not used for training | Engineering and customer data still require anonymisation |
| ChatGPT (OpenAI) — Team plan | Yes — Team plan DPA; training opt-out configured | Apply same rules as other external tools |
| GitHub Copilot — Business plan | Yes — Business plan; content exclusions enabled | Avoid pasting env files, secrets, or credentials |
| Cursor | Using with local codebase; network requests reviewed | No production secrets in `.cursor` context |

---

## If You're Unsure

1. **Ask yourself:** Would I be comfortable if this data appeared in a training dataset or was seen by someone at the AI company?
2. **Ask yourself:** Is sharing this necessary, or can I describe the scenario without the real data?
3. **Ask someone:** Message `#ai-policy` on Slack or contact the Head of Operations.

Err on the side of caution. A data incident is far more costly than an extra five minutes anonymising.

---

## Incident Reporting

If you believe you've accidentally shared data that falls under Amber or Red categories:

1. Stop the conversation and close it if possible
2. Note what was shared, with which tool, and when
3. Report to the Head of Operations immediately via Slack DM
4. Do not attempt to cover up or minimise — early reporting significantly reduces risk

---

## Review

This document is reviewed alongside the AI Policy. Update it whenever:
- A new AI tool is adopted
- Vendor data terms change materially
- A data incident occurs
- Applicable law or regulation changes

**Last reviewed:** March 2026
**Owner:** Head of Operations
