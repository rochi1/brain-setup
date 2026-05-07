import { state } from '../state.js';
import { TOOLS } from '../tools.js';

export function renderDone() {
  const tool     = TOOLS[state.tool] || TOOLS['other'];
  const bizName  = state.businessName || 'your business';

  return `
    <div class="card done-card">
      <div class="done-hero">
        <div class="done-icon">🎉</div>
        <h2 class="done-title">You're all set, ${bizName}!</h2>
        <p class="done-subtitle">
          Your AI context kit is built. Your team can now start any AI session with full
          business context — consistent voice, accurate facts, right audience every time.
        </p>
      </div>

      <div class="next-steps">
        <h3>What to do next</h3>
        <ol class="what-next-list">
          <li>
            <strong>Unzip your kit</strong> — you'll find context files, your master prompt,
            roles, tasks, and a README.
          </li>
          <li>
            <strong>Store it somewhere your team can access</strong> — a shared drive, Notion,
            SharePoint, or Google Drive all work well.
          </li>
          <li>
            <strong>Open ${tool.name}</strong> and start a new session using your master prompt —
            either paste inline or upload the files depending on what your tool supports.
          </li>
          <li>
            <strong>Run your first real task</strong> — write something, draft something, analyse
            something. See the difference context makes.
          </li>
          <li>
            <strong>Revisit and refine</strong> — come back here any time to update a file,
            add a role, or build out your task library.
          </li>
        </ol>
      </div>

      <div class="resources-grid">
        <h3>Resources</h3>
        <div class="resources-row">
          <a class="resource-card" href="../docs/library.html" target="_blank">
            <span class="resource-icon">📚</span>
            <strong>Prompt library</strong>
            <span>Browse ready-to-use prompts for common tasks</span>
          </a>
          <a class="resource-card" href="https://github.com/rochi1/brain-setup" target="_blank">
            <span class="resource-icon">💻</span>
            <strong>GitHub repo</strong>
            <span>View the source, report issues, or fork the kit</span>
          </a>
          <a class="resource-card" href="../onboarding/CHECKLIST.md" target="_blank">
            <span class="resource-icon">✅</span>
            <strong>Onboarding checklist</strong>
            <span>Use this to roll out AI tools across your team</span>
          </a>
        </div>
      </div>

      <div class="done-actions">
        <button class="btn btn-secondary start-over-btn" id="done-start-over-btn">
          ↺ Start over with a new business
        </button>
      </div>
    </div>
  `;
}

export function bindDone({ onStartOver }) {
  document.getElementById('done-start-over-btn')?.addEventListener('click', onStartOver);
}
