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
    if (CONTACT.tagline) return CONTACT.tagline;
    return 'Reach out for collaborations, opportunities, or a quick hello.';
  }, []);

  return (
    <div className="page">
      <header className="header">
        <div className="container header__inner">
          <div>
            <div className="eyebrow">Contact</div>
            <h1 className="title">{CONTACT.name}</h1>
            <p className="subtitle">{subtitle}</p>
          </div>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </header>

      <main className="container grid">
        <section className="stack">
          <ContactCard contact={CONTACT} />
          <SocialLinks links={CONTACT.socialLinks} />
          <div className="note">
            <div className="note__title">Quick tip</div>
            <div className="note__body">
              If you prefer, use the form on the right — it can either send to your configured endpoint or open a prefilled email.
            </div>
          </div>
        </section>

        <section className="stack">
          <ContactForm contact={CONTACT} />
        </section>
      </main>

      <Footer contact={CONTACT} />
    </div>
  );
}
