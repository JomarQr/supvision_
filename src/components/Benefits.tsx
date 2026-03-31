import { useEffect, useRef } from 'react';

const bullets = [
  {
    title: 'Automated workflows made easy',
    description: "Resolve complex issues like transaction failures and disputes in real time — reducing response times, operational costs, and human error while staying compliant.",
  },
  {
    title: 'Tailored to a regulated industry',
    description: "Intelligent automation that understands financial processes and compliance constraints — delivering a unique blend of innovation and reliability.",
  },
  {
    title: 'Human-like experience at global scale',
    description: "Highly personalized, context-aware support that feels human — while handling millions of interactions across channels and geographies.",
  },
  {
    title: 'Reduce costs, improve quality',
    description: "Track support performance, customer sentiment, and operational efficiency in real time — continuously improving service quality while cutting costs.",
  },
];


export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const offsetTop = (el as HTMLElement).offsetTop - 70;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section id="benefits" className="section benefits-section" ref={sectionRef}>
      <div className="container benefits-container">
        {/* Left visual — photo fills full height */}
        <div className="benefits-visual reveal">
          <div className="benefits-img-wrap">
            <img src="/frame1.png" alt="supVision dashboard" className="benefits-img" />
            <div className="benefits-img-overlay" />

            {/* Overlay flex column — fills image perfectly */}
            <div className="benefits-overlay-col">

              {/* Agent Activity */}
              <div className="benefits-chart-card">
                <div className="benefits-chart-header">
                  <span className="benefits-chart-title">Agent Activity</span>
                  <span className="benefits-chart-badge">Live</span>
                </div>
                <svg viewBox="0 0 280 72" className="benefits-bar-svg" preserveAspectRatio="none">
                  {[
                    { x: 8,  h: 40, v: '55%' },
                    { x: 48, h: 52, v: '72%' },
                    { x: 88, h: 63, v: '88%' },
                    { x: 128,h: 47, v: '65%' },
                    { x: 168,h: 68, v: '94%' },
                    { x: 208,h: 35, v: '48%' },
                    { x: 248,h: 57, v: '79%' },
                  ].map((b, i) => (
                    <g key={i}>
                      <rect x={b.x} y={72 - b.h} width="22" height={b.h} rx="4"
                        fill="rgba(255,255,255,0.25)"/>
                      <rect x={b.x} y={72 - b.h} width="22" height="6" rx="3"
                        fill="rgba(255,255,255,0.7)"/>
                    </g>
                  ))}
                </svg>
                <div className="benefits-bar-labels">
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(l => (
                    <span key={l} className="benefits-chart-label">{l}</span>
                  ))}
                </div>
                <div className="benefits-chart-footer">
                  <span className="benefits-chart-stat">↑ 23% vs last week</span>
                </div>
              </div>

              {/* 4 square stat blocks */}
              <div className="benefits-mini-cards">

                {/* Disputes resolved — upward trend */}
                <div className="benefits-mini-card">
                  <div className="benefits-mini-top">
                    <span className="benefits-mini-label">Disputes resolved</span>
                    <span className="benefits-mini-val">1,284</span>
                  </div>
                  <svg viewBox="0 0 100 44" fill="none" className="benefits-mini-spark" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sg0" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.28)"/>
                        <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="22" x2="100" y2="22" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                    <path d="M0,40 C12,37 22,32 36,26 C50,20 62,15 74,11 C84,8 92,6 100,4 L100,44 L0,44 Z" fill="url(#sg0)"/>
                    <path d="M0,40 C12,37 22,32 36,26 C50,20 62,15 74,11 C84,8 92,6 100,4" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <circle cx="100" cy="4" r="3" fill="#fff"/>
                    <circle cx="100" cy="4" r="5.5" fill="rgba(255,255,255,0.18)"/>
                  </svg>
                  <span className="benefits-mini-change benefits-mini-change--up">↑ 41% this month</span>
                </div>

                {/* Avg. response time — downward trend (good) */}
                <div className="benefits-mini-card">
                  <div className="benefits-mini-top">
                    <span className="benefits-mini-label">Avg. response time</span>
                    <span className="benefits-mini-val">1.2s</span>
                  </div>
                  <svg viewBox="0 0 100 44" fill="none" className="benefits-mini-spark" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sg1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.24)"/>
                        <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="22" x2="100" y2="22" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                    <path d="M0,4 C12,6 22,10 36,15 C50,20 62,24 74,29 C84,33 92,36 100,40 L100,44 L0,44 Z" fill="url(#sg1)"/>
                    <path d="M0,4 C12,6 22,10 36,15 C50,20 62,24 74,29 C84,33 92,36 100,40" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <circle cx="100" cy="40" r="3" fill="#fff"/>
                    <circle cx="100" cy="40" r="5.5" fill="rgba(255,255,255,0.18)"/>
                  </svg>
                  <span className="benefits-mini-change benefits-mini-change--up">↓ 68% vs manual</span>
                </div>

                {/* KYC automation — strong upward */}
                <div className="benefits-mini-card">
                  <div className="benefits-mini-top">
                    <span className="benefits-mini-label">KYC automation</span>
                    <span className="benefits-mini-val">94%</span>
                  </div>
                  <svg viewBox="0 0 100 44" fill="none" className="benefits-mini-spark" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sg2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.28)"/>
                        <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="22" x2="100" y2="22" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                    <path d="M0,42 C10,38 20,33 32,26 C44,19 56,13 68,9 C78,6 88,4 100,3 L100,44 L0,44 Z" fill="url(#sg2)"/>
                    <path d="M0,42 C10,38 20,33 32,26 C44,19 56,13 68,9 C78,6 88,4 100,3" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <circle cx="100" cy="3" r="3" fill="#fff"/>
                    <circle cx="100" cy="3" r="5.5" fill="rgba(255,255,255,0.18)"/>
                  </svg>
                  <span className="benefits-mini-change benefits-mini-change--up">↑ queries automated</span>
                </div>

                {/* Cost reduction — costs falling */}
                <div className="benefits-mini-card">
                  <div className="benefits-mini-top">
                    <span className="benefits-mini-label">Cost reduction</span>
                    <span className="benefits-mini-val">-52%</span>
                  </div>
                  <svg viewBox="0 0 100 44" fill="none" className="benefits-mini-spark" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sg3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.24)"/>
                        <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="22" x2="100" y2="22" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                    <path d="M0,6 C12,9 22,14 34,20 C46,25 58,28 70,33 C80,36 90,38 100,41 L100,44 L0,44 Z" fill="url(#sg3)"/>
                    <path d="M0,6 C12,9 22,14 34,20 C46,25 58,28 70,33 C80,36 90,38 100,41" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <circle cx="100" cy="41" r="3" fill="#fff"/>
                    <circle cx="100" cy="41" r="5.5" fill="rgba(255,255,255,0.18)"/>
                  </svg>
                  <span className="benefits-mini-change benefits-mini-change--up">↓ support costs</span>
                </div>

              </div>

              {/* Resolution Rate */}
              <div className="benefits-chart-card">
                <div className="benefits-chart-header">
                  <span className="benefits-chart-title">Resolution Rate</span>
                  <span className="benefits-chart-badge">98.4%</span>
                </div>
                <svg className="benefits-line-chart" viewBox="0 0 280 52" fill="none" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.22)"/>
                      <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  <line x1="0" y1="17" x2="280" y2="17" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                  <line x1="0" y1="34" x2="280" y2="34" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                  {/* Area fill */}
                  <path d="M0,44 C20,42 40,38 60,34 C80,30 100,32 120,26 C140,20 160,16 180,11 C200,7 220,6 240,5 C255,4 268,4 280,3 L280,52 L0,52 Z"
                    fill="url(#lineGrad)"/>
                  {/* Line */}
                  <path d="M0,44 C20,42 40,38 60,34 C80,30 100,32 120,26 C140,20 160,16 180,11 C200,7 220,6 240,5 C255,4 268,4 280,3"
                    stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  {/* Dot at end */}
                  <circle cx="280" cy="3" r="3.5" fill="#fff"/>
                  <circle cx="280" cy="3" r="6" fill="rgba(255,255,255,0.2)"/>
                </svg>
                <div className="benefits-chart-footer">
                  <span className="benefits-chart-stat">KYC · Disputes · Transactions</span>
                </div>
              </div>

            </div>{/* end overlay-col */}
          </div>{/* end img-wrap */}
        </div>{/* end visual */}

        {/* Right text */}
        <div className="benefits-content">
          <div className="reveal reveal-delay-1">
            <div className="section-label">Benefits</div>
            <h2 className="benefits-title">
              Less guesswork.<br />
              More clarity.<br />
              <span className="gradient-text">Better results.</span>
            </h2>
          </div>

          <ul className="benefits-bullets">
            {bullets.map((b, i) => (
              <li key={b.title} className={`benefits-bullet reveal reveal-delay-${i + 1}`}>
                <div className="benefits-bullet__check">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l4 4 6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="benefits-bullet__text">
                  <strong>{b.title}</strong>
                  <p>{b.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={`reveal reveal-delay-4`}>
            <button
              className="benefits-cta-btn"
              onClick={() => handleScroll('#contact')}
            >
              Get started
              <span className="benefits-cta-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .benefits-section {
          background: var(--color-surface-2);
        }
        .benefits-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: stretch;
        }
        /* Visual — stretches to match right column */
        .benefits-visual {
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .benefits-img-wrap {
          flex: 1;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          min-height: 480px;
        }
        .benefits-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .benefits-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(20,20,30,0.18) 0%, rgba(0,0,0,0.45) 100%);
        }

        /* Overlay flex column */
        .benefits-overlay-col {
          position: absolute;
          inset: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* Glass chart cards */
        .benefits-chart-card {
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 18px;
          padding: 12px 14px 10px;
          flex-shrink: 0;
        }

        /* 4 square stat blocks */
        .benefits-mini-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 10px;
          flex: 1;
          min-height: 0;
        }
        .benefits-mini-card {
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 14px;
          padding: 10px 12px 8px;
          display: flex;
          flex-direction: column;
          gap: 0;
          min-height: 0;
          overflow: hidden;
        }
        .benefits-mini-top {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex-shrink: 0;
        }
        .benefits-mini-label {
          font-size: 10px;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
          line-height: 1.3;
        }
        .benefits-mini-val {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }
        .benefits-mini-spark {
          flex: 1;
          width: 100%;
          min-height: 0;
          display: block;
          margin: 6px 0 4px;
        }
        .benefits-mini-change {
          font-size: 10px;
          font-weight: 600;
          color: rgba(255,255,255,0.65);
          flex-shrink: 0;
        }
        .benefits-mini-change--up {
          color: rgba(200,255,200,0.8);
        }

        /* Line chart SVG */
        .benefits-line-chart {
          width: 100%;
          height: 48px;
          display: block;
          margin: 8px 0 4px;
        }
        .benefits-chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .benefits-chart-title {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .benefits-chart-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: rgba(255,255,255,0.22);
          color: #fff;
          border-radius: 999px;
          padding: 2px 8px;
        }
        .benefits-bar-svg {
          width: 100%;
          height: 72px;
          display: block;
          margin: 6px 0 2px;
        }
        .benefits-bar-labels {
          display: flex;
          justify-content: space-between;
          padding: 0 2px;
          margin-bottom: 2px;
        }
        .benefits-chart-label {
          font-size: 9px;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
        }
        .benefits-chart-footer {
          margin-top: 10px;
        }
        .benefits-chart-stat {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
        }

        /* Content */
        .benefits-content {
          display: flex;
          flex-direction: column;
          gap: 32px;
          justify-content: center;
        }
        .benefits-title {
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 800;
          letter-spacing: -0.8px;
          line-height: 1.15;
          margin-top: 12px;
        }
        .benefits-bullets {
          display: flex;
          flex-direction: column;
          gap: 20px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .benefits-bullet {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .benefits-bullet__check {
          width: 22px;
          height: 22px;
          background: var(--color-accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
          box-shadow: 0 2px 8px rgba(99,102,241,0.35);
        }
        .benefits-bullet__text strong {
          font-size: 15px;
          font-weight: 700;
          color: var(--color-primary);
          display: block;
          margin-bottom: 4px;
        }
        .benefits-bullet__text p {
          font-size: 14px;
          color: var(--color-text-muted);
          line-height: 1.6;
        }
        /* CTA button */
        .benefits-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 14px 14px 24px;
          background: var(--c-dark);
          color: #fff;
          border: none;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 600;
          font-family: var(--font);
          cursor: pointer;
          transition: opacity 0.18s, transform 0.18s;
        }
        .benefits-cta-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .benefits-cta-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FC7C00;
          color: var(--c-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .benefits-container { grid-template-columns: 1fr; gap: 40px; align-items: start; }
          .benefits-img-wrap { min-height: 400px; }
        }
        @media (max-width: 480px) {
          .benefits-img-wrap { min-height: 320px; border-radius: 16px; }
          .benefits-mini-val { font-size: 18px; }
          .benefits-title { font-size: 28px; }
          .benefits-cta-btn { width: 100%; justify-content: center; }
          .benefits-content { gap: 24px; }
          .benefits-chart-card { left: 12px; right: 12px; bottom: 16px; }
        }
      `}</style>
    </section>
  );
}
