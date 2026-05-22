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
      { label: 'Analytics Dashboard', desc: 'Real-time visibility into bot vs human, team performance, and every trend', to: '/analytics', locked: false },
      { label: 'Coordinator Agent', desc: 'Multi-agent orchestration layer', locked: true },
    ],
  },
  {
    key: 'functionalities',
    label: 'Core Functionalities',
    items: [
      { label: 'Identity & Onboarding', desc: 'Automate identity verification and onboarding flows', to: '/kyc-onboarding' },
      { label: 'Dispute Resolution', desc: 'Resolve chargebacks and transaction disputes in real time', to: '/dispute-resolution' },
      { label: 'Escalation Rules', desc: 'Custom confidence thresholds and seamless human handoffs', to: '/escalation-rules' },
      { label: 'Multi-channel Support', desc: 'Email, chat, WhatsApp, Telegram, API - all in one', to: '/multi-channel' },
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
      { label: 'Knowledge base', desc: 'Confluence, Notion, Guru - policies your agent follows', to: '/integrations#knowledge' },
      { label: 'Identity providers', desc: 'Sumsub, Jumio, Onfido, Veriff and more', to: '/integrations#kyc' },
      { label: 'Collaboration', desc: 'Slack, Teams, Jira, Linear for escalation workflows', to: '/integrations#collaboration' },
      { label: 'CRM', desc: 'Salesforce, HubSpot, Pipedrive and more', to: '/integrations#crm' },
    ],
  },
]

