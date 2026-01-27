export default function Footer({ contact }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div>
          © {year} {contact.name}. Built with React + Vite.
        </div>
        <div className="small">
          Legacy static page preserved at <a href="/legacy/index.html">/legacy/index.html</a>.
        </div>
      </div>
    </footer>
  );
}
