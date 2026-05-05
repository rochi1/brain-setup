# Quick Start — AI Business Setup in 4 Prompts

> **Time required:** 30–60 minutes  
> **What you'll have at the end:** A complete AI context foundation your whole team can use, with any tool, immediately.

No technical setup required. Just a business, an AI tool, and this guide.

---

## Before You Begin

You'll need:
- Access to any AI tool (ChatGPT, Claude, Gemini, Copilot, or similar)
- A basic understanding of your business (you don't need anything written down yet — the prompts will draw it out of you)
- This repo cloned or downloaded locally — the blank template files live in `templates/` and your filled-in files will be saved to `your-business/`

**How it works:** Each step asks you to paste the corresponding blank template from `templates/` into the prompt. The AI fills in the structure for you — then you save the completed file into `your-business/`. This keeps your business context clearly separated from the repo's setup files and makes it easy to upload, share, or load into any AI tool.

Work through the prompts **in order**. Each one builds on the last.

---

## Step 1 of 4 — Business Profile

**What it does:** Creates the foundational "who we are" document every other file references.  
**Template:** `templates/context/BUSINESS_PROFILE.md`  
**Save output to:** `your-business/context/BUSINESS_PROFILE.md`

**Before running this prompt:** Open `templates/context/BUSINESS_PROFILE.md` and copy its full contents. You'll paste it into the prompt below.

```
I'm setting up a context file so AI tools understand my business.

I have a template I need you to fill in — I'll paste it at the end of this message. Your job is to:

1. Interview me — ask one question at a time and wait for my answer before continuing
2. Cover every section in the template so no field is left empty
3. Once I've answered everything, return the completed template with my answers filled in, preserving all the headings and structure exactly as they appear in the template

Write all content in third person so it reads as a reference document, not a personal statement. Replace all italic placeholder text with real content. Do not add or remove sections.

Here is the template:

[PASTE CONTENTS OF templates/context/BUSINESS_PROFILE.md HERE]
```

---

## Step 2 of 4 — Brand Voice

**What it does:** Captures how you communicate, so AI always writes in your voice — not a generic one.  
**Save output to:** `your-business/context/BRAND_VOICE.md`

**Already have a brand guide or style guide?** Use **Prompt 2A** — upload or paste it and the AI will extract what it needs, then only ask questions about anything missing. Starting from scratch? Skip to **Prompt 2B**.

---

### Prompt 2A — Extract from an existing brand guide

**Before running this prompt:** Open `templates/context/BRAND_VOICE.md` and copy its full contents. You'll paste it into the prompt below alongside your existing brand guide.

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

[PASTE CONTENTS OF templates/context/BRAND_VOICE.md HERE]
```

---

### Prompt 2B — Build brand voice from scratch

**Before running this prompt:** Open `templates/context/BRAND_VOICE.md` and copy its full contents. You'll paste it into the prompt below.

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

[PASTE CONTENTS OF templates/context/BRAND_VOICE.md HERE]
```

---

## Step 3 of 4 — Master Prompt

**What it does:** Combines your context into a single reusable prompt — the one thing your team pastes at the start of any AI session.  
**Template:** `templates/prompts/MASTER_PROMPT.md`  
**Save output to:** `your-business/prompts/MASTER_PROMPT.md`

**Before running this prompt:** Open `templates/prompts/MASTER_PROMPT.md` and copy its full contents. Also copy the contents of every context file you've completed so far.

```
I've completed my business context files. I'm going to paste them below, along with a Master Prompt template.

Your job is to:
1. Read all the context files carefully
2. Fill in the Master Prompt template using the information from those files
3. Preserve the structure and all sections of the template exactly
4. Replace all placeholder text with real, specific content drawn from my context files
5. The finished Master Prompt must work with any AI model — no model-specific syntax

Here is the Master Prompt template to fill in:

[PASTE CONTENTS OF templates/prompts/MASTER_PROMPT.md HERE]

---

Here are my completed context files:

[PASTE CONTENTS OF your-business/context/BUSINESS_PROFILE.md HERE]

---

[PASTE CONTENTS OF your-business/context/BRAND_VOICE.md HERE]

---

[PASTE ANY OTHER COMPLETED CONTEXT FILES HERE — your-business/context/AUDIENCE.md, your-business/context/PRODUCTS_SERVICES.md, your-business/context/COMPETITORS.md]
```

---

## Step 4 of 4 — AI Policy

**What it does:** Sets the rules for how your team uses AI — what's approved, what needs review, and what's off-limits.  
**Template:** `templates/governance/AI_POLICY.md`  
**Save output to:** `your-business/governance/AI_POLICY.md`

**Before running this prompt:** Open `templates/governance/AI_POLICY.md` and copy its full contents. You'll paste it into the prompt below.

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

[PASTE CONTENTS OF templates/governance/AI_POLICY.md HERE]
```

---

## What to Do With Your Outputs

Once you have all four files saved:

1. **Share `your-business/prompts/MASTER_PROMPT.md`** with your team as the standard starting point for any AI task
2. **Add files to your AI tool's project/knowledge base** — see [SETUP_GUIDE.md](SETUP_GUIDE.md) for tool-specific instructions
3. **Work through [CHECKLIST.md](CHECKLIST.md)** to confirm your setup is complete
4. **Fill in the remaining context files** using the prompts below — each one makes your AI more accurate and useful

---

## Additional Context Prompts

The four steps above give you a working foundation. Run these when you're ready to go deeper. Each follows the same pattern: paste the template, answer the questions, save the output to `your-business/`.

---

### Audience & Personas

**What it does:** Defines your customer segments so AI always writes for the right person, focuses on real pain points, and avoids pitching to the wrong audience.  
**Template:** `templates/context/AUDIENCE.md`  
**Save output to:** `your-business/context/AUDIENCE.md`

**Before running this prompt:** Open `templates/context/AUDIENCE.md` and copy its full contents. You'll paste it into the prompt below.

```
I need to build an audience context file for my business. This file defines our customer personas so that AI tools always write for the right people, focus on real pain points, and avoid pitching to the wrong audience.

I have a template I need you to fill in — I'll paste it at the end of this message. Your job is to:

1. Interview me — ask one question at a time and wait for my answer before continuing
2. Work through one persona at a time — when a persona is complete, ask whether I have another segment to cover before moving on
3. After all personas, ask me about bad-fit customers and the customer lifecycle
4. Once I've answered everything, return the completed template with my answers filled in
5. Preserve all headings and structure exactly as they appear in the template
6. Replace all italic placeholder text with real, specific content

Here is the template:

[PASTE CONTENTS OF templates/context/AUDIENCE.md HERE]
```

---

### Products & Services

**What it does:** Documents everything you sell so AI describes your offering accurately and never invents features or promises.  
**Template:** `templates/context/PRODUCTS_SERVICES.md`  
**Save output to:** `your-business/context/PRODUCTS_SERVICES.md`

**Before running this prompt:** Open `templates/context/PRODUCTS_SERVICES.md` and copy its full contents.

```
I need to document my products and services so AI tools can describe them accurately.

I have a template I need you to fill in — I'll paste it at the end of this message. Your job is to:

1. Interview me — ask one question at a time, working through one product or service at a time
2. When one product is complete, ask if there's another before moving on
3. Once I've answered everything, return the completed template with my answers filled in
4. Preserve all headings and structure exactly as they appear in the template
5. Replace all italic placeholder text with real, specific content
6. Be precise about pricing and features — only include what I've confirmed. Never invent capabilities.

Here is the template:

[PASTE CONTENTS OF templates/context/PRODUCTS_SERVICES.md HERE]
```

---

### Competitors & Positioning

**What it does:** Gives AI the competitive context it needs to position you accurately and write differentiated copy.  
**Template:** `templates/context/COMPETITORS.md`  
**Save output to:** `your-business/context/COMPETITORS.md`

**Before running this prompt:** Open `templates/context/COMPETITORS.md` and copy its full contents.

```
I need to document our competitive position so AI tools can position us accurately and avoid making claims we can't back up.

I have a template I need you to fill in — I'll paste it at the end of this message. Your job is to:

1. Interview me — ask one question at a time, working through one competitor at a time
2. When one competitor is complete, ask if there's another before moving on
3. Also ask about indirect alternatives (e.g. doing nothing, spreadsheets, hiring internally)
4. Once I've answered everything, return the completed template with my answers filled in
5. Preserve all headings and structure exactly
6. For the claims table, only include claims I've explicitly confirmed with evidence

Here is the template:

[PASTE CONTENTS OF templates/context/COMPETITORS.md HERE]
```

---

## Tips

- **Paste the whole template.** Don't trim the template before pasting it into the prompt — the headings and structure are what tells the AI what to cover.
- **Save the output back over the template.** Your completed file should live in the same path as the template. The template text is replaced by your real content.
- **Don't overthink your answers.** These are living documents — update them as your thinking evolves. Getting something down is more valuable than getting it perfect.
- **Do it as a team.** Getting input from sales, marketing, and ops in Step 2 produces a much better brand voice than one person's view.
- **Re-run any prompt anytime.** If your business changes, redo the relevant step and paste the current file as the template — the AI will update it in the same format.
