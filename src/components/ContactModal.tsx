import { useState, useEffect, useRef } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: Props) {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent]       = useState(false);
  const [visible, setVisible] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Animate in/out
  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      // wait for exit animation before unmounting
      const t = setTimeout(() => setVisible(false), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); onClose(); setName(''); setEmail(''); setMessage(''); }, 2500);
  };

  if (!visible) return null;

  return (
    <div
      className={`cm-backdrop${open ? ' cm-backdrop--in' : ' cm-backdrop--out'}`}
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className={`cm-modal${open ? ' cm-modal--in' : ' cm-modal--out'}`}>

        {/* Close button */}
        <button className="cm-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Left — info panel */}
        <div className="cm-left">
          <h2 className="cm-title">Reach out today</h2>
          <p className="cm-desc">
            Learn about our journey, mission,<br />
            and the team driving innovation.
          </p>

          <div className="cm-contacts">
            <div className="cm-contact-item">
              <span className="cm-contact-label">Email:</span>
              <a href="mailto:hello@supvision.ai" className="cm-contact-val">hello@supvision.ai</a>
            </div>
            <div className="cm-contact-item">
              <span className="cm-contact-label">Office:</span>
              <span className="cm-contact-val">Riga, Latvia · Remote-first</span>
            </div>
            <div className="cm-contact-item">
              <span className="cm-contact-label">Response:</span>
              <span className="cm-contact-val">Within 1 business day</span>
            </div>
          </div>

          <div className="cm-socials-wrap">
            <span className="cm-contact-label">Follow us:</span>
            <div className="cm-socials">
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com',
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                { label: 'X', href: 'https://x.com',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { label: 'GitHub', href: 'https://github.com',
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="cm-social" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form panel */}
        <div className="cm-right">
          {sent ? (
            <div className="cm-success">
              <div className="cm-success-icon">✓</div>
              <p>Message sent! We'll get back to you soon.</p>
            </div>
          ) : (
            <form className="cm-form" onSubmit={handleSubmit} noValidate>
              <div className="cm-field">
                <label className="cm-label">Full name</label>
                <input
                  className="cm-input"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="cm-field">
                <label className="cm-label">Email address</label>
                <input
                  className="cm-input"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="cm-field cm-field--grow">
                <label className="cm-label">Message</label>
                <textarea
                  className="cm-input cm-textarea"
                  placeholder="Your message here..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="cm-submit">
                <span>Submit</span>
                <span className="cm-submit-arrow">↗</span>
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        /* ── Backdrop ── */
        .cm-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(10, 20, 40, 0.55);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .cm-backdrop--in  { animation: cmFadeIn  0.3s ease both; }
        .cm-backdrop--out { animation: cmFadeOut 0.35s ease both; }

        @keyframes cmFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cmFadeOut { from { opacity: 1; } to { opacity: 0; } }

        /* ── Modal ── */
        .cm-modal {
          position: relative;
          display: grid;
          grid-template-columns: 320px 1fr;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.35);
          transform-origin: center center;
        }
        .cm-modal--in  { animation: cmPopIn  0.38s cubic-bezier(0.34,1.56,0.64,1) both; }
        .cm-modal--out { animation: cmPopOut 0.3s ease both; }

        @keyframes cmPopIn {
          from { opacity: 0; transform: scale(0.82); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes cmPopOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.88); }
        }

        /* ── Close ── */
        .cm-close {
          position: absolute;
          top: 16px; right: 16px;
          z-index: 10;
          width: 34px; height: 34px;
          background: rgba(255,255,255,0.9);
          border: none;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #0f172a;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
        }
        .cm-close:hover { background: #fff; transform: scale(1.08); }

        /* ── Left panel ── */
        .cm-left {
          background: #f0f0ee;
          padding: 44px 36px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .cm-title {
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--c-text);
          line-height: 1.1;
          margin-bottom: 14px;
        }
        .cm-desc {
          font-size: 14px;
          color: var(--c-text-3);
          line-height: 1.65;
          margin-bottom: auto;
          padding-bottom: 32px;
        }
        .cm-contacts {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }
        .cm-contact-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .cm-contact-label {
          font-size: 12px;
          color: var(--c-text-3);
          font-weight: 500;
        }
        .cm-contact-val {
          font-size: 14px;
          font-weight: 600;
          color: var(--c-text);
          text-decoration: none;
        }
        .cm-contact-val:hover { text-decoration: underline; }
        .cm-socials-wrap {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cm-socials {
          display: flex;
          gap: 8px;
        }
        .cm-social {
          width: 36px; height: 36px;
          background: #0f172a;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .cm-social:hover { opacity: 0.8; }

        /* ── Right panel ── */
        .cm-right {
          background-image: url('/frame1.png');
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: stretch;
        }
        .cm-right::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(200, 220, 240, 0.35);
          backdrop-filter: blur(2px);
        }

        /* ── Form ── */
        .cm-form {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 36px 36px 36px 36px;
          width: 100%;
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.9);
          margin: 24px;
          border-radius: 18px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.08);
        }
        .cm-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .cm-field--grow { flex: 1; }
        .cm-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--c-text);
        }
        .cm-input {
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid #e4e2e2;
          border-radius: 10px;
          font-size: 14px;
          font-family: var(--font);
          color: var(--c-text);
          background: #fff;
          outline: none;
          transition: border-color 0.15s;
        }
        .cm-input:focus { border-color: #9cc1e7; }
        .cm-input::placeholder { color: #b0aead; }
        .cm-textarea {
          resize: none;
          flex: 1;
          min-height: 120px;
        }

        /* Submit button — same style as CTA */
        .cm-submit {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 22px;
          border-radius: 999px;
          background: #0f172a;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          align-self: flex-start;
          transition: opacity 0.18s, transform 0.18s;
        }
        .cm-submit:hover { opacity: 0.85; transform: translateY(-1px); }
        .cm-submit-arrow {
          width: 26px; height: 26px;
          background: #72B9E9;
          color: #0f172a;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
        }

        /* Success state */
        .cm-success {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 48px;
          text-align: center;
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(16px);
          margin: 24px;
          border-radius: 18px;
          width: 100%;
        }
        .cm-success-icon {
          width: 56px; height: 56px;
          background: #72B9E9;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
        }
        .cm-success p {
          font-size: 16px;
          font-weight: 600;
          color: var(--c-text);
        }

        /* ── Responsive ── */
        @media (max-width: 700px) {
          .cm-modal { grid-template-columns: 1fr; max-height: 95vh; overflow-y: auto; }
          .cm-left  { padding: 32px 24px 24px; }
          .cm-form  { margin: 12px; padding: 24px; }
        }
      `}</style>
    </div>
  );
}
