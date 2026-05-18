import RolePage from './RolePage'

const data = {
  badge: 'By role · Head of Support',
  title: 'Head of Support',
  subtitle: 'Cut queues, automate tier-1, free your agents.',
  description: 'You know the numbers. Ticket volumes keep climbing, your team is stretched, and hiring more agents is not a sustainable answer. supVision handles the repetitive tier-1 load autonomously so your agents spend their time on cases that actually need them.',
  metrics: [
    { value: '80%', label: 'Of tier-1 queries resolved without agent involvement' },
    { value: '<2 min', label: 'Median first response time across all channels' },
    { value: '52%', label: 'Average reduction in support operating costs' },
    { value: '24/7', label: 'Coverage without shifts, overtime, or on-call rotas' },
  ],
  pains: [
    { title: 'Tier-1 volume is crushing your team', desc: 'Balance queries, status checks, document requests — your agents handle hundreds of these a day. They are skilled people doing data-entry work.' },
    { title: 'Queue times spike unpredictably', desc: 'A product change, a market event, or a regulatory update can triple your inbound volume overnight. There is no way to staff for every spike.' },
    { title: 'Agent onboarding takes too long', desc: 'New agents need weeks of training before they can handle live queries confidently. Every hire is a liability until they are up to speed.' },
    { title: 'Escalations lack context', desc: 'When an agent escalates, the next tier has to start from scratch. No summary, no history, no recommended action — just a raw ticket and a stressed customer.' },
    { title: 'Quality is inconsistent', desc: 'Response quality depends on which agent picks up the ticket. Your best agents are excellent. Your worst create complaints. The average is unpredictable.' },
    { title: 'Reporting is manual', desc: 'Building a weekly support report means pulling exports, writing formulas, and interpreting data that is already a week old by the time it reaches your head.' },
  ],
  useCases: [
    {
      before: 'A customer emails asking for their transaction history for the last 6 months. An agent pulls the account, generates the export, formats it, and sends it. 8 minutes per ticket, 40 tickets a day.',
      after: 'The agent receives the request, pulls the exact date range from your core banking system, generates a formatted PDF, and delivers it — autonomously. Zero agent time.',
    },
    {
      before: 'A volume spike hits on Monday morning. Your team is at capacity by 9am. Queue times hit 4 hours. Some customers give up and call. Others post on social.',
      after: 'supVision absorbs the spike. Tier-1 queries are handled instantly regardless of volume. Your agents see only the cases that need human judgment.',
    },
    {
      before: 'A new agent gets a complex escalation. They have the ticket but no history, no policy context, no suggested next step. They spend 15 minutes researching before they can respond.',
      after: 'Every escalation arrives pre-summarised: account history, query type, what was already tried, recommended action. The agent reads it in 30 seconds and responds.',
    },
    {
      before: 'You need to report on CSAT, resolution rate, and escalation volume for last week. You spend 2 hours extracting data from 3 systems and building a spreadsheet.',
      after: 'supVision logs every interaction with resolution type, handling time, and outcome. Your dashboard is live and always current.',
    },
  ],
  ctaTitle: 'Give your team the work that actually needs them.',
  ctaDesc: 'Tier-1 automation for fintech support teams. Live in 3 days.',
}

export default function HeadOfSupport() {
  return <RolePage data={data} />
}
