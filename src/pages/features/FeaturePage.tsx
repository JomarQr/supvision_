import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export interface FeaturePoint {
  icon: React.ReactNode
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
  highlights?: string[]
  coreImage?: string
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

      {/* Feature points */}
      <section className="pt-8 pb-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl px-6">
          {data.coreImage ? (
            <div className="mb-12 overflow-hidden rounded-3xl border bg-white" style={{ borderColor: 'rgba(33,73,149,0.15)' }}>
              <div className="grid lg:grid-cols-2">
                <div className="flex flex-col justify-center px-10 py-14 lg:px-14">
                  <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#214995' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                      <path fillRule="evenodd" d="M9.58 1.077a.75.75 0 0 1 .405.82L9.165 6h4.085a.75.75 0 0 1 .567 1.241l-6.5 7.5a.75.75 0 0 1-1.302-.638L6.835 10H2.75a.75.75 0 0 1-.567-1.241l6.5-7.5a.75.75 0 0 1 .897-.182Z" clipRule="evenodd" />
                    </svg>
                    {data.badge}
                  </p>
                  <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl">{data.title}</h1>
                  <p className="mt-4 text-base leading-relaxed text-gray-600">{data.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{data.description}</p>
                  {data.highlights && data.highlights.length > 0 && (
                    <ul className="mt-8 space-y-4">
                      {data.highlights.map((h) => (
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
                  )}
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
                <div className="relative hidden lg:block" style={{ aspectRatio: '1/1' }}>
                  <img
                    src={data.coreImage}
                    alt={data.title}
                    style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem', bottom: '1rem', width: 'calc(100% - 2rem)', height: 'calc(100% - 2rem)' }}
                    className="rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-12 max-w-3xl">
              <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl">{data.title}</h1>
              <p className="mt-4 text-xl font-medium text-gray-600">{data.subtitle}</p>
              <p className="mt-4 text-base leading-relaxed text-gray-500">{data.description}</p>
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
          )}
          <div className="mt-8 mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Capabilities</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              What supVision handles for <span className="font-black">{data.title}</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.points.map((p) => (
              <div key={p.title} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-white" style={{ backgroundColor: '#214995' }}>
                    {p.icon}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{p.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">How it works</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              From query to resolution, <span className="font-black">step by step</span>
            </h2>
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
        <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
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
