import { state, saveState } from '../state.js';
import { escapeHtml, promptCopyBlock } from '../render.js';

function getRolePrompt(role) {
  return `You are helping configure an AI assistant for a business.

Define a custom role card for the following role.

Role name: ${role.name}
Description: ${role.description}
Context: ${role.context || 'No additional context provided.'}

Write a role definition in the following format:
\`\`\`
## ${role.name}

**Purpose:** [One sentence — what this role does]

**Activation prompt:**
You are [role name], a specialist at [description]. You help the team by [key responsibilities]. You always [key behaviour 1] and [key behaviour 2]. When given a task, you [expected approach].

**Example tasks:**
- [Example 1]
- [Example 2]
- [Example 3]

**Do not:**
- [Boundary 1]
- [Boundary 2]
\`\`\`

Make it specific, professional, and immediately usable.`;
}

function getTaskPrompt(task) {
  return `You are helping build a reusable AI task prompt for a business.

Create a task prompt template for the following task.

Task name: ${task.name}
What it does: ${task.description}
Typical input: ${task.input || 'Not specified'}

Write a task prompt template in the following format:
\`\`\`
## ${task.name}

**When to use:** [Brief description of the scenario]

**Template prompt:**
[Write a detailed, reusable prompt template. Use [PLACEHOLDERS] for variable parts. Write it so anyone on the team can copy, fill in the placeholders, and get a great result immediately.]

**Input needed:**
- [Required input 1]
- [Required input 2]

**Expected output:** [What the AI will produce]
\`\`\`

Be specific. Write the template prompt in full — don't leave blanks. Use [PLACEHOLDERS] only for the parts the user must fill in each time.`;
}

// ── Roles gate ────────────────────────────────────────────
export function renderRolesGate() {
  return `
    <div class="card">
      <h2 class="step-title">Custom roles</h2>
      <p class="step-subtitle">
        Custom roles let you activate a specific "persona" in your AI tool — like a copywriter,
        analyst, or support rep — with one prompt. Do you want to create any?
      </p>
      <div class="choice-row">
        <button class="choice-btn ${state.wantsCustomRoles === true ? 'active' : ''}" id="roles-yes-btn">
          <span class="choice-icon">✅</span>
          <strong>Yes, let's create custom roles</strong>
          <span>I'll define 1–3 roles my team will use regularly.</span>
        </button>
        <button class="choice-btn ${state.wantsCustomRoles === false ? 'active' : ''}" id="roles-no-btn">
          <span class="choice-icon">⏭️</span>
          <strong>Skip for now</strong>
          <span>I'll use the template roles. I can add custom ones later.</span>
        </button>
      </div>
      <div class="nav-row">
        <button class="btn btn-secondary" id="roles-gate-back-btn">← Back</button>
        <button class="btn btn-primary" id="roles-gate-next-btn"
          ${state.wantsCustomRoles !== null ? '' : 'disabled'}>
          Continue →
        </button>
      </div>
    </div>
  `;
}

export function bindRolesGate({ onBack, onNext }) {
  document.getElementById('roles-yes-btn')?.addEventListener('click', () => {
    state.wantsCustomRoles = true;
    state.roleSubStep = 0;
    state.customRoles = state.customRoles?.length ? state.customRoles : [{ name: '', description: '', context: '', output: '' }];
    saveState();
    document.getElementById('roles-gate-next-btn').disabled = false;
    document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('roles-yes-btn').classList.add('active');
  });
  document.getElementById('roles-no-btn')?.addEventListener('click', () => {
    state.wantsCustomRoles = false;
    saveState();
    document.getElementById('roles-gate-next-btn').disabled = false;
    document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('roles-no-btn').classList.add('active');
  });
  document.getElementById('roles-gate-back-btn')?.addEventListener('click', onBack);
  document.getElementById('roles-gate-next-btn')?.addEventListener('click', () => {
    if (state.wantsCustomRoles !== null) onNext();
  });
}

