# Setup Guide — Adding Your AI Context to Different Tools

> Once you've completed [QUICK_START.md](QUICK_START.md) and have your context files, this guide shows you how to load them into the tools your team actually uses.

---

## The Core Idea

Your `context/` folder is the source of truth. The goal is to get that context into whatever AI tool you're using so you don't have to re-explain your business in every conversation.

How you do that depends on the tool.

---

## ChatGPT (OpenAI)

### Option A — ChatGPT Projects (recommended)
1. Open ChatGPT and create a new **Project**
2. Name it after your business
3. In the project settings, upload your context files:
   - `BUSINESS_PROFILE.md`
   - `BRAND_VOICE.md`
   - `AUDIENCE.md`
   - `PRODUCTS_SERVICES.md`
4. Add your `MASTER_PROMPT.md` content into the **Custom Instructions** field of the project
5. All conversations inside this project will automatically use your context

### Option B — Custom Instructions (global)
1. Click your profile icon → **Customize ChatGPT**
2. In the "What would you like ChatGPT to know about you?" field, paste a condensed version of your `BUSINESS_PROFILE.md`
3. In the "How would you like ChatGPT to respond?" field, paste your `BRAND_VOICE.md` guidelines
4. This applies to all conversations, not just one project

### Option C — Paste per session
Paste your `MASTER_PROMPT.md` at the start of any new conversation where you need full context.

---

## Claude (Anthropic)

### Claude Projects (recommended)
1. Open Claude and create a new **Project**
2. Go to **Project Knowledge** and upload your context files
3. Add your `MASTER_PROMPT.md` as the project's system prompt
4. All conversations in the project will use this context

### Per-session
Paste your `MASTER_PROMPT.md` at the top of any new conversation.

---

## Microsoft Copilot / Copilot Studio

### Copilot Studio (enterprise)
1. Open Copilot Studio
2. Create a new **Copilot**
3. In **Instructions**, paste your `MASTER_PROMPT.md` content
4. Upload context files as knowledge sources
5. Publish to your team via Teams, SharePoint, or embedded web chat

### GitHub Copilot (development teams)
1. In your repo, create `.github/copilot-instructions.md`
2. Paste relevant sections from your `MASTER_PROMPT.md` and `BRAND_VOICE.md`
3. Copilot will use this file as context for all coding and writing tasks in the repo

### Microsoft 365 Copilot
- Store your context files in SharePoint — Copilot can reference them when drafting documents, emails, and presentations

---

## Cursor / Windsurf / Zed (coding-focused editors)

### Cursor
1. In your project root, create a `.cursorrules` file
2. Paste your `MASTER_PROMPT.md` content into it
3. Cursor will include this in the context for all Composer and Chat interactions in this project

### Windsurf
1. Create a `.windsurfrules` file in your project root
2. Same approach — paste your master prompt content

### General rule
Most AI coding editors support a rules or instructions file in the project root. Drop your `MASTER_PROMPT.md` content there and the editor picks it up automatically.

---

## Gemini (Google)

### Gemini Gems
1. Open Gemini and create a new **Gem**
2. Give it your business name
3. Paste your `MASTER_PROMPT.md` content as the system instructions
4. Add context file contents into the knowledge/instructions section
5. Share the Gem link with your team

### NotebookLM
- Upload your context files as sources
- NotebookLM will ground all answers in those documents
- Excellent for Q&A about your own business, processes, and products

---

## Automation Tools (n8n, Make, Zapier)

### Storing your Master Prompt
1. In **n8n**: Store your `MASTER_PROMPT.md` content in a Set node or environment variable, then inject it as the `system` message in any AI node
2. In **Make**: Store it in a Data Store, then retrieve and prepend it to any OpenAI/Claude module
3. In **Zapier**: Use a Formatter step or Code step to prepend your master prompt to any AI action

### Recommended pattern for automations
```
[System message] = contents of MASTER_PROMPT.md
[User message]   = your dynamic input / task
```

This ensures every automated AI call is grounded in your business context.

---

## API / Custom Integrations

If you're calling AI models directly via API:

- Pass your `MASTER_PROMPT.md` content as the `system` message
- Keep context files in your codebase and load them as needed
- Version control your context files alongside your code — they're part of your product

Example structure:
```
POST /v1/messages
{
  "system": "<contents of MASTER_PROMPT.md>",
  "messages": [
    { "role": "user", "content": "<your task>" }
  ]
}
```

---

## Keeping Context Up to Date

Your context files will go stale if you don't maintain them. Recommended schedule:

| File | Review frequency |
|------|-----------------|
| `BUSINESS_PROFILE.md` | Quarterly or when the business changes significantly |
| `BRAND_VOICE.md` | Bi-annually or after a rebrand |
| `AUDIENCE.md` | Quarterly or after new research |
| `PRODUCTS_SERVICES.md` | Whenever your offering changes |
| `MASTER_PROMPT.md` | Every time a source context file is updated |
| `AI_POLICY.md` | Annually or when you adopt new tools |

Treat these files the way you treat your codebase — review them in pull requests, track changes, and keep them accurate.

---

## Team Rollout Tips

1. **Start with one tool.** Pick the AI tool your team uses most and get set up there first.
2. **Share the MASTER_PROMPT** in a pinned Slack/Teams message so everyone can copy it.
3. **Run a 30-minute demo.** Show the team the difference between using AI with and without context.
4. **Assign an owner.** Designate someone to maintain the context files and keep the policy current.
5. **Review monthly (first 3 months).** Early on, you'll discover things to add or fix. Build in time to iterate.
