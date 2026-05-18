import IndustryPage from './IndustryPage'

const data = {
  badge: 'For whom · Crypto & Web3',
  title: 'Crypto & Web3',
  subtitle: 'Wallet issues, verification, and volatile-volume support — handled.',
  description: 'Crypto support is unlike any other fintech vertical. Volume spikes without warning when markets move. Wallet and transaction queries require blockchain-level data. KYC requirements are strict and rejection rates are high. supVision handles the full spectrum — with real-time on-chain data and compliance-safe responses.',
  heroImage: '/bg/hero-bg.png',
  highlights: [
    'Elastic capacity — handles market-spike volume without degradation',
    'Blockchain-level transaction data for wallet and withdrawal queries',
    '80% of tier-1 crypto support queries resolved autonomously, 24/7',
  ],
  metrics: [
    { value: '∞', label: 'Elastic capacity — handles volume spikes without degradation' },
    { value: '<2 min', label: 'Median resolution for wallet and transaction queries' },
    { value: '80%', label: 'Of tier-1 crypto support queries resolved autonomously' },
    { value: '24/7', label: 'Always on — crypto markets never close and neither does the agent' },
  ],
  pains: [
    { title: 'Volume spikes are unpredictable', desc: 'A market crash or major listing creates a support surge your team cannot absorb. Queues spike, response times collapse, and users panic.' },
    { title: 'Transaction queries need blockchain data', desc: 'Users ask about stuck transactions, pending withdrawals, and gas fees. Answering correctly requires querying the blockchain — something generic support tools can\'t do.' },
    { title: 'KYC rejection rates are high', desc: 'Crypto KYC is stricter than most verticals. Rejection rates are higher, and users who are rejected become high-volume, frustrated support contacts.' },
    { title: 'Wallet issues require technical precision', desc: 'Wrong network, incorrect address format, unsupported token — these queries require technically precise answers. Generic agents give wrong guidance that costs users real money.' },
    { title: 'Withdrawal holds generate anger', desc: 'AML holds and withdrawal limits are a major source of complaints. Users need clear, accurate explanations — not vague "security review" responses.' },
    { title: 'Community channels overflow', desc: 'Telegram and Discord groups fill with support queries. Without automated handling, community managers spend all their time on individual support issues.' },
  ],
  useCases: [
    { customer: '"My withdrawal has been pending for 2 hours — where is it?"', resolution: 'Agent queries the blockchain explorer and internal ledger, identifies the transaction status (pending confirmation, broadcasting, held for AML review), and gives the customer a precise status with expected confirmation time.' },
    { customer: '"I sent funds to the wrong network. Can I recover them?"', resolution: 'Agent identifies the specific cross-chain error, explains what happened without jargon, and provides the exact recovery path — or escalates to your technical team with the transaction hash and network details attached.' },
    { customer: '"Why was my KYC rejected? I\'ve submitted my documents twice."', resolution: 'Agent retrieves the rejection reason from your KYC provider, explains the specific issue clearly, and walks the user through the correct re-submission — with file format, lighting, and framing guidance tailored to the rejection type.' },
    { customer: '"Why is my withdrawal limit so low? I\'ve been verified for months."', resolution: 'Agent checks the customer\'s verification tier, explains the current limits and the requirements to increase them, and either initiates a limit review or routes the case to your compliance team with the account profile attached.' },
  ],
  ctaTitle: 'Never let a market spike break your support.',
  ctaDesc: 'Elastic AI support built for crypto volume. Live in 3 days.',
}

export default function CryptoWeb3() {
  return <IndustryPage data={data} />
}
