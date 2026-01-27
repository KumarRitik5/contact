export default function Footer({ contact }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div>© {year} · Built by {contact.name}</div>
      </div>
    </footer>
  );
}
