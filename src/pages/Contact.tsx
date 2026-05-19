import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [agreed, setAgreed] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#f5f4f0' }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-stretch">

          {/* Left panel */}
          <div className="flex flex-col justify-between gap-10 rounded-3xl bg-white p-10">
            <div>
              <img src="/logo/logo_website.png" alt="supVision" className="h-16 w-auto" />
            </div>

            <div>
              <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl">
                Reach out today
              </h1>
              <p className="mt-4 text-base leading-relaxed text-gray-500">
                Tell us about your support challenges. We'll show you what supVision can do for your fintech team.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Email</p>
                <a href="mailto:info@supvision.ai" className="mt-1 block text-sm font-bold text-gray-900 hover:underline">
                  info@supvision.ai
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Follow us</p>
                <div className="mt-2">
                  <a
                    href="https://www.linkedin.com/company/supvision-ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel — background image with floating form */}
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              backgroundImage: 'url(/bg/2e75cba1-8098-43e6-910e-00808d9daaa1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '600px',
            }}
          >
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 p-8 lg:p-10">
              {submitted ? (
                <div className="flex h-full items-center justify-center">
                  <div className="rounded-2xl bg-white p-10 text-center shadow-xl">
                    <div className="mb-4 flex h-14 w-14 mx-auto items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-7 w-7 text-white">
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Message sent!</h2>
                    <p className="mt-2 text-base text-gray-500">We'll get back to you within one business day.</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-white p-8 shadow-xl">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="name">
                          Full name <span style={{ color: '#214995' }}>*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
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
                        <Link to="/" className="font-semibold text-gray-900 underline">Privacy Policy</Link>
                        {' '}and acknowledge that my data might be used in Google Ads to help improve analytics and advertising.
                      </p>
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={!agreed}
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full pl-6 pr-1.5 py-1.5 text-sm font-bold text-white transition-opacity disabled:opacity-40 disabled:pointer-events-none"
                        style={{ backgroundColor: '#111827' }}
                      >
                        <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]" style={{ backgroundColor: '#214995' }} />
                        <span className="relative z-10 tracking-widest uppercase">Get In Touch</span>
                        <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                            <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </button>
                    </div>

                  </form>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
