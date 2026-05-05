# Quick Start — AI Business Setup in 4 Prompts

> **Time required:** 30–60 minutes  
> **What you'll have at the end:** A complete AI context foundation your whole team can use, with any tool, immediately.

No technical setup required. Just a business, an AI tool, and this guide.

---

## Before You Begin

You'll need:
- Access to any AI tool (ChatGPT, Claude, Gemini, Copilot, or similar)
- A basic understanding of your business (you don't need anything written down yet — the prompts will draw it out of you)
- This repo cloned or downloaded locally — the template files in `context/`, `prompts/`, and `governance/` are used directly in the prompts below

**How it works:** Each step asks you to paste the corresponding template file into the prompt. The AI fills in the structure for you — then you save that completed file back over the template. This keeps all outputs in a consistent, predictable format across every business that uses this repo.

Work through the prompts **in order**. Each one builds on the last.

---

## Step 1 of 4 — Business Profile

**What it does:** Creates the foundational "who we are" document every other file references.  
**Template:** `context/BUSINESS_PROFILE.md`  
**Save output to:** `context/BUSINESS_PROFILE.md` (overwrite the template with your completed version)

**Before running this prompt:** Open `context/BUSINESS_PROFILE.md` and copy its full contents. You'll paste it into the prompt below.

```
I'm setting up a context file so AI tools understand my business.

I have a template I need you to fill in — I'll paste it at the end of this message. Your job is to:

1. Interview me — ask one question at a time and wait for my answer before continuing
2. Cover every section in the template so no field is left empty
3. Once I've answered everything, return the completed template with my answers filled in, preserving all the headings and structure exactly as they appear in the template

Write all content in third person so it reads as a reference document, not a personal statement. Replace all italic placeholder text with real content. Do not add or remove sections.

Here is the template:

[PASTE CONTENTS OF context/BUSINESS_PROFILE.md HERE]
```

---

## Step 2 of 4 — Brand Voice

**What it does:** Captures how you communicate, so AI always writes in your voice — not a generic one.  
**Save output to:** `context/BRAND_VOICE.md`

**Already have a brand guide or style guide?** Use **Prompt 2A** — upload or paste it and the AI will extract what it needs, then only ask questions about anything missing. Starting from scratch? Skip to **Prompt 2B**.

---

### Prompt 2A — Extract from an existing brand guide

**Before running this prompt:** Open `context/BRAND_VOICE.md` and copy its full contents. You'll paste it into the prompt below alongside your existing brand guide.

```
I'm going to share two things: my existing brand guide and a template I need filled in.

Your job is to:
1. Read the brand guide fully
2. Extract everything relevant to voice, tone, language, and communication style
3. Use that information to fill in the template
4. Identify any sections in the template that aren't covered by what I've shared
5. Ask me targeted questions — one at a time — ONLY for the missing information

Once you've filled any gaps with my answers, return the completed template with every section filled in. Preserve all headings and structure exactly. Replace all italic placeholder text with real content.

Here is my brand guide:

[PASTE YOUR BRAND GUIDE HERE — or if your AI tool supports file uploads, attach it directly]

---

Here is the template to fill in:

[PASTE CONTENTS OF context/BRAND_VOICE.md HERE]
```

---

### Prompt 2B — Build brand voice from scratch

**Before running this prompt:** Open `context/BRAND_VOICE.md` and copy its full contents. You'll paste it into the prompt below.

```
I need to define my brand voice so AI tools write consistently for my business.

I have a template I need you to fill in — I'll paste it at the end of this message. Your job is to:

1. Interview me — ask one question at a time, covering every section of the template
2. Once I've answered everything, return the completed template with my answers filled in
3. Preserve all headings and structure exactly as they appear in the template
4. Replace all italic placeholder text with real, specific content
5. For the DO / DON'T table, provide at least 10 rows
6. For the before/after examples, write genuine rewrites based on what you've learned about our voice

Here is the template:

[PASTE CONTENTS OF context/BRAND_VOICE.md HERE]
```

---

## Step 3 of 4 — Master Prompt

**What it does:** Combines your context into a single reusable prompt — the one thing your team pastes at the start of any AI session.  
**Template:** `prompts/MASTER_PROMPT.md`  
**Save output to:** `prompts/MASTER_PROMPT.md` (overwrite the template with your completed version)

**Before running this prompt:** Open `prompts/MASTER_PROMPT.md` and copy its full contents. Also copy the contents of every context file you've completed so far.

```
I've completed my business context files. I'm going to paste them below, along with a Master Prompt template.

Your job is to:
1. Read all the context files carefully
2. Fill in the Master Prompt template using the information from those files
3. Preserve the structure and all sections of the template exactly
4. Replace all placeholder text with real, specific content drawn from my context files
5. The finished Master Prompt must work with any AI model — no model-specific syntax

Here is the Master Prompt template to fill in:

[PASTE CONTENTS OF prompts/MASTER_PROMPT.md HERE]

---

Here are my completed context files:

[PASTE CONTENTS OF context/BUSINESS_PROFILE.md HERE]

---

[PASTE CONTENTS OF context/BRAND_VOICE.md HERE]

---

[PASTE ANY OTHER COMPLETED CONTEXT FILES HERE — AUDIENCE.md, PRODUCTS_SERVICES.md, COMPETITORS.md]
```

---

## Step 4 of 4 — AI Policy

**What it does:** Sets the rules for how your team uses AI — what's approved, what needs review, and what's off-limits.  
**Template:** `governance/AI_POLICY.md`  
**Save output to:** `governance/AI_POLICY.md` (overwrite the template with your completed version)

**Before running this prompt:** Open `governance/AI_POLICY.md` and copy its full contents. You'll paste it into the prompt below.

```
I need a practical internal AI policy for my business.

I have a template I need you to fill in — I'll paste it at the end of this message. Your job is to:

1. Interview me — ask one question at a time and wait for my answer before continuing
2. Cover every section in the template so no field is left empty
3. Once I've answered everything, return the completed template with my answers filled in
4. Preserve all headings and structure exactly as they appear in the template
5. Replace all italic placeholder text with real, specific content
6. Write in plain English — a non-technical team member should be able to read and follow it in 5 minutes

Here is the template:

[PASTE CONTENTS OF governance/AI_POLICY.md HERE]
```

---

## What to Do With Your Outputs

Once you have all four files saved:

1. **Share `prompts/MASTER_PROMPT.md`** with your team as the standard starting point for any AI task
2. **Add files to your AI tool's project/knowledge base** — see [SETUP_GUIDE.md](SETUP_GUIDE.md) for tool-specific instructions
3. **Work through [CHECKLIST.md](CHECKLIST.md)** to confirm your setup is complete
4. **Fill in the remaining template files** in `context/` and `processes/` as you have time — each one makes your AI more accurate and useful

---

## Tips

- **Paste the whole template.** Don't trim the template before pasting it into the prompt — the headings and structure are what tells the AI what to cover.
- **Save the output back over the template.** Your completed file should live in the same path as the template. The template text is replaced by your real content.
- **Don't overthink your answers.** These are living documents — update them as your thinking evolves. Getting something down is more valuable than getting it perfect.
- **Do it as a team.** Getting input from sales, marketing, and ops in Step 2 produces a much better brand voice than one person's view.
- **Re-run any prompt anytime.** If your business changes, redo the relevant step and paste the current file as the template — the AI will update it in the same format.
