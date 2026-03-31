import React, { useState } from 'react';

type Tab = 'dashboard' | 'tickets' | 'kyc' | 'disputes' | 'reports';

const BLUE = '#1d72e8';
const BLUE_BG = 'rgba(29,114,232,0.12)';

/* ── Nav items ── */
const navItems: { id: Tab; label: string; icon: React.ReactElement }[] = [
  {
    id: 'dashboard', label: 'Dashboard',
    icon: <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/></svg>
  },
  {
    id: 'tickets', label: 'Tickets',
    icon: <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M5 7h6M5 10h4"/></svg>
  },
  {
    id: 'kyc', label: 'KYC',
    icon: <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  },
  {
    id: 'disputes', label: 'Disputes',
    icon: <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="8" cy="8" r="6"/><path d="M8 5v3M8 11v.5"/></svg>
  },
  {
    id: 'reports', label: 'Reports',
    icon: <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="2" width="10" height="12" rx="1.5"/><path d="M6 6h4M6 9h4M6 12h2" strokeLinecap="round"/></svg>
  },
];

/* ── Dashboard view ── */
function DashboardView() {
  const bars = [38, 55, 62, 48, 82, 70, 59];
  const days = ['M','T','W','T','F','S','S'];
  return (
    <>
      <div className="dm-stats">
        {[
          { label: 'Open Tickets',    value: '142', badge: '-18 today',    c: '#0ea158' },
          { label: 'Resolved Today',  value: '87',  badge: '↑12 vs avg',  c: '#0ea158' },
          { label: 'KYC Pending',     value: '34',  badge: '3 urgent',     c: '#f59e0b' },
          { label: 'Avg. Response',   value: '1.2s', badge: '↓68% faster', c: BLUE },
        ].map(s => (
          <div key={s.label} className="dm-stat-card">
            <div className="dm-stat-label">{s.label}</div>
            <div className="dm-stat-value">{s.value}</div>
            <div className="dm-stat-badge" style={{ color: s.c }}>{s.badge}</div>
          </div>
        ))}
      </div>
      <div className="dm-bottom">
        <div className="dm-chart-card">
          <div className="dm-card-title">Tickets Resolved / Day</div>
          <div className="dm-bars">
            {bars.map((h, i) => (
              <div key={i} className="dm-bar-col">
                <div className="dm-bar" style={{ height: `${h}%`, background: i === 4 ? BLUE : '#d0e5f9' }} />
                <span className="dm-bar-lbl">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="dm-activity-card">
          <div className="dm-card-title">Recent Activity</div>
          {[
            { icon: '✓', bg: 'rgba(14,161,88,0.12)', c: '#0ea158', text: 'Dispute #4821 resolved automatically', t: '2m ago' },
            { icon: '↑', bg: BLUE_BG,                 c: BLUE,     text: 'KYC verified for user anna@email.com', t: '8m ago' },
            { icon: '⚡', bg: 'rgba(245,158,11,0.12)', c: '#f59e0b', text: 'Chargeback report auto-generated',    t: '1h ago' },
          ].map((a, i) => (
            <div key={i} className="dm-act-item">
              <div className="dm-act-icon" style={{ background: a.bg, color: a.c }}>{a.icon}</div>
              <div className="dm-act-content">
                <div className="dm-act-text">{a.text}</div>
                <div className="dm-act-time">{a.t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Tickets view ── */
function TicketsView() {
  const tickets = [
    { id: '#5021', customer: 'john.doe@mail.com',  issue: 'Payment failed',        status: 'open',     priority: 'high' },
    { id: '#5020', customer: 'sara.k@finance.io',  issue: 'Card blocked',          status: 'resolved', priority: 'med'  },
    { id: '#5019', customer: 'mike.w@wallet.com',  issue: 'Transaction dispute',   status: 'open',     priority: 'high' },
    { id: '#5018', customer: 'anna.v@bank.eu',     issue: 'KYC document rejected', status: 'pending',  priority: 'low'  },
    { id: '#5017', customer: 'lee.x@payments.io',  issue: 'Refund not received',   status: 'resolved', priority: 'med'  },
  ];
  const sc: Record<string,string> = { open: '#ef4444', resolved: '#0ea158', pending: '#f59e0b' };
  return (
    <div className="dm-list">
      <div className="dm-list-header">
        <span>ID</span><span>Customer</span><span>Issue</span><span>Status</span>
      </div>
      {tickets.map((t, i) => (
        <div key={i} className="dm-list-row">
          <div style={{ fontSize: 10, fontWeight: 700, color: BLUE }}>{t.id}</div>
          <div className="dm-list-task">{t.customer}</div>
          <div style={{ fontSize: 9.5, color: '#374151' }}>{t.issue}</div>
          <div style={{ fontSize: 9, fontWeight: 600, color: sc[t.status] }}>● {t.status}</div>
        </div>
      ))}
    </div>
  );
}

/* ── KYC view ── */
function KycView() {
  const cases = [
    { name: 'Anna Volkova',   doc: 'Passport',      submitted: 'Today',      status: 'verified', score: 98 },
    { name: 'James Okafor',   doc: 'Driver Lic.',   submitted: 'Today',      status: 'pending',  score: 72 },
    { name: 'Maria Santos',   doc: 'National ID',   submitted: 'Yesterday',  status: 'verified', score: 95 },
    { name: 'Chen Wei',       doc: 'Passport',      submitted: 'Yesterday',  status: 'rejected', score: 41 },
    { name: 'Priya Nair',     doc: 'Passport',      submitted: '2 days ago', status: 'verified', score: 99 },
  ];
  const sc: Record<string,string> = { verified: '#0ea158', pending: '#f59e0b', rejected: '#ef4444' };
  return (
    <div className="dm-list">
      <div className="dm-list-header">
        <span>Customer</span><span>Document</span><span>Score</span><span>Status</span>
      </div>
      {cases.map((c, i) => (
        <div key={i} className="dm-list-row">
          <div className="dm-agent-name">
            <div className="dm-avatar" style={{ background: [BLUE,'#0ea158','#f59e0b','#8b5cf6','#ef4444'][i] }}>
              {c.name[0]}
            </div>
            {c.name}
          </div>
          <div className="dm-list-task">{c.doc}</div>
          <div className="dm-perf-bar">
            <div className="dm-perf-fill" style={{ width: `${c.score}%`, background: c.score > 85 ? '#0ea158' : c.score > 60 ? '#f59e0b' : '#ef4444' }} />
            <span>{c.score}%</span>
          </div>
          <div style={{ fontSize: 9, fontWeight: 600, color: sc[c.status] }}>● {c.status}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Disputes view ── */
function DisputesView() {
  const disputes = [
    { id: '#D-312', amount: '€240.00', reason: 'Unauthorized charge',  channel: 'Visa',       status: 'resolved' },
    { id: '#D-311', amount: '€89.50',  reason: 'Item not received',    channel: 'Mastercard', status: 'open'     },
    { id: '#D-310', amount: '€512.00', reason: 'Duplicate transaction', channel: 'Visa',       status: 'open'     },
    { id: '#D-309', amount: '€34.99',  reason: 'Service not rendered', channel: 'SEPA',       status: 'resolved' },
  ];
  const sc: Record<string,string> = { open: '#ef4444', resolved: '#0ea158' };
  return (
    <div className="dm-list">
      <div className="dm-list-header">
        <span>Case</span><span>Reason</span><span>Amount</span><span>Status</span>
      </div>
      {disputes.map((d, i) => (
        <div key={i} className="dm-list-row">
          <div style={{ fontSize: 10, fontWeight: 700, color: BLUE }}>{d.id}</div>
          <div className="dm-list-task">{d.reason}</div>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#0f172a' }}>{d.amount}</div>
          <div style={{ fontSize: 9, fontWeight: 600, color: sc[d.status] }}>● {d.status}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Reports view ── */
function ReportsView() {
  const reports = [
    { name: 'Q1 2026 Support Performance',   date: 'Mar 29', type: 'Quarterly', size: '2.4 MB' },
    { name: 'Weekly Dispute Summary #12',     date: 'Mar 28', type: 'Weekly',    size: '0.8 MB' },
    { name: 'KYC Automation Efficiency',      date: 'Mar 25', type: 'Custom',    size: '1.1 MB' },
    { name: 'Customer Sentiment Analysis',    date: 'Mar 21', type: 'Weekly',    size: '0.9 MB' },
  ];
  return (
    <div className="dm-list">
      <div className="dm-list-header">
        <span>Report</span><span>Type</span><span>Date</span><span>Size</span>
      </div>
      {reports.map((r, i) => (
        <div key={i} className="dm-list-row">
          <div style={{ fontSize: 10, fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke={BLUE} strokeWidth="1.5"><rect x="3" y="2" width="10" height="12" rx="1.5"/><path d="M6 6h4M6 9h4" strokeLinecap="round"/></svg>
            {r.name}
          </div>
          <div style={{ fontSize: 10, color: '#64748b' }}>{r.type}</div>
          <div style={{ fontSize: 10, color: '#94a3b8' }}>{r.date}</div>
          <div style={{ fontSize: 10, color: BLUE, fontWeight: 600, cursor: 'pointer' }}>↓ {r.size}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Main component ── */
export default function DashboardMockup() {
  const [tab, setTab] = useState<Tab>('dashboard');

  const views: Record<Tab, React.ReactElement> = {
    dashboard: <DashboardView />,
    tickets:   <TicketsView />,
    kyc:       <KycView />,
    disputes:  <DisputesView />,
    reports:   <ReportsView />,
  };

  return (
    <div className="dm-root">
      {/* Browser chrome */}
      <div className="dm-chrome">
        <div className="dm-dots">
          <span className="dm-dot dm-dot--r" />
          <span className="dm-dot dm-dot--y" />
          <span className="dm-dot dm-dot--g" />
        </div>
        <div className="dm-urlbar">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1a5 5 0 100 10A5 5 0 006 1zm0 1.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM6 10a3.75 3.75 0 01-3-1.502C3.015 7.33 4.875 6.75 6 6.75s2.985.58 3 1.748A3.75 3.75 0 016 10z" fill="#94a3b8"/></svg>
          <span>app.supvision.ai</span>
        </div>
        <div style={{ width: 60 }} />
      </div>

      {/* App body */}
      <div className="dm-app">
        {/* Sidebar */}
        <div className="dm-sidebar">
          <div className="dm-sidebar-logo">
            <img src="/logo_chrome.png" alt="sv" />
          </div>
          <nav className="dm-sidebar-nav">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`dm-nav-item${tab === item.id ? ' dm-nav-item--active' : ''}`}
                onClick={() => setTab(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="dm-sidebar-avatar">A</div>
        </div>

        {/* Main */}
        <div className="dm-main">
          <div className="dm-main-header">
            <div>
              <div className="dm-greeting">Support Overview 👋</div>
              <div className="dm-greeting-sub">Tuesday, April 1 · 142 open tickets</div>
            </div>
            <div className="dm-header-btns">
              <button className="dm-btn dm-btn--outline">New Ticket</button>
              <button className="dm-btn dm-btn--primary">Run Report</button>
            </div>
          </div>

          <div className="dm-view" key={tab}>
            {views[tab]}
          </div>
        </div>
      </div>

      <style>{`
        /* ── Root ── */
        .dm-root {
          width: 100%;
          border-radius: 14px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(0,0,0,0.07),
            0 40px 80px -12px rgba(0,0,0,0.28),
            0 20px 40px -8px rgba(0,0,0,0.14);
          transform-origin: center bottom;
          background: #fff;
        }

        /* ── Chrome ── */
        .dm-chrome {
          background: #f1f5f9;
          padding: 9px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid #e2e8f0;
        }
        .dm-dots { display: flex; gap: 5px; flex-shrink: 0; }
        .dm-dot { width: 10px; height: 10px; border-radius: 50%; display: block; }
        .dm-dot--r { background: #ef4444; }
        .dm-dot--y { background: #f59e0b; }
        .dm-dot--g { background: #10b981; }
        .dm-urlbar {
          flex: 1;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 10.5px;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 5px;
          max-width: 240px;
          margin: 0 auto;
        }

        /* ── App body ── */
        .dm-app {
          display: flex;
          height: 400px;
          overflow: hidden;
        }

        /* ── Sidebar ── */
        .dm-sidebar {
          width: 160px;
          background: #0f172a;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 14px 10px;
          gap: 4px;
          flex-shrink: 0;
        }
        .dm-sidebar-logo {
          width: 30px;
          height: 30px;
          margin-bottom: 12px;
          margin-left: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dm-sidebar-logo img {
          width: 28px;
          height: 28px;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .dm-sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 1px;
          width: 100%;
          flex: 1;
        }
        .dm-nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 8px;
          border-radius: 6px;
          color: #94a3b8;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
          overflow: hidden;
          background: none;
          border: none;
          font-family: inherit;
          width: 100%;
          text-align: left;
        }
        .dm-nav-item:hover {
          background: rgba(255,255,255,0.07);
          color: #e2e8f0;
        }
        .dm-nav-item--active {
          background: rgba(29,114,232,0.18);
          color: #93c5fd;
        }
        .dm-sidebar-avatar {
          width: 26px; height: 26px;
          background: ${BLUE};
          border-radius: 50%;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          margin-top: auto;
        }

        /* ── Main area ── */
        .dm-main {
          flex: 1;
          background: #f8fafc;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow: hidden;
          min-width: 0;
        }
        .dm-main-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 6px;
        }
        .dm-greeting {
          font-size: 12.5px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.3;
        }
        .dm-greeting-sub {
          font-size: 9.5px;
          color: #94a3b8;
          margin-top: 2px;
        }
        .dm-header-btns { display: flex; gap: 6px; }
        .dm-btn {
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          font-family: inherit;
        }
        .dm-btn--outline {
          background: #fff;
          border: 1px solid #e2e8f0;
          color: #374151;
        }
        .dm-btn--primary { background: ${BLUE}; color: #fff; }

        /* ── View container ── */
        .dm-view {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: fadeInUp 0.2s ease both;
        }

        /* ── Stats row ── */
        .dm-stats {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 7px;
        }
        .dm-stat-card {
          background: #fff;
          border-radius: 8px;
          padding: 10px;
          border: 1px solid #f1f5f9;
        }
        .dm-stat-label {
          font-size: 8.5px;
          color: #94a3b8;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 4px;
        }
        .dm-stat-value {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1;
          margin-bottom: 3px;
        }
        .dm-stat-badge { font-size: 8.5px; font-weight: 600; }

        /* ── Bottom row ── */
        .dm-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          flex: 1;
          min-height: 0;
        }
        .dm-chart-card, .dm-activity-card {
          background: #fff;
          border-radius: 8px;
          padding: 10px;
          border: 1px solid #f1f5f9;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .dm-card-title {
          font-size: 9.5px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }
        .dm-bars {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          flex: 1;
          min-height: 60px;
        }
        .dm-bar-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          height: 100%;
          justify-content: flex-end;
        }
        .dm-bar {
          width: 100%;
          border-radius: 3px 3px 0 0;
          transition: height 0.3s ease;
        }
        .dm-bar-lbl { font-size: 7.5px; color: #94a3b8; }

        /* Activity */
        .dm-act-item { display: flex; align-items: flex-start; gap: 7px; }
        .dm-act-icon {
          width: 20px; height: 20px;
          border-radius: 5px;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 700;
          flex-shrink: 0;
        }
        .dm-act-text { font-size: 9.5px; color: #374151; font-weight: 500; line-height: 1.3; }
        .dm-act-time { font-size: 8px; color: #94a3b8; margin-top: 1px; }

        /* ── List views (Agents / Projects / Time / Reports) ── */
        .dm-list {
          flex: 1;
          background: #fff;
          border-radius: 8px;
          border: 1px solid #f1f5f9;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .dm-list-header {
          display: grid;
          grid-template-columns: 2fr 2fr 1.5fr 1fr;
          padding: 8px 12px;
          background: #f8fafc;
          border-bottom: 1px solid #f1f5f9;
          font-size: 8.5px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          gap: 8px;
        }
        .dm-list-row {
          display: grid;
          grid-template-columns: 2fr 2fr 1.5fr 1fr;
          padding: 8px 12px;
          border-bottom: 1px solid #f8fafc;
          align-items: center;
          gap: 8px;
          transition: background 0.1s;
        }
        .dm-list-row:hover { background: #fafcff; }
        .dm-agent-name {
          display: flex; align-items: center; gap: 7px;
          font-size: 10px; font-weight: 600; color: #0f172a;
        }
        .dm-avatar {
          width: 20px; height: 20px; border-radius: 50%;
          color: #fff; font-size: 8px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .dm-list-task { font-size: 9.5px; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .dm-perf-bar {
          display: flex; align-items: center; gap: 5px;
          font-size: 9px; color: #64748b; font-weight: 600;
        }
        .dm-perf-fill {
          flex: 1; height: 4px; border-radius: 2px;
        }
        .dm-status-dot { font-size: 9px; font-weight: 600; white-space: nowrap; }
        .dm-project-name {
          display: flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 600; color: #0f172a;
        }
        .dm-proj-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .dm-sidebar { width: 44px; }
          .dm-nav-item span { display: none; }
          .dm-stats { grid-template-columns: repeat(2,1fr); }
          .dm-bottom { grid-template-columns: 1fr; }
          .dm-app { height: auto; min-height: 320px; }
        }
      `}</style>
    </div>
  );
}
