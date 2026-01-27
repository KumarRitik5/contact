import { useId } from 'react';

export default function Logo({
  size = 22,
  title = 'Contact',
  className = '',
}) {
  const gradientId = useId();

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={gradientId} x1="10" y1="12" x2="56" y2="56">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent2)" />
        </linearGradient>
      </defs>

      {/* Back card */}
      <rect
        x="10"
        y="12"
        width="38"
        height="34"
        rx="12"
        fill="var(--card)"
        stroke="var(--border)"
        strokeWidth="2"
      />

      {/* Front card */}
      <rect
        x="16"
        y="18"
        width="38"
        height="34"
        rx="12"
        fill="var(--card)"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
      />

      {/* Avatar + text lines */}
      <circle cx="28" cy="31" r="4" fill="currentColor" opacity="0.9" />
      <rect x="35" y="28" width="14" height="4" rx="2" fill="currentColor" opacity="0.75" />
      <rect x="24" y="39" width="25" height="4" rx="2" fill="currentColor" opacity="0.55" />

      {/* Small sparkle */}
      <path
        d="M50 16l1.6 3.2L55 21l-3.4 1.8L50 26l-1.6-3.2L45 21l3.4-1.8L50 16z"
        fill={`url(#${gradientId})`}
        opacity="0.95"
      />
    </svg>
  );
}
