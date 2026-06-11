import FeaturePage from './FeaturePage'

const data = {
  badge: 'Support Agent · Multi-language',
  title: 'Multi-language Support',
  subtitle: '50+ languages out of the box, zero localisation effort.',
  description: 'Expanding to a new geography used to mean hiring local support staff or running slow, error-prone machine translation on top of an English-only agent. supVision\'s Support Agent operates natively in 50+ languages - understanding regional nuance, financial terminology, and regulatory context per market.',
  highlights: [
    '50+ languages natively — no translation middleware or local hires',
    'Financial terminology and regulatory framing correct per region',
    'Auto-detects customer language from the first message',
  ],
  coreImage: '/core-functionalities/multi-language.webp',
  points: [
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM3.05 5.5h2.12a10.86 10.86 0 0 0-.56 3H2.06a5.98 5.98 0 0 1 .99-3ZM2.06 9.5h2.55c.07 1.06.28 2.08.56 3H3.05a5.98 5.98 0 0 1-.99-3Zm4.06-4h3.76c.25.9.42 1.93.45 3H5.67c.03-1.07.2-2.1.45-3Zm0 4h3.76c-.25.9-.42 1.93-.45 3H5.67c-.03-1.07.2-2.1.45-3Zm1.26-6.94c-.44.7-.81 1.62-1.07 2.94h2.38c-.26-1.32-.63-2.24-1.07-2.94a6.03 6.03 0 0 0-.24 0Zm-.24 9.88c.44-.7.81-1.62 1.07-2.94H5.83c.26 1.32.63 2.24 1.07 2.94.08.01.16.01.24 0Zm4.81-5.94c-.07-1.06-.28-2.08-.56-3h2.12c.53.9.9 1.92.99 3h-2.55Zm.99 1h-2.55a10.86 10.86 0 0 1-.56 3h2.12a5.98 5.98 0 0 0 .99-3Z" /></svg>, title: '50+ languages natively', desc: 'The agent reads and responds in the customer\'s language without translation middleware. Supported languages include Arabic, Mandarin, Hindi, Russian, Portuguese, and all major European languages.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M1 4.5A1.5 1.5 0 0 1 2.5 3h11A1.5 1.5 0 0 1 15 4.5v5A1.5 1.5 0 0 1 13.5 11H8.5v1h1.25a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5H7.5v-1H2.5A1.5 1.5 0 0 1 1 9.5v-5Zm13.5 0h-11v5h11v-5Z" clipRule="evenodd" /></svg>, title: 'Financial terminology per language', desc: 'Generic translation fails on financial terms. supVision is trained on fintech-specific vocabulary in each language - your customers get accurate, professional responses.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V6.621a1.5 1.5 0 0 0-.44-1.06L9.94 3.439A1.5 1.5 0 0 0 8.878 3H4.5ZM6 7.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm.5 2.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2Z" clipRule="evenodd" /></svg>, title: 'Regulatory context per region', desc: 'Verification requirements, dispute resolution rules, and compliance language differ by jurisdiction. The agent applies the correct regulatory framing based on the customer\'s geography.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-3.25a.75.75 0 0 0-1.5 0V8c0 .199.079.39.22.53l2 2a.75.75 0 1 0 1.06-1.06l-1.78-1.78V4.75Z" clipRule="evenodd" /></svg>, title: 'Auto-detection', desc: 'The agent detects the customer\'s language automatically from the first message. No language selection required. No forms to fill in.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>, title: 'Human escalation in the same language', desc: 'When a case escalates, the human agent receives the full history in the customer\'s language alongside an English summary - so anyone on your team can pick it up.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1H1V3ZM1 6h14v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6Zm8 3a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5H9Z" /></svg>, title: 'Per-language analytics', desc: 'See resolution rates, escalation rates, and CSAT scores broken down by language and geography. Identify where your support is strong and where it needs tuning.' },
  ],
  steps: [
    { step: '01', title: 'Customer writes in their language', desc: 'Arabic, Polish, Vietnamese - whatever they use. The agent receives the message and identifies the language within the first sentence.' },
    { step: '02', title: 'Context retrieved in real time', desc: 'Account data, verification status, and transaction records are pulled from your systems - the same as for any other language. Language does not affect data access.' },
    { step: '03', title: 'Response generated in the same language', desc: 'The agent responds natively - not via translation. Financial terminology, tone, and regulatory framing are correct for the customer\'s region.' },
    { step: '04', title: 'Escalation includes a summary', desc: 'If the case escalates, your human agent receives the full conversation in the original language plus an English summary. Any agent on your team can take it forward.' },
  ],
  ctaTitle: 'Go global without going back to hiring.',
  ctaDesc: '50+ languages, no local support staff required. Most teams live in 3 days.',
}

const faq = [
  { q: 'Which languages are fully supported?', a: 'All major European languages (English, German, French, Spanish, Italian, Portuguese, Dutch, Polish, Romanian, Czech, Hungarian, and more), Arabic, Hebrew, Russian, Ukrainian, Mandarin, Cantonese, Japanese, Korean, Hindi, Bengali, Vietnamese, Thai, and others. Contact us for the full list.' },
  { q: 'Is the quality consistent across all languages?', a: 'Quality is highest for languages with the most training data - English, Spanish, French, German, Arabic, and Mandarin. For less common languages we recommend running a pilot before full deployment. We\'ll be transparent about where quality may need monitoring.' },
  { q: 'Can we restrict which languages the agent operates in?', a: 'Yes. You can whitelist specific languages. Queries in unsupported or restricted languages are escalated to a human agent automatically.' },
  { q: 'Does the agent handle right-to-left languages like Arabic and Hebrew?', a: 'Yes. Arabic and Hebrew are fully supported, including correct RTL formatting in chat interfaces and email.' },
]

export default function MultiLanguage() {
  return <FeaturePage data={data} faq={faq} />
}
