import FeaturePage from './FeaturePage'

const data = {
  badge: 'Support Agent · Escalation Rules',
  title: 'Escalation Rules',
  subtitle: 'Custom confidence thresholds and seamless human handoffs.',
  description: 'The biggest risk with AI in customer support is the wrong answer in the wrong situation. supVision\'s escalation system lets your team define exactly when the agent should handle a query autonomously and when it should hand off to a human - with everything the human needs already attached.',
  highlights: [
    'Configurable confidence thresholds — no engineering required',
    'Hard stops for fraud, regulatory complaints, and legal threats',
    'Every escalation logged with confidence score and reason',
  ],
  coreImage: '/Core Functionalities/Escalation Rules.webp',
  points: [
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM6.25 8a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0Z" clipRule="evenodd" /></svg>, title: 'Confidence thresholds', desc: 'Set a minimum confidence score for each query category. Below the threshold, the agent escalates automatically - with the full context and the reason for uncertainty included.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h2.879a1.5 1.5 0 0 1 1.06.44l6.122 6.12a1.5 1.5 0 0 1 0 2.122l-2.878 2.878a1.5 1.5 0 0 1-2.122 0L2.44 7.439A1.5 1.5 0 0 1 2 6.38V3.5Zm4.5 1a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z" /></svg>, title: 'Query-type routing', desc: 'Route different query types to different teams. Verification disputes go to compliance. Fraud flags go to the fraud team. Complex account queries go to senior support.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M9.58 1.077a.75.75 0 0 1 .405.82L9.165 6h4.085a.75.75 0 0 1 .567 1.241l-6.5 7.5a.75.75 0 0 1-1.302-.638L6.835 10H2.75a.75.75 0 0 1-.567-1.241l6.5-7.5a.75.75 0 0 1 .897-.182Z" clipRule="evenodd" /></svg>, title: 'Instant handoff with full context', desc: 'The human agent receives the complete conversation history, all data retrieved, confidence score, and the reason for escalation - before they type a single word.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clipRule="evenodd" /></svg>, title: 'SLA-aware escalation', desc: 'Configure escalation urgency based on query type or customer tier. High-value customers or regulatory-sensitive cases can be flagged for immediate human attention.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" /></svg>, title: 'Post-resolution learning', desc: 'Every escalation outcome is logged. Your team can review cases where the agent escalated unnecessarily and adjust thresholds over time - without engineering involvement.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M8 1a2 2 0 0 1 2 2v.5h.5A1.5 1.5 0 0 1 12 5v8a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 13V5a1.5 1.5 0 0 1 1.5-1.5H6V3a2 2 0 0 1 2-2Zm0 1.5a.5.5 0 0 0-.5.5v.5h1V3a.5.5 0 0 0-.5-.5Z" clipRule="evenodd" /></svg>, title: 'Hard stops for sensitive topics', desc: 'Certain query types - suspected fraud, regulatory complaints, legal threats - are always escalated regardless of confidence. Non-negotiable rules your compliance team controls.' },
  ],
  steps: [
    { step: '01', title: 'Configure your rules', desc: 'Your compliance and support leads define escalation thresholds, routing rules, and hard stops during onboarding - no engineering required.' },
    { step: '02', title: 'Agent evaluates every query', desc: 'For each incoming message the agent calculates its confidence score and checks whether the query type has any mandatory escalation rules applied.' },
    { step: '03', title: 'Autonomous resolution or handoff', desc: 'Above the threshold - the agent resolves and logs. Below the threshold or matching a hard-stop rule - it escalates instantly with full context.' },
    { step: '04', title: 'Human agent picks up seamlessly', desc: 'The receiving agent sees the full history, all retrieved data, the escalation reason, and the recommended next action - no re-asking the customer for information.' },
  ],
  ctaTitle: 'Control exactly when AI acts and when humans step in.',
  ctaDesc: 'Configurable escalation rules with no engineering required. Go live in days.',
}

const faq = [
  { q: 'Who configures the escalation rules?', a: 'Your compliance and support leads configure rules through a no-code interface. Engineering is not required to adjust thresholds, add routing rules, or create hard stops.' },
  { q: 'Can different thresholds apply to different customer segments?', a: 'Yes. You can apply stricter escalation rules for high-value customers, regulated entities, or specific geographies - and the agent applies the correct rules automatically based on the customer profile.' },
  { q: 'What happens if the agent escalates and the human team is offline?', a: 'You configure the out-of-hours behaviour: queue the case with an SLA timer, send an immediate notification to an on-call contact, or acknowledge to the customer with an expected response time.' },
  { q: 'Can we see which cases the agent escalated and why?', a: 'Yes. Every escalation is logged with the confidence score, the query classification, the rule that triggered escalation, and the full conversation. Reviewable in your dashboard and exportable for audits.' },
]

export default function EscalationRules() {
  return <FeaturePage data={data} faq={faq} />
}
