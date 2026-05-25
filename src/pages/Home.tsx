import { FormEvent, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { submitContactForm } from '../lib/contactApi'
import HeroChatPreview from '../components/home/HeroChatPreview'
import SolutionShowcase from '../components/home/SolutionShowcase'
import { LANGUAGES, LOG_SCENARIOS, MODEL_ANIM_STEPS } from '../components/home/solutionShowcaseData'

const PERSONAS = [
  { label: 'Payments & Processing',      stacks: ['Dispute escalation flow', 'WhatsApp support flow', 'Zendesk + Mambu stack', 'Telegram CRM bot', 'Email triage & routing'] },
  { label: 'Neobanks & Digital Banking', stacks: ['Onboarding automation', 'HubSpot onboarding flow', 'Zendesk + Mambu stack', 'CRM-aware support'] },
  { label: 'Web3',                        stacks: ['Telegram CRM bot', 'WhatsApp support flow', 'CRM-aware support', 'Telegram CRM integration'] },
  { label: 'Lending & Credit',            stacks: ['CRM-aware support', 'WhatsApp sales support', 'Policy-driven responses', 'Email triage & routing'] },
  { label: 'InsurTech',                   stacks: ['Policy-driven responses', 'Freshdesk + Linear queue', 'Email triage & routing'] },
]

function FasterSupportHeadline({ size = 'mobile' }: { size?: 'mobile' | 'desktop' }) {
  const fontSize = size === 'desktop' ? '3.25rem' : '2.45rem'
  const underlineH = size === 'desktop' ? 14 : 12
  return (
    <div className="inline-block">
      <p className="leading-none tracking-tight" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize, color: '#111827' }}>
        <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
          10x faster
          <svg
            viewBox="0 0 190 12"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{ position: 'absolute', bottom: -5, left: '-2%', width: '104%', height: underlineH, pointerEvents: 'none', overflow: 'visible' }}
          >
            <path
              d="M 2 8 C 12 5, 28 10, 48 7 C 64 5, 82 9, 100 6.5 C 118 4, 138 9, 158 7 C 170 5.5, 180 8, 188 7"
              stroke="#FB9A05"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 4 9.5 C 20 7, 42 11, 65 8.5 C 88 6, 112 10, 135 8 C 155 6.5, 172 9.5, 187 8.5"
              stroke="#FB9A05"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.45"
            />
          </svg>
        </span>
      </p>
      <p className="leading-none tracking-tight" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize, color: '#111827', marginTop: '0.125rem' }}>
        than manual support
      </p>
    </div>
  )
}

