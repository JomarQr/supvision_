import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { allIntegrations, integrationCategories } from '../components/ui/IntegrationFinder'
import PageMeta from '../components/PageMeta'

const complianceCertCards = [
  {
    badge: '/gdpr.png',
    badgeAlt: 'GDPR Compliant',
    title: 'GDPR Compliance',
    desc: 'GDPR-compliant data handling and right-to-erasure support',
  },
  {
    badge: '/badge/image.png',
    badgeAlt: 'PCI DSS Compliant',
    title: 'PCI DSS Aligned',
    desc: 'PCI DSS aligned, no raw card data ever touches our system',
    badgeOversize: true,
  },
  {
    badge: '/nda.png',
    badgeAlt: 'NDA protected',
    title: 'NDA-Protected Data',
    desc: 'All data encrypted end-to-end and protected under a signed NDA — we cannot see your customer records',
  },
]

const heroFeaturePills = ['Resolve', 'Escalate', 'Verify', 'Comply', 'Connect'] as const

const pillSectionIds: Record<(typeof heroFeaturePills)[number], string> = {
  Resolve: 'support-resolve',
  Escalate: 'support-escalate',
  Verify: 'support-verify',
  Comply: 'support-comply',
  Connect: 'support-connect',
}

function scrollToSupportSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const heroFeatureShowcase = [
  {
    title: 'Resolve across channels',
    desc: 'Email, chat, WhatsApp, Telegram, and your helpdesk widget — the agent sees every conversation in one place.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    ),
  },
  {
    title: 'Escalate with context',
    desc: 'When confidence drops, humans get the full thread, live data pulled, and why the agent handed off.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    title: 'Verify with live data',
    desc: 'Pulls CRM, KYC, and banking state before replying — so verification and payment answers are never guesses.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.375 3.375 0 0 1-1.135 3.911 3.375 3.375 0 0 1-3.911 1.135A3.375 3.375 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.375 3.375 0 0 1-3.911-1.135 3.375 3.375 0 0 1-1.135-3.911A3.375 3.375 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.375 3.375 0 0 1 1.135-3.911 3.375 3.375 0 0 1 3.911-1.135A3.375 3.375 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.375 3.375 0 0 1 3.911 1.135 3.375 3.375 0 0 1 1.135 3.911A3.375 3.375 0 0 1 21 12Z" />
      </svg>
    ),
  },
  {
    title: 'Comply by default',
    desc: 'Every query, data pull, and response is logged in real time — audit-ready exports your regulators expect.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
]

const verifyTabs = [
  {
    id: 'live-data',
    label: 'Live data',
    title: 'Live data',
    desc: 'The agent pulls CRM, core banking, and processor status before it replies — so every answer matches the customer\'s real account state, not a generic script.',
  },
  {
    id: 'kyc',
    label: 'KYC status',
    title: 'KYC status',
    desc: 'Verification pending, rejected, or approved — with the specific blocker surfaced so customers know what to fix without waiting on a human agent.',
  },
  {
    id: 'policy',
    label: 'Policy check',
    title: 'Policy check',
    desc: 'Responses stay inside your approved templates and escalation rules. No financial advice, no out-of-scope actions — only what your compliance team allows.',
  },
]

const escalateAccordionItems = [
  {
    q: 'Confidence thresholds',
    a: 'Set the score where the agent resolves alone versus routes to a human. Different rules per query type — verification, disputes, payments — without engineering.',
  },
  {
    q: 'Full conversation handoff',
    a: 'Humans receive the entire thread, channel history, and what the agent already tried. No asking the customer to repeat themselves.',
  },
  {
    q: 'Live data attached',
    a: 'CRM, KYC status, transaction logs, and policy snippets travel with the escalation so your team acts on facts, not screenshots.',
  },
  {
    q: 'Escalation reason logged',
    a: 'Every handoff records why confidence dropped and which data was pulled — audit-ready for QA and regulators.',
  },
]

