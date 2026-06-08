import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'
import PageMeta from '../components/PageMeta'
import cardExchangeAnim from '../assets/icons-colored/doodle-color-60-card-exchange-hover-pinch.json'
import bankBranchAnim from '../assets/icons-colored/doodle-color-636-bank-branch-hover-roll.json'
import hubNetworkAnim from '../assets/icons-colored/doodle-color-340-hub-network-hover-pinch.json'
import loanAnim from '../assets/icons-colored/doodle-color-416-loan-hover-pinch.json'
import shieldAnim from '../assets/icons-colored/doodle-color-14-shield-security-hover-pinch.json'

const canelaStyle = { fontFamily: "'Nohemi', sans-serif", fontWeight: 300 } as const

const INDUSTRIES = [
  {
    label: 'Payments & Processing',
    slug: 'payments-processing',
    to: '/industries/payments-processing',
    icon: cardExchangeAnim,
    color: '#E9F3FB',
    badge: 'High-volume disputes',
    desc: 'Payment companies handle some of the highest-stakes customer support in fintech. supVision resolves dispute and chargeback queries in real time, with full transaction context — before they escalate.',
    highlights: [
      'Automated chargeback & dispute resolution',
      'Real-time transaction status — no agent needed',
      'PCI DSS aligned, no raw card data stored',
    ],
    metric: { value: '<2 min', label: 'median dispute resolution' },
  },
  {
    label: 'Digital Banking',
    slug: 'neobanks',
    to: '/industries/neobanks',
    icon: bankBranchAnim,
    color: '#EAF4EE',
    badge: 'Account & onboarding',
    desc: 'Neobanks and digital-first banks deal with identity verification, account queries, and onboarding at scale. supVision automates tier-1 support while staying regulator-ready.',
    highlights: [
      'KYC & onboarding query automation',
      'Account status, limits, and block resolution',
      'Escalation rules built for FCA / PSD2 compliance',
    ],
    metric: { value: '85%', label: 'of onboarding queries resolved by AI' },
  },
  {
    label: 'Web3 & Crypto',
    slug: 'crypto-web3',
    to: '/industries/crypto-web3',
    icon: hubNetworkAnim,
    color: '#F0ECFB',
    badge: 'Volatile volume',
    desc: 'Crypto platforms see support demand spike unpredictably. Wallet issues, verification queues, and volatile-volume events need support that scales instantly — supVision handles it without extra headcount.',
    highlights: [
      'Wallet access and verification support at scale',
      'Handles volume spikes without emergency hiring',
      '24/7 multilingual coverage across time zones',
    ],
    metric: { value: '10×', label: 'faster support during market events' },
  },
  {
    label: 'Lending & Credit',
    slug: 'lending-credit',
    to: '/industries/lending-credit',
    icon: loanAnim,
    color: '#FDF4E7',
    badge: 'Loan & repayment queries',
    desc: 'Lending platforms generate repetitive, high-stakes queries around eligibility, repayment, and collections. supVision handles tier-1 with full loan context and smooth escalation for sensitive cases.',
    highlights: [
      'Loan status and eligibility queries automated',
      'Repayment and hardship case routing',
      'Audit-ready conversation logs for regulators',
    ],
    metric: { value: '91%', label: 'tier-1 lending queries handled by AI' },
  },
  {
    label: 'InsurTech',
    slug: 'insurtech',
    to: '/industries/insurtech',
    icon: shieldAnim,
    color: '#FDE9E9',
    badge: 'Claims & policy',
    desc: 'Insurance support is compliance-heavy and emotionally sensitive. supVision triages claims, answers policy queries, and escalates edge cases — with a tone calibrated for high-stakes interactions.',
    highlights: [
      'Claims triage and first-notice-of-loss automation',
      'Policy query resolution with document context',
      'Compliant escalation for regulated claims',
    ],
    metric: { value: '3 days', label: 'average onboarding to live' },
  },
]

const SHARED_METRICS = [
  { value: '93%', label: 'Average tier-1 resolution rate across all verticals' },
  { value: '50+', label: 'Languages supported out of the box' },
  { value: '3 days', label: 'Typical time from sign-up to live support' },
  { value: '24/7', label: 'Coverage with no staffing overhead' },
]

