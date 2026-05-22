import { FormEvent, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const clipRef = useRef<HTMLDivElement>(null)
  const dashboardPanelRef = useRef<HTMLDivElement>(null)
  const dashboardGlassRef = useRef<HTMLDivElement>(null)
  const [activeT, setActiveT] = useState(0)
  const [activeFeatures, setActiveFeatures] = useState<Record<number, number>>({ 0: 0, 1: 0, 2: 0, 3: 0 })
  const [controlTab, setControlTab] = useState<0 | 1 | 2 | 3>(0)
  const [stackFilters, setStackFilters] = useState<Record<string, string | null>>({})
  const [showAllStacks, setShowAllStacks] = useState(false)
  const [demoSubmitted, setDemoSubmitted] = useState(false)
  const [demoAgreed, setDemoAgreed] = useState(false)
  const [demoAttempted, setDemoAttempted] = useState(false)
  const [demoFormIsValid, setDemoFormIsValid] = useState(false)
  const demoFormRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveT(i => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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
      <section data-nav-dark className="relative flex lg:min-h-screen items-start" style={{ backgroundColor: '#faf8f5' }}>
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

        {/* Hero right - main dashboard, вне clipRef, clipPath синхронизирован со скроллом */}
        <div
          ref={dashboardPanelRef}
          className="absolute z-20 hidden lg:block"
          style={{ left: '53%', width: '52vw', top: '48%', transform: 'translateY(-50%)' }}
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
            <img
              src="/image 178 (1)-Photoroom 2.png"
              alt="Dashboard preview"
              className="w-full rounded-xl"
            />
          </div>
        </div>

        {/* Left content column */}
        <div
          className="relative z-10 flex w-full flex-col self-stretch lg:w-[53vw]"
          style={{
            paddingTop: '6rem',
            paddingBottom: '2rem',
            paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2 + 1.5rem))',
            paddingRight: '1rem',
          }}
        >
          {/* Text block */}
          <div className="pr-8 mt-12">
            <div className="mb-6 hidden lg:inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-base font-medium text-white backdrop-blur-sm">
              An AI support layer tailored for fintech industries
            </div>

            <h1 className="mt-3 flex flex-col text-4xl font-light leading-tight tracking-tight text-white lg:text-6xl">
              <span><span className="font-semibold">Autonomous</span> Support</span>
              <span><span className="font-semibold">Agent</span> for Fintech</span>
            </h1>

            <p className="mt-8 text-base leading-relaxed text-white max-w-xl">
              AI support that saves 93% of tickets without human intervention — handling 72% of all message flow and fully closing 49% of cases on its own.
            </p>

          </div>

          <div className="mt-8 pr-8">
            {/* Mobile button: simple centered text + arrow, no fill animation, no circle */}
            <Link
              to="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/40 py-3 text-base font-semibold text-white lg:hidden"
            >
              <span>Let's chat</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
            {/* Desktop button: full animation */}
            <Link
              to="/contact"
              className="group relative hidden overflow-hidden rounded-full border border-white/40 pl-6 pr-1.5 py-1.5 text-base font-semibold text-white lg:inline-flex lg:items-center lg:gap-3"
            >
              <span
                className="absolute right-[6px] top-1/2 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]"
                style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.2)' }}
              />
              <span className="relative z-10">Let's chat</span>
              <span className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Mobile dashboard preview */}
          <div className="mt-8 pr-4 lg:hidden">
            <div
              className="rounded-2xl p-3"
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              }}
            >
              <img
                src="/image 178 (1)-Photoroom 2.png"
                alt="Dashboard preview"
                className="w-full rounded-xl"
              />
            </div>
          </div>

          {/* Mobile feature blocks - below dashboard image */}
          <div className="mt-6 pr-4 pb-8 lg:hidden grid grid-cols-1 gap-3">
            {heroFeatures.slice(0, 2).map((item) => (
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

          {/* Industries ticker - plain icon + text, fades at edges */}
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
            {heroFeatures.slice(0, 4).map((item) => (
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
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">

          {/* Question */}
          <h2 className="text-center text-3xl leading-snug text-gray-900 sm:text-4xl font-normal">
            Is your support team <span className="font-bold">drowning in queries</span> while <span className="font-bold">costs keep climbing?</span>
          </h2>

          {/* Sub-description */}
          <p className="mt-5 text-center text-base leading-relaxed text-gray-500 mx-auto max-w-3xl">
            Your agents handle hundreds of repetitive queries daily - identity verification checks, payment failures, onboarding questions. SupVision resolves them automatically, so your team focuses on what actually needs them.
          </p>

          {/* Cards - 2 per row */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
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

          {/* CTAs below cards */}
          {/* Mobile CTAs - full width row */}
          <div className="mt-10 flex items-center gap-3 lg:hidden">
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
          {/* Desktop CTAs */}
          <div className="mt-10 hidden lg:flex items-center justify-center gap-4">
            <Link
              to="/support-agent"
              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
            >
              Learn more about how the agent works
            </Link>
            <Link
              to="/integrations"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full pl-6 pr-1.5 py-1.5 text-sm font-semibold text-white"
              style={{ backgroundColor: '#111827' }}
            >
              <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]" style={{ backgroundColor: '#214995' }} />
              <span className="relative z-10">Explore integrations</span>
              <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>

        </div>
      </section>

      {/* Why supVision header */}
      <section className="pt-10 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Solution</p>
          <h2 className="mt-5 text-3xl leading-snug text-gray-900 sm:text-4xl font-normal mx-auto max-w-3xl">
            Built for <span className="font-bold">regulated financial services</span> from day one
          </h2>
        </div>
      </section>

      {/* Control + Visibility - tabbed */}
      <section className="py-12 lg:py-24">

          {/* Tab switcher - edge-to-edge scroll on mobile */}
          <div className="mb-8 lg:mb-12 flex justify-center gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {([0, 1, 2, 3] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setControlTab(tab)}
                className={`flex-shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${controlTab === tab ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {featureSections[tab].label}
              </button>
            ))}
          </div>

        <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">

          {/* Content */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">

            {/* Text + accordion - first on mobile */}
            <div className="lg:w-[40%] lg:flex-shrink-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">{featureSections[controlTab].label}</p>
              <h2 className="mt-3 text-2xl font-bold leading-snug text-gray-900 lg:mt-5 lg:text-3xl">{featureSections[controlTab].title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500 lg:mt-5">{featureSections[controlTab].description}</p>

              <div className="mt-6 lg:mt-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">Features</p>
                <div className="divide-y divide-gray-100 border-t border-gray-100">
                  {featureSections[controlTab].features.map((f, fi) => (
                    <div
                      key={f.title}
                      className="cursor-pointer py-3"
                      onClick={() => setActiveFeatures(prev => ({ ...prev, [controlTab]: fi }))}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className={`text-sm font-semibold transition-colors duration-200 ${fi === activeFeatures[controlTab] ? 'text-gray-900' : 'text-gray-400'}`}>
                          {f.title}
                        </p>
                        <span className="flex-shrink-0 text-xl font-light leading-none text-gray-400">
                          {fi === activeFeatures[controlTab] ? '−' : '+'}
                        </span>
                      </div>
                      {fi === activeFeatures[controlTab] && (
                        <p
                          className="mt-1.5 text-sm leading-relaxed text-gray-500"
                          style={{ animation: 'feature-text-in 0.3s ease both' }}
                        >
                          {f.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image - below text on mobile, right on desktop */}
            <div className="overflow-hidden rounded-2xl lg:w-[60%] min-h-[220px] lg:min-h-[480px]">
              <img
                key={`${controlTab}-${activeFeatures[controlTab]}`}
                src={featureSections[controlTab].features[activeFeatures[controlTab]]?.img ?? featureSections[controlTab].img}
                alt={featureSections[controlTab].features[activeFeatures[controlTab]]?.title}
                className="h-full w-full object-cover object-top"
                style={{
                  minHeight: 'inherit',
                  animation: 'feature-img-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
                }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Integration finder */}
      <section className="pt-8 pb-20 px-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl sm:px-6">
          <div className="rounded-2xl lg:rounded-3xl px-4 py-10 lg:px-10 lg:py-16 text-center" style={{ backgroundColor: '#f0ede8' }}>
            <h2 className="text-2xl font-bold leading-snug text-gray-900 sm:text-3xl lg:text-4xl mx-auto max-w-2xl">
              Our{' '}
              <span className="inline-flex items-center rounded-xl px-3 py-1 font-bold" style={{ backgroundColor: 'rgba(33,73,149,0.12)', color: '#214995' }}>
                integration finder
              </span>
              {' '}helps you connect the tools you already use to{' '}
              <span className="inline-flex items-center rounded-xl px-3 py-1 font-bold" style={{ backgroundColor: 'rgba(33,73,149,0.2)', color: '#214995' }}>
                automate fintech support
              </span>
            </h2>

            <div className="mt-10 flex flex-nowrap items-center justify-center gap-3 lg:flex-wrap">
              {integrationGroups.map(group => (
                <div key={group.label} className={group.label === 'KYC' ? 'hidden lg:block' : 'flex-shrink-0'}>
                  <IntegrationSelect
                    label={group.label}
                    options={group.options}
                    value={stackFilters[group.label] ?? null}
                    onChange={(name) => setStackFilters(prev => ({ ...prev, [group.label]: name }))}
                    comingSoon={group.label === 'KYC'}
                  />
                </div>
              ))}
            </div>

            {/* Suggested stacks */}
            {(() => {
              const active = Object.values(stackFilters).filter(Boolean) as string[]
              const filtered = active.length === 0
                ? automationStacks
                : automationStacks.filter(s => active.every(t => s.tools.includes(t)))
              const MOBILE_LIMIT = 4
              const DESKTOP_LIMIT = 9
              const needsMore = !showAllStacks && filtered.length > DESKTOP_LIMIT
              const visible = needsMore ? filtered.slice(0, DESKTOP_LIMIT) : filtered
              const mobileVisible = filtered.slice(0, MOBILE_LIMIT)
              return (
                <div className="mt-10">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                      {active.length > 0 ? `${filtered.length} matching stack${filtered.length !== 1 ? 's' : ''}` : 'Popular automation stacks'}
                    </p>
                    {active.length > 0 && (
                      <button onClick={() => setStackFilters({})} className="text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors">
                        Clear filters ×
                      </button>
                    )}
                  </div>
                  {filtered.length === 0 ? (
                    <p className="text-sm text-gray-400 py-4">No stacks match this combination yet. <Link to="/contact" className="font-semibold text-gray-900 hover:underline">Let's build one together →</Link></p>
                  ) : (
                    <>
                    {/* Mobile: max 4, +N more goes to /integrations */}
                    <div className="lg:hidden grid grid-cols-1 gap-3 text-left">
                      {mobileVisible.map(stack => (
                        <div key={stack.label} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3">
                          <div className="flex items-center -space-x-2 flex-shrink-0">
                            {stack.logos.map((logo, i) => <StackLogo key={i} {...logo} />)}
                          </div>
                          <div className="text-left min-w-0">
                            <p className="text-xs font-bold text-gray-900 leading-snug">{stack.label}</p>
                            <p className="text-xs text-gray-400 leading-snug">{stack.desc}</p>
                          </div>
                        </div>
                      ))}
                      {filtered.length > MOBILE_LIMIT && (
                        <div className="mt-1 flex justify-center">
                          <Link to="/integrations" className="text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors">
                            +{filtered.length - MOBILE_LIMIT} more ↓
                          </Link>
                        </div>
                      )}
                    </div>
                    {/* Desktop: max 9, expand inline */}
                    <div className="hidden lg:grid grid-cols-3 gap-3 text-left">
                      {visible.map(stack => (
                        <div key={stack.label} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3">
                          <div className="flex items-center -space-x-2 flex-shrink-0">
                            {stack.logos.map((logo, i) => <StackLogo key={i} {...logo} />)}
                          </div>
                          <div className="text-left min-w-0">
                            <p className="text-xs font-bold text-gray-900 leading-snug">{stack.label}</p>
                            <p className="text-xs text-gray-400 leading-snug">{stack.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {(needsMore || (showAllStacks && filtered.length > DESKTOP_LIMIT)) && (
                      <div className="mt-3 hidden lg:flex justify-center">
                        {needsMore ? (
                          <button onClick={() => setShowAllStacks(true)} className="text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors">
                            +{filtered.length - DESKTOP_LIMIT} more ↓
                          </button>
                        ) : (
                          <button onClick={() => setShowAllStacks(false)} className="text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors">
                            Show less ↑
                          </button>
                        )}
                      </div>
                    )}
                    </>
                  )}
                </div>
              )
            })()}

            <div className="mt-8 lg:mt-10 flex justify-center">
              {/* Mobile: simple full-width button */}
              <Link
                to="/integrations"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 lg:hidden"
              >
                Show all integrations
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
              {/* Desktop: animated button */}
              <Link
                to="/integrations"
                className="group relative hidden lg:inline-flex items-center gap-3 overflow-hidden rounded-full border border-gray-300 bg-white pl-6 pr-1.5 py-1.5 text-sm font-semibold"
              >
                <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[30]" style={{ backgroundColor: '#214995' }} />
                <span className="relative z-10 text-gray-900 transition-colors duration-300 group-hover:text-white">Show all integrations</span>
                <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-500 text-center">
              Can't find your tool?{' '}
              <Link to="/contact" className="font-semibold text-gray-900 hover:underline">
                Let's talk about your stack →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24" style={{ paddingTop: '6rem' }}>
        <div className="mx-auto max-w-7xl px-6">

          {/* Mobile: sticky Benefits label below navbar */}
          <div
            className="mb-4 text-center sticky sm:relative z-[49] sm:z-auto py-3 sm:py-0"
            style={{ top: '72px', backgroundColor: '#faf8f5' }}
          >
            <p className="text-2xl font-bold uppercase text-gray-900">Benefits</p>
          </div>

          {/* Column headers - sticky below navbar, desktop only */}
          <div
            className="hidden sm:grid grid-cols-2 mb-3 px-1 sticky z-20 py-3 rounded-xl"
            style={{ top: '100px', backgroundColor: '#faf8f5' }}
          >
            <p className="text-lg font-bold text-gray-400 text-center">Before</p>
            <p className="text-lg font-bold text-center" style={{ color: '#214995' }}>After</p>
          </div>

          {/* Stacked sticky cards */}
          <div className="flex flex-col gap-4">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="sticky"
                style={{ top: `${154 + i * 40}px`, zIndex: i + 21 }}
              >
                <div className="relative grid grid-cols-1 sm:grid-cols-2 overflow-hidden rounded-2xl border border-gray-100 shadow-lg">
                  {/* Before */}
                  <div className="flex items-start bg-gray-900 p-6" style={{ minHeight: '160px' }}>
                    <div className="flex flex-col">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 sm:hidden">Before</p>
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                          {b.beforeIcon}
                        </div>
                        <h3 className="text-base font-bold text-white">{b.beforeTitle}</h3>
                      </div>
                      <p className="text-base leading-relaxed text-white/70">{b.before}</p>
                    </div>
                  </div>
                  {/* Mobile arrow - exactly at the border between Before and After */}
                  <div className="flex sm:hidden items-center justify-center bg-gray-900 pb-0 -mb-[1px] relative z-10">
                    <div className="flex h-9 w-9 -mb-4 items-center justify-center rounded-full shadow-md" style={{ backgroundColor: '#214995' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white rotate-90">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  {/* After */}
                  <div className="flex items-start bg-white p-6 pt-8 sm:pt-6" style={{ minHeight: '160px' }}>
                    <div className="flex flex-col">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] sm:hidden" style={{ color: '#214995' }}>After</p>
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: '#eef2fb', color: '#214995' }}>
                          {b.afterIcon}
                        </div>
                        <h3 className="text-base font-bold text-gray-900">{b.title}</h3>
                      </div>
                      <p className="text-base leading-relaxed text-gray-500">{b.after}</p>
                    </div>
                  </div>
                  {/* Desktop arrow - absolute centered between left/right halves */}
                  <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full shadow-md" style={{ backgroundColor: '#214995' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Industries</p>
            <h2 className="mt-4 text-3xl leading-snug text-gray-900 sm:text-4xl font-normal">
              Built for <span className="font-bold">your industry</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {industries.map((ind) => (
              <Link
                key={ind.name}
                to={ind.to}
                className="relative overflow-hidden rounded-2xl group"
                style={{ aspectRatio: '1/1', display: 'block' }}
              >
                <img
                  src={ind.img}
                  alt={ind.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-bold text-white leading-tight">{ind.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Results</p>
            <p className="mt-3 text-3xl font-bold text-gray-900">Companies that moved from overwhelmed to automated.</p>
          </div>

          {/* Card */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col sm:grid sm:h-[320px]" style={{ gridTemplateColumns: '240px 1fr' }}>

              {/* Left - identity */}
              <div
                className="flex flex-col items-center justify-center p-8 min-h-[160px] sm:min-h-0"
                style={{
                  backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <p className="text-xl font-black text-white text-center">{testimonials[activeT].name}</p>
                <p className="mt-2 text-base text-white/70 text-center">{testimonials[activeT].role}</p>
              </div>

              {/* Right - quote + metrics + CTA */}
              <div className="flex flex-col p-8 lg:p-10 overflow-hidden">
                <div className="flex-1">
                  <p className="text-5xl font-serif leading-none text-gray-200 select-none">"</p>
                  <p className="mt-2 text-lg leading-relaxed text-gray-800" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                    {testimonials[activeT].quote}
                  </p>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-6 flex gap-10">
                  {testimonials[activeT].metrics.map(m => (
                    <div key={m.label}>
                      <p className="text-3xl font-black" style={{ color: '#214995' }}>{m.value}</p>
                      <p className="mt-1 text-xs leading-snug text-gray-500">{m.label}</p>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveT(i => (i - 1 + testimonials.length) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H3.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L3.56 7.25H13.25A.75.75 0 0 1 14 8Z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveT(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: i === activeT ? '24px' : '8px', backgroundColor: i === activeT ? '#214995' : '#d1d5db' }}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveT(i => (i + 1) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h9.69L9.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

        </div>
      </section>

      {/* Built by operators */}
      <section data-nav-dark className="py-3 px-2 sm:px-3">
        <div>
          <div className="rounded-3xl bg-gray-950 px-4 py-10 lg:px-16 lg:py-16">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center">

            {/* Left - text */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#4a72c4' }}>Our story</p>
              <h2 className="mt-4 text-3xl font-bold leading-snug text-white lg:mt-5 lg:text-5xl">
                Built by people with 10+ years in fintech.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-400 lg:mt-6 lg:text-base">
                supVision was not built by engineers who read about fintech. It was built by operators who spent over a decade inside financial services - running support teams, managing verification queues, handling regulator audits, and watching knowledge walk out the door every time an agent left.
              </p>

              {/* Mobile: metrics right after paragraph */}
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 lg:hidden">
                {[
                  { value: '10+', label: 'Years inside fintech operations' },
                  { value: '3 days', label: 'Average time to go live' },
                  { value: '93%', label: 'Ticket saves — no human agent needed' },
                ].map(m => (
                  <div key={m.label}>
                    <p className="text-2xl font-black text-white">{m.value}</p>
                    <p className="mt-1 text-xs leading-snug text-gray-500">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Mobile photo */}
              <div className="mt-6 overflow-hidden rounded-2xl lg:hidden">
                <img src="/team.png" alt="supVision team" className="w-full object-cover" />
              </div>

              <p className="mt-4 text-sm font-semibold text-white lg:text-base">
                So we built what we needed - and opened it up to the industry.
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
              <div className="mt-8 hidden lg:grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
                {[
                  { value: '10+', label: 'Years inside fintech operations' },
                  { value: '3 days', label: 'Average time to go live' },
                  { value: '93%', label: 'Ticket saves — no human agent needed' },
                ].map(m => (
                  <div key={m.label}>
                    <p className="text-2xl font-black text-white lg:text-3xl">{m.value}</p>
                    <p className="mt-1 text-xs leading-snug text-gray-500">{m.label}</p>
                  </div>
                ))}
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
          <div className="grid gap-8 lg:gap-16 lg:grid-cols-2 lg:items-start">

            {/* Left */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Compliance & Security</p>
              <h2 className="mt-4 text-2xl font-bold leading-snug text-gray-900 lg:mt-5 lg:text-4xl">
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
                    <span className="text-sm leading-relaxed text-gray-700 lg:text-base">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - badges */}
            <div className="flex flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 lg:p-12 lg:gap-8">
              <p className="text-sm font-bold uppercase tracking-widest text-gray-900">Certified & Compliant</p>
              <div className="flex items-center justify-center gap-6">
                <img src="/badge/image.png" alt="PCI DSS Compliant" className="h-24 w-auto lg:h-36" />
                <img src="/badge/image 26 (3).png" alt="GDPR Compliant" className="h-20 w-auto lg:h-28" />
              </div>
              <p className="text-center text-sm leading-relaxed text-gray-500">
                Enterprise-grade security with end-to-end encryption, SOC 2-aligned infrastructure, and full GDPR & PCI DSS compliance.
              </p>
              {/* Mobile: full-width, no animation */}
              <Link
                to="/security"
                className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white lg:hidden"
                style={{ backgroundColor: '#214995' }}
              >
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
              {/* Desktop: animated */}
              <Link
                to="/security"
                className="group relative hidden lg:inline-flex items-center gap-3 overflow-hidden rounded-full pl-6 pr-1.5 py-1.5 text-sm font-semibold text-white"
                style={{ backgroundColor: '#214995' }}
              >
                <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/20 transition-transform duration-500 ease-in-out group-hover:scale-[20]" />
                <span className="relative z-10">Learn more</span>
                <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </span>
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
              <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-white lg:text-left lg:text-xs lg:text-blue-300">Book a demo</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-white lg:text-4xl">Most teams are live within 3 days.</h2>
              <p className="mt-3 text-base text-blue-200">30 minutes. We'll show exactly how it works for your stack.</p>
            </div>

            {/* Form - appears second on mobile (right after description), right column on desktop */}
            <div className="px-5 py-6 lg:px-12 lg:py-16 lg:row-span-2 lg:flex lg:items-center">
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
                    onSubmit={(e: FormEvent<HTMLFormElement>) => {
                      e.preventDefault()
                      const valid = (e.currentTarget as HTMLFormElement).checkValidity()
                      setDemoFormIsValid(valid)
                      setDemoAttempted(true)
                      if (valid && demoAgreed) setDemoSubmitted(true)
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
                        className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold uppercase tracking-widest text-white lg:hidden"
                        style={{ backgroundColor: '#111827' }}
                      >
                        Send request
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                          <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                        </svg>
                      </button>
                      {/* Desktop: animated */}
                      <button
                        type="submit"
                        className="group relative hidden lg:inline-flex items-center gap-3 overflow-hidden rounded-full pl-6 pr-1.5 py-1.5 text-sm font-bold text-white"
                        style={{ backgroundColor: '#111827' }}
                      >
                        <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]" style={{ backgroundColor: '#214995' }} />
                        <span className="relative z-10 uppercase tracking-widest">Send request</span>
                        <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                            <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </button>
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
            <div className="px-5 py-8 lg:px-16 lg:pt-8 lg:pb-16">
              <ul className="flex flex-col gap-3">
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
              <div className="mt-6 border-t border-white/10 pt-6">
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
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-8 text-center">
          <p className="text-2xl font-bold uppercase text-gray-900">FAQ</p>
        </div>

        <div className="mt-12 divide-y divide-gray-200">
          {faqItems.map((item, i) => (
            <div key={i} className={i >= 5 ? 'hidden lg:block' : ''}>
              <FAQItem
                item={item}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}


const featureSections: { label: string; title: string; description: string; img: string; bgGradient: string; features: { title: string; description: string; img?: string }[] }[] = [
  {
    label: 'Control',
    title: 'Define exactly how supVision responds',
    description: 'supVision goes beyond automate-or-escalate. Set confidence thresholds, restrict topics, and require human approval for sensitive actions - on your terms.',
    img: '/control/Confidence Thresholds.png',
    bgGradient: 'linear-gradient(135deg, #ddd8ce 0%, #b8ad99 50%, #9e9080 100%)',
    features: [
      { title: 'Confidence Thresholds', description: 'Set per-topic confidence levels so supVision only automates when it is certain enough. Below threshold, it escalates with full context attached.', img: '/control/Confidence Thresholds.png' },
      { title: 'Topic Restrictions', description: 'Define exactly which query types are handled by AI and which always route to a human agent - verification rejections, disputes, high-value account changes.', img: '/control/Topic Restrictions.png' },
      { title: 'Escalation Rules', description: 'Build custom escalation logic based on query type, customer tier, account status, or regulatory category. Every rule is logged and auditable.', img: '/control/Escalation Rules.png' },
      { title: 'Response Approval', description: 'Require human sign-off before supVision sends responses in high-risk categories, keeping your team in control without slowing down routine queries.', img: '/control/Response Approval.png' },
      { title: 'Data Access Controls', description: 'Control exactly which systems and data fields supVision can access per query type, so sensitive data is never exposed beyond its intended scope.', img: '/control/Data Access Controls.png' },
    ],
  },
  {
    label: 'Integration',
    title: 'Connects to your existing stack in days',
    description: 'supVision runs on top of what you already use - no platform migration, no rip-and-replace. Connect your helpdesk, identity verification provider, CRM, and knowledge base, and go live in 3 to 5 business days.',
    img: '/foto for solutions/Helpdesk Connectors.png',
    bgGradient: 'linear-gradient(135deg, #c8d8e8 0%, #8aaac8 50%, #607890 100%)',
    features: [
      { title: 'Helpdesk Connectors', description: 'Native integrations with Zendesk, Intercom, Freshdesk, and Salesforce Service Cloud - supVision works inside your existing ticket workflow, not alongside it.', img: '/foto for solutions/Helpdesk Connectors.png' },
      { title: 'Identity Providers', description: 'Pull live verification status and identity data in real time - before every response.', img: '/foto for solutions/Identity Providers.png' },
      { title: 'Knowledge Base', description: 'Index your Confluence spaces, Notion pages, or Guru cards so the agent answers using your own internal policies and procedures - not generic responses.', img: '/foto for solutions/Knowledge Base.png' },
      { title: 'Messaging Channels', description: 'Deploy across WhatsApp, Telegram, email, and live chat simultaneously - one supVision instance, every channel your customers use.', img: '/foto for solutions/Messaging Channels.png' },
      { title: 'Webhook & API', description: 'Integrate with any internal tool via REST API or webhooks. If it has an API, supVision can query it before responding to a customer.', img: '/foto for solutions/Webhook & API.png' },
    ],
  },
  {
    label: 'Visibility',
    title: 'Full insight into every automated action',
    description: 'Every AI decision is logged, every escalation is documented, and every response is traceable - so you always know what happened, why it happened, and who was responsible.',
    img: '/foto for solutions/Regulator Exports (3).png',
    bgGradient: 'linear-gradient(135deg, #d8e0d0 0%, #a0b890 50%, #708060 100%)',
    features: [
      { title: 'Full Audit Trail', description: 'Every automated decision is logged with timestamp, confidence score, data sources queried, and the full conversation context - regulator-ready out of the box.', img: '/visibility/Full Audit Trail.png' },
      { title: 'AI Decision Logs', description: 'See exactly why supVision chose to resolve or escalate each query, with the full reasoning chain exposed for compliance review or agent training.', img: '/visibility/AI Decision Logs.png' },
      { title: 'Log Streaming', description: 'Send real-time workflow data to tools like Datadog or Splunk for centralized monitoring, alerting, and integration with your existing security stack.', img: '/visibility/Log Streaming.png' },
      { title: 'Regulator Exports', description: 'Generate audit-ready reports for FCA, PSD2, or internal compliance reviews in minutes - structured, signed, and ready to share without manual extraction.', img: '/foto for solutions/Regulator Exports (3).png' },
    ],
  },
  {
    label: 'Orchestration',
    title: 'Fits any business structure. We handle the setup.',
    description: 'supVision adapts to your existing processes — not the other way around. The agent connects to your apps, emails, and databases on its own, then acts across your entire workflow with minimal effort from your side. We handle the implementation from day one.',
    img: '/foto for solutions/Zero-disruption deployment.png',
    bgGradient: 'linear-gradient(135deg, #e0d8f0 0%, #a090c8 50%, #705890 100%)',
    features: [
      { title: 'Zero-disruption deployment', description: 'supVision connects to your current stack without requiring platform migration or process redesign. The agent learns your workflows and goes live in days — your team keeps working as usual.', img: '/foto for solutions/Zero-disruption deployment.png' },
      { title: 'Autonomous data access', description: 'The agent independently checks emails, internal apps, and databases to gather the context it needs before responding. No manual data pulling, no copy-paste between systems.', img: '/foto for solutions/Autonomous data access.png' },
      { title: 'Beyond tier-1: complex multi-party resolutions', description: 'supVision handles cases where resolution requires communication with the client, a provider, and internal teams simultaneously — not just an auto-reply. Incorrect transaction status? The agent contacts both the client and the provider, confirms the correct status, and updates the record. Funds held in limbo? It coordinates next steps with all parties and resolves the hold. Duplicate charge? It verifies both sides, initiates the reversal, and keeps the client informed throughout.', img: '/foto for solutions/Beyond tier-1_ complex multi-party resolutions.png' },
      { title: 'Adapts to your org structure', description: 'Whether you route issues through a single team or across multiple departments and external partners, supVision maps to your actual processes and acts accordingly — no rigid templates.', img: '/foto for solutions/Adapts to your org structure.png' },
      { title: 'We do the implementation', description: 'Our team configures integrations, maps your workflows, and runs the onboarding end-to-end. Your team reviews and approves. Minimum effort from your side, maximum output from day one.', img: '/foto for solutions/We do the implementation.png' },
    ],
  },
]

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
    name: 'Dmytriy K.',
    role: 'Head of Customer Support',
    company: 'NEOBANK',
    bgGradient: 'linear-gradient(135deg, #0f2a5e 0%, #214995 60%, #4a72c4 100%)',
    avatar: '/team.png',
    quote: "We used to hire new people every time we expanded to a new geography. Now we automatically serve all regions - Europe, the US, Asia, the Middle East - without adding a single agent. The setup took three days.",
    metrics: [
      { value: '4 regions', label: 'served without new hires' },
      { value: '3 days', label: 'to go live globally' },
    ],
  },
  {
    name: 'Alan N.',
    role: 'Customer Success Lead',
    company: 'PAYTECH',
    bgGradient: 'linear-gradient(135deg, #0d3320 0%, #1a5c38 60%, #2e9e60 100%)',
    avatar: '/image 178 (1)-Photoroom 2.png',
    quote: "We cut support headcount by 30% while handling 3× the ticket volume. The agents that stayed are focused on real escalations, not copy-pasting the same repetitive answers all day. ROI showed up faster than any tool we've ever deployed.",
    metrics: [
      { value: '30%', label: 'reduction in support headcount' },
      { value: '3×', label: 'ticket volume, same team' },
    ],
  },
  {
    name: 'Ruslan V.',
    role: 'Head of Operations',
    company: 'FINLEND',
    bgGradient: 'linear-gradient(135deg, #2d1a00 0%, #7c4a00 60%, #c47a00 100%)',
    avatar: '/team.png',
    quote: "We went from a 4-hour average resolution time to under 2 minutes for verification queries. Ops costs dropped and CSAT went up at the same time. SupVision made the whole support flow predictable and auditable.",
    metrics: [
      { value: '< 2 min', label: 'avg verification resolution time' },
      { value: '1 month', label: 'to measurable ROI' },
    ],
  },
  {
    name: 'Cyril B.',
    role: 'Compliance Lead',
    company: 'LENDCORE',
    bgGradient: 'linear-gradient(135deg, #1a0a2e 0%, #3d1a6b 60%, #6b38b8 100%)',
    avatar: '/image 178 (1)-Photoroom 2.png',
    quote: "Our compliance team was skeptical about automating disputes. But SupVision handles edge cases better than we expected, and logs every decision with a full rationale and timestamp. When our auditors asked for a trail, we exported it in minutes.",
    metrics: [
      { value: '100%', label: 'automated decision audit coverage' },
      { value: '< 5 min', label: 'regulator export time' },
    ],
  },
]

const complianceFeatures = [
  'Full audit trail for every automated decision and escalation',
  'Verification workflow logic with built-in confidence thresholds',
  'GDPR-compliant data handling and right-to-erasure support',
  'PCI DSS aligned, no raw card data ever touches our system',
  'All data encrypted end-to-end and protected under a signed NDA — we cannot see your customer records',
]


const benefits = [
  {
    beforeTitle: 'Queues growing every day',
    before: 'Disputes and transaction failures pile up in queues, resolved manually over days.',
    beforeImg: '/benefits/Disputes and transaction failures.png',
    beforeIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" /></svg>,
    title: 'Automated workflows made easy',
    after: 'Resolve disputes and transaction failures in real time, median resolution under 2 minutes, zero manual steps.',
    afterImg: '/benefits/Resolve disputes and transaction.png',
    afterIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  },
  {
    beforeTitle: 'Support team rotates every few months',
    before: 'Agents leave, new ones need onboarding, and quality drops every time someone quits. Constant recruiting, training, and handover costs with no end in sight.',
    beforeImg: '/benefits/Compliance is bolted on after the fact.png',
    beforeIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" /></svg>,
    title: 'Zero turnover. Consistent quality.',
    after: 'supVision never quits, never needs retraining, and delivers the same quality on day 1 and year 3. No offboarding, no knowledge loss, no gap in coverage.',
    afterImg: '/benefits/Built for compliance from day one.png',
    afterIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
  },
  {
    beforeTitle: 'Scaling costs, shrinking margins',
    before: 'Growing support demand means more headcount — salaries, sick days, annual leave, bonuses, and constant retraining with no end in sight.',
    beforeImg: '/benefits/Growing support demand means.png',
    beforeIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>,
    title: 'Reduce costs by up to 80%',
    after: 'No salaries, no sick pay, no vacation cover, no bonuses. Teams using supVision cut support operating costs by up to 80% while maintaining a 98.4% resolution rate.',
    afterImg: '/benefits/Reduce costs, improve quality.png',
    afterIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
  },
  {
    beforeTitle: 'Support stops at 5pm',
    before: 'Customers hit payment failures at midnight and on weekends. Finding agents willing to cover nights, holidays, and time zones is nearly impossible — and expensive.',
    beforeImg: '/hero_images/live-chat-response.png',
    beforeIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
    title: '24/7 AI support, always on',
    after: 'supVision resolves queries around the clock — no shift changes, no sick days, no holidays. Every customer gets an instant response at any hour, in any time zone.',
    afterImg: '/hero_images/ticket-list-resolved.png',
    afterIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>,
  },
  {
    beforeTitle: 'Agents rely on Google Translate',
    before: 'Your support team uses Google Translate to handle foreign-language queries. Mistranslations, awkward phrasing, and miscommunication with partners happen every day.',
    beforeImg: '/hero_images/onboarding-setup.png',
    beforeIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" /></svg>,
    title: 'Native fluency in 50+ languages',
    after: 'supVision responds in the customer\'s language — natively, not translated. No awkward phrasing, no miscommunication. Launch in any region from day one without hiring local agents.',
    afterImg: '/hero_images/analytics-dashboard.png',
    afterIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
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

const S = (d: string | string[], fr = false) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    {(Array.isArray(d) ? d : [d]).map((p, i) =>
      fr ? <path key={i} fillRule="evenodd" d={p} clipRule="evenodd" /> : <path key={i} d={p} />
    )}
  </svg>
)

const industries = [
  {
    name: 'Payments & Processing',
    subtitle: 'Dispute resolution, chargebacks, and transaction queries - automated.',
    img: '/for_whom/Payments & Processing.png',
    to: '/industries/payments-processing',
    bullets: [
      'Automated chargeback and dispute resolution - median response under 2 minutes',
      'Real-time transaction status queries answered without agent involvement',
      'PCI DSS aligned - no raw card data ever touches our system',
    ],
  },
  {
    name: 'Neobanks & Digital Banking',
    subtitle: 'Account support, identity verification, and onboarding - at the scale digital banks demand.',
    img: '/for_whom/Neobanks & Digital Banking.png',
    to: '/industries/neobanks',
    bullets: [
      'Identity verification and onboarding queries resolved autonomously - no queue, no wait',
      '24/7 account and card support without adding headcount',
      'FCA and GDPR compliant from day one - no retrofitting required',
    ],
  },
  {
    name: 'InsurTech',
    subtitle: 'Policy queries, claims status, and coverage questions - handled automatically.',
    img: '/for_whom/InsurTech.png',
    to: '/industries/insurtech',
    bullets: [
      'Claims status updates and policy queries resolved without agent involvement',
      '24/7 policyholder support across every channel',
      'Full audit trail for every AI-generated response - audit-ready by default',
    ],
  },
  {
    name: 'Lending & Credit',
    subtitle: 'Loan status, repayment queries, and credit questions - answered instantly.',
    img: '/for_whom/Lending & Credit.png',
    to: '/industries/lending-credit',
    bullets: [
      'Loan application status updates resolved autonomously',
      'Repayment and credit queries answered in real time without manual review',
      'GDPR aligned - customer data handled with full compliance controls',
    ],
  },
  {
    name: 'Web3',
    subtitle: 'Wallet support, transaction queries, and onboarding - at crypto speed.',
    img: '/for_whom/Web3.png',
    to: '/industries/crypto-web3',
    bullets: [
      'Transaction and wallet queries resolved without manual intervention',
      '24/7 support for onboarding, token transfers, and account access',
      'Built for the pace and scale of Web3 user growth',
    ],
  },
]

const heroIndustries = [
  { label: 'Payments & Processing', icon: S(['M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z', 'M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z']) },
  { label: 'Neobanks', icon: S('M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6ZM20.25 10.332v9.418H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.418a.75.75 0 0 1 0-1.5h15.75a.75.75 0 0 1 0 1.5Zm-4.5 0v5.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-5.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75Zm-8.25-.75a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h1.5a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-.75-.75H7.5Z', true) },
  { label: 'Web3', icon: S('M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.268a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z', true) },
  { label: 'Lending & Credit', icon: S(['M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z', 'M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z', 'M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z']) },
  { label: 'InsurTech', icon: S('M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z', true) },
]

const heroFeatures = [
  { label: 'Confidence Thresholds', desc: 'Set minimum accuracy levels before AI responds', icon: S('M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z') },
  { label: 'Topic Restrictions', desc: 'Define which queries AI handles and which always route to a human', icon: S('M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z', true) },
  { label: 'Escalation Rules', desc: 'Custom handoff logic by query type or risk level', icon: S('M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.941a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.43a11.293 11.293 0 0 0-5.18 4.458.75.75 0 0 1-1.242.044L9.75 13.5l-3.75 3.75a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l2.044 2.044a12.793 12.793 0 0 1 5.595-4.973l1.085-.43-4.251-1.63a.75.75 0 0 1-.432-.968Z', true) },
  { label: 'Response Approval', desc: 'Require human sign-off before sending in high-risk categories', icon: S('M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53-1.954-1.954a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.137-.089l3.833-5.175Z', true) },
  { label: 'Data Access Controls', icon: S('M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z', true) },
  { label: 'Full Audit Trail', icon: S(['M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z', 'M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z'], true) },
  { label: 'AI Decision Logs', icon: S('M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm3.97.97a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Zm4.28 4.28a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z', true) },
  { label: 'Identity & Onboarding', icon: S('M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z', true) },
  { label: 'Dispute Resolution', icon: S('M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z', true) },
  { label: 'Multi-channel', icon: S(['M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z', 'M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z']) },
  { label: 'Log Streaming', icon: S('M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z', true) },
  { label: 'Regulator Exports', icon: S('M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z', true) },
]

const integrationGroups: { label: string; options: { name: string; color: string; letter: string; logoUrl: string }[] }[] = [
  {
    label: 'Helpdesk',
    options: [
      { name: 'Zendesk', color: '#03363D', letter: 'Z', logoUrl: '/logos/zendesk.png' },
      { name: 'Intercom', color: '#1F8FEF', letter: 'I', logoUrl: '/logos/intecom (1).png' },
      { name: 'Freshdesk', color: '#25C16F', letter: 'F', logoUrl: '/logos/freshdesk.png' },
      { name: 'Salesforce Service', color: '#00A1E0', letter: 'S', logoUrl: '/logos/salesforce.png' },
    ],
  },
  {
    label: 'KYC',
    options: [
      { name: 'Sumsub', color: '#FF6B00', letter: 'S', logoUrl: 'https://logo.clearbit.com/sumsub.com' },
      { name: 'Jumio', color: '#0066CC', letter: 'J', logoUrl: 'https://logo.clearbit.com/jumio.com' },
      { name: 'Veriff', color: '#3245FB', letter: 'V', logoUrl: 'https://logo.clearbit.com/veriff.com' },
      { name: 'Onfido', color: '#1A1A2E', letter: 'O', logoUrl: 'https://logo.clearbit.com/onfido.com' },
    ],
  },
  {
    label: 'CRM',
    options: [
      { name: 'HubSpot', color: '#FF7A59', letter: 'H', logoUrl: '/logos/hubspot.png' },
      { name: 'Salesforce CRM', color: '#00A1E0', letter: 'S', logoUrl: '/logos/salesforce.png' },
      { name: 'Pipedrive', color: '#1A1F36', letter: 'P', logoUrl: '/logos/Pipedrive.png' },
      { name: 'Zoho CRM', color: '#E42527', letter: 'Z', logoUrl: '/logos/zoro.png' },
      { name: 'Mambu', color: '#FF3B00', letter: 'M', logoUrl: '/logos/mambu.png' },
    ],
  },
  {
    label: 'Channel',
    options: [
      { name: 'WhatsApp', color: '#25D366', letter: 'W', logoUrl: '/logos/whatsapp.png' },
      { name: 'Telegram', color: '#26A5E4', letter: 'T', logoUrl: '/logos/telegram.png' },
      { name: 'Gmail', color: '#EA4335', letter: '@', logoUrl: '/logos/gmail.png' },
      { name: 'Mail / SMTP', color: '#6B7280', letter: 'M', logoUrl: '/mail.png' },
      { name: 'Outlook', color: '#0078D4', letter: 'O', logoUrl: '/logos/outlook.png' },
      { name: 'Facebook Messenger', color: '#0084FF', letter: 'F', logoUrl: '/logos/facebook messenger.png' },
      { name: 'WeChat', color: '#07C160', letter: 'W', logoUrl: '/logos/wechat.png' },
      { name: 'Line', color: '#00B900', letter: 'L', logoUrl: '/logos/line.png' },
      { name: 'Viber', color: '#7360F2', letter: 'V', logoUrl: '/logos/viber.png' },
      { name: 'Twilio SMS', color: '#F22F46', letter: 'T', logoUrl: '/logos/twillio.png' },
    ],
  },
]

function IntegrationLogo({ logoUrl, color, letter, size }: { logoUrl: string; color: string; letter: string; size: number }) {
  const [err, setErr] = useState(false)
  return err ? (
    <span
      className="flex flex-shrink-0 items-center justify-center rounded-lg text-white font-bold leading-none"
      style={{ backgroundColor: color, width: size, height: size, fontSize: size * 0.4 }}
    >
      {letter}
    </span>
  ) : (
    <img
      src={logoUrl}
      alt=""
      className="flex-shrink-0 rounded-lg object-contain bg-white"
      style={{ width: size, height: size }}
      onError={() => setErr(true)}
    />
  )
}

function IntegrationSelect({ label, options, value, onChange, comingSoon }: {
  label: string
  options: { name: string; color: string; letter: string; logoUrl: string }[]
  value: string | null
  onChange: (name: string | null) => void
  comingSoon?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => { if (comingSoon) setOpen(true) }}
      onMouseLeave={() => { if (comingSoon) setOpen(false) }}
    >
      <button
        onClick={() => { if (!comingSoon) setOpen(v => !v) }}
        className={`flex items-center gap-2 rounded-full border-2 bg-white pl-4 pr-4 py-3 text-sm font-semibold focus:outline-none transition-colors ${comingSoon ? 'cursor-default text-gray-400 border-gray-200' : 'cursor-pointer hover:bg-gray-50 border-gray-900 text-gray-900'}`}
      >
        <span>{label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
          className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''} ${comingSoon ? 'text-gray-300' : 'text-gray-500'}`}>
          <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden rounded-2xl border border-gray-100 bg-white py-2 shadow-xl">
          {comingSoon ? (
            <div className="px-4 py-3 text-sm font-semibold text-gray-400">Coming soon</div>
          ) : (
            options.map(opt => (
              <button
                key={opt.name}
                onClick={() => { onChange(opt.name); setOpen(false) }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 ${value === opt.name ? 'bg-gray-50' : ''}`}
              >
                <IntegrationLogo logoUrl={opt.logoUrl} color={opt.color} letter={opt.letter} size={28} />
                {opt.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

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
