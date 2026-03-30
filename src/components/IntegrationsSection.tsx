import { useEffect, useRef } from 'react';

const integrationIcons = [
  { name: 'Slack',    icon: <svg viewBox="0 0 24 24" width="28" height="28"><path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.527 2.527 0 012.521 2.522v2.52H8.834zM8.834 6.313a2.527 2.527 0 012.521 2.521 2.527 2.527 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.527 2.527 0 01-2.522 2.521h-2.522V8.834zM17.688 8.834a2.527 2.527 0 01-2.523 2.521 2.526 2.526 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z" fill="#611f69"/></svg> },
  { name: 'GitHub',   icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#24292e"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
  { name: 'Jira',     icon: <svg viewBox="0 0 24 24" width="28" height="28"><path d="M11.571 11.429L6.857 6.715 0 13.571l6.857 6.858L11.57 15.72l-3.714-3.714 3.714-3.577z" fill="#2684FF"/><path d="M11.571 11.429L16.286 6.715 23.143 13.571l-6.857 6.858L11.57 15.72l3.714-3.714-3.714-3.577z" fill="#2684FF" opacity=".5"/></svg> },
  { name: 'Notion',   icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#000"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933z"/></svg> },
  { name: 'Figma',    icon: <svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/><path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/><path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/><path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/><path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/></svg> },
  { name: 'Linear',   icon: <svg viewBox="0 0 24 24" width="28" height="28"><path d="M0 14.01L9.99 24l14.01-14.01L14.01 0 0 14.01z" fill="#5E6AD2"/></svg> },
  { name: 'Discord',  icon: <svg viewBox="0 0 24 24" width="28" height="28"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.014.043.033.058a19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" fill="#5865F2"/></svg> },
  { name: 'Trello',   icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#0052CC"><path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.656 1.343 3 3 3h18c1.656 0 3-1.344 3-3V3c0-1.657-1.344-3-3-3zM10.44 18.18c0 .795-.645 1.44-1.44 1.44H4.56c-.795 0-1.44-.645-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44H9c.795 0 1.44.645 1.44 1.44v13.62zm10.44-6c0 .795-.645 1.44-1.44 1.44H15c-.795 0-1.44-.645-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44h4.44c.795 0 1.44.645 1.44 1.44v7.62z"/></svg> },
  { name: 'Asana',    icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#F06A6A"><path d="M12 6.75A2.25 2.25 0 1012 2.25a2.25 2.25 0 000 4.5zm6.75 1.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-13.5 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"/></svg> },
  { name: 'Zapier',   icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#FF4A00"><path d="M14.9 9.1l5.5-5.5c.4.6.7 1.3.9 2L15.7 11c-.2-.7-.5-1.3-.8-1.9zm-1.8-1.8C12.4 6.8 11.8 6.5 11 6.3L16.5.8c.7.2 1.4.5 2 .9L13.1 7.3zm-4.5.4c.5-.3 1.1-.6 1.7-.8L4 1.7c-.7.2-1.4.5-2 .9l5.5 5.5c.2-.2.5-.3.7-.4zm-2.1 2C6.1 10.1 5.8 10.8 5.6 11.5L.1 6c.2-.7.5-1.4.9-2l5.5 5.5c-.1.1-.1.1-.1.2zM5.6 12.5c0 .6.1 1.2.3 1.7L.4 19.7c-.3-.7-.4-1.4-.4-2.1 0-.6.1-1.2.2-1.8l5.4-5.4c-.1.3-.1.7 0 1.1zm.4 3c.3.6.6 1.1 1 1.6L1.5 22.5c-.5-.5-.9-1.1-1.2-1.7l5.7-5.3zm2.4 2.4c.5.4 1 .7 1.6 1L4.5 24c-.6-.3-1.2-.7-1.7-1.2l5.6-4.9zm2.8 1.2c.6.2 1.2.3 1.8.3.3 0 .6 0 .9-.1l-5 5c-.7-.1-1.4-.3-2-.6l4.3-4.6zm3.4.2c.6-.2 1.2-.5 1.7-.9l4.9 4.9c-.5.4-1.1.8-1.7 1.1l-4.9-5.1zm2.8-2c.4-.5.8-1 1-1.6l5.4 5.4c-.3.6-.7 1.2-1.2 1.7l-5.2-5.5zm1.3-3.3c.2-.6.3-1.2.3-1.8v-.6l4.6-4.6c.2.6.4 1.3.4 2 0 .7-.1 1.3-.2 1.9l-5.1 3.1zm.2-4.3c-.2-.6-.5-1.2-.8-1.7l5.3-5.3c.4.5.7 1.1 1 1.7l-5.5 5.3z"/></svg> },
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
    <div className="ints-wrap" ref={ref}>
      <div className="container">
        <div className="ints-grid">

          {/* Left panel */}
          <div className="ints-panel reveal">
            <h3 className="ints-panel__title">Smart, flexible, and built around your autonomous workflow</h3>

            {/* Mock UI — agent status cards */}
            <div className="ints-mock">
              <div className="ints-mock__row">
                {[
                  { label: 'Agent Alpha', status: 'Running', dot: '#10b981' },
                  { label: 'Agent Beta',  status: 'Idle',    dot: '#9cc1e7' },
                  { label: 'Agent Gamma', status: 'Error',   dot: '#f87171' },
                ].map(a => (
                  <div className="ints-agent-chip" key={a.label}>
                    <span className="ints-agent-dot" style={{ background: a.dot }} />
                    <span className="ints-agent-name">{a.label}</span>
                    <span className="ints-agent-status">{a.status}</span>
                  </div>
                ))}
              </div>
              <div className="ints-mock__bar-wrap">
                <div className="ints-mock__bar-label">Confidence score</div>
                <div className="ints-mock__bar">
                  <div className="ints-mock__bar-fill" />
                </div>
                <div className="ints-mock__bar-pct">94%</div>
              </div>
              <div className="ints-mock__toggle-row">
                <div className="ints-mock__toggle">
                  <span className="ints-mock__toggle-knob" />
                </div>
                <span className="ints-mock__toggle-label">Auto-reporting enabled</span>
              </div>
            </div>

            <p className="ints-panel__desc">
              <strong>Personalize every detail.</strong> From agent roles and thresholds to report cadence and alerts — supVision adapts to how your team actually works.
            </p>
          </div>

          {/* Right panel */}
          <div className="ints-panel reveal reveal-d2">
            <h3 className="ints-panel__title">Integrates seamlessly with the tools you already use</h3>

            <div className="ints-icons-grid">
              {integrationIcons.map(i => (
                <div className="ints-icon-cell" key={i.name} title={i.name}>
                  {i.icon}
                </div>
              ))}
            </div>

            <p className="ints-panel__desc">
              <strong>Seamless integrations.</strong> Plug supVision into the tools you love. Set up automations, sync your data, and make your systems work smarter together.
            </p>
          </div>

        </div>
      </div>

      <style>{`
        .ints-wrap {
          background: var(--c-white);
          border-top: 1px solid var(--c-border);
          border-bottom: 1px solid var(--c-border);
          padding: 56px 0;
        }

        .ints-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        /* Panel */
        .ints-panel {
          background: var(--c-warm);
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
          background: #D6FD70;
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
          background: #D6FD70;
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
          border-color: #D6FD70;
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
