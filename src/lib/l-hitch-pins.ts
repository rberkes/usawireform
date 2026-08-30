import { STOCK } from "@/lib/catalog";
import { WIRE } from "@/lib/range";

export type LHitchPinLander = {
  path: "/l-hitch-pins" | "/heavy-duty-l-hitch-pins";
  title: string;
  h1: string;
  kicker: string;
  description: string;
  lede: string;
  keywords: string[];
};

export const L_HITCH_PIN_LANDERS: LHitchPinLander[] = [
  {
    path: "/l-hitch-pins",
    title: "L Hitch Pins",
    h1: "L hitch pins",
    kicker: "Trailer and implement pins",
    description: `Heavy-duty L hitch pins for trailers and implements. CNC from coil in ${WIRE.short}. Stock ${STOCK}. 90° stop. 100-piece minimum. Not a 5/8 in catalog pin.`,
    lede: "Long leg through the hitch, short leg as the stop. Trailer L hitch pins, implement L-pins, and receiver pins from coil — not a boxed 5/8 in pin we cannot run.",
    keywords: [
      "L hitch pins",
      "L hitch pin",
      "hitch pins",
      "trailer hitch pins",
      "heavy duty hitch pins",
      "L-pins",
      "linch pins",
      "USA made hitch pins",
    ],
  },
  {
    path: "/heavy-duty-l-hitch-pins",
    title: "Heavy-Duty L Hitch Pins",
    h1: "Heavy-duty L hitch pins",
    kicker: "Trailers",
    description: `Heavy-duty L hitch pins for trailers in 3/8, 7/16, and 1/2 in. CNC from coil in ${WIRE.short}. 90° stop. 100-piece minimum. 5/8 in is over this cell.`,
    lede: "Trailer hitch pins that take load: 1/2 in for receivers that want it, 7/16 and 3/8 in for implements. Formed L, not a turned pin from bar.",
    keywords: [
      "heavy duty L hitch pins",
      "heavy-duty hitch pins",
      "trailer L hitch pins",
      "1/2 inch hitch pins",
      "trailer hitch pin",
      "USA made L hitch pins",
    ],
  },
];

export function lHitchPinLander(path: LHitchPinLander["path"]) {
  const lander = L_HITCH_PIN_LANDERS.find((row) => row.path === path);
  if (!lander) throw new Error(`Missing L hitch pin lander ${path}`);
  return lander;
}
