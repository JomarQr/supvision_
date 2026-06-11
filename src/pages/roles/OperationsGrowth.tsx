import RolePage from './RolePage'

const data = {
  badge: 'By role · Operations & Growth',
  title: 'Operations & Growth',
  subtitle: 'Scale support without scaling headcount.',
  heroImage: '/by_role/operations.webp',
  highlights: [
    'Elastic capacity - no queue degradation at any volume',
    '50+ languages supported for international expansion without new hires',
    '52% average reduction in support operating costs',
  ],
  metrics: [
    { value: '52%', label: 'Average reduction in support operating costs after deployment' },
    { value: '3 days', label: 'Typical time from contract to live agent' },
    { value: '50+', label: 'Languages supported for international expansion' },
    { value: '∞', label: 'Elastic capacity - no queue degradation at any volume' },
    { value: '98.4%', label: 'Resolution rate for standard fintech support queries' },
  ],
  challenges: [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path d="M1 4.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 2H3.25A2.25 2.25 0 0 0 1 4.25ZM1 7.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 5H3.25A2.25 2.25 0 0 0 1 7.25ZM7 8a1 1 0 0 0-1 1 8 8 0 0 0 8 8h2a2.5 2.5 0 0 0 0-5h-.5A4.5 4.5 0 0 1 11 7.5v-.5a2.5 2.5 0 0 0-5 0H5a1 1 0 0 0-1 1v1Z" /></svg>,
      title: 'Support costs scale with customers',
      desc: 'Every new user cohort brings proportional support volume. Without automation, growth in customers means growth in headcount - at the same unit economics.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.503.204A6.5 6.5 0 1 0 4.45 15.13a.5.5 0 0 1 .083-.237 5.001 5.001 0 0 1 9.936.001.5.5 0 0 1 .083.237 6.476 6.476 0 0 0 1.945-4.927ZM10 8.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" clipRule="evenodd" /></svg>,
      title: 'New market entry multiplies support complexity',
      desc: 'Expanding to a new country means new languages, new regulations, new products, and a support team with no local knowledge. The lag between expansion and support readiness is a real cost.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" /></svg>,
      title: 'Hiring and training cycles are slow',
      desc: 'From posting a role to a fully trained agent handling live queries takes 2-3 months. Your growth plan cannot depend on a pipeline that slow.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" /></svg>,
      title: 'Process inconsistency creates rework',
      desc: 'When agents handle the same query type differently, you get inconsistent outcomes, repeat contacts, and escalations that should have been resolved first time.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 3 0v-13A1.5 1.5 0 0 0 15.5 2ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9a1.5 1.5 0 0 0 3 0v-9A1.5 1.5 0 0 0 9.5 6ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5a1.5 1.5 0 0 0 3 0v-5A1.5 1.5 0 0 0 3.5 10Z" /></svg>,
      title: 'Support data is not driving decisions',
      desc: 'The queries your customers raise are a direct signal of product gaps, onboarding friction, and policy failures. But if that data lives in tickets, it is not actionable.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12.577 4.878a.75.75 0 0 1 .919-.53l4.78 1.281a.75.75 0 0 1 .531.919l-1.281 4.78a.75.75 0 0 1-1.449-.387l.81-3.022a19.407 19.407 0 0 0-5.594 5.203.75.75 0 0 1-1.139.093L7 10.06l-4.72 4.72a.75.75 0 0 1-1.06-1.061l5.25-5.25a.75.75 0 0 1 1.06 0l3.074 3.073a20.923 20.923 0 0 1 5.545-4.931l-3.042-.815a.75.75 0 0 1-.53-.918Z" clipRule="evenodd" /></svg>,
      title: 'Peak periods require permanent overstaff',
      desc: 'You hire for your busiest periods and carry that cost year-round. The alternative is underservicing peaks - both options are expensive.',
    },
  ],
  stacks: [
    { label: 'Scale operations', desc: 'Zendesk · Jira · Slack', logos: [{ logoUrl: '/logos/zendesk.webp', color: '#03363D', letter: 'Z' }, { logoUrl: '/logos/jira.webp', color: '#0052CC', letter: 'J' }, { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' }] },
    { label: 'Multi-market support', desc: 'Freshdesk · Teams · Confluence', logos: [{ logoUrl: '/logos/freshdesk.webp', color: '#25C16F', letter: 'F' }, { logoUrl: '/logos/teams.webp', color: '#6264A7', letter: 'T' }, { logoUrl: '/logos/confluence.webp', color: '#0052CC', letter: 'C' }] },
    { label: 'Automation flows', desc: 'Intercom · Confluence · Slack', logos: [{ logoUrl: '/logos/intecom (1).webp', color: '#1F8FEF', letter: 'I' }, { logoUrl: '/logos/confluence.webp', color: '#0052CC', letter: 'C' }, { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' }] },
    { label: 'Growth analytics', desc: 'HubSpot · Salesforce · Jira', logos: [{ logoUrl: '/logos/hubspot.webp', color: '#FF7A59', letter: 'H' }, { logoUrl: '/logos/salesforce.webp', color: '#00A1E0', letter: 'S' }, { logoUrl: '/logos/jira.webp', color: '#0052CC', letter: 'J' }] },
  ],
  ctaTitle: 'Grow your customer base, not your support costs.',
  ctaDesc: 'Operational AI support that scales with your ambitions. Live in 3 days.',
}

export default function OperationsGrowth() {
  return <RolePage data={data} />
}
