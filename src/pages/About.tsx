import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'

const timeline = [
  {
    year: '2013',
    title: 'A decade inside fintech',
    desc: 'We started our careers inside financial services - payments, neobanking, lending. We ran operations teams, built compliance processes, and sat on both sides of customer support.',
    img: '/hero_images/Component 172.png',
  },
  {
    year: '2017',
    title: 'The support problem becomes personal',
    desc: 'Scaling a fintech operation meant one constant: the support queue never shrank. Every new product, every new market, every new regulation brought a new wave of tickets. We hired, trained, hired again.',
    img: '/hero_images/live-chat-response.png',
  },
  {
    year: '2020',
    title: 'The rotation problem',
    desc: 'Agent turnover in fintech support is brutal. You train someone for 8 weeks, they handle live verification and dispute queries for 6 months, then they leave. The knowledge walks out with them. You start again.',
    img: '/hero_images/analytics-dashboard.png',
  },
  {
    year: '2022',
    title: 'We looked for a solution. It did not exist.',
    desc: 'Generic helpdesk AI was built for SaaS. It could not handle verification rejection queries, it did not know what a chargeback workflow looked like, and it had no concept of FCA or PSD2 compliance. We kept patching a broken system.',
    img: '/hero_images/ticket-list-resolved.png',
  },
  {
    year: '2023',
    title: 'We built what we needed',
    desc: 'supVision was built by fintech operators for fintech operators. Not a chatbot with a compliance badge - a purpose-built AI support layer that understands regulated financial services from the inside.',
    img: '/hero_images/onboarding-setup.png',
  },
]

const values = [
  {
    title: 'Transparency',
    desc: 'Transparency creates alignment and trust. We share context, communicate decisions clearly, and speak openly about both challenges and progress. Nothing important is hidden or softened. Open dialogue, questions, and honest feedback help everyone understand not only actions, but intent.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>,
  },
  {
    title: 'Flexibility',
    desc: 'Adapting quickly to change matters. We work without rigid templates, adjust approaches as reality shifts, and respect individual circumstances. Experimentation is encouraged, as well as rethinking plans when it leads to a better outcome - for the team, customers, and the business.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>,
  },
  {
    title: 'Innovation',
    desc: 'A way of thinking that shapes how we work. We question how things are done, seek simpler and more effective solutions, and stay open to new approaches. Ideas are tested in real work, while curiosity and the courage to think differently drive improvements in processes and products.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>,
  },
  {
    title: 'Results-orientedness',
    desc: 'Results give work meaning. We focus on impact, not activity - understanding how everyday efforts improve products, processes, and customer experience. Ownership and follow-through matter. Success is measured by real outcomes and value created, not by effort alone.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
  },
]

