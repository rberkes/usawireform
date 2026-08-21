/** Centerline polylines in inches. Y is up. */

export type Vec3 = [number, number, number];
export type Polyline = Vec3[];

function arc(
  cx: number,
  cy: number,
  cz: number,
  radius: number,
  a0: number,
  a1: number,
  segs = 24,
  plane: "xy" | "xz" | "yz" = "xy",
): Polyline {
  const pts: Polyline = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const a = a0 + (a1 - a0) * t;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    if (plane === "xy") pts.push([cx + radius * cos, cy + radius * sin, cz]);
    else if (plane === "xz") pts.push([cx + radius * cos, cy, cz + radius * sin]);
    else pts.push([cx, cy + radius * cos, cz + radius * sin]);
  }
  return pts;
}

function line(a: Vec3, b: Vec3, segs = 1): Polyline {
  if (segs <= 1) return [a, b];
  const pts: Polyline = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    pts.push([
      a[0] + (b[0] - a[0]) * t,
      a[1] + (b[1] - a[1]) * t,
      a[2] + (b[2] - a[2]) * t,
    ]);
  }
  return pts;
}

function circle(
  cx: number,
  cy: number,
  cz: number,
  radius: number,
  segs = 48,
  plane: "xy" | "xz" | "yz" = "xy",
): Polyline {
  return arc(cx, cy, cz, radius, 0, Math.PI * 2, segs, plane);
}

function gridXY(
  x0: number,
  y0: number,
  z: number,
  w: number,
  h: number,
  cols: number,
  rows: number,
): Polyline[] {
  const lines: Polyline[] = [];
  for (let i = 0; i <= cols; i++) {
    const x = x0 + (w / cols) * i;
    lines.push(line([x, y0, z], [x, y0 + h, z]));
  }
  for (let j = 0; j <= rows; j++) {
    const y = y0 + (h / rows) * j;
    lines.push(line([x0, y, z], [x0 + w, y, z]));
  }
  return lines;
}

function join(...parts: Polyline[]): Polyline {
  const out: Polyline = [];
  for (const part of parts) {
    for (const p of part) {
      const last = out[out.length - 1];
      if (last && last[0] === p[0] && last[1] === p[1] && last[2] === p[2]) continue;
      out.push(p);
    }
  }
  return out;
}

function angle(ux: number, uy: number, vx: number, vy: number) {
  const sign = ux * vy - uy * vx < 0 ? -1 : 1;
  const dot = Math.max(
    -1,
    Math.min(1, (ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy))),
  );
  return sign * Math.acos(dot);
}

/** SVG elliptical arc → polyline in SVG coordinates (Y down). */
function svgArc(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  rx: number,
  ry: number,
  largeArc: boolean,
  sweep: boolean,
  segs = 24,
): Polyline {
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  if (rx < 1e-9 || ry < 1e-9) return [[x1, -y1, 0], [x2, -y2, 0]];

  const dx = (x1 - x2) / 2;
  const dy = (y1 - y2) / 2;
  const cr = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);
  if (cr > 1) {
    const s = Math.sqrt(cr);
    rx *= s;
    ry *= s;
  }

  const sign = largeArc === sweep ? -1 : 1;
  const n = rx * rx * ry * ry - rx * rx * dy * dy - ry * ry * dx * dx;
  const d = rx * rx * dy * dy + ry * ry * dx * dx;
  const coef = sign * Math.sqrt(Math.max(0, n / d));
  const cxp = (coef * rx * dy) / ry;
  const cyp = (coef * -ry * dx) / rx;
  const cx = cxp + (x1 + x2) / 2;
  const cy = cyp + (y1 + y2) / 2;

  const theta1 = angle(1, 0, (x1 - cx) / rx, (y1 - cy) / ry);
  let dtheta = angle(
    (x1 - cx) / rx,
    (y1 - cy) / ry,
    (x2 - cx) / rx,
    (y2 - cy) / ry,
  );
  if (!sweep && dtheta > 0) dtheta -= Math.PI * 2;
  if (sweep && dtheta < 0) dtheta += Math.PI * 2;

  const pts: Polyline = [];
  for (let i = 0; i <= segs; i++) {
    const t = theta1 + (dtheta * i) / segs;
    pts.push([cx + rx * Math.cos(t), -(cy + ry * Math.sin(t)), 0]);
  }
  return pts;
}

