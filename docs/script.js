// ── State ──────────────────────────────────────────────
const state = {
  step: 0,       // 0=welcome, 1=tool, 2=folders, 3=prompts, 4=upload, 5=done
  tool: null,
  os: /mac|iphone|ipad/i.test(navigator.userAgent) ? 'mac' : 'windows',
  brandVoiceMode: 'scratch',
};

const TOTAL_STEPS = 6; // 0..5

// ── Tool definitions ────────────────────────────────────
const TOOLS = {
  chatgpt: {
    name: 'ChatGPT',
    icon: '🤖',
    desc: 'OpenAI',
    supportsFileUpload: true,
    projectFeature: 'Projects',
    updateMethod: 'manual',
    uploadSteps: `
      <div class="upload-steps"><ol>
        <li><p><strong>Go to chatgpt.com and sign in.</strong></p></li>
        <li><p><strong>In the left sidebar, click <em>Explore GPTs</em> → then select <em>Create a project</em>.</strong> (Or look for the <em>+</em> next to Projects in the sidebar.)</p></li>
        <li><p><strong>Name your project.</strong> Something like "My Business AI" or your company name.</p></li>
        <li><p><strong>Open the project settings and find the <em>Files</em> or <em>Knowledge</em> section.</strong></p></li>
        <li><p><strong>Upload the files from your <code>your-business/</code> folder.</strong> At minimum upload:
          <br>• <code>context/BUSINESS_PROFILE.md</code>
          <br>• <code>context/BRAND_VOICE.md</code>
          <br>• <code>prompts/MASTER_PROMPT.md</code>
          <br>• <code>governance/AI_POLICY.md</code>
        </p></li>
        <li><p><strong>Add custom instructions.</strong> Paste the contents of <code>your-business/prompts/MASTER_PROMPT.md</code> into the project's system instructions field so every conversation starts in context.</p></li>
        <li><p><strong>Test it.</strong> Start a new conversation in the project and ask "What do you know about my business?" — it should answer accurately from your files.</p></li>
      </ol></div>
    `,
    updateSteps: `
      <p>ChatGPT Projects store files statically. To update your context:</p>
      <div class="upload-steps"><ol>
        <li><p><strong>Re-run the relevant prompt</strong> from this guide to regenerate an updated file.</p></li>
        <li><p><strong>In your project settings, delete the old file</strong> and upload the new version.</p></li>
        <li><p><strong>Update the system instructions</strong> if your Master Prompt changed.</p></li>
      </ol></div>
      <div class="info-box tip"><span class="icon">💡</span>
        <span>Store your <code>your-business/</code> folder in a cloud drive (Dropbox, iCloud, Google Drive) so it's easy to find when re-uploading.</span>
      </div>
    `,
  },

  claude: {
    name: 'Claude',
    icon: '🟠',
    desc: 'Anthropic',
    supportsFileUpload: true,
    projectFeature: 'Projects',
    updateMethod: 'manual',
    uploadSteps: `
      <div class="upload-steps"><ol>
        <li><p><strong>Go to claude.ai and sign in.</strong></p></li>
        <li><p><strong>Click <em>Projects</em> in the left sidebar, then <em>Create project</em>.</strong></p></li>
        <li><p><strong>Name your project</strong> — e.g. your company name.</p></li>
        <li><p><strong>Inside the project, click <em>Add content</em> or the <em>+</em> button in the Knowledge section.</strong></p></li>
        <li><p><strong>Upload files from your <code>your-business/</code> folder:</strong>
          <br>• <code>context/BUSINESS_PROFILE.md</code>
          <br>• <code>context/BRAND_VOICE.md</code>
          <br>• <code>prompts/MASTER_PROMPT.md</code>
          <br>• <code>governance/AI_POLICY.md</code>
          <br>Upload any optional files you've also completed.
        </p></li>
        <li><p><strong>Add project instructions.</strong> Paste the contents of <code>prompts/MASTER_PROMPT.md</code> into the "Custom instructions" field of the project so every chat automatically starts in context.</p></li>
        <li><p><strong>Test it.</strong> Start a new conversation within the project and ask "Summarise what you know about our business."</p></li>
      </ol></div>
    `,
    updateSteps: `
      <p>Claude Projects store files statically. To update:</p>
      <div class="upload-steps"><ol>
        <li><p><strong>Open your project and find the file in the Knowledge section.</strong></p></li>
        <li><p><strong>Delete the old version</strong> and upload the updated file.</p></li>
        <li><p><strong>Update project instructions</strong> if your Master Prompt changed.</p></li>
      </ol></div>
      <div class="info-box tip"><span class="icon">💡</span>
        <span>Claude is particularly good at referencing uploaded documents precisely — the more detail you put in your context files, the better the results.</span>
      </div>
    `,
  },

  gemini: {
    name: 'Gemini',
    icon: '♊',
    desc: 'Google',
    supportsFileUpload: false,
    projectFeature: 'Gems',
    updateMethod: 'manual',
    uploadSteps: `
      <div class="info-box note"><span class="icon">⚠️</span>
        <span>Gemini Gems use a single instruction block rather than file uploads. You'll paste your Master Prompt content directly into the Gem's instructions.</span>
      </div>
      <div class="upload-steps"><ol>
        <li><p><strong>Go to gemini.google.com and sign in.</strong></p></li>
        <li><p><strong>Click <em>Explore Gems</em> in the sidebar, then <em>New Gem</em>.</strong></p></li>
        <li><p><strong>Give your Gem a name</strong> — e.g. your company name.</p></li>
        <li><p><strong>In the Instructions field, paste the full contents of <code>your-business/prompts/MASTER_PROMPT.md</code>.</strong></p></li>
        <li><p><strong>Append extra context.</strong> After the Master Prompt, paste in the contents of <code>BUSINESS_PROFILE.md</code> and <code>BRAND_VOICE.md</code> — Gems support longer instruction blocks.</p></li>
        <li><p><strong>Click <em>Save</em>.</strong></p></li>
        <li><p><strong>Test via the preview panel</strong> — ask "What do you know about my business?" to confirm it's working.</p></li>
      </ol></div>
    `,
    updateSteps: `
      <div class="upload-steps"><ol>
        <li><p><strong>Go to your Gem and click <em>Edit</em>.</strong></p></li>
        <li><p><strong>Update the instructions field</strong> with your revised content.</p></li>
        <li><p><strong>Save.</strong> All future conversations with this Gem will use the updated context.</p></li>
      </ol></div>
    `,
  },

  copilot: {
    name: 'GitHub Copilot',
    icon: '🐙',
    desc: 'Microsoft / VS Code',
    supportsFileUpload: false,
    projectFeature: 'Copilot Instructions',
    updateMethod: 'auto',
    uploadSteps: `
      <div class="info-box success"><span class="icon">✅</span>
        <span>GitHub Copilot automatically reads <code>.github/copilot-instructions.md</code> from your repo. This file already references your <code>your-business/</code> context — no manual upload needed.</span>
      </div>
      <div class="upload-steps"><ol>
        <li><p><strong>Open the repo in VS Code</strong> (or your preferred editor with Copilot installed).</p></li>
        <li><p><strong>Make sure your <code>your-business/</code> files are filled in</strong> — Copilot reads them directly from disk when you're working in the repo.</p></li>
        <li><p><strong>Open Copilot Chat</strong> and ask anything about your business — it will have context from your files automatically.</p></li>
        <li><p><strong>For tasks outside VS Code</strong>, paste the contents of <code>your-business/prompts/MASTER_PROMPT.md</code> into any AI tool to bring your context with you.</p></li>
      </ol></div>
    `,
    updateSteps: `
      <div class="info-box success"><span class="icon">🔄</span>
        <span><strong>Fully automatic.</strong> Edit any file in <code>your-business/</code> and Copilot picks it up immediately — no re-uploading, no manual steps. The context is always current.</span>
      </div>
      <p>If you're using Git to version your context files, simply commit and push updates. Any team member who pulls the repo gets the latest context automatically.</p>
    `,
  },

  cursor: {
    name: 'Cursor',
    icon: '⬛',
    desc: 'Cursor IDE',
    supportsFileUpload: false,
    projectFeature: 'Rules (.cursorrules)',
    updateMethod: 'auto',
    uploadSteps: `
      <div class="info-box success"><span class="icon">✅</span>
        <span>Cursor automatically reads <code>.cursorrules</code> from your project root. This file already references all your <code>your-business/</code> context files — no uploads needed.</span>
      </div>
      <div class="upload-steps"><ol>
        <li><p><strong>Open the repo folder in Cursor.</strong></p></li>
        <li><p><strong>Complete your <code>your-business/</code> files</strong> using the prompts in Step 3.</p></li>
        <li><p><strong>Cursor AI now has full context.</strong> Open Composer or chat and ask a question about your business — it will respond using your context files automatically.</p></li>
        <li><p><strong>Optional:</strong> In Cursor Settings → Rules, you can also paste your Master Prompt into Global Rules to apply context across all projects.</p></li>
      </ol></div>
    `,
    updateSteps: `
      <div class="info-box success"><span class="icon">🔄</span>
        <span><strong>Fully automatic.</strong> Cursor reads your <code>your-business/</code> files live from disk. Edit any context file and it's immediately reflected in AI responses — no extra steps.</span>
      </div>
    `,
  },

  windsurf: {
    name: 'Windsurf',
    icon: '🏄',
    desc: 'Codeium',
    supportsFileUpload: false,
    projectFeature: 'Rules (.windsurfrules)',
    updateMethod: 'auto',
    uploadSteps: `
      <div class="info-box success"><span class="icon">✅</span>
        <span>Windsurf automatically reads <code>.windsurfrules</code> from your project root. It already points to your <code>your-business/</code> context — no uploads needed.</span>
      </div>
      <div class="upload-steps"><ol>
        <li><p><strong>Open the repo folder in Windsurf.</strong></p></li>
        <li><p><strong>Complete your <code>your-business/</code> context files</strong> using the prompts in Step 3.</p></li>
        <li><p><strong>Open Cascade (the AI panel)</strong> and ask a question about your business — it will have your context automatically.</p></li>
      </ol></div>
    `,
    updateSteps: `
      <div class="info-box success"><span class="icon">🔄</span>
        <span><strong>Fully automatic.</strong> Windsurf reads <code>your-business/</code> live from disk. Update any context file and Cascade has it immediately.</span>
      </div>
    `,
  },

  other: {
    name: 'Other tool',
    icon: '🔧',
    desc: 'Any AI tool',
    supportsFileUpload: true,
    projectFeature: 'Manual paste',
    updateMethod: 'manual',
    uploadSteps: `
      <p>The universal approach works with any AI tool:</p>
      <div class="upload-steps"><ol>
        <li><p><strong>If your tool supports file uploads or a knowledge base</strong> — upload the files from your <code>your-business/</code> folder.</p></li>
        <li><p><strong>If your tool supports custom system instructions</strong> — paste the contents of <code>your-business/prompts/MASTER_PROMPT.md</code> as the system prompt.</p></li>
        <li><p><strong>If your tool has neither</strong> — paste the Master Prompt at the start of any conversation before giving a task. It works in a single message.</p></li>
      </ol></div>
      <div class="info-box tip"><span class="icon">💡</span>
        <span>The Master Prompt is designed to work as a self-contained context block — paste it at the top of any chat and the AI immediately knows your business.</span>
      </div>
    `,
    updateSteps: `
      <p>When your business context changes, re-run the relevant prompt from Step 3 to regenerate the updated file, then upload or paste the new version into your tool.</p>
    `,
  },
};

