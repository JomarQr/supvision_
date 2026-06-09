import IndustryPage from './IndustryPage'
import cardExchangeAnim from '../../assets/icons-colored/doodle-color-60-card-exchange-hover-pinch.json'

const data = {
  badge: 'For whom · Payments & Processing',
  title: 'Payments & Processing',
  heroIcon: cardExchangeAnim,
  heroIconBg: '#E9F3FB',
  subtitle: 'Dispute resolution, chargebacks, and transaction queries - automated.',
  description: 'Payment companies handle some of the highest-stakes customer support in fintech. A declined transaction at checkout costs the merchant. An unresolved dispute can become a chargeback that costs you. supVision resolves payment queries in real time, with full transaction data, before they escalate.',
  heroImage: '/industry/Payments & Processing.webp',
  highlights: [
    'Automated chargeback and dispute resolution - median response under 2 minutes',
    'Real-time transaction status queries answered without agent involvement',
    'PCI DSS aligned - no raw card data ever touches our system',
  ],
  metrics: [
    { value: '<2 min', label: 'Median resolution for transaction disputes and failure queries' },
    { value: '93%', label: 'Of tier-1 payment queries saved by AI' },
    { value: '52%', label: 'Average reduction in support operating costs' },
    { value: '24/7', label: 'Availability across all payment channels and geographies' },
    { value: '50+', label: 'Languages supported for global payment operations' },
  ],
  challenges: [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path d="M2 3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Z" /><path fillRule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 0 1-1.99 1.79H4.802a2 2 0 0 1-1.99-1.79L2 7.5Zm5.22 1.72a.75.75 0 0 1 1.06 0L10 10.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L11.06 12l1.72 1.72a.75.75 0 1 1-1.06 1.06L10 13.06l-1.72 1.72a.75.75 0 0 1-1.06-1.06L8.94 12 7.22 10.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg>,
      title: 'Dispute queues pile up',
      desc: 'Transaction disputes arrive faster than your team can process them. Manual review takes days, customers escalate, and chargeback rates climb.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" /><path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" /></svg>,
      title: 'Decline codes are opaque',
      desc: 'Customers get a generic "payment failed" message. Your support team has to manually look up decline codes and translate them into plain language one ticket at a time.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" /></svg>,
      title: 'Refund queries are repetitive',
      desc: 'The same refund status questions arrive hundreds of times a day. Each one requires a support agent to log in, look it up, and reply manually.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12.577 4.878a.75.75 0 0 1 .919-.53l4.78 1.281a.75.75 0 0 1 .531.919l-1.281 4.78a.75.75 0 0 1-1.449-.387l.81-3.022a19.407 19.407 0 0 0-5.594 5.203.75.75 0 0 1-1.139.093L7 10.06l-4.72 4.72a.75.75 0 0 1-1.06-1.061l5.25-5.25a.75.75 0 0 1 1.06 0l3.074 3.073a20.923 20.923 0 0 1 5.545-4.931l-3.042-.815a.75.75 0 0 1-.53-.918Z" clipRule="evenodd" /></svg>,
      title: 'Peak volume spikes break teams',
      desc: 'Black Friday, end-of-month billing, or a processing outage creates a support spike your team cannot handle without emergency hiring.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z" clipRule="evenodd" /></svg>,
      title: 'Chargeback documentation is manual',
      desc: 'Building the evidence package for representment takes your ops team hours per case - time spent on paperwork instead of resolution.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 1-11.964-3.592A6.5 6.5 0 0 1 10 3.5c.54 0 1.064.066 1.566.19l-1.2 1.233A5 5 0 1 0 15 10h-1.5Zm-6.384-2.116a.75.75 0 0 1 1.06.032L13.5 10.5V7.25a.75.75 0 0 1 1.5 0v5a.75.75 0 0 1-.75.75h-5a.75.75 0 0 1 0-1.5h3.085l-2.303-2.384a.75.75 0 0 1 .084-1.232Z" clipRule="evenodd" /></svg>,
      title: 'Multi-currency queries need expertise',
      desc: 'Customers processing in multiple currencies ask about FX rates, settlement timing, and currency conversion fees. These require specialist knowledge your front-line team often lacks.',
    },
  ],
  stacks: [
    { label: 'Dispute resolution flow', desc: 'Zendesk · Jira · Slack', logos: [{ logoUrl: '/logos/zendesk.webp', color: '#03363D', letter: 'Z' }, { logoUrl: '/logos/jira.webp', color: '#0052CC', letter: 'J' }, { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' }] },
    { label: 'Chargeback automation', desc: 'Salesforce · Freshdesk · Teams', logos: [{ logoUrl: '/logos/salesforce.webp', color: '#00A1E0', letter: 'S' }, { logoUrl: '/logos/freshdesk.webp', color: '#25C16F', letter: 'F' }, { logoUrl: '/logos/teams.webp', color: '#6264A7', letter: 'T' }] },
    { label: 'Transaction support', desc: 'Intercom · Confluence · Slack', logos: [{ logoUrl: '/logos/intecom (1).webp', color: '#1F8FEF', letter: 'I' }, { logoUrl: '/logos/confluence.webp', color: '#0052CC', letter: 'C' }, { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' }] },
    { label: 'CRM-aware support', desc: 'HubSpot · Salesforce · Slack', logos: [{ logoUrl: '/logos/hubspot.webp', color: '#FF7A59', letter: 'H' }, { logoUrl: '/logos/salesforce.webp', color: '#00A1E0', letter: 'S' }, { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' }] },
  ],
  ctaTitle: 'Stop losing customers to slow dispute resolution.',
  ctaDesc: 'Automated payment support with full transaction data. Live in 3 days.',
}

export default function PaymentsProcessing() {
  return <IndustryPage data={data} />
}
