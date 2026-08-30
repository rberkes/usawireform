/** Site authority band: medium-to-heavy wire. */
export const WIRE = {
  minMm: 4,
  maxMm: 14,
  minIn: 0.157,
  maxIn: 0.551,
  metric: "4–14 mm",
  imperial: "0.157–0.551 in",
  label: "4–14 mm (0.157–0.551 in)",
  short: "4–14 mm",
} as const;

/** Diameters this shop runs as stock production sizes. */
export const COMMON_SIZES = [
  {
    fraction: "3/8 in",
    decimal: "0.375 in",
    mm: "9.53 mm",
    mmValue: 9.53,
    typical: "Frames, cable-tray wire, S-hooks, medium mesh rims, guards",
  },
  {
    fraction: "7/16 in",
    decimal: "0.4375 in",
    mm: "11.11 mm",
    mmValue: 11.11,
    typical: "Heavier frames, wire-basket rims, J-hooks, structural grid borders",
  },
  {
    fraction: "1/2 in",
    decimal: "0.500 in",
    mm: "12.7 mm",
    mmValue: 12.7,
    typical: "Structural wire, heavy trays, D-rings, L hitch pins, rod frames, furnace fixtures",
  },
] as const;
