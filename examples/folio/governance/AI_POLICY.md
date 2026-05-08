# Folio — AI Use Policy

> **This is a fictional example.** It shows what a completed AI policy looks like for a growth-stage SaaS business. Use it as a reference when generating your own with the setup wizard.

---

# Folio — AI Use Policy

**Version:** 1.1
**Effective date:** 1 March 2026
**Owner:** Head of Operations
**Next review:** 1 March 2027

---

## Purpose

This policy sets out how Folio uses artificial intelligence tools — what's approved, what requires review, and what's off-limits. It applies to everyone at Folio who uses AI tools as part of their work.

The goal is not to restrict AI use — it's to make sure we use it responsibly, consistently, and in a way that protects our customers, our data, and our reputation.

---

## Tools We Currently Use

| Tool | Approved use cases |
|------|--------------------|
| Claude (Anthropic) — Teams plan | Drafting, research, long-form writing, document analysis, customer communications |
| ChatGPT (OpenAI) — Team plan | Ideation, drafting, summarising, code assistance |
| GitHub Copilot — Business plan | Code generation and review (engineering team only) |
| Cursor | Code generation and review (engineering team only) |

**Using a tool not on this list?** Check with the Head of Operations before using any AI tool for Folio work. This includes free consumer tools like the free tier of any platform listed above.

---

## What AI Is Approved For

These tasks are approved for AI use without additional review:

- Drafting internal documents, emails, and Slack messages (reviewed by sender before sending)
- Summarising meetings, articles, or long documents
- Brainstorming ideas, copy angles, and feature concepts
- Writing and reviewing code (subject to standard engineering review process)
- Research and information gathering (always verify before treating as fact)
- Creating first drafts of marketing copy (subject to review before publishing)
- Generating first drafts of customer-facing emails and templates (subject to review)
- Analysing anonymous, aggregated user data for product decisions

**Important:** "Approved" means AI can be used for these tasks — it does not mean AI output can be used without being read, checked, and edited by a human first.

---

## What Requires Human Review Before Use

AI output in these areas must be reviewed and approved by a qualified team member before it is used, shared, or published:

| Task | Who reviews |
|------|-------------|
| Any customer-facing content (emails, in-app copy, help docs) | Marketing lead or product manager |
| Pricing or commercial commitments | Head of Sales or CEO |
| Legal or contractual language | Legal counsel or CEO |
| PR statements or external communications | CEO |
| Engineering code going into production | Senior engineer via standard PR review |
| Any content making specific product claims | Product manager |

---

## What AI Must Not Be Used For

The following uses of AI are not permitted at Folio:

- Making final decisions about hiring, performance management, or termination without human judgement
- Generating content that misrepresents who authored it (fake testimonials, fabricated reviews, impersonation)
- Processing customer personal data (names, emails, usage patterns, payment data) in any AI tool not covered by a signed Data Processing Agreement
- Claiming product capabilities that don't exist — including claiming SSO is available before it ships
- Generating content about competitors that is misleading or defamatory
- Bypassing any security control or access restriction using AI assistance

---

## Data Rules — What to Keep Out of AI Tools

> See [DATA_RULES.md](DATA_RULES.md) for the full data classification framework.

**Never paste into an AI tool:**

- Customer personal data (names, emails, company names linked to support tickets, usage data that identifies individuals)
- Confidential financial data — MRR, ARR, churn figures, runway, investor terms
- Proprietary source code outside the approved engineering tools (GitHub Copilot, Cursor)
- Staff personal or performance information
- Data subject to NDA or customer confidentiality agreements
- Unannounced product roadmap details

**Safe to use:**

- Anonymised customer feedback (remove names and identifying details)
- Publicly available information about Folio (website, press, public pricing)
- Internal documents with no confidential specifics
- Aggregated, non-identifiable usage statistics

**When in doubt:** Remove or anonymise before pasting. If you're still unsure, ask the Head of Operations.

---

## Compliance Considerations

### GDPR / Data Protection

Folio is subject to GDPR as we serve customers in the UK and EU. AI tools are used only for data that does not constitute personal data under GDPR. Where real user scenarios are being discussed, they must be anonymised — company name replaced with "Agency A", user name with "User 1", etc.

We have data processing agreements in place with Anthropic (Claude Teams) and OpenAI (ChatGPT Team). These agreements confirm that our data is not used to train models. GitHub Copilot Business plan has content exclusions enabled.

### AI-Generated Content Disclosure

We do not currently require disclosure of AI-assisted content for internal use. For external content — blog posts, case studies, customer emails — AI assistance is used as a drafting aid; all published content is reviewed, edited, and signed off by a Folio team member. We do not publish AI output verbatim.

---

## Responsibilities

| Role | Responsibility |
|------|---------------|
| CEO | Owning overall direction for AI use; approving significant new tool adoptions |
| Head of Operations | Maintaining and updating this policy; fielding questions; managing incidents |
| Team leads | Ensuring their team understands and follows this policy |
| All team members | Reading, understanding, and following this policy; reporting incidents |

**Questions about this policy?** Contact the Head of Operations via Slack (`#ai-policy`) or email.

---

## Staying Current

AI tools and capabilities change rapidly. This policy will be reviewed:

- Annually as standard (next: March 2027)
- Whenever we adopt a significant new AI tool
- Following any incident related to AI use
- When relevant law or regulation changes

Team members are encouraged to flag questions, edge cases, or suggested updates in `#ai-policy`.

---

## Acknowledgement

By using AI tools as part of your work at Folio, you confirm that you have read and understood this policy. New joiners acknowledge this policy as part of onboarding.
