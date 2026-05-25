export const LOG_SCENARIOS = [
  {
    query: 'Disputed transaction #4821',
    steps: [
      { type: 'info' as const, text: 'Fetching transaction history…' },
      { type: 'info' as const, text: 'Balance within normal range' },
      { type: 'info' as const, text: 'No prior disputes in 90 days' },
      { type: 'info' as const, text: 'Merchant verified — no chargebacks' },
      { type: 'success' as const, text: 'Fraud probability: 2.1%' },
    ],
    decision: 'RESOLVED',
    color: '#22c55e',
  },
  {
    query: 'Card limit increase — £5,000',
    steps: [
      { type: 'info' as const, text: 'Reviewing account standing…' },
      { type: 'info' as const, text: 'Credit score: 742 — Good' },
      { type: 'info' as const, text: '14 months on-time payments' },
      { type: 'info' as const, text: 'Income verified: £4,200/mo' },
      { type: 'success' as const, text: 'Eligibility confirmed' },
    ],
    decision: 'APPROVED',
    color: '#22c55e',
  },
  {
    query: 'Large transfer flagged — £12,400',
    steps: [
      { type: 'info' as const, text: 'Checking transfer patterns…' },
      { type: 'warning' as const, text: 'Amount exceeds 30-day average' },
      { type: 'info' as const, text: 'Recipient account: first-time' },
      { type: 'info' as const, text: 'User authentication: passed' },
      { type: 'warning' as const, text: 'Requires manual review' },
    ],
    decision: 'ESCALATED',
    color: '#f59e0b',
  },
]

