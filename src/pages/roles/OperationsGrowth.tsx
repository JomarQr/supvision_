import RolePage from './RolePage'

const data = {
  badge: 'By role · Operations & Growth',
  title: 'Operations & Growth',
  subtitle: 'Scale support without scaling headcount.',
  description: 'You are responsible for doing more with what you have. Every new product, every new market, every new customer cohort adds support load. supVision absorbs that load without a proportional increase in cost or headcount — so growth does not break your operations.',
  metrics: [
    { value: '52%', label: 'Average reduction in support operating costs after deployment' },
    { value: '3 days', label: 'Typical time from contract to live agent' },
    { value: '50+', label: 'Languages supported for international expansion' },
    { value: '∞', label: 'Elastic capacity — no queue degradation at any volume' },
  ],
  pains: [
    { title: 'Support costs scale with customers', desc: 'Every new user cohort brings proportional support volume. Without automation, growth in customers means growth in headcount — at the same unit economics.' },
    { title: 'New market entry multiplies support complexity', desc: 'Expanding to a new country means new languages, new regulations, new products, and a support team with no local knowledge. The lag between expansion and support readiness is a real cost.' },
    { title: 'Hiring and training cycles are slow', desc: 'From posting a role to a fully trained agent handling live queries takes 2-3 months. Your growth plan cannot depend on a pipeline that slow.' },
    { title: 'Process inconsistency creates rework', desc: 'When agents handle the same query type differently, you get inconsistent outcomes, repeat contacts, and escalations that should have been resolved first time.' },
    { title: 'Support data is not driving decisions', desc: 'The queries your customers raise are a direct signal of product gaps, onboarding friction, and policy failures. But if that data lives in tickets, it is not actionable.' },
    { title: 'Peak periods require permanent overstaff', desc: 'You hire for your busiest periods and carry that cost year-round. The alternative is underservicing peaks — both options are expensive.' },
  ],
  useCases: [
    {
      before: 'You launch in Germany. You need German-speaking agents, trained on local regulations, available from day one. You spend 6 weeks hiring and training before you can accept customers.',
      after: 'supVision deploys in German on day one. It handles the full tier-1 load from launch, using your German policy documentation, without a single new hire.',
    },
    {
      before: 'A new product launches and your support team does not know it well enough to answer queries confidently. Customers get vague answers. Escalation rates spike. Your team is frustrated.',
      after: 'You load the product documentation into supVision before launch. From day one, the agent answers product queries accurately and consistently — without any agent training lag.',
    },
    {
      before: 'Your monthly support cost is 12% of revenue. Every growth forecast shows that number staying flat or rising as you scale. It is a structural cost that compounds.',
      after: 'supVision handles 80% of tier-1 queries autonomously. Your cost per resolved query drops. As volume scales, the ratio improves further — the unit economics invert.',
    },
    {
      before: 'You want to know what your customers are asking about most. You ask your support team lead, who gives you an anecdotal answer based on their queue that week.',
      after: 'supVision categorises every interaction by query type, product, and outcome. You see exactly what customers are asking, where resolution rates are low, and where to focus product and policy changes.',
    },
  ],
  ctaTitle: 'Grow your customer base, not your support costs.',
  ctaDesc: 'Operational AI support that scales with your ambitions. Live in 3 days.',
}

export default function OperationsGrowth() {
  return <RolePage data={data} />
}
