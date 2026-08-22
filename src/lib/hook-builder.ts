import { ESTIMATE, estimatePiece } from "@/lib/quoting";
import { WIRE } from "@/lib/range";
import { isShopSteelHook, priceVHook } from "@/lib/v-hook-price";
import { vExtents, vHookPoints, type Vec2 } from "@/lib/v-hook-geometry";

export type { Vec2 };
export { vHookPoints };

export const HOOK_TYPES = [
  { id: "v", label: "V-Hook", maxOverall: 48 },
  { id: "c", label: "C-Hook", maxOverall: 42 },
  { id: "cv", label: "CV-Hook", maxOverall: 42 },
  { id: "s", label: "S-Hook", maxOverall: 42 },
  { id: "90v", label: "90° V-Hook", maxOverall: 48 },
  { id: "90c", label: "90° C-Hook", maxOverall: 42 },
  { id: "90cv", label: "90° CV-Hook", maxOverall: 42 },
] as const;

export type HookTypeId = (typeof HOOK_TYPES)[number]["id"];

export const HOOK_WIRES = [
  {
    id: "4mm",
    label: "4 mm (0.157 in) — floor",
    mm: 4,
    inches: 0.157,
    stock: false,
    note: "Step up from catalog 0.120 in. In band.",
  },
  {
    id: "8mm",
    label: "8 mm (0.315 in)",
    mm: 8,
    inches: 0.315,
    stock: false,
    note: "Near catalog 0.312 in. Needs tooling.",
  },
  {
    id: "3/8 in",
    label: '3/8 in (0.375 in) — stock',
    mm: 9.53,
    inches: 0.375,
    stock: true,
    note: "Stock tooling.",
  },
  {
    id: "7/16 in",
    label: "7/16 in (0.438 in) — stock",
    mm: 11.11,
    inches: 0.4375,
    stock: true,
    note: "Stock tooling.",
  },
  {
    id: "1/2 in",
    label: "1/2 in (0.500 in) — stock",
    mm: 12.7,
    inches: 0.5,
    stock: true,
    note: "Stock tooling.",
  },
  {
    id: "other",
    label: `Other in ${WIRE.short}`,
    mm: 0,
    inches: 0,
    stock: false,
    note: "New tooling if not 3/8, 7/16, or 1/2 in.",
  },
] as const;

export type HookWireId = (typeof HOOK_WIRES)[number]["id"];

export const HOOK_MATERIALS = [
  { id: "1018", label: "1018 carbon (bright / mill)" },
  { id: "galvanized", label: "Galvanized carbon" },
  { id: "304", label: "304 stainless" },
  { id: "316", label: "316 stainless" },
] as const;

export type HookMaterialId = (typeof HOOK_MATERIALS)[number]["id"];

function dist(a: Vec2, b: Vec2) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function polylineLength(pts: Vec2[]) {
  let n = 0;
  for (let i = 1; i < pts.length; i++) n += dist(pts[i - 1], pts[i]);
  return n;
}

function arcPts(
  cx: number,
  cy: number,
  r: number,
  a0: number,
  a1: number,
  segs = 20,
): Vec2[] {
  const pts: Vec2[] = [];
  for (let i = 0; i <= segs; i++) {
    const t = a0 + ((a1 - a0) * i) / segs;
    pts.push({ x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) });
  }
  return pts;
}

export type HookBuildInput = {
  type: HookTypeId;
  wireIn: number;
  overall: number;
  legId: number;
  quantity: number;
  materialId?: string;
};

export type HookBuildOk = {
  ok: true;
  cuts: number;
  bends: number;
  developedIn: number;
  points: Vec2[];
  title: string;
  estimate: ReturnType<typeof estimatePiece> & {
    steelLb?: number;
    steelUsd?: number;
    shopSteel?: boolean;
    beatUsd?: number;
    beatRate?: number;
    subtotal?: number;
  };
};

export type HookBuildErr = { ok: false; message: string };

export function hookTypeMeta(id: HookTypeId) {
  return HOOK_TYPES.find((row) => row.id === id) ?? HOOK_TYPES[0];
}

function eyeRadius(overall: number, legId: number) {
  return Math.min(Math.max(legId * 0.55, overall * 0.18), overall * 0.26);
}

function shiftX(pts: Vec2[], dx: number): Vec2[] {
  return dx ? pts.map((p) => ({ x: p.x + dx, y: p.y })) : pts;
}

/** 90° crank in the shank so the lower hang sits off the bar. */
function cranked(top: Vec2[], bottom: Vec2[], overall: number): Vec2[] {
  const mid = overall / 2;
  return [
    ...top,
    { x: top[top.length - 1].x, y: mid + 0.35 },
    { x: bottom[0].x, y: mid + 0.35 },
    { x: bottom[0].x, y: mid - 0.35 },
    ...bottom,
  ];
}