// ── Role form ─────────────────────────────────────────────
export function renderRoleForm(idx) {
  const role = state.customRoles[idx] || {};
  const total = state.customRoles.length;
  return `
    <div class="card">
      <div class="file-step-meta" style="margin-bottom:8px">
        <span class="file-step-counter">Role ${idx + 1} of ${total}</span>
      </div>
      <h2 class="step-title">Define role ${idx + 1}</h2>
      <p class="step-subtitle">Fill in the details. We'll generate the full role definition for you.</p>
      <div class="field-group">
        <label class="field-label">Role name *</label>
        <input type="text" class="field-input" id="role-name" placeholder="e.g. Social Media Manager"
          value="${escapeHtml(role.name || '')}" />
      </div>
      <div class="field-group">
        <label class="field-label">What this role does *</label>
        <input type="text" class="field-input" id="role-desc"
          placeholder="e.g. Writes engaging social captions and plans content calendars"
          value="${escapeHtml(role.description || '')}" />
      </div>
      <div class="field-group">
        <label class="field-label">Any extra context? <em>(optional)</em></label>
        <input type="text" class="field-input" id="role-context"
          placeholder="e.g. Channels: Instagram, LinkedIn. Tone: conversational."
          value="${escapeHtml(role.context || '')}" />
        <p class="field-hint">Platforms, tone requirements, constraints, etc.</p>
      </div>
      <div id="role-form-error" class="paste-error" style="display:none">⚠️ Name and description are required.</div>
      <div class="nav-row">
        <button class="btn btn-secondary" id="role-form-back-btn">← Back</button>
        <button class="btn btn-primary" id="role-form-next-btn">Generate prompt →</button>
      </div>
    </div>
  `;
}

export function bindRoleForm(idx, { onBack, onNext }) {
  const save = () => {
    state.customRoles[idx] = {
      ...state.customRoles[idx],
      name: document.getElementById('role-name')?.value || '',
      description: document.getElementById('role-desc')?.value || '',
      context: document.getElementById('role-context')?.value || '',
    };
    saveState();
  };
  document.getElementById('role-name')?.addEventListener('input', save);
  document.getElementById('role-desc')?.addEventListener('input', save);
  document.getElementById('role-context')?.addEventListener('input', save);
  document.getElementById('role-form-back-btn')?.addEventListener('click', onBack);
  document.getElementById('role-form-next-btn')?.addEventListener('click', () => {
    save();
    const role = state.customRoles[idx];
    if (!role.name.trim() || !role.description.trim()) {
      document.getElementById('role-form-error').style.display = 'block';
      return;
    }
    onNext();
  });
}

// ── Role prompt phase ─────────────────────────────────────
export function renderRolePromptPhase(idx) {
  const role = state.customRoles[idx];
  const promptText = getRolePrompt(role);
  return `
    <div class="card">
      <div class="file-step-meta" style="margin-bottom:8px">
        <span class="file-step-counter">Role ${idx + 1} — Generate</span>
      </div>
      <h2 class="step-title">${escapeHtml(role.name)}</h2>
      <p class="step-subtitle">Copy this prompt into your AI tool and paste the output back on the next screen.</p>
      ${promptCopyBlock(promptText, `role-${idx}`)}
      <div class="nav-row" style="margin-top:24px">
        <button class="btn btn-secondary" id="role-prompt-back-btn">← Edit details</button>
        <button class="btn btn-primary" id="role-got-output-btn">I've got the output →</button>
      </div>
    </div>
  `;
}

export function bindRolePromptPhase(idx, { onBack, onGotOutput }) {
  const copyBtn = document.getElementById(`copy-btn-role-${idx}`);
  copyBtn?.addEventListener('click', () => {
    const role = state.customRoles[idx];
    navigator.clipboard.writeText(getRolePrompt(role)).then(() => {
      copyBtn.innerHTML = '✓ Copied!'; copyBtn.classList.add('copied');
      setTimeout(() => { copyBtn.innerHTML = '📋 Copy prompt'; copyBtn.classList.remove('copied'); }, 2000);
    });
  });
  document.getElementById('role-prompt-back-btn')?.addEventListener('click', onBack);
  document.getElementById('role-got-output-btn')?.addEventListener('click', onGotOutput);
}

// ── Role paste phase ──────────────────────────────────────
export function renderRolePastePhase(idx) {
  const role = state.customRoles[idx];
  const existing = role.output || '';
  return `
    <div class="card">
      <div class="file-step-meta" style="margin-bottom:8px">
        <span class="file-step-counter">Role ${idx + 1} — Paste output</span>
      </div>
      <h2 class="step-title">${escapeHtml(role.name)}</h2>
      <p style="color:var(--muted);font-size:14px;margin-bottom:8px">Paste the full role definition your AI produced.</p>
      <textarea class="paste-area" id="role-paste-${idx}"
        placeholder="Paste your AI's role definition here...">${escapeHtml(existing)}</textarea>
      <div id="role-paste-error-${idx}" class="paste-error" style="display:none">⚠️ Paste the output before continuing.</div>
      <div class="nav-row" style="margin-top:16px">
        <button class="btn btn-secondary" id="role-paste-back-btn">← Back to prompt</button>
        <button class="btn btn-ghost" id="role-add-another-btn">+ Add another role</button>
        <button class="btn btn-primary" id="role-paste-confirm-btn">${existing ? 'Update & continue →' : 'Confirm & continue →'}</button>
      </div>
    </div>
  `;
}

