import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const capabilities = [
  {
    title: 'KYC & Onboarding',
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
    desc: 'Email, chat, WhatsApp, Telegram, API — all in one',
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
    title: 'Payment declined',
    scenario: '"Why was my payment declined?"',
    resolution: 'Agent queries the payment processor, identifies the failure code (insufficient funds, 3DS failure, blocked card), and tells the customer exactly what happened and what to do — in under 30 seconds.',
  },
  {
    title: 'KYC stuck',
    scenario: '"My KYC is still pending after 3 days."',
    resolution: 'Agent checks the KYC provider status, surfaces the specific blocker (document quality, mismatched data), and walks the customer through re-submission — no human agent needed.',
  },
  {
    title: 'Disputed transaction',
    scenario: '"I didn\'t authorise this transaction."',
    resolution: 'Agent opens a dispute ticket, collects required information, applies your escalation rules, and — for eligible disputes — initiates an immediate provisional credit while the case is reviewed.',
  },
  {
    title: 'Limit increase',
    scenario: '"I need to increase my spending limit."',
    resolution: 'Agent checks eligibility criteria against the customer\'s account profile, explains the outcome, and either processes the request or routes it to the appropriate team with context pre-filled.',
  },
]


interface Integration {
  name: string
  category: string
  logo: string
  tagline: string
  functions: string[]
  description: string
}

