import { useState } from 'react'

const contacts = [
  {
    label: 'Email',
    href: 'mailto:info@supvision.ai',
    bg: '#214995',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/supvision',
    bg: '#2AABEE',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.26l-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.658.326z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/supvision-ai/',
    bg: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/message/supvision',
    bg: '#25D366',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      onMouseLeave={() => setOpen(false)}
    >
      {/* Contact buttons — раскрываются вверх */}
      <div className="flex flex-col items-end gap-2">
        {contacts.map((c, i) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            title={c.label}
            className="flex items-center gap-2 rounded-full text-white shadow-lg transition-all duration-300"
            style={{
              backgroundColor: c.bg,
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)',
              transitionDelay: open ? `${(contacts.length - 1 - i) * 60}ms` : `${i * 40}ms`,
              pointerEvents: open ? 'auto' : 'none',
              paddingLeft: '14px',
              paddingRight: '14px',
              paddingTop: '10px',
              paddingBottom: '10px',
            }}
          >
            {c.icon}
            <span className="text-sm font-semibold">{c.label}</span>
          </a>
        ))}
      </div>

      {/* Main square button — 2×2 grid of coloured blocks */}
      <div
        className="grid grid-cols-2 overflow-hidden rounded-xl shadow-xl cursor-pointer"
        onMouseEnter={() => setOpen(true)}
        style={{ width: '74px', height: '74px', gap: '4px', padding: '4px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      >
        {contacts.map((c) => (
          <div
            key={c.label}
            className="flex items-center justify-center transition-opacity duration-200 rounded-lg"
            style={{ backgroundColor: c.bg, opacity: open ? 0.7 : 1 }}
          >
            <div style={{ color: '#fff', transform: 'scale(0.55)' }}>{c.icon}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