// ── Prompt definitions ───────────────────────────────────
const RAW = 'https://raw.githubusercontent.com/rochi1/brain-setup/master/templates';

const PROMPTS = [
  {
    id: 'business-profile',
    num: 1,
    required: true,
    title: 'Business Profile',
    desc: 'Who you are, what you do, your mission and values',
    saveAs: 'your-business/context/BUSINESS_PROFILE.md',
    text: `I'm setting up a context file so AI tools understand my business.

Please fetch the blank template from this URL:
${RAW}/context/BUSINESS_PROFILE.md

Your job is to:

1. Interview me — ask one question at a time and wait for my answer before continuing
2. Cover every section in the template so no field is left empty
3. Once I've answered everything, return the completed template with my answers filled in, preserving all headings and structure exactly

Write all content in third person so it reads as a reference document, not a personal statement. Replace all italic placeholder text with real content. Do not add or remove sections.`,
  },
  {
    id: 'brand-voice',
    num: 2,
    required: true,
    title: 'Brand Voice',
    desc: 'Your tone, language rules, and communication style',
    saveAs: 'your-business/context/BRAND_VOICE.md',
    hasModes: true,
    modes: {
      existing: {
        label: 'I have a brand guide',
        text: `I'm going to share my existing brand guide and I need you to use it to fill in a brand voice template.

Please fetch the blank template from this URL:
${RAW}/context/BRAND_VOICE.md

Your job is to:
1. Read the brand guide I share fully
2. Extract everything relevant to voice, tone, language, and communication style
3. Use that to fill in the template
4. Identify any sections not covered by my guide
5. Ask me targeted questions — one at a time — only for the missing information

Once gaps are filled, return the completed template with every section filled in. Preserve all headings and structure exactly. Replace all italic placeholder text with real content.

Here is my brand guide:

[PASTE YOUR BRAND GUIDE HERE — or if your AI tool supports file uploads, attach it directly]`,
      },
      scratch: {
        label: 'Starting from scratch',
        text: `I need to define my brand voice so AI tools write consistently for my business.

Please fetch the blank template from this URL:
${RAW}/context/BRAND_VOICE.md

Your job is to:

1. Interview me — ask one question at a time, covering every section of the template
2. Once I've answered everything, return the completed template with my answers filled in
3. Preserve all headings and structure exactly as they appear in the template
4. Replace all italic placeholder text with real, specific content
5. For the DO / DON'T table, provide at least 10 rows
6. For the before/after examples, write genuine rewrites based on what you've learned about our voice`,
      },
    },
  },
  {
    id: 'master-prompt',
    num: 3,
    required: true,
    title: 'Master Prompt',
    desc: 'The single reusable prompt your whole team uses',
    saveAs: 'your-business/prompts/MASTER_PROMPT.md',
    text: `I've completed my business context files and I need you to combine them into a Master Prompt.

Please fetch the blank Master Prompt template from this URL:
${RAW}/prompts/MASTER_PROMPT.md

Your job is to:
1. Read all the context files I provide carefully
2. Fill in the Master Prompt template using the information from those files
3. Preserve the structure and all sections of the template exactly
4. Replace all placeholder text with real, specific content drawn from my context files
5. The finished Master Prompt must work with any AI model — no model-specific syntax

Here are my completed context files:

[PASTE CONTENTS OF your-business/context/BUSINESS_PROFILE.md HERE]

---

[PASTE CONTENTS OF your-business/context/BRAND_VOICE.md HERE]

---

[PASTE ANY OTHER COMPLETED CONTEXT FILES HERE — AUDIENCE.md, PRODUCTS_SERVICES.md, COMPETITORS.md if you've done those steps]`,
  },
  {
    id: 'ai-policy',
    num: 4,
    required: true,
    title: 'AI Policy',
    desc: 'Rules for how your team uses AI — what\'s approved, what needs review',
    saveAs: 'your-business/governance/AI_POLICY.md',
    text: `I need a practical internal AI policy for my business.

Please fetch the blank template from this URL:
${RAW}/governance/AI_POLICY.md

Your job is to:

1. Interview me — ask one question at a time and wait for my answer before continuing
2. Cover every section in the template so no field is left empty
3. Once I've answered everything, return the completed template with my answers filled in
4. Preserve all headings and structure exactly as they appear in the template
5. Replace all italic placeholder text with real, specific content
6. Write in plain English — a non-technical team member should be able to read and follow it in 5 minutes`,
  },
  {
    id: 'audience',
    num: 5,
    required: false,
    title: 'Audience & Personas',
    desc: 'Customer segments, pain points, and who not to target',
    saveAs: 'your-business/context/AUDIENCE.md',
    text: `I need to build an audience context file for my business. This file defines our customer personas so that AI tools always write for the right people, focus on real pain points, and avoid pitching to the wrong audience.

Please fetch the blank template from this URL:
${RAW}/context/AUDIENCE.md

Your job is to:

1. Interview me — ask one question at a time and wait for my answer before continuing
2. Work through one persona at a time — when a persona is complete, ask whether I have another segment to cover before moving on
3. After all personas, ask me about bad-fit customers and the customer lifecycle
4. Once I've answered everything, return the completed template with my answers filled in
5. Preserve all headings and structure exactly as they appear in the template
6. Replace all italic placeholder text with real, specific content`,
  },
  {
    id: 'products',
    num: 6,
    required: false,
    title: 'Products & Services',
    desc: 'What you sell, how to describe it, what not to promise',
    saveAs: 'your-business/context/PRODUCTS_SERVICES.md',
    text: `I need to document my products and services so AI tools can describe them accurately.

Please fetch the blank template from this URL:
${RAW}/context/PRODUCTS_SERVICES.md

Your job is to:

1. Interview me — ask one question at a time, working through one product or service at a time
2. When one product is complete, ask if there's another before moving on
3. Once I've answered everything, return the completed template with my answers filled in
4. Preserve all headings and structure exactly as they appear in the template
5. Replace all italic placeholder text with real, specific content
6. Be precise about pricing and features — only include what I've confirmed. Never invent capabilities.`,
  },
  {
    id: 'competitors',
    num: 7,
    required: false,
    title: 'Competitors & Positioning',
    desc: 'Market context, differentiators, and what claims you can back up',
    saveAs: 'your-business/context/COMPETITORS.md',
    text: `I need to document our competitive position so AI tools can position us accurately and avoid making claims we can't back up.

Please fetch the blank template from this URL:
${RAW}/context/COMPETITORS.md

Your job is to:

1. Interview me — ask one question at a time, working through one competitor at a time
2. When one competitor is complete, ask if there's another before moving on
3. Also ask about indirect alternatives (e.g. doing nothing, spreadsheets, hiring internally)
4. Once I've answered everything, return the completed template with my answers filled in
5. Preserve all headings and structure exactly
6. For the claims table, only include claims I've explicitly confirmed with evidence`,
  },
];

