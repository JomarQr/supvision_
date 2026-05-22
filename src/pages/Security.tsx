import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

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
]

const highlights = [
  { value: '100%', label: 'Of interactions logged with full audit trail' },
  { value: 'Zero', label: 'supVision employees with access to your customer data' },
  { value: 'AES-256', label: 'Encryption at rest across all customer data' },
  { value: 'TLS 1.3', label: 'Encryption in transit on every connection' },
]

const faqs = [
  { q: 'Can supVision employees access our customer data?', a: 'No. supVision operates on a zero-access architecture. No employee at supVision — including engineers and support staff — can read, export, or access your customer conversations, records, or PII. This is a structural property of the system, not a policy setting.' },
  { q: 'Do you sign NDAs? Is our data legally protected?', a: 'Yes. All client data is protected under a mutual NDA signed at the start of every engagement. Beyond the legal protection, supVision\'s architecture makes it technically impossible for our staff to access your customer records — the NDA formalises what the system already enforces. If you have a preferred NDA format, we can work with yours.' },
  { q: 'Does supVision train AI models on our data?', a: 'Never. Your customer data is not used to train, fine-tune, or improve any AI model — ours or anyone else\'s. All processing happens within your deployment boundary and the results are never shared outside your organisation.' },
  { q: 'How is customer data protected in transit and at rest?', a: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256. No raw card data ever touches our system. Our infrastructure is SOC 2-aligned and hosted in ISO 27001-certified data centres.' },
  { q: 'How does supVision handle GDPR right-to-erasure requests?', a: 'Submit a deletion request through the supVision dashboard or API and every record tied to that customer — conversation history, decision logs, escalation records — is purged within the required timeframe. No manual steps from your team are needed.' },
  { q: 'Is supVision PCI DSS compliant?', a: 'Yes. supVision is PCI DSS aligned. No raw card data ever enters our system — PII and payment data is stripped and tokenised before reaching the AI processing layer. We provide documentation to support your own PCI DSS audit requirements.' },
  { q: 'What happens to our data if we cancel?', a: 'You can export all your data before contract end. We provide a 30-day export window after cancellation. After that, all data is permanently deleted from our systems per GDPR requirements. We will confirm deletion in writing.' },
  { q: 'Who controls access permissions inside supVision?', a: 'Your administrators control all access. Role-based permissions let you define exactly what each team member can see and do — agents, compliance officers, and admins each get scoped access. There are no shared credentials and no privilege creep.' },
]

function FaqItem({ item, isOpen, onToggle }: { item: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
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
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-8 py-7 text-left"
      >
        <span className="text-lg font-semibold text-gray-900">{item.q}</span>
        <span className={[
          'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white transition-transform duration-300',
          isOpen ? 'rotate-45' : '',
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
        <p className="pb-7 text-base leading-relaxed text-gray-500">{item.a}</p>
      </div>
    </div>
  )
}

function FaqList() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="divide-y divide-gray-200">
      {faqs.map((faq, i) => (
        <FaqItem
          key={i}
          item={faq}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </div>
  )
}

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
            <div className="grid lg:grid-cols-2">
              {/* Left - text */}
              <div className="flex flex-col justify-center px-10 py-14 lg:px-14">
                <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#214995' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                    <path fillRule="evenodd" d="M8 1a2 2 0 0 1 2 2v.5h.5A1.5 1.5 0 0 1 12 5v8a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 13V5a1.5 1.5 0 0 1 1.5-1.5H6V3a2 2 0 0 1 2-2Zm0 1.5a.5.5 0 0 0-.5.5v.5h1V3a.5.5 0 0 0-.5-.5Z" clipRule="evenodd" />
                  </svg>
                  Security & Compliance
                </p>
                <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl">
                  Your data never leaves your control.
                </h1>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  supVision was built for regulated financial services from day one. That means your customer data is protected, anonymised, and never accessible to anyone outside your organisation — including us.
                </p>
                <div className="mt-10 grid grid-cols-2 gap-4">
                  {highlights.map((h) => (
                    <div key={h.label} className="rounded-2xl bg-white/70 px-4 py-4 border border-white">
                      <p className="text-xl font-black" style={{ color: '#214995' }}>{h.value}</p>
                      <p className="mt-1 text-xs leading-relaxed text-gray-500">{h.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - image */}
              <div className="relative hidden lg:block">
                <img
                  src="/Component 184 (1).png"
                  alt="Security"
                  className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-2xl object-cover"
                />
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

            {/* "We cannot see your data" card — replaces 6th item */}
            <div className="rounded-2xl p-6 shadow-sm" style={{ backgroundColor: '#111827' }}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 text-white">
                  <path fillRule="evenodd" d="M6.28 2.217A.75.75 0 0 0 5 2.75v.56l-.542.271A4.998 4.998 0 0 0 2 7.68V9a3 3 0 0 0 2.122 2.87L5 12.175V13.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-1.325l.878-.305A3 3 0 0 0 14 9V7.68a4.998 4.998 0 0 0-2.458-4.099L11 3.31v-.56a.75.75 0 0 0-1.28-.533L8 3.917 6.28 2.217Z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-white">We cannot see your data. By design.</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                supVision has no administrative access to your customer conversations, records, or PII. Zero-access architecture is not a setting — it is how the system is built.
              </p>
            </div>
          </div>

          {/* Certificates */}
          <div className="mt-20">
            <div className="mb-10 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Certifications</p>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">Recognised standards. Real accountability.</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500 mx-auto max-w-xl">
                supVision is built to the highest compliance standards in financial services. These certifications are not badges — they are proof that your data is handled correctly.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-8 flex flex-col items-center text-center shadow-sm">
                <img src="/badge/image.png" alt="PCI DSS" className="w-auto mb-6" style={{ height: '150px' }} />
                <div className="mt-auto">
                  <h4 className="text-base font-bold text-gray-900">PCI DSS Compliant</h4>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    Payment Card Industry Data Security Standard. supVision meets PCI DSS requirements — no raw card data ever enters our system. Payment-sensitive information is stripped and tokenised before any AI processing, keeping your card-data environment clean and audit-ready.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-8 flex flex-col items-center text-center shadow-sm">
                <img src="/badge/image 26 (3).png" alt="GDPR" className="w-auto mb-6" style={{ height: '120px' }} />
                <div className="mt-auto">
                  <h4 className="text-base font-bold text-gray-900">GDPR Compliant</h4>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    General Data Protection Regulation. supVision fully supports GDPR obligations — including right-to-erasure, data minimisation, and purpose limitation. Deletion requests are executed automatically, and no personal data is shared outside your deployment boundary without your explicit instruction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">Security questions answered.</h2>
          </div>
          <FaqList />
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
