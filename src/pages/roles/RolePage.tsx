import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

function StackLogo({ logoUrl, color, letter }: { logoUrl: string; color: string; letter: string }) {
  const [err, setErr] = useState(false)
  return err ? (
    <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white font-bold text-white" style={{ backgroundColor: color, fontSize: '9px' }}>
      {letter}
    </span>
  ) : (
    <img src={logoUrl} alt="" className="h-7 w-7 rounded-full border-2 border-white bg-white object-contain" onError={() => setErr(true)} />
  )
}

export interface RoleChallenge {
  icon: ReactNode
  title: string
  desc: string
}

export interface RoleMetric {
  value: string
  label: string
}

export interface RoleStack {
  label: string
  desc: string
  logos: { logoUrl: string; color: string; letter: string }[]
}

export interface RolePageData {
  badge: string
  title: string
  subtitle: string
  highlights: string[]
  heroImage?: string
  challenges: RoleChallenge[]
  stacks: RoleStack[]
  metrics: RoleMetric[]
  ctaTitle: string
  ctaDesc: string
}

export default function RolePage({ data }: { data: RolePageData }) {
  const hasImage = !!data.heroImage

  return (
    <div className="pt-24">

      {/* Hero */}
      <section className="px-4 pt-8 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="overflow-hidden rounded-3xl border"
            style={{ backgroundColor: '#EEF4FF', borderColor: 'rgba(33,73,149,0.15)' }}
          >
            <div className={`grid ${hasImage ? 'lg:grid-cols-2' : ''}`}>

              {/* Left - text */}
              <div className="flex flex-col justify-center px-10 py-14 lg:px-14">
                <p
                  className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                  style={{ color: '#214995' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  {data.badge}
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
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gray-300 bg-white pl-6 pr-1.5 py-1.5 text-sm font-semibold"
                  >
                    <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]" style={{ backgroundColor: '#214995' }} />
                    <span className="relative z-10 text-gray-900 transition-colors duration-300 group-hover:text-white">Let's chat!</span>
                    <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right - image */}
              {hasImage && (
                <div className="relative hidden lg:block">
                  <img
                    src={data.heroImage}
                    alt={data.title}
                    className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-2xl object-cover"
                  />
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Challenges</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Challenges that we can solve for <span className="font-black">{data.title}</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.challenges.map((c) => (
              <div key={c.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: '#eef2fb', color: '#214995' }}>
                  {c.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations / stacks */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-gray-100 bg-white px-10 py-10">
            <div className="mb-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Integrations</p>
              <h3 className="mt-2 text-xl font-bold text-gray-900">Popular automation stacks</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {data.stacks.map((stack) => (
                <div
                  key={stack.label}
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
                >
                  <div className="flex flex-shrink-0 items-center -space-x-2">
                    {stack.logos.map((logo, i) => (
                      <StackLogo key={i} {...logo} />
                    ))}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold leading-snug text-gray-900">{stack.label}</p>
                    <p className="text-xs leading-snug text-gray-400">{stack.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/integrations"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full pl-5 pr-1.5 py-1.5 text-sm font-semibold text-white"
                style={{ backgroundColor: '#101827' }}
              >
                <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]" style={{ backgroundColor: '#214995' }} />
                <span className="relative z-10">See all integrations</span>
                <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24" style={{ paddingTop: '6rem' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="sticky top-20 z-20 mb-10 py-6 text-center" style={{ backgroundColor: '#faf8f5' }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Benefits</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              supVision advantages for <span className="font-black">{data.title}</span>
            </h2>
            <p className="mt-3 text-base text-gray-500 mx-auto max-w-2xl">Purpose-built for regulated financial services - not retrofitted from a generic AI tool. These are the outcomes supVision consistently delivers.</p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" /></svg>,
                title: '24/7 autonomous support',
                desc: 'No SLA gaps, no shift changes. supVision resolves queries around the clock with no human fatigue - every customer gets an instant response.',
                dark: true,
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" /></svg>,
                title: 'Compliant by design',
                desc: 'FCA, GDPR, and PCI DSS aligned from day one. Not retrofitted from a generic AI tool - built for regulated financial services from the ground up.',
                dark: false,
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.268a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" /></svg>,
                title: 'Live in 3 days',
                desc: 'Connect your existing helpdesk, CRM, and KYC tools. No platform migration, no 6-month implementation. You configure, set thresholds, and go.',
                dark: true,
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" /></svg>,
                title: '80% tier-1 resolution',
                desc: 'Most queries resolved without a human agent. Your team focuses only on the cases that genuinely need them - disputes, edge cases, and high-value customers.',
                dark: false,
              },
            ].map((b, i) => (
              <div
                key={b.title}
                className="sticky"
                style={{ top: `${280 + i * 24}px`, zIndex: i === 3 ? 21 : i + 10 }}
              >
                <div
                  className="overflow-hidden rounded-2xl shadow-lg"
                  style={{ backgroundColor: b.dark ? '#111827' : '#fff', minHeight: '140px' }}
                >
                  <div className="flex items-start gap-5 p-8">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                      style={b.dark ? { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' } : { backgroundColor: '#eef2fb', color: '#214995' }}
                    >
                      {b.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: b.dark ? '#fff' : '#111827' }}>{b.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: b.dark ? 'rgba(255,255,255,0.6)' : '#6b7280' }}>{b.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics strip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Results</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">Measurable business impact</h2>
            <p className="mt-3 text-base text-gray-500">supVision delivers consistent, quantifiable improvements across support costs, response times, and team efficiency.</p>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {data.metrics.slice(0, 3).map((m) => (
              <div key={m.label} className="col-span-2 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                <p className="text-3xl font-black" style={{ color: '#214995' }}>{m.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{m.label}</p>
              </div>
            ))}
            {data.metrics.slice(3, 5).map((m) => (
              <div key={m.label} className="col-span-3 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                <p className="text-3xl font-black" style={{ color: '#214995' }}>{m.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{m.label}</p>
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
