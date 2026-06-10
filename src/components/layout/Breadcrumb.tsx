import { Link, useLocation } from 'react-router-dom'

const LABELS: Record<string, string> = {
  'about': 'About',
  'contact': 'Contact',
  'pricing': 'Pricing',
  'support-agent': 'AI Support Agent',
  'kyc-onboarding': 'KYC & Onboarding',
  'dispute-resolution': 'Dispute Resolution',
  'escalation-rules': 'Escalation Rules',
  'multi-channel': 'Multi-Channel',
  'audit-logs': 'Audit Logs',
  'multi-language': 'Multi-Language',
  'integrations': 'Integrations',
  'for-whom': 'For Whom',
  'industries': 'Industries',
  'payments-processing': 'Payments Processing',
  'neobanks': 'Neobanks',
  'crypto-web3': 'Web3',
  'lending-credit': 'Lending & Credit',
  'insurtech': 'InsurTech',
  'roles': 'By Role',
  'head-of-support': 'Head of Support',
  'compliance-risk': 'Compliance & Risk',
  'operations-growth': 'Operations & Growth',
  'founders-csuite': 'Founders & C-Suite',
  'analytics': 'Analytics',
  'security': 'Security',
  'privacy-policy': 'Privacy Policy',
  'data-policy': 'Data Policy',
  'ifx': 'IFX Expo',
}

export default function Breadcrumb() {
  const { pathname } = useLocation()
  if (pathname === '/' || pathname === '/login') return null

  const segments = pathname.split('/').filter(Boolean)
  const crumbs = segments.map((seg, i) => ({
    label: LABELS[seg] ?? seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    path: '/' + segments.slice(0, i + 1).join('/'),
    isLast: i === segments.length - 1,
  }))

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 px-8 pb-3 pt-[72px] text-sm sm:px-10 lg:px-14"
    >
      <Link
        to="/"
        className="flex items-center gap-1 text-gray-400 transition-colors hover:text-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 flex-shrink-0">
          <path d="M8.543 2.232a.75.75 0 0 0-1.085 0l-5.25 5.5A.75.75 0 0 0 2.75 9H4v4.75c0 .414.336.75.75.75h2.5A.75.75 0 0 0 8 13.75v-3.5h1v3.5c0 .414.336.75.75.75h2.5A.75.75 0 0 0 13 13.75V9h1.25a.75.75 0 0 0 .543-1.268l-5.25-5.5Z" />
        </svg>
        <span className="hidden sm:inline">Home</span>
      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.path} className="flex items-center gap-1">
          <span className="text-gray-300">/</span>
          {crumb.isLast ? (
            <span className="font-medium text-gray-500">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="text-gray-400 transition-colors hover:text-gray-700">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
