import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  return (
    <section id="benefits" className="section benefits-section" ref={sectionRef}>
      <div className="container">
        <div className="benefits-header reveal">
          <span className="section-tag">&#9632;&nbsp; BENEFITS</span>
        </div>
      </div>
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
                <div className="benefits-chart-kpi-row">
                  <span className="benefits-chart-kpi">3,842</span>
                  <span className="benefits-chart-kpi-label">weekly sessions handled</span>
                </div>
                <svg viewBox="0 0 280 72" className="benefits-bar-svg" preserveAspectRatio="none">
                  {[
                    { x: 8, h: 34 },
                    { x: 48, h: 42 },
                    { x: 88, h: 49 },
                    { x: 128, h: 44 },
                    { x: 168, h: 58 },
                    { x: 208, h: 27 },
                    { x: 248, h: 39 },
                  ].map((b, i) => (
                    <g key={i}>
                      <rect x={b.x} y={72 - b.h} width="22" height={b.h} rx="4"
                        fill="rgba(255,255,255,0.25)"/>
                      <rect x={b.x} y={72 - b.h} width="22" height="6" rx="3"
                        fill="rgba(255,255,255,0.78)"/>
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

                {/* Disputes resolved */}
                <div className="benefits-mini-card">
                  <div className="benefits-mini-top">
                    <span className="benefits-mini-label">Disputes resolved</span>
                    <span className="benefits-mini-val">1,284</span>
                  </div>
                  <div className="benefits-mini-stats">
                    <div className="benefits-mini-stat">
                      <span className="benefits-mini-stat-label">SLA met</span>
                      <span className="benefits-mini-stat-value">96%</span>
                    </div>
                    <div className="benefits-mini-stat">
                      <span className="benefits-mini-stat-label">Open</span>
                      <span className="benefits-mini-stat-value">38</span>
                    </div>
                  </div>
                  <span className="benefits-mini-change benefits-mini-change--up">↑ 41% this month</span>
                </div>

                {/* Avg. response time */}
                <div className="benefits-mini-card">
                  <div className="benefits-mini-top">
                    <span className="benefits-mini-label">Avg. response time</span>
                    <span className="benefits-mini-val">1.2s</span>
                  </div>
                  <div className="benefits-mini-stats">
                    <div className="benefits-mini-stat">
                      <span className="benefits-mini-stat-label">P50</span>
                      <span className="benefits-mini-stat-value">0.9s</span>
                    </div>
                    <div className="benefits-mini-stat">
                      <span className="benefits-mini-stat-label">P95</span>
                      <span className="benefits-mini-stat-value">2.8s</span>
                    </div>
                  </div>
                  <span className="benefits-mini-change benefits-mini-change--up">↓ 68% vs manual</span>
                </div>

                {/* KYC automation */}
                <div className="benefits-mini-card">
                  <div className="benefits-mini-top">
                    <span className="benefits-mini-label">KYC automation</span>
                    <span className="benefits-mini-val">94%</span>
                  </div>
                  <div className="benefits-mini-progress">
                    <div className="benefits-mini-progress-fill" style={{ width: '94%' }} />
                  </div>
                  <div className="benefits-mini-footnote">4.1k of 4.4k queries automated</div>
                  <span className="benefits-mini-change benefits-mini-change--up">↑ queries automated</span>
                </div>

                {/* Escalation rate */}
                <div className="benefits-mini-card">
                  <div className="benefits-mini-top">
                    <span className="benefits-mini-label">Escalation rate</span>
                    <span className="benefits-mini-val">8.6%</span>
                  </div>
                  <svg viewBox="0 0 100 44" fill="none" className="benefits-mini-spark" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sg4" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.22)"/>
                        <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="22" x2="100" y2="22" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                    <path d="M0,8 C12,10 24,12 36,18 C48,24 60,28 72,32 C82,35 91,37 100,39 L100,44 L0,44 Z" fill="url(#sg4)"/>
                    <path d="M0,8 C12,10 24,12 36,18 C48,24 60,28 72,32 C82,35 91,37 100,39" stroke="rgba(255,255,255,0.88)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <circle cx="100" cy="39" r="3" fill="#fff"/>
                    <circle cx="100" cy="39" r="5.5" fill="rgba(255,255,255,0.18)"/>
                  </svg>
                  <span className="benefits-mini-change benefits-mini-change--up">↓ 34% vs baseline</span>
                </div>

              </div>

              {/* Resolution Rate */}
              <div className="benefits-chart-card">
                <div className="benefits-chart-header">
                  <span className="benefits-chart-title">Resolution Rate</span>
                  <span className="benefits-chart-badge">98.4%</span>
                </div>
                <div className="benefits-resolution-grid">
                  <div className="benefits-resolution-row">
                    <span className="benefits-resolution-label">KYC</span>
                    <div className="benefits-resolution-track">
                      <div className="benefits-resolution-fill" style={{ width: '99.1%' }} />
                    </div>
                    <span className="benefits-resolution-value">99.1%</span>
                  </div>
                  <div className="benefits-resolution-row">
                    <span className="benefits-resolution-label">Disputes</span>
                    <div className="benefits-resolution-track">
                      <div className="benefits-resolution-fill" style={{ width: '97.8%' }} />
                    </div>
                    <span className="benefits-resolution-value">97.8%</span>
                  </div>
                  <div className="benefits-resolution-row">
                    <span className="benefits-resolution-label">Transactions</span>
                    <div className="benefits-resolution-track">
                      <div className="benefits-resolution-fill" style={{ width: '98.4%' }} />
                    </div>
                    <span className="benefits-resolution-value">98.4%</span>
                  </div>
                </div>
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
            <h2 className="benefits-title">
              Less guesswork.<br />
              More clarity.<br />
              <span style={{ color: '#72B9E9' }}>Better results.</span>
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
              onClick={() => navigate('/contact')}
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
          background: #fff;
          position: relative;
        }
        .benefits-header {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }
        .benefits-section::after {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 220px;
          background: linear-gradient(to bottom, transparent 0%, #d8eef8 100%);
          pointer-events: none;
          z-index: 0;
        }
        .benefits-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: stretch;
          position: relative;
          z-index: 1;
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
        .benefits-mini-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin: 10px 0 8px;
        }
        .benefits-mini-stat {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          padding: 8px 9px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .benefits-mini-stat-label {
          font-size: 9px;
          color: rgba(255,255,255,0.56);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .benefits-mini-stat-value {
          font-size: 12px;
          color: #fff;
          font-weight: 700;
          line-height: 1.2;
        }
        .benefits-mini-progress {
          width: 100%;
          height: 10px;
          background: rgba(255,255,255,0.12);
          border-radius: 999px;
          overflow: hidden;
          margin: 12px 0 8px;
        }
        .benefits-mini-progress-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.92) 100%);
        }
        .benefits-mini-footnote {
          font-size: 11px;
          color: rgba(255,255,255,0.62);
          line-height: 1.35;
          margin-bottom: 8px;
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
        .benefits-chart-kpi-row {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 10px;
        }
        .benefits-chart-kpi {
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .benefits-chart-kpi-label {
          font-size: 11px;
          color: rgba(255,255,255,0.62);
          font-weight: 500;
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
        .benefits-resolution-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .benefits-resolution-row {
          display: grid;
          grid-template-columns: 72px 1fr 46px;
          gap: 10px;
          align-items: center;
        }
        .benefits-resolution-label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.72);
        }
        .benefits-resolution-track {
          width: 100%;
          height: 8px;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          overflow: hidden;
        }
        .benefits-resolution-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.92) 100%);
        }
        .benefits-resolution-value {
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          text-align: right;
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
          background: #72B9E9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
          box-shadow: 0 2px 8px rgba(114,185,233,0.35);
        }
        .benefits-bullet__text strong {
          font-size: 15px;
          font-weight: 700;
          color: var(--c-text);
          display: block;
          margin-bottom: 4px;
        }
        .benefits-bullet__text p {
          font-size: 14px;
          color: var(--c-text-3);
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
          background: #fff;
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
