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

const chartBars = [
  { label: 'Mon', value: 55 },
  { label: 'Tue', value: 72 },
  { label: 'Wed', value: 88 },
  { label: 'Thu', value: 65 },
  { label: 'Fri', value: 94 },
  { label: 'Sat', value: 48 },
  { label: 'Sun', value: 79 },
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
          </div>

          {/* Sprint velocity chip */}
          <div className="benefits-chip benefits-chip--green">
            <span className="benefits-chip-dot" style={{ background: '#10b981' }} />
            Sprint velocity +18%
          </div>

          {/* Glass chart card */}
          <div className="benefits-chart-card">
            <div className="benefits-chart-header">
              <span className="benefits-chart-title">Agent Activity</span>
              <span className="benefits-chart-badge">Live</span>
            </div>
            <div className="benefits-chart-bars">
              {chartBars.map((b) => (
                <div key={b.label} className="benefits-chart-col">
                  <div className="benefits-chart-bar-wrap">
                    <div
                      className="benefits-chart-bar"
                      style={{ height: `${b.value}%` }}
                    />
                  </div>
                  <span className="benefits-chart-label">{b.label}</span>
                </div>
              ))}
            </div>
            <div className="benefits-chart-footer">
              <span className="benefits-chart-stat">↑ 23% vs last week</span>
            </div>
          </div>
        </div>

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
              Get started free
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
        /* Sprint chip */
        .benefits-chip {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 7px;
          background: #fff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          padding: 7px 14px;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-primary);
          box-shadow: var(--shadow-md);
          white-space: nowrap;
        }
        .benefits-chip-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .benefits-chip--green {
          top: 20px;
          right: -10px;
          animation: fadeInUp 0.6s ease 0.4s both;
        }

        /* Glass chart card */
        .benefits-chart-card {
          position: absolute;
          bottom: 24px;
          left: 16px;
          right: 16px;
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 18px;
          padding: 16px 18px 14px;
          animation: fadeInUp 0.6s ease 0.5s both;
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
          background: #FC7C00;
          color: #0f172a;
          border-radius: 999px;
          padding: 2px 8px;
        }
        .benefits-chart-bars {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          height: 72px;
        }
        .benefits-chart-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          height: 100%;
        }
        .benefits-chart-bar-wrap {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: flex-end;
        }
        .benefits-chart-bar {
          width: 100%;
          background: rgba(214,253,112,0.85);
          border-radius: 4px 4px 2px 2px;
          min-height: 4px;
          transition: height 0.4s ease;
        }
        .benefits-chart-label {
          font-size: 9px;
          color: rgba(255,255,255,0.55);
          font-weight: 500;
        }
        .benefits-chart-footer {
          margin-top: 10px;
        }
        .benefits-chart-stat {
          font-size: 11px;
          font-weight: 600;
          color: #FC7C00;
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
          .benefits-img-wrap { min-height: 340px; }
          .benefits-chip--green { right: 0; }
        }
        @media (max-width: 480px) {
          .benefits-chip { display: none; }
          .benefits-img-wrap { min-height: 260px; border-radius: 16px; }
          .benefits-title { font-size: 28px; }
          .benefits-cta-btn { width: 100%; justify-content: center; }
          .benefits-content { gap: 24px; }
          .benefits-chart-card { left: 12px; right: 12px; bottom: 16px; }
        }
      `}</style>
    </section>
  );
}
