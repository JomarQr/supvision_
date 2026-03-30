import { useState, useEffect, useRef } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const validate = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email';
  }
  if (!data.subject.trim()) errors.subject = 'Subject is required';
  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters';
  }
  return errors;
};

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="section contact-section" ref={sectionRef}>
      <div className="container contact-container">
        {/* Left: form */}
        <div className="contact-form-col reveal">
          <div className="section-label">Get in touch</div>
          <h2 className="contact-title">Let's talk about your team</h2>
          <p className="contact-subtitle">
            Whether you have a question, want a demo, or are ready to sign up—we're here for it.
          </p>

          {submitted ? (
            <div className="contact-success">
              <div className="contact-success__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1.5"/>
                  <path d="M7 12l4 4 6-6" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="contact-success__title">Message sent!</h3>
              <p className="contact-success__text">
                Thanks for reaching out. We'll get back to you within one business day.
              </p>
              <button
                className="btn btn--ghost btn--sm"
                style={{ marginTop: '16px' }}
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form__row">
                <div className={`form-field${errors.name ? ' form-field--error' : ''}`}>
                  <label className="form-label" htmlFor="contact-name">Full name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Alex Johnson"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className={`form-field${errors.email ? ' form-field--error' : ''}`}>
                  <label className="form-label" htmlFor="contact-email">Work email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="alex@company.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
              </div>
              <div className={`form-field${errors.subject ? ' form-field--error' : ''}`}>
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <select
                  id="contact-subject"
                  name="subject"
                  className="form-input form-select"
                  value={form.subject}
                  onChange={handleChange}
                >
                  <option value="">Select a topic...</option>
                  <option value="demo">Request a demo</option>
                  <option value="pricing">Pricing question</option>
                  <option value="support">Technical support</option>
                  <option value="enterprise">Enterprise inquiry</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && <span className="form-error">{errors.subject}</span>}
              </div>
              <div className={`form-field${errors.message ? ' form-field--error' : ''}`}>
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-input form-textarea"
                  placeholder="Tell us about your team size, current challenges, or anything else..."
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>
              <button
                type="submit"
                className="btn btn--primary btn--lg"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="contact-spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M14 8L2 8M14 8l-4-4M14 8l-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right: info */}
        <div className="contact-info-col reveal reveal-delay-2">
          <div className="contact-info-card">
            <h3 className="contact-info-title">Contact information</h3>
            <div className="contact-info-items">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-info-label">Email us</div>
                  <a href="mailto:hello@supvision.ai" className="contact-info-value">hello@supvision.ai</a>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-info-label">Office</div>
                  <div className="contact-info-value">Riga, Latvia 🇱🇻</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-info-label">Response time</div>
                  <div className="contact-info-value">Within 1 business day</div>
                </div>
              </div>
            </div>

            <div className="contact-faq">
              <div className="contact-faq-title">Frequently asked</div>
              {[
                { q: 'Is there a free plan?', a: 'Yes! Our Starter plan is free forever with up to 3 agents.' },
                { q: 'Do you offer a demo?', a: 'Absolutely. Book a 30-minute live demo through this form.' },
                { q: 'How secure is my data?', a: 'SOC 2 Type II compliant. Data encrypted at rest and in transit.' },
              ].map((item) => (
                <div key={item.q} className="contact-faq-item">
                  <div className="contact-faq-q">{item.q}</div>
                  <div className="contact-faq-a">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background: var(--color-surface);
        }
        .contact-container {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 64px;
          align-items: start;
        }
        .contact-title {
          font-size: clamp(26px, 3.5vw, 36px);
          font-weight: 800;
          letter-spacing: -0.6px;
          margin-bottom: 14px;
          margin-top: 12px;
        }
        .contact-subtitle {
          font-size: 16px;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin-bottom: 36px;
        }
        /* Form */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .contact-form__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-label {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--color-primary);
        }
        .form-input {
          padding: 12px 16px;
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 15px;
          color: var(--color-text);
          background: var(--color-surface);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
          outline: none;
          width: 100%;
        }
        .form-input::placeholder {
          color: var(--color-text-light);
        }
        .form-input:focus {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 40px;
        }
        .form-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }
        .form-field--error .form-input {
          border-color: var(--color-danger);
          box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
        }
        .form-error {
          font-size: 12.5px;
          color: var(--color-danger);
          font-weight: 500;
        }
        /* Success */
        .contact-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 48px 24px;
          background: var(--color-surface-2);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
        }
        .contact-success__icon {
          margin-bottom: 16px;
        }
        .contact-success__title {
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .contact-success__text {
          color: var(--color-text-muted);
          font-size: 15px;
          max-width: 320px;
        }
        /* Spinner */
        .contact-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        /* Info card */
        .contact-info-card {
          background: var(--color-surface-2);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 32px;
        }
        .contact-info-title {
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 24px;
        }
        .contact-info-items {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--color-border);
        }
        .contact-info-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .contact-info-icon {
          width: 40px;
          height: 40px;
          background: rgba(99,102,241,0.08);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-accent);
          flex-shrink: 0;
        }
        .contact-info-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-text-muted);
          margin-bottom: 4px;
        }
        .contact-info-value {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--color-primary);
          text-decoration: none;
        }
        a.contact-info-value:hover {
          color: var(--color-accent);
        }
        /* FAQ */
        .contact-faq-title {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-text-muted);
          margin-bottom: 16px;
        }
        .contact-faq {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .contact-faq-item {
          padding: 14px 0;
          border-bottom: 1px solid var(--color-border-light);
        }
        .contact-faq-item:last-child {
          border-bottom: none;
        }
        .contact-faq-q {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-primary);
          margin-bottom: 4px;
        }
        .contact-faq-a {
          font-size: 13.5px;
          color: var(--color-text-muted);
          line-height: 1.55;
        }
        @media (max-width: 900px) {
          .contact-container {
            grid-template-columns: 1fr;
          }
          .contact-form__row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
