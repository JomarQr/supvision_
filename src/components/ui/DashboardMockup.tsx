import React from 'react'

function GCard({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-xl ${className}`}
      style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

const navItems = [
  { label: 'Dashboard', active: true },
  { label: 'Agents' },
  { label: 'Reusable Flows' },
  { label: 'Catalog' },
  { label: 'Messages' },
  { label: 'Clients' },
  { label: 'Operators' },
]

const miniStats = [
  { label: 'AGENTS', value: 12, sub: 'Total Agents', badge: '10 Active' },
  { label: 'CLIENTS', value: 8, sub: 'Total Clients', badge: '2 New this 30d' },
  { label: 'CONNECTED PROVIDERS', value: 9, sub: 'Providers Online', badge: 'All systems online' },
  { label: 'ACTIVE AGENTS', value: 2, sub: 'Agents', badge: 'Needs setup' },
]

const outcomes = [
  { label: 'Matched', n: 29, pct: 91, color: '#214995' },
  { label: 'Failed', n: 2, pct: 6, color: '#ef4444' },
  { label: 'Unmatched', n: 1, pct: 3, color: '#f59e0b' },
  { label: 'Cancelled', n: 0, pct: 0, color: '#9ca3af' },
]

const sysFunctions = [
  { label: 'Agents', desc: 'Configure runtime workspaces' },
  { label: 'Catalog', desc: 'Providers, tools and AI' },
  { label: 'Reusable Flows', desc: 'Automate workflows' },
  { label: 'Messages', desc: 'Global runtime inbox' },
  { label: 'Audit Logs', desc: 'Configuration and runtime audit' },
  { label: 'Settings', desc: 'System and access settings' },
]

const activity = [
  { dot: '#22c55e', title: 'Run completed successfully', sub: 'Order Processing Flow', time: '2m ago' },
  { dot: '#f59e0b', title: 'Unmatched message', sub: 'From: sales-bot • "check status"', time: '15m ago' },
  { dot: '#214995', title: 'Agent "Support Bot" connected', sub: 'Provider: OpenAI GPT-4o', time: '1h ago' },
  { dot: '#214995', title: 'Reusable flow updated', sub: 'Refund Policy Flow', time: '3h ago' },
  { dot: '#214995', title: 'New client added', sub: 'Acme Corporation', time: '5h ago' },
]

const statusItems = ['All Systems', 'Runtime Engine', 'Message Queue', 'Database', 'Storage', 'Integrations']

const chartPts = '0,52 55,46 110,48 165,36 220,40 275,28 330,23 385,30 440,16 495,13 550,8'

export default function DashboardMockup() {
  return (
    <div
      className="flex overflow-hidden select-none"
      style={{ background: '#f3f4f6', color: '#111827', fontSize: '11px' }}
    >
      {/* Sidebar */}
      <div
        className="flex flex-col flex-shrink-0 py-4 px-3 gap-0.5"
        style={{ width: '165px', borderRight: '1px solid #e5e7eb', background: '#fff' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: '#214995' }}>
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
              <path fillRule="evenodd" d="M1 8.74C1 10.55 2.235 12.131 4 12.775V15a.75.75 0 0 0 1.28.53L7.73 13H11c2.21 0 4-1.79 4-4V5c0-2.21-1.79-4-4-4H5C2.79 1 1 2.79 1 5v3.74Z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 700, lineHeight: 1, color: '#111827' }}>supVision.ai</p>
            <p style={{ fontSize: '8px', color: '#9ca3af', lineHeight: 1, marginTop: 2 }}>AI Ops Command Center</p>
          </div>
        </div>

        {navItems.map(item => (
          <div
            key={item.label}
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 cursor-pointer"
            style={{
              background: item.active ? 'rgba(33,73,149,0.08)' : 'transparent',
              color: item.active ? '#214995' : '#6b7280',
              fontSize: '10px', fontWeight: item.active ? 600 : 400,
            }}
          >
            <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: item.active ? '#214995' : '#d1d5db' }} />
            {item.label}
          </div>
        ))}

        <div className="flex-1" />

        {['Audit Logs', 'Settings'].map(l => (
          <div key={l} className="px-2.5 py-1.5" style={{ fontSize: '10px', color: '#9ca3af' }}>{l}</div>
        ))}

        {/* Dark mode toggle */}
        <div className="flex items-center gap-2 px-2.5 py-1.5 mt-1">
          <span style={{ fontSize: '9px', color: '#9ca3af' }}>Dark Mode</span>
          <div className="ml-auto flex items-center rounded-full" style={{ width: '28px', height: '15px', background: '#e5e7eb', padding: '2px' }}>
            <div className="rounded-full bg-white shadow-sm" style={{ width: '11px', height: '11px', background: '#9ca3af' }} />
          </div>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 px-2.5 py-2 mt-1 rounded-xl" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full" style={{ background: '#214995' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#fff' }}>A</span>
          </div>
          <div>
            <p style={{ fontSize: '9px', fontWeight: 600, lineHeight: 1, color: '#111827' }}>admin</p>
            <p style={{ fontSize: '8px', color: '#9ca3af', lineHeight: 1, marginTop: 2 }}>Administrator</p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Top bar */}
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderBottom: '1px solid #e5e7eb', background: '#fff' }}
        >
          <div>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Dashboard</p>
            <p style={{ fontSize: '9px', color: '#9ca3af', marginTop: 2 }}>Real-time system health, runtime activity and operational readiness.</p>
          </div>
          <div className="flex items-center gap-1.5">
            {['24h', '7d', '30d'].map((t, i) => (
              <span key={t} className="rounded-md px-2 py-1" style={{ fontSize: '9px', fontWeight: 600, background: i === 2 ? '#214995' : '#f3f4f6', color: i === 2 ? '#fff' : '#6b7280' }}>
                {t}
              </span>
            ))}
            <span className="rounded-md px-2.5 py-1" style={{ fontSize: '9px', background: '#f3f4f6', color: '#6b7280' }}>
              📅 Custom Range ▾
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: '#f3f4f6', fontSize: '11px', color: '#9ca3af' }}>↻</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 space-y-3">

          {/* Row 1: big cards */}
          <div className="grid grid-cols-3 gap-3">

            {/* Runtime Activity */}
            <GCard className="p-4">
              <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: 8 }}>Runtime Activity</p>
              <div className="flex items-end justify-between">
                <div>
                  <p style={{ fontSize: '28px', fontWeight: 900, lineHeight: 1, color: '#111827' }}>32</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', marginTop: 3 }}>runs in last 30d</p>
                  <p style={{ fontSize: '8px', color: '#22c55e', marginTop: 4 }}>↑ 14% vs last 30d</p>
                </div>
                <svg width="76" height="38" viewBox="0 0 76 38">
                  <polyline fill="none" stroke="#214995" strokeWidth="1.5" points="0,33 12,27 24,29 36,19 48,21 60,13 76,7" />
                  <circle cx="76" cy="7" r="3" fill="#214995" />
                  <text x="62" y="5" fontSize="7" fill="#214995" fontWeight="700">32</text>
                </svg>
              </div>
              <div className="flex gap-4 pt-3 mt-3" style={{ borderTop: '1px solid #f3f4f6' }}>
                {[{ c: '#22c55e', n: '● 29', l: 'matched' }, { c: '#f59e0b', n: '● 2', l: 'failed' }, { c: '#9ca3af', n: '● 1', l: 'unmatched' }].map(s => (
                  <span key={s.l} style={{ fontSize: '8px', color: '#6b7280' }}>
                    <span style={{ color: s.c }}>{s.n}</span> {s.l}
                  </span>
                ))}
              </div>
            </GCard>

            {/* Match Quality */}
            <GCard className="p-4 flex flex-col items-center justify-center text-center">
              <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: 10 }}>Match Quality</p>
              <div className="relative" style={{ width: 76, height: 76 }}>
                <svg width="76" height="76" viewBox="0 0 76 76">
                  <circle cx="38" cy="38" r="28" fill="none" stroke="#e5e7eb" strokeWidth="7" />
                  <circle cx="38" cy="38" r="28" fill="none" stroke="#214995" strokeWidth="7"
                    strokeDasharray={`${0.91 * 2 * Math.PI * 28} ${2 * Math.PI * 28}`}
                    strokeLinecap="round"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '38px 38px' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span style={{ fontSize: '16px', fontWeight: 900, lineHeight: 1, color: '#111827' }}>91%</span>
                </div>
              </div>
              <p style={{ fontSize: '11px', fontWeight: 700, marginTop: 8, color: '#111827' }}>Excellent</p>
              <p style={{ fontSize: '8px', color: '#9ca3af', marginTop: 2 }}>29 matched from 32 runs</p>
              <p style={{ fontSize: '8px', color: '#22c55e', marginTop: 4 }}>↑ 8% vs last 30d</p>
            </GCard>

            {/* Needs Attention */}
            <GCard className="p-4">
              <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: 8 }}>Needs Attention</p>
              <div className="flex items-start justify-between">
                <div>
                  <p style={{ fontSize: '28px', fontWeight: 900, lineHeight: 1, color: '#214995' }}>3</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', marginTop: 3 }}>items need review</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: '#fef9ec', border: '1px solid #fcd34d', fontSize: '14px' }}>⚠</div>
              </div>
              <div className="space-y-1.5 mt-3">
                {[{ n: 2, l: 'unmatched messages' }, { n: 1, l: 'inactive agent' }].map(r => (
                  <div key={r.l} className="flex items-center justify-between rounded-lg px-2.5 py-1.5" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                    <span style={{ fontSize: '9px', color: '#6b7280' }}>{r.n} {r.l}</span>
                    <span style={{ color: '#d1d5db', fontSize: '11px' }}>›</span>
                  </div>
                ))}
              </div>
            </GCard>
          </div>

          {/* Row 2: mini stats */}
          <div className="grid grid-cols-4 gap-2">
            {miniStats.map(s => (
              <GCard key={s.label} className="p-3">
                <p style={{ fontSize: '7.5px', fontWeight: 700, letterSpacing: '0.08em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</p>
                <p style={{ fontSize: '20px', fontWeight: 900, lineHeight: 1, color: '#111827' }}>{s.value}</p>
                <p style={{ fontSize: '8px', color: '#9ca3af', marginTop: 2 }}>{s.sub}</p>
                <div className="inline-block rounded-md px-2 py-0.5 mt-2" style={{ background: '#f3f4f6', fontSize: '8px', color: '#6b7280' }}>{s.badge}</div>
              </GCard>
            ))}
          </div>

          {/* Row 3 */}
          <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1.3fr 1fr' }}>

            {/* Execution Outcomes */}
            <GCard className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase' }}>Execution Outcomes</p>
                <span className="rounded px-1.5 py-0.5" style={{ fontSize: '8px', background: '#f3f4f6', color: '#6b7280' }}>30d ▾</span>
              </div>
              <div className="space-y-2.5">
                {outcomes.map(r => (
                  <div key={r.label}>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontSize: '9px', color: '#374151' }}>{r.label}</span>
                      <span style={{ fontSize: '9px', color: '#9ca3af' }}>{r.n} ({r.pct}%)</span>
                    </div>
                    <div className="rounded-full" style={{ height: 4, background: '#e5e7eb' }}>
                      <div className="rounded-full h-full" style={{ width: `${r.pct}%`, background: r.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3" style={{ fontSize: '9px', color: '#214995', cursor: 'pointer' }}>View full report →</p>
            </GCard>

            {/* System Functions */}
            <GCard className="p-4">
              <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: 10 }}>System Functions</p>
              <div className="grid grid-cols-2 gap-2">
                {sysFunctions.map(f => (
                  <div key={f.label} className="rounded-lg p-2.5" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                    <p style={{ fontSize: '9px', fontWeight: 600, color: '#111827', marginBottom: 2 }}>{f.label}</p>
                    <p style={{ fontSize: '8px', color: '#9ca3af', lineHeight: 1.3 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2.5" style={{ fontSize: '9px', color: '#214995', cursor: 'pointer' }}>Open all modules →</p>
            </GCard>

            {/* Recent Activity */}
            <GCard className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase' }}>Recent Activity</p>
                <span style={{ fontSize: '9px', color: '#214995', cursor: 'pointer' }}>View all</span>
              </div>
              <div className="space-y-2.5">
                {activity.map((a, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="flex-shrink-0 flex h-4 w-4 items-center justify-center rounded-full mt-0.5" style={{ background: `${a.dot}18`, border: `1px solid ${a.dot}50` }}>
                      <div className="h-1.5 w-1.5 rounded-full" style={{ background: a.dot }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: '9px', fontWeight: 600, lineHeight: 1.2, color: '#111827', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{a.title}</p>
                      <p style={{ fontSize: '8px', color: '#9ca3af', lineHeight: 1.3, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{a.sub}</p>
                    </div>
                    <span style={{ fontSize: '8px', color: '#d1d5db', flexShrink: 0 }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </GCard>
          </div>

          {/* Runs over time */}
          <GCard className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between mb-2">
              <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase' }}>Runs Over Time</p>
              <span className="rounded px-1.5 py-0.5" style={{ fontSize: '8px', background: '#f3f4f6', color: '#6b7280' }}>30d ▾</span>
            </div>
            <svg width="100%" height="52" viewBox="0 0 550 52" preserveAspectRatio="none">
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#214995" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#214995" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon fill="url(#rg)" points={`${chartPts} 550,52 0,52`} />
              <polyline fill="none" stroke="#214995" strokeWidth="1.5" points={chartPts} />
            </svg>
            <div className="flex justify-between mt-1 px-1">
              {['Apr 17', 'Apr 24', 'May 1', 'May 8', 'May 15'].map(d => (
                <span key={d} style={{ fontSize: '8px', color: '#d1d5db' }}>{d}</span>
              ))}
            </div>
          </GCard>

          {/* Status bar */}
          <div className="flex items-center gap-4 rounded-xl px-4 py-2.5 flex-wrap" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase', marginRight: 4 }}>System Status Summary</p>
            {statusItems.map(s => (
              <div key={s} className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full flex items-center justify-center" style={{ background: '#dcfce7' }}>
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: '#22c55e' }} />
                </div>
                <div>
                  <p style={{ fontSize: '8px', fontWeight: 600, color: '#374151', lineHeight: 1 }}>{s}</p>
                  <p style={{ fontSize: '7px', color: '#9ca3af', lineHeight: 1, marginTop: 1 }}>Operational</p>
                </div>
              </div>
            ))}
            <div className="ml-auto rounded-lg px-3 py-1.5" style={{ background: '#f3f4f6', fontSize: '9px', color: '#6b7280', cursor: 'pointer' }}>
              View status page →
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
