import { useEffect, useState } from 'react'

const BARS = [42, 58, 76, 96, 62, 80, 52, 46]
const BAR_LABELS = ['9am', '10', '11', '12', '1', '2', '3', 'now']

const TICKETS = [
  { name: 'Sarah M.',  avatar: '/avatars/woman-1.webp', task: 'Balance inquiry',        status: 'Resolved',    sc: 'green'  },
  { name: 'James K.',  avatar: '/avatars/man-1.webp',   task: 'Card dispute — £89.99',  status: 'In Progress', sc: 'orange' },
  { name: 'Marco S.',  avatar: '/avatars/man-2.webp',   task: 'KYC doc upload issue',   status: 'Resolved',    sc: 'green'  },
  { name: 'Omar F.',   avatar: '/avatars/man-3.webp',   task: 'Suspicious £2,400 txn',  status: 'Pending',     sc: 'gray'   },
  { name: 'Liu W.',    avatar: '/avatars/man-4.webp',   task: 'PIN reset — locked out', status: 'In Progress', sc: 'orange' },
]

const NAV = [
  { label: 'Dashboard', active: true  },
  { label: 'Tickets',   active: false, badge: '12+' },
  { label: 'Agents',    active: false },
  { label: 'Analytics', active: false },
]

const BLOCKED_TOPICS = [
  { topic: 'Legal advice',        category: 'Legal',      color: '#ef4444', enabled: true },
  { topic: 'Compliance queries',  category: 'Compliance', color: '#f97316', enabled: true },
  { topic: 'Regulatory filings',  category: 'Regulatory', color: '#eab308', enabled: true },
  { topic: 'Account closure',     category: 'Sensitive',  color: '#8b5cf6', enabled: false },
]

const BLOCKED_QUEUE = [
  { name: 'Emma R.',   avatar: '/avatars/woman-1.webp', msg: 'I need legal advice on my dispute',    reason: 'Legal topic',      color: '#ef4444' },
  { name: 'James K.',  avatar: '/avatars/man-1.webp',   msg: 'Help with regulatory filing — urgent', reason: 'Regulatory topic', color: '#eab308' },
  { name: 'Omar F.',   avatar: '/avatars/man-3.webp',   msg: 'Compliance question about my account', reason: 'Compliance topic', color: '#f97316' },
]

export type DashboardView = 'default' | 'topic-restrictions' | 'confidence' | 'confidence-reporting' | 'data-access' | 'integrations' | 'adaptivity' | 'continuous-learning' | 'industry-presets' | 'tone-style' | 'audit-logs' | 'team-performance' | 'analytics'

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

