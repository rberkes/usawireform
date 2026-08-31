import Link from "next/link";
import { cx } from "@/lib/cx";
import { getStateByAbbr } from "@/lib/states";

/**
 * Recognizable state silhouettes so a city header shows which state
 * quotes are coming from. Unknown abbreviations fall back to the postal code.
 */
const OUTLINES: Record<string, string> = {
  CA: "M41 3.5 49 5.2 51.2 14 48.5 24.5 52.8 33.8 58.5 41.2 61 49.5 56.8 61.2 48.2 73.5 39.5 76.2 34.2 70.5 28.8 58 26.2 46.5 29.5 34.8 33.2 22.5 36.8 12.2Z",
  IL: "M36.5 5.5 45.2 6.2 47.5 21.5 55.8 26.2 54.2 41 52.8 58.5 47.2 73.8 28.5 72.2 23.8 54 22.5 36.8 28.2 32.5 31.8 18.2 33.5 8.2Z",
  OH: "M16.5 21.2 38.5 17.8 61.8 16.5 67.2 24.8 65.5 38.2 61.2 54.8 52.5 62.2 28.8 60.5 15.2 52.8 12.8 36.5Z",
  TX: "M21.5 8.5 39.2 8.2 39.5 22.8 71.5 27.2 74.2 38.5 68.8 49.2 58.5 62.8 46.2 74.5 32.8 68.2 18.5 58.8 13.2 44.5 12.8 31.2 21.2 27.5Z",
  MI: "M24.2 30.5 41.5 24.8 52.8 28.2 56.5 38.8 53.2 49.5 58.8 61.2 46.5 68.5 32.2 66.8 24.8 54.2 26.5 41.2ZM18.5 10.2 42.8 7.5 48.2 14.8 36.5 19.2 20.2 18.5Z",
  WI: "M28.5 8.2 50.8 6.5 55.2 18.8 57.5 36.2 54.8 52.5 47.2 68.8 29.5 64.2 22.8 48.5 21.5 28.8 25.2 16.5Z",
  CT: "M14.5 29.5 66.2 23.8 68.5 41.2 64.8 52.5 16.8 54.2 12.5 41.8Z",
  PA: "M10.5 27.2 68.8 20.5 72.2 34.8 70.5 50.2 18.2 56.8 8.8 42.5Z",
};

export function StateIcon({
  abbr,
  className,
  title,
}: {
  abbr: string;
  className?: string;
  title?: string;
}) {
  const code = abbr.toUpperCase();
  const state = getStateByAbbr(code);
  const label = title ?? state?.name ?? code;
  const path = OUTLINES[code];

  if (!path) {
    return (
      <span
        className={cx(
          "inline-flex items-center justify-center border border-current font-mono text-[0.32em] font-medium tracking-[0.18em] uppercase",
          className,
        )}
        aria-label={label}
        title={label}
      >
        {code}
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 80 80"
      className={cx("shrink-0", className)}
      fill="currentColor"
      fillRule="evenodd"
      role="img"
      aria-label={label}
    >
      <title>{label}</title>
      <path d={path} />
    </svg>
  );
}

export function StateMark({
  abbr,
  href,
  tone = "onDark",
  size = "hero",
}: {
  abbr: string;
  href?: string;
  tone?: "onDark" | "onLight";
  size?: "hero" | "card";
}) {
  const state = getStateByAbbr(abbr);
  const name = state?.name ?? abbr;
  const hero = size === "hero";
  const className = cx(
    "flex flex-col items-center gap-2 text-center no-underline",
    tone === "onDark"
      ? "text-white/80 hover:text-white"
      : "text-muted hover:text-foreground",
  );
  const inner = (
    <>
      <StateIcon
        abbr={abbr}
        title={name}
        className={hero ? "h-20 w-20 sm:h-28 sm:w-28" : "h-11 w-11"}
      />
      <span
        className={cx(
          "font-mono tracking-[0.2em] uppercase",
          hero ? "text-[11px]" : "text-[10px]",
        )}
      >
        {abbr}
        <span className="mt-0.5 block tracking-[0.16em]">{name}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} aria-label={`Quotes from ${name}`}>
        {inner}
      </Link>
    );
  }

  return (
    <div className={className} aria-label={`Quotes from ${name}`}>
      {inner}
    </div>
  );
}
