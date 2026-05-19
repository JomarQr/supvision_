import { Link } from 'react-router-dom'

export interface IndustryPain {
  title: string
  desc: string
}

export interface IndustryUseCase {
  customer: string
  resolution: string
}

export interface IndustryMetric {
  value: string
  label: string
}

export interface IndustryPageData {
  badge: string
  title: string
  subtitle: string
  description: string
  highlights: string[]
  heroImage: string
  pains: IndustryPain[]
  useCases: IndustryUseCase[]
  metrics: IndustryMetric[]
  ctaTitle: string
  ctaDesc: string
}

export default function IndustryPage({ data }: { data: IndustryPageData }) {
  return (
    <div className="pt-24">

      {/* Hero */}
      <section className="px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="overflow-hidden rounded-3xl border"
            style={{ backgroundColor: '#EEF4FF', borderColor: 'rgba(33,73,149,0.15)' }}
          >
            <div className="grid lg:grid-cols-2">

              {/* Left — text */}
              <div className="flex flex-col justify-center px-10 py-14 lg:px-14">
                <p
                  className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                  style={{ color: '#214995' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                    <path fillRule="evenodd" d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1 12.75A.75.75 0 0 1 1.75 12H8a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 12.75Z" clipRule="evenodd" />
                  </svg>
                  Industries
                </p>

                <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl">
                  {data.title}
                </h1>

                <p className="mt-4 text-base leading-relaxed text-gray-600">{data.subtitle}</p>

                <ul className="mt-8 space-y-4">
                  {data.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: 'rgba(33,73,149,0.12)' }}
                      >
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
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold"
                  >
                    <span className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[10]" style={{ backgroundColor: '#214995' }} />
                    <span className="relative z-10 text-gray-900 transition-colors duration-300 group-hover:text-white">Let's chat!</span>
                    <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right — image */}
              <div className="relative hidden lg:block">
                <img
                  src={data.heroImage}
                  alt={data.title}
                  className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-1rem)] rounded-2xl object-cover"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Metrics strip */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {data.metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="text-3xl font-black" style={{ color: '#214995' }}>{m.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">The problem</p>
            <p className="mt-3 text-base text-gray-500">What support looks like before supVision.</p>
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

      {/* Use cases */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">How supVision helps</p>
            <p className="mt-3 text-base text-gray-500">Real queries resolved autonomously, every day.</p>
          </div>
          <div className="flex flex-col gap-4">
            {data.useCases.map((uc) => (
              <div key={uc.customer} className="relative grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                <div className="bg-gray-100 px-8 py-8">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">Customer says</p>
                  <p className="text-base font-semibold text-gray-900">{uc.customer}</p>
                </div>
                <div className="bg-white px-8 py-8">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: '#214995' }}>supVision does</p>
                  <p className="text-sm leading-relaxed text-gray-700">{uc.resolution}</p>
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
