export const TOOLS = {
  chatgpt: {
    name: 'ChatGPT',
    icon: '🤖',
    desc: 'OpenAI',
    supportsFileUpload: true,
    uploadSteps: `
      <div class="upload-steps"><ol>
        <li><p><strong>Go to chatgpt.com and sign in.</strong></p></li>
        <li><p><strong>In the left sidebar, click <em>Explore GPTs</em> → <em>Create a project</em>.</strong></p></li>
        <li><p><strong>Name your project</strong> — e.g. your company name.</p></li>
        <li><p><strong>Open project settings → find the <em>Files</em> or <em>Knowledge</em> section.</strong></p></li>
        <li><p><strong>Upload the files from your ZIP:</strong>
          <br>• <code>context/BUSINESS_PROFILE.md</code>
          <br>• <code>context/BRAND_VOICE.md</code>
          <br>• <code>governance/AI_POLICY.md</code>
          <br>• Any optional context files you generated
        </p></li>
        <li><p><strong>Paste <code>MASTER_PROMPT_files.md</code> into the system instructions field.</strong></p></li>
        <li><p><strong>Test it.</strong> Ask "What do you know about my business?"</p></li>
      </ol></div>`,
  },
  claude: {
    name: 'Claude',
    icon: '🟠',
    desc: 'Anthropic',
    supportsFileUpload: true,
    uploadSteps: `
      <div class="upload-steps"><ol>
        <li><p><strong>Go to claude.ai and sign in.</strong></p></li>
        <li><p><strong>Click <em>Projects</em> → <em>Create project</em>.</strong></p></li>
        <li><p><strong>Name your project</strong> — e.g. your company name.</p></li>
        <li><p><strong>Click <em>Add content</em> in the Knowledge section.</strong></p></li>
        <li><p><strong>Upload files from your ZIP:</strong>
          <br>• <code>context/BUSINESS_PROFILE.md</code>
          <br>• <code>context/BRAND_VOICE.md</code>
          <br>• <code>governance/AI_POLICY.md</code>
          <br>• Any optional context files you generated
        </p></li>
        <li><p><strong>Paste <code>MASTER_PROMPT_files.md</code> into the "Custom instructions" field.</strong></p></li>
        <li><p><strong>Test it.</strong> Ask "Summarise what you know about our business."</p></li>
      </ol></div>`,
  },
  gemini: {
    name: 'Gemini',
    icon: '♊',
    desc: 'Google',
    supportsFileUpload: false,
    uploadSteps: `
      <div class="info-box note"><span class="icon">⚠️</span>
        <span>Gemini Gems don't support file uploads — paste your self-contained Master Prompt directly into the Gem's instructions.</span>
      </div>
      <div class="upload-steps"><ol>
        <li><p><strong>Go to gemini.google.com and sign in.</strong></p></li>
        <li><p><strong>Click <em>Explore Gems</em> → <em>New Gem</em>.</strong></p></li>
        <li><p><strong>Name your Gem</strong> — e.g. your company name.</p></li>
        <li><p><strong>Paste the full contents of <code>MASTER_PROMPT_inline.md</code> into the Instructions field.</strong></p></li>
        <li><p><strong>Click Save and test via the preview panel.</strong></p></li>
      </ol></div>`,
  },
  copilot: {
    name: 'GitHub Copilot',
    icon: '🐙',
    desc: 'Microsoft / VS Code',
    supportsFileUpload: false,
    uploadSteps: `
      <div class="info-box success"><span class="icon">✅</span>
        <span>GitHub Copilot reads context files directly from your repo. Extract your ZIP into a project folder and open it in VS Code.</span>
      </div>
      <div class="upload-steps"><ol>
        <li><p><strong>Extract the ZIP</strong> into a folder — e.g. <code>my-business-ai/</code>.</p></li>
        <li><p><strong>Open that folder in VS Code</strong> with Copilot installed.</p></li>
        <li><p><strong>Add a <code>.github/copilot-instructions.md</code></strong> file that references your context files.</p></li>
        <li><p><strong>Open Copilot Chat</strong> — ask anything about your business to confirm context is loaded.</p></li>
      </ol></div>`,
  },
  cursor: {
    name: 'Cursor',
    icon: '⬛',
    desc: 'Cursor IDE',
    supportsFileUpload: false,
    uploadSteps: `
      <div class="info-box success"><span class="icon">✅</span>
        <span>Cursor reads context files live from your project folder.</span>
      </div>
      <div class="upload-steps"><ol>
        <li><p><strong>Extract the ZIP</strong> into a folder — e.g. <code>my-business-ai/</code>.</p></li>
        <li><p><strong>Open that folder in Cursor.</strong></p></li>
        <li><p><strong>Add a <code>.cursorrules</code> file</strong> in the root referencing your context files.</p></li>
        <li><p><strong>Open Composer or Cursor Chat</strong> — full context is available automatically.</p></li>
      </ol></div>`,
  },
  windsurf: {
    name: 'Windsurf',
    icon: '🏄',
    desc: 'Codeium',
    supportsFileUpload: false,
    uploadSteps: `
      <div class="info-box success"><span class="icon">✅</span>
        <span>Windsurf reads context files live from your project folder.</span>
      </div>
      <div class="upload-steps"><ol>
        <li><p><strong>Extract the ZIP</strong> into a folder — e.g. <code>my-business-ai/</code>.</p></li>
        <li><p><strong>Open that folder in Windsurf.</strong></p></li>
        <li><p><strong>Add a <code>.windsurfrules</code> file</strong> referencing your context files.</p></li>
        <li><p><strong>Open Cascade</strong> — full context is available immediately.</p></li>
      </ol></div>`,
  },
  other: {
    name: 'Other tool',
    icon: '🔧',
    desc: 'Any AI tool',
    supportsFileUpload: true,
    uploadSteps: `
      <div class="upload-steps"><ol>
        <li><p><strong>If your tool supports file uploads</strong> — upload the context files and use <code>MASTER_PROMPT_files.md</code> as your system prompt.</p></li>
        <li><p><strong>If your tool uses a system prompt only</strong> — paste <code>MASTER_PROMPT_inline.md</code> as the system prompt.</p></li>
        <li><p><strong>If neither</strong> — paste <code>MASTER_PROMPT_inline.md</code> at the start of any conversation before giving a task.</p></li>
      </ol></div>`,
  },
};
