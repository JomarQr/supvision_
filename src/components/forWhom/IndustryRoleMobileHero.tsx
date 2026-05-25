import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const canelaStyle = { fontFamily: "'Canela', serif", fontWeight: 300 } as const

function AccordionItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (open) {
      el.style.maxHeight = el.scrollHeight + 'px'
      el.style.opacity = '1'
    } else {
      el.style.maxHeight = '0px'
      el.style.opacity = '0'
    }
  }, [open])

  return (
    <div className="border-t border-gray-900">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-lg text-gray-900" style={canelaStyle}>
          {item.q}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-5 w-5 flex-shrink-0 text-gray-900 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
        </svg>
      </button>
      <div
        ref={bodyRef}
        style={{ maxHeight: '0px', opacity: 0, overflow: 'hidden', transition: 'max-height 0.35s ease, opacity 0.3s ease' }}
      >
        <p className="pb-5 text-sm leading-relaxed text-gray-600">{item.a}</p>
      </div>
    </div>
  )
}

export type MobileHeroChallenge = {
  title: string
  desc: string
  icon: React.ReactNode
}

export default function IndustryRoleMobileHero({
  title,
  subtitle,
  pills,
  heroImage,
  challenges,
  accordionItems,
  darkBadge = 'Built for you',
}: {
  title: string
  subtitle: string
  pills: string[]
  heroImage?: string
  challenges: MobileHeroChallenge[]
  accordionItems: { q: string; a: string }[]
  darkBadge?: string
}) {
  const showcase = challenges.slice(0, 4)

  return (
    <div className="mx-auto w-full max-w-4xl text-center lg:hidden">
      <h1 className="text-[1.85rem] leading-tight text-gray-900 sm:text-[2.45rem]" style={canelaStyle}>
        {title}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-500">{subtitle}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {pills.map((label) => (
          <span
            key={label}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 shadow-sm sm:text-sm"
          >
            {label}
          </span>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: '#101827' }}
        >
          <span>Let&apos;s chat</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-white">
            <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>

      {heroImage && (
        <div className="mt-8 overflow-hidden rounded-3xl">
          <img src={heroImage} alt={title} className="h-auto w-full object-cover" />
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-3xl px-5 py-8 text-left sm:px-6" style={{ backgroundColor: '#1A1A1A' }}>
        <span
          className="inline-block rounded-full px-4 py-1 text-sm font-medium"
          style={{ backgroundColor: '#F5F0E8', color: '#1A1A1A' }}
        >
          {darkBadge}
        </span>
        <h2 className="mt-5 text-[1.65rem] leading-snug text-white sm:text-[1.85rem]" style={canelaStyle}>
          Challenges we solve for <em className="italic">{title}</em>.
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {showcase.map((card) => (
            <div
              key={card.title}
              className="flex flex-col gap-3 rounded-2xl p-4"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div style={{ color: '#9BB0E8' }}>{card.icon}</div>
              <h3 className="text-sm leading-snug text-white sm:text-base" style={canelaStyle}>
                {card.title}
              </h3>
              <p className="text-[11px] leading-snug text-gray-400 sm:text-xs">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {accordionItems.length > 0 && (
        <div className="mt-8 rounded-3xl px-5 py-8 text-left sm:px-6" style={{ backgroundColor: '#faf8f5' }}>
          <span className="inline-block rounded-full border border-gray-900 px-4 py-1 text-sm font-medium text-gray-900">
            Outcomes
          </span>
          <h2 className="mt-5 text-[1.65rem] leading-snug text-gray-900 sm:text-[1.85rem]" style={canelaStyle}>
            What <em className="italic">{title}</em> teams get.
          </h2>
          <div className="mt-6 border-b border-gray-900">
            {accordionItems.map((item) => (
              <AccordionItem key={item.q} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
