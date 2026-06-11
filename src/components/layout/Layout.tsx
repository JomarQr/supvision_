import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ChatWidget from '../ui/ChatWidget'
import CookieBanner from '../ui/CookieBanner'
import Breadcrumb from './Breadcrumb'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function useRevealObserver() {
  const { pathname } = useLocation()
  useEffect(() => {
    let obs: IntersectionObserver | null = null
    const t = setTimeout(() => {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              obs!.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
      )
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => obs!.observe(el))
    }, 60)
    return () => { clearTimeout(t); obs?.disconnect() }
  }, [pathname])
}

export default function Layout() {
  useRevealObserver()
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-900 focus:shadow-lg focus:outline-none">
        Skip to main content
      </a>
      <ScrollToTop />
      {/* 32px spacer — banner height; breadcrumb adds pt-16 for the nav */}
      <div style={{ height: '32px', flexShrink: 0 }} />
      <Header />
      <Breadcrumb />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </div>
  )
}
