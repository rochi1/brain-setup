# Claude Instructions

This file is read automatically by Claude Code and Claude-based agents when working in this repository.

## Context

You are working inside the AI Business Template Kit for a specific business. All relevant business context — identity, voice, audience, products, and competitive position — is documented in the `your-business/` folder.

## Before Any Task

Read the following files. They are your source of truth for everything about this business:

```
your-business/prompts/MASTER_PROMPT.md   ← Start here — combined context in one file
your-business/prompts/ROLES.md           ← Custom roles — apply when a task specifies a role
your-business/context/BUSINESS_PROFILE.md ← Who we are
your-business/context/BRAND_VOICE.md     ← How we sound
your-business/context/AUDIENCE.md        ← Who we serve
your-business/context/PRODUCTS_SERVICES.md ← What we sell
your-business/context/COMPETITORS.md     ← Where we sit in the market
```

## Non-Negotiable Rules

**Voice:** Every piece of written output must follow the tone, language rules, and DO/DON’T guidelines in `your-business/context/BRAND_VOICE.md`. This applies regardless of how the user phrases their request.

**Facts:** Never describe a product feature, pricing detail, or capability that isn’t documented in `your-business/context/PRODUCTS_SERVICES.md`. If you don't know, say so and ask.

**Audience:** Default to the primary customer persona in `your-business/context/AUDIENCE.md` when no specific audience is stated.

**Conflicts:** If a request conflicts with the documented voice, values, or product facts — flag it briefly and suggest an alternative approach.

**Filler phrases:** Never use: "Certainly!", "Great question!", "I'd be happy to help!", "As an AI language model..." — get straight to the work.

## If Context Files Are Incomplete

If you encounter unfilled placeholder text (italic *placeholders*, `[bracketed text]`) in any context file that is relevant to the task, tell the user which file and which section needs completing before you can proceed accurately.

Do not guess or invent content to fill gaps.
