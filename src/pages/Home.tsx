import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const clipRef = useRef<HTMLDivElement>(null)
  const [activeT, setActiveT] = useState(0)
  const [activeWhy, setActiveWhy] = useState(0)

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
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center bg-white">
        {/* Clipping wrapper — shrinks on scroll, clips bg + dashboard */}
        <div ref={clipRef} className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/bg/hero-bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Dashboard — big, absolute, bleeds right */}
          <div
            className="absolute top-1/2 z-10 -translate-y-1/2"
            style={{ left: '52%', width: '62vw' }}
          >
            <div className="relative">
              <img
                src="/example_of_dashboard.png"
                alt="Dashboard preview"
                className="w-full rounded-2xl shadow-2xl ring-1 ring-white/10"
              />
              <img
                src="/2nd scree.png"
                alt="Second screen preview"
                className="absolute rounded-xl shadow-2xl ring-1 ring-white/10"
                style={{ width: '32%', top: '83%', left: '-13%', transform: 'translateY(-50%)' }}
              />
              <img
                src="/bg/Layer_1 (1).png"
                alt=""
                className="absolute"
                style={{ width: '30%', top: '30%', right: '22%' }}
              />
            </div>
          </div>
        </div>

        {/* Left text — stays inside the page container */}
        <div className="relative z-10 w-full max-w-[44rem] px-4 pt-16 sm:px-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-base font-medium text-white backdrop-blur-sm">
            An AI support layer tailored for fintech industries
          </div>

          <h1 className="flex flex-col text-4xl font-light leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="whitespace-nowrap">Create your first</span>
            <span className="whitespace-nowrap font-extrabold">support agent</span>
            <span className="whitespace-nowrap">for your <span className="font-extrabold">fintech</span></span>
            <span className="whitespace-nowrap font-extrabold">company.</span>
          </h1>

          <p className="mt-6 text-sm leading-relaxed text-white sm:text-base">
            Autonomous support agents for KYC queries, disputes, and transaction issues. Say goodbye to overwhelmed support queues and hello to 24/7 AI-powered resolution.
          </p>

          <div className="mt-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 px-3 py-2 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Let's chat
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>

            <p className="mt-4 text-sm font-medium text-white">
              Enterprise-grade security. PCI DSS & GDPR compliant.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <img src="/badge/image.png" alt="Badge" className="h-24 w-auto" />
              <img src="/badge/image 26 (3).png" alt="Badge" className="h-16 w-auto" />
            </div>
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

      {/* Benefits */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">

          {/* Header */}
          <div className="mb-8 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">Benefits</p>
          </div>

          {/* Benefit rows */}
          <div className="flex flex-col gap-4">
            {benefits.map((b) => (
              <div key={b.title} className="relative grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                {/* Before */}
                <div className="flex items-start justify-between gap-4 bg-gray-900 p-6" style={{ minHeight: '200px' }}>
                  <div className="flex-1 flex flex-col">
                    <p className="mb-3 text-base font-bold uppercase tracking-widest text-white">Before</p>
                    <h3 className="text-base font-bold text-white">{b.beforeTitle}</h3>
                    <p className="mt-2 text-base leading-relaxed text-white/70">{b.before}</p>
                  </div>
                  <div className="flex-shrink-0 overflow-hidden rounded-xl" style={{ width: '160px', height: '160px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                    <img
                      src={b.beforeImg}
                      alt="Before"
                      className="h-full w-full object-cover object-top"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  </div>
                </div>
                {/* After */}
                <div className="flex items-start justify-between gap-4 bg-white p-6" style={{ minHeight: '200px' }}>
                  <div className="flex-1 flex flex-col">
                    <p className="mb-3 text-base font-bold uppercase tracking-widest" style={{ color: '#214995' }}>After SupVision</p>
                    <h3 className="text-base font-bold text-gray-900">{b.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-gray-500">{b.after}</p>
                  </div>
                  <div className="flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 shadow-sm" style={{ width: '160px', height: '160px' }}>
                    <img
                      src={b.afterImg}
                      alt={b.title}
                      className="h-full w-full object-cover object-top"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  </div>
                </div>
                {/* Arrow — centered on the dividing line */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full shadow-md" style={{ backgroundColor: '#214995' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                      <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                    </svg>
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
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm" style={{ minHeight: '480px' }}>
            <div className="grid lg:grid-cols-2" style={{ minHeight: '480px' }}>

              {/* Left — text */}
              <div className="flex flex-col p-10 lg:p-14 border-r border-gray-100">
                <p className="text-xs font-black tracking-[0.2em] text-gray-900 uppercase">{testimonials[activeT].company}</p>

                <div className="mt-8 flex-1">
                  <p className="text-5xl font-serif leading-none text-gray-200 select-none">"</p>
                  <p className="mt-2 text-xl leading-relaxed text-gray-800" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
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
                style={{ background: testimonials[activeT].bgGradient, minHeight: '320px' }}
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

      {/* Why supVision */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">

            {/* Left */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Why supVision</p>
              <h2 className="mt-5 text-4xl font-bold leading-snug text-gray-900">
                Why fintech teams choose supVision over generic AI platforms?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-gray-500">
                Most AI support tools are built for SaaS. supVision is built for fintech — with compliance, KYC, and regulated workflows built in from day one.
              </p>

              <div className="mt-10">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Features</p>
                <div className="divide-y divide-gray-200 border-t border-gray-200">
                  {whyItems.map((item, i) => (
                    <div key={item.num}>
                      <button
                        onClick={() => setActiveWhy(i === activeWhy ? -1 : i)}
                        className="flex w-full items-center justify-between py-5 text-left"
                      >
                        <span className={`text-base font-semibold transition-colors ${i === activeWhy ? 'text-gray-900' : 'text-gray-500 hover:text-gray-800'}`}>
                          {item.title}
                        </span>
                        <span className="ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 text-lg leading-none">
                          {i === activeWhy ? '−' : '+'}
                        </span>
                      </button>
                      {i === activeWhy && (
                        <p className="pb-5 text-sm leading-relaxed text-gray-500">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — product image panel */}
            <div
              className="sticky top-28 overflow-hidden rounded-2xl"
              style={{ minHeight: '480px', background: 'linear-gradient(135deg, #ddd8ce 0%, #b8ad99 50%, #9e9080 100%)' }}
            >
              <div className="absolute inset-5 overflow-hidden rounded-xl bg-white shadow-2xl">
                <img
                  src={whyItems[Math.max(0, activeWhy)].img}
                  alt={whyItems[Math.max(0, activeWhy)].title}
                  className="h-full w-full object-cover object-top transition-all duration-500"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Compliance & Security */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-950">
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
                <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center">
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
    a: 'Most teams are live within 3–5 business days. supVision connects to your existing helpdesk, CRM, and core banking APIs, no platform migration required. You configure escalation rules, set confidence thresholds, and go. There is no 6-month implementation project.',
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
    a: 'supVision integrates with the tools your team already uses, Zendesk, Intercom, Salesforce, Freshdesk, and custom CRMs via API. On the back end it connects to your core banking system, KYC provider, and payment processor to resolve queries with real data, not generic responses.',
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

const whyItems = [
  { num: '01', title: 'Fintech-native, not fintech-adapted', description: 'Intercom and Zendesk were built for SaaS and e-commerce. supVision was designed from day one for KYC workflows, transaction disputes, and regulated onboarding, without workarounds.', img: '/hero_images/Component 174 (1).png' },
  { num: '02', title: 'Compliance is the product, not a checkbox', description: 'Every automated action is logged, traceable, and audit-ready. Escalation rules, confidence thresholds, and KYC decision trails built in, not bolted on after the fact.', img: '/benefits/Built for compliance from day one.png' },
  { num: '03', title: 'Predictable cost. No per-ticket traps.', description: "Flat monthly pricing means your support costs don't spike when ticket volume grows. No $0.99-per-resolution surprises. No incentive for your vendor to keep issues open.", img: '/hero_images/Component 175.png' },
  { num: '04', title: 'Live in days, not months', description: 'Works on top of your existing stack, no platform migration, no 6-month implementation project. Connect your tools, set your rules, go live. Your team stays in control.', img: '/hero_images/Component 172.png' },
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
    body: 'No platform migration, no lengthy implementation. SupVision connects to your existing helpdesk, KYC provider, and payment processor in days — then you\'re live.',
    img: '/hero_images/Component 172.png',
    imgAlt: 'Onboarding and integration setup flow',
    robot: false,
    robotOverlay: '/robot/robot_on_hand.png',
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
