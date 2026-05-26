import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { forWhomIndustries, forWhomRoles } from '../../data/forWhom'

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
  {
    key: 'analytics',
    label: 'Analytics',
    items: [
      { label: 'Analytics Dashboard', desc: 'Real-time visibility into bot vs human, team performance, and every trend', to: '/analytics' },
    ],
  },
  {
    key: 'security',
    label: 'Security',
    items: [
      { label: 'Security & Compliance', desc: 'GDPR, PCI DSS, NDA-protected — built for regulated industries', to: '/security' },
    ],
  },
]

const forWhomCategories = [
  {
    key: 'industries',
    label: 'By industry',
    items: forWhomIndustries.map(({ label, desc, to }) => ({ label, desc, to })),
  },
  {
    key: 'roles',
    label: 'By role',
    items: forWhomRoles.map(({ label, desc, to }) => ({ label, desc, to })),
  },
]


// ── Item icons ───────────────────────────────────────────────────────────────
const itemIcons: Record<string, JSX.Element> = {
  // Solutions
  'Support Agent': <img src="/support.png" alt="Support Agent" className="h-5 w-5 object-contain" />,
  'Sales Agent': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941" /></svg>,
  'Operations Agent': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>,
  'Analytics Agent': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
  'Coordinator Agent': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
  // Functionalities
  'Identity & Onboarding': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>,
  'Dispute Resolution': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 5.491Z" /></svg>,
  'Escalation Rules': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" /></svg>,
  'Multi-channel Support': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>,
  'Audit Logs': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" /></svg>,
  'Multi-language': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" /></svg>,
  // Integrations
  'Helpdesks': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" /></svg>,
  'Messaging channels': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /></svg>,
  'Knowledge base': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>,
  'Identity providers': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" /></svg>,
  'Collaboration': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>,
  'CRM': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /></svg>,
  // Analytics
  'Analytics Dashboard': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
  // Security
  'Security & Compliance': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
}

