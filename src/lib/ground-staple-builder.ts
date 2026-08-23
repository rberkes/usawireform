import { nearest8GaBag } from "@/lib/ground-staple-prices";
import { hookWireCode, usawfPart } from "@/lib/part-numbers";
import { ESTIMATE } from "@/lib/quoting";
import { WIRE } from "@/lib/range";
import { priceVHook, V_HOOK_SUPPLY } from "@/lib/v-hook-price";

export type StapleTopId = "square" | "round";

export const STAPLE_TOPS = [
  { id: "square" as const, label: "Square top" },
  { id: "round" as const, label: "Round top" },
];

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
    note: "Stock tooling. Heavy-duty U. Shop steel + V-hook mill math.",
  },
  {
    id: "7/16 in",
    label: "7/16 in (0.438 in) — stock",
    mm: 11.11,
    inches: 0.4375,
    stock: true,
    note: "Stock tooling. Heavy-duty U.",
  },
  {
    id: "1/2 in",
    label: "1/2 in (0.500 in) — stock",
    mm: 12.7,
    inches: 0.5,
    stock: true,
    note: "Stock tooling. Heavy-duty U.",
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
  top: StapleTopId,
  legIn: number,
  crownIn: number,
): Vec2[] {
  const half = crownIn / 2;
  if (top === "round") {
    const r = Math.max(half, 0.15);
    const segs = 16;
    const pts: Vec2[] = [{ x: -r, y: 0 }];
    pts.push({ x: -r, y: Math.max(legIn - r, 0.25) });
    for (let i = 0; i <= segs; i++) {
      const a = Math.PI + (Math.PI * i) / segs;
      pts.push({ x: r * Math.cos(a), y: legIn - r + r * Math.sin(a) + r });
    }
    pts.push({ x: r, y: Math.max(legIn - r, 0.25) });
    pts.push({ x: r, y: 0 });
    return pts;
  }
  return [
    { x: -half, y: 0 },
    { x: -half, y: legIn },
    { x: half, y: legIn },
    { x: half, y: 0 },
  ];
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
  title: string;
  bag: boolean;
  estimate: ReturnType<typeof priceVHook> & { bagQty?: number };
};

export type StapleBuildErr = { ok: false; message: string };

export function buildStapleQuote(input: {
  top: StapleTopId;
  wireIn: number;
  legIn: number;
  crownIn: number;
  quantity: number;
  materialId?: string;
}): StapleBuildOk | StapleBuildErr {
  const { top, wireIn, legIn, crownIn, quantity } = input;
  const materialId = input.materialId ?? "galvanized";

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

  const points = staplePoints(top, legIn, crownIn);
  const developedIn = Math.round(polylineLength(points) * 100) / 100;
  const cuts = 1;
  const bends = top === "square" ? 2 : 1;
  const mm = wireIn * 25.4;
  const sku = usawfPart("GS", hookWireCode(mm, wireIn), legIn);
  const title = `${top === "square" ? "Square-top" : "Round-top"} ground staple`;

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
