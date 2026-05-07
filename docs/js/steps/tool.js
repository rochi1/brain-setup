import { state, saveState } from '../state.js';
import { TOOLS } from '../tools.js';

export function renderToolStep() {
  return `
    <div class="card">
      <h2 class="step-title">Which AI tool are you setting up?</h2>
      <p class="step-subtitle">We'll tailor the final upload instructions for your specific tool.</p>
      <div class="tool-grid">
        ${Object.entries(TOOLS).map(([id, tool]) => `
          <div class="tool-card ${state.tool === id ? 'selected' : ''}" data-tool="${id}">
            <span class="tool-icon">${tool.icon}</span>
            <span class="tool-name">${tool.name}</span>
            <span class="tool-desc">${tool.desc}</span>
          </div>
        `).join('')}
      </div>
      <div class="nav-row">
        <button class="btn btn-secondary" id="tool-back-btn">← Back</button>
        <button class="btn btn-primary" id="tool-next-btn" ${!state.tool ? 'disabled' : ''}>Continue →</button>
      </div>
    </div>
  `;
}

export function bindToolStep({ onBack, onNext }) {
  document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => {
      state.tool = card.dataset.tool;
      saveState();
      document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      document.getElementById('tool-next-btn').disabled = false;
    });
  });
  document.getElementById('tool-back-btn')?.addEventListener('click', onBack);
  document.getElementById('tool-next-btn')?.addEventListener('click', onNext);
}