// ── Folder setup content ─────────────────────────────────
const FOLDER_CONTENT = {
  mac: {
    create: `mkdir -p ~/Documents/my-business-ai/your-business/context \\
  ~/Documents/my-business-ai/your-business/prompts \\
  ~/Documents/my-business-ai/your-business/governance`,
    open: `open ~/Documents/my-business-ai`,
    note: `This creates the folder in your Documents. You can put it anywhere — Desktop, iCloud Drive, Dropbox — just remember where it is.`,
  },
  windows: {
    create: `New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\\Documents\\my-business-ai\\your-business\\context"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\\Documents\\my-business-ai\\your-business\\prompts"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\\Documents\\my-business-ai\\your-business\\governance"`,
    open: `explorer "$env:USERPROFILE\\Documents\\my-business-ai"`,
    note: `Run these in PowerShell (press Windows key, type PowerShell, hit Enter). Or create the folders manually in File Explorer — whatever is easier.`,
  },
};

// ── Render helpers ───────────────────────────────────────
function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (k === 'className') el.className = v;
    else if (k === 'innerHTML') el.innerHTML = v;
    else if (k.startsWith('on')) el[k] = v;
    else el.setAttribute(k, v);
  }
  for (const child of children) {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child));
    else if (child) el.appendChild(child);
  }
  return el;
}

