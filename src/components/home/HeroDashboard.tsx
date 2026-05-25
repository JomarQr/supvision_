import { useEffect, useState } from 'react'

const BARS = [42, 58, 76, 96, 62, 80, 52, 46]
const BAR_LABELS = ['9am', '10', '11', '12', '1', '2', '3', 'now']

const TICKETS = [
  { name: 'Sarah M.',    task: 'Balance inquiry',        status: 'Resolved',   sc: 'green'  },
  { name: 'James K.',   task: 'Card dispute — £89.99',   status: 'In Progress', sc: 'orange' },
  { name: 'Priya S.',   task: 'KYC doc upload issue',    status: 'Resolved',   sc: 'green'  },
  { name: 'Omar F.',    task: 'Suspicious £2,400 txn',   status: 'Pending',    sc: 'gray'   },
  { name: 'Liu W.',     task: 'PIN reset — locked out',  status: 'In Progress', sc: 'orange' },
]

const RECENT_PROJECTS = [
  { label: 'Zendesk escalation flow', due: 'Connected May 22',  color: '#214995' },
  { label: 'WhatsApp bot — KYC',      due: 'Connected May 20',  color: '#FB9A05' },
  { label: 'Mambu transaction sync',  due: 'Connected May 18',  color: '#22c55e' },
  { label: 'Telegram CRM bot',        due: 'Connected May 15',  color: '#8b5cf6' },
  { label: 'Freshdesk triage rules',  due: 'Connected May 12',  color: '#f43f5e' },
]

const NAV = [
  { label: 'Dashboard', active: true  },
  { label: 'Tickets',   active: false, badge: '12+' },
  { label: 'Agents',    active: false },
  { label: 'Analytics', active: false },
]

