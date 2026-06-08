import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import IntegrationFinder from '../components/ui/IntegrationFinder'
import PageMeta from '../components/PageMeta'

const integrationsFaqItems = [
  {
    q: 'How quickly can supVision integrate with my existing tools?',
    a: 'Most integrations are live within 3 business days. supVision connects to Zendesk, Intercom, Freshdesk, Salesforce, HubSpot, and custom CRMs out of the box. No platform migration, no re-training your team — you configure escalation rules and go.',
  },
  {
    q: 'What if my tool isn\'t in the list?',
    a: 'If it has a REST API, we can connect it. Talk to us and we\'ll confirm compatibility before you sign anything. We regularly add new integrations based on customer requests.',
  },
  {
    q: 'Do integrations require developer involvement?',
    a: 'Most integrations require minimal technical setup — typically an API key and a few configuration steps. For custom CRMs or bespoke systems, our team handles the technical implementation as part of onboarding.',
  },
  {
    q: 'Can supVision connect to multiple tools at once?',
    a: 'Yes. supVision is designed to sit across your entire stack simultaneously — helpdesk, CRM, messaging channels, identity providers, and knowledge bases. Data flows between systems without manual routing.',
  },
  {
    q: 'Are integrations secure?',
    a: 'All integrations use encrypted connections (TLS 1.2+). supVision operates on a least-privilege access model — it only reads and writes what it needs to resolve or escalate a ticket. No raw card data is ever stored.',
  },
  {
    q: 'Can I control which data supVision can access per integration?',
    a: 'Yes. You set granular data access permissions per integration — supVision can be restricted to specific fields, record types, or ticket queues. Everything is auditable and configurable without engineering work.',
  },
]

function FAQItem({ item, isOpen, onToggle }: { item: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
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
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left"
      >
        <span className="text-base font-medium leading-snug text-gray-900 lg:text-[17px]">{item.q}</span>
        <span className={['flex h-6 w-6 flex-shrink-0 items-center justify-center text-gray-900 transition-transform duration-300', isOpen ? 'rotate-180' : ''].join(' ')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </span>
      </button>
      <div ref={bodyRef} className="px-6" style={{ maxHeight: '0px', opacity: 0, overflow: 'hidden', transition: 'max-height 0.35s ease, opacity 0.3s ease' }}>
        <p className="pb-6 text-sm leading-relaxed text-gray-500 lg:text-[15px]">{item.a}</p>
      </div>
    </div>
  )
}

function IntegrationsFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="bg-[#faf8f5] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl px-2 lg:max-w-7xl lg:px-0">
        <div data-reveal className="mb-8 text-center">
          <h2 className="leading-tight" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '2.25rem' }}>
            <span className="text-gray-900">Frequently Asked Questions</span>
          </h2>
        </div>
        {/* Mobile */}
        <div className="mt-6 flex flex-col gap-3 lg:hidden">
          {integrationsFaqItems.map((item, i) => (
            <FAQItem key={item.q} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
        {/* Desktop: two columns */}
        <div className="mt-6 hidden gap-3 lg:flex lg:items-start">
          <div className="flex flex-1 flex-col gap-3">
            {integrationsFaqItems.filter((_, i) => i % 2 === 0).map((item) => {
              const i = integrationsFaqItems.indexOf(item)
              return <FAQItem key={item.q} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            })}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {integrationsFaqItems.filter((_, i) => i % 2 === 1).map((item) => {
              const i = integrationsFaqItems.indexOf(item)
              return <FAQItem key={item.q} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Integrations() {
  return (
    <div className="pt-0" style={{ backgroundColor: '#faf8f5' }}>
      <PageMeta
        title="Integrations — supVision"
        description="Connect supVision to Intercom, Zendesk, Stripe, Twilio, and 100+ fintech tools. No engineering required. Live in days."
        path="/integrations"
      />

      <IntegrationFinder />

      <IntegrationsFAQ />

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center"
          style={{ backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h2
            className="text-[1.75rem] leading-tight text-white sm:text-[3.25rem]"
            style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
          >
            Don&apos;t see your tool?
          </h2>
          <p className="mt-4 text-base text-blue-200">
            If it has a REST API, we can connect it. Talk to us and we&apos;ll confirm compatibility before you sign anything.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F97316'; (e.currentTarget as HTMLElement).style.borderColor = '#F97316'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = '#fff'; (e.currentTarget as HTMLElement).style.color = ''; }}
            >
              <span>Ask about your stack</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
