import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import { DashboardScreenshots, AnalyticsFAQ } from '../components/analytics'

const canelaStyle = { fontFamily: "'Nohemi', sans-serif", fontWeight: 300 } as const

const heroPills = ['Real-time', 'Bot vs human', 'Heatmap', 'Exports']

const heroHighlights = [
  'Full workload overview: total tickets, open, closed, unresolved — updated in real time',
  'Bot vs human split: see exactly what AI resolved vs what reached a human',
  'Team leaderboard, activity heatmap, and per-agent performance drill-down',
]

const metricShowcase = [
  {
    title: 'Ticket saves',
    desc: '93% of incoming tickets handled by AI — no human agent required.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: 'Message flow',
    desc: '72% of all message volume processed and responded to by supVision.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    title: 'Final closures',
    desc: '49% of cases fully closed by the AI with no human involvement at any step.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: 'Team leaderboard',
    desc: 'Drill into any agent: response time, resolution rate, CSAT, and cases per day.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Data captured in real time',
    desc: 'Every ticket, message, resolution, escalation, and agent action is logged automatically. No manual exports. No end-of-day delays. The dashboard updates as events happen.',
  },
  {
    step: '02',
    title: 'Bot vs human split calculated',
    desc: 'supVision tracks what the AI resolved autonomously, what it escalated, and what went straight to a human. Each case is tagged by query type, channel, and outcome.',
  },
  {
    step: '03',
    title: 'Trends surface automatically',
    desc: 'Activity heatmaps, resolution time trends, and reopen rates are calculated continuously. You see patterns without writing a single SQL query or building a spreadsheet.',
  },
  {
    step: '04',
    title: 'Export or act on insights',
    desc: 'Share reports with your ops team, pull regulator-ready exports, or trigger escalation rule changes directly from what you see. Data that leads to action, not archives.',
  },
]

const howItWorksAccordion = howItWorks.map((s) => ({ q: s.title, a: s.desc }))

const metricCards = [
  { stat: '93%', label: 'Ticket saves', desc: '93% of incoming tickets handled by AI — no human agent required.' },
  { stat: '72%', label: 'Message flow', desc: '72% of all message volume processed and responded to by supVision.' },
  { stat: '49%', label: 'Final closures', desc: '49% of cases fully closed by the AI with no human involvement at any step.' },
]

const dashboardMobileCards = [
  {
    tag: 'Daily Trend',
    title: 'Ticket saves over time',
    desc: 'Blue tracks bot activity, green tracks support — spot handoff quality and staffing pressure before they compound.',
    img: '/analytics%20screenz/ticket%20saves%20daily%20trend%201.png',
  },
  {
    tag: 'Ownership Mix',
    title: 'Bot vs human — ticket saves',
    desc: 'See exactly what the AI resolved versus what reached a human agent.',
    img: '/analytics%20screenz/ticket%20saves%20daily%20trend%202.png',
  },
  {
    tag: 'Weekly Rhythm',
    title: 'When your queue is busiest',
    desc: 'Darker cells mean more activity. Plan human shifts around real demand, not assumptions.',
    img: '/analytics%20screenz/weekday%20and%20hour%20heatmap.png',
  },
]

function FeatureAccordionItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (open) {
      el.style.maxHeight = el.scrollHeight + 'px'
      el.style.opacity = '1'
    } else {
      el.style.maxHeight = '0px'
      el.style.opacity = '0'
    }
  }, [open])

  return (
    <div className="border-t border-gray-900">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-lg text-gray-900" style={canelaStyle}>
          {item.q}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-5 w-5 flex-shrink-0 text-gray-900 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
        </svg>
      </button>
      <div
        ref={bodyRef}
        style={{ maxHeight: '0px', opacity: 0, overflow: 'hidden', transition: 'max-height 0.35s ease, opacity 0.3s ease' }}
      >
        <p className="pb-5 text-sm leading-relaxed text-gray-600">{item.a}</p>
      </div>
    </div>
  )
}

