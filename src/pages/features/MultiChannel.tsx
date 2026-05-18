import FeaturePage from './FeaturePage'

const data = {
  badge: 'Support Agent · Multi-channel',
  title: 'Multi-channel Support',
  subtitle: 'Email, chat, WhatsApp, Telegram, API — all in one.',
  description: 'Your customers don\'t choose your support channel — they use whichever is most convenient at the moment. supVision\'s Support Agent operates across all major channels simultaneously, with full context shared across them. A customer who emailed yesterday and now messages on WhatsApp gets a response that knows both interactions.',
  points: [
    { icon: '💬', title: 'Live chat widget', desc: 'Drop the supVision widget onto your web app or mobile app. No SDK required — a single JavaScript snippet and you\'re live.' },
    { icon: '📧', title: 'Email', desc: 'Handles inbound support emails end to end. Reads, classifies, resolves or escalates, and responds — within seconds of receipt.' },
    { icon: '📱', title: 'WhatsApp Business', desc: 'Full WhatsApp Business API integration. The agent operates natively in WhatsApp — including rich message formats, quick replies, and document collection.' },
    { icon: '✈️', title: 'Telegram', desc: 'Particularly relevant for crypto and Web3 fintechs. The agent handles Telegram queries with the same capabilities as every other channel.' },
    { icon: '🔗', title: 'API channel', desc: 'For custom surfaces — mobile apps, in-product flows, custom portals. A clean REST API lets you embed the agent anywhere.' },
    { icon: '🔄', title: 'Unified conversation history', desc: 'All channels feed into a single conversation record per customer. Context is never lost when a customer switches channel.' },
  ],
  steps: [
    { step: '01', title: 'Connect your channels', desc: 'During onboarding you connect whichever channels you use. Each takes minutes — API credentials, webhook config, and you\'re done.' },
    { step: '02', title: 'Agent receives all queries', desc: 'Inbound messages from every channel arrive in the same queue. The agent processes them in parallel with no per-channel delay.' },
    { step: '03', title: 'Responds in the same channel', desc: 'The customer receives the response in the same channel they used. No redirecting users to a different surface mid-conversation.' },
    { step: '04', title: 'Context follows the customer', desc: 'If a customer switches from email to WhatsApp, the agent already knows the previous conversation. No re-explaining from scratch.' },
  ],
  ctaTitle: 'Meet your customers wherever they are.',
  ctaDesc: 'All channels, one agent, unified context. Live in days.',
}

const faq = [
  { q: 'Do we need to run separate agents for each channel?', a: 'No. One agent, all channels. The same configuration, knowledge base, and escalation rules apply everywhere. You manage one integration, not five.' },
  { q: 'Does the WhatsApp integration require a WhatsApp Business account?', a: 'Yes. You need a WhatsApp Business API account (via Meta or a BSP like Twilio or 360dialog). supVision connects to your existing account — we don\'t require you to switch providers.' },
  { q: 'Can the agent collect documents over WhatsApp?', a: 'Yes. Customers can send photos and documents directly in WhatsApp. The agent can receive them, forward to your KYC provider, and confirm receipt — all within the same conversation.' },
  { q: 'Is there a rate limit on how many conversations the agent can handle?', a: 'No hard limit on the supVision side. Channel-level limits (e.g. WhatsApp\'s message throughput) apply based on your WhatsApp Business tier.' },
]

export default function MultiChannel() {
  return <FeaturePage data={data} faq={faq} />
}
