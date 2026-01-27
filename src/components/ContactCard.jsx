import CopyButton from './CopyButton.jsx';

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
              <CopyButton value={contact.email} label="Copy email" disabled={!contact.email} />
            </div>
          </div>

          <div className="kv__row">
            <div className="kv__label">Phone</div>
            <div className="row">
              <div className="kv__value">{pretty(contact.phone)}</div>
              <CopyButton value={contact.phone} label="Copy phone" disabled={!contact.phone} />
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
            Email me
          </a>
          <a
            className="btn pill"
            href={contact.phone ? `tel:${contact.phone}` : '#'}
            onClick={(e) => {
              if (!contact.phone) e.preventDefault();
            }}
          >
            Call
          </a>
        </div>

        <div style={{ marginTop: 10 }} className="hint">
          Fill in your email/phone in <span style={{ fontWeight: 800 }}>src/config/contact.js</span> to enable the quick actions.
        </div>
      </div>
    </div>
  );
}
