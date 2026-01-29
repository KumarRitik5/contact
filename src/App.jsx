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

  const subtitle = useMemo(() => {
    return CONTACT.role || CONTACT.tagline || '';
  }, []);

  const highlights = useMemo(() => {
    const items = [];
    if (CONTACT.availability) items.push({ label: 'Status', value: CONTACT.availability });
    if (CONTACT.location) items.push({ label: 'Location', value: CONTACT.location });
    if (Array.isArray(CONTACT.skills) && CONTACT.skills.length) items.push({ label: 'Stack', value: CONTACT.skills.slice(0, 3).join(' · ') });
    return items.slice(0, 3);
  }, []);

  return (
    <div className="page">
      <header className="header">
        <div className="container header__inner">
          <div className="brand" aria-label="Site brand">
            <Logo size={20} className="brand__logo" title="Contact" />
            <div className="brand__text">Contact</div>
          </div>

          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>

        <div className="container hero">
          <div>
            <div className="eyebrow">Get in touch</div>
            <h1 className="title">{CONTACT.name}</h1>
            {subtitle ? <p className="subtitle">{subtitle}</p> : null}

            {highlights.length ? (
              <div className="hero__highlights" aria-label="Highlights">
                {highlights.map((h) => (
                  <div key={h.label} className="highlight">
                    <div className="highlight__label">{h.label}</div>
                    <div className="highlight__value">{h.value}</div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="hero__actions">
              <a className="btn btn--primary" href="#message">
                Send a message
              </a>
              {CONTACT.github ? (
                <a className="btn" href={CONTACT.github} target="_blank" rel="noreferrer">
                  View GitHub
                </a>
              ) : null}
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
