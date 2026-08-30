"use client";

import { cx } from "@/lib/cx";
import { WIRE } from "@/lib/range";
import { StepCanvas } from "./StepCanvas";

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
            <StepCanvas
              source={{
                type: "wire",
                id: "s-hooks",
                diameterIn: size.mm / 25.4,
                finish: "carbon",
              }}
              autoRotate
              className="relative h-52 w-full overflow-hidden bg-inset sm:h-56"
            />
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
        Same form · 4, 9, and 14 mm · drag to orbit
      </p>
    </div>
  );
}
