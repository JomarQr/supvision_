import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const capabilities = [
  {
    title: 'KYC & Identity Queries',
    desc: 'Instantly answers verification status, document requirements, and rejection reasons. Guides users through re-submission without a human agent in the loop.',
    icon: '🪪',
  },
  {
    title: 'Transaction Dispute Resolution',
    desc: 'Pulls real-time transaction data, identifies the dispute type, and resolves or escalates with full context — median resolution under 2 minutes.',
    icon: '💳',
  },
  {
    title: 'Payment Failure Triage',
    desc: 'Diagnoses failed payments by querying payment processor APIs in real time. Tells users exactly why a payment failed and what to do next.',
    icon: '⚡',
  },
  {
    title: 'Account & Card Management',
    desc: 'Handles limit queries, card blocking requests, PIN resets, and account status checks — all without exposing sensitive data beyond what is needed.',
    icon: '🏦',
  },
  {
    title: 'Onboarding Assistance',
    desc: 'Walks new users through onboarding steps, explains document requirements, and handles the most common drop-off points automatically.',
    icon: '🚀',
  },
  {
    title: 'Compliance-Safe Responses',
    desc: 'Every response follows pre-approved templates for regulated content. The agent never provides financial advice outside its defined scope.',
    icon: '🔒',
  },
  {
    title: 'Smart Escalation',
    desc: 'When confidence falls below your threshold, the agent hands off to a human — with the full conversation history, decision trace, and reason attached.',
    icon: '🤝',
  },
  {
    title: 'Full Audit Trail',
    desc: 'Every decision, response, and escalation is logged with a timestamp and rationale. Exportable for regulators, auditors, and your compliance team on demand.',
    icon: '📋',
  },
]

const metrics = [
  { value: '<2 min', label: 'Median resolution time for KYC and transaction queries' },
  { value: '98.4%', label: 'Resolution rate across all supported query types' },
  { value: '52%', label: 'Average reduction in support operating costs' },
  { value: '50+', label: 'Languages supported out of the box' },
  { value: '24/7', label: 'Availability with no degradation at peak volume' },
  { value: '3 days', label: 'Typical time to go live from contract signed' },
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
    desc: 'Pulls live data from your CRM, core banking API, KYC provider, and payment processor. No guessing — every response is grounded in the customer\'s actual account state.',
  },
  {
    step: '03',
    title: 'Resolves or escalates',
    desc: 'If confidence exceeds your threshold, the agent resolves autonomously and logs the decision. If not, it hands off to a human agent with everything they need already attached.',
  },
  {
    step: '04',
    title: 'Logs everything for compliance',
    desc: 'The full decision trail — query, data pulled, response, confidence score, outcome — is written to your audit log in real time. Regulator-ready exports available on demand.',
  },
]

const useCases = [
  {
    scenario: '"Why was my payment declined?"',
    resolution: 'Agent queries the payment processor, identifies the failure code (insufficient funds, 3DS failure, blocked card), and tells the customer exactly what happened and what to do — in under 30 seconds.',
  },
  {
    scenario: '"My KYC is still pending after 3 days."',
    resolution: 'Agent checks the KYC provider status, surfaces the specific blocker (document quality, mismatched data), and walks the customer through re-submission — no human agent needed.',
  },
  {
    scenario: '"I didn\'t authorise this transaction."',
    resolution: 'Agent opens a dispute ticket, collects required information, applies your escalation rules, and — for eligible disputes — initiates an immediate provisional credit while the case is reviewed.',
  },
  {
    scenario: '"I need to increase my spending limit."',
    resolution: 'Agent checks eligibility criteria against the customer\'s account profile, explains the outcome, and either processes the request or routes it to the appropriate team with context pre-filled.',
  },
]

const integrations = [
  { category: 'Helpdesks', items: ['Zendesk', 'Intercom', 'Freshdesk', 'Salesforce Service Cloud'] },
  { category: 'Messaging', items: ['WhatsApp Business', 'Telegram', 'Email', 'Live chat widget'] },
  { category: 'Core Banking', items: ['Custom core banking APIs', 'Mambu', 'Thought Machine', 'Temenos'] },
  { category: 'KYC Providers', items: ['Sumsub', 'Jumio', 'Onfido', 'Veriff'] },
  { category: 'Payment Processors', items: ['Stripe', 'Nuvei', 'Ecommpay', 'Adyen'] },
  { category: 'CRM', items: ['Salesforce', 'HubSpot', 'Pipedrive', 'Custom CRM via API'] },
]

