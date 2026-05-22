import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import IntegrationFinder from '../components/ui/IntegrationFinder'

const capabilities = [
  {
    title: 'Identity & Onboarding',
    desc: 'Automate identity verification and onboarding flows',
  },
  {
    title: 'Dispute Resolution',
    desc: 'Resolve chargebacks and transaction disputes in real time',
  },
  {
    title: 'Escalation Rules',
    desc: 'Custom confidence thresholds and seamless human handoffs',
  },
  {
    title: 'Multi-channel Support',
    desc: 'Email, chat, WhatsApp, Telegram, API - all in one',
  },
  {
    title: 'Audit Logs',
    desc: 'Traceable decision trail, regulator-ready exports',
  },
  {
    title: 'Multi-language',
    desc: 'Respond in 50+ languages with no configuration required',
  },
]


const howItWorks = [
  {
    step: '01',
    title: 'Customer sends a query',
    desc: 'Via email, chat, WhatsApp, Telegram, or your existing helpdesk widget. The agent receives it in real time across all channels simultaneously.',
  },
  {
    step: '02',
    title: 'Agent reads full context',
    desc: 'Pulls live data from your CRM, identity verification provider, and knowledge base. No guessing - every response is grounded in the customer\'s actual account state and your internal policies.',
  },
  {
    step: '03',
    title: 'Resolves or escalates',
    desc: 'If confidence exceeds your threshold, the agent resolves autonomously and logs the decision. If not, it hands off to a human agent with everything they need already attached.',
  },
  {
    step: '04',
    title: 'Logs everything for compliance',
    desc: 'The full decision trail - query, data pulled, response, confidence score, outcome - is written to your audit log in real time. Regulator-ready exports available on demand.',
  },
]

const useCases = [
  {
    title: 'Payment declined',
    scenario: '"Why was my payment declined?"',
    resolution: 'Agent queries the payment processor, identifies the failure code (insufficient funds, 3DS failure, blocked card), and tells the customer exactly what happened and what to do - in under 30 seconds.',
  },
  {
    title: 'Verification stuck',
    scenario: '"My verification is still pending after 3 days."',
    resolution: 'Agent checks the verification provider status, surfaces the specific blocker (document quality, mismatched data), and walks the customer through re-submission - no human agent needed.',
  },
  {
    title: 'Disputed transaction',
    scenario: '"I didn\'t authorise this transaction."',
    resolution: 'Agent opens a dispute ticket, collects required information, applies your escalation rules, and - for eligible disputes - initiates an immediate provisional credit while the case is reviewed.',
  },
  {
    title: 'Limit increase',
    scenario: '"I need to increase my spending limit."',
    resolution: 'Agent checks eligibility criteria against the customer\'s account profile, explains the outcome, and either processes the request or routes it to the appropriate team with context pre-filled.',
  },
]

const agentFaqItems = [
  {
    q: 'Does the Support Agent replace our human support team?',
    a: 'No. The Support Agent handles the repetitive, high-volume tier-1 queries - identity status checks, transaction questions, payment failures - so your human agents can focus on complex cases that actually need them. Most teams using supVision reduce tier-1 volume by over 80%, which means their support staff spends more time on work that matters.',
  },
  {
    q: 'How does the agent know the correct answer for our specific product?',
    a: 'The Support Agent connects to your core banking API, identity verification provider, payment processor, and CRM in real time. It does not guess - it reads the customer\'s actual account state before responding. You also configure a knowledge base with your product-specific policies, escalation rules, and approved response templates during onboarding.',
  },
  {
    q: 'What happens when the agent does not know the answer?',
    a: 'You set a confidence threshold. When the agent\'s confidence falls below it, it escalates to a human agent automatically - passing the full conversation history, the data it retrieved, and the reason for escalation. Your human agents never start from zero.',
  },
  {
    q: 'How long does it take to go live?',
    a: 'Most teams are fully live within 3 to 5 business days. The integration runs on top of your existing helpdesk and channels - no platform migration, no re-training your team. Day 1 is connecting your data sources. Day 2 is configuring escalation rules and response templates. Day 3 is testing and go-live.',
  },
  {
    q: 'Which channels does the Support Agent work on?',
    a: 'Email, live chat widget, WhatsApp Business, Telegram, and any channel accessible via API. All conversations are unified - the agent sees full context regardless of which channel the customer used previously.',
  },
  {
    q: 'How does the agent handle sensitive financial data?',
    a: 'The Support Agent operates on a zero-retention model for sensitive fields. PII and card data are never stored beyond the active session. All data in transit is encrypted, and the infrastructure is SOC 2-aligned. The agent retrieves only the fields it needs to answer the specific query - nothing more.',
  },
  {
    q: 'Can we customise what the agent can and cannot do?',
    a: 'Yes, fully. You define the scope: which query types the agent handles autonomously, which require a human, and which should be declined entirely. Escalation thresholds, approved response categories, and out-of-scope topics are all configurable by your team without engineering involvement.',
  },
  {
    q: 'Is the Support Agent compliant with financial regulations?',
    a: 'Yes. Every response follows compliance-approved templates that your team configures. The agent does not provide financial advice, make credit decisions, or take actions outside its defined scope. All decisions are logged with a timestamp and rationale - exportable in formats your regulators and auditors expect.',
  },
]

function AgentFAQItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (open) {
      el.style.maxHeight = el.scrollHeight + 'px'
      el.style.opacity = '1'
    } else {
      el.style.maxHeight = '0px'
      el.style.opacity = '0'
    }
  }, [open])

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between gap-8 py-7 text-left"
      >
        <span className="text-lg font-semibold text-gray-900">{item.q}</span>
        <span className={[
          'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white transition-transform duration-300',
          open ? 'rotate-45' : '',
        ].join(' ')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 text-gray-500">
            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
          </svg>
        </span>
      </button>
      <div
        ref={bodyRef}
        style={{ maxHeight: '0px', opacity: 0, overflow: 'hidden', transition: 'max-height 0.35s ease, opacity 0.3s ease' }}
      >
        <p className="pb-7 text-base leading-relaxed text-gray-500 max-w-3xl">{item.a}</p>
      </div>
    </div>
  )
}

export default function SupportAgent() {
  return (
    <div className="pt-24">

      {/* Hero */}
      <section className="px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
            <div className="grid lg:grid-cols-2">

              {/* Left - text */}
              <div className="flex flex-col justify-center px-10 py-14 lg:px-14">
                <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#214995' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                    <path fillRule="evenodd" d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1 12.75A.75.75 0 0 1 1.75 12H8a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 12.75Z" clipRule="evenodd" />
                  </svg>
                  Solutions
                </p>

                <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl">
                  Support Agent
                </h1>

                <ul className="mt-8 space-y-4">
                  {[
                    'Resolves verification, disputes, and payment queries autonomously in under 2 minutes',
                    'Connects to your CRM, core banking, and identity verification provider - answers with real data',
                    'Compliant by design - audit logs, escalation rules, and zero financial advice risk',
                  ].map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(33,73,149,0.12)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3" style={{ color: '#214995' }}>
                          <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed text-gray-700">{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Link
                    to="/contact"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gray-300 bg-white pl-6 pr-1.5 py-1.5 text-sm font-semibold"
                  >
                    <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]" style={{ backgroundColor: '#214995' }} />
                    <span className="relative z-10 text-gray-900 transition-colors duration-300 group-hover:text-white">Let's chat!</span>
                    <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right - diagram */}
              <div className="flex items-center justify-center px-12 py-14" style={{ backgroundColor: '#214995' }}>
                <div className="flex flex-col items-center gap-0 w-full max-w-xs">
                  {/* Top row of 3 icons */}
                  <div className="flex w-full items-end justify-between">
                    {[
                      /* KYC icon */
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>,
                      /* Dispute icon */
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                      </svg>,
                      /* Compliance icon */
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                      </svg>,
                    ].map((icon, i) => (
                      <div key={i} className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-gray-800 shadow-lg">
                        {icon}
                      </div>
                    ))}
                  </div>

                  {/* Connector lines SVG */}
                  <svg viewBox="0 0 280 80" className="w-full" style={{ height: 80 }}>
                    {/* Three vertical lines down */}
                    <line x1="40" y1="0" x2="40" y2="40" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
                    <line x1="140" y1="0" x2="140" y2="40" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
                    <line x1="240" y1="0" x2="240" y2="40" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
                    {/* Horizontal bar */}
                    <line x1="40" y1="40" x2="240" y2="40" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
                    {/* Single line down to center */}
                    <line x1="140" y1="40" x2="140" y2="80" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
                  </svg>

                  {/* Center agent icon */}
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gray-900 shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="h-10 w-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">How it works</p>
            <p className="mt-3 text-base text-gray-500">From customer message to resolution - in seconds.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step) => (
              <div key={step.step} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <span className="text-4xl font-black" style={{ color: '#214995' }}>{step.step}</span>
                <h3 className="mt-4 text-base font-bold text-gray-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#214995' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-white">Capabilities</p>
            <p className="mt-3 text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>Everything the Support Agent handles autonomously.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="flex flex-col rounded-2xl bg-white p-6">
                <h3 className="text-sm font-bold text-gray-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases - phone mockups */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">Real scenarios</p>
            <p className="mt-3 text-base text-gray-500">What the Support Agent resolves every day.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((uc) => (
              <div key={uc.scenario} className="flex flex-col">
                {/* Label above phone */}
                <p className="mb-4 text-center text-sm font-semibold text-gray-900">{uc.title}</p>
                {/* Phone frame */}
                <div className="flex-1 rounded-[2rem] border-[6px] border-gray-800 bg-white shadow-2xl overflow-hidden">
                  {/* Status bar */}
                  <div className="flex items-center justify-between bg-gray-800 px-4 pt-3 pb-2">
                    <span className="text-[10px] font-semibold text-white">9:41</span>
                    <div className="h-3 w-16 rounded-full bg-gray-700" />
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-white/60" />
                      <div className="h-2 w-2 rounded-full bg-white/60" />
                      <div className="h-2 w-3 rounded-sm bg-white/60" />
                    </div>
                  </div>
                  {/* Chat header */}
                  <div className="flex items-center gap-2 border-b border-gray-100 bg-white px-4 py-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                        <path fillRule="evenodd" d="M1 8.74c0 .983.713 1.825 1.69 1.943L3 10.698V13a1 1 0 0 0 1.447.894L7.098 12.5H9.5A2.5 2.5 0 0 0 12 10V8h.5a2.5 2.5 0 0 0 0-5H12a2.5 2.5 0 0 0-2.5-2.5h-6A2.5 2.5 0 0 0 1 3v5.74Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Support Agent</p>
                      <p className="text-[10px] text-green-500">● Online</p>
                    </div>
                  </div>
                  {/* Chat messages */}
                  <div className="flex flex-col gap-3 bg-gray-50 p-4 min-h-[340px]">
                    {/* Customer bubble */}
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-gray-200 px-3 py-2">
                        <p className="text-xs leading-relaxed text-gray-800">{uc.scenario}</p>
                      </div>
                    </div>
                    {/* Typing indicator */}
                    <div className="flex items-center gap-1 pl-1">
                      <div className="flex gap-1 rounded-2xl rounded-tl-sm px-3 py-2" style={{ backgroundColor: '#214995' }}>
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" style={{ animationDelay: '0ms' }} />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" style={{ animationDelay: '150ms' }} />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                    {/* Agent bubble */}
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-2xl rounded-tl-sm px-3 py-2 text-white" style={{ backgroundColor: '#214995' }}>
                        <p className="text-xs leading-relaxed">{uc.resolution}</p>
                      </div>
                    </div>
                    {/* Resolved badge */}
                    <div className="mt-auto flex justify-center pt-2">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-semibold text-green-700">✓ Resolved automatically</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <IntegrationFinder />

      {/* Compliance strip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
            <div className="lg:col-span-2">
              <p className="text-2xl font-bold uppercase text-white">Built for regulated finance</p>
              <p className="mt-4 text-base leading-relaxed text-gray-400">
                Every response follows compliance-approved templates. Escalation rules, confidence thresholds, and verification decision logic are configurable by your compliance team - not by engineers. Audit logs are written in real time and exportable in formats your regulators expect.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {['GDPR compliant', 'PCI DSS aligned', 'Audit logs', 'SOC 2-aligned infra', 'Right-to-erasure support'].map(tag => (
                  <span key={tag} className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-gray-300">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-6">
              <img src="/badge/image.png" alt="PCI DSS" className="h-24 w-auto" />
              <img src="/badge/image 26 (3).png" alt="GDPR" className="h-16 w-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">FAQ</p>
          </div>
          <div className="mt-12 divide-y divide-gray-200">
            {agentFaqItems.map((item, i) => (
              <AgentFAQItem key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center"
          style={{
            backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2 className="text-3xl font-bold text-white">Ready to deploy your Support Agent?</h2>
          <p className="mt-4 text-base text-blue-200">
            Most teams are live within 3 days. No platform migration. No 6-month project.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/30 bg-white/10 pl-6 pr-1.5 py-1.5 text-sm font-semibold text-white"
            >
              <span className="absolute right-[6px] top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-white transition-transform duration-500 ease-in-out group-hover:scale-[20]" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-900">Book a demo</span>
              <span className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gray-900">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              See pricing
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
