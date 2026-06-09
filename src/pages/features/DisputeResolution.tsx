import FeaturePage from './FeaturePage'

const data = {
  badge: 'Support Agent · Dispute Resolution',
  title: 'Dispute Resolution',
  subtitle: 'Resolve chargebacks and transaction disputes in real time.',
  description: 'Transaction disputes are the highest-cost support interactions in fintech - manually intensive, compliance-critical, and frustrating for customers. supVision\'s Support Agent resolves eligible disputes autonomously, and handles the rest with full context handed to your team. Median resolution time: under 2 minutes.',
  highlights: [
    'Median dispute resolution time under 2 minutes',
    'Autonomous resolution for eligible cases — no human required',
    'Full compliance trail for every dispute, audit-ready from day one',
  ],
  coreImage: '/core-functionalities/dispute-resolution.webp',
  points: [
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>, title: 'Real-time transaction lookup', desc: 'Pulls the full transaction record - merchant, amount, timestamp, authorisation code - directly from your payment processor before responding.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg>, title: 'Dispute type identification', desc: 'Classifies the dispute automatically: unauthorised transaction, merchant error, duplicate charge, non-delivery, or friendly fraud - each with a different resolution path.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M9.58 1.077a.75.75 0 0 1 .405.82L9.165 6h4.085a.75.75 0 0 1 .567 1.241l-6.5 7.5a.75.75 0 0 1-1.302-.638L6.835 10H2.75a.75.75 0 0 1-.567-1.241l6.5-7.5a.75.75 0 0 1 .897-.182Z" clipRule="evenodd" /></svg>, title: 'Autonomous resolution for eligible cases', desc: 'For disputes that meet your pre-configured criteria (amount, age, customer history), the agent initiates resolution or provisional credit without human involvement.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1 12.75A.75.75 0 0 1 1.75 12H8a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 12.75Z" clipRule="evenodd" /></svg>, title: 'Structured escalation for complex cases', desc: 'Disputes requiring manual review are escalated with the full transaction data, dispute classification, customer history, and recommended action - pre-filled.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M8 1a2 2 0 0 1 2 2v.5h.5A1.5 1.5 0 0 1 12 5v8a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 13V5a1.5 1.5 0 0 1 1.5-1.5H6V3a2 2 0 0 1 2-2Zm0 1.5a.5.5 0 0 0-.5.5v.5h1V3a.5.5 0 0 0-.5-.5Z" clipRule="evenodd" /></svg>, title: 'Fraud flag handling', desc: 'Identifies high-risk patterns and routes suspected fraud cases directly to your fraud team with full context, bypassing standard resolution flows.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M4 4a2 2 0 0 1 2-2h4.75a.75.75 0 0 1 .53.22l2.25 2.25a.75.75 0 0 1 .22.53V12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm5 .5V3.5l2 2H9.5A.5.5 0 0 1 9 5.5ZM5.5 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5Zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6Z" clipRule="evenodd" /></svg>, title: 'Chargeback documentation', desc: 'Automatically compiles the evidence package required for chargeback representment - saving your ops team hours per case.' },
  ],
  steps: [
    { step: '01', title: 'Customer reports dispute', desc: 'Via any channel. The agent collects the transaction reference, the nature of the dispute, and any supporting information from the customer.' },
    { step: '02', title: 'Agent retrieves full transaction data', desc: 'Queries your payment processor and core banking API for the complete transaction record, authorisation trace, and merchant details.' },
    { step: '03', title: 'Applies your resolution rules', desc: 'Evaluates the case against your configured dispute policy - resolves autonomously if eligible, or escalates with a structured summary if not.' },
    { step: '04', title: 'Documents everything', desc: 'The full dispute trail - query, data pulled, classification, decision, outcome - is logged and audit-ready for regulators and card scheme requirements.' },
  ],
  ctaTitle: 'Resolve disputes in minutes, not days.',
  ctaDesc: 'Autonomous dispute handling with full compliance trail. Most teams live in 3 days.',
}

const faq = [
  { q: 'Which payment processors does supVision integrate with?', a: 'Stripe, Nuvei, Ecommpay, Adyen, and any processor with a REST API. Transaction data is pulled in real time - no batch processing.' },
  { q: 'Can the agent initiate refunds or credits?', a: 'Yes, if you grant write access to your payment processor. You define the eligibility criteria - amount limits, customer tier, dispute type - and the agent applies them consistently.' },
  { q: 'How does the agent handle suspected fraud?', a: 'Fraud-flagged cases are routed directly to your fraud team with the full transaction record and risk signals attached. The agent does not attempt autonomous resolution for fraud cases.' },
  { q: 'Does this work for Web3 transactions too?', a: 'Yes. For on-chain transactions the agent can query blockchain explorers and your internal ledger. Resolution logic for Web3 disputes is configurable separately from fiat flows.' },
]

export default function DisputeResolution() {
  return <FeaturePage data={data} faq={faq} />
}
