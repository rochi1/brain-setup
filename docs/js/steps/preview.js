import { state, getShareableURL } from '../state.js';
import { CONTEXT_FILES, MASTER_PROMPT_STEP } from '../prompts.js';
import { downloadZip } from '../zip.js';

const ALL_FILES = [...CONTEXT_FILES, MASTER_PROMPT_STEP];

function fileRow(file) {
  const content  = state.files[file.id];
  const isDone   = !!content;
  const isReq    = file.required || file.id === 'master-prompt';
  const icon     = isDone ? '✅' : (isReq ? '⚠️' : '—');
  const label    = isDone ? 'Complete' : (isReq ? 'Required — missing' : 'Skipped');
  const labelCls = isDone ? 'status-done' : (isReq ? 'status-warn' : 'status-skip');

  return `
    <div class="file-preview-row">
      <span class="file-preview-icon">${icon}</span>
      <div class="file-preview-info">
        <span class="file-preview-title">${file.title}</span>
        <span class="file-preview-filename">${file.saveAs || 'master-prompt'}</span>
      </div>
      <span class="file-preview-status ${labelCls}">${label}</span>
      <div class="file-preview-actions">
        <button class="btn btn-ghost btn-sm redo-btn" data-fileid="${file.id}">
          ${isDone ? '↺ Redo' : '+ Complete'}
        </button>
      </div>
    </div>
  `;
}

function roleRow(role, idx) {
  const done = !!role.output;
  return `
    <div class="file-preview-row">
      <span class="file-preview-icon">${done ? '✅' : '⚠️'}</span>
      <div class="file-preview-info">
        <span class="file-preview-title">${role.name || `Role ${idx + 1}`}</span>
        <span class="file-preview-filename">→ appended to ROLES.md</span>
      </div>
      <span class="file-preview-status ${done ? 'status-done' : 'status-warn'}">${done ? 'Complete' : 'Missing output'}</span>
    </div>
  `;
}

function taskRow(task, idx) {
  const done = !!task.output;
  return `
    <div class="file-preview-row">
      <span class="file-preview-icon">${done ? '✅' : '⚠️'}</span>
      <div class="file-preview-info">
        <span class="file-preview-title">${task.name || `Task ${idx + 1}`}</span>
        <span class="file-preview-filename">→ appended to TASK_LIBRARY.md</span>
      </div>
      <span class="file-preview-status ${done ? 'status-done' : 'status-warn'}">${done ? 'Complete' : 'Missing output'}</span>
    </div>
  `;
}

function canDownload() {
  const requiredIds = ALL_FILES.filter(f => f.required || f.id === 'master-prompt').map(f => f.id);
  return requiredIds.every(id => !!state.files[id]);
}

export function renderPreview() {
  const shareURL = getShareableURL();
  const ready    = canDownload();
  const roles    = state.wantsCustomRoles && state.customRoles?.length ? state.customRoles : [];
  const tasks    = state.wantsCustomTasks && state.customTasks?.length ? state.customTasks : [];

  return `
    <div class="card">
      <h2 class="step-title">Review your files</h2>
      <p class="step-subtitle">Check everything looks good before downloading your ZIP.</p>

      ${!ready ? `
        <div class="info-box warn" style="margin-bottom:20px"><span class="icon">⚠️</span>
          <span>Some required files are still missing. Complete them before downloading.</span>
        </div>
      ` : `
        <div class="info-box success" style="margin-bottom:20px"><span class="icon">🎉</span>
          <span>All required files are complete. You're ready to download.</span>
        </div>
      `}

      <div class="file-preview-list">
        ${ALL_FILES.map(f => fileRow(f)).join('')}
        ${roles.map((r, i) => roleRow(r, i)).join('')}
        ${tasks.map((t, i) => taskRow(t, i)).join('')}
      </div>

      <div class="shareable-url-block" style="margin:24px 0">
        <label class="field-label">Shareable link</label>
        <p class="field-hint" style="margin-bottom:8px">Share this link to resume your progress from any device.</p>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <input type="text" class="url-input" id="share-url-input" readonly
            value="${shareURL}" style="flex:1;min-width:200px" />
          <button class="btn btn-ghost" id="copy-share-url-btn">📋 Copy link</button>
        </div>
      </div>

      <div id="zip-status" style="min-height:24px;color:var(--muted);font-size:14px;margin-bottom:8px"></div>

      <div class="nav-row">
        <button class="btn btn-secondary" id="preview-back-btn">← Back</button>
        <button class="btn btn-primary btn-download" id="download-zip-btn" ${ready ? '' : 'disabled'}>
          ⬇️ Download ZIP
        </button>
        <button class="btn btn-primary" id="preview-next-btn">Next: upload & go →</button>
      </div>
    </div>
  `;
}

export function bindPreview({ onBack, onNext, onResumeFile }) {
  document.getElementById('preview-back-btn')?.addEventListener('click', onBack);
  document.getElementById('preview-next-btn')?.addEventListener('click', onNext);

  document.getElementById('copy-share-url-btn')?.addEventListener('click', () => {
    const input = document.getElementById('share-url-input');
    if (!input) return;
    navigator.clipboard.writeText(input.value).then(() => {
      const btn = document.getElementById('copy-share-url-btn');
      btn.innerHTML = '✓ Copied!';
      setTimeout(() => { btn.innerHTML = '📋 Copy link'; }, 2000);
    });
  });

  document.querySelectorAll('.redo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const fileId = btn.dataset.fileid;
      onResumeFile(fileId);
    });
  });

  document.getElementById('download-zip-btn')?.addEventListener('click', async () => {
    if (!canDownload()) return;
    const statusEl = document.getElementById('zip-status');
    const zipBtn   = document.getElementById('download-zip-btn');
    zipBtn.disabled = true;
    zipBtn.innerHTML = '⏳ Building ZIP...';
    try {
      await downloadZip((msg) => { if (statusEl) statusEl.textContent = msg; });
      if (statusEl) statusEl.textContent = '✅ ZIP downloaded!';
      zipBtn.innerHTML = '✓ Downloaded';
    } catch (err) {
      console.error(err);
      if (statusEl) statusEl.textContent = '❌ Download failed — check console.';
      zipBtn.disabled = false;
      zipBtn.innerHTML = '⬇️ Download ZIP';
    }
  });
}
