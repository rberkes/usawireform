import { usd2 } from "@/lib/quoting";
import { usawfPart } from "@/lib/part-numbers";

/** 5% under published 1-bag and 10-bag square-hanging cards. */
export const SQUARE_HANG_UNDERCUT = 0.05;

type PublishedSquareBag = {
  dIn: 0.18 | 0.25 | 0.375;
  lengthIn: number;
  qty: number;
  bagUsd: number;
  bag10Usd: number;
};

/**
 * Square hanging sizes that match published cards in this cell.
 * 0.120 in (3.05 mm) is below 4 mm and is omitted.
 * The 0.375 × 24 in published bag is 50 pcs — we list 100 (2× bag).
 */
const PUBLISHED_SQUARE_BAGS: PublishedSquareBag[] = [
  { dIn: 0.18, lengthIn: 4, qty: 500, bagUsd: 152, bag10Usd: 135 },
  { dIn: 0.25, lengthIn: 4, qty: 250, bagUsd: 159, bag10Usd: 142 },
  { dIn: 0.25, lengthIn: 6, qty: 250, bagUsd: 175, bag10Usd: 152 },
  { dIn: 0.375, lengthIn: 6, qty: 100, bagUsd: 298, bag10Usd: 286 },
  { dIn: 0.18, lengthIn: 8, qty: 250, bagUsd: 115, bag10Usd: 105 },
  { dIn: 0.25, lengthIn: 8, qty: 250, bagUsd: 188, bag10Usd: 161 },
  { dIn: 0.18, lengthIn: 12, qty: 250, bagUsd: 166, bag10Usd: 151 },
  { dIn: 0.25, lengthIn: 12, qty: 125, bagUsd: 164, bag10Usd: 148 },
  { dIn: 0.18, lengthIn: 18, qty: 125, bagUsd: 137, bag10Usd: 129 },
  { dIn: 0.18, lengthIn: 24, qty: 100, bagUsd: 360, bag10Usd: 344 },
  { dIn: 0.25, lengthIn: 24, qty: 125, bagUsd: 439, bag10Usd: 406 },
  { dIn: 0.375, lengthIn: 24, qty: 50, bagUsd: 621, bag10Usd: 541 },
];

function cents(n: number) {
  return Math.round(n * 100) / 100;
}

const WIRE: Record<
  PublishedSquareBag["dIn"],
  { mm: string; inch: string; code: string }
> = {
  0.18: { mm: "4.57 mm", inch: "0.180 in", code: "180" },
  0.25: { mm: "6.35 mm", inch: "0.250 in", code: "250" },
  0.375: { mm: "9.53 mm", inch: "0.375 in", code: "375" },
};

export type SquareHangRow = {
  sku: string;
  dIn: PublishedSquareBag["dIn"];
  wireLabel: string;
  inch: string;
  lengthIn: number;
  qty: number;
  bagUsd: number;
  bag10Usd: number;
  pieceUsd: number;
};

export const SQUARE_HANG_WIRES = [
  { dIn: 0.18 as const, label: "4.57 mm", inch: "0.180 in" },
  { dIn: 0.25 as const, label: "6.35 mm", inch: "0.250 in" },
  { dIn: 0.375 as const, label: "9.53 mm", inch: "0.375 in" },
];

export const SQUARE_HANG_LINE =
  "USA Wire Form part numbers (USAWF-). Square hanging hooks, 5% under published 1-bag and 10-bag cards. Same lengths. Carbon. Steel in the lot. 100-piece minimum. 0.120 in is under 4 mm — not this cell.";

export function squareHangRows(): SquareHangRow[] {
  return PUBLISHED_SQUARE_BAGS.map((row) => {
    const factor = row.qty < 100 ? 100 / row.qty : 1;
    const qty = row.qty < 100 ? 100 : row.qty;
    const bagUsd = cents(row.bagUsd * factor * (1 - SQUARE_HANG_UNDERCUT));
    const bag10Usd = cents(row.bag10Usd * factor * (1 - SQUARE_HANG_UNDERCUT));
    const wire = WIRE[row.dIn];
    return {
      sku: usawfPart("SH", wire.code, row.lengthIn),
      dIn: row.dIn,
      wireLabel: wire.mm,
      inch: wire.inch,
      lengthIn: row.lengthIn,
      qty,
      bagUsd,
      bag10Usd,
      pieceUsd: cents(bagUsd / qty),
    };
  });
}

export function formatSquareHangUsd(amount: number) {
  return usd2(amount);
}
