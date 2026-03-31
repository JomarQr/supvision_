import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import IntegrationsSection from '../components/IntegrationsSection';
import Features from '../components/Features';
import Benefits from '../components/Benefits';
import Pricing from '../components/Pricing';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

export default function HomePage() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  const goContact = () => {
    setLeaving(true);
    setTimeout(() => navigate('/contact'), 380);
  };

  // On mount: scroll to hash section if coming from another page, else top
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash) as HTMLElement | null;
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }, 480); // wait for entry animation
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <Navbar onContactOpen={goContact} />
      <div className={`hp-page${leaving ? ' hp-page--out' : ''}`}>
      <main>
        <Hero onContactOpen={goContact} />
        <IntegrationsSection />
        <Features />
        <Benefits />
        <Pricing />
<CTABanner onContactOpen={goContact} />
      </main>
      <Footer />
      </div>

      <style>{`
        .hp-page {
          animation: hpIn 0.45s cubic-bezier(0.34,1.3,0.64,1) both;
        }
        .hp-page--out {
          animation: hpOut 0.38s ease both !important;
          pointer-events: none;
        }
        @keyframes hpIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes hpOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(1.04); }
        }
      `}</style>
    </>
  );
}
