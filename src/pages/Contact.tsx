import React, { FormEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { submitContactForm } from '../lib/contactApi'
import PageMeta from '../components/PageMeta'

const canelaStyle = { fontFamily: "'Nohemi', sans-serif", fontWeight: 300 } as const

function ContactDetailsBelowForm() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <a
        href="mailto:info@supvision.ai"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
        </svg>
      </a>
      <a href="https://www.linkedin.com/company/supvision-ai/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      <a href="https://t.me/+447737124949" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      </a>
      <a href="https://wa.me/447737124949" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formStartedAt] = useState(() => Date.now())
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = formRef.current
    const valid = form?.checkValidity() ?? false
    setFormIsValid(valid)
    setAttempted(true)
    if (!valid || !agreed || !form) return

    const name = (form.querySelector('#name') as HTMLInputElement).value.trim()
    const email = (form.querySelector('#email') as HTMLInputElement).value.trim()
    const phone = (form.querySelector('#phone') as HTMLInputElement).value.trim()
    const company = (form.querySelector('#company') as HTMLInputElement).value.trim()
    const message = (form.querySelector('#message') as HTMLTextAreaElement).value.trim()
    const fullMessage = [
      company ? `Company: ${company}` : '',
      phone ? `Phone / Telegram: ${phone}` : '',
      message,
    ]
      .filter(Boolean)
      .join('\n\n')

    setSending(true)
    setSubmitError('')
    const result = await submitContactForm({
      name,
      email,
      message: fullMessage,
      formStartedAt,
    })
    setSending(false)
    if (!result.ok) {
      setSubmitError(result.error)
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen pb-16 pt-2" style={{ backgroundColor: '#faf8f5' }}>
      <PageMeta
        title="Contact supVision — Book a Demo"
        description="Book a 30-minute live walkthrough. See how supVision automates your fintech customer support in days, not months."
        path="/contact"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header data-reveal className="mb-8 mt-8 sm:mb-10">
          <div className="flex items-center justify-center">
            <h1
              className="text-[2.25rem] leading-tight text-gray-900 sm:text-[2.75rem]"
              style={canelaStyle}
            >
              Book a Demo
            </h1>
          </div>
          <p className="mt-4 text-center text-base leading-relaxed text-gray-500">
            We&apos;d be glad to show how AI agents handle queries, disputes, and transaction issues, so your team focuses on what needs them.
          </p>
        </header>

        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl"
          style={{
            '--rd': '100ms',
            backgroundImage: 'url(/bg/2e75cba1-8098-43e6-910e-00808d9daaa1.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } as React.CSSProperties}
        >
          <div className="absolute inset-0 bg-black/10" aria-hidden />
          <div className="relative z-10 p-6 sm:p-8 lg:p-10">
            {submitted ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-xl">
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: '#214995' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-7 w-7 text-white">
                    <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Message sent!</h2>
                <p className="mt-2 text-base text-gray-500">We&apos;ll get back to you within one business day.</p>
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="name">
                        Full name <span style={{ color: '#214995' }}>*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="email">
                        Email <span style={{ color: '#214995' }}>*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="Your email address"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="phone">
                        Phone / Telegram
                      </label>
                      <input
                        id="phone"
                        type="text"
                        autoComplete="tel"
                        placeholder="+1 234 567 890 or @handle"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="company">
                        Company / Organization
                      </label>
                      <input
                        id="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Your company name"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="message">
                      Message <span style={{ color: '#214995' }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Tell us about your support challenges..."
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
                    >
                      {agreed && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 text-white">
                          <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <p className="text-xs leading-relaxed text-gray-500">
                      I agree to the{' '}
                      <Link to="/" className="font-semibold text-gray-900 underline">
                        Privacy Policy
                      </Link>{' '}
                      and acknowledge that my data might be used in Google Ads to help improve analytics and advertising.
                    </p>
                  </div>

                  <div className="pt-1">
                    {submitError && (
                      <p className="text-xs text-red-500">{submitError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={sending}
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full pl-6 pr-1.5 py-1.5 text-sm font-bold text-white disabled:opacity-60"
                      style={{ backgroundColor: '#111827' }}
                    >
                      <span
                        className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]"
                        style={{ backgroundColor: '#214995' }}
                      />
                      <span className="relative z-10 tracking-widest uppercase">{sending ? 'Sending…' : 'Book a Demo'}</span>
                      <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                          <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                        </svg>
                      </span>
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
              </div>
            )}
          </div>
        </div>

        {!submitted && <ContactDetailsBelowForm />}

      </div>
    </div>
  )
}
