import { state } from '../state.js';
import { TOOLS } from '../tools.js';
import { generateFilesMasterPrompt } from '../zip.js';
import { promptCopyBlock } from '../render.js';

export function renderUpload() {
  const tool = TOOLS[state.tool] || TOOLS['other'];
  const canUpload = tool.supportsFileUpload;
  const bizName   = state.businessName || 'your business';

  const filesMasterPrompt = generateFilesMasterPrompt(bizName);

  return `
    <div class="card">
      <h2 class="step-title">Get set up in ${tool.name}</h2>
      <p class="step-subtitle">
        You've built your context kit. Now let's put it to work.
      </p>

      ${canUpload ? `
        <div class="info-box success" style="margin-bottom:24px"><span class="icon">🎉</span>
          <span><strong>${tool.name} supports file uploads.</strong> You can upload your context files directly — 
          your AI will reference them instead of needing everything pasted inline.</span>
        </div>

        <h3>How to upload your files in ${tool.name}</h3>
        <div class="upload-steps">${tool.uploadSteps}</div>

        <h3 style="margin-top:28px">Then use this short master prompt</h3>
        <p style="color:var(--muted);font-size:14px;margin-bottom:12px">
          Once you've uploaded the files, paste this prompt to configure the session.
          It's short because the detail lives in your uploaded files.
        </p>
        ${promptCopyBlock(filesMasterPrompt, 'files-master')}

      ` : `
        <div class="info-box tip" style="margin-bottom:24px"><span class="icon">ℹ️</span>
          <span><strong>${tool.name} doesn't support file uploads</strong> in this workflow.
          Use the inline master prompt you generated earlier — it contains everything your AI needs.</span>
        </div>

        <h3>How to use ${tool.name}</h3>
        <ol style="padding-left:20px;line-height:2;color:var(--muted)">
          <li>Open a new conversation in ${tool.name}</li>
          <li>Paste the <strong>MASTER_PROMPT_inline.md</strong> content from your ZIP to start any session</li>
          <li>Begin with a task — your AI already knows your business context</li>
        </ol>
      `}

      <div class="nav-row" style="margin-top:28px">
        <button class="btn btn-secondary" id="upload-back-btn">← Back</button>
        <button class="btn btn-primary" id="upload-done-btn">All done — see next steps →</button>
      </div>
    </div>
  `;
}

export function bindUpload({ onBack, onNext }) {
  document.getElementById('upload-back-btn')?.addEventListener('click', onBack);
  document.getElementById('upload-done-btn')?.addEventListener('click', onNext);

  const copyBtn = document.getElementById('copy-btn-files-master');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const bizName = state.businessName || 'your business';
      navigator.clipboard.writeText(generateFilesMasterPrompt(bizName)).then(() => {
        copyBtn.innerHTML = '✓ Copied!'; copyBtn.classList.add('copied');
        setTimeout(() => { copyBtn.innerHTML = '📋 Copy prompt'; copyBtn.classList.remove('copied'); }, 2000);
      });
    });
  }
}
