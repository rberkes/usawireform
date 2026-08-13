import { cx } from "@/lib/cx";

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

export function BrandLockup({
  size = "nav",
}: {
  size?: "nav" | "hero";
}) {
  const hero = size === "hero";
  return (
    <span className={cx("flex items-center", hero ? "gap-5" : "gap-2.5")}>
      <WireMark
        className={
          hero
            ? "h-16 w-16 text-zoom sm:h-24 sm:w-24"
            : "h-8 w-8 text-zoom"
        }
      />
      <span className={hero ? "leading-[1.02]" : "leading-[1.05]"}>
        <span
          className={cx(
            "block font-mono font-medium uppercase text-zoom",
            hero
              ? "text-lg tracking-[0.22em] sm:text-2xl"
              : "text-[10px] tracking-[0.22em]",
          )}
        >
          USA
        </span>
        <span
          className={cx(
            "block font-mono font-medium uppercase text-foreground",
            hero
              ? "text-4xl tracking-[0.12em] sm:text-6xl"
              : "text-[13px] tracking-[0.14em]",
          )}
        >
          Wire Form
        </span>
      </span>
    </span>
  );
}
