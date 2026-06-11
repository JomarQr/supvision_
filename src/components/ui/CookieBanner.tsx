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
      className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm"
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.13)' }}
    >
      <p className="text-sm font-semibold text-gray-900">We use cookies</p>
      <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
        We use analytics cookies to understand how visitors use this site. You can accept or decline — see our{' '}
        <Link to="/privacy-policy" className="underline hover:text-gray-700">Privacy Policy</Link>.
      </p>
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={accept}
          className="flex-1 rounded-full py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#214995' }}
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="flex-1 rounded-full border border-gray-200 py-2 text-xs font-bold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Decline
        </button>
      </div>
    </div>
  )
}
