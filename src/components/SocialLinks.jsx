import SocialIcon from './SocialIcon.jsx';

function brandStyle(id) {
  switch (id) {
    case 'facebook':
      return { borderColor: 'rgba(59, 89, 152, 0.5)' };
    case 'instagram':
      return { borderColor: 'rgba(225, 48, 108, 0.5)' };
    case 'linkedin':
      return { borderColor: 'rgba(0, 119, 181, 0.5)' };
    default:
      return undefined;
  }
}

export default function SocialLinks({ links }) {
  return (
    <div className="card">
      <div className="card__inner">
        <div className="card__title">Social</div>
        <div className="pills">
          {links.map((link) => (
            <a
              key={link.id}
              className="btn pill"
              style={brandStyle(link.id)}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon id={link.id} />
              {link.label}
            </a>
          ))}
        </div>
        <div style={{ marginTop: 10 }} className="hint">
          Opens in a new tab.
        </div>
      </div>
    </div>
  );
}
