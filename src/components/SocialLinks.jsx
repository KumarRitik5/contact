import SocialIcon from './SocialIcon.jsx';

function brandStyle(id) {
  switch (id) {
    case 'linkedin':
      return { borderColor: 'rgba(0, 119, 181, 0.5)' };
    case 'github':
      return { borderColor: 'rgba(255, 255, 255, 0.22)' };
    case 'email':
      return { borderColor: 'rgba(110, 231, 255, 0.35)' };
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
              className="btn pill btn--social"
              data-brand={link.id}
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
      </div>
    </div>
  );
}
