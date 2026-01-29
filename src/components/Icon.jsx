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
    case 'link':
      return (
        <svg {...common}>
          <path
            d="M10.5 13.5a3.5 3.5 0 0 1 0-5l1-1a3.5 3.5 0 0 1 5 5l-.6.6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
          <path
            d="M13.5 10.5a3.5 3.5 0 0 1 0 5l-1 1a3.5 3.5 0 0 1-5-5l.6-.6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />
        </svg>
      );
    case 'file':
      return (
        <svg {...common}>
          <path
            d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            opacity="0.9"
          />
          <path
            d="M14 3v4a1 1 0 0 0 1 1h4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      );
    case 'github':
      return (
        <svg {...common}>
          <path
            fill="currentColor"
            opacity="0.9"
            d="M12 1.5c-5.8 0-10.5 4.8-10.5 10.7 0 4.7 3 8.7 7.2 10.1.5.1.7-.2.7-.5v-2c-2.9.6-3.6-1.2-3.6-1.2-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 2.1 2.9 1.5.1-.7.4-1.2.7-1.5-2.3-.3-4.7-1.2-4.7-5.2 0-1.2.4-2.1 1.1-2.8-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 .1.9-.3 1.8-.4 2.7-.4s1.8.1 2.7.4c2.1-.4 3-.1 3-.1.6 1.5.2 2.6.1 2.9.7.7 1.1 1.7 1.1 2.8 0 4-2.4 4.9-4.7 5.2.4.3.7 1 .7 2.1v3.1c0 .3.2.6.7.5 4.2-1.4 7.2-5.4 7.2-10.1C22.5 6.3 17.8 1.5 12 1.5Z"
          />
        </svg>
      );
    default:
      return null;
  }
}