export default function Analytics() {
  return (
    <div className="pt-0" style={{ backgroundColor: '#faf8f5' }}>
      <PageMeta
        title="Support Analytics — supVision"
        description="Real-time analytics for fintech support teams. Track resolution rates, escalation patterns, and AI performance across all channels."
        path="/analytics"
      />

      {/* Hero */}
      <section className="px-4 pb-12 pt-4 sm:px-6 lg:pb-16 lg:px-8 lg:pt-8">
        <div className="mx-auto max-w-7xl lg:px-6">

          {/* Mobile */}
          <div className="mx-auto w-full max-w-4xl text-center lg:hidden">
            <h1
              className="text-[1.85rem] leading-tight text-gray-900 sm:text-[2.45rem]"
              style={canelaStyle}
            >
              Real-time visibility into every ticket and agent
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-500">
              The Analytics Dashboard shows what AI resolved, what escalated, and how your team performs — updated live, export-ready for regulators.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {heroPills.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 shadow-sm sm:text-sm"
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: '#101827' }}
              >
                <span>Let&apos;s chat</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            <div
              className="mt-10 overflow-hidden rounded-3xl px-5 py-8 text-left sm:px-6"
              style={{ backgroundColor: '#1A1A1A' }}
            >
              <span
                className="inline-block rounded-full px-4 py-1 text-sm font-medium"
                style={{ backgroundColor: '#F5F0E8', color: '#1A1A1A' }}
              >
                Metrics
              </span>
              <h2
                className="mt-5 text-[1.65rem] leading-snug text-white sm:text-[1.85rem]"
                style={canelaStyle}
              >
                Know what your operation is doing <em className="italic">right now</em>.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                Ticket saves, message flow, closures, and team performance — all in one live dashboard.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {metricShowcase.map((card) => (
                  <div
                    key={card.title}
                    className="flex flex-col gap-3 rounded-2xl p-4"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <div style={{ color: '#9BB0E8' }}>{card.icon}</div>
                    <h3 className="text-sm leading-snug text-white sm:text-base" style={canelaStyle}>
                      {card.title}
                    </h3>
                    <p className="text-[11px] leading-snug text-gray-400 sm:text-xs">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-3xl px-5 py-8 text-left sm:px-6" style={{ backgroundColor: '#faf8f5' }}>
              <span className="inline-block rounded-full border border-gray-900 px-4 py-1 text-sm font-medium text-gray-900">
                How it works
              </span>
              <h2
                className="mt-5 text-[1.65rem] leading-snug text-gray-900 sm:text-[1.85rem]"
                style={canelaStyle}
              >
                From raw events to <em className="italic">actionable insight</em>.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Every resolution and escalation feeds the dashboard automatically — no spreadsheets, no manual exports.
              </p>
              <div className="mt-6 border-b border-gray-900">
                {howItWorksAccordion.map((item) => (
                  <FeatureAccordionItem key={item.q} item={item} />
                ))}
              </div>
            </div>

            <div className="mt-8 text-left">
              <h2
                className="text-center text-[1.65rem] leading-snug text-gray-900 sm:text-[1.85rem]"
                style={canelaStyle}
              >
                Inside the dashboard
              </h2>
              <p className="mt-3 text-center text-sm leading-relaxed text-gray-500">
                Every chart is live — built from your actual ticket and conversation data.
              </p>
              <div className="mt-6 flex flex-col gap-4">
                {dashboardMobileCards.map((card) => (
                  <div key={card.title} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="px-5 pt-5 pb-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{card.tag}</p>
                      <h3 className="mt-1 text-base font-bold text-gray-900">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-500">{card.desc}</p>
                    </div>
                    <div className="px-4 pb-4">
                      <img src={card.img} alt={card.title} className="w-full rounded-xl border border-gray-100" loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop hero */}
          <div className="hidden overflow-hidden rounded-3xl border border-gray-100 bg-white lg:block">
            <div className="grid lg:grid-cols-2">
              <div className="flex flex-col justify-center px-10 py-14 lg:px-14">
                <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#214995' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M1.75 9.5a.75.75 0 0 0 0 1.5h.59l-.352 2.11A.75.75 0 0 0 2.728 14h10.544a.75.75 0 0 0 .74-.89L13.66 11h.59a.75.75 0 0 0 0-1.5H1.75Zm5.5-5.5a.75.75 0 0 0-1.5 0v2.376L4.604 5.23a.75.75 0 1 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06L7.25 6.376V4Z" />
                  </svg>
                  Solutions · Analytics Dashboard
                </p>
                <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl">Analytics Dashboard</h1>
                <ul className="mt-8 space-y-4">
                  {heroHighlights.map((h) => (
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
                <div className="mt-10">
                  <Link
                    to="/contact"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gray-300 bg-white pl-6 pr-1.5 py-1.5 text-sm font-semibold"
                  >
                    <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]" style={{ backgroundColor: '#214995' }} />
                    <span className="relative z-10 text-gray-900 transition-colors duration-300 group-hover:text-white">Book a demo</span>
                    <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
              <div className="relative" style={{ aspectRatio: '1/1' }}>
                <img
                  src="/analytics.png"
                  alt="Analytics Dashboard"
                  className="absolute rounded-2xl object-cover"
                  style={{ top: '1rem', left: '1rem', right: '1rem', bottom: '1rem', width: 'calc(100% - 2rem)', height: 'calc(100% - 2rem)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key metrics — desktop */}
      <section className="hidden px-4 pb-16 sm:px-6 lg:block lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {metricCards.map((m) => (
              <div key={m.stat} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                <span className="text-5xl font-black" style={{ color: '#214995' }}>{m.stat}</span>
                <span className="mt-2 text-sm font-bold text-gray-900">{m.label}</span>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — desktop */}
      <section className="hidden py-24 px-4 sm:px-6 lg:block lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">How it works</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                From raw event data to
                <br />
                <span className="font-black">actionable insight</span> — automatically.
              </h2>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {howItWorks.map((step) => (
              <div key={step.step} className="grid items-start gap-6 py-8 lg:grid-cols-[80px_1fr_2fr]">
                <span className="text-5xl font-black leading-none" style={{ color: 'rgba(33,73,149,0.15)' }}>
                  {step.step}
                </span>
                <h3 className="pt-1 text-base font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard screenshots — desktop */}
      <DashboardScreenshots />

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:pb-24 lg:px-8">
        <div
          className="mx-auto max-w-4xl rounded-2xl px-6 py-12 text-center sm:px-8 sm:py-16"
          style={{
            backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2
            className="text-[1.75rem] leading-tight text-white sm:text-[3.25rem]"
            style={canelaStyle}
          >
            See your support operation clearly.
          </h2>
          <p className="mt-4 text-sm text-blue-200 sm:text-base">
            Real-time visibility into every ticket, every agent, and every AI decision. Live in 3 days.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#AAC6FF]"
            >
              <span>Book a demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <AnalyticsFAQ />
    </div>
  )
}
