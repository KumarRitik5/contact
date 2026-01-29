import Logo from './Logo.jsx';
import Ticker from './Ticker.jsx';

export default function Footer({ contact }) {
  const year = new Date().getFullYear();
  const builderName = contact?.name || 'you';

  return (
    <footer className="footer">
      <div className="container container--edge footer__inner">
        <div className="footer__brand" aria-label="App logo">
          <Logo size={18} className="footer__logo" title="Contact" />
          <span className="footer__brandText">Contact</span>
        </div>

        <div>© {year} · Built by {builderName}</div>
      </div>

      <div className="container container--edge footer__ticker">
        <Ticker text="Thanks for visiting • Connect on LinkedIn • Message anytime" speedSeconds={90} />
      </div>
    </footer>
  );
}
