import { Link } from 'react-router-dom'
import type { ForWhomItem } from '../../data/forWhom'

const canelaStyle = { fontFamily: "'Inter', sans-serif", fontWeight: 300 } as const

export default function ForWhomCardsSection({
  title,
  subtitle,
  items,
  darkShell = false,
}: {
  title: string
  subtitle?: string
  items: ForWhomItem[]
  darkShell?: boolean
}) {
  return (
    <section className={darkShell ? 'px-4 py-10 sm:px-6' : 'px-4 py-12 sm:px-6 lg:py-16'}>
      <div className={darkShell ? 'mx-auto max-w-4xl' : 'mx-auto w-full max-w-4xl lg:max-w-5xl'}>
        <h2
          className={`text-[1.85rem] leading-tight sm:text-[2.45rem] ${darkShell ? 'text-center text-white' : 'text-gray-900'}`}
          style={canelaStyle}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-3 text-sm leading-relaxed sm:text-base ${darkShell ? 'text-center text-gray-400' : 'text-gray-500'}`}>
            {subtitle}
          </p>
        )}

        <div className={`mt-8 flex flex-col gap-4 ${darkShell ? '' : ''}`}>
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group block overflow-hidden rounded-3xl text-center transition-shadow hover:shadow-md"
              style={{ backgroundColor: '#FEF9E8' }}
            >
              {item.image && (
                <div className="flex justify-center px-6 pt-8">
                  <img loading="lazy"
                    src={item.image}
                    alt=""
                    className="h-28 w-auto max-w-[85%] object-contain sm:h-32"
                  />
                </div>
              )}
              <div className={`px-6 pb-8 ${item.image ? 'pt-2' : 'pt-8'}`}>
                <h3 className="text-lg leading-snug text-gray-900 sm:text-xl" style={canelaStyle}>
                  {item.label}
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-600">{item.desc}</p>
                <span className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-gray-900">
                  Explore
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" style={{ color: '#214995' }}>
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
