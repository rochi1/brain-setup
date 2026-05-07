import { state, saveState } from '../state.js';
import { escapeHtml, promptCopyBlock } from '../render.js';
import { CONTEXT_FILES, MASTER_PROMPT_STEP } from '../prompts.js';
import { TOOLS } from '../tools.js';

export const ALL_FILES = [...CONTEXT_FILES, MASTER_PROMPT_STEP];

export function getTotalFileSteps() {
  return ALL_FILES.length;
}

// ── Business name capture ─────────────────────────────────
export function renderBusinessNameCapture() {
  return `
    <div class="card">
      <h2 class="step-title">Let's build your context files</h2>
      <p class="step-subtitle">
        You'll work through each file one at a time. Copy the prompt, run it in your AI tool,
        paste the output back here. At the end you download everything as a ZIP.
      </p>
      <div class="info-box tip" style="margin-bottom:24px"><span class="icon">💡</span>
        <span>Takes 30–60 minutes depending on how many optional files you do. Progress is saved automatically — close the tab and come back any time.</span>
      </div>

      <div class="field-group">
        <label class="field-label">What's your business name? *</label>
        <input type="text" class="field-input" id="biz-name-input"
          placeholder="e.g. Acme Corp"
          value="${escapeHtml(state.businessName)}" />
        <p class="field-hint">Used to name your ZIP file and generate your Master Prompt.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Website URL <em>(optional)</em></label>
        <input type="url" class="field-input" id="biz-website-input"
          placeholder="e.g. https://www.acmecorp.com"
          value="${escapeHtml(state.websiteUrl)}" />
        <p class="field-hint">Your AI will fetch your site first and use it as a starting point — saving you time answering questions about basics already on the page.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Business logo <em>(optional)</em></label>
        <div class="logo-upload-area" id="logo-upload-area">
          <input type="file" class="logo-file-input" id="logo-file-input"
            accept="image/png,image/jpeg,image/svg+xml,image/webp" />
          <div id="logo-no-file" style="${state.logoName ? 'display:none' : ''}">
            <label class="logo-upload-trigger" for="logo-file-input">
              <span class="logo-upload-icon">🖼️</span>
              <span class="logo-upload-label-text">Click to upload logo</span>
              <span class="logo-upload-hint">PNG, JPG, SVG or WebP</span>
            </label>
          </div>
          <div id="logo-has-file" style="${state.logoName ? '' : 'display:none'}">
            <div class="logo-preview-wrap">
              <span class="logo-preview-name">📎 ${escapeHtml(state.logoName)}</span>
              <button class="btn btn-ghost btn-sm" id="logo-remove-btn">✕ Remove</button>
            </div>
            ${state.logoName && !state._logoFile ? `
              <p style="font-size:12px;color:#b45309;padding:0 16px 12px;margin:0">
                ⚠️ File not in memory — please re-upload the logo before downloading your ZIP, or it will be skipped.
              </p>` : ''}
          </div>
        </div>
        <p class="field-hint">Added to your context folder so AI tools can reference your brand visuals.</p>
      </div>

      <div class="nav-row">
        <button class="btn btn-secondary" id="biz-back-btn">← Back</button>
        <button class="btn btn-primary" id="biz-next-btn" ${state.businessName.trim() ? '' : 'disabled'}>
          Start building →
        </button>
      </div>
    </div>
  `;
}

export function bindBusinessNameCapture({ onBack, onNext }) {
  const nameInput    = document.getElementById('biz-name-input');
  const websiteInput = document.getElementById('biz-website-input');
  const fileInput    = document.getElementById('logo-file-input');
  const btn          = document.getElementById('biz-next-btn');

  nameInput?.addEventListener('input', () => {
    state.businessName = nameInput.value;
    saveState();
    if (btn) btn.disabled = !nameInput.value.trim();
  });

  websiteInput?.addEventListener('input', () => {
    state.websiteUrl = websiteInput.value.trim();
    saveState();
  });

  fileInput?.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    state.logoName  = file.name;
    state._logoFile = file;
    saveState();
    const noFile  = document.getElementById('logo-no-file');
    const hasFile = document.getElementById('logo-has-file');
    const nameEl  = hasFile?.querySelector('.logo-preview-name');
    if (noFile)  noFile.style.display  = 'none';
    if (hasFile) hasFile.style.display = '';
    if (nameEl)  nameEl.textContent    = `📎 ${file.name}`;
    document.getElementById('logo-remove-btn')?.addEventListener('click', handleLogoRemove);
  });

  document.getElementById('logo-remove-btn')?.addEventListener('click', handleLogoRemove);

  function handleLogoRemove() {
    state.logoName  = '';
    state._logoFile = null;
    if (fileInput) fileInput.value = '';
    saveState();
    const noFile  = document.getElementById('logo-no-file');
    const hasFile = document.getElementById('logo-has-file');
    if (noFile)  noFile.style.display  = '';
    if (hasFile) hasFile.style.display = 'none';
  }

  document.getElementById('biz-back-btn')?.addEventListener('click', onBack);
  btn?.addEventListener('click', () => {
    if (state.businessName.trim()) onNext();
  });
}

