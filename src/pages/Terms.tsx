import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'

const sections = [
  {
    title: '1. Acceptance of terms',
    body: [
      'By accessing or using the supVision website and services ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.',
      'These Terms apply to all visitors, users, and others who access the Service. The Service is operated by Wilarium OÜ (registry code: 16966764), Vesivärava tn 50, 10152 Tallinn, Estonia ("supVision", "we", "us").',
    ],
  },
  {
    title: '2. Description of service',
    body: [
      'supVision provides an AI-powered customer support automation platform designed for regulated financial services companies, including payment processors, neobanks, crypto/Web3 operators, lenders, and insurtech firms.',
      'We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice to active subscribers.',
    ],
  },
  {
    title: '3. Accounts and access',
    body: [
      'To access certain features you must create an account. You are responsible for maintaining the confidentiality of your credentials and for all activity that occurs under your account.',
      'You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. We reserve the right to suspend or terminate accounts that contain false information.',
      'You must be at least 18 years old and have the authority to enter into these Terms on behalf of your organisation where applicable.',
    ],
  },
  {
    title: '4. Acceptable use',
    body: [
      'You agree not to use the Service to: (a) violate any applicable law or regulation; (b) infringe any intellectual property or other rights of any person; (c) transmit any malicious code, spam, or unsolicited communications; (d) attempt to gain unauthorised access to any part of the Service or its infrastructure; (e) use the Service in any way that could damage, disable, or impair it.',
      'We reserve the right to investigate and take appropriate action against violations, including removing content, suspending or terminating accounts, and reporting to law enforcement.',
    ],
  },
  {
    title: '5. Intellectual property',
    body: [
      'The Service and its original content, features, and functionality are and will remain the exclusive property of Wilarium OÜ and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without prior written consent.',
      'You retain ownership of content you submit to the Service. By submitting content, you grant supVision a limited licence to use it solely to provide and improve the Service.',
    ],
  },
  {
    title: '6. Confidentiality and data',
    body: [
      'supVision treats all client data as confidential. We will not disclose your data to third parties except as necessary to provide the Service, as required by law, or with your consent.',
      'Data processing is governed by our Privacy Policy and, where applicable, a Data Processing Agreement ("DPA") entered into separately. We do not use your customer data to train shared AI models.',
      'You are responsible for ensuring you have the right to process and submit any data you provide to the Service, including your end customers\' personal data.',
    ],
  },
  {
    title: '7. Payment and billing',
    body: [
      'Paid plans are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by applicable law or as expressly stated in your order.',
      'We reserve the right to change pricing with 30 days\' notice to active subscribers. Continued use after the notice period constitutes acceptance of the new pricing.',
      'Failure to pay may result in suspension or termination of your account after reasonable notice.',
    ],
  },
  {
    title: '8. Limitation of liability',
    body: [
      'To the maximum extent permitted by applicable law, supVision shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.',
      'Our total liability for any claim arising out of or relating to these Terms or the Service shall not exceed the amount paid by you to supVision in the twelve months preceding the claim.',
      'Nothing in these Terms limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.',
    ],
  },
  {
    title: '9. Warranties and disclaimers',
    body: [
      'The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, error-free, or free of harmful components.',
      'supVision does not provide legal, financial, compliance, or regulatory advice. You are solely responsible for ensuring that your use of the Service complies with all applicable laws and regulations in your jurisdiction.',
    ],
  },
  {
    title: '10. Termination',
    body: [
      'You may terminate your account at any time by contacting us. We may terminate or suspend your access immediately, without prior notice, if you breach these Terms.',
      'Upon termination, your right to use the Service ceases. Provisions that by their nature should survive termination (including intellectual property, disclaimer, limitation of liability, and dispute resolution) will survive.',
    ],
  },
  {
    title: '11. Governing law and disputes',
    body: [
      'These Terms are governed by and construed in accordance with the laws of Estonia, without regard to conflict of law principles.',
      'Any dispute arising from or relating to these Terms or the Service shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to the courts of Tallinn, Estonia.',
    ],
  },
  {
    title: '12. Changes to these terms',
    body: [
      'We reserve the right to modify these Terms at any time. We will provide at least 14 days\' notice of material changes via email or a prominent notice on the Service.',
      'Your continued use of the Service after the effective date of revised Terms constitutes your acceptance of the changes.',
    ],
  },
  {
    title: '13. Contact',
    body: [
      'Questions about these Terms should be sent to: info@supvision.ai',
      'Wilarium OÜ · Vesivärava tn 50, 10152 Tallinn, Estonia',
    ],
  },
]

export default function Terms() {
  return (
    <div className="min-h-screen pb-24 pt-2" style={{ backgroundColor: '#faf8f5' }}>
      <PageMeta
        title="Terms of Service — supVision"
        description="Terms of Service for supVision AI customer support platform. Read our terms before using the service."
        path="/terms"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 mt-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Legal</p>
          <h1 className="mt-3 text-4xl font-black text-gray-900 sm:text-5xl">Terms of Service</h1>
          <p className="mt-3 text-sm text-gray-400">Last updated: 10 June 2026</p>
        </header>

        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="mb-3 text-lg font-bold text-gray-900">{s.title}</h2>
              <div className="flex flex-col gap-3">
                {s.body.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-gray-600">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-4 border-t border-gray-200 pt-8 text-xs text-gray-400">
          <Link to="/privacy-policy" className="hover:text-gray-700 underline">Privacy Policy</Link>
          <Link to="/data-policy" className="hover:text-gray-700 underline">Data Policy</Link>
          <Link to="/security" className="hover:text-gray-700 underline">Security</Link>
        </div>
      </div>
    </div>
  )
}
