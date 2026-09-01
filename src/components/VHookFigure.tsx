import type { ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";
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

export const HOOK_PHOTOS: Partial<
  Record<HookTypeId, { src: string; width: number; height: number }>
> = {
  v: { src: "/hooks/v.png", width: 1024, height: 1536 },
  c: { src: "/hooks/c.png", width: 1024, height: 1536 },
  cv: { src: "/hooks/cv.png", width: 1024, height: 1536 },
  s: { src: "/hooks/s.png", width: 1024, height: 1536 },
  "90v": { src: "/hooks/90v.png", width: 1024, height: 1536 },
};

const STYLE_GRID: {
  type: HookTypeId;
  href: string;
  label: string;
}[] = [
  { type: "v", href: "/powder-coating-hooks/v-hooks", label: "V-hook" },
  { type: "c", href: "/powder-coating-hooks/c-hooks", label: "C-hook" },
  { type: "cv", href: "/powder-coating-hooks/cv-hooks", label: "CV-hook" },
  { type: "s", href: "/powder-coating-hooks/s-hooks", label: "S-hook" },
];

/** Studio render when we have one; live SVG when the builder is driving length. */
export function HookFigure({
  className,
  type = "v",
  overall = 8,
  legId = 2.5,
  label,
  live = false,
}: {
  className?: string;
  type?: HookTypeId;
  overall?: number;
  legId?: number;
  label?: string;
  live?: boolean;
}) {
  const title = label ?? "Hook";
  const photo = !live ? HOOK_PHOTOS[type] : undefined;

  if (photo) {
    return (
      <figure className={cx("border border-line bg-white text-foreground", className)}>
        <Image
          src={photo.src}
          alt={title}
          width={photo.width}
          height={photo.height}
          className="h-[min(28rem,70vw)] w-full object-contain bg-white"
          sizes="(min-width: 1024px) 28rem, 90vw"
        />
        <figcaption className="border-t border-line bg-inset px-5 py-3 font-mono text-[11px] tracking-widest text-muted uppercase">
          {title} · {CAPTION[type]} · from coil
        </figcaption>
      </figure>
    );
  }

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

export function PowderHookStyleGrid({
  caption = "V, C, CV, and S from coil — mill steel, 4–14 mm.",
}: {
  caption?: string;
}) {
  return (
    <figure className="border border-line bg-white">
      <ul className="grid grid-cols-2 divide-x divide-y divide-line sm:grid-cols-4 sm:divide-y-0">
        {STYLE_GRID.map((item) => {
          const photo = HOOK_PHOTOS[item.type];
          if (!photo) return null;
          return (
            <li key={item.type}>
              <Link href={item.href} className="block hover:bg-inset/60">
                <Image
                  src={photo.src}
                  alt={item.label}
                  width={photo.width}
                  height={photo.height}
                  className="aspect-[2/3] w-full object-contain bg-white"
                  sizes="(min-width: 640px) 25vw, 50vw"
                />
                <p className="border-t border-line px-3 py-2 font-mono text-[11px] tracking-widest text-muted uppercase">
                  {item.label}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
      <figcaption className="border-t border-line bg-inset px-5 py-3 font-mono text-[11px] tracking-widest text-muted uppercase">
        {caption}
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