export function bindRolePastePhase(idx, { onBack, onAddAnother, onConfirm }) {
  const ta = document.getElementById(`role-paste-${idx}`);
  ta?.addEventListener('input', () => {
    state.customRoles[idx].output = ta.value;
    saveState();
    const err = document.getElementById(`role-paste-error-${idx}`);
    if (err && ta.value.trim()) err.style.display = 'none';
  });
  document.getElementById('role-paste-back-btn')?.addEventListener('click', onBack);
  document.getElementById('role-add-another-btn')?.addEventListener('click', () => {
    if (!ta?.value.trim()) { document.getElementById(`role-paste-error-${idx}`).style.display = 'block'; return; }
    state.customRoles[idx].output = ta.value.trim();
    saveState();
    onAddAnother();
  });
  document.getElementById('role-paste-confirm-btn')?.addEventListener('click', () => {
    if (!ta?.value.trim()) { document.getElementById(`role-paste-error-${idx}`).style.display = 'block'; return; }
    state.customRoles[idx].output = ta.value.trim();
    saveState();
    onConfirm();
  });
}

// ── Tasks gate ────────────────────────────────────────────
export function renderTasksGate() {
  return `
    <div class="card">
      <h2 class="step-title">Custom tasks</h2>
      <p class="step-subtitle">
        Custom tasks are reusable prompt templates for specific jobs your team does regularly —
        like writing a case study, drafting a client email, or summarising a meeting.
      </p>
      <div class="choice-row">
        <button class="choice-btn ${state.wantsCustomTasks === true ? 'active' : ''}" id="tasks-yes-btn">
          <span class="choice-icon">✅</span>
          <strong>Yes, create custom tasks</strong>
          <span>I'll define 1–3 tasks my team does repeatedly.</span>
        </button>
        <button class="choice-btn ${state.wantsCustomTasks === false ? 'active' : ''}" id="tasks-no-btn">
          <span class="choice-icon">⏭️</span>
          <strong>Skip for now</strong>
          <span>The template task library is enough to start.</span>
        </button>
      </div>
      <div class="nav-row">
        <button class="btn btn-secondary" id="tasks-gate-back-btn">← Back</button>
        <button class="btn btn-primary" id="tasks-gate-next-btn"
          ${state.wantsCustomTasks !== null ? '' : 'disabled'}>
          Continue →
        </button>
      </div>
    </div>
  `;
}

export function bindTasksGate({ onBack, onNext }) {
  document.getElementById('tasks-yes-btn')?.addEventListener('click', () => {
    state.wantsCustomTasks = true;
    state.taskSubStep = 0;
    state.customTasks = state.customTasks?.length ? state.customTasks : [{ name: '', description: '', input: '', output: '' }];
    saveState();
    document.getElementById('tasks-gate-next-btn').disabled = false;
    document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tasks-yes-btn').classList.add('active');
  });
  document.getElementById('tasks-no-btn')?.addEventListener('click', () => {
    state.wantsCustomTasks = false;
    saveState();
    document.getElementById('tasks-gate-next-btn').disabled = false;
    document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tasks-no-btn').classList.add('active');
  });
  document.getElementById('tasks-gate-back-btn')?.addEventListener('click', onBack);
  document.getElementById('tasks-gate-next-btn')?.addEventListener('click', () => {
    if (state.wantsCustomTasks !== null) onNext();
  });
}

// ── Task form ─────────────────────────────────────────────
export function renderTaskForm(idx) {
  const task = state.customTasks[idx] || {};
  return `
    <div class="card">
      <div class="file-step-meta" style="margin-bottom:8px">
        <span class="file-step-counter">Task ${idx + 1} of ${state.customTasks.length}</span>
      </div>
      <h2 class="step-title">Define task ${idx + 1}</h2>
      <div class="field-group">
        <label class="field-label">Task name *</label>
        <input type="text" class="field-input" id="task-name" placeholder="e.g. Write a client case study"
          value="${escapeHtml(task.name || '')}" />
      </div>
      <div class="field-group">
        <label class="field-label">What this task produces *</label>
        <input type="text" class="field-input" id="task-desc"
          placeholder="e.g. A 400-word case study in our brand voice"
          value="${escapeHtml(task.description || '')}" />
      </div>
      <div class="field-group">
        <label class="field-label">What the user needs to provide <em>(optional)</em></label>
        <input type="text" class="field-input" id="task-input"
          placeholder="e.g. Client name, project summary, 2–3 outcomes"
          value="${escapeHtml(task.input || '')}" />
      </div>
      <div id="task-form-error" class="paste-error" style="display:none">⚠️ Name and description are required.</div>
      <div class="nav-row">
        <button class="btn btn-secondary" id="task-form-back-btn">← Back</button>
        <button class="btn btn-primary" id="task-form-next-btn">Generate prompt →</button>
      </div>
    </div>
  `;
}

