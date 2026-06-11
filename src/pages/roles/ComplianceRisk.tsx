import RolePage from './RolePage'

const data = {
  badge: 'By role · Compliance & Risk',
  title: 'Compliance & Risk',
  subtitle: 'Audit logs, escalation rules, and regulator-ready exports - enforced on every interaction.',
  heroImage: '/by_role/compliance.webp',
  highlights: [
    '100% of interactions logged with full conversation audit trail',
    'Zero off-script responses - every answer runs through your approved policy',
    'FCA, GDPR, and PCI DSS aligned from day one',
  ],
  metrics: [
    { value: '100%', label: 'Of interactions logged with full conversation audit trail' },
    { value: '0', label: 'Off-script responses - every answer runs through your approved policy layer' },
    { value: '<5 min', label: 'To export a full audit trail for any customer or date range' },
    { value: '24/7', label: 'Consistent compliance - no late-shift shortcuts or tired agent errors' },
    { value: '3 days', label: 'From contract to live - full policy enforcement from day one' },
  ],
  challenges: [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.589 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.563 2 12.162 2 7c0-.538.035-1.069.104-1.589a.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.749Z" clipRule="evenodd" /></svg>,
      title: 'Agent responses are not guaranteed compliant',
      desc: 'Your policy says one thing. An agent under pressure says another. Without enforcement at the point of response, compliance depends on training and memory.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" /><path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" /></svg>,
      title: 'Vulnerable customer flags are missed',
      desc: 'Identifying a vulnerable customer depends on the agent recognising the signals. Under volume pressure, those signals get missed - and the regulatory consequences fall on you.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" /></svg>,
      title: 'Escalation SLAs are manual to track',
      desc: 'Complaints must be acknowledged within 24 hours. Payment queries have different rules. Tracking these manually creates the risk of a breach going unnoticed.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z" clipRule="evenodd" /></svg>,
      title: 'Audit requests take days to fulfil',
      desc: 'When a regulator asks for all interactions with a customer over a 6-month period, your team has to pull from multiple systems, reconcile records, and manually compile the response.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" /></svg>,
      title: 'Dis-mis risk in product queries',
      desc: 'Customers asking about products they hold or are considering need accurate, complete information. An agent who omits a key risk disclosure creates a potential mis-selling case.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v11.75A2.75 2.75 0 0 0 16.75 18h-12A2.75 2.75 0 0 0 2 15.25V3.5Zm3.75 7a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Zm0 3a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5ZM5 5.75A.75.75 0 0 1 5.75 5h4.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 8.25v-2.5Z" clipRule="evenodd" /><path d="M16.75 2a.75.75 0 0 0-.75.75v14.5c0 .69.56 1.25 1.25 1.25a.75.75 0 0 0 0-1.5V3.5A1.5 1.5 0 0 1 18.5 5a.75.75 0 0 0 0-1.5A3 3 0 0 0 16.75 2Z" /></svg>,
      title: 'No consistent record of what agents said',
      desc: 'If a complaint goes to the FOS, you need to show exactly what your agent said and when. If it was a phone call or an informal chat, that record may not exist.',
    },
  ],
  stacks: [
    { label: 'Audit & compliance', desc: 'Zendesk · Jira · Confluence', logos: [{ logoUrl: '/logos/zendesk.webp', color: '#03363D', letter: 'Z' }, { logoUrl: '/logos/jira.webp', color: '#0052CC', letter: 'J' }, { logoUrl: '/logos/confluence.webp', color: '#0052CC', letter: 'C' }] },
    { label: 'Policy enforcement', desc: 'Salesforce · Freshdesk · Teams', logos: [{ logoUrl: '/logos/salesforce.webp', color: '#00A1E0', letter: 'S' }, { logoUrl: '/logos/freshdesk.webp', color: '#25C16F', letter: 'F' }, { logoUrl: '/logos/teams.webp', color: '#6264A7', letter: 'T' }] },
    { label: 'Regulatory reporting', desc: 'Jira · Confluence · Slack', logos: [{ logoUrl: '/logos/jira.webp', color: '#0052CC', letter: 'J' }, { logoUrl: '/logos/confluence.webp', color: '#0052CC', letter: 'C' }, { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' }] },
    { label: 'Escalation SLA tracking', desc: 'Zendesk · Salesforce · Slack', logos: [{ logoUrl: '/logos/zendesk.webp', color: '#03363D', letter: 'Z' }, { logoUrl: '/logos/salesforce.webp', color: '#00A1E0', letter: 'S' }, { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' }] },
  ],
  ctaTitle: 'Compliant by default. Audit-ready always.',
  ctaDesc: 'Regulatory-grade AI support for fintech compliance teams. Live in 3 days.',
}

export default function ComplianceRisk() {
  return <RolePage data={data} />
}
