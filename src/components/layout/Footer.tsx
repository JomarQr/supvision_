import { Link } from 'react-router-dom'

const columns = [
  {
    heading: 'Overview',
    links: [
      { label: 'How it works', to: '/' },
      { label: 'Features', to: '/support-agent' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Integrations', to: '/integrations' },
      { label: 'Security', to: '/roles/compliance-risk' },
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'Banking', to: '/industries/neobanks' },
      { label: 'Payments', to: '/industries/payments-processing' },
      { label: 'Web3', to: '/industries/crypto-web3' },
      { label: 'Insurance', to: '/industries/insurtech' },
      { label: 'Lending', to: '/industries/lending-credit' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', to: '/resources' },
      { label: 'Documentation', to: '/resources' },
      { label: 'Webinars', to: '/resources' },
      { label: 'Case studies', to: '/resources' },
      { label: 'Security', to: '/roles/compliance-risk' },
      { label: 'Status', to: '/resources' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Careers', to: '/about' },
      { label: 'For partners', to: '/contact' },
      { label: 'Press room', to: '/about' },
      { label: 'Contact us', to: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Compliance', to: '/roles/compliance-risk' },
      { label: 'Privacy policy', to: '/privacy-policy' },
      { label: 'Cookie policy', to: '/privacy-policy' },
      { label: 'Terms of use', to: '/privacy-policy' },
      { label: 'GDPR', to: '/privacy-policy' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#faf8f5' }}>
      {/* Nav columns */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr] gap-16">
          {/* Logo */}
          <div className="w-48">
            <Link to="/">
              <img src="/logo/logo_website.png" alt="SupVision" className="h-14 w-auto" />
            </Link>
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-900">WILARIUM OÜ</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-400">Harju maakond, Tallinn,<br />Kesklinna linnaosa,<br />Vesivärava tn 50, 10152</p>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-5 gap-8">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-900">
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm font-semibold text-gray-900 transition-colors hover:text-[#214995]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom cards */}
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Newsletter */}
          <div className="flex items-center justify-between gap-8 rounded-2xl px-8 py-8" style={{ backgroundImage: 'url(/bg/2e75cba1-8098-43e6-910e-00808d9daaa1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <p className="max-w-[16rem] text-lg font-semibold leading-snug text-white">
              Get our newsletter and stay up-to-date with the latest news
            </p>
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white pl-5 pr-1.5 py-1.5 text-sm font-semibold text-gray-900"
            >
              <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]" style={{ backgroundColor: '#214995' }} />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Contact us</span>
              <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Social */}
          <div className="flex items-center justify-between gap-8 rounded-2xl bg-indigo-100 px-8 py-8">
            <p className="max-w-[16rem] text-lg font-semibold leading-snug text-gray-900">
              Follow us on our social networks and don't miss out on anything
            </p>
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/supvision-ai/" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Telegram */}
              <a href="https://t.me/+447737124949" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/447737124949" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
              {/* Email */}
              <a href="mailto:info@supvision.ai" className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} SupVision. All rights reserved.
          </p>
          <span className="text-gray-300">·</span>
          <a href="mailto:info@supvision.ai" className="text-xs text-gray-400 transition-colors hover:text-gray-900">
            info@supvision.ai
          </a>
        </div>
      </div>
    </footer>
  )
}