function copyToClipboard(text, btn, label = 'Copy') {
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = label;
      btn.classList.remove('copied');
    }, 2000);
  });
}

function codeBlock(code) {
  const wrap = document.createElement('div');
  wrap.className = 'code-block';
  const pre = document.createElement('pre');
  pre.textContent = code;
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = 'Copy';
  btn.onclick = () => copyToClipboard(code, btn);
  wrap.appendChild(pre);
  wrap.appendChild(btn);
  return wrap;
}

// ── Progress bar ──────────────────────────────────────────
function renderProgress() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  const steps = ['Tool', 'Folders', 'Prompts', 'Upload', 'Done'];
  const labels = ['Your tool', 'Set up folders', 'Run prompts', 'Load into tool', 'Done'];
  bar.innerHTML = '';
  steps.forEach((s, i) => {
    const stepIdx = i + 1; // steps 1..5, our state.step is 0..5
    const isDone = state.step > stepIdx;
    const isActive = state.step === stepIdx;
    const stepEl = document.createElement('div');
    stepEl.className = 'progress-step' + (isActive ? ' active' : '') + (isDone ? ' done' : '');
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.textContent = isDone ? '✓' : stepIdx;
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = labels[i];
    stepEl.appendChild(dot);
    stepEl.appendChild(label);
    bar.appendChild(stepEl);
    if (i < steps.length - 1) {
      const conn = document.createElement('div');
      conn.className = 'progress-connector' + (isDone ? ' done' : '');
      bar.appendChild(conn);
    }
  });
}

