import CopyButton from './CopyButton.jsx';
import Icon from './Icon.jsx';

function pretty(value) {
  if (!value) return '—';
  return value;
}

export default function ContactCard({ contact }) {
  return (
    <div className="card">
      <div className="card__inner">
        <div className="card__title">Contact Details</div>
        <div className="kv">
          <div className="kv__row">
            <div className="kv__label">Name</div>
            <div className="kv__value">{pretty(contact.name)}</div>
          </div>

          <div className="kv__row">
            <div className="kv__label">Email</div>
            <div className="row">
              <div className="kv__value">{pretty(contact.email)}</div>
              {contact.email ? <CopyButton value={contact.email} label="Copy email" /> : null}
            </div>
          </div>

          <div className="kv__row">
            <div className="kv__label">Phone</div>
            <div className="row">
              <div className="kv__value">{pretty(contact.phone)}</div>
              {contact.phone ? <CopyButton value={contact.phone} label="Copy phone" /> : null}
            </div>
          </div>

          <div className="kv__row">
            <div className="kv__label">Location</div>
            <div className="kv__value">{pretty(contact.location)}</div>
          </div>
        </div>

        <div style={{ height: 12 }} />

        <div className="pills">
          <a
            className="btn btn--primary pill"
            href={contact.email ? `mailto:${contact.email}` : '#'}
            onClick={(e) => {
              if (!contact.email) e.preventDefault();
            }}
          >
            <Icon name="mail" />
            Email me
          </a>
          <a
            className="btn pill"
            href={contact.phone ? `tel:${contact.phone}` : '#'}
            onClick={(e) => {
              if (!contact.phone) e.preventDefault();
            }}
          >
            <Icon name="phone" />
            Call
          </a>
        </div>
      </div>
    </div>
  );
}
