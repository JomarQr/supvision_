import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'supv_cookie_consent'

export type ConsentValue = 'accepted' | 'declined' | null

function getStoredConsent(): ConsentValue {
  try {
    return (localStorage.getItem(STORAGE_KEY) as ConsentValue) ?? null
  } catch {
    return null
  }
}

function storeConsent(value: 'accepted' | 'declined') {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {}
}

export function useConsent() {
  const [consent, setConsent] = useState<ConsentValue>(getStoredConsent)
  return consent
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getStoredConsent() === null) {
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  function accept() {
    storeConsent('accepted')
    setVisible(false)
    window.dispatchEvent(new Event('supv:consent:accepted'))
  }

  function decline() {
    storeConsent('declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[9999] border-t border-gray-200 bg-white"
      style={{ boxShadow: '0 -4px 24px rgba(0,0,0,0.06)' }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:px-10">
        <p className="text-sm leading-relaxed text-gray-700">
          By clicking &ldquo;Accept All Cookies&rdquo;, you agree to us using cookies and other tracking technologies to enhance user experience and to analyze performance and traffic on our website. Further information is available in our{' '}
          <Link to="/privacy-policy" className="font-semibold underline decoration-1 underline-offset-2" style={{ color: '#214995' }}>Cookie Policy</Link>.
        </p>
        <div className="flex flex-shrink-0 flex-wrap items-center gap-4 sm:gap-6">
          <Link
            to="/privacy-policy"
            className="whitespace-nowrap text-sm font-semibold underline decoration-1 underline-offset-2"
            style={{ color: '#214995' }}
          >
            Cookie Settings
          </Link>
          <button
            onClick={decline}
            className="flex-shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#214995' }}
          >
            Opt out
          </button>
          <button
            onClick={accept}
            className="flex-shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#214995' }}
          >
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  )
}
