import { Link } from 'react-router-dom'

const categories = [
  {
    id: 'helpdesks',
    label: 'Helpdesks',
    icon: '🎧',
    desc: 'supVision runs on top of your existing helpdesk — no migration, no retraining your team.',
    integrations: [
      { name: 'Zendesk', desc: 'Full two-way integration. supVision reads tickets, resolves or updates them, and creates new ones on escalation. Agent context is attached as an internal note.' },
      { name: 'Intercom', desc: 'Native Intercom integration. The agent operates as an Intercom bot — using your existing inbox, tags, and assignment rules.' },
      { name: 'Freshdesk', desc: 'Connects via Freshdesk API. supVision handles inbound tickets autonomously and escalates with a structured summary pre-filled in the ticket.' },
      { name: 'Salesforce Service Cloud', desc: 'Deep Salesforce integration — reads case history, account data, and entitlements. Escalated cases land in Service Cloud with full context.' },
      { name: 'HubSpot Service Hub', desc: 'Reads contact history and deals. Resolved conversations are logged to the HubSpot timeline automatically.' },
    ],
  },
  {
    id: 'messaging',
    label: 'Messaging channels',
    icon: '💬',
    desc: 'Meet customers on the channels they already use — without running a separate agent per channel.',
    integrations: [
      { name: 'WhatsApp Business', desc: 'Full WhatsApp Business API integration including rich messages, quick replies, and document collection. Works with any BSP (Twilio, 360dialog, Meta direct).' },
      { name: 'Telegram', desc: 'Native Telegram Bot integration. Particularly popular for crypto and Web3 fintechs. Handles text, documents, and voice note transcription.' },
      { name: 'Email', desc: 'Inbound email support via SMTP/IMAP or direct API. Reads, classifies, resolves, and responds — with full threading preserved.' },
      { name: 'Live chat widget', desc: 'Drop-in JavaScript widget for your web app or mobile app. Customisable to match your brand. No SDK dependency.' },
      { name: 'Custom API channel', desc: 'REST API for embedding the agent in any surface — mobile apps, in-product flows, internal portals, or custom chat interfaces.' },
    ],
  },
  {
    id: 'banking',
    label: 'Core banking',
    icon: '🏦',
    desc: 'Connect your core banking system so the agent resolves queries with real account data, not scripted responses.',
    integrations: [
      { name: 'Custom core banking APIs', desc: 'REST or GraphQL integration with any core banking system. supVision reads accounts, balances, transactions, and card status in real time.' },
      { name: 'Mambu', desc: 'Native Mambu connector. Reads loan accounts, repayment schedules, and arrears status to resolve lending queries autonomously.' },
      { name: 'Thought Machine', desc: 'Connects to Thought Machine\'s Vault API. Reads account state, transaction history, and product configuration.' },
      { name: 'Temenos', desc: 'Integrates with Temenos Transact via standard APIs. Supports account queries, balance lookups, and transaction history retrieval.' },
      { name: 'Finastra', desc: 'API integration with Finastra\'s Open Finance platform. Reads account and payment data across the Finastra product suite.' },
    ],
  },
  {
    id: 'kyc',
    label: 'KYC providers',
    icon: '🪪',
    desc: 'Pull live verification status, rejection codes, and document requirements from your KYC provider in real time.',
    integrations: [
      { name: 'Sumsub', desc: 'Full Sumsub integration. Reads applicant status, verification level, rejection reasons, and required documents. Can trigger re-verification flows.' },
      { name: 'Jumio', desc: 'Connects to Jumio\'s identity verification API. Retrieves verification decisions, document data, and risk signals.' },
      { name: 'Onfido', desc: 'Native Onfido integration. Reads check results, report details, and adverse finding flags — and communicates them to customers in plain language.' },
      { name: 'Veriff', desc: 'Integrates with Veriff\'s decision API. Pulls session status, verification outcome, and failure reasons in real time.' },
      { name: 'Custom KYC APIs', desc: 'Any KYC provider with a REST API can be connected during onboarding. supVision maps your provider\'s status codes to human-readable responses.' },
    ],
  },
  {
    id: 'payments',
    label: 'Payment processors',
    icon: '💳',
    desc: 'Query transaction data in real time to resolve payment failures, disputes, and refund queries without a human agent.',
    integrations: [
      { name: 'Stripe', desc: 'Full Stripe API integration. Reads charges, payment intents, refunds, disputes, and customer objects. Can initiate refunds on eligible cases.' },
      { name: 'Nuvei', desc: 'Native Nuvei integration. Retrieves transaction status, decline codes, and settlement data. Supports dispute workflow integration.' },
      { name: 'Ecommpay', desc: 'Connects to Ecommpay\'s transaction API. Reads payment status, failure reasons, and chargeback data.' },
      { name: 'Adyen', desc: 'Full Adyen integration including payment, refund, and dispute management APIs. Reads risk flags and scheme-level dispute data.' },
      { name: 'Custom processor APIs', desc: 'Any payment processor with a REST API can be integrated. supVision maps decline codes and error states to customer-facing explanations.' },
    ],
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: '📊',
    desc: 'Give the agent full customer context — account history, segment, and relationship data — before it responds.',
    integrations: [
      { name: 'Salesforce CRM', desc: 'Reads contacts, accounts, cases, and opportunity history. Escalated cases are created in Salesforce with all context pre-filled.' },
      { name: 'HubSpot', desc: 'Reads contact properties, deal history, and lifecycle stage. Resolved conversations are logged to the HubSpot timeline.' },
      { name: 'Pipedrive', desc: 'Reads person and deal data. Supports activity logging for escalated conversations.' },
      { name: 'Zoho CRM', desc: 'Connects to Zoho CRM via REST API. Reads lead and contact data, and logs agent interactions as activities.' },
      { name: 'Custom CRM via API', desc: 'Any CRM with a REST or GraphQL API can be connected. supVision reads whatever customer fields are relevant to your support flows.' },
    ],
  },
]

