import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export interface FeaturePoint {
  icon: string
  title: string
  desc: string
}

export interface FeatureStep {
  step: string
  title: string
  desc: string
}

export interface FeaturePageData {
  badge: string
  title: string
  subtitle: string
  description: string
  points: FeaturePoint[]
  steps: FeatureStep[]
  ctaTitle: string
  ctaDesc: string
}

function FAQItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    el.style.maxHeight = open ? el.scrollHeight + 'px' : '0px'
    el.style.opacity = open ? '1' : '0'
  }, [open])

  return (
    <div>
      <button onClick={() => setOpen(o => !o)} className="flex w-full items-center justify-between gap-8 py-7 text-left">
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

export default function FeaturePage({ data, faq }: { data: FeaturePageData; faq: { q: string; a: string }[] }) {
  return (
    <div className="pt-24">

      {/* Hero */}
      <section className="px-4 pt-12 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-400" />
              {data.badge}
            </div>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">{data.title}</h1>
            <p className="mt-4 text-xl font-medium text-gray-500">{data.subtitle}</p>
            <p className="mt-6 text-base leading-relaxed text-gray-500">{data.description}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors" style={{ backgroundColor: '#214995' }}>
                Book a demo
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50">
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature points */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">What's included</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.points.map((p) => (
              <div key={p.title} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <span className="text-3xl">{p.icon}</span>
                <h3 className="mt-4 text-sm font-bold text-gray-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">How it works</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.steps.map((s) => (
              <div key={s.step} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <span className="text-4xl font-black" style={{ color: '#214995' }}>{s.step}</span>
                <h3 className="mt-4 text-base font-bold text-gray-900">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 text-center">
              <p className="text-2xl font-bold uppercase text-gray-900">FAQ</p>
            </div>
            <div className="mt-12 divide-y divide-gray-200">
              {faq.map((item, i) => <FAQItem key={i} item={item} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center"
          style={{ backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h2 className="text-3xl font-bold text-white">{data.ctaTitle}</h2>
          <p className="mt-4 text-base text-blue-200">{data.ctaDesc}</p>
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