function IndustryCard({ ind, idx }: { ind: typeof INDUSTRIES[number]; idx: number }) {
  const [cardHovered, setCardHovered] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)
  const lottieRef = useRef<any>(null)

  return (
    <Link
      to={ind.to}
      data-reveal
      className="block overflow-hidden rounded-3xl bg-white cursor-pointer transition-shadow duration-300"
      style={{ boxShadow: cardHovered ? '0 12px 48px rgba(0,0,0,0.14)' : '0 4px 32px rgba(0,0,0,0.07)' }}
      onMouseEnter={() => { setCardHovered(true); lottieRef.current?.goToAndPlay(0, true) }}
      onMouseLeave={() => { setCardHovered(false); lottieRef.current?.goToAndStop(0, true) }}
    >
      <div className={`flex flex-col lg:flex-row ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

        {/* Icon panel */}
        <div
          className="flex flex-shrink-0 items-center justify-center lg:w-[420px]"
          style={{ backgroundColor: ind.color, minHeight: '280px' }}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={ind.icon}
            autoplay={false}
            loop={false}
            style={{ width: 200, height: 200 }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-8 lg:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                {ind.badge}
              </span>
            </div>
            <h2 className="mt-3 text-2xl leading-tight text-gray-900 lg:text-3xl" style={canelaStyle}>
              {ind.label}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500 lg:text-base">{ind.desc}</p>
            <ul className="mt-5 space-y-2">
              {ind.highlights.map(h => (
                <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#214995" className="mt-0.5 h-4 w-4 flex-shrink-0">
                    <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">
            <div>
              <p className="text-2xl font-bold text-gray-900" style={canelaStyle}>{ind.metric.value}</p>
              <p className="text-xs text-gray-400">{ind.metric.label}</p>
            </div>
            <span
              className="inline-flex items-center gap-2 rounded-full border border-gray-900 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors"
              style={btnHovered ? { backgroundColor: '#F97316', borderColor: '#F97316', color: '#fff' } : {}}
              onMouseEnter={e => { e.preventDefault(); e.stopPropagation(); setBtnHovered(true) }}
              onMouseLeave={e => { e.stopPropagation(); setBtnHovered(false) }}
            >
              Explore {ind.label}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function Industries() {
  return (
    <div className="min-h-screen pt-0" style={{ backgroundColor: '#faf8f5' }}>
      <PageMeta
        title="Industries — supVision"
        description="AI-powered customer support built for fintech verticals — payments, digital banking, crypto, lending, and insurtech. Industry-specific workflows out of the box."
        path="/industries"
      />

      {/* Hero */}
      <section className="px-4 pb-10 pt-10 text-center sm:px-6 lg:pb-16 lg:pt-16">
        <div data-reveal className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Industries</p>
          <h1
            className="mt-4 text-[2rem] leading-tight text-gray-900 sm:text-[3rem]"
            style={canelaStyle}
          >
            Built for your vertical,<br className="hidden sm:block" /> not retrofitted to it
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-500">
            Generic support tools need months of customisation to handle fintech compliance, disputes, and regulated workflows. supVision ships with industry-specific logic already in place.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: '#111827' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F97316')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#111827')}
            >
              Book a demo
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              to="/for-whom"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-500 hover:text-gray-900"
            >
              Browse by role
            </Link>
          </div>
        </div>
      </section>

      {/* Shared metrics bar */}
      <section data-reveal className="border-y border-gray-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 lg:grid-cols-4">
          {SHARED_METRICS.map(m => (
            <div key={m.value} className="text-center">
              <p className="text-2xl font-bold text-gray-900 lg:text-3xl" style={canelaStyle}>{m.value}</p>
              <p className="mt-1 text-xs leading-snug text-gray-500">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industry cards */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-8">
          {INDUSTRIES.map((ind, idx) => (
            <IndustryCard key={ind.slug} ind={ind} idx={idx} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div
          data-reveal
          className="mx-auto max-w-4xl overflow-hidden rounded-3xl px-8 py-16 text-center"
          style={{ backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Not sure where you fit?</p>
          <h2
            className="mt-4 text-[1.75rem] leading-tight text-white sm:text-[2.5rem]"
            style={canelaStyle}
          >
            Tell us your stack and ticket mix
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-blue-100">
            We'll map supVision to your vertical and team in one call — no generic demo, no slides.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
            >
              Book a demo
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              to="/for-whom"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              Browse by role
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
