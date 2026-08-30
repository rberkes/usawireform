import { nearest8GaBag } from "@/lib/ground-staple-prices";
import { hookWireCode, usawfPart } from "@/lib/part-numbers";
import { ESTIMATE } from "@/lib/quoting";
import { WIRE } from "@/lib/range";
import { priceVHook, V_HOOK_SUPPLY } from "@/lib/v-hook-price";

/** Inside corner radius. Still a square-top U — not a round-top pin. */
export const STAPLE_RADIUS = {
  minIn: 0.0625,
  defaultIn: 0.125,
  stepIn: 0.0625,
} as const;

/** Stock pins on this cell. Inside R is the pin wrap, not a sharp square. */
export const STAPLE_PINS = [
  {
    id: "3/8 in" as const,
    inches: 0.375,
    pinIn: 0.4,
    insideRIn: 0.2,
    label: "0.400 in pin",
  },
  {
    id: "7/16 in" as const,
    inches: 0.4375,
    pinIn: 0.5,
    insideRIn: 0.25,
    label: "1/2 in bending pin",
  },
  {
    id: "1/2 in" as const,
    inches: 0.5,
    insideRIn: 0.624,
    label: "0.624 in inside R",
  },
] as const;

export type StaplePin = (typeof STAPLE_PINS)[number];

export function staplePinForWire(wireIn: number) {
  if (!Number.isFinite(wireIn)) return undefined;
  return STAPLE_PINS.find((row) => Math.abs(row.inches - wireIn) < 0.01);
}

export function staplePinForId(id: string) {
  return STAPLE_PINS.find((row) => row.id === id);
}

export function stapleCenterlineRadius(insideRIn: number, wireIn: number) {
  const wire = Number.isFinite(wireIn) && wireIn > 0 ? wireIn : 0;
  return insideRIn + wire / 2;
}

export function minCrownForStaple(insideRIn: number, wireIn: number) {
  return stapleCenterlineRadius(insideRIn, wireIn) * 2;
}

export function roundCrownIn(value: number) {
  return Math.ceil(value * 4) / 4;
}

export function stapleRadiusMax(crownIn: number) {
  if (!Number.isFinite(crownIn) || crownIn <= 0) return STAPLE_RADIUS.minIn;
  return Math.max(STAPLE_RADIUS.minIn, crownIn / 2 - STAPLE_RADIUS.minIn);
}

export function clampStapleRadius(radiusIn: number, crownIn: number) {
  const max = stapleRadiusMax(crownIn);
  if (!Number.isFinite(radiusIn)) {
    return Math.min(STAPLE_RADIUS.defaultIn, max);
  }
  return Math.min(max, Math.max(STAPLE_RADIUS.minIn, radiusIn));
}