const agentFaqItems = [
  {
    q: 'Does the Support Agent replace our human support team?',
    a: 'No. The Support Agent handles the repetitive, high-volume tier-1 queries — KYC status checks, transaction questions, payment failures — so your human agents can focus on complex cases that actually need them. Most teams using supVision reduce tier-1 volume by over 80%, which means their support staff spends more time on work that matters.',
  },
  {
    q: 'How does the agent know the correct answer for our specific product?',
    a: 'The Support Agent connects to your core banking API, KYC provider, payment processor, and CRM in real time. It does not guess — it reads the customer\'s actual account state before responding. You also configure a knowledge base with your product-specific policies, escalation rules, and approved response templates during onboarding.',
  },
  {
    q: 'What happens when the agent does not know the answer?',
    a: 'You set a confidence threshold. When the agent\'s confidence falls below it, it escalates to a human agent automatically — passing the full conversation history, the data it retrieved, and the reason for escalation. Your human agents never start from zero.',
  },
  {
    q: 'How long does it take to go live?',
    a: 'Most teams are fully live within 3 to 5 business days. The integration runs on top of your existing helpdesk and channels — no platform migration, no re-training your team. Day 1 is connecting your data sources. Day 2 is configuring escalation rules and response templates. Day 3 is testing and go-live.',
  },
  {
    q: 'Which channels does the Support Agent work on?',
    a: 'Email, live chat widget, WhatsApp Business, Telegram, and any channel accessible via API. All conversations are unified — the agent sees full context regardless of which channel the customer used previously.',
  },
  {
    q: 'How does the agent handle sensitive financial data?',
    a: 'The Support Agent operates on a zero-retention model for sensitive fields. PII and card data are never stored beyond the active session. All data in transit is encrypted, and the infrastructure is SOC 2-aligned. The agent retrieves only the fields it needs to answer the specific query — nothing more.',
  },
  {
    q: 'Can we customise what the agent can and cannot do?',
    a: 'Yes, fully. You define the scope: which query types the agent handles autonomously, which require a human, and which should be declined entirely. Escalation thresholds, approved response categories, and out-of-scope topics are all configurable by your team without engineering involvement.',
  },
  {
    q: 'Is the Support Agent compliant with financial regulations?',
    a: 'Yes. Every response follows compliance-approved templates that your team configures. The agent does not provide financial advice, make credit decisions, or take actions outside its defined scope. All decisions are logged with a timestamp and rationale — exportable in formats your regulators and auditors expect.',
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
      <section className="px-4 pt-12 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-400" />
                Live product · Generally available
              </div>
              <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Support Agent
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-500">
                An AI agent built specifically for fintech customer support. Resolves KYC queries, transaction disputes, payment failures, and account questions — autonomously, in under 2 minutes, across every channel your customers use.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-500">
                Not a generic chatbot retrofitted for finance. Built from the ground up for regulated financial services — with compliance, audit logs, and escalation rules baked in from day one.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors"
                  style={{ backgroundColor: '#214995' }}
                >
                  Book a demo
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50">
                  See pricing
                </Link>
              </div>
            </div>

            {/* Stats card */}
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <p className="text-3xl font-black text-gray-900" style={{ color: m.value === '<2 min' ? '#214995' : undefined }}>{m.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-gray-500">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">How it works</p>
            <p className="mt-3 text-base text-gray-500">From customer message to resolution — in seconds.</p>
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
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">Capabilities</p>
            <p className="mt-3 text-base text-gray-500">Everything the Support Agent handles autonomously.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <div key={c.title} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <span className="text-3xl">{c.icon}</span>
                <h3 className="mt-4 text-sm font-bold text-gray-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">Real scenarios</p>
            <p className="mt-3 text-base text-gray-500">What the Support Agent resolves every day.</p>
          </div>

          <div className="flex flex-col gap-4">
            {useCases.map((uc) => (
              <div key={uc.scenario} className="relative grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                <div className="bg-gray-100 px-8 py-8">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">Customer says</p>
                  <p className="text-base font-semibold text-gray-900">{uc.scenario}</p>
                </div>
                <div className="bg-white px-8 py-8">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: '#214995' }}>Support Agent does</p>
                  <p className="text-sm leading-relaxed text-gray-700">{uc.resolution}</p>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full shadow-md" style={{ backgroundColor: '#214995' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                      <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">Integrations</p>
            <p className="mt-3 text-base text-gray-500">Works on top of your existing stack. No migration required.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((group) => (
              <div key={group.category} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">{group.category}</p>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 flex-shrink-0" style={{ color: '#214995' }}>
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance strip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
            <div className="lg:col-span-2">
              <p className="text-2xl font-bold uppercase text-white">Built for regulated finance</p>
              <p className="mt-4 text-base leading-relaxed text-gray-400">
                Every response follows compliance-approved templates. Escalation rules, confidence thresholds, and KYC decision logic are configurable by your compliance team — not by engineers. Audit logs are written in real time and exportable in formats your regulators expect.
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
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
            >
              Book a demo
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
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
