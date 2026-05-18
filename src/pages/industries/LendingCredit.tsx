import IndustryPage from './IndustryPage'

const data = {
  badge: 'For whom · Lending & Credit',
  title: 'Lending & Credit',
  subtitle: 'Loan queries, repayment issues, and eligibility checks — resolved instantly.',
  description: 'Lending support is high-stakes and regulation-heavy. Customers under financial stress need fast, accurate answers. Your team needs to respond without giving advice that crosses regulatory lines. supVision handles the most common lending queries autonomously — accurately, compliantly, and at any volume.',
  heroImage: '/bg/hero-bg.png',
  highlights: [
    '98.4% resolution rate for standard lending support queries',
    'Repayment and eligibility queries resolved in under 2 minutes',
    'Compliant collections interactions with built-in regulatory guardrails',
  ],
  metrics: [
    { value: '98.4%', label: 'Resolution rate for standard lending support queries' },
    { value: '52%', label: 'Average reduction in support operating costs' },
    { value: '<2 min', label: 'Median resolution time for repayment and eligibility queries' },
    { value: '24/7', label: 'Support availability for customers in financial difficulty' },
  ],
  pains: [
    { title: 'Repayment queries are time-sensitive', desc: 'Customers missing a payment need answers immediately. Delays increase the risk of default and damage your relationship with borrowers who could be retained.' },
    { title: 'Eligibility queries require data lookup', desc: 'Customers ask whether they qualify for a top-up, a rate review, or a product. Each requires pulling account data — a manual process that creates queues.' },
    { title: 'Collections interactions need compliance guardrails', desc: 'Agents handling arrears queries must follow strict regulatory scripts. Deviation creates compliance risk. Training is expensive and turnover is high.' },
    { title: 'Restructuring requests are complex', desc: 'Payment holidays, term extensions, and restructuring requests require eligibility checks, regulatory disclosures, and sometimes credit decisions — all creating support load.' },
    { title: 'Statement and document requests are high-volume', desc: 'Customers regularly request loan statements, repayment schedules, and settlement figures. Each is a manual generation and delivery task.' },
    { title: 'Vulnerable customer handling requires care', desc: 'Customers in financial difficulty need a different approach — empathetic, accurate, and aware of regulatory obligations around vulnerable customer treatment.' },
  ],
  useCases: [
    { customer: '"I can\'t make this month\'s repayment. What are my options?"', resolution: 'Agent retrieves the customer\'s account status and eligibility for forbearance options, presents the available choices (payment holiday, partial payment, restructuring), and routes the case to your collections team with the customer\'s full profile and stated situation attached.' },
    { customer: '"What\'s my remaining loan balance and settlement figure?"', resolution: 'Agent queries the loan management system for the exact outstanding balance, settlement figure (including early repayment charges if applicable), and provides a breakdown — with a PDF statement generated on request.' },
    { customer: '"Can I top up my loan or apply for more credit?"', resolution: 'Agent checks top-up eligibility against the customer\'s account standing, repayment history, and current product rules. If eligible, it initiates the application. If not, it explains the criteria clearly without making a credit decision.' },
    { customer: '"I was charged a late fee but I paid on time."', resolution: 'Agent retrieves the payment record and fee ledger, identifies whether the payment was received within the grace period, and either reverses the fee or explains the exact timing that triggered it — with the transaction timestamps attached.' },
  ],
  ctaTitle: 'Give borrowers the answers they need, instantly.',
  ctaDesc: 'Compliant, accurate lending support at any volume. Live in 3 days.',
}

export default function LendingCredit() {
  return <IndustryPage data={data} />
}
