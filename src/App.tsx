import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

// Disable browser scroll restoration so we fully control scroll position
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

import Layout from '@/components/layout/Layout'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const Pricing = lazy(() => import('@/pages/Pricing'))
const SupportAgent = lazy(() => import('@/pages/SupportAgent'))
const KycOnboarding = lazy(() => import('@/pages/features/KycOnboarding'))
const DisputeResolution = lazy(() => import('@/pages/features/DisputeResolution'))
const EscalationRules = lazy(() => import('@/pages/features/EscalationRules'))
const MultiChannel = lazy(() => import('@/pages/features/MultiChannel'))
const AuditLogs = lazy(() => import('@/pages/features/AuditLogs'))
const MultiLanguage = lazy(() => import('@/pages/features/MultiLanguage'))
const Integrations = lazy(() => import('@/pages/Integrations'))
const ForWhom = lazy(() => import('@/pages/ForWhom'))
const Industries = lazy(() => import('@/pages/Industries'))
const PaymentsProcessing = lazy(() => import('@/pages/industries/PaymentsProcessing'))
const Neobanks = lazy(() => import('@/pages/industries/Neobanks'))
const CryptoWeb3 = lazy(() => import('@/pages/industries/CryptoWeb3'))
const LendingCredit = lazy(() => import('@/pages/industries/LendingCredit'))
const InsurTech = lazy(() => import('@/pages/industries/InsurTech'))
const HeadOfSupport = lazy(() => import('@/pages/roles/HeadOfSupport'))
const ComplianceRisk = lazy(() => import('@/pages/roles/ComplianceRisk'))
const OperationsGrowth = lazy(() => import('@/pages/roles/OperationsGrowth'))
const FoundersCsuite = lazy(() => import('@/pages/roles/FoundersCsuite'))
const Analytics = lazy(() => import('@/pages/Analytics'))
const Security = lazy(() => import('@/pages/Security'))
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'))
const DataPolicy = lazy(() => import('@/pages/DataPolicy'))
const Login = lazy(() => import('@/pages/Login'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const IFXExpo = lazy(() => import('@/pages/IFXExpo'))

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Routes>
        <Route path="/login" element={<Login />} />
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
          <Route path="/for-whom" element={<ForWhom />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/payments-processing" element={<PaymentsProcessing />} />
          <Route path="/industries/neobanks" element={<Neobanks />} />
          <Route path="/industries/crypto-web3" element={<CryptoWeb3 />} />
          <Route path="/industries/lending-credit" element={<LendingCredit />} />
          <Route path="/industries/insurtech" element={<InsurTech />} />
          <Route path="/roles/head-of-support" element={<HeadOfSupport />} />
          <Route path="/roles/compliance-risk" element={<ComplianceRisk />} />
          <Route path="/roles/operations-growth" element={<OperationsGrowth />} />
          <Route path="/roles/founders-csuite" element={<FoundersCsuite />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/security" element={<Security />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/data-policy" element={<DataPolicy />} />
          <Route path="/ifx" element={<IFXExpo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
