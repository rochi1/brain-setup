// ── Version ───────────────────────────────────────────────
export const APP_VERSION = '2.0';
export const STORAGE_KEY = 'ai-kit-state-v2';

// ── State ─────────────────────────────────────────────────
export const state = {
  step: 0,          // 0=welcome,1=tool,2=context-builder,3=roles-tasks,4=preview-zip,5=upload,6=done
  tool: null,
  os: /mac|iphone|ipad/i.test(navigator.userAgent) ? 'mac' : 'windows',
  brandVoiceMode: 'scratch',
  businessName: '',
  files: {},         // { 'business-profile': '...pasted content...', ... }
  fileSubStep: -1,    // -1 = biz name screen; 0..n = file index
  filePhase: 0,        // 0 = prompt, 1 = paste
  wantsCustomRoles: null,
  wantsCustomTasks: null,
  customRoles: [],   // [{ name, description, context, output }]
  customTasks: [],   // [{ name, description, input, output }]
  roleSubStep: 0,
  rolePhase: 0,  // 0=gate, 1=form, 2=prompt, 3=paste
  taskSubStep: 0,
  taskPhase: 0,  // 0=gate, 1=form, 2=prompt, 3=paste
};

// ── Persistence ───────────────────────────────────────────
export function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      step: state.step,
      tool: state.tool,
      os: state.os,
      brandVoiceMode: state.brandVoiceMode,
      businessName: state.businessName,
      files: state.files,
      fileSubStep: state.fileSubStep,
      filePhase: state.filePhase,
      wantsCustomRoles: state.wantsCustomRoles,
      wantsCustomTasks: state.wantsCustomTasks,
      customRoles: state.customRoles,
      customTasks: state.customTasks,
      roleSubStep: state.roleSubStep,
      rolePhase: state.rolePhase,
      taskSubStep: state.taskSubStep,
      taskPhase: state.taskPhase,
    }));
  } catch (e) { /* storage full or unavailable */ }
}

export function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return false;
    Object.assign(state, JSON.parse(saved));
    return true;
  } catch (e) {
    return false;
  }
}

export function clearState() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  Object.assign(state, {
    step: 0,
    tool: null,
    businessName: '',
    files: {},
    fileSubStep: -1,
    filePhase: 0,
    wantsCustomRoles: null,
    wantsCustomTasks: null,
    customRoles: [],
    customTasks: [],
    roleSubStep: 0,
    rolePhase: 0,
    taskSubStep: 0,
    taskPhase: 0,
    brandVoiceMode: 'scratch',
  });
}

// ── URL params ────────────────────────────────────────────
export function applyURLParams(tools) {
  const params = new URLSearchParams(window.location.search);
  if (params.get('tool') && tools[params.get('tool')]) {
    state.tool = params.get('tool');
  }
  if (params.get('biz')) {
    state.businessName = decodeURIComponent(params.get('biz'));
  }
}

export function getShareableURL() {
  const params = new URLSearchParams();
  if (state.tool) params.set('tool', state.tool);
  if (state.businessName) params.set('biz', encodeURIComponent(state.businessName));
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}
