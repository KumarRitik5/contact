export default function Ticker({
  text = 'Open to opportunities • Fast replies • Let’s build something great',
  className = '',
  repeats = 6,
  ariaHidden = true,
}) {
  const items = Array.from({ length: Math.max(3, repeats) }, (_, i) => i);

  return (
    <div className={`ticker ${className}`.trim()} aria-hidden={ariaHidden}>
      <div className="ticker__mask">
        <div className="ticker__track">
          <div className="ticker__group">
            {items.map((i) => (
              <span key={`a-${i}`} className="ticker__item">
                {text}
              </span>
            ))}
          </div>
          <div className="ticker__group" aria-hidden="true">
            {items.map((i) => (
              <span key={`b-${i}`} className="ticker__item">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
