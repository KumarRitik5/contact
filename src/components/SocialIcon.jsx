export default function SocialIcon({ id }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    style: { flex: '0 0 auto' },
    'aria-hidden': true,
  };

  if (id === 'linkedin') {
    return (
      <svg {...common}>
        <path
          d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1c1.37 0 2.5 1.12 2.5 2.5ZM0.5 23.5h4V7.5h-4v16ZM8.5 7.5h3.8v2.2h.06c.53-1 1.83-2.2 3.76-2.2 4.02 0 4.77 2.65 4.77 6.1v9.9h-4v-8.8c0-2.1-.04-4.8-2.92-4.8-2.93 0-3.38 2.28-3.38 4.65v8.95h-4V7.5Z"
          fill="currentColor"
          opacity="0.9"
        />
      </svg>
    );
  }

  if (id === 'facebook') {
    return (
      <svg {...common}>
        <path
          d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.86.24-1.45 1.48-1.45h1.76V5c-.3-.04-1.35-.12-2.56-.12-2.54 0-4.28 1.55-4.28 4.4V11H7.5v3h2.4v8h3.6Z"
          fill="currentColor"
          opacity="0.9"
        />
      </svg>
    );
  }

  if (id === 'instagram') {
    return (
      <svg {...common}>
        <path
          d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.6-2.2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
          fill="currentColor"
          opacity="0.9"
        />
      </svg>
    );
  }

  return null;
}
