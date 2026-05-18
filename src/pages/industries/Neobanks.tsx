import IndustryPage from './IndustryPage'

const data = {
  badge: 'For whom · Neobanks & Digital Banking',
  title: 'Neobanks & Digital Banking',
  subtitle: 'Account support, KYC, and onboarding — at the scale digital banks demand.',
  description: 'Neobanks grow fast and support needs grow faster. Your app is available 24/7 — your customers expect your support to be too. supVision handles the most common queries your team sees every day: KYC queues, account issues, card queries, and onboarding drop-offs — without adding headcount.',
  heroImage: '/bg/hero-bg.png',
  highlights: [
    'KYC and onboarding queries resolved autonomously — no queue, no wait',
    '24/7 account and card support without adding headcount',
    'Full audit trail for every automated decision, regulator-ready',
  ],
  metrics: [
    { value: '24/7', label: 'Support availability matching your app availability' },
    { value: '3 days', label: 'Typical time from signed contract to live agent' },
    { value: '70%', label: 'Reduction in KYC-related support ticket volume' },
    { value: '50+', label: 'Languages supported for international expansion' },
  ],
  pains: [
    { title: 'KYC queues never clear', desc: 'Verification status questions flood your inbox. Each one requires a human to log into the KYC provider, check status, and reply — at scale, this never ends.' },
    { title: 'Onboarding drop-off is invisible', desc: 'Customers abandon onboarding without explanation. Without proactive support at the drop-off point, you lose them silently.' },
    { title: 'Card queries dominate tier-1', desc: 'Card blocked, PIN forgotten, limit questions — these are repetitive, low-value queries that consume a disproportionate share of your support capacity.' },
    { title: 'International expansion multiplies the problem', desc: 'Every new market brings new language requirements, new regulatory rules, and new support volume. Scaling geographically means scaling headcount — until now.' },
    { title: '24/7 expectation vs. 9-to-5 team', desc: 'Your app never sleeps but your support team does. Customers in different time zones face long waits that damage retention and app store ratings.' },
    { title: 'Regulatory queries require specialist knowledge', desc: 'Questions about account limits, AML flags, and regulatory holds require compliance-aware responses. Front-line agents often lack the knowledge or authority to answer correctly.' },
  ],
  useCases: [
    { customer: '"Why is my account still under review?"', resolution: 'Agent queries the KYC provider and core banking system, retrieves the exact review status and any blockers, and explains the situation in plain language — with an expected resolution timeline.' },
    { customer: '"I can\'t complete my verification — the app keeps rejecting my document."', resolution: 'Agent identifies the specific document rejection reason from the KYC provider, explains the issue (blur, expired, mismatched name), and walks the customer through re-submission step by step.' },
    { customer: '"My card was blocked and I don\'t know why."', resolution: 'Agent checks the card status in core banking, identifies the block reason (security flag, AML hold, customer-initiated freeze), and resolves or escalates with full context attached.' },
    { customer: '"What is my daily spending limit and can I increase it?"', resolution: 'Agent retrieves the customer\'s current limits from the banking system, explains the eligibility criteria for an increase, and either processes the request or routes it to the appropriate team.' },
  ],
  ctaTitle: 'Scale your neobank without scaling your support team.',
  ctaDesc: '24/7 AI support built for digital banking. Live in 3 days.',
}

export default function Neobanks() {
  return <IndustryPage data={data} />
}
