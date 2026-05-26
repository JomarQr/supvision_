import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import IndustryRoleMobileHero from '../../components/forWhom/IndustryRoleMobileHero'

const industryFaqItems = [
  {
    q: 'How quickly can supVision go live for my fintech?',
    a: 'Most teams are live within 3 business days. supVision connects to your existing helpdesk, CRM, and identity verification providers — no platform migration required. You configure escalation rules, set confidence thresholds, and go.',
  },
  {
    q: 'Does supVision work with our existing support stack?',
    a: 'Yes. supVision integrates with Zendesk, Intercom, Freshdesk, Salesforce, HubSpot, and custom CRMs out of the box. It also connects to WhatsApp, Telegram, email, and API channels — no rebuilding needed.',
  },
  {
    q: 'How does supVision handle regulated queries like KYC or disputes?',
    a: 'supVision is built specifically for regulated financial services. It handles identity verification queries, transaction disputes, chargebacks, and onboarding flows with full audit trail and GDPR/PCI DSS alignment — not retrofitted from a generic AI tool.',
  },
  {
    q: 'What happens when the AI cannot resolve an issue?',
    a: 'supVision escalates to a human agent with full context — conversation history, customer profile, decision trace, and reason for escalation. Your team never starts from zero. You control the confidence thresholds that trigger handoff.',
  },
  {
    q: 'Is our customer data safe?',
    a: 'Customer data is processed under GDPR. supVision operates on a zero-retention model for sensitive fields — PII and card data are never stored beyond the active session. All infrastructure is SOC 2-aligned with end-to-end encryption.',
  },
  {
    q: 'What results can we expect?',
    a: '93% of tickets handled by AI, 68% reduction in support costs, and 10× faster response times on average. Most customers see measurable ROI within the first month of going live.',
  },
]

function IndustryFAQItem({ item, isOpen, onToggle }: { item: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (isOpen) { el.style.maxHeight = el.scrollHeight + 'px'; el.style.opacity = '1' }
    else { el.style.maxHeight = '0px'; el.style.opacity = '0' }
  }, [isOpen])
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E2D8] bg-white">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left">
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

function IndustryFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="bg-[#faf8f5] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl px-2 lg:max-w-7xl lg:px-0">
        <div className="mb-8 text-center">
          <h2 className="leading-tight" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '2.25rem' }}>
            <span className="text-gray-900">Frequently Asked Questions</span>
          </h2>
        </div>
        <div className="mt-6 flex flex-col gap-3 lg:hidden">
          {industryFaqItems.map((item, i) => (
            <IndustryFAQItem key={item.q} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
        <div className="mt-6 hidden gap-3 lg:flex lg:items-start">
          <div className="flex flex-1 flex-col gap-3">
            {industryFaqItems.filter((_, i) => i % 2 === 0).map((item) => {
              const i = industryFaqItems.indexOf(item)
              return <IndustryFAQItem key={item.q} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            })}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {industryFaqItems.filter((_, i) => i % 2 === 1).map((item) => {
              const i = industryFaqItems.indexOf(item)
              return <IndustryFAQItem key={item.q} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function StackLogo({ logoUrl, color, letter }: { logoUrl: string; color: string; letter: string }) {
  const [err, setErr] = useState(false)
  return err ? (
    <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white font-bold text-white" style={{ backgroundColor: color, fontSize: '9px' }}>
      {letter}
    </span>
  ) : (
    <img src={logoUrl} alt="" className="h-7 w-7 rounded-full border-2 border-white bg-white object-contain" onError={() => setErr(true)} />
  )
}

export interface IndustryChallenge {
  icon: ReactNode
  title: string
  desc: string
}

export interface IndustryMetric {
  value: string
  label: string
}

export interface IndustryStack {
  label: string
  desc: string
  logos: { logoUrl: string; color: string; letter: string }[]
}

export interface IndustryPageData {
  badge: string
  title: string
  subtitle: string
  description: string
  highlights: string[]
  heroImage: string
  challenges: IndustryChallenge[]
  stacks: IndustryStack[]
  metrics: IndustryMetric[]
  ctaTitle: string
  ctaDesc: string
}

export default function IndustryPage({ data }: { data: IndustryPageData }) {
  const { pathname } = useLocation()
  const url = `https://supvision.ai${pathname}`
  const title = `AI Support for ${data.title} — supVision`
  const desc = data.description.length > 160 ? data.description.slice(0, 157) + '...' : data.description
  const heroPills = data.metrics.slice(0, 3).map((m) => m.value)
  const accordionItems = data.metrics.map((m) => ({ q: m.value, a: m.label }))

  return (
    <div className="pt-14 lg:pt-24" style={{ backgroundColor: '#faf8f5' }}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
      </Helmet>

      <section className="px-4 pb-2 pt-4 sm:px-6 lg:hidden">
        <IndustryRoleMobileHero
          title={data.title}
          subtitle={data.subtitle}
          pills={heroPills}
          heroImage={data.heroImage}
          challenges={data.challenges}
          accordionItems={accordionItems}
          darkBadge="By industry"
        />
      </section>

      {/* Hero — desktop */}
      <section className="hidden px-4 pt-8 pb-4 sm:px-6 lg:block lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="overflow-hidden rounded-3xl border-2"
            style={{ backgroundColor: 'transparent', borderColor: '#111827' }}
          >
            <div className="grid lg:grid-cols-2">

              {/* Left - text */}
              <div className="flex flex-col justify-center px-10 py-14 lg:px-14">
                <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl">
                  {data.title}
                </h1>

                <p className="mt-4 text-base leading-relaxed text-gray-600">{data.subtitle}</p>

                <ul className="mt-8 space-y-4">
                  {data.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: 'rgba(33,73,149,0.12)' }}
                      >
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
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#AAC6FF]"
                  >
                    Let's chat!
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gray-900">
                      <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right - image */}
              <div className="relative hidden lg:block">
                <img
                  src={data.heroImage}
                  alt={data.title}
                  className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-2xl object-cover"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Challenges — desktop */}
      <section className="hidden py-16 px-4 sm:px-6 lg:block lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl px-10 py-10" style={{ backgroundColor: '#1A1A1A' }}>
            <span
              className="inline-block rounded-full px-4 py-1 text-sm font-medium"
              style={{ backgroundColor: '#F5F0E8', color: '#1A1A1A' }}
            >
              By industry
            </span>
            <h2
              className="mt-5 text-center text-[2rem] leading-snug text-white lg:text-[2.25rem]"
              style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
            >
              Challenges we solve for <em className="italic">{data.title}</em>.
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
              {data.challenges.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col gap-3 rounded-2xl p-5"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div style={{ color: '#9BB0E8' }}>{card.icon}</div>
                  <h3
                    className="text-base leading-snug text-white sm:text-lg"
                    style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes — desktop */}
      <section className="hidden pb-16 px-4 sm:px-6 lg:block lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl px-10 py-10" style={{ backgroundColor: '#faf8f5', border: '1px solid #e8e2d9' }}>
            <span className="inline-block rounded-full border border-gray-900 px-4 py-1 text-sm font-medium text-gray-900">
              Outcomes
            </span>
            <h2
              className="mt-5 text-center text-[2rem] leading-snug text-gray-900 lg:text-[2.25rem]"
              style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
            >
              What <em className="italic">{data.title}</em> teams get.
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-px border border-gray-200 overflow-hidden rounded-2xl lg:grid-cols-5">
              {data.metrics.map((m) => (
                <div key={m.label} className="flex flex-col items-center bg-[#faf8f5] px-4 py-8 text-center">
                  <span className="text-4xl font-black text-gray-900 lg:text-5xl">{m.value}</span>
                  <p className="mt-2 text-sm leading-snug text-gray-500">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations / stacks */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-lg:pt-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Integrations</p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900">Popular automation stacks</h3>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white px-10 py-10">
            <p className="mb-8 text-sm leading-relaxed text-gray-500 w-full">
              supVision connects with the tools your team already uses. These stacks are pre-configured for {data.title} workflows — ready to deploy in days without custom development or platform migration.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {data.stacks.map((stack) => (
                <div
                  key={stack.label}
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
                >
                  <div className="flex flex-shrink-0 items-center -space-x-2">
                    {stack.logos.map((logo, i) => (
                      <StackLogo key={i} {...logo} />
                    ))}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold leading-snug text-gray-900">{stack.label}</p>
                    <p className="text-xs leading-snug text-gray-400">{stack.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/integrations"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              >
                See all integrations
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#AAC6FF]"
              >
                Book a demo
              </Link>
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
          <h2 className="text-3xl font-bold text-white">{data.ctaTitle}</h2>
          <p className="mt-4 text-base text-blue-200">{data.ctaDesc}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#AAC6FF]">
              Book a demo
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gray-900">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link to="/pricing" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <IndustryFAQ />

    </div>
  )
}