// ── Step renderers ───────────────────────────────────────
function renderWelcome() {
  return `
    <div class="card">
      <div style="text-align:center;padding:24px 0 16px">
        <div style="font-size:52px;margin-bottom:16px">🚀</div>
        <h1 class="step-title" style="font-size:26px">Set up AI that actually knows your business</h1>
        <p class="step-subtitle" style="max-width:480px;margin:0 auto 32px">Answer a few questions, generate your context files, and load them into your AI tool. Takes 30–60 minutes. Works with any AI tool.</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:28px">
        ${[
          ['🧠','Context files','Define your business, voice, and audience so AI always gets it right'],
          ['💬','A master prompt','One thing your team pastes to start any AI task with full context'],
          ['📋','An AI policy','Clear rules for how your team uses AI tools safely'],
          ['🔄','A living system','Update files as your business evolves — context stays current'],
        ].map(([icon,title,desc]) => `
          <div style="border:1px solid var(--border);border-radius:8px;padding:16px">
            <div style="font-size:22px;margin-bottom:6px">${icon}</div>
            <strong style="font-size:14px;display:block;margin-bottom:4px">${title}</strong>
            <span style="font-size:12px;color:var(--muted)">${desc}</span>
          </div>
        `).join('')}
      </div>
      <div class="nav-row" style="justify-content:center">
        <button class="btn btn-primary" onclick="goStep(1)">Get started →</button>
      </div>
    </div>
  `;
}

