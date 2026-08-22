import { ESTIMATE, estimatePiece } from "@/lib/quoting";
import { WIRE } from "@/lib/range";

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

export type Vec2 = { x: number; y: number };

/** 45° V-arms — powder-coating V-hook crotches are sharp, not radiused. */
const ARM_K = Math.SQRT1_2;

function dist(a: Vec2, b: Vec2) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function vExtents(legId: number) {
  const tip = Math.min(Math.max(legId * 0.2, 0.35), 1);
  return {
    run: legId * ARM_K,
    rise: legId * ARM_K,
    tip,
    tipRun: tip * ARM_K,
    tipRise: tip * ARM_K,
    minOverall: 2 * legId * ARM_K + 0.35,
  };
}

function dualVPoints(overall: number, legId: number, jog = 0): Vec2[] {
  const { run, rise, tipRun, tipRise } = vExtents(legId);
  const topJoin = overall - rise;
  const top: Vec2[] = [
    { x: run + tipRun, y: overall - tipRise },
    { x: run, y: overall },
    { x: 0, y: topJoin },
  ];
  const bottom: Vec2[] = [
    { x: jog, y: rise },
    { x: jog - run, y: 0 },
    { x: jog - run - tipRun, y: tipRise },
  ];
  if (!jog) return [...top, ...bottom];
  return [...top, { x: jog, y: topJoin }, ...bottom];
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
};

export type HookBuildOk = {
  ok: true;
  cuts: number;
  bends: number;
  developedIn: number;
  points: Vec2[];
  title: string;
  estimate: ReturnType<typeof estimatePiece>;
};

export type HookBuildErr = { ok: false; message: string };

export function hookTypeMeta(id: HookTypeId) {
  return HOOK_TYPES.find((row) => row.id === id) ?? HOOK_TYPES[0];
}

/** Centerline in inches. Origin at the bottom of the overall envelope. Y up. */
export function hookCenterline(
  type: HookTypeId,
  overall: number,
  legId: number,
): { points: Vec2[]; bends: number } {
  if (type === "v") {
    return { bends: 4, points: dualVPoints(overall, legId) };
  }

  if (type === "90v") {
    const jog = Math.max(vExtents(legId).run, 0.75);
    return { bends: 5, points: dualVPoints(overall, legId, jog) };
  }

  if (type === "c" || type === "90c") {
    const r = Math.max(overall / 2, 0.75);
    const pts = arcPts(0, r, r, Math.PI * 0.15, Math.PI * 1.85, 28);
    if (type === "90c") {
      const last = pts[pts.length - 1];
      pts.push({ x: last.x + r * 0.6, y: last.y });
      return { bends: 3, points: pts };
    }
    return { bends: 2, points: pts };
  }

  if (type === "s") {
    const r = Math.max(legId * 0.45, overall * 0.12, 0.6);
    return {
      bends: 2,
      points: [
        ...arcPts(-r, overall - r, r, -0.4, Math.PI, 20),
        ...arcPts(r, r, r, Math.PI, Math.PI * 2 + 0.4, 20),
      ],
    };
  }

  // CV and 90° CV: C opening on top, part V on the bottom.
  const r = Math.max(legId * 0.55, 0.8);
  const { run, rise, tipRun, tipRise } = vExtents(legId);
  const shank = Math.max(0.25, overall - 2 * rise);
  const top = arcPts(0, overall - r, r, Math.PI * 0.2, Math.PI * 1.15, 18);
  const vBottom: Vec2[] = [
    { x: 0, y: Math.max(rise, overall - 2 * r) },
    { x: 0, y: rise },
    { x: -run, y: 0 },
    { x: -run - tipRun, y: tipRise },
  ];
  const pts = [...top, ...vBottom];
  if (type === "90cv") {
    pts.splice(top.length, 0, {
      x: r * 0.7,
      y: overall - 2 * r - shank * 0.25,
    });
    return { bends: 5, points: pts };
  }
  return { bends: 4, points: pts };
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
  const estimate = estimatePiece({
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
