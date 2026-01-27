import Logo from './Logo.jsx';

export default function Footer({ contact }) {
  const year = new Date().getFullYear();
  const builderName = contact?.name || 'you';

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand" aria-label="App logo">
          <Logo size={18} className="footer__logo" title="Contact" />
          <span className="footer__brandText">Contact</span>
        </div>

        <div>© {year} · Built by {builderName}</div>
      </div>
    </footer>
  );
}
