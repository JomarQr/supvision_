import React from 'react'
import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'

const plans = [
  {
    name: 'Starter',
    icon: '⚡',
    price: '€499',
    period: '/month',
    tagline: 'For early-stage fintech teams automating their first support flows.',
    highlight: false,
    badge: null,
    cta: 'Request price',
    ctaTo: '/contact',
    groups: [
      {
        label: 'Usage',
        features: [
          { text: 'Up to 500 AI-resolved tickets / month', bold: true },
          { text: '1 active support agent' },
          { text: '2 communication channels (email + chat)' },
          { text: '30-day audit log retention' },
        ],
      },
      {
        label: 'Capabilities',
        features: [
          { text: 'Identity verification & onboarding queries' },
          { text: 'Standard escalation to human agent' },
          { text: 'Pre-built fintech response templates' },
          { text: 'Basic analytics dashboard' },
          { text: 'Email support (48h response)' },
        ],
      },
    ],
    bestFor: <><strong className="text-gray-700">Startups and small fintech teams</strong> handling under <strong className="text-gray-700">500 tickets/month</strong>.</>,
  },
  {
    name: 'Growth',
    icon: '🚀',
    price: '€1,490',
    period: '/month',
    tagline: 'For scaling fintechs with high ticket volume and compliance requirements.',
    highlight: true,
    badge: 'Most popular',
    cta: 'Request price',
    ctaTo: '/contact',
    groups: [
      {
        label: 'Usage',
        features: [
          { text: 'Up to 3,000 AI-resolved tickets / month', bold: true },
          { text: '3 active support agents' },
          { text: '5 channels (email, chat, WhatsApp, Telegram, API)' },
          { text: '90-day audit log retention' },
        ],
      },
      {
        label: 'Capabilities',
        features: [
          { text: 'Identity verification, dispute resolution & transaction queries', bold: true },
          { text: 'Custom escalation rules & confidence thresholds' },
          { text: 'Multi-language support (20+ languages)' },
          { text: 'API access & webhook integrations' },
          { text: 'Advanced analytics & resolution reports' },
          { text: 'Priority chat support (8h response)' },
          { text: 'Everything in Starter' },
        ],
      },
    ],
    bestFor: <><strong className="text-gray-700">Growing fintech companies</strong> expanding to <strong className="text-gray-700">new markets</strong> with complex support needs.</>,
  },
  {
    name: 'Enterprise',
    icon: '✦',
    price: 'Custom',
    period: '',
    tagline: 'Private infrastructure, higher limits, and tailored compliance workflows.',
    highlight: false,
    badge: null,
    cta: 'Request price',
    ctaTo: '/contact',
    groups: [
      {
        label: 'Usage',
        features: [
          { text: 'Unlimited AI-resolved tickets', bold: true },
          { text: 'Unlimited support agents' },
          { text: 'All channels + custom integrations' },
          { text: 'Unlimited audit log retention' },
        ],
      },
      {
        label: 'Enterprise-grade',
        features: [
          { text: 'Full identity verification, disputes, transactions & custom workflows', bold: true },
          { text: 'Private cloud infrastructure & dedicated environment' },
          { text: 'Custom SLAs with guaranteed uptime' },
          { text: '50+ languages with regional compliance rules' },
          { text: 'Compliance reporting & regulator-ready exports' },
          { text: 'Security reviews & penetration test support' },
          { text: 'Dedicated Customer Success Manager' },
          { text: 'Engineering onboarding support' },
          { text: 'Everything in Growth' },
        ],
      },
    ],
    bestFor: <><strong className="text-gray-700">Regulated financial institutions</strong>, payment processors, and <strong className="text-gray-700">global fintech enterprises</strong>.</>,
  },
]

const comparisonRows = [
  { label: 'AI-resolved tickets / month', starter: '500', growth: '3,000', enterprise: 'Unlimited' },
  { label: 'Active support agents', starter: '1', growth: '3', enterprise: 'Unlimited' },
  { label: 'Communication channels', starter: '2', growth: '5', enterprise: 'All + custom' },
  { label: 'Audit log retention', starter: '30 days', growth: '90 days', enterprise: 'Unlimited' },
  { label: 'Verification query automation', starter: '✓', growth: '✓', enterprise: '✓' },
  { label: 'Dispute resolution', starter: 'No', growth: '✓', enterprise: '✓' },
  { label: 'Transaction issue handling', starter: 'No', growth: '✓', enterprise: '✓' },
  { label: 'Custom escalation rules', starter: 'No', growth: '✓', enterprise: '✓' },
  { label: 'API & webhook access', starter: 'No', growth: '✓', enterprise: '✓' },
  { label: 'Multi-language support', starter: 'No', growth: '20+ languages', enterprise: '50+ languages' },
  { label: 'Private infrastructure', starter: 'No', growth: 'No', enterprise: '✓' },
  { label: 'Custom SLA', starter: 'No', growth: 'No', enterprise: '✓' },
  { label: 'Compliance reporting', starter: 'No', growth: 'No', enterprise: '✓' },
  { label: 'Dedicated CSM', starter: 'No', growth: 'No', enterprise: '✓' },
  { label: 'Support response time', starter: '48h email', growth: '8h chat', enterprise: 'Dedicated' },
]

const canelaStyle = { fontFamily: "'Nohemi', sans-serif", fontWeight: 300 } as const

