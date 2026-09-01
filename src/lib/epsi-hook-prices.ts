import { usd2 } from "@/lib/quoting";
import { usawfPart, type HookPartFamily } from "@/lib/part-numbers";

/** 5% under published 0.180 in / 0.250 in round-wire boxes. */
export const EPSI_HOOK_UNDERCUT = 0.05;

export type EpsiHookStyle = "v" | "s" | "c" | "cv" | "90v";

type PublishedEpsiBox = {
  style: EpsiHookStyle;
  dIn: 0.18 | 0.25;
  lengthIn: number;
  qty: number;
  boxUsd: number;
  bowlIn?: number;
  legIn?: number;
};

/**
 * HV / HC / HS / HCV / HV90 boxes whose wire is in this cell.
 * 0.180 in = 4.57 mm. 0.250 in = 6.35 mm. 0.060–0.120 in is under 4 mm — omitted.
 * Geometry and qty match the published series cards. Not catalog SKU strings.
 */
const EPSI_BOXES: PublishedEpsiBox[] = [
  { style: "v", dIn: 0.18, lengthIn: 4, qty: 500, boxUsd: 75.64, legIn: 0.81 },
  { style: "v", dIn: 0.18, lengthIn: 6, qty: 500, boxUsd: 94.38, legIn: 1 },
  { style: "v", dIn: 0.25, lengthIn: 6, qty: 250, boxUsd: 138.15, legIn: 1 },
  { style: "v", dIn: 0.18, lengthIn: 8, qty: 500, boxUsd: 107.3, legIn: 1 },
  { style: "v", dIn: 0.25, lengthIn: 8, qty: 250, boxUsd: 148.23, legIn: 1 },
  { style: "v", dIn: 0.18, lengthIn: 12, qty: 250, boxUsd: 84.37, legIn: 1 },
  { style: "v", dIn: 0.25, lengthIn: 12, qty: 200, boxUsd: 161.18, legIn: 1 },
  { style: "v", dIn: 0.25, lengthIn: 15, qty: 150, boxUsd: 146.89, legIn: 1 },
  { style: "v", dIn: 0.18, lengthIn: 18, qty: 250, boxUsd: 117.85, legIn: 1 },
  { style: "v", dIn: 0.25, lengthIn: 18, qty: 125, boxUsd: 133.74, legIn: 1 },
  { style: "v", dIn: 0.18, lengthIn: 24, qty: 100, boxUsd: 63.85, legIn: 1 },
  { style: "v", dIn: 0.25, lengthIn: 24, qty: 100, boxUsd: 117.45, legIn: 1 },
  { style: "c", dIn: 0.18, lengthIn: 6, qty: 500, boxUsd: 89.52, bowlIn: 1.5 },
  { style: "c", dIn: 0.25, lengthIn: 6, qty: 250, boxUsd: 129.75, bowlIn: 1.5 },
  { style: "c", dIn: 0.18, lengthIn: 8, qty: 500, boxUsd: 115.36, bowlIn: 1.5 },
  { style: "c", dIn: 0.18, lengthIn: 12, qty: 250, boxUsd: 97.04, bowlIn: 1.5 },
  { style: "c", dIn: 0.25, lengthIn: 12, qty: 200, boxUsd: 259.47, bowlIn: 1.5 },
  { style: "c", dIn: 0.18, lengthIn: 18, qty: 250, boxUsd: 141.22, bowlIn: 1.5 },
  { style: "c", dIn: 0.25, lengthIn: 18, qty: 125, boxUsd: 194.65, bowlIn: 1.5 },
  { style: "s", dIn: 0.18, lengthIn: 6, qty: 500, boxUsd: 102.65, bowlIn: 1.5 },
  { style: "s", dIn: 0.25, lengthIn: 6, qty: 250, boxUsd: 115.08, bowlIn: 1.5 },
  { style: "s", dIn: 0.25, lengthIn: 8, qty: 250, boxUsd: 115.9, bowlIn: 1.5 },
  { style: "s", dIn: 0.25, lengthIn: 10, qty: 250, boxUsd: 131.02, bowlIn: 1.5 },
  { style: "s", dIn: 0.18, lengthIn: 12, qty: 250, boxUsd: 89.7, bowlIn: 1.5 },
  { style: "s", dIn: 0.25, lengthIn: 12, qty: 200, boxUsd: 134.26, bowlIn: 1.5 },
  { style: "s", dIn: 0.18, lengthIn: 18, qty: 250, boxUsd: 120.29, bowlIn: 1.5 },
  { style: "s", dIn: 0.25, lengthIn: 18, qty: 250, boxUsd: 208.04, bowlIn: 1.5 },
  { style: "cv", dIn: 0.18, lengthIn: 6, qty: 500, boxUsd: 108.65, bowlIn: 1.5 },
  { style: "cv", dIn: 0.18, lengthIn: 8, qty: 500, boxUsd: 121.02, bowlIn: 1.5 },
  { style: "cv", dIn: 0.18, lengthIn: 10, qty: 250, boxUsd: 75.41, bowlIn: 1.5 },
  { style: "cv", dIn: 0.18, lengthIn: 12, qty: 250, boxUsd: 98.04, bowlIn: 1.5 },
  { style: "cv", dIn: 0.25, lengthIn: 12, qty: 200, boxUsd: 142.2, bowlIn: 1.5 },
  { style: "cv", dIn: 0.18, lengthIn: 18, qty: 250, boxUsd: 116.82, bowlIn: 1.5 },
  { style: "cv", dIn: 0.18, lengthIn: 24, qty: 100, boxUsd: 78.19, bowlIn: 1.5 },
  { style: "90v", dIn: 0.18, lengthIn: 6, qty: 500, boxUsd: 106.25, legIn: 1 },
  { style: "90v", dIn: 0.25, lengthIn: 6, qty: 250, boxUsd: 109.1, legIn: 1 },
  { style: "90v", dIn: 0.25, lengthIn: 8, qty: 250, boxUsd: 130.31, legIn: 1 },
  { style: "90v", dIn: 0.18, lengthIn: 12, qty: 250, boxUsd: 89.76, legIn: 1 },
  { style: "90v", dIn: 0.25, lengthIn: 12, qty: 200, boxUsd: 165.53, legIn: 1 },
];