// ── Prompt phase ──────────────────────────────────────────
export function renderFilePromptPhase(file) {
  const stepNum   = state.fileSubStep + 1;
  const total     = getTotalFileSteps();
  const isMaster  = file.id === 'master-prompt';
  const isOptional = !file.required && !isMaster;
  const alreadyDone = !!state.files[file.id];
  const toolName  = state.tool ? TOOLS[state.tool].name : 'your AI tool';

  let promptText = '';
  let modeToggle = '';

  if (isMaster) {
    promptText = MASTER_PROMPT_STEP.getPrompt(state.files);
  } else if (file.hasModes) {
    const mode = file.modes[state.brandVoiceMode];
    promptText = mode.getPrompt();
    modeToggle = `
      <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
        ${Object.entries(file.modes).map(([modeId, m]) => `
          <button class="os-tab mode-btn ${state.brandVoiceMode === modeId ? 'active' : ''}"
            data-mode="${modeId}" data-fileid="${file.id}">
            ${m.label}
          </button>
        `).join('')}
      </div>
    `;
  } else {
    promptText = file.getPrompt();
  }

  return `
    <div class="card">
      <div class="file-step-header">
        <div class="file-step-meta">
          <span class="file-step-counter">File ${stepNum} of ${total}</span>
          <span class="badge-${isOptional ? 'optional' : 'required'}">${isOptional ? 'Optional' : 'Required'}</span>
          ${isMaster ? '<span class="badge-required">Final step</span>' : ''}
        </div>
        <h2 class="step-title" style="margin-top:8px">${file.title}</h2>
        <div class="why-it-matters">
          <span class="why-icon">💡</span>
          <span>${file.whyItMatters}</span>
        </div>
      </div>

      ${alreadyDone ? `
        <div class="info-box success" style="margin-bottom:16px"><span class="icon">✅</span>
          <span>You've already completed this file. Re-run the prompt and paste new output to replace it, or skip ahead.</span>
        </div>
      ` : ''}

      <h3>Step 1 — Copy this prompt into ${toolName}</h3>
      <p style="color:var(--muted);font-size:14px;margin-bottom:12px">
        Paste this prompt into ${toolName}. Answer the questions it asks, then copy the final output it produces.
      </p>

      ${modeToggle}
      ${promptCopyBlock(promptText, file.id)}

      <div class="nav-row" style="margin-top:24px">
        <button class="btn btn-secondary" id="file-back-btn">← Back</button>
        ${isOptional ? `<button class="btn btn-ghost" id="file-skip-btn">Skip this file</button>` : ''}
        <button class="btn btn-primary" id="file-got-output-btn">I've got the output →</button>
      </div>
    </div>
  `;
}

export function bindFilePromptPhase(file, { onBack, onSkip, onGotOutput, onModeChange }) {
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.brandVoiceMode = btn.dataset.mode;
      saveState();
      onModeChange();
    });
  });

  // Wire copy button using data attribute
  const copyBtn = document.getElementById(`copy-btn-${file.id}`);
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = copyBtn.dataset.prompt.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.innerHTML = '✓ Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => { copyBtn.innerHTML = '📋 Copy prompt'; copyBtn.classList.remove('copied'); }, 2000);
      });
    });
  }

  document.getElementById('file-back-btn')?.addEventListener('click', onBack);
  document.getElementById('file-skip-btn')?.addEventListener('click', onSkip);
  document.getElementById('file-got-output-btn')?.addEventListener('click', onGotOutput);
}

// ── Paste phase ───────────────────────────────────────────
export function renderFilePastePhase(file) {
  const stepNum   = state.fileSubStep + 1;
  const total     = getTotalFileSteps();
  const isOptional = !file.required && file.id !== 'master-prompt';
  const existing  = state.files[file.id] || '';
  const isDraft   = !!existing && !state.filePhase; // always show existing

  return `
    <div class="card">
      <div class="file-step-header">
        <div class="file-step-meta">
          <span class="file-step-counter">File ${stepNum} of ${total}</span>
          <span class="badge-${isOptional ? 'optional' : 'required'}">${isOptional ? 'Optional' : 'Required'}</span>
        </div>
        <h2 class="step-title" style="margin-top:8px">${file.title}</h2>
      </div>

      <h3>Step 2 — Paste your AI's output below</h3>
      <p style="color:var(--muted);font-size:14px;margin-bottom:4px">
        Copy the full response your AI produced and paste it here.
      </p>

      <details class="good-output-hint" style="margin-bottom:16px">
        <summary>What good output looks like</summary>
        <p>${file.goodOutputLooks}</p>
      </details>

      <textarea class="paste-area" id="paste-area-${file.id}"
        placeholder="Paste your AI's output here..."
      >${escapeHtml(existing)}</textarea>
      <div id="paste-error-${file.id}" class="paste-error" style="display:none">
        ⚠️ Paste your AI's output before continuing.
      </div>

      <div class="nav-row" style="margin-top:16px">
        <button class="btn btn-secondary" id="paste-back-btn">← Back to prompt</button>
        ${isOptional ? `<button class="btn btn-ghost" id="paste-skip-btn">Skip this file</button>` : ''}
        <button class="btn btn-primary" id="paste-confirm-btn">
          ${existing ? 'Update & continue →' : 'Confirm & continue →'}
        </button>
      </div>
    </div>
  `;
}

export function bindFilePastePhase(file, { onBack, onSkip, onConfirm }) {
  const ta = document.getElementById(`paste-area-${file.id}`);

  // Save draft as user types
  ta?.addEventListener('input', () => {
    state.files[file.id] = ta.value;
    saveState();
    const err = document.getElementById(`paste-error-${file.id}`);
    if (err && ta.value.trim()) err.style.display = 'none';
  });

  document.getElementById('paste-back-btn')?.addEventListener('click', onBack);
  document.getElementById('paste-skip-btn')?.addEventListener('click', onSkip);
  document.getElementById('paste-confirm-btn')?.addEventListener('click', () => {
    const err = document.getElementById(`paste-error-${file.id}`);
    if (!ta?.value.trim()) {
      if (err) err.style.display = 'block';
      return;
    }
    state.files[file.id] = ta.value.trim();
    saveState();
    onConfirm();
  });
}