/**
 * Round C-eye, ~210° , opening to +X.
 * Top: n-shape that drops onto a bar. Bottom: u-shape that holds a part.
 */
function cEyes(overall: number, r: number, x0 = 0) {
  const opening = (50 * Math.PI) / 180;
  return {
    top: shiftX(arcPts(r, overall - r, r, -opening, Math.PI, 24), x0),
    bottom: shiftX(arcPts(r, r, r, Math.PI, Math.PI * 2 + opening, 24), x0),
  };
}

/** Centerline in inches. Origin at the bottom of the overall envelope. Y up. */
export function hookCenterline(
  type: HookTypeId,
  overall: number,
  legId: number,
): { points: Vec2[]; bends: number } {
  const H = overall;
  const r = eyeRadius(H, legId);
  const jog = Math.max(legId, 1.5);

  if (type === "v") {
    return { bends: 4, points: vHookPoints(H, legId) };
  }

  if (type === "90v") {
    return { bends: 6, points: vHookPoints(H, legId, jog) };
  }

  if (type === "s") {
    const opening = (50 * Math.PI) / 180;
    return {
      bends: 2,
      points: [
        ...arcPts(r, H - r, r, -opening, Math.PI, 24),
        ...arcPts(-r, r, r, 0, -(Math.PI + opening), 24),
      ],
    };
  }

  if (type === "c" || type === "90c") {
    const { top, bottom } = cEyes(H, r);
    if (type === "90c") {
      return { bends: 4, points: cranked(top, cEyes(H, r, jog).bottom, H) };
    }
    return { bends: 2, points: [...top, ...bottom] };
  }

  const { run, rise } = vExtents(legId);
  const { top } = cEyes(H, r);
  const vBottom: Vec2[] = [
    { x: 0, y: rise },
    { x: run, y: 0 },
    { x: 2 * run, y: rise },
  ];
  if (type === "90cv") {
    return {
      bends: 6,
      points: cranked(top, shiftX(vBottom, jog), H),
    };
  }
  return { bends: 4, points: [...top, ...vBottom] };
}

export function buildHookQuote(input: HookBuildInput): HookBuildOk | HookBuildErr {
  const meta = hookTypeMeta(input.type);
  const { wireIn, overall, legId, quantity } = input;

  if (!Number.isFinite(wireIn) || wireIn < WIRE.minIn || wireIn > WIRE.maxIn) {
    return { ok: false, message: `${WIRE.short} only. Catalog 0.080–0.120 in is below the floor.` };
  }
  if (!Number.isFinite(overall) || overall <= 0) {
    return { ok: false, message: "Enter overall length in inches." };
  }
  if (overall > meta.maxOverall) {
    return {
      ok: false,
      message: `${meta.label} overall max ${meta.maxOverall} in.`,
    };
  }
  if (!Number.isFinite(legId) || legId <= 0) {
    return { ok: false, message: "Enter leg length ID in inches." };
  }
  if (Math.round(legId * 100) % 25 !== 0) {
    return { ok: false, message: "Leg length ID in 0.25 in steps." };
  }
  if (legId >= overall) {
    return { ok: false, message: "Leg length ID must be less than overall length." };
  }
  if (!Number.isFinite(quantity) || quantity < ESTIMATE.qtyMin) {
    return { ok: false, message: `Quantity starts at ${ESTIMATE.qtyMin}.` };
  }

  const { minOverall } = vExtents(legId);
  if (
    (input.type === "v" || input.type === "90v" || input.type === "cv" || input.type === "90cv") &&
    overall < minOverall
  ) {
    return {
      ok: false,
      message: "Overall length must clear both V legs. Lengthen the hook or shorten the leg ID.",
    };
  }

  const { points, bends } = hookCenterline(input.type, overall, legId);
  const developedIn = Math.round(polylineLength(points) * 100) / 100;
  const cuts = 1;
  const estimate = isShopSteelHook(input.type)
    ? (() => {
        const priced = priceVHook({
          developedIn,
          diameterIn: wireIn,
          quantity,
          materialId: input.materialId ?? "1018",
          cuts,
        });
        return {
          inchRate: priced.inchRate,
          forming: priced.forming,
          cut: priced.cut,
          cutCount: cuts,
          bendCost: 0,
          gross: priced.gross,
          discountRate: priced.discountRate,
          piece: priced.piece,
          setup: 0,
          lot: priced.lot,
          steelLb: priced.steelLb,
          steelUsd: priced.steelUsd,
          shopSteel: true as const,
          beatUsd: priced.beatUsd,
          beatRate: priced.beatRate,
          subtotal: priced.subtotal,
        };
      })()
    : estimatePiece({
        cuts,
        bends,
        lengthIn: developedIn,
        quantity,
      });

  return {
    ok: true,
    cuts,
    bends,
    developedIn,
    points,
    title: meta.label,
    estimate,
  };
}

export function formatInches(value: number) {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * 1000) / 1000;
  const text = Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
  return `${text}"`;
}
