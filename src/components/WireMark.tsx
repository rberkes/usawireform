export function WireMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 7.5 11 25.5 16 12.5 21 25.5 27.5 7.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BrandLockup() {
  return (
    <span className="flex items-center gap-2.5">
      <WireMark className="h-8 w-8 text-zoom" />
      <span className="leading-[1.05]">
        <span className="block font-mono text-[10px] font-medium tracking-[0.22em] text-zoom uppercase">
          USA
        </span>
        <span className="block font-mono text-[13px] font-medium tracking-[0.14em] text-foreground uppercase">
          Wire Form
        </span>
      </span>
    </span>
  );
}
