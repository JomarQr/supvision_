import { useState, useEffect } from 'react';

const links = [
  { label: 'Features',   href: '#features' },
  { label: 'Benefits',   href: '#benefits' },
  { label: 'Pricing',    href: '#pricing'  },
  { label: 'Blog',       href: '#blog'     },
  { label: 'Contact Us', href: '#contact', isContact: true },
];

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const targetY = (el as HTMLElement).offsetTop - 80;
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start: number | null = null;
  const ease = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
  const step = (ts: number) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / 1000, 1);
    window.scrollTo(0, startY + diff * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

interface NavbarProps {
  onContactOpen: () => void;
  alwaysScrolled?: boolean;
  onLinkClick?: (href: string) => void;
}

export default function Navbar({ onContactOpen, alwaysScrolled, onLinkClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(alwaysScrolled ?? false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alwaysScrolled) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [alwaysScrolled]);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isContact?: boolean) => {
    e.preventDefault();
    setOpen(false);
    if (isContact) { onContactOpen(); return; }
    if (onLinkClick) { onLinkClick(href); return; }
    scrollTo(href);
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner">

          {/* Logo */}
          <a href="#home" className="nav__logo" onClick={(e) => handleLink(e, '#home')}>
            <img src="/logo_full.png" alt="supVision.ai" className="nav__logo-img" />
          </a>

          {/* Center links — hidden when scrolled */}
          <ul className="nav__links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav__link" onClick={(e) => handleLink(e, l.href, l.isContact)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            className="nav__cta btn btn-dark btn-sm"
            onClick={onContactOpen}
          >
            Try supVision free
          </button>

          {/* Hamburger */}
          <button
            className={`nav__burger${open ? ' nav__burger--open' : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label="Menu"
          >
            <span/><span/><span/>
          </button>
        </div>

      </nav>

      {/* Mobile menu — outside nav so backdrop-filter works independently */}
      {open && (
        <div className="nav__mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav__mobile-link" onClick={(e) => handleLink(e, l.href, l.isContact)}>
              {l.label}
            </a>
          ))}
          <button
            className="btn btn-dark"
            style={{ marginTop: 8, justifyContent: 'center' }}
            onClick={() => { setOpen(false); onContactOpen(); }}
          >
            Try supVision free
          </button>
        </div>
      )}

      <style>{`
        /* ── Outer pill ── */
        .nav {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: calc(100% - 48px);
          max-width: var(--container);
          border-radius: 40px;
          border: 1px solid transparent;
          background: transparent;
          transition:
            background   0.35s ease,
            border-color 0.35s ease,
            box-shadow   0.35s ease,
            top          0.35s ease,
            max-width    0.35s ease,
            padding      0.35s ease;
        }

        /* ── Scrolled: pill shrinks so logo+CTA move inward, links stay ── */
        .nav--scrolled {
          max-width: 900px;
          top: 14px;
          background: rgba(255,255,255,0.92);
          border-color: rgba(228,226,226,0.9);
          box-shadow: 0 4px 28px rgba(97,74,68,0.12);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        /* ── Inner row ── */
        .nav__inner {
          display: flex;
          align-items: center;
          height: 60px;
          padding: 0 14px 0 14px;
          gap: 8px;
          transition: height 0.35s ease, padding 0.35s ease;
        }
        .nav--scrolled .nav__inner {
          height: 52px;
          padding: 0 10px 0 10px;
        }

        /* ── Logo ── */
        .nav__logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
        }
        .nav__logo-img {
          height: 28px;
          width: auto;
          display: block;
          transition: height 0.35s ease;
        }
        .nav--scrolled .nav__logo-img {
          height: 24px;
        }

        /* ── Center links ── */
        .nav__links {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0 auto;
          padding: 0;
        }
        .nav__link {
          padding: 7px 13px;
          font-size: 14px;
          font-weight: 400;
          color: var(--c-text-2);
          border-radius: var(--r-pill);
          transition: background 0.15s, color 0.15s, padding 0.35s;
          text-decoration: none;
          white-space: nowrap;
        }
        .nav--scrolled .nav__link {
          padding: 6px 10px;
          font-size: 13px;
        }
        .nav__link:hover {
          background: rgba(0,0,0,0.05);
          color: var(--c-text);
        }

        /* ── CTA ── */
        .nav__cta {
          flex-shrink: 0;
          font-size: 13px !important;
          padding: 9px 16px !important;
        }

        /* ── Hamburger ── */
        .nav__burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 6px;
          background: none;
          border: none;
          cursor: pointer;
          margin-left: auto;
        }
        .nav__burger span {
          display: block;
          width: 20px; height: 1.5px;
          background: var(--c-text);
          border-radius: 2px;
          transition: transform 0.25s, opacity 0.25s;
          transform-origin: center;
        }
        .nav__burger--open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav__burger--open span:nth-child(2) { opacity: 0; }
        .nav__burger--open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── Mobile menu ── */
        .nav__mobile {
          position: fixed;
          top: 84px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 48px);
          max-width: var(--container);
          z-index: 999;
          display: flex;
          flex-direction: column;
          padding: 10px 16px 18px;
          border: 1px solid rgba(228,226,226,0.9);
          border-radius: 28px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 4px 28px rgba(97,74,68,0.12);
        }
        .nav__mobile-link {
          padding: 10px 12px;
          font-size: 15px;
          font-weight: 500;
          color: var(--c-text);
          border-radius: 10px;
          transition: background 0.15s;
          text-decoration: none;
        }
        .nav__mobile-link:hover { background: var(--c-warm); }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .nav__links { display: none; }
          .nav__cta   { display: none; }
          .nav__burger { display: flex; }

          /* На мобильном всегда компактный scrolled-стиль */
          .nav {
            max-width: 100%;
            width: calc(100% - 32px);
            top: 10px;
            background: rgba(255,255,255,0.92);
            border-color: rgba(228,226,226,0.9);
            box-shadow: 0 4px 28px rgba(97,74,68,0.12);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
          .nav .nav__inner {
            height: 52px;
            padding: 0 10px;
          }
          .nav .nav__logo-img {
            height: 24px;
          }
        }
        @media (min-width: 861px) {
          .nav__mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
