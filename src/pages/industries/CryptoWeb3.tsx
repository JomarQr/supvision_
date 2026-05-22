import IndustryPage from './IndustryPage'

const data = {
  badge: 'For whom · Web3',
  title: 'Web3',
  subtitle: 'Wallet issues, verification, and volatile-volume support - handled.',
  description: 'Web3 support is unlike any other fintech vertical. Volume spikes without warning when markets move. Wallet and transaction queries require blockchain-level data. Verification requirements are strict and rejection rates are high. supVision handles the full spectrum - with real-time on-chain data and compliance-safe responses.',
  heroImage: '/for_whom/Web3.png',
  highlights: [
    'Elastic capacity - handles market-spike volume without degradation',
    'Blockchain-level transaction data for wallet and withdrawal queries',
    '80% of tier-1 Web3 support queries resolved autonomously, 24/7',
  ],
  metrics: [
    { value: '∞', label: 'Elastic capacity - handles volume spikes without degradation' },
    { value: '<2 min', label: 'Median resolution for wallet and transaction queries' },
    { value: '80%', label: 'Of tier-1 Web3 support queries resolved autonomously' },
    { value: '24/7', label: 'Always on - Web3 markets never close and neither does the agent' },
    { value: '3 days', label: 'From signed contract to live agent handling real queries' },
  ],
  challenges: [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12.577 4.878a.75.75 0 0 1 .919-.53l4.78 1.281a.75.75 0 0 1 .531.919l-1.281 4.78a.75.75 0 0 1-1.449-.387l.81-3.022a19.407 19.407 0 0 0-5.594 5.203.75.75 0 0 1-1.139.093L7 10.06l-4.72 4.72a.75.75 0 0 1-1.06-1.061l5.25-5.25a.75.75 0 0 1 1.06 0l3.074 3.073a20.923 20.923 0 0 1 5.545-4.931l-3.042-.815a.75.75 0 0 1-.53-.918Z" clipRule="evenodd" /></svg>,
      title: 'Volume spikes are unpredictable',
      desc: 'A market crash or major listing creates a support surge your team cannot absorb. Queues spike, response times collapse, and users panic.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" /><path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" /></svg>,
      title: 'Transaction queries need blockchain data',
      desc: 'Users ask about stuck transactions, pending withdrawals, and gas fees. Answering correctly requires querying the blockchain - something generic support tools cannot do.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M1 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6Zm4 1.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2 3a4 4 0 0 0-3.665 2.395.75.75 0 0 0 .416 1A8.98 8.98 0 0 0 7 14.5a8.98 8.98 0 0 0 3.249-.605.75.75 0 0 0 .416-1.001A4.001 4.001 0 0 0 7 10.5Zm5-3.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm0 6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm.75-3.25a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z" clipRule="evenodd" /></svg>,
      title: 'Verification rejection rates are high',
      desc: 'Web3 identity verification is stricter than most verticals. Rejection rates are higher, and users who are rejected become high-volume, frustrated support contacts.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M2.5 4A1.5 1.5 0 0 0 1 5.5V6h18v-.5A1.5 1.5 0 0 0 17.5 4h-15ZM19 8.5H1v6A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-6ZM3 13.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm4.75-.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" clipRule="evenodd" /></svg>,
      title: 'Wallet issues require technical precision',
      desc: 'Wrong network, incorrect address format, unsupported token - these queries require technically precise answers. Generic agents give wrong guidance that costs users real money.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" /></svg>,
      title: 'Withdrawal holds generate anger',
      desc: 'AML holds and withdrawal limits are a major source of complaints. Users need clear, accurate explanations - not vague "security review" responses.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M3.43 2.524A41.29 41.29 0 0 1 10 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.202 41.202 0 0 1-5.183.501.78.78 0 0 0-.528.224l-3.579 3.58A.75.75 0 0 1 6 17.25v-3.443a41.033 41.033 0 0 1-2.57-.372C1.993 13.174 1 11.916 1 10.504V5.426c0-1.413.993-2.67 2.43-2.902Z" clipRule="evenodd" /></svg>,
      title: 'Community channels overflow',
      desc: 'Telegram and Discord groups fill with support queries. Without automated handling, community managers spend all their time on individual support issues.',
    },
  ],
  stacks: [
    { label: 'Wallet support', desc: 'Zendesk · Telegram · Slack', logos: [{ logoUrl: '/logos/zendesk.png', color: '#03363D', letter: 'Z' }, { logoUrl: '/logos/telegram.png', color: '#2AABEE', letter: 'T' }, { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' }] },
    { label: 'Withdrawal queries', desc: 'Intercom · WhatsApp · Jira', logos: [{ logoUrl: '/logos/intecom (1).png', color: '#1F8FEF', letter: 'I' }, { logoUrl: '/logos/whatsapp.png', color: '#25D366', letter: 'W' }, { logoUrl: '/logos/jira.png', color: '#0052CC', letter: 'J' }] },
    { label: 'Verification flow', desc: 'Freshdesk · Confluence · Slack', logos: [{ logoUrl: '/logos/freshdesk.png', color: '#25C16F', letter: 'F' }, { logoUrl: '/logos/confluence.png', color: '#0052CC', letter: 'C' }, { logoUrl: '/logos/slack.png', color: '#4A154B', letter: 'S' }] },
    { label: 'Community support', desc: 'Telegram · WhatsApp · HubSpot', logos: [{ logoUrl: '/logos/telegram.png', color: '#2AABEE', letter: 'T' }, { logoUrl: '/logos/whatsapp.png', color: '#25D366', letter: 'W' }, { logoUrl: '/logos/hubspot.png', color: '#FF7A59', letter: 'H' }] },
  ],
  ctaTitle: 'Never let a market spike break your support.',
  ctaDesc: 'Elastic AI support built for Web3 volume. Live in 3 days.',
}

export default function CryptoWeb3() {
  return <IndustryPage data={data} />
}
