import IndustryPage from './IndustryPage'
import shieldAnim from '../../assets/icons-colored/doodle-color-14-shield-security-hover-pinch.json'

const data = {
  badge: 'For whom · InsurTech',
  title: 'InsurTech',
  heroIcon: shieldAnim,
  heroIconBg: '#FDE9E9',
  subtitle: 'Claims triage, policy queries, and compliance handling - automated.',
  description: 'InsurTech support combines the regulatory complexity of financial services with the emotional stakes of claims. Customers contacting you about a claim are often stressed. They need fast, accurate, empathetic answers - and everything needs to be logged for regulatory purposes. supVision handles all of it.',
  heroImage: '/industry/InsurTech.webp',
  highlights: [
    '93% of policy and claims status queries saved by AI',
    '100% of interactions logged and audit-ready for FCA and regulatory review',
    'Claims triage handled consistently - no more agent-dependent outcomes',
  ],
  metrics: [
    { value: '93%', label: 'Of policy and claims status queries saved by AI' },
    { value: '<2 min', label: 'Median response time for claims status and policy queries' },
    { value: '100%', label: 'Of interactions logged and audit-ready for FCA and regulatory review' },
    { value: '50+', label: 'Languages for international insurance products' },
    { value: '3 days', label: 'From signed contract to live agent handling real queries' },
  ],
  challenges: [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path d="M2 3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Z" /><path fillRule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 0 1-1.99 1.79H4.802a2 2 0 0 1-1.99-1.79L2 7.5ZM7 11a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z" clipRule="evenodd" /></svg>,
      title: 'Claims status queries overwhelm teams',
      desc: '"Where is my claim?" is the most common insurance support query. Each one requires a claims handler to manually check status and respond - at high volume, this is unsustainable.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z" clipRule="evenodd" /></svg>,
      title: 'Policy queries require document access',
      desc: "Coverage questions, excess queries, and exclusion clarifications require pulling the customer's specific policy. Generic answers create complaints and mis-selling risk.",
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.589 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.563 2 12.162 2 7a11.973 11.973 0 0 1 .104-1.589.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.749Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" /></svg>,
      title: 'Regulatory obligations are strict',
      desc: 'Insurance support is regulated. Every response must meet disclosure requirements. Front-line agents need expensive training and tight script adherence - or you face regulatory action.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" /></svg>,
      title: 'Claims triage is inconsistent',
      desc: 'Whether a claim gets triaged correctly depends on which agent takes the call. Inconsistency leads to incorrect decisions, customer complaints, and FOS referrals.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" /></svg>,
      title: 'Renewal and cancellation queries spike seasonally',
      desc: 'Renewal periods generate a predictable support surge. Without automation, you either overstaff permanently or underserve during peaks.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" /></svg>,
      title: 'Complaints require careful handling',
      desc: 'A complaint handled incorrectly is a regulatory event. Agents need to follow the right process - acknowledging, logging, and escalating within the required timeframes.',
    },
  ],
  stacks: [
    { label: 'Claims triage automation', desc: 'Zendesk · Jira · Slack', logos: [{ logoUrl: '/logos/zendesk.webp', color: '#03363D', letter: 'Z' }, { logoUrl: '/logos/jira.webp', color: '#0052CC', letter: 'J' }, { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' }] },
    { label: 'Policy query handling', desc: 'Freshdesk · Confluence · Teams', logos: [{ logoUrl: '/logos/freshdesk.webp', color: '#25C16F', letter: 'F' }, { logoUrl: '/logos/confluence.webp', color: '#0052CC', letter: 'C' }, { logoUrl: '/logos/teams.webp', color: '#6264A7', letter: 'T' }] },
    { label: 'Compliance logging', desc: 'Salesforce · HubSpot · Slack', logos: [{ logoUrl: '/logos/salesforce.webp', color: '#00A1E0', letter: 'S' }, { logoUrl: '/logos/hubspot.webp', color: '#FF7A59', letter: 'H' }, { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' }] },
    { label: 'Complaint management', desc: 'Intercom · Notion · Jira', logos: [{ logoUrl: '/logos/intecom (1).webp', color: '#1F8FEF', letter: 'I' }, { logoUrl: '/logos/notion.webp', color: '#000', letter: 'N' }, { logoUrl: '/logos/jira.webp', color: '#0052CC', letter: 'J' }] },
  ],
  ctaTitle: 'Handle claims queries at scale, compliantly.',
  ctaDesc: 'Regulated-industry AI support built for InsurTech. Live in 3 days.',
}

export default function InsurTech() {
  return <IndustryPage data={data} />
}
