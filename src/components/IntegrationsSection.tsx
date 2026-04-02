import { useEffect, useRef } from 'react';

const integrationIcons = [
  { name: 'Email', icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#4B5563" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg> },
  { name: 'Telegram', icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#26A5E4"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
  { name: 'Jira', icon: <svg viewBox="0 0 24 24" width="28" height="28"><path d="M11.571 11.429L6.857 6.715 0 13.571l6.857 6.858L11.57 15.72l-3.714-3.714 3.714-3.577z" fill="#2684FF"/><path d="M11.571 11.429L16.286 6.715 23.143 13.571l-6.857 6.858L11.57 15.72l3.714-3.714-3.714-3.577z" fill="#2684FF" opacity=".5"/></svg> },
  { name: 'Slack', icon: <svg viewBox="0 0 24 24" width="28" height="28"><path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.527 2.527 0 012.521 2.522v2.52H8.834zM8.834 6.313a2.527 2.527 0 012.521 2.521 2.527 2.527 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.527 2.527 0 01-2.522 2.521h-2.522V8.834zM17.688 8.834a2.527 2.527 0 01-2.523 2.521 2.526 2.526 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z" fill="#611f69"/></svg> },
  { name: 'Trello', icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#0052CC"><path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.656 1.343 3 3 3h18c1.656 0 3-1.344 3-3V3c0-1.657-1.344-3-3-3zM10.44 18.18c0 .795-.645 1.44-1.44 1.44H4.56c-.795 0-1.44-.645-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44H9c.795 0 1.44.645 1.44 1.44v13.62zm10.44-6c0 .795-.645 1.44-1.44 1.44H15c-.795 0-1.44-.645-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44h4.44c.795 0 1.44.645 1.44 1.44v7.62z"/></svg> },
];

export default function IntegrationsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ints-wrap" id="platform" ref={ref}>
      <div className="container">
        <div className="ints-header reveal">
          <span className="section-tag">&#9632;&nbsp; PLATFORM</span>
          <h2 className="ints-section-title">Built to scale with your business</h2>
        </div>
        <div className="ints-grid">

          {/* Left panel */}
          <div className="ints-panel reveal">
            <h3 className="ints-panel__title">Full visibility into every agent — in real time</h3>

            {/* Mock UI — agent status cards */}
            <div className="ints-mock">
              <div className="ints-mock__row">
                {[
                  { label: 'Lead Qualifier',    status: 'Running', dot: '#10b981' },
                  { label: 'Proposal Writer',   status: 'Idle',    dot: '#9cc1e7' },
                  { label: 'Meeting Scheduler', status: 'Error',   dot: '#f87171' },
                ].map(a => (
                  <div className="ints-agent-chip" key={a.label}>
                    <span className="ints-agent-dot" style={{ background: a.dot }} />
                    <span className="ints-agent-name">{a.label}</span>
                    <span className="ints-agent-status">{a.status}</span>
                  </div>
                ))}
              </div>
              <div className="ints-mock__bar-wrap">
                <div className="ints-mock__bar-label">Avg. confidence</div>
                <div className="ints-mock__bar">
                  <div className="ints-mock__bar-fill" />
                </div>
                <div className="ints-mock__bar-pct">94%</div>
              </div>
              <div className="ints-mock__toggle-row">
                <div className="ints-mock__toggle">
                  <span className="ints-mock__toggle-knob" />
                </div>
                <span className="ints-mock__toggle-label">Automated reports — daily at 9:00 AM</span>
              </div>
            </div>

            <p className="ints-panel__desc">
              Set confidence thresholds, escalation rules, and report schedules per agent. supVision alerts your team the moment something needs attention — before it becomes a problem.
            </p>
          </div>

          {/* Right panel */}
          <div className="ints-panel reveal reveal-d2">
            <h3 className="ints-panel__title">Connects to the tools your team uses every day</h3>

            <div className="ints-icons-grid">
              {integrationIcons.map(i => (
                <div className="ints-icon-cell" key={i.name} title={i.name}>
                  {i.icon}
                </div>
              ))}
            </div>

            <p className="ints-panel__desc">
              Slack, Telegram, Jira, email — supVision pushes alerts and reports where your team already communicates. No extra tabs, no context switching.
            </p>
          </div>

        </div>
      </div>

      <style>{`
        .ints-wrap {
          background: #fff;
          border-top: 1px solid var(--c-border);
          border-bottom: 1px solid var(--c-border);
          padding: 56px 0;
        }

        .ints-header {
          text-align: center;
          margin-bottom: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .ints-section-title {
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.14;
          color: var(--c-text);
        }

        .ints-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        /* Panel */
        .ints-panel {
          background: #f3f3f3;
          border-radius: 20px;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .ints-panel__title {
          font-size: 20px;
          font-weight: 700;
          color: var(--c-text);
          letter-spacing: -0.02em;
          line-height: 1.3;
          max-width: 340px;
        }

        .ints-panel__desc {
          font-size: 14px;
          color: var(--c-text-3);
          line-height: 1.65;
          margin-top: auto;
        }
        .ints-panel__desc strong { color: var(--c-text-2); }

        /* Mock UI */
        .ints-mock {
          background: #fff;
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border: 1px solid var(--c-border);
        }

        .ints-mock__row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ints-agent-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--c-bg);
          border: 1px solid var(--c-border);
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 13px;
        }
        .ints-agent-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .ints-agent-name {
          font-weight: 600;
          color: var(--c-text);
          flex: 1;
        }
        .ints-agent-status {
          font-size: 12px;
          color: var(--c-text-3);
        }

        .ints-mock__bar-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ints-mock__bar-label {
          font-size: 12px;
          color: var(--c-text-3);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .ints-mock__bar {
          flex: 1;
          height: 6px;
          background: var(--c-border);
          border-radius: 3px;
          overflow: hidden;
        }
        .ints-mock__bar-fill {
          width: 94%;
          height: 100%;
          background: #FC7C00;
          border-radius: 3px;
        }
        .ints-mock__bar-pct {
          font-size: 12px;
          font-weight: 700;
          color: var(--c-text);
          flex-shrink: 0;
        }

        .ints-mock__toggle-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ints-mock__toggle {
          width: 38px; height: 22px;
          background: #FC7C00;
          border-radius: 999px;
          position: relative;
          flex-shrink: 0;
        }
        .ints-mock__toggle-knob {
          position: absolute;
          right: 3px; top: 3px;
          width: 16px; height: 16px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          display: block;
        }
        .ints-mock__toggle-label {
          font-size: 13px;
          color: var(--c-text-2);
          font-weight: 500;
        }

        /* Icons grid */
        .ints-icons-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          flex: 1;
          align-content: start;
        }

        .ints-icon-cell {
          background: #fff;
          border: 1px solid var(--c-border);
          border-radius: 14px;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, border-color 0.15s, transform 0.15s;
          cursor: default;
        }
        .ints-icon-cell:hover {
          background: var(--c-sky-light);
          border-color: #FC7C00;
          transform: translateY(-2px);
        }

        @media (max-width: 860px) {
          .ints-grid { grid-template-columns: 1fr; }
          .ints-icons-grid { grid-template-columns: repeat(5, 1fr); }
        }
        @media (max-width: 480px) {
          .ints-wrap { padding: 40px 0; }
          .ints-panel { padding: 24px 20px; gap: 20px; }
          .ints-panel__title { font-size: 17px; }
          .ints-icons-grid { grid-template-columns: repeat(5, 1fr); gap: 8px; }
        }
      `}</style>
    </div>
  );
}
