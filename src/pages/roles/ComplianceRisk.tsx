import RolePage from './RolePage'

const data = {
  badge: 'By role · Compliance & Risk',
  title: 'Compliance & Risk',
  subtitle: 'Audit logs, escalation rules, regulator-ready exports.',
  description: 'Every support interaction is a compliance event. Agents who go off-script, escalations that miss SLAs, vulnerable customers who do not get flagged — these are regulatory risks. supVision enforces the right process on every interaction, every time, and logs everything you need for a regulator review.',
  metrics: [
    { value: '100%', label: 'Of interactions logged with full conversation audit trail' },
    { value: '0', label: 'Off-script responses — every answer runs through your approved policy layer' },
    { value: '<5 min', label: 'To export a full audit trail for any customer or date range' },
    { value: '24/7', label: 'Consistent compliance — no late-shift shortcuts or tired agent errors' },
  ],
  pains: [
    { title: 'Agent responses are not guaranteed compliant', desc: 'Your policy says one thing. An agent under pressure says another. Without enforcement at the point of response, compliance depends on training and memory.' },
    { title: 'Vulnerable customer flags are missed', desc: 'Identifying a vulnerable customer depends on the agent recognising the signals. Under volume pressure, those signals get missed — and the regulatory consequences fall on you.' },
    { title: 'Escalation SLAs are manual to track', desc: 'Complaints must be acknowledged within 24 hours. Payment queries have different rules. Tracking these manually creates the risk of a breach going unnoticed.' },
    { title: 'Audit requests take days to fulfil', desc: 'When a regulator asks for all interactions with a customer over a 6-month period, your team has to pull from multiple systems, reconcile records, and manually compile the response.' },
    { title: 'Dis-mis risk in product queries', desc: 'Customers asking about products they hold or are considering need accurate, complete information. An agent who omits a key risk disclosure creates a potential mis-selling case.' },
    { title: 'No consistent record of what agents said', desc: 'If a complaint goes to the FOS, you need to show exactly what your agent said and when. If it was a phone call or an informal chat, that record may not exist.' },
  ],
  useCases: [
    {
      before: 'A customer contacts support asking about their payment plan options. The agent gives a helpful but inaccurate answer that omits a key fee. The customer complains. You have no record of what was said.',
      after: 'supVision responds using your approved policy layer. The answer is accurate, includes all required disclosures, and is logged in full — timestamped, retrievable, and audit-ready.',
    },
    {
      before: 'A customer mentions they have lost their job and are struggling to make repayments. The agent notes it but does not flag it as a vulnerable customer indicator. The case proceeds without the required treatment.',
      after: 'supVision detects vulnerability indicators in real time, flags the customer in your CRM, and routes the case to your specialist team with the relevant context attached.',
    },
    {
      before: 'A complaint comes in on a Friday evening. It sits unacknowledged over the weekend. By Monday, the 24-hour acknowledgment window has passed. You have a breach.',
      after: 'supVision detects the complaint, sends the regulatory acknowledgment immediately, logs the complaint with all required fields, and escalates to your complaints team with the SLA clock running.',
    },
    {
      before: 'The FCA requests all interactions with a specific customer over the last 12 months. Your team spends two days pulling records from your helpdesk, CRM, and email to compile the response.',
      after: 'Every interaction is stored in supVision\'s audit log. You filter by customer and date range, export the full transcript history, and have the regulator response ready in minutes.',
    },
  ],
  ctaTitle: 'Compliant by default. Audit-ready always.',
  ctaDesc: 'Regulatory-grade AI support for fintech compliance teams. Live in 3 days.',
}

export default function ComplianceRisk() {
  return <RolePage data={data} />
}
