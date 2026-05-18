import IndustryPage from './IndustryPage'

const data = {
  badge: 'For whom · Payments & Processing',
  title: 'Payments & Processing',
  subtitle: 'Dispute resolution, chargebacks, and transaction queries — automated.',
  description: 'Payment companies handle some of the highest-stakes customer support in fintech. A declined transaction at checkout costs the merchant. An unresolved dispute can become a chargeback that costs you. supVision resolves payment queries in real time, with full transaction data, before they escalate.',
  heroImage: '/bg/hero-bg.png',
  highlights: [
    'Automated chargeback and dispute resolution — median response under 2 minutes',
    'Real-time transaction status queries answered without agent involvement',
    'PCI DSS aligned — no raw card data ever touches our system',
  ],
  metrics: [
    { value: '<2 min', label: 'Median resolution for transaction disputes and failure queries' },
    { value: '80%', label: 'Of tier-1 payment queries resolved without a human agent' },
    { value: '52%', label: 'Average reduction in support operating costs' },
    { value: '24/7', label: 'Availability across all payment channels and geographies' },
  ],
  pains: [
    { title: 'Dispute queues pile up', desc: 'Transaction disputes arrive faster than your team can process them. Manual review takes days, customers escalate, and chargeback rates climb.' },
    { title: 'Decline codes are opaque', desc: 'Customers get a generic "payment failed" message. Your support team has to manually look up decline codes and translate them into plain language one ticket at a time.' },
    { title: 'Refund queries are repetitive', desc: 'The same refund status questions arrive hundreds of times a day. Each one requires a support agent to log in, look it up, and reply manually.' },
    { title: 'Peak volume spikes break teams', desc: 'Black Friday, end-of-month billing, or a processing outage creates a support spike your team cannot handle without emergency hiring.' },
    { title: 'Chargeback documentation is manual', desc: 'Building the evidence package for representment takes your ops team hours per case — time spent on paperwork instead of resolution.' },
    { title: 'Multi-currency queries need expertise', desc: 'Customers processing in multiple currencies ask about FX rates, settlement timing, and currency conversion fees. These require specialist knowledge your front-line team often lacks.' },
  ],
  useCases: [
    { customer: '"My payment was declined but I have funds."', resolution: 'Agent queries the payment processor for the exact decline code, identifies the cause (3DS failure, velocity limit, card not enrolled), explains it clearly, and provides the specific next step — in under 30 seconds.' },
    { customer: '"I was charged twice for the same transaction."', resolution: 'Agent retrieves both transaction records, identifies the duplicate, confirms whether it\'s a double-charge or a pending hold, and either initiates a refund or explains the timeline for the hold to release.' },
    { customer: '"Where is my refund? It\'s been 5 days."', resolution: 'Agent queries the refund status from the payment processor, gives the customer the exact status and expected settlement date, and escalates to the acquirer if the timeline has been exceeded.' },
    { customer: '"Why did my payout fail?"', resolution: 'Agent retrieves the payout record, identifies the failure reason (invalid IBAN, AML hold, bank rejection), explains the cause, and provides the corrective action — with the failed record details attached.' },
  ],
  ctaTitle: 'Stop losing customers to slow dispute resolution.',
  ctaDesc: 'Automated payment support with full transaction data. Live in 3 days.',
}

export default function PaymentsProcessing() {
  return <IndustryPage data={data} />
}
