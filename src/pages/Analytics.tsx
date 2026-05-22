import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import IntegrationFinder from '../components/ui/IntegrationFinder'

const capabilities = [
  {
    title: 'Workload Overview',
    desc: 'Total tickets, open, in-progress, closed, and unresolved — all in one view. See the current state of your support queue at a glance without pulling exports.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h7A1.5 1.5 0 0 1 13 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 12.5v-9ZM4.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-7ZM6 7h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1Zm0 2.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1ZM6 4.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1Z" /></svg>,
  },
  {
    title: 'Bot vs Support Split',
    desc: 'See exactly what percentage of tickets and message flow the AI handled vs what reached a human agent — broken down by channel, query type, and time period.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M7.25 10.25a.75.75 0 0 0 1.5 0V4.56l2.22 2.22a.75.75 0 1 0 1.06-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 1.06 1.06l2.22-2.22v5.69Z" /><path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" /></svg>,
  },
  {
    title: 'Team Leaderboard',
    desc: 'Per-agent metrics: response time, resolution rate, cases handled, and CSAT score. Identify top performers and spot where coaching is needed — without manual reporting.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M1.75 9.5a.75.75 0 0 0 0 1.5h.59l-.352 2.11A.75.75 0 0 0 2.728 14h10.544a.75.75 0 0 0 .74-.89L13.66 11h.59a.75.75 0 0 0 0-1.5H1.75Zm5.5-5.5a.75.75 0 0 0-1.5 0v2.376L4.604 5.23a.75.75 0 1 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06L7.25 6.376V4Z" /></svg>,
  },
  {
    title: 'Activity Heatmap',
    desc: 'Visualise when tickets arrive by hour and day of week. Know your peak times, optimise your human staffing, and ensure AI coverage never gaps during surges.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clipRule="evenodd" /></svg>,
  },
  {
    title: 'Conversation Flow Analytics',
    desc: 'Track every ticket from open to resolved to reopened. See where conversations stall, where escalations happen most, and how long each stage takes.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z" clipRule="evenodd" /></svg>,
  },
  {
    title: 'Reopen & Escalation Tracking',
    desc: 'Monitor how often resolved cases come back, which query types escalate most, and where your confidence thresholds need tuning. Close the loop on quality.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" /></svg>,
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

const metricCards = [
  {
    stat: '93%',
    label: 'Ticket saves',
    desc: '93% of incoming tickets handled by AI — no human agent required.',
  },
  {
    stat: '72%',
    label: 'Message flow',
    desc: '72% of all message volume processed and responded to by supVision.',
  },
  {
    stat: '49%',
    label: 'Final closures',
    desc: '49% of cases fully closed by the AI with no human involvement at any step.',
  },
]

const faqItems = [
  {
    q: 'Is the data available in real time or is there a delay?',
    a: 'All data is captured and surfaced in real time. Every ticket event — received, assigned, escalated, resolved, reopened — is logged the moment it happens. The dashboard updates continuously with no end-of-day batch processing.',
  },
  {
    q: 'Can I drill down by individual agent?',
    a: 'Yes. The Team Leaderboard allows you to click into any agent and see their full performance profile: response time distribution, resolution rate, cases handled per day, and CSAT score breakdown. You can compare agents side by side or filter by time period.',
  },
  {
    q: 'Can I export reports for my regulators or board?',
    a: 'Yes. All data is exportable in CSV and PDF formats. Regulator-ready audit reports include every decision log, confidence score, escalation reason, and outcome. Board-level summaries can be configured to run on a schedule.',
  },
  {
    q: 'Does the Analytics Dashboard connect to our BI tools?',
    a: 'Yes. Data can be streamed to BigQuery, Looker Studio, Power BI, Tableau, and Metabase via our analytics export connector. Most BI integrations are live within a day of setup.',
  },
  {
    q: 'How do I use the heatmap to improve staffing?',
    a: 'The Activity Heatmap shows ticket arrival volume by hour and day of week, with a 30-day average. You can identify your true peak windows and cross-reference with your human agent rotas to find gaps or overstaffed periods. Most teams adjust shift patterns within the first week of seeing it.',
  },
  {
    q: 'Can managers see their own team only?',
    a: 'Yes. Role-based access controls let you configure what each manager sees. A support team lead can be scoped to their own agents and queues. An operations director can see the full picture. Access is configured by your admin during onboarding.',
  },
]

function FAQItem({ item }: { item: { q: string; a: string } }) {
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
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between gap-8 py-7 text-left"
      >
        <span className="text-lg font-semibold text-gray-900">{item.q}</span>
        <span className={['flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white transition-transform duration-300', open ? 'rotate-45' : ''].join(' ')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 text-gray-500">
            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
          </svg>
        </span>
      </button>
      <div ref={bodyRef} style={{ maxHeight: '0px', opacity: 0, overflow: 'hidden', transition: 'max-height 0.35s ease, opacity 0.3s ease' }}>
        <p className="pb-7 text-base leading-relaxed text-gray-500 max-w-3xl">{item.a}</p>
      </div>
    </div>
  )
}

export default function Analytics() {
  return (
    <div className="pt-24">

      {/* Hero */}
      <section className="px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white">
            <div className="grid lg:grid-cols-2">

              {/* Left - text */}
              <div className="flex flex-col justify-center px-10 py-14 lg:px-14">
                <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#214995' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M1.75 9.5a.75.75 0 0 0 0 1.5h.59l-.352 2.11A.75.75 0 0 0 2.728 14h10.544a.75.75 0 0 0 .74-.89L13.66 11h.59a.75.75 0 0 0 0-1.5H1.75Zm5.5-5.5a.75.75 0 0 0-1.5 0v2.376L4.604 5.23a.75.75 0 1 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06L7.25 6.376V4Z" />
                  </svg>
                  Solutions · Analytics Dashboard
                </p>

                <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl">
                  Analytics Dashboard
                </h1>

                <ul className="mt-8 space-y-4">
                  {[
                    'Full workload overview: total tickets, open, closed, unresolved — updated in real time',
                    'Bot vs human split: see exactly what AI resolved vs what reached a human',
                    'Team leaderboard, activity heatmap, and per-agent performance drill-down',
                  ].map((h) => (
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

              {/* Right - image */}
              <div className="relative hidden lg:block" style={{ aspectRatio: '1/1' }}>
                <img
                  src="/example_of_dashboard.png"
                  alt="Analytics Dashboard"
                  className="absolute rounded-2xl object-cover"
                  style={{ top: '1rem', left: '1rem', right: '1rem', bottom: '1rem', width: 'calc(100% - 2rem)', height: 'calc(100% - 2rem)' }}
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Key metrics strip */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {metricCards.map((m) => (
              <div key={m.stat} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm text-center">
                <span className="text-5xl font-black" style={{ color: '#214995' }}>{m.stat}</span>
                <span className="mt-2 text-sm font-bold text-gray-900">{m.label}</span>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="pt-8 pb-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">How it works</p>
            <p className="mt-3 text-base text-gray-500">From raw event data to actionable insight — automatically.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step) => (
              <div key={step.step} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <span className="text-4xl font-black" style={{ color: '#214995' }}>{step.step}</span>
                <h3 className="mt-4 text-base font-bold text-gray-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl px-10 py-14" style={{ backgroundColor: '#214995' }}>
            <div className="mb-12 text-center">
              <p className="text-2xl font-bold uppercase text-white">Capabilities</p>
              <p className="mt-3 text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>Everything the Analytics Dashboard shows out of the box.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((c) => (
                <div key={c.title} className="flex flex-col rounded-2xl bg-white p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-white" style={{ backgroundColor: '#214995' }}>
                      {c.icon}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">{c.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-500">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">What you see</p>
            <p className="mt-3 text-base text-gray-500">A live view of your entire support operation in one place.</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <img
              src="/example_of_dashboard.png"
              alt="Analytics Dashboard Preview"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <IntegrationFinder />

      {/* Compliance strip */}
      <section className="py-3 px-2 sm:px-3">
        <div>
          <div className="overflow-hidden rounded-3xl bg-gray-900 px-10 py-14 lg:px-16">
            <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
              <div className="lg:col-span-2">
                <p className="text-2xl font-bold uppercase text-white">Data you can trust</p>
                <p className="mt-4 text-base leading-relaxed text-gray-400">
                  Every metric in the Analytics Dashboard is sourced directly from your live ticket and conversation data. No sampling, no approximations. All data is retained with full audit trails — access logs, export history, and role-based permissions are part of every plan.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {['Real-time data', 'Role-based access', 'Export audit trail', 'GDPR compliant', 'BI tool connectors'].map(tag => (
                    <span key={tag} className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-gray-300">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center gap-6">
                <div className="flex flex-col items-start gap-6">
                  <div className="flex items-center justify-center gap-8">
                    <img src="/badge/image.png" alt="PCI DSS" className="h-36 w-auto" />
                    <img src="/badge/image 26 (3).png" alt="GDPR" className="h-28 w-auto" />
                  </div>
                  <Link
                    to="/security"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/30 pl-6 pr-1.5 py-1.5 text-sm font-semibold text-white ml-6"
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
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">FAQ</p>
          </div>
          <div className="mt-12 divide-y divide-gray-200">
            {faqItems.map((item, i) => (
              <FAQItem key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center"
          style={{
            backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2 className="text-3xl font-bold text-white">See your support operation clearly.</h2>
          <p className="mt-4 text-base text-blue-200">
            Real-time visibility into every ticket, every agent, and every AI decision. Live in 3 days.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/30 bg-white/10 pl-6 pr-1.5 py-1.5 text-sm font-semibold text-white"
            >
              <span className="absolute right-[6px] top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-white transition-transform duration-500 ease-in-out group-hover:scale-[20]" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-900">Book a demo</span>
              <span className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gray-900">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </span>
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
