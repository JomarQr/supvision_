import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

const canelaStyle = { fontFamily: "'Nohemi', sans-serif", fontWeight: 300 } as const

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
    <section className="relative flex min-h-screen flex-col px-4 sm:px-6 overflow-hidden">
      {/* Wave background — same as hero */}
      <div className="absolute inset-0 blue-gradient-hero">
        <svg className="hero-wave-track-4 absolute top-0 left-0 h-full hidden md:block" style={{ width: '200%', filter: 'drop-shadow(0 18px 16px rgba(4,10,48,0.55))' }} viewBox="0 0 5760 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,840 C90,780 270,780 360,840 C450,900 630,900 720,840 C810,780 990,780 1080,840 C1170,900 1350,900 1440,840 C1530,780 1710,780 1800,840 C1890,900 2070,900 2160,840 C2250,780 2430,780 2520,840 C2610,900 2790,900 2880,840 C2970,780 3150,780 3240,840 C3330,900 3510,900 3600,840 C3690,780 3870,780 3960,840 C4050,900 4230,900 4320,840 C4410,780 4590,780 4680,840 C4770,900 4950,900 5040,840 C5130,780 5310,780 5400,840 C5490,900 5670,900 5760,840 L5760,0 L0,0 Z" fill="#1434A8" />
        </svg>
        <svg className="hero-wave-track-3 absolute top-0 left-0 h-full hidden md:block" style={{ width: '200%', filter: 'drop-shadow(0 18px 16px rgba(4,10,48,0.55))' }} viewBox="0 0 5760 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,660 C90,585 270,585 360,660 C450,735 630,735 720,660 C810,585 990,585 1080,660 C1170,735 1350,735 1440,660 C1530,585 1710,585 1800,660 C1890,735 2070,735 2160,660 C2250,585 2430,585 2520,660 C2610,735 2790,735 2880,660 C2970,585 3150,585 3240,660 C3330,735 3510,735 3600,660 C3690,585 3870,585 3960,660 C4050,735 4230,735 4320,660 C4410,585 4590,585 4680,660 C4770,735 4950,735 5040,660 C5130,585 5310,585 5400,660 C5490,735 5670,735 5760,660 L5760,0 L0,0 Z" fill="#1943B8" />
        </svg>
        <svg className="hero-wave-track-2 absolute top-0 left-0 h-full hidden md:block" style={{ width: '200%', filter: 'drop-shadow(0 18px 16px rgba(4,10,48,0.55))' }} viewBox="0 0 5760 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,450 C90,370 270,370 360,450 C450,530 630,530 720,450 C810,370 990,370 1080,450 C1170,530 1350,530 1440,450 C1530,370 1710,370 1800,450 C1890,530 2070,530 2160,450 C2250,370 2430,370 2520,450 C2610,530 2790,530 2880,450 C2970,370 3150,370 3240,450 C3330,530 3510,530 3600,450 C3690,370 3870,370 3960,450 C4050,530 4230,530 4320,450 C4410,370 4590,370 4680,450 C4770,530 4950,530 5040,450 C5130,370 5310,370 5400,450 C5490,530 5670,530 5760,450 L5760,0 L0,0 Z" fill="#204DC6" />
        </svg>
        <svg className="hero-wave-track absolute top-0 left-0 h-full hidden md:block" style={{ width: '200%', filter: 'drop-shadow(0 18px 16px rgba(4,10,48,0.5))' }} viewBox="0 0 5760 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,230 C90,150 270,150 360,230 C450,310 630,310 720,230 C810,150 990,150 1080,230 C1170,310 1350,310 1440,230 C1530,150 1710,150 1800,230 C1890,310 2070,310 2160,230 C2250,150 2430,150 2520,230 C2610,310 2790,310 2880,230 C2970,150 3150,150 3240,230 C3330,310 3510,310 3600,230 C3690,150 3870,150 3960,230 C4050,310 4230,310 4320,230 C4410,150 4590,150 4680,230 C4770,310 4950,310 5040,230 C5130,150 5310,150 5400,230 C5490,310 5670,310 5760,230 L5760,0 L0,0 Z" fill="#2B5BD8" />
        </svg>
      </div>

      <div className="relative z-20 mx-auto flex h-14 w-full max-w-md flex-shrink-0 items-center justify-center lg:h-16">
        <Link to="/" className="inline-block">
          <img src="/logo/logo_website_white.png" alt="supVision" className="h-10 w-auto lg:h-11" />
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
  )
}
