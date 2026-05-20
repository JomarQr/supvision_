import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'

// ── Overview mega-menu data ──────────────────────────────────────────────────
const overviewCategories = [
  {
    key: 'solutions',
    label: 'Solutions',
    items: [
      { label: 'Support Agent', desc: 'AI-powered fintech customer support, 24/7', to: '/support-agent', locked: false },
      { label: 'Sales Agent', desc: 'Automated sales conversations at scale', locked: true },
      { label: 'Operations Agent', desc: 'Internal ops & workflow automation', locked: true },
      { label: 'Analytics Agent', desc: 'Data-driven insights from every interaction', locked: true },
      { label: 'Coordinator Agent', desc: 'Multi-agent orchestration layer', locked: true },
    ],
  },
  {
    key: 'functionalities',
    label: 'Core Functionalities',
    items: [
      { label: 'KYC & Onboarding', desc: 'Automate identity verification and onboarding flows', to: '/kyc-onboarding' },
      { label: 'Dispute Resolution', desc: 'Resolve chargebacks and transaction disputes in real time', to: '/dispute-resolution' },
      { label: 'Escalation Rules', desc: 'Custom confidence thresholds and seamless human handoffs', to: '/escalation-rules' },
      { label: 'Multi-channel Support', desc: 'Email, chat, WhatsApp, Telegram, API — all in one', to: '/multi-channel' },
      { label: 'Audit Logs', desc: 'Traceable decision trail, regulator-ready exports', to: '/audit-logs' },
      { label: 'Multi-language', desc: '50+ languages out of the box, zero localisation effort', to: '/multi-language' },
    ],
  },
  {
    key: 'integrations',
    label: 'Integrations',
    items: [
      { label: 'Helpdesks', desc: 'Zendesk, Intercom, Freshdesk, Salesforce Service Cloud', to: '/integrations#helpdesks' },
      { label: 'Messaging channels', desc: 'WhatsApp, Telegram, Email, live chat widget', to: '/integrations#messaging' },
      { label: 'Core banking', desc: 'Real-time account, transaction and card data', to: '/integrations#banking' },
      { label: 'KYC providers', desc: 'Sumsub, Jumio, Onfido, Veriff and more', to: '/integrations#kyc' },
      { label: 'Payment processors', desc: 'Stripe, Nuvei, Ecommpay, Adyen and more', to: '/integrations#payments' },
      { label: 'CRM', desc: 'Salesforce, HubSpot, Pipedrive and more', to: '/integrations#crm' },
    ],
  },
]

// ── For whom dropdown data ───────────────────────────────────────────────────
const forWhomDropdown = {
  industries: [
    { label: 'Payments & Processing', desc: 'Dispute resolution, chargebacks, transaction queries', to: '/industries/payments-processing' },
    { label: 'Neobanks & Digital Banking', desc: 'Account support, KYC, onboarding at scale', to: '/industries/neobanks' },
    { label: 'Crypto & Web3', desc: 'Wallet issues, verification, volatile-volume support', to: '/industries/crypto-web3' },
    { label: 'Lending & Credit', desc: 'Loan queries, repayment issues, eligibility checks', to: '/industries/lending-credit' },
    { label: 'InsurTech', desc: 'Claims triage, policy queries, compliance handling', to: '/industries/insurtech' },
  ],
  roles: [
    { label: 'Head of Support', desc: 'Cut queues, automate tier-1, free your agents', to: '/roles/head-of-support' },
    { label: 'Compliance & Risk', desc: 'Audit logs, escalation rules, regulator-ready exports', to: '/roles/compliance-risk' },
    { label: 'Operations & Growth', desc: 'Scale support without scaling headcount', to: '/roles/operations-growth' },
    { label: 'Founders & C-Suite', desc: 'Lower costs, faster resolution, measurable ROI', to: '/roles/founders-csuite' },
  ],
}

// ── Resources dropdown data ──────────────────────────────────────────────────
const resourcesDropdown = {
  learn: [
    { label: 'Blog', to: '/resources' },
    { label: 'Webinars', to: '/resources' },
    { label: 'White Papers', to: '/resources' },
    { label: 'Events', to: '/resources' },
    { label: 'Glossary', to: '/resources' },
  ],
  company: [
    { label: 'About us', to: '/about' },
    { label: 'Careers', to: '/about' },
    { label: 'supVision For Good', to: '/about' },
    { label: 'Press room', to: '/about' },
    { label: 'Compliance', to: '/' },
  ],
}

