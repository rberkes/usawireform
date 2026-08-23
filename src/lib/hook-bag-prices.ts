import { usd2 } from "@/lib/quoting";
import { usawfPart } from "@/lib/part-numbers";

/** 2% under published 0.180 in / 0.250 in bag prices. */
export const HOOK_BAG_UNDERCUT = 0.02;

export type HookBagStyle = "v" | "s" | "c";

type PublishedBag = {
  style: HookBagStyle;
  dIn: 0.18 | 0.25;
  lengthIn: number;
  qty: number;
  bagUsd: number;
};

/**
 * Published 0.180 in (4.57 mm) and 0.250 in (6.35 mm) bag cards —
 * the only All-hooks catalog diameters that sit in 4–10 mm.
 * Light 0.044–0.120 in is below this cell and is not listed.
 */
const PUBLISHED_BAGS: PublishedBag[] = [
  { style: "v", dIn: 0.18, lengthIn: 4, qty: 500, bagUsd: 126 },
  { style: "v", dIn: 0.18, lengthIn: 6, qty: 500, bagUsd: 163 },
  { style: "v", dIn: 0.18, lengthIn: 7, qty: 500, bagUsd: 171 },
  { style: "v", dIn: 0.18, lengthIn: 8, qty: 250, bagUsd: 100 },
  { style: "v", dIn: 0.18, lengthIn: 10, qty: 250, bagUsd: 115 },
  { style: "v", dIn: 0.18, lengthIn: 12, qty: 250, bagUsd: 126 },
  { style: "v", dIn: 0.18, lengthIn: 14, qty: 250, bagUsd: 255 },
  { style: "v", dIn: 0.18, lengthIn: 18, qty: 250, bagUsd: 305 },
  { style: "v", dIn: 0.18, lengthIn: 24, qty: 250, bagUsd: 599 },
  { style: "v", dIn: 0.25, lengthIn: 4, qty: 250, bagUsd: 294 },
  { style: "v", dIn: 0.25, lengthIn: 6, qty: 250, bagUsd: 297 },
  { style: "v", dIn: 0.25, lengthIn: 8, qty: 250, bagUsd: 315 },
  { style: "v", dIn: 0.25, lengthIn: 10, qty: 250, bagUsd: 357 },
  { style: "v", dIn: 0.25, lengthIn: 12, qty: 250, bagUsd: 392 },
  { style: "v", dIn: 0.25, lengthIn: 23, qty: 100, bagUsd: 217 },
  { style: "s", dIn: 0.18, lengthIn: 4, qty: 500, bagUsd: 126 },
  { style: "s", dIn: 0.18, lengthIn: 5, qty: 1000, bagUsd: 280 },
  { style: "s", dIn: 0.18, lengthIn: 6, qty: 500, bagUsd: 163 },
  { style: "s", dIn: 0.18, lengthIn: 7, qty: 500, bagUsd: 172 },
  { style: "s", dIn: 0.18, lengthIn: 8, qty: 250, bagUsd: 100 },
  { style: "s", dIn: 0.18, lengthIn: 10, qty: 250, bagUsd: 115 },
  { style: "s", dIn: 0.18, lengthIn: 12, qty: 250, bagUsd: 126 },
  { style: "s", dIn: 0.18, lengthIn: 14, qty: 250, bagUsd: 255 },
  { style: "s", dIn: 0.18, lengthIn: 18, qty: 250, bagUsd: 305 },
  { style: "s", dIn: 0.18, lengthIn: 24, qty: 250, bagUsd: 538 },
  { style: "s", dIn: 0.18, lengthIn: 32, qty: 200, bagUsd: 699 },
  { style: "s", dIn: 0.18, lengthIn: 36, qty: 100, bagUsd: 1000 },
  { style: "s", dIn: 0.25, lengthIn: 4, qty: 250, bagUsd: 294 },
  { style: "s", dIn: 0.25, lengthIn: 6, qty: 250, bagUsd: 381 },
  { style: "s", dIn: 0.25, lengthIn: 8, qty: 250, bagUsd: 315 },
  { style: "s", dIn: 0.25, lengthIn: 10, qty: 250, bagUsd: 357 },
  { style: "s", dIn: 0.25, lengthIn: 12, qty: 250, bagUsd: 392 },
  { style: "s", dIn: 0.25, lengthIn: 18, qty: 125, bagUsd: 191 },
  { style: "s", dIn: 0.25, lengthIn: 24, qty: 100, bagUsd: 381 },
  { style: "c", dIn: 0.18, lengthIn: 4, qty: 500, bagUsd: 126 },
  { style: "c", dIn: 0.18, lengthIn: 6, qty: 500, bagUsd: 163 },
  { style: "c", dIn: 0.18, lengthIn: 7, qty: 500, bagUsd: 171 },
  { style: "c", dIn: 0.18, lengthIn: 8, qty: 250, bagUsd: 100 },
  { style: "c", dIn: 0.18, lengthIn: 10, qty: 250, bagUsd: 115 },
  { style: "c", dIn: 0.18, lengthIn: 12, qty: 250, bagUsd: 126 },
  { style: "c", dIn: 0.25, lengthIn: 4, qty: 250, bagUsd: 294 },
  { style: "c", dIn: 0.25, lengthIn: 6, qty: 250, bagUsd: 276 },
  { style: "c", dIn: 0.25, lengthIn: 8, qty: 250, bagUsd: 315 },
  { style: "c", dIn: 0.25, lengthIn: 10, qty: 250, bagUsd: 357 },
  { style: "c", dIn: 0.25, lengthIn: 12, qty: 250, bagUsd: 392 },
  { style: "c", dIn: 0.25, lengthIn: 24, qty: 100, bagUsd: 381 },
];

