import RolePage from './RolePage'

import checkListAnim from '../../assets/challenges-anim/system-solid-78-check-list-hover-check-list.json'
import trendingUpAnim from '../../assets/challenges-anim/system-solid-160-trending-up-hover-trend-up.json'
import clockAnim from '../../assets/challenges-anim/system-solid-67-clock-hover-clock.json'
import infoAnim from '../../assets/challenges-anim/system-solid-28-info-hover-info.json'
import analyticsAnim from '../../assets/challenges-anim/system-solid-10-analytics-hover-analytics.json'
import fileAnim from '../../assets/challenges-anim/system-solid-50-file-hover-file-1.json'

const data = {
  badge: 'By role · Head of Support',
  title: 'Head of Support',
  subtitle: 'Cut queues, automate tier-1, free your agents for the work that actually needs them.',
  heroImage: '/by_role/support.webp',
  highlights: [
    '93% of tickets saved by AI — no human agent needed',
    'Less than 2 minute median response time across all channels',
    '52% average reduction in support operating costs',
  ],
  metrics: [
    { value: '93%', label: 'Of tickets saved by AI — no human agent needed' },
    { value: '<2 min', label: 'Median first response time across all channels' },
    { value: '52%', label: 'Average reduction in support operating costs' },
    { value: '24/7', label: 'Coverage without shifts, overtime, or on-call rotas' },
    { value: '50+', label: 'Languages supported for multilingual support teams' },
  ],
  challenges: [
    {
      icon: checkListAnim,
      title: 'Tier-1 volume is crushing your team',
      desc: 'Balance queries, status checks, document requests - your agents handle hundreds of these a day. They are skilled people doing data-entry work.',
    },
    {
      icon: trendingUpAnim,
      title: 'Queue times spike unpredictably',
      desc: 'A product change, a market event, or a regulatory update can triple your inbound volume overnight. There is no way to staff for every spike.',
    },
    {
      icon: clockAnim,
      title: 'Agent onboarding takes too long',
      desc: 'New agents need weeks of training before they can handle live queries confidently. Every hire is a liability until they are up to speed.',
    },
    {
      icon: infoAnim,
      title: 'Escalations lack context',
      desc: 'When an agent escalates, the next tier has to start from scratch. No summary, no history, no recommended action - just a raw ticket and a stressed customer.',
    },
    {
      icon: analyticsAnim,
      title: 'Quality is inconsistent',
      desc: 'Response quality depends on which agent picks up the ticket. Your best agents are excellent. Your worst create complaints. The average is unpredictable.',
    },
    {
      icon: fileAnim,
      title: 'Reporting is manual',
      desc: 'Building a weekly support report means pulling exports, writing formulas, and interpreting data that is already a week old by the time it reaches your head.',
    },
  ],
  stacks: [
    { label: 'Support automation', desc: 'Zendesk · Jira · Slack', logos: [{ logoUrl: '/logos/zendesk.webp', color: '#03363D', letter: 'Z' }, { logoUrl: '/logos/jira.webp', color: '#0052CC', letter: 'J' }, { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' }] },
    { label: 'Queue management', desc: 'Freshdesk · Teams · Jira', logos: [{ logoUrl: '/logos/freshdesk.webp', color: '#25C16F', letter: 'F' }, { logoUrl: '/logos/teams.webp', color: '#6264A7', letter: 'T' }, { logoUrl: '/logos/jira.webp', color: '#0052CC', letter: 'J' }] },
    { label: 'Agent workflows', desc: 'Intercom · Confluence · Slack', logos: [{ logoUrl: '/logos/intecom (1).webp', color: '#1F8FEF', letter: 'I' }, { logoUrl: '/logos/confluence.webp', color: '#0052CC', letter: 'C' }, { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' }] },
    { label: 'CRM-aware routing', desc: 'HubSpot · Salesforce · Slack', logos: [{ logoUrl: '/logos/hubspot.webp', color: '#FF7A59', letter: 'H' }, { logoUrl: '/logos/salesforce.webp', color: '#00A1E0', letter: 'S' }, { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' }] },
  ],
  ctaTitle: 'Give your team the work that actually needs them.',
  ctaDesc: 'Tier-1 automation for fintech support teams. Live in 3 days.',
}

export default function HeadOfSupport() {
  return <RolePage data={data} />
}
