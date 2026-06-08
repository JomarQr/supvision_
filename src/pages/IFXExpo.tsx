import { FormEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { submitContactForm } from '../lib/contactApi'
import PageMeta from '../components/PageMeta'

const CALENDLY_URL = 'https://calendly.com/jevgenij-s-supvision/30min'

const canelaStyle = { fontFamily: "'Nohemi', sans-serif", fontWeight: 300 } as const

export default function IFXExpo() {
  const [submitted, setSubmitted] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formStartedAt] = useState(() => Date.now())
  const formRef = useRef<HTMLFormElement>(null)

  function openCalendly() {
    const Cal = (window as any).Calendly
    if (!Cal) return
    document.body.style.overflow = 'hidden'
    Cal.showPopupWidget(CALENDLY_URL)
    const observer = new MutationObserver(() => {
      if (!document.querySelector('.calendly-overlay')) {
        document.body.style.overflow = ''
        observer.disconnect()
      }
    })
    observer.observe(document.body, { childList: true })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = formRef.current
    const valid = form?.checkValidity() ?? false
    setFormIsValid(valid)
    setAttempted(true)
    if (!valid || !agreed || !form) return

    const name = (form.querySelector('#ifx-name') as HTMLInputElement).value.trim()
    const email = (form.querySelector('#ifx-email') as HTMLInputElement).value.trim()
    const phone = (form.querySelector('#ifx-phone') as HTMLInputElement).value.trim()
    const company = (form.querySelector('#ifx-company') as HTMLInputElement).value.trim()
    const message = (form.querySelector('#ifx-message') as HTMLTextAreaElement).value.trim()

    const fullMessage = [
      '[iFX EXPO 2026 — Contact enquiry]',
      company ? `Company: ${company}` : '',
      phone ? `Phone / Telegram: ${phone}` : '',
      message,
    ]
      .filter(Boolean)
      .join('\n\n')

    setSending(true)
    setSubmitError('')
    const result = await submitContactForm({ name, email, message: fullMessage, formStartedAt })
    setSending(false)
    if (!result.ok) {
      setSubmitError(result.error)
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen pb-20 pt-4 lg:pt-6" style={{ backgroundColor: '#faf8f5' }}>
      <PageMeta
        title="Meet us at iFX EXPO 2026 — supVision"
        description="Book a meeting with the supVision team at iFX EXPO 2026 in Cyprus, Limassol. June 16–18."
        path="/ifx"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-0 mt-2 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">
            iFX EXPO 2026 · Cyprus, Limassol · June 16–18
          </p>
          <h1
            className="text-[2.25rem] leading-tight text-gray-900 sm:text-[2.75rem]"
            style={canelaStyle}
          >
            Meet us in person
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-gray-500">
            Book a slot and we&apos;ll show you how supVision handles fintech support end-to-end — live, no slides.
          </p>
        </header>

        {/* Photo + booking card */}
        <div className="mt-12 flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-12">
          {/* Photo */}
          <div className="flex-shrink-0">
            <img
              src="/Frame 9.png"
              alt="Meet us at iFX EXPO"
              className="block h-[420px] w-auto object-cover"
            />
          </div>

          {/* Booking card */}
          <div
            className="flex flex-1 flex-col justify-center rounded-3xl bg-white p-8 sm:p-10"
            style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }}
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">Book a meeting</p>
            <h2 className="text-[1.75rem] leading-tight text-gray-900 sm:text-[2rem]" style={canelaStyle}>
              30 minutes.<br />Live demo, no slides.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              We&apos;ll walk you through how supVision works with your existing stack — Zendesk, Intercom, Salesforce, or whatever you&apos;re running.
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {[
                'Pick any open slot — June 16, 17 or 18',
                'We come to you at the expo floor',
                'See a live integration demo on the spot',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#214995]">
                    <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <button
                onClick={openCalendly}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: '#214995' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F97316' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#214995' }}
              >
                Book a meeting
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div style={{ marginTop: '80px' }}>
          <div className="mb-8 text-center">
            <h2
              className="text-[2rem] leading-tight text-gray-900 sm:text-[2.75rem]"
              style={canelaStyle}
            >
              Or send a message
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-500">
              Prefer to reach out directly? We&apos;ll get back to you before the event — usually within 30 minutes.
            </p>
          </div>
          <div
            className="overflow-hidden rounded-3xl bg-white"
            style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }}
          >
            <div className="p-6 sm:p-8">

              {submitted ? (
                <div className="rounded-2xl py-10 text-center">
                  <div
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ backgroundColor: '#214995' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-7 w-7 text-white">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Message sent!</h3>
                  <p className="mt-2 text-sm text-gray-500">We&apos;ll be in touch before the event.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="ifx-name">
                        Full name <span style={{ color: '#214995' }}>*</span>
                      </label>
                      <input
                        id="ifx-name"
                        type="text"
                        required
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="ifx-email">
                        Email <span style={{ color: '#214995' }}>*</span>
                      </label>
                      <input
                        id="ifx-email"
                        type="email"
                        required
                        placeholder="Your email address"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="ifx-phone">
                        Phone / Telegram
                      </label>
                      <input
                        id="ifx-phone"
                        type="text"
                        placeholder="+1 234 567 890"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="ifx-company">
                        Company
                      </label>
                      <input
                        id="ifx-company"
                        type="text"
                        placeholder="Your company name"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="ifx-message">
                      Message
                    </label>
                    <textarea
                      id="ifx-message"
                      rows={4}
                      placeholder="Anything you'd like us to know before we meet..."
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => setAgreed(!agreed)}
                      className={[
                        'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors',
                        agreed ? 'border-transparent' : 'border-gray-300 bg-white',
                      ].join(' ')}
                      style={agreed ? { backgroundColor: '#214995' } : {}}
                      aria-checked={agreed}
                      role="checkbox"
                    >
                      {agreed && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 text-white">
                          <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <p className="text-xs leading-relaxed text-gray-500">
                      I agree to the{' '}
                      <Link to="/privacy-policy" className="font-semibold text-gray-900 underline">
                        Privacy Policy
                      </Link>{' '}
                      and acknowledge that my data might be used to improve analytics and advertising.
                    </p>
                  </div>

                  <div className="pt-1">
                    {submitError && (
                      <p className="mb-3 text-xs text-red-500">{submitError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-gray-900 bg-transparent px-6 py-3 text-sm font-semibold text-gray-900 transition-colors disabled:opacity-60"
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F97316'; (e.currentTarget as HTMLElement).style.borderColor = '#F97316'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = '#111827'; (e.currentTarget as HTMLElement).style.color = ''; }}
                    >
                      <span>{sending ? 'Sending…' : 'Send Message'}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {attempted && (!formIsValid || !agreed) && (
                      <p className="mt-3 flex items-center gap-2 text-xs text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 flex-shrink-0">
                          <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                        </svg>
                        Please fill in all required fields and confirm the Privacy Policy.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
