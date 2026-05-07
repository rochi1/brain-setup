import { state, saveState, loadState, clearState, applyURLParams } from './state.js';
import { TOOLS } from './tools.js';
import { renderProgress, renderHeader } from './render.js';
import { renderWelcome, bindWelcome } from './steps/welcome.js';
import { renderToolStep, bindToolStep } from './steps/tool.js';
import {
  ALL_FILES,
  renderBusinessNameCapture, bindBusinessNameCapture,
  renderFilePromptPhase, bindFilePromptPhase,
  renderFilePastePhase, bindFilePastePhase,
} from './steps/context-builder.js';
import {
  renderRolesGate, bindRolesGate,
  renderRoleForm, bindRoleForm,
  renderRolePromptPhase, bindRolePromptPhase,
  renderRolePastePhase, bindRolePastePhase,
  renderTasksGate, bindTasksGate,
  renderTaskForm, bindTaskForm,
  renderTaskPromptPhase, bindTaskPromptPhase,
  renderTaskPastePhase, bindTaskPastePhase,
} from './steps/roles-tasks.js';
import { renderPreview, bindPreview } from './steps/preview.js';
import { renderUpload, bindUpload } from './steps/upload.js';
import { renderDone, bindDone } from './steps/done.js';

const root = document.getElementById('app');

// ── Step constants ────────────────────────────────────────
// 0 = welcome
// 1 = tool
// 2 = context-builder  (substep: -1 = biz name, 0..n = file index)
// 3 = roles-tasks
// 4 = preview
// 5 = upload
// 6 = done

// ── Context builder internal phases ──────────────────────
// filePhase 0 = prompt, 1 = paste

// ── Roles/tasks internal pages ────────────────────────────
// rolePhase: 0=gate, 1=form, 2=prompt, 3=paste; taskPhase: 0=gate, 1=form, 2=prompt, 3=paste

function goStep(n) {
  state.step = n;
  saveState();
  render();
  window.scrollTo(0, 0);
}

function confirmStartOver() {
  if (confirm('Start over? All your saved progress will be cleared.')) {
    clearState();
    render();
    window.scrollTo(0, 0);
  }
}

// ── File resume helper ────────────────────────────────────
function resumeFile(fileId) {
  const idx = ALL_FILES.findIndex(f => f.id === fileId);
  if (idx < 0) return;
  state.step = 2;
  state.fileSubStep = idx;
  state.filePhase   = 0;
  saveState();
  render();
  window.scrollTo(0, 0);
}