function ItemIcon({ label }: { label: string }) {
  const icon = itemIcons[label]
  return (
    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
      {icon ?? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      )}
    </div>
  )
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
  const [activeForWhomCategory, setActiveForWhomCategory] = useState('industries')
  const overviewTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const forWhomTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileScreen, setMobileScreen] = useState<'main' | 'overview' | 'forwhom'>('main')
  const [openOverviewCat, setOpenOverviewCat] = useState<string | null>(null)
  const toggleOverviewCat = (key: string) =>
    setOpenOverviewCat(prev => prev === key ? null : key)
  const [openForWhomCat, setOpenForWhomCat] = useState<string | null>(null)
  const toggleForWhomCat = (key: string) =>
    setOpenForWhomCat(prev => prev === key ? null : key)

  useEffect(() => {
    setOverviewOpen(false)
    setForWhomOpen(false)
    setNavHovered(false)
    setMobileMenuOpen(false)
    setMobileScreen('main')
    setOpenOverviewCat(null)
    setOpenForWhomCat(null)
  }, [pathname])

  useEffect(() => {
    if (!overviewOpen) setActiveCategory('solutions')
  }, [overviewOpen])

  useEffect(() => {
    if (!forWhomOpen) setActiveForWhomCategory('industries')
  }, [forWhomOpen])

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

  const activeCat = overviewCategories.find(c => c.key === activeCategory) ?? overviewCategories[0]
  const activeForWhomCat = forWhomCategories.find(c => c.key === activeForWhomCategory) ?? forWhomCategories[0]

  const [navHovered, setNavHovered] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up')
  const [isMobile, setIsMobile] = useState(false)
  const prevScrollRef = useRef(0)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY
      if (Math.abs(cur - prevScrollRef.current) > 3) {
        setScrollDir(cur > prevScrollRef.current ? 'down' : 'up')
        prevScrollRef.current = cur
      }
      setScrollTop(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const BANNER_H = 32
  const HEADER_H = 48
  const pastHeader = scrollTop > BANNER_H + HEADER_H
  const lightNavPaths = [
    '/about',
    '/contact',
    '/pricing',
    '/integrations',
    '/for-whom',
    '/kyc-onboarding',
    '/dispute-resolution',
    '/escalation-rules',
    '/multi-channel',
    '/audit-logs',
    '/multi-language',
    '/analytics',
    '/support-agent',
  ]
  const forceLightNav =
    lightNavPaths.includes(pathname) ||
    pathname.startsWith('/industries/') ||
    pathname.startsWith('/roles/')

  const overviewPaths = overviewCategories.flatMap(c =>
    c.items.filter(i => 'to' in i && i.to).map(i => (i as { to: string }).to.split('#')[0])
  )
  const isOverviewActive = overviewPaths.some(p => pathname === p || pathname.startsWith(p + '/'))
  const isForWhomActive = pathname.startsWith('/industries/') || pathname.startsWith('/roles/')

  const linkClass = `text-base font-semibold transition-all duration-200 text-gray-900 rounded-lg px-2 py-1 hover:shadow-[0_0_0_2px_#111827]`

  // Desktop: stays fixed, moves with banner
  const desktopTop = Math.max(0, BANNER_H - scrollTop)
  // Mobile: scrolls naturally (BANNER_H - scrollTop goes negative = off screen)
  // then snaps to top with white bg on scroll up
  const mobileShowSticky = pastHeader && scrollDir === 'up'
  const mobileTop = mobileShowSticky ? 0 : BANNER_H - scrollTop
  const headerTop = isMobile ? mobileTop : desktopTop
  const mobileHeroDark = pathname === '/'
  const mobileLogoInverted = !mobileShowSticky && !forceLightNav && mobileHeroDark
  const mobileMenuIconDark = mobileShowSticky || forceLightNav

  return (
    <>
      {/* Page dimmer */}
      <div
        className="fixed inset-0 z-40 bg-black transition-opacity duration-300 pointer-events-none hidden lg:block"
        style={{ opacity: navHovered ? 0.45 : 0 }}
      />

    <header
      className="fixed left-0 right-0 z-50 lg:px-6 lg:pt-3"
      style={{
        top: headerTop + 'px',
        transition: pastHeader ? 'top 0.25s ease' : 'none',
      }}
    >
      <div
        className={`mx-auto lg:max-w-7xl lg:rounded-2xl lg:border lg:shadow-[0_2px_16px_rgba(0,0,0,0.08)] ${isMobile && mobileShowSticky ? 'bg-white shadow-md' : 'bg-transparent'}`}
        style={{ backgroundColor: isMobile && !mobileShowSticky ? undefined : '#F4EFE9', borderColor: '#e8e2d9' }}
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => setNavHovered(false)}
      >
        {/* ── Desktop row ── */}
        <div className="flex h-12 items-center justify-between px-4 lg:h-16 lg:px-6 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-8">

          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="flex items-center">
            {/* Mobile: white at top, dark when sticky */}
            <img
              src="/Component 156 (3).png"
              alt="Logo"
              className="h-10 w-auto lg:hidden"
              style={mobileLogoInverted ? { filter: 'brightness(0) invert(1)' } : undefined}
            />
            {/* Desktop: always dark logo on beige nav */}
            <img src="/Component 156 (3).png" alt="Logo" className="hidden h-10 w-auto lg:block" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-8 whitespace-nowrap">

            <NavLink to="/" end className={({ isActive }) => `${linkClass}${isActive ? ' shadow-[0_0_0_2px_#111827]' : ''}`}>Home</NavLink>

            {/* Overview mega-menu */}
            <div className="relative" onMouseEnter={() => open(setOverviewOpen, overviewTimer)} onMouseLeave={() => close(setOverviewOpen, overviewTimer)}>
              <button className={`${linkClass}${overviewOpen || isOverviewActive ? ' shadow-[0_0_0_2px_#111827]' : ''}`}>Overview</button>

              {overviewOpen && (
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-8"
                  onMouseEnter={() => open(setOverviewOpen, overviewTimer)}
                  onMouseLeave={() => close(setOverviewOpen, overviewTimer)}
                >
                  <div className="flex w-[720px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

                    {/* Left - category list */}
                    <div className="flex w-52 flex-shrink-0 flex-col gap-0.5 border-r border-gray-100 p-3">
                      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Browse</p>
                      {overviewCategories.map(cat => (
                        <button
                          key={cat.key}
                          onMouseEnter={() => setActiveCategory(cat.key)}
                          className={[
                            'w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors',
                            activeCategory === cat.key
                              ? 'border border-gray-200 text-gray-900'
                              : 'border border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-800',
                          ].join(' ')}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Right - items */}
                    <div className="flex-1 p-4">
                      <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {activeCat.label}
                      </p>
                      <ul className="space-y-0.5">
                        {activeCat.items.map(item => (
                          <li key={item.label}>
                            {'locked' in item && item.locked ? (
                              <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 opacity-40 cursor-not-allowed">
                                <ItemIcon label={item.label} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                                  <p className="text-xs text-gray-400 truncate">{item.desc}</p>
                                </div>
                                <span className="flex-shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-400">
                                  Soon
                                </span>
                              </div>
                            ) : (
                              <Link
                                to={item.to!}
                                onClick={() => setOverviewOpen(false)}
                                className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors hover:border-gray-200"
                              >
                                <ItemIcon label={item.label} />
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                                  <p className="text-xs text-gray-400 truncate">{item.desc}</p>
                                </div>
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
              <button className={`${linkClass}${forWhomOpen || isForWhomActive ? ' shadow-[0_0_0_2px_#111827]' : ''}`}>For whom?</button>

              {forWhomOpen && (
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-8"
                  onMouseEnter={() => open(setForWhomOpen, forWhomTimer)}
                  onMouseLeave={() => close(setForWhomOpen, forWhomTimer)}
                >
                  <div className="flex w-[720px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

                    <div className="flex w-52 flex-shrink-0 flex-col gap-0.5 border-r border-gray-100 p-3">
                      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Browse</p>
                      {forWhomCategories.map(cat => (
                        <button
                          key={cat.key}
                          onMouseEnter={() => setActiveForWhomCategory(cat.key)}
                          className={[
                            'w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors',
                            activeForWhomCategory === cat.key
                              ? 'border border-gray-200 text-gray-900'
                              : 'border border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-800',
                          ].join(' ')}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex-1 p-4">
                      <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {activeForWhomCat.label}
                      </p>
                      <ul className="space-y-0.5">
                        {activeForWhomCat.items.map(item => (
                          <li key={item.label}>
                            <Link
                              to={item.to}
                              onClick={() => setForWhomOpen(false)}
                              className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors hover:border-gray-200"
                            >
                              <ItemIcon label={item.label} />
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                                <p className="text-xs text-gray-400 truncate">{item.desc}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              )}
            </div>

            <NavLink to="/pricing" end className={({ isActive }) => `${linkClass}${isActive ? ' shadow-[0_0_0_2px_#111827]' : ''}`}>Pricing</NavLink>
            <NavLink to="/about" end className={({ isActive }) => `${linkClass}${isActive ? ' shadow-[0_0_0_2px_#111827]' : ''}`}>About us</NavLink>

          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <NavLink to="/login" end className={linkClass}>Log in</NavLink>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 px-5 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#AAC6FF]"
            >
              Book a Demo!
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gray-900">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex lg:hidden h-10 w-10 items-center justify-center rounded-xl transition-colors"
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`h-7 w-7 ${mobileMenuIconDark ? 'text-gray-900' : 'text-white'} ${isDark ? 'lg:text-white' : 'lg:text-gray-900'}`}>
                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`h-7 w-7 ${mobileMenuIconDark ? 'text-gray-900' : 'text-white'} ${isDark ? 'lg:text-white' : 'lg:text-gray-900'}`}>
                <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Zm0 3.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              </svg>
            )}
          </button>

        </div>

      </div>
    </header>

    {/* ── Full-screen mobile nav overlay ── */}
    <div className={`fixed inset-0 z-[90] flex flex-col lg:hidden transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ backgroundColor: '#F4EFE9' }}>

      {/* Static top bar — never slides */}
      <div className="relative flex h-16 flex-shrink-0 items-center px-3" style={{ backgroundColor: '#F4EFE9' }}>
        {mobileScreen === 'main' ? (
          <a href="/" onClick={(e) => { handleLogoClick(e); setMobileMenuOpen(false) }}>
            <img src="/logo/logo_website.png" alt="SupVision" className="h-9 w-auto" />
          </a>
        ) : (
          <button onClick={() => setMobileScreen('main')} className="flex items-center gap-1 rounded-xl px-2 py-2 text-sm font-medium" style={{ color: '#008BFF' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gray-900">
              <path fillRule="evenodd" d="M9.78 11.78a.75.75 0 0 1-1.06 0L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 1.06L7.06 8l2.72 2.72a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        )}
        {mobileScreen !== 'main' && (
          <span className="absolute left-1/2 -translate-x-1/2 text-base text-gray-900">
            {mobileScreen === 'overview' ? 'Overview' : 'For whom?'}
          </span>
        )}
        <button onClick={() => setMobileMenuOpen(false)} className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5">
            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
          </svg>
        </button>
      </div>

      {/* Sliding content area */}
      <div className="relative flex-1 overflow-hidden">

        {/* Main nav */}
        <div className={`absolute inset-0 overflow-y-auto transition-transform duration-300 ease-in-out ${mobileScreen === 'main' ? 'translate-x-0' : '-translate-x-full'}`}>
          <nav className="flex flex-col gap-2 px-2 pt-1 pb-2">
            <Link to="/" className="rounded-lg px-7 py-5 text-lg font-medium text-gray-900" style={{ border: '1.5px solid #111827' }}>Home</Link>
            <button onClick={() => setMobileScreen('overview')} className="flex w-full items-center justify-between rounded-lg px-7 py-5 text-lg font-medium text-gray-900" style={{ border: '1.5px solid #111827' }}>
              Overview
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-gray-900">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </button>
            <button onClick={() => setMobileScreen('forwhom')} className="flex w-full items-center justify-between rounded-lg px-7 py-5 text-lg font-medium text-gray-900" style={{ border: '1.5px solid #111827' }}>
              For whom?
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-gray-900">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </button>
            <Link to="/pricing" className="rounded-lg px-7 py-5 text-lg font-medium text-gray-900" style={{ border: '1.5px solid #111827' }}>Pricing</Link>
            <Link to="/security" className="rounded-lg px-7 py-5 text-lg font-medium text-gray-900" style={{ border: '1.5px solid #111827' }}>Security</Link>
            <Link to="/about" className="rounded-lg px-7 py-5 text-lg font-medium text-gray-900" style={{ border: '1.5px solid #111827' }}>About us</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-4 inline-flex items-center gap-5 self-center rounded-full pl-5 pr-2 py-2 text-sm font-semibold text-white" style={{ backgroundColor: '#4E6EAB' }}>
              <span>Book a Demo!</span>
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center text-sm text-gray-900">
              Log in
            </Link>
          </nav>
        </div>

        {/* Overview content */}
        <div className={`absolute inset-0 overflow-y-auto transition-transform duration-300 ease-in-out ${mobileScreen === 'overview' ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col gap-2 px-2 pt-1 pb-2">
            {overviewCategories.map(cat => {
              const isOpen = openOverviewCat === cat.key
              return (
                <div key={cat.key} className="overflow-hidden rounded-2xl" style={{ border: '1.5px solid #111827' }}>
                  <button onClick={() => toggleOverviewCat(cat.key)} className="flex w-full items-center justify-between px-7 py-5 text-lg font-medium text-gray-900">
                    {cat.label}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`h-5 w-5 text-gray-900 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="mt-1 flex flex-col gap-0.5 px-2 pb-2">
                      {cat.items.map(item => (
                        'locked' in item && item.locked ? (
                          <div key={item.label} className="flex items-center justify-between rounded-xl px-5 py-2.5 opacity-50">
                            <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                            <span className="text-[10px] font-semibold text-gray-400">Soon</span>
                          </div>
                        ) : (
                          <Link key={item.label} to={item.to!} className="block rounded-xl px-5 py-2.5 border border-transparent hover:border-gray-200">
                            <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-400">{item.desc}</p>
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-4 inline-flex items-center gap-5 self-center rounded-full pl-5 pr-2 py-2 text-sm font-semibold text-white" style={{ backgroundColor: '#4E6EAB' }}>
              <span>Book a Demo!</span>
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center text-sm text-gray-900">
              Log in
            </Link>
          </nav>
        </div>

        {/* For whom content */}
        <div className={`absolute inset-0 overflow-y-auto transition-transform duration-300 ease-in-out ${mobileScreen === 'forwhom' ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col gap-2 px-2 pt-1 pb-2">
            {forWhomCategories.map(cat => {
              const isOpen = openForWhomCat === cat.key
              return (
                <div key={cat.key} className="overflow-hidden rounded-2xl" style={{ border: '1.5px solid #111827' }}>
                  <button onClick={() => toggleForWhomCat(cat.key)} className="flex w-full items-center justify-between px-7 py-5 text-lg font-medium text-gray-900">
                    {cat.label}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`h-5 w-5 text-gray-900 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="mt-1 flex flex-col gap-0.5 px-2 pb-2">
                      {cat.items.map(item => (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-xl px-5 py-2.5 border border-transparent hover:border-gray-200"
                        >
                          <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-400">{item.desc}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-4 inline-flex items-center gap-5 self-center rounded-full pl-5 pr-2 py-2 text-sm font-semibold text-white" style={{ backgroundColor: '#4E6EAB' }}>
              <span>Book a Demo!</span>
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center text-sm text-gray-900">
              Log in
            </Link>
          </nav>
        </div>

      </div>

    </div>
    </>
  )
}
