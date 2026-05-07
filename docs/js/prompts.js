export const RAW = 'https://raw.githubusercontent.com/rochi1/brain-setup/master/templates';

// Context files worked through one at a time in the context builder.
export const CONTEXT_FILES = [
  {
    id: 'business-profile',
    required: true,
    title: 'Business Profile',
    whyItMatters: 'This is the foundation. Without it, AI tools guess who you are — and they guess wrong.',
    saveAs: 'your-business/context/BUSINESS_PROFILE.md',
    goodOutputLooks: 'Expect 1–2 pages of structured markdown with headings for mission, values, business model, and team. Every heading should have real content — no blank fields or "TBD".',
    getPrompt: () => `I'm setting up a context file so AI tools understand my business.

Please fetch the blank template from this URL:
${RAW}/context/BUSINESS_PROFILE.md

Your job is to:

1. Interview me — ask one question at a time and wait for my answer before continuing
2. Cover every section in the template so no field is left empty
3. Once I've answered everything, return the completed template with my answers filled in, preserving all headings and structure exactly

Write all content in third person so it reads as a reference document, not a personal statement. Replace all italic placeholder text with real content. Do not add or remove sections.`,
  },
  {
    id: 'brand-voice',
    required: true,
    title: 'Brand Voice',
    whyItMatters: "Without this, AI writes in a generic corporate tone. With it, every output sounds like you.",
    saveAs: 'your-business/context/BRAND_VOICE.md',
    hasModes: true,
    goodOutputLooks: "Expect a detailed document with tone descriptors, a DO/DON'T table (at least 10 rows), and before/after rewrite examples. Vague adjectives like 'professional' alone aren't enough — look for specific language guidance.",
    modes: {
      existing: {
        label: 'I have a brand guide',
        getPrompt: () => `I'm going to share my existing brand guide and I need you to use it to fill in a brand voice template.

Please fetch the blank template from this URL:
${RAW}/context/BRAND_VOICE.md

Your job is to:
1. Read the brand guide I share fully
2. Extract everything relevant to voice, tone, language, and communication style
3. Use that to fill in the template
4. Identify any sections not covered by my guide
5. Ask me targeted questions — one at a time — only for the missing information

Once gaps are filled, return the completed template with every section filled in. Preserve all headings and structure exactly. Replace all italic placeholder text with real content.

Here is my brand guide:

[PASTE YOUR BRAND GUIDE HERE — or if your AI tool supports file uploads, attach it directly]`,
      },
      scratch: {
        label: 'Starting from scratch',
        getPrompt: () => `I need to define my brand voice so AI tools write consistently for my business.

Please fetch the blank template from this URL:
${RAW}/context/BRAND_VOICE.md

Your job is to:

1. Interview me — ask one question at a time, covering every section of the template
2. Once I've answered everything, return the completed template with my answers filled in
3. Preserve all headings and structure exactly as they appear in the template
4. Replace all italic placeholder text with real, specific content
5. For the DO / DON'T table, provide at least 10 rows
6. For the before/after examples, write genuine rewrites based on what you've learned about our voice`,
      },
    },
  },
  {
    id: 'ai-policy',
    required: true,
    title: 'AI Policy',
    whyItMatters: "Defines what your team can and can't do with AI — protecting the business and giving staff confidence to use it.",
    saveAs: 'your-business/governance/AI_POLICY.md',
    goodOutputLooks: 'Expect a structured policy document with sections on approved uses, prohibited uses, data handling rules, and review requirements. Readable by a non-technical team member in under 5 minutes.',
    getPrompt: () => `I need a practical internal AI policy for my business.

Please fetch the blank template from this URL:
${RAW}/governance/AI_POLICY.md

Your job is to:

1. Interview me — ask one question at a time and wait for my answer before continuing
2. Cover every section in the template so no field is left empty
3. Once I've answered everything, return the completed template with my answers filled in
4. Preserve all headings and structure exactly as they appear in the template
5. Replace all italic placeholder text with real, specific content
6. Write in plain English — a non-technical team member should be able to read and follow it in 5 minutes`,
  },
  {
    id: 'audience',
    required: false,
    title: 'Audience & Personas',
    whyItMatters: 'AI writes to whoever it imagines is reading. This file makes sure it imagines the right person.',
    saveAs: 'your-business/context/AUDIENCE.md',
    goodOutputLooks: 'Expect one or more fully described personas with job title, company type, pain points, goals, and language they actually use. There should also be a "bad fit customer" section.',
    getPrompt: () => `I need to build an audience context file for my business.

Please fetch the blank template from this URL:
${RAW}/context/AUDIENCE.md

Your job is to:

1. Interview me — ask one question at a time and wait for my answer before continuing
2. Work through one persona at a time — when complete, ask whether I have another segment
3. After all personas, ask about bad-fit customers and the customer lifecycle
4. Once I've answered everything, return the completed template with my answers filled in
5. Preserve all headings and structure exactly
6. Replace all italic placeholder text with real, specific content`,
  },
  {
    id: 'products',
    required: false,
    title: 'Products & Services',
    whyItMatters: 'Stops AI making up features or prices. Keeps every output factually accurate about what you sell.',
    saveAs: 'your-business/context/PRODUCTS_SERVICES.md',
    goodOutputLooks: 'Each product/service should have a name, description, pricing (or pricing model), key features, and a clear "what not to promise" section. Nothing should be vague.',
    getPrompt: () => `I need to document my products and services so AI tools can describe them accurately.

Please fetch the blank template from this URL:
${RAW}/context/PRODUCTS_SERVICES.md

Your job is to:

1. Interview me — ask one question at a time, working through one product or service at a time
2. When one product is complete, ask if there's another before moving on
3. Once I've answered everything, return the completed template with my answers filled in
4. Preserve all headings and structure exactly
5. Replace all italic placeholder text with real, specific content
6. Be precise about pricing and features — only include what I've confirmed. Never invent capabilities.`,
  },
  {
    id: 'competitors',
    required: false,
    title: 'Competitors & Positioning',
    whyItMatters: 'Tells AI how to position you accurately and which claims you can actually back up.',
    saveAs: 'your-business/context/COMPETITORS.md',
    goodOutputLooks: "Expect entries for 2–4 competitors with specific differentiators, not generic phrases. The claims table should only include things you can evidence.",
    getPrompt: () => `I need to document our competitive position so AI tools can position us accurately.

Please fetch the blank template from this URL:
${RAW}/context/COMPETITORS.md

Your job is to:

1. Interview me — ask one question at a time, working through one competitor at a time
2. When one competitor is complete, ask if there's another before moving on
3. Also ask about indirect alternatives (e.g. doing nothing, spreadsheets, hiring internally)
4. Once I've answered everything, return the completed template with my answers filled in
5. Preserve all headings and structure exactly
6. For the claims table, only include claims I've explicitly confirmed with evidence`,
  },
];