// ── Main render ───────────────────────────────────────────
function render() {
  const header = (showProgress = true) => renderHeader(confirmStartOver) +
    (showProgress ? renderProgress(state.step, 7) : '');

  switch (state.step) {

    // ── Welcome ──────────────────────────────────────────
    case 0: {
      root.innerHTML = renderWelcome({});
      bindWelcome({
        onStart:     () => goStep(1),
        onResume:    () => { loadState(); render(); },
        onStartOver: confirmStartOver,
      });
      break;
    }

    // ── Tool selection ───────────────────────────────────
    case 1: {
      root.innerHTML = header() + renderToolStep();
      bindToolStep({
        onBack: () => goStep(0),
        onNext: () => {
          state.fileSubStep = -1;
          state.filePhase   = 0;
          saveState();
          goStep(2);
        },
      });
      break;
    }

    // ── Context builder ──────────────────────────────────
    case 2: {
      if (state.fileSubStep === -1) {
        // Business name screen
        root.innerHTML = header() + renderBusinessNameCapture();
        bindBusinessNameCapture({
          onBack: () => goStep(1),
          onNext: () => {
            state.fileSubStep = 0;
            state.filePhase   = 0;
            saveState();
            render();
          },
        });
      } else {
        const file = ALL_FILES[state.fileSubStep];
        if (!file) { goStep(3); break; }

        if (state.filePhase === 0) {
          root.innerHTML = header() + renderFilePromptPhase(file);
          bindFilePromptPhase(file, {
            onBack: () => {
              if (state.fileSubStep === 0) {
                state.fileSubStep = -1;
              } else {
                state.fileSubStep -= 1;
                state.filePhase = 1; // return to paste of previous
              }
              saveState();
              render();
            },
            onSkip: () => {
              // Don't save anything for this file
              advanceFile();
            },
            onGotOutput: () => {
              state.filePhase = 1;
              saveState();
              render();
            },
            onModeChange: () => render(),
          });
        } else {
          root.innerHTML = header() + renderFilePastePhase(file);
          bindFilePastePhase(file, {
            onBack: () => {
              state.filePhase = 0;
              saveState();
              render();
            },
            onSkip: () => advanceFile(),
            onConfirm: () => advanceFile(),
          });
        }
      }
      break;
    }

    // ── Roles & tasks ─────────────────────────────────────
    case 3: {
      const rp = state.rolePhase || 0;
      const tp = state.taskPhase || 0;

      // Determine where we are in the roles/tasks flow
      if (state.wantsCustomRoles === null) {
        // Show roles gate
        root.innerHTML = header() + renderRolesGate();
        bindRolesGate({
          onBack: () => {
            // Go back to last context file paste
            state.step = 2;
            state.fileSubStep = ALL_FILES.length - 1;
            state.filePhase = 1;
            saveState();
            render();
          },
          onNext: () => {
            if (state.wantsCustomRoles) {
              state.rolePhase = 1;
              state.roleSubStep = 0;
            } else {
              // Skip to tasks gate
              state.rolePhase = 0;
              state.taskPhase = 0;
            }
            saveState();
            render();
          },
        });

      } else if (state.wantsCustomRoles && rp >= 1) {
        const idx = state.roleSubStep || 0;
        if (rp === 1) {
          root.innerHTML = header() + renderRoleForm(idx);
          bindRoleForm(idx, {
            onBack: () => {
              if (idx === 0) { state.rolePhase = 0; state.wantsCustomRoles = null; }
              else { state.roleSubStep = idx - 1; state.rolePhase = 3; }
              saveState(); render();
            },
            onNext: () => { state.rolePhase = 2; saveState(); render(); },
          });
        } else if (rp === 2) {
          root.innerHTML = header() + renderRolePromptPhase(idx);
          bindRolePromptPhase(idx, {
            onBack: () => { state.rolePhase = 1; saveState(); render(); },
            onGotOutput: () => { state.rolePhase = 3; saveState(); render(); },
          });
        } else if (rp === 3) {
          root.innerHTML = header() + renderRolePastePhase(idx);
          bindRolePastePhase(idx, {
            onBack: () => { state.rolePhase = 2; saveState(); render(); },
            onAddAnother: () => {
              state.customRoles.push({ name: '', description: '', context: '', output: '' });
              state.roleSubStep = state.customRoles.length - 1;
              state.rolePhase = 1;
              saveState(); render();
            },
            onConfirm: () => {
              // Move to tasks gate
              state.rolePhase = 0;
              state.taskPhase = 0;
              state.wantsCustomTasks = null;
              saveState(); render();
            },
          });
        }

      } else if (state.wantsCustomTasks === null) {
        // Tasks gate
        root.innerHTML = header() + renderTasksGate();
        bindTasksGate({
          onBack: () => {
            if (state.wantsCustomRoles && state.customRoles?.length) {
              state.rolePhase = 3;
              state.roleSubStep = state.customRoles.length - 1;
            } else {
              state.wantsCustomRoles = null;
              state.rolePhase = 0;
            }
            state.wantsCustomTasks = null;
            saveState(); render();
          },
          onNext: () => {
            if (state.wantsCustomTasks) {
              state.taskPhase = 1;
              state.taskSubStep = 0;
            } else {
              goStep(4);
            }
            saveState(); render();
          },
        });

      } else if (state.wantsCustomTasks && tp >= 1) {
        const idx = state.taskSubStep || 0;
        if (tp === 1) {
          root.innerHTML = header() + renderTaskForm(idx);
          bindTaskForm(idx, {
            onBack: () => {
              if (idx === 0) { state.taskPhase = 0; state.wantsCustomTasks = null; }
              else { state.taskSubStep = idx - 1; state.taskPhase = 3; }
              saveState(); render();
            },
            onNext: () => { state.taskPhase = 2; saveState(); render(); },
          });
        } else if (tp === 2) {
          root.innerHTML = header() + renderTaskPromptPhase(idx);
          bindTaskPromptPhase(idx, {
            onBack: () => { state.taskPhase = 1; saveState(); render(); },
            onGotOutput: () => { state.taskPhase = 3; saveState(); render(); },
          });
        } else if (tp === 3) {
          root.innerHTML = header() + renderTaskPastePhase(idx);
          bindTaskPastePhase(idx, {
            onBack: () => { state.taskPhase = 2; saveState(); render(); },
            onAddAnother: () => {
              state.customTasks.push({ name: '', description: '', input: '', output: '' });
              state.taskSubStep = state.customTasks.length - 1;
              state.taskPhase = 1;
              saveState(); render();
            },
            onConfirm: () => { goStep(4); },
          });
        }

      } else {
        goStep(4);
      }
      break;
    }

    // ── Preview ───────────────────────────────────────────
    case 4: {
      root.innerHTML = header() + renderPreview();
      bindPreview({
        onBack: () => {
          state.wantsCustomTasks = null;
          saveState();
          goStep(3);
        },
        onNext: () => goStep(5),
        onResumeFile: (fileId) => resumeFile(fileId),
      });
      break;
    }

    // ── Upload ────────────────────────────────────────────
    case 5: {
      root.innerHTML = header() + renderUpload();
      bindUpload({
        onBack: () => goStep(4),
        onNext: () => goStep(6),
      });
      break;
    }

    // ── Done ──────────────────────────────────────────────
    case 6: {
      root.innerHTML = header(false) + renderDone();
      bindDone({ onStartOver: confirmStartOver });
      break;
    }

    default:
      goStep(0);
  }
}

// ── Helper: advance to next file ──────────────────────────
function advanceFile() {
  const nextIdx = state.fileSubStep + 1;
  if (nextIdx >= ALL_FILES.length) {
    // All files done — move to roles/tasks
    state.fileSubStep = -1;
    state.filePhase   = 0;
    state.wantsCustomRoles = null;
    state.rolePhase = 0;
    state.taskPhase = 0;
    saveState();
    goStep(3);
  } else {
    state.fileSubStep = nextIdx;
    state.filePhase   = 0;
    saveState();
    render();
  }
}

// ── Boot ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  applyURLParams(TOOLS);
  render();
});
