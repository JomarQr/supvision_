import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const clipRef = useRef<HTMLDivElement>(null)
  const dashboardPanelRef = useRef<HTMLDivElement>(null)
  const dashboardGlassRef = useRef<HTMLDivElement>(null)
  const [activeT, setActiveT] = useState(0)
  const [activeFeatures, setActiveFeatures] = useState<Record<number, number>>({ 0: 0, 1: 0, 2: 0 })
  const [controlTab, setControlTab] = useState<0 | 1 | 2>(0)
  const [stackFilters, setStackFilters] = useState<Record<string, string | null>>({})
  const [showAllStacks, setShowAllStacks] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveT(i => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!clipRef.current) return
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
      <section data-nav-dark className="relative flex min-h-screen items-start" style={{ backgroundColor: '#faf8f5' }}>
        {/* Clipping wrapper — shrinks on scroll, clips only bg */}
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

        {/* Hero right — main dashboard, вне clipRef, clipPath синхронизирован со скроллом */}
        <div
          ref={dashboardPanelRef}
          className="absolute z-20"
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
          className="relative z-10 flex flex-col self-stretch"
          style={{
            width: '53vw',
            paddingTop: '6rem',
            paddingBottom: '12rem',
            paddingLeft: 'max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))',
          }}
        >
          {/* Text block */}
          <div className="pr-8 mt-12">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-base font-medium text-white backdrop-blur-sm">
              An AI support layer tailored for fintech industries
            </div>

            <h1 className="flex flex-col text-4xl font-light leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="whitespace-nowrap"><span className="font-semibold">Fintech</span> Support</span>
              <span className="whitespace-nowrap">That <span className="font-semibold">Solves,</span></span>
              <span className="whitespace-nowrap">Not Escalates.</span>
            </h1>

            <p className="mt-6 text-sm leading-relaxed text-white max-w-sm">
              Next generation AI support agent. Not the type that people try to bypass to speak to a real person — but a full fledged support that is able to resolve 80% of queries without any human intervention.
            </p>

          </div>

          {/* Industries ticker — plain icon + text, fades at edges */}
          <div
            className="mt-auto overflow-hidden"
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

          <div className="mt-8 pr-8">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/40 pl-6 pr-1.5 py-1.5 text-base font-semibold text-white"
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

        </div>

        {/* Feature blocks — full allowed width, pinned to bottom of hero */}
        <div className="absolute bottom-10 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-4 gap-4">
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
          <p className="mt-5 text-center text-base leading-relaxed text-gray-500 mx-auto max-w-2xl">
            Your agents handle hundreds of repetitive queries daily — KYC checks, payment failures, onboarding questions. SupVision resolves them automatically, so your team focuses on what actually needs them.
          </p>

          {/* Cards — 2 per row */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {valueProps.map((v) => (
              <div
                key={v.headline}
                className="relative flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm"
                style={{ overflow: v.robotOverlay ? 'visible' : 'hidden' }}
              >
                {/* Robot overlay — floats outside card */}
                {v.robotOverlay && (
                  <img
                    src={v.robotOverlay}
                    alt=""
                    className="pointer-events-none absolute z-20"
                    style={v.robotSide === 'right'
                      ? { width: '13rem', right: '-5rem', bottom: '3.5rem' }
                      : { width: '18rem', left: '-10rem', bottom: '8rem' }
                    }
                  />
                )}

                {/* Image area — always clipped */}
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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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

      {/* Integration finder */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl px-10 py-16 text-center" style={{ backgroundColor: '#f0ede8' }}>
            <h2 className="text-3xl font-bold leading-snug text-gray-900 sm:text-4xl mx-auto max-w-2xl">
              Our{' '}
              <span className="inline-flex items-center rounded-xl px-3 py-1 font-bold" style={{ backgroundColor: 'rgba(33,73,149,0.12)', color: '#214995' }}>
                integration finder
              </span>
              {' '}helps you connect the tools you already use to{' '}
              <span className="inline-flex items-center rounded-xl px-3 py-1 font-bold" style={{ backgroundColor: 'rgba(33,73,149,0.2)', color: '#214995' }}>
                automate fintech support
              </span>
            </h2>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {integrationGroups.map(group => (
                <IntegrationSelect
                  key={group.label}
                  label={group.label}
                  options={group.options}
                  value={stackFilters[group.label] ?? null}
                  onChange={(name) => setStackFilters(prev => ({ ...prev, [group.label]: name }))}
                />
              ))}
            </div>

            {/* Suggested stacks */}
            {(() => {
              const active = Object.values(stackFilters).filter(Boolean) as string[]
              const filtered = active.length === 0
                ? automationStacks
                : automationStacks.filter(s => active.every(t => s.tools.includes(t)))
              const LIMIT = 9
              const needsMore = !showAllStacks && filtered.length > LIMIT
              const visible = needsMore ? filtered.slice(0, LIMIT) : filtered
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
                    <div className="grid grid-cols-3 gap-3">
                      {visible.map(stack => (
                        <Link
                          key={stack.label}
                          to="/contact"
                          className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 transition-all hover:border-gray-400 hover:shadow-sm"
                        >
                          <div className="flex items-center -space-x-2 flex-shrink-0">
                            {stack.logos.map((logo, i) => (
                              <StackLogo key={i} {...logo} />
                            ))}
                          </div>
                          <div className="text-left min-w-0">
                            <p className="text-xs font-bold text-gray-900 leading-snug">{stack.label}</p>
                            <p className="text-xs text-gray-400 leading-snug">{stack.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {(needsMore || (showAllStacks && filtered.length > LIMIT)) && (
                      <div className="mt-3 flex justify-center">
                        {needsMore ? (
                          <button onClick={() => setShowAllStacks(true)} className="text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors">
                            +{filtered.length - LIMIT} more ↓
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

            <div className="mt-10 flex justify-center">
              <Link
                to="/integrations"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gray-300 bg-white pl-6 pr-1.5 py-1.5 text-sm font-semibold"
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

          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">Benefits</p>
          </div>

          {/* Stacked sticky cards */}
          <div className="flex flex-col gap-4">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="sticky"
                style={{ top: `${108 + i * 40}px`, zIndex: i + 1 }}
              >
                <div className="relative grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-100 shadow-lg">
                  {/* Before */}
                  <div className="flex items-start justify-between gap-4 bg-gray-900 p-6" style={{ minHeight: '220px' }}>
                    <div className="flex-1 flex flex-col">
                      <p className="mb-3 text-base font-bold uppercase tracking-widest text-white">Before</p>
                      <h3 className="text-base font-bold text-white">{b.beforeTitle}</h3>
                      <p className="mt-2 text-base leading-relaxed text-white/70">{b.before}</p>
                    </div>
                    <div className="flex-shrink-0 overflow-hidden rounded-xl" style={{ width: '160px', height: '160px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                      <img src={b.beforeImg} alt="Before" className="h-full w-full object-cover object-top" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    </div>
                  </div>
                  {/* After */}
                  <div className="flex items-start justify-between gap-4 bg-white p-6" style={{ minHeight: '220px' }}>
                    <div className="flex-1 flex flex-col">
                      <p className="mb-3 text-base font-bold uppercase tracking-widest" style={{ color: '#214995' }}>After SupVision</p>
                      <h3 className="text-base font-bold text-gray-900">{b.title}</h3>
                      <p className="mt-2 text-base leading-relaxed text-gray-500">{b.after}</p>
                    </div>
                    <div className="flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 shadow-sm" style={{ width: '160px', height: '160px' }}>
                      <img src={b.afterImg} alt={b.title} className="h-full w-full object-cover object-top" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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

      {/* Proof */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">Proof</p>
            <p className="mt-3 text-base text-gray-500">Companies that moved from overwhelmed to automated.</p>
          </div>

          {/* Card */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm" style={{ height: '520px' }}>
            <div className="grid lg:grid-cols-2 h-full">

              {/* Left — text */}
              <div className="flex flex-col p-8 lg:p-10 border-r border-gray-100 overflow-hidden">
                <p className="text-xs font-black tracking-[0.2em] text-gray-900 uppercase">{testimonials[activeT].company}</p>

                <div className="mt-8 flex-1">
                  <p className="text-5xl font-serif leading-none text-gray-200 select-none">"</p>
                  <p className="mt-2 text-base leading-relaxed text-gray-800" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                    {testimonials[activeT].quote}
                  </p>
                </div>

                <p className="mt-8 text-sm text-gray-400">— {testimonials[activeT].name}, {testimonials[activeT].role}</p>

                <div className="mt-6 border-t border-gray-100 pt-6 flex gap-10">
                  {testimonials[activeT].metrics.map(m => (
                    <div key={m.label}>
                      <p className="text-3xl font-black" style={{ color: '#214995' }}>{m.value}</p>
                      <p className="mt-1 text-xs leading-snug text-gray-500">{m.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-gray-100 pt-6">
                  <button className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                      </svg>
                    </span>
                    Read full story
                  </button>
                </div>
              </div>

              {/* Right — branded image */}
              <div
                className="relative flex items-center justify-center"
                style={{ background: testimonials[activeT].bgGradient }}
              >
                <p
                  className="text-5xl font-black tracking-[0.15em] text-white select-none"
                  style={{ opacity: 0.9 }}
                >
                  {testimonials[activeT].company}
                </p>
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
          <div className="rounded-3xl bg-gray-950 px-10 py-16 lg:px-16">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            {/* Left — text */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#4a72c4' }}>Our story</p>
              <h2 className="mt-5 text-4xl font-bold leading-snug text-white sm:text-5xl">
                Built by people who lived the problem.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-400">
                supVision was not built by engineers who read about fintech. It was built by operators who spent over a decade inside financial services — running support teams, managing KYC queues, handling regulator audits, and watching knowledge walk out the door every time an agent left.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-400">
                We tried every generic AI tool on the market. None of them understood what a chargeback workflow looks like. None of them knew the difference between a payment pending and a payment failed. None of them were built for PSD2 or FCA compliance from day one.
              </p>
              <p className="mt-4 text-base font-semibold text-white">
                So we built what we needed — and opened it up to the industry.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
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

              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
                {[
                  { value: '10+', label: 'Years inside fintech operations' },
                  { value: '3 days', label: 'Average time to go live' },
                  { value: '80%', label: 'Tier-1 tickets resolved automatically' },
                ].map(m => (
                  <div key={m.label}>
                    <p className="text-3xl font-black text-white">{m.value}</p>
                    <p className="mt-1 text-xs leading-snug text-gray-500">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image */}
            <div className="overflow-hidden rounded-2xl" style={{ minHeight: '520px' }}>
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

      {/* Feature deep-dive header */}
      <section className="pt-24 pb-4 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Why supVision</p>
          <h2 className="mt-5 text-3xl leading-snug text-gray-900 sm:text-4xl font-normal mx-auto max-w-3xl">
            Why fintech teams choose <span className="font-bold">supVision</span> over <span className="font-bold">generic AI platforms?</span>
          </h2>
          <p className="mt-4 text-base text-gray-500">Built for regulated financial services from day one — not retrofitted from a SaaS tool.</p>
        </div>
      </section>

      {/* Control + Visibility — tabbed */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">

          {/* Tab switcher */}
          <div className="mb-12 flex gap-2">
            {([0, 1, 2] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setControlTab(tab)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${controlTab === tab ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {featureSections[tab].label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-8">

            {/* Image — right */}
            <div className="order-last overflow-hidden rounded-2xl lg:w-[60%]" style={{ minHeight: '480px' }}>
              <img
                key={`${controlTab}-${activeFeatures[controlTab]}`}
                src={featureSections[controlTab].features[activeFeatures[controlTab]]?.img ?? featureSections[controlTab].img}
                alt={featureSections[controlTab].features[activeFeatures[controlTab]]?.title}
                className="h-full w-full object-cover object-top"
                style={{ minHeight: '480px' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>

            {/* Text + accordion */}
            <div className="lg:w-[40%] lg:flex-shrink-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">{featureSections[controlTab].label}</p>
              <h2 className="mt-5 text-3xl font-bold leading-snug text-gray-900">{featureSections[controlTab].title}</h2>
              <p className="mt-5 text-sm leading-relaxed text-gray-500">{featureSections[controlTab].description}</p>

              <div className="mt-8">
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
                        <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{f.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Compliance & Security */}
      <section data-nav-dark className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">

            {/* Left */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#4a72c4' }}>Compliance & Security</p>
              <h2 className="mt-5 text-3xl font-bold leading-snug text-white sm:text-4xl">
                Your compliance team will love us as much as your support team does.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-400">
                Audit logs, escalation rules, traceable decisions — every action taken by supVision is logged, signed, and audit-ready out of the box. Built for regulated financial services from day one.
              </p>
              <ul className="mt-10 space-y-5">
                {complianceFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-white">
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-base leading-relaxed text-gray-300">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — badges */}
            <div className="flex flex-col items-center gap-8 rounded-2xl border border-white/10 bg-white/5 p-12">
              <p className="text-sm font-bold uppercase tracking-widest text-white">Certified & Compliant</p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                <img src="/badge/image.png" alt="PCI DSS Compliant" className="h-36 w-auto" />
                <img src="/badge/image 26 (3).png" alt="GDPR Compliant" className="h-28 w-auto" />
              </div>
              <p className="text-center text-sm leading-relaxed text-gray-400">
                Enterprise-grade security with end-to-end encryption, SOC 2-aligned infrastructure, and full GDPR & PCI DSS compliance built into every interaction.
              </p>
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/10 pl-5 pr-1.5 py-1.5 text-sm font-semibold text-white"
              >
                <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]" style={{ backgroundColor: '#214995' }} />
                <span className="relative z-10 transition-colors duration-300">Request certificate confirmation</span>
                <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
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
    a: 'supVision is built for the full spectrum of fintech support: KYC verification questions, transaction disputes, payment failures, account onboarding, card and limit queries, and regulatory information requests. If it\'s a repeatable support case in a financial services context, supVision can resolve it autonomously.',
  },
  {
    q: 'How long does it take to go live?',
    a: 'Most teams are live within 3–5 business days. supVision connects to your existing helpdesk, CRM, and KYC providers — no platform migration required. You configure escalation rules, set confidence thresholds, and go. There is no 6-month implementation project.',
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
    a: 'supVision integrates with the tools your team already uses — Zendesk, Intercom, Salesforce, Freshdesk, and custom CRMs. It also connects to your KYC provider and knowledge base to resolve queries with real data and your own internal policies, not generic responses.',
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
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
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
            <FAQItem
              key={i}
              item={item}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
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
    description: 'supVision goes beyond automate-or-escalate. Set confidence thresholds, restrict topics, and require human approval for sensitive actions — on your terms.',
    img: '/control/Confidence Thresholds.png',
    bgGradient: 'linear-gradient(135deg, #ddd8ce 0%, #b8ad99 50%, #9e9080 100%)',
    features: [
      { title: 'Confidence Thresholds', description: 'Set per-topic confidence levels so supVision only automates when it is certain enough. Below threshold, it escalates with full context attached.', img: '/control/Confidence Thresholds.png' },
      { title: 'Topic Restrictions', description: 'Define exactly which query types are handled by AI and which always route to a human agent — KYC rejections, disputes, high-value account changes.', img: '/control/Topic Restrictions.png' },
      { title: 'Escalation Rules', description: 'Build custom escalation logic based on query type, customer tier, account status, or regulatory category. Every rule is logged and auditable.', img: '/control/Escalation Rules.png' },
      { title: 'Response Approval', description: 'Require human sign-off before supVision sends responses in high-risk categories, keeping your team in control without slowing down routine queries.', img: '/control/Response Approval.png' },
      { title: 'Data Access Controls', description: 'Control exactly which systems and data fields supVision can access per query type, so sensitive data is never exposed beyond its intended scope.', img: '/control/Data Access Controls.png' },
    ],
  },
  {
    label: 'Integration',
    title: 'Connects to your existing stack in days',
    description: 'supVision runs on top of what you already use — no platform migration, no rip-and-replace. Connect your helpdesk, KYC provider, CRM, and knowledge base, and go live in 3 to 5 business days.',
    img: '/hero_images/Component 172.png',
    bgGradient: 'linear-gradient(135deg, #c8d8e8 0%, #8aaac8 50%, #607890 100%)',
    features: [
      { title: 'Helpdesk Connectors', description: 'Native integrations with Zendesk, Intercom, Freshdesk, and Salesforce Service Cloud — supVision works inside your existing ticket workflow, not alongside it.' },
      { title: 'KYC Providers', description: 'Pull live verification status, document rejection reasons, and risk flags in real time from Sumsub, Jumio, Veriff, and Onfido — before every response.' },
      { title: 'Knowledge Base', description: 'Index your Confluence spaces, Notion pages, or Guru cards so the agent answers using your own internal policies and procedures — not generic responses.' },
      { title: 'Messaging Channels', description: 'Deploy across WhatsApp, Telegram, email, and live chat simultaneously — one supVision instance, every channel your customers use.' },
      { title: 'Webhook & API', description: 'Integrate with any internal tool via REST API or webhooks. If it has an API, supVision can query it before responding to a customer.' },
    ],
  },
  {
    label: 'Visibility',
    title: 'Full insight into every automated action',
    description: 'Every AI decision is logged, every escalation is documented, and every response is traceable — so you always know what happened, why it happened, and who was responsible.',
    img: '/hero_images/Component 175.png',
    bgGradient: 'linear-gradient(135deg, #d8e0d0 0%, #a0b890 50%, #708060 100%)',
    features: [
      { title: 'Full Audit Trail', description: 'Every automated decision is logged with timestamp, confidence score, data sources queried, and the full conversation context — regulator-ready out of the box.', img: '/visibility/Full Audit Trail.png' },
      { title: 'AI Decision Logs', description: 'See exactly why supVision chose to resolve or escalate each query, with the full reasoning chain exposed for compliance review or agent training.', img: '/visibility/AI Decision Logs.png' },
      { title: 'Log Streaming', description: 'Send real-time workflow data to tools like Datadog or Splunk for centralized monitoring, alerting, and integration with your existing security stack.', img: '/visibility/Log Streaming.png' },
      { title: 'Regulator Exports', description: 'Generate audit-ready reports for FCA, PSD2, or internal compliance reviews in minutes — structured, signed, and ready to share without manual extraction.', img: '/visibility/Regulator Exports.png' },
    ],
  },
]

const testimonials: {
  name: string
  role: string
  company: string
  bgGradient: string
  quote: string
  metrics: { value: string; label: string }[]
}[] = [
  {
    name: 'Dmytriy K.',
    role: 'Head of Customer Support',
    company: 'NEOBANK',
    bgGradient: 'linear-gradient(135deg, #0f2a5e 0%, #214995 60%, #4a72c4 100%)',
    quote: "We used to hire new people every time we expanded to a new geography. Now we automatically serve all regions — Europe, the US, Asia, the Middle East — without adding a single agent. The setup took three days.",
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
    quote: "We cut support headcount by 30% while handling 3× the ticket volume. The agents that stayed are focused on real escalations, not copy-pasting the same KYC answers all day. ROI showed up faster than any tool we've ever deployed.",
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
    quote: "We went from a 4-hour average resolution time to under 2 minutes for KYC queries. Ops costs dropped and CSAT went up at the same time. SupVision made the whole support flow predictable and auditable.",
    metrics: [
      { value: '< 2 min', label: 'avg KYC resolution time' },
      { value: '1 month', label: 'to measurable ROI' },
    ],
  },
  {
    name: 'Cyril B.',
    role: 'Compliance Lead',
    company: 'LENDCORE',
    bgGradient: 'linear-gradient(135deg, #1a0a2e 0%, #3d1a6b 60%, #6b38b8 100%)',
    quote: "Our compliance team was skeptical about automating disputes. But SupVision handles edge cases better than we expected, and logs every decision with a full rationale and timestamp. When our auditors asked for a trail, we exported it in minutes.",
    metrics: [
      { value: '100%', label: 'automated decision audit coverage' },
      { value: '< 5 min', label: 'regulator export time' },
    ],
  },
]

const complianceFeatures = [
  'Full audit trail for every automated decision and escalation',
  'KYC workflow logic with built-in confidence thresholds',
  'GDPR-compliant data handling and right-to-erasure support',
  'PCI DSS aligned, no raw card data ever touches our system',
  'Role-based access control and SOC 2-aligned infrastructure',
]


const benefits = [
  {
    beforeTitle: 'Queues growing every day',
    before: 'Disputes and transaction failures pile up in queues, resolved manually over days.',
    beforeImg: '/benefits/Disputes and transaction failures.png',
    title: 'Automated workflows made easy',
    after: 'Resolve disputes and transaction failures in real time, median resolution under 2 minutes, zero manual steps.',
    afterImg: '/benefits/Resolve disputes and transaction.png',
  },
  {
    beforeTitle: 'Compliance as an afterthought',
    before: 'Compliance is bolted on after the fact, costly audits, missed escalations, fragile KYC flows.',
    beforeImg: '/benefits/Compliance is bolted on after the fact.png',
    title: 'Tailored to a regulated industry',
    after: 'Built for compliance from day one: audit logs, escalation rules, and KYC workflows that meet financial regulations out of the box.',
    afterImg: '/benefits/Built for compliance from day one.png',
  },
  {
    beforeTitle: 'Scaling costs, shrinking margins',
    before: 'Growing support demand means growing headcount and costs with no end in sight.',
    beforeImg: '/benefits/Growing support demand means.png',
    title: 'Reduce costs, improve quality',
    after: 'Teams using SupVision report 52% lower support costs and 98.4% resolution rate, tracked in real time on your dashboard.',
    afterImg: '/benefits/Reduce costs, improve quality.png',
  },
  {
    beforeTitle: 'Support stops at 5pm',
    before: 'Customers hit payment failures and KYC blocks at midnight, on weekends, across time zones — with no one available to help.',
    beforeImg: '/hero_images/live-chat-response.png',
    title: '24/7 AI support, always on',
    after: 'supVision resolves queries around the clock with no shift changes, no SLA gaps, and no human fatigue. Every customer gets an instant response.',
    afterImg: '/hero_images/ticket-list-resolved.png',
  },
  {
    beforeTitle: 'Every new market means more staff',
    before: 'Expanding to a new region requires hiring and training local support agents — slowing down every market entry.',
    beforeImg: '/hero_images/onboarding-setup.png',
    title: 'Go global without scaling headcount',
    after: 'supVision supports 50+ languages out of the box. Launch in a new market and your support function scales automatically, from day one.',
    afterImg: '/hero_images/analytics-dashboard.png',
  },
]

const valueProps = [
  {
    stat: '64%',
    headline: 'Cut support costs. Without hiring more agents.',
    body: 'SupVision deploys AI agents that resolve KYC queries, disputes, and transaction issues in seconds, at the scale your fintech demands.',
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
    body: 'No platform migration, no lengthy implementation. SupVision connects to your existing helpdesk, KYC provider, and CRM in days — then you\'re live.',
    img: '/hero_images/Component 172.png',
    imgAlt: 'Onboarding and integration setup flow',
    robot: false,
    robotSide: 'left' as const,
  },
  {
    stat: '80%',
    headline: 'Tier-1 tickets resolved. No human required.',
    body: 'KYC status checks, payment failures, onboarding questions — SupVision closes them automatically. Your agents focus only on the cases that genuinely need them.',
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

const heroIndustries = [
  { label: 'Payments & Processing', icon: S(['M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z', 'M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z']) },
  { label: 'Neobanks', icon: S('M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6ZM20.25 10.332v9.418H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.418a.75.75 0 0 1 0-1.5h15.75a.75.75 0 0 1 0 1.5Zm-4.5 0v5.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-5.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75Zm-8.25-.75a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h1.5a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-.75-.75H7.5Z', true) },
  { label: 'Crypto & Web3', icon: S('M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.268a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z', true) },
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
  { label: 'KYC & Onboarding', icon: S('M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z', true) },
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
      { name: 'Salesforce', color: '#00A1E0', letter: 'S', logoUrl: '/logos/salesforce.png' },
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
      { name: 'Salesforce', color: '#00A1E0', letter: 'S', logoUrl: '/logos/salesforce.png' },
      { name: 'Pipedrive', color: '#1A1F36', letter: 'P', logoUrl: '/logos/Pipedrive.png' },
      { name: 'Zoho CRM', color: '#E42527', letter: 'Z', logoUrl: '/logos/zoro.png' },
    ],
  },
  {
    label: 'Channel',
    options: [
      { name: 'WhatsApp', color: '#25D366', letter: 'W', logoUrl: '/logos/whatsapp.png' },
      { name: 'Telegram', color: '#26A5E4', letter: 'T', logoUrl: '/logos/telegram.png' },
      { name: 'Email', color: '#EA4335', letter: '@', logoUrl: '/logos/gmail.png' },
      { name: 'Live Chat', color: '#7C3AED', letter: 'LC', logoUrl: '/logos/intecom (1).png' },
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

function IntegrationSelect({ label, options, value, onChange }: {
  label: string
  options: { name: string; color: string; letter: string; logoUrl: string }[]
  value: string | null
  onChange: (name: string | null) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = value ? options.find(o => o.name === value) ?? null : null

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-2 rounded-full border-2 bg-white pl-4 pr-4 py-3 text-sm font-semibold cursor-pointer focus:outline-none transition-colors hover:bg-gray-50 ${selected ? 'border-gray-900 text-gray-900' : 'border-gray-900 text-gray-900'}`}
      >
        {selected && <IntegrationLogo logoUrl={selected.logoUrl} color={selected.color} letter={selected.letter} size={20} />}
        <span>{selected ? selected.name : label}</span>
        {selected ? (
          <span
            onClick={(e) => { e.stopPropagation(); onChange(null) }}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 text-xs leading-none"
          >×</span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden rounded-2xl border border-gray-100 bg-white py-2 shadow-xl">
          {options.map(opt => (
            <button
              key={opt.name}
              onClick={() => { onChange(opt.name); setOpen(false) }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 ${value === opt.name ? 'bg-gray-50' : ''}`}
            >
              <IntegrationLogo logoUrl={opt.logoUrl} color={opt.color} letter={opt.letter} size={28} />
              {opt.name}
            </button>
          ))}
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
    label: 'KYC onboarding automation',
    desc: 'Zendesk · Sumsub · Slack',
    tools: ['Zendesk', 'Sumsub'],
    logos: [
      { logoUrl: '/logos/zendesk.png', color: '#03363D', letter: 'Z' },
      { logoUrl: 'https://logo.clearbit.com/sumsub.com', color: '#FF6B00', letter: 'S' },
      { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' },
    ],
  },
  {
    label: 'Dispute escalation flow',
    desc: 'Intercom · Onfido · Jira',
    tools: ['Intercom', 'Onfido'],
    logos: [
      { logoUrl: '/logos/intecom (1).png', color: '#1F8FEF', letter: 'I' },
      { logoUrl: 'https://logo.clearbit.com/onfido.com', color: '#1A1A2E', letter: 'O' },
      { logoUrl: '/logos/jira.png', color: '#0052CC', letter: 'J' },
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
    desc: 'Salesforce · Veriff · Slack',
    tools: ['Salesforce', 'Veriff'],
    logos: [
      { logoUrl: '/logos/salesforce.png', color: '#00A1E0', letter: 'S' },
      { logoUrl: 'https://logo.clearbit.com/veriff.com', color: '#3245FB', letter: 'V' },
      { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' },
    ],
  },
  {
    label: 'WhatsApp KYC support',
    desc: 'WhatsApp · Jumio · HubSpot',
    tools: ['WhatsApp', 'Jumio'],
    logos: [
      { logoUrl: '/logos/whatsapp.png', color: '#25D366', letter: 'W' },
      { logoUrl: 'https://logo.clearbit.com/jumio.com', color: '#0066CC', letter: 'J' },
      { logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' },
    ],
  },
  {
    label: 'Telegram verification bot',
    desc: 'Telegram · Sumsub · Pipedrive',
    tools: ['Telegram', 'Sumsub'],
    logos: [
      { logoUrl: '/logos/telegram.png', color: '#26A5E4', letter: 'T' },
      { logoUrl: 'https://logo.clearbit.com/sumsub.com', color: '#FF6B00', letter: 'S' },
      { logoUrl: '/logos/Pipedrive.png', color: '#1A1F36', letter: 'P' },
    ],
  },
  {
    label: 'Email triage & routing',
    desc: 'Email · Onfido · Confluence',
    tools: ['Email', 'Onfido'],
    logos: [
      { logoUrl: '/logos/gmail.png', color: '#EA4335', letter: '@' },
      { logoUrl: 'https://logo.clearbit.com/onfido.com', color: '#1A1A2E', letter: 'O' },
      { logoUrl: '/logos/confluence.png', color: '#0052CC', letter: 'C' },
    ],
  },
  {
    label: 'HubSpot onboarding flow',
    desc: 'HubSpot · Veriff · Intercom',
    tools: ['HubSpot', 'Veriff', 'Intercom'],
    logos: [
      { logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' },
      { logoUrl: 'https://logo.clearbit.com/veriff.com', color: '#3245FB', letter: 'V' },
      { logoUrl: '/logos/intecom (1).png', color: '#1F8FEF', letter: 'I' },
    ],
  },
  {
    label: 'Zendesk + identity check',
    desc: 'Zendesk · Veriff · Slack',
    tools: ['Zendesk', 'Veriff'],
    logos: [
      { logoUrl: '/logos/zendesk.png', color: '#03363D', letter: 'Z' },
      { logoUrl: 'https://logo.clearbit.com/veriff.com', color: '#3245FB', letter: 'V' },
      { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' },
    ],
  },
  {
    label: 'Intercom + Sumsub combo',
    desc: 'Intercom · Sumsub · HubSpot',
    tools: ['Intercom', 'Sumsub'],
    logos: [
      { logoUrl: '/logos/intecom (1).png', color: '#1F8FEF', letter: 'I' },
      { logoUrl: 'https://logo.clearbit.com/sumsub.com', color: '#FF6B00', letter: 'S' },
      { logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' },
    ],
  },
  {
    label: 'WhatsApp sales support',
    desc: 'WhatsApp · Salesforce · Veriff',
    tools: ['WhatsApp', 'Salesforce'],
    logos: [
      { logoUrl: '/logos/whatsapp.png', color: '#25D366', letter: 'W' },
      { logoUrl: '/logos/salesforce.png', color: '#00A1E0', letter: 'S' },
      { logoUrl: 'https://logo.clearbit.com/veriff.com', color: '#3245FB', letter: 'V' },
    ],
  },
  {
    label: 'Freshdesk + KYC queue',
    desc: 'Freshdesk · Jumio · Linear',
    tools: ['Freshdesk', 'Jumio'],
    logos: [
      { logoUrl: '/logos/freshdesk.png', color: '#25C16F', letter: 'F' },
      { logoUrl: 'https://logo.clearbit.com/jumio.com', color: '#0066CC', letter: 'J' },
      { logoUrl: '/logos/linear.png', color: '#5E6AD2', letter: 'L' },
    ],
  },
  {
    label: 'Telegram CRM integration',
    desc: 'Telegram · HubSpot · Sumsub',
    tools: ['Telegram', 'HubSpot'],
    logos: [
      { logoUrl: '/logos/telegram.png', color: '#26A5E4', letter: 'T' },
      { logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' },
      { logoUrl: 'https://logo.clearbit.com/sumsub.com', color: '#FF6B00', letter: 'S' },
    ],
  },
  {
    label: 'Zoho + WhatsApp onboarding',
    desc: 'Zoho CRM · WhatsApp · Onfido',
    tools: ['Zoho CRM', 'WhatsApp'],
    logos: [
      { logoUrl: '/logos/zoro.png', color: '#E42527', letter: 'Z' },
      { logoUrl: '/logos/whatsapp.png', color: '#25D366', letter: 'W' },
      { logoUrl: 'https://logo.clearbit.com/onfido.com', color: '#1A1A2E', letter: 'O' },
    ],
  },
  {
    label: 'Email + Salesforce pipeline',
    desc: 'Email · Salesforce · Jumio',
    tools: ['Email', 'Salesforce'],
    logos: [
      { logoUrl: '/logos/gmail.png', color: '#EA4335', letter: '@' },
      { logoUrl: '/logos/salesforce.png', color: '#00A1E0', letter: 'S' },
      { logoUrl: 'https://logo.clearbit.com/jumio.com', color: '#0066CC', letter: 'J' },
    ],
  },
  {
    label: 'Live chat verification',
    desc: 'Live Chat · Sumsub · Pipedrive',
    tools: ['Live Chat', 'Sumsub'],
    logos: [
      { logoUrl: '/logos/intecom (1).png', color: '#7C3AED', letter: 'LC' },
      { logoUrl: 'https://logo.clearbit.com/sumsub.com', color: '#FF6B00', letter: 'S' },
      { logoUrl: '/logos/Pipedrive.png', color: '#1A1F36', letter: 'P' },
    ],
  },
  {
    label: 'Intercom + Veriff onboarding',
    desc: 'Intercom · Veriff · Notion',
    tools: ['Intercom', 'Veriff'],
    logos: [
      { logoUrl: '/logos/intecom (1).png', color: '#1F8FEF', letter: 'I' },
      { logoUrl: 'https://logo.clearbit.com/veriff.com', color: '#3245FB', letter: 'V' },
      { logoUrl: '/logos/notion.png', color: '#000', letter: 'N' },
    ],
  },
  {
    label: 'Zendesk + Jumio queue',
    desc: 'Zendesk · Jumio · Teams',
    tools: ['Zendesk', 'Jumio'],
    logos: [
      { logoUrl: '/logos/zendesk.png', color: '#03363D', letter: 'Z' },
      { logoUrl: 'https://logo.clearbit.com/jumio.com', color: '#0066CC', letter: 'J' },
      { logoUrl: '/logos/teams.png', color: '#6264A7', letter: 'T' },
    ],
  },
  {
    label: 'Pipedrive deal support',
    desc: 'Pipedrive · Onfido · Telegram',
    tools: ['Pipedrive', 'Onfido'],
    logos: [
      { logoUrl: '/logos/Pipedrive.png', color: '#1A1F36', letter: 'P' },
      { logoUrl: 'https://logo.clearbit.com/onfido.com', color: '#1A1A2E', letter: 'O' },
      { logoUrl: '/logos/telegram.png', color: '#26A5E4', letter: 'T' },
    ],
  },
  {
    label: 'Freshdesk enterprise stack',
    desc: 'Freshdesk · Salesforce · Veriff',
    tools: ['Freshdesk', 'Salesforce'],
    logos: [
      { logoUrl: '/logos/freshdesk.png', color: '#25C16F', letter: 'F' },
      { logoUrl: '/logos/salesforce.png', color: '#00A1E0', letter: 'S' },
      { logoUrl: 'https://logo.clearbit.com/veriff.com', color: '#3245FB', letter: 'V' },
    ],
  },
  {
    label: 'WhatsApp + Pipedrive flow',
    desc: 'WhatsApp · Pipedrive · Sumsub',
    tools: ['WhatsApp', 'Pipedrive'],
    logos: [
      { logoUrl: '/logos/whatsapp.png', color: '#25D366', letter: 'W' },
      { logoUrl: '/logos/Pipedrive.png', color: '#1A1F36', letter: 'P' },
      { logoUrl: 'https://logo.clearbit.com/sumsub.com', color: '#FF6B00', letter: 'S' },
    ],
  },
]