export default function Home() {
  const clipRef = useRef<HTMLDivElement>(null)
  const dashboardPanelRef = useRef<HTMLDivElement>(null)
  const dashboardGlassRef = useRef<HTMLDivElement>(null)
  const featuresPanelRef = useRef<HTMLDivElement>(null)
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [demoSubmitted, setDemoSubmitted] = useState(false)
  const [demoAgreed, setDemoAgreed] = useState(false)
  const [demoAttempted, setDemoAttempted] = useState(false)
  const [demoFormIsValid, setDemoFormIsValid] = useState(false)
  const [demoSending, setDemoSending] = useState(false)
  const [demoSubmitError, setDemoSubmitError] = useState('')
  const [demoFormStartedAt] = useState(() => Date.now())
  const demoFormRef = useRef<HTMLFormElement>(null)
  const [chatStepMobile, setChatStepMobile] = useState(0)
  const [chatStepDesktop, setChatStepDesktop] = useState(0)
  const [langItems] = useState<Array<{ id: number; langIdx: number; slot: number }>>(
    () => Array.from({ length: 11 }, (_, i) => ({ id: i, langIdx: i % LANGUAGES.length, slot: i }))
  )
  const [liftedSlot, setLiftedSlot] = useState(1)
  const [activePersona, setActivePersona] = useState<number | null>(null)
  const [modelAnimIdx, setModelAnimIdx] = useState(0)
  const [logScene, setLogScene] = useState(0)
  const [logRevealedSteps, setLogRevealedSteps] = useState(0)
  const [logDecisionShown, setLogDecisionShown] = useState(false)
  const [logFading, setLogFading] = useState(false)

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
    const t = setTimeout(
      () => setModelAnimIdx(i => (i + 1) % MODEL_ANIM_STEPS.length),
      MODEL_ANIM_STEPS[modelAnimIdx].delay
    )
    return () => clearTimeout(t)
  }, [modelAnimIdx])

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
          <div
            ref={dashboardGlassRef}
            className="rounded-2xl p-3"
            style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            }}
          >
            <HeroChatPreview chatStep={chatStepDesktop} variant="desktop" className="w-full" />
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
              <span style={{ color: '#E5D9CC' }}>Instant support.</span>
              <span className="text-white">Zero effort.</span>
            </h1>
            {/* Desktop headline */}
            <h1
              className="mt-3 hidden flex-col text-6xl leading-tight lg:flex lg:text-left"
              style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
            >
              <span style={{ color: '#E5D9CC' }}>Instant support.</span>
              <span className="text-white">Zero effort.</span>
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
                <span className="lg:hidden">Book a Demo!</span>
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

          {/* Mobile chat preview */}
          <div className="relative z-10 mt-10 lg:hidden">
            <HeroChatPreview chatStep={chatStepMobile} variant="mobile" />
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
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full"
                  style={{
                    width: '40px', height: '40px',
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: '#fff',
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-snug">{item.label}</p>
                  {item.desc && <p className="mt-1 text-xs leading-snug text-white/60">{item.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions + Stat cards */}
      <section className="relative z-10 -mt-10 rounded-t-[2.5rem] pt-16 pb-20 px-4 sm:px-6 lg:rounded-none lg:mt-0 lg:pt-16 bg-[#F1EDE9] lg:bg-[#faf8f5]">
        <div className="mx-auto max-w-7xl px-6">

          {/* 10x faster + metrics — desktop */}
          <div className="mb-20 hidden lg:block">
            <div className="text-center">
              <FasterSupportHeadline size="desktop" />
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-500">
                supVision resolves support queries in 1.2s on average — what used to take hours now happens before the customer hits refresh.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6">
              {mobileInsightCards.map((card) => {
                if (card.variant === 'wide') {
                  return (
                    <div
                      key={card.label}
                      className="col-span-2 relative overflow-hidden rounded-[2rem] px-10 py-10"
                      style={{ backgroundColor: '#F3EFE9' }}
                    >
                      <div className="flex items-center gap-12">
                        <div className="flex-shrink-0 text-center" style={{ minWidth: '160px' }}>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                            {card.label}
                          </p>
                          <p
                            className="mt-3 leading-none tracking-tight"
                            style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '4rem', color: '#111827' }}
                          >
                            {card.stat}
                          </p>
                        </div>
                        <div className="h-16 w-px bg-gray-300/60 flex-shrink-0" />
                        <div>
                          <p className="text-2xl font-semibold leading-snug text-gray-900">{card.headline}</p>
                          <p className="mt-3 text-sm leading-relaxed text-gray-500">{card.body}</p>
                        </div>
                      </div>
                    </div>
                  )
                }
                return (
                  <div
                    key={card.label}
                    className="relative overflow-hidden rounded-[2rem] px-8 py-10 text-center"
                    style={
                      card.variant === 'image'
                        ? {
                            backgroundImage: `url(${(card as { image: string }).image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }
                        : { backgroundColor: '#F3EFE9' }
                    }
                  >
                    {card.variant === 'image' && <div className="absolute inset-0 bg-black/50" aria-hidden />}
                    <div className="relative z-10">
                      <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${card.variant === 'image' ? 'text-white/70' : 'text-gray-500'}`}>
                        {card.label}
                      </p>
                      <p
                        className="mt-3 leading-none tracking-tight"
                        style={{
                          fontFamily: "'Nohemi', sans-serif",
                          fontWeight: 300,
                          fontSize: '3.5rem',
                          color: card.variant === 'image' ? '#fff' : '#111827',
                        }}
                      >
                        {card.stat}
                      </p>
                      <p className={`mx-auto mt-4 max-w-sm text-sm leading-relaxed ${card.variant === 'image' ? 'text-white/80' : 'text-gray-500'}`}>
                        {card.body}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
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
          </div>

          {/* Single static hero metric + CTAs — mobile only, branded bg */}
          <div className="mt-6 sm:hidden -mx-10 px-10 pt-8 pb-8" style={{ backgroundColor: '#FAF8F6' }}>
            <div className="text-center">
              <FasterSupportHeadline />
              <p className="mt-4 text-sm leading-relaxed text-gray-500 mx-auto max-w-xs">
                supVision resolves support queries in 1.2s on average — what used to take hours now happens before the customer hits refresh.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {mobileInsightCards.map((card) => {
                if (card.variant === 'wide') {
                  return (
                    <div
                      key={card.label}
                      className="relative overflow-hidden rounded-[2rem] px-6 py-8"
                      style={{ backgroundColor: '#F3EFE9' }}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">{card.label}</p>
                      <p
                        className="mt-2 leading-none tracking-tight"
                        style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '3.25rem', color: '#111827' }}
                      >
                        {card.stat}
                      </p>
                      <p className="mt-3 text-lg font-semibold leading-snug text-gray-900">{card.headline}</p>
                      <p className="mt-2 text-sm leading-relaxed text-gray-500">{card.body}</p>
                    </div>
                  )
                }
                return (
                  <div
                    key={card.label}
                    className="relative overflow-hidden rounded-[2rem] px-6 py-9 text-center"
                    style={
                      card.variant === 'image'
                        ? {
                            backgroundImage: `url(${(card as { image: string }).image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }
                        : { backgroundColor: '#F3EFE9' }
                    }
                  >
                    {card.variant === 'image' && <div className="absolute inset-0 bg-black/50" aria-hidden />}
                    <div className="relative z-10">
                      <p
                        className={`text-xs font-semibold uppercase tracking-[0.14em] ${card.variant === 'image' ? 'text-white/70' : 'text-gray-500'}`}
                      >
                        {card.label}
                      </p>
                      <p
                        className="mt-2 leading-none tracking-tight"
                        style={{
                          fontFamily: "'Nohemi', sans-serif",
                          fontWeight: 300,
                          fontSize: '3.25rem',
                          color: card.variant === 'image' ? '#fff' : '#111827',
                        }}
                      >
                        {card.stat}
                      </p>
                      <p
                        className={`mx-auto mt-4 max-w-[16rem] text-sm leading-relaxed ${card.variant === 'image' ? 'text-white/80' : 'text-gray-500'}`}
                      >
                        {card.body}
                      </p>
                    </div>
                  </div>
                )
              })}
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
          </div>          {/* Question — mobile: card with brand bg + rounded bottom */}
          <div className="lg:hidden -mx-10 overflow-hidden rounded-[2.5rem] px-10 pb-8 pt-2" style={{ backgroundColor: '#F1EDE9' }}>
            <div className="text-center">
              <h2 className="text-[1.75rem] leading-snug text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
                One agent that works across every system you already use.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-500">
                supVision plugs into your existing stack and handles customer queries automatically — no rip-and-replace required.
              </p>

              <Link
                to="/integrations"
                className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: '#214995' }}
              >
                Explore all integrations
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* Integration logos ticker — edge-to-edge inside card */}
            <div
              className="mt-6 -mx-10 overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              }}
            >
              <div
                className="flex items-center gap-3"
                style={{ width: 'max-content', animation: 'ticker 24s linear infinite' }}
              >
                {[...heroIntegrationLogos, ...heroIntegrationLogosMobileExtra, ...heroIntegrationLogos, ...heroIntegrationLogosMobileExtra].map((logo, i) => (
                  <div
                    key={i}
                    className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-2xl bg-white"
                  >
                    <img
                      src={`/logos/${logo}`}
                      alt={logo.replace(/\.png$/, '').replace(/\s*\(\d+\)/, '')}
                      className="h-[65%] w-[65%] object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Integrations — desktop (same as mobile block) */}
          <div className="mb-16 hidden lg:block">
            <div className="text-center">
              <h2
                className="mx-auto max-w-3xl text-4xl leading-snug text-gray-900"
                style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
              >
                One agent that works across every system you already use.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-500">
                supVision plugs into your existing stack and handles customer queries automatically — no rip-and-replace required.
              </p>
              <Link
                to="/integrations"
                className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: '#214995' }}
              >
                Explore all integrations
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <div className="relative left-1/2 mt-12 w-screen max-w-none -translate-x-1/2 overflow-hidden">
              <div
                className="flex items-center gap-5 px-2"
                style={{ width: 'max-content', animation: 'ticker 32s linear infinite' }}
              >
                {[...heroIntegrationLogos, ...heroIntegrationLogos, ...heroIntegrationLogos].map((logo, i) => (
                  <div
                    key={i}
                    className="flex h-[5.5rem] w-[5.5rem] flex-shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm sm:h-24 sm:w-24"
                  >
                    <img
                      src={`/logos/${logo}`}
                      alt={logo.replace(/\.png$/, '').replace(/\s*\(\d+\)/, '')}
                      className="h-[68%] w-[68%] object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>



        </div>
      </section>

      {/* Built for fintech — persona selector */}
      <section className="px-4 py-4 lg:px-6 lg:py-10">
        <div
          className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 rounded-[1.5rem] px-6 py-8 lg:max-w-none lg:items-center lg:gap-8 lg:rounded-[2rem] lg:px-12 lg:py-12"
          style={{ background: '#1A1A1A' }}
        >
          <div className="w-full lg:text-center">
            <h2
              className="text-3xl leading-snug text-white lg:text-4xl"
              style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
            >
              Built for the way <span style={{ color: '#FB9A05' }}>fintech works</span>
            </h2>
            <p className="mt-2 text-sm text-gray-400 lg:text-base">Select one to see supVision in action.</p>
          </div>

          <div className="flex w-full flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setActivePersona(null)}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
              style={{
                background: activePersona === null ? '#214995' : 'rgba(255,255,255,0.08)',
                color: activePersona === null ? '#fff' : '#9ca3af',
                border: activePersona === null ? '1px solid #214995' : '1px solid rgba(255,255,255,0.1)',
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
                  background: activePersona === i ? '#214995' : 'rgba(255,255,255,0.08)',
                  color: activePersona === i ? '#fff' : '#9ca3af',
                  border: activePersona === i ? '1px solid #214995' : '1px solid rgba(255,255,255,0.1)',
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
                className="flex items-center gap-3 rounded-2xl px-4 py-3 lg:gap-3 lg:px-4 lg:py-4"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="flex flex-shrink-0 items-center -space-x-2">
                  {stack.logos.map((logo, idx) => (
                    <StackLogo key={idx} {...logo} />
                  ))}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold leading-snug text-white lg:text-sm">{stack.label}</p>
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
                <div className="flex w-full flex-col gap-2.5 lg:hidden">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Suggested integrations</p>
                  <div className="flex flex-col gap-2.5">
                    {mobileVisible.map(stack => renderStackCard(stack))}
                  </div>
                  {mobileExtra > 0 && (
                    <div className="flex justify-center">
                      <Link to="/integrations" className="text-xs font-semibold text-gray-400 transition-colors hover:text-gray-200">
                        +{mobileExtra} more ↓
                      </Link>
                    </div>
                  )}
                </div>

                <div className="hidden w-full flex-col gap-4 lg:flex">
                  <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-500">Suggested integrations</p>
                  <div className="grid w-full grid-cols-4 gap-4">
                    {desktopVisible.map(stack => renderStackCard(stack))}
                  </div>
                  {desktopExtra > 0 && (
                    <div className="flex justify-center">
                      <Link to="/integrations" className="text-xs font-semibold text-gray-400 transition-colors hover:text-gray-200">
                        +{desktopExtra} more ↓
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )
          })()}

          <div className="flex w-full flex-col items-center gap-2 pt-2 lg:pt-4">
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
            <Link to="/contact" className="text-center text-xs text-gray-400 transition-colors hover:text-gray-200">
              Can&apos;t find your tool? <span className="font-bold text-white">Let&apos;s talk about your stack →</span>
            </Link>
          </div>
        </div>
      </section>

      <SolutionShowcase
        variant="desktop"
        modelAnimIdx={modelAnimIdx}
        logScene={logScene}
        logRevealedSteps={logRevealedSteps}
        logDecisionShown={logDecisionShown}
        logFading={logFading}
        langItems={langItems}
        liftedSlot={liftedSlot}
      />

      <SolutionShowcase
        variant="mobile"
        modelAnimIdx={modelAnimIdx}
        logScene={logScene}
        logRevealedSteps={logRevealedSteps}
        logDecisionShown={logDecisionShown}
        logFading={logFading}
        langItems={langItems}
        liftedSlot={liftedSlot}
      />

      {/* Proof */}
      <section className="py-16" style={{ backgroundColor: '#111' }}>
        <div className="mb-10 text-center px-6">
          <p className="text-3xl text-white" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
            Companies that moved from overwhelmed to{' '}
            <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
              automated.
              <svg
                viewBox="0 0 190 12"
                preserveAspectRatio="none"
                aria-hidden="true"
                style={{ position: 'absolute', bottom: -6, left: '-2%', width: '104%', height: 12, pointerEvents: 'none', overflow: 'visible' }}
              >
                <path
                  d="M 2 8 C 12 5, 28 10, 48 7 C 64 5, 82 9, 100 6.5 C 118 4, 138 9, 158 7 C 170 5.5, 180 8, 188 7"
                  stroke="#FB9A05" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
                />
                <path
                  d="M 4 9.5 C 20 7, 42 11, 65 8.5 C 88 6, 112 10, 135 8 C 155 6.5, 172 9.5, 187 8.5"
                  stroke="#FB9A05" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.45"
                />
              </svg>
            </span>
          </p>
        </div>

        {/* Scroll carousel */}
        <div
          ref={carouselRef}
          style={{ overflow: 'hidden', width: '100%' }}
        >
          <div
            ref={carouselRef}
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-end',
              width: 'max-content',
              animation: 'ticker 40s linear infinite',
            }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  width: 320,
                  background: '#faf8f5',
                  borderRadius: 24,
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <p style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '1.1rem',
                  lineHeight: 1.65,
                  color: '#1a1a1a',
                  textAlign: 'center',
                }}>
                  "{t.quote}"
                </p>
                <p style={{ fontSize: '0.92rem', color: '#555', textAlign: 'center', lineHeight: 1.5 }}>
                  <strong style={{ color: '#111' }}>{t.name}</strong>
                  {', '}{t.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured stories */}
      <section className="px-4 py-10 lg:px-8 lg:py-14" style={{ backgroundColor: '#111' }}>
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 lg:max-w-5xl lg:grid-cols-2 lg:items-start lg:gap-5">
          {[
            {
              headline: 'Queue gone in a week',
              quote: '"Disputes used to pile up over 3–5 days. supVision resolved them in under 2 minutes, no manual steps. The queue was gone by end of week one."',
              name: 'Marcus T.',
              role: 'Head of Operations',
            },
            {
              headline: 'Live in 3 days, not 6 months',
              quote: '"Our previous vendor quoted six months. supVision connected to Zendesk and our KYC provider over a weekend. By Monday it was handling real queries."',
              name: 'Nina K.',
              role: 'Director of Customer Ops',
            },
            {
              headline: '74% cost reduction, first quarter',
              quote: '"Every time volume grew, so did headcount costs. supVision let us handle 4× the load with the same team — 74% opex reduction in the first quarter."',
              name: 'Tobias H.',
              role: 'CFO',
            },
            {
              headline: '16× growth, zero new hires',
              quote: '"5,000 to 80,000 monthly users in eight months. supVision absorbed the entire spike without a single new hire. CSAT improved during the growth phase."',
              name: 'Yuki T.',
              role: 'VP Operations',
            },
          ].map((s, i) => (
            <div
              key={i}
              className="h-full"
              style={{
                backgroundColor: '#224894',
                borderRadius: 20,
                padding: '1.75rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
              }}
            >
              {/* Arrow */}
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 16L16 4M16 4H7M16 4V13" stroke="#faf8f5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Headline */}
              <p
                className="pr-8 text-[1.5rem] leading-tight lg:text-[1.75rem] lg:leading-snug"
                style={{
                  fontFamily: "'Nohemi', sans-serif",
                  fontWeight: 300,
                  color: '#FB9A05',
                }}
              >
                {s.headline}
              </p>

              {/* Quote */}
              <p className="flex-1 text-[0.88rem] leading-relaxed text-[#faf8f5] lg:text-[1rem] lg:leading-relaxed">
                {s.quote}
              </p>

              {/* Attribution */}
              <div style={{ marginTop: '0.25rem' }}>
                <p style={{ fontWeight: 700, fontSize: '0.88rem', color: '#faf8f5' }}>{s.name}</p>
                <p style={{ fontSize: '0.82rem', color: 'rgba(250,248,245,0.6)', marginTop: 2 }}>{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Built by operators */}
      <section data-nav-dark className="py-3 px-2 sm:px-3">
        <div>
          <div className="rounded-3xl bg-gray-950 px-4 py-10 lg:px-16 lg:py-16">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center">

            {/* Left - text */}
            <div>
              <p className="hidden text-xs font-bold uppercase tracking-[0.2em] lg:block" style={{ color: '#4a72c4' }}>Our story</p>
              {/* Mobile headline — Canela, как Instant support / Zero effort */}
              <h2
                className="mt-4 flex flex-col text-center leading-tight lg:hidden"
                style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, fontSize: '2.25rem' }}
              >
                <span className="text-white">Built by people with</span>
                <span>
                  <span style={{ color: '#FB9A05' }}>10+ years </span>
                  <span className="text-white">in fintech.</span>
                </span>
              </h2>
              <h2 className="mt-4 hidden text-3xl font-bold leading-snug text-white lg:mt-5 lg:block lg:text-5xl">
                Built by people with 10+ years in fintech.
              </h2>
              <p className="mt-4 text-center text-sm leading-relaxed text-gray-400 lg:mt-6 lg:text-left lg:text-base">
                Built by operators, not engineers reading about fintech. We spent a decade in financial services — support, verification queues, regulator audits — and watched knowledge walk out every time an agent left.
              </p>

              {/* Mobile: metrics right after paragraph */}
              <div className="mt-6 border-t border-white/10 pt-6 lg:hidden">
                <p className="text-center text-sm font-semibold text-white">
                  And here&apos;s what we achieved on our own operations first:
                </p>
                <div className="mt-5 grid grid-cols-3 gap-4">
                {[
                  { value: '70%', label: 'Fewer repeat tickets on our own queue' },
                  { value: '4×', label: 'Faster internal escalation resolution' },
                  { value: '100%', label: 'Playbooks captured — no knowledge lost on handoff' },
                ].map(m => (
                  <div key={m.label} className="text-center">
                    <p className="text-2xl font-black text-white">{m.value}</p>
                    <p className="mt-1 text-xs leading-snug text-gray-500">{m.label}</p>
                  </div>
                ))}
                </div>
              </div>

              {/* Mobile photo */}
              <div className="mt-6 overflow-hidden rounded-2xl lg:hidden">
                <img src="/team.png" alt="supVision team" className="w-full object-cover" />
              </div>

              <p className="mt-4 text-center text-sm font-semibold text-white lg:text-left lg:text-base">
                So we decided to share it with the whole industry.
              </p>

              <div className="mt-6 lg:mt-10">
                {/* Mobile button */}
                <Link
                  to="/about"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 py-3 text-sm font-semibold text-white lg:hidden"
                >
                  Read our story
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </Link>
                {/* Desktop button: animated */}
                <div className="hidden lg:flex flex-wrap items-center gap-6">
                  <Link
                    to="/about"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/10 pl-5 pr-1.5 py-1.5 text-sm font-semibold text-white"
                  >
                    <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]" style={{ backgroundColor: '#214995' }} />
                    <span className="relative z-10 transition-colors duration-300">Read our story</span>
                    <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </Link>
                  <div className="flex items-center gap-4">
                    <div className="h-px w-8 bg-white/20" />
                    <span className="text-sm text-white/50">10+ years in fintech before writing a line of code</span>
                  </div>
                </div>
              </div>

              {/* Desktop metrics */}
              <div className="mt-8 hidden border-t border-white/10 pt-10 lg:block">
                <p className="text-sm font-semibold text-white">
                  And here&apos;s what we achieved on our own operations first:
                </p>
                <div className="mt-6 grid grid-cols-3 gap-6">
                {[
                  { value: '70%', label: 'Fewer repeat tickets on our own queue' },
                  { value: '4×', label: 'Faster internal escalation resolution' },
                  { value: '100%', label: 'Playbooks captured — no knowledge lost on handoff' },
                ].map(m => (
                  <div key={m.label}>
                    <p className="text-2xl font-black text-white lg:text-3xl">{m.value}</p>
                    <p className="mt-1 text-xs leading-snug text-gray-500">{m.label}</p>
                  </div>
                ))}
                </div>
              </div>
            </div>

            {/* Right - image, desktop only */}
            <div className="hidden lg:block overflow-hidden rounded-2xl" style={{ minHeight: '520px' }}>
              <img
                src="/team.png"
                alt="supVision team"
                className="h-full w-full object-cover"
                style={{ minHeight: '520px' }}
              />
            </div>

          </div>
        </div>
        </div>
      </section>


      {/* Compliance & Security */}
      <section className="py-3 px-2 sm:px-3">
        <div className="rounded-3xl bg-gray-50 px-4 py-10 lg:px-16 lg:py-16">
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
                style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
              >
                We put our security{' '}
                <span style={{ color: '#FB9A05' }}>to the test </span>
                with live, independent auditing.
              </h2>
              <div className="mt-10 grid grid-cols-3 gap-6">
                {complianceCertCards.map((card) => (
                  <div
                    key={card.title}
                    className="flex flex-col items-center overflow-visible rounded-2xl border border-gray-800 px-6 py-8 text-center"
                    style={{ backgroundColor: '#1c1c1e' }}
                  >
                    <div
                      className={[
                        'relative mb-6 flex items-center justify-center overflow-visible rounded-full border-2',
                        card.badgeOversize ? 'h-24 w-24' : 'h-28 w-28 p-4',
                      ].join(' ')}
                      style={{ borderColor: '#FB9A05', boxShadow: '0 0 20px rgba(251, 154, 5, 0.2)' }}
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
                      className="text-xl leading-snug text-white"
                      style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
                    >
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">{card.desc}</p>
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
              <p className="hidden text-sm font-bold uppercase tracking-[0.2em] text-blue-300 lg:block">Book a demo</p>
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


const testimonials: {
  name: string
  role: string
  company: string
  bgGradient: string
  avatar: string
  quote: string
  metrics: { value: string; label: string }[]
}[] = [
  {
    name: 'Marcus T.',
    role: 'Head of Operations',
    company: 'CLEARFLOW',
    bgGradient: 'linear-gradient(135deg, #0f2a5e 0%, #214995 60%, #4a72c4 100%)',
    avatar: '/team.png',
    quote: "Dispute queues were our biggest headache — tickets piling up over 3–5 days, agents overwhelmed, customers furious. supVision resolved the same disputes in under 2 minutes, with no manual steps. The queue disappeared in the first week.",
    metrics: [
      { value: '< 2 min', label: 'median dispute resolution' },
      { value: '0', label: 'manual steps required' },
    ],
  },
  {
    name: 'Priya S.',
    role: 'VP Customer Experience',
    company: 'NOVALEND',
    bgGradient: 'linear-gradient(135deg, #0d3320 0%, #1a5c38 60%, #2e9e60 100%)',
    avatar: '/image 178 (1)-Photoroom 2.png',
    quote: "We were stuck in a cycle — agents quit, we onboard new ones, quality drops, repeat. supVision ended that cycle completely. The quality on day one was the same as month twelve. We stopped budgeting for turnover.",
    metrics: [
      { value: '0%', label: 'knowledge loss on agent turnover' },
      { value: '98.4%', label: 'consistent resolution rate' },
    ],
  },
  {
    name: 'Tobias H.',
    role: 'CFO',
    company: 'PAYREX',
    bgGradient: 'linear-gradient(135deg, #2d1a00 0%, #7c4a00 60%, #c47a00 100%)',
    avatar: '/team.png',
    quote: "Every time ticket volume grew, so did our headcount costs — salaries, sick pay, cover shifts, retraining. supVision let us handle 4× the volume with the same team. We cut support operating costs by 74% in the first quarter.",
    metrics: [
      { value: '74%', label: 'reduction in support opex' },
      { value: '4×', label: 'volume, same team size' },
    ],
  },
  {
    name: 'Sofia M.',
    role: 'Head of Support',
    company: 'BANKLY',
    bgGradient: 'linear-gradient(135deg, #1a0a2e 0%, #3d1a6b 60%, #6b38b8 100%)',
    avatar: '/image 178 (1)-Photoroom 2.png',
    quote: "Our customers were hitting payment failures at midnight with no one to help. Covering nights and weekends was expensive and demoralising for the team. supVision took over the whole 24/7 window. Every customer now gets an instant reply, any hour.",
    metrics: [
      { value: '24/7', label: 'coverage without shift premiums' },
      { value: '< 10 s', label: 'avg first response, any hour' },
    ],
  },
  {
    name: 'Léa C.',
    role: 'Global Expansion Lead',
    company: 'FINVAULT',
    bgGradient: 'linear-gradient(135deg, #0a2218 0%, #0e4a30 60%, #1a7a50 100%)',
    avatar: '/team.png',
    quote: "We were routing foreign-language queries through Google Translate and hoping for the best. Complaints from non-English users were 3× higher. supVision handles 50+ languages natively — no awkward phrasing, no miscommunication, launch-ready from day one.",
    metrics: [
      { value: '50+', label: 'languages, native fluency' },
      { value: '3×', label: 'fewer complaints from non-English users' },
    ],
  },
  {
    name: 'Arjun M.',
    role: 'Head of Compliance',
    company: 'KRYPTEX',
    bgGradient: 'linear-gradient(135deg, #1a0a2e 0%, #3d1a6b 60%, #6b38b8 100%)',
    avatar: '/team.png',
    quote: "Regulators asked for a full audit trail on a disputed case. With our old setup that would have taken a week. supVision had every decision logged with timestamps and rationale. We exported the full trail in four minutes.",
    metrics: [
      { value: '4 min', label: 'full audit export time' },
      { value: '100%', label: 'decisions logged automatically' },
    ],
  },
  {
    name: 'Nina K.',
    role: 'Director of Customer Ops',
    company: 'SWIFTCARD',
    bgGradient: 'linear-gradient(135deg, #0f2a5e 0%, #214995 60%, #4a72c4 100%)',
    avatar: '/team.png',
    quote: "We went live in three days. Not three months — three days. Our old vendor quoted a six-month integration. supVision connected to Zendesk and our KYC provider over a weekend, and by Monday morning it was handling real queries.",
    metrics: [
      { value: '3 days', label: 'from contract to live' },
      { value: '6 months', label: 'saved vs previous vendor quote' },
    ],
  },
  {
    name: 'Daniel F.',
    role: 'CTO',
    company: 'MONEYMESH',
    bgGradient: 'linear-gradient(135deg, #0d3320 0%, #1a5c38 60%, #2e9e60 100%)',
    avatar: '/team.png',
    quote: "We handle card disputes on WhatsApp and Telegram as well as web. supVision handles all three channels with the same logic, same tone, same compliance rules. No separate bots, no inconsistent answers. One system, everywhere.",
    metrics: [
      { value: '3 channels', label: 'unified — web, WhatsApp, Telegram' },
      { value: '1', label: 'policy engine across all of them' },
    ],
  },
  {
    name: 'Yuki T.',
    role: 'VP Operations',
    company: 'ORBITPAY',
    bgGradient: 'linear-gradient(135deg, #2d1a00 0%, #7c4a00 60%, #c47a00 100%)',
    avatar: '/team.png',
    quote: "We scaled from 5,000 to 80,000 monthly active users in eight months. Support volume exploded. supVision absorbed the whole spike without us hiring a single new agent. CSAT actually improved during the growth phase.",
    metrics: [
      { value: '16×', label: 'user growth, zero new support hires' },
      { value: '+12 pts', label: 'CSAT improvement during scale-up' },
    ],
  },
]

const heroIntegrationLogos = [
  'zendesk.png',
  'slack.png',
  'salesforce.png',
  'freshdesk.png',
  'hubspot.png',
  'intecom (1).png',
  'whatsapp.png',
  'telegram.png',
  'notion.png',
  'confluence.png',
  'jira.png',
]

const heroIntegrationLogosMobileExtra = [
  'gmail.png',
  'outlook.png',
  'teams.png',
  'twillio.png',
  'mambu.png',
]

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
    desc: 'Closes disputes, payments, and verification queries autonomously — median resolution under 2 minutes.',
    icon: S('M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z', true),
  },
  {
    label: 'Escalate with full context',
    desc: 'Hands complex cases to your team with the thread, live CRM/KYC data, and why the agent stepped back.',
    icon: S('M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z', true),
  },
  {
    label: 'Verify with live data',
    desc: 'Pulls account, transaction, and identity state from your stack before every reply — no generic scripts.',
    icon: S('M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z', true),
  },
  {
    label: 'Work across your channels',
    desc: 'Email, chat, WhatsApp, Telegram, and your helpdesk — one agent for every channel your customers use.',
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
    desc: 'GDPR-compliant data handling and right-to-erasure support',
  },
  {
    badge: '/badge/image.png',
    badgeAlt: 'PCI DSS Compliant',
    title: 'PCI DSS Aligned',
    desc: 'PCI DSS aligned, no raw card data ever touches our system',
    badgeOversize: true,
  },
  {
    badge: '/nda.png',
    badgeAlt: 'NDA protected',
    title: 'NDA-Protected Data',
    desc: 'All data encrypted end-to-end and protected under a signed NDA — we cannot see your customer records',
  },
]


const mobileInsightCards = [
  {
    label: 'Support costs',
    stat: '68%',
    body: 'Cut cost by 68% on repetitive tier-1 volume — without adding headcount.',
    variant: 'light' as const,
  },
  {
    label: 'Customer satisfaction',
    stat: '92%',
    body: 'Happier customers — faster answers, fewer escalations, and higher CSAT across every channel.',
    variant: 'image' as const,
    image: '/hero_images/Component 174.png',
  },
  {
    label: 'Tier-1 tickets resolved',
    stat: '80%',
    headline: 'No human required.',
    body: 'Identity status checks, payment failures, onboarding questions — SupVision closes them automatically. Your agents focus only on the cases that genuinely need them.',
    variant: 'wide' as const,
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
