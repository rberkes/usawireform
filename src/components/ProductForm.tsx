import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { S_HOOK_SVG as S_HOOK_PATH } from "@/lib/wire-geometry";

/** Shop-drawing of a formed-wire part. Same stroke language as the brand mark. */
export function ProductForm({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const gid = `${slug}-wire`;
  const mesh = MESH.has(slug);

  return (
    <svg
      viewBox="0 0 160 120"
      className={cx("overflow-visible", className)}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="#eceeef" />
          <stop offset="38%" stopColor="#b4bac0" />
          <stop offset="72%" stopColor="#7c848c" />
          <stop offset="100%" stopColor="#4a5158" />
        </linearGradient>
      </defs>
      <g
        stroke={`url(#${gid})`}
        strokeWidth={mesh ? 2.4 : 7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {shape(slug)}
      </g>
    </svg>
  );
}

const MESH = new Set([
  "heavy-duty-wire-baskets",
  "cable-trays",
  "mesh-grids",
  "partition-grids",
  "security-mesh-fencing",
  "wire-shelves",
  "machine-guards",
  "conveyor-guards",
  "fan-guards",
  "wire-frames",
  "trellis-systems",
  "wire-racks",
  "magazine-racks",
  "newspaper-racks",
  "wire-displays",
  "wire-carts",
  "carts-and-trolleys",
  "dunnage-inserts",
  "bread-racks",
]);

function grid(x: number, y: number, w: number, h: number, cols: number, rows: number) {
  const lines: ReactNode[] = [];
  for (let i = 0; i <= cols; i++) {
    const px = x + (w / cols) * i;
    lines.push(<line key={`v${i}`} x1={px} y1={y} x2={px} y2={y + h} />);
  }
  for (let j = 0; j <= rows; j++) {
    const py = y + (h / rows) * j;
    lines.push(<line key={`h${j}`} x1={x} y1={py} x2={x + w} y2={py} />);
  }
  return lines;
}

function shape(slug: string): ReactNode {
  switch (slug) {
    case "s-hooks":
      return <path d={S_HOOK_PATH} />;
    case "d-rings":
      return (
        <path d="M52 28v64h22c22 0 38-14 38-32S96 28 74 28H52Z" />
      );
    case "closed-rings":
      return <circle cx="80" cy="60" r="28" />;
    case "j-hooks":
      return <path d="M84 18v62a24 24 0 0 1-48 0" />;
    case "lift-hooks":
      return (
        <>
          <circle cx="80" cy="28" r="12" />
          <path d="M80 40v28c0 18 22 22 30 8" />
        </>
      );
    case "gate-hooks":
      return (
        <>
          <path d="M44 36h28" />
          <path d="M72 24v56c18 0 30-12 30-28" />
        </>
      );
    case "trailer-latches":
      return (
        <>
          <path d="M40 44h36l8 8v20H40V44Z" />
          <path d="M84 52c18-2 36 10 28 28" />
        </>
      );
    case "display-hooks":
      return <path d="M36 28v16h88v8c0 14-18 22-32 14" />;
    case "powder-coating-hooks":
      return (
        <path
          d="M122 24 102 12 80 44 80 76 58 108 38 96"
          strokeLinejoin="miter"
        />
      );
    case "eye-forms":
      return (
        <>
          <circle cx="80" cy="34" r="14" />
          <path d="M80 48v48" />
        </>
      );
    case "load-loops":
      return <path d="M80 22c-24 0-36 22-36 42 0 24 16 40 36 40s36-16 36-40c0-20-12-42-36-42Z" />;
    case "cable-hangers":
      return <path d="M52 22h20v52a22 22 0 0 0 44 0" />;
    case "solar-hangers":
      return (
        <>
          <path d="M40 36h80" />
          <path d="M80 36v20a20 20 0 0 1-36 8" />
        </>
      );
    case "hose-hangers":
      return (
        <>
          <path d="M48 24v70" />
          <path d="M48 48c22-4 40 8 36 28" />
          <path d="M48 72c22-4 40 8 36 28" />
        </>
      );
    case "pipe-hangers":
      return (
        <>
          <circle cx="80" cy="64" r="24" />
          <path d="M80 20v20" />
          <path d="M68 20h24" />
        </>
      );
    case "u-hangers":
      return <path d="M44 24v52a36 36 0 0 0 72 0V24" />;
    case "heavy-duty-wire-baskets":
      return (
        <>
          {grid(36, 40, 88, 52, 4, 3)}
          <path d="M36 40V28h88v12" strokeWidth="3.2" />
        </>
      );
    case "cable-trays":
      return (
        <>
          <path d="M28 36v52h104V36" strokeWidth="3.2" />
          {grid(28, 36, 104, 52, 6, 1)}
        </>
      );
    case "mesh-grids":
      return <>{grid(28, 22, 104, 76, 6, 4)}</>;
    case "partition-grids":
      return (
        <>
          {grid(48, 16, 64, 88, 3, 6)}
          <path d="M48 16h64" strokeWidth="3.2" />
        </>
      );
    case "security-mesh-fencing":
      return (
        <>
          {grid(32, 18, 96, 84, 5, 5)}
          <path d="M32 18 128 102M128 18 32 102" strokeWidth="2" />
        </>
      );
    case "wire-shelves":
      return (
        <>
          {grid(28, 44, 104, 40, 6, 3)}
          <path d="M28 44V32h104v12" strokeWidth="3.2" />
        </>
      );
    case "machine-guards":
      return (
        <>
          {grid(30, 22, 100, 76, 5, 4)}
          <circle cx="36" cy="28" r="3.5" />
          <circle cx="124" cy="28" r="3.5" />
          <circle cx="36" cy="92" r="3.5" />
          <circle cx="124" cy="92" r="3.5" />
        </>
      );
    case "conveyor-guards":
      return (
        <>
          {grid(18, 34, 124, 52, 8, 2)}
          <path d="M18 34h124M18 86h124" strokeWidth="3.2" />
        </>
      );
    case "fan-guards":
      return (
        <>
          <circle cx="80" cy="60" r="38" />
          <circle cx="80" cy="60" r="22" />
          <circle cx="80" cy="60" r="8" />
          <path d="M80 22v76M42 60h76M54 34l52 52M106 34 54 86" />
        </>
      );
    case "wire-frames":
      return (
        <>
          <rect x="36" y="28" width="88" height="64" rx="2" strokeWidth="3.2" />
          <path d="M36 44h88M36 76h88M64 28v64M96 28v64" />
        </>
      );
    case "trellis-systems":
      return (
        <>
          <path d="M40 20v80M80 20v80M120 20v80" />
          <path d="M40 20 120 100M120 20 40 100M40 60h80" />
        </>
      );
    case "handles":
      return <path d="M36 78c0-36 16-52 44-52s44 16 44 52" />;
    case "l-pins":
      return (
        <>
          <path d="M112 26H58v80" />
          <circle cx="58" cy="92" r="4.5" strokeWidth="2.4" />
        </>
      );
    case "pins-and-clips":
      return (
        <>
          <path d="M80 18v84" />
          <circle cx="80" cy="22" r="10" />
          <circle cx="80" cy="96" r="4.5" strokeWidth="2.4" />
        </>
      );
    case "hitch-pin-clips":
      return (
        <path d="M70 28c-16 0-24 14-16 26 6 10 22 8 28-2V90c0 10 16 12 22 2 8-12 0-28-16-28H82" />
      );
    case "brackets":
      return <path d="M40 24v72h80M40 72h48" />;
    case "wire-racks":
      return (
        <>
          <path d="M36 28v76M124 28v76" strokeWidth="3.2" />
          {grid(36, 36, 88, 16, 5, 1)}
          {grid(36, 62, 88, 16, 5, 1)}
          {grid(36, 88, 88, 16, 5, 1)}
        </>
      );
    case "magazine-racks":
      return (
        <>
          <path d="M32 96 48 28h64l16 68H32Z" strokeWidth="3.2" />
          <path d="M52 44h56M48 64h64M44 82h72" />
        </>
      );
    case "newspaper-racks":
      return (
        <>
          <path d="M28 88V36h104v52" strokeWidth="3.2" />
          <path d="M28 88h104" strokeWidth="3.2" />
          <path d="M44 36v52M80 36v52M116 36v52" />
        </>
      );
    case "wire-displays":
      return (
        <>
          {grid(48, 16, 64, 88, 3, 6)}
          <path d="M48 40h36" strokeWidth="3.2" />
          <path d="M48 64h28" strokeWidth="3.2" />
        </>
      );
    case "wire-carts":
      return (
        <>
          {grid(44, 28, 72, 44, 4, 3)}
          <path d="M44 72v20h72V72" strokeWidth="3.2" />
          <circle cx="56" cy="98" r="8" />
          <circle cx="104" cy="98" r="8" />
        </>
      );
    case "carts-and-trolleys":
      return (
        <>
          {grid(40, 22, 64, 40, 4, 2)}
          <path d="M40 62v22h80V62" strokeWidth="3.2" />
          <path d="M120 28v56" strokeWidth="3.2" />
          <circle cx="52" cy="98" r="8" />
          <circle cx="108" cy="98" r="8" />
        </>
      );
    case "dunnage-inserts":
      return (
        <>
          <rect x="28" y="22" width="104" height="76" rx="4" strokeWidth="3.2" />
          {grid(36, 30, 88, 60, 3, 2)}
        </>
      );
    case "bread-racks":
      return (
        <>
          <path d="M40 16v88M120 16v88" strokeWidth="3.2" />
          {grid(40, 28, 80, 16, 4, 1)}
          {grid(40, 52, 80, 16, 4, 1)}
          {grid(40, 76, 80, 16, 4, 1)}
          <circle cx="48" cy="108" r="6" />
          <circle cx="112" cy="108" r="6" />
        </>
      );
    case "ground-staples":
      return <path d="M48 22v76M48 98h64M112 98V22" />;
    case "rebar-supports":
      return (
        <>
          <path d="M32 88h96" />
          <path d="M56 88V40h48v48" />
          <path d="M56 40h48" />
        </>
      );
    case "u-anchors":
      return <path d="M44 20v72a36 36 0 0 0 72 0V20" />;
    case "connecting-links":
      return (
        <>
          <path d="M44 60c0-18 12-28 28-28h8c16 0 28 10 28 28s-12 28-28 28h-8c-16 0-28-10-28-28Z" />
          <path d="M80 60c0-18 12-28 28-28h8c16 0 28 10 28 28s-12 28-28 28h-8c-16 0-28-10-28-28Z" />
        </>
      );
    case "hog-rings":
      return <path d="M48 38c0-16 16-24 32-20 20 4 32 20 32 42 0 22-12 38-32 42-16 4-32-4-32-20" />;
    default:
      return <path d="M36 84 56 28l20 48 20-48 20 56" />;
  }
}
