# Data Rules — What's Safe to Share With AI Tools

> **What this file is:** A practical classification framework that tells your team, at a glance, what data can and can't be shared with AI tools. Complements the AI Policy and is designed to be readable without legal expertise.

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
| Public information | Published website content, press releases, public pricing, publicly available market data |
| Anonymised / aggregated data | Reports where individuals cannot be identified, aggregate usage stats |
| Generic internal content | Meeting templates, process documentation (without sensitive specifics), job descriptions |
| Your own created content | Drafts you've written, internal copy, ideas you're developing |
| Non-confidential business context | Your brand guidelines, product descriptions, market positioning |

---

### 🟡 Amber — Use With Care

Data in this category can be used with AI tools but requires judgement. Remove identifiers where possible. Do not paste in full unless necessary.

| Data Type | Guidance |
|-----------|---------|
| Internal strategy documents | Remove names, specific financial targets, and acquisition/partnership details before sharing |
| Customer feedback | Anonymise — remove names, email addresses, company names unless they're publicly known and the feedback is already public |
| Employee performance or HR matters | Discuss in abstract terms only — never paste real names or identifying details |
| Supplier / partner information | Check NDAs before sharing any specifics |
| Financial data | Aggregated or historical public figures may be fine; current unreported figures are not |
| Internal emails or communications | Remove sender/recipient names; be mindful of confidential discussions |

---

### 🔴 Red — Do Not Share

Data in this category must never be pasted into an AI tool.

| Data Type | Why |
|-----------|-----|
| Customer personal data | Names, email addresses, phone numbers, physical addresses, payment details — GDPR / privacy law applies |
| Sensitive personal data | Health information, financial circumstances, political views, biometric data |
| Unpublished financial data | Revenue figures, forecasts, margin data, M&A activity |
| Passwords or credentials | Never, under any circumstances |
| Data covered by NDA | Any information you are contractually prohibited from disclosing |
| Child data | Any data relating to individuals under 18 |
| Legal privileged information | Communications with legal counsel that carry privilege |
| Source code marked confidential | Unless specifically approved and covered by vendor data agreements |

---

## Anonymising Data — Quick Guide

If you need to use real data to complete a task, anonymise it first:

| Instead of | Use |
|------------|-----|
| Customer name "Sarah Johnson" | "Customer A" or "[Name]" |
| Email "sarah@company.com" | "[email]" |
| "Acme Corp — our biggest client" | "a large enterprise client in [sector]" |
| Specific revenue figure | "[Revenue figure]" or a ballpark range |
| Employee name in a scenario | "a team member" or "the employee" |

**Test:** After anonymising, ask — could someone reading this back-identify the individual or organisation? If yes, anonymise further.

---

## Tool-Specific Notes

*Update this section based on the specific tools your team uses and the data agreements you have in place.*

| Tool | Data agreement in place? | Notes |
|------|--------------------------|-------|
| *e.g. ChatGPT (OpenAI)* | *e.g. Yes — Enterprise plan, DPA signed* | *e.g. Training on our data is opted out* |
| *e.g. Claude (Anthropic)* | *e.g. API — data not used for training* | *e.g. Check current terms for commercial plan* |
| *e.g. GitHub Copilot* | *e.g. Yes — Business plan* | *e.g. Code snippets subject to standard IP considerations* |
| *[Tool]* | *[Yes / No / Unknown]* | *[Notes]* |

**Where you don't have a data processing agreement:** Treat the tool as if it stores and may use anything you share. Apply Red rules strictly and Amber rules conservatively.

---

## If You're Unsure

1. **Ask yourself:** Would I be comfortable if this data appeared in a training dataset or was seen by someone at the AI company?
2. **Ask yourself:** Is sharing this necessary to complete the task, or can I describe the scenario without the real data?
3. **Ask someone:** Contact *[Policy owner / Data protection contact]* if you're not sure.

Err on the side of caution. The cost of a data incident is far higher than the cost of being more careful.

---

## Incident Reporting

If you believe you've accidentally shared data that falls under Amber or Red categories:

1. Stop the conversation and close it if possible
2. Note what was shared, with which tool, and when
3. Report to *[Data protection contact / Policy owner]* immediately
4. Do not attempt to fix or cover up — early reporting significantly reduces risk

---

## Review

This document should be reviewed alongside the AI Policy. Update it whenever:
- A new AI tool is adopted
- Vendor data terms change
- A data incident occurs
- Applicable law or regulation changes

**Last reviewed:** *[Date]*  
**Owner:** *[Role]*
