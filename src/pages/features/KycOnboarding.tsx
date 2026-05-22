import FeaturePage from './FeaturePage'

const data = {
  badge: 'Support Agent · Identity & Onboarding',
  title: 'Identity & Onboarding',
  subtitle: 'Automate identity verification and onboarding flows.',
  description: 'Identity verification is the most common source of support tickets in fintech - and the most repetitive. supVision\'s Support Agent resolves verification status queries, explains document rejections, and guides users through re-submission without a human agent involved. Every interaction is logged and audit-ready.',
  points: [
    { icon: '🪪', title: 'Verification status queries', desc: 'Instantly tells users where they are in the verification process, what is missing, and what to do next - pulling real-time status from your identity verification provider.' },
    { icon: '📄', title: 'Document rejection handling', desc: 'Explains the specific reason a document was rejected (blurry image, expired ID, name mismatch) and walks the user through re-submission step by step.' },
    { icon: '🔄', title: 'Re-submission guidance', desc: 'Guides users through the re-upload flow with clear instructions tailored to their specific rejection reason, reducing drop-off and repeat contacts.' },
    { icon: '⏱️', title: 'Processing time communication', desc: 'Sets accurate expectations on review timelines based on your current processing queue - reducing "how long will this take?" tickets by up to 70%.' },
    { icon: '🌍', title: 'Multi-jurisdiction support', desc: 'Knows the document requirements for each geography you operate in. A user in Germany gets different guidance than one in the UAE or Singapore.' },
    { icon: '📋', title: 'Audit-ready decision logs', desc: 'Every identity verification conversation is logged with the data retrieved, the response given, and the outcome - exportable for regulatory review.' },
  ],
  steps: [
    { step: '01', title: 'User submits query', desc: 'The user asks about their verification status, a rejection, or a missing step - via chat, email, WhatsApp, or Telegram.' },
    { step: '02', title: 'Agent reads live verification data', desc: 'Pulls the current verification status, rejection codes, and pending documents directly from your identity provider API.' },
    { step: '03', title: 'Responds with precision', desc: 'Gives the user the exact status, explains the issue in plain language, and provides the next step - no vague "our team is reviewing" responses.' },
    { step: '04', title: 'Logs everything', desc: 'The full decision trail is written to your audit log in real time - what data was retrieved, what was said, and what action was taken.' },
  ],
  ctaTitle: 'Stop losing users at identity verification.',
  ctaDesc: 'Automate verification support and cut verification-related ticket volume by up to 80%.',
}

const faq = [
  { q: 'Which identity verification providers does supVision integrate with?', a: 'Sumsub, Jumio, Onfido, and Veriff out of the box. Any identity provider with a REST API can be connected during onboarding.' },
  { q: 'Can the agent re-trigger a verification check?', a: 'Yes, if you grant the agent write access to your identity verification provider. By default it operates in read-only mode - escalating re-submission actions to your team or guiding the user to complete them manually.' },
  { q: 'Does the agent handle video verification queries?', a: 'Yes. It can explain the video verification process, communicate scheduling options if you use live video verification, and handle failed session queries.' },
  { q: 'What happens for users who need manual review?', a: 'The agent identifies these cases, communicates the status clearly, and escalates to your compliance team with full context - including all previous contact history and the rejection reason.' },
]

export default function KycOnboarding() {
  return <FeaturePage data={data} faq={faq} />
}
