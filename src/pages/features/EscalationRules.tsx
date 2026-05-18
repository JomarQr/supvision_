import FeaturePage from './FeaturePage'

const data = {
  badge: 'Support Agent · Escalation Rules',
  title: 'Escalation Rules',
  subtitle: 'Custom confidence thresholds and seamless human handoffs.',
  description: 'The biggest risk with AI in customer support is the wrong answer in the wrong situation. supVision\'s escalation system lets your team define exactly when the agent should handle a query autonomously and when it should hand off to a human — with everything the human needs already attached.',
  points: [
    { icon: '🎯', title: 'Confidence thresholds', desc: 'Set a minimum confidence score for each query category. Below the threshold, the agent escalates automatically — with the full context and the reason for uncertainty included.' },
    { icon: '📂', title: 'Query-type routing', desc: 'Route different query types to different teams. KYC disputes go to compliance. Fraud flags go to the fraud team. Complex account queries go to senior support.' },
    { icon: '⚡', title: 'Instant handoff with full context', desc: 'The human agent receives the complete conversation history, all data retrieved, confidence score, and the reason for escalation — before they type a single word.' },
    { icon: '🕐', title: 'SLA-aware escalation', desc: 'Configure escalation urgency based on query type or customer tier. High-value customers or regulatory-sensitive cases can be flagged for immediate human attention.' },
    { icon: '🔁', title: 'Post-resolution learning', desc: 'Every escalation outcome is logged. Your team can review cases where the agent escalated unnecessarily and adjust thresholds over time — without engineering involvement.' },
    { icon: '🛡️', title: 'Hard stops for sensitive topics', desc: 'Certain query types — suspected fraud, regulatory complaints, legal threats — are always escalated regardless of confidence. Non-negotiable rules your compliance team controls.' },
  ],
  steps: [
    { step: '01', title: 'Configure your rules', desc: 'Your compliance and support leads define escalation thresholds, routing rules, and hard stops during onboarding — no engineering required.' },
    { step: '02', title: 'Agent evaluates every query', desc: 'For each incoming message the agent calculates its confidence score and checks whether the query type has any mandatory escalation rules applied.' },
    { step: '03', title: 'Autonomous resolution or handoff', desc: 'Above the threshold — the agent resolves and logs. Below the threshold or matching a hard-stop rule — it escalates instantly with full context.' },
    { step: '04', title: 'Human agent picks up seamlessly', desc: 'The receiving agent sees the full history, all retrieved data, the escalation reason, and the recommended next action — no re-asking the customer for information.' },
  ],
  ctaTitle: 'Control exactly when AI acts and when humans step in.',
  ctaDesc: 'Configurable escalation rules with no engineering required. Go live in days.',
}

const faq = [
  { q: 'Who configures the escalation rules?', a: 'Your compliance and support leads configure rules through a no-code interface. Engineering is not required to adjust thresholds, add routing rules, or create hard stops.' },
  { q: 'Can different thresholds apply to different customer segments?', a: 'Yes. You can apply stricter escalation rules for high-value customers, regulated entities, or specific geographies — and the agent applies the correct rules automatically based on the customer profile.' },
  { q: 'What happens if the agent escalates and the human team is offline?', a: 'You configure the out-of-hours behaviour: queue the case with an SLA timer, send an immediate notification to an on-call contact, or acknowledge to the customer with an expected response time.' },
  { q: 'Can we see which cases the agent escalated and why?', a: 'Yes. Every escalation is logged with the confidence score, the query classification, the rule that triggered escalation, and the full conversation. Reviewable in your dashboard and exportable for audits.' },
]

export default function EscalationRules() {
  return <FeaturePage data={data} faq={faq} />
}
