import { Link } from 'react-router-dom'

export interface RoleMetric {
  value: string
  label: string
}

export interface RolePain {
  title: string
  desc: string
}

export interface RoleUseCase {
  before: string
  after: string
}

export interface RolePageData {
  badge: string
  title: string
  subtitle: string
  description: string
  metrics: RoleMetric[]
  pains: RolePain[]
  useCases: RoleUseCase[]
  ctaTitle: string
  ctaDesc: string
}

export default function RolePage({ data }: { data: RolePageData }) {
  return (
    <div className="pt-24">

      {/* Hero */}
      <section className="px-4 pt-12 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-400" />
                {data.badge}
              </div>
              <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">{data.title}</h1>
              <p className="mt-4 text-xl font-medium text-gray-500">{data.subtitle}</p>
              <p className="mt-6 text-base leading-relaxed text-gray-500">{data.description}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors"
                  style={{ backgroundColor: '#214995' }}
                >
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

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {data.metrics.map((m) => (
                <div key={m.label} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <p className="text-3xl font-black" style={{ color: '#214995' }}>{m.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-gray-500">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">What you're dealing with</p>
            <p className="mt-3 text-base text-gray-500">The challenges supVision was built to solve.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.pains.map((p) => (
              <div key={p.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-50">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-red-400">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 4.25a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5ZM8 10.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-gray-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases — Before / After */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">Before and after supVision</p>
            <p className="mt-3 text-base text-gray-500">How your day changes once the agent is live.</p>
          </div>
          <div className="flex flex-col gap-4">
            {data.useCases.map((uc, i) => (
              <div key={i} className="relative grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                <div className="bg-gray-100 px-8 py-8">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">Before</p>
                  <p className="text-sm leading-relaxed text-gray-700">{uc.before}</p>
                </div>
                <div className="bg-white px-8 py-8">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: '#214995' }}>After supVision</p>
                  <p className="text-sm leading-relaxed text-gray-700">{uc.after}</p>
                </div>
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
