function esc(v) {
  return String(v ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
}

function buildVCard(contact) {
  const name = esc(contact.name || '');
  const role = esc(contact.role || '');
  const email = esc(contact.email || '');
  const phone = esc(contact.phone || '');
  const location = esc(contact.location || '');
  const website = esc(contact.website || '');

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${name}`,
    `N:${name};;;;`,
    role ? `TITLE:${role}` : null,
    email ? `EMAIL;TYPE=INTERNET:${email}` : null,
    phone ? `TEL;TYPE=CELL:${phone}` : null,
    location ? `ADR;TYPE=HOME:;;${location};;;;` : null,
    website ? `URL:${website}` : null,
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\n');
}

export default function VCardButton({ contact, className = 'btn' }) {
  const disabled = !contact?.name || (!contact?.email && !contact?.phone);

  function download() {
    const vcf = buildVCard(contact);
    const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${(contact.name || 'contact').replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }

  return (
    <button type="button" className={className} onClick={download} disabled={disabled}>
      Download vCard
    </button>
  );
}
