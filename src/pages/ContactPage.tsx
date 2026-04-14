import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TURNSTILE_SCRIPT_ID = 'cf-turnstile-script';
const TURNSTILE_ACTION = 'contact_form';
const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action?: string;
      theme?: 'light' | 'dark' | 'auto';
      callback?: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
    }
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export default function ContactPage() {
  const navigate = useNavigate();
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [sent, setSent]       = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [formStartedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState('');
  const [captchaLoadError, setCaptchaLoadError] = useState(false);
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileContainerRef.current) return;

    let cancelled = false;

    const renderTurnstile = () => {
      if (
        cancelled ||
        !turnstileContainerRef.current ||
        !window.turnstile ||
        turnstileWidgetIdRef.current
      ) {
        return;
      }

      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        action: TURNSTILE_ACTION,
        theme: 'light',
        callback: (token: string) => {
          if (cancelled) return;
          setTurnstileToken(token);
          setCaptchaLoadError(false);
        },
        'expired-callback': () => {
          if (cancelled) return;
          setTurnstileToken('');
        },
        'error-callback': () => {
          if (cancelled) return;
          setTurnstileToken('');
          setCaptchaLoadError(true);
        },
      });
    };

    const handleLoad = () => {
      if (cancelled) return;
      setCaptchaLoadError(false);
      renderTurnstile();
    };

    const handleError = () => {
      if (cancelled) return;
      setCaptchaLoadError(true);
    };

    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener('load', handleLoad);
      existingScript.addEventListener('error', handleError);
      if (existingScript.dataset.loaded === 'true') {
        renderTurnstile();
      }
    } else {
      const script = document.createElement('script');
      script.id = TURNSTILE_SCRIPT_ID;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.addEventListener('load', () => {
        script.dataset.loaded = 'true';
        handleLoad();
      });
      script.addEventListener('error', handleError);
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;

      if (existingScript) {
        existingScript.removeEventListener('load', handleLoad);
        existingScript.removeEventListener('error', handleError);
      }

      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, []);

  const goBack = (hash?: string) => {
    const target = !hash || hash === '#home' || hash === '/' ? '/' : `/${hash}`;
    setLeaving(true);
    setTimeout(() => navigate(target), 420);
  };

  const resetTurnstile = () => {
    setTurnstileToken('');
    if (turnstileWidgetIdRef.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (turnstileSiteKey && !turnstileToken) {
      setErrorMessage('Please complete the CAPTCHA.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          website,
          formStartedAt,
          turnstileToken,
        }),
      });
      if (res.ok) {
        setSent(true);
        setTimeout(() => goBack(undefined), 2500);
      } else {
        const data = await res.json().catch(() => ({}));
        if (import.meta.env.DEV) {
          console.error('Contact error:', data);
        }
        setErrorMessage(typeof data?.error === 'string'
          ? data.error
          : 'Something went wrong. Please try again or email us directly.');
        resetTurnstile();
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again or email us directly.');
      resetTurnstile();
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = loading || (Boolean(turnstileSiteKey) && !turnstileToken);

  return (
    <>
      <Navbar onContactOpen={() => goBack()} alwaysScrolled onLinkClick={(href) => goBack(href)} />

      <div className={`cp-page${leaving ? ' cp-page--out' : ''}`}>
        <div className="cp-wrap">
          {/* Left — info */}
          <div className="cp-left">
            <h1 className="cp-title">Reach out today</h1>
            <p className="cp-desc">
              Learn about our journey, mission,<br />
              and the team driving innovation.
            </p>

            <div className="cp-contacts">
              <div className="cp-contact-item">
                <span className="cp-contact-label">Email:</span>
                <a
                  href="#"
                  className="cp-contact-val"
                  onClick={e => { e.preventDefault(); window.location.href = ['mai','lto:info@supvision','.ai'].join(''); }}
                >
                  info&#64;supvision&#46;ai
                </a>
              </div>
            </div>

            <div className="cp-socials-wrap">
              <span className="cp-contact-label">Follow us:</span>
              <div className="cp-socials">
                <a href="https://www.linkedin.com/company/supvision-ai/" target="_blank" rel="noopener noreferrer" className="cp-social" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
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
                <div className="cp-honeypot" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                  />
                </div>
                <div className="cp-field">
                  <label className="cp-label">Full name</label>
                  <input className="cp-input" type="text" placeholder="Your full name"
                    value={name} onChange={e => setName(e.target.value)}
                    maxLength={100} autoComplete="name" required />
                </div>
                <div className="cp-field">
                  <label className="cp-label">Email address</label>
                  <input className="cp-input" type="email" placeholder="Your email address"
                    value={email} onChange={e => setEmail(e.target.value)}
                    maxLength={255} autoComplete="email" required />
                </div>
                <div className="cp-field cp-field--grow">
                  <label className="cp-label">Message</label>
                  <textarea className="cp-input cp-textarea" placeholder="Your message here..."
                    value={message} onChange={e => setMessage(e.target.value)}
                    maxLength={5000} required />
                </div>
                {turnstileSiteKey && (
                  <div className="cp-field">
                    <label className="cp-label">Verification</label>
                    <div ref={turnstileContainerRef} className="cp-captcha" />
                    {captchaLoadError && (
                      <p style={{ fontSize: 13, color: '#ef4444', margin: 0 }}>
                        Verification failed to load. Please refresh the page.
                      </p>
                    )}
                  </div>
                )}
                {errorMessage && (
                  <p style={{ fontSize: 13, color: '#ef4444', margin: 0 }}>
                    {errorMessage}
                  </p>
                )}
                <button type="submit" className="cp-submit" disabled={isSubmitDisabled}>
                  <span>{loading ? 'Sending...' : 'Submit'}</span>
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
        .cp-honeypot {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
        }
        .cp-label { font-size: 14px; font-weight: 600; color: var(--c-text); }
        .cp-input {
          width: 100%; padding: 13px 15px;
          border: 1.5px solid #e4e2e2;
          border-radius: 10px;
          font-size: 14px; font-family: var(--font);
          color: var(--c-text); background: #fff;
          outline: none; transition: border-color 0.15s;
        }
        .cp-input:focus { border-color: #72B9E9; }
        .cp-input::placeholder { color: #b5b3b1; }
        .cp-textarea { resize: none; min-height: 130px; }
        .cp-captcha {
          min-height: 65px;
        }

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
        .cp-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }
        .cp-submit-arrow {
          width: 26px; height: 26px;
          background: #fff; color: #0f172a;
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
          background: #72B9E9; border-radius: 50%;
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
