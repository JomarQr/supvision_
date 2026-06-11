import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'

const sections = [
  {
    title: 'What data supVision processes on your behalf',
    body: [
      'When you deploy supVision as your AI support agent, the system processes customer-submitted data to resolve support queries. This may include customer names, email addresses, account identifiers, transaction references, and the content of support messages.',
      'supVision operates as a data processor under GDPR. Your organisation remains the data controller and is responsible for the lawful basis under which customer data is collected and submitted to supVision for processing.',
    ],
  },
  {
    title: 'Zero-retention architecture',
    body: [
      'supVision is built on a zero-retention model. Customer conversations and personally identifiable information (PII) are not stored beyond the active session unless retention is explicitly required by your configuration for audit or compliance purposes.',
      'No supVision employee has read access to your customer conversations. PII fields are anonymised before they reach any AI model layer. Only metadata necessary for routing, escalation, and audit logging is retained.',
    ],
  },
  {
    title: 'AI processing and model training',
    body: [
      'Customer data processed through supVision is never used to train shared or public AI models. Each deployment operates in an isolated context. Any fine-tuning or model adaptation is performed only on anonymised or synthetic data, or on data you have explicitly authorised for that purpose in a separate written agreement.',
      'supVision uses large language model APIs provided by third-party infrastructure providers. These providers are contractually bound not to use your data for model improvement without your consent. Applicable data processing agreements are in place with all sub-processors.',
    ],
  },
  {
    title: 'Sub-processors and data transfers',
    body: [
      'supVision uses a limited set of vetted sub-processors for infrastructure (hosting, database, and AI inference). All sub-processors are under contractual data processing agreements and are located in the EU/EEA or in countries with adequate data protection as recognised by the European Commission.',
      'We maintain an up-to-date list of sub-processors. If you are an enterprise client and require a copy of the current sub-processor list or specific DPA terms, contact us at info@supvision.ai.',
    ],
  },
  {
    title: 'Audit logs and data access',
    body: [
      'Every decision made by the supVision agent is logged with a traceable audit trail. This log includes the query category, the confidence level of the response, the data sources consulted, and the outcome (resolved, escalated, or flagged). Logs are available to your compliance team on demand.',
      'supVision does not expose raw customer PII in audit logs. Log entries reference anonymised customer identifiers that can be re-linked by your team using your internal systems.',
    ],
  },
  {
    title: 'Data subject rights',
    body: [
      'As data controller, you are responsible for handling data subject requests (access, erasure, portability, rectification) from your customers. supVision provides tooling to support right-to-erasure requests: upon instruction, all stored references to a given customer identifier can be purged from the system within the timeframe required by applicable law.',
      'If a data subject contacts supVision directly with a request relating to data you control, we will forward the request to you within 72 hours.',
    ],
  },
  {
    title: 'Security standards',
    body: [
      'supVision aligns to SOC 2 Type II, ISO 27001, GDPR, and PCI DSS requirements relevant to our services. All data is encrypted in transit (TLS 1.2+) and at rest (AES-256). Access to infrastructure is restricted by role and requires multi-factor authentication.',
      'We conduct regular vulnerability assessments and penetration tests. Incident response procedures are in place with defined notification timelines in line with GDPR Article 33 obligations.',
    ],
  },
  {
    title: 'Changes to this policy',
    body: [
      'We may update this Data Policy when our processing practices change or when required by law. Enterprise clients will be notified of material changes by email at least 30 days in advance. The "Last updated" date below reflects the most recent revision.',
    ],
  },
]

export default function DataPolicy() {
  return (
    <div className="pt-0">
      <PageMeta
        title="Data Policy — supVision"
        description="How supVision processes customer data on your behalf. Zero-retention architecture, no model training on your data, full audit trail."
        path="/data-policy"
      />

      {/* Hero */}
      <section className="px-4 pt-16 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
            Legal
          </div>
          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            Data Policy
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-500">
            This policy explains how supVision processes data on behalf of clients who deploy our AI support agent. SUPVISION.AI is registered at: Harju maakond, Tallinn, Põhja-Tallinna linnaosa, Sõle tn 61a-5, 10313, Estonia. Contact:{' '}
            <a href="mailto:info@supvision.ai" className="font-semibold text-gray-900 hover:underline">info@supvision.ai</a>.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-500">
            supVision acts as a data processor under GDPR. Your organisation is the data controller. This policy covers how we handle the customer data you submit to our platform and the safeguards we maintain to protect it.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl px-6">
          <div className="divide-y divide-gray-100">
            {sections.map((s) => (
              <div key={s.title} className="py-10">
                <h2 className="text-xl font-bold text-gray-900">{s.title}</h2>
                <div className="mt-4 space-y-4">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-base leading-relaxed text-gray-500">{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-400">Last updated: 4 June 2026</p>

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-gray-50 px-8 py-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900">Questions about data processing?</h3>
            <p className="mt-3 text-base text-gray-500">We'll respond with the relevant DPA terms or sub-processor list within one business day.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F97316'; (e.currentTarget as HTMLElement).style.borderColor = '#F97316'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; (e.currentTarget as HTMLElement).style.borderColor = '#111827'; (e.currentTarget as HTMLElement).style.color = ''; }}
              >
                Contact us
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link to="/privacy-policy" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                Read our Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