// ── Header ───────────────────────────────────────────────────────────────────
export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'

  function handleLogoClick(e: React.MouseEvent) {
    e.preventDefault()
    if (pathname === '/') {
      window.scrollTo(0, 0)
    } else {
      navigate('/')
    }
  }

  const [pinned, setPinned] = useState(false)
  const [visible, setVisible] = useState(false)

  const [overviewOpen, setOverviewOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('solutions')
  const [forWhomOpen, setForWhomOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  const pinnedRef = useRef(false)
  const lastScrollY = useRef(0)
  const overviewTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const forWhomTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resourcesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setOverviewOpen(false)
    setForWhomOpen(false)
    setResourcesOpen(false)
    setNavHovered(false)
  }, [pathname])

  useEffect(() => {
    if (!overviewOpen) setActiveCategory('solutions')
  }, [overviewOpen])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const prev = lastScrollY.current
      if (y < prev && y > 80 && !pinnedRef.current) {
        pinnedRef.current = true
        setPinned(true)
        requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
      } else if ((y > prev || y <= 10) && pinnedRef.current) {
        pinnedRef.current = false
        setVisible(false)
        setTimeout(() => setPinned(false), 300)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const open = (setter: (v: boolean) => void, timer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    if (timer.current) clearTimeout(timer.current)
    setter(true)
  }
  const close = (setter: (v: boolean) => void, timer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    timer.current = setTimeout(() => setter(false), 120)
  }

  const isLight = pinned
  const linkClass = [
    'text-base font-semibold transition-colors duration-300 hover:!text-[#214995]',
    isLight ? 'text-gray-900' : 'text-white group-hover:text-gray-900',
  ].join(' ')

  const activeCat = overviewCategories.find(c => c.key === activeCategory) ?? overviewCategories[0]

  const [navHovered, setNavHovered] = useState(false)

  return (
    <>
      {/* Page dimmer */}
      <div
        className="fixed inset-0 z-40 bg-black transition-opacity duration-300 pointer-events-none"
        style={{ opacity: navHovered ? 0.45 : 0 }}
      />
    <header
      className={[
        pinned ? 'fixed' : 'absolute',
        'top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 lg:px-8 transition-transform duration-300',
        pinned ? (visible ? 'translate-y-0' : '-translate-y-full') : 'translate-y-0',
      ].join(' ')}
    >
      <div
        className={[
          'group mx-auto max-w-7xl rounded-2xl transition-all duration-300',
          isLight
            ? 'bg-white shadow-lg'
            : isHome
              ? 'bg-transparent hover:bg-white hover:shadow-lg'
              : 'bg-gray-900/95 backdrop-blur-sm hover:bg-white hover:shadow-lg',
        ].join(' ')}
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => setNavHovered(false)}
      >
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-8 px-6">

          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="flex items-center">
            <img
              src="/logo/Component 177 (3).png"
              alt="Logo"
              className="h-10 w-auto transition-all duration-300"
              style={{ filter: (isLight || navHovered) ? 'brightness(0)' : 'none' }}
            />
          </a>

          {/* Nav */}
          <nav className="flex items-center justify-center gap-8 whitespace-nowrap">

            {/* About us */}
            <NavLink to="/about" end className={linkClass}>About us</NavLink>

            {/* Overview mega-menu */}
            <div className="relative" onMouseEnter={() => open(setOverviewOpen, overviewTimer)} onMouseLeave={() => close(setOverviewOpen, overviewTimer)}>
              <button className={linkClass} style={overviewOpen ? { color: '#214995' } : undefined}>Overview</button>

              {overviewOpen && (
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-8"
                  onMouseEnter={() => open(setOverviewOpen, overviewTimer)}
                  onMouseLeave={() => close(setOverviewOpen, overviewTimer)}
                >
                  <div className="flex w-[680px] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-100">

                    {/* Left — category list */}
                    <div className="flex w-56 flex-shrink-0 flex-col gap-1 bg-gray-50 p-4">
                      {overviewCategories.map(cat => (
                        <button
                          key={cat.key}
                          onMouseEnter={() => setActiveCategory(cat.key)}
                          className={[
                            'w-full rounded-xl px-4 py-3 text-left text-xs font-bold uppercase tracking-widest transition-colors',
                            activeCategory === cat.key
                              ? 'bg-white text-gray-900 shadow-sm'
                              : 'text-gray-400 hover:text-gray-700',
                          ].join(' ')}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Right — items */}
                    <div className="flex-1 p-5">
                      <ul className="space-y-0.5">
                        {activeCat.items.map(item => (
                          <li key={item.label}>
                            {'locked' in item && item.locked ? (
                              <div className="flex items-center justify-between rounded-xl px-3 py-2.5 opacity-50 cursor-not-allowed">
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                                  <p className="text-xs text-gray-400">{item.desc}</p>
                                </div>
                                <span className="ml-3 flex-shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-400">
                                  Coming soon
                                </span>
                              </div>
                            ) : (
                              <Link
                                to={item.to!}
                                onClick={() => setOverviewOpen(false)}
                                className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-blue-50"
                              >
                                <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                                <p className="text-xs text-gray-400">{item.desc}</p>
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* For whom? */}
            <div className="relative" onMouseEnter={() => open(setForWhomOpen, forWhomTimer)} onMouseLeave={() => close(setForWhomOpen, forWhomTimer)}>
              <button className={linkClass} style={forWhomOpen ? { color: '#214995' } : undefined}>For whom?</button>

              {forWhomOpen && (
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-8"
                  onMouseEnter={() => open(setForWhomOpen, forWhomTimer)}
                  onMouseLeave={() => close(setForWhomOpen, forWhomTimer)}
                >
                  <div className="w-[640px] rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100">
                    <div className="grid grid-cols-2 divide-x divide-gray-100">
                      <div className="min-w-0 pr-6">
                        <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                          <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                            <img src="/icons/pie-chart.png" alt="" style={{ width: '10px', height: '10px', display: 'block', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                          </span>
                          By industry
                        </p>
                        <ul className="space-y-0.5">
                          {forWhomDropdown.industries.map(item => (
                            <li key={item.label}>
                              <Link to={item.to} onClick={() => setForWhomOpen(false)} className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-blue-50">
                                <p className="text-sm font-semibold text-gray-900 truncate">{item.label}</p>
                                <p className="text-xs text-gray-400 whitespace-normal break-words">{item.desc}</p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="min-w-0 pl-6">
                        <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                          <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                            <img src="/icons/user (2).png" alt="" style={{ width: '10px', height: '10px', display: 'block', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                          </span>
                          By role
                        </p>
                        <ul className="space-y-0.5">
                          {forWhomDropdown.roles.map(item => (
                            <li key={item.label}>
                              <Link to={item.to} onClick={() => setForWhomOpen(false)} className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-blue-50">
                                <p className="text-sm font-semibold text-gray-900 truncate">{item.label}</p>
                                <p className="text-xs text-gray-400 whitespace-normal break-words">{item.desc}</p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pricing */}
            <NavLink to="/pricing" end className={linkClass}>Pricing</NavLink>

            {/* Resources */}
            <div className="relative" onMouseEnter={() => open(setResourcesOpen, resourcesTimer)} onMouseLeave={() => close(setResourcesOpen, resourcesTimer)}>
              <button className={linkClass} style={resourcesOpen ? { color: '#214995' } : undefined}>Resources</button>

              {resourcesOpen && (
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-8"
                  onMouseEnter={() => open(setResourcesOpen, resourcesTimer)}
                  onMouseLeave={() => close(setResourcesOpen, resourcesTimer)}
                >
                  <div className="w-[540px] rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100">
                    <div className="grid grid-cols-2 divide-x divide-gray-100">
                      <div className="pr-6">
                        <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                              <path d="M7.702 1.368C7.901.845 8.599.845 8.798 1.368l1.515 4.121a.75.75 0 0 0 .666.482l4.388.222c.54.027.76.724.344 1.072L12.15 9.37a.75.75 0 0 0-.24.772l1.027 4.268c.132.55-.44.985-.899.683l-3.726-2.428a.75.75 0 0 0-.824 0L3.762 15.09c-.459.302-1.031-.133-.899-.683l1.027-4.268a.75.75 0 0 0-.24-.772L.289 7.265c-.416-.348-.196-1.045.344-1.072l4.388-.222a.75.75 0 0 0 .666-.482L7.702 1.368Z" />
                            </svg>
                          </span>
                          Learn
                        </p>
                        <ul className="space-y-1">
                          {resourcesDropdown.learn.map(item => (
                            <li key={item.label}>
                              <Link to={item.to} onClick={() => setResourcesOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-blue-50">
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pl-6">
                        <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                              <path fillRule="evenodd" d="M4 1.75A2.25 2.25 0 0 0 1.75 4v1.223a.75.75 0 0 0 .626.74C3.638 6.135 4.5 6.934 4.5 8c0 1.066-.862 1.865-2.124 2.037a.75.75 0 0 0-.626.74V12c0 1.243 1.007 2.25 2.25 2.25h8.5A2.25 2.25 0 0 0 14.75 12v-1.223a.75.75 0 0 0-.626-.74C12.862 9.865 12 9.066 12 8c0-1.066.862-1.865 2.124-2.037a.75.75 0 0 0 .626-.74V4A2.25 2.25 0 0 0 12.5 1.75h-8.5Z" clipRule="evenodd" />
                            </svg>
                          </span>
                          Company
                        </p>
                        <ul className="space-y-1">
                          {resourcesDropdown.company.map(item => (
                            <li key={item.label}>
                              <Link to={item.to} onClick={() => setResourcesOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-blue-50">
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </nav>

          {/* Log in + CTA */}
          <div className="flex items-center gap-4">
            <a href="https://platform.supvision.ai" target="_blank" rel="noopener noreferrer" className={linkClass}>Log in</a>
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full pl-5 pr-1.5 py-1.5 text-sm font-semibold text-white"
              style={{ backgroundColor: '#214995' }}
            >
              <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/20 transition-transform duration-500 ease-in-out group-hover:scale-[20]" />
              <span className="relative z-10">Let's chat!</span>
              <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>

        </div>
      </div>
    </header>
    </>
  )
}