export default function Integrations() {
  return (
    <div className="pt-24">

      {/* Hero */}
      <section className="px-4 pt-12 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-2xl font-bold uppercase text-gray-900">Integrations</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Works on top of your existing stack.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-gray-500">
              supVision connects to the tools your team already uses — helpdesks, messaging channels, core banking, KYC providers, payment processors, and CRMs. No platform migration. No ripping and replacing. Most teams are live in 3 days.
            </p>

            {/* Category nav */}
            <div className="mt-10 flex flex-wrap gap-2">
              {categories.map(cat => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.map((cat, ci) => (
        <section
          key={cat.id}
          id={cat.id}
          className={['py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24', ci % 2 === 0 ? 'bg-gray-50' : 'bg-white'].join(' ')}
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex items-start gap-4">
              <span className="text-4xl">{cat.icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{cat.label}</h2>
                <p className="mt-1 text-base text-gray-500">{cat.desc}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.integrations.map(item => (
                <div key={item.name} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gray-400">
                        <path fillRule="evenodd" d="M1 3.5A1.5 1.5 0 0 1 2.5 2h11A1.5 1.5 0 0 1 15 3.5v9A1.5 1.5 0 0 1 13.5 14h-11A1.5 1.5 0 0 1 1 12.5v-9Zm1.5 0v9h11v-9h-11Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                  <div className="mt-4 flex items-center gap-1.5">
                    <span className="flex h-2 w-2 rounded-full bg-green-400" />
                    <span className="text-xs font-medium text-gray-400">Available</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center"
          style={{ backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h2 className="text-3xl font-bold text-white">Don't see your tool?</h2>
          <p className="mt-4 text-base text-blue-200">
            If it has a REST API, we can connect it. Talk to us and we'll confirm compatibility before you sign anything.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100">
              Ask about your stack
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
