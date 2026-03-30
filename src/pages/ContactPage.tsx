import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  const navigate = useNavigate();
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent]       = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const goBack = (hash?: string) => {
    setLeaving(true);
    setTimeout(() => navigate(hash ? `/${hash}` : '/'), 420);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => goBack(undefined), 2500);
  };

  return (
    <>
      <Navbar onContactOpen={() => goBack()} alwaysScrolled onLinkClick={(href) => goBack(href)} />

      <div className={`cp-page${leaving ? ' cp-page--out' : ''}`}>
        <div className="cp-wrap">
          {/* Left — info */}
          <div className="cp-left">
            <a href="/" onClick={(e) => { e.preventDefault(); goBack(undefined); }} className="cp-logo">
              <img src="/logo_full.png" alt="supVision.ai" />
            </a>

            <h1 className="cp-title">Reach out today</h1>
            <p className="cp-desc">
              Learn about our journey, mission,<br />
              and the team driving innovation.
            </p>

            <div className="cp-contacts">
              <div className="cp-contact-item">
                <span className="cp-contact-label">Email:</span>
                <a href="mailto:hello@supvision.ai" className="cp-contact-val">hello@supvision.ai</a>
              </div>
              <div className="cp-contact-item">
                <span className="cp-contact-label">Office:</span>
                <span className="cp-contact-val">Riga, Latvia · Remote-first</span>
              </div>
              <div className="cp-contact-item">
                <span className="cp-contact-label">Response:</span>
                <span className="cp-contact-val">Within 1 business day</span>
              </div>
            </div>

            <div className="cp-socials-wrap">
              <span className="cp-contact-label">Follow us:</span>
              <div className="cp-socials">
                {[
                  { label: 'LinkedIn', href: 'https://linkedin.com',
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { label: 'X', href: 'https://x.com',
                    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                  { label: 'GitHub', href: 'https://github.com',
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="cp-social" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form over frame1.png */}
          <div className="cp-right">
            {sent ? (
              <div className="cp-success">
                <div className="cp-success-icon">✓</div>
                <p>Message sent! We'll get back to you soon.</p>
              </div>
            ) : (
              <form className="cp-form" onSubmit={handleSubmit} noValidate>
                <div className="cp-field">
                  <label className="cp-label">Full name</label>
                  <input className="cp-input" type="text" placeholder="Your full name"
                    value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="cp-field">
                  <label className="cp-label">Email address</label>
                  <input className="cp-input" type="email" placeholder="Your email address"
                    value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="cp-field cp-field--grow">
                  <label className="cp-label">Message</label>
                  <textarea className="cp-input cp-textarea" placeholder="Your message here..."
                    value={message} onChange={e => setMessage(e.target.value)} required />
                </div>
                <button type="submit" className="cp-submit">
                  <span>Submit</span>
                  <span className="cp-submit-arrow">↗</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .cp-page {
          background: var(--c-bg);
          padding: 110px 24px 80px;
          display: flex;
          justify-content: center;
          animation: cpIn 0.45s cubic-bezier(0.34,1.3,0.64,1) both;
        }
        .cp-page--out {
          animation: cpOut 0.4s ease both !important;
        }
        @keyframes cpIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes cpOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.96); }
        }

        /* Two separate rectangles with gap */
        .cp-wrap {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 16px;
          width: 100%;
          max-width: 1280px;
          min-height: 620px;
          align-items: stretch;
        }

        /* Left panel */
        .cp-left {
          background: #f0f0ee;
          border-radius: 28px;
          padding: 52px 48px;
          display: flex;
          flex-direction: column;
          gap: 0;
          box-shadow: 0 4px 24px rgba(97,74,68,0.08);
        }
        .cp-logo { display: inline-flex; margin-bottom: 32px; }
        .cp-logo img { height: 24px; width: auto; }
        .cp-title {
          font-size: 38px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--c-text);
          line-height: 1.1;
          margin-bottom: 14px;
        }
        .cp-desc {
          font-size: 15px;
          color: var(--c-text-3);
          line-height: 1.65;
          margin-bottom: auto;
          padding-bottom: 36px;
        }
        .cp-contacts { display: flex; flex-direction: column; gap: 20px; margin-bottom: 32px; }
        .cp-contact-item { display: flex; flex-direction: column; gap: 3px; }
        .cp-contact-label { font-size: 12px; color: var(--c-text-3); font-weight: 500; }
        .cp-contact-val { font-size: 15px; font-weight: 600; color: var(--c-text); text-decoration: none; }
        .cp-contact-val:hover { text-decoration: underline; }
        .cp-socials-wrap { display: flex; flex-direction: column; gap: 10px; }
        .cp-socials { display: flex; gap: 8px; }
        .cp-social {
          width: 36px; height: 36px;
          background: #0f172a;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #fff; text-decoration: none;
          transition: opacity 0.15s;
        }
        .cp-social:hover { opacity: 0.75; }

        /* Right panel */
        .cp-right {
          position: relative;
          background-image: url('/frame1.png');
          background-size: cover;
          background-position: center;
          border-radius: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(97,74,68,0.08);
        }
        .cp-right::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(180,215,240,0.25);
          backdrop-filter: blur(2px);
          border-radius: 28px;
        }

        /* Form */
        .cp-form {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; gap: 18px;
          padding: 36px; width: 100%;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 20px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.08);
        }
        .cp-field { display: flex; flex-direction: column; gap: 7px; }
        .cp-field--grow { flex: 1; }
        .cp-label { font-size: 14px; font-weight: 600; color: var(--c-text); }
        .cp-input {
          width: 100%; padding: 13px 15px;
          border: 1.5px solid #e4e2e2;
          border-radius: 10px;
          font-size: 14px; font-family: var(--font);
          color: var(--c-text); background: #fff;
          outline: none; transition: border-color 0.15s;
        }
        .cp-input:focus { border-color: #b8e850; }
        .cp-input::placeholder { color: #b5b3b1; }
        .cp-textarea { resize: none; min-height: 130px; }

        .cp-submit {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 22px; border-radius: 999px;
          background: #0f172a; color: #fff;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          border: none; cursor: pointer; align-self: flex-start;
          transition: opacity 0.18s, transform 0.18s;
          font-family: var(--font);
        }
        .cp-submit:hover { opacity: 0.85; transform: translateY(-1px); }
        .cp-submit-arrow {
          width: 26px; height: 26px;
          background: #D6FD70; color: #0f172a;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
        }

        /* Success */
        .cp-success {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 16px; padding: 48px; text-align: center;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(18px);
          border-radius: 20px; width: 100%;
        }
        .cp-success-icon {
          width: 56px; height: 56px;
          background: #D6FD70; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; font-weight: 700; color: #0f172a;
        }
        .cp-success p { font-size: 16px; font-weight: 600; color: var(--c-text); }

        @media (max-width: 860px) {
          .cp-wrap { grid-template-columns: 1fr; gap: 12px; }
          .cp-left { padding: 40px 36px; }
          .cp-right { min-height: 480px; }
          .cp-form { padding: 28px; }
        }
        @media (max-width: 560px) {
          .cp-left { padding: 32px 28px; border-radius: 20px; }
          .cp-right { min-height: 420px; border-radius: 20px; padding: 24px; }
          .cp-form { padding: 24px; }
          .cp-title { font-size: 30px; }
          .cp-page { padding: 90px 16px 60px; }
        }
      `}</style>
    </>
  );
}
