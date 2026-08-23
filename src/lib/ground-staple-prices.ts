import { usd2 } from "@/lib/quoting";
import { usawfPart } from "@/lib/part-numbers";

/** 5% under published USA 8-gauge landscape-staple cards. */
export const STAPLE_BAG_UNDERCUT = 0.05;

type Published8Ga = {
  dIn: 0.162;
  legIn: 6 | 12;
  qty: number;
  eachUsd: number;
};

/**
 * USA 8 ga square/round landscape staples (Sandbaggy public ladder, 23 Aug 2026).
 * 11 ga and 9 ga are under 4 mm and are not listed.
 */
const PUBLISHED_8GA: Published8Ga[] = [
  { dIn: 0.162, legIn: 6, qty: 100, eachUsd: 0.39 },
  { dIn: 0.162, legIn: 6, qty: 500, eachUsd: 0.27 },
  { dIn: 0.162, legIn: 6, qty: 1000, eachUsd: 0.24 },
  { dIn: 0.162, legIn: 6, qty: 5000, eachUsd: 0.23 },
  { dIn: 0.162, legIn: 6, qty: 10000, eachUsd: 0.23 },
  { dIn: 0.162, legIn: 6, qty: 40000, eachUsd: 0.21 },
  { dIn: 0.162, legIn: 12, qty: 100, eachUsd: 0.74 },
  { dIn: 0.162, legIn: 12, qty: 500, eachUsd: 0.53 },
  { dIn: 0.162, legIn: 12, qty: 1000, eachUsd: 0.51 },
  { dIn: 0.162, legIn: 12, qty: 5000, eachUsd: 0.51 },
  { dIn: 0.162, legIn: 12, qty: 10000, eachUsd: 0.5 },
  { dIn: 0.162, legIn: 12, qty: 40000, eachUsd: 0.41 },
];

function cents(n: number) {
  return Math.round(n * 100) / 100;
}

export type StapleBagRow = {
  sku: string;
  legIn: 6 | 12;
  wireLabel: string;
  inch: string;
  qty: number;
  listEach: number;
  ourEach: number;
  lotUsd: number;
};

export const STAPLE_BAG_LINE =
  "USA Wire Form part numbers (USAWF-). 8 gauge (4.11 mm) landscape staples, 5% under published USA 8 ga cards. Same 6 in and 12 in legs. Carbon. Steel in the lot. 100-piece minimum. 11 gauge and 9 gauge are under 4 mm — not this cell.";

export function stapleBagRows(): StapleBagRow[] {
  return PUBLISHED_8GA.map((row) => {
    const ourEach = cents(row.eachUsd * (1 - STAPLE_BAG_UNDERCUT));
    return {
      sku: usawfPart("GS", "8", row.legIn),
      legIn: row.legIn,
      wireLabel: "4.11 mm",
      inch: "8 ga / 0.162 in",
      qty: row.qty,
      listEach: row.eachUsd,
      ourEach,
      lotUsd: cents(ourEach * row.qty),
    };
  });
}

export function formatStapleUsd(amount: number) {
  return usd2(amount);
}

/** Largest published bag at or under qty; otherwise the 100-pc card. */
export function nearest8GaBag(legIn: number, qty: number) {
  const rows = stapleBagRows()
    .filter((row) => row.legIn === legIn)
    .sort((a, b) => a.qty - b.qty);
  if (rows.length === 0) return null;
  return [...rows].reverse().find((row) => row.qty <= qty) ?? rows[0];
}
