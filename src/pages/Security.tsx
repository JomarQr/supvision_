import { Link } from 'react-router-dom'

const trustItems = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5">
        <path fillRule="evenodd" d="M8 1a2 2 0 0 0-2 2v1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2V3a2 2 0 0 0-2-2Zm0 1.5a.5.5 0 0 1 .5.5v1h-1V3a.5.5 0 0 1 .5-.5ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
      </svg>
    ),
    title: 'Your data is yours alone',
    desc: 'supVision operates on a strict zero-retention model. No employee at supVision can read, access, or export your customer conversations. Your data never leaves your infrastructure boundary.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5">
        <path d="M8 1a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM3.5 8.5A3.5 3.5 0 0 0 0 12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 3.5 3.5 0 0 0-3.5-3.5h-9Z" />
      </svg>
    ),
    title: 'AI that never trains on your data',
    desc: 'We do not use your customer data to train or fine-tune any AI model. Your conversations, decisions, and customer records are never used outside your deployment - ever.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5">
        <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-6-3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7.25 7.75a.75.75 0 0 0 0 1.5h.25v2.5h-.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H8.5v-3.25a.75.75 0 0 0-.75-.75h-.5Z" clipRule="evenodd" />
      </svg>
    ),
    title: 'PII anonymised before AI processing',
    desc: 'Personally identifiable information is stripped and tokenised before it reaches the AI layer. The model resolves support queries without ever seeing raw names, account numbers, or card data.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5">
        <path fillRule="evenodd" d="M8 1a2 2 0 0 1 2 2v.5h.5A1.5 1.5 0 0 1 12 5v8a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 13V5a1.5 1.5 0 0 1 1.5-1.5H6V3a2 2 0 0 1 2-2Zm0 1.5a.5.5 0 0 0-.5.5v.5h1V3a.5.5 0 0 0-.5-.5Z" clipRule="evenodd" />
      </svg>
    ),
    title: 'End-to-end encryption',
    desc: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). No raw card data ever touches our system. Infrastructure is SOC 2-aligned and hosted in ISO 27001-certified data centres.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5">
        <path fillRule="evenodd" d="M4 1.75A2.75 2.75 0 0 1 6.75 4h2.5A2.75 2.75 0 0 1 12 1.75a.75.75 0 0 1 0 1.5A1.25 1.25 0 0 0 10.75 4.5v.25h.75A2.5 2.5 0 0 1 14 7.25v5.25A2.5 2.5 0 0 1 11.5 15h-7A2.5 2.5 0 0 1 2 12.5V7.25A2.5 2.5 0 0 1 4.5 4.75h.75V4.5A1.25 1.25 0 0 0 4 3.25a.75.75 0 0 1 0-1.5Z" clipRule="evenodd" />
      </svg>
    ),
    title: 'GDPR right-to-erasure, built in',
    desc: 'Submit a deletion request and every record tied to that customer - conversation history, decision logs, escalation records - is purged within the required timeframe. No manual steps needed.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5">
        <path fillRule="evenodd" d="M6.28 2.217A.75.75 0 0 0 5 2.75v.56l-.542.271A4.998 4.998 0 0 0 2 7.68V9a3 3 0 0 0 2.122 2.87L5 12.175V13.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-1.325l.878-.305A3 3 0 0 0 14 9V7.68a4.998 4.998 0 0 0-2.458-4.099L11 3.31v-.56a.75.75 0 0 0-1.28-.533L8 3.917 6.28 2.217Z" clipRule="evenodd" />
      </svg>
    ),
    title: 'Role-based access, no shared credentials',
    desc: 'Every team member has scoped access - agents see only what they need, compliance officers get read-only audit access, and admins control permissions centrally. No shared logins, no privilege creep.',
  },
]

const highlights = [
  { value: '100%', label: 'Of interactions logged with full audit trail' },
  { value: 'Zero', label: 'supVision employees with access to your customer data' },
  { value: 'AES-256', label: 'Encryption at rest across all customer data' },
  { value: 'TLS 1.3', label: 'Encryption in transit on every connection' },
]

export default function Security() {
  return (
    <div className="pt-24">

      {/* Hero */}
      <section className="px-4 pt-8 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="overflow-hidden rounded-3xl border"
            style={{ backgroundColor: '#EEF4FF', borderColor: 'rgba(33,73,149,0.15)' }}
          >
            <div className="px-10 py-14 lg:px-14">
              <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#214995' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                  <path fillRule="evenodd" d="M8 1a2 2 0 0 1 2 2v.5h.5A1.5 1.5 0 0 1 12 5v8a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 13V5a1.5 1.5 0 0 1 1.5-1.5H6V3a2 2 0 0 1 2-2Zm0 1.5a.5.5 0 0 0-.5.5v.5h1V3a.5.5 0 0 0-.5-.5Z" clipRule="evenodd" />
                </svg>
                Security & Compliance
              </p>
              <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl max-w-2xl">
                Your data never leaves your control.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-gray-600 max-w-2xl">
                supVision was built for regulated financial services from day one. That means your customer data is protected, anonymised, and never accessible to anyone outside your organisation — including us.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl">
                {highlights.map((h) => (
                  <div key={h.label} className="rounded-2xl bg-white/70 px-4 py-4 border border-white">
                    <p className="text-xl font-black" style={{ color: '#214995' }}>{h.value}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{h.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust items */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Data security</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">Built for regulated financial services.</h2>
            <p className="mt-3 text-base text-gray-500 mx-auto max-w-2xl">
              Every architectural decision in supVision was made with compliance in mind. These are not optional add-ons — they are structural properties of how the system works.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustItems.map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ backgroundColor: '#214995' }}>
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust banner */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-2xl px-8 py-6" style={{ backgroundColor: '#f0f4ff' }}>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: '#214995' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-6 w-6 text-white">
                  <path fillRule="evenodd" d="M8 1a2 2 0 0 1 2 2v.5h.5A1.5 1.5 0 0 1 12 5v8a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 13V5a1.5 1.5 0 0 1 1.5-1.5H6V3a2 2 0 0 1 2-2Zm0 1.5a.5.5 0 0 0-.5.5v.5h1V3a.5.5 0 0 0-.5-.5Z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">We cannot see your data. By design.</p>
                <p className="mt-0.5 text-sm text-gray-500">supVision has no administrative access to your customer conversations, records, or PII. Zero-access architecture is not a setting — it is how the system is built.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <img src="/badge/image.png" alt="PCI DSS" className="h-16 w-auto" />
              <img src="/badge/image 26 (3).png" alt="GDPR" className="h-14 w-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center"
          style={{ backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h2 className="text-3xl font-bold text-white">Compliant by default. Audit-ready always.</h2>
          <p className="mt-4 text-base text-blue-200">Regulatory-grade AI support for fintech teams. Live in 3 days.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white pl-6 pr-1.5 py-1.5 text-sm font-semibold"
            >
              <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]" style={{ backgroundColor: '#214995' }} />
              <span className="relative z-10 text-gray-900 transition-colors duration-300 group-hover:text-white">Book a demo</span>
              <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
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
