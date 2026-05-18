import FeaturePage from './FeaturePage'

const data = {
  badge: 'Support Agent · Dispute Resolution',
  title: 'Dispute Resolution',
  subtitle: 'Resolve chargebacks and transaction disputes in real time.',
  description: 'Transaction disputes are the highest-cost support interactions in fintech — manually intensive, compliance-critical, and frustrating for customers. supVision\'s Support Agent resolves eligible disputes autonomously, and handles the rest with full context handed to your team. Median resolution time: under 2 minutes.',
  points: [
    { icon: '💳', title: 'Real-time transaction lookup', desc: 'Pulls the full transaction record — merchant, amount, timestamp, authorisation code — directly from your payment processor before responding.' },
    { icon: '⚖️', title: 'Dispute type identification', desc: 'Classifies the dispute automatically: unauthorised transaction, merchant error, duplicate charge, non-delivery, or friendly fraud — each with a different resolution path.' },
    { icon: '⚡', title: 'Autonomous resolution for eligible cases', desc: 'For disputes that meet your pre-configured criteria (amount, age, customer history), the agent initiates resolution or provisional credit without human involvement.' },
    { icon: '📨', title: 'Structured escalation for complex cases', desc: 'Disputes requiring manual review are escalated with the full transaction data, dispute classification, customer history, and recommended action — pre-filled.' },
    { icon: '🔒', title: 'Fraud flag handling', desc: 'Identifies high-risk patterns and routes suspected fraud cases directly to your fraud team with full context, bypassing standard resolution flows.' },
    { icon: '📋', title: 'Chargeback documentation', desc: 'Automatically compiles the evidence package required for chargeback representment — saving your ops team hours per case.' },
  ],
  steps: [
    { step: '01', title: 'Customer reports dispute', desc: 'Via any channel. The agent collects the transaction reference, the nature of the dispute, and any supporting information from the customer.' },
    { step: '02', title: 'Agent retrieves full transaction data', desc: 'Queries your payment processor and core banking API for the complete transaction record, authorisation trace, and merchant details.' },
    { step: '03', title: 'Applies your resolution rules', desc: 'Evaluates the case against your configured dispute policy — resolves autonomously if eligible, or escalates with a structured summary if not.' },
    { step: '04', title: 'Documents everything', desc: 'The full dispute trail — query, data pulled, classification, decision, outcome — is logged and audit-ready for regulators and card scheme requirements.' },
  ],
  ctaTitle: 'Resolve disputes in minutes, not days.',
  ctaDesc: 'Autonomous dispute handling with full compliance trail. Most teams live in 3 days.',
}

const faq = [
  { q: 'Which payment processors does supVision integrate with?', a: 'Stripe, Nuvei, Ecommpay, Adyen, and any processor with a REST API. Transaction data is pulled in real time — no batch processing.' },
  { q: 'Can the agent initiate refunds or credits?', a: 'Yes, if you grant write access to your payment processor. You define the eligibility criteria — amount limits, customer tier, dispute type — and the agent applies them consistently.' },
  { q: 'How does the agent handle suspected fraud?', a: 'Fraud-flagged cases are routed directly to your fraud team with the full transaction record and risk signals attached. The agent does not attempt autonomous resolution for fraud cases.' },
  { q: 'Does this work for crypto transactions too?', a: 'Yes. For on-chain transactions the agent can query blockchain explorers and your internal ledger. Resolution logic for crypto disputes is configurable separately from fiat flows.' },
]

export default function DisputeResolution() {
  return <FeaturePage data={data} faq={faq} />
}
