import Icon from './Icon.jsx';

export default function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="btn btn--ghost"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <Icon name={isDark ? 'moon' : 'sun'} />
      <span>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
}