const agentFaqItems = [
  {
    q: 'What types of support queries can supVision handle?',
    a: 'supVision is built for the full spectrum of fintech support: identity verification questions, transaction disputes, payment failures, account onboarding, card and limit queries, and regulatory information requests. If it\'s a repeatable support case in a financial services context, supVision can resolve it autonomously.',
  },
  {
    q: 'How long does it take to go live?',
    a: 'Most teams are live within 3–5 business days. supVision connects to your existing helpdesk, CRM, and identity verification providers - no platform migration required. You configure escalation rules, set confidence thresholds, and go. There is no 6-month implementation project.',
  },
  {
    q: 'What happens when supVision cannot resolve an issue?',
    a: 'supVision escalates to a human agent with full context, the conversation history, the decision trace, and the reason for escalation. Your team never starts from zero. You control the confidence thresholds that trigger escalation, and every handoff is logged for audit.',
  },
  {
    q: 'Is supVision compliant with GDPR and PCI DSS?',
    a: 'Yes. GDPR and PCI DSS compliance is built into the product, not added on top. supVision never stores raw card data, supports right-to-erasure requests, and produces a full audit trail for every automated decision. All infrastructure is SOC 2-aligned with end-to-end encryption in transit and at rest.',
  },
  {
    q: 'Can supVision work with our existing tools?',
    a: 'supVision integrates with the tools your team already uses - Zendesk, Intercom, Salesforce, Freshdesk, and custom CRMs. It also connects to your identity provider and knowledge base to resolve queries with real data and your own internal policies, not generic responses.',
  },
]

function VerifyTabVisual({ tabId }: { tabId: string }) {
  if (tabId === 'kyc') {
    return (
      <div className="mx-auto w-full max-w-[280px] rounded-2xl bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold text-gray-900">Identity verification</p>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: 'rgba(251,154,5,0.15)', color: '#B45309' }}>
            Pending review
          </span>
        </div>
        <p className="mt-3 text-sm text-gray-700">Document quality — resubmit a clearer photo of your ID.</p>
        <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#214995' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.023l4.25-5.5Z" clipRule="evenodd" />
          </svg>
          Verified against KYC provider
        </div>
      </div>
    )
  }

  if (tabId === 'policy') {
    return (
      <div className="mx-auto w-full max-w-[280px] rounded-2xl bg-white p-4 shadow-lg">
        <p className="text-xs font-bold text-gray-900">Policy templates</p>
        <ul className="mt-3 space-y-2 text-sm text-gray-700">
          {['Payment failure — approved wording', 'Chargeback intake — compliant flow', 'No financial advice — enforced'].map((line) => (
            <li key={line} className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: '#214995' }}>
                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.023l4.25-5.5Z" clipRule="evenodd" />
              </svg>
              {line}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-[280px] rounded-2xl bg-white p-4 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ backgroundColor: '#214995' }}>
          SV
        </div>
        <p className="text-xs font-bold text-gray-900">Support ticket</p>
      </div>
      <p className="mt-3 text-sm font-semibold text-gray-900">Why was my payment declined?</p>
      <p className="mt-2 text-xs leading-relaxed text-gray-500">
        Card ending 4242 — 3DS failed at 14:32 UTC. Customer eligible to retry with another card.
      </p>
      <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#214995' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
          <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.023l4.25-5.5Z" clipRule="evenodd" />
        </svg>
        Verified against live processor data
      </div>
    </div>
  )
}