export function bindTaskForm(idx, { onBack, onNext }) {
  const save = () => {
    state.customTasks[idx] = {
      ...state.customTasks[idx],
      name: document.getElementById('task-name')?.value || '',
      description: document.getElementById('task-desc')?.value || '',
      input: document.getElementById('task-input')?.value || '',
    };
    saveState();
  };
  document.getElementById('task-name')?.addEventListener('input', save);
  document.getElementById('task-desc')?.addEventListener('input', save);
  document.getElementById('task-input')?.addEventListener('input', save);
  document.getElementById('task-form-back-btn')?.addEventListener('click', onBack);
  document.getElementById('task-form-next-btn')?.addEventListener('click', () => {
    save();
    const task = state.customTasks[idx];
    if (!task.name.trim() || !task.description.trim()) {
      document.getElementById('task-form-error').style.display = 'block';
      return;
    }
    onNext();
  });
}

// ── Task prompt phase ─────────────────────────────────────
export function renderTaskPromptPhase(idx) {
  const task = state.customTasks[idx];
  const promptText = getTaskPrompt(task);
  return `
    <div class="card">
      <div class="file-step-meta" style="margin-bottom:8px">
        <span class="file-step-counter">Task ${idx + 1} — Generate</span>
      </div>
      <h2 class="step-title">${escapeHtml(task.name)}</h2>
      <p class="step-subtitle">Copy this prompt into your AI tool.</p>
      ${promptCopyBlock(promptText, `task-${idx}`)}
      <div class="nav-row" style="margin-top:24px">
        <button class="btn btn-secondary" id="task-prompt-back-btn">← Edit details</button>
        <button class="btn btn-primary" id="task-got-output-btn">I've got the output →</button>
      </div>
    </div>
  `;
}

export function bindTaskPromptPhase(idx, { onBack, onGotOutput }) {
  const copyBtn = document.getElementById(`copy-btn-task-${idx}`);
  copyBtn?.addEventListener('click', () => {
    const task = state.customTasks[idx];
    navigator.clipboard.writeText(getTaskPrompt(task)).then(() => {
      copyBtn.innerHTML = '✓ Copied!'; copyBtn.classList.add('copied');
      setTimeout(() => { copyBtn.innerHTML = '📋 Copy prompt'; copyBtn.classList.remove('copied'); }, 2000);
    });
  });
  document.getElementById('task-prompt-back-btn')?.addEventListener('click', onBack);
  document.getElementById('task-got-output-btn')?.addEventListener('click', onGotOutput);
}

// ── Task paste phase ──────────────────────────────────────
export function renderTaskPastePhase(idx) {
  const task = state.customTasks[idx];
  const existing = task.output || '';
  return `
    <div class="card">
      <div class="file-step-meta" style="margin-bottom:8px">
        <span class="file-step-counter">Task ${idx + 1} — Paste output</span>
      </div>
      <h2 class="step-title">${escapeHtml(task.name)}</h2>
      <p style="color:var(--muted);font-size:14px;margin-bottom:8px">Paste the full task template your AI produced.</p>
      <textarea class="paste-area" id="task-paste-${idx}"
        placeholder="Paste your AI's task template here...">${escapeHtml(existing)}</textarea>
      <div id="task-paste-error-${idx}" class="paste-error" style="display:none">⚠️ Paste the output before continuing.</div>
      <div class="nav-row" style="margin-top:16px">
        <button class="btn btn-secondary" id="task-paste-back-btn">← Back to prompt</button>
        <button class="btn btn-ghost" id="task-add-another-btn">+ Add another task</button>
        <button class="btn btn-primary" id="task-paste-confirm-btn">${existing ? 'Update & continue →' : 'Confirm & continue →'}</button>
      </div>
    </div>
  `;
}

export function bindTaskPastePhase(idx, { onBack, onAddAnother, onConfirm }) {
  const ta = document.getElementById(`task-paste-${idx}`);
  ta?.addEventListener('input', () => {
    state.customTasks[idx].output = ta.value;
    saveState();
    const err = document.getElementById(`task-paste-error-${idx}`);
    if (err && ta.value.trim()) err.style.display = 'none';
  });
  document.getElementById('task-paste-back-btn')?.addEventListener('click', onBack);
  document.getElementById('task-add-another-btn')?.addEventListener('click', () => {
    if (!ta?.value.trim()) { document.getElementById(`task-paste-error-${idx}`).style.display = 'block'; return; }
    state.customTasks[idx].output = ta.value.trim();
    saveState();
    onAddAnother();
  });
  document.getElementById('task-paste-confirm-btn')?.addEventListener('click', () => {
    if (!ta?.value.trim()) { document.getElementById(`task-paste-error-${idx}`).style.display = 'block'; return; }
    state.customTasks[idx].output = ta.value.trim();
    saveState();
    onConfirm();
  });
}