function StatusBadge({ status, sc }: { status: string; sc: string }) {
  const s =
    sc === 'green'  ? { bg: 'rgba(34,197,94,0.12)',  color: '#16a34a' } :
    sc === 'orange' ? { bg: 'rgba(251,154,5,0.14)',  color: '#d97706' } :
                     { bg: 'rgba(107,114,128,0.10)', color: '#6b7280' }
  return (
    <span style={{ fontSize: 9, fontWeight: 700, borderRadius: 100, padding: '2px 7px', background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>
      {status}
    </span>
  )
}

export default function HeroDashboard() {
  const [bars, setBars] = useState(BARS)
  const [rowOffset, setRowOffset] = useState(0)
  const [sla, setSla] = useState(47)

  useEffect(() => {
    const t = setInterval(() => {
      setBars(prev => prev.map(h =>
        Math.max(16, Math.min(97, h + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 10) + 2)))
      ))
    }, 1800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setRowOffset(o => (o + 1) % TICKETS.length), 3200)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setSla(s => (s <= 0 ? 59 : s - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  const R = 42
  const circ = 2 * Math.PI * R
  const resolution = 68
  const filled = circ * (resolution / 100)

  const visibleTickets = [0, 1, 2, 3].map(i => TICKETS[(rowOffset + i) % TICKETS.length])

  const card = (style?: React.CSSProperties): React.CSSProperties => ({
    background: '#fff', borderRadius: 14, padding: '12px 14px', position: 'relative', ...style,
  })

  return (
    <div style={{
      display: 'flex',
      background: '#fff',
      borderRadius: 22,
      overflow: 'hidden',
      boxShadow: '0 20px 70px rgba(0,0,0,0.20)',
      fontFamily: "'Nohemi', sans-serif",
      fontSize: 12,
      color: '#111827',
      userSelect: 'none',
    }}>
      {/* ── SIDEBAR ── */}
      <div style={{ width: 120, background: '#fff', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', padding: '16px 0', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '0 14px 16px' }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: '#214995', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg viewBox="0 0 16 16" fill="white" style={{ width: 13, height: 13 }}>
              <path fillRule="evenodd" d="M2 4.75A2.75 2.75 0 0 1 4.75 2h6.5A2.75 2.75 0 0 1 14 4.75v6.5A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5Zm1.5 0c0-.69.56-1.25 1.25-1.25H8v4.25H3.5V4.75Zm0 4.5V11.25c0 .69.56 1.25 1.25 1.25H8V9.25H3.5Zm6 2.75h1.75c.69 0 1.25-.56 1.25-1.25V9.25H9.5v2.75Zm3-4.25H9.5V3.5h1.75c.69 0 1.25.56 1.25 1.25v1.75Z" clipRule="evenodd" />
            </svg>
          </div>
          <span style={{ fontSize: 12, fontWeight: 800, color: '#111' }}>supVision</span>
        </div>

        <p style={{ fontSize: 8.5, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.13em', textTransform: 'uppercase', padding: '0 14px 6px' }}>Menu</p>

        {NAV.map(item => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '7px 14px',
            background: item.active ? 'rgba(33,73,149,0.08)' : 'transparent',
            borderLeft: item.active ? '3px solid #214995' : '3px solid transparent',
            marginBottom: 1,
          }}>
            <span style={{ fontSize: 11, fontWeight: item.active ? 700 : 500, color: item.active ? '#214995' : '#6b7280' }}>
              {item.label}
            </span>
            {item.badge && (
              <span style={{ fontSize: 8, fontWeight: 700, background: '#214995', color: '#fff', borderRadius: 100, padding: '1px 5px' }}>
                {item.badge}
              </span>
            )}
          </div>
        ))}

        <div style={{ flex: 1 }} />

        <p style={{ fontSize: 8.5, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.13em', textTransform: 'uppercase', padding: '0 14px 6px' }}>General</p>
        {['Settings', 'Help', 'Logout'].map(l => (
          <div key={l} style={{ padding: '6px 14px', borderLeft: '3px solid transparent' }}>
            <span style={{ fontSize: 11, fontWeight: 500, color: '#9ca3af' }}>{l}</span>
          </div>
        ))}
      </div>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8f9fb', minWidth: 0 }}>
        {/* Header */}
        <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f3f4f6', borderRadius: 10, padding: '6px 12px', flex: 1, maxWidth: 200 }}>
            <svg viewBox="0 0 16 16" fill="#9ca3af" style={{ width: 12, height: 12, flexShrink: 0 }}>
              <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
            </svg>
            <span style={{ fontSize: 11, color: '#9ca3af' }}>Search tickets…</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#214995' }}>JS</div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.2 }}>John S.</p>
                <p style={{ fontSize: 9, color: '#9ca3af', lineHeight: 1.2 }}>Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Support Ops</h2>
              <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>Live view — May 25, 2026</p>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#214995', color: '#fff', border: 'none', borderRadius: 10, padding: '6px 12px', fontSize: 10, fontWeight: 700, cursor: 'default' }}>
                <span style={{ fontSize: 13 }}>+</span> New Ticket
              </button>
              <button style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '6px 12px', fontSize: 10, fontWeight: 600, color: '#374151', cursor: 'default' }}>
                Export
              </button>
            </div>
          </div>

          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {/* KPI 1 — dark blue */}
            <div style={{ ...card({ background: '#214995', color: '#fff', position: 'relative', overflow: 'hidden' }) }}>
              <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 16 16" fill="white" style={{ width: 10, height: 10 }}><path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" /></svg>
              </div>
              <p style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Total Today</p>
              <p style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, marginBottom: 5 }}>847</p>
              <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(255,255,255,0.18)', color: '#fff', borderRadius: 100, padding: '2px 7px' }}>↑ 12% from yesterday</span>
            </div>
            {/* KPI 2 */}
            <div style={card()}>
              <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 16 16" fill="#9ca3af" style={{ width: 10, height: 10 }}><path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" /></svg>
              </div>
              <p style={{ fontSize: 9, fontWeight: 700, color: '#9ca3af', marginBottom: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Auto-Resolved</p>
              <p style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, marginBottom: 5 }}>578</p>
              <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(34,197,94,0.12)', color: '#16a34a', borderRadius: 100, padding: '2px 7px' }}>↑ 4% vs last week</span>
            </div>
            {/* KPI 3 */}
            <div style={card()}>
              <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 16 16" fill="#9ca3af" style={{ width: 10, height: 10 }}><path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" /></svg>
              </div>
              <p style={{ fontSize: 9, fontWeight: 700, color: '#9ca3af', marginBottom: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Avg Response</p>
              <p style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, marginBottom: 5 }}>1.2s</p>
              <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(34,197,94,0.12)', color: '#16a34a', borderRadius: 100, padding: '2px 7px' }}>↓ 0.3s faster</span>
            </div>
            {/* KPI 4 */}
            <div style={card()}>
              <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 16 16" fill="#9ca3af" style={{ width: 10, height: 10 }}><path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" /></svg>
              </div>
              <p style={{ fontSize: 9, fontWeight: 700, color: '#9ca3af', marginBottom: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Escalated</p>
              <p style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, marginBottom: 5 }}>5</p>
              <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(107,114,128,0.10)', color: '#6b7280', borderRadius: 100, padding: '2px 7px' }}>On Discuss</span>
            </div>
          </div>

          {/* Row 2: Bar chart + Alert */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 10 }}>
            {/* Bar chart */}
            <div style={card()}>
              <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Ticket Analytics</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 72 }}>
                {bars.map((h, i) => {
                  const isHighest = h === Math.max(...bars)
                  const isCurrent = i === bars.length - 1
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', justifyContent: 'flex-end' }}>
                      {isHighest && <span style={{ fontSize: 8, fontWeight: 700, color: isCurrent ? '#214995' : '#16a34a' }}>{h}%</span>}
                      <div style={{
                        width: '100%',
                        height: `${h}%`,
                        borderRadius: 100,
                        background: isCurrent
                          ? '#214995'
                          : isHighest
                            ? '#1e3a6e'
                            : i % 2 === 0
                              ? 'rgba(33,73,149,0.20)'
                              : 'repeating-linear-gradient(45deg, rgba(33,73,149,0.18) 0px, rgba(33,73,149,0.18) 3px, transparent 3px, transparent 7px)',
                        transition: 'height 0.7s cubic-bezier(0.4,0,0.2,1)',
                        border: i % 2 !== 0 && !isCurrent && !isHighest ? '1.5px solid rgba(33,73,149,0.25)' : 'none',
                      }} />
                    </div>
                  )
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                {BAR_LABELS.map(l => <span key={l} style={{ fontSize: 8, color: '#9ca3af', flex: 1, textAlign: 'center' }}>{l}</span>)}
              </div>
            </div>

            {/* Alert card */}
            <div style={card()}>
              <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Live Alert</p>
              <p style={{ fontSize: 13, fontWeight: 800, lineHeight: 1.3, marginBottom: 4 }}>Card dispute escalated</p>
              <p style={{ fontSize: 10, color: '#6b7280', marginBottom: 10 }}>James K. · 2 min ago · Zendesk</p>
              <button style={{ width: '100%', background: '#214995', color: '#fff', border: 'none', borderRadius: 10, padding: '7px 0', fontSize: 10, fontWeight: 700, cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <svg viewBox="0 0 16 16" fill="white" style={{ width: 11, height: 11 }}><path d="M1 8.5A5.5 5.5 0 0 1 9.16 3.18l.41-.9A6.975 6.975 0 0 0 .052 7.978a7 7 0 0 0 13.5 2.073l-.96-.28a6 6 0 0 1-11.593-1.27Z"/><path d="M13.5 2h-2.25a.75.75 0 0 0 0 1.5H13v1.75a.75.75 0 0 0 1.5 0V2.75A.75.75 0 0 0 13.5 2ZM8.53 7.47 13 3l-4.47 4.47Z"/></svg>
                Review Now
              </button>
            </div>
          </div>

          {/* Row 3: Tickets + Gauge + SLA */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 0.75fr 0.75fr', gap: 10 }}>
            {/* Recent tickets */}
            <div style={card({ padding: '12px 14px' })}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <p style={{ fontSize: 11, fontWeight: 700 }}>Team Queue</p>
                <button style={{ fontSize: 9, fontWeight: 700, border: '1px solid #e5e7eb', borderRadius: 100, padding: '2px 8px', background: '#fff', cursor: 'default', color: '#374151' }}>+ Assign</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {visibleTickets.map((t, i) => (
                  <div key={`${rowOffset}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 8, animation: 'log-in 0.3s ease both', animationDelay: `${i * 0.06}s` }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: '#214995', flexShrink: 0 }}>
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 10, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{t.name}</p>
                      <p style={{ fontSize: 9, color: '#6b7280', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.task}</p>
                    </div>
                    <StatusBadge status={t.status} sc={t.sc} />
                  </div>
                ))}
              </div>
            </div>

            {/* Resolution gauge */}
            <div style={card({ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 10px' })}>
              <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 6, alignSelf: 'flex-start' }}>Resolution</p>
              <svg viewBox="0 0 100 60" style={{ width: '100%', maxWidth: 100, overflow: 'visible' }}>
                <path d="M 10 58 A 40 40 0 0 1 90 58" fill="none" stroke="#f0f0f0" strokeWidth="10" strokeLinecap="round" />
                <path
                  d="M 10 58 A 40 40 0 0 1 90 58"
                  fill="none"
                  stroke="#214995"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(resolution / 100) * 125.6} 125.6`}
                  style={{ transition: 'stroke-dasharray 1s ease' }}
                />
                <text x="50" y="52" textAnchor="middle" style={{ fontSize: 16, fontWeight: 800, fill: '#111827', fontFamily: "'Nohemi', sans-serif" }}>68%</text>
              </svg>
              <p style={{ fontSize: 9, color: '#6b7280', textAlign: 'center', marginTop: 2 }}>Auto-resolved</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 6, width: '100%' }}>
                {[{ c: '#214995', l: 'Auto' }, { c: '#22c55e', l: 'Human' }, { c: '#e5e7eb', l: 'Pending' }].map(x => (
                  <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: x.c, flexShrink: 0 }} />
                    <span style={{ fontSize: 9, color: '#6b7280' }}>{x.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SLA Tracker */}
            <div style={{ ...card({ background: '#1a2744', padding: '12px 12px' }), display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 4 }}>SLA Tracker</p>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>Next breach in</p>
              <p style={{ fontSize: 28, fontWeight: 800, color: sla < 20 ? '#ef4444' : '#4ade80', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 8 }}>
                00:{String(sla).padStart(2, '0')}
              </p>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>Card dispute · James K.</p>
              <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}>
                  <svg viewBox="0 0 16 16" fill="white" style={{ width: 12, height: 12 }}><path d="M6.28 4.22a.75.75 0 0 0-1.06 1.06L7.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L9 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L10.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L9 6.94 6.28 4.22Z" /></svg>
                </div>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#214995', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}>
                  <svg viewBox="0 0 16 16" fill="white" style={{ width: 12, height: 12 }}><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