function svgLine(x1: number, y1: number, x2: number, y2: number): Polyline {
  return [
    [x1, -y1, 0],
    [x2, -y2, 0],
  ];
}

/** Map an SVG-space polyline so its height is `heightIn` inches, Y up, centered. */
function fitInches(pts: Polyline, heightIn: number): Polyline {
  let minY = Infinity;
  let maxY = -Infinity;
  let minX = Infinity;
  let maxX = -Infinity;
  for (const [x, y] of pts) {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  const span = Math.max(maxY - minY, 1e-6);
  const scale = heightIn / span;
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  return pts.map(([x, y, z]) => [(x - midX) * scale, (y - midY) * scale, z * scale]);
}

/**
 * Shop-drawing S-hook: two opposite ~240° eyes, top opening right,
 * bottom opening left. Same path as the product-page drawings.
 */
export const S_HOOK_SVG =
  "M101 22A24 24 0 1 0 80 58L80 66A24 24 0 1 1 59 102";

function sHookCenterline(): Polyline {
  const r = 0.7;
  const span = 1.5;
  const opening = (60 * Math.PI) / 180;
  return join(
    arc(r, span, 0, r, -opening, Math.PI, 32),
    line([0, span, 0], [0, -span, 0], 16),
    arc(-r, -span, 0, r, 0, Math.PI + (Math.PI - opening), 32),
  );
}

function jHookCenterline(): Polyline {
  return fitInches(
    join(svgLine(84, 18, 84, 80), svgArc(84, 80, 36, 80, 24, 24, false, true, 28)),
    4.5,
  );
}

export function polylinesForModel(id: string): Polyline[] {
  switch (id) {
    case "s-hooks":
      return [sHookCenterline()];
    case "j-hooks":
      return [jHookCenterline()];
    case "d-rings": {
      const f = 0.45;
      const half = 1.2;
      return [
        join(
          line([0, -half, 0], [0, half, 0], 12),
          arc(f, half, 0, f, Math.PI, Math.PI / 2, 12),
          arc(f, 0, 0, half + f, Math.PI / 2, -Math.PI / 2, 28),
          arc(f, -half, 0, f, -Math.PI / 2, -Math.PI, 12),
        ),
      ];
    }
    case "closed-rings":
      return [circle(0, 3, 0, 2.4, 56)];
    case "eye-forms": {
      const r = 1.15;
      return [
        circle(0, 8.2, 0, r, 36),
        line([0, 8.2 - r, 0], [0, 0, 0]),
      ];
    }
    case "u-hangers": {
      const r = 2.1;
      const leg = 6.5;
      return [
        join(
          line([-r, r + leg, 0], [-r, r, 0]),
          arc(0, r, 0, r, Math.PI, Math.PI * 2, 28),
          line([r, r, 0], [r, r + leg, 0]),
        ),
      ];
    }
    case "pipe-hangers": {
      const r = 2.2;
      return [
        circle(0, r, 0, r, 48),
        line([0, r * 2, 0], [0, r * 2 + 2.4, 0]),
        line([-1.1, r * 2 + 2.4, 0], [1.1, r * 2 + 2.4, 0]),
      ];
    }
    case "hose-hangers": {
      const r = 1.35;
      const stem = line([0, 0, 0], [0, 9.5, 0]);
      const hook = (y: number, z: number) =>
        join(
          line([0, y, z], [0.4, y, z]),
          arc(0.4 + r, y, z, r, Math.PI, Math.PI * 1.85, 20),
        );
      return [stem, hook(6.4, 0), hook(3.1, 0)];
    }
    case "handles": {
      const r = 1.8;
      const width = 6;
      const drop = 3.2;
      return [
        join(
          line([-width / 2, 0, 0], [-width / 2, drop, 0]),
          arc(-width / 2 + r, drop, 0, r, Math.PI, Math.PI / 2, 16),
          line([-width / 2 + r, drop + r, 0], [width / 2 - r, drop + r, 0]),
          arc(width / 2 - r, drop, 0, r, Math.PI / 2, 0, 16),
          line([width / 2, drop, 0], [width / 2, 0, 0]),
        ),
      ];
    }
    case "ground-staples": {
      const w = 4;
      const leg = 7;
      const r = 0.45;
      return [
        join(
          line([-w / 2, 0, 0], [-w / 2, leg - r, 0]),
          arc(-w / 2 + r, leg - r, 0, r, Math.PI, Math.PI / 2, 10),
          line([-w / 2 + r, leg, 0], [w / 2 - r, leg, 0]),
          arc(w / 2 - r, leg - r, 0, r, Math.PI / 2, 0, 10),
          line([w / 2, leg - r, 0], [w / 2, 0, 0]),
        ),
      ];
    }
    case "machine-guards": {
      const w = 10;
      const h = 7;
      const depth = 4;
      const lines = [
        ...gridXY(-w / 2, 0, 0, w, h, 5, 4),
        line([-w / 2, 0, 0], [-w / 2, 0, depth]),
        line([w / 2, 0, 0], [w / 2, 0, depth]),
        line([-w / 2, h, 0], [-w / 2, h, depth]),
        line([w / 2, h, 0], [w / 2, h, depth]),
        ...gridXY(-w / 2, 0, depth, w, h, 5, 4),
      ];
      return lines;
    }
    case "heavy-duty-wire-baskets": {
      const w = 9;
      const d = 6;
      const h = 4;
      const bottom = [];
      for (let i = 0; i <= 4; i++) {
        const x = -w / 2 + (w / 4) * i;
        bottom.push(line([x, 0, -d / 2], [x, 0, d / 2]));
      }
      for (let j = 0; j <= 3; j++) {
        const z = -d / 2 + (d / 3) * j;
        bottom.push(line([-w / 2, 0, z], [w / 2, 0, z]));
      }
      const walls: Polyline[] = [
        line([-w / 2, 0, -d / 2], [-w / 2, h, -d / 2]),
        line([w / 2, 0, -d / 2], [w / 2, h, -d / 2]),
        line([-w / 2, 0, d / 2], [-w / 2, h, d / 2]),
        line([w / 2, 0, d / 2], [w / 2, h, d / 2]),
        line([-w / 2, h, -d / 2], [w / 2, h, -d / 2]),
        line([-w / 2, h, d / 2], [w / 2, h, d / 2]),
        line([-w / 2, h, -d / 2], [-w / 2, h, d / 2]),
        line([w / 2, h, -d / 2], [w / 2, h, d / 2]),
        line([-w / 2, h / 2, -d / 2], [w / 2, h / 2, -d / 2]),
        line([-w / 2, h / 2, d / 2], [w / 2, h / 2, d / 2]),
      ];
      return [...bottom, ...walls];
    }
    case "cable-trays": {
      const w = 12;
      const d = 4;
      const h = 2.2;
      const rails: Polyline[] = [
        line([-w / 2, 0, -d / 2], [w / 2, 0, -d / 2]),
        line([-w / 2, 0, d / 2], [w / 2, 0, d / 2]),
        line([-w / 2, h, -d / 2], [w / 2, h, -d / 2]),
        line([-w / 2, h, d / 2], [w / 2, h, d / 2]),
        line([-w / 2, 0, -d / 2], [-w / 2, h, -d / 2]),
        line([-w / 2, 0, d / 2], [-w / 2, h, d / 2]),
        line([w / 2, 0, -d / 2], [w / 2, h, -d / 2]),
        line([w / 2, 0, d / 2], [w / 2, h, d / 2]),
      ];
      const rungs: Polyline[] = [];
      for (let i = 0; i <= 6; i++) {
        const x = -w / 2 + (w / 6) * i;
        rungs.push(line([x, 0, -d / 2], [x, 0, d / 2]));
      }
      return [...rails, ...rungs];
    }
    case "fan-guards": {
      const rings = [1.2, 2.4, 3.6].map((r) => circle(0, 3.6, 0, r, 48));
      const spokes: Polyline[] = [];
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        spokes.push(
          line(
            [3.6 * Math.cos(a), 3.6 + 3.6 * Math.sin(a), 0],
            [1.2 * Math.cos(a), 3.6 + 1.2 * Math.sin(a), 0],
          ),
        );
      }
      return [...rings, ...spokes];
    }
    default:
      return [line([-2, 0, 0], [2, 3, 0])];
  }
}
