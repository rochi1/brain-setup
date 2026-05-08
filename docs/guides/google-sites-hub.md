# Setting Up Your AI Hub on Google Sites

> **Time required:** 45–60 minutes for initial setup. Editing later takes 5 minutes.
>
> **What you'll end up with:** An internal Google Site your team can visit to access your AI context files, prompt library, policy, and training guides — all in one place.

---

## Before You Start

You'll need:
- A Google Workspace account (not a personal Gmail)
- The ZIP file you downloaded from the setup wizard — extract it first
- Editor access to Google Drive (to upload your context files)

---

## Step 1 — Upload Your Files to Google Drive

Your context files need to live in Drive so you can link to them from your site.

1. Open [Google Drive](https://drive.google.com) and create a new folder called **AI Kit** (or your business name)
2. Upload the entire extracted ZIP folder into that Drive folder — drag and drop works
3. Right-click the folder → **Share** → change access to **"Anyone at [your domain] with the link can view"**
4. Note the folder URL — you'll link to it from your site

> **Why a shared folder?** It means you only have one place to update files. When you regenerate your context later, just replace the files in Drive and all links on the site stay valid.

---

## Step 2 — Create a New Google Site

1. Go to [sites.google.com](https://sites.google.com) and click **New** → **Blank site**
2. Name it something clear: **[Business Name] AI Hub**
3. Click the pencil icon next to the URL slug and set something short, e.g. `ai-hub`
4. Under **Settings** (gear icon) → **Sharing and permissions**, set access to **"Anyone at [your domain] can view"** — this lets your whole team find the site without individually granting access

---

## Step 3 — Build the Page Structure

Your hub needs the following sections on the home page. Add them using **Insert → Collapsible text** or **Insert → Section** from the right panel.

### Section 1 — Getting Started

Add a brief intro and two buttons:

- **[Start the Setup Wizard →]** — links to `https://rochi1.github.io/brain-setup/`
- **[Download AI Kit ZIP →]** — links to your Drive folder from Step 1

Sample intro text:
```
This is your team's AI hub. Start here if you're new, or jump straight to the prompt library if you know what you need.
```

### Section 2 — Your AI Files

Use **Insert → Drive** to embed the Drive folder directly, or manually add links for each file:

| File | What it's for |
|---|---|
| `MASTER_PROMPT_files.md` | Paste at the start of every AI session |
| `ROLES.md` | Copy a role to focus the AI on a specific task |
| `TASK_LIBRARY.md` | Ready-to-use task prompts |
| `AI_POLICY.md` | What we will and won't use AI for |

To embed a Drive file:
1. Click **Insert → Drive** in the site editor
2. Select the file
3. Choose **Preview** so visitors can see and download it without leaving the site

### Section 3 — Prompt Library

Add a link to the live prompt library:

- **[Open Prompt Library →]** — links to `https://rochi1.github.io/brain-setup/library.html`

Optionally add a short explanation:
```
Pick a role and a task to get a ready-to-paste prompt. You can also add your own custom prompts and export them.
```

### Section 4 — AI Policy

Either embed the `AI_POLICY.md` file directly (via Insert → Drive), or summarise the key rules as a text section. Keep it short — one paragraph or a bullet list works well.

### Section 5 — Training Guides

Link to each guide on this site:

- **[Open Guides →]** — links to `https://rochi1.github.io/brain-setup/guides.html`

Or, if you prefer everything in one place, upload each `guides/` file from your ZIP to Drive and link to them directly.

---

## Step 4 — Style the Site

Google Sites has limited design options — this is intentional (it keeps it fast to edit). Recommended settings:

1. **Themes** → Choose the **Simple** theme — clean, works well for internal tools
2. **Brand images** → Upload your logo via **Settings → Brand images**
3. **Palette** → Set the primary colour to match your brand
4. **Header** → Use a plain text header with your hub name, no hero image needed for an internal tool

---

## Step 5 — Share the Site

1. Click **Share** (top right in the site editor)
2. Set to **"Anyone at [your domain] can view"** if not done already
3. **Publish** the site — click **Publish** → set a web address → confirm
4. Copy the published URL and share it in Slack / Teams / email with your team

> **Tip:** Pin the URL in your Slack workspace as a bookmark, or add it to your email signature as a quiet nudge.

---

## Step 6 — How Editors Add or Update Prompts

Google Sites has no database, so the prompt library is managed two ways:

**Option A — Via the web app (no Drive changes)**

Anyone can go to the [Prompt Library](https://rochi1.github.io/brain-setup/library.html), click **+ Add a prompt**, and save a custom prompt locally. They can then export it as CSV.

To make a new prompt available for the whole team:
1. Have the editor export their custom prompts as CSV
2. You or your admin reviews them
3. Add approved prompts to `TASK_LIBRARY.md` in Drive — just paste the prompt in the right section
4. The updated file is available immediately to everyone who opens it from Drive

**Option B — Google Sheets prompt library**

Create a Google Sheet with columns: `Role | Task Name | Prompt Text | Tags | Added By | Date`. Share it with the team as an editable sheet. Editors add rows. Embed the sheet on the Sites page using **Insert → Sheets**.

---

## Maintenance

| Trigger | Action |
|---|---|
| Business change (new product, rebrand) | Rerun wizard → replace files in Drive folder |
| Need to add a new prompt | Editor exports CSV → add to TASK_LIBRARY.md in Drive |
| New team member | Share the hub URL and ask them to go through the Getting Started section |
| Policy change | Update `AI_POLICY.md` in Drive, update the Sites section if it's embedded as text |

---

## Troubleshooting

**"I can't see the Drive files on the site"**
Check the Drive folder sharing settings — it needs to be shared with the whole domain, not just specific people.

**"The site won't let me edit it"**
Only site editors can make changes. Ask your Google Workspace admin to grant you Editor access to the site.

**"The published URL changed"**
Google Sites URLs are stable once published. If you used a custom path like `/sites/ai-hub`, it won't change unless you manually change it.
