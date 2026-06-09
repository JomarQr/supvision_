import { FormEvent, MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'
import inPaymentAnim from '../assets/icons_for_in_hero/in_payment.json'
import inBankAnim from '../assets/icons_for_in_hero/in_bank.json'
import inWeb3Anim from '../assets/icons_for_in_hero/in_web3.json'
import inLendAnim from '../assets/icons_for_in_hero/in_lend.json'
import inPrivacyAnim from '../assets/icons_for_in_hero/in_privacy.json'
import expandGloballyAnim from '../assets/icons_for_hero/expand_globally.json'
import cutCostAnim from '../assets/icons_for_hero/cut_cost.json'
import heartAnim from '../assets/icons_for_hero/heart.json'
import lightningAnim from '../assets/icons_for_hero/lightning.json'
import PageMeta from '../components/PageMeta'
import { submitContactForm } from '../lib/contactApi'
import HeroDashboard, { type DashboardView } from '../components/home/HeroDashboard'
import { LANGUAGES, LANG_SLOT } from '../components/home/solutionShowcaseData'

const HANDOFF_SCENARIOS = [
  { customer: 'Alex M.', issue: 'Unauthorized £3,200 transfer', agent: 'Dmitri K.', role: 'Fraud Specialist', userMsg: "I didn't authorize this — £3,200 gone", botMsg: 'Reviewing your account activity now…', context: ['High-value transaction', 'IP location mismatch', 'First-time occurrence'] },
  { customer: 'Sara L.', issue: 'KYC failure — document rejected', agent: 'Priya N.', role: 'Compliance Lead', userMsg: 'My ID keeps getting rejected', botMsg: 'Let me pull your verification status…', context: ['3rd upload attempt', 'Document quality low', 'Expiry date unclear'] },
  { customer: 'James W.', issue: 'Duplicate charge — £890 merchant', agent: 'Carlos R.', role: 'Disputes Team', userMsg: 'Charged twice at checkout — both went through', botMsg: 'Checking your recent transactions…', context: ['Duplicate charge detected', 'Merchant: Shopify Store', 'Same amount × 2'] },
]
const SANDBOX_QUERIES = [
  { query: "What's my daily withdrawal limit?", response: 'Your current ATM limit is £500/day. You can request an increase in Settings.', checks: ['Policy compliant', 'Correct data access', 'Tone: friendly'] },
  { query: 'Transfer £800 to John Smith', response: "I'll need to verify your identity before processing this transfer.", checks: ['Identity check triggered', 'Limit: within range', 'Fraud rules: passed'] },
  { query: 'Why was my card declined?', response: 'Your card was declined due to an unusual location. This has been flagged for review.', checks: ['Escalation rule triggered', 'Customer notified', 'Tone: correct'] },
]

const INTEGRATION_CATEGORIES = [
  { label: 'Helpdesk',  tools: ['Zendesk', 'Freshdesk', 'Intercom'] },
  { label: 'CRM',       tools: ['Salesforce CRM', 'HubSpot', 'Pipedrive', 'Zoho CRM'] },
  { label: 'Messaging', tools: ['WhatsApp', 'Telegram'] },
  { label: 'Email',     tools: ['Gmail'] },
]

const TESTIMONIALS = [
  {
    name: 'Ruslan V.',
    title: 'Head of Operations',
    quote: <>We went from a <strong className="text-gray-900">4-hour average resolution time to under 2 minutes</strong> for verification queries. <strong className="text-gray-900">Ops costs dropped and CSAT went up</strong> at the same time. supVision made the whole support flow <strong className="text-gray-900">predictable and auditable.</strong></>,
    stats: [
      { value: '< 2 min', label: 'avg verification resolution time' },
      { value: '1 month',  label: 'to measurable ROI' },
    ],
  },
  {
    name: 'Alan N.',
    title: 'Customer Success Lead',
    quote: <>We <strong className="text-gray-900">cut support headcount by 30%</strong> while handling <strong className="text-gray-900">3× the ticket volume.</strong> The agents that stayed are focused on real escalations, not copy-pasting the same repetitive answers all day. <strong className="text-gray-900">ROI showed up faster</strong> than any tool we&apos;ve ever deployed.</>,
    stats: [
      { value: '30%', label: 'reduction in support headcount' },
      { value: '3×',  label: 'ticket volume, same team' },
    ],
  },
  {
    name: 'Cyril B.',
    title: 'Compliance Lead',
    quote: <>Our compliance team was skeptical about automating disputes. But supVision <strong className="text-gray-900">handles edge cases better than we expected</strong>, and <strong className="text-gray-900">logs every decision with a full rationale and timestamp.</strong> When our auditors asked for a trail, we <strong className="text-gray-900">exported it in minutes.</strong></>,
    stats: [
      { value: '100%',   label: 'automated decision audit coverage' },
      { value: '< 5 min', label: 'regulator export time' },
    ],
  },
  {
    name: 'Dmytriy K.',
    title: 'Head of Customer Support',
    quote: <>We used to hire new people every time we expanded to a new geography. Now we <strong className="text-gray-900">automatically serve all regions</strong> — Europe, the US, Asia, the Middle East — <strong className="text-gray-900">without adding a single agent.</strong> The setup took <strong className="text-gray-900">three days.</strong></>,
    stats: [
      { value: '4 regions', label: 'served without new hires' },
      { value: '3 days',    label: 'to go live globally' },
    ],
  },
]

const FEATURE_TABS: Array<{ key: string; label: string; heading: React.ReactNode; description: string; features: { title: string; body: string; view: DashboardView }[]; reversed?: boolean }> = [
  {
    key: 'Control',
    label: 'CONTROL',
    heading: <>Define <strong style={{ fontWeight: 500 }}>exactly</strong> how supVision <strong style={{ fontWeight: 500 }}>responds</strong></>,
    description: 'supVision goes beyond automate-or-escalate. Set confidence thresholds, restrict topics, and require human approval for sensitive actions — on your terms.',
    features: [
      { title: 'Confidence Thresholds', body: 'Set per-topic confidence levels so supVision only automates when certain enough. Below threshold, it escalates with full context attached.', view: 'confidence' },
      { title: 'Topic Restrictions', body: 'Block specific topics from being handled automatically — legal, compliance, or regulatory queries go straight to humans.', view: 'topic-restrictions' },
      { title: 'Data Access Controls', body: 'Granular permissions for what data the AI can read, write, or reference during a conversation.', view: 'data-access' },
    ],
  },
  {
    key: 'Adaptivity',
    label: 'ADAPTIVITY',
    heading: <>An AI that <strong style={{ fontWeight: 500 }}>shapes itself</strong> to your business</>,
    description: 'supVision is not a generic chatbot. It learns your workflows, adapts to your tone, and adjusts its behavior per channel, customer tier, and context — automatically.',
    features: [
      { title: 'Continuous Learning', body: 'Every resolved ticket and agent correction feeds back into the model. supVision gets sharper over time without any manual retraining.', view: 'continuous-learning' as DashboardView },
      { title: 'Industry Presets', body: 'Pre-configured behaviour for neobanks, payment processors, crypto platforms, and lending — tuned for the queries and compliance norms of each vertical.', view: 'industry-presets' as DashboardView },
      { title: 'Tone & Style Controls', body: 'Define how supVision communicates — formal, friendly, concise — and apply different styles per channel or customer segment.', view: 'tone-style' as DashboardView },
    ],
  },
  {
    key: 'Visibility',
    label: 'VISIBILITY',
    heading: <>See <strong style={{ fontWeight: 500 }}>exactly</strong> what your AI <strong style={{ fontWeight: 500 }}>is doing</strong></>,
    description: 'Every conversation, decision, and escalation is logged with full context. Get the audit trail, confidence scores, and resolution analytics your compliance team actually needs — exportable in minutes.',
    features: [
      { title: 'Audit Logs', body: 'Full conversation history with timestamps, confidence scores, and escalation reasons — exportable for compliance.', view: 'audit-logs' as DashboardView },
      { title: 'Confidence Reporting', body: 'See where the AI is uncertain — identify gaps in your knowledge base before they affect customers.', view: 'confidence-reporting' as DashboardView },
      { title: 'Resolution Analytics', body: 'Track auto-resolution rates, avg. response times, and escalation volume by topic, channel, and time period.', view: 'analytics' as DashboardView },
    ],
  },
]


function LangColumn({ items, pxPerSec, reverse = false }: { items: Array<{ name: string; flag: string }>; pxPerSec: number; reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let y = reverse ? el.scrollHeight / 2 : 0
    let last: number | null = null
    let raf: number
    const tick = (t: number) => {
      if (last !== null) {
        const half = el.scrollHeight / 2
        if (reverse) {
          y -= pxPerSec * (t - last) / 1000
          if (y <= 0) y += half
        } else {
          y += pxPerSec * (t - last) / 1000
          if (y >= half) y -= half
        }
        el.style.transform = `translateY(-${y}px)`
      }
      last = t
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [pxPerSec, reverse])
  return (
    <div ref={ref} className="flex-1 flex flex-col" style={{ willChange: 'transform' }}>
      {[...items, ...items].map((lang, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 9999, padding: '9px 12px', border: '1px solid #e5e7eb', flexShrink: 0, marginBottom: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <img src={lang.flag} alt={lang.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lang.name}</span>
        </div>
      ))}
    </div>
  )
}

function WhatIsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [slideRight, setSlideRight] = useState(false)
  const didSlide = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    // Animation covers the scroll from "section enters bottom" to "section fully at top"
    const animDist = window.innerHeight * 1.1
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const entered = window.innerHeight - rect.top
      setProgress(Math.max(0, Math.min(1, entered / animDist)))
      // Trigger slide the moment the section locks at top (sticky kicks in)
      if (rect.top <= 0 && !didSlide.current) {
        didSlide.current = true
        setSlideRight(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
  const p1 = easeOut(Math.min(1, progress))

  const rotateX = 22 * (1 - p1)
  const rotateY = -14 * (1 - p1)
  const scale = 0.45 + 0.55 * p1

  // Dashboard: width 70% always.
  // Centered: translateX(-50%) → left edge at 50%-35%=15%
  // Slid right: translateX(-17%) → left edge at 50%-11.9%=38%, right edge at 108% (clipped by viewport)
  const dashWidth = 70
  const dashTX = slideRight ? -17 : -50

  const controlTab = FEATURE_TABS[0]
  const [openFeature, setOpenFeature] = useState(0)

  return (
    <div ref={containerRef} className="hidden lg:block" style={{ height: '240vh' }}>
      <div className="sticky top-0" style={{ height: '100vh', backgroundColor: '#faf8f5' }}>

        {/* Centered text — visible before slide, fades out after */}
        <div
          className="absolute inset-x-0 flex flex-col items-center text-center pointer-events-none"
          style={{
            top: '12%', padding: '0 10%',
            opacity: slideRight ? 0 : 1,
            transform: slideRight ? 'translateY(-16px)' : 'translateY(0)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <h2 style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: 'clamp(2rem, 3vw, 2.75rem)', color: '#111827', lineHeight: 1.2 }}>
            What is supVision?
          </h2>
          <p style={{ marginTop: '0.75rem', fontSize: '1rem', lineHeight: 1.7, color: '#6b7280', maxWidth: '56ch' }}>
            supVision is the platform that lets you run an{' '}
            <strong style={{ color: '#374151' }}>autonomous AI support agent</strong>{' '}
            — and stay <strong style={{ color: '#374151' }}>fully in control</strong>{' '}
            of how it behaves. Set the rules, define the limits, and let it work.{' '}
            <strong style={{ color: '#374151' }}>No surprises, no black boxes.</strong>{' '}
            Your agent, on your terms.
          </p>
        </div>

        {/* Left column — fades in after slide with heading + feature list */}
        <div
          className="absolute flex flex-col justify-center"
          style={{
            left: '6%', top: 0, bottom: 0, width: '36%',
            opacity: slideRight ? 1 : 0,
            transform: slideRight ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
            pointerEvents: slideRight ? 'auto' : 'none',
          }}
        >
          <h2 style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)', color: '#111827', lineHeight: 1.2 }}>
            What is supVision?
          </h2>
          <p style={{ marginTop: '0.6rem', fontSize: '0.9rem', lineHeight: 1.65, color: '#6b7280' }}>
            supVision is the platform that lets you run an{' '}
            <strong style={{ color: '#374151' }}>autonomous AI support agent</strong>{' '}
            — and stay <strong style={{ color: '#374151' }}>fully in control</strong>{' '}
            of how it behaves.
          </p>
          <div className="mt-6 divide-y divide-gray-200">
            {controlTab.features.map((f, i) => (
              <div key={f.title}>
                <button
                  onClick={() => setOpenFeature(openFeature === i ? -1 : i)}
                  className="flex w-full items-center justify-between py-3.5 text-left"
                >
                  <span className={`text-base font-semibold transition-colors ${openFeature === i ? 'text-gray-900' : 'text-gray-400'}`}>{f.title}</span>
                  <span className="ml-4 flex-shrink-0 text-xl leading-none text-gray-400">{openFeature === i ? '−' : '+'}</span>
                </button>
                {openFeature === i && (
                  <p className="pb-3.5 text-sm leading-relaxed text-gray-500">{f.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard — scroll-driven tilt+grow, then auto-slides right */}
        <div
          className="absolute"
          style={{
            left: '50%', top: '56%', width: `${dashWidth}%`,
            transform: `translateX(${dashTX}%) translateY(-50%) perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
            transformOrigin: 'center top',
            willChange: 'transform',
            transition: slideRight ? 'transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            boxShadow: '0 32px 100px rgba(0,0,0,0.20), 0 8px 32px rgba(0,0,0,0.10)',
          }}
        >
          <HeroDashboard animated view="default" beige />
        </div>

      </div>
    </div>
  )
}

function FeatureTabSection({ showHeading = true }: { showHeading?: boolean } = {}) {
  const [activeKey, setActiveKey] = useState(FEATURE_TABS[0].key)
  const [openIdx, setOpenIdx] = useState(0)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const tab = FEATURE_TABS.find(t => t.key === activeKey)!
  const reversed = tab.reversed ?? false
  const dashView: DashboardView = tab.features[openIdx]?.view ?? 'default'

  return (
    <section className="py-12 lg:py-20">
      <div>

        {/* Heading */}
        {showHeading && (
          <div data-reveal className="mb-10 text-center px-2">
            <h2 className="text-3xl leading-tight text-gray-900 lg:text-4xl" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
              What is supVision?
            </h2>
            <p className="mt-3 mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 lg:text-base">
              supVision is the platform that lets you run an <strong className="text-gray-700">autonomous AI support agent</strong> — and stay <strong className="text-gray-700">fully in control</strong> of how it behaves. Set the rules, define the limits, and let it work. <strong className="text-gray-700">No surprises, no black boxes.</strong> Your agent, on your terms.
            </p>
          </div>
        )}

        {/* Tab pills */}
        <div data-reveal className="mb-6 flex items-center justify-center gap-2" style={{ '--rd': '80ms' } as React.CSSProperties}>
          {FEATURE_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => { setActiveKey(t.key); setOpenIdx(0) }}
              className="rounded-full border font-medium transition-all duration-200"
              style={{
                padding: isMobile ? '0.625rem 1.375rem' : '0.375rem 1.25rem',
                fontSize: isMobile ? '0.9375rem' : '0.875rem',
                backgroundColor: activeKey === t.key ? '#111827' : 'transparent',
                borderColor: '#111827',
                color: activeKey === t.key ? '#fff' : '#111827',
              }}
            >
              {t.key}
            </button>
          ))}
        </div>

        {/* Content */}
        <div data-reveal className={`flex items-stretch gap-8 ${isMobile ? 'flex-col' : (reversed ? 'flex-row-reverse' : 'flex-row')}`} style={{ '--rd': '160ms' } as React.CSSProperties}>

          {/* Features list */}
          <div className={`${isMobile ? 'w-full' : 'w-[36%]'} flex-shrink-0 flex flex-col`}>
            <h3 className="text-2xl leading-snug text-gray-900 mb-2" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>{tab.heading}</h3>
            <p className="text-sm leading-relaxed text-gray-500 mb-6">{tab.description}</p>
            <div className="divide-y divide-gray-200">
            {tab.features.map((f, i) => (
              <div key={f.title}>
                <button
                  onClick={() => setOpenIdx(i)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className={`font-semibold transition-colors ${openIdx === i ? 'text-gray-900' : 'text-gray-400'} ${isMobile ? 'text-base' : 'text-xl'}`}>{f.title}</span>
                  <span className="ml-4 flex-shrink-0 text-2xl leading-none text-gray-400">{openIdx === i ? '−' : '+'}</span>
                </button>
                {openIdx === i && (
                  <p className={`pb-4 leading-relaxed text-gray-500 ${isMobile ? 'text-sm' : 'text-sm'}`}>{f.body}</p>
                )}
              </div>
            ))}
            </div>
            <div className="flex-1" />
            <Link
              to="/support-agent"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
              style={{ border: '1.5px solid rgba(17,24,39,0.25)', color: '#111827', alignSelf: 'flex-start' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F97316'; e.currentTarget.style.borderColor = '#F97316'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.borderColor = 'rgba(17,24,39,0.25)'; e.currentTarget.style.color = '#111827'; }}
            >
              See it in action
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {/* Dashboard */}
          <div className={`${isMobile ? 'w-full' : 'w-[55%] flex-shrink-0 ml-auto'}`} style={isMobile ? undefined : { marginRight: '-3%' }}>
            {isMobile ? (
              <div style={{ overflow: 'hidden', borderRadius: '1rem', height: 268 }}>
                <div style={{ transform: 'scale(0.536)', transformOrigin: 'top left', width: '186.6%', height: 500, flexShrink: 0 }}>
                  <HeroDashboard animated view={dashView} />
                </div>
              </div>
            ) : (
              <HeroDashboard animated view={dashView} height={460} />
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

const IN_HERO_INDUSTRIES = [
  { label: 'Payments & Processing', anim: inPaymentAnim },
  { label: 'Digital Banking',       anim: inBankAnim },
  { label: 'Web3',                   anim: inWeb3Anim },
  { label: 'Lending & Credit',       anim: inLendAnim },
  { label: 'InsurTech',              anim: inPrivacyAnim },
]

const BADGE_TEXT = 'Built exclusively for:'

function HeroBadgeSequence() {
  type Phase = 'text-in' | 'text-out' | 'industry-in' | 'industry-out' | 'icons-all' | 'icons-out' | 'gap'
  const [phase, setPhase] = useState<Phase>('text-in')
  const [textKey, setTextKey] = useState(0)
  const [industryIndex, setIndustryIndex] = useState(0)

  useEffect(() => {
    if (phase !== 'text-in') return
    const t = setTimeout(() => setPhase('text-out'), 1200)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'text-out') return
    const t = setTimeout(() => setPhase('industry-in'), 350)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'industry-in') return
    const t = setTimeout(() => setPhase('industry-out'), 1600)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'industry-out') return
    const t = setTimeout(() => {
      if (industryIndex < IN_HERO_INDUSTRIES.length - 1) {
        setIndustryIndex(i => i + 1)
        setPhase('industry-in')
      } else {
        setPhase('icons-all')
      }
    }, 350)
    return () => clearTimeout(t)
  }, [phase, industryIndex])

  useEffect(() => {
    if (phase !== 'icons-all') return
    const t = setTimeout(() => setPhase('icons-out'), 1400)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'icons-out') return
    const t = setTimeout(() => setPhase('gap'), 400)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'gap') return
    const t = setTimeout(() => {
      setIndustryIndex(0)
      setTextKey(k => k + 1)
      setPhase('text-in')
    }, 300)
    return () => clearTimeout(t)
  }, [phase])

  const current = IN_HERO_INDUSTRIES[industryIndex]

  return (
    <div className="inline-flex items-center justify-center text-white" style={{ minHeight: 32, minWidth: 260, fontFamily: "'Nohemi', sans-serif", fontSize: '1.05rem', fontWeight: 600 }}>

      {/* Text appear */}
      {(phase === 'text-in' || phase === 'text-out') && (
        <span
          key={textKey}
          style={{
            animation: phase === 'text-in' ? 'badge-cycle 0.4s ease forwards' : undefined,
            opacity: phase === 'text-out' ? 0 : undefined,
            transform: phase === 'text-out' ? 'translateY(-5px)' : undefined,
            transition: phase === 'text-out' ? 'opacity 0.3s ease, transform 0.3s ease' : undefined,
          }}
        >
          {BADGE_TEXT}
        </span>
      )}

      {/* One industry at a time */}
      {(phase === 'industry-in' || phase === 'industry-out') && (
        <span
          key={industryIndex}
          className="inline-flex items-center gap-2"
          style={{
            animation: phase === 'industry-in' ? 'badge-cycle 0.35s ease forwards' : undefined,
            opacity: phase === 'industry-out' ? 0 : undefined,
            transform: phase === 'industry-out' ? 'translateY(-5px)' : undefined,
            transition: phase === 'industry-out' ? 'opacity 0.3s ease, transform 0.3s ease' : undefined,
          }}
        >
          <Lottie animationData={current.anim} autoplay loop={false} style={{ width: 28, height: 28 }} />
          {current.label}
        </span>
      )}

      {/* All icons together */}
      {(phase === 'icons-all' || phase === 'icons-out') && (
        <span
          className="inline-flex items-center gap-1.5"
          style={{
            opacity: phase === 'icons-out' ? 0 : 1,
            transform: phase === 'icons-out' ? 'translateY(-5px)' : 'translateY(0)',
            transition: phase === 'icons-out' ? 'opacity 0.35s ease, transform 0.35s ease' : 'none',
          }}
        >
          {IN_HERO_INDUSTRIES.map((ind, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                animation: 'badge-cycle 0.3s ease forwards',
                animationDelay: `${i * 0.08}s`,
                opacity: 0,
              }}
            >
              <Lottie animationData={ind.anim} autoplay loop={false} style={{ width: 28, height: 28 }} />
            </span>
          ))}
        </span>
      )}

    </div>
  )
}

function IndustryCard({ label, anim, to }: { label: string; anim: object | null; to: string }) {
  const [hovered, setHovered] = useState(false)
  const [waveKey, setWaveKey] = useState(0)
  const lottieRef = useRef<any>(null)

  const handleEnter = () => {
    setHovered(true)
    setWaveKey(k => k + 1)
    lottieRef.current?.goToAndPlay(0, true)
  }
  const handleLeave = () => {
    setHovered(false)
    lottieRef.current?.goToAndStop(0, true)
  }

  return (
    <Link
      to={to}
      className="relative overflow-hidden rounded-[1.25rem] aspect-square text-left transition-colors active:scale-[0.98] focus:outline-none flex flex-col items-center justify-between p-4"
      style={{
        backgroundColor: hovered ? '#E8E0D6' : '#F8F3EE',
        boxShadow: '0 4px 18px rgba(0,0,0,0.10)',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="flex flex-1 items-center justify-center">
        {anim ? (
          <Lottie
            lottieRef={lottieRef}
            animationData={anim}
            autoplay={false}
            loop={false}
            style={{ width: 110, height: 110 }}
          />
        ) : (
          <div style={{ width: 110, height: 110 }} />
        )}
      </div>
      <p className="w-full text-center text-sm font-bold leading-snug text-gray-900 lg:text-base">
        {hovered ? (
          <span key={waveKey}>
            {label.split('').map((char, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  animation: `wave-char 0.45s ease-in-out ${i * 0.03}s`,
                }}
              >
                {char === ' ' ? ' ' : char}
              </span>
            ))}
          </span>
        ) : label}
      </p>
    </Link>
  )
}

function HeroFeatureItem({ item }: { item: { regular: string; bold: string; anim: object } }) {
  const [hovered, setHovered] = useState(false)
  const [waveKey, setWaveKey] = useState(0)
  const lottieRef = useRef<any>(null)

  const handleEnter = () => {
    setHovered(true)
    setWaveKey(k => k + 1)
    lottieRef.current?.goToAndPlay(0, true)
  }
  const handleLeave = () => {
    setHovered(false)
    lottieRef.current?.goToAndStop(0, true)
  }

  const renderWave = (text: string, offset: number) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        style={{
          display: 'inline-block',
          animation: `wave-char 0.45s ease-in-out ${(offset + i) * 0.03}s`,
        }}
      >
        {char === ' ' ? ' ' : char}
      </span>
    ))

  return (
    <div
      className="flex items-center gap-2 cursor-default"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="flex-shrink-0">
        <Lottie
          lottieRef={lottieRef}
          animationData={item.anim}
          autoplay={false}
          loop={false}
          style={{
            width: 24,
            height: 24,
            filter: hovered ? 'none' : 'grayscale(1) brightness(1.8) opacity(0.55)',
            transition: 'filter 0.2s ease',
          }}
        />
      </div>
      <p
        className="font-medium leading-snug text-left"
        style={{
          fontSize: '0.8125rem',
          color: hovered ? '#faf8f6' : 'rgba(244,239,233,0.8)',
          transition: 'color 0.2s ease',
        }}
      >
        {hovered ? (
          <span key={waveKey}>
            {renderWave(item.regular, 0)}
            <strong>{renderWave(item.bold, item.regular.length)}</strong>
          </span>
        ) : (
          <>{item.regular}<strong>{item.bold}</strong></>
        )}
      </p>
    </div>
  )
}

function ValuePropCard({ v }: { v: typeof valueProps[0] }) {
  const rafRef = useRef<number>()
  const [rx, setRx] = useState(0)
  const [ry, setRy] = useState(0)
  const [active, setActive] = useState(false)
  const flat = rx === 0 && ry === 0

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const cx = e.clientX
    const cy = e.clientY
    const rect = e.currentTarget.getBoundingClientRect()
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      setRx(((cy - rect.top) / rect.height - 0.5) * -9)
      setRy(((cx - rect.left) / rect.width - 0.5) * 9)
    })
  }

  const onLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setRx(0); setRy(0); setActive(false)
  }

  return (
    <div
      style={{ perspective: '900px', position: 'relative' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setActive(true)}
    >
      <div
        style={{
          transform: `rotateX(${rx}deg) rotateY(${ry}deg) scale(${active && !flat ? 1.025 : 1})`,
          transformStyle: 'preserve-3d',
          transition: flat
            ? 'transform 0.6s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s ease'
            : 'transform 0.12s ease',
          borderRadius: '1rem',
          background: 'white',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: active && !flat
            ? '0 20px 56px rgba(0,0,0,0.14)'
            : '0 4px 20px rgba(0,0,0,0.07)',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {v.robotOverlay && (
          <img
            src={v.robotOverlay}
            alt=""
            className="pointer-events-none absolute z-20 hidden lg:block"
            style={v.robotSide === 'right'
              ? { width: '13rem', right: '-5rem', bottom: '3.5rem' }
              : { width: '18rem', left: '-10rem', bottom: '8rem' }
            }
          />
        )}

        {/* Image */}
        <div style={{ height: 224, borderRadius: '1rem 1rem 0 0', overflow: 'hidden', position: 'relative', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#d1d5db', userSelect: 'none' }}>Screenshot coming soon</span>
          <img
            src={v.img}
            alt={v.imgAlt}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>

        {/* Floating chips — translateZ lifts them off the card in 3D space */}
        {v.chips?.map((chip, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: chip.top,
              ...(chip.right !== undefined ? { right: chip.right } : { left: chip.left }),
              transform: 'translateZ(28px)',
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: '0.6rem',
              padding: '0.3rem 0.6rem',
              boxShadow: '0 6px 20px rgba(0,0,0,0.16)',
              border: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.06rem',
              zIndex: 10,
              pointerEvents: 'none',
              minWidth: 78,
            }}
          >
            <span style={{ fontSize: '0.6rem', color: '#9ca3af', fontWeight: 500, letterSpacing: '0.02em', lineHeight: 1 }}>{chip.label}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: chip.accent, lineHeight: 1.2 }}>{chip.value}</span>
          </div>
        ))}

        {/* Text */}
        <div style={{ padding: '2rem', borderRadius: '0 0 1rem 1rem', background: 'white' }}>
          <p className="font-black leading-none" style={{ fontFamily: "'Nohemi', sans-serif", fontSize: '3.75rem', color: '#214995' }}>{v.stat}</p>
          <h3 className="mt-4 text-xl font-bold leading-snug text-gray-900">{v.headline}</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">{v.body}</p>
        </div>
      </div>
    </div>
  )
}


export default function Home() {
  const clipRef = useRef<HTMLDivElement>(null)
  const dashboardPanelRef = useRef<HTMLDivElement>(null)
  const dashboardGlassRef = useRef<HTMLDivElement>(null)
  const dashTiltRaf = useRef<number>(0)
  const featuresPanelRef = useRef<HTMLDivElement>(null)
  const personaSectionRef = useRef<HTMLElement>(null)
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [demoSubmitted, setDemoSubmitted] = useState(false)
  const [demoAgreed, setDemoAgreed] = useState(false)
  const [demoAttempted, setDemoAttempted] = useState(false)
  const [demoFormIsValid, setDemoFormIsValid] = useState(false)
  const [demoSending, setDemoSending] = useState(false)
  const [demoSubmitError, setDemoSubmitError] = useState('')
  const [demoFormStartedAt] = useState(() => Date.now())
  const demoFormRef = useRef<HTMLFormElement>(null)
  const [, setChatStepMobile] = useState(0)
  const [, setChatStepDesktop] = useState(0)
  const [langItems] = useState<Array<{ id: number; langIdx: number; slot: number }>>(
    () => Array.from({ length: 9 }, (_, i) => ({ id: i, langIdx: i % LANGUAGES.length, slot: i }))
  )
  const [liftedSlot, setLiftedSlot] = useState(1)
  const [activePersona, setActivePersona] = useState<number | null>(null)
  const [handoffPhase, setHandoffPhase] = useState(0)
  const [handoffScene, setHandoffScene] = useState(0)
  const [sandboxPhase, setSandboxPhase] = useState(0)
  const [sandboxScene, setSandboxScene] = useState(0)
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [industryAnims, setIndustryAnims] = useState<Record<string, object>>({})

  useEffect(() => {
    Promise.all([
      import('../assets/built_for_industry/payments.json'),
      import('../assets/built_for_industry/neobanking.json'),
      import('../assets/built_for_industry/insurance.json'),
      import('../assets/built_for_industry/lending.json'),
      import('../assets/built_for_industry/web_crypto.json'),
    ]).then(([p, n, i, l, w]) => {
      setIndustryAnims({
        payments: p.default,
        neobanking: n.default,
        insurance: i.default,
        lending: l.default,
        web3: w.default,
      })
    })
  }, [])

  useEffect(() => {
    const delays = [600, 1200, 900, 1400, 3500]
    const t = setTimeout(() => {
      if (handoffPhase < 4) {
        setHandoffPhase(p => p + 1)
      } else {
        setHandoffPhase(0)
        setHandoffScene(s => (s + 1) % HANDOFF_SCENARIOS.length)
      }
    }, delays[handoffPhase])
    return () => clearTimeout(t)
  }, [handoffPhase, handoffScene])

  useEffect(() => {
    const delays = [600, 1100, 1000, 700, 600, 600, 3200]
    const t = setTimeout(() => {
      if (sandboxPhase < 6) {
        setSandboxPhase(p => p + 1)
      } else {
        setSandboxPhase(0)
        setSandboxScene(s => (s + 1) % SANDBOX_QUERIES.length)
      }
    }, delays[Math.min(sandboxPhase, delays.length - 1)])
    return () => clearTimeout(t)
  }, [sandboxPhase, sandboxScene])

  useEffect(() => {
    const steps: [number, number][] = [
      [1, 600], [2, 900], [3, 1400],
      [4, 500], [5, 1800], [6, 1200],
      [7, 500], [0, 2400],
    ]
    let idx = 0
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const [step, delay] = steps[idx]
      setChatStepMobile(step)
      idx = (idx + 1) % steps.length
      timer = setTimeout(tick, delay)
    }
    timer = setTimeout(tick, 700)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const steps: [number, number][] = [
      [1, 650], [2, 750], [3, 850], [4, 700],
      [5, 1300], [6, 550], [7, 1200], [8, 550],
      [9, 1100], [10, 550], [0, 2600],
    ]
    let idx = 0
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const [step, delay] = steps[idx]
      setChatStepDesktop(step)
      idx = (idx + 1) % steps.length
      timer = setTimeout(tick, delay)
    }
    timer = setTimeout(tick, 700)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!featuresOpen) return
    const handler = (e: MouseEvent | TouchEvent) => {
      if (featuresPanelRef.current && !featuresPanelRef.current.contains(e.target as Node)) {
        setFeaturesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [featuresOpen])

  useEffect(() => {
    const t = setInterval(() => {
      setLiftedSlot(s => (s >= 8 ? 1 : s + 1))
    }, 600)
    return () => clearInterval(t)
  }, [])



  useEffect(() => {
    const t = setInterval(() => {
      setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div>
      <PageMeta
        title="supVision — AI Support Agent for Fintech"
        description="Automate fintech customer support with an autonomous AI agent. Resolves KYC, disputes, and transaction queries 24/7 — compliant, multilingual, no human needed."
        path="/"
      />
      {/* Hero */}
      <section data-nav-dark className="relative overflow-hidden" style={{ backgroundColor: '#faf8f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* bg */}
        <div ref={clipRef} className="absolute inset-0 overflow-hidden">
          <div className="blue-gradient-hero absolute inset-0">
            {/* Band 4 — deepest, darkest, painted first */}
            <svg
              className="hero-wave-track-4 absolute top-0 left-0 h-full hidden md:block"
              style={{ width: '200%', filter: 'drop-shadow(0 18px 16px rgba(4,10,48,0.55))' }}
              viewBox="0 0 5760 900"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,840 C90,780 270,780 360,840 C450,900 630,900 720,840 C810,780 990,780 1080,840 C1170,900 1350,900 1440,840 C1530,780 1710,780 1800,840 C1890,900 2070,900 2160,840 C2250,780 2430,780 2520,840 C2610,900 2790,900 2880,840 C2970,780 3150,780 3240,840 C3330,900 3510,900 3600,840 C3690,780 3870,780 3960,840 C4050,900 4230,900 4320,840 C4410,780 4590,780 4680,840 C4770,900 4950,900 5040,840 C5130,780 5310,780 5400,840 C5490,900 5670,900 5760,840 L5760,0 L0,0 Z"
                fill="#1434A8"
              />
            </svg>
            {/* Band 3 */}
            <svg
              className="hero-wave-track-3 absolute top-0 left-0 h-full hidden md:block"
              style={{ width: '200%', filter: 'drop-shadow(0 18px 16px rgba(4,10,48,0.55))' }}
              viewBox="0 0 5760 900"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,660 C90,585 270,585 360,660 C450,735 630,735 720,660 C810,585 990,585 1080,660 C1170,735 1350,735 1440,660 C1530,585 1710,585 1800,660 C1890,735 2070,735 2160,660 C2250,585 2430,585 2520,660 C2610,735 2790,735 2880,660 C2970,585 3150,585 3240,660 C3330,735 3510,735 3600,660 C3690,585 3870,585 3960,660 C4050,735 4230,735 4320,660 C4410,585 4590,585 4680,660 C4770,735 4950,735 5040,660 C5130,585 5310,585 5400,660 C5490,735 5670,735 5760,660 L5760,0 L0,0 Z"
                fill="#1943B8"
              />
            </svg>
            {/* Band 2 */}
            <svg
              className="hero-wave-track-2 absolute top-0 left-0 h-full hidden md:block"
              style={{ width: '200%', filter: 'drop-shadow(0 18px 16px rgba(4,10,48,0.55))' }}
              viewBox="0 0 5760 900"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,450 C90,370 270,370 360,450 C450,530 630,530 720,450 C810,370 990,370 1080,450 C1170,530 1350,530 1440,450 C1530,370 1710,370 1800,450 C1890,530 2070,530 2160,450 C2250,370 2430,370 2520,450 C2610,530 2790,530 2880,450 C2970,370 3150,370 3240,450 C3330,530 3510,530 3600,450 C3690,370 3870,370 3960,450 C4050,530 4230,530 4320,450 C4410,370 4590,370 4680,450 C4770,530 4950,530 5040,450 C5130,370 5310,370 5400,450 C5490,530 5670,530 5760,450 L5760,0 L0,0 Z"
                fill="#204DC6"
              />
            </svg>
            {/* Band 1 — top, lightest, painted last */}
            <svg
              className="hero-wave-track absolute top-0 left-0 h-full hidden md:block"
              style={{ width: '200%', filter: 'drop-shadow(0 18px 16px rgba(4,10,48,0.5))' }}
              viewBox="0 0 5760 900"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,230 C90,150 270,150 360,230 C450,310 630,310 720,230 C810,150 990,150 1080,230 C1170,310 1350,310 1440,230 C1530,150 1710,150 1800,230 C1890,310 2070,310 2160,230 C2250,150 2430,150 2520,230 C2610,310 2790,310 2880,230 C2970,150 3150,150 3240,230 C3330,310 3510,310 3600,230 C3690,150 3870,150 3960,230 C4050,310 4230,310 4320,230 C4410,150 4590,150 4680,230 C4770,310 4950,310 5040,230 C5130,150 5310,150 5400,230 C5490,310 5670,310 5760,230 L5760,0 L0,0 Z"
                fill="#2B5BD8"
              />
            </svg>
          </div>
        </div>

        {/* Content — centered, flex-none */}
        <div className="relative z-10 flex w-full flex-col items-center text-center px-6 pt-14 lg:pt-20" style={{ flexShrink: 0 }}>

          {/* Badge — cycling industry */}
          <div className="mb-6 flex justify-center" style={{ animation: 'hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) both' }}>
            <HeroBadgeSequence />
          </div>

          {/* Heading */}
          <h1
            className="flex flex-col leading-tight"
            style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: 'clamp(3rem, 5.5vw, 5.2rem)', animation: 'hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '80ms' }}
          >
            <span style={{ color: '#F4EFE9' }}><span style={{ fontWeight: 800 }}>Agentic</span> Customer Support</span>
            <span style={{ color: '#F4EFE9' }}>Team for <span style={{ fontWeight: 800 }}>Fintech</span> Industry</span>
          </h1>

          <p className="mt-6 text-base font-light leading-relaxed mx-auto max-w-3xl" style={{ color: '#F4EFE9', animation: 'hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '160ms' }}>
            supVision gives fintech teams one AI agent to handle disputes and support queries — so customers get answers in seconds, every decision stays auditable, and your team only touches cases that actually need a human.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3" style={{ animation: 'hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '240ms' }}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#F97316', border: '1.5px solid transparent' }}
            >
              Let&apos;s chat
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-white">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              to="/support-agent"
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
              style={{ backgroundColor: 'rgba(244,239,233,0.18)', color: '#F4EFE9', border: '1.5px solid rgba(244,239,233,0.35)' }}
            >
              See how it works
            </Link>
          </div>

          {/* Feature items — below CTA */}
          <div className="mt-8 hidden lg:grid grid-cols-2 gap-x-10 gap-y-3" style={{ animation: 'hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '320ms' }}>
            {heroDesktopAgentFeatures.map((item) => (
              <HeroFeatureItem key={item.regular} item={item} />
            ))}
          </div>


          {/* Mobile dashboard */}
          <div className="relative z-10 mt-10 lg:hidden w-full overflow-hidden rounded-2xl" style={{ height: 315, animation: 'hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '400ms' }}>
            <div style={{ transform: 'scale(0.63)', transformOrigin: 'top left', width: '158.7%', height: 500, flexShrink: 0 }}>
              <HeroDashboard animated={true} view="default" beige />
            </div>
          </div>
          <div className="pb-8 lg:hidden" />

        </div>

        {/* Spacer — pushes dashboard to bottom on large screens */}
        <div className="hidden lg:block" style={{ flex: '1 0 2rem', maxHeight: '6rem' }} />

        {/* Desktop dashboard — in flow, peeks below */}
        <div
          ref={dashboardPanelRef}
          className="hidden lg:block"
          style={{ flexShrink: 0, marginBottom: '-110px', paddingLeft: '9%', paddingRight: '9%', position: 'relative', zIndex: 20, perspective: '1400px', animation: 'hero-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '400ms' }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const nx = (e.clientX - rect.left) / rect.width - 0.5
            const ny = (e.clientY - rect.top) / rect.height - 0.5
            cancelAnimationFrame(dashTiltRaf.current)
            dashTiltRaf.current = requestAnimationFrame(() => {
              if (dashboardGlassRef.current) {
                dashboardGlassRef.current.style.transform = `rotateX(${ny * -6}deg) rotateY(${nx * 8}deg)`
                dashboardGlassRef.current.style.transition = 'transform 0.12s ease'
              }
            })
          }}
          onMouseLeave={() => {
            cancelAnimationFrame(dashTiltRaf.current)
            if (dashboardGlassRef.current) {
              dashboardGlassRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)'
              dashboardGlassRef.current.style.transition = 'transform 0.7s cubic-bezier(0.23,1,0.32,1)'
            }
          }}
        >
          <div ref={dashboardGlassRef} style={{ transformStyle: 'preserve-3d', position: 'relative' }}>
            <HeroDashboard beige hiddenKPIs={[0, 2, 3]} hideTeamQueue hideSLA />

            {/* KPI cards lifted out of the dashboard — floats above in true 3D */}
            {/* Positioned to exactly match where KPI row sits inside HeroDashboard:
                top: 53px header + 12px padding + ~37px title + 10px gap = 112px
                left: 120px sidebar + 14px padding = 134px
                right: 14px right padding */}
            <div
              style={{
                position: 'absolute',
                top: 112,
                left: 134,
                right: 14,
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 10,
                transform: 'translateZ(28px)',
                pointerEvents: 'none',
                fontFamily: "'Nohemi', sans-serif",
                userSelect: 'none',
                zIndex: 10,
              }}
            >
              {/* Total Today */}
              <div style={{ background: '#214995', color: '#fff', borderRadius: 14, padding: '12px 14px', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 24px rgba(33,73,149,0.45)' }}>
                <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 16 16" fill="white" style={{ width: 10, height: 10 }}><path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" /></svg>
                </div>
                <p style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Total Today</p>
                <p style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, marginBottom: 5 }}>847</p>
                <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(255,255,255,0.18)', color: '#fff', borderRadius: 100, padding: '2px 7px' }}>↑ 12% from yesterday</span>
              </div>
              {/* Auto-Resolved stays in dashboard — transparent spacer to hold grid cell */}
              <div />
              {/* Avg Response */}
              <div style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', position: 'relative', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 16 16" fill="#9ca3af" style={{ width: 10, height: 10 }}><path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" /></svg>
                </div>
                <p style={{ fontSize: 9, fontWeight: 700, color: '#9ca3af', marginBottom: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Avg Response</p>
                <p style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, marginBottom: 5, color: '#111827' }}>1.2s</p>
                <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(34,197,94,0.12)', color: '#16a34a', borderRadius: 100, padding: '2px 7px' }}>↓ 0.3s faster</span>
              </div>
              {/* Escalated */}
              <div style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', position: 'relative', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 16 16" fill="#9ca3af" style={{ width: 10, height: 10 }}><path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" /></svg>
                </div>
                <p style={{ fontSize: 9, fontWeight: 700, color: '#9ca3af', marginBottom: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Escalated</p>
                <p style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, marginBottom: 5, color: '#111827' }}>5</p>
                <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(107,114,128,0.10)', color: '#6b7280', borderRadius: 100, padding: '2px 7px' }}>On Discuss</span>
              </div>
            </div>

            {/* Row 3 floating layer — Team Queue + SLA Tracker lifted above dashboard in 3D
                top: 112 KPI + 86 row + 10 gap + 136 row2 + 10 gap + 12 content-pad = 366; tuned to 356 */}
            <div
              style={{
                position: 'absolute',
                top: 356,
                left: 134,
                right: 14,
                display: 'grid',
                gridTemplateColumns: '1.55fr 0.75fr 0.75fr',
                gap: 10,
                transform: 'translateZ(28px)',
                pointerEvents: 'none',
                fontFamily: "'Nohemi', sans-serif",
                userSelect: 'none',
                zIndex: 10,
              }}
            >
              {/* Team Queue */}
              <div style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, margin: 0 }}>Team Queue</p>
                  <span style={{ fontSize: 9, fontWeight: 700, border: '1px solid #e5e7eb', borderRadius: 100, padding: '2px 8px', color: '#374151' }}>+ Assign</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    { name: 'Sarah M.', avatar: '/avatars/woman 1.webp', task: 'Balance inquiry', status: 'Resolved', sc: 'green' },
                    { name: 'James K.', avatar: '/avatars/man 1.webp', task: 'Card dispute — £89.99', status: 'In Progress', sc: 'orange' },
                    { name: 'Marco S.', avatar: '/avatars/man 2.webp', task: 'KYC doc upload issue', status: 'Resolved', sc: 'green' },
                    { name: 'Omar F.', avatar: '/avatars/man 3.webp', task: 'Suspicious £2,400 txn', status: 'Pending', sc: 'gray' },
                  ].map((t, i) => {
                    const s = t.sc === 'green' ? { bg: 'rgba(34,197,94,0.12)', color: '#16a34a' } : t.sc === 'orange' ? { bg: 'rgba(251,154,5,0.14)', color: '#d97706' } : { bg: 'rgba(107,114,128,0.10)', color: '#6b7280' }
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <img src={t.avatar} alt={t.name} style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '1.5px solid #e5e7eb' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 10, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{t.name}</p>
                          <p style={{ fontSize: 9, color: '#6b7280', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.task}</p>
                        </div>
                        <span style={{ fontSize: 9, fontWeight: 700, borderRadius: 100, padding: '2px 7px', background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>{t.status}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* Resolution gauge stays in dashboard — transparent spacer */}
              <div />
              {/* SLA Tracker */}
              <div style={{ background: '#1a2744', borderRadius: 14, padding: '12px 12px', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 24px rgba(26,39,68,0.45)' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 4, margin: 0 }}>SLA Tracker</p>
                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', marginBottom: 10, marginTop: 4 }}>Next breach in</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: '#4ade80', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 8 }}>00:47</p>
                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>Card dispute · James K.</p>
                <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 16 16" fill="white" style={{ width: 12, height: 12 }}><path d="M6.28 4.22a.75.75 0 0 0-1.06 1.06L7.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L9 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L10.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L9 6.94 6.28 4.22Z" /></svg>
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#214995', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 16 16" fill="white" style={{ width: 12, height: 12 }}><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Questions + Stat cards */}
      <section className="relative z-10 -mt-10 rounded-t-[2.5rem] pt-16 pb-20 px-4 sm:px-6 lg:rounded-none lg:mt-0 lg:pt-16 bg-[#F1EDE9] lg:bg-[#faf8f5]">
        <div className="mx-auto max-w-7xl px-6">

          {/* ── ZONE 1: Intro + 4 metrics ── desktop */}
          <div className="hidden lg:block">
            {/* Intro text */}
            <div className="mb-10 text-center" data-reveal>
              <h2 className="text-4xl leading-snug text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
                Still paying agents to answer the same<br /><span style={{ fontWeight: 700 }}>questions every day?</span>
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-sm lg:text-base leading-relaxed text-gray-500">
                With the help of supVision, you will <strong className="text-gray-700">resolve disputes, payment failures, and repetitive queries automatically</strong> — so your team only touches cases that genuinely need a human.
              </p>
            </div>

            {/* 4 metric cards in a row */}
            <div className="grid grid-cols-2 gap-5">
              {/* 10x faster */}
              <div data-reveal className="relative overflow-hidden rounded-[2rem] px-8 py-8" style={{ backgroundColor: '#F3EFE9', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', '--rd': '80ms' } as React.CSSProperties}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Response speed</p>
                <p className="mt-2 leading-none tracking-tight whitespace-nowrap" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '3.5rem', color: '#111827' }}>10x faster</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">10 times faster than manual support — avg. <strong className="text-gray-700">1.2s</strong> to resolution, so customers get answers in seconds, not minutes.</p>
              </div>
              {/* 68% */}
              <div data-reveal className="relative overflow-hidden rounded-[2rem] px-8 py-8" style={{ backgroundColor: '#F3EFE9', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', '--rd': '160ms' } as React.CSSProperties}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Support costs</p>
                <p className="mt-2 leading-none tracking-tight whitespace-nowrap" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '3.5rem', color: '#111827' }}>68% cheaper</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">Cut support costs by 68% on repetitive tier-1 volume — without adding headcount. Your team stays focused on work that actually needs a human.</p>
              </div>
              {/* 93% */}
              <div data-reveal className="rounded-[2rem] px-8 py-8" style={{ backgroundColor: '#F3EFE9', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', '--rd': '240ms' } as React.CSSProperties}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Tickets handled</p>
                <p className="mt-2 leading-none tracking-tight whitespace-nowrap" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '3.5rem', color: '#111827' }}>93% resolved</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">93% of tickets fully resolved automatically. Complex or high-risk cases are escalated to human agents for a precise, careful response.</p>
              </div>
              {/* 3 days */}
              <div data-reveal className="relative overflow-hidden rounded-[2rem] px-8 py-8" style={{ '--rd': '320ms', backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)', backgroundSize: 'cover', backgroundPosition: 'center' } as React.CSSProperties}>
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Integration time</p>
                  <p className="mt-2 leading-none tracking-tight" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '3.5rem', color: '#fff' }}>3 days</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">Most companies go live within 3 days by connecting the tools they already use — Zendesk, Freshdesk, Intercom, or a custom CRM. No rebuilding, no disruption.</p>
                </div>
              </div>
            </div>

            <div data-reveal className="mt-8 flex items-center justify-center gap-4" style={{ '--rd': '400ms' } as React.CSSProperties}>
              <Link
                to="/support-agent"
                className="inline-flex min-w-[10rem] items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition-colors"
                style={{ backgroundColor: 'transparent', color: '#111827', border: '1.5px solid rgba(17,24,39,0.35)' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F97316'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#F97316'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#111827'; e.currentTarget.style.borderColor = 'rgba(17,24,39,0.35)'; }}
              >
                Learn more
              </Link>
              <Link
                to="/integrations"
                className="inline-flex min-w-[10rem] items-center justify-center gap-2 rounded-full border-2 border-gray-900 bg-gray-900 px-8 py-3 text-sm font-semibold text-white transition-colors"
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#374151'; e.currentTarget.style.borderColor = '#374151'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#111827'; e.currentTarget.style.borderColor = '#111827'; }}
              >
                Explore
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>


            <FeatureTabSection showHeading={true} />
          </div>

          {/* ── ZONE 2: Core Functionalities ── desktop */}
          <div className="mt-16 mb-20 hidden lg:block">

            <div data-reveal className="mb-6 text-center">
              <h2 className="text-4xl text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
                Everything you need,{' '}<span style={{ fontWeight: 700 }}>out of the box</span>
              </h2>
              <p className="mt-3 mx-auto max-w-xl text-sm leading-relaxed text-gray-500 lg:text-base">
                Every tool your support team needs — deployed in days, no rebuilding required.
              </p>
            </div>

            {/* Animated feature cards */}
            {(() => {
              const orbitAll = [
                { name: 'WhatsApp',   src: '/logos/whatsapp.webp' },
                { name: 'Zendesk',    src: '/logos/zendesk.webp' },
                { name: 'Telegram',   src: '/logos/telegram.webp' },
                { name: 'HubSpot',    src: '/logos/hubspot.webp' },
                { name: 'Slack',      src: '/logos/slack.webp' },
                { name: 'Salesforce', src: '/logos/salesforce.webp' },
                { name: 'Messenger',  src: '/logos/facebook messenger.webp' },
                { name: 'Jira',       src: '/logos/jira.webp' },
                { name: 'Teams',      src: '/logos/teams.webp' },
                { name: 'Freshdesk',  src: '/logos/freshdesk.webp' },
                { name: 'WeChat',     src: '/logos/wechat.webp' },
                { name: 'Intercom',   src: '/logos/intecom (1).webp' },
                { name: 'Viber',      src: '/logos/viber.webp' },
                { name: 'Notion',     src: '/logos/notion.webp' },
                { name: 'Line',       src: '/logos/line.webp' },
                { name: 'Confluence', src: '/logos/confluence.webp' },
              ]
              const orbitDur = 20
              return (
                <div className="mt-10 grid gap-6" style={{ gridTemplateColumns: '1fr 1fr', gridAutoRows: '52vh', maxHeight: '106vh' }}>
                  {/* 100+ Languages — square */}
                  <div data-reveal className="rounded-2xl px-6 py-6 flex flex-col h-full overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                    <p className="text-base font-semibold text-gray-900 text-center">100+ Languages</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500 text-center">supVision <strong className="text-gray-700">automatically detects</strong> your customer's language and responds in kind — whether it's English, Arabic, or Mandarin. <strong className="text-gray-700">No setup, no routing rules, no extra cost.</strong></p>
                    <div className="mt-4 rounded-xl flex-1 overflow-hidden flex gap-2 px-2.5 py-3" style={{ background: '#F3EFE9', maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)' }}>
                      {[0, 1, 2].map(col => {
                        const offset = col * 7
                        const colItems = [...Array(12)].map((_, i) => LANGUAGES[(i + offset) % LANGUAGES.length])
                        return <LangColumn key={col} items={colItems} pxPerSec={14} reverse={col === 1} />
                      })}
                    </div>
                  </div>

                  {/* Live Agent Handoff */}
                  <div data-reveal className="rounded-2xl px-6 py-5 flex flex-col h-full overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)', '--rd': '80ms' } as React.CSSProperties}>
                    <p className="text-base font-semibold text-gray-900">Live Agent Handoff</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">When the bot escalates, it passes the <strong className="text-gray-700">full conversation, customer profile, and its own reasoning</strong> to the agent — <strong className="text-gray-700">zero re-explaining needed.</strong></p>
                    <div className="mt-3 flex-1 rounded-xl overflow-hidden flex flex-col" style={{ background: '#F3EFE9' }}>
                      {(() => {
                        const sc = HANDOFF_SCENARIOS[handoffScene]
                        return (
                          <div className="flex flex-col h-full px-3 pt-3 pb-3 gap-2">
                            <div className="flex flex-col gap-2 flex-1 overflow-hidden">
                              {handoffPhase >= 1 && (
                                <div className="flex items-start gap-2" style={{ animation: 'feature-text-in 0.28s ease both' }}>
                                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-gray-600 bg-gray-200">{sc.customer.split(' ').map(n => n[0]).join('')}</div>
                                  <div className="rounded-2xl rounded-tl-sm text-gray-800 text-xs px-3 py-1.5 leading-snug bg-gray-200" style={{ maxWidth: '82%' }}>{sc.userMsg}</div>
                                </div>
                              )}
                              {handoffPhase === 2 && (
                                <div className="flex items-start justify-end gap-2" style={{ animation: 'feature-text-in 0.28s ease both' }}>
                                  <div className="rounded-2xl rounded-tr-sm px-3 py-2" style={{ background: '#2C1F0E' }}>
                                    <span className="flex gap-1 items-center">{[0, 0.3, 0.6].map((d, i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/70" style={{ animation: 'pulse 1s ease-in-out infinite', animationDelay: `${d}s` }} />)}</span>
                                  </div>
                                  <img src="/Component 187 (1).webp" alt="" className="h-7 w-7 flex-shrink-0 rounded-full object-cover" />
                                </div>
                              )}
                              {handoffPhase >= 3 && (
                                <div className="flex items-start justify-end gap-2" style={{ animation: 'feature-text-in 0.28s ease both' }}>
                                  <div className="rounded-2xl rounded-tr-sm text-white text-xs px-3 py-1.5 leading-snug" style={{ background: '#2C1F0E', maxWidth: '82%' }}>{sc.botMsg}</div>
                                  <img src="/Component 187 (1).webp" alt="" className="h-7 w-7 flex-shrink-0 rounded-full object-cover" />
                                </div>
                              )}
                              {handoffPhase >= 4 && (
                                <div className="rounded-xl p-2.5 flex flex-col gap-1 bg-white border border-gray-200" style={{ animation: 'feature-text-in 0.35s ease both' }}>
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#FB9A05" className="h-3 w-3 flex-shrink-0"><path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-6 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Z" clipRule="evenodd" /></svg>
                                    <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">Handoff context</span>
                                  </div>
                                  <div className="flex items-center justify-between"><span className="text-[10px] text-gray-400">Customer</span><span className="text-[10px] font-semibold text-gray-900">{sc.customer}</span></div>
                                  <div className="flex items-center justify-between"><span className="text-[10px] text-gray-400">Issue</span><span className="text-[10px] font-medium" style={{ color: '#c97a00' }}>{sc.issue}</span></div>
                                  {sc.context.slice(0, 2).map((c, i) => (
                                    <div key={i} className="flex items-center gap-1.5"><span className="text-gray-300 text-xs">→</span><span className="text-[10px] text-gray-500">{c}</span></div>
                                  ))}
                                </div>
                              )}
                            </div>
                            {handoffPhase >= 4 && (
                              <div className="flex items-center gap-2 rounded-xl px-2.5 py-2 flex-shrink-0 bg-green-50 border border-green-200" style={{ animation: 'feature-text-in 0.35s ease both' }}>
                                <div className="h-6 w-6 flex-shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold text-green-700 bg-green-100">{sc.agent.split(' ').map(n => n[0]).join('')}</div>
                                <div className="flex flex-col min-w-0"><span className="text-[11px] font-semibold text-green-700">{sc.agent}</span><span className="text-[9px] text-green-600/70">{sc.role} · Reviewing now</span></div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#16a34a" className="h-3.5 w-3.5 ml-auto flex-shrink-0"><path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" /></svg>
                              </div>
                            )}
                          </div>
                        )
                      })()}
                    </div>
                  </div>

                  {/* One layer — logo grid */}
                  <div data-reveal className="rounded-2xl px-6 py-5 flex flex-col h-full overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                    <p className="text-base font-semibold text-gray-900">One layer, every system</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">Sits between your chats, ticket system, providers, and business ops — <strong className="text-gray-700">nothing falls through the cracks.</strong></p>
                    <div className="mt-3 rounded-xl flex-1 overflow-hidden flex flex-col justify-center gap-3 py-3" style={{ background: '#F3EFE9', maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' }}>
                      {[orbitAll.slice(0, 4), orbitAll.slice(4, 8), orbitAll.slice(8, 12), orbitAll.slice(12)].map((row, ri) => (
                        <div key={ri} className="flex overflow-hidden">
                          <div
                            className="flex shrink-0 gap-10 items-center"
                            style={{ animation: `ticker ${[18, 24, 20, 22][ri]}s linear infinite${ri % 2 === 1 ? ' reverse' : ''}` }}
                          >
                            {[...row, ...row, ...row, ...row].map((logo, i) => (
                              <img key={i} src={logo.src} alt={logo.name} className="h-12 w-12 object-contain flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sandbox & Testing Mode — 4th card */}
                  <div data-reveal className="rounded-2xl px-6 py-5 flex flex-col h-full overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)', '--rd': '80ms' } as React.CSSProperties}>
                    <p className="text-base font-semibold text-gray-900">Sandbox &amp; Testing Mode</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">Test any change to your bot's behavior in a <strong className="text-gray-700">safe environment</strong> before going live — <strong className="text-gray-700">no surprises, no customer impact.</strong></p>
                    <div className="mt-3 rounded-2xl flex-1 flex flex-col overflow-hidden px-3 pt-3 pb-3 gap-2" style={{ background: '#F3EFE9' }}>
                      {(() => {
                        const sq = SANDBOX_QUERIES[sandboxScene]
                        return (
                          <>
                            {/* Mode header */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <div className="h-2 w-2 rounded-full bg-amber-400" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">Sandbox</span>
                              <span className="ml-auto text-[10px] text-gray-400">v2.4.1-draft</span>
                            </div>
                            {/* Query */}
                            {sandboxPhase >= 1 && (
                              <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 flex items-center gap-2 flex-shrink-0" style={{ animation: 'feature-text-in 0.28s ease both' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#9ca3af" className="h-3.5 w-3.5 flex-shrink-0"><path d="M8 1a.75.75 0 0 1 .75.75V6h4.25a.75.75 0 0 1 0 1.5H8.75v4.25a.75.75 0 0 1-1.5 0V7.5H3a.75.75 0 0 1 0-1.5h4.25V1.75A.75.75 0 0 1 8 1Z" /></svg>
                                <span className="text-xs text-gray-600 leading-snug">{sq.query}</span>
                              </div>
                            )}
                            {/* Running */}
                            {sandboxPhase === 2 && (
                              <div className="flex items-center gap-2 px-1" style={{ animation: 'feature-text-in 0.2s ease both' }}>
                                <div className="h-3.5 w-3.5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin flex-shrink-0" />
                                <span className="text-xs text-gray-400">Running test…</span>
                              </div>
                            )}
                            {/* Response preview */}
                            {sandboxPhase >= 3 && (
                              <div className="rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2.5 flex-1 overflow-hidden" style={{ animation: 'feature-text-in 0.28s ease both' }}>
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <img src="/Component 187 (1).webp" alt="" className="h-4 w-4 rounded-full object-cover flex-shrink-0" />
                                  <span className="text-[10px] font-semibold text-blue-700 uppercase tracking-wider">Preview response</span>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">{sq.response}</p>
                              </div>
                            )}
                            {/* Checks */}
                            <div className="flex gap-1.5 flex-shrink-0 w-full">
                              {sq.checks.map((check, i) => sandboxPhase >= 4 + i && (
                                <div key={i} className="flex flex-1 items-center gap-1.5 rounded-lg px-2 py-1.5 bg-white border border-gray-200" style={{ animation: 'log-in 0.25s ease both', minWidth: 0 }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#16a34a" className="h-3 w-3 flex-shrink-0"><path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" /></svg>
                                  <span className="text-[9px] font-medium text-gray-600 leading-tight">{check}</span>
                                </div>
                              ))}
                              {sandboxPhase >= 6 && (
                                <div className="mt-1 flex items-center justify-center gap-2 rounded-full py-1.5 px-3" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', animation: 'log-in 0.3s ease both' }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#16a34a" className="h-3.5 w-3.5 flex-shrink-0"><path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" /></svg>
                                  <span className="text-xs font-semibold text-green-700">Ready to deploy</span>
                                </div>
                              )}
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Mobile — same heading + 4 metric cards as desktop */}
          <div className="-mx-6 mt-6 lg:hidden pt-8 pb-8 px-4">
            <div className="mb-8 text-center">
              <h2 className="text-3xl leading-snug text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
                Still paying agents to answer the same questions every day?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                With the help of supVision, you will <strong className="text-gray-700">resolve disputes, payment failures, and repetitive queries automatically</strong> — so your team only touches cases that genuinely need a human.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative overflow-hidden rounded-[1.5rem] px-4 py-5" style={{ backgroundColor: '#F3EFE9', border: '1.5px solid #111827' }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500">Response speed</p>
                <p className="mt-1 leading-none tracking-tight" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '2rem', color: '#111827' }}>10x faster</p>
                <p className="mt-2 text-[11px] leading-relaxed text-gray-500">10× faster than manual support — avg. <strong className="text-gray-700">1.2s</strong> to resolution.</p>
              </div>
              <div className="relative overflow-hidden rounded-[1.5rem] px-4 py-5" style={{ backgroundColor: '#F3EFE9', border: '1.5px solid #111827' }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500">Support costs</p>
                <p className="mt-1 leading-none tracking-tight" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '2rem', color: '#111827' }}>68% cheaper</p>
                <p className="mt-2 text-[11px] leading-relaxed text-gray-500">Cut costs by 68% on tier-1 volume — without adding headcount.</p>
              </div>
              <div className="relative overflow-hidden rounded-[1.5rem] px-4 py-5" style={{ backgroundColor: '#F3EFE9', border: '1.5px solid #111827' }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500">Tickets handled</p>
                <p className="mt-1 leading-none tracking-tight" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '2rem', color: '#111827' }}>93% resolved</p>
                <p className="mt-2 text-[11px] leading-relaxed text-gray-500">Fully resolved automatically. Complex cases escalated to human agents.</p>
              </div>
              <div className="blue-gradient-card relative overflow-hidden rounded-[1.5rem] px-4 py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/60">Integration time</p>
                <p className="mt-1 leading-none tracking-tight" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '2rem', color: '#fff' }}>3 days</p>
                <p className="mt-2 text-[11px] leading-relaxed text-white/70">Most companies go live within 3 days using tools they already have.</p>
              </div>
            </div>

            <FeatureTabSection />

            {/* 3 key differentiators — mobile */}
            <div data-reveal className="mt-10 mb-2 text-center">
              <h2 className="text-3xl text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
                Everything you need,{' '}<span style={{ fontWeight: 700 }}>out of the box</span>
              </h2>
            </div>
            <div data-reveal className="mt-6 flex flex-col gap-4" style={{ '--rd': '80ms' } as React.CSSProperties}>
              {/* 100+ Languages — mobile */}
              <div className="rounded-2xl bg-white px-5 py-5 shadow-sm border border-gray-100">
                <p className="text-base font-semibold text-gray-900">100+ Languages</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">supVision <strong className="text-gray-700">automatically detects</strong> your customer's language and responds in kind — whether it's English, Arabic, or Mandarin. <strong className="text-gray-700">No setup, no routing rules, no extra cost.</strong></p>
                <div className="mt-4 rounded-xl relative overflow-hidden" style={{ height: '220px', background: '#F3EFE9', border: '1.5px solid #111827', maskImage: 'linear-gradient(to top, black 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 70%, transparent 100%)' }}>
                  {langItems.slice(0, 7).map(({ id, langIdx, slot }) => {
                    const s = LANG_SLOT[Math.min(Math.max(slot + 1, 0), LANG_SLOT.length - 1)]
                    const flagSize = Math.round(s.h * 0.64)
                    const fontSize = `${(s.h * 0.54) / 16}rem`
                    const lifted = slot === liftedSlot
                    return (
                      <div
                        key={id}
                        style={{
                          position: 'absolute',
                          bottom: s.bottom + (lifted ? 28 : 0),
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: s.w,
                          height: s.h,
                          opacity: s.op,
                          zIndex: s.zi,
                          transition: 'bottom 0.4s cubic-bezier(0.4,0,0.2,1), width 0.55s cubic-bezier(0.4,0,0.2,1), height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.55s cubic-bezier(0.4,0,0.2,1)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 8px', height: '100%', background: '#ffffff', borderRadius: 9999, border: '3.5px solid #e5e7eb', overflow: 'hidden' }}>
                          <div style={{ width: flagSize, height: flagSize, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#333' }}>
                            <img src={LANGUAGES[langIdx].flag} alt={LANGUAGES[langIdx].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <span style={{ flex: 1, textAlign: 'center', fontFamily: "'Nohemi', sans-serif", fontWeight: 700, color: '#111827', fontSize, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                            {LANGUAGES[langIdx].name}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* Live Agent Handoff — mobile */}
              <div className="rounded-2xl bg-white px-5 py-5 shadow-sm border border-gray-100">
                <p className="text-base font-semibold text-gray-900">Live Agent Handoff</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">When the bot escalates, it passes the <strong className="text-gray-700">full conversation, customer profile, and its own reasoning</strong> to the agent — <strong className="text-gray-700">zero re-explaining needed.</strong></p>
                {(() => {
                  const sc = HANDOFF_SCENARIOS[handoffScene]
                  return (
                    <div className="mt-4 rounded-xl p-3 flex flex-col gap-2.5 overflow-hidden" style={{ height: 272, flexShrink: 0, background: '#F3EFE9', border: '1.5px solid #111827' }}>
                      {handoffPhase >= 1 && (
                        <div className="flex items-start gap-2" style={{ animation: 'log-in 0.3s ease both' }}>
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-gray-600 bg-gray-200">{sc.customer.split(' ').map(n => n[0]).join('')}</div>
                          <div className="rounded-2xl rounded-tl-sm text-gray-800 text-xs px-3 py-2 leading-snug bg-gray-200" style={{ maxWidth: '82%' }}>{sc.userMsg}</div>
                        </div>
                      )}
                      {handoffPhase >= 3 && (
                        <div className="flex items-start justify-end gap-2" style={{ animation: 'log-in 0.3s ease both' }}>
                          <div className="rounded-2xl rounded-tr-sm text-white text-xs px-3 py-2 leading-snug" style={{ background: '#2C1F0E', maxWidth: '82%' }}>{sc.botMsg}</div>
                          <img src="/Component 187 (1).webp" alt="" className="h-7 w-7 flex-shrink-0 rounded-full object-cover mt-0.5" />
                        </div>
                      )}
                      {handoffPhase >= 4 && (
                        <div className="rounded-xl p-2.5 flex flex-col gap-1 bg-white border border-gray-200" style={{ animation: 'log-in 0.3s ease both' }}>
                          <div className="flex items-center justify-between"><span className="text-[10px] text-gray-400">Customer</span><span className="text-[10px] font-semibold text-gray-900">{sc.customer}</span></div>
                          <div className="flex items-center justify-between"><span className="text-[10px] text-gray-400">Issue</span><span className="text-[10px] font-medium" style={{ color: '#c97a00' }}>{sc.issue}</span></div>
                          {sc.context.slice(0, 2).map((c, i) => (
                            <div key={i} className="flex items-center gap-1"><span className="text-gray-300 text-[10px]">→</span><span className="text-[10px] text-gray-500">{c}</span></div>
                          ))}
                        </div>
                      )}
                      {handoffPhase >= 4 && (
                        <div className="flex items-center gap-2 rounded-xl px-2.5 py-2 bg-green-50 border border-green-200" style={{ animation: 'log-in 0.3s ease both' }}>
                          <div className="h-6 w-6 flex-shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold text-green-700 bg-green-100">{sc.agent.split(' ').map(n => n[0]).join('')}</div>
                          <div className="flex flex-col min-w-0"><span className="text-[11px] font-semibold text-green-700">{sc.agent}</span><span className="text-[9px] text-green-600/70">{sc.role}</span></div>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#16a34a" className="h-3.5 w-3.5 ml-auto flex-shrink-0"><path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" /></svg>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
              {/* One layer — single-ring orbital mobile */}
              {(() => {
                const orbitAllMob = [
                  { name: 'WhatsApp',   src: '/logos/whatsapp.webp' },
                  { name: 'Zendesk',    src: '/logos/zendesk.webp' },
                  { name: 'Telegram',   src: '/logos/telegram.webp' },
                  { name: 'HubSpot',    src: '/logos/hubspot.webp' },
                  { name: 'Slack',      src: '/logos/slack.webp' },
                  { name: 'Jira',       src: '/logos/jira.webp' },
                  { name: 'Messenger',  src: '/logos/facebook messenger.webp' },
                  { name: 'Freshdesk',  src: '/logos/freshdesk.webp' },
                  { name: 'Teams',      src: '/logos/teams.webp' },
                  { name: 'Notion',     src: '/logos/notion.webp' },
                  { name: 'WeChat',     src: '/logos/wechat.webp' },
                  { name: 'Salesforce', src: '/logos/salesforce.webp' },
                ]
                const dur = 20
                return (
                  <div className="rounded-2xl bg-white px-5 py-5 shadow-sm border border-gray-100">
                    <p className="text-base font-semibold text-gray-900">One layer, every system</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">Sits between your chats, ticket system, providers, and business ops — <strong className="text-gray-700">nothing falls through the cracks.</strong></p>
                    <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 relative overflow-hidden" style={{ height: '300px' }}>
                      {/* Single orbit ring */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="rounded-full border border-dashed border-gray-200" style={{ width: '198px', height: '198px' }} />
                      </div>
                      {[0, 0.9, 1.8].map((d, i) => (
                        <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="absolute rounded-full border border-[#2C1F0E]/25" style={{ width: '38px', height: '38px', animation: 'pulse-ring 2.6s ease-out infinite', animationDelay: `${d}s` }} />
                        </div>
                      ))}
                      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                        <div key={angle} className="absolute pointer-events-none" style={{ top: '50%', left: '50%', marginTop: '-3px', marginLeft: '-3px', animation: `data-pull 2.2s ease-in infinite`, animationDelay: `${i * 0.37}s`, ['--da' as string]: `${angle}deg` }}>
                          <div className="h-1.5 w-1.5 rounded-full bg-[#2C1F0E]/50" />
                        </div>
                      ))}
                      {/* All logos — single ring */}
                      {orbitAllMob.map((logo, i) => (
                        <div key={logo.name} className="absolute" style={{ top: '50%', left: '50%', marginTop: '-26px', marginLeft: '-26px', animation: `logo-orbit ${dur}s linear infinite`, animationDelay: `${-(i / orbitAllMob.length) * dur}s`, ['--orbit-r' as string]: '99px' }}>
                          <div style={{ animation: `logo-counter ${dur}s linear infinite`, animationDelay: `${-(i / orbitAllMob.length) * dur}s` }}>
                            <div className="h-[52px] w-[52px] rounded-full bg-white shadow border border-gray-100 overflow-hidden flex items-center justify-center">
                              <img src={logo.src} alt={logo.name} className="h-7 w-7 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative z-10 rounded-xl px-3 py-2 text-[10px] font-bold text-white leading-tight text-center" style={{ backgroundColor: '#2C1F0E', boxShadow: '0 0 14px rgba(44,31,14,0.4)' }}>supVision</div>
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* Sandbox & Testing Mode — mobile */}
              <div className="rounded-2xl bg-white px-5 py-5 shadow-sm border border-gray-100">
                <p className="text-base font-semibold text-gray-900">Sandbox &amp; Testing Mode</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">Test any change to your bot's behavior in a <strong className="text-gray-700">safe environment</strong> before going live — <strong className="text-gray-700">no surprises, no customer impact.</strong></p>
                {(() => {
                  const sq = SANDBOX_QUERIES[sandboxScene]
                  return (
                    <div className="mt-4 rounded-2xl px-4 py-4 flex flex-col gap-2.5 overflow-hidden" style={{ background: '#f9fafb', height: 272, flexShrink: 0 }}>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-amber-400" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                        <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">Sandbox</span>
                        <span className="ml-auto text-[10px] text-gray-400">v2.4.1-draft</span>
                      </div>
                      {sandboxPhase >= 1 && (
                        <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 flex items-center gap-2" style={{ animation: 'log-in 0.3s ease both' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#9ca3af" className="h-3.5 w-3.5 flex-shrink-0"><path d="M8 1a.75.75 0 0 1 .75.75V6h4.25a.75.75 0 0 1 0 1.5H8.75v4.25a.75.75 0 0 1-1.5 0V7.5H3a.75.75 0 0 1 0-1.5h4.25V1.75A.75.75 0 0 1 8 1Z" /></svg>
                          <span className="text-xs text-gray-600 leading-snug">{sq.query}</span>
                        </div>
                      )}
                      {sandboxPhase === 2 && (
                        <div className="flex items-center gap-2" style={{ animation: 'log-in 0.2s ease both' }}>
                          <div className="h-3.5 w-3.5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin flex-shrink-0" />
                          <span className="text-xs text-gray-400">Running test…</span>
                        </div>
                      )}
                      {sandboxPhase >= 3 && (
                        <div className="rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2.5" style={{ animation: 'log-in 0.3s ease both' }}>
                          <div className="flex items-center gap-1.5 mb-1">
                            <img src="/Component 187 (1).webp" alt="" className="h-4 w-4 rounded-full object-cover flex-shrink-0" />
                            <span className="text-[10px] font-semibold text-blue-700 uppercase tracking-wider">Preview response</span>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">{sq.response}</p>
                        </div>
                      )}
                      <div className="flex flex-col gap-1.5">
                        {sq.checks.map((check, i) => sandboxPhase >= 4 + i && (
                          <div key={i} className="flex items-center gap-2" style={{ animation: 'log-in 0.25s ease both' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#16a34a" className="h-3.5 w-3.5 flex-shrink-0"><path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" /></svg>
                            <span className="text-xs text-gray-600">{check}</span>
                          </div>
                        ))}
                        {sandboxPhase >= 6 && (
                          <div className="mt-0.5 flex items-center justify-center gap-2 rounded-full py-1.5 px-3" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', animation: 'log-in 0.3s ease both' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#16a34a" className="h-3.5 w-3.5 flex-shrink-0"><path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" /></svg>
                            <span className="text-xs font-semibold text-green-700">Ready to deploy</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>

          {/* Cards - 2 per row — desktop */}
          <div data-reveal className="mt-16 hidden sm:grid gap-6 sm:grid-cols-2">
            {valueProps.map((v) => (
              <ValuePropCard key={v.headline} v={v} />
            ))}
          </div>

            {/* Mobile CTAs */}
            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/support-agent"
                className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-gray-900 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#AAC6FF]"
              >
                Learn more
              </Link>
              <Link
                to="/integrations"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gray-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#F97316]"
              >
                Explore
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Industries — Built for your industry */}
      <section className="pt-0 pb-12 px-4 lg:pt-2 lg:pb-16 lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-8 text-center lg:mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest" style={{ backgroundColor: '#EDE8DF', color: '#6b7280' }}>
              Built for fintech
            </span>
            <h2 className="mt-3 text-4xl text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
              Do you recognise yourself <span style={{ fontWeight: 700 }}>in one of these?</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500">supVision is purpose-built for fintech — see where your business fits and explore what it can do for you.</p>
          </div>
          <div data-reveal className="grid grid-cols-2 gap-3 lg:grid-cols-5 lg:gap-4" style={{ '--rd': '120ms' } as React.CSSProperties}>
            <IndustryCard label="Payments & Processing" anim={industryAnims.payments ?? null} to="/industries/payments-processing" />
            <IndustryCard label="Digital Banking"       anim={industryAnims.neobanking ?? null} to="/industries/neobanks" />
            <IndustryCard label="InsurTech"             anim={industryAnims.insurance ?? null} to="/industries/insurtech" />
            <IndustryCard label="Lending & Credit"      anim={industryAnims.lending ?? null} to="/industries/lending-credit" />
            <IndustryCard label="Web3"                  anim={industryAnims.web3 ?? null} to="/industries/crypto-web3" />
          </div>
        </div>
      </section>

      {/* Built for fintech — persona selector */}
      <section ref={personaSectionRef} className="py-6 lg:py-10" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div data-reveal className="rounded-[2rem] px-6 py-10 lg:px-12 lg:py-14" style={{ backgroundColor: '#F3EFE9', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          {/* Header */}
          <div className="mb-8 lg:mb-10 lg:text-center">
            <h2
              className="text-3xl leading-snug text-gray-900 lg:text-4xl"
              style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
            >
              Works with everything <span style={{ fontWeight: 700 }}>in your stack</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500 lg:text-base">Filter by category to explore integrations.</p>
          </div>

          {/* Filter tabs */}
          <div className="mb-8 flex w-full flex-wrap gap-2 lg:justify-center">
            <button
              type="button"
              onClick={() => setActivePersona(null)}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
              style={{
                background: activePersona === null ? '#111827' : 'transparent',
                color: activePersona === null ? '#fff' : '#111827',
                border: '2px solid #111827',
              }}
            >
              All
            </button>
            {INTEGRATION_CATEGORIES.map((cat, i) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActivePersona(prev => (prev === i ? null : i))}
                className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                style={{
                  background: activePersona === i ? '#111827' : 'transparent',
                  color: activePersona === i ? '#fff' : '#111827',
                  border: '2px solid #111827',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {(() => {
            const all = activePersona === null
              ? automationStacks
              : automationStacks.filter(s => s.tools.some(t => INTEGRATION_CATEGORIES[activePersona].tools.includes(t)))

            const renderStackCard = (stack: (typeof automationStacks)[number]) => (
              <div
                key={stack.label}
                className="flex items-center gap-3 rounded-2xl px-4 py-4"
                style={{ background: '#fff', border: '1px solid #e6ddd2' }}
              >
                <div className="flex flex-shrink-0 items-center -space-x-2">
                  {stack.logos.map((logo, idx) => (
                    <StackLogo key={idx} {...logo} />
                  ))}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-snug text-gray-900">{stack.label}</p>
                  <p className="text-xs leading-snug text-gray-400">{stack.desc}</p>
                </div>
              </div>
            )

            const mobileVisible = all.slice(0, 3)
            const mobileExtra = all.length - 3
            const desktopVisible = all.slice(0, 12)
            const desktopExtra = all.length - 12

            return (
              <>
                {/* Mobile: single column */}
                <div className="flex flex-col gap-2.5 lg:hidden">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Suggested integrations</p>
                  <div className="flex flex-col gap-2.5">
                    {mobileVisible.map(stack => renderStackCard(stack))}
                  </div>
                  {mobileExtra > 0 && (
                    <div className="flex justify-center">
                      <Link to="/integrations" className="text-xs font-semibold text-gray-500 transition-colors hover:text-gray-700">
                        +{mobileExtra} more ↓
                      </Link>
                    </div>
                  )}
                </div>

                {/* Desktop: 3 columns */}
                <div className="hidden flex-col gap-4 lg:flex">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 lg:text-center">Suggested integrations</p>
                  <div className="grid w-full grid-cols-3 gap-4">
                    {desktopVisible.map(stack => renderStackCard(stack))}
                  </div>
                  {desktopExtra > 0 && (
                    <div className="flex justify-center">
                      <Link to="/integrations" className="text-xs font-semibold text-gray-500 transition-colors hover:text-gray-700">
                        +{desktopExtra} more ↓
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )
          })()}

          {/* Footer actions */}
          <div className="mt-8 flex w-full flex-col items-center gap-2 lg:mt-10">
            <Link
              to="/integrations"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors"
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F97316'; e.currentTarget.style.borderColor = '#F97316'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.borderColor = '#111827'; e.currentTarget.style.color = '#111827'; }}
            >
              Show all integrations
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link to="/contact" className="text-center text-xs text-gray-500 transition-colors hover:text-gray-700">
              Can&apos;t find your tool? <span className="font-bold text-gray-900">Let&apos;s talk about your stack →</span>
            </Link>
          </div>
        </div>
        </div>
      </section>



      {/* Proof — testimonials */}
      {(() => {
        const t = TESTIMONIALS[testimonialIdx]
        const total = TESTIMONIALS.length
        return (
          <section className="py-16 px-4 lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
            <div className="mx-auto max-w-5xl">
              {/* Heading */}
              <div data-reveal className="mb-10 text-center">
                <h2 className="text-4xl text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
                  Companies that moved from overwhelmed to{' '}
                  <span style={{ fontWeight: 700 }}>automated.</span>
                </h2>
                <p className="mt-2 text-sm text-gray-500 lg:text-base">Real results from fintech teams that replaced manual support with supVision.</p>
              </div>

              {/* Card — fixed height so all testimonials are the same size */}
              <div className="overflow-hidden rounded-2xl bg-white" style={{ height: 300, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                <div className="flex h-full flex-col lg:flex-row">

                  {/* Left — blue panel with wave */}
                  <div className="relative flex w-full flex-shrink-0 flex-col items-center justify-end overflow-hidden px-6 pb-8 pt-10 lg:w-72 lg:items-start lg:pb-10 lg:pt-14" style={{ backgroundColor: '#1a3280' }}>
                    <svg viewBox="0 0 288 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
                      className="absolute inset-0 h-full w-full">
                      <path d="M -40 220 Q 60 160 140 200 Q 220 240 320 180 L 320 320 L -40 320 Z" fill="rgba(255,255,255,0.06)" />
                      <path d="M -40 260 Q 80 200 170 240 Q 250 275 340 220 L 340 320 L -40 320 Z" fill="rgba(255,255,255,0.05)" />
                      <path d="M -20 180 Q 70 130 160 165 Q 240 198 330 145 L 330 0 L -20 0 Z" fill="rgba(255,255,255,0.04)" />
                      <path d="M -20 200 Q 90 145 180 182 Q 260 215 350 162 L 350 0 L -20 0 Z" fill="rgba(255,255,255,0.03)" />
                    </svg>
                    <div className="relative z-10 text-center lg:text-left">
                      <p key={`name-${testimonialIdx}`} className="text-xl font-black text-white" style={{ animation: 'feature-text-in 0.4s ease both' }}>{t.name}</p>
                      <p key={`title-${testimonialIdx}`} className="mt-1 text-sm text-white/60" style={{ animation: 'feature-text-in 0.4s ease both' }}>{t.title}</p>
                    </div>
                  </div>

                  {/* Right — quote + stats */}
                  <div className="flex flex-1 flex-col justify-between overflow-hidden px-8 py-8 lg:px-10 lg:py-10">
                    <div className="overflow-hidden">
                      <p className="mb-3 text-2xl font-black leading-none" style={{ color: '#e5e7eb' }}>"</p>
                      <p key={`quote-${testimonialIdx}`} className="text-sm leading-relaxed text-gray-700 lg:text-base" style={{ animation: 'feature-text-in 0.4s ease both' }}>{t.quote}</p>
                    </div>

                    {/* Divider + stats */}
                    <div className="mt-4 flex-shrink-0 border-t border-gray-100 pt-4">
                      <div className="flex flex-wrap gap-8">
                        {t.stats.map(s => (
                          <div key={s.label}>
                            <p className="text-xl font-black" style={{ color: '#214995' }}>{s.value}</p>
                            <p className="mt-0.5 text-xs text-gray-400">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation dots */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={() => setTestimonialIdx(i => (i - 1 + total) % total)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-900 text-gray-900 transition-colors hover:bg-[#F97316] hover:border-[#F97316] hover:text-white"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H5.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L5.56 7.25h7.69A.75.75 0 0 1 14 8Z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIdx(i)}
                      className="transition-all duration-300"
                      style={{ width: i === testimonialIdx ? 28 : 8, height: 8, borderRadius: 100, backgroundColor: i === testimonialIdx ? '#214995' : '#d1d5db' }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setTestimonialIdx(i => (i + 1) % total)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-900 text-gray-900 transition-colors hover:bg-[#F97316] hover:border-[#F97316] hover:text-white"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        )
      })()}



      {/* Built by operators */}
      <section className="py-3 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl px-4 py-10 lg:px-6 lg:py-16" style={{ backgroundColor: '#faf8f5' }}>
            <div data-reveal className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-10">
              {/* Text */}
              <div className="flex-1 min-w-0">
                <h2
                  className="mt-4 leading-tight text-gray-900"
                  style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  Built by people with <span style={{ fontWeight: 700 }}>15+ years</span> in fintech.
                </h2>
                <p className="mt-6 text-sm leading-relaxed text-gray-500 lg:text-base">
                  Our team comes from inside the industry — compliance officers, support leads, and engineers who spent over 15 years building and running financial services operations across Europe, the Middle East, and Asia. We know the regulatory pressure, the integration pain, and what it actually takes to scale support without losing control.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-gray-500 lg:text-base">
                  Today supVision is live across <span className="font-semibold text-gray-900">40+ countries</span>, supporting <span className="font-semibold text-gray-900">100+ merchants</span> — handling real customer queries for fintech companies that can't afford downtime, compliance gaps, or slow support.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <span className="text-sm text-gray-400">15+ yrs fintech · 40+ countries</span>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-colors"
                    style={{ backgroundColor: 'transparent', color: '#111827', border: '1.5px solid rgba(17,24,39,0.35)', alignSelf: 'flex-start' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F97316'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#F97316'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#111827'; e.currentTarget.style.borderColor = 'rgba(17,24,39,0.35)'; }}
                  >
                    Read our story
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              {/* Photo */}
              <div className="w-full lg:w-[52%] flex-shrink-0">
                <img
                  src="/2I5A9685.webp"
                  alt="supVision team"
                  className="w-full rounded-2xl object-cover"
                  style={{ aspectRatio: '4/3', objectPosition: 'center' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Security */}
      <section className="py-10 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">

            {/* Mobile */}
            <div data-reveal className="max-w-3xl mx-auto lg:hidden">
              <h2
                className="mt-2 text-center text-[2.25rem] leading-tight text-gray-900"
                style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
              >
                Privacy first. <span style={{ fontWeight: 700 }}>Security always.</span>
              </h2>
              <ul className="mt-6 space-y-4">
                {complianceFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 text-white">
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/security"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border-2 border-gray-900 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#AAC6FF]"
              >
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gray-900">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* Desktop */}
            <div className="hidden lg:block">
              <div data-reveal className="mb-10 text-center">
                <h2
                  className="text-4xl leading-tight text-gray-900"
                  style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
                >
                  Privacy first. <span style={{ fontWeight: 700 }}>Security always.</span>
                </h2>
                <p className="mt-2 text-sm text-gray-500 lg:text-base">Your data is protected at every layer — by design, not by policy.</p>
              </div>
              <div data-reveal className="mt-10 grid grid-cols-3 gap-6" style={{ '--rd': '100ms' } as React.CSSProperties}>
                {complianceCertCards.map((card) => (
                  <div
                    key={card.title}
                    className="flex flex-col items-center overflow-visible rounded-2xl px-6 py-8 text-center"
                    style={{ backgroundColor: '#F3EFE9', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
                  >
                    <div
                      className={[
                        'relative mb-6 flex items-center justify-center overflow-visible rounded-full border-2',
                        card.badgeOversize ? 'h-24 w-24' : 'h-28 w-28 p-4',
                      ].join(' ')}
                      style={{ borderColor: '#214995', boxShadow: '0 0 20px rgba(33,73,149,0.12)' }}
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
                      style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
                    >
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">{card.desc}</p>
                  </div>
                ))}
              </div>
              <div data-reveal className="mt-10 flex justify-center" style={{ '--rd': '200ms' } as React.CSSProperties}>
                <Link
                  to="/security"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-colors"
                  style={{ backgroundColor: '#111827', color: '#fff' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F97316'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#111827'; }}
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>

        </div>
      </section>

      {/* Pre-FAQ CTA with inline form */}
      <section className="py-8 px-2 sm:px-4 lg:py-16 lg:px-8">
        <div data-reveal className="mx-auto max-w-7xl rounded-2xl overflow-hidden" style={{ position: 'relative', backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-2">

            {/* Top text */}
            <div className="px-5 pt-10 pb-0 lg:px-16 lg:py-16 lg:pb-0 lg:flex lg:flex-col lg:justify-start">
              <h2 className="mt-4 hidden text-3xl font-bold leading-tight text-white lg:block lg:text-4xl">See it in action. Book your demo today.</h2>
              <h2
                className="mt-2 flex flex-col text-center leading-tight lg:hidden"
                style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '2.25rem' }}
              >
                <span className="text-white">Stop answering</span>
                <span className="text-white">the same questions.</span>
                <span style={{ color: '#FB9A05' }}>Let supVision do it.</span>
              </h2>
            </div>

            {/* Form */}
            <div className="px-5 pt-6 pb-3 lg:px-12 lg:py-16 lg:row-span-2 lg:flex lg:items-center">
              {demoSubmitted ? (
                <div className="w-full rounded-2xl bg-white p-8 text-center shadow-xl">
                  <div className="mb-4 flex h-14 w-14 mx-auto items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-7 w-7 text-white">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Message sent!</h2>
                  <p className="mt-2 text-base text-gray-500">We'll get back to you within one business day.</p>
                </div>
              ) : (
                <div className="w-full rounded-2xl bg-white p-6 lg:p-8 shadow-xl">
                  <form
                    ref={demoFormRef}
                    noValidate
                    onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                      e.preventDefault()
                      const form = e.currentTarget
                      const valid = form.checkValidity()
                      setDemoFormIsValid(valid)
                      setDemoAttempted(true)
                      if (!valid || !demoAgreed) return

                      const name = (form.querySelector('#demo-name') as HTMLInputElement).value.trim()
                      const email = (form.querySelector('#demo-email') as HTMLInputElement).value.trim()
                      const company = (form.querySelector('#demo-company') as HTMLInputElement).value.trim()
                      const messageRaw = (form.querySelector('#demo-message') as HTMLTextAreaElement).value.trim()
                      const message = [
                        'Book a Demo (homepage)',
                        company ? `Company: ${company}` : '',
                        messageRaw || 'No additional details provided.',
                      ].filter(Boolean).join('\n\n')

                      setDemoSending(true)
                      setDemoSubmitError('')
                      const result = await submitContactForm({ name, email, message, formStartedAt: demoFormStartedAt })
                      setDemoSending(false)
                      if (!result.ok) { setDemoSubmitError(result.error); return }
                      setDemoSubmitted(true)
                    }}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="demo-name">Full name <span style={{ color: '#214995' }}>*</span></label>
                        <input id="demo-name" type="text" required placeholder="Your full name" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="demo-email">Email <span style={{ color: '#214995' }}>*</span></label>
                        <input id="demo-email" type="email" required placeholder="Your email address" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="demo-company">Company</label>
                      <input id="demo-company" type="text" placeholder="Your company name" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="demo-message">What are you looking to solve?</label>
                      <textarea id="demo-message" rows={3} placeholder="Describe your support challenges..." className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100" />
                    </div>
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => setDemoAgreed(!demoAgreed)}
                        className={['mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors', demoAgreed ? 'border-transparent' : 'border-gray-300 bg-white'].join(' ')}
                        style={demoAgreed ? { backgroundColor: '#214995' } : {}}
                      >
                        {demoAgreed && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 text-white">
                            <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      <p className="text-xs leading-relaxed text-gray-500">I agree to the <Link to="/" className="font-semibold text-gray-900 underline">Privacy Policy</Link>.</p>
                    </div>
                    <div className="pt-1">
                      <button type="submit" disabled={demoSending} className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition-colors lg:hidden" style={{ backgroundColor: '#111827' }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F97316')} onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#111827')}>
                        {demoSending ? 'Sending…' : 'Send request'}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" /></svg>
                      </button>
                      <button type="submit" disabled={demoSending} className="hidden lg:inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white transition-colors" style={{ backgroundColor: '#111827' }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F97316')} onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#111827')}>
                        {demoSending ? 'Sending…' : 'Send request'}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" /></svg>
                      </button>
                      {demoSubmitError && <p className="mt-3 text-xs text-red-500">{demoSubmitError}</p>}
                      {demoAttempted && (!demoFormIsValid || !demoAgreed) && (
                        <p className="mt-3 flex items-center gap-2 text-xs text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 flex-shrink-0"><path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" /></svg>
                          Please fill in all required fields and confirm the Privacy Policy.
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Bottom text - bullets + contact */}
            <div className="px-5 pt-2 pb-8 lg:px-16 lg:pt-8 lg:pb-16">
              <ul className="hidden flex-col gap-3 lg:flex">
                {['30-minute live walkthrough', 'Tailored to your support stack', 'No commitment required'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-base text-white/80">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 text-white"><path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" /></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="lg:mt-6 lg:border-t lg:border-white/10 lg:pt-6">
                <div className="flex items-center justify-between lg:hidden">
                  <a href="mailto:info@supvision.ai" className="text-sm font-semibold text-white hover:text-blue-200 transition-colors">info@supvision.ai</a>
                  <div className="flex items-center gap-2">
                    <a href="https://www.linkedin.com/company/supvision-ai/" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    </a>
                    <a href="https://t.me/+447737124949" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    </a>
                    <a href="https://wa.me/447737124949" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    </a>
                  </div>
                </div>
                <div className="hidden lg:flex flex-col gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">Email</p>
                    <a href="mailto:info@supvision.ai" className="mt-1 block text-sm font-semibold text-white hover:text-blue-200 transition-colors">info@supvision.ai</a>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">Contact us directly</p>
                    <div className="mt-3 flex items-center gap-2">
                      <a href="https://www.linkedin.com/company/supvision-ai/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                      </a>
                      <a href="https://t.me/+447737124949" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                      </a>
                      <a href="https://wa.me/447737124949" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />
    </div>
  )
}

const faqItems = [
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
  {
    q: 'How is supVision priced?',
    a: 'supVision uses flat monthly pricing based on your support volume tier, not per-ticket or per-resolution fees. Your costs are predictable as ticket volume grows, and there is no financial incentive for the platform to leave issues unresolved. Contact us for a quote based on your scale.',
  },
  {
    q: 'What languages does supVision support?',
    a: 'supVision supports over 50 languages out of the box. Fintech teams expanding into new geographies can serve customers in their local language from day one, without hiring local support staff or training a new model.',
  },
  {
    q: 'How does supVision handle sensitive customer data?',
    a: 'Customer data is processed in accordance with GDPR. supVision operates on a zero-retention model for sensitive fields, PII and card data are never stored beyond the active session. All processing is logged with a traceable decision trail available to your compliance team on demand.',
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

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <section className="bg-[#faf8f5] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
        <div data-reveal className="mt-6 flex flex-col gap-3 lg:hidden" style={{ '--rd': '100ms' } as React.CSSProperties}>
          {faqItems.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>

        {/* Desktop: two independent columns so expanding one side doesn't shift the other */}
        <div data-reveal className="mt-6 hidden gap-3 lg:flex lg:items-start" style={{ '--rd': '100ms' } as React.CSSProperties}>
          <div className="flex flex-1 flex-col gap-3">
            {faqItems.filter((_, i) => i % 2 === 0).map((item) => {
              const i = faqItems.indexOf(item)
              return (
                <FAQItem
                  key={i}
                  item={item}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              )
            })}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {faqItems.filter((_, i) => i % 2 === 1).map((item) => {
              const i = faqItems.indexOf(item)
              return (
                <FAQItem
                  key={i}
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




const S = (d: string | string[], fr = false) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    {(Array.isArray(d) ? d : [d]).map((p, i) =>
      fr ? <path key={i} fillRule="evenodd" d={p} clipRule="evenodd" /> : <path key={i} d={p} />
    )}
  </svg>
)

const heroIndustries = [
  { label: 'Payments & Processing', icon: S(['M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z', 'M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z']) },
  { label: 'Digital Banking', icon: S('M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6ZM20.25 10.332v9.418H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.418a.75.75 0 0 1 0-1.5h15.75a.75.75 0 0 1 0 1.5Zm-4.5 0v5.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-5.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75Zm-8.25-.75a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h1.5a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-.75-.75H7.5Z', true) },
  { label: 'Web3', icon: S('M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.268a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z', true) },
  { label: 'Lending & Credit', icon: S(['M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z', 'M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z', 'M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z']) },
  { label: 'InsurTech', icon: S('M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z', true) },
]

const heroDesktopAgentFeatures = [
  { regular: 'Expand globally, ', bold: 'not your headcount', anim: expandGloballyAnim },
  { regular: 'Cut costs ', bold: 'without cutting quality', anim: cutCostAnim },
  { regular: 'Keep customers ', bold: 'before they churn', anim: heartAnim },
  { regular: 'Go live in 3 days, ', bold: 'not 6 months', anim: lightningAnim },
]

const complianceFeatures = [
  'GDPR-compliant data handling and right-to-erasure support',
  'PCI DSS aligned, no raw card data ever touches our system',
  'All data encrypted end-to-end and protected under a signed NDA — we cannot see your customer records',
]

const complianceCertCards = [
  {
    badge: '/gdpr.webp',
    badgeAlt: 'GDPR Compliant',
    title: 'GDPR Compliance',
    desc: 'GDPR-compliant data handling and right-to-erasure support.',
  },
  {
    badge: '/badge/image.webp',
    badgeAlt: 'PCI DSS Compliant',
    title: 'PCI DSS Aligned',
    desc: 'PCI DSS aligned — no raw card data ever touches our system.',
    badgeOversize: true,
  },
  {
    badge: '/nda.webp',
    badgeAlt: 'NDA protected',
    title: 'NDA-Protected Data',
    desc: 'All data encrypted end-to-end and protected under a signed NDA — we cannot see your customer records.',
  },
]



const valueProps = [
  {
    stat: '64%',
    headline: 'Cut support costs. Without hiring more agents.',
    body: 'SupVision deploys AI agents that resolve support queries, disputes, and transaction issues in seconds, at the scale your fintech demands.',
    img: '/hero_images/Component 174 (1).webp',
    imgAlt: 'Analytics dashboard showing cost reduction',
    robot: false,
    chips: [
      { label: 'Cost reduction', value: '−64%', accent: '#16a34a', top: 14, right: 14, left: undefined },
      { label: 'Tickets / month', value: '12,400+', accent: '#214995', top: 70, right: 14, left: undefined },
    ],
  },
  {
    stat: '1.2s',
    headline: 'From 1.2s response time to zero backlog.',
    body: 'SupVision gives fintech companies AI-powered customer support that\'s fast, compliant, and built to scale without growing your team.',
    img: '/hero_images/Component 174.webp',
    imgAlt: 'Live chat with instant AI response',
    robot: false,
    robotOverlay: '/robot/robot_flying.webp',
    robotSide: 'right' as const,
    chips: [
      { label: 'Avg response', value: '1.2s', accent: '#7c3aed', top: 14, right: 14, left: undefined },
      { label: 'Queue status', value: 'Empty ✓', accent: '#16a34a', top: 70, right: 14, left: undefined },
    ],
  },
  {
    stat: '3 days',
    headline: 'Live in 3 days. Not 6 months.',
    body: 'No platform migration, no lengthy implementation. SupVision connects to your existing helpdesk, identity verification provider, and CRM in days - then you\'re live.',
    img: '/hero_images/Component 172.webp',
    imgAlt: 'Onboarding and integration setup flow',
    robot: false,
    robotSide: 'left' as const,
    chips: [
      { label: 'Status', value: '✓ Live', accent: '#16a34a', top: 14, right: undefined, left: 14 },
      { label: 'Go-live time', value: 'Day 3 of 3', accent: '#214995', top: 70, right: undefined, left: 14 },
    ],
  },
  {
    stat: '93%',
    headline: 'Ticket saves. No human required.',
    body: 'supVision handles 72% of all message flow and fully closes 49% of cases on its own. Your agents step in only when they\'re genuinely needed.',
    img: '/hero_images/Component 175.webp',
    imgAlt: 'Tier-1 tickets resolved automatically',
    robot: false,
    chips: [
      { label: 'Auto-resolved', value: '93%', accent: '#214995', top: 14, right: 14, left: undefined },
      { label: 'Backlog', value: '0 tickets', accent: '#16a34a', top: 70, right: 14, left: undefined },
    ],
  },
]

function StackLogo({ logoUrl, color, letter }: { logoUrl: string; color: string; letter: string }) {
  const [err, setErr] = useState(false)
  return err ? (
    <span
      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-white font-bold"
      style={{ backgroundColor: color, fontSize: '9px' }}
    >
      {letter}
    </span>
  ) : (
    <img
      src={logoUrl}
      alt=""
      className="h-7 w-7 rounded-full border-2 border-white object-contain bg-white"
      onError={() => setErr(true)}
    />
  )
}

const automationStacks: { label: string; desc: string; tools: string[]; logos: { logoUrl: string; color: string; letter: string }[] }[] = [
  {
    label: 'Onboarding automation',
    desc: 'Zendesk · Confluence · Slack',
    tools: ['Zendesk'],
    logos: [
      { logoUrl: '/logos/zendesk.webp', color: '#03363D', letter: 'Z' },
      { logoUrl: '/logos/confluence.webp', color: '#0052CC', letter: 'C' },
      { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' },
    ],
  },
  {
    label: 'Dispute escalation flow',
    desc: 'Intercom · Jira · Slack',
    tools: ['Intercom'],
    logos: [
      { logoUrl: '/logos/intecom (1).webp', color: '#1F8FEF', letter: 'I' },
      { logoUrl: '/logos/jira.webp', color: '#0052CC', letter: 'J' },
      { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' },
    ],
  },
  {
    label: 'Policy-driven responses',
    desc: 'Freshdesk · Notion · Teams',
    tools: ['Freshdesk'],
    logos: [
      { logoUrl: '/logos/freshdesk.webp', color: '#25C16F', letter: 'F' },
      { logoUrl: '/logos/notion.webp', color: '#000', letter: 'N' },
      { logoUrl: '/logos/teams.webp', color: '#6264A7', letter: 'T' },
    ],
  },
  {
    label: 'CRM-aware support',
    desc: 'Salesforce · HubSpot · Slack',
    tools: ['Salesforce CRM'],
    logos: [
      { logoUrl: '/logos/salesforce.webp', color: '#00A1E0', letter: 'S' },
      { logoUrl: '/logos/hubspot.webp', color: '#FF7A59', letter: 'H' },
      { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' },
    ],
  },
  {
    label: 'WhatsApp support flow',
    desc: 'WhatsApp · HubSpot · Mambu',
    tools: ['WhatsApp'],
    logos: [
      { logoUrl: '/logos/whatsapp.webp', color: '#25D366', letter: 'W' },
      { logoUrl: '/logos/hubspot.webp', color: '#FF7A59', letter: 'H' },
      { logoUrl: '/logos/mambu.webp', color: '#FF3B00', letter: 'M' },
    ],
  },
  {
    label: 'Telegram CRM bot',
    desc: 'Telegram · Pipedrive · HubSpot',
    tools: ['Telegram'],
    logos: [
      { logoUrl: '/logos/telegram.webp', color: '#26A5E4', letter: 'T' },
      { logoUrl: '/logos/Pipedrive.webp', color: '#1A1F36', letter: 'P' },
      { logoUrl: '/logos/hubspot.webp', color: '#FF7A59', letter: 'H' },
    ],
  },
  {
    label: 'Email triage & routing',
    desc: 'Gmail · Confluence · Jira',
    tools: ['Gmail'],
    logos: [
      { logoUrl: '/logos/gmail.webp', color: '#EA4335', letter: '@' },
      { logoUrl: '/logos/confluence.webp', color: '#0052CC', letter: 'C' },
      { logoUrl: '/logos/jira.webp', color: '#0052CC', letter: 'J' },
    ],
  },
  {
    label: 'HubSpot onboarding flow',
    desc: 'HubSpot · Intercom · Mambu',
    tools: ['HubSpot'],
    logos: [
      { logoUrl: '/logos/hubspot.webp', color: '#FF7A59', letter: 'H' },
      { logoUrl: '/logos/intecom (1).webp', color: '#1F8FEF', letter: 'I' },
      { logoUrl: '/logos/mambu.webp', color: '#FF3B00', letter: 'M' },
    ],
  },
  {
    label: 'Zendesk + Mambu stack',
    desc: 'Zendesk · Mambu · Slack',
    tools: ['Zendesk'],
    logos: [
      { logoUrl: '/logos/zendesk.webp', color: '#03363D', letter: 'Z' },
      { logoUrl: '/logos/mambu.webp', color: '#FF3B00', letter: 'M' },
      { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' },
    ],
  },
  {
    label: 'Intercom + Notion combo',
    desc: 'Intercom · HubSpot · Notion',
    tools: ['Intercom'],
    logos: [
      { logoUrl: '/logos/intecom (1).webp', color: '#1F8FEF', letter: 'I' },
      { logoUrl: '/logos/hubspot.webp', color: '#FF7A59', letter: 'H' },
      { logoUrl: '/logos/notion.webp', color: '#000', letter: 'N' },
    ],
  },
  {
    label: 'WhatsApp sales support',
    desc: 'WhatsApp · Salesforce · Mambu',
    tools: ['WhatsApp', 'Salesforce CRM'],
    logos: [
      { logoUrl: '/logos/whatsapp.webp', color: '#25D366', letter: 'W' },
      { logoUrl: '/logos/salesforce.webp', color: '#00A1E0', letter: 'S' },
      { logoUrl: '/logos/mambu.webp', color: '#FF3B00', letter: 'M' },
    ],
  },
  {
    label: 'Freshdesk + Linear queue',
    desc: 'Freshdesk · Linear · Notion',
    tools: ['Freshdesk'],
    logos: [
      { logoUrl: '/logos/freshdesk.webp', color: '#25C16F', letter: 'F' },
      { logoUrl: '/logos/linear.webp', color: '#5E6AD2', letter: 'L' },
      { logoUrl: '/logos/notion.webp', color: '#000', letter: 'N' },
    ],
  },
  {
    label: 'Telegram CRM integration',
    desc: 'Telegram · HubSpot · Pipedrive',
    tools: ['Telegram'],
    logos: [
      { logoUrl: '/logos/telegram.webp', color: '#26A5E4', letter: 'T' },
      { logoUrl: '/logos/hubspot.webp', color: '#FF7A59', letter: 'H' },
      { logoUrl: '/logos/Pipedrive.webp', color: '#1A1F36', letter: 'P' },
    ],
  },
  {
    label: 'Zoho + WhatsApp flow',
    desc: 'Zoho CRM · WhatsApp · Guru',
    tools: ['Zoho CRM', 'WhatsApp'],
    logos: [
      { logoUrl: '/logos/zoro.webp', color: '#E42527', letter: 'Z' },
      { logoUrl: '/logos/whatsapp.webp', color: '#25D366', letter: 'W' },
      { logoUrl: '/guru.webp', color: '#CC4E00', letter: 'G' },
    ],
  },
  {
    label: 'Email + Salesforce pipeline',
    desc: 'Gmail · Salesforce · Confluence',
    tools: ['Gmail', 'Salesforce CRM'],
    logos: [
      { logoUrl: '/logos/gmail.webp', color: '#EA4335', letter: '@' },
      { logoUrl: '/logos/salesforce.webp', color: '#00A1E0', letter: 'S' },
      { logoUrl: '/logos/confluence.webp', color: '#0052CC', letter: 'C' },
    ],
  },
  {
    label: 'Live chat + Pipedrive',
    desc: 'Intercom · Pipedrive · Notion',
    tools: ['Intercom'],
    logos: [
      { logoUrl: '/logos/intecom (1).webp', color: '#1F8FEF', letter: 'I' },
      { logoUrl: '/logos/Pipedrive.webp', color: '#1A1F36', letter: 'P' },
      { logoUrl: '/logos/notion.webp', color: '#000', letter: 'N' },
    ],
  },
  {
    label: 'Intercom + Mambu onboarding',
    desc: 'Intercom · Mambu · Notion',
    tools: ['Intercom'],
    logos: [
      { logoUrl: '/logos/intecom (1).webp', color: '#1F8FEF', letter: 'I' },
      { logoUrl: '/logos/mambu.webp', color: '#FF3B00', letter: 'M' },
      { logoUrl: '/logos/notion.webp', color: '#000', letter: 'N' },
    ],
  },
  {
    label: 'Zendesk + Teams queue',
    desc: 'Zendesk · Teams · Linear',
    tools: ['Zendesk'],
    logos: [
      { logoUrl: '/logos/zendesk.webp', color: '#03363D', letter: 'Z' },
      { logoUrl: '/logos/teams.webp', color: '#6264A7', letter: 'T' },
      { logoUrl: '/logos/linear.webp', color: '#5E6AD2', letter: 'L' },
    ],
  },
  {
    label: 'Pipedrive deal support',
    desc: 'Pipedrive · Telegram · HubSpot',
    tools: ['Pipedrive'],
    logos: [
      { logoUrl: '/logos/Pipedrive.webp', color: '#1A1F36', letter: 'P' },
      { logoUrl: '/logos/telegram.webp', color: '#26A5E4', letter: 'T' },
      { logoUrl: '/logos/hubspot.webp', color: '#FF7A59', letter: 'H' },
    ],
  },
  {
    label: 'Freshdesk enterprise stack',
    desc: 'Freshdesk · Salesforce · Mambu',
    tools: ['Freshdesk', 'Salesforce CRM'],
    logos: [
      { logoUrl: '/logos/freshdesk.webp', color: '#25C16F', letter: 'F' },
      { logoUrl: '/logos/salesforce.webp', color: '#00A1E0', letter: 'S' },
      { logoUrl: '/logos/mambu.webp', color: '#FF3B00', letter: 'M' },
    ],
  },
  {
    label: 'WhatsApp + Pipedrive flow',
    desc: 'WhatsApp · Pipedrive · Mambu',
    tools: ['WhatsApp'],
    logos: [
      { logoUrl: '/logos/whatsapp.webp', color: '#25D366', letter: 'W' },
      { logoUrl: '/logos/Pipedrive.webp', color: '#1A1F36', letter: 'P' },
      { logoUrl: '/logos/mambu.webp', color: '#FF3B00', letter: 'M' },
    ],
  },
]
