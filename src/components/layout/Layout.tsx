import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ChatWidget from '../ui/ChatWidget'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      {/* Announcement banner — scrolls naturally, navbar follows it up */}
      <div className="flex h-8 w-full items-center justify-center text-[9px] sm:text-xs font-bold uppercase tracking-widest text-white whitespace-nowrap" style={{ backgroundColor: '#214995' }}>
        Meet us at iFX EXPO 2026&nbsp;&nbsp;·&nbsp;&nbsp;Cyprus &amp; Lisbon&nbsp;&nbsp;·&nbsp;&nbsp;16–18 Jun&nbsp;&nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="inline h-3 w-3">
          <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
        </svg>
      </div>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
