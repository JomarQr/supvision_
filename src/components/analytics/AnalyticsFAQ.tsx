import { useEffect, useRef, useState } from 'react'

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
]

const canelaStyle = { fontFamily: "'Inter', sans-serif", fontWeight: 300 } as const

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { q: string; a: string }
  isOpen: boolean
  onToggle: () => void
}) {
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
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left"
      >
        <span className="text-base font-medium leading-snug text-gray-900 lg:text-[17px]">{item.q}</span>
        <span className={['flex h-6 w-6 flex-shrink-0 items-center justify-center text-gray-900 transition-transform duration-300', isOpen ? 'rotate-180' : ''].join(' ')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
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

export default function AnalyticsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-[#faf8f5] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl px-2 lg:max-w-7xl lg:px-0">
        <div className="mb-8 text-center">
          <h2 className="leading-tight" style={{ ...canelaStyle, fontSize: '2.25rem' }}>
            <span className="text-gray-900">Frequently Asked Questions</span>
          </h2>
        </div>
        {/* Mobile */}
        <div className="mt-6 flex flex-col gap-3 lg:hidden">
          {faqItems.map((item, i) => (
            <FAQItem key={item.q} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
        {/* Desktop: two columns */}
        <div className="mt-6 hidden gap-3 lg:flex lg:items-start">
          <div className="flex flex-1 flex-col gap-3">
            {faqItems.filter((_, i) => i % 2 === 0).map((item) => {
              const i = faqItems.indexOf(item)
              return <FAQItem key={item.q} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            })}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {faqItems.filter((_, i) => i % 2 === 1).map((item) => {
              const i = faqItems.indexOf(item)
              return <FAQItem key={item.q} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
