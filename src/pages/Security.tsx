import { type ReactNode, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

type ImageCertCard = {
  badge: string
  badgeAlt: string
  title: string
  desc: string
  badgeOversize?: boolean
}

type TextCertCard = {
  textBadge: string[]
  title: string
  desc: string
}

const canelaStyle = { fontFamily: "'Nohemi', sans-serif", fontWeight: 300 } as const
const accentPeach = '#E6B17E'

const certCards: (ImageCertCard | TextCertCard)[] = [
  {
    badge: '/gdpr.png',
    badgeAlt: 'GDPR Compliant',
    title: 'GDPR Compliance',
    desc: 'GDPR-compliant data handling, right-to-erasure, and data minimisation built into every workflow.',
    badgeOversize: false,
  },
  {
    badge: '/badge/image.png',
    badgeAlt: 'PCI DSS Compliant',
    title: 'PCI DSS Aligned',
    desc: 'No raw card data ever enters our system. Payment-sensitive fields are stripped and tokenised before AI processing.',
    badgeOversize: true,
  },
  {
    badge: '/nda.png',
    badgeAlt: 'NDA protected',
    title: 'NDA-Protected Data',
    desc: 'All client data is protected under a signed NDA. supVision staff cannot access your customer records by design.',
    badgeOversize: false,
  },
  {
    textBadge: ['SOC 2', 'Type II'],
    title: 'SOC 2 Type II Compliance',
    desc: 'Audited against rigorous trust principles for security, availability, and confidentiality. Available on Enterprise plans.',
  },
  {
    textBadge: ['ISO', '27001'],
    title: 'ISO 27001',
    desc: 'International framework for managing and improving information security. Infrastructure hosted in certified data centres.',
  },
]

const faqs = [
  { q: 'Can supVision employees access our customer data?', a: 'No. supVision operates on a zero-access architecture. No employee can read, export, or access your customer conversations, records, or PII. This is structural — not a policy setting.' },
  { q: 'Do you sign NDAs? Is our data legally protected?', a: 'Yes. All client data is protected under a mutual NDA at the start of every engagement. Our architecture makes it technically impossible for staff to access your records — the NDA formalises what the system already enforces.' },
  { q: 'Does supVision train AI models on our data?', a: 'Never. Your customer data is not used to train, fine-tune, or improve any AI model. All processing stays within your deployment boundary.' },
  { q: 'How is customer data protected in transit and at rest?', a: 'TLS 1.3 in transit and AES-256 at rest. No raw card data touches our system. Infrastructure is SOC 2-aligned and hosted in ISO 27001-certified data centres.' },
  { q: 'How does supVision handle GDPR right-to-erasure requests?', a: 'Submit a deletion request via dashboard or API and every record tied to that customer is purged within the required timeframe — automatically, with no manual steps.' },
  { q: 'Is supVision PCI DSS compliant?', a: 'Yes. supVision is PCI DSS aligned. PII and payment data is stripped before the AI layer. We provide documentation to support your own PCI audit.' },
]

function CertBadgeRing({
  children,
  oversize,
}: {
  children: ReactNode
  oversize?: boolean
}) {
  return (
    <div
      className={[
        'relative mb-6 flex items-center justify-center overflow-visible rounded-full border-2',
        oversize ? 'h-24 w-24' : 'h-28 w-28 p-4',
      ].join(' ')}
      style={{ borderColor: '#FB9A05', boxShadow: '0 0 20px rgba(251, 154, 5, 0.2)' }}
    >
      {children}
    </div>
  )
}

function SecurityFaqItem({
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
    <div className="overflow-hidden rounded-2xl border border-[#E5E2D8] bg-[#faf8f5]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
      >
        <span className="text-[15px] font-medium leading-snug text-gray-900">{item.q}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 flex-shrink-0 text-gray-900 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
      <div
        ref={bodyRef}
        className="px-5"
        style={{ maxHeight: '0px', opacity: 0, overflow: 'hidden', transition: 'max-height 0.35s ease, opacity 0.3s ease' }}
      >
        <p className="pb-5 text-sm leading-relaxed text-gray-500">{item.a}</p>
      </div>
    </div>
  )
}

export default function Security() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

  return (
    <div className="bg-[#faf8f5]">

      {/* Dark hero */}
      <section
        data-nav-dark
        className="px-4 pb-16 pt-28 text-center sm:px-6 sm:pb-20 lg:px-8 lg:pb-24 lg:pt-32"
        style={{ backgroundColor: '#141414' }}
      >
        <div className="mx-auto max-w-3xl">
          <h1
            className="text-[2rem] leading-tight sm:text-[2.75rem] lg:text-[3.5rem]"
            style={canelaStyle}
          >
            <span style={{ color: accentPeach }}>Privacy</span>
            <span className="text-white"> first.</span>
            <br />
            <span style={{ color: accentPeach }}>Security</span>
            <span className="text-white"> always.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            We never sell or share your data. supVision runs on zero-retention architecture — no supVision employee can read your customer conversations — and we align to SOC 2, ISO 27001, GDPR, and PCI DSS standards.
          </p>
        </div>
      </section>

      {/* Auditing + cert cards */}
      <section
        data-nav-dark
        className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28"
        style={{ backgroundColor: '#141414' }}
      >
        <div className="mx-auto max-w-4xl">
          <h2
            className="text-center text-[1.65rem] leading-snug text-white sm:text-[2.25rem] lg:text-[2.5rem]"
            style={canelaStyle}
          >
            We put our security to the test with live, independent auditing.
          </h2>
          <div className="mt-8 flex justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View our compliance report
            </Link>
          </div>

          <div className="mt-12 flex flex-col gap-5">
            {certCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col items-center rounded-3xl border border-gray-800 px-6 py-10 text-center sm:px-10 sm:py-12"
                style={{ backgroundColor: '#1c1c1e' }}
              >
                <CertBadgeRing oversize={'badge' in card && card.badgeOversize}>
                  {'badge' in card ? (
                    <img
                      src={card.badge}
                      alt={card.badgeAlt}
                      className={
                        card.badgeOversize
                          ? 'h-[8.5rem] w-auto max-w-none object-contain'
                          : 'max-h-full max-w-full object-contain'
                      }
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center px-2 text-center">
                      {card.textBadge.map((line) => (
                        <span key={line} className="text-sm font-bold leading-tight text-white sm:text-base">
                          {line}
                        </span>
                      ))}
                    </div>
                  )}
                </CertBadgeRing>
                <h3 className="text-xl leading-snug text-white sm:text-2xl" style={canelaStyle}>
                  {card.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-400">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy built-in — cream card */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div
          className="mx-auto max-w-4xl rounded-3xl px-6 py-10 text-center sm:px-10 sm:py-14"
          style={{ backgroundColor: '#FEF9E8' }}
        >
          <div className="mx-auto mb-8 flex max-w-xs justify-center">
            <img
              src="/Component 184 (1).png"
              alt=""
              className="h-40 w-auto object-contain sm:h-48"
            />
          </div>
          <h2
            className="text-[1.75rem] leading-tight text-gray-900 sm:text-[2.25rem]"
            style={canelaStyle}
          >
            Privacy{' '}
            <span className="relative inline-block">
              built-in
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 120 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 6C20 2 40 1 60 3s40 2 58-1"
                  stroke="#FB9A05"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-gray-700 sm:text-base">
            With supVision&apos;s zero-access architecture, customer conversations and PII are never visible to our team. PII is anonymised before AI processing, and every decision is logged for audit.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-gray-900 bg-transparent px-6 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900/5"
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-gray-900 bg-transparent px-6 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900/5"
            >
              Data Policy
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-4xl">
          <h2
            className="mb-8 text-[1.85rem] leading-tight text-gray-900 sm:text-[2.45rem]"
            style={canelaStyle}
          >
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((item, i) => (
              <SecurityFaqItem
                key={item.q}
                item={item}
                isOpen={faqOpen === i}
                onToggle={() => setFaqOpen(faqOpen === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-4xl rounded-2xl px-6 py-12 text-center sm:px-8 sm:py-16"
          style={{
            backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2
            className="text-[1.75rem] leading-tight text-white sm:text-[3.25rem]"
            style={canelaStyle}
          >
            Compliant by default. Audit-ready always.
          </h2>
          <p className="mt-4 text-sm text-blue-200 sm:text-base">
            Regulatory-grade AI support for fintech teams. Live in 3 days.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900"
            >
              <span>Book a demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0" style={{ color: '#214995' }}>
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