function renderToolStep() {
  return `
    <div class="card">
      <h2 class="step-title">Which AI tool are you setting up?</h2>
      <p class="step-subtitle">We'll tailor the instructions for your specific tool — folder setup, upload steps, and how to keep your context updated.</p>
      <div class="tool-grid">
        ${Object.entries(TOOLS).map(([id, tool]) => `
          <div class="tool-card ${state.tool === id ? 'selected' : ''}" onclick="selectTool('${id}')">
            <span class="tool-icon">${tool.icon}</span>
            <span class="tool-name">${tool.name}</span>
            <span class="tool-desc">${tool.desc}</span>
          </div>
        `).join('')}
      </div>
      <div class="nav-row">
        <button class="btn btn-secondary" onclick="goStep(0)">← Back</button>
        <button class="btn btn-primary" onclick="goStep(2)" ${!state.tool ? 'disabled' : ''}>Continue →</button>
      </div>
    </div>
  `;
}

function renderFolderStep() {
  const fc = FOLDER_CONTENT[state.os];
  const isCodeEditor = ['cursor', 'windsurf', 'copilot'].includes(state.tool);

  let content = '';

  if (isCodeEditor) {
    content = `
      <div class="info-box success"><span class="icon">✅</span>
        <span><strong>Good news:</strong> ${TOOLS[state.tool].name} reads context files directly from your project folder. Instead of creating a separate folder, you'll clone this repo and fill in the <code>your-business/</code> folder inside it.</span>
      </div>
      <h3>Clone the repo</h3>
      <p>This gives you the full folder structure, templates, and auto-load files — all pre-wired.</p>
      ${codeBlock('git clone https://github.com/rochi1/brain-setup.git my-business-ai\ncd my-business-ai').outerHTML}
      <p style="margin-top:4px">No git? <a href="https://github.com/rochi1/brain-setup/archive/refs/heads/master.zip" target="_blank" style="color:var(--accent)">Download the repo as a ZIP</a>, unzip it, and open that folder in ${TOOLS[state.tool].name}.</p>
      <h3>Your folder structure</h3>
      <div class="folder-tree">
<span class="dir">my-business-ai/</span>
├── <span class="dir">your-business/</span>          ← Fill these in
│   ├── <span class="dir">context/</span>
│   │   ├── <span class="file">BUSINESS_PROFILE.md</span>
│   │   ├── <span class="file">BRAND_VOICE.md</span>
│   │   ├── <span class="file">AUDIENCE.md</span>
│   │   ├── <span class="file">PRODUCTS_SERVICES.md</span>
│   │   └── <span class="file">COMPETITORS.md</span>
│   ├── <span class="dir">prompts/</span>
│   │   ├── <span class="file">MASTER_PROMPT.md</span>
│   │   └── <span class="file">ROLES.md</span>
│   └── <span class="dir">governance/</span>
│       └── <span class="file">AI_POLICY.md</span>
└── <span class="file">.cursorrules / .windsurfrules</span>  ← Auto-loads context
      </div>
    `;
  } else {
    content = `
      <p>You'll save your context files here after generating them. Create this folder now so you're ready to save as you go.</p>
      <div class="os-tabs">
        <button class="os-tab ${state.os === 'mac' ? 'active' : ''}" onclick="setOS('mac')">🍎 Mac</button>
        <button class="os-tab ${state.os === 'windows' ? 'active' : ''}" onclick="setOS('windows')">🪟 Windows</button>
      </div>

      <h3>Option A — Terminal (fastest)</h3>
      <p>${state.os === 'mac' ? 'Open Terminal (press <kbd style="background:var(--code-bg);padding:1px 5px;border-radius:4px;font-size:12px">⌘ Space</kbd>, type Terminal, press Enter).' : 'Open PowerShell (press Windows key, type PowerShell, press Enter).'} Paste this command:</p>
      ${codeBlock(fc.create).outerHTML}

      <h3>Option B — File Explorer / Finder (no terminal needed)</h3>
      <p>${state.os === 'mac'
        ? 'Open Finder → Documents → New Folder → name it <code style="background:var(--code-bg);padding:1px 5px;border-radius:4px;font-size:12px">my-business-ai</code>. Create sub-folders: <code style="background:var(--code-bg);padding:1px 5px;border-radius:4px;font-size:12px">your-business/context</code>, <code style="background:var(--code-bg);padding:1px 5px;border-radius:4px;font-size:12px">your-business/prompts</code>, <code style="background:var(--code-bg);padding:1px 5px;border-radius:4px;font-size:12px">your-business/governance</code>.'
        : 'Open File Explorer → Documents → right-click → New Folder → name it <code style="background:var(--code-bg);padding:1px 5px;border-radius:4px;font-size:12px">my-business-ai</code>. Create sub-folders: <code style="background:var(--code-bg);padding:1px 5px;border-radius:4px;font-size:12px">your-business\\context</code>, <code style="background:var(--code-bg);padding:1px 5px;border-radius:4px;font-size:12px">your-business\\prompts</code>, <code style="background:var(--code-bg);padding:1px 5px;border-radius:4px;font-size:12px">your-business\\governance</code>.'
      }</p>

      <h3>Your target folder structure</h3>
      <div class="folder-tree">
<span class="dir">my-business-ai/</span>
└── <span class="dir">your-business/</span>
    ├── <span class="dir">context/</span>      ← Save BUSINESS_PROFILE.md, BRAND_VOICE.md etc here
    ├── <span class="dir">prompts/</span>      ← Save MASTER_PROMPT.md here
    └── <span class="dir">governance/</span>   ← Save AI_POLICY.md here
      </div>
      <div class="info-box tip"><span class="icon">💡</span>
        <span>${fc.note}</span>
      </div>
    `;
  }

  return `
    <div class="card">
      <h2 class="step-title">Set up your folder</h2>
      <p class="step-subtitle">This is where your completed context files will live.</p>
      ${content}
      <div class="nav-row">
        <button class="btn btn-secondary" onclick="goStep(1)">← Back</button>
        <button class="btn btn-primary" onclick="goStep(3)">Continue →</button>
      </div>
    </div>
  `;
}

