import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from '@/components/ErrorBoundary'
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
import ForWhom from '@/pages/ForWhom'
import Industries from '@/pages/Industries'
import PaymentsProcessing from '@/pages/industries/PaymentsProcessing'
import Neobanks from '@/pages/industries/Neobanks'
import CryptoWeb3 from '@/pages/industries/CryptoWeb3'
import LendingCredit from '@/pages/industries/LendingCredit'
import InsurTech from '@/pages/industries/InsurTech'
import HeadOfSupport from '@/pages/roles/HeadOfSupport'
import ComplianceRisk from '@/pages/roles/ComplianceRisk'
import OperationsGrowth from '@/pages/roles/OperationsGrowth'
import FoundersCsuite from '@/pages/roles/FoundersCsuite'
import Analytics from '@/pages/Analytics'
import Security from '@/pages/Security'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import DataPolicy from '@/pages/DataPolicy'
import Terms from '@/pages/Terms'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import IFXExpo from '@/pages/IFXExpo'

export default function AppSSR() {
  return (
    <ErrorBoundary>
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
          <Route path="/terms" element={<Terms />} />
          <Route path="/ifx" element={<IFXExpo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}
