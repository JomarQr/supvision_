import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Message {
  from: 'bot' | 'user'
  text: string
}

const BOT_NAME = 'SupVision Assistant'

function getBotReply(input: string): string {
  const q = input.toLowerCase()
  if (q.match(/kyc|onboard|verif/))
    return 'SupVision automates KYC status checks, document verification queries, and re-submission flows in real time — pulling live data from your KYC provider before every response.'
  if (q.match(/pric|cost|plan|€|euro/))
    return 'We have three plans starting from €499/month. You can see the full breakdown on our Pricing page, or talk to us directly for a custom quote.'
  if (q.match(/integrat|zendesk|intercom|freshdesk|whatsapp|telegram|stripe|mambu/))
    return 'SupVision connects to helpdesks, messaging channels, core banking systems, KYC providers, payment processors, and CRMs. Check the Integrations page for the full list.'
  if (q.match(/demo|trial|start|get started|book/))
    return 'Happy to set up a demo! Head to our Contact page and we\'ll get you booked in within 24 hours.'
  if (q.match(/how long|go live|deploy|days/))
    return 'Most teams are fully live within 3 to 5 business days. No platform migration — SupVision runs on top of your existing stack.'
  if (q.match(/compli|gdpr|pci|regulat|audit/))
    return 'SupVision is PCI DSS and GDPR compliant. Every agent action is logged in a traceable audit trail, with regulator-ready exports available on all plans.'
  if (q.match(/human|escalat|agent/))
    return 'You set a confidence threshold. When the AI falls below it, it escalates to a human agent with the full conversation history and live account data already attached.'
  if (q.match(/disput|chargeback|transaction|payment/))
    return 'SupVision handles payment failure queries, dispute status checks, and chargeback flows automatically — pulling live data from your payment processor in real time.'
  if (q.match(/hello|hi|hey|hola/))
    return 'Hey! 👋 Ask me anything about SupVision — pricing, integrations, how the AI works, or how to get started.'
  return 'Great question. For detailed information, I\'d recommend booking a demo so our team can walk you through exactly how SupVision fits your setup. Want me to point you to the Contact page?'
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Hey there! 👋 I\'m the SupVision assistant. Ask me anything about AI-powered support for fintech.' },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  function send() {
    const text = input.trim()
    if (!text) return
    const next: Message[] = [...messages, { from: 'user', text }]
    setMessages(next)
    setInput('')
    setTimeout(() => {
      setMessages(m => [...m, { from: 'bot', text: getBotReply(text) }])
    }, 600)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105"
        style={{ backgroundColor: '#214995' }}
        aria-label="Open chat"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 text-white">
            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-6 w-6 text-white">
            <path fillRule="evenodd" d="M1 8.74C1 10.55 2.235 12.131 4 12.775V15a.75.75 0 0 0 1.28.53L7.73 13H11c2.21 0 4-1.79 4-4V5c0-2.21-1.79-4-4-4H5C2.79 1 1 2.79 1 5v3.74ZM5 4.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[360px] flex-col overflow-hidden rounded-3xl shadow-2xl" style={{ height: '520px', backgroundColor: '#fff' }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4" style={{ backgroundColor: '#111827' }}>
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                <path fillRule="evenodd" d="M1 8.74C1 10.55 2.235 12.131 4 12.775V15a.75.75 0 0 0 1.28.53L7.73 13H11c2.21 0 4-1.79 4-4V5c0-2.21-1.79-4-4-4H5C2.79 1 1 2.79 1 5v3.74ZM5 4.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">{BOT_NAME}</p>
              <p className="text-xs text-white/50">Usually replies instantly</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white/80">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ backgroundColor: '#f9fafb' }}>
            {messages.map((m, i) => (
              <div key={i} className={['flex', m.from === 'user' ? 'justify-end' : 'justify-start'].join(' ')}>
                {m.from === 'bot' && (
                  <div className="mr-2 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#214995' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 text-white">
                      <path fillRule="evenodd" d="M1 8.74C1 10.55 2.235 12.131 4 12.775V15a.75.75 0 0 0 1.28.53L7.73 13H11c2.21 0 4-1.79 4-4V5c0-2.21-1.79-4-4-4H5C2.79 1 1 2.79 1 5v3.74Z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div
                  className={['max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed', m.from === 'user' ? 'text-white rounded-tr-sm' : 'text-gray-800 bg-white shadow-sm rounded-tl-sm'].join(' ')}
                  style={m.from === 'user' ? { backgroundColor: '#214995' } : {}}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-none" style={{ backgroundColor: '#f9fafb' }}>
            {['Pricing', 'Integrations', 'Book a demo'].map(q => (
              <button
                key={q}
                onClick={() => { setInput(q); }}
                className="flex-shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-gray-300"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-gray-100 px-4 py-3 bg-white">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask a question..."
              className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-gray-300"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full disabled:opacity-30 transition-opacity"
              style={{ backgroundColor: '#214995' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Footer link */}
          <div className="bg-white px-4 pb-3 text-center">
            <Link to="/contact" onClick={() => setOpen(false)} className="text-xs text-gray-400 hover:text-gray-600">
              Talk to a real person →
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