export const LANGUAGES = [
  { code: 'gb', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ru', name: 'Русский' },
  { code: 'id', name: 'Bahasa' },
  { code: 'sa', name: 'العربية' },
  { code: 'cn', name: '中文' },
  { code: 'br', name: 'Português' },
  { code: 'jp', name: '日本語' },
]

export const LANG_SLOT = [
  { bottom: -52, h: 72, w: '74%', op: 0, zi: 70 },
  { bottom: 66, h: 72, w: '74%', op: 1, zi: 65 },
  { bottom: 90, h: 68, w: '70%', op: 1, zi: 60 },
  { bottom: 114, h: 64, w: '67%', op: 1, zi: 55 },
  { bottom: 138, h: 60, w: '64%', op: 1, zi: 50 },
  { bottom: 160, h: 56, w: '61%', op: 1, zi: 45 },
  { bottom: 182, h: 52, w: '58%', op: 1, zi: 40 },
  { bottom: 202, h: 48, w: '55%', op: 1, zi: 35 },
  { bottom: 222, h: 44, w: '52%', op: 1, zi: 30 },
  { bottom: 240, h: 40, w: '50%', op: 1, zi: 25 },
  { bottom: 258, h: 36, w: '48%', op: 1, zi: 20 },
  { bottom: 274, h: 32, w: '46%', op: 1, zi: 15 },
  { bottom: 288, h: 28, w: '44%', op: 0, zi: 5 },
]

export type ModelAnimStep = {
  cx: string
  cy: number
  ep: string | null
  sm: { p: string; m: string; ik: string }
  hm: string | null
  delay: number
}

export const MODEL_ANIM_STEPS: ModelAnimStep[] = [
  { cx: '28%', cy: 110, ep: 'OpenAI', sm: { p: 'OpenAI', m: 'GPT-5 mini', ik: 'openai' }, hm: null, delay: 1400 },
  { cx: '28%', cy: 302, ep: 'OpenAI', sm: { p: 'OpenAI', m: 'GPT-5 mini', ik: 'openai' }, hm: null, delay: 1100 },
  { cx: '28%', cy: 302, ep: 'OpenAI', sm: { p: 'OpenAI', m: 'GPT-5 mini', ik: 'openai' }, hm: null, delay: 380 },
  { cx: '28%', cy: 154, ep: 'Anthropic', sm: { p: 'OpenAI', m: 'GPT-5 mini', ik: 'openai' }, hm: null, delay: 800 },
  { cx: '42%', cy: 194, ep: 'Anthropic', sm: { p: 'OpenAI', m: 'GPT-5 mini', ik: 'openai' }, hm: null, delay: 1000 },
  { cx: '42%', cy: 194, ep: 'Anthropic', sm: { p: 'OpenAI', m: 'GPT-5 mini', ik: 'openai' }, hm: 'Claude Opus 4.6', delay: 420 },
  { cx: '42%', cy: 194, ep: null, sm: { p: 'Anthropic', m: 'Claude Opus 4.6', ik: 'anthropic' }, hm: null, delay: 1800 },
  { cx: '28%', cy: 198, ep: null, sm: { p: 'Anthropic', m: 'Claude Opus 4.6', ik: 'anthropic' }, hm: null, delay: 1100 },
  { cx: '28%', cy: 198, ep: null, sm: { p: 'Anthropic', m: 'Claude Opus 4.6', ik: 'anthropic' }, hm: null, delay: 380 },
  { cx: '28%', cy: 198, ep: 'Google AI Studio', sm: { p: 'Anthropic', m: 'Claude Opus 4.6', ik: 'anthropic' }, hm: null, delay: 800 },
  { cx: '42%', cy: 274, ep: 'Google AI Studio', sm: { p: 'Anthropic', m: 'Claude Opus 4.6', ik: 'anthropic' }, hm: null, delay: 1000 },
  { cx: '42%', cy: 274, ep: 'Google AI Studio', sm: { p: 'Anthropic', m: 'Claude Opus 4.6', ik: 'anthropic' }, hm: 'Gemini 2.5 Flash', delay: 420 },
  { cx: '42%', cy: 274, ep: null, sm: { p: 'Google AI Studio', m: 'Gemini 2.5 Flash', ik: 'google' }, hm: null, delay: 1800 },
  { cx: '28%', cy: 110, ep: null, sm: { p: 'Google AI Studio', m: 'Gemini 2.5 Flash', ik: 'google' }, hm: null, delay: 1100 },
  { cx: '28%', cy: 110, ep: null, sm: { p: 'Google AI Studio', m: 'Gemini 2.5 Flash', ik: 'google' }, hm: null, delay: 380 },
  { cx: '28%', cy: 110, ep: 'Perplexity', sm: { p: 'Google AI Studio', m: 'Gemini 2.5 Flash', ik: 'google' }, hm: null, delay: 800 },
  { cx: '42%', cy: 330, ep: 'Perplexity', sm: { p: 'Google AI Studio', m: 'Gemini 2.5 Flash', ik: 'google' }, hm: null, delay: 1000 },
  { cx: '42%', cy: 330, ep: 'Perplexity', sm: { p: 'Google AI Studio', m: 'Gemini 2.5 Flash', ik: 'google' }, hm: 'Sonar Pro', delay: 420 },
  { cx: '42%', cy: 330, ep: null, sm: { p: 'Perplexity', m: 'Sonar Pro', ik: 'perplexity' }, hm: null, delay: 1800 },
  { cx: '28%', cy: 110, ep: null, sm: { p: 'Perplexity', m: 'Sonar Pro', ik: 'perplexity' }, hm: null, delay: 1100 },
  { cx: '28%', cy: 110, ep: null, sm: { p: 'Perplexity', m: 'Sonar Pro', ik: 'perplexity' }, hm: null, delay: 380 },
  { cx: '28%', cy: 110, ep: 'OpenAI', sm: { p: 'Perplexity', m: 'Sonar Pro', ik: 'perplexity' }, hm: null, delay: 800 },
  { cx: '42%', cy: 150, ep: 'OpenAI', sm: { p: 'Perplexity', m: 'Sonar Pro', ik: 'perplexity' }, hm: null, delay: 1000 },
  { cx: '42%', cy: 150, ep: 'OpenAI', sm: { p: 'Perplexity', m: 'Sonar Pro', ik: 'perplexity' }, hm: 'GPT-5 mini', delay: 420 },
  { cx: '42%', cy: 150, ep: null, sm: { p: 'OpenAI', m: 'GPT-5 mini', ik: 'openai' }, hm: null, delay: 900 },
  { cx: '28%', cy: 110, ep: null, sm: { p: 'OpenAI', m: 'GPT-5 mini', ik: 'openai' }, hm: null, delay: 500 },
]

export const DATA_ACCESS_ITEMS = [
  { name: 'Transaction history', allowed: true, highlight: false },
  { name: 'Account balance', allowed: true, highlight: false },
  { name: 'Customer PII', allowed: false, highlight: true },
  { name: 'Payment methods', allowed: true, highlight: false },
  { name: 'Internal risk scores', allowed: false, highlight: false },
  { name: 'Support ticket logs', allowed: true, highlight: false },
]
