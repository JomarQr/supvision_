import FeaturePage from './FeaturePage'

const data = {
  badge: 'Support Agent · Audit Logs',
  title: 'Audit Logs',
  subtitle: 'Traceable decision trail, regulator-ready exports.',
  description: 'In regulated financial services, every automated decision must be explainable and traceable. supVision logs every action the Support Agent takes - the data it retrieved, the response it gave, the confidence score, and the outcome - in real time. Your compliance team has full visibility. Your regulators get what they need.',
  highlights: [
    'Every decision logged in real time — no batch delays, no gaps',
    'Tamper-evident storage — no retroactive edits by anyone, including supVision',
    'Regulator-ready exports in CSV, JSON, or custom format via API',
  ],
  coreImage: '/Core Functionalities/Audit Logs.png',
  points: [
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M4 4a2 2 0 0 1 2-2h4.75a.75.75 0 0 1 .53.22l2.25 2.25a.75.75 0 0 1 .22.53V12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm5 .5V3.5l2 2H9.5A.5.5 0 0 1 9 5.5ZM5.5 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5Zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6Z" clipRule="evenodd" /></svg>, title: 'Decision-level logging', desc: 'Every agent response is logged with the query received, the data sources queried, the confidence score, the response given, and the escalation decision - all in one record.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clipRule="evenodd" /></svg>, title: 'Real-time writes', desc: 'Logs are written at the moment of each action - not batched. There is no window where a completed interaction is unlogged.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>, title: 'Full search and filter', desc: 'Search logs by customer, query type, date range, escalation reason, confidence score, or agent action. Find any interaction in seconds.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z" /><path d="M3.5 12.75a.75.75 0 0 0-1.5 0v.5A2.75 2.75 0 0 0 4.75 16h6.5A2.75 2.75 0 0 0 14 13.25v-.5a.75.75 0 0 0-1.5 0v.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-.5Z" /></svg>, title: 'Regulator-ready exports', desc: 'Export logs in structured formats your regulators and auditors expect - CSV, JSON, or custom format via API. Includes all fields required by GDPR and PCI DSS frameworks.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M8 1a2 2 0 0 1 2 2v.5h.5A1.5 1.5 0 0 1 12 5v8a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 13V5a1.5 1.5 0 0 1 1.5-1.5H6V3a2 2 0 0 1 2-2Zm0 1.5a.5.5 0 0 0-.5.5v.5h1V3a.5.5 0 0 0-.5-.5Z" clipRule="evenodd" /></svg>, title: 'Tamper-evident storage', desc: 'Logs are write-once and tamper-evident. No action can be retroactively edited or deleted - including by supVision staff.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M6.783 2.095a7 7 0 0 1 7.176 7.176.75.75 0 0 1-.87.87L11 9.75a.75.75 0 0 1-.75-.75V7.25a.75.75 0 0 0-.75-.75H7.75A.75.75 0 0 1 7 5.75V3.5a.75.75 0 0 0-.75-.75h-.597a.75.75 0 0 1-.87-.655ZM2.095 6.783a7 7 0 0 0 7.176 7.176.75.75 0 0 0 .87-.87L9.75 11a.75.75 0 0 0-.75-.75H7.25a.75.75 0 0 1-.75-.75V7.75A.75.75 0 0 0 5.75 7H3.5a.75.75 0 0 1-.75-.75v-.597a.75.75 0 0 0-.655-.87Z" clipRule="evenodd" /></svg>, title: 'Configurable retention periods', desc: 'Set log retention by query type or data category. Enterprise plans support unlimited retention. Starter and Growth plans include 30 and 90 days respectively.' },
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
