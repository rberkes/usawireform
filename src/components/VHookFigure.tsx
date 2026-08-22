import type { ComponentProps } from "react";
import {
  hookCenterline,
  type HookTypeId,
} from "@/lib/hook-builder";
import { cx } from "@/lib/cx";

const CAPTION: Record<HookTypeId, string> = {
  v: "dual V · rack and part",
  "90v": "90° dual V",
  c: "open throat",
  "90c": "90° C",
  cv: "C clearance · part V",
  "90cv": "90° CV",
  s: "two opposite curves",
};

/** Shop-drawn hook silhouette. Same centerline as the builder. */
export function HookFigure({
  className,
  type = "v",
  overall = 8,
  legId = 2.5,
  label,
}: {
  className?: string;
  type?: HookTypeId;
  overall?: number;
  legId?: number;
  label?: string;
}) {
  const { points } = hookCenterline(type, overall, legId);
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of points) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }
  const pad = 1.4;
  const vb = `${minX - pad} ${-(maxY + pad)} ${maxX - minX + pad * 2} ${maxY - minY + pad * 2}`;
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${-p.y}`).join(" ");
  const sharp = type === "v" || type === "90v" || type === "cv" || type === "90cv";
  const title = label ?? "Hook";

  return (
    <figure className={cx("border border-line bg-inset text-foreground", className)}>
      <svg
        viewBox={vb}
        className="h-[min(22rem,58vw)] w-full"
        role="img"
        aria-label={title}
      >
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.22"
          strokeLinecap={sharp ? "butt" : "round"}
          strokeLinejoin={sharp ? "miter" : "round"}
          strokeMiterlimit={3}
        />
      </svg>
      <figcaption className="border-t border-line px-5 py-3 font-mono text-[11px] tracking-widest text-muted uppercase">
        {title} · {CAPTION[type]} · from coil
      </figcaption>
    </figure>
  );
}

export function VHookFigure(
  props: Omit<ComponentProps<typeof HookFigure>, "type"> & {
    jog?: boolean;
  },
) {
  const { jog, ...rest } = props;
  return <HookFigure {...rest} type={jog ? "90v" : "v"} />;
}
