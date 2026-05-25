import { useEffect, useState } from 'react'
import ModelSelectorCard from '../../components/home/ModelSelectorCard'
import { MODEL_ANIM_STEPS } from '../../components/home/solutionShowcaseData'
import FeaturePage from './FeaturePage'

const data = {
  badge: 'Support Agent · Multi-channel',
  title: 'Multi-channel Support',
  subtitle: 'Email, chat, WhatsApp, Telegram, API - all in one.',
  description: 'Your customers don\'t choose your support channel - they use whichever is most convenient at the moment. supVision\'s Support Agent operates across all major channels simultaneously, with full context shared across them. A customer who emailed yesterday and now messages on WhatsApp gets a response that knows both interactions.',
  highlights: [
    'Email, chat, WhatsApp, Telegram, and API — one agent handles all',
    'Full context shared across channels — customers never repeat themselves',
    'Each channel live in minutes — no SDK or custom development required',
  ],
  coreImage: '/Core Functionalities/Multi-channel Support.png',
  points: [
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M1 8.74C1 9.99 1.99 11 3.2 11H4v1.5a.5.5 0 0 0 .854.354l1.896-1.854H9.8c1.21 0 2.2-1.01 2.2-2.26V4.26C12 3.01 11.01 2 9.8 2H3.2C1.99 2 1 3.01 1 4.26v4.48Z" clipRule="evenodd" /></svg>, title: 'Live chat widget', desc: 'Drop the supVision widget onto your web app or mobile app. No SDK required - a single JavaScript snippet and you\'re live.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>, title: 'Email', desc: 'Handles inbound support emails end to end. Reads, classifies, resolves or escalates, and responds - within seconds of receipt.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6ZM8 12.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" /></svg>, title: 'WhatsApp Business', desc: 'Full WhatsApp Business API integration. The agent operates natively in WhatsApp - including rich message formats, quick replies, and document collection.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M2.87 2.298a.75.75 0 0 0-.812.806l.405 2.428A2 2 0 0 0 4.465 7.28l1.696.406a.75.75 0 0 1 .558.832l-.163 1.32a.75.75 0 0 0 1.248.637l4.688-4.688a.75.75 0 0 0-.668-1.269l-1.716.484a.75.75 0 0 1-.728-.225L7.67 2.623a2 2 0 0 0-2.01-.567L2.87 2.298Z" /><path d="M11.16 13.26a.75.75 0 0 1-1.161-.585l-.082-1.045a.75.75 0 0 0-.592-.68l-1.761-.396a.75.75 0 0 1-.433-1.142l.401-.59a.75.75 0 0 1 1.049-.188l1.82 1.275a.75.75 0 0 0 .944-.082l1.425-1.425a.75.75 0 0 1 1.211.905l-2.82 3.953Z" /></svg>, title: 'Telegram', desc: 'Particularly relevant for Web3 fintechs. The agent handles Telegram queries with the same capabilities as every other channel.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M1 8.5A1.5 1.5 0 0 1 2.5 7h11a1.5 1.5 0 0 1 0 3h-11A1.5 1.5 0 0 1 1 8.5ZM8 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM8 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" /></svg>, title: 'API channel', desc: 'For custom surfaces - mobile apps, in-product flows, custom portals. A clean REST API lets you embed the agent anywhere.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V5.621a1.5 1.5 0 0 0-.44-1.06L9.94 2.439A1.5 1.5 0 0 0 8.878 2H4.5ZM6 7.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm.5 2.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2Z" clipRule="evenodd" /></svg>, title: 'Unified conversation history', desc: 'All channels feed into a single conversation record per customer. Context is never lost when a customer switches channel.' },
  ],
  steps: [
    { step: '01', title: 'Connect your channels', desc: 'During onboarding you connect whichever channels you use. Each takes minutes - API credentials, webhook config, and you\'re done.' },
    { step: '02', title: 'Agent receives all queries', desc: 'Inbound messages from every channel arrive in the same queue. The agent processes them in parallel with no per-channel delay.' },
    { step: '03', title: 'Responds in the same channel', desc: 'The customer receives the response in the same channel they used. No redirecting users to a different surface mid-conversation.' },
    { step: '04', title: 'Context follows the customer', desc: 'If a customer switches from email to WhatsApp, the agent already knows the previous conversation. No re-explaining from scratch.' },
  ],
  ctaTitle: 'Meet your customers wherever they are.',
  ctaDesc: 'All channels, one agent, unified context. Live in days.',
}

const faq = [
  { q: 'Do we need to run separate agents for each channel?', a: 'No. One agent, all channels. The same configuration, knowledge base, and escalation rules apply everywhere. You manage one integration, not five.' },
  { q: 'Does the WhatsApp integration require a WhatsApp Business account?', a: 'Yes. You need a WhatsApp Business API account (via Meta or a BSP like Twilio or 360dialog). supVision connects to your existing account - we don\'t require you to switch providers.' },
  { q: 'Can the agent collect documents over WhatsApp?', a: 'Yes. Customers can send photos and documents directly in WhatsApp. The agent can receive them, forward to your identity verification provider, and confirm receipt - all within the same conversation.' },
  { q: 'Is there a rate limit on how many conversations the agent can handle?', a: 'No hard limit on the supVision side. Channel-level limits (e.g. WhatsApp\'s message throughput) apply based on your WhatsApp Business tier.' },
]

export default function MultiChannel() {
  const [modelAnimIdx, setModelAnimIdx] = useState(0)

  useEffect(() => {
    const t = setTimeout(
      () => setModelAnimIdx(i => (i + 1) % MODEL_ANIM_STEPS.length),
      MODEL_ANIM_STEPS[modelAnimIdx].delay
    )
    return () => clearTimeout(t)
  }, [modelAnimIdx])

  const step = MODEL_ANIM_STEPS[modelAnimIdx]

  return (
    <>
      <FeaturePage data={data} faq={faq} />

      {/* Pick any AI — model selector animation */}
      <section className="px-4 py-16 lg:px-8 lg:py-24" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl">
          {/* Desktop: side by side */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
            <ModelSelectorCard step={step} className="h-[440px]" />
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">AI routing</p>
              <h2 className="mt-4 text-5xl leading-snug text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
                Pick any AI for any task.
              </h2>
              <p className="mt-3 text-xl leading-snug text-gray-500" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
                Pay only for what you need.
              </p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-gray-500">
                supVision routes each query to the most cost-efficient model — GPT for speed, Claude for reasoning, Gemini for documents — so you never overpay on tokens.
              </p>
            </div>
          </div>

          {/* Mobile: stacked */}
          <div className="lg:hidden">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">AI routing</p>
              <h2 className="mt-3 text-[1.9rem] leading-snug text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
                Pick any AI for any task.
              </h2>
              <p className="mt-1 text-lg leading-snug text-gray-500" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
                Pay only for what you need.
              </p>
              <p className="mt-4 mx-auto max-w-xs text-sm leading-relaxed text-gray-500">
                supVision routes each query to the most cost-efficient model — GPT for speed, Claude for reasoning, Gemini for documents — so you never overpay on tokens.
              </p>
            </div>
            <ModelSelectorCard step={step} className="mt-8 h-[440px]" />
          </div>
        </div>
      </section>
    </>
  )
}
