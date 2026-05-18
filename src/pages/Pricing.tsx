import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Starter',
    icon: '⚡',
    price: '€499',
    period: '/month',
    tagline: 'For early-stage fintech teams automating their first support flows.',
    highlight: false,
    badge: null,
    cta: 'Get started',
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
          { text: 'KYC status & onboarding queries' },
          { text: 'Standard escalation to human agent' },
          { text: 'Pre-built fintech response templates' },
          { text: 'Basic analytics dashboard' },
          { text: 'Email support (48h response)' },
        ],
      },
    ],
    bestFor: 'Startups and small fintech teams handling under 500 support tickets per month.',
  },
  {
    name: 'Growth',
    icon: '🚀',
    price: '€1,490',
    period: '/month',
    tagline: 'For scaling fintechs with high ticket volume and compliance requirements.',
    highlight: true,
    badge: 'Most popular',
    cta: 'Get started',
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
          { text: 'KYC + dispute resolution + transaction queries', bold: true },
          { text: 'Custom escalation rules & confidence thresholds' },
          { text: 'Multi-language support (20+ languages)' },
          { text: 'API access & webhook integrations' },
          { text: 'Advanced analytics & resolution reports' },
          { text: 'Priority chat support (8h response)' },
          { text: 'Everything in Starter' },
        ],
      },
    ],
    bestFor: 'Growing fintech companies expanding to new markets with complex support needs.',
  },
  {
    name: 'Enterprise',
    icon: '✦',
    price: 'Custom',
    period: '',
    tagline: 'Private infrastructure, higher limits, and tailored compliance workflows.',
    highlight: false,
    badge: null,
    cta: 'Contact us',
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
          { text: 'Full KYC, disputes, transactions & custom workflows', bold: true },
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
    bestFor: 'Regulated financial institutions, payment processors, and global fintech enterprises.',
  },
]

const comparisonRows = [
  { label: 'AI-resolved tickets / month', starter: '500', growth: '3,000', enterprise: 'Unlimited' },
  { label: 'Active support agents', starter: '1', growth: '3', enterprise: 'Unlimited' },
  { label: 'Communication channels', starter: '2', growth: '5', enterprise: 'All + custom' },
  { label: 'Audit log retention', starter: '30 days', growth: '90 days', enterprise: 'Unlimited' },
  { label: 'KYC query automation', starter: '✓', growth: '✓', enterprise: '✓' },
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

export default function Pricing() {
  return (
    <div className="pt-28">

      {/* Header */}
      <section className="px-4 pb-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-2xl font-bold uppercase text-gray-900">Pricing</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            Simple, predictable pricing.<br />No per-ticket surprises.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-500">
            Flat monthly plans based on your support volume. Your costs stay stable as you scale, no hidden fees, no per-resolution charges.
          </p>
          <p className="mt-3 text-sm text-gray-400">All prices in EUR, billed monthly. Annual plans available on request.</p>
        </div>
      </section>

      {/* Cards */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={[
                  'relative flex flex-col h-full rounded-2xl',
                  plan.highlight
                    ? 'border-2 border-indigo-600 bg-white shadow-xl'
                    : 'border border-gray-200 bg-white shadow-sm',
                ].join(' ')}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white">
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
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-lg">{plan.icon}</span>
                    <h2 className="text-lg font-bold text-gray-900">{plan.name}</h2>
                  </div>

                  {/* Price */}
                  <div className="mt-6 flex items-end gap-1">
                    <span className={['font-black leading-none text-gray-900', plan.price === 'Custom' ? 'text-4xl' : 'text-5xl'].join(' ')}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="mb-1 text-sm text-gray-400">{plan.period}</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{plan.tagline}</p>

                  {/* Feature groups */}
                  <div className="mt-8 flex flex-col gap-6 flex-1">
                    {plan.groups.map((group, gi) => (
                      <div key={gi}>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">{group.label}</p>
                        <ul className="space-y-2.5">
                          {group.features.map((f, fi) => (
                            <li key={fi} className="flex items-start gap-2.5">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                className={['mt-0.5 h-4 w-4 flex-shrink-0', plan.highlight ? 'text-indigo-600' : 'text-green-500'].join(' ')}>
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
                  <div className="mt-8 rounded-xl bg-gray-50 px-4 py-3">
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
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200',
                    ].join(' ')}
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
      <section className="px-4 pb-24 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-5xl pt-16">
          <div className="text-center mb-12">
            <p className="text-2xl font-bold uppercase text-gray-900">Compare</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {/* Table header */}
            <div className="grid grid-cols-4 border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div />
              <div className="text-center text-sm font-bold text-gray-700">Starter</div>
              <div className="text-center text-sm font-bold" style={{ color: '#214995' }}>Growth</div>
              <div className="text-center text-sm font-bold text-gray-700">Enterprise</div>
            </div>

            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className={['grid grid-cols-4 px-6 py-4', i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'].join(' ')}
              >
                <div className="text-sm font-bold text-gray-900">{row.label}</div>
                <div className="text-center text-sm text-gray-900">{row.starter}</div>
                <div className="text-center text-sm font-semibold text-gray-900">{row.growth}</div>
                <div className="text-center text-sm text-gray-900">{row.enterprise}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gray-900 px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">Not sure which plan fits?</h2>
          <p className="mt-4 text-base text-gray-400">
            Talk to us. We'll recommend the right plan based on your ticket volume, geography, and compliance requirements.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
          >
            Talk to sales
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  )
}
