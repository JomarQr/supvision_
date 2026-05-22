import RolePage from './RolePage'

const data = {
  badge: 'By role · Head of Support',
  title: 'Head of Support',
  subtitle: 'Cut queues, automate tier-1, free your agents for the work that actually needs them.',
  heroImage: '/by_role/support.png',
  highlights: [
    '80% of tier-1 queries resolved without agent involvement',
    'Less than 2 minute median response time across all channels',
    '52% average reduction in support operating costs',
  ],
  metrics: [
    { value: '80%', label: 'Of tier-1 queries resolved without agent involvement' },
    { value: '<2 min', label: 'Median first response time across all channels' },
    { value: '52%', label: 'Average reduction in support operating costs' },
    { value: '24/7', label: 'Coverage without shifts, overtime, or on-call rotas' },
    { value: '50+', label: 'Languages supported for multilingual support teams' },
  ],
  challenges: [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h13.25c1.035 0 1.875-.84 1.875-1.875V9.832a3.375 3.375 0 0 0-.722-2.079l-1.606-2.142a1.875 1.875 0 0 0-1.495-.746H4.323c-.578 0-1.125.262-1.495.746L1.222 7.753A3.375 3.375 0 0 0 1.5 9.832ZM11.5 11.5h-3a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5Z" clipRule="evenodd" /><path fillRule="evenodd" d="M1.5 4.25A2.25 2.25 0 0 1 3.75 2h12.5A2.25 2.25 0 0 1 18.5 4.25v1.085a3.375 3.375 0 0 0-1.89-.735H3.39a3.375 3.375 0 0 0-1.89.735V4.25Z" clipRule="evenodd" /></svg>,
      title: 'Tier-1 volume is crushing your team',
      desc: 'Balance queries, status checks, document requests - your agents handle hundreds of these a day. They are skilled people doing data-entry work.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12.577 4.878a.75.75 0 0 1 .919-.53l4.78 1.281a.75.75 0 0 1 .531.919l-1.281 4.78a.75.75 0 0 1-1.449-.387l.81-3.022a19.407 19.407 0 0 0-5.594 5.203.75.75 0 0 1-1.139.093L7 10.06l-4.72 4.72a.75.75 0 0 1-1.06-1.061l5.25-5.25a.75.75 0 0 1 1.06 0l3.074 3.073a20.923 20.923 0 0 1 5.545-4.931l-3.042-.815a.75.75 0 0 1-.53-.918Z" clipRule="evenodd" /></svg>,
      title: 'Queue times spike unpredictably',
      desc: 'A product change, a market event, or a regulatory update can triple your inbound volume overnight. There is no way to staff for every spike.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" /></svg>,
      title: 'Agent onboarding takes too long',
      desc: 'New agents need weeks of training before they can handle live queries confidently. Every hire is a liability until they are up to speed.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" /></svg>,
      title: 'Escalations lack context',
      desc: 'When an agent escalates, the next tier has to start from scratch. No summary, no history, no recommended action - just a raw ticket and a stressed customer.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 3 0v-13A1.5 1.5 0 0 0 15.5 2ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9a1.5 1.5 0 0 0 3 0v-9A1.5 1.5 0 0 0 9.5 6ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5a1.5 1.5 0 0 0 3 0v-5A1.5 1.5 0 0 0 3.5 10Z" /></svg>,
      title: 'Quality is inconsistent',
      desc: 'Response quality depends on which agent picks up the ticket. Your best agents are excellent. Your worst create complaints. The average is unpredictable.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z" clipRule="evenodd" /></svg>,
      title: 'Reporting is manual',
      desc: 'Building a weekly support report means pulling exports, writing formulas, and interpreting data that is already a week old by the time it reaches your head.',
    },
  ],
  stacks: [
    { label: 'Support automation', desc: 'Zendesk · Jira · Slack', logos: [{ logoUrl: '/logos/zendesk.png', color: '#03363D', letter: 'Z' }, { logoUrl: '/logos/jira.png', color: '#0052CC', letter: 'J' }, { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' }] },
    { label: 'Queue management', desc: 'Freshdesk · Teams · Jira', logos: [{ logoUrl: '/logos/freshdesk.png', color: '#25C16F', letter: 'F' }, { logoUrl: '/logos/teams.png', color: '#6264A7', letter: 'T' }, { logoUrl: '/logos/jira.png', color: '#0052CC', letter: 'J' }] },
    { label: 'Agent workflows', desc: 'Intercom · Confluence · Slack', logos: [{ logoUrl: '/logos/intecom (1).png', color: '#1F8FEF', letter: 'I' }, { logoUrl: '/logos/confluence.png', color: '#0052CC', letter: 'C' }, { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' }] },
    { label: 'CRM-aware routing', desc: 'HubSpot · Salesforce · Slack', logos: [{ logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' }, { logoUrl: '/logos/salesforce.png', color: '#00A1E0', letter: 'S' }, { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' }] },
  ],
  ctaTitle: 'Give your team the work that actually needs them.',
  ctaDesc: 'Tier-1 automation for fintech support teams. Live in 3 days.',
}

export default function HeadOfSupport() {
  return <RolePage data={data} />
}
