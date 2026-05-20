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
      { label: 'Crypto & Web3', to: '/industries/crypto-web3' },
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
    <footer className="bg-gray-50">
      {/* Nav columns */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr] gap-16">
          {/* Logo */}
          <div className="w-48">
            <Link to="/">
              <img src="/logo/logo_website.png" alt="SupVision" className="h-14 w-auto" />
            </Link>
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
          <div className="flex items-center justify-between gap-8 rounded-2xl bg-gray-900 px-8 py-8">
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