const allIntegrations: Integration[] = [
  {
    name: 'Telegram', category: 'Messaging', logo: '/logos/telegram.png',
    tagline: 'Instant messaging & bot automation',
    functions: ['Receive & reply to customer messages', 'Send automated notifications', 'Handle file & document requests', 'Support group & channel queries', 'Seamless handoff to human agents'],
    description: 'supVision connects via Telegram Bot API to handle customer queries in real time. Customers message your Telegram bot and the Support Agent replies instantly — pulling live data from your core banking or KYC provider before every response.',
  },
  {
    name: 'Gmail', category: 'Messaging', logo: '/logos/gmail.png',
    tagline: 'Email support automation via Gmail',
    functions: ['Parse inbound support emails', 'Auto-reply with personalised answers', 'Classify and route by topic', 'Attach transaction or KYC data', 'Escalate complex threads to humans'],
    description: 'Connect your Gmail inbox to supVision and let the agent triage, classify, and reply to customer emails automatically. No more manually sorting payment failure reports or KYC status inquiries.',
  },
  {
    name: 'Mail / SMTP', category: 'Messaging', logo: 'https://logo.clearbit.com/mailgun.com',
    tagline: 'Generic email channel via SMTP',
    functions: ['Inbound email parsing', 'Outbound reply automation', 'Thread-aware conversations', 'HTML & plain-text responses', 'Attachment handling'],
    description: 'Works with any email provider via standard SMTP/IMAP. Ideal for teams using custom or self-hosted mail servers who want agent automation without switching email infrastructure.',
  },
  {
    name: 'Outlook', category: 'Messaging', logo: '/logos/outlook.png',
    tagline: 'Microsoft 365 email & calendar',
    functions: ['Read & respond to support emails', 'Calendar-based scheduling triggers', 'Teams escalation handoff', 'Shared mailbox support', 'Attachment & template handling'],
    description: 'Connect supVision to your Microsoft 365 Outlook mailbox. The Support Agent monitors your shared support inbox, responds to routine queries, and escalates complex cases to the right person via Teams.',
  },
  {
    name: 'Excel / Sheets', category: 'Reporting', logo: '/logos/excel.png',
    tagline: 'Export reports to Excel & Google Sheets',
    functions: ['Automated resolution reports', 'Ticket volume & SLA exports', 'KYC audit trail exports', 'Escalation rate tracking', 'Custom date-range extracts'],
    description: 'Schedule automatic exports of support metrics, resolution rates, and audit logs directly to Excel or Google Sheets. Share regulator-ready reports with your compliance team without manual data pulls.',
  },
  {
    name: 'WhatsApp', category: 'Messaging', logo: '/logos/whatsapp.png',
    tagline: 'Customer support over WhatsApp Business',
    functions: ['Real-time message handling', 'Rich media & document support', 'Template message automation', 'Multi-agent shared inbox', 'Read receipts & delivery status'],
    description: 'Connect your WhatsApp Business account and let supVision handle KYC queries, payment failures, and transaction disputes over the channel your customers prefer most.',
  },
  {
    name: 'Zendesk', category: 'Helpdesks', logo: '/logos/zendesk.png',
    tagline: 'AI layer on top of your Zendesk',
    functions: ['Auto-resolve tickets before agents see them', 'Attach live data to every ticket', 'Trigger macros based on intent', 'Escalate with full context pre-filled', 'SLA-aware prioritisation'],
    description: 'supVision sits on top of your existing Zendesk setup. It resolves tier-1 tickets automatically and — when escalation is needed — routes to the right agent with the full conversation history and live account data already attached.',
  },
  {
    name: 'Intercom', category: 'Helpdesks', logo: '/logos/intecom (1).png',
    tagline: 'Automated conversations in Intercom',
    functions: ['Auto-answer live chat queries', 'Pull CRM & account data in context', 'Trigger custom bots on keywords', 'Route to human inbox on escalation', 'CSAT & resolution tracking'],
    description: 'Deploy supVision inside your Intercom workspace. The agent handles live chat queries autonomously, surfacing real-time data from your payment processor or core banking API before every reply.',
  },
  {
    name: 'Freshdesk', category: 'Helpdesks', logo: '/logos/freshdesk.png',
    tagline: 'Smart ticket resolution in Freshdesk',
    functions: ['Classify & tag tickets automatically', 'Auto-resolve KYC & payment tickets', 'Pre-fill agent notes on escalation', 'SLA breach prevention triggers', 'Agent collision prevention'],
    description: 'supVision integrates with Freshdesk to classify, respond to, and close routine tickets without any agent involvement. Complex cases are escalated with full context pre-filled in the ticket.',
  },
  {
    name: 'Salesforce Service', category: 'Helpdesks', logo: '/logos/salesforce.png',
    tagline: 'Enterprise ticket automation',
    functions: ['Case auto-creation & classification', 'Einstein-compatible data layer', 'Escalation routing by skill & queue', 'Live account data in case sidebar', 'Full audit log per case'],
    description: 'Integrate supVision with Salesforce Service Cloud to automate case handling at enterprise scale. Every automated action is written back to the case record for a complete audit trail.',
  },
  {
    name: 'Twilio', category: 'Messaging', logo: 'https://logo.clearbit.com/twilio.com',
    tagline: 'SMS & voice channel automation',
    functions: ['Inbound SMS query handling', 'Outbound status notifications', 'Voice IVR integration', 'Two-factor verification flows', 'Multi-country number support'],
    description: 'Use Twilio to reach customers over SMS or voice. supVision handles inbound text queries and sends proactive notifications — payment confirmations, KYC status updates — without human involvement.',
  },
  {
    name: 'Mambu', category: 'Core banking', logo: 'https://logo.clearbit.com/mambu.com',
    tagline: 'Live account & loan data from Mambu',
    functions: ['Real-time balance lookups', 'Loan status & repayment data', 'Account tier & limit checks', 'Transaction history queries', 'Product eligibility checks'],
    description: 'supVision queries Mambu APIs in real time before every customer response. Balance queries, loan status checks, and account tier lookups are answered with live data — not cached guesses.',
  },
  {
    name: 'Thought Machine', category: 'Core banking', logo: 'https://logo.clearbit.com/thoughtmachine.net',
    tagline: 'Core banking data via Vault',
    functions: ['Vault API account reads', 'Smart contract state queries', 'Transaction event lookups', 'Product parameter checks', 'Ledger balance retrieval'],
    description: 'Connect supVision to Thought Machine Vault to answer account and transaction queries using live ledger data. Smart contract state and product parameters are surfaced in every agent response.',
  },
  {
    name: 'Temenos', category: 'Core banking', logo: 'https://logo.clearbit.com/temenos.com',
    tagline: 'Enterprise core banking integration',
    functions: ['Account & product data reads', 'Transaction history lookup', 'Card status & limit queries', 'Customer profile retrieval', 'Multi-entity support'],
    description: 'Integrate with Temenos T24 or Transact to give the Support Agent access to live account, product, and transaction data across multiple banking entities.',
  },
  {
    name: 'Finastra', category: 'Core banking', logo: 'https://logo.clearbit.com/finastra.com',
    tagline: 'Fusion-powered banking data',
    functions: ['FusionFabric API reads', 'Account & payment data retrieval', 'Customer profile access', 'Transaction dispute data', 'Multi-product coverage'],
    description: 'supVision connects to Finastra FusionFabric APIs to retrieve live customer and account data, enabling accurate, real-time responses to banking queries.',
  },
  {
    name: 'Sumsub', category: 'KYC providers', logo: 'https://logo.clearbit.com/sumsub.com',
    tagline: 'KYC status & document checks',
    functions: ['Verification status lookups', 'Document rejection reason retrieval', 'Re-submission flow triggers', 'Risk level & flags surfacing', 'Applicant timeline queries'],
    description: 'supVision queries the Sumsub API to surface real-time KYC verification status, document rejection reasons, and risk flags — enabling the agent to guide customers through re-submission without a human.',
  },
  {
    name: 'Jumio', category: 'KYC providers', logo: 'https://logo.clearbit.com/jumio.com',
    tagline: 'Identity verification data in real time',
    functions: ['Transaction status checks', 'Liveness result retrieval', 'Document quality feedback', 'Watchlist screening status', 'Escalation trigger on risk flags'],
    description: 'Connect supVision to Jumio to answer questions about identity verification status, document quality issues, and liveness check results — resolved automatically, not manually.',
  },
  {
    name: 'Onfido', category: 'KYC providers', logo: 'https://logo.clearbit.com/onfido.com',
    tagline: 'Onfido verification workflow automation',
    functions: ['Check status & result lookups', 'Report detail retrieval', 'SDK re-trigger flows', 'Adverse action reason surfacing', 'Breakdown by check type'],
    description: 'supVision reads Onfido check results and surfaces specific failure reasons to the customer — telling them exactly which document failed and what to do next, automatically.',
  },
  {
    name: 'Veriff', category: 'KYC providers', logo: 'https://logo.clearbit.com/veriff.com',
    tagline: 'Veriff session & decision data',
    functions: ['Session status queries', 'Decision reason lookups', 'Re-verification triggers', 'Fraud signal surfacing', 'Audit log access'],
    description: 'Pull Veriff session decisions and decline reasons in real time. The Support Agent tells customers exactly why their verification failed and guides them through the retry process.',
  },
  {
    name: 'Stripe', category: 'Payment processors', logo: 'https://logo.clearbit.com/stripe.com',
    tagline: 'Full Stripe payment data access',
    functions: ['Charge status & failure codes', 'Refund initiation & status', 'Dispute & chargeback filing', 'Subscription & invoice data', 'Payment method checks'],
    description: 'supVision queries the Stripe API to diagnose payment failures, initiate refunds, and file disputes — all automatically. Customers get the exact failure reason and next steps in under 30 seconds.',
  },
  {
    name: 'Adyen', category: 'Payment processors', logo: 'https://logo.clearbit.com/adyen.com',
    tagline: 'Enterprise payment data from Adyen',
    functions: ['Payment result lookups', 'Refund & reversal initiation', 'Chargeback case management', 'Shopper account data', 'Settlement & balance checks'],
    description: 'Connect supVision to Adyen to handle payment failure queries, initiate refunds, and manage chargeback flows — with live data from the Adyen management API for every interaction.',
  },
  {
    name: 'Nuvei', category: 'Payment processors', logo: 'https://logo.clearbit.com/nuvei.com',
    tagline: 'Nuvei transaction & dispute data',
    functions: ['Transaction status queries', 'Decline code lookup', 'Refund request automation', 'Alternative payment method data', 'Fraud flag retrieval'],
    description: 'supVision integrates with Nuvei to surface transaction statuses, decline reasons, and refund eligibility — giving customers instant answers on payment failures.',
  },
  {
    name: 'Ecommpay', category: 'Payment processors', logo: 'https://logo.clearbit.com/ecommpay.com',
    tagline: 'Ecommpay payment query automation',
    functions: ['Payment status lookups', 'Failure reason surfacing', 'Chargeback initiation', 'Settlement reports', 'Multi-currency support'],
    description: 'Pull live payment data from Ecommpay to answer customer queries about declined transactions, refund timelines, and chargeback status — automatically, in any currency.',
  },
  {
    name: 'HubSpot', category: 'CRM', logo: 'https://logo.clearbit.com/hubspot.com',
    tagline: 'Customer data from HubSpot CRM',
    functions: ['Contact & company profile reads', 'Deal & pipeline status', 'Open ticket history', 'Interaction timeline', 'Custom property lookups'],
    description: 'supVision reads HubSpot contact and company records to personalise every response. The agent knows the customer\'s history, open tickets, and account tier before it says a word.',
  },
  {
    name: 'Salesforce CRM', category: 'CRM', logo: '/logos/salesforce.png',
    tagline: 'Enterprise CRM data at agent level',
    functions: ['Account & contact reads', 'Opportunity & case data', 'Entitlement & SLA checks', 'Activity timeline access', 'Custom object support'],
    description: 'Connect supVision to Salesforce CRM to pull full account context before every response. Entitlements, case history, and custom objects are all surfaced to the agent in real time.',
  },
  {
    name: 'Pipedrive', category: 'CRM', logo: 'https://logo.clearbit.com/pipedrive.com',
    tagline: 'Deal & contact data from Pipedrive',
    functions: ['Contact profile lookups', 'Deal stage & value data', 'Activity & note history', 'Pipeline status surfacing', 'Custom field access'],
    description: 'Pull customer and deal data from Pipedrive to give the Support Agent full context on every interaction — stage, value, and open activities — without switching tools.',
  },
  {
    name: 'Zoho CRM', category: 'CRM', logo: 'https://logo.clearbit.com/zoho.com',
    tagline: 'Zoho customer data integration',
    functions: ['Lead & contact reads', 'Module & custom view access', 'Case & ticket history', 'Workflow trigger support', 'Multi-org compatibility'],
    description: 'Connect supVision to Zoho CRM to access full customer records, module data, and ticket history — personalising agent responses with live context from your CRM.',
  },
]

