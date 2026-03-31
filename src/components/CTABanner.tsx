interface Props { onContactOpen: () => void; }

export default function CTABanner({ onContactOpen }: Props) {

  return (
    <section className="cta">
      <div className="container">
        <div className="cta__card">
          {/* Background image */}
          <div className="cta__img" />

          {/* Dark overlay so text is readable */}
          <div className="cta__overlay" />

          {/* Content */}
          <div className="cta__content">
            <h2 className="cta__heading">
              Ready to transform<br />
              your fintech support?
            </h2>

            <p className="cta__sub">
              From onboarding and KYC to disputes and transaction issues — supVision automates
              the entire customer support journey for financial services companies.
            </p>

            <button className="cta__btn" onClick={onContactOpen}>
              Get started
              <span className="cta__btn-arrow">↗</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .cta {
          padding: 80px 0;
          background: var(--c-bg);
        }

        .cta__card {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          min-height: 420px;
          display: flex;
          align-items: flex-end;
          padding: 52px 56px;
        }

        /* pole.png background */
        .cta__img {
          position: absolute;
          inset: 0;
          background-image: url('/pole.png');
          background-size: cover;
          background-position: center;
          z-index: 0;
        }

        /* gradient overlay — darker on left for text, fades right */
        .cta__overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            105deg,
            rgba(10, 30, 60, 0.72) 0%,
            rgba(10, 30, 60, 0.55) 45%,
            rgba(10, 30, 60, 0.10) 100%
          );
        }

        .cta__content {
          position: relative;
          z-index: 2;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Social proof row */
        .cta__proof {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          margin-bottom: 4px;
        }
        .cta__avatars {
          display: flex;
        }
        .cta__avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.6);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -8px;
        }
        .cta__avatars .cta__avatar:first-child { margin-left: 0; }

        .cta__heading {
          font-size: clamp(36px, 4.5vw, 58px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: #fff;
          margin: 0;
        }

        .cta__sub {
          font-size: 16px;
          line-height: 1.65;
          color: rgba(255,255,255,0.72);
          max-width: 440px;
        }

        /* Button — yellow-green like screenshot */
        .cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 999px;
          background: #FC7C00;
          color: #0f172a;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          align-self: flex-start;
          margin-top: 8px;
          transition: opacity 0.18s, transform 0.18s;
        }
        .cta__btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
        .cta__btn-arrow {
          width: 28px;
          height: 28px;
          background: #0f172a;
          color: #FC7C00;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .cta__card { padding: 36px 24px; min-height: 340px; }
          .cta__heading { font-size: 32px; }
          .cta__sub { font-size: 14px; }
        }
        @media (max-width: 400px) {
          .cta__card { padding: 28px 20px; }
          .cta__heading { font-size: 28px; }
          .cta__btn { width: 100%; justify-content: center; }
          .cta__overlay {
            background: linear-gradient(
              180deg,
              rgba(10,30,60,0.75) 0%,
              rgba(10,30,60,0.65) 100%
            );
          }
        }
      `}</style>
    </section>
  );
}