export default function About() {
  const storyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dotFillRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineFillRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = storyRef.current
    const track = trackRef.current
    if (!section || !track) return

    const updateHeight = () => {
      const extra = Math.max(0, track.scrollWidth - window.innerWidth)
      section.style.height = `calc(100vh + ${extra * 0.65}px)`
    }

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
      const maxX = track.scrollWidth - window.innerWidth
      track.style.transform = `translateX(-${progress * maxX}px)`

      const seg = progress * (timeline.length - 1)
      dotFillRefs.current.forEach((el, i) => {
        if (!el) return
        const fill = Math.min(1, Math.max(0, seg - i + 0.4))
        el.style.transform = `scale(${fill})`
      })
      lineFillRefs.current.forEach((el, i) => {
        if (!el) return
        const fill = Math.min(1, Math.max(0, seg - i))
        el.style.width = `${fill * 100}%`
      })
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('resize', updateHeight)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="pt-24">

      {/* Hero */}
      <section className="px-4 pt-8 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            What is supVision?
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-600 mx-auto max-w-2xl">
            supVision is a purpose-built AI support layer for fintech - not a generic helpdesk tool with a compliance badge. It handles KYC queries, disputes, and payment failures, enforces your policy on every interaction, logs everything for audit, goes live in 3 days, and scales across markets without adding headcount. Built by operators who spent a decade living the problem.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full pl-6 pr-1.5 py-1.5 text-sm font-semibold text-white"
              style={{ backgroundColor: '#101827' }}
            >
              <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/20 transition-transform duration-500 ease-in-out group-hover:scale-[20]" />
              <span className="relative z-10">Get a consultation</span>
              <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-5xl px-6">
          <div className="overflow-hidden rounded-3xl" style={{ maxHeight: '520px' }}>
            <img src="/team.png" alt="supVision team" className="w-full object-cover" style={{ height: '520px', objectPosition: 'center 60%' }} />
          </div>
        </div>
      </section>

      {/* Story - horizontal pin scroll */}
      <div ref={storyRef} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: '#faf8f5' }}>
          {/* Header - centered */}
          <div className="pt-16 pb-10 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">Our story</p>
            <p className="mt-1 text-base text-gray-500">Ten years in fintech before we wrote a line of supVision code.</p>
          </div>

          {/* Horizontal track - first card starts at screen center */}
          <div
            ref={trackRef}
            className="flex gap-6 pr-32 will-change-transform"
            style={{ width: 'max-content', paddingLeft: 'calc(50vw - 200px)' }}
          >
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className="flex-shrink-0 w-[400px] overflow-hidden rounded-3xl bg-white shadow-md border border-gray-100"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-4 left-5 text-3xl font-black text-white/90">{item.year}</span>
                  <span
                    className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: '#214995' }}
                  >{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="p-7">
                  <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress timeline - dots + lines */}
          <div className="absolute bottom-8 left-0 right-0 px-16">
            <div className="flex items-center">
              {timeline.map((item, i) => (
                <>
                  {/* Dot */}
                  <div key={item.year} className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="relative h-5 w-5 rounded-full border-2 flex items-center justify-center overflow-hidden"
                      style={{ borderColor: '#214995', backgroundColor: 'white' }}
                    >
                      <div
                        ref={el => { dotFillRefs.current[i] = el }}
                        className="h-full w-full rounded-full"
                        style={{ backgroundColor: '#214995', transform: 'scale(0)', transformOrigin: 'center' }}
                      />
                    </div>
                    <span className="mt-2 text-xs font-bold text-gray-500">{item.year}</span>
                  </div>
                  {/* Line between dots */}
                  {i < timeline.length - 1 && (
                    <div key={`line-${i}`} className="relative flex-1 h-1.5 mx-1 rounded-full bg-gray-200">
                      <div
                        ref={el => { lineFillRefs.current[i] = el }}
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{ width: '0%', backgroundColor: '#214995' }}
                      />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The problem we lived */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          {/* Text + photo */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-2xl font-bold uppercase text-gray-900">The problem we lived</p>
              <p className="mt-6 text-lg leading-relaxed text-gray-500">
                Fintech support is not like any other support. Your agents need to understand fintech verification, PSD2, chargeback workflows, AML holds, and the difference between a payment pending and a payment failed - before they can answer a single customer message.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-500">
                Training takes 6 to 8 weeks. Then the agent handles live queries for a few months. Then they leave. You start again.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-500">
                Meanwhile, tickets queue up 24 hours a day because financial services customers do not keep office hours. A payment fails at midnight. A verification rejection comes in on a Sunday. A withdrawal hold triggers panic at 3am.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-500">
                We managed these queues. We lived the rotation. We tried every generic AI tool on the market. None of them understood what we actually needed.
              </p>
              <p className="mt-4 text-base font-semibold text-gray-900">
                So we built it ourselves.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img src="/robot_with_mac.png" alt="The problem" className="w-1/2 h-auto" />
            </div>
          </div>

          {/* Metrics below */}
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { value: '10+', label: 'Years inside fintech operations' },
              { value: '24/7', label: 'The reality of fintech customer support' },
              { value: '8 weeks', label: 'Average agent onboarding time we kept repeating' },
              { value: '3 days', label: 'Time to go live with supVision' },
            ].map((m) => (
              <div key={m.label} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="text-3xl font-black" style={{ color: '#214995' }}>{m.value}</p>
                <p className="mt-3 text-xs leading-relaxed text-gray-500">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pt-8 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">The values that drive everything we do</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-10 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: '#eef2fb', color: '#214995' }}>
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{v.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full pl-6 pr-1.5 py-1.5 text-sm font-semibold text-white"
              style={{ backgroundColor: '#101827' }}
            >
              <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/20 transition-transform duration-500 ease-in-out group-hover:scale-[20]" />
              <span className="relative z-10">Let's chat</span>
              <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Our offices */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Our office</p>
            <h2 className="mt-3 text-2xl font-bold text-gray-900">We are headquartered in Tallinn, Estonia - serving fintech teams globally.</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
            {/* Map image */}
            <div className="overflow-hidden rounded-3xl" style={{ minHeight: '380px' }}>
              <img src="/map.png" alt="Tallinn office location" className="h-full w-full object-cover" style={{ minHeight: '380px' }} />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center gap-6 rounded-3xl border border-gray-100 bg-white p-10 shadow-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Headquarter</p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">Tallinn, Estonia</h3>
                <p className="mt-1 text-sm text-gray-500">Our European base where the supVision team builds, ships, and supports fintech teams operating across global markets.</p>
              </div>

              <div className="h-px bg-gray-100" />

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: '#eef2fb', color: '#214995' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">WILARIUM OÜ</p>
                    <p className="mt-1 text-sm text-gray-700">Harju maakond, Tallinn, Kesklinna linnaosa, Vesivärava tn 50, 10152</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: '#eef2fb', color: '#214995' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <a href="mailto:info@supvision.ai" className="text-sm text-gray-700 hover:underline">info@supvision.ai</a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: '#eef2fb', color: '#214995' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                  </div>
                  <a href="https://t.me/+447737124949" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:underline">+44 77 3712 4949</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-8 pb-24 px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center"
          style={{ backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h2 className="text-3xl font-bold text-white">Ready to stop living the problem?</h2>
          <p className="mt-4 text-base text-blue-200">Talk to someone who has been in your position. We'll show you exactly what supVision does for teams like yours.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100">
              Book a demo
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              See pricing
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
