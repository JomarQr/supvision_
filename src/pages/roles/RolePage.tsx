import React, { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import IndustryRoleMobileHero from '../../components/forWhom/IndustryRoleMobileHero'
import Lottie from 'lottie-react'

const roleFaqItems = [
  {
    q: 'How quickly can supVision go live?',
    a: 'Most teams are live within 3 business days. supVision connects to your existing helpdesk, CRM, and identity providers — no platform migration required. You configure escalation rules, set confidence thresholds, and go.',
  },
  {
    q: 'Does supVision integrate with our current tools?',
    a: 'Yes. supVision integrates with Zendesk, Intercom, Freshdesk, Salesforce, HubSpot, and custom CRMs out of the box. It also works across email, chat, WhatsApp, Telegram, and API channels — no rebuilding needed.',
  },
  {
    q: 'How does the AI know when to escalate to a human?',
    a: "You set confidence thresholds per topic. When supVision is below threshold — or encounters a query type you've flagged for human review — it escalates with full context attached: conversation history, customer profile, and its own decision trace.",
  },
  {
    q: 'Can we control which queries the AI handles automatically?',
    a: 'Completely. You define which topics supVision can automate, which require human approval, and which are blocked from automation entirely. Everything is configurable without engineering work.',
  },
  {
    q: 'Is customer data safe and compliant?',
    a: 'supVision is GDPR and PCI DSS aligned by design. PII and card data are never stored beyond the active session. All automated decisions are logged with a full audit trail — exportable for compliance review on demand.',
  },
  {
    q: 'What results should we expect?',
    a: '93% of tickets handled automatically, 68% reduction in support costs, and 10× faster response times on average. Most teams see measurable ROI within the first month of going live.',
  },
]

function RoleFAQItem({ item, isOpen, onToggle }: { item: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (isOpen) { el.style.maxHeight = el.scrollHeight + 'px'; el.style.opacity = '1' }
    else { el.style.maxHeight = '0px'; el.style.opacity = '0' }
  }, [isOpen])
  return (
    <div className="overflow-hidden rounded-2xl bg-white" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
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

function RoleFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="bg-[#faf8f5] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl px-2 lg:max-w-7xl lg:px-0">
        <div data-reveal className="mb-8 text-center">
          <h2 className="leading-tight" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '2.25rem' }}>
            <span className="text-gray-900">Frequently Asked Questions</span>
          </h2>
        </div>
        <div className="mt-6 flex flex-col gap-3 lg:hidden">
          {roleFaqItems.map((item, i) => (
            <RoleFAQItem key={item.q} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
        <div className="mt-6 hidden gap-3 lg:flex lg:items-start">
          <div className="flex flex-1 flex-col gap-3">
            {roleFaqItems.filter((_, i) => i % 2 === 0).map((item) => {
              const i = roleFaqItems.indexOf(item)
              return <RoleFAQItem key={item.q} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            })}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {roleFaqItems.filter((_, i) => i % 2 === 1).map((item) => {
              const i = roleFaqItems.indexOf(item)
              return <RoleFAQItem key={item.q} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
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
    <img src={logoUrl} alt="" className="h-7 w-7 rounded-full border-2 border-white bg-white object-contain" loading="lazy" onError={() => setErr(true)} />
  )
}

export interface RoleChallenge {
  icon: ReactNode | Record<string, unknown> | null
  title: string
  desc: string
}

function isLottieData(icon: unknown): icon is Record<string, unknown> {
  return icon !== null && typeof icon === 'object' && !('type' in (icon as any))
}

function ChallengeCard({ c }: { c: RoleChallenge }) {
  const [hovered, setHovered] = useState(false)
  const [waveKey, setWaveKey] = useState(0)
  const lottieRef = useRef<any>(null)
  const useLottie = isLottieData(c.icon)

  const handleEnter = () => {
    setHovered(true)
    setWaveKey(k => k + 1)
    if (useLottie) lottieRef.current?.goToAndPlay(0, true)
  }
  const handleLeave = () => {
    setHovered(false)
    if (useLottie) lottieRef.current?.goToAndStop(0, true)
  }

  return (
    <div
      className="rounded-2xl p-6 cursor-default transition-all duration-200"
      style={{
        border: hovered ? '1.5px solid #214995' : '1.5px solid #e5e7eb',
        backgroundColor: hovered ? '#f0f5ff' : '#fff',
        boxShadow: hovered ? '0 8px 32px rgba(33,73,149,0.13)' : '0 4px 20px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ border: '1.5px solid #111827', background: 'transparent', color: '#111827' }}>
        {useLottie
          ? <Lottie lottieRef={lottieRef} animationData={c.icon as Record<string, unknown>} autoplay={false} loop={false} style={{ width: 24, height: 24 }} />
          : c.icon as ReactNode
        }
      </div>
      <h3 className="text-sm font-bold text-gray-900">
        {String(c.title).split('').map((char, i) => (
          <span
            key={`${waveKey}-${i}`}
            style={{
              display: 'inline-block',
              animation: hovered ? `wave-char 0.45s ease-in-out ${i * 0.03}s` : undefined,
            }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{c.desc}</p>
    </div>
  )
}

export interface RoleMetric {
  value: string
  label: string
}

export interface RoleStack {
  label: string
  desc: string
  logos: { logoUrl: string; color: string; letter: string }[]
}

export interface RolePageData {
  badge: string
  title: string
  subtitle: string
  highlights: string[]
  heroImage?: string
  challenges: RoleChallenge[]
  stacks: RoleStack[]
  metrics: RoleMetric[]
  ctaTitle: string
  ctaDesc: string
}

export default function RolePage({ data }: { data: RolePageData }) {
  const { pathname } = useLocation()
  const url = `https://supvision.ai${pathname}`
  const title = `${data.title} — supVision`
  const desc = data.subtitle.length > 160 ? data.subtitle.slice(0, 157) + '...' : data.subtitle
  const hasImage = !!data.heroImage
  const heroPills = data.metrics.slice(0, 3).map((m) => m.value)
  const accordionItems = data.metrics.map((m) => ({ q: m.value, a: m.label }))

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
      </Helmet>

      <section className="px-4 pb-2 pt-4 sm:px-6 lg:hidden">
        <IndustryRoleMobileHero
          title={data.title}
          subtitle={data.subtitle}
          pills={heroPills}
          heroImage={data.heroImage}
          challenges={data.challenges.map(c => ({
            ...c,
            icon: isLottieData(c.icon)
              ? <Lottie animationData={c.icon as Record<string, unknown>} loop={false} style={{ width: 28, height: 28 }} />
              : c.icon as ReactNode,
          }))}
          accordionItems={accordionItems}
          darkBadge="By role"
        />
      </section>

      {/* Hero — desktop */}
      <section className="hidden px-4 pt-8 pb-4 sm:px-6 lg:block lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="overflow-hidden rounded-3xl border"
            style={{ backgroundColor: '#ffffff', borderColor: 'rgba(33,73,149,0.15)' }}
          >
            <div className={`grid ${hasImage ? 'lg:grid-cols-2' : ''}`}>

              {/* Left - text */}
              <div data-reveal className="flex flex-col justify-center px-10 py-14 lg:px-14">
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
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors"
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F97316'; (e.currentTarget as HTMLElement).style.borderColor = '#F97316'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; (e.currentTarget as HTMLElement).style.borderColor = '#111827'; (e.currentTarget as HTMLElement).style.color = ''; }}
                  >
                    Let's chat!
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right - image */}
              {hasImage && (
                <div data-reveal className="relative hidden lg:block" style={{ '--rd': '100ms' } as React.CSSProperties}>
                  <img loading="lazy"
                    src={data.heroImage}
                    alt={data.title}
                    className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-2xl object-cover"
                  />
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Challenges — desktop */}
      <section className="hidden py-24 px-4 sm:px-6 lg:block lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div data-reveal className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Challenges</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Challenges that we can solve for <span className="font-black">{data.title}</span>
            </h2>
          </div>
          <div data-reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ '--rd': '100ms' } as React.CSSProperties}>
            {data.challenges.map((c) => (
              <ChallengeCard key={String(c.title)} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Integrations / stacks */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-lg:pt-8">
        <div className="mx-auto max-w-7xl px-6">
          <div data-reveal className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Integrations</p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900">Popular automation stacks</h3>
          </div>
          <div data-reveal className="rounded-3xl border border-gray-100 bg-white px-10 py-10" style={{ '--rd': '100ms' } as React.CSSProperties}>
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F97316'; (e.currentTarget as HTMLElement).style.borderColor = '#F97316'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; (e.currentTarget as HTMLElement).style.borderColor = '#111827'; (e.currentTarget as HTMLElement).style.color = ''; }}
              >
                Book a demo
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24" style={{ paddingTop: '6rem' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div data-reveal className="sticky top-20 z-20 mb-10 py-6 text-center" style={{ backgroundColor: '#faf8f5' }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Benefits</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              supVision advantages for <span className="font-black">{data.title}</span>
            </h2>
            <p className="mt-3 text-base text-gray-500 mx-auto max-w-2xl">Purpose-built for regulated financial services - not retrofitted from a generic AI tool. These are the outcomes supVision consistently delivers.</p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" /></svg>,
                title: '24/7 autonomous support',
                desc: 'No SLA gaps, no shift changes. supVision resolves queries around the clock with no human fatigue - every customer gets an instant response.',
                dark: true,
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" /></svg>,
                title: 'Compliant by design',
                desc: 'FCA, GDPR, and PCI DSS aligned from day one. Not retrofitted from a generic AI tool - built for regulated financial services from the ground up.',
                dark: false,
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.268a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" /></svg>,
                title: 'Live in 3 days',
                desc: 'Connect your existing helpdesk, CRM, and KYC tools. No platform migration, no 6-month implementation. You configure, set thresholds, and go.',
                dark: true,
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" /></svg>,
                title: '93% ticket saves',
                desc: '93% of tickets handled by AI, 72% of all message flow managed, 49% of cases fully closed — your team focuses only on what genuinely needs them.',
                dark: false,
              },
            ].map((b, i) => (
              <div
                key={b.title}
                className="sticky"
                style={{ top: `${280 + i * 24}px`, zIndex: i === 3 ? 21 : i + 10 }}
              >
                <div
                  className="overflow-hidden rounded-2xl shadow-lg"
                  style={{ backgroundColor: b.dark ? '#111827' : '#fff', minHeight: '140px' }}
                >
                  <div className="flex items-start gap-5 p-8">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                      style={b.dark ? { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' } : { backgroundColor: '#eef2fb', color: '#214995' }}
                    >
                      {b.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: b.dark ? '#fff' : '#111827' }}>{b.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: b.dark ? 'rgba(255,255,255,0.6)' : '#6b7280' }}>{b.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics strip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl px-6">
          <div data-reveal className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Results</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">Measurable business impact</h2>
            <p className="mt-3 text-base text-gray-500">supVision delivers consistent, quantifiable improvements across support costs, response times, and team efficiency.</p>
          </div>
          <div data-reveal className="grid grid-cols-2 gap-3 lg:grid-cols-6 lg:gap-4" style={{ '--rd': '100ms' } as React.CSSProperties}>
            {data.metrics.slice(0, 3).map((m) => (
              <div key={m.label} className="col-span-1 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm lg:col-span-2 lg:px-5">
                <p className="text-2xl font-black sm:text-3xl" style={{ color: '#214995' }}>{m.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{m.label}</p>
              </div>
            ))}
            {data.metrics.slice(3, 5).map((m) => (
              <div key={m.label} className="col-span-1 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm lg:col-span-3 lg:px-5">
                <p className="text-3xl font-black" style={{ color: '#214995' }}>{m.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RoleFAQ />

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center"
          style={{ backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h2 className="text-3xl font-bold text-white">{data.ctaTitle}</h2>
          <p className="mt-4 text-base text-blue-200">{data.ctaDesc}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F97316'; (e.currentTarget as HTMLElement).style.borderColor = '#F97316'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = '#111827'; (e.currentTarget as HTMLElement).style.color = ''; }}
            >
              Book a demo
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              See pricing
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
