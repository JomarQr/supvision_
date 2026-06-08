export type ForWhomItem = {
  label: string
  desc: string
  to: string
  image?: string
}

export const forWhomIndustries: ForWhomItem[] = [
  {
    label: 'Payments & Processing',
    desc: 'Dispute resolution, chargebacks, transaction queries',
    to: '/industries/payments-processing',
    image: '/for_whom/Payments & Processing.png',
  },
  {
    label: 'Digital Banking',
    desc: 'Account support, identity verification, onboarding at scale',
    to: '/industries/neobanks',
    image: '/for_whom/Neobanks & Digital Banking.png',
  },
  {
    label: 'Web3',
    desc: 'Wallet issues, verification, volatile-volume support',
    to: '/industries/crypto-web3',
    image: '/for_whom/Web3.png',
  },
  {
    label: 'Lending & Credit',
    desc: 'Loan queries, repayment issues, eligibility checks',
    to: '/industries/lending-credit',
    image: '/for_whom/Lending & Credit.png',
  },
  {
    label: 'InsurTech',
    desc: 'Claims triage, policy queries, compliance handling',
    to: '/industries/insurtech',
    image: '/for_whom/InsurTech.png',
  },
]

export const forWhomRoles: ForWhomItem[] = [
  {
    label: 'Head of Support',
    desc: 'Cut queues, automate tier-1, free your agents',
    to: '/roles/head-of-support',
    image: '/by_role/support.png',
  },
  {
    label: 'Compliance & Risk',
    desc: 'Audit logs, escalation rules, regulator-ready exports',
    to: '/roles/compliance-risk',
    image: '/by_role/compliance.png',
  },
  {
    label: 'Operations & Growth',
    desc: 'Scale support without scaling headcount',
    to: '/roles/operations-growth',
    image: '/by_role/operations.png',
  },
  {
    label: 'Founders & C-Suite',
    desc: 'Lower costs, faster resolution, measurable ROI',
    to: '/roles/founders-csuite',
    image: '/by_role/Founders%20%26%20C-Suite.png',
  },
]
