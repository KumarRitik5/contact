export default function Icon({ name, size = 18, className = '' }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className,
    'aria-hidden': true,
    style: { flex: '0 0 auto' },
  };

  switch (name) {
    case 'sun':
      return (
        <svg {...common}>
          <path
            d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-16v2m0 18v-2m10-8h-2M4 12H2m16.95 6.95-1.42-1.42M6.47 6.47 5.05 5.05m13.9 0-1.42 1.42M6.47 17.53l-1.42 1.42"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.95"
          />
        </svg>
      );
    case 'moon':
      return (
        <svg {...common}>
          <path
            d="M21 13.4A8 8 0 0 1 10.6 3 6.5 6.5 0 1 0 21 13.4Z"
            fill="currentColor"
            opacity="0.95"
          />
        </svg>
      );
    case 'copy':
      return (
        <svg {...common}>
          <path
            d="M9 9h10v10H9V9Z"
            stroke="currentColor"
            strokeWidth="1.8"
            opacity="0.95"
          />
          <path
            d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <path
            d="m20 7-11 11-5-5"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
        </svg>
      );
    case 'mail':
      return (
        <svg {...common}>
          <path
            d="M4.5 7.5A2.5 2.5 0 0 1 7 5h10a2.5 2.5 0 0 1 2.5 2.5V17A2.5 2.5 0 0 1 17 19.5H7A2.5 2.5 0 0 1 4.5 17V7.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            opacity="0.95"
          />
          <path
            d="m6.5 8 5.1 4.1c.25.2.6.2.85 0L17.5 8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />
        </svg>
      );
    case 'phone':
      return (
        <svg {...common}>
          <path
            d="M8.8 10.2c1.7 3.3 3.7 5.3 7 7l2.3-2.3c.3-.3.8-.4 1.2-.3 1 .3 2.1.5 3.2.5.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.5 22 2 13.5 2 3c0-.6.4-1 1-1h4.2c.6 0 1 .4 1 1 0 1.1.2 2.2.5 3.2.1.4 0 .9-.3 1.2L8.8 10.2Z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
      );
    case 'download':
      return (
        <svg {...common}>
          <path
            d="M12 3v10m0 0 4-4m-4 4-4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
          <path
            d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>
      );
    case 'print':
      return (
        <svg {...common}>
          <path
            d="M7 9V4h10v5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M7 18h10v2H7v-2Z"
            fill="currentColor"
            opacity="0.85"
          />
          <path
            d="M6 10h12a3 3 0 0 1 3 3v3h-3v-2H6v2H3v-3a3 3 0 0 1 3-3Z"
            fill="currentColor"
            opacity="0.35"
          />
        </svg>
      );
    default:
      return null;
  }
}
