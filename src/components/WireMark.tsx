export function WireMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 22c4-12 8-12 12 0s8 12 12 0"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="3" cy="22" r="1.6" fill="currentColor" />
      <circle cx="29" cy="22" r="1.6" fill="currentColor" />
    </svg>
  );
}
