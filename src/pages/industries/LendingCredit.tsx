import IndustryPage from './IndustryPage'

const data = {
  badge: 'For whom · Lending & Credit',
  title: 'Lending & Credit',
  subtitle: 'Loan queries, repayment issues, and eligibility checks - resolved instantly.',
  description: 'Lending support is high-stakes and regulation-heavy. Customers under financial stress need fast, accurate answers. Your team needs to respond without giving advice that crosses regulatory lines. supVision handles the most common lending queries autonomously - accurately, compliantly, and at any volume.',
  heroImage: '/for_whom/Lending & Credit.png',
  highlights: [
    '98.4% resolution rate for standard lending support queries',
    'Repayment and eligibility queries resolved in under 2 minutes',
    'Compliant collections interactions with built-in regulatory guardrails',
  ],
  metrics: [
    { value: '98.4%', label: 'Resolution rate for standard lending support queries' },
    { value: '52%', label: 'Average reduction in support operating costs' },
    { value: '<2 min', label: 'Median resolution time for repayment and eligibility queries' },
    { value: '24/7', label: 'Support availability for customers in financial difficulty' },
    { value: '50+', label: 'Languages for cross-border lending operations' },
  ],
  challenges: [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" /></svg>,
      title: 'Repayment queries are time-sensitive',
      desc: 'Customers missing a payment need answers immediately. Delays increase the risk of default and damage your relationship with borrowers who could be retained.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" /></svg>,
      title: 'Eligibility queries require data lookup',
      desc: 'Customers ask whether they qualify for a top-up, a rate review, or a product. Each requires pulling account data - a manual process that creates queues.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.589 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.563 2 12.162 2 7a11.973 11.973 0 0 1 .104-1.589.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.749Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" /></svg>,
      title: 'Collections interactions need compliance guardrails',
      desc: 'Agents handling arrears queries must follow strict regulatory scripts. Deviation creates compliance risk. Training is expensive and turnover is high.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" /></svg>,
      title: 'Restructuring requests are complex',
      desc: 'Payment holidays, term extensions, and restructuring requests require eligibility checks, regulatory disclosures, and sometimes credit decisions - all creating support load.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z" clipRule="evenodd" /></svg>,
      title: 'Statement and document requests are high-volume',
      desc: 'Customers regularly request loan statements, repayment schedules, and settlement figures. Each is a manual generation and delivery task.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-2.09c-1.11-1.065-2.24-2.534-2.987-4.243C2.034 8.376 1.75 6.835 2.312 5.44A4.752 4.752 0 0 1 6.75 2.75a4.75 4.75 0 0 1 3.25 1.28 4.75 4.75 0 0 1 3.25-1.28 4.752 4.752 0 0 1 4.438 2.7c.562 1.396.278 2.937-.319 4.447-.747 1.709-1.877 3.178-2.987 4.243a22.048 22.048 0 0 1-2.582 2.09 21.37 21.37 0 0 1-1.181.692l-.005.003-.002.001-.001.001Z" /></svg>,
      title: 'Vulnerable customer handling requires care',
      desc: 'Customers in financial difficulty need a different approach - empathetic, accurate, and aware of regulatory obligations around vulnerable customer treatment.',
    },
  ],
  stacks: [
    { label: 'Repayment support', desc: 'Zendesk · Mambu · Slack', logos: [{ logoUrl: '/logos/zendesk.png', color: '#03363D', letter: 'Z' }, { logoUrl: '/logos/mambu.png', color: '#FF6B35', letter: 'M' }, { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' }] },
    { label: 'Eligibility queries', desc: 'Salesforce · HubSpot · Teams', logos: [{ logoUrl: '/logos/salesforce.png', color: '#00A1E0', letter: 'S' }, { logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' }, { logoUrl: '/logos/teams.png', color: '#6264A7', letter: 'T' }] },
    { label: 'Collections flow', desc: 'Freshdesk · Confluence · Slack', logos: [{ logoUrl: '/logos/freshdesk.png', color: '#25C16F', letter: 'F' }, { logoUrl: '/logos/confluence.png', color: '#0052CC', letter: 'C' }, { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' }] },
    { label: 'Document requests', desc: 'Intercom · Notion · HubSpot', logos: [{ logoUrl: '/logos/intecom (1).png', color: '#1F8FEF', letter: 'I' }, { logoUrl: '/logos/notion.png', color: '#000', letter: 'N' }, { logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' }] },
  ],
  ctaTitle: 'Give borrowers the answers they need, instantly.',
  ctaDesc: 'Compliant, accurate lending support at any volume. Live in 3 days.',
}

export default function LendingCredit() {
  return <IndustryPage data={data} />
}
