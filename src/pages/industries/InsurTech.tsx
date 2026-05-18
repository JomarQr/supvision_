import IndustryPage from './IndustryPage'

const data = {
  badge: 'For whom · InsurTech',
  title: 'InsurTech',
  subtitle: 'Claims triage, policy queries, and compliance handling — automated.',
  description: 'InsurTech support combines the regulatory complexity of financial services with the emotional stakes of claims. Customers contacting you about a claim are often stressed. They need fast, accurate, empathetic answers — and everything needs to be logged for regulatory purposes. supVision handles all of it.',
  heroImage: '/bg/hero-bg.png',
  highlights: [
    '80% of policy and claims status queries resolved without a human',
    '100% of interactions logged and audit-ready for FCA and regulatory review',
    'Claims triage handled consistently — no more agent-dependent outcomes',
  ],
  metrics: [
    { value: '80%', label: 'Of policy and claims status queries resolved without a human' },
    { value: '<2 min', label: 'Median response time for claims status and policy queries' },
    { value: '100%', label: 'Of interactions logged and audit-ready for FCA and regulatory review' },
    { value: '50+', label: 'Languages for international insurance products' },
  ],
  pains: [
    { title: 'Claims status queries overwhelm teams', desc: '"Where is my claim?" is the most common insurance support query. Each one requires a claims handler to manually check status and respond — at high volume, this is unsustainable.' },
    { title: 'Policy queries require document access', desc: 'Coverage questions, excess queries, and exclusion clarifications require pulling the customer\'s specific policy. Generic answers create complaints and mis-selling risk.' },
    { title: 'Regulatory obligations are strict', desc: 'Insurance support is regulated. Every response must meet disclosure requirements. Front-line agents need expensive training and tight script adherence — or you face regulatory action.' },
    { title: 'Claims triage is inconsistent', desc: 'Whether a claim gets triaged correctly depends on which agent takes the call. Inconsistency leads to incorrect decisions, customer complaints, and FOS referrals.' },
    { title: 'Renewal and cancellation queries spike seasonally', desc: 'Renewal periods generate a predictable support surge. Without automation, you either overstaff permanently or underserve during peaks.' },
    { title: 'Complaints require careful handling', desc: 'A complaint handled incorrectly is a regulatory event. Agents need to follow the right process — acknowledging, logging, and escalating within the required timeframes.' },
  ],
  useCases: [
    { customer: '"I submitted my claim 3 weeks ago. What\'s the status?"', resolution: 'Agent queries the claims management system for the exact status, current stage, assigned handler, and expected decision date. Provides a clear update and escalates to the claims team if the timeline has been exceeded — with the full claim record attached.' },
    { customer: '"Am I covered for this? I\'m not sure if it\'s in my policy."', resolution: 'Agent retrieves the customer\'s specific policy document, identifies the relevant coverage clause, and provides an accurate answer — flagging any exclusions that apply and escalating to an underwriter if the query requires a coverage decision.' },
    { customer: '"I want to cancel my policy. What are the terms?"', resolution: 'Agent retrieves the cancellation terms for the customer\'s specific product, calculates the pro-rata refund or cancellation fee, explains the consequences of cancellation, and either processes the request or routes it with all details pre-filled.' },
    { customer: '"I want to make a complaint about how my claim was handled."', resolution: 'Agent acknowledges the complaint, logs it in your complaints management system with the required regulatory fields, provides the customer with the complaint reference number and the regulatory response timeline, and escalates to your complaints team immediately.' },
  ],
  ctaTitle: 'Handle claims queries at scale, compliantly.',
  ctaDesc: 'Regulated-industry AI support built for InsurTech. Live in 3 days.',
}

export default function InsurTech() {
  return <IndustryPage data={data} />
}
