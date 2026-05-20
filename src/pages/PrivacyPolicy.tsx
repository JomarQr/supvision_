import { Link } from 'react-router-dom'

const sections = [
  {
    title: 'Collection of personal data',
    body: [
      'We collect personal data that you voluntarily provide when you contact us, book a meeting, subscribe to updates, or enter into a commercial relationship with Supvision.AI. This may include your name, email address, phone number, company name, job title, and the content of your messages.',
      'When you use our website, we may also collect technical and usage data such as IP address, browser type, pages visited, and timestamps, as described in our cookie and analytics practices below.',
      'We do not knowingly collect special categories of data unless you choose to send them to us; we discourage sending sensitive personal data through non-encrypted channels.',
    ],
  },
  {
    title: 'Security measures',
    body: [
      'We implement appropriate technical and organisational measures to protect personal data against unauthorised access, alteration, disclosure, or destruction. Data may be stored on systems operated by us or by trusted infrastructure providers under strict contractual terms.',
      'Standard communication through our public website forms and email is not an end-to-end encrypted channel. Do not use it to transmit highly sensitive information unless we have agreed a secure channel with you separately.',
    ],
  },
  {
    title: 'Purpose of data processing',
    body: [
      'We process personal data to respond to enquiries, provide demos and meetings, deliver and improve our AI supervision and automation services, manage client relationships, comply with legal obligations, and, where permitted, send relevant product updates. We do not use your data to train public AI models unless we have a separate written agreement with you that expressly allows it.',
      'If we intend to use data for a new purpose incompatible with the original one, we will inform you and, where required, obtain consent or another lawful basis.',
    ],
  },
  {
    title: 'Data disclosure',
    body: [
      'We may share personal data with trusted processors who help us run the website and services (e.g. hosting, analytics, email delivery), only on our instructions and under data-processing agreements. We may disclose data when required by law or to protect our legitimate rights.',
      'We do not sell your personal data. Where we send commercial communications, we do so in accordance with e-privacy rules and you may opt out at any time using the link in the message or by contacting us.',
    ],
  },
  {
    title: 'Data quality and your rights',
    body: [
      'We aim to keep personal data accurate and limited to what is necessary. Depending on your location, you may have rights to access, rectify, erase, restrict processing, object, data portability, and to lodge a complaint with a supervisory authority.',
      'To exercise these rights in the EU/UK, contact info@supvision.ai. We will respond within the timeframes set by applicable law. If you are in the United States, state privacy laws may grant additional rights; contact us with your request and we will verify and respond in line with applicable rules.',
    ],
  },
  {
    title: 'Cookie policy',
    body: [
      'Our website may use cookies and similar technologies to remember preferences, maintain sessions, and measure traffic. A cookie is a small file stored on your device.',
      'We do not store passwords, full payment card numbers, or similarly sensitive data inside cookies for this site.',
      'Types of cookies may include: (1) strictly necessary cookies required for the site to function; (2) analytics cookies that help us understand aggregate use of pages; (3) preference cookies that remember choices such as language. We will update this list if we introduce materially new categories.',
    ],
  },
  {
    title: 'Managing cookies',
    body: [
      'You can allow, block, or delete cookies through your browser settings. Instructions are available from your browser vendor (e.g. Chrome, Safari, Firefox, Edge). If you block strictly necessary cookies, parts of the site may not work correctly.',
      'If we deploy a cookie-consent banner, you may change preferences through that interface as well. For questions about cookies or this policy, use the contact button below or write to info@supvision.ai.',
    ],
  },
  {
    title: 'Changes to this policy',
    body: [
      'We may update this Privacy Policy from time to time. The "Last updated" date at the end of this page will change when we do. Material changes may be communicated by email to active clients or by a notice on the website. Continued use of the site after changes constitutes acceptance where permitted by law.',
    ],
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="pt-24">

      {/* Hero */}
      <section className="px-4 pt-16 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
            Legal
          </div>
          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-500">
            SUPVISION.AI provides the website and services available at supvision.ai and related subpages. Our postal address is: Harju maakond, Tallinn, Põhja-Tallinna linnaosa, Sõle tn 61a-5, 10313, Estonia. Contact:{' '}
            <a href="mailto:info@supvision.ai" className="font-semibold text-gray-900 hover:underline">info@supvision.ai</a>.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-500">
            This Privacy Policy applies only to this website and the services we offer directly. It does not cover third-party sites you may reach through links here; those sites have their own policies. We describe how we collect, use, and protect personal data in line with the EU General Data Protection Regulation (GDPR), the UK GDPR, and other applicable laws. Please read this page carefully. If you submit data on behalf of someone else, you must inform them and refer them to this policy.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl px-6">
          <div className="divide-y divide-gray-100">
            {sections.map((s) => (
              <div key={s.title} className="py-10">
                <h2 className="text-xl font-bold text-gray-900">{s.title}</h2>
                <div className="mt-4 space-y-4">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-base leading-relaxed text-gray-500">{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-400">Last updated: 13 May 2026</p>

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-gray-50 px-8 py-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900">Questions about your data?</h3>
            <p className="mt-3 text-base text-gray-500">Contact us and we'll respond within the timeframes set by applicable law.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full pl-6 pr-1.5 py-1.5 text-sm font-semibold text-white"
                style={{ backgroundColor: '#214995' }}
              >
                <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/20 transition-transform duration-500 ease-in-out group-hover:scale-[20]" />
                <span className="relative z-10">Contact Supvision</span>
                <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
              <a
                href="mailto:info@supvision.ai"
                className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
              >
                info@supvision.ai →
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
