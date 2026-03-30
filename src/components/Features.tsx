import { useEffect, useRef, useState, type ReactNode } from 'react';

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
  img: string;
}

const features: Feature[] = [
  {
    title: 'Create Agents in Chat',
    description: 'Just type what worker you need — our system asks the right questions and builds the agent for you. No code, no configuration files. From idea to deployed agent in minutes.',
    img: '/frame1.png',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1615" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
  {
    title: 'Full Transparency',
    description: 'See every step your agent takes — its reasoning, decisions, and conclusions are fully visible. Audit any action at any time. No black boxes, ever.',
    img: '/frame2.png',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1615" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Enterprise Security',
    description: 'All your data is fully isolated — no cross-tenant access, no shared models. Built to meet the strict compliance requirements of the financial industry.',
    img: '/pole.png',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1615" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Plugins & Integrations',
    description: 'Connect your agents to the tools you already use — CRMs, databases, APIs, communication platforms, and more. A growing library of plugins, ready out of the box.',
    img: '/frame2.png',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1615" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="6" height="10" rx="2"/><rect x="9" y="3" width="6" height="18" rx="2"/><rect x="16" y="9" width="6" height="8" rx="2"/>
      </svg>
    ),
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="section features-section" ref={sectionRef}>
      <div className="container">

        {/* Header */}
        <div className="features-header reveal">
          <span className="section-tag">&#9632;&nbsp; SERVICES</span>
          <h2 className="features-title">
            Everything you need to run<br />an autonomous AI workforce
          </h2>
          <p className="features-subtitle">
            From creation to execution — deploy agents that work independently, transparently, and securely.
          </p>
          <button className="features-cta btn btn-dark">
            Get started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </button>
        </div>

        {/* Cards */}
        <div className="features-grid reveal">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`fcard${active === i ? ' fcard--active' : ''}`}
              onMouseEnter={() => setActive(i)}
            >
              {/* Left: icon + text */}
              <div className="fcard__left">
                <div className="fcard__icon">{f.icon}</div>
                <div className="fcard__body">
                  <h3 className="fcard__title">{f.title}</h3>
                  <p className="fcard__desc">{f.description}</p>
                </div>
              </div>

              {/* Right: image — only visible when active */}
              <div className="fcard__img-wrap">
                <img src={f.img} alt={f.title} className="fcard__img" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .features-section { background: var(--c-bg); }

        .features-header {
          text-align: center;
          max-width: 560px;
          margin: 0 auto 56px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .features-title {
          font-size: clamp(28px, 3.8vw, 48px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.14;
          color: var(--c-text);
        }
        .features-subtitle {
          font-size: 16px;
          color: var(--c-text-3);
          line-height: 1.65;
        }
        .features-cta {
          margin-top: 4px;
          font-size: 13px !important;
          padding: 11px 20px !important;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border-radius: 999px !important;
        }

        .features-grid {
          display: flex;
          gap: 12px;
          align-items: stretch;
        }

        /* Card base */
        .fcard {
          flex: 1;
          background: #f3f3f3;
          border-radius: 20px;
          padding: 28px 24px 32px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          cursor: default;
          overflow: hidden;
          min-height: 340px;
          transition: flex 0.45s cubic-bezier(0.4,0,0.2,1), background 0.3s ease, box-shadow 0.3s ease;
          gap: 0;
        }

        /* Active card */
        .fcard--active {
          flex: 2.2;
          background: #fff;
          box-shadow: 0 8px 32px rgba(97,74,68,0.10);
        }

        /* Left column: icon + text */
        .fcard__left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          min-width: 0;
        }

        .fcard__icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #D6FD70;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .fcard__body {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .fcard__title {
          font-size: 20px;
          font-weight: 700;
          color: var(--c-text);
          letter-spacing: -0.02em;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .fcard--active .fcard__title {
          white-space: normal;
        }

        .fcard__desc {
          font-size: 14px;
          color: var(--c-text-3);
          line-height: 1.65;
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transition: opacity 0.3s ease 0.1s, max-height 0.4s ease;
        }
        .fcard--active .fcard__desc {
          opacity: 1;
          max-height: 120px;
        }

        /* Right image */
        .fcard__img-wrap {
          width: 0;
          overflow: hidden;
          border-radius: 12px;
          flex-shrink: 0;
          transition: width 0.45s cubic-bezier(0.4,0,0.2,1), margin 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease 0.1s;
          opacity: 0;
        }
        .fcard--active .fcard__img-wrap {
          width: 180px;
          margin-left: 16px;
          opacity: 1;
        }
        .fcard__img {
          width: 180px;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 12px;
        }

        @media (max-width: 860px) {
          .features-grid { flex-direction: column; }
          .fcard, .fcard--active { flex: unset; min-height: auto; flex-direction: column; gap: 0; }
          .fcard { padding: 24px 20px 28px; }
          .fcard__title { white-space: normal; font-size: 18px; }
          .fcard--active .fcard__desc { max-height: 200px; }
          .features-header { margin-bottom: 40px; }
          /* On mobile show image below text */
          .fcard__img-wrap {
            width: 100% !important;
            height: 0;
            margin-left: 0 !important;
            margin-top: 0;
            transition: height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease 0.1s, margin 0.45s;
          }
          .fcard--active .fcard__img-wrap {
            height: 140px;
            margin-top: 16px;
          }
          .fcard__img {
            width: 100%;
            height: 140px;
          }
        }
        @media (max-width: 480px) {
          .features-title { font-size: 26px; }
          .features-subtitle { font-size: 14px; }
          .features-cta { font-size: 12px !important; padding: 10px 16px !important; width: 100%; justify-content: center; }
          .features-header { gap: 12px; }
        }
      `}</style>
    </section>
  );
}
