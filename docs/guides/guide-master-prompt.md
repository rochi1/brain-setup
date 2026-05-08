# Guide: How to Use the Master Prompt

> **What this is:** An explanation of what the Master Prompt is, which version to use, and how to load it into your AI tool.
>
> **Who it's for:** Anyone setting up or using your business's AI context.

---

## What the Master Prompt is

The Master Prompt is a single reusable context block that tells your AI tool everything it needs to know about your business before starting any task:

- Who you are and what you do
- How you communicate (your brand voice)
- Who your customers are
- What you sell and how to describe it
- Your competitive position
- The rules for how AI should behave

When you paste or load the Master Prompt, the AI operates from a shared understanding of your business — the same understanding every time, regardless of who on your team is using it.

---

## You have two versions

Your AI kit contains two Master Prompt files:

### `MASTER_PROMPT_files.md` (short version)

**Use this when:** Your AI tool supports file uploads or a knowledge base.

This version references your other context files (`BUSINESS_PROFILE.md`, `BRAND_VOICE.md`, etc.) by name. It tells the AI to read those files for the detail. It's short because the detail lives in the uploaded files.

Works with: ChatGPT Projects, Claude Projects, Cursor, GitHub Copilot, Windsurf, Gemini Gems, and any tool with a system instructions or knowledge base feature.

### `MASTER_PROMPT_inline.md` (long version)

**Use this when:** Your AI tool doesn't support file uploads.

This version is self-contained — all your context is written directly into the prompt. It's longer because it carries everything with it. Paste it at the top of any conversation and the AI has full context.

Works with: Any AI tool, including free-tier Claude, ChatGPT without a project, Gemini, or any chat-based tool.

---

## How to load it — by tool

### ChatGPT Projects

1. Open your project in ChatGPT
2. Go to project settings → **Instructions** or **Custom instructions**
3. Paste the contents of `MASTER_PROMPT_files.md`
4. Upload your context files (at minimum: `BUSINESS_PROFILE.md`, `BRAND_VOICE.md`, `AI_POLICY.md`)
5. Every conversation inside the project now starts with that context loaded

### Claude Projects

1. Open your project in Claude
2. Click **Edit project details** or the project settings icon
3. Paste the contents of `MASTER_PROMPT_files.md` into the **Project instructions** field
4. Upload context files via the **Knowledge** section
5. New conversations in the project automatically use this context

### Cursor / Windsurf / GitHub Copilot

Add the contents of `MASTER_PROMPT_files.md` to your rules or instructions file:
- **Cursor:** `.cursorrules` or Cursor Settings → Rules for AI
- **Windsurf:** `.windsurfrules`
- **GitHub Copilot:** `.github/copilot-instructions.md`

The AI reads this at the start of every session.

### Any other tool (no file upload)

1. Open a new conversation
2. Paste the full contents of `MASTER_PROMPT_inline.md` as the first message
3. Hit send (or add it to your system prompt if the tool supports it)
4. All subsequent messages in that conversation will have full context

---

## How to share it with your team

The simplest approach:

1. Upload your `your-business/` folder to Google Drive or OneDrive (shared folder your team can access)
2. Tell the team which file to use and where to find it
3. When the Master Prompt is updated, replace the file in the shared folder — team members re-paste next time they start fresh

For a more structured rollout, use your AI Hub page (if set up) to make files and instructions available in one place.

---

## Keeping it updated

The Master Prompt is only as good as the context files it references. When your business changes significantly — new products, repositioning, updated brand voice, new team — refresh the relevant context file with the setup wizard and generate a new `MASTER_PROMPT_inline.md` to replace the old one.

A good cadence: review once a quarter, or whenever something significant changes.

---

## What good looks like

When the Master Prompt is working correctly, you should be able to:

- Ask the AI "What do you know about our business?" and get an accurate summary
- Ask it to write something and have it default to the right voice and audience without instruction
- Ask about your products and get accurate descriptions (not invented claims)
- Notice the AI flagging when you ask it to do something that contradicts the policy

If the AI responses feel generic or wrong, either the Master Prompt isn't loaded, or the context files need updating.

---

*Your Master Prompt files are in `your-business/prompts/`. See `README.md` in your AI kit for the full file map.*
