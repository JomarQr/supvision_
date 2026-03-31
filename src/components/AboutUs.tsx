import { useEffect, useRef } from 'react';

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal');
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('revealed'); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="about-section" ref={sectionRef} id="about">
      <div className="container">

        {/* Header */}
        <div className="about-header reveal">
          <span className="section-tag">&#9632;&nbsp; ABOUT US</span>
          <h2 className="about-title">
            Built specifically for<br />
            <span className="about-pill about-pill--blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              financial services
            </span>
          </h2>
          <p className="about-subtitle">
            Built for payment service providers, digital wallets, and banks — we understand the regulatory, security, and customer experience challenges unique to fintech.
          </p>
        </div>

        {/* Bento grid */}
        <div className="about-grid">

          {/* Card 1 — Photo */}
          <div className="about-card about-card--photo reveal reveal-d1">
            <div className="about-card__img-wrap">
              <img src="/frame1.png" alt="supVision team" className="about-card__img" />
              <div className="about-card__img-overlay" />
            </div>
            <div className="about-card__photo-stat">
              <span className="about-stat-num">50+</span>
              <span className="about-stat-label">Enterprise teams trust supVision daily</span>
            </div>
          </div>

          {/* Card 2 — Big stat + quote */}
          <div className="about-card about-card--quote reveal reveal-d2">
            <p className="about-card__eyebrow">Accuracy across monitored agents</p>
            <p className="about-big-stat">98.7%</p>
            <div className="about-avatars">
              {['#b0c4de','#9cc1e7','#7db3df','#6b9fd4'].map((c, i) => (
                <span key={i} className="about-avatar" style={{ background: c, zIndex: 4 - i }} />
              ))}
            </div>
            <blockquote className="about-quote">
              "supVision reduced our dispute resolution time by 60% and cut support workload in half — while keeping us fully compliant."
            </blockquote>
            <p className="about-quote-author">— Head of Operations, Payment Service Provider</p>
          </div>

          {/* Card 3 — two stacked */}
          <div className="about-card-stack">
            <div className="about-card about-card--green reveal reveal-d3">
              <p className="about-card__eyebrow">Data Points</p>
              <p className="about-big-stat">2M+</p>
              <p className="about-card__desc">Agent events analyzed every month to surface what matters.</p>
            </div>
            <div className="about-card about-card--dark reveal reveal-d4">
              <p className="about-card__eyebrow about-card__eyebrow--light">Integrations</p>
              <p className="about-big-stat about-big-stat--light">30+</p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .about-section {
          padding: 120px 0 100px;
        }

        /* Header */
        .about-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .about-title {
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--c-text);
          line-height: 1.18;
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .about-subtitle {
          font-size: 17px;
          color: var(--c-text-3);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.65;
        }
        .about-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 4px 14px 4px 8px;
          border-radius: 999px;
          font-size: inherit;
          font-weight: 700;
          vertical-align: middle;
        }
        .about-pill--blue {
          background: var(--c-sky-light);
          color: #3a7ec8;
        }
        .about-pill svg { flex-shrink: 0; }

        /* Grid */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
          align-items: stretch;
        }

        /* Base card */
        .about-card {
          border-radius: 20px;
          overflow: hidden;
          padding: 28px;
        }

        /* Photo card */
        .about-card--photo {
          padding: 0;
          display: flex;
          flex-direction: column;
          background: #e8e8e6;
          position: relative;
          min-height: 420px;
        }
        .about-card__img-wrap {
          flex: 1;
          position: relative;
          overflow: hidden;
        }
        .about-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .about-card__img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.35) 100%);
        }
        .about-card__photo-stat {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          padding: 20px 24px;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.32);
          border-radius: 14px;
        }
        .about-stat-num { color: #0f172a; }
        .about-stat-label { color: rgba(15,23,42,0.7); }
        .about-stat-num {
          display: block;
          font-size: 40px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--c-text);
          line-height: 1.1;
          margin-bottom: 6px;
        }
        .about-stat-label {
          font-size: 13px;
          color: var(--c-text-3);
          line-height: 1.5;
        }

        /* Quote card */
        .about-card--quote {
          background: #f3f3f3;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .about-card__eyebrow {
          font-size: 13px;
          color: var(--c-text-3);
          margin-bottom: 8px;
        }
        .about-big-stat {
          font-size: clamp(44px, 5vw, 60px);
          font-weight: 700;
          letter-spacing: -0.04em;
          color: var(--c-text);
          line-height: 1;
          margin-bottom: 20px;
        }
        .about-avatars {
          display: flex;
          margin-bottom: 16px;
        }
        .about-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #f3f3f3;
          margin-left: -8px;
          display: block;
        }
        .about-avatars .about-avatar:first-child { margin-left: 0; }
        .about-quote {
          font-size: 15px;
          color: var(--c-text-2);
          line-height: 1.65;
          font-style: normal;
          margin-bottom: 8px;
          flex: 1;
        }
        .about-quote-author {
          font-size: 12px;
          color: var(--c-text-3);
        }

        /* Stacked cards column */
        .about-card-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Green card */
        .about-card--green {
          background: #FC7C00;
          flex: 1;
        }
        .about-card--green .about-big-stat { color: #1a1615; }
        .about-card__desc {
          font-size: 13px;
          color: rgba(26,22,21,0.65);
          line-height: 1.55;
          margin-top: 10px;
        }

        /* Dark card */
        .about-card--dark {
          background: #1a1615;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
        }
        .about-card__eyebrow--light { color: rgba(255,255,255,0.5); margin-bottom: 0; }
        .about-big-stat--light {
          font-size: clamp(36px, 3.5vw, 48px);
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #fff;
          line-height: 1;
          margin-bottom: 0;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr 1fr;
          }
          .about-card--photo {
            grid-column: 1 / -1;
            min-height: 320px;
          }
          .about-card__img-wrap { min-height: 320px; }
        }
        @media (max-width: 600px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-card--photo { min-height: 260px; }
          .about-card__img-wrap { min-height: 260px; }
          .about-card-stack { gap: 12px; }
          .about-section { padding: 80px 0 64px; }
          .about-header { margin-bottom: 40px; }
        }
        @media (max-width: 400px) {
          .about-title { font-size: 26px; }
          .about-subtitle { font-size: 14px; }
          .about-big-stat { font-size: 40px; }
          .about-card { padding: 20px; }
          .about-card__photo-stat { padding: 16px 20px; }
          .about-stat-num { font-size: 32px; }
        }
      `}</style>
    </section>
  );
}
