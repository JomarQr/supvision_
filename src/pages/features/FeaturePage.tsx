import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import FeatureMobileShowcase from '../../components/features/FeatureMobileShowcase'

export interface FeaturePoint {
  icon: React.ReactNode
  title: string
  desc: string
}

export interface FeatureStep {
  step: string
  title: string
  desc: string
}

export interface FeaturePageData {
  badge: string
  title: string
  subtitle: string
  description: string
  highlights?: string[]
  coreImage?: string
  points: FeaturePoint[]
  steps: FeatureStep[]
  ctaTitle: string
  ctaDesc: string
}

const sharedFaqItems = [
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

function FeatureFAQItem({
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
        <span className="text-base font-medium leading-snug text-gray-900 lg:text-[17px]">{item.q}</span>
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

function FeatureFAQ({ mobileItems, desktopItems }: { mobileItems: typeof sharedFaqItems; desktopItems: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const items = desktopItems.length > 0 ? desktopItems : mobileItems

  return (
    <section className="bg-[#faf8f5] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl px-2 lg:max-w-7xl lg:px-0">
        <div data-reveal className="mb-8 text-center">
          <h2
            className="leading-tight"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '2.25rem' }}
          >
            <span className="text-gray-900">Frequently Asked Questions</span>
          </h2>
        </div>

        {/* Mobile: single column */}
        <div className="mt-6 flex flex-col gap-3 lg:hidden">
          {mobileItems.map((item, i) => (
            <FeatureFAQItem
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
            {items.filter((_, i) => i % 2 === 0).map((item) => {
              const i = items.indexOf(item)
              return (
                <FeatureFAQItem
                  key={item.q}
                  item={item}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              )
            })}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {items.filter((_, i) => i % 2 === 1).map((item) => {
              const i = items.indexOf(item)
              return (
                <FeatureFAQItem
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

export default function FeaturePage({ data, faq }: { data: FeaturePageData; faq: { q: string; a: string }[] }) {
  const { pathname } = useLocation()
  const url = `https://supvision.ai${pathname}`
  const title = `${data.title} — supVision`
  const desc = data.description.length > 160 ? data.description.slice(0, 157) + '...' : data.description
  return (
    <div className="pt-0" style={{ backgroundColor: '#faf8f5' }}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://supvision.ai/" },
            { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://supvision.ai/support-agent" },
            { "@type": "ListItem", "position": 3, "name": data.title, "item": url }
          ]
        })}</script>
      </Helmet>
      {/* Desktop hero */}
      <section className="hidden pb-0 pt-8 px-4 sm:px-6 lg:block lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl px-6">
          {data.coreImage ? (
            <div data-reveal className="mb-12 overflow-hidden rounded-3xl" style={{ border: '1.5px solid #111827' }}>
              <div className="grid lg:grid-cols-2">
                <div className="flex flex-col justify-center px-10 py-14 lg:px-14">
                  <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl">{data.title}</h1>
                  <p className="mt-4 text-base leading-relaxed text-gray-600">{data.subtitle}</p>
                  {data.highlights && data.highlights.length > 0 && (
                    <ul className="mt-8 space-y-4">
                      {data.highlights.map((h) => (
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
                  )}
                  <div className="mt-10">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#AAC6FF]"
                    >
                      Book a demo
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gray-900">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="relative min-h-[420px] overflow-hidden">
                  <img loading="lazy"
                    src={data.coreImage}
                    alt={data.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div data-reveal className="mb-12 max-w-3xl">
              <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl">{data.title}</h1>
              <p className="mt-4 text-xl font-medium text-gray-600">{data.subtitle}</p>
              <p className="mt-4 text-base leading-relaxed text-gray-500">{data.description}</p>
              <div className="mt-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#AAC6FF]"
                >
                  Book a demo
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gray-900">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <FeatureMobileShowcase data={data} />

      {/* CTA — above FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div
          data-reveal
          className="mx-auto max-w-4xl rounded-2xl px-6 py-12 text-center sm:px-8 sm:py-16"
          style={{
            backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2
            className="text-[1.75rem] leading-tight text-white sm:text-[3.25rem]"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
          >
            {data.ctaTitle}
          </h2>
          <p className="mt-4 text-sm text-blue-200 sm:text-base">{data.ctaDesc}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#AAC6FF]"
            >
              Book a demo
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gray-900">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <FeatureFAQ mobileItems={sharedFaqItems} desktopItems={faq.length > 0 ? faq : sharedFaqItems} />
    </div>
  )
}
