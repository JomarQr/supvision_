import FeaturePage from './FeaturePage'

const data = {
  badge: 'Support Agent · Multi-language',
  title: 'Multi-language Support',
  subtitle: '50+ languages out of the box, zero localisation effort.',
  description: 'Expanding to a new geography used to mean hiring local support staff or running slow, error-prone machine translation on top of an English-only agent. supVision\'s Support Agent operates natively in 50+ languages — understanding regional nuance, financial terminology, and regulatory context per market.',
  points: [
    { icon: '🌍', title: '50+ languages natively', desc: 'The agent reads and responds in the customer\'s language without translation middleware. Supported languages include Arabic, Mandarin, Hindi, Russian, Portuguese, and all major European languages.' },
    { icon: '🏦', title: 'Financial terminology per language', desc: 'Generic translation fails on financial terms. supVision is trained on fintech-specific vocabulary in each language — your customers get accurate, professional responses.' },
    { icon: '📜', title: 'Regulatory context per region', desc: 'KYC requirements, dispute resolution rules, and compliance language differ by jurisdiction. The agent applies the correct regulatory framing based on the customer\'s geography.' },
    { icon: '🔄', title: 'Auto-detection', desc: 'The agent detects the customer\'s language automatically from the first message. No language selection required. No forms to fill in.' },
    { icon: '🤝', title: 'Human escalation in the same language', desc: 'When a case escalates, the human agent receives the full history in the customer\'s language alongside an English summary — so anyone on your team can pick it up.' },
    { icon: '📊', title: 'Per-language analytics', desc: 'See resolution rates, escalation rates, and CSAT scores broken down by language and geography. Identify where your support is strong and where it needs tuning.' },
  ],
  steps: [
    { step: '01', title: 'Customer writes in their language', desc: 'Arabic, Polish, Vietnamese — whatever they use. The agent receives the message and identifies the language within the first sentence.' },
    { step: '02', title: 'Context retrieved in real time', desc: 'Account data, KYC status, and transaction records are pulled from your systems — the same as for any other language. Language does not affect data access.' },
    { step: '03', title: 'Response generated in the same language', desc: 'The agent responds natively — not via translation. Financial terminology, tone, and regulatory framing are correct for the customer\'s region.' },
    { step: '04', title: 'Escalation includes a summary', desc: 'If the case escalates, your human agent receives the full conversation in the original language plus an English summary. Any agent on your team can take it forward.' },
  ],
  ctaTitle: 'Go global without going back to hiring.',
  ctaDesc: '50+ languages, no local support staff required. Most teams live in 3 days.',
}

const faq = [
  { q: 'Which languages are fully supported?', a: 'All major European languages (English, German, French, Spanish, Italian, Portuguese, Dutch, Polish, Romanian, Czech, Hungarian, and more), Arabic, Hebrew, Russian, Ukrainian, Mandarin, Cantonese, Japanese, Korean, Hindi, Bengali, Vietnamese, Thai, and others. Contact us for the full list.' },
  { q: 'Is the quality consistent across all languages?', a: 'Quality is highest for languages with the most training data — English, Spanish, French, German, Arabic, and Mandarin. For less common languages we recommend running a pilot before full deployment. We\'ll be transparent about where quality may need monitoring.' },
  { q: 'Can we restrict which languages the agent operates in?', a: 'Yes. You can whitelist specific languages. Queries in unsupported or restricted languages are escalated to a human agent automatically.' },
  { q: 'Does the agent handle right-to-left languages like Arabic and Hebrew?', a: 'Yes. Arabic and Hebrew are fully supported, including correct RTL formatting in chat interfaces and email.' },
]

export default function MultiLanguage() {
  return <FeaturePage data={data} faq={faq} />
}
