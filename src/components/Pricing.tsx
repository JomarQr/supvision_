import { useState } from 'react';

const CORAL = '#FC7C00';

const starterFeatures = [
  'Automate basic workflows',
  'Autonomous insights',
  'Email support',
  'Custom integrations',
  'Autonomous integrations',
];

const enterpriseFeatures = [
  'Advanced workflow automation',
  'Predictive analytics',
  'Dedicated account manager',
  'Custom integrations',
  'Unlimited Autonomous integrations',
];

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill={`${CORAL}22`} />
      <circle cx="10" cy="10" r="9" stroke={CORAL} strokeWidth="1" fill="none" />
      <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke={CORAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="pr-section">
      <div className="container">
        <div className="pr-card">
          {/* BG image */}
          <div className="pr-bg" />
          {/* Overlay */}
          <div className="pr-overlay" />

          {/* Inner layout */}
          <div className="pr-inner">

            {/* Left — heading & toggle */}
            <div className="pr-left">
              <span className="pr-tag">Pricing</span>
              <h2 className="pr-heading">
                Choose the right<br />
                Autonomous solution<br />
                <em className="pr-accent">for you</em>
              </h2>

              <div className="pr-toggle">
                <span className={`pr-toggle-label${!annual ? ' pr-toggle-label--on' : ''}`}>Monthly</span>
                <button
                  className={`pr-toggle-btn${annual ? ' pr-toggle-btn--on' : ''}`}
                  onClick={() => setAnnual(v => !v)}
                  aria-label="Toggle annual billing"
                >
                  <span className="pr-toggle-knob" />
                </button>
                <span className={`pr-toggle-label${annual ? ' pr-toggle-label--on' : ''}`}>
                  Annually
                  <span className="pr-badge">-20%</span>
                </span>
              </div>
            </div>

            {/* Right — two cards */}
            <div className="pr-right">

              {/* Starter */}
              <div className="pr-plan pr-plan--soon">
                <div className="pr-plan-name">Starter</div>
                <div className="pr-plan-desc">Ideal for small agencies starting their autonomous journey.</div>
                <div className="pr-plan-price">
                  <span className="pr-plan-amount pr-plan-amount--custom">Coming soon</span>
                </div>
                <div className="pr-plan-period">Pricing will be announced shortly</div>

                <div className="pr-divider" />

                <div className="pr-features-label">Everything in Pro, plus:</div>
                <ul className="pr-features">
                  {starterFeatures.map(f => (
                    <li key={f} className="pr-feature">
                      <CheckIcon />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button className="pr-btn pr-btn--outline" disabled>
                  Notify me
                </button>
                <p className="pr-plan-note">Be the first to know when it launches</p>
              </div>

              {/* Enterprise */}
              <div className="pr-plan pr-plan--dark">
                <div className="pr-plan-name">Enterprise</div>
                <div className="pr-plan-desc">Full-scale autonomous transformation for large organizations.</div>
                <div className="pr-plan-price">
                  <span className="pr-plan-amount pr-plan-amount--custom">Custom</span>
                </div>
                <div className="pr-plan-period">Custom solutions to fit your business</div>

                <div className="pr-divider" />

                <div className="pr-features-label">Everything in Pro, plus:</div>
                <ul className="pr-features">
                  {enterpriseFeatures.map(f => (
                    <li key={f} className="pr-feature">
                      <CheckIcon />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button className="pr-btn pr-btn--dark">
                  Contact sales
                </button>
                <p className="pr-plan-note">Custom solutions to fit your business needs</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pr-section {
          padding: 80px 0;
          background: var(--c-bg);
        }

        /* Outer rounded card */
        .pr-card {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          min-height: 560px;
          display: flex;
          align-items: stretch;
        }

        /* frame2.png background */
        .pr-bg {
          position: absolute;
          inset: 0;
          background-image: url('/frame2.png');
          background-size: cover;
          background-position: center;
          z-index: 0;
        }

        /* Soft warm overlay */
        .pr-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: rgba(245, 235, 228, 0.38);
        }

        /* Two-column layout */
        .pr-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 380px 1fr;
          width: 100%;
          align-items: center;
          padding: 64px 56px;
          gap: 48px;
        }

        /* ── Left ── */
        .pr-left {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .pr-tag {
          display: inline-block;
          font-size: 13px;
          font-weight: 500;
          color: var(--c-text-2);
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 99px;
          padding: 5px 14px;
          margin-bottom: 28px;
          backdrop-filter: blur(8px);
          align-self: flex-start;
        }
        .pr-heading {
          font-size: clamp(36px, 4vw, 54px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--c-text);
          margin: 0 0 36px;
        }
        .pr-accent {
          font-style: italic;
          font-weight: 700;
          color: ${CORAL};
        }

        /* Toggle */
        .pr-toggle {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pr-toggle-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--c-text-3);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pr-toggle-label--on {
          color: var(--c-text);
          font-weight: 600;
        }
        .pr-toggle-btn {
          position: relative;
          width: 48px; height: 28px;
          border-radius: 99px;
          border: none;
          background: rgba(0,0,0,0.15);
          cursor: pointer;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .pr-toggle-btn--on {
          background: var(--c-text);
        }
        .pr-toggle-knob {
          position: absolute;
          top: 4px; left: 4px;
          width: 20px; height: 20px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          transition: transform 0.2s;
        }
        .pr-toggle-btn--on .pr-toggle-knob {
          transform: translateX(20px);
        }
        .pr-badge {
          background: rgba(200,116,90,0.15);
          color: ${CORAL};
          border-radius: 99px;
          padding: 2px 8px;
          font-size: 11px;
          font-weight: 700;
        }

        /* ── Right — cards row ── */
        .pr-right {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          align-items: stretch;
        }

        /* ── Plan card ── */
        .pr-plan {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 32px rgba(0,0,0,0.06);
        }
        .pr-plan--dark {
          background: rgba(255,255,255,0.96);
        }

        .pr-plan-name {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--c-text-2);
          margin-bottom: 6px;
        }
        .pr-plan-desc {
          font-size: 14px;
          color: var(--c-text-3);
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .pr-plan-price {
          display: flex;
          align-items: flex-start;
          line-height: 1;
          margin-bottom: 4px;
        }
        .pr-plan-sup {
          font-size: 24px;
          font-weight: 500;
          color: var(--c-text);
          margin-top: 8px;
          margin-right: 2px;
        }
        .pr-plan-amount {
          font-size: 68px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--c-text);
          line-height: 1;
        }
        .pr-plan-amount--custom {
          font-size: 54px;
        }
        .pr-plan-period {
          font-size: 13px;
          color: var(--c-text-3);
          margin-bottom: 20px;
        }

        .pr-divider {
          height: 1px;
          background: rgba(0,0,0,0.08);
          margin-bottom: 18px;
        }

        .pr-features-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--c-text-3);
          margin-bottom: 14px;
        }

        .pr-features {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
          margin-bottom: 28px;
        }
        .pr-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--c-text);
          font-weight: 500;
        }

        /* Buttons */
        .pr-btn {
          width: 100%;
          padding: 14px 20px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: var(--font);
          transition: opacity 0.18s, transform 0.18s;
        }
        .pr-btn:hover:not(:disabled) { opacity: 0.82; transform: translateY(-1px); }
        .pr-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .pr-btn--outline {
          background: transparent;
          border: 1.5px solid var(--c-text);
          color: var(--c-text);
        }
        .pr-btn--dark {
          background: var(--c-text);
          border: 1.5px solid var(--c-text);
          color: #fff;
        }

        .pr-plan-note {
          text-align: center;
          font-size: 12px;
          color: var(--c-text-3);
          margin-top: 12px;
          line-height: 1.4;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .pr-inner {
            grid-template-columns: 1fr;
            padding: 48px 36px;
            gap: 40px;
          }
          .pr-left { align-items: flex-start; }
        }
        @media (max-width: 640px) {
          .pr-right { grid-template-columns: 1fr; }
          .pr-inner { padding: 36px 20px; }
          .pr-plan-amount { font-size: 52px; }
          .pr-heading { font-size: 32px; margin-bottom: 24px; }
        }
        @media (max-width: 400px) {
          .pr-inner { padding: 28px 16px; }
          .pr-plan { padding: 24px 20px; }
          .pr-plan-amount { font-size: 44px; }
          .pr-plan-amount--custom { font-size: 36px; }
        }
      `}</style>
    </section>
  );
}
