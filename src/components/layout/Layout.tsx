import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ChatWidget from '../ui/ChatWidget'

const BANNER_DARK_PATHS = ['/contact']

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function Layout() {
  const { pathname } = useLocation()
  const bannerDark = BANNER_DARK_PATHS.includes(pathname)

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Link
        to="/contact"
        className={`flex h-8 w-full items-center justify-center whitespace-nowrap text-[9px] font-bold uppercase tracking-widest transition-opacity hover:opacity-75 sm:text-xs ${
          bannerDark ? 'bg-gray-900 text-white' : 'bg-[#faf8f5] text-gray-900'
        }`}
      >
        Meet us at iFX EXPO 2026&nbsp;&nbsp;·&nbsp;&nbsp;Cyprus, Limassol&nbsp;&nbsp;·&nbsp;&nbsp;16–18 Jun&nbsp;&nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="inline h-3 w-3">
          <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
        </svg>
      </Link>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