// Master prompt step — always last, constructs prompt from collected files
export const MASTER_PROMPT_STEP = {
  id: 'master-prompt',
  required: true,
  title: 'Master Prompt (inline version)',
  whyItMatters: "A self-contained prompt your team can paste into any AI tool — even those that don't support file uploads.",
  saveAs: 'your-business/prompts/MASTER_PROMPT_inline.md',
  goodOutputLooks: 'A dense, well-structured prompt covering who you are, your brand voice, your audience, and how to respond. Should work when pasted cold into any AI conversation.',
  getPrompt: (files) => {
    const profile   = files['business-profile'] || '[PASTE CONTENTS OF BUSINESS_PROFILE.md HERE]';
    const voice     = files['brand-voice']      || '[PASTE CONTENTS OF BRAND_VOICE.md HERE]';
    const audience  = files['audience']         || null;
    const products  = files['products']         || null;
    const competitors = files['competitors']    || null;

    let extras = '';
    if (audience)    extras += `\n\n---\n\n${audience}`;
    if (products)    extras += `\n\n---\n\n${products}`;
    if (competitors) extras += `\n\n---\n\n${competitors}`;

    return `I've completed my business context files and I need you to combine them into a Master Prompt.

Please fetch the blank Master Prompt template from this URL:
${RAW}/prompts/MASTER_PROMPT.md

Your job is to:
1. Read all the context files I provide carefully
2. Fill in the Master Prompt template using the information from those files
3. Preserve the structure and all sections of the template exactly
4. Replace all placeholder text with real, specific content drawn from my context files
5. The finished Master Prompt must work with any AI model — no model-specific syntax

Here are my completed context files:

${profile}

---

${voice}${extras}`;
  },
};

// Template files fetched from GitHub and included in the ZIP as-is (before custom appends)
export const ZIP_TEMPLATE_URLS = {
  'your-business/prompts/ROLES.md':        'https://raw.githubusercontent.com/rochi1/brain-setup/master/prompts/ROLES.md',
  'your-business/prompts/TASK_LIBRARY.md': 'https://raw.githubusercontent.com/rochi1/brain-setup/master/prompts/TASK_LIBRARY.md',
  'your-business/governance/DATA_RULES.md': `${RAW}/governance/DATA_RULES.md`,
};