const FAMILY: Record<EpsiHookStyle, HookPartFamily> = {
  v: "V",
  s: "S",
  c: "C",
  cv: "CV",
  "90v": "V90",
};

export const EPSI_HOOK_STYLE_LABEL: Record<EpsiHookStyle, string> = {
  v: "V-hooks",
  s: "S-hooks",
  c: "C-hooks",
  cv: "CV-hooks",
  "90v": "90° V-hooks",
};

export const EPSI_HOOK_STYLE_HREF: Record<EpsiHookStyle, string> = {
  v: "/powder-coating-hooks/v-hooks",
  s: "/powder-coating-hooks/s-hooks",
  c: "/powder-coating-hooks/c-hooks",
  cv: "/powder-coating-hooks/cv-hooks",
  "90v": "/powder-coating-hooks/90-degree-hooks",
};

export const EPSI_HOOK_LINE =
  "USAWF part numbers. Round-wire 0.180 in and 0.250 in V, C, S, CV, and 90° V boxes — same length, hang, and box count as the published cards we list. 5% under those boxes. Carbon. 100-piece minimum. Nothing under 4 mm.";

export const EPSI_HOOK_REFUSE = [
  {
    name: "0.060 / 0.080 / 0.120 in HV, HC, HS, HCV, HV90",
    why: "Under 4 mm. This cell starts at 4 mm.",
  },
  {
    name: "HKVL locking V (0.044–0.080 in)",
    why: "Published locking-V bags in this family are 0.044–0.080 in, under 4 mm. Round-wire locking V in 4–14 mm is a print, not those bags.",
  },
  {
    name: "HKD diamond hooks",
    why: "Square wire, flat-to-flat. This cell is round coil.",
  },
  {
    name: "C-LAW / CLAW 200, 300, 400",
    why: "Three-prong clamp. CLAW 200/300 are also under 4 mm. CLAW 400 is 4 mm but not a 2D C/V path. We do not stock it.",
  },
  {
    name: "HKRO spring-tube hooks",
    why: "Wound spring tube, 1–3 mm. Not a Robomac 214TF job.",
  },
  {
    name: "Swivel hooks",
    why: "Ball-bearing assembly. We form wire. We do not assemble swivels.",
  },
  {
    name: "WMK wheel-hook system",
    why: "A hanging kit, not a round-wire form from coil.",
  },
  {
    name: "Sheet and pipe suspenders",
    why: "Sheet/pipe hangers, not 4–14 mm round-wire CNC.",
  },
] as const;

export type EpsiHookRow = {
  style: EpsiHookStyle;
  sku: string;
  dIn: 0.18 | 0.25;
  inch: string;
  mmLabel: string;
  lengthIn: number;
  qty: number;
  bagUsd: number;
  pieceUsd: number;
  bowlIn?: number;
  legIn?: number;
};

function cents(n: number) {
  return Math.round(n * 100) / 100;
}

export function epsiHookRows(style?: EpsiHookStyle): EpsiHookRow[] {
  const cut = 1 - EPSI_HOOK_UNDERCUT;
  return EPSI_BOXES.filter((row) => !style || row.style === style).map(
    (row) => {
      const bagUsd = cents(row.boxUsd * cut);
      const wire = row.dIn === 0.18 ? "180" : "250";
      return {
        style: row.style,
        sku: usawfPart(FAMILY[row.style], wire, row.lengthIn),
        dIn: row.dIn,
        inch: row.dIn === 0.18 ? "0.180 in" : "0.250 in",
        mmLabel: row.dIn === 0.18 ? "4.57 mm" : "6.35 mm",
        lengthIn: row.lengthIn,
        qty: row.qty,
        bagUsd,
        pieceUsd: cents(bagUsd / row.qty),
        bowlIn: row.bowlIn,
        legIn: row.legIn,
      };
    },
  );
}

export function formatEpsiHookUsd(amount: number) {
  return usd2(amount);
}

export const EPSI_HOOK_STYLES: EpsiHookStyle[] = [
  "v",
  "c",
  "s",
  "cv",
  "90v",
];
