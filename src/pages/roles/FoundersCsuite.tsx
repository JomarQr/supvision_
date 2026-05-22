import RolePage from './RolePage'

const data = {
  badge: 'By role · Founders & C-Suite',
  title: 'Founders & C-Suite',
  subtitle: 'Lower costs, faster resolution, measurable ROI from day one.',
  heroImage: '/by_role/Founders & C-Suite.png',
  highlights: [
    '52% average reduction in support operating costs',
    'Live in 3 days - measurable impact within the first week',
    'Scales your support function without proportional headcount growth',
  ],
  metrics: [
    { value: '52%', label: 'Average reduction in support operating costs' },
    { value: '3 days', label: 'From contract signed to live, handling real customer queries' },
    { value: '98.4%', label: 'Resolution rate for standard fintech support queries' },
    { value: '24/7', label: 'Support coverage with no additional headcount' },
    { value: '50+', label: 'Languages supported for global market expansion' },
  ],
  challenges: [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path d="M1 4.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 2H3.25A2.25 2.25 0 0 0 1 4.25ZM1 7.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 5H3.25A2.25 2.25 0 0 0 1 7.25ZM7 8a1 1 0 0 0-1 1 8 8 0 0 0 8 8h2a2.5 2.5 0 0 0 0-5h-.5A4.5 4.5 0 0 1 11 7.5v-.5a2.5 2.5 0 0 0-5 0H5a1 1 0 0 0-1 1v1Z" /></svg>,
      title: 'Support is a cost centre with no clear ROI lever',
      desc: 'You know support costs money. You know poor support costs customers. But there has never been a clear way to reduce the former without worsening the latter.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.589 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.563 2 12.162 2 7c0-.538.035-1.069.104-1.589a.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.749Zm2.594 5.916a.75.75 0 0 0-1.152-.96L9.282 9.68 8.22 8.616a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.106-.04l2.49-3.022Z" clipRule="evenodd" /></svg>,
      title: 'Regulatory exposure keeps growing',
      desc: 'Every agent interaction is a potential compliance event. As you scale, the surface area for regulatory risk grows faster than your compliance team can cover.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.808A7.72 7.72 0 0 1 14.5 16Z" /></svg>,
      title: 'Headcount is your primary scaling mechanism',
      desc: 'More customers means more tickets means more hires. That model works until it does not - and in competitive fintech markets, it breaks before you expect it to.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 3 0v-13A1.5 1.5 0 0 0 15.5 2ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9a1.5 1.5 0 0 0 3 0v-9A1.5 1.5 0 0 0 9.5 6ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5a1.5 1.5 0 0 0 3 0v-5A1.5 1.5 0 0 0 3.5 10Z" /></svg>,
      title: 'CSAT is a lagging indicator',
      desc: 'By the time a CSAT score falls, the customers have already had the bad experience. There is no early warning system for support quality degradation.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" /></svg>,
      title: 'Support data is not informing the product roadmap',
      desc: 'Your customers are telling you what is broken, confusing, and missing - through every support ticket. That signal is invisible if it sits in a helpdesk queue.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.268a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" /></svg>,
      title: 'Competitors are moving faster',
      desc: 'AI-native fintechs are building with automation from day one. If your support model still depends primarily on headcount, you are structurally more expensive than your competition.',
    },
  ],
  stacks: [
    { label: 'Cost & ROI reporting', desc: 'Salesforce · HubSpot · Slack', logos: [{ logoUrl: '/logos/salesforce.png', color: '#00A1E0', letter: 'S' }, { logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' }, { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' }] },
    { label: 'Executive dashboards', desc: 'HubSpot · Confluence · Teams', logos: [{ logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' }, { logoUrl: '/logos/confluence.png', color: '#0052CC', letter: 'C' }, { logoUrl: '/logos/teams.png', color: '#6264A7', letter: 'T' }] },
    { label: 'Helpdesk integration', desc: 'Zendesk · Freshdesk · Slack', logos: [{ logoUrl: '/logos/zendesk.png', color: '#03363D', letter: 'Z' }, { logoUrl: '/logos/freshdesk.png', color: '#25C16F', letter: 'F' }, { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' }] },
    { label: 'Market expansion', desc: 'Salesforce · Zendesk · Teams', logos: [{ logoUrl: '/logos/salesforce.png', color: '#00A1E0', letter: 'S' }, { logoUrl: '/logos/zendesk.png', color: '#03363D', letter: 'Z' }, { logoUrl: '/logos/teams.png', color: '#6264A7', letter: 'T' }] },
  ],
  ctaTitle: 'Support that performs like a product, not a cost centre.',
  ctaDesc: 'Measurable ROI from day one. Live in 3 days.',
}

export default function FoundersCsuite() {
  return <RolePage data={data} />
}
