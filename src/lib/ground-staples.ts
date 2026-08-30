import { STOCK } from "@/lib/catalog";
import { WIRE } from "@/lib/range";

export const GROUND_STAPLE_KEYWORDS = [
  "ground staples",
  "USA made ground staples",
  "sod staples",
  "landscape staples",
  "fabric staples",
  "U-pins",
  "square-top staples",
  "round-top staples",
  "8 gauge landscape staples",
  "heavy-duty ground staples",
  "7/16 ground staples",
  "1/2 inch ground staples",
  "galvanized ground staples",
  "custom ground staples",
] as const;

export const GROUND_STAPLE_HUB = {
  path: "/ground-staples",
  title: "Ground Staples",
  description: `USA made ground staples from coil: 8 gauge landscape U-pins plus heavy 1/4, 3/8, 7/16, and 1/2 in. CNC in ${WIRE.short}. Stock ${STOCK}. 100-piece minimum. 11 gauge and 9 gauge are under 4 mm — no.`,
} as const;
