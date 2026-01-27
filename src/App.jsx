import { useEffect, useMemo, useState } from 'react';
import ContactCard from './components/ContactCard.jsx';
import ContactForm from './components/ContactForm.jsx';
import Footer from './components/Footer.jsx';
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

  return (
    <div className="page">
      <header className="header">
        <div className="container header__inner">
          <div>
            <div className="eyebrow">Contact</div>
            <h1 className="title">{CONTACT.name}</h1>
            {subtitle ? <p className="subtitle">{subtitle}</p> : null}
          </div>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </header>

      <main className="container grid">
        <section className="stack">
          <ContactCard contact={CONTACT} />
          <SocialLinks links={CONTACT.socialLinks} />
        </section>

        <section className="stack">
          <ContactForm contact={CONTACT} />
        </section>
      </main>

      <Footer contact={CONTACT} />
    </div>
  );
}
