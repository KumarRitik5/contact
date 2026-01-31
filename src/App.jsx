import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import ContactCard from './components/ContactCard.jsx';
import Footer from './components/Footer.jsx';
import Logo from './components/Logo.jsx';
import Reveal from './components/Reveal.jsx';
import SocialLinks from './components/SocialLinks.jsx';
import Ticker from './components/Ticker.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import { CONTACT } from './config/contact.js';

const ContactForm = lazy(() => import('./components/ContactForm.jsx'));

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    // Default is light mode unless the user explicitly chose otherwise.
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const heroTitle = useMemo(() => {
    return CONTACT.tagline || 'Let’s connect.';
  }, []);

  const heroSubtitle = useMemo(() => {
    return 'Send a message with a bit of detail — I usually reply as soon as I can.';
  }, []);

  const messageSectionRef = useRef(null);
  const [showContactForm, setShowContactForm] = useState(() => {
    // If user lands directly on #message, render immediately.
    return typeof window !== 'undefined' && window.location?.hash === '#message';
  });

  useEffect(() => {
    if (showContactForm) return;
    const el = messageSectionRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setShowContactForm(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShowContactForm(true);
          io.disconnect();
        }
      },
      // Start loading before it's visible so it feels instant.
      { root: null, rootMargin: '500px 0px', threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [showContactForm]);

  return (
    <div className="page">
      <header className="header">
        <div className="container container--edge header__inner">
          <div className="brand" aria-label="Site brand">
            <Logo size={20} className="brand__logo" title="Contact" />
            <div className="brand__text">Contact</div>
          </div>

          <div className="header__marquee">
            <Ticker
              text="Open to opportunities • Fast replies • Clean, modern builds"
              speedSeconds={110}
              className="ticker--header"
            />
          </div>

          <div className="header__actions">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>

        <div className="container hero">
          <div>
            <h1 className="title">{heroTitle}</h1>
            <p className="subtitle">{heroSubtitle}</p>

            <div className="hero__actions">
              <a className="btn btn--primary" href="#message">
                Send a message
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="container grid">
        <section className="stack stack--sticky">
          <Reveal delayMs={0}>
            <ContactCard contact={CONTACT} />
          </Reveal>

          <Reveal delayMs={90}>
            <SocialLinks links={CONTACT.socialLinks} />
          </Reveal>
        </section>

        <section className="stack" id="message" ref={messageSectionRef}>
          <Reveal delayMs={140}>
            {showContactForm ? (
              <Suspense fallback={<div className="card"><div className="card__inner"><div className="hint">Loading form…</div></div></div>}>
                <ContactForm contact={CONTACT} />
              </Suspense>
            ) : (
              <div className="card">
                <div className="card__inner">
                  <div className="hint">Form loads as you scroll.</div>
                </div>
              </div>
            )}
          </Reveal>
        </section>
      </main>

      <Footer contact={CONTACT} />
    </div>
  );
}
