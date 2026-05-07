import { state, clearState, saveState } from './state.js';
import { CONTEXT_FILES, MASTER_PROMPT_STEP, ZIP_TEMPLATE_URLS } from './prompts.js';
import { APP_VERSION } from './state.js';

// ── File-reference Master Prompt (auto-generated, no AI needed) ───────────
export function generateFilesMasterPrompt(businessName) {
  const name = businessName || state.businessName || 'Your Business';
  return `# ${name} — AI Context Prompt (File-Reference Version)

> **When to use this file:** For AI tools that support file uploads (ChatGPT Projects, Claude Projects, Cursor, GitHub Copilot). Upload your context files alongside this, then paste it as your system instructions.
>
> **If your tool doesn't support file uploads:** Use \`MASTER_PROMPT_inline.md\` instead.

---

You are an AI assistant for **${name}**.

At the start of every conversation, read the following uploaded files:

- \`context/BUSINESS_PROFILE.md\` — who we are, what we do, our mission and values
- \`context/BRAND_VOICE.md\` — our tone, language rules, what to avoid, and before/after examples
- \`context/AUDIENCE.md\` — our customers, personas, pain points, and what they need
- \`context/PRODUCTS_SERVICES.md\` — what we sell, features, pricing, and what not to promise
- \`context/COMPETITORS.md\` — our market position, differentiators, and claim guardrails

**Always apply this context before responding.** Write in the voice defined in \`BRAND_VOICE.md\`. Default to the primary audience in \`AUDIENCE.md\` unless specified. Never describe products or services beyond what is in \`PRODUCTS_SERVICES.md\`.

When in doubt about voice or facts, check the files rather than guessing.`;
}

// ── README for inside the ZIP ─────────────────────────────
export function generateReadme(businessName, generatedDate) {
  const name = (businessName || 'Your Business').trim();
  return `# ${name} — AI Kit

Generated: ${generatedDate}
Kit version: ${APP_VERSION}

---

## What's in this package

\`\`\`
your-business/
  context/
    BUSINESS_PROFILE.md     — Who you are, mission, values, business model
    BRAND_VOICE.md          — Tone, language rules, DO/DON'T guide
    AUDIENCE.md             — Customer personas and pain points (if generated)
    PRODUCTS_SERVICES.md    — What you sell, pricing, what not to promise (if generated)
    COMPETITORS.md          — Market position and differentiators (if generated)
  prompts/
    MASTER_PROMPT_files.md  — Short prompt for tools with file upload
    MASTER_PROMPT_inline.md — Self-contained prompt for tools without file upload
    ROLES.md                — AI role definitions for your team
    TASK_LIBRARY.md         — Reusable task prompts
  governance/
    AI_POLICY.md            — Internal rules for AI use
    DATA_RULES.md           — Data handling guidelines
README.md                   — This file
\`\`\`

---

## Which Master Prompt to use

| Tool | Use this file |
|---|---|
| ChatGPT Projects | \`MASTER_PROMPT_files.md\` — paste as system instructions, upload context files |
| Claude Projects  | \`MASTER_PROMPT_files.md\` — paste as project instructions, upload context files |
| Cursor / Windsurf / Copilot | \`MASTER_PROMPT_files.md\` — add to \`.cursorrules\` / instructions |
| Gemini Gems      | \`MASTER_PROMPT_inline.md\` — paste as Gem instructions |
| Any other tool   | \`MASTER_PROMPT_inline.md\` — paste at the start of any conversation |

---

## How to load into your AI tool

1. Upload the \`your-business/context/\` files into your AI tool's knowledge base or project
2. Add the appropriate Master Prompt as your system instructions
3. Test: ask your AI "What do you know about our business?"

---

## How to update

When your business changes, re-run the relevant prompt from the setup wizard and replace the file.

Setup wizard: https://rochi1.github.io/brain-setup/
`;
}

// ── Build and trigger ZIP download ───────────────────────
export async function downloadZip(onStatus) {
  const bizName = state.businessName.trim() || 'my-business';
  const now     = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  onStatus('Building ZIP...');
  const zip = new JSZip(); // JSZip loaded globally via CDN

  // ── Generated context files ───────────────────────────
  CONTEXT_FILES.forEach(f => {
    if (state.files[f.id]) {
      zip.file(f.saveAs, state.files[f.id]);
    }
  });

  // ── Master prompt inline (AI-generated) ──────────────
  if (state.files['master-prompt']) {
    zip.file('your-business/prompts/MASTER_PROMPT_inline.md', state.files['master-prompt']);
  }

  // ── Master prompt files (auto-generated) ─────────────
  zip.file('your-business/prompts/MASTER_PROMPT_files.md', generateFilesMasterPrompt(bizName));

  // ── Fetch template files ──────────────────────────────
  onStatus('Fetching template files...');
  const fetches = await Promise.allSettled(
    Object.entries(ZIP_TEMPLATE_URLS).map(async ([path, url]) => {
      const res  = await fetch(url);
      const text = await res.text();
      return { path, text };
    })
  );

  const templates = {};
  fetches.forEach(r => {
    if (r.status === 'fulfilled') templates[r.value.path] = r.value.text;
  });

  // ── ROLES.md + custom roles appended ─────────────────
  let rolesContent = templates['your-business/prompts/ROLES.md'] || '# Roles\n\n';
  const completedRoles = state.customRoles.filter(r => r.pasted);
  if (completedRoles.length > 0) {
    rolesContent += '\n\n---\n\n## Custom Roles\n\n';
    rolesContent += completedRoles.map(r => r.pasted).join('\n\n');
  }
  zip.file('your-business/prompts/ROLES.md', rolesContent);

  // ── TASK_LIBRARY.md + custom tasks appended ───────────
  let tasksContent = templates['your-business/prompts/TASK_LIBRARY.md'] || '# Task Library\n\n';
  const completedTasks = state.customTasks.filter(t => t.pasted);
  if (completedTasks.length > 0) {
    tasksContent += '\n\n---\n\n## Custom Tasks\n\n';
    tasksContent += completedTasks.map(t => t.pasted).join('\n\n');
  }
  zip.file('your-business/prompts/TASK_LIBRARY.md', tasksContent);

  // ── DATA_RULES.md ─────────────────────────────────────
  if (templates['your-business/governance/DATA_RULES.md']) {
    zip.file('your-business/governance/DATA_RULES.md', templates['your-business/governance/DATA_RULES.md']);
  }

  // ── README ────────────────────────────────────────────
  zip.file('README.md', generateReadme(bizName, dateStr));

  // ── Generate and save ─────────────────────────────────
  onStatus('Generating ZIP...');
  const blob    = await zip.generateAsync({ type: 'blob' });
  const zipName = `${bizName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-ai-kit.zip`;
  saveAs(blob, zipName); // FileSaver.js global

  onStatus(`✅ ${zipName} downloaded.`);

  // Clear saved session after successful download
  clearState();
  saveState();

  return zipName;
}
