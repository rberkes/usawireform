import { cx } from "@/lib/cx";
import { WIRE } from "@/lib/range";
import { S_HOOK_SVG } from "@/lib/wire-geometry";

/**
 * Formed S-hook centerline: two opposite ~240° eyes and a short shank.
 * Reads as a letter S — top opening right, bottom opening left.
 */
export const S_HOOK_PATH = S_HOOK_SVG;

const SIZES = [
  {
    mm: 4,
    inch: `${WIRE.minIn} in`,
    note: "Floor of the forming band",
  },
  {
    mm: 9,
    inch: "0.354 in",
    note: "Next to 3/8 in stock (9.53 mm)",
  },
  {
    mm: 14,
    inch: `${WIRE.maxIn} in`,
    note: "Ceiling of the forming band",
  },
] as const;

export function SHookDiameters({ className }: { className?: string }) {
  return (
    <div className={cx("bg-inset", className)}>
      <div className="grid gap-px bg-line sm:grid-cols-3">
        {SIZES.map((size) => (
          <figure key={size.mm} className="bg-background">
            <SHookWire mm={size.mm} />
            <figcaption className="border-t border-line px-5 py-4">
              <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                Ø {size.mm} mm
              </p>
              <p className="mt-1 text-sm text-foreground">{size.inch}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{size.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="border-t border-line px-5 py-3 font-mono text-[11px] tracking-widest text-muted uppercase">
        Same centerline · stroke is the wire
      </p>
    </div>
  );
}

function SHookWire({ mm }: { mm: number }) {
  const gid = `s-hook-${mm}mm`;

  return (
    <svg
      viewBox="0 0 160 124"
      className="h-auto w-full overflow-visible p-6 sm:p-8"
      fill="none"
      role="img"
      aria-label={`S-hook formed from ${mm} millimeter wire`}
    >
      <defs>
        <linearGradient id={gid} x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="#eceeef" />
          <stop offset="38%" stopColor="#b4bac0" />
          <stop offset="72%" stopColor="#7c848c" />
          <stop offset="100%" stopColor="#4a5158" />
        </linearGradient>
      </defs>
      <path
        d={S_HOOK_PATH}
        stroke={`url(#${gid})`}
        strokeWidth={mm}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
