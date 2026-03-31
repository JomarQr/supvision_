const pages = ['Home', 'Features', 'Benefits', 'Pricing'];
const hrefs = ['#home', '#features', '#benefits', '#pricing'];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <footer className="ft">
      {/* Sky background */}
      <div className="ft__bg" />

      {/* Clouds left */}
      <div className="ft__cloud ft__cloud--l" aria-hidden="true">
        <img src="/sky.png" alt="" />
      </div>
      {/* Clouds right */}
      <div className="ft__cloud ft__cloud--r" aria-hidden="true">
        <img src="/sky.png" alt="" />
      </div>

      <div className="ft__wrap container">
        {/* Glass card */}
        <div className="ft__card">
          {/* Brand */}
          <div className="ft__brand">
            <a href="#home" className="ft__logo" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>
              <img src="/logo_full.png" alt="supVision.ai" className="ft__logo-img" />
            </a>
            <p className="ft__tagline">
              AI-Driven Customer Support for FinTech
            </p>
            <div className="ft__socials">
              <a href="https://www.linkedin.com/company/supvision-ai/" target="_blank" rel="noopener noreferrer" className="ft__social" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="ft__col">
            <h4 className="ft__col-title">Pages</h4>
            {pages.map((p, i) => (
              <a key={p} href={hrefs[i]} className="ft__link"
                onClick={(e) => { e.preventDefault(); scrollTo(hrefs[i]); }}>
                {p}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="ft__bottom">
          <span>© {new Date().getFullYear()} supVision.ai. All rights reserved.</span>
          <span>© {new Date().getFullYear()} supVision.ai</span>
        </div>
      </div>

      <style>{`
        /* ── Outer section ── */
        .ft {
          position: relative;
          overflow: hidden;
          padding: 80px 0 40px;
        }

        /* Sky gradient matching hero */
        .ft__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(
            180deg,
            #c5e2f5 0%,
            #b8d8f0 30%,
            #a8ccec 70%,
            #9cc1e7 100%
          );
        }

        /* Clouds */
        .ft__cloud {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 32%;
          max-width: 440px;
          z-index: 1;
          pointer-events: none;
          display: flex;
          align-items: center;
        }
        .ft__cloud--l { left: -8%; }
        .ft__cloud--r { right: -8%; transform: scaleX(-1); }
        .ft__cloud img {
          width: 100%;
          height: auto;
          display: block;
          opacity: 0.9;
        }

        /* ── Content wrapper ── */
        .ft__wrap {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* ── Glass card ── */
        .ft__card {
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 24px;
          padding: 40px 48px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 64px;
          align-items: start;
          box-shadow: 0 4px 40px rgba(97, 74, 68, 0.08);
        }

        /* ── Brand ── */
        .ft__logo {
          display: inline-flex;
          text-decoration: none;
          margin-bottom: 14px;
        }
        .ft__logo-img {
          height: 26px;
          width: auto;
          display: block;
        }
        .ft__brand {
          display: flex;
          flex-direction: column;
        }
        .ft__tagline {
          font-size: 14px;
          line-height: 1.7;
          color: var(--c-text-2);
          margin-bottom: 20px;
          max-width: 260px;
        }
        .ft__socials {
          display: flex;
          gap: 8px;
        }
        .ft__social {
          width: 38px;
          height: 38px;
          background: rgba(15, 23, 42, 0.08);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--c-text-2);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .ft__social:hover {
          background: var(--c-dark);
          color: #fff;
        }

        /* ── Link cols ── */
        .ft__col {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 120px;
        }
        .ft__col-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--c-text-3);
          margin-bottom: 4px;
        }
        .ft__link {
          font-size: 15px;
          font-weight: 500;
          color: var(--c-text-2);
          text-decoration: none;
          transition: color 0.15s;
          line-height: 1.4;
        }
        .ft__link:hover { color: var(--c-text); }

        /* ── Bottom bar ── */
        .ft__bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: rgba(26, 22, 21, 0.45);
          padding: 0 4px;
          flex-wrap: wrap;
          gap: 8px;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .ft__card {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 28px 24px;
          }
          .ft__cloud { width: 22%; }
        }
        @media (max-width: 480px) {
          .ft__card { grid-template-columns: 1fr; }
          .ft__cloud { display: none; }
          .ft__bottom { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
