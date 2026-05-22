import FeaturePage from './FeaturePage'

const data = {
  badge: 'Support Agent · Audit Logs',
  title: 'Audit Logs',
  subtitle: 'Traceable decision trail, regulator-ready exports.',
  description: 'In regulated financial services, every automated decision must be explainable and traceable. supVision logs every action the Support Agent takes - the data it retrieved, the response it gave, the confidence score, and the outcome - in real time. Your compliance team has full visibility. Your regulators get what they need.',
  points: [
    { icon: '📋', title: 'Decision-level logging', desc: 'Every agent response is logged with the query received, the data sources queried, the confidence score, the response given, and the escalation decision - all in one record.' },
    { icon: '🕐', title: 'Real-time writes', desc: 'Logs are written at the moment of each action - not batched. There is no window where a completed interaction is unlogged.' },
    { icon: '🔍', title: 'Full search and filter', desc: 'Search logs by customer, query type, date range, escalation reason, confidence score, or agent action. Find any interaction in seconds.' },
    { icon: '📤', title: 'Regulator-ready exports', desc: 'Export logs in structured formats your regulators and auditors expect - CSV, JSON, or custom format via API. Includes all fields required by GDPR and PCI DSS frameworks.' },
    { icon: '🔒', title: 'Tamper-evident storage', desc: 'Logs are write-once and tamper-evident. No action can be retroactively edited or deleted - including by supVision staff.' },
    { icon: '⚙️', title: 'Configurable retention periods', desc: 'Set log retention by query type or data category. Enterprise plans support unlimited retention. Starter and Growth plans include 30 and 90 days respectively.' },
  ],
  steps: [
    { step: '01', title: 'Query received', desc: 'The incoming message is logged with channel, timestamp, customer ID, and raw content.' },
    { step: '02', title: 'Data retrieval logged', desc: 'Every API call made to retrieve context (KYC provider, banking API, CRM) is logged with the endpoint called, fields retrieved, and response time.' },
    { step: '03', title: 'Decision recorded', desc: 'The agent\'s confidence score, the response category, the response given, and whether it escalated - all written to the audit log before the response is sent.' },
    { step: '04', title: 'Outcome captured', desc: 'Resolution outcome, escalation result, or customer follow-up is appended to the same log record - giving a complete end-to-end audit trail per interaction.' },
  ],
  ctaTitle: 'Full auditability, zero extra effort.',
  ctaDesc: 'Every automated decision logged, searchable, and regulator-ready from day one.',
}

const faq = [
  { q: 'Can we access logs via API?', a: 'Yes. The audit log API lets you pull records programmatically - filtered by date, customer, query type, or outcome. Useful for integrating into your own compliance dashboards or SIEM tools.' },
  { q: 'Who can access the audit logs?', a: 'Access is role-based. You define which team members can view, export, or query logs. supVision staff have no access to your audit log content.' },
  { q: 'Are logs available to regulators directly?', a: 'You control what is shared with regulators. supVision provides the export tools - PDF reports, structured JSON, or CSV - but sharing is always initiated by your team, not automatically.' },
  { q: 'What happens to logs if we cancel supVision?', a: 'You can export your full audit log before contract end. We provide a 30-day export window after cancellation. After that, logs are permanently deleted from our systems per GDPR requirements.' },
]

export default function AuditLogs() {
  return <FeaturePage data={data} faq={faq} />
}
