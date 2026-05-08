# Guide: How to Write a Good Prompt

> **What this is:** A practical guide to getting useful output from AI tools — specifically with your business context files already loaded.
>
> **Who it's for:** Anyone using an AI tool for work tasks.

---

## The core idea

AI output is only as good as the instruction it receives. Most frustrating AI experiences come from vague prompts that leave too much for the AI to guess.

A good prompt has three things:

1. **Context** — what's the situation? (Your Master Prompt handles this when loaded)
2. **Task** — what exactly do you want the AI to do?
3. **Constraints** — what must the output include, avoid, or conform to?

---

## Start with your Master Prompt

Before giving any task, load your Master Prompt. This tells the AI:
- Who your business is
- How you communicate
- Who your customers are
- What you sell

Without it, the AI writes generically. With it, every output reflects your business. See the **Master Prompt guide** for how to load it.

---

## The anatomy of a strong prompt

### Give the AI a role

Tell the AI what perspective to bring.

> ❌ "Write an email about our new product."
>
> ✅ "Act as a Senior Copywriter who knows our brand deeply. Write a launch email for our new product."

Role prompts focus the output. The Prompt Library has pre-built role prompts ready to use.

---

### Be specific about the task

Vague tasks produce vague output.

> ❌ "Write a blog post."
>
> ✅ "Write a 700-word blog post aimed at [PERSONA] on the topic of [TOPIC]. The goal is to build trust, not sell. End with a soft link to our [RELEVANT PRODUCT/SERVICE]."

Fill in the specifics. The AI cannot guess what you actually need.

---

### Specify the format

If you need a specific format, ask for it explicitly.

> "Return this as a numbered list."
> "Use headings and subheadings."
> "Write this as a table with columns: [Column A], [Column B], [Column C]."
> "Keep it under 150 words."
> "Give me three options."

Without format instructions, the AI picks what it thinks is appropriate — which may not be what you need.

---

### Provide the raw material

If the task involves specific information, include it in the prompt.

> "Here are our key product features: [LIST]. Write a comparison table against a generic competitor."
>
> "Here are the meeting notes: [PASTE NOTES]. Summarise into action items with owners."

Don't expect the AI to invent facts. Give it the information, then tell it what to do with it.

---

### Set the constraints

What must the output avoid?

> "Do not use bullet points."
> "Don't mention price directly — focus on value."
> "This is for a customer who is already frustrated — don't be defensive."
> "Avoid using the word 'leverage'."

Constraints are as useful as the task itself.

---

## Prompting techniques that work

### Ask for a draft, then improve it

Don't expect perfection on the first attempt. Treat the first output as a starting point.

> "This is close but the tone is too formal. Rewrite in a more conversational way."
> "Good structure. Now make the opening line more direct."
> "The third paragraph is too long — cut it by half."

Iteration is normal. The best copywriters know that the first draft is just raw material.

---

### Ask the AI to check its own work

Before you review, ask the AI to self-check:

> "Before I review this, check: does it match the brand voice in context? Are there any claims that need verification?"

This catches obvious errors before they reach you.

---

### Ask questions before writing

For complex or sensitive pieces, have the AI ask you questions before it starts:

> "Before writing anything, ask me three questions that would help you get this right."

This is especially useful for pieces where getting the details wrong would matter — customer communications, case studies, sales collateral.

---

### Chain tasks

Break complex work into steps.

> Step 1: "Summarise these meeting notes into the key themes."
> Step 2: "Now draft an action plan based on those themes."
> Step 3: "Now write a follow-up email to the client sharing the plan."

Chaining produces better results than trying to do everything in one massive prompt.

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Too vague ("write something about X") | Be specific about format, audience, goal, length |
| No context | Load your Master Prompt first |
| Accepting the first draft | Iterate — tell the AI what to change |
| Trusting AI facts | Verify any specific claims, statistics, or technical details |
| Giving AI conflicting instructions | Read your prompt back before sending — does it contradict itself? |
| Copying straight to publish | Review all AI output before it goes anywhere public |

---

## A prompt template to steal

```
[MASTER PROMPT — if not already loaded as system instructions]

---

For this task, act as a [ROLE from Prompt Library].

Task: [What you need — be specific]

Details:
- Audience: [Who will read/receive this]
- Goal: [What you want them to do, think, or feel]
- Format: [e.g. email / blog post / bullet list / table]
- Length: [e.g. under 200 words / 3 paragraphs / etc.]
- Tone notes: [Any adjustment from our default voice]

Constraints:
- [What to avoid or include]

Raw material:
[Paste any relevant content — data, notes, quotes, product info]
```

---

*Use the [Prompt Library](library.html) to skip straight to ready-made prompts for common tasks.*
