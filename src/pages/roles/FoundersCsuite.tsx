import RolePage from './RolePage'

const data = {
  badge: 'By role · Founders & C-Suite',
  title: 'Founders & C-Suite',
  subtitle: 'Lower costs, faster resolution, measurable ROI.',
  description: 'You do not have time for tools that take quarters to show results. supVision deploys in 3 days and shows measurable impact within the first week: lower cost per resolution, higher CSAT, and a support function that scales with your business instead of against it.',
  metrics: [
    { value: '52%', label: 'Average reduction in support operating costs' },
    { value: '3 days', label: 'From contract signed to live, handling real customer queries' },
    { value: '98.4%', label: 'Resolution rate for standard fintech support queries' },
    { value: '24/7', label: 'Support coverage with no additional headcount' },
  ],
  pains: [
    { title: 'Support is a cost centre with no clear ROI lever', desc: 'You know support costs money. You know poor support costs customers. But there has never been a clear way to reduce the former without worsening the latter.' },
    { title: 'Regulatory exposure keeps growing', desc: 'Every agent interaction is a potential compliance event. As you scale, the surface area for regulatory risk grows faster than your compliance team can cover.' },
    { title: 'Headcount is your primary scaling mechanism', desc: 'More customers means more tickets means more hires. That model works until it does not — and in competitive fintech markets, it breaks before you expect it to.' },
    { title: 'CSAT is a lagging indicator', desc: 'By the time a CSAT score falls, the customers have already had the bad experience. There is no early warning system for support quality degradation.' },
    { title: 'Support data is not informing the product roadmap', desc: 'Your customers are telling you what is broken, confusing, and missing — through every support ticket. That signal is invisible if it sits in a helpdesk queue.' },
    { title: 'Competitors are moving faster', desc: 'AI-native fintechs are building with automation from day one. If your support model still depends primarily on headcount, you are structurally more expensive than your competition.' },
  ],
  useCases: [
    {
      before: 'Your support cost per resolved ticket is £4.20. At 50,000 tickets a month, that is £210,000. Your growth forecast shows tickets growing 40% next year. You need to hire 8 more agents.',
      after: 'supVision resolves 80% of those tickets autonomously at a fraction of the cost. Your cost per resolution drops significantly. The 40% growth in tickets does not require a single additional hire.',
    },
    {
      before: 'Your head of compliance tells you that a recent FCA review found inconsistencies in how agents handle vulnerability disclosures. The remediation plan involves retraining 15 agents and adding QA reviews.',
      after: 'supVision enforces your compliance policy on every interaction. Vulnerability flags are detected and routed automatically. There is nothing to retrain because the policy is structural.',
    },
    {
      before: 'You are considering launching in a new market. Your CFO flags that support localisation will cost £180k in year one — hiring, training, and tooling for a new language and regulatory context.',
      after: 'supVision handles the new market from day one in the local language, using your local policy documentation. The incremental cost is a fraction of a local support hire.',
    },
    {
      before: 'Your board asks what your customers are complaining about most. You ask your head of support for a summary. They send you a slide with 5 bullet points that took them 3 hours to compile.',
      after: 'supVision categorises every interaction automatically. You pull a live report: top query types, resolution rates, escalation triggers, and CSAT by query category. In 2 minutes.',
    },
  ],
  ctaTitle: 'Support that performs like a product, not a cost centre.',
  ctaDesc: 'Measurable ROI from day one. Live in 3 days.',
}

export default function FoundersCsuite() {
  return <RolePage data={data} />
}