const integrationCategories = ['All', 'Helpdesks', 'Messaging', 'Core banking', 'KYC providers', 'Payment processors', 'CRM', 'Reporting']

const VISIBLE_LIMIT = 14

function IntegrationFinder() {
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState<Integration | null>(null)
  const [showAll, setShowAll] = useState(false)

  const filtered = active === 'All' ? allIntegrations : allIntegrations.filter(i => i.category === active)
  const showLimit = active === 'All' && !showAll
  const visible = showLimit ? filtered.slice(0, VISIBLE_LIMIT) : filtered
  const hidden = showLimit ? filtered.length - VISIBLE_LIMIT : 0

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#f5f4f0' }}>
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl">
            Find your{' '}
            <span className="rounded-xl px-3 py-1" style={{ backgroundColor: 'rgba(33,73,149,0.12)', color: '#214995' }}>
              integration
            </span>{' '}
            in seconds
          </h2>
          <p className="mt-4 text-base text-gray-500">supVision connects to your existing stack. No migration required.</p>
        </div>

        {/* Category filters */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {integrationCategories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActive(cat); setShowAll(false) }}
              className="rounded-full border px-5 py-2 text-sm font-semibold transition-colors"
              style={active === cat
                ? { backgroundColor: '#214995', borderColor: '#214995', color: '#fff' }
                : { backgroundColor: '#fff', borderColor: '#e5e7eb', color: '#374151' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid — 5 per row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {visible.map(item => (
            <button
              key={item.name}
              onClick={() => setSelected(item)}
              className="flex flex-col items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm text-left transition-shadow hover:shadow-md hover:border-gray-300"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-10 w-10 rounded-xl object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <div>
                <p className="text-sm font-bold text-gray-900">{item.name}</p>
                <p className="mt-0.5 text-xs text-gray-400">{item.tagline}</p>
              </div>
              <ul className="space-y-1">
                {item.functions.slice(0, 3).map(fn => (
                  <li key={fn} className="flex items-start gap-1.5 text-xs text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="mt-0.5 h-3 w-3 flex-shrink-0" style={{ color: '#214995' }}>
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                    {fn}
                  </li>
                ))}
              </ul>
            </button>
          ))}

          {/* +N more card */}
          {hidden > 0 && (
            <button
              onClick={() => setShowAll(true)}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-white p-5 text-center transition-colors hover:border-gray-400"
            >
              <span className="text-2xl font-black text-gray-900">+{hidden}</span>
              <span className="text-xs font-semibold text-gray-400">more integrations</span>
            </button>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <p className="text-sm text-gray-500">Can't find your tool? Let's chat about a custom integration</p>
          <Link
            to="/contact"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: '#214995' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex items-center gap-4">
              <img
                src={selected.logo}
                alt={selected.name}
                className="h-14 w-14 rounded-2xl object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <div>
                <p className="text-xl font-black text-gray-900">{selected.name}</p>
                <span className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: 'rgba(33,73,149,0.1)', color: '#214995' }}>
                  {selected.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="mt-5 text-sm leading-relaxed text-gray-600">{selected.description}</p>

            {/* Functions */}
            <div className="mt-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">What you can automate</p>
              <ul className="space-y-2">
                {selected.functions.map(fn => (
                  <li key={fn} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(33,73,149,0.1)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3" style={{ color: '#214995' }}>
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {fn}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Link
                to="/contact"
                onClick={() => setSelected(null)}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full pl-6 pr-1.5 py-1.5 text-sm font-bold text-white"
                style={{ backgroundColor: '#111827' }}
              >
                <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]" style={{ backgroundColor: '#214995' }} />
                <span className="relative z-10">Set up this integration</span>
                <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

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
      <section className="px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
            <div className="grid lg:grid-cols-2">

              {/* Left — text */}
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
                    'Resolves KYC, disputes, and payment queries autonomously in under 2 minutes',
                    'Connects to your CRM, core banking, and KYC provider — answers with real data',
                    'Compliant by design — audit logs, escalation rules, and zero financial advice risk',
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

              {/* Right — diagram */}
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

      {/* Use cases — phone mockups */}
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