export const HOOK_BAG_WIRES = [
  { mm: 4, dIn: 4 / 25.4, code: "4", label: "4 mm", inch: "0.157 in" },
  { mm: 4.57, dIn: 0.18, code: "180", label: "4.57 mm", inch: "0.180 in" },
  { mm: 5, dIn: 5 / 25.4, code: "5", label: "5 mm", inch: "0.197 in" },
  { mm: 6, dIn: 6 / 25.4, code: "6", label: "6 mm", inch: "0.236 in" },
  { mm: 6.35, dIn: 0.25, code: "250", label: "6.35 mm", inch: "0.250 in" },
  { mm: 8, dIn: 8 / 25.4, code: "8", label: "8 mm", inch: "0.315 in" },
  { mm: 10, dIn: 10 / 25.4, code: "10", label: "10 mm", inch: "0.394 in" },
] as const;

export const HOOK_BAG_ARCH_IN = 1.5;

export const HOOK_BAG_LINE =
  "USA Wire Form part numbers (USAWF-). 4–10 mm powder coating hooks, 2% under published 0.180 in and 0.250 in bag prices. Same lengths and bag counts. Carbon. Steel in the lot. 100-piece minimum. Nothing under 4 mm — 0.044–0.120 in is not this cell.";

function cents(n: number) {
  return Math.round(n * 100) / 100;
}

function pieceUsd(row: PublishedBag) {
  return row.bagUsd / row.qty;
}

function refsAtLength(style: HookBagStyle, lengthIn: number) {
  return PUBLISHED_BAGS.filter(
    (row) => row.style === style && row.lengthIn === lengthIn,
  );
}

function lengthsFor(style: HookBagStyle) {
  return [
    ...new Set(
      PUBLISHED_BAGS.filter((row) => row.style === style).map(
        (row) => row.lengthIn,
      ),
    ),
  ].sort((a, b) => a - b);
}

function priceAtDiameter(style: HookBagStyle, lengthIn: number, dIn: number) {
  const refs = refsAtLength(style, lengthIn);
  const lo = refs.find((row) => row.dIn === 0.18);
  const hi = refs.find((row) => row.dIn === 0.25);
  const cut = 1 - HOOK_BAG_UNDERCUT;

  if (lo && Math.abs(dIn - 0.18) < 1e-6) {
    const each = pieceUsd(lo) * cut;
    return { qty: lo.qty, each, bag: cents(each * lo.qty) };
  }
  if (hi && Math.abs(dIn - 0.25) < 1e-6) {
    const each = pieceUsd(hi) * cut;
    return { qty: hi.qty, each, bag: cents(each * hi.qty) };
  }

  const nearer =
    lo && hi
      ? Math.abs(dIn - 0.18) <= Math.abs(dIn - 0.25)
        ? lo
        : hi
      : (lo ?? hi);
  if (!nearer) return null;
  const each =
    pieceUsd(nearer) * ((dIn * dIn) / (nearer.dIn * nearer.dIn)) * cut;
  return { qty: nearer.qty, each, bag: cents(each * nearer.qty) };
}

export type HookBagRow = {
  style: HookBagStyle;
  sku: string;
  mm: number;
  wireLabel: string;
  inch: string;
  lengthIn: number;
  archIn: number;
  qty: number;
  bagUsd: number;
  pieceUsd: number;
};

const STYLE_FAMILY: Record<HookBagStyle, "V" | "S" | "C"> = {
  v: "V",
  s: "S",
  c: "C",
};

export function hookBagRows(style?: HookBagStyle): HookBagRow[] {
  const styles: HookBagStyle[] = style ? [style] : ["v", "s", "c"];
  const rows: HookBagRow[] = [];
  for (const kind of styles) {
    for (const wire of HOOK_BAG_WIRES) {
      for (const lengthIn of lengthsFor(kind)) {
        const priced = priceAtDiameter(kind, lengthIn, wire.dIn);
        if (!priced) continue;
        rows.push({
          style: kind,
          sku: usawfPart(STYLE_FAMILY[kind], wire.code, lengthIn),
          mm: wire.mm,
          wireLabel: wire.label,
          inch: wire.inch,
          lengthIn,
          archIn: HOOK_BAG_ARCH_IN,
          qty: priced.qty,
          bagUsd: priced.bag,
          pieceUsd: cents(priced.each),
        });
      }
    }
  }
  return rows;
}

export function formatHookBagUsd(amount: number) {
  return usd2(amount);
}

export const HOOK_BAG_STYLE_LABEL: Record<HookBagStyle, string> = {
  v: "V-hooks",
  s: "S-hooks",
  c: "C-hooks",
};