export default function Pricing() {
  return (
    <div className="pt-0" style={{ backgroundColor: '#faf8f5' }}>
      <PageMeta
        title="Pricing — supVision"
        description="Transparent pricing for AI fintech support. Starter, Growth, and Enterprise plans. Start small, scale fast — no long-term commitment required."
        path="/pricing"
      />

      {/* Header */}
      <section className="px-4 pb-10 pt-4 text-center sm:px-6 lg:pb-16 lg:px-8 lg:pt-6">
        <div data-reveal className="mx-auto max-w-3xl">
          <h1
            className="text-[1.85rem] leading-tight text-gray-900 sm:text-[2.45rem] lg:text-5xl"
            style={canelaStyle}
          >
            Pricing
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-500 lg:mt-6 lg:text-base">
            Flat monthly plans based on your support volume. Your costs stay stable as you scale, no hidden fees, no per-resolution charges.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="relative flex h-full flex-col rounded-2xl"
                style={{ boxShadow: plan.highlight ? '0 8px 40px rgba(33,73,149,0.18)' : '0 4px 24px rgba(0,0,0,0.08)', border: plan.highlight ? '1.5px solid #214995' : undefined }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-semibold text-white" style={{ backgroundColor: '#214995' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                        <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L8 11.668l-3.136 1.326a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                      </svg>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-8">
                  {/* Plan header */}
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">{plan.icon}</span>
                    <h2 className="text-3xl font-black text-gray-900">{plan.name}</h2>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-gray-500">{plan.tagline}</p>

                  {/* Feature groups */}
                  <div className="mt-8 flex flex-col gap-6 flex-1">
                    {plan.groups.map((group, gi) => (
                      <div key={gi}>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">{group.label}</p>
                        <ul className="space-y-2.5">
                          {group.features.map((f, fi) => (
                            <li key={fi} className="flex items-start gap-2.5">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500"
                                style={plan.highlight ? { color: '#214995' } : undefined}>
                                <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                              </svg>
                              <span className={['text-sm leading-relaxed text-gray-600', f.bold ? 'font-semibold text-gray-900' : ''].join(' ')}>
                                {f.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {gi < plan.groups.length - 1 && <div className="mt-6 h-px bg-gray-100" />}
                      </div>
                    ))}
                  </div>

                  {/* Best for */}
                  <div className="mt-8 rounded-xl px-4 py-3" style={{ border: '1.5px dashed #9ca3af' }}>
                    <p className="text-xs leading-relaxed text-gray-500">
                      <span className="font-semibold text-gray-700">Best for:</span> {plan.bestFor}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    to={plan.ctaTo}
                    className={[
                      'mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-colors',
                      plan.highlight
                        ? 'text-white'
                        : 'border-2 border-gray-900 bg-transparent text-gray-900',
                    ].join(' ')}
                    style={plan.highlight ? { backgroundColor: '#214995' } : undefined}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F97316'; e.currentTarget.style.borderColor = '#F97316'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = plan.highlight ? '#214995' : 'transparent'; e.currentTarget.style.borderColor = plan.highlight ? '#214995' : '#111827'; e.currentTarget.style.color = plan.highlight ? '#fff' : '#111827'; }}
                  >
                    {plan.cta}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
        <div className="mx-auto max-w-5xl pt-16">
          <div data-reveal className="mb-12 text-center">
            <h2
              className="text-[1.85rem] leading-tight text-gray-900 sm:text-[2.45rem]"
              style={canelaStyle}
            >
              Plans &amp; features
            </h2>
          </div>

          <div data-reveal className="overflow-hidden rounded-2xl" style={{ border: '1.5px solid #111827', '--rd': '100ms' } as React.CSSProperties}>
            {/* Table header */}
            <div className="grid grid-cols-4" style={{ borderBottom: '1.5px solid #111827' }}>
              <div className="px-6 py-4" />
              <div className="px-4 py-4 text-center text-sm font-bold text-gray-700" style={{ borderLeft: '1.5px solid #111827' }}>Starter</div>
              <div className="px-4 py-4 text-center text-sm font-bold" style={{ color: '#214995', backgroundColor: '#EEF3FF', borderLeft: '1.5px solid #111827' }}>Growth</div>
              <div className="px-4 py-4 text-center text-sm font-bold text-gray-700" style={{ borderLeft: '1.5px solid #111827' }}>Enterprise</div>
            </div>

            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-4"
                style={i < comparisonRows.length - 1 ? { borderBottom: '1px solid #111827' } : undefined}
              >
                <div className="px-6 py-3.5 text-sm font-bold text-gray-900">{row.label}</div>
                <div className="px-4 py-3.5 text-center text-sm text-gray-600" style={{ borderLeft: '1.5px solid #111827' }}>{row.starter}</div>
                <div className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900" style={{ backgroundColor: '#EEF3FF', borderLeft: '1.5px solid #111827', color: row.growth === '✓' ? '#214995' : undefined }}>{row.growth}</div>
                <div className="px-4 py-3.5 text-center text-sm text-gray-600" style={{ borderLeft: '1.5px solid #111827' }}>{row.enterprise}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center"
          style={{
            backgroundImage: 'url(/bg/2e75cba1-8098-43e6-910e-00808d9daaa1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2
            className="text-[1.75rem] leading-tight text-white sm:text-[3.25rem]"
            style={canelaStyle}
          >
            Not sure which plan fits?
          </h2>
          <p className="mt-4 text-base text-blue-200">
            Talk to us. We&apos;ll recommend the right plan based on your ticket volume, geography, and compliance requirements.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
            style={{ backgroundColor: '#fff', color: '#111827' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F97316'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#111827'; }}
          >
            <span>Talk to sales</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0">
              <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  )
}