function renderPromptsStep() {
  const requiredPrompts = PROMPTS.filter(p => p.required);
  const optionalPrompts = PROMPTS.filter(p => !p.required);

  function promptSection(p, idx) {
    const isOpen = idx === 0;
    const getText = () => {
      if (p.hasModes) return p.modes[state.brandVoiceMode].text;
      return p.text;
    };

    let modeToggle = '';
    if (p.hasModes) {
      modeToggle = `
        <div style="display:flex;gap:8px;margin-bottom:14px">
          ${Object.entries(p.modes).map(([modeId, mode]) => `
            <button
              class="os-tab ${state.brandVoiceMode === modeId ? 'active' : ''}"
              onclick="setBrandVoiceMode('${modeId}', '${p.id}')"
              style="font-size:12px;padding:6px 14px"
            >${mode.label}</button>
          `).join('')}
        </div>
      `;
    }

    return `
      <div class="prompt-section ${isOpen ? 'open' : ''}" id="prompt-${p.id}">
        <div class="prompt-header" onclick="togglePrompt('${p.id}')">
          <div class="prompt-num ${p.required ? '' : 'optional'}">${p.num}</div>
          <div class="prompt-header-text">
            <strong>${p.title}</strong>
            <span>${p.desc}</span>
          </div>
          <span class="prompt-badge ${p.required ? '' : 'optional-badge'}">${p.required ? 'Required' : 'Optional'}</span>
          <span class="prompt-chevron">▼</span>
        </div>
        <div class="prompt-body">
          ${modeToggle}
          <div class="prompt-text-wrap" id="prompt-wrap-${p.id}">
            <div class="prompt-text" id="prompt-text-${p.id}">${escapeHtml(getText())}</div>
            <div class="prompt-copy-row">
              <button class="prompt-copy-btn" id="prompt-btn-${p.id}" onclick="copyPrompt('${p.id}')">
                📋 Copy prompt
              </button>
            </div>
          </div>
          <div class="save-note">
            💾 Save AI output as:
            <code>${p.saveAs}</code>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="card">
      <h2 class="step-title">Generate your context files</h2>
      <p class="step-subtitle">Copy each prompt into your AI tool. Answer its questions. Save the output to your folder. Work through the required prompts in order — optional ones can be done any time.</p>

      <div class="info-box tip" style="margin-bottom:20px"><span class="icon">💡</span>
        <span>Each prompt tells your AI to fetch the blank template directly from GitHub — nothing to paste or download. If your AI tool can't fetch URLs, open the link, copy the content, and paste it at the end of the prompt.</span>
      </div>

      <h3>Required (do these in order)</h3>
      ${requiredPrompts.map((p, i) => promptSection(p, i)).join('')}

      <hr class="section-divider">
      <h3>Optional — run these when ready</h3>
      <p>Each one makes your AI more precise. Run them in any order.</p>
      ${optionalPrompts.map((p, i) => promptSection(p, i + 10)).join('')}

      <div class="nav-row">
        <button class="btn btn-secondary" onclick="goStep(2)">← Back</button>
        <button class="btn btn-primary" onclick="goStep(4)">Continue →</button>
      </div>
    </div>
  `;
}

function renderUploadStep() {
  const tool = TOOLS[state.tool] || TOOLS.other;
  const isAuto = tool.updateMethod === 'auto';

  return `
    <div class="card">
      <h2 class="step-title">Load your context into ${tool.name}</h2>
      <p class="step-subtitle">Your files are ready. Here's exactly how to get them working in ${tool.name}.</p>

      <h3>Configure ${tool.name}</h3>
      ${tool.uploadSteps}

      <hr class="section-divider">
      <h3>Keeping your context updated</h3>
      ${isAuto
        ? `<div class="info-box success"><span class="icon">🔄</span>
            <span><strong>You're all set.</strong> ${tool.name} reads your files automatically. Edit any file in <code>your-business/</code> and the change is picked up immediately — no re-uploading.</span>
          </div>`
        : tool.updateSteps
      }

      <div class="nav-row">
        <button class="btn btn-secondary" onclick="goStep(3)">← Back</button>
        <button class="btn btn-primary" onclick="goStep(5)">I'm done →</button>
      </div>
    </div>
  `;
}

function renderDoneStep() {
  const tool = TOOLS[state.tool] || TOOLS.other;
  return `
    <div class="card">
      <div class="done-hero">
        <div class="done-icon">🎉</div>
        <h2>You're set up</h2>
        <p>Your business context is ready. Every AI task you run through ${tool.name} now starts with full knowledge of who you are, how you sound, and who you serve.</p>
      </div>

      <div class="info-box success" style="margin-bottom:24px"><span class="icon">✅</span>
        <div>
          <strong>What to do right now:</strong>
          <ul style="margin:6px 0 0 16px;font-size:13px;line-height:1.8">
            <li>Test it — paste your Master Prompt in ${tool.name} and ask it to write something for your business</li>
            <li>Share the <code>your-business/prompts/MASTER_PROMPT.md</code> file with your team</li>
            <li>Add any remaining optional context files when you're ready</li>
          </ul>
        </div>
      </div>

      <h3>More resources</h3>
      <div class="resource-grid">
        <a class="resource-link" href="https://github.com/rochi1/brain-setup/blob/master/prompts/TASK_LIBRARY.md" target="_blank">
          <span class="r-icon">📚</span>
          <span>Task library — prebuilt prompts for content, email, analysis</span>
        </a>
        <a class="resource-link" href="https://github.com/rochi1/brain-setup/blob/master/prompts/ROLES.md" target="_blank">
          <span class="r-icon">🎭</span>
          <span>Role library — step into specific AI personas for different tasks</span>
        </a>
        <a class="resource-link" href="https://github.com/rochi1/brain-setup/blob/master/governance/REVIEW_PROCESS.md" target="_blank">
          <span class="r-icon">🔍</span>
          <span>Review process — how to check AI output before publishing</span>
        </a>
        <a class="resource-link" href="https://github.com/rochi1/brain-setup" target="_blank">
          <span class="r-icon">⭐</span>
          <span>View the full repo on GitHub</span>
        </a>
      </div>

      <div class="nav-row" style="justify-content:center;margin-top:32px">
        <button class="btn btn-secondary" onclick="goStep(0)">Start over with a different tool</button>
      </div>
    </div>
  `;
}

// ── Utilities ────────────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function togglePrompt(id) {
  const el = document.getElementById('prompt-' + id);
  if (el) el.classList.toggle('open');
}

