import { state } from '../state.js';
import { escapeHtml } from '../render.js';

export function renderWelcome({ onStart, onResume, onStartOver }) {
  const hasSaved = !!localStorage.getItem('ai-kit-state-v2');

  const resumeBanner = hasSaved ? `
    <div class="info-box tip" style="margin-bottom:24px">
      <span class="icon">💾</span>
      <div>
        <strong>You have a session in progress.</strong>
        <div style="margin-top:8px;display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-primary" style="font-size:13px;padding:8px 18px" id="resume-btn">Resume where I left off</button>
          <button class="btn btn-secondary" style="font-size:13px;padding:8px 18px" id="fresh-btn">Start fresh</button>
        </div>
      </div>
    </div>
  ` : '';

  return `
    <div class="card">
      ${resumeBanner}
      <div style="text-align:center;padding:16px 0 16px">
        <div style="font-size:52px;margin-bottom:16px">🚀</div>
        <h1 class="step-title" style="font-size:26px">Set up AI that actually knows your business</h1>
        <p class="step-subtitle" style="max-width:480px;margin:0 auto 32px">
          Answer a few questions, let your AI generate your context files, and download everything in one ready-to-use package.
        </p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:28px">
        ${[
          ['🧠', 'Context files',      '5 files that tell AI who you are, how you sound, and who you serve'],
          ['📋', 'AI Policy',          'Clear rules for how your team uses AI tools safely'],
          ['📦', 'ZIP download',       'Everything packaged and ready to load into your AI tool'],
          ['🔄', 'Two master prompts', 'One for tools with file upload, one self-contained for everything else'],
        ].map(([icon, title, desc]) => `
          <div style="border:1px solid var(--border);border-radius:8px;padding:16px">
            <div style="font-size:22px;margin-bottom:6px">${icon}</div>
            <strong style="font-size:14px;display:block;margin-bottom:4px">${title}</strong>
            <span style="font-size:12px;color:var(--muted)">${desc}</span>
          </div>
        `).join('')}
      </div>
      <div class="nav-row" style="justify-content:center">
        <button class="btn btn-primary" id="get-started-btn">Get started →</button>
      </div>
    </div>
  `;
}

export function bindWelcome({ onStart, onResume, onStartOver }) {
  document.getElementById('get-started-btn')?.addEventListener('click', onStart);
  document.getElementById('resume-btn')?.addEventListener('click', onResume);
  document.getElementById('fresh-btn')?.addEventListener('click', onStartOver);
}
