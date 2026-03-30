import { useEffect, useRef } from 'react';
import DashboardMockup from './DashboardMockup';

function smoothScroll(targetY: number, duration = 1000) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start: number | null = null;
  const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const step = (ts: number) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    window.scrollTo(0, startY + diff * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) smoothScroll((el as HTMLElement).offsetTop - 80);
}

interface HeroProps { onContactOpen: () => void; }

export default function Hero({ onContactOpen }: HeroProps) {
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const max = window.innerHeight * 0.65;
      const tilt = Math.max(0, 22 * (1 - y / max));
      if (mockupRef.current) {
        mockupRef.current.style.transform = `perspective(1400px) rotateX(${tilt}deg)`;
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <section id="home" className="hero">

      {/* Gradient bg */}
      <div className="hero__bg" />

      {/* Clouds left */}
      <div className="hero__cloud hero__cloud--left" aria-hidden="true">
        <img src="/sky.png" alt="" />
      </div>

      {/* Clouds right */}
      <div className="hero__cloud hero__cloud--right" aria-hidden="true">
        <img src="/sky.png" alt="" />
      </div>

      {/* Text content */}
      <div className="hero__content">
        <h1 className="hero__heading">
          Your AI workforce,<br />
          built in minutes.
        </h1>
        <p className="hero__sub">
          Create autonomous AI agents through a simple chat — just describe the worker you need.
          Built for financial teams that demand security, transparency, and control.
        </p>
        <div className="hero__btns">
          <button className="btn btn-dark hero__btn-primary" onClick={onContactOpen}>
            Try supVision free
          </button>
          <button className="btn btn-light" onClick={() => scrollTo('#features')}>
            See features
          </button>
        </div>
      </div>

      {/* Mockup — tilt controlled by scroll */}
      <div className="hero__mockup-wrap" ref={mockupRef}>
        <div className="container">
          <DashboardMockup />
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          padding-top: var(--nav-h);
          background: transparent;
        }

        /* sky gradient — blue top, warm yellow bottom */
        .hero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(
            180deg,
            #6db4e8 0%,
            #8ecbf0 15%,
            #b8dff5 32%,
            #d8eef8 47%,
            #e8f2e0 60%,
            #f2ecb8 76%,
            #f5e080 90%,
            #f2d45a 100%
          );
        }

        /* Clouds — pushed partially off-screen edges, a bit lower */
        .hero__cloud {
          position: absolute;
          top: 8%;
          width: 34%;
          max-width: 480px;
          z-index: 1;
          pointer-events: none;
        }
        .hero__cloud--left  { left: -10%; }
        .hero__cloud--right { right: -10%; transform: scaleX(-1); }

        .hero__cloud img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Content — no background */
        .hero__content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 72px 24px 52px;
          width: 100%;
          max-width: var(--container);
          margin: 0 auto;
          background: transparent;
          animation: fadeInUp 0.7s ease both;
        }

        .hero__heading {
          font-size: clamp(48px, 7vw, 78px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.06;
          color: var(--c-text);
          margin-bottom: 24px;
          max-width: 700px;
        }

        .hero__sub {
          font-size: clamp(16px, 1.8vw, 19px);
          font-weight: 400;
          color: var(--c-text-2);
          line-height: 1.65;
          max-width: 500px;
          margin-bottom: 36px;
        }

        .hero__btns {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero__btn-primary { padding: 15px 28px; font-size: 16px; }

        /* Mockup wrapper — tilt via JS, GPU-accelerated */
        .hero__mockup-wrap {
          position: relative;
          z-index: 2;
          width: 100%;
          transform-origin: center bottom;
          will-change: transform;
          /* fade bottom edge */
          mask-image: linear-gradient(to bottom, black 48%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 48%, transparent 100%);
          animation: fadeInUp 0.9s ease 0.15s both;
        }

        @media (max-width: 768px) {
          .hero__cloud { width: 26%; top: 12%; }
          .hero__cloud--left  { left: -6%; }
          .hero__cloud--right { right: -6%; }
          .hero__content { padding: 48px 20px 36px; }
        }
        @media (max-width: 480px) {
          .hero__cloud { display: none; }
          .hero__content { padding: 40px 16px 28px; }
          .hero__heading { font-size: 38px; }
          .hero__sub { font-size: 15px; }
          .hero__btns { flex-direction: column; width: 100%; }
          .hero__btns .btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