export const STAPLE_WIRES = [
  {
    id: "8ga",
    label: "8 ga (0.162 in / 4.11 mm) — bag card",
    mm: 4.11,
    inches: 0.162,
    stock: false,
    note: "Lightest published card in this cell. In the 4 mm floor. Not 3/8 stock tooling.",
  },
  {
    id: "1/4 in",
    label: "1/4 in (0.250 in)",
    mm: 6.35,
    inches: 0.25,
    stock: false,
    note: "In band. Needs tooling. Mill math, not an 8 ga bag.",
  },
  {
    id: "3/8 in",
    label: "3/8 in (0.375 in) — stock",
    mm: 9.53,
    inches: 0.375,
    stock: true,
    note: "Stock tooling. 0.400 in bending pin. Inside R 0.200 in.",
  },
  {
    id: "7/16 in",
    label: "7/16 in (0.438 in) — stock",
    mm: 11.11,
    inches: 0.4375,
    stock: true,
    note: "Stock tooling. 1/2 in bending pin. Inside R 0.250 in.",
  },
  {
    id: "1/2 in",
    label: "1/2 in (0.500 in) — stock",
    mm: 12.7,
    inches: 0.5,
    stock: true,
    note: "Stock tooling. Inside R 0.624 in.",
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

export type StapleWireId = (typeof STAPLE_WIRES)[number]["id"];

export const STAPLE_MATERIALS = [
  { id: "1018", label: "1018 carbon (bright / mill)" },
  { id: "galvanized", label: "Galvanized carbon" },
  { id: "304", label: "304 stainless" },
  { id: "316", label: "316 stainless" },
] as const;

export type StapleMaterialId = (typeof STAPLE_MATERIALS)[number]["id"];

export type Vec2 = { x: number; y: number };

function dist(a: Vec2, b: Vec2) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function polylineLength(pts: Vec2[]) {
  let n = 0;
  for (let i = 1; i < pts.length; i++) n += dist(pts[i - 1], pts[i]);
  return n;
}

export function staplePoints(
  legIn: number,
  crownIn: number,
  centerlineRIn: number,
): Vec2[] {
  const r = Math.max(centerlineRIn, STAPLE_RADIUS.minIn);
  const half = Math.max(crownIn, 2 * r) / 2;
  const segs = 12;
  const pts: Vec2[] = [
    { x: -half, y: 0 },
    { x: -half, y: Math.max(legIn - r, 0.25) },
  ];
  for (let i = 1; i <= segs; i++) {
    const a = Math.PI - (Math.PI / 2) * (i / segs);
    pts.push({
      x: -half + r + r * Math.cos(a),
      y: legIn - r + r * Math.sin(a),
    });
  }
  for (let i = 1; i <= segs; i++) {
    const a = Math.PI / 2 - (Math.PI / 2) * (i / segs);
    pts.push({
      x: half - r + r * Math.cos(a),
      y: legIn - r + r * Math.sin(a),
    });
  }
  pts.push({ x: half, y: 0 });
  return pts;
}

function isEightGaBag(wireIn: number, crownIn: number, legIn: number, materialId: string) {
  const carbon = materialId === "1018" || materialId === "galvanized";
  return (
    carbon &&
    Math.abs(wireIn - 0.162) < 0.008 &&
    Math.abs(crownIn - 1) < 0.06 &&
    (legIn === 6 || legIn === 12)
  );
}

export type StapleBuildOk = {
  ok: true;
  sku: string;
  cuts: number;
  bends: number;
  developedIn: number;
  points: Vec2[];
  radiusIn: number;
  pinLabel?: string;
  title: string;
  bag: boolean;
  estimate: ReturnType<typeof priceVHook> & { bagQty?: number };
};

export type StapleBuildErr = { ok: false; message: string };

export function buildStapleQuote(input: {
  wireIn: number;
  legIn: number;
  crownIn: number;
  radiusIn?: number;
  quantity: number;
  materialId?: string;
}): StapleBuildOk | StapleBuildErr {
  const { wireIn, legIn, crownIn, quantity } = input;
  const materialId = input.materialId ?? "galvanized";
  const pin = staplePinForWire(wireIn);
  const radiusIn = pin
    ? pin.insideRIn
    : clampStapleRadius(input.radiusIn ?? STAPLE_RADIUS.defaultIn, crownIn);
  const centerlineRIn = stapleCenterlineRadius(radiusIn, wireIn);
  const usedCrownIn = pin
    ? Math.max(crownIn, roundCrownIn(minCrownForStaple(radiusIn, wireIn)))
    : crownIn;

  if (!Number.isFinite(wireIn) || wireIn < WIRE.minIn || wireIn > WIRE.maxIn) {
    return {
      ok: false,
      message: `${WIRE.short} only. 11 ga and 9 ga sit under 4 mm — no.`,
    };
  }
  if (!Number.isFinite(legIn) || legIn < 2 || legIn > 24) {
    return { ok: false, message: "Leg length 2–24 in." };
  }
  if (Math.round(legIn * 100) % 25 !== 0) {
    return { ok: false, message: "Leg length in 0.25 in steps." };
  }
  if (!Number.isFinite(crownIn) || crownIn < 0.5 || crownIn > 6) {
    return { ok: false, message: "Crown 0.5–6 in." };
  }
  if (!Number.isFinite(quantity) || quantity < ESTIMATE.qtyMin) {
    return { ok: false, message: `Quantity starts at ${ESTIMATE.qtyMin}.` };
  }

  const points = staplePoints(legIn, usedCrownIn, centerlineRIn);
  const developedIn = Math.round(polylineLength(points) * 100) / 100;
  const cuts = 1;
  const bends = 2;
  const mm = wireIn * 25.4;
  const sku = usawfPart("GS", hookWireCode(mm, wireIn), legIn);
  const title = "Square-top ground staple";

  if (isEightGaBag(wireIn, crownIn, legIn, materialId)) {
    const bag = nearest8GaBag(legIn as 6 | 12, quantity);
    if (!bag) {
      return { ok: false, message: "No 8 ga bag card for that length." };
    }
    const piece = bag.ourEach;
    const lot = Math.round(piece * quantity * 100) / 100;
    const beatUsd = Math.round((bag.listEach - bag.ourEach) * quantity * 100) / 100;
    return {
      ok: true,
      sku,
      cuts,
      bends,
      developedIn,
      points,
      radiusIn,
      pinLabel: pin?.label,
      title,
      bag: true,
      estimate: {
        inchRate: 0,
        cut: 0,
        bendCost: 0,
        forming: 0,
        subtotal: bag.listEach * quantity,
        beatRate: 0.05,
        beatUsd,
        steelLb: 0,
        steelUsd: 0,
        steelUsdPerLb: V_HOOK_SUPPLY.carbonUsdPerLb,
        shopSteel: true,
        gross: lot,
        discountRate: 0,
        piece,
        lot,
        areaRatio: 1,
        bagQty: bag.qty,
      },
    };
  }

  const priced = priceVHook({
    developedIn,
    diameterIn: wireIn,
    quantity,
    materialId,
    cuts,
  });

  return {
    ok: true,
    sku,
    cuts,
    bends,
    developedIn,
    points,
    radiusIn,
    pinLabel: pin?.label,
    title,
    bag: false,
    estimate: priced,
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