function copyPrompt(id) {
  const prompt = PROMPTS.find(p => p.id === id);
  if (!prompt) return;
  const text = prompt.hasModes ? prompt.modes[state.brandVoiceMode].text : prompt.text;
  const btn = document.getElementById('prompt-btn-' + id);
  navigator.clipboard.writeText(text).then(() => {
    btn.innerHTML = '✓ Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.innerHTML = '📋 Copy prompt'; btn.classList.remove('copied'); }, 2000);
  });
}

function setBrandVoiceMode(mode, promptId) {
  state.brandVoiceMode = mode;
  // Re-render just the prompt text + toggle, not the whole step
  const textEl = document.getElementById('prompt-text-' + promptId);
  const prompt = PROMPTS.find(p => p.id === promptId);
  if (textEl && prompt) textEl.textContent = prompt.modes[mode].text;
  // Update tab active states
  document.querySelectorAll(`#prompt-${promptId} .os-tab`).forEach(btn => {
    btn.classList.toggle('active', btn.textContent === prompt.modes[mode].label);
  });
}

function setOS(os) {
  state.os = os;
  render();
}

function selectTool(id) {
  state.tool = id;
  render();
}

// ── Navigation ───────────────────────────────────────────
function goStep(n) {
  state.step = n;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Main render ───────────────────────────────────────────
function render() {
  renderProgress();
  const main = document.getElementById('main-content');
  if (!main) return;

  let html = '';
  switch (state.step) {
    case 0: html = renderWelcome(); break;
    case 1: html = renderToolStep(); break;
    case 2: html = renderFolderStep(); break;
    case 3: html = renderPromptsStep(); break;
    case 4: html = renderUploadStep(); break;
    case 5: html = renderDoneStep(); break;
    default: html = renderWelcome();
  }

  main.innerHTML = html;
}

// ── Boot ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', render);