// ── For whom dropdown data ───────────────────────────────────────────────────
const forWhomDropdown = {
  industries: [
    { label: 'Payments & Processing', desc: 'Dispute resolution, chargebacks, transaction queries', to: '/industries/payments-processing' },
    { label: 'Neobanks & Digital Banking', desc: 'Account support, identity verification, onboarding at scale', to: '/industries/neobanks' },
    { label: 'Web3', desc: 'Wallet issues, verification, volatile-volume support', to: '/industries/crypto-web3' },
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


// ── Header ───────────────────────────────────────────────────────────────────
export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  function handleLogoClick(e: React.MouseEvent) {
    e.preventDefault()
    if (pathname === '/') {
      window.scrollTo(0, 0)
    } else {
      navigate('/')
    }
  }

  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const check = () => {
      const el = document.elementFromPoint(window.innerWidth / 2, 90)
      if (!el) { setIsDark(false); return }
      let node: Element | null = el
      while (node && node !== document.body) {
        if (node.hasAttribute('data-nav-dark')) { setIsDark(true); return }
        node = node.parentElement
      }
      setIsDark(false)
    }
    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [pathname])

  const [overviewOpen, setOverviewOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('solutions')
  const [forWhomOpen, setForWhomOpen] = useState(false)
  const overviewTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const forWhomTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileOverviewOpen, setMobileOverviewOpen] = useState(false)
  const [mobileForWhomOpen, setMobileForWhomOpen] = useState(false)

  useEffect(() => {
    setOverviewOpen(false)
    setForWhomOpen(false)
    setNavHovered(false)
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!overviewOpen) setActiveCategory('solutions')
  }, [overviewOpen])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const open = (setter: (v: boolean) => void, timer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    if (timer.current) clearTimeout(timer.current)
    setter(true)
  }
  const close = (setter: (v: boolean) => void, timer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    timer.current = setTimeout(() => setter(false), 120)
  }

  const linkClass = `text-base font-semibold transition-colors duration-300 ${isDark ? 'text-white hover:!text-white/70' : 'text-gray-900 hover:!text-[#214995]'}`

  const activeCat = overviewCategories.find(c => c.key === activeCategory) ?? overviewCategories[0]

  const [navHovered, setNavHovered] = useState(false)

  return (
    <>
      {/* Page dimmer */}
      <div
        className="fixed inset-0 z-40 bg-black transition-opacity duration-300 pointer-events-none"
        style={{ opacity: navHovered ? 0.45 : 0 }}
      />

    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className="mx-auto max-w-7xl rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.25)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        }}
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => setNavHovered(false)}
      >
        {/* ── Desktop row ── */}
        <div className="flex h-16 items-center justify-between px-6 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-8">

          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="flex items-center">
            <img
              src="/Component 156 (3).png"
              alt="Logo"
              className="h-10 w-auto transition-all duration-300"
              style={isDark ? { filter: 'brightness(0) invert(1)' } : undefined}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-8 whitespace-nowrap">

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

                    {/* Left - category list */}
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

                    {/* Right - items */}
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
                          <span style={{ backgroundColor: '#214995', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <img src="/icons/pie-chart.png" alt="" style={{ width: '13px', height: '13px', display: 'block', objectFit: 'contain', filter: 'brightness(0) invert(1)', margin: 0, padding: 0 }} />
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
                          <span style={{ backgroundColor: '#214995', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" style={{ width: '14px', height: '14px', display: 'block' }}>
                              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
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

            <NavLink to="/pricing" end className={linkClass}>Pricing</NavLink>
            <NavLink to="/security" end className={linkClass}>Security</NavLink>

          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="https://platform.supvision.ai" target="_blank" rel="noopener noreferrer" className={linkClass}>Log in</a>
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full pl-5 pr-1.5 py-1.5 text-sm font-semibold text-white"
              style={{ backgroundColor: '#214995' }}
            >
              <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/20 transition-transform duration-500 ease-in-out group-hover:scale-[20]" />
              <span className="relative z-10">Book a Demo</span>
              <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex lg:hidden h-10 w-10 items-center justify-center rounded-xl transition-colors"
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Zm0 3.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              </svg>
            )}
          </button>

        </div>

        {/* ── Mobile menu ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 bg-white rounded-b-2xl overflow-y-auto max-h-[80vh]">
            <nav className="flex flex-col px-4 py-4 gap-1">

              <Link to="/about" className="rounded-xl px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50">About us</Link>

              {/* Overview accordion */}
              <div>
                <button
                  onClick={() => setMobileOverviewOpen(v => !v)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Overview
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`h-4 w-4 text-gray-400 transition-transform ${mobileOverviewOpen ? 'rotate-180' : ''}`}>
                    <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
                {mobileOverviewOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {overviewCategories.map(cat => (
                      <div key={cat.key}>
                        <p className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400">{cat.label}</p>
                        {cat.items.map(item => (
                          'locked' in item && item.locked ? (
                            <div key={item.label} className="flex items-center justify-between rounded-xl px-4 py-2.5 opacity-50">
                              <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                              <span className="text-[10px] font-semibold text-gray-400">Soon</span>
                            </div>
                          ) : (
                            <Link key={item.label} to={item.to!} className="block rounded-xl px-4 py-2.5 hover:bg-gray-50">
                              <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                              <p className="text-xs text-gray-400">{item.desc}</p>
                            </Link>
                          )
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* For whom accordion */}
              <div>
                <button
                  onClick={() => setMobileForWhomOpen(v => !v)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  For whom?
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`h-4 w-4 text-gray-400 transition-transform ${mobileForWhomOpen ? 'rotate-180' : ''}`}>
                    <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
                {mobileForWhomOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    <p className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400">By industry</p>
                    {forWhomDropdown.industries.map(item => (
                      <Link key={item.label} to={item.to} className="block rounded-xl px-4 py-2.5 hover:bg-gray-50">
                        <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-400">{item.desc}</p>
                      </Link>
                    ))}
                    <p className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400">By role</p>
                    {forWhomDropdown.roles.map(item => (
                      <Link key={item.label} to={item.to} className="block rounded-xl px-4 py-2.5 hover:bg-gray-50">
                        <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-400">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/pricing" className="rounded-xl px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50">Pricing</Link>
              <Link to="/security" className="rounded-xl px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50">Security</Link>

              <div className="mt-3 flex flex-col gap-3 border-t border-gray-100 pt-4">
                <a href="https://platform.supvision.ai" target="_blank" rel="noopener noreferrer" className="rounded-xl px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50">Log in</a>
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: '#214995' }}
                >
                  Book a Demo
                </Link>
              </div>

            </nav>
          </div>
        )}

      </div>
    </header>
    </>
  )
}