const complyFeatureCards = [
  {
    title: 'Full audit trail',
    desc: 'Every query, data pull, response, and confidence score is logged in real time — query to outcome, timestamped and searchable.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: 'Regulator-ready exports',
    desc: 'Export decision trails in formats your auditors and regulators expect — no manual reconstruction after the fact.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: 'Policy-safe responses',
    desc: 'Approved templates and out-of-scope rules keep the agent inside your compliance boundary — no financial advice, no unauthorized actions.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
]

function ComplyMobileSection() {
  return (
    <div
      id="support-comply"
      className="mt-8 scroll-mt-32 overflow-hidden rounded-3xl px-5 py-8 text-left sm:px-6"
      style={{ backgroundColor: '#121212' }}
    >
      <span
        className="inline-block rounded-full px-4 py-1 text-sm font-medium"
        style={{ backgroundColor: '#F5F0E8', color: '#1A1A1A' }}
      >
        Comply
      </span>
      <h2
        className="mt-5 text-[1.65rem] leading-snug text-white sm:text-[1.85rem]"
        style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
      >
        Stay compliant — every decision <em className="italic">logged</em>.
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-gray-400">
        supVision was built for regulated financial services: full audit trails, exportable logs, and responses that stay inside your policy — on every channel.
      </p>
      <Link
        to="/security"
        className="mt-6 inline-flex items-center justify-center rounded-full border border-white/80 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
      >
        Learn more
      </Link>
      <div className="mt-8 flex flex-col gap-3">
        {complyFeatureCards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col gap-3 rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <div style={{ color: '#9BB0E8' }}>{card.icon}</div>
            <h3
              className="text-lg leading-snug text-white"
              style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
            >
              {card.title}
            </h3>
            <p className="text-xs leading-relaxed text-gray-400">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConnectMobileSection() {
  const [active, setActive] = useState('All')
  const [kycHovered, setKycHovered] = useState(false)

  const filtered =
    active === 'All' ? allIntegrations : allIntegrations.filter((i) => i.category === active)
  const visible = filtered.slice(0, 4)

  return (
    <div
      id="support-connect"
      className="mt-8 scroll-mt-32 rounded-3xl px-5 py-8 text-left sm:px-6"
      style={{ backgroundColor: '#faf8f5' }}
    >
      <span className="inline-block rounded-full border border-gray-900 px-4 py-1 text-sm font-medium text-gray-900">
        Connect
      </span>
      <h2
        className="mt-5 text-[1.65rem] leading-snug text-gray-900 sm:text-[1.85rem]"
        style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
      >
        Built for your stack — not a platform <em className="italic">migration</em>.
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        supVision connects to your existing stack. No migration required.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {integrationCategories.map((cat) => {
          if (cat === 'KYC providers') {
            return (
              <div
                key={cat}
                className="relative"
                onMouseEnter={() => setKycHovered(true)}
                onMouseLeave={() => setKycHovered(false)}
              >
                <button
                  type="button"
                  className="cursor-default rounded-full border px-4 py-1.5 text-sm font-semibold"
                  style={{ backgroundColor: 'transparent', borderColor: '#111827', color: '#9ca3af' }}
                >
                  {cat}
                </button>
                {kycHovered && (
                  <div className="absolute left-0 top-full z-20 mt-1">
                    <div className="whitespace-nowrap rounded-xl bg-white px-3 py-2 text-xs font-semibold text-gray-400 shadow-lg ring-1 ring-gray-100">
                      Coming soon
                    </div>
                  </div>
                )}
              </div>
            )
          }
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className="rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors"
              style={
                active === cat
                  ? { backgroundColor: '#214995', borderColor: '#214995', color: '#fff' }
                  : { backgroundColor: 'transparent', borderColor: '#111827', color: '#374151' }
              }
            >
              {cat}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {visible.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <img
              src={item.logo}
              alt={item.name}
              className="h-10 w-10 flex-shrink-0 rounded-xl object-contain"
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900">{item.name}</p>
              <p className="text-xs leading-snug text-gray-500">{item.tagline}</p>
            </div>
          </div>
        ))}
        {filtered.length > visible.length && (
          <Link to="/integrations" className="mt-1 block text-center text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors">
            +{filtered.length - visible.length} more ↓
          </Link>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          to="/contact"
          className="text-center text-sm font-bold text-gray-900 hover:underline"
        >
          Let&apos;s talk about your stack →
        </Link>
      </div>
    </div>
  )
}

function VerifyMobileSection() {
  const [activeTab, setActiveTab] = useState(verifyTabs[0].id)
  const active = verifyTabs.find((t) => t.id === activeTab) ?? verifyTabs[0]

  return (
    <div id="support-verify" className="mt-8 scroll-mt-32 px-1 py-2 text-center">
      <span className="inline-block rounded-full border border-gray-900 px-4 py-1 text-sm font-medium text-gray-900">
        Verify
      </span>
      <h2
        className="mx-auto mt-5 max-w-sm text-[1.65rem] leading-snug text-gray-900 sm:text-[1.85rem]"
        style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
      >
        Your agent <em className="italic">verifies</em> before it replies.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-600">
        supVision checks live account state, KYC status, and your policies — so every answer is grounded in facts, not guesses.
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#AAC6FF]"
        >
          Book a demo
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0">
            <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>

      <div className="mt-10 flex border-b border-gray-300">
        {verifyTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className="relative flex-1 pb-3 text-center text-base text-gray-900"
            style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
          </button>
        ))}
      </div>

      <div
        className="relative mt-6 overflow-hidden rounded-3xl px-4 py-10"
        style={{
          background: 'linear-gradient(145deg, #3d3428 0%, #1a1612 50%, #2a241c 100%)',
        }}
      >
        <VerifyTabVisual tabId={activeTab} />
      </div>

      <div className="mt-6 text-left">
        <h3
          className="text-2xl text-gray-900"
          style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
        >
          {active.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{active.desc}</p>
      </div>
    </div>
  )
}

function FeatureAccordionItem({ item }: { item: { q: string; a: string } }) {
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
    <div className="border-t border-gray-900">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span
          className="text-lg text-gray-900"
          style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
        >
          {item.q}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-5 w-5 flex-shrink-0 text-gray-900 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
        </svg>
      </button>
      <div
        ref={bodyRef}
        style={{ maxHeight: '0px', opacity: 0, overflow: 'hidden', transition: 'max-height 0.35s ease, opacity 0.3s ease' }}
      >
        <p className="pb-5 text-sm leading-relaxed text-gray-600">{item.a}</p>
      </div>
    </div>
  )
}

function SupportAgentFAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { q: string; a: string }
  isOpen: boolean
  onToggle: () => void
}) {
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + 'px'
      el.style.opacity = '1'
    } else {
      el.style.maxHeight = '0px'
      el.style.opacity = '0'
    }
  }, [isOpen])

  return (
    <div className="overflow-hidden rounded-2xl bg-white" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left"
      >
        <span className="text-base font-medium leading-snug text-gray-900 lg:text-[17px]">
          {item.q}
        </span>
        <span
          className={[
            'flex h-6 w-6 flex-shrink-0 items-center justify-center text-gray-900 transition-transform duration-300',
            isOpen ? 'rotate-180' : '',
          ].join(' ')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </span>
      </button>
      <div
        ref={bodyRef}
        className="px-6"
        style={{ maxHeight: '0px', opacity: 0, overflow: 'hidden', transition: 'max-height 0.35s ease, opacity 0.3s ease' }}
      >
        <p className="pb-6 text-sm leading-relaxed text-gray-500 lg:text-[15px]">{item.a}</p>
      </div>
    </div>
  )
}

function SupportAgentFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-[#faf8f5] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl px-2 lg:max-w-7xl lg:px-0">
        <div data-reveal className="mb-8 text-center">
          <h2
            className="leading-tight"
            style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '2.25rem' }}
          >
            <span className="text-gray-900">Frequently Asked Questions</span>
          </h2>
        </div>

        {/* Mobile: single column */}
        <div className="mt-6 flex flex-col gap-3 lg:hidden">
          {agentFaqItems.map((item, i) => (
            <SupportAgentFAQItem
              key={item.q}
              item={item}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>

        {/* Desktop: two columns */}
        <div className="mt-6 hidden gap-3 lg:flex lg:items-start">
          <div className="flex flex-1 flex-col gap-3">
            {agentFaqItems.filter((_, i) => i % 2 === 0).map((item) => {
              const i = agentFaqItems.indexOf(item)
              return (
                <SupportAgentFAQItem
                  key={item.q}
                  item={item}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              )
            })}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {agentFaqItems.filter((_, i) => i % 2 === 1).map((item) => {
              const i = agentFaqItems.indexOf(item)
              return (
                <SupportAgentFAQItem
                  key={item.q}
                  item={item}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function SupportAgent() {
  return (
    <div className="pt-0">
      <PageMeta
        title="AI Support Agent for Fintech — supVision"
        description="Create an autonomous support agent for your fintech in minutes. Resolves KYC queries, disputes, and transaction issues 24/7 — no human needed."
        path="/support-agent"
      />

      {/* Hero */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pt-2">
        <div className="mx-auto max-w-7xl lg:px-6">
          <div>
            <div data-reveal className="mx-auto max-w-3xl text-center">
              <h1
                className="text-[1.85rem] leading-tight text-gray-900 sm:text-[2.45rem] lg:whitespace-nowrap"
                style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
              >
                Create your first <span style={{ fontWeight: 700 }}>autonomous support agent</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-500">
                Fintech support that turns customer messages into verified, policy-safe resolutions — powered by your live stack, in every channel you already use.
              </p>
              <div className="mt-6 flex flex-nowrap items-center justify-center gap-2">
                {heroFeaturePills.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => scrollToSupportSection(pillSectionIds[label])}
                    className="rounded-full px-4 py-1.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-900 hover:text-white"
                    style={{ border: '1.5px solid #111827' }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: '#101827' }}
                >
                  <span>Let&apos;s chat</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-white">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-3xl lg:max-w-4xl">
            <div
              id="support-resolve"
              className="scroll-mt-32 overflow-hidden rounded-3xl px-5 py-8 text-left sm:px-6"
              style={{ backgroundColor: '#1A1A1A' }}
            >
              <span
                className="inline-block rounded-full px-4 py-1 text-sm font-medium"
                style={{ backgroundColor: '#F5F0E8', color: '#1A1A1A' }}
              >
                Resolve
              </span>
              <h2
                className="mt-5 text-[1.65rem] leading-snug text-white sm:text-[1.85rem]"
                style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
              >
                Resolve fintech support. Your agent handles it perfectly.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                The agent works wherever your customers reach you. Any channel, any market, any policy.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {heroFeatureShowcase.map((card) => (
                  <div
                    key={card.title}
                    className="flex flex-col gap-3 rounded-2xl p-4"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <div style={{ color: '#9BB0E8' }}>{card.icon}</div>
                    <h3
                      className="text-base leading-snug text-white"
                      style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-gray-400">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="support-escalate"
              className="mt-8 scroll-mt-32 rounded-3xl px-5 py-8 text-left sm:px-6"
              style={{ backgroundColor: '#faf8f5' }}
            >
              <span className="inline-block rounded-full border border-gray-900 px-4 py-1 text-sm font-medium text-gray-900">
                Escalate
              </span>
              <h2
                className="mt-5 text-[1.65rem] leading-snug text-gray-900 sm:text-[1.85rem]"
                style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
              >
                Your agent <em className="italic">escalates</em> before it guesses.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                supVision goes beyond deflecting tickets: routing by confidence, attaching live data, logging why it handed off, and keeping your team in control.
              </p>
              <div className="mt-6 border-b border-gray-900">
                {escalateAccordionItems.map((item) => (
                  <FeatureAccordionItem key={item.q} item={item} />
                ))}
              </div>
            </div>

            <VerifyMobileSection />
            <ComplyMobileSection />
            <ConnectMobileSection />
            </div>
          </div>

        </div>
      </section>

      {/* Compliance certificates */}
      <section className="py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div data-reveal className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6">
            {complianceCertCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col items-center overflow-visible rounded-2xl px-6 py-8 text-center"
                style={{ backgroundColor: '#F3EFE9', border: '1.5px solid #111827' }}
              >
                <div
                  className={[
                    'relative mb-6 flex items-center justify-center overflow-visible rounded-full border-2',
                    card.badgeOversize ? 'h-24 w-24' : 'h-28 w-28 p-4',
                  ].join(' ')}
                  style={{ borderColor: '#FB9A05', boxShadow: '0 0 20px rgba(251, 154, 5, 0.2)' }}
                >
                  <img
                    src={card.badge}
                    alt={card.badgeAlt}
                    className={
                      card.badgeOversize
                        ? 'h-[8.5rem] w-auto max-w-none object-contain'
                        : 'max-h-full max-w-full object-contain'
                    }
                  />
                </div>
                <h3
                  className="text-xl leading-snug text-gray-900"
                  style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 500 }}
                >
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              to="/security"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 bg-transparent px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900/5"
            >
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <SupportAgentFAQ />

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center"
          style={{
            backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2
            className="text-[2rem] leading-tight text-white sm:text-[3.25rem]"
            style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
          >
            Ready to deploy your Support Agent?
          </h2>
          <p className="mt-4 text-base text-blue-200">
            Most teams are live within 3 days. No platform migration. No 6-month project.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900"
            >
              <span>Book a demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0" style={{ color: '#214995' }}>
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
