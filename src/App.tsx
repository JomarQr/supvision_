import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

// Disable browser scroll restoration so we fully control scroll position
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

function PageTransition() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [opacity, setOpacity] = useState(0)
  const prevPath = useRef(pathname)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      const target = anchor.getAttribute('target')
      if (!href || target === '_blank') return
      if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('//')) return
      if (href.startsWith('#')) return
      const path = href.split('#')[0]
      if (path === pathname || path === '') return

      e.preventDefault()
      e.stopPropagation()
      requestAnimationFrame(() => {
        setOpacity(1)
        setTimeout(() => {
          // Scroll to top while screen is dark — user never sees it
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
          navigate(href)
        }, 700)
      })
    }
    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [pathname, navigate])

  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname
      const t = setTimeout(() => setOpacity(0), 50)
      return () => clearTimeout(t)
    }
  }, [pathname])

  return (
    <div
      className="fixed inset-0 z-[200] bg-black pointer-events-none"
      style={{ opacity, transition: 'opacity 0.6s ease' }}
    />
  )
}
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Pricing from '@/pages/Pricing'
import SupportAgent from '@/pages/SupportAgent'
import KycOnboarding from '@/pages/features/KycOnboarding'
import DisputeResolution from '@/pages/features/DisputeResolution'
import EscalationRules from '@/pages/features/EscalationRules'
import MultiChannel from '@/pages/features/MultiChannel'
import AuditLogs from '@/pages/features/AuditLogs'
import MultiLanguage from '@/pages/features/MultiLanguage'
import Integrations from '@/pages/Integrations'
import PaymentsProcessing from '@/pages/industries/PaymentsProcessing'
import Neobanks from '@/pages/industries/Neobanks'
import CryptoWeb3 from '@/pages/industries/CryptoWeb3'
import LendingCredit from '@/pages/industries/LendingCredit'
import InsurTech from '@/pages/industries/InsurTech'
import HeadOfSupport from '@/pages/roles/HeadOfSupport'
import ComplianceRisk from '@/pages/roles/ComplianceRisk'
import OperationsGrowth from '@/pages/roles/OperationsGrowth'
import FoundersCsuite from '@/pages/roles/FoundersCsuite'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <>
      <PageTransition />
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support-agent" element={<SupportAgent />} />
        <Route path="/kyc-onboarding" element={<KycOnboarding />} />
        <Route path="/dispute-resolution" element={<DisputeResolution />} />
        <Route path="/escalation-rules" element={<EscalationRules />} />
        <Route path="/multi-channel" element={<MultiChannel />} />
        <Route path="/audit-logs" element={<AuditLogs />} />
        <Route path="/multi-language" element={<MultiLanguage />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/industries/payments-processing" element={<PaymentsProcessing />} />
        <Route path="/industries/neobanks" element={<Neobanks />} />
        <Route path="/industries/crypto-web3" element={<CryptoWeb3 />} />
        <Route path="/industries/lending-credit" element={<LendingCredit />} />
        <Route path="/industries/insurtech" element={<InsurTech />} />
        <Route path="/roles/head-of-support" element={<HeadOfSupport />} />
        <Route path="/roles/compliance-risk" element={<ComplianceRisk />} />
        <Route path="/roles/operations-growth" element={<OperationsGrowth />} />
        <Route path="/roles/founders-csuite" element={<FoundersCsuite />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </>
  )
}
