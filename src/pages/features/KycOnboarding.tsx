import FeaturePage from './FeaturePage'

const data = {
  badge: 'Support Agent · Identity & Onboarding',
  title: 'Identity & Onboarding',
  subtitle: 'Automate identity verification and onboarding flows.',
  description: 'Identity verification is the most common source of support tickets in fintech - and the most repetitive. supVision\'s Support Agent resolves verification status queries, explains document rejections, and guides users through re-submission without a human agent involved. Every interaction is logged and audit-ready.',
  highlights: [
    'Up to 80% reduction in verification-related support tickets',
    'Real-time status pulled directly from your identity provider',
    'Every interaction logged and audit-ready for regulators',
  ],
  coreImage: '/Core Functionalities/dentity & Onboarding.png',
  points: [
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7Zm3 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-2.5 4a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Zm0-2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Z" clipRule="evenodd" /></svg>, title: 'Verification status queries', desc: 'Instantly tells users where they are in the verification process, what is missing, and what to do next - pulling real-time status from your identity verification provider.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M4 4a2 2 0 0 1 2-2h4.75a.75.75 0 0 1 .53.22l2.25 2.25a.75.75 0 0 1 .22.53V12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm5 .5V3.5l2 2H9.5A.5.5 0 0 1 9 5.5ZM5.5 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5Zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6Z" clipRule="evenodd" /></svg>, title: 'Document rejection handling', desc: 'Explains the specific reason a document was rejected (blurry image, expired ID, name mismatch) and walks the user through re-submission step by step.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z" clipRule="evenodd" /><path d="M3.5 12.75a.75.75 0 0 0-1.5 0v.5A2.75 2.75 0 0 0 4.75 16h6.5A2.75 2.75 0 0 0 14 13.25v-.5a.75.75 0 0 0-1.5 0v.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-.5Z" /></svg>, title: 'Re-submission guidance', desc: 'Guides users through the re-upload flow with clear instructions tailored to their specific rejection reason, reducing drop-off and repeat contacts.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clipRule="evenodd" /></svg>, title: 'Processing time communication', desc: 'Sets accurate expectations on review timelines based on your current processing queue - reducing "how long will this take?" tickets by up to 70%.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM3.05 5.5h2.12a10.86 10.86 0 0 0-.56 3H2.06a5.98 5.98 0 0 1 .99-3ZM2.06 9.5h2.55c.07 1.06.28 2.08.56 3H3.05a5.98 5.98 0 0 1-.99-3Zm4.06-4h3.76c.25.9.42 1.93.45 3H5.67c.03-1.07.2-2.1.45-3Zm0 4h3.76c-.25.9-.42 1.93-.45 3H5.67c-.03-1.07.2-2.1.45-3Zm1.26-6.94c-.44.7-.81 1.62-1.07 2.94h2.38c-.26-1.32-.63-2.24-1.07-2.94a6.03 6.03 0 0 0-.24 0Zm-.24 9.88c.44-.7.81-1.62 1.07-2.94H5.83c.26 1.32.63 2.24 1.07 2.94.08.01.16.01.24 0Zm4.81-5.94c-.07-1.06-.28-2.08-.56-3h2.12c.53.9.9 1.92.99 3h-2.55Zm.99 1h-2.55a10.86 10.86 0 0 1-.56 3h2.12a5.98 5.98 0 0 0 .99-3Z" /></svg>, title: 'Multi-jurisdiction support', desc: 'Knows the document requirements for each geography you operate in. A user in Germany gets different guidance than one in the UAE or Singapore.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M4 4a2 2 0 0 1 2-2h4.75a.75.75 0 0 1 .53.22l2.25 2.25a.75.75 0 0 1 .22.53V12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2.5 7a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5Zm.5-3.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H7Z" clipRule="evenodd" /></svg>, title: 'Audit-ready decision logs', desc: 'Every identity verification conversation is logged with the data retrieved, the response given, and the outcome - exportable for regulatory review.' },
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
