import { useEffect, useRef, useState, useCallback } from 'react';

const BASE = [
  {
    quote: "We deployed a compliance monitoring agent in 8 minutes just by typing what we needed in chat. It now runs daily checks autonomously — and every decision it makes is fully traceable.",
    name: 'Sarah Chen',
    company: 'Meridian Capital',
    img: '/frame1.png',
  },
  {
    quote: "Data isolation was non-negotiable for us. supVision gave us a dedicated environment and full audit logs out of the box. Our security team approved it in one review.",
    name: 'Marcus Johansson',
    company: 'NordFinance',
    img: '/frame2.png',
  },
  {
    quote: "We connected our agent to our CRM and data feeds through the plugin library in under an hour. It now handles client report generation that used to take our team half a day.",
    name: 'Priya Sharma',
    company: 'Apex Wealth',
    img: '/pole.png',
  },
  {
    quote: "The transparency is what sold us. You can see exactly what the agent was thinking at every step. For financial workflows, that level of auditability is essential.",
    name: 'James Okafor',
    company: 'ClearLedger',
    img: '/frame1.png',
  },
];

const N = BASE.length;
// 4 copies: start in copy #1 (index N), loop forward, reset silently when reaching copy #3 (index 3*N)
const ITEMS = [...BASE, ...BASE, ...BASE, ...BASE];
const START = N; // begin at second copy so we can go back

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(START);
  const [animated, setAnimated] = useState(true);
  const isMoving = useRef(false);

  // After reaching copy #3, silently jump back to copy #1 (same visual)
  useEffect(() => {
    if (idx >= N * 3) {
      // wait for current transition to finish, then reset without animation
      const t = setTimeout(() => {
        setAnimated(false);
        setIdx(idx - N * 2); // same card, 2 copies back
      }, 660);
      return () => clearTimeout(t);
    }
    if (idx <= 0) {
      const t = setTimeout(() => {
        setAnimated(false);
        setIdx(idx + N * 2);
      }, 660);
      return () => clearTimeout(t);
    }
  }, [idx]);

  // Re-enable animation one frame after silent reset
  useEffect(() => {
    if (!animated) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimated(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [animated]);

  const go = useCallback((dir: 1 | -1) => {
    if (isMoving.current) return;
    isMoving.current = true;
    setIdx(i => i + dir);
    setTimeout(() => { isMoving.current = false; }, 660);
  }, []);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => go(1), 4000);
    return () => clearInterval(id);
  }, [go]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="blog" className="section testi-section" ref={sectionRef}>
      <div className="container">
        <div className="testi-header reveal">
          <div className="testi-header__left">
            <span className="section-tag">&#9632;&nbsp; TESTIMONIALS</span>
            <h2 className="testi-title">What teams are saying?</h2>
            <p className="testi-sub">Here's what they shared about their experience working with supVision.</p>
          </div>
          <div className="testi-nav">
            <button className="testi-btn" onClick={() => go(-1)} aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="testi-btn" onClick={() => go(1)} aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="testi-viewport reveal">
        <div
          ref={trackRef}
          className="testi-track"
          style={{
            transform: `translateX(calc(-${idx} * (var(--card-w) + var(--card-gap))))`,
            transition: animated ? 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          {ITEMS.map((t, i) => (
            <div className="tcard" key={i}>
              <div className="tcard__photo">
                <img src={t.img} alt={t.name} />
                <div className="tcard__overlay" />
                <div className="tcard__company">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                  {t.company}
                </div>
                <div className="tcard__bottom">
                  <div className="tcard__qq">&#8220;&#8220;</div>
                  <p className="tcard__quote">{t.quote}</p>
                  <p className="tcard__author">– {t.name}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testi-section { background: var(--c-bg); overflow: hidden; }

        .testi-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 40px;
          gap: 24px;
        }
        .testi-header__left { display: flex; flex-direction: column; gap: 10px; }
        .testi-title {
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--c-text);
          line-height: 1.1;
        }
        .testi-sub { font-size: 15px; color: var(--c-text-3); max-width: 360px; line-height: 1.6; }
        .testi-nav { display: flex; gap: 10px; flex-shrink: 0; }
        .testi-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1.5px solid var(--c-border);
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: var(--c-text);
          transition: background 0.15s, border-color 0.15s;
        }
        .testi-btn:hover { background: var(--c-warm); border-color: var(--c-text-3); }

        .testi-viewport {
          --card-w: 420px;
          --card-gap: 16px;
          padding-left: calc(50% - var(--card-w) * 1.5 - var(--card-gap));
          overflow: hidden;
        }

        .testi-track {
          display: flex;
          gap: var(--card-gap);
          will-change: transform;
        }

        .tcard {
          flex: 0 0 var(--card-w);
          border-radius: 20px;
          overflow: hidden;
        }
        .tcard__photo {
          position: relative;
          height: 480px;
          border-radius: 20px;
          overflow: hidden;
        }
        .tcard__photo img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }
        .tcard__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.62) 100%);
        }
        .tcard__company {
          position: absolute; top: 18px; left: 18px;
          display: flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 999px;
          padding: 5px 13px;
          font-size: 13px; font-weight: 600; color: #fff;
        }
        .tcard__bottom {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 24px 28px 28px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .tcard__qq {
          font-size: 26px; line-height: 1;
          color: rgba(255,255,255,0.7);
          font-family: Georgia, serif;
        }
        .tcard__quote { font-size: 15px; color: #fff; line-height: 1.65; font-weight: 500; }
        .tcard__author { font-size: 13px; color: rgba(255,255,255,0.65); }

        @media (max-width: 900px) {
          .testi-viewport { --card-w: 320px; padding-left: 24px; }
          .tcard__photo { height: 380px; }
          .testi-title { font-size: 32px; }
        }
        @media (max-width: 560px) {
          .testi-viewport { --card-w: calc(100vw - 56px); padding-left: 16px; }
          .tcard__photo { height: 400px; }
          .testi-header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .testi-title { font-size: 28px; }
          .testi-sub { font-size: 14px; }
        }
        @media (max-width: 400px) {
          .testi-viewport { --card-w: calc(100vw - 40px); padding-left: 12px; }
          .tcard__photo { height: 360px; }
          .tcard__quote { font-size: 14px; }
        }
      `}</style>
    </section>
  );
}
