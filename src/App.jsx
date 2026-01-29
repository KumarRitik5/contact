import { useEffect, useMemo, useState } from 'react';
import ContactCard from './components/ContactCard.jsx';
import ContactForm from './components/ContactForm.jsx';
import Footer from './components/Footer.jsx';
import Logo from './components/Logo.jsx';
import SocialLinks from './components/SocialLinks.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import { CONTACT } from './config/contact.js';

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
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

  return (
    <div className="page">
      <header className="header">
        <div className="container container--edge header__inner">
          <div className="brand" aria-label="Site brand">
            <Logo size={20} className="brand__logo" title="Contact" />
            <div className="brand__text">Contact</div>
          </div>

          <ThemeToggle theme={theme} setTheme={setTheme} />
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
          <ContactCard contact={CONTACT} />
          <SocialLinks links={CONTACT.socialLinks} />
        </section>

        <section className="stack" id="message">
          <ContactForm contact={CONTACT} />
        </section>
      </main>

      <Footer contact={CONTACT} />
    </div>
  );
}