export default function HeroDashboard({ animated = true, view = 'default', beige = false, height = 590, hiddenKPIs, hideTeamQueue, hideSLA }: { animated?: boolean; view?: DashboardView; beige?: boolean; height?: number; hiddenKPIs?: number[]; hideTeamQueue?: boolean; hideSLA?: boolean }) {
  const bg = beige ? '#faf8f5' : '#fff'
  const divider = beige ? '#e8e2d9' : '#f0f0f0'
  const [bars, setBars] = useState(BARS)
  const [rowOffset, setRowOffset] = useState(0)
  const [sla, setSla] = useState(47)
  const [blockedIdx, setBlockedIdx] = useState(0)

  useEffect(() => {
    if (!animated) return
    const t = setInterval(() => {
      setBars(prev => prev.map(h =>
        Math.max(16, Math.min(97, h + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 10) + 2)))
      ))
    }, 1800)
    return () => clearInterval(t)
  }, [animated])

  useEffect(() => {
    if (!animated) return
    const t = setInterval(() => setRowOffset(o => (o + 1) % TICKETS.length), 3200)
    return () => clearInterval(t)
  }, [animated])

  useEffect(() => {
    if (!animated) return
    const t = setInterval(() => setSla(s => (s <= 0 ? 59 : s - 1)), 1000)
    return () => clearInterval(t)
  }, [animated])

  useEffect(() => {
    if (!animated) return
    const t = setInterval(() => setBlockedIdx(i => (i + 1) % BLOCKED_QUEUE.length), 2800)
    return () => clearInterval(t)
  }, [animated])

  const R = 42
  const circ = 2 * Math.PI * R
  const resolution = 68
  const filled = circ * (resolution / 100)

  const visibleTickets = [0, 1, 2, 3].map(i => TICKETS[(rowOffset + i) % TICKETS.length])

  const card = (style?: React.CSSProperties): React.CSSProperties => ({
    background: '#fff', borderRadius: 14, padding: '12px 14px', position: 'relative', ...style,
  })

  const blockedEntry = BLOCKED_QUEUE[blockedIdx]

  const settingsViews: DashboardView[] = ['confidence', 'topic-restrictions', 'data-access', 'continuous-learning', 'industry-presets', 'tone-style']
  const analyticsViews: DashboardView[] = ['audit-logs', 'confidence-reporting', 'team-performance', 'analytics']
  const activeNav = settingsViews.includes(view) ? 'Settings' : analyticsViews.includes(view) ? 'Analytics' : 'Dashboard'

  const controlSubItems: { v: DashboardView; label: string }[] = [
    { v: 'confidence',        label: 'Confidence' },
    { v: 'topic-restrictions', label: 'Topic Rules' },
    { v: 'data-access',       label: 'Data Access' },
  ]
  const adaptivitySubItems: { v: DashboardView; label: string }[] = [
    { v: 'continuous-learning', label: 'Learning' },
    { v: 'industry-presets',    label: 'Presets' },
    { v: 'tone-style',          label: 'Tone & Style' },
  ]
  const activeSettingsGroup =
    ['confidence', 'topic-restrictions', 'data-access'].includes(view) ? controlSubItems :
    ['continuous-learning', 'industry-presets', 'tone-style'].includes(view) ? adaptivitySubItems : null

  return (
    <div style={{
      display: 'flex',
      background: bg,
      borderRadius: 22,
      overflow: 'hidden',
      boxShadow: '0 20px 70px rgba(0,0,0,0.20)',
      fontFamily: "'Nohemi', sans-serif",
      fontSize: 12,
      color: '#111827',
      userSelect: 'none',
      height,
    }}>
      {/* ── SIDEBAR ── */}
      <div style={{ width: 120, background: bg, borderRight: `1px solid ${divider}`, display: 'flex', flexDirection: 'column', padding: '16px 0', flexShrink: 0 }}>
        <div style={{ padding: '0 14px 16px' }}>
          <img loading="lazy" src="/component-156.webp" alt="supVision" style={{ height: 28, width: 'auto', display: 'block' }} />
        </div>
        {activeNav === 'Settings' ? (
          <>
            {/* Back row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 14px 10px', cursor: 'default' }}>
              <svg viewBox="0 0 16 16" fill="#9ca3af" style={{ width: 10, height: 10, flexShrink: 0 }}>
                <path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
              </svg>
              <span style={{ fontSize: 10, color: '#9ca3af' }}>Settings</span>
            </div>
            <p style={{ fontSize: 8.5, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.13em', textTransform: 'uppercase', padding: '0 14px 6px' }}>
              {['confidence', 'topic-restrictions', 'data-access'].includes(view) ? 'Control' : 'Adaptivity'}
            </p>
            {activeSettingsGroup && activeSettingsGroup.map(sub => (
              <div key={sub.v} style={{
                display: 'flex', alignItems: 'center',
                padding: '7px 14px',
                borderLeft: view === sub.v ? '3px solid #214995' : '3px solid transparent',
                background: view === sub.v ? 'rgba(33,73,149,0.08)' : 'transparent',
                marginBottom: 1,
              }}>
                <span style={{ fontSize: 11, fontWeight: view === sub.v ? 700 : 500, color: view === sub.v ? '#214995' : '#6b7280' }}>{sub.label}</span>
              </div>
            ))}
            <div style={{ flex: 1 }} />
            {['Help', 'Logout'].map(l => (
              <div key={l} style={{ padding: '6px 14px', borderLeft: '3px solid transparent' }}>
                <span style={{ fontSize: 11, fontWeight: 500, color: '#9ca3af' }}>{l}</span>
              </div>
            ))}
          </>
        ) : (
          <>
            <p style={{ fontSize: 8.5, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.13em', textTransform: 'uppercase', padding: '0 14px 6px' }}>Menu</p>
            {NAV.map(item => {
              const isActive = activeNav === item.label
              return (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '7px 14px',
                  background: isActive ? 'rgba(33,73,149,0.08)' : 'transparent',
                  borderLeft: isActive ? '3px solid #214995' : '3px solid transparent',
                  marginBottom: 1,
                }}>
                  <span style={{ fontSize: 11, fontWeight: isActive ? 700 : 500, color: isActive ? '#214995' : '#6b7280' }}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span style={{ fontSize: 8, fontWeight: 700, background: '#214995', color: '#fff', borderRadius: 100, padding: '1px 5px' }}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )
            })}
            <div style={{ flex: 1 }} />
            <p style={{ fontSize: 8.5, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.13em', textTransform: 'uppercase', padding: '0 14px 6px' }}>General</p>
            {['Settings', 'Help', 'Logout'].map(l => (
              <div key={l} style={{ padding: '6px 14px', borderLeft: '3px solid transparent' }}>
                <span style={{ fontSize: 11, fontWeight: 500, color: '#9ca3af' }}>{l}</span>
              </div>
            ))}
          </>
        )}
      </div>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8f9fb', minWidth: 0 }}>
        {/* Header */}
        <div style={{ background: bg, borderBottom: `1px solid ${divider}`, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f3f4f6', borderRadius: 10, padding: '6px 12px', flex: 1, maxWidth: 200 }}>
            <svg viewBox="0 0 16 16" fill="#9ca3af" style={{ width: 12, height: 12, flexShrink: 0 }}>
              <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
            </svg>
            <span style={{ fontSize: 11, color: '#9ca3af' }}>Search tickets…</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #1a2744 0%, #214995 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', border: '2px solid #e0e7ff' }}>
              <img loading="lazy" src="/component-187.webp" alt="supVision Agent" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.2 }}>supVision Agent</p>
              <p style={{ fontSize: 9, color: '#9ca3af', lineHeight: 1.2 }}>Admin</p>
            </div>
          </div>
        </div>

        {/* ── CONTENT VIEWS ── */}
        <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>

          {view === 'confidence' ? (
            /* ── CONFIDENCE THRESHOLDS VIEW ── */
            <>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Confidence Thresholds</h2>
                  <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>Per-topic automation confidence levels</p>
                </div>
                <button style={{ background: '#214995', color: '#fff', border: 'none', borderRadius: 10, padding: '6px 12px', fontSize: 10, fontWeight: 700, cursor: 'default' }}>
                  Edit Thresholds
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 10 }}>
                {/* Topic confidence bars */}
                <div style={card()}>
                  <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Topic Confidence Levels</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {[
                      { topic: 'Balance inquiry',     score: 94, threshold: 80, outcome: 'Auto' },
                      { topic: 'Card expiry check',   score: 91, threshold: 80, outcome: 'Auto' },
                      { topic: 'PIN reset',           score: 87, threshold: 80, outcome: 'Auto' },
                      { topic: 'Card dispute',        score: 31, threshold: 80, outcome: 'Escalate' },
                      { topic: 'Suspicious txn',      score: 22, threshold: 80, outcome: 'Escalate' },
                    ].map(t => {
                      const auto = t.score >= t.threshold
                      return (
                        <div key={t.topic}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                            <span style={{ fontSize: 10, fontWeight: 600, color: '#374151' }}>{t.topic}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                              <span style={{ fontSize: 9, fontWeight: 800, color: auto ? '#16a34a' : '#dc2626' }}>{t.score}%</span>
                              <span style={{ fontSize: 8, fontWeight: 700, borderRadius: 100, padding: '1px 6px', background: auto ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: auto ? '#16a34a' : '#dc2626' }}>{t.outcome}</span>
                            </div>
                          </div>
                          <div style={{ height: 5, borderRadius: 100, background: '#f3f4f6', overflow: 'visible', position: 'relative' }}>
                            <div style={{ height: '100%', width: `${t.score}%`, background: auto ? '#214995' : '#ef4444', borderRadius: 100, transition: 'width 0.8s ease' }} />
                            {/* threshold marker */}
                            <div style={{ position: 'absolute', top: -3, left: `${t.threshold}%`, width: 2, height: 11, background: '#9ca3af', borderRadius: 1, transform: 'translateX(-50%)' }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10 }}>
                    <div style={{ width: 2, height: 10, background: '#9ca3af', borderRadius: 1 }} />
                    <span style={{ fontSize: 9, color: '#9ca3af' }}>Threshold line — 80%</span>
                  </div>
                </div>

                {/* Live decision feed */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={card()}>
                    <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Live Decisions</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {[
                        { name: 'Sarah M.', avatar: '/avatars/woman-1.webp', query: "What's my balance?",          score: 94, auto: true  },
                        { name: 'James K.', avatar: '/avatars/man-1.webp',   query: 'Dispute — charge was wrong',  score: 31, auto: false },
                        { name: 'Liu W.',   avatar: '/avatars/man-4.webp',   query: 'How do I reset my PIN?',      score: 87, auto: true  },
                      ].map((d, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 8px', borderRadius: 10, background: d.auto ? 'rgba(34,197,94,0.04)' : 'rgba(239,68,68,0.04)', border: `1px solid ${d.auto ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)'}` }}>
                          <img loading="lazy" src={d.avatar} alt="" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 9, fontWeight: 700, margin: 0 }}>{d.name}</p>
                            <p style={{ fontSize: 9, color: '#6b7280', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.query}</p>
                          </div>
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <p style={{ fontSize: 10, fontWeight: 800, margin: 0, color: d.auto ? '#16a34a' : '#dc2626' }}>{d.score}%</p>
                            <p style={{ fontSize: 8, margin: 0, color: d.auto ? '#16a34a' : '#dc2626' }}>{d.auto ? 'Auto' : 'Escalate'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={card()}>
                    <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Today's Split</p>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ height: 8, borderRadius: 100, overflow: 'hidden', display: 'flex' }}>
                          <div style={{ width: '93%', background: '#214995' }} />
                          <div style={{ flex: 1, background: '#ef4444' }} />
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 7 }}>
                      {[{ c: '#214995', l: 'Auto-resolved', v: '93%' }, { c: '#ef4444', l: 'Escalated', v: '7%' }].map(x => (
                        <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <div style={{ width: 7, height: 7, borderRadius: '50%', background: x.c }} />
                          <span style={{ fontSize: 9, color: '#6b7280' }}>{x.l}</span>
                          <span style={{ fontSize: 9, fontWeight: 700 }}>{x.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Threshold config row */}
              <div style={card()}>
                <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Global Settings</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[
                    { label: 'Auto threshold',    value: '80%',  desc: 'Min confidence to automate',    color: '#214995' },
                    { label: 'Escalate below',    value: '40%',  desc: 'Route to human under this',     color: '#ef4444' },
                    { label: 'Review zone',       value: '40–80%', desc: 'Flag for supervisor review',  color: '#f97316' },
                    { label: 'Topics configured', value: '14',   desc: 'Unique topics with thresholds', color: '#22c55e' },
                  ].map(s => (
                    <div key={s.label} style={{ flex: 1, padding: '8px 10px', borderRadius: 10, background: '#f9fafb', border: '1px solid #f0f0f0' }}>
                      <p style={{ fontSize: 16, fontWeight: 800, margin: 0, color: s.color }}>{s.value}</p>
                      <p style={{ fontSize: 9, fontWeight: 700, margin: '2px 0 1px', color: '#374151' }}>{s.label}</p>
                      <p style={{ fontSize: 8, color: '#9ca3af', margin: 0 }}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : view === 'data-access' ? (
            /* ── DATA ACCESS CONTROLS VIEW ── */
            <>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Data Access Controls</h2>
                  <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>Permissions for AI data read / write / reference</p>
                </div>
                <button style={{ background: '#214995', color: '#fff', border: 'none', borderRadius: 10, padding: '6px 12px', fontSize: 10, fontWeight: 700, cursor: 'default' }}>
                  Save Changes
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 10 }}>
                {/* Permissions table */}
                <div style={card()}>
                  <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Data Permissions</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 0 }}>
                    {/* Header */}
                    <div style={{ fontSize: 8, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 0 6px' }}>Resource</div>
                    {['Read', 'Write', 'Ref'].map(h => (
                      <div key={h} style={{ fontSize: 8, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 8px 6px', textAlign: 'center' }}>{h}</div>
                    ))}
                    {/* Divider */}
                    <div style={{ gridColumn: '1 / -1', height: 1, background: '#f0f0f0', marginBottom: 6 }} />
                    {[
                      { label: 'Customer Profile',   read: true,  write: false, ref: true  },
                      { label: 'Transaction History', read: true,  write: false, ref: true  },
                      { label: 'Account Balance',     read: true,  write: false, ref: false },
                      { label: 'Card Details',        read: false, write: false, ref: false, restricted: true },
                      { label: 'KYC Documents',       read: false, write: false, ref: false, restricted: true },
                      { label: 'Support History',     read: true,  write: true,  ref: true  },
                    ].map(row => (
                      <>
                        <div key={row.label} style={{ fontSize: 10, fontWeight: 600, color: row.restricted ? '#9ca3af' : '#374151', padding: '5px 0', display: 'flex', alignItems: 'center', gap: 5 }}>
                          {row.restricted && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 14, height: 14, background: 'rgba(239,68,68,0.1)', borderRadius: 4, flexShrink: 0 }}>
                              <svg viewBox="0 0 12 14" fill="none" style={{ width: 8, height: 8 }}>
                                <rect x="1" y="6" width="10" height="8" rx="2" fill="#dc2626" />
                                <path d="M3.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                                <circle cx="6" cy="10" r="1" fill="white" />
                              </svg>
                            </span>
                          )}
                          {row.label}
                        </div>
                        {[row.read, row.write, row.ref].map((v, ci) => (
                          <div key={ci} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 8px' }}>
                            <div style={{ width: 14, height: 14, borderRadius: 4, background: v ? '#214995' : '#f3f4f6', border: v ? 'none' : '1.5px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {v && <svg viewBox="0 0 10 10" fill="white" style={{ width: 8, height: 8 }}><path d="M1.5 5.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </div>
                          </div>
                        ))}
                      </>
                    ))}
                  </div>
                </div>

                {/* Right column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {/* Live access log */}
                  <div style={card()}>
                    <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Recent Access Log</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {[
                        { resource: 'Customer Profile', action: 'READ',  user: 'Sarah M.',  ok: true  },
                        { resource: 'Transaction History', action: 'READ', user: 'James K.', ok: true  },
                        { resource: 'Card Details',      action: 'READ',  user: 'Omar F.',   ok: false },
                        { resource: 'Support History',   action: 'WRITE', user: 'Liu W.',    ok: true  },
                      ].map((e, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', borderRadius: 8, background: e.ok ? '#f9fafb' : 'rgba(239,68,68,0.04)', border: `1px solid ${e.ok ? '#f0f0f0' : 'rgba(239,68,68,0.12)'}` }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: e.ok ? '#22c55e' : '#ef4444', flexShrink: 0 }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 9, margin: 0, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.resource}</p>
                            <p style={{ fontSize: 8, margin: 0, color: '#9ca3af' }}>{e.user}</p>
                          </div>
                          <span style={{ fontSize: 8, fontWeight: 700, borderRadius: 4, padding: '1px 5px', background: e.ok ? 'rgba(33,73,149,0.08)' : 'rgba(239,68,68,0.1)', color: e.ok ? '#214995' : '#dc2626', flexShrink: 0 }}>{e.action}</span>
                          {!e.ok && <span style={{ fontSize: 8, fontWeight: 700, color: '#dc2626' }}>BLOCKED</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary stats */}
                  <div style={card()}>
                    <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Access Summary</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {[
                        { label: 'Allowed requests', value: '2,341', color: '#22c55e' },
                        { label: 'Blocked attempts', value: '18',    color: '#ef4444' },
                        { label: 'Restricted fields', value: '2',    color: '#9ca3af' },
                      ].map(s => (
                        <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 9, color: '#6b7280' }}>{s.label}</span>
                          <span style={{ fontSize: 10, fontWeight: 800, color: s.color }}>{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom roles */}
              <div style={card()}>
                <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Access Roles</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { role: 'AI Agent',        perms: ['Read profile', 'Read txn history', 'Write support log'], color: '#214995' },
                    { role: 'Human Agent',     perms: ['Full read access', 'Write notes', 'View card (masked)'], color: '#22c55e' },
                    { role: 'Supervisor',      perms: ['Full access', 'Export data', 'Edit AI permissions'],    color: '#8b5cf6' },
                  ].map(r => (
                    <div key={r.role} style={{ flex: 1, padding: '8px 10px', borderRadius: 10, background: '#f9fafb', border: '1px solid #f0f0f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: r.color }} />
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#111827' }}>{r.role}</span>
                      </div>
                      {r.perms.map(p => (
                        <p key={p} style={{ fontSize: 8.5, color: '#6b7280', margin: '0 0 2px' }}>· {p}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : view === 'topic-restrictions' ? (
            /* ── TOPIC RESTRICTIONS VIEW ── */
            <>
              {/* Title */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Topic Restrictions</h2>
                  <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>Define what the AI cannot handle</p>
                </div>
                <button style={{ background: '#214995', color: '#fff', border: 'none', borderRadius: 10, padding: '6px 12px', fontSize: 10, fontWeight: 700, cursor: 'default' }}>
                  + Add Rule
                </button>
              </div>

              {/* Blocked topics list + live intercept */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 10 }}>
                {/* Topics list */}
                <div style={card()}>
                  <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Restricted Topics</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {BLOCKED_TOPICS.map((t) => (
                      <div key={t.topic} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 10, background: t.enabled ? 'rgba(239,68,68,0.04)' : '#f9fafb', border: `1px solid ${t.enabled ? 'rgba(239,68,68,0.12)' : '#f0f0f0'}` }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: t.enabled ? t.color : '#d1d5db', flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 10, fontWeight: 700, margin: 0, color: t.enabled ? '#111827' : '#9ca3af' }}>{t.topic}</p>
                          <p style={{ fontSize: 9, color: '#9ca3af', margin: 0 }}>{t.category}</p>
                        </div>
                        <div style={{ width: 28, height: 16, borderRadius: 100, background: t.enabled ? t.color : '#e5e7eb', display: 'flex', alignItems: 'center', padding: '0 3px', justifyContent: t.enabled ? 'flex-end' : 'flex-start', flexShrink: 0 }}>
                          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live intercept */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {/* Intercepted message */}
                  <div style={card({ background: '#fff', border: '1px solid #fee2e2' })}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <span style={{ fontSize: 8, fontWeight: 800, background: '#fee2e2', color: '#dc2626', borderRadius: 100, padding: '2px 8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Intercepted</span>
                      <span style={{ fontSize: 9, color: '#9ca3af' }}>just now</span>
                    </div>
                    <div key={blockedIdx} style={{ animation: 'log-in 0.35s ease both' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                        <img loading="lazy" src={blockedEntry.avatar} alt="" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                        <span style={{ fontSize: 10, fontWeight: 700 }}>{blockedEntry.name}</span>
                      </div>
                      <div style={{ background: '#f3f4f6', borderRadius: '4px 10px 10px 10px', padding: '6px 10px', marginBottom: 8 }}>
                        <p style={{ fontSize: 10, margin: 0, color: '#374151' }}>"{blockedEntry.msg}"</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: blockedEntry.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 9, color: '#6b7280' }}>{blockedEntry.reason}</span>
                        <span style={{ fontSize: 9, color: '#9ca3af', margin: '0 3px' }}>→</span>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#214995' }}>Human Agent</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={card()}>
                    <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Today's Blocks</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {[
                        { label: 'Legal',      count: 14, color: '#ef4444', pct: 44 },
                        { label: 'Compliance', count: 9,  color: '#f97316', pct: 28 },
                        { label: 'Regulatory', count: 9,  color: '#eab308', pct: 28 },
                      ].map(x => (
                        <div key={x.label}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                            <span style={{ fontSize: 9, color: '#6b7280' }}>{x.label}</span>
                            <span style={{ fontSize: 9, fontWeight: 700 }}>{x.count}</span>
                          </div>
                          <div style={{ height: 4, borderRadius: 100, background: '#f3f4f6', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${x.pct}%`, background: x.color, borderRadius: 100 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Routed tickets */}
              <div style={card({ padding: '12px 14px' })}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <p style={{ fontSize: 11, fontWeight: 700 }}>Routed to Human Agents</p>
                  <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(239,68,68,0.1)', color: '#dc2626', borderRadius: 100, padding: '2px 8px' }}>32 today</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {BLOCKED_QUEUE.map((entry, i) => (
                    <div key={i} style={{ flex: 1, padding: '8px 10px', borderRadius: 10, background: '#f9fafb', border: '1px solid #f0f0f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                        <img loading="lazy" src={entry.avatar} alt="" style={{ width: 18, height: 18, borderRadius: '50%', objectFit: 'cover' }} />
                        <span style={{ fontSize: 9, fontWeight: 700 }}>{entry.name}</span>
                      </div>
                      <p style={{ fontSize: 9, color: '#6b7280', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.msg}</p>
                      <span style={{ fontSize: 8, fontWeight: 700, borderRadius: 100, padding: '2px 6px', background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}>{entry.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : view === 'audit-logs' ? (
            /* ── AUDIT LOGS VIEW ── */
            <>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Audit Logs</h2>
                  <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>Full conversation history — exportable for compliance</p>
                </div>
                <button style={{ background: '#214995', color: '#fff', border: 'none', borderRadius: 10, padding: '6px 12px', fontSize: 10, fontWeight: 700, cursor: 'default', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <svg viewBox="0 0 12 12" fill="none" style={{ width: 9, height: 9 }}><path d="M1 9h10M1 6h10M1 3h10" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  Export CSV
                </button>
              </div>

              {/* Log entries */}
              <div style={card({ padding: '10px 12px' })}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 0.7fr 0.65fr 0.7fr', gap: 0, marginBottom: 6 }}>
                  {['Time', 'Query', 'Confidence', 'Decision', 'Agent'].map(h => (
                    <span key={h} style={{ fontSize: 8, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 6px 0 0' }}>{h}</span>
                  ))}
                </div>
                <div style={{ height: 1, background: '#f0f0f0', marginBottom: 8 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {[
                    { time: '14:32:01', query: 'What is my account balance?',          conf: 94, decision: 'Auto',     agent: 'AI',    ok: true  },
                    { time: '14:29:47', query: 'Card charged twice — dispute',          conf: 31, decision: 'Escalate', agent: 'James', ok: false },
                    { time: '14:27:10', query: 'When does my Visa expire?',             conf: 91, decision: 'Auto',     agent: 'AI',    ok: true  },
                    { time: '14:24:55', query: 'Suspicious £2,400 transaction',         conf: 22, decision: 'Escalate', agent: 'Sarah', ok: false },
                    { time: '14:21:30', query: 'How do I reset my PIN?',                conf: 87, decision: 'Auto',     agent: 'AI',    ok: true  },
                    { time: '14:18:09', query: 'KYC document upload not working',       conf: 76, decision: 'Auto',     agent: 'AI',    ok: true  },
                    { time: '14:14:42', query: 'My limit dropped without notice',       conf: 35, decision: 'Escalate', agent: 'Marco', ok: false },
                  ].map((r, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 0.7fr 0.65fr 0.7fr', alignItems: 'center', padding: '5px 8px', borderRadius: 8, background: i % 2 === 0 ? '#f9fafb' : '#fff' }}>
                      <span style={{ fontSize: 9, color: '#9ca3af', fontFamily: 'monospace' }}>{r.time}</span>
                      <span style={{ fontSize: 9, color: '#374151', paddingRight: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.query}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <div style={{ flex: 1, height: 4, borderRadius: 100, background: '#f0f0f0', overflow: 'hidden', maxWidth: 36 }}>
                          <div style={{ height: '100%', width: `${r.conf}%`, background: r.conf >= 80 ? '#214995' : r.conf >= 50 ? '#f97316' : '#ef4444', borderRadius: 100 }} />
                        </div>
                        <span style={{ fontSize: 9, fontWeight: 700, color: r.conf >= 80 ? '#214995' : '#ef4444' }}>{r.conf}%</span>
                      </div>
                      <span style={{ fontSize: 8, fontWeight: 700, borderRadius: 100, padding: '2px 6px', background: r.ok ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: r.ok ? '#16a34a' : '#dc2626' }}>{r.decision}</span>
                      <span style={{ fontSize: 9, color: '#6b7280' }}>{r.agent}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary strip */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                {[
                  { label: 'Total logs',    value: '2,847', color: '#214995' },
                  { label: 'Auto-resolved', value: '2,649', color: '#16a34a' },
                  { label: 'Escalated',     value: '198',   color: '#ef4444' },
                  { label: 'Exported today',value: '3',     color: '#9ca3af' },
                ].map(s => (
                  <div key={s.label} style={{ ...card({ padding: '8px 10px' }) }}>
                    <p style={{ fontSize: 16, fontWeight: 800, margin: 0, color: s.color }}>{s.value}</p>
                    <p style={{ fontSize: 9, color: '#9ca3af', margin: '2px 0 0' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </>
          ) : view === 'confidence-reporting' ? (
            /* ── CONFIDENCE REPORTING VIEW ── */
            <>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Confidence Reporting</h2>
                  <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>Where the AI is uncertain — close gaps before they hit customers</p>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(251,154,5,0.12)', color: '#d97706', borderRadius: 100, padding: '3px 10px' }}>7 gaps detected</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 10 }}>
                {/* Uncertainty heatmap */}
                <div style={card()}>
                  <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Uncertainty by Topic</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {[
                      { topic: 'Chargeback process',    score: 38, volume: 84,  gap: true  },
                      { topic: 'FX rate disputes',      score: 29, volume: 42,  gap: true  },
                      { topic: 'PSD2 compliance FAQ',   score: 44, volume: 31,  gap: true  },
                      { topic: 'Balance inquiry',       score: 94, volume: 312, gap: false },
                      { topic: 'Card expiry',           score: 91, volume: 198, gap: false },
                      { topic: 'PIN reset',             score: 87, volume: 167, gap: false },
                    ].map(t => (
                      <div key={t.topic} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                            <span style={{ fontSize: 9, fontWeight: t.gap ? 700 : 500, color: t.gap ? '#dc2626' : '#374151' }}>{t.topic}</span>
                            <span style={{ fontSize: 9, color: '#9ca3af' }}>{t.volume} queries</span>
                          </div>
                          <div style={{ height: 5, borderRadius: 100, background: '#f3f4f6', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${t.score}%`, background: t.gap ? '#ef4444' : '#214995', borderRadius: 100 }} />
                          </div>
                        </div>
                        <span style={{ fontSize: 9, fontWeight: 800, color: t.gap ? '#dc2626' : '#16a34a', width: 28, textAlign: 'right', flexShrink: 0 }}>{t.score}%</span>
                        {t.gap && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: recommended actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={card({ border: '1px solid rgba(251,154,5,0.2)', background: 'rgba(251,154,5,0.03)' })}>
                    <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Recommended Actions</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {[
                        { action: 'Add chargeback FAQ',     impact: 'High',   topic: 'Chargeback process' },
                        { action: 'Train on FX disputes',   impact: 'Medium', topic: 'FX rate disputes'   },
                        { action: 'Update PSD2 content',    impact: 'Medium', topic: 'PSD2 compliance'    },
                      ].map((a, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, padding: '6px 8px', borderRadius: 8, background: '#fff', border: '1px solid #f0f0f0' }}>
                          <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#214995', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                            <span style={{ fontSize: 8, fontWeight: 800, color: '#fff' }}>{i + 1}</span>
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 9, fontWeight: 700, margin: 0 }}>{a.action}</p>
                            <p style={{ fontSize: 8, color: '#9ca3af', margin: '1px 0 0' }}>{a.topic}</p>
                          </div>
                          <span style={{ fontSize: 8, fontWeight: 700, borderRadius: 100, padding: '1px 6px', background: a.impact === 'High' ? 'rgba(239,68,68,0.1)' : 'rgba(251,154,5,0.1)', color: a.impact === 'High' ? '#dc2626' : '#d97706', flexShrink: 0 }}>{a.impact}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={card()}>
                    <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Coverage Score</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <svg viewBox="0 0 80 50" style={{ width: 80, overflow: 'visible', flexShrink: 0 }}>
                        <path d="M 8 46 A 32 32 0 0 1 72 46" fill="none" stroke="#f0f0f0" strokeWidth="8" strokeLinecap="round" />
                        <path d="M 8 46 A 32 32 0 0 1 72 46" fill="none" stroke="#214995" strokeWidth="8" strokeLinecap="round" strokeDasharray="78 100" />
                        <text x="40" y="42" textAnchor="middle" style={{ fontSize: 13, fontWeight: 800, fill: '#111827', fontFamily: "'Nohemi', sans-serif" }}>78%</text>
                      </svg>
                      <div>
                        <p style={{ fontSize: 10, fontWeight: 700, margin: 0 }}>Knowledge Base</p>
                        <p style={{ fontSize: 9, color: '#9ca3af', margin: '2px 0 0' }}>7 topics need content</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : view === 'adaptivity' ? (
            /* ── ADAPTIVITY VIEW ── */
            <>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Adaptivity</h2>
                  <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>AI behaviour tailored to your business</p>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(33,73,149,0.08)', color: '#214995', borderRadius: 100, padding: '3px 10px' }}>3 presets active</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 10 }}>
                {/* Learning progress */}
                <div style={card()}>
                  <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Continuous Learning</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      { label: 'Tickets learned from',   value: 1847, bar: 92, color: '#214995' },
                      { label: 'Agent corrections applied', value: 134, bar: 67, color: '#22c55e' },
                      { label: 'New patterns detected',   value: 28,   bar: 42, color: '#FB9A05' },
                    ].map(s => (
                      <div key={s.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                          <span style={{ fontSize: 9, color: '#374151' }}>{s.label}</span>
                          <span style={{ fontSize: 9, fontWeight: 700, color: s.color }}>{s.value.toLocaleString()}</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 100, background: '#f3f4f6', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${s.bar}%`, background: s.color, borderRadius: 100 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, padding: '7px 10px', borderRadius: 10, background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                    <span style={{ fontSize: 9, color: '#16a34a', fontWeight: 600 }}>Accuracy improved +4.2% this month</span>
                  </div>
                </div>

                {/* Tone + language */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={card()}>
                    <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Tone & Style</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {[
                        { channel: 'WhatsApp',  tone: 'Friendly',  color: '#22c55e' },
                        { channel: 'Email',     tone: 'Formal',    color: '#214995' },
                        { channel: 'Web chat',  tone: 'Concise',   color: '#8b5cf6' },
                        { channel: 'Telegram',  tone: 'Friendly',  color: '#22c55e' },
                      ].map(t => (
                        <div key={t.channel} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '4px 8px', borderRadius: 8, background: '#f9fafb' }}>
                          <span style={{ fontSize: 9, color: '#374151', flex: 1 }}>{t.channel}</span>
                          <span style={{ fontSize: 8, fontWeight: 700, borderRadius: 100, padding: '2px 7px', background: `${t.color}18`, color: t.color }}>{t.tone}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={card()}>
                    <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Languages Active</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {['EN', 'DE', 'FR', 'ES', 'AR', 'ZH', 'RU', 'PT'].map(l => (
                        <span key={l} style={{ fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 100, background: 'rgba(33,73,149,0.08)', color: '#214995' }}>{l}</span>
                      ))}
                    </div>
                    <p style={{ fontSize: 9, color: '#9ca3af', marginTop: 6 }}>Auto-detected · No config needed</p>
                  </div>
                </div>
              </div>

              {/* Industry presets */}
              <div style={card()}>
                <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Industry Presets</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { label: 'Neobank',           active: true,  topics: 14, color: '#214995' },
                    { label: 'Payments',          active: true,  topics: 11, color: '#22c55e' },
                    { label: 'Crypto / Web3',     active: true,  topics: 9,  color: '#8b5cf6' },
                    { label: 'Lending',           active: false, topics: 8,  color: '#9ca3af' },
                    { label: 'FX & Trading',      active: false, topics: 7,  color: '#9ca3af' },
                  ].map(p => (
                    <div key={p.label} style={{ flex: 1, padding: '7px 9px', borderRadius: 10, background: p.active ? `${p.color}0d` : '#f9fafb', border: `1px solid ${p.active ? p.color + '33' : '#f0f0f0'}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.active ? p.color : '#d1d5db' }} />
                        <span style={{ fontSize: 9, fontWeight: 700, color: p.active ? '#111827' : '#9ca3af' }}>{p.label}</span>
                      </div>
                      <p style={{ fontSize: 8, color: '#9ca3af', margin: 0 }}>{p.topics} topics</p>
                      <span style={{ fontSize: 8, fontWeight: 700, color: p.active ? p.color : '#d1d5db' }}>{p.active ? 'Active' : 'Off'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : view === 'continuous-learning' ? (
            /* ── CONTINUOUS LEARNING VIEW ── */
            <>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Continuous Learning</h2>
                  <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>supVision improves from every interaction, automatically</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 100, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#16a34a' }}>Learning active</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 10 }}>
                {/* Accuracy timeline */}
                <div style={card()}>
                  <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Accuracy Over Time</p>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 80 }}>
                    {[72, 74, 75, 77, 79, 82, 84, 86, 88, 91, 93, 94].map((h, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', justifyContent: 'flex-end' }}>
                        {i === 11 && <span style={{ fontSize: 8, fontWeight: 700, color: '#214995' }}>{h}%</span>}
                        <div style={{ width: '100%', height: `${h}%`, borderRadius: 100, background: i === 11 ? '#214995' : `rgba(33,73,149,${0.15 + i * 0.07})`, transition: 'height 0.7s ease' }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                    {['Jan', '', '', 'Apr', '', '', 'Jul', '', '', 'Oct', '', 'Now'].map((l, i) => (
                      <span key={i} style={{ fontSize: 8, color: '#9ca3af', flex: 1, textAlign: 'center' }}>{l}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 8, padding: '6px 10px', borderRadius: 8, background: 'rgba(33,73,149,0.05)' }}>
                    <span style={{ fontSize: 9, color: '#214995', fontWeight: 600 }}>+22% accuracy since deployment</span>
                  </div>
                </div>

                {/* Learning stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={card()}>
                    <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Learning Sources</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {[
                        { label: 'Resolved tickets',       value: '1,847', bar: 92, color: '#214995' },
                        { label: 'Agent corrections',      value: '134',   bar: 67, color: '#22c55e' },
                        { label: 'New patterns detected',  value: '28',    bar: 28, color: '#FB9A05' },
                      ].map(s => (
                        <div key={s.label}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                            <span style={{ fontSize: 9, color: '#374151' }}>{s.label}</span>
                            <span style={{ fontSize: 9, fontWeight: 700, color: s.color }}>{s.value}</span>
                          </div>
                          <div style={{ height: 4, borderRadius: 100, background: '#f3f4f6', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${s.bar}%`, background: s.color, borderRadius: 100 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={card()}>
                    <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Recent Corrections</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {[
                        { agent: 'Sarah M.', fix: 'Chargeback tone adjusted',   time: '2h ago' },
                        { agent: 'James K.', fix: 'Dispute escalation updated',  time: '5h ago' },
                        { agent: 'Marco S.', fix: 'KYC response improved',       time: 'Yesterday' },
                      ].map((c, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 8px', borderRadius: 8, background: '#f9fafb' }}>
                          <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(33,73,149,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: 8, fontWeight: 800, color: '#214995' }}>{c.agent[0]}</span>
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 9, fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.fix}</p>
                            <p style={{ fontSize: 8, color: '#9ca3af', margin: 0 }}>{c.agent} · {c.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : view === 'industry-presets' ? (
            /* ── INDUSTRY PRESETS VIEW ── */
            <>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Industry Presets</h2>
                  <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>Pre-configured for fintech verticals — ready out of the box</p>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(33,73,149,0.08)', color: '#214995', borderRadius: 100, padding: '3px 10px' }}>3 active</span>
              </div>

              {/* Preset cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {[
                  { label: 'Neobank',       active: true,  color: '#214995', topics: 14, coverage: 94, examples: ['Balance inquiry', 'Card freeze/unfreeze', 'KYC upload', 'Spending limits'] },
                  { label: 'Payments',      active: true,  color: '#22c55e', topics: 11, coverage: 89, examples: ['Dispute filing', 'Chargeback status', 'FX rates', 'Failed payment'] },
                  { label: 'Crypto / Web3', active: true,  color: '#8b5cf6', topics: 9,  coverage: 81, examples: ['Wallet connect', 'Gas fee queries', 'Token transfer', 'Staking FAQ'] },
                  { label: 'Lending',       active: false, color: '#9ca3af', topics: 8,  coverage: 0,  examples: ['Loan status', 'Repayment schedule', 'Early payoff', 'Rate enquiry'] },
                  { label: 'FX & Trading',  active: false, color: '#9ca3af', topics: 7,  coverage: 0,  examples: ['Spread queries', 'Position size', 'Margin calls', 'Market hours'] },
                  { label: 'InsurTech',     active: false, color: '#9ca3af', topics: 6,  coverage: 0,  examples: ['Policy details', 'Claim status', 'Premium info', 'Coverage FAQ'] },
                ].map(p => (
                  <div key={p.label} style={{ padding: '10px 10px', borderRadius: 12, background: p.active ? `${p.color}0d` : '#f9fafb', border: `1px solid ${p.active ? p.color + '30' : '#f0f0f0'}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: p.active ? p.color : '#d1d5db' }} />
                        <span style={{ fontSize: 10, fontWeight: 700, color: p.active ? '#111827' : '#9ca3af' }}>{p.label}</span>
                      </div>
                      <span style={{ fontSize: 8, fontWeight: 700, color: p.active ? p.color : '#d1d5db' }}>{p.active ? 'ON' : 'OFF'}</span>
                    </div>
                    {p.active && (
                      <>
                        <div style={{ height: 3, borderRadius: 100, background: '#f0f0f0', overflow: 'hidden', marginBottom: 5 }}>
                          <div style={{ height: '100%', width: `${p.coverage}%`, background: p.color, borderRadius: 100 }} />
                        </div>
                        <span style={{ fontSize: 8, color: p.color, fontWeight: 600 }}>{p.coverage}% coverage</span>
                      </>
                    )}
                    <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {p.examples.slice(0, 3).map(e => (
                        <p key={e} style={{ fontSize: 8, color: p.active ? '#6b7280' : '#d1d5db', margin: 0 }}>· {e}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Active preset details */}
              <div style={card()}>
                <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Active Preset Performance</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[
                    { label: 'Neobank',       resolved: '94%', topics: 14, color: '#214995' },
                    { label: 'Payments',      resolved: '89%', topics: 11, color: '#22c55e' },
                    { label: 'Crypto / Web3', resolved: '81%', topics: 9,  color: '#8b5cf6' },
                  ].map(p => (
                    <div key={p.label} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 10, background: '#f9fafb' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: 10, fontWeight: 700, margin: 0 }}>{p.label}</p>
                        <p style={{ fontSize: 9, color: '#9ca3af', margin: 0 }}>{p.topics} topics · {p.resolved} resolved</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : view === 'tone-style' ? (
            /* ── TONE & STYLE VIEW ── */
            <>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Tone & Style Controls</h2>
                  <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>Define how supVision communicates per channel and segment</p>
                </div>
                <button style={{ background: '#214995', color: '#fff', border: 'none', borderRadius: 10, padding: '6px 12px', fontSize: 10, fontWeight: 700, cursor: 'default' }}>
                  Save Settings
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 10 }}>
                {/* Channel tone table */}
                <div style={card()}>
                  <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Channel Configuration</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {[
                      { channel: 'WhatsApp',  tone: 'Friendly',  length: 'Short',   emoji: true,  color: '#22c55e' },
                      { channel: 'Email',     tone: 'Formal',    length: 'Detailed', emoji: false, color: '#214995' },
                      { channel: 'Web chat',  tone: 'Concise',   length: 'Medium',  emoji: false, color: '#8b5cf6' },
                      { channel: 'Telegram',  tone: 'Friendly',  length: 'Short',   emoji: true,  color: '#22c55e' },
                      { channel: 'Zendesk',   tone: 'Formal',    length: 'Detailed', emoji: false, color: '#214995' },
                    ].map(c => (
                      <div key={c.channel} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 10px', borderRadius: 10, background: '#f9fafb' }}>
                        <span style={{ fontSize: 10, fontWeight: 600, color: '#374151', width: 60, flexShrink: 0 }}>{c.channel}</span>
                        <span style={{ fontSize: 8, fontWeight: 700, borderRadius: 100, padding: '2px 7px', background: `${c.color}18`, color: c.color, flexShrink: 0 }}>{c.tone}</span>
                        <span style={{ fontSize: 8, borderRadius: 100, padding: '2px 7px', background: '#f0f0f0', color: '#6b7280', flexShrink: 0 }}>{c.length}</span>
                        {c.emoji && <span style={{ fontSize: 9, color: '#9ca3af', marginLeft: 'auto' }}>Emoji on</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview + segment */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={card()}>
                    <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Response Preview</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ padding: '7px 10px', borderRadius: '4px 10px 10px 10px', background: '#f3f4f6' }}>
                        <p style={{ fontSize: 8, color: '#9ca3af', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Friendly (WhatsApp)</p>
                        <p style={{ fontSize: 10, color: '#374151', margin: 0 }}>Hey! Your balance is €2,847.50 ✓ Anything else I can help with? 😊</p>
                      </div>
                      <div style={{ padding: '7px 10px', borderRadius: '4px 10px 10px 10px', background: '#f3f4f6' }}>
                        <p style={{ fontSize: 8, color: '#9ca3af', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Formal (Email)</p>
                        <p style={{ fontSize: 10, color: '#374151', margin: 0 }}>Your current account balance is €2,847.50. Please do not hesitate to contact us should you require further assistance.</p>
                      </div>
                    </div>
                  </div>

                  <div style={card()}>
                    <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Segment Overrides</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {[
                        { segment: 'VIP customers',   tone: 'Premium',   color: '#FB9A05' },
                        { segment: 'Business accounts', tone: 'Formal',  color: '#214995' },
                        { segment: 'Standard',        tone: 'Friendly',  color: '#22c55e' },
                      ].map(s => (
                        <div key={s.segment} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 8px', borderRadius: 8, background: '#f9fafb' }}>
                          <span style={{ fontSize: 9, color: '#374151', flex: 1 }}>{s.segment}</span>
                          <span style={{ fontSize: 8, fontWeight: 700, borderRadius: 100, padding: '2px 7px', background: `${s.color}18`, color: s.color }}>{s.tone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : view === 'team-performance' ? (
            /* ── TEAM PERFORMANCE VIEW ── */
            <>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Team Performance</h2>
                  <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>AI vs. human — resolution rates, speed, satisfaction</p>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(33,73,149,0.08)', color: '#214995', borderRadius: 100, padding: '3px 10px' }}>May 2026</span>
              </div>

              {/* AI vs Human comparison */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'AI Agent', color: '#214995', bgLight: 'rgba(33,73,149,0.06)', resolved: 93, avgTime: '1.2s', csat: 4.6, tickets: 789 },
                  { label: 'Human Agents', color: '#22c55e', bgLight: 'rgba(34,197,94,0.06)', resolved: 87, avgTime: '4m 12s', csat: 4.8, tickets: 58 },
                ].map(p => (
                  <div key={p.label} style={{ ...card({ background: p.bgLight, border: `1px solid ${p.color}22` }) }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
                      <p style={{ fontSize: 11, fontWeight: 700, margin: 0 }}>{p.label}</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {[
                        { key: 'Resolution', val: `${p.resolved}%`, sub: 'of tickets' },
                        { key: 'Avg time',   val: p.avgTime,         sub: 'per ticket' },
                        { key: 'CSAT',       val: `${p.csat}/5`,     sub: 'satisfaction' },
                        { key: 'Tickets',    val: String(p.tickets),  sub: 'this month' },
                      ].map(m => (
                        <div key={m.key} style={{ padding: '6px 8px', background: '#fff', borderRadius: 8 }}>
                          <p style={{ fontSize: 14, fontWeight: 800, margin: 0, color: p.color }}>{m.val}</p>
                          <p style={{ fontSize: 8, color: '#9ca3af', margin: '1px 0 0' }}>{m.key}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Side-by-side bars */}
              <div style={card()}>
                <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Resolution Rate by Topic</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {[
                    { topic: 'Balance inquiry',  ai: 97, human: 92 },
                    { topic: 'Card dispute',     ai: 40, human: 94 },
                    { topic: 'PIN reset',        ai: 95, human: 88 },
                    { topic: 'KYC issues',       ai: 68, human: 91 },
                    { topic: 'Suspicious txn',   ai: 20, human: 96 },
                  ].map(t => (
                    <div key={t.topic}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ fontSize: 9, color: '#374151' }}>{t.topic}</span>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <span style={{ fontSize: 9, fontWeight: 700, color: '#214995' }}>AI {t.ai}%</span>
                          <span style={{ fontSize: 9, fontWeight: 700, color: '#22c55e' }}>H {t.human}%</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <div style={{ height: 4, borderRadius: 100, background: '#f3f4f6', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${t.ai}%`, background: '#214995', borderRadius: 100 }} />
                        </div>
                        <div style={{ height: 4, borderRadius: 100, background: '#f3f4f6', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${t.human}%`, background: '#22c55e', borderRadius: 100 }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  {[{ c: '#214995', l: 'AI Agent' }, { c: '#22c55e', l: 'Human Agents' }].map(x => (
                    <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: x.c }} />
                      <span style={{ fontSize: 9, color: '#6b7280' }}>{x.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : view === 'analytics' ? (
            /* ── RESOLUTION ANALYTICS VIEW ── */
            <>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Resolution Analytics</h2>
                  <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>Auto-resolution, response time & escalation trends</p>
                </div>
                <div style={{ display: 'flex', gap: 5 }}>
                  {['7d', '30d', '90d'].map((p, i) => (
                    <span key={p} style={{ fontSize: 9, fontWeight: 700, padding: '3px 9px', borderRadius: 100, background: i === 0 ? '#214995' : '#f3f4f6', color: i === 0 ? '#fff' : '#9ca3af', cursor: 'default' }}>{p}</span>
                  ))}
                </div>
              </div>

              {/* KPI strip */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {[
                  { label: 'Auto-resolution',   value: '93%',  delta: '↑ 2% vs last week', color: '#214995', bg: 'rgba(33,73,149,0.06)'  },
                  { label: 'Avg response time',  value: '1.2s', delta: '↓ 0.3s faster',     color: '#22c55e', bg: 'rgba(34,197,94,0.06)'  },
                  { label: 'Escalation rate',    value: '7%',   delta: '↓ 1% vs last week', color: '#f97316', bg: 'rgba(249,115,22,0.06)' },
                ].map(k => (
                  <div key={k.label} style={{ ...card({ background: k.bg, border: `1px solid ${k.color}22` }) }}>
                    <p style={{ fontSize: 8, color: '#9ca3af', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 700 }}>{k.label}</p>
                    <p style={{ fontSize: 20, fontWeight: 800, margin: 0, color: k.color, lineHeight: 1.1 }}>{k.value}</p>
                    <p style={{ fontSize: 9, color: '#6b7280', margin: '3px 0 0' }}>{k.delta}</p>
                  </div>
                ))}
              </div>

              {/* Main 2-col */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 10 }}>
                {/* Resolution rate bar chart */}
                <div style={card()}>
                  <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Auto-Resolution Rate — Last 7 Days</p>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 72 }}>
                    {[
                      { day: 'Mon', rate: 89 },
                      { day: 'Tue', rate: 91 },
                      { day: 'Wed', rate: 90 },
                      { day: 'Thu', rate: 92 },
                      { day: 'Fri', rate: 94 },
                      { day: 'Sat', rate: 91 },
                      { day: 'Sun', rate: 93 },
                    ].map((d, i) => (
                      <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', justifyContent: 'flex-end' }}>
                        {i === 4 && <span style={{ fontSize: 8, fontWeight: 700, color: '#214995' }}>{d.rate}%</span>}
                        <div style={{ width: '100%', height: `${d.rate}%`, borderRadius: '4px 4px 0 0', background: i === 6 ? '#214995' : i === 4 ? '#1e3a6e' : 'rgba(33,73,149,0.20)' }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(l => (
                      <span key={l} style={{ fontSize: 8, color: '#9ca3af', flex: 1, textAlign: 'center' }}>{l}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '6px 10px', background: '#f9fafb', borderRadius: 8 }}>
                    <span style={{ fontSize: 9, color: '#374151' }}>Avg. response time this week</span>
                    <span style={{ fontSize: 9, fontWeight: 800, color: '#22c55e' }}>1.2s</span>
                  </div>
                </div>

                {/* Escalation by channel */}
                <div style={card()}>
                  <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Escalations by Channel</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {[
                      { channel: 'WhatsApp', escalated: 3,  total: 312, color: '#22c55e' },
                      { channel: 'Web chat', escalated: 8,  total: 198, color: '#214995' },
                      { channel: 'Zendesk',  escalated: 12, total: 187, color: '#8b5cf6' },
                      { channel: 'Email',    escalated: 5,  total: 134, color: '#f97316' },
                      { channel: 'Telegram', escalated: 2,  total: 89,  color: '#06b6d4' },
                    ].map(c => {
                      const pct = Math.round((c.escalated / c.total) * 100)
                      return (
                        <div key={c.channel}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                            <span style={{ fontSize: 9, color: '#374151' }}>{c.channel}</span>
                            <div style={{ display: 'flex', gap: 7 }}>
                              <span style={{ fontSize: 9, color: '#9ca3af' }}>{c.escalated} escalated</span>
                              <span style={{ fontSize: 9, fontWeight: 700, color: pct > 5 ? '#ef4444' : '#16a34a' }}>{pct}%</span>
                            </div>
                          </div>
                          <div style={{ height: 5, borderRadius: 100, background: '#f3f4f6', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${Math.round((c.total / 312) * 100)}%`, background: c.color, opacity: 0.5, borderRadius: 100 }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* By topic table */}
              <div style={card({ padding: '10px 12px' })}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                  <p style={{ fontSize: 11, fontWeight: 700 }}>By Topic</p>
                  <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(33,73,149,0.08)', color: '#214995', borderRadius: 100, padding: '2px 8px' }}>Last 7 days</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.55fr 0.75fr 0.6fr 0.65fr', gap: 0, marginBottom: 5 }}>
                  {['Topic', 'Volume', 'Resolved', 'Avg time', 'Escalated'].map(h => (
                    <span key={h} style={{ fontSize: 8, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', paddingRight: 4 }}>{h}</span>
                  ))}
                </div>
                <div style={{ height: 1, background: '#f0f0f0', marginBottom: 5 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {[
                    { topic: 'Balance inquiry', volume: 312, resolved: 97, time: '0.9s', esc: '3%',  ok: true  },
                    { topic: 'PIN reset',        volume: 167, resolved: 95, time: '1.1s', esc: '5%',  ok: true  },
                    { topic: 'Card expiry',      volume: 198, resolved: 91, time: '1.2s', esc: '9%',  ok: true  },
                    { topic: 'KYC doc upload',   volume: 89,  resolved: 68, time: '2.4s', esc: '32%', ok: false },
                    { topic: 'Card dispute',     volume: 84,  resolved: 40, time: '1.8s', esc: '60%', ok: false },
                  ].map((r, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.55fr 0.75fr 0.6fr 0.65fr', alignItems: 'center', padding: '4px 6px', borderRadius: 6, background: i % 2 === 0 ? '#f9fafb' : '#fff' }}>
                      <span style={{ fontSize: 9, color: '#374151' }}>{r.topic}</span>
                      <span style={{ fontSize: 9, color: '#6b7280' }}>{r.volume}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 24, height: 3, borderRadius: 100, background: '#f0f0f0', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${r.resolved}%`, background: r.ok ? '#214995' : '#ef4444', borderRadius: 100 }} />
                        </div>
                        <span style={{ fontSize: 9, fontWeight: 700, color: r.ok ? '#214995' : '#ef4444' }}>{r.resolved}%</span>
                      </div>
                      <span style={{ fontSize: 9, color: '#6b7280' }}>{r.time}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: r.ok ? '#16a34a' : '#ef4444' }}>{r.esc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* ── DEFAULT DASHBOARD VIEW ── */
            <>
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

              {/* KPI row — per-card visibility:hidden preserves layout for 3D floating overlay */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                <div style={{ ...card({ background: '#214995', color: '#fff', position: 'relative', overflow: 'hidden' }), visibility: hiddenKPIs?.includes(0) ? 'hidden' : undefined }}>
                  <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 16 16" fill="white" style={{ width: 10, height: 10 }}><path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" /></svg>
                  </div>
                  <p style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Total Today</p>
                  <p style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, marginBottom: 5 }}>847</p>
                  <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(255,255,255,0.18)', color: '#fff', borderRadius: 100, padding: '2px 7px' }}>↑ 12% from yesterday</span>
                </div>
                <div style={{ ...card(), visibility: hiddenKPIs?.includes(1) ? 'hidden' : undefined }}>
                  <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 16 16" fill="#9ca3af" style={{ width: 10, height: 10 }}><path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" /></svg>
                  </div>
                  <p style={{ fontSize: 9, fontWeight: 700, color: '#9ca3af', marginBottom: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Auto-Resolved</p>
                  <p style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, marginBottom: 5 }}>578</p>
                  <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(34,197,94,0.12)', color: '#16a34a', borderRadius: 100, padding: '2px 7px' }}>↑ 4% vs last week</span>
                </div>
                <div style={{ ...card(), visibility: hiddenKPIs?.includes(2) ? 'hidden' : undefined }}>
                  <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 16 16" fill="#9ca3af" style={{ width: 10, height: 10 }}><path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" /></svg>
                  </div>
                  <p style={{ fontSize: 9, fontWeight: 700, color: '#9ca3af', marginBottom: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Avg Response</p>
                  <p style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, marginBottom: 5 }}>1.2s</p>
                  <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(34,197,94,0.12)', color: '#16a34a', borderRadius: 100, padding: '2px 7px' }}>↓ 0.3s faster</span>
                </div>
                <div style={{ ...card(), visibility: hiddenKPIs?.includes(3) ? 'hidden' : undefined }}>
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
                            background: isCurrent ? '#214995' : isHighest ? '#1e3a6e' : i % 2 === 0 ? 'rgba(33,73,149,0.20)' : 'repeating-linear-gradient(45deg, rgba(33,73,149,0.18) 0px, rgba(33,73,149,0.18) 3px, transparent 3px, transparent 7px)',
                            transition: animated ? 'height 0.7s cubic-bezier(0.4,0,0.2,1)' : 'none',
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
                <div style={card()}>
                  <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Live Alert</p>
                  <p style={{ fontSize: 13, fontWeight: 800, lineHeight: 1.3, marginBottom: 4 }}>Card dispute escalated</p>
                  <p style={{ fontSize: 10, color: '#6b7280', marginBottom: 10 }}>James K. · 2 min ago · Zendesk</p>
                  <button style={{ width: '100%', background: '#214995', color: '#fff', border: 'none', borderRadius: 10, padding: '7px 0', fontSize: 10, fontWeight: 700, cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    Review Now
                  </button>
                </div>
              </div>

              {/* Row 3: Tickets + Gauge + SLA */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 0.75fr 0.75fr', gap: 10 }}>
                <div style={{ ...card({ padding: '12px 14px' }), visibility: hideTeamQueue ? 'hidden' : undefined }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <p style={{ fontSize: 11, fontWeight: 700 }}>Team Queue</p>
                    <button style={{ fontSize: 9, fontWeight: 700, border: '1px solid #e5e7eb', borderRadius: 100, padding: '2px 8px', background: '#fff', cursor: 'default', color: '#374151' }}>+ Assign</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {visibleTickets.map((t, i) => (
                      <div key={`${rowOffset}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 8, animation: 'log-in 0.3s ease both', animationDelay: `${i * 0.06}s` }}>
                        <img loading="lazy" src={t.avatar} alt={t.name} style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '1.5px solid #e5e7eb' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 10, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{t.name}</p>
                          <p style={{ fontSize: 9, color: '#6b7280', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.task}</p>
                        </div>
                        <StatusBadge status={t.status} sc={t.sc} />
                      </div>
                    ))}
                  </div>
                </div>
                <div style={card({ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 10px' })}>
                  <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 6, alignSelf: 'flex-start' }}>Resolution</p>
                  <svg viewBox="0 0 100 60" style={{ width: '100%', maxWidth: 100, overflow: 'visible' }}>
                    <path d="M 10 58 A 40 40 0 0 1 90 58" fill="none" stroke="#f0f0f0" strokeWidth="10" strokeLinecap="round" />
                    <path d="M 10 58 A 40 40 0 0 1 90 58" fill="none" stroke="#214995" strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={`${filled} ${circ}`}
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
                <div style={{ ...card({ background: '#1a2744', padding: '12px 12px' }), display: 'flex', flexDirection: 'column', visibility: hideSLA ? 'hidden' : undefined }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 4 }}>SLA Tracker</p>
                  <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>Next breach in</p>
                  <p style={{ fontSize: 28, fontWeight: 800, color: sla < 20 ? '#ef4444' : '#4ade80', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 8 }}>
                    00:{String(sla).padStart(2, '0')}
                  </p>
                  <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>Card dispute · James K.</p>
                  <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 16 16" fill="white" style={{ width: 12, height: 12 }}><path d="M6.28 4.22a.75.75 0 0 0-1.06 1.06L7.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L9 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L10.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L9 6.94 6.28 4.22Z" /></svg>
                    </div>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#214995', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 16 16" fill="white" style={{ width: 12, height: 12 }}><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
