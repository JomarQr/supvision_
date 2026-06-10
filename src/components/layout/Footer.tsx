import { Link } from 'react-router-dom'

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Support Agent', to: '/support-agent' },
      { label: 'Integrations', to: '/integrations' },
      { label: 'Analytics', to: '/analytics' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    heading: 'Features',
    links: [
      { label: 'KYC Onboarding', to: '/kyc-onboarding' },
      { label: 'Dispute Resolution', to: '/dispute-resolution' },
      { label: 'Escalation Rules', to: '/escalation-rules' },
      { label: 'Multi-Channel', to: '/multi-channel' },
      { label: 'Audit Logs', to: '/audit-logs' },
      { label: 'Multi-Language', to: '/multi-language' },
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'Payments', to: '/industries/payments-processing' },
      { label: 'Digital Banking', to: '/industries/neobanks' },
      { label: 'Web3', to: '/industries/crypto-web3' },
      { label: 'Lending', to: '/industries/lending-credit' },
      { label: 'InsurTech', to: '/industries/insurtech' },
    ],
  },
  {
    heading: 'By Role',
    links: [
      { label: 'Head of Support', to: '/roles/head-of-support' },
      { label: 'Compliance & Risk', to: '/roles/compliance-risk' },
      { label: 'Operations & Growth', to: '/roles/operations-growth' },
      { label: 'Founders / C-Suite', to: '/roles/founders-csuite' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Security', to: '/security' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Data Policy', to: '/data-policy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
]

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Data Policy', to: '/data-policy' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Security', to: '/security' },
]

function SocialLinks({ compact = false }: { compact?: boolean }) {
  const btn = compact ? 'h-9 w-9' : 'h-11 w-11'
  const icon = compact ? 'h-4 w-4' : 'h-5 w-5'
  return (
    <>
      <a href="https://www.linkedin.com/company/supvision-ai/" target="_blank" rel="noopener noreferrer" className={`flex ${btn} items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className={icon}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      <a href="https://t.me/+447737124949" target="_blank" rel="noopener noreferrer" className={`flex ${btn} items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className={icon}>
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      </a>
      <a href="https://wa.me/447737124949" target="_blank" rel="noopener noreferrer" className={`flex ${btn} items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className={icon}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
      <a href="mailto:info@supvision.ai" className={`flex ${btn} items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={icon}>
          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
        </svg>
      </a>
    </>
  )
}

function DesktopColumn({ col }: { col: typeof columns[number] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{col.heading}</p>
      <ul className="mt-4 space-y-3">
        {col.links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="text-sm font-medium text-gray-900 transition-colors hover:text-[#214995]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MobileColumn({
  col,
  dimHeading,
}: {
  col: typeof columns[number]
  dimHeading?: boolean
}) {
  return (
    <div>
      <p
        className="leading-none"
        style={{
          fontFamily: "'Nohemi', sans-serif",
          fontWeight: 300,
          fontSize: '2rem',
          color: dimHeading ? '#9E9890' : '#7A756C',
        }}
      >
        {col.heading}
      </p>
      <ul className="mt-3 space-y-1.5">
        {col.links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="text-sm font-semibold text-gray-900 transition-colors hover:text-[#214995]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#faf8f5' }}>
      <div className="mx-auto max-w-7xl px-5 pt-12 pb-0 sm:px-6 lg:px-8 lg:pt-16 lg:pb-0">

        {/* ── Mobile ── */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            {/* Row 1 */}
            <MobileColumn col={columns[0]} />
            <MobileColumn col={columns[4]} dimHeading />
            {/* Row 2 */}
            <MobileColumn col={columns[2]} />
            <MobileColumn col={columns[3]} dimHeading />
            {/* Row 3 — Features, full width */}
            <div className="col-span-2">
              <MobileColumn col={columns[1]} />
            </div>
          </div>

          <Link to="/" className="mt-10 block">
            <img loading="lazy" src="/logo/logo_website.webp" alt="SupVision" className="h-auto w-full max-w-[220px] object-contain" />
          </Link>

          <div className="mt-6 flex items-start justify-between gap-4">
            <div className="flex shrink-0 items-center gap-2.5">
              <SocialLinks compact />
            </div>
            <div className="min-w-0 text-right text-xs leading-snug">
              <p className="font-semibold text-gray-900">WILARIUM OÜ</p>
              <p className="mt-1 text-gray-400">Harju maakond, Tallinn,</p>
              <p className="text-gray-400">Kesklinna linnaosa, Vesivärava tn 50, 10152</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 pb-8 text-xs font-semibold text-gray-400">
            <span className="whitespace-nowrap text-gray-500">© {new Date().getFullYear()} SupVision</span>
            {legalLinks.map((link) => (
              <Link key={link.label} to={link.to} className="whitespace-nowrap hover:text-gray-900 transition-colors">
                {link.label}
              </Link>
            ))}
            <a href="mailto:info@supvision.ai" className="whitespace-nowrap hover:text-gray-900 transition-colors">
              info@supvision.ai
            </a>
          </div>
        </div>

        {/* ── Desktop ── */}
        <div className="hidden lg:grid lg:grid-cols-[180px_1fr] lg:gap-16">
          {/* Left: logo + address */}
          <div>
            <Link to="/">
              <img loading="lazy" src="/logo/logo_website.webp" alt="SupVision" className="h-14 w-auto" />
            </Link>
            <div className="mt-5">
              <p className="text-xs font-semibold text-gray-900">WILARIUM OÜ</p>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-400">
                Harju maakond, Tallinn,<br />Kesklinna linnaosa,<br />Vesivärava tn 50, 10152
              </p>
            </div>
          </div>

          {/* Right: 5 columns */}
          <div className="grid grid-cols-5 gap-6">
            {columns.map((col) => (
              <DesktopColumn key={col.heading} col={col} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar / CTA cards — desktop only ── */}
      <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-6 lg:px-8">
        <div className="mt-12 hidden gap-4 lg:grid lg:grid-cols-2">
          {/* Book a demo card */}
          <div
            className="flex items-center justify-between gap-8 rounded-2xl px-8 py-8"
            style={{ backgroundImage: 'url(/bg/2e75cba1-8098-43e6-910e-00808d9daaa1.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <p className="max-w-[18rem] text-lg font-semibold leading-snug text-white">
              See supVision live — book a 30-min walkthrough with our team
            </p>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-gray-900 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#F97316] hover:border-[#F97316] hover:text-white"
            >
              Book a demo
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {/* Social card */}
          <div className="flex items-center justify-between gap-8 rounded-2xl px-8 py-8" style={{ backgroundColor: '#EDE8DF' }}>
            <p className="max-w-[16rem] text-lg font-semibold leading-snug text-gray-900">
              Follow us and stay in the loop
            </p>
            <div className="flex shrink-0 items-center gap-3">
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Copyright row — desktop */}
        <div className="mt-6 hidden items-center gap-4 lg:flex">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} SupVision. All rights reserved.</p>
          <span className="text-gray-300">·</span>
          {legalLinks.map((link, i) => (
            <span key={link.label} className="flex items-center gap-4">
              <Link to={link.to} className="text-xs text-gray-400 transition-colors hover:text-gray-900">
                {link.label}
              </Link>
              {i < legalLinks.length - 1 && <span className="text-gray-300">·</span>}
            </span>
          ))}
          <span className="text-gray-300">·</span>
          <a href="mailto:info@supvision.ai" className="text-xs text-gray-400 transition-colors hover:text-gray-900">
            info@supvision.ai
          </a>
        </div>
      </div>
    </footer>
  )
}
