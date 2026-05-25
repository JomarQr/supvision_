import { FormEvent, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { submitContactForm } from '../lib/contactApi'
import HeroDashboard, { type DashboardView } from '../components/home/HeroDashboard'
import { LANGUAGES, LANG_SLOT, LOG_SCENARIOS } from '../components/home/solutionShowcaseData'

type EscStatus = 'below' | 'routing' | 'resolved'
const ESC_SCENARIOS: Array<{ user: string; bot: string; user2: string; bot2: string; confidence: number; status: EscStatus }> = [
  { user: 'Card charged twice — need a dispute', bot: 'I see a duplicate. Can you confirm the amount?', user2: '£89.99 — charged yesterday',               bot2: '@support_team chargeback needed — duplicate £89.99',          confidence: 31, status: 'below'    },
  { user: "What's my account balance?",          bot: 'Let me pull that up for you.',                   user2: 'My main EUR account please',               bot2: 'Your balance is €2,847.50 ✓',                                 confidence: 87, status: 'resolved' },
  { user: 'Suspicious transaction — £2,400',     bot: 'Did you authorise this payment?',                user2: "No, I didn't make this",                   bot2: '@support_team suspicious £2,400 txn — customer disputes it',  confidence: 22, status: 'routing'  },
  { user: 'When does my card expire?',            bot: 'Which card — Visa or Mastercard?',              user2: 'Visa ending in 4821',                      bot2: 'Your card expires 09/2027 ✓',                                 confidence: 94, status: 'resolved' },
  { user: 'My limit dropped without notice',      bot: 'Let me check your account settings.',           user2: 'From £5,000 to £1,000 overnight',          bot2: '@support_team limit reduced without notice — review needed',  confidence: 35, status: 'below'    },
]

const PERSONAS = [
  { label: 'Payments & Processing',      stacks: ['Dispute escalation flow', 'WhatsApp support flow', 'Zendesk + Mambu stack', 'Telegram CRM bot', 'Email triage & routing'] },
  { label: 'Neobanks & Digital Banking', stacks: ['Onboarding automation', 'HubSpot onboarding flow', 'Zendesk + Mambu stack', 'CRM-aware support'] },
  { label: 'Web3',                        stacks: ['Telegram CRM bot', 'WhatsApp support flow', 'CRM-aware support', 'Telegram CRM integration'] },
  { label: 'Lending & Credit',            stacks: ['CRM-aware support', 'WhatsApp sales support', 'Policy-driven responses', 'Email triage & routing'] },
  { label: 'InsurTech',                   stacks: ['Policy-driven responses', 'Freshdesk + Linear queue', 'Email triage & routing'] },
]


const FEATURE_TABS: Array<{ key: string; label: string; heading: string; description: string; features: { title: string; body: string; view: DashboardView }[]; reversed?: boolean }> = [
  {
    key: 'Control',
    label: 'CONTROL',
    heading: 'Define exactly how supVision responds',
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
    reversed: true,
    heading: 'An AI that shapes itself to your business',
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
    heading: 'See exactly what your AI is doing',
    description: 'Every conversation, decision, and escalation is logged. Get the audit trail, analytics, and confidence scores your compliance team actually needs.',
    features: [
      { title: 'Audit Logs', body: 'Full conversation history with timestamps, confidence scores, and escalation reasons — exportable for compliance.', view: 'audit-logs' as DashboardView },
      { title: 'Confidence Reporting', body: 'See where the AI is uncertain — identify gaps in your knowledge base before they affect customers.', view: 'confidence-reporting' as DashboardView },
      { title: 'Team Performance', body: 'Compare AI vs. human resolution rates, response times, and satisfaction scores side by side.', view: 'team-performance' as DashboardView },
      { title: 'Resolution Analytics', body: 'Track auto-resolution rates, avg. response times, and escalation volume by topic, channel, and time period.', view: 'analytics' as DashboardView },
    ],
  },
]

const ALL_STEPS = FEATURE_TABS.flatMap(tab =>
  tab.features.map((_f, fi) => ({ tabKey: tab.key, featureIdx: fi }))
)
const STEP_HEIGHT_VH = 75
const CONTAINER_HEIGHT_VH = 100 + STEP_HEIGHT_VH * (ALL_STEPS.length - 1)

function FeatureTabSection() {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [openIdx, setOpenIdx] = useState(0)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const activeKeyRef = useRef<string | null>(null)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const tab = FEATURE_TABS.find(t => t.key === activeKey) ?? null
  const reversed = tab?.reversed ?? false
  const expanded = activeKey !== null
  const dashView: DashboardView = (expanded && tab && openIdx >= 0) ? (tab.features[openIdx]?.view ?? 'default') : 'default'

  function animateImage(fromTabKey: string | null, toTabKey: string) {
    const el = imgWrapRef.current
    if (!el || fromTabKey === toTabKey) return
    const fromR = FEATURE_TABS.find(t => t.key === fromTabKey)?.reversed ?? false
    const toR   = FEATURE_TABS.find(t => t.key === toTabKey)?.reversed   ?? false
    el.getAnimations().forEach(a => a.cancel())
    const fromX = (!fromR && toR) ? '55%' : (fromR && !toR) ? '-55%' : '18px'
    el.animate(
      [{ transform: `translateX(${fromX})`, opacity: 0.4 }, { transform: 'translateX(0)', opacity: 1 }],
      { duration: 580, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
    )
  }

  function applyStep(stepIdx: number) {
    const step = ALL_STEPS[Math.max(0, Math.min(stepIdx, ALL_STEPS.length - 1))]
    if (!step) return
    if (step.tabKey !== activeKeyRef.current) {
      animateImage(activeKeyRef.current, step.tabKey)
      activeKeyRef.current = step.tabKey
    }
    setActiveKey(step.tabKey)
    setOpenIdx(step.featureIdx)
  }

  useEffect(() => {
    const handler = () => {
      const el = containerRef.current
      if (!el) return
      if (el.offsetHeight === 0) return
      const rect = el.getBoundingClientRect()
      if (rect.top > window.innerHeight * 0.8) {
        if (activeKeyRef.current !== null) { activeKeyRef.current = null; setActiveKey(null); setOpenIdx(0) }
        return
      }
      const totalScroll = (ALL_STEPS.length - 1) * (STEP_HEIGHT_VH / 100) * window.innerHeight
      const progress = Math.max(0, Math.min(1, -rect.top / totalScroll))
      applyStep(Math.floor(progress * ALL_STEPS.length + 0.05))
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function scrollToStep(stepIdx: number) {
    const el = containerRef.current
    if (!el) return
    const absTop = window.scrollY + el.getBoundingClientRect().top
    const target = absTop + stepIdx * (STEP_HEIGHT_VH / 100) * window.innerHeight
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  function handleTabClick(key: string) {
    const idx = ALL_STEPS.findIndex(s => s.tabKey === key)
    if (idx >= 0) scrollToStep(idx)
  }

  function handleFeatureClick(tabKey: string, featureIdx: number) {
    const idx = ALL_STEPS.findIndex(s => s.tabKey === tabKey && s.featureIdx === featureIdx)
    if (idx >= 0) scrollToStep(idx)
  }

  return (
    <div ref={containerRef} style={{ height: `${CONTAINER_HEIGHT_VH}vh` }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: isMobile ? '12vh' : '26vh', paddingBottom: '1rem' }}>
        {/* What is supVision? — absolutely positioned so tabs stay centered */}
        <div className={`text-center ${isMobile ? 'px-5' : ''}`} style={{ position: 'absolute', top: isMobile ? '3vh' : '7vh', left: 0, right: 0 }}>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-4xl'} leading-tight text-gray-900`} style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
            What is supVision?
          </h2>
          <p className={`mt-2 mx-auto ${isMobile ? 'max-w-xs text-sm' : 'max-w-2xl text-base'} leading-relaxed text-gray-500`}>
            supVision is the platform that lets you run an autonomous AI support agent — and stay fully in control of how it behaves. Set the rules, define the limits, and let it work. No surprises, no black boxes. Your agent, on your terms.
          </p>
        </div>

        {/* Tab pills */}
        <div className="mb-4 mt-10 flex items-center justify-center gap-2">
          {FEATURE_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => handleTabClick(t.key)}
              className="rounded-full border font-medium transition-all duration-200"
              style={{
                padding: isMobile ? '0.25rem 0.875rem' : '0.375rem 1.25rem',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                backgroundColor: activeKey === t.key ? '#111827' : '#F3EFE9',
                borderColor: activeKey === t.key ? '#111827' : '#d4cfc8',
                color: activeKey === t.key ? '#fff' : '#6b7280',
              }}
            >
              {t.key}
            </button>
          ))}
        </div>

        {/* Content row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: expanded ? (isMobile ? '0.75rem' : '2.5rem') : '0',
            flexDirection: isMobile ? 'column' : (reversed ? 'row-reverse' : 'row'),
            justifyContent: (expanded || isMobile) ? 'flex-start' : 'center',
            transition: 'gap 0.55s ease',
          }}
        >
          {/* Text panel — above dashboard on mobile */}
          {isMobile && (
            <div
              style={{
                width: '100%',
                maxHeight: expanded ? '28vh' : '0px',
                opacity: expanded ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease',
              }}
            >
              {tab && (
                <div className="divide-y divide-gray-200 px-2">
                  {tab.features.map((f, i) => (
                    <div key={f.title}>
                      <button
                        onClick={() => handleFeatureClick(tab.key, i)}
                        className="flex w-full items-center justify-between py-2.5 text-left"
                      >
                        <span className={`text-sm font-semibold transition-colors ${openIdx === i ? 'text-gray-900' : 'text-gray-400'}`}>{f.title}</span>
                        <span className="ml-3 flex-shrink-0 text-xl leading-none text-gray-400">{openIdx === i ? '−' : '+'}</span>
                      </button>
                      {openIdx === i && (
                        <p className="pb-2 text-xs leading-relaxed text-gray-500">{f.body}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Text panel — desktop */}
          {!isMobile && (
            <div
              style={{
                flexShrink: 0,
                width: expanded ? '42%' : '0%',
                opacity: expanded ? 1 : 0,
                overflow: 'hidden',
                transition: 'width 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease',
              }}
            >
              {tab && (
                <div className="divide-y divide-gray-200">
                  {tab.features.map((f, i) => (
                    <div key={f.title}>
                      <button
                        onClick={() => handleFeatureClick(tab.key, i)}
                        className="flex w-full items-center justify-between py-4 text-left"
                      >
                        <span className={`text-xl font-semibold transition-colors ${openIdx === i ? 'text-gray-900' : 'text-gray-400'}`}>{f.title}</span>
                        <span className="ml-4 flex-shrink-0 text-2xl leading-none text-gray-400">{openIdx === i ? '−' : '+'}</span>
                      </button>
                      {openIdx === i && (
                        <p className="pb-4 text-sm leading-relaxed text-gray-500">{f.body}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Dashboard */}
          <div
            ref={imgWrapRef}
            style={{
              flexShrink: 0,
              width: isMobile ? '100%' : (expanded ? '58%' : '80%'),
              transition: 'width 0.55s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {isMobile ? (
              <div style={{ overflow: 'hidden', borderRadius: '1rem', height: 268 }}>
                <div style={{ transform: 'scale(0.536)', transformOrigin: 'top left', width: '186.6%', height: 500, flexShrink: 0 }}>
                  <HeroDashboard animated={expanded} view={expanded ? dashView : 'default'} />
                </div>
              </div>
            ) : (
              <HeroDashboard animated={expanded} view={dashView} />
            )}
          </div>
        </div>

        {/* Skip button */}
        <div className={`${isMobile ? 'mt-4' : 'mt-16'} flex justify-center`}>
          <button
            onClick={() => scrollToStep(ALL_STEPS.length - 1)}
            className="flex flex-col items-center gap-1 text-sm font-medium text-gray-400 transition-all hover:text-gray-600"
          >
            Skip
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 animate-bounce">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const clipRef = useRef<HTMLDivElement>(null)
  const dashboardPanelRef = useRef<HTMLDivElement>(null)
  const dashboardGlassRef = useRef<HTMLDivElement>(null)
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
    () => Array.from({ length: 11 }, (_, i) => ({ id: i, langIdx: i % LANGUAGES.length, slot: i }))
  )
  const [liftedSlot, setLiftedSlot] = useState(1)
  const [activePersona, setActivePersona] = useState<number | null>(null)
  const [logScene, setLogScene] = useState(0)
  const [logRevealedSteps, setLogRevealedSteps] = useState(0)
  const [logDecisionShown, setLogDecisionShown] = useState(false)
  const [logFading, setLogFading] = useState(false)
  const [escIdx, setEscIdx] = useState(0)
  const [escPhase, setEscPhase] = useState(0)
  const [testimonialIdx, setTestimonialIdx] = useState(0)

  useEffect(() => {
    const delays = [500, 1000, 900, 1100, 950, 3400]
    const t = setTimeout(() => {
      if (escPhase < 5) {
        setEscPhase(p => p + 1)
      } else {
        setEscPhase(0)
        setEscIdx(i => (i + 1) % ESC_SCENARIOS.length)
      }
    }, delays[escPhase])
    return () => clearTimeout(t)
  }, [escPhase, escIdx])

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
      setLiftedSlot(s => (s >= 10 ? 1 : s + 1))
    }, 600)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const scenario = LOG_SCENARIOS[logScene]
    const timers: ReturnType<typeof setTimeout>[] = []
    setLogRevealedSteps(0)
    setLogDecisionShown(false)
    setLogFading(false)
    scenario.steps.forEach((_, i) => {
      timers.push(setTimeout(() => setLogRevealedSteps(i + 1), 600 + i * 750))
    })
    const afterSteps = 600 + scenario.steps.length * 750
    timers.push(setTimeout(() => setLogDecisionShown(true), afterSteps + 400))
    timers.push(setTimeout(() => setLogFading(true), afterSteps + 2400))
    timers.push(setTimeout(() => setLogScene(s => (s + 1) % LOG_SCENARIOS.length), afterSteps + 2900))
    return () => timers.forEach(clearTimeout)
  }, [logScene])

  useEffect(() => {
    const onScroll = () => {
      if (!clipRef.current) return
      if (window.innerWidth < 1024) {
        clipRef.current.style.left = '0px'
        clipRef.current.style.right = '0px'
        clipRef.current.style.borderBottomLeftRadius = '0px'
        clipRef.current.style.borderBottomRightRadius = '0px'
        return
      }
      const progress = Math.min(window.scrollY / 60, 1)
      const margin = progress * 28
      const radius = progress * 48
      clipRef.current.style.left = `${margin}px`
      clipRef.current.style.right = `${margin}px`
      clipRef.current.style.borderBottomLeftRadius = `${radius}px`
      clipRef.current.style.borderBottomRightRadius = `${radius}px`
      if (dashboardPanelRef.current && dashboardGlassRef.current) {
        const vpWidth = window.innerWidth
        const panelRight = dashboardPanelRef.current.offsetLeft + dashboardPanelRef.current.offsetWidth
        const clipFromRight = Math.max(0, panelRight - (vpWidth - margin))
        dashboardGlassRef.current.style.clipPath = clipFromRight > 0 ? `inset(0 ${clipFromRight}px 0 0)` : ''
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])


  return (
    <div>
      {/* Hero */}
      <section data-nav-dark className="relative flex overflow-hidden lg:overflow-visible lg:min-h-screen items-start" style={{ backgroundColor: '#faf8f5' }}>
        {/* Clipping wrapper - shrinks on scroll, clips only bg */}
        <div ref={clipRef} className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/bg/hero-bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>

        {/* Hero right — chat preview, в пределах viewport справа */}
        <div
          ref={dashboardPanelRef}
          className="absolute z-20 hidden lg:block"
          style={{
            top: '46%',
            left: '52.5%',
            right: 'clamp(1rem, 2vw, 2rem)',
            transform: 'translateY(-50%)',
          }}
        >
          <div ref={dashboardGlassRef}>
            <HeroDashboard />
          </div>
        </div>

        {/* Left content column */}
        <div
          className="relative z-10 flex w-full flex-col self-stretch pt-14 lg:w-[53vw] lg:pt-24"
          style={{
            paddingBottom: '2rem',
            paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2 + 1.5rem))',
            paddingRight: '1rem',
          }}
        >
          {/* Text block */}
          <div className="mt-4 lg:pr-8 lg:mt-12">
            {/* Mobile badge */}
            <div className="mb-8 flex justify-center lg:hidden">
              <span className="rounded-lg border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
                AI support layer for Fintech
              </span>
            </div>
            {/* Desktop badge */}
            <div className="mb-6 hidden lg:inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-base font-medium text-white backdrop-blur-sm">
              An AI support layer tailored for fintech industries
            </div>

            {/* Mobile headline */}
            <h1 className="mt-3 flex flex-col text-5xl leading-tight text-center lg:hidden" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
              <span className="text-white"><span style={{ fontWeight: 800 }}>Agentic</span> Support Team</span>
              <span className="text-white">for <span style={{ fontWeight: 800 }}>Fintech</span> Industry</span>
            </h1>
            {/* Desktop headline */}
            <h1
              className="mt-3 hidden flex-col leading-tight lg:flex lg:text-left"
              style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: 'clamp(2.6rem, 3.8vw, 3.75rem)' }}
            >
              <span className="text-white whitespace-nowrap"><span style={{ fontWeight: 800 }}>Agentic</span> Support Team</span>
              <span className="text-white whitespace-nowrap">for <span style={{ fontWeight: 800 }}>Fintech</span> Industry</span>
            </h1>

            <p className="mt-8 text-base leading-relaxed text-white text-center lg:text-left max-w-xs lg:max-w-xl mx-auto lg:mx-0">
              The dispute resolved before the customer hit refresh. The onboarding done before compliance got involved. The answer ready before the ticket was even opened.
            </p>

            <div className="mt-6 flex w-full justify-center lg:justify-start">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-900"
                style={{ backgroundColor: '#E5D9CC' }}
              >
                <span className="lg:hidden">Book a Demo</span>
                <span className="hidden lg:inline">Let&apos;s chat</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-gray-900">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

          </div>

          {/* Industries ticker — mobile: above dashboard */}
          <p className="mt-6 text-center text-xs font-semibold tracking-wide text-white/50 lg:hidden">
            Built exclusively for:
          </p>
          <div
            className="mt-3 -mx-4 overflow-hidden lg:hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 82%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 82%, transparent 100%)',
            }}
          >
            <div
              className="flex items-center gap-10"
              style={{ width: 'max-content', animation: 'ticker 28s linear infinite' }}
            >
              {[...heroIndustries, ...heroIndustries].map((item, i) => (
                <div key={i} className="flex-shrink-0 flex items-center gap-2">
                  <div className="[&_svg]:h-5 [&_svg]:w-5" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.icon}</div>
                  <span className="text-sm font-semibold whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile dashboard — scaled down to fit */}
          <div className="relative z-10 mt-10 lg:hidden mx-3 overflow-hidden rounded-2xl" style={{ height: 315 }}>
            <div style={{ transform: 'scale(0.63)', transformOrigin: 'top left', width: '158.7%', height: 500, flexShrink: 0 }}>
              <HeroDashboard animated={true} view="default" />
            </div>
          </div>
          {/* Spacer so lower section doesn't overlap chat card */}
          <div className="pb-8 lg:hidden" />

          {/* Industries ticker — desktop only (mobile version is above dashboard) */}
          <div
            className="mt-24 hidden overflow-hidden lg:block"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 82%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 82%, transparent 100%)',
            }}
          >
            <div
              className="flex items-center gap-10"
              style={{ width: 'max-content', animation: 'ticker 28s linear infinite' }}
            >
              {[...heroIndustries, ...heroIndustries].map((item, i) => (
                <div key={i} className="flex-shrink-0 flex items-center gap-2">
                  <div className="[&_svg]:h-5 [&_svg]:w-5" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.icon}</div>
                  <span className="text-sm font-semibold whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Feature blocks - desktop only, pinned to bottom of hero */}
        <div className="hidden lg:absolute lg:bottom-10 lg:left-0 lg:right-0 lg:z-10 lg:block lg:px-8">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-4 lg:gap-4">
            {heroDesktopAgentFeatures.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 rounded-2xl px-5 py-5"
                style={{
                  background: '#F3EFE9',
                  border: '1px solid #e6ddd2',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full"
                  style={{
                    width: '40px', height: '40px',
                    background: '#214995',
                    color: '#fff',
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-snug">{item.label}</p>
                  {item.desc && <p className="mt-1 text-xs leading-snug text-gray-500">{item.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions + Stat cards */}
      <section className="relative z-10 -mt-10 rounded-t-[2.5rem] pt-16 pb-20 px-4 sm:px-6 lg:rounded-none lg:mt-0 lg:pt-16 bg-[#F1EDE9] lg:bg-[#faf8f5]">
        <div className="mx-auto max-w-7xl px-6">

          {/* ── ZONE 1: Intro + 4 metrics ── desktop */}
          <div className="hidden lg:block">
            {/* Intro text */}
            <div className="mb-10 text-center">
              <h2 className="text-4xl leading-snug text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
                Still paying agents to answer the same<br /><span style={{ fontWeight: 700 }}>questions every day?</span>
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-gray-500">
                Disputes, KYC checks, payment failures — <strong className="text-gray-700">supVision handles them automatically</strong>, so your team only touches cases that genuinely need a human.
              </p>
            </div>

            {/* 4 metric cards in a row */}
            <div className="grid grid-cols-2 gap-5">
              {/* 10x faster */}
              <div className="relative overflow-hidden rounded-[2rem] px-8 py-8" style={{ backgroundColor: '#F3EFE9' }}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Response speed</p>
                <p className="mt-2 leading-none tracking-tight whitespace-nowrap" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '3.5rem', color: '#111827' }}>10x faster</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">10 times faster than manual support — avg. <strong className="text-gray-700">1.2s</strong> to resolution, so customers get answers in seconds, not minutes.</p>
              </div>
              {/* 68% */}
              <div className="relative overflow-hidden rounded-[2rem] px-8 py-8" style={{ backgroundColor: '#F3EFE9' }}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Support costs</p>
                <p className="mt-2 leading-none tracking-tight whitespace-nowrap" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '3.5rem', color: '#111827' }}>68% cheaper</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">Cut support costs by 68% on repetitive tier-1 volume — without adding headcount. Your team stays focused on work that actually needs a human.</p>
              </div>
              {/* 93% */}
              <div className="rounded-[2rem] px-8 py-8" style={{ backgroundColor: '#F3EFE9' }}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Tickets handled</p>
                <p className="mt-2 leading-none tracking-tight whitespace-nowrap" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '3.5rem', color: '#111827' }}>93% resolved</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">93% of tickets fully resolved automatically. Complex or high-risk cases are escalated to human agents for a precise, careful response.</p>
              </div>
              {/* 3 days */}
              <div className="relative overflow-hidden rounded-[2rem] px-8 py-8" style={{ backgroundColor: '#214995' }}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Integration time</p>
                <p className="mt-2 leading-none tracking-tight" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '3.5rem', color: '#fff' }}>3 days</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">Most companies go live within 3 days by connecting the tools they already use — Zendesk, Freshdesk, Intercom, or a custom CRM. No rebuilding, no disruption.</p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                to="/support-agent"
                className="inline-flex min-w-[10rem] items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
              >
                Learn more
              </Link>
              <Link
                to="/integrations"
                className="inline-flex min-w-[10rem] items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: '#111827' }}
              >
                Explore
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>


            <FeatureTabSection />
          </div>

          {/* ── ZONE 2: Core Functionalities ── desktop */}
          <div className="mt-20 mb-20 hidden lg:block">

            <div className="mb-6 text-center">
              <h2 className="text-4xl text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
                Everything you need,{' '}<span style={{ fontWeight: 700 }}>out of the box</span>
              </h2>
            </div>

            {/* Animated feature cards */}
            {(() => {
              const orbitAll = [
                { name: 'WhatsApp',   src: '/logos/whatsapp.png' },
                { name: 'Zendesk',    src: '/logos/zendesk.png' },
                { name: 'Telegram',   src: '/logos/telegram.png' },
                { name: 'HubSpot',    src: '/logos/hubspot.png' },
                { name: 'Slack',      src: '/logos/slack.png' },
                { name: 'Salesforce', src: '/logos/salesforce.png' },
                { name: 'Messenger',  src: '/logos/facebook messenger.png' },
                { name: 'Jira',       src: '/logos/jira.png' },
                { name: 'Teams',      src: '/logos/teams.png' },
                { name: 'Freshdesk',  src: '/logos/freshdesk.png' },
                { name: 'WeChat',     src: '/logos/wechat.png' },
                { name: 'Intercom',   src: '/logos/intecom (1).png' },
                { name: 'Viber',      src: '/logos/viber.png' },
                { name: 'Notion',     src: '/logos/notion.png' },
                { name: 'Line',       src: '/logos/line.png' },
                { name: 'Confluence', src: '/logos/confluence.png' },
              ]
              const orbitDur = 20
              return (
                <div className="mt-10 grid grid-cols-2 gap-6">
                  {/* 100+ Languages — square */}
                  <div className="rounded-2xl bg-white px-6 py-6 shadow-sm border border-gray-100 flex flex-col aspect-square overflow-hidden">
                    <p className="text-base font-semibold text-gray-900">100+ Languages</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">supVision automatically detects your customer's language and responds in kind — whether it's English, Arabic, or Mandarin. No setup, no routing rules, no extra cost.</p>
                    <div className="mt-4 rounded-xl flex-1 relative overflow-hidden bg-gray-50 border border-gray-100">
                      {langItems.map(({ id, langIdx, slot }) => {
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

                  {/* Smart escalation — square */}
                  <div className="rounded-2xl bg-white px-6 py-6 shadow-sm border border-gray-100 flex flex-col aspect-square overflow-hidden">
                    <p className="text-base font-semibold text-gray-900">Smart escalation &amp; fallback</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">The bot detects uncertainty and routes to a human agent — before the customer even notices.</p>
                    <div className="mt-4 flex-1 rounded-2xl overflow-hidden flex flex-col" style={{ background: 'linear-gradient(135deg, #1a2744 0%, #214995 100%)' }}>
                      {(() => {
                        const sc = ESC_SCENARIOS[escIdx]
                        const isBelow = sc.confidence < 40
                        const barColor = isBelow ? '#ef4444' : '#22c55e'
                        const bot2Parts = sc.bot2.split(/(@support_team)/)
                        return (
                          <div className="flex flex-col h-full px-4 pt-4 pb-4 gap-3">
                            {/* Messages — top-aligned */}
                            <div className="flex flex-col gap-3 flex-1 overflow-hidden">
                              {/* User msg 1 */}
                              {escPhase >= 1 && (
                                <div className="flex items-start gap-2" style={{ animation: 'feature-text-in 0.28s ease both' }}>
                                  <img src="/avatar.png" alt="" className="h-8 w-8 flex-shrink-0 rounded-full object-cover mt-0.5" />
                                  <div className="rounded-2xl rounded-tl-sm text-white text-sm px-3.5 py-2 leading-snug" style={{ background: 'rgba(255,255,255,0.18)', maxWidth: '82%' }}>
                                    {sc.user}
                                  </div>
                                </div>
                              )}
                              {/* Bot msg 1 */}
                              {escPhase >= 2 && (
                                <div className="flex items-start justify-end gap-2" style={{ animation: 'feature-text-in 0.28s ease both' }}>
                                  <div className="rounded-2xl rounded-tr-sm text-white text-sm px-3.5 py-2 leading-snug" style={{ background: 'rgba(33,73,149,0.85)', maxWidth: '82%' }}>
                                    {sc.bot}
                                  </div>
                                  <img src="/Component 187 (1).png" alt="" className="h-8 w-8 flex-shrink-0 rounded-full object-cover mt-0.5" />
                                </div>
                              )}
                              {/* User msg 2 */}
                              {escPhase >= 3 && (
                                <div className="flex items-start gap-2" style={{ animation: 'feature-text-in 0.28s ease both' }}>
                                  <img src="/avatar.png" alt="" className="h-8 w-8 flex-shrink-0 rounded-full object-cover mt-0.5" />
                                  <div className="rounded-2xl rounded-tl-sm text-white text-sm px-3.5 py-2 leading-snug" style={{ background: 'rgba(255,255,255,0.18)', maxWidth: '82%' }}>
                                    {sc.user2}
                                  </div>
                                </div>
                              )}
                              {/* Bot msg 2 */}
                              {escPhase >= 4 && (
                                <div className="flex items-start justify-end gap-2" style={{ animation: 'feature-text-in 0.28s ease both' }}>
                                  <div className="rounded-2xl rounded-tr-sm text-white text-sm px-3.5 py-2 leading-snug" style={{ background: 'rgba(33,73,149,0.85)', maxWidth: '88%' }}>
                                    {bot2Parts.map((part, i) =>
                                      part === '@support_team'
                                        ? <span key={i} className="font-bold" style={{ color: '#FB9A05' }}>@support_team</span>
                                        : <span key={i}>{part}</span>
                                    )}
                                  </div>
                                  <img src="/Component 187 (1).png" alt="" className="h-8 w-8 flex-shrink-0 rounded-full object-cover mt-0.5" />
                                </div>
                              )}
                              {/* Outcome badge */}
                              {escPhase >= 5 && (
                                <div className="flex justify-center mt-1" style={{ animation: 'feature-text-in 0.25s ease both' }}>
                                  {isBelow ? (
                                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: 'rgba(251,154,5,0.18)', color: '#FB9A05', border: '1px solid rgba(251,154,5,0.35)' }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /><path fillRule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.239.005.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd" /></svg>
                                      Routed to human agent
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: 'rgba(34,197,94,0.18)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.35)' }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3"><path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" /></svg>
                                      Resolved automatically
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            {/* Input row */}
                            <div className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.08)', minHeight: 42 }}>
                              <img src="/Component 187 (1).png" alt="" className="h-7 w-7 flex-shrink-0 rounded-full object-cover" />
                              <span className="flex-1 text-sm text-white/35">Ask anything…</span>
                              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 text-white"><path d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .811 1.022l11-4.25a.75.75 0 0 0 0-1.398l-11-4.253Z" /></svg>
                              </div>
                            </div>
                            {/* Certainty bar */}
                            <div className="flex-shrink-0">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-medium text-white/50">Certainty</span>
                                <span className="text-xs font-semibold" style={{ color: barColor }}>{escPhase >= 2 ? `${sc.confidence}%` : '—'}</span>
                              </div>
                              <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.12)' }}>
                                <div
                                  className="h-full rounded-full transition-all duration-700"
                                  style={{ width: escPhase >= 2 ? `${sc.confidence}%` : '0%', backgroundColor: barColor }}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })()}
                    </div>
                  </div>

                  {/* One layer — single-ring orbital, square */}
                  <div className="rounded-2xl bg-white px-6 py-6 shadow-sm border border-gray-100 flex flex-col aspect-square overflow-hidden">
                    <p className="text-base font-semibold text-gray-900">One layer, every system</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">Sits between your chats, ticket system, providers, and business ops — nothing falls through the cracks.</p>
                    <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 flex-1 relative overflow-hidden">
                      {/* Single orbit ring */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="rounded-full border border-dashed border-gray-200" style={{ width: '286px', height: '286px' }} />
                      </div>
                      {/* Pulse rings at center */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {[0, 0.9, 1.8].map((d, i) => (
                          <div key={i} className="absolute rounded-full border border-[#214995]/25" style={{ width: '40px', height: '40px', animation: 'pulse-ring 2.6s ease-out infinite', animationDelay: `${d}s` }} />
                        ))}
                      </div>
                      {/* Data-pull particles */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                        <div key={`p-${angle}`} className="absolute pointer-events-none" style={{ top: '50%', left: '50%', marginTop: '-3px', marginLeft: '-3px', animation: `data-pull 2.2s ease-in infinite`, animationDelay: `${i * 0.275}s`, ['--da' as string]: `${angle}deg` }}>
                          <div className="h-1.5 w-1.5 rounded-full bg-[#214995]/50" />
                        </div>
                      ))}
                      {/* All logos — single ring */}
                      {orbitAll.map((logo, i) => (
                        <div key={logo.name} className="absolute" style={{ top: '50%', left: '50%', marginTop: '-28px', marginLeft: '-28px', animation: `logo-orbit ${orbitDur}s linear infinite`, animationDelay: `${-(i / orbitAll.length) * orbitDur}s`, ['--orbit-r' as string]: '143px' }}>
                          <div style={{ animation: `logo-counter ${orbitDur}s linear infinite`, animationDelay: `${-(i / orbitAll.length) * orbitDur}s` }}>
                            <div className="h-[56px] w-[56px] rounded-full bg-white shadow border border-gray-100 overflow-hidden flex items-center justify-center">
                              <img src={logo.src} alt={logo.name} className="h-8 w-8 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* supVision center */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative z-10 rounded-xl px-3 py-2 text-[11px] font-bold text-white leading-tight text-center" style={{ backgroundColor: '#214995', boxShadow: '0 0 16px rgba(33,73,149,0.4)' }}>
                          supVision
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Decision Logs — 4th card, square */}
                  <div className="rounded-2xl bg-white px-6 py-6 shadow-sm border border-gray-100 flex flex-col aspect-square overflow-hidden">
                    <p className="text-base font-semibold text-gray-900">AI Decision Logs</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">See exactly why supVision resolved or escalated each query — full reasoning chain, auditor-ready.</p>
                    {/* Animation panel — dark beige */}
                    <div className="mt-4 rounded-2xl flex-1 flex flex-col overflow-hidden px-5 py-4" style={{ background: '#f9fafb', opacity: logFading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
                      {/* Query pill */}
                      <div className="mb-3 flex items-center gap-2 flex-shrink-0">
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#9ca3af', flexShrink: 0, display: 'inline-block' }} />
                        <span style={{ color: '#111827', fontWeight: 600, fontSize: '1.05rem', fontFamily: "'Nohemi', sans-serif", border: '1.5px solid rgba(0,0,0,0.10)', borderRadius: 9999, padding: '4px 15px', background: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {LOG_SCENARIOS[logScene].query}
                        </span>
                      </div>
                      {/* Steps */}
                      <div className="flex flex-col gap-2 pl-3 flex-1 overflow-hidden">
                        {LOG_SCENARIOS[logScene].steps.slice(0, logRevealedSteps).map((step, i) => (
                          <div key={i} className="flex items-start gap-2" style={{ animation: 'log-in 0.35s ease both' }}>
                            <span style={{ color: step.type === 'success' ? '#16a34a' : step.type === 'warning' ? '#d97706' : '#9ca3af', fontSize: '1rem', lineHeight: '1.6rem', flexShrink: 0, fontWeight: 700 }}>
                              {step.type === 'success' ? '✓' : step.type === 'warning' ? '!' : '→'}
                            </span>
                            <span style={{ color: step.type === 'info' ? '#6b7280' : '#111827', fontSize: '1.05rem', fontFamily: "'Nohemi', sans-serif", lineHeight: 1.45 }}>
                              {step.text}
                            </span>
                          </div>
                        ))}
                      </div>
                      {/* Decision badge */}
                      {logDecisionShown && (
                        <div className="flex justify-center pt-3 flex-shrink-0" style={{ animation: 'log-in 0.4s ease both' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 22px', borderRadius: 9999, background: `${LOG_SCENARIOS[logScene].color}18`, border: `1.5px solid ${LOG_SCENARIOS[logScene].color}`, color: LOG_SCENARIOS[logScene].color, fontWeight: 700, fontSize: '1.05rem', fontFamily: "'Nohemi', sans-serif", letterSpacing: '0.08em' }}>
                            {LOG_SCENARIOS[logScene].decision === 'ESCALATED' ? '⚠' : '✓'}&nbsp;{LOG_SCENARIOS[logScene].decision}
                          </div>
                        </div>
                      )}
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
                Still paying agents to answer the same <span style={{ fontWeight: 700 }}>questions every day?</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                Disputes, KYC checks, payment failures — <strong className="text-gray-700">supVision handles them automatically</strong>, so your team only touches cases that genuinely need a human.
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
              <div className="relative overflow-hidden rounded-[1.5rem] px-4 py-5" style={{ backgroundColor: '#214995' }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/60">Integration time</p>
                <p className="mt-1 leading-none tracking-tight" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '2rem', color: '#fff' }}>3 days</p>
                <p className="mt-2 text-[11px] leading-relaxed text-white/70">Most companies go live within 3 days using tools they already have.</p>
              </div>
            </div>

            <FeatureTabSection />

            {/* 3 key differentiators — mobile */}
            <div className="mt-10 mb-2 text-center">
              <h2 className="text-3xl text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
                Everything you need,{' '}<span style={{ fontWeight: 700 }}>out of the box</span>
              </h2>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              {/* 100+ Languages — mobile */}
              <div className="rounded-2xl bg-white px-5 py-5 shadow-sm border border-gray-100">
                <p className="text-base font-semibold text-gray-900">100+ Languages</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">supVision automatically detects your customer's language and responds in kind — whether it's English, Arabic, or Mandarin. No setup, no routing rules, no extra cost.</p>
                <div className="mt-4 rounded-xl relative overflow-hidden bg-gray-50 border border-gray-100" style={{ height: '260px' }}>
                  {langItems.map(({ id, langIdx, slot }) => {
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
              {/* Smart escalation — mobile */}
              <div className="rounded-2xl bg-white px-5 py-5 shadow-sm border border-gray-100">
                <p className="text-base font-semibold text-gray-900">Smart escalation &amp; fallback</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">The bot detects uncertainty in real time and routes to a human agent automatically — before the customer even notices.</p>
                {(() => {
                  const sc = ESC_SCENARIOS[escIdx]
                  const barColor = sc.confidence >= 40 ? '#22c55e' : '#ef4444'
                  return (
                    <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-3 flex flex-col gap-2.5">
                      {/* User bubble */}
                      {escPhase >= 1 && (
                        <div className="flex justify-end" style={{ animation: 'log-in 0.3s ease both' }}>
                          <div className="rounded-2xl rounded-tr-sm bg-[#214995] px-3 py-2 max-w-[80%]">
                            <span className="text-[11px] leading-relaxed text-white">{sc.user}</span>
                          </div>
                        </div>
                      )}
                      {/* Bot row */}
                      {escPhase >= 2 && (
                        <div className="flex items-start gap-2" style={{ animation: 'log-in 0.3s ease both' }}>
                          <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-[#214995]" />
                          </div>
                          <div className="rounded-2xl rounded-tl-sm border border-gray-100 bg-white px-3 py-2 shadow-sm">
                            {escPhase === 2
                              ? <span className="flex gap-1 items-center" style={{ minWidth: 32 }}>
                                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400" style={{ animation: 'pulse 1s ease-in-out infinite 0s' }} />
                                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400" style={{ animation: 'pulse 1s ease-in-out infinite 0.3s' }} />
                                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400" style={{ animation: 'pulse 1s ease-in-out infinite 0.6s' }} />
                                </span>
                              : <span className="text-[11px] leading-relaxed text-gray-600">{sc.bot}</span>
                            }
                          </div>
                        </div>
                      )}
                      {/* Confidence meter */}
                      {escPhase >= 3 && (
                        <div className="rounded-xl border border-gray-100 bg-white px-3 py-2.5 shadow-sm" style={{ animation: 'log-in 0.3s ease both' }}>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Confidence score</span>
                            <span className="text-xs font-bold tabular-nums" style={{ color: barColor }}>{sc.confidence}%</span>
                          </div>
                          <div className="relative mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${sc.confidence}%`, backgroundColor: barColor }} />
                            <div className="absolute inset-y-0 w-px bg-gray-600 opacity-40" style={{ left: '40%' }} />
                          </div>
                          <div className="mt-1.5 flex justify-between">
                            <span className="text-[9px] text-gray-400">0%</span>
                            <span className="text-[9px] font-medium text-gray-500">Threshold 40%</span>
                            <span className="text-[9px] text-gray-400">100%</span>
                          </div>
                        </div>
                      )}
                      {/* Status badge */}
                      {escPhase >= 3 && sc.status === 'below' && (
                        <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5" style={{ animation: 'log-in 0.3s ease both' }}>
                          <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 12 12" fill="#f87171"><path d="M6 1.5l4.5 8H1.5L6 1.5Z" /></svg>
                          <span className="text-xs font-semibold text-red-500">Below confidence threshold</span>
                        </div>
                      )}
                      {escPhase >= 3 && sc.status === 'routing' && (
                        <div className="flex items-center gap-2 rounded-xl border border-orange-100 bg-orange-50 px-3 py-2.5" style={{ animation: 'log-in 0.3s ease both' }}>
                          <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-orange-400" style={{ animation: 'pulse 0.9s ease-in-out infinite' }} />
                          <span className="text-xs font-semibold text-orange-600">Routing to specialist…</span>
                        </div>
                      )}
                      {escPhase >= 3 && sc.status === 'resolved' && (
                        <div className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-3 py-2.5" style={{ animation: 'log-in 0.3s ease both' }}>
                          <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-green-500" />
                          <span className="text-xs font-semibold text-green-700">Resolved automatically</span>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
              {/* One layer — single-ring orbital mobile */}
              {(() => {
                const orbitAllMob = [
                  { name: 'WhatsApp',   src: '/logos/whatsapp.png' },
                  { name: 'Zendesk',    src: '/logos/zendesk.png' },
                  { name: 'Telegram',   src: '/logos/telegram.png' },
                  { name: 'HubSpot',    src: '/logos/hubspot.png' },
                  { name: 'Slack',      src: '/logos/slack.png' },
                  { name: 'Jira',       src: '/logos/jira.png' },
                  { name: 'Messenger',  src: '/logos/facebook messenger.png' },
                  { name: 'Freshdesk',  src: '/logos/freshdesk.png' },
                  { name: 'Teams',      src: '/logos/teams.png' },
                  { name: 'Notion',     src: '/logos/notion.png' },
                  { name: 'WeChat',     src: '/logos/wechat.png' },
                  { name: 'Salesforce', src: '/logos/salesforce.png' },
                ]
                const dur = 20
                return (
                  <div className="rounded-2xl bg-white px-5 py-5 shadow-sm border border-gray-100">
                    <p className="text-base font-semibold text-gray-900">One layer, every system</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">Sits between your chats, ticket system, providers, and business ops — nothing falls through the cracks.</p>
                    <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 relative overflow-hidden" style={{ height: '300px' }}>
                      {/* Single orbit ring */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="rounded-full border border-dashed border-gray-200" style={{ width: '198px', height: '198px' }} />
                      </div>
                      {[0, 0.9, 1.8].map((d, i) => (
                        <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="absolute rounded-full border border-[#214995]/25" style={{ width: '38px', height: '38px', animation: 'pulse-ring 2.6s ease-out infinite', animationDelay: `${d}s` }} />
                        </div>
                      ))}
                      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                        <div key={angle} className="absolute pointer-events-none" style={{ top: '50%', left: '50%', marginTop: '-3px', marginLeft: '-3px', animation: `data-pull 2.2s ease-in infinite`, animationDelay: `${i * 0.37}s`, ['--da' as string]: `${angle}deg` }}>
                          <div className="h-1.5 w-1.5 rounded-full bg-[#214995]/50" />
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
                        <div className="relative z-10 rounded-xl px-3 py-2 text-[10px] font-bold text-white leading-tight text-center" style={{ backgroundColor: '#214995', boxShadow: '0 0 14px rgba(33,73,149,0.4)' }}>supVision</div>
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* AI Decision Logs — mobile */}
              <div className="rounded-2xl bg-white px-5 py-5 shadow-sm border border-gray-100">
                <p className="text-base font-semibold text-gray-900">AI Decision Logs</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">See exactly why supVision resolved or escalated each query — full reasoning chain exposed for compliance review or agent training.</p>
                {/* Animation panel — dark beige */}
                <div className="mt-4 rounded-2xl px-5 py-4 flex flex-col" style={{ background: '#f9fafb', opacity: logFading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
                  {/* Query pill */}
                  <div className="mb-4 flex items-center gap-2">
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#9ca3af', flexShrink: 0, display: 'inline-block' }} />
                    <span style={{ color: '#111827', fontWeight: 600, fontSize: '1.1rem', fontFamily: "'Nohemi', sans-serif", border: '1.5px solid rgba(0,0,0,0.10)', borderRadius: 9999, padding: '5px 16px', background: 'rgba(255,255,255,0.6)' }}>
                      {LOG_SCENARIOS[logScene].query}
                    </span>
                  </div>
                  {/* Steps */}
                  <div className="flex flex-col gap-2.5 pl-4">
                    {LOG_SCENARIOS[logScene].steps.slice(0, logRevealedSteps).map((step, i) => (
                      <div key={i} className="flex items-start gap-2.5" style={{ animation: 'log-in 0.35s ease both' }}>
                        <span style={{ color: step.type === 'success' ? '#16a34a' : step.type === 'warning' ? '#d97706' : '#9ca3af', fontSize: '1.05rem', lineHeight: '1.7rem', flexShrink: 0, fontWeight: 700 }}>
                          {step.type === 'success' ? '✓' : step.type === 'warning' ? '!' : '→'}
                        </span>
                        <span style={{ color: step.type === 'info' ? '#6b7280' : '#111827', fontSize: '1.1rem', fontFamily: "'Nohemi', sans-serif", lineHeight: 1.5 }}>
                          {step.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Decision badge */}
                  {logDecisionShown && (
                    <div className="mt-5 flex justify-center" style={{ animation: 'log-in 0.4s ease both' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 26px', borderRadius: 9999, background: `${LOG_SCENARIOS[logScene].color}18`, border: `1.5px solid ${LOG_SCENARIOS[logScene].color}`, color: LOG_SCENARIOS[logScene].color, fontWeight: 700, fontSize: '1.1rem', fontFamily: "'Nohemi', sans-serif", letterSpacing: '0.08em' }}>
                        {LOG_SCENARIOS[logScene].decision === 'ESCALATED' ? '⚠' : '✓'}&nbsp;{LOG_SCENARIOS[logScene].decision}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          {/* Cards - 2 per row — desktop */}
          <div className="mt-16 hidden sm:grid gap-6 sm:grid-cols-2">
            {valueProps.map((v) => (
              <div
                key={v.headline}
                className="relative flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm"
                style={{ overflow: v.robotOverlay ? 'visible' : 'hidden' }}
              >
                {/* Robot overlay - floats outside card, desktop only */}
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

                {/* Image area - always clipped */}
                <div
                  className="relative h-56 w-full overflow-hidden bg-gray-50 flex items-center justify-center"
                  style={{ borderRadius: '1rem 1rem 0 0' }}
                >
                  <span className="text-xs text-gray-300 select-none">Screenshot coming soon</span>
                  <img
                    src={v.img}
                    alt={v.imgAlt}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>

                {/* Text */}
                <div className="p-8">
                  <p className="text-6xl font-black leading-none" style={{ color: '#214995' }}>{v.stat}</p>
                  <h3 className="mt-4 text-xl font-bold leading-snug text-gray-900">{v.headline}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{v.body}</p>
                </div>
              </div>
            ))}
          </div>

            {/* Mobile CTAs */}
            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/support-agent"
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
              >
                Learn more
              </Link>
              <Link
                to="/integrations"
                className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: '#111827' }}
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
      <section className="pt-4 pb-12 px-4 lg:pt-6 lg:pb-16 lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center lg:mb-10">
            <h2 className="mt-3 text-4xl lg:text-5xl text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
              Built for <span style={{ fontWeight: 700 }}>your industry</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500">Click to explore integrations for your sector.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5 lg:gap-4">
            {([
              { label: 'Payments & Processing',      img: '/for_whom/Payments & Processing.png', to: '/industries/payments-processing' },
              { label: 'Neobanks & Digital Banking', img: '/for_whom/Neobanks & Digital Banking.png', to: '/industries/neobanks' },
              { label: 'InsurTech',                   img: '/for_whom/InsurTech.png', to: '/industries/insurtech' },
              { label: 'Lending & Credit',            img: '/for_whom/Lending & Credit.png', to: '/industries/lending-credit' },
              { label: 'Web3',                         img: '/for_whom/Web3.png', to: '/industries/crypto-web3' },
            ] as const).map((ind) => (
              <Link
                key={ind.label}
                to={ind.to}
                className="relative overflow-hidden rounded-[1.25rem] aspect-square text-left transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none block"
              >
                <img
                  src={ind.img}
                  alt={ind.label}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)', height: '50%' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-bold leading-snug text-white lg:text-base">{ind.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Built for fintech — persona selector */}
      <section ref={personaSectionRef} className="py-6 lg:py-10" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-[2rem] px-6 py-10 lg:px-12 lg:py-14" style={{ backgroundColor: '#F3EFE9' }}>
          {/* Header */}
          <div className="mb-8 lg:mb-10 lg:text-center">
            <h2
              className="text-3xl leading-snug text-gray-900 lg:text-4xl"
              style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
            >
              Built for the way <span style={{ color: '#FB9A05' }}>fintech works</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500 lg:text-base">Select one to see supVision in action.</p>
          </div>

          {/* Filter tabs */}
          <div className="mb-8 flex w-full flex-wrap gap-2 lg:justify-center">
            <button
              type="button"
              onClick={() => setActivePersona(null)}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
              style={{
                background: activePersona === null ? '#214995' : 'rgba(0,0,0,0.06)',
                color: activePersona === null ? '#fff' : '#6b7280',
                border: activePersona === null ? '1px solid #214995' : '1px solid rgba(0,0,0,0.1)',
              }}
            >
              All
            </button>
            {PERSONAS.map((persona, i) => (
              <button
                key={persona.label}
                type="button"
                onClick={() => setActivePersona(prev => (prev === i ? null : i))}
                className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                style={{
                  background: activePersona === i ? '#214995' : 'rgba(0,0,0,0.06)',
                  color: activePersona === i ? '#fff' : '#6b7280',
                  border: activePersona === i ? '1px solid #214995' : '1px solid rgba(0,0,0,0.1)',
                }}
              >
                {persona.label}
              </button>
            ))}
          </div>

          {(() => {
            const all = activePersona === null
              ? automationStacks
              : automationStacks.filter(s => PERSONAS[activePersona].stacks.includes(s.label))

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
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: '#214995' }}
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
        const TESTIMONIALS = [
          {
            name: 'Ruslan V.',
            title: 'Head of Operations',
            quote: 'We went from a 4-hour average resolution time to under 2 minutes for verification queries. Ops costs dropped and CSAT went up at the same time. supVision made the whole support flow predictable and auditable.',
            stats: [
              { value: '< 2 min', label: 'avg verification resolution time' },
              { value: '1 month',  label: 'to measurable ROI' },
            ],
          },
          {
            name: 'Alan N.',
            title: 'Customer Success Lead',
            quote: "We cut support headcount by 30% while handling 3× the ticket volume. The agents that stayed are focused on real escalations, not copy-pasting the same repetitive answers all day. ROI showed up faster than any tool we've ever deployed.",
            stats: [
              { value: '30%', label: 'reduction in support headcount' },
              { value: '3×',  label: 'ticket volume, same team' },
            ],
          },
          {
            name: 'Cyril B.',
            title: 'Compliance Lead',
            quote: 'Our compliance team was skeptical about automating disputes. But supVision handles edge cases better than we expected, and logs every decision with a full rationale and timestamp. When our auditors asked for a trail, we exported it in minutes.',
            stats: [
              { value: '100%',   label: 'automated decision audit coverage' },
              { value: '< 5 min', label: 'regulator export time' },
            ],
          },
          {
            name: 'Dmytriy K.',
            title: 'Head of Customer Support',
            quote: 'We used to hire new people every time we expanded to a new geography. Now we automatically serve all regions — Europe, the US, Asia, the Middle East — without adding a single agent. The setup took three days.',
            stats: [
              { value: '4 regions', label: 'served without new hires' },
              { value: '3 days',    label: 'to go live globally' },
            ],
          },
        ]
        const t = TESTIMONIALS[testimonialIdx]
        const total = TESTIMONIALS.length
        return (
          <section className="py-16 px-4 lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
            <div className="mx-auto max-w-5xl">
              {/* Heading */}
              <div className="mb-10 text-center">
                <p className="text-3xl text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
                  Companies that moved from overwhelmed to{' '}
                  <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
                    automated.
                    <svg viewBox="0 0 190 12" preserveAspectRatio="none" aria-hidden="true"
                      style={{ position: 'absolute', bottom: -6, left: '-2%', width: '104%', height: 12, pointerEvents: 'none', overflow: 'visible' }}>
                      <path d="M 2 8 C 12 5, 28 10, 48 7 C 64 5, 82 9, 100 6.5 C 118 4, 138 9, 158 7 C 170 5.5, 180 8, 188 7"
                        stroke="#FB9A05" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M 4 9.5 C 20 7, 42 11, 65 8.5 C 88 6, 112 10, 135 8 C 155 6.5, 172 9.5, 187 8.5"
                        stroke="#FB9A05" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
                    </svg>
                  </span>
                </p>
              </div>

              {/* Card */}
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl" style={{ minHeight: 260 }}>
                <div className="flex flex-col lg:flex-row">

                  {/* Left — blue panel with wave */}
                  <div className="relative flex w-full flex-shrink-0 flex-col items-center justify-end overflow-hidden px-6 pb-8 pt-10 lg:w-72 lg:items-start lg:pb-10 lg:pt-14" style={{ backgroundColor: '#1a3280' }}>
                    {/* SVG wave layers */}
                    <svg viewBox="0 0 288 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
                      className="absolute inset-0 h-full w-full">
                      <path d="M -40 220 Q 60 160 140 200 Q 220 240 320 180 L 320 320 L -40 320 Z" fill="rgba(255,255,255,0.06)" />
                      <path d="M -40 260 Q 80 200 170 240 Q 250 275 340 220 L 340 320 L -40 320 Z" fill="rgba(255,255,255,0.05)" />
                      <path d="M -20 180 Q 70 130 160 165 Q 240 198 330 145 L 330 0 L -20 0 Z" fill="rgba(255,255,255,0.04)" />
                      <path d="M -20 200 Q 90 145 180 182 Q 260 215 350 162 L 350 0 L -20 0 Z" fill="rgba(255,255,255,0.03)" />
                    </svg>
                    <div className="relative z-10 text-center lg:text-left">
                      <p className="text-xl font-black text-white">{t.name}</p>
                      <p className="mt-1 text-sm text-white/60">{t.title}</p>
                    </div>
                  </div>

                  {/* Right — quote + stats */}
                  <div className="flex flex-1 flex-col justify-between px-8 py-8 lg:px-10 lg:py-10">
                    {/* Quote mark */}
                    <div>
                      <p className="mb-4 text-2xl font-black leading-none" style={{ color: '#e5e7eb' }}>"</p>
                      <p key={testimonialIdx} className="text-base leading-relaxed text-gray-700 lg:text-lg">{t.quote}</p>
                    </div>

                    {/* Divider + stats */}
                    <div className="mt-8 border-t border-gray-100 pt-6">
                      <div className="flex flex-wrap gap-8">
                        {t.stats.map(s => (
                          <div key={s.label}>
                            <p className="text-2xl font-black" style={{ color: '#214995' }}>{s.value}</p>
                            <p className="mt-0.5 text-xs text-gray-400">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={() => setTestimonialIdx(i => (i - 1 + total) % total)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-400 transition-colors hover:border-gray-500 hover:text-gray-700"
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
                      className="transition-all"
                      style={{ width: i === testimonialIdx ? 28 : 8, height: 8, borderRadius: 100, backgroundColor: i === testimonialIdx ? '#214995' : '#d1d5db' }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setTestimonialIdx(i => (i + 1) % total)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-400 transition-colors hover:border-gray-500 hover:text-gray-700"
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
      <section className="py-3 px-2 sm:px-3">
        <div>
          <div className="rounded-3xl px-4 py-10 lg:px-16 lg:py-16" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center">

            {/* Left - text */}
            <div>
              {/* Mobile headline */}
              <h2
                className="mt-4 flex flex-col text-center leading-tight lg:hidden"
                style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '2.25rem' }}
              >
                <span className="text-gray-900">Built by people with</span>
                <span>
                  <span style={{ color: '#FB9A05' }}>15+ years </span>
                  <span className="text-gray-900">in fintech.</span>
                </span>
              </h2>
              <h2 className="mt-4 hidden leading-snug text-gray-900 lg:mt-5 lg:block lg:text-5xl" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
                Built by people with 15+ years in fintech.
              </h2>
              <p className="mt-4 text-center text-sm leading-relaxed text-gray-500 lg:mt-6 lg:text-left lg:text-base">
                Our team comes from inside the industry — compliance officers, support leads, and engineers who spent over 15 years building and running financial services operations across Europe, the Middle East, and Asia. We know the regulatory pressure, the integration pain, and what it actually takes to scale support without losing control.
              </p>

              {/* Mobile photo */}
              <div className="mt-6 overflow-hidden rounded-2xl lg:hidden">
                <img src="/team.png" alt="supVision team" className="w-full object-cover" />
              </div>

              <p className="mt-4 text-center text-sm leading-relaxed text-gray-500 lg:text-left">
                Today supVision is live across <span className="font-semibold text-gray-900">40+ countries</span>, supporting <span className="font-semibold text-gray-900">20 currencies</span> — handling real customer queries for fintech companies that can't afford downtime, compliance gaps, or slow support.
              </p>

              <div className="mt-6 lg:mt-8">
                {/* Mobile button */}
                <Link
                  to="/about"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-900 lg:hidden"
                >
                  Read our story
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gray-900">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </Link>
                {/* Desktop button */}
                <div className="hidden lg:flex flex-wrap items-center gap-6">
                  <Link
                    to="/about"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gray-300 bg-white pl-5 pr-1.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <span className="relative z-10">Read our story</span>
                    <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gray-900">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </Link>
                  <div className="flex items-center gap-4">
                    <div className="h-px w-8 bg-gray-300" />
                    <span className="text-sm text-gray-400">15+ years in fintech, live in multiple countries</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right - image, desktop only */}
            <div className="hidden lg:flex self-stretch overflow-hidden rounded-2xl">
              <img
                src="/team.png"
                alt="supVision team"
                className="h-full w-full object-cover"
              />
            </div>

          </div>
        </div>
        </div>
      </section>


      {/* Compliance & Security */}
      <section className="py-3 px-2 sm:px-3">
        <div className="rounded-3xl px-4 py-10 lg:px-16 lg:py-16" style={{ backgroundColor: '#F3EFE9' }}>
          <div className="mx-auto max-w-7xl">

            {/* Mobile */}
            <div className="max-w-3xl mx-auto lg:hidden">
              <h2
                className="mt-2 text-center text-[2.25rem] leading-tight text-gray-900"
                style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
              >
                Built for regulated financial services from day one.
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
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: '#214995' }}
              >
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* Desktop */}
            <div className="hidden lg:block">
              <h2
                className="mt-5 text-4xl leading-tight text-gray-900 text-center"
                style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 400 }}
              >
                We put our security{' '}
                <span style={{ color: '#FB9A05' }}>to the test </span>
                with live, independent auditing.
              </h2>
              <div className="mt-10 grid grid-cols-3 gap-6">
                {complianceCertCards.map((card) => (
                  <div
                    key={card.title}
                    className="flex flex-col items-center overflow-visible px-6 py-8 text-center"
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
              <div className="mt-10 flex justify-center">
                <Link
                  to="/security"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: '#214995' }}
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pre-FAQ CTA with inline form */}
      <section className="py-8 px-2 sm:px-4 lg:py-16 lg:px-8">
        <div
          className="mx-auto max-w-7xl rounded-2xl overflow-hidden"
          style={{
            backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex flex-col lg:grid lg:grid-cols-2">

            {/* Top text */}
            <div className="px-5 pt-10 pb-0 lg:px-16 lg:py-16 lg:pb-0 lg:flex lg:flex-col lg:justify-start">
              <h2 className="mt-4 hidden text-3xl font-bold leading-tight text-white lg:block lg:text-4xl">Most teams are live within 3 days.</h2>
              <p className="mt-3 hidden text-base text-blue-200 lg:block">30 minutes. We'll show exactly how it works for your stack.</p>
              <h2
                className="mt-2 flex flex-col text-center leading-tight lg:hidden"
                style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '2.25rem' }}
              >
                <span style={{ color: '#FB9A05' }}>30 minutes.</span>
                <span className="text-white">We&apos;ll show exactly how it works for your stack.</span>
              </h2>
            </div>

            {/* Form - appears second on mobile (right after description), right column on desktop */}
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
                      ]
                        .filter(Boolean)
                        .join('\n\n')

                      setDemoSending(true)
                      setDemoSubmitError('')
                      const result = await submitContactForm({
                        name,
                        email,
                        message,
                        formStartedAt: demoFormStartedAt,
                      })
                      setDemoSending(false)
                      if (!result.ok) {
                        setDemoSubmitError(result.error)
                        return
                      }
                      setDemoSubmitted(true)
                    }}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="demo-name">
                          Full name <span style={{ color: '#214995' }}>*</span>
                        </label>
                        <input
                          id="demo-name"
                          type="text"
                          required
                          placeholder="Your full name"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="demo-email">
                          Email <span style={{ color: '#214995' }}>*</span>
                        </label>
                        <input
                          id="demo-email"
                          type="email"
                          required
                          placeholder="Your email address"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="demo-company">
                        Company
                      </label>
                      <input
                        id="demo-company"
                        type="text"
                        placeholder="Your company name"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="demo-message">
                        What are you looking to solve?
                      </label>
                      <textarea
                        id="demo-message"
                        rows={3}
                        placeholder="Describe your support challenges..."
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
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
                      <p className="text-xs leading-relaxed text-gray-500">
                        I agree to the <Link to="/" className="font-semibold text-gray-900 underline">Privacy Policy</Link>.
                      </p>
                    </div>
                    <div className="pt-1">
                      {/* Mobile: full-width, no animation */}
                      <button
                        type="submit"
                        disabled={demoSending}
                        className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold uppercase tracking-widest text-white lg:hidden disabled:opacity-60"
                        style={{ backgroundColor: '#111827' }}
                      >
                        {demoSending ? 'Sending…' : 'Send request'}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                          <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                        </svg>
                      </button>
                      {/* Desktop: animated */}
                      <button
                        type="submit"
                        disabled={demoSending}
                        className="group relative hidden lg:inline-flex items-center gap-3 overflow-hidden rounded-full pl-6 pr-1.5 py-1.5 text-sm font-bold text-white disabled:opacity-60"
                        style={{ backgroundColor: '#111827' }}
                      >
                        <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]" style={{ backgroundColor: '#214995' }} />
                        <span className="relative z-10 uppercase tracking-widest">{demoSending ? 'Sending…' : 'Send request'}</span>
                        <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                            <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </button>
                      {demoSubmitError && (
                        <p className="mt-3 text-xs text-red-500">{demoSubmitError}</p>
                      )}
                      {demoAttempted && (!demoFormIsValid || !demoAgreed) && (
                        <p className="mt-3 flex items-center gap-2 text-xs text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 flex-shrink-0">
                            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                          </svg>
                          Please fill in all required fields and confirm the Privacy Policy.
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Bottom text - bullets + contact (one line on mobile) */}
            <div className="px-5 pt-2 pb-8 lg:px-16 lg:pt-8 lg:pb-16">
              <ul className="hidden flex-col gap-3 lg:flex">
                {['30-minute live walkthrough', 'Tailored to your support stack', 'No commitment required'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-base text-white/80">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 text-white">
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Email + contact */}
              <div className="lg:mt-6 lg:border-t lg:border-white/10 lg:pt-6">
                {/* Mobile: email address + big icons left-aligned, no labels */}
                <div className="flex items-center justify-between lg:hidden">
                  <a href="mailto:info@supvision.ai" className="text-sm font-semibold text-white hover:text-blue-200 transition-colors">
                    info@supvision.ai
                  </a>
                  <div className="flex items-center gap-2">
                    <a href="https://www.linkedin.com/company/supvision-ai/" target="_blank" rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href="https://t.me/+447737124949" target="_blank" rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </a>
                    <a href="https://wa.me/447737124949" target="_blank" rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                {/* Desktop: full labels layout */}
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
    <div className="overflow-hidden rounded-2xl border border-[#E5E2D8] bg-white">
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

        <div className="mb-8 text-center">
          <h2
            className="leading-tight"
            style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '2.25rem' }}
          >
            <span className="text-gray-900">Frequently asked questions</span>
          </h2>
        </div>

        {/* Mobile: single column */}
        <div className="mt-6 flex flex-col gap-3 lg:hidden">
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
        <div className="mt-6 hidden gap-3 lg:flex lg:items-start">
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
  { label: 'Neobanks', icon: S('M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6ZM20.25 10.332v9.418H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.418a.75.75 0 0 1 0-1.5h15.75a.75.75 0 0 1 0 1.5Zm-4.5 0v5.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-5.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75Zm-8.25-.75a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h1.5a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-.75-.75H7.5Z', true) },
  { label: 'Web3', icon: S('M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.268a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z', true) },
  { label: 'Lending & Credit', icon: S(['M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z', 'M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z', 'M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z']) },
  { label: 'InsurTech', icon: S('M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z', true) },
]

const heroDesktopAgentFeatures = [
  {
    label: 'Resolve tier-1 support',
    desc: 'Disputes, payments, verification — closed autonomously in under 2 min.',
    icon: S('M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z', true),
  },
  {
    label: 'Escalate with full context',
    desc: 'Complex cases handed off with thread, CRM/KYC data, and reason.',
    icon: S('M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z', true),
  },
  {
    label: 'Verify with live data',
    desc: 'Pulls account, transaction & identity state before every reply.',
    icon: S('M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z', true),
  },
  {
    label: 'Work across your channels',
    desc: 'Email, WhatsApp, Telegram, chat & helpdesk — one agent, every channel.',
    icon: S(['M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z', 'M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z']),
  },
]

const complianceFeatures = [
  'GDPR-compliant data handling and right-to-erasure support',
  'PCI DSS aligned, no raw card data ever touches our system',
  'All data encrypted end-to-end and protected under a signed NDA — we cannot see your customer records',
]

const complianceCertCards = [
  {
    badge: '/gdpr.png',
    badgeAlt: 'GDPR Compliant',
    title: 'GDPR Compliance',
    desc: 'GDPR-compliant data handling and right-to-erasure support.',
  },
  {
    badge: '/badge/image.png',
    badgeAlt: 'PCI DSS Compliant',
    title: 'PCI DSS Aligned',
    desc: 'PCI DSS aligned — no raw card data ever touches our system.',
    badgeOversize: true,
  },
  {
    badge: '/nda.png',
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
    img: '/hero_images/Component 174 (1).png',
    imgAlt: 'Analytics dashboard showing cost reduction',
    robot: false,
  },
  {
    stat: '1.2s',
    headline: 'From 1.2s response time to zero backlog.',
    body: 'SupVision gives fintech companies AI-powered customer support that\'s fast, compliant, and built to scale without growing your team.',
    img: '/hero_images/Component 174.png',
    imgAlt: 'Live chat with instant AI response',
    robot: false,
    robotOverlay: '/robot/robot_flying.png',
    robotSide: 'right' as const,
  },
  {
    stat: '3 days',
    headline: 'Live in 3 days. Not 6 months.',
    body: 'No platform migration, no lengthy implementation. SupVision connects to your existing helpdesk, identity verification provider, and CRM in days - then you\'re live.',
    img: '/hero_images/Component 172.png',
    imgAlt: 'Onboarding and integration setup flow',
    robot: false,
    robotSide: 'left' as const,
  },
  {
    stat: '93%',
    headline: 'Ticket saves. No human required.',
    body: 'supVision handles 72% of all message flow and fully closes 49% of cases on its own. Your agents step in only when they\'re genuinely needed.',
    img: '/hero_images/Component 175.png',
    imgAlt: 'Tier-1 tickets resolved automatically',
    robot: false,
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
      { logoUrl: '/logos/zendesk.png', color: '#03363D', letter: 'Z' },
      { logoUrl: '/logos/confluence.png', color: '#0052CC', letter: 'C' },
      { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' },
    ],
  },
  {
    label: 'Dispute escalation flow',
    desc: 'Intercom · Jira · Slack',
    tools: ['Intercom'],
    logos: [
      { logoUrl: '/logos/intecom (1).png', color: '#1F8FEF', letter: 'I' },
      { logoUrl: '/logos/jira.png', color: '#0052CC', letter: 'J' },
      { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' },
    ],
  },
  {
    label: 'Policy-driven responses',
    desc: 'Freshdesk · Notion · Teams',
    tools: ['Freshdesk'],
    logos: [
      { logoUrl: '/logos/freshdesk.png', color: '#25C16F', letter: 'F' },
      { logoUrl: '/logos/notion.png', color: '#000', letter: 'N' },
      { logoUrl: '/logos/teams.png', color: '#6264A7', letter: 'T' },
    ],
  },
  {
    label: 'CRM-aware support',
    desc: 'Salesforce · HubSpot · Slack',
    tools: ['Salesforce CRM'],
    logos: [
      { logoUrl: '/logos/salesforce.png', color: '#00A1E0', letter: 'S' },
      { logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' },
      { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' },
    ],
  },
  {
    label: 'WhatsApp support flow',
    desc: 'WhatsApp · HubSpot · Mambu',
    tools: ['WhatsApp'],
    logos: [
      { logoUrl: '/logos/whatsapp.png', color: '#25D366', letter: 'W' },
      { logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' },
      { logoUrl: '/logos/mambu.png', color: '#FF3B00', letter: 'M' },
    ],
  },
  {
    label: 'Telegram CRM bot',
    desc: 'Telegram · Pipedrive · HubSpot',
    tools: ['Telegram'],
    logos: [
      { logoUrl: '/logos/telegram.png', color: '#26A5E4', letter: 'T' },
      { logoUrl: '/logos/Pipedrive.png', color: '#1A1F36', letter: 'P' },
      { logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' },
    ],
  },
  {
    label: 'Email triage & routing',
    desc: 'Gmail · Confluence · Jira',
    tools: ['Gmail'],
    logos: [
      { logoUrl: '/logos/gmail.png', color: '#EA4335', letter: '@' },
      { logoUrl: '/logos/confluence.png', color: '#0052CC', letter: 'C' },
      { logoUrl: '/logos/jira.png', color: '#0052CC', letter: 'J' },
    ],
  },
  {
    label: 'HubSpot onboarding flow',
    desc: 'HubSpot · Intercom · Mambu',
    tools: ['HubSpot'],
    logos: [
      { logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' },
      { logoUrl: '/logos/intecom (1).png', color: '#1F8FEF', letter: 'I' },
      { logoUrl: '/logos/mambu.png', color: '#FF3B00', letter: 'M' },
    ],
  },
  {
    label: 'Zendesk + Mambu stack',
    desc: 'Zendesk · Mambu · Slack',
    tools: ['Zendesk'],
    logos: [
      { logoUrl: '/logos/zendesk.png', color: '#03363D', letter: 'Z' },
      { logoUrl: '/logos/mambu.png', color: '#FF3B00', letter: 'M' },
      { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' },
    ],
  },
  {
    label: 'Intercom + Notion combo',
    desc: 'Intercom · HubSpot · Notion',
    tools: ['Intercom'],
    logos: [
      { logoUrl: '/logos/intecom (1).png', color: '#1F8FEF', letter: 'I' },
      { logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' },
      { logoUrl: '/logos/notion.png', color: '#000', letter: 'N' },
    ],
  },
  {
    label: 'WhatsApp sales support',
    desc: 'WhatsApp · Salesforce · Mambu',
    tools: ['WhatsApp', 'Salesforce CRM'],
    logos: [
      { logoUrl: '/logos/whatsapp.png', color: '#25D366', letter: 'W' },
      { logoUrl: '/logos/salesforce.png', color: '#00A1E0', letter: 'S' },
      { logoUrl: '/logos/mambu.png', color: '#FF3B00', letter: 'M' },
    ],
  },
  {
    label: 'Freshdesk + Linear queue',
    desc: 'Freshdesk · Linear · Notion',
    tools: ['Freshdesk'],
    logos: [
      { logoUrl: '/logos/freshdesk.png', color: '#25C16F', letter: 'F' },
      { logoUrl: '/logos/linear.png', color: '#5E6AD2', letter: 'L' },
      { logoUrl: '/logos/notion.png', color: '#000', letter: 'N' },
    ],
  },
  {
    label: 'Telegram CRM integration',
    desc: 'Telegram · HubSpot · Pipedrive',
    tools: ['Telegram'],
    logos: [
      { logoUrl: '/logos/telegram.png', color: '#26A5E4', letter: 'T' },
      { logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' },
      { logoUrl: '/logos/Pipedrive.png', color: '#1A1F36', letter: 'P' },
    ],
  },
  {
    label: 'Zoho + WhatsApp flow',
    desc: 'Zoho CRM · WhatsApp · Guru',
    tools: ['Zoho CRM', 'WhatsApp'],
    logos: [
      { logoUrl: '/logos/zoro.png', color: '#E42527', letter: 'Z' },
      { logoUrl: '/logos/whatsapp.png', color: '#25D366', letter: 'W' },
      { logoUrl: '/guru.png', color: '#CC4E00', letter: 'G' },
    ],
  },
  {
    label: 'Email + Salesforce pipeline',
    desc: 'Gmail · Salesforce · Confluence',
    tools: ['Gmail', 'Salesforce CRM'],
    logos: [
      { logoUrl: '/logos/gmail.png', color: '#EA4335', letter: '@' },
      { logoUrl: '/logos/salesforce.png', color: '#00A1E0', letter: 'S' },
      { logoUrl: '/logos/confluence.png', color: '#0052CC', letter: 'C' },
    ],
  },
  {
    label: 'Live chat + Pipedrive',
    desc: 'Intercom · Pipedrive · Notion',
    tools: ['Intercom'],
    logos: [
      { logoUrl: '/logos/intecom (1).png', color: '#1F8FEF', letter: 'I' },
      { logoUrl: '/logos/Pipedrive.png', color: '#1A1F36', letter: 'P' },
      { logoUrl: '/logos/notion.png', color: '#000', letter: 'N' },
    ],
  },
  {
    label: 'Intercom + Mambu onboarding',
    desc: 'Intercom · Mambu · Notion',
    tools: ['Intercom'],
    logos: [
      { logoUrl: '/logos/intecom (1).png', color: '#1F8FEF', letter: 'I' },
      { logoUrl: '/logos/mambu.png', color: '#FF3B00', letter: 'M' },
      { logoUrl: '/logos/notion.png', color: '#000', letter: 'N' },
    ],
  },
  {
    label: 'Zendesk + Teams queue',
    desc: 'Zendesk · Teams · Linear',
    tools: ['Zendesk'],
    logos: [
      { logoUrl: '/logos/zendesk.png', color: '#03363D', letter: 'Z' },
      { logoUrl: '/logos/teams.png', color: '#6264A7', letter: 'T' },
      { logoUrl: '/logos/linear.png', color: '#5E6AD2', letter: 'L' },
    ],
  },
  {
    label: 'Pipedrive deal support',
    desc: 'Pipedrive · Telegram · HubSpot',
    tools: ['Pipedrive'],
    logos: [
      { logoUrl: '/logos/Pipedrive.png', color: '#1A1F36', letter: 'P' },
      { logoUrl: '/logos/telegram.png', color: '#26A5E4', letter: 'T' },
      { logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' },
    ],
  },
  {
    label: 'Freshdesk enterprise stack',
    desc: 'Freshdesk · Salesforce · Mambu',
    tools: ['Freshdesk', 'Salesforce CRM'],
    logos: [
      { logoUrl: '/logos/freshdesk.png', color: '#25C16F', letter: 'F' },
      { logoUrl: '/logos/salesforce.png', color: '#00A1E0', letter: 'S' },
      { logoUrl: '/logos/mambu.png', color: '#FF3B00', letter: 'M' },
    ],
  },
  {
    label: 'WhatsApp + Pipedrive flow',
    desc: 'WhatsApp · Pipedrive · Mambu',
    tools: ['WhatsApp'],
    logos: [
      { logoUrl: '/logos/whatsapp.png', color: '#25D366', letter: 'W' },
      { logoUrl: '/logos/Pipedrive.png', color: '#1A1F36', letter: 'P' },
      { logoUrl: '/logos/mambu.png', color: '#FF3B00', letter: 'M' },
    ],
  },
]
