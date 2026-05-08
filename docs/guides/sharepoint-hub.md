# Setting Up Your AI Hub on SharePoint

> **Time required:** 60–90 minutes for initial setup. Editing later takes 10 minutes.
>
> **What you'll end up with:** A SharePoint Communication Site your team can visit to access your AI context files, prompt library, policy, and training guides — all in one place.

---

## Before You Start

You'll need:
- A Microsoft 365 account with SharePoint access
- **Site Owner** or **Site Collection Admin** rights (or ask IT to create the site for you)
- The ZIP file from the setup wizard — extract it first

---

## Step 1 — Create a Communication Site

Communication Sites are designed for broadcasting information to a team — the right choice for a hub.

1. Go to your SharePoint home: `https://[yourtenant].sharepoint.com`
2. Click **+ Create site** → **Communication site**
3. Choose the **Blank** layout (easier to customise than Topic or Showcase)
4. Name it: **[Business Name] AI Hub**
5. Set the site description: *"Central resource for AI tools, prompts, and policy at [Business Name]"*
6. Choose a site URL slug, e.g. `/sites/ai-hub`
7. Set **Privacy** to **Private** — then add your team as members (this gives you control over who can see it; you can open it later)
8. Click **Finish**

---

## Step 2 — Upload Your Files to a Document Library

1. In your new site, click **Documents** in the left navigation (or **+ New → Document library** if you want a dedicated library called "AI Kit")
2. Create a folder called **AI Kit**
3. Upload the extracted ZIP contents into that folder:
   - `context/` folder (all your context files + logo)
   - `prompts/` folder (MASTER_PROMPT files, ROLES, TASK_LIBRARY)
   - `governance/` folder (AI_POLICY, DATA_RULES)
   - `guides/` folder (all training guides)
4. To get a shareable link to the folder: **right-click the folder → Share → "People in [your org] with the link"**
5. Copy that link for use on the hub page

---

## Step 3 — Build the Hub Page

SharePoint pages use **web parts** — drag-and-drop blocks. Here's the recommended layout:

### Add a new page

1. Click **+ New → Page** in the site
2. Choose the **Blank** template
3. Name it **Home** (or it will become the site's home page if you set it as such)

### Section 1 — Getting Started (Hero web part)

1. Click **+** to add a web part → choose **Hero**
2. Set the title to: **[Business Name] AI Hub**
3. Add subtitle: *"Your team's central AI resource"*
4. Add two buttons:
   - **Start Setup** → link to `https://rochi1.github.io/brain-setup/`
   - **Prompt Library** → link to `https://rochi1.github.io/brain-setup/library.html`

### Section 2 — Your AI Files (Quick Links web part)

1. Add web part → **Quick links** → choose **Compact** or **List** style
2. Add a link for each key file — use the SharePoint document links from Step 2:
   - Master Prompt (files version)
   - Master Prompt (inline version — for tools that accept pasted text)
   - ROLES.md
   - TASK_LIBRARY.md
   - AI_POLICY.md

> **Tip:** Set each Quick Link icon to match the file type — use the document icon for .md files. Rename them to friendly names like "Master Prompt — load from file".

### Section 3 — Prompt Library (Link web part)

1. Add web part → **Link**
2. URL: `https://rochi1.github.io/brain-setup/library.html`
3. Title: **Open the Prompt Library**
4. Add a short description: *"Pick a role and a task to get a ready-to-paste prompt."*

### Section 4 — AI Policy (Text web part)

Either:
- Add web part → **Text** → paste a short summary of your AI policy (2-3 bullet points is enough for the page), with a link to the full `AI_POLICY.md` in the Document Library
- Or embed the file directly using **File viewer** web part

### Section 5 — Guides (Link or Button web part)

1. Add web part → **Button**
2. Label: **Browse Guides**
3. URL: `https://rochi1.github.io/brain-setup/guides.html`

---

## Step 4 — Set Up the Prompt Library as a SharePoint List

For teams that want to manage prompts entirely inside Microsoft 365 (no third-party tools), a SharePoint List is the right approach.

### Create the list

1. In your AI Hub site, click **+ New → List**
2. Choose **Blank list** — name it **Prompt Library**
3. Add these columns:

| Column name | Type | Notes |
|---|---|---|
| Title | Single line of text | Use as "Task Name" — this is the default column |
| Role | Choice | Add your role options: Copywriter, Strategist, Sales, CSM, Analyst, Advisor, Process, Data, Other |
| Prompt Text | Multiple lines of text | Set to **Plain text** |
| Tags | Single line of text | Comma-separated |
| Added By | Person | Auto-filled or manual |
| Date Added | Date | |

### Add the list to your hub page

1. On your hub page, click **+** to add a web part → choose **List**
2. Select your **Prompt Library** list
3. Set the view to show: Role, Title, Tags (hide Prompt Text — it's too long for the grid view)
4. Editors can click any row to see the full prompt

### Seed the list with your existing prompts

Your `TASK_LIBRARY.md` in the ZIP contains all the seed prompts. Add each one as a list item — it's a one-time effort of about 30-45 minutes, or delegate it to a team member.

### How editors add new prompts

Editors with **Contribute** access to the site can add a new list item directly:
1. Open the Prompt Library list
2. Click **+ New** → fill in Role, Task Name, Prompt Text, Tags
3. Click **Save** — the prompt appears in the list immediately

No publishing step, no code, no admin required.

---

## Step 5 — Set Permissions

SharePoint permissions work at the site level and can be refined per library or list.

**Recommended setup:**

| Group | Access |
|---|---|
| All staff (or target team) | Site **Visitor** — can read everything |
| Prompt curators (2-3 people) | Site **Member** — can edit pages and add list items |
| Hub owner / IT | Site **Owner** — full control |

To set permissions:
1. **Settings** (gear icon) → **Site permissions**
2. Add groups or individuals to the relevant role
3. For the Prompt Library list specifically: **List settings → Permissions** → if you want only Members to add rows, break inheritance here

---

## Step 6 — Publish and Share

1. Click **Publish** on your hub page (top right)
2. Copy the page URL
3. Share in Teams / email with your team
4. Optional: **Settings → Site information → Hub site** — if your org uses hub sites, register this as a hub so it appears in the SharePoint navigation bar

> **Tip:** Go to **Settings → Navigation** and add the hub page URL to your SharePoint global navigation bar so every user sees it.

---

## Maintenance

| Trigger | Action |
|---|---|
| Business change (new product, rebrand) | Rerun Setup Wizard → replace files in Document Library folder |
| New prompt from a team member | Review their submission → add to Prompt Library list |
| Policy change | Update `AI_POLICY.md` in Document Library; update the page text if it's summarised there |
| New team member | Add to Visitors group → share hub URL |
| Guides updated | Re-download ZIP → replace files in `guides/` folder in Document Library |

---

## Troubleshooting

**"I don't have permission to create a Communication Site"**
Ask your Microsoft 365 admin. Some orgs restrict site creation. They can either create the site for you or grant you permission.

**"The List web part isn't showing on the page"**
Check that the web part is added to a **published** page, not a draft. Draft pages don't show web parts to non-owners.

**"Team members can't see the site"**
Check the site's permissions — it may be set to Private with no members added. Go to **Settings → Site permissions** and add the relevant people or group.

**"I want to embed the prompt library closer into SharePoint"**
Use an **Embed** web part and paste the library URL. SharePoint may show a security warning for external iframes — your admin can whitelist `rochi1.github.io` in the **Embed allowlist** in the admin centre.
