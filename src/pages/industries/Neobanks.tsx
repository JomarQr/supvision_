import { useState, useEffect } from 'react'
import IndustryPage from './IndustryPage'

const data = {
  badge: 'For whom · Digital Banking',
  title: 'Digital Banking',
  heroIcon: undefined,
  heroIconBg: '#EAF4EE',
  subtitle: 'Account support, identity verification, and onboarding - at the scale digital banks demand.',
  description: 'Neobanks grow fast and support needs grow faster. Your app is available 24/7 - your customers expect your support to be too. supVision handles the most common queries your team sees every day: verification queues, account issues, card queries, and onboarding drop-offs - without adding headcount.',
  heroImage: '/industry/Neobanks & Digital Banking.webp',
  highlights: [
    'Identity verification and onboarding queries resolved autonomously - no queue, no wait',
    '24/7 account and card support without adding headcount',
    'Full audit trail for every automated decision, regulator-ready',
  ],
  metrics: [
    { value: '24/7', label: 'Support availability matching your app availability' },
    { value: '3 days', label: 'Typical time from signed contract to live agent' },
    { value: '93%', label: 'Of verification-related tickets saved by AI — no human needed' },
    { value: '50+', label: 'Languages supported for international expansion' },
    { value: '98%', label: 'Customer satisfaction score across automated interactions' },
  ],
  challenges: [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M1 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6Zm4 1.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2 3a4 4 0 0 0-3.665 2.395.75.75 0 0 0 .416 1A8.98 8.98 0 0 0 7 14.5a8.98 8.98 0 0 0 3.249-.605.75.75 0 0 0 .416-1.001A4.001 4.001 0 0 0 7 10.5Zm5-3.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm0 6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm.75-3.25a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z" clipRule="evenodd" /></svg>,
      title: 'Verification queues never clear',
      desc: 'Verification status questions flood your inbox. Each one requires a human to log into the identity verification provider, check status, and reply - at scale, this never ends.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM2.046 15.253c-.072.411.164.747.556.747h10.792c.392 0 .628-.336.556-.747a6.001 6.001 0 0 0-11.904 0Z" /><path d="M12.75 7.75a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Z" /></svg>,
      title: 'Onboarding drop-off is invisible',
      desc: 'Customers abandon onboarding without explanation. Without proactive support at the drop-off point, you lose them silently.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M2.5 4A1.5 1.5 0 0 0 1 5.5V6h18v-.5A1.5 1.5 0 0 0 17.5 4h-15ZM19 8.5H1v6A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-6ZM3 13.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm4.75-.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" clipRule="evenodd" /></svg>,
      title: 'Card queries dominate tier-1',
      desc: 'Card blocked, PIN forgotten, limit questions - these are repetitive, low-value queries that consume a disproportionate share of your support capacity.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.503.204A6.5 6.5 0 1 0 5.6 15.2a.75.75 0 0 1-.01-1.24 6.5 6.5 0 0 0 4.41-5.055V8.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.195a6.47 6.47 0 0 0 3.487 5.759.75.75 0 0 1-.488 1.39 7.953 7.953 0 0 1-2.996-1.89Z" clipRule="evenodd" /></svg>,
      title: 'International expansion multiplies the problem',
      desc: 'Every new market brings new language requirements, new regulatory rules, and new support volume. Scaling geographically means scaling headcount - until now.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" /></svg>,
      title: '24/7 expectation vs. 9-to-5 team',
      desc: 'Your app never sleeps but your support team does. Customers in different time zones face long waits that damage retention and app store ratings.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.589 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.563 2 12.162 2 7a11.973 11.973 0 0 1 .104-1.589.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.749Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" /></svg>,
      title: 'Regulatory queries require specialist knowledge',
      desc: 'Questions about account limits, AML flags, and regulatory holds require compliance-aware responses. Front-line agents often lack the knowledge or authority to answer correctly.',
    },
  ],
  stacks: [
    { label: 'Onboarding automation', desc: 'Zendesk · Confluence · Slack', logos: [{ logoUrl: '/logos/zendesk.webp', color: '#03363D', letter: 'Z' }, { logoUrl: '/logos/confluence.webp', color: '#0052CC', letter: 'C' }, { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' }] },
    { label: 'KYC support flow', desc: 'Intercom · Jira · Slack', logos: [{ logoUrl: '/logos/intecom (1).webp', color: '#1F8FEF', letter: 'I' }, { logoUrl: '/logos/jira.webp', color: '#0052CC', letter: 'J' }, { logoUrl: '/logos/slack.webp', color: '#4A154B', letter: 'S' }] },
    { label: 'Core banking queries', desc: 'Mambu · HubSpot · Teams', logos: [{ logoUrl: '/logos/mambu.webp', color: '#FF6B35', letter: 'M' }, { logoUrl: '/logos/hubspot.webp', color: '#FF7A59', letter: 'H' }, { logoUrl: '/logos/teams.webp', color: '#6264A7', letter: 'T' }] },
    { label: 'Multi-channel support', desc: 'Telegram · WhatsApp · Freshdesk', logos: [{ logoUrl: '/logos/telegram.webp', color: '#2AABEE', letter: 'T' }, { logoUrl: '/logos/whatsapp.webp', color: '#25D366', letter: 'W' }, { logoUrl: '/logos/freshdesk.webp', color: '#25C16F', letter: 'F' }] },
  ],
  ctaTitle: 'Scale your neobank without scaling your support team.',
  ctaDesc: '24/7 AI support built for digital banking. Live in 3 days.',
}

export default function Neobanks() {
  const [heroIcon, setHeroIcon] = useState<Record<string, unknown> | undefined>(undefined)
  useEffect(() => {
    import('../../assets/icons-colored/doodle-color-636-bank-branch-hover-roll.json').then(m => setHeroIcon(m.default))
  }, [])
  return <IndustryPage data={{ ...data, heroIcon }} />
}
