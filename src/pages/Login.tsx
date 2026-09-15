import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const canelaStyle = { fontFamily: "'Inter', sans-serif", fontWeight: 300 } as const

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [attempted, setAttempted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setAttempted(true)
    if (!e.currentTarget.checkValidity()) return
    // Auth is handled on the platform; wire your endpoint here when ready.
  }

  const showEmailError = attempted && !email
  const showPasswordError = attempted && !password

  return (
    <>
      <Helmet>
        <title>Login — supVision</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
    <section className="relative flex min-h-screen flex-col px-4 sm:px-6 overflow-hidden">
      <img
        src="/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-20 mx-auto flex h-14 w-full max-w-md flex-shrink-0 items-center justify-center lg:h-16">
        <Link to="/" className="inline-block">
          <img src="/logo/logo_website_white.webp" alt="supVision" className="h-10 w-auto lg:h-11" />
        </Link>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center pb-8">
        <div className="w-full max-w-md">
          <div
            className="rounded-3xl p-8 sm:p-10"
            style={{
              backgroundColor: '#faf8f5',
              border: '2px solid #111827',
            }}
          >
          <h1 className="text-center text-[2rem] leading-tight text-gray-900 sm:text-[2.35rem]" style={canelaStyle}>
            Log in
          </h1>
          <p className="mt-2 text-center text-sm leading-relaxed text-gray-500">
            Access your supVision workspace
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="login-email" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-600">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#214995] focus:ring-2 focus:ring-[#214995]/20"
                style={{ borderColor: showEmailError ? '#f87171' : '#d1d5db' }}
              />
              {showEmailError && (
                <p className="mt-1.5 text-xs text-red-500">Enter your email address</p>
              )}
            </div>

            <div>
              <label htmlFor="login-password" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-600">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#214995] focus:ring-2 focus:ring-[#214995]/20"
                style={{ borderColor: showPasswordError ? '#f87171' : '#d1d5db' }}
              />
              {showPasswordError && (
                <p className="mt-1.5 text-xs text-red-500">Enter your password</p>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#101827' }}
            >
              <span>Log in</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link to="/contact" className="font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-700">
              Contact us
            </Link>
          </p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
