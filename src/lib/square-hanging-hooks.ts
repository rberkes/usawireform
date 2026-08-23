import { usd2 } from "@/lib/quoting";

/** 5% under Argon HSQV 1-bag and 10-bag cards. */
export const SQUARE_HANG_UNDERCUT = 0.05;

type ArgonBag = {
  argonSku: string;
  dIn: 0.18 | 0.25 | 0.375;
  lengthIn: number;
  qty: number;
  bagUsd: number;
  bag10Usd: number;
};

/**
 * Argon HSQV square hanging hooks in this cell.
 * 0.120 in (3.05 mm) is below 4 mm and is omitted.
 * HSQV375-24 ships as 50 pcs there — we list 100 (2× bag).
 */
const ARGON_BAGS: ArgonBag[] = [
  { argonSku: "HSQV180-04", dIn: 0.18, lengthIn: 4, qty: 500, bagUsd: 152, bag10Usd: 135 },
  { argonSku: "HSQV250-04", dIn: 0.25, lengthIn: 4, qty: 250, bagUsd: 159, bag10Usd: 142 },
  { argonSku: "HSQV250-06", dIn: 0.25, lengthIn: 6, qty: 250, bagUsd: 175, bag10Usd: 152 },
  { argonSku: "HSQV375-06", dIn: 0.375, lengthIn: 6, qty: 100, bagUsd: 298, bag10Usd: 286 },
  { argonSku: "HSQV180-08", dIn: 0.18, lengthIn: 8, qty: 250, bagUsd: 115, bag10Usd: 105 },
  { argonSku: "HSQV250-08", dIn: 0.25, lengthIn: 8, qty: 250, bagUsd: 188, bag10Usd: 161 },
  { argonSku: "HSQV180-12", dIn: 0.18, lengthIn: 12, qty: 250, bagUsd: 166, bag10Usd: 151 },
  { argonSku: "HSQV250-12", dIn: 0.25, lengthIn: 12, qty: 125, bagUsd: 164, bag10Usd: 148 },
  { argonSku: "HSQV180-18", dIn: 0.18, lengthIn: 18, qty: 125, bagUsd: 137, bag10Usd: 129 },
  { argonSku: "HSQV180-24", dIn: 0.18, lengthIn: 24, qty: 100, bagUsd: 360, bag10Usd: 344 },
  { argonSku: "HSQV250-24", dIn: 0.25, lengthIn: 24, qty: 125, bagUsd: 439, bag10Usd: 406 },
  { argonSku: "HSQV375-24", dIn: 0.375, lengthIn: 24, qty: 50, bagUsd: 621, bag10Usd: 541 },
];

function cents(n: number) {
  return Math.round(n * 100) / 100;
}

const WIRE_LABEL: Record<ArgonBag["dIn"], { mm: string; inch: string }> = {
  0.18: { mm: "4.57 mm", inch: "0.180 in" },
  0.25: { mm: "6.35 mm", inch: "0.250 in" },
  0.375: { mm: "9.53 mm", inch: "0.375 in" },
};

export type SquareHangRow = {
  sku: string;
  argonSku: string;
  dIn: ArgonBag["dIn"];
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
  "Square hanging hooks, 5% under published HSQV 1-bag and 10-bag cards. Same lengths. Carbon. Steel in the lot. 100-piece minimum. 0.120 in is not this cell.";

function sku(dIn: ArgonBag["dIn"], lengthIn: number) {
  const d = dIn === 0.18 ? "180" : dIn === 0.25 ? "250" : "375";
  return `SH${d}-${String(lengthIn).padStart(2, "0")}`;
}

export function squareHangRows(): SquareHangRow[] {
  return ARGON_BAGS.map((row) => {
    const factor = row.qty < 100 ? 100 / row.qty : 1;
    const qty = row.qty < 100 ? 100 : row.qty;
    const bagUsd = cents(row.bagUsd * factor * (1 - SQUARE_HANG_UNDERCUT));
    const bag10Usd = cents(row.bag10Usd * factor * (1 - SQUARE_HANG_UNDERCUT));
    const wire = WIRE_LABEL[row.dIn];
    return {
      sku: sku(row.dIn, row.lengthIn),
      argonSku: row.argonSku,
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
