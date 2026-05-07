import { state } from './state.js';

// ── Basic helpers ─────────────────────────────────────────
export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;');
}

export function copyText(text, btn, label = '📋 Copy prompt') {
  navigator.clipboard.writeText(text).then(() => {
    btn.innerHTML = '✓ Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.innerHTML = label; btn.classList.remove('copied'); }, 2000);
  });
}

export function codeBlock(code) {
  const wrap = document.createElement('div');
  wrap.className = 'code-block';
  const pre = document.createElement('pre');
  pre.textContent = code;
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = 'Copy';
  btn.onclick = () => {
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    });
  };
  wrap.appendChild(pre);
  wrap.appendChild(btn);
  return wrap;
}

// ── Progress bar ──────────────────────────────────────────
export function renderProgress(currentStep) {
  const STEPS = [
    { label: 'Your tool',      step: 1 },
    { label: 'Build context',  step: 2 },
    { label: 'Roles & tasks',  step: 3 },
    { label: 'Download',       step: 4 },
    { label: 'Load into tool', step: 5 },
    { label: 'Done',           step: 6 },
  ];
  const items = STEPS.map(({ label, step }, i) => {
    const isDone   = currentStep > step;
    const isActive = currentStep === step;
    const cls = 'progress-step' + (isActive ? ' active' : '') + (isDone ? ' done' : '');
    const sep = i < STEPS.length - 1 ? '<div class="progress-sep"></div>' : '';
    return `
      <div class="${cls}">
        <div class="dot"></div>
        <span class="label">${label}</span>
      </div>${sep}
    `;
  }).join('');
  return `<div class="progress-wrap">${items}</div>`;
}

// ── Header (start-over button) ────────────────────────────
export function renderHeader(onStartOver) {
  // Attach start-over handler to site header after render
  requestAnimationFrame(() => {
    const existing = document.getElementById('app-start-over-btn');
    if (existing) existing.onclick = onStartOver;
  });
  if (state.step === 0) return '';
  return `
    <div class="app-header">
      <div></div>
      <button class="btn btn-ghost start-over-btn" id="app-start-over-btn">↺ Start over</button>
    </div>
  `;
}

// ── Prompt copy block (large) ─────────────────────────────
export function promptCopyBlock(promptText, fileId) {
  return `
    <div class="prompt-copy-block">
      <pre class="prompt-pre" id="prompt-pre-${fileId}">${escapeHtml(promptText)}</pre>
      <button class="prompt-copy-btn-large" id="copy-btn-${fileId}"
        data-prompt="${escapeHtml(promptText)}">
        📋 Copy prompt
      </button>
    </div>
  `;
}
