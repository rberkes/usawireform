import { PRICE_LINE } from "@/lib/price";
import { WIRE } from "@/lib/range";

export const CLIENT_STEPS = [
  {
    title: "Upload a STEP or drawing",
    body: "Drop a STEP, SolidWorks file, or a PDF 3-view. No STEP? We model one for free from the print. Diameter, alloy, and quantity help the desk open it the first time.",
  },
  {
    title: "Get a quote with review",
    body: `Instant estimate is cuts, bends, and inches. Production quote is a person on the print. ${PRICE_LINE}`,
  },
  {
    title: "Manufacturing begins",
    body: `We program the Robomac in ${WIRE.short}, then weld, plate, or powder if the print calls it.`,
  },
  {
    title: "Parts ship from Ohio or your local state",
    body: "The forming cell is Northeast Ohio. Finished parts ship from that floor, or we arrange delivery in your state. Quotes are nationwide. 100-piece minimum.",
  },
] as const;

export const CLIENT_CTA_LEDE = `Upload a STEP and get quotes from cells that can run it. No STEP? We convert a PDF 3-view for free. Instant quote is still there for cuts, bends, and inches. ${PRICE_LINE}`;

export const HOME_QUOTE_NOTE =
  "Quotes come from wire form cells that have capacity and capability. No STEP file? We convert PDF 3-view drawings for free.";

export const HOME_HERO_LEDE =
  "Streamline wire form suppliers. Source fast and easy by capability and capacity — lowest cost, quickest time to production. Shops file the machine. Buyers upload a STEP. Quotes come from wire form cells that have capacity and capability.";

export const HOME_CTA_TITLE = "Source by capability and capacity.";

export const HOME_CTA_LEDE = HOME_QUOTE_NOTE;

export const CUT_TO_LENGTH_MM = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] as const;

export const CUT_TO_LENGTH_STOCK = [
  { fraction: "3/8 in", mm: "9.53 mm", note: "Stock. Frames, trays, medium pins." },
  { fraction: "7/16 in", mm: "11.11 mm", note: "Stock. Heavier frames and basket rims." },
  { fraction: "1/2 in", mm: "12.7 mm", note: "Stock. Structural rod and heavy blanks." },
] as const;

export function cutToLengthNote(mm: number): string {
  if (mm <= 8) return "In-line shear is typical. End smile is small.";
  if (mm <= 11) return "Shear still wins on cycle. Call out weld or hole-entry ends.";
  return "Shear shows on the face. Ask for saw if the end is inspected.";
}

export const CLIENT_SERVICES = [
  {
    href: "/work-with-us/cnc-wire-forming",
    title: "CNC wire forming",
    body: "2D and 3D from coil on a Numalliance Robomac 214TF. Your centerline, not a catalog guess.",
    points: [
      `${WIRE.label} production band`,
      "Stock diameters 3/8, 7/16, and 1/2 in",
      "100-piece minimum. Volume breaks at 1,000 and 10,000",
    ],
  },
  {
    href: "/work-with-us/cut-to-length",
    title: "Cut-to-length straight wire",
    body: "Straight blanks from coil, 4–14 mm. No bend required. Length, diameter, and end condition are the quote.",
    points: [
      "Every millimeter from 4 to 14 mm",
      "Stock 3/8, 7/16, and 1/2 in on the floor",
      "Shear or saw cutoff. Chamfer and end work as a secondary",
    ],
  },
  {
    href: "/products/heavy-duty-wire-baskets",
    title: "Wire baskets and trays",
    body: "Form, weld, and finish in one building. Heat-treat, parts, and cable paths.",
    points: [
      "Resistance and MIG where a nugget will not reach",
      "USA made baskets, racks, and cable trays",
      "Send a STEP or drawing — we model a STEP free if you need one",
    ],
  },
  {
    href: "/products/machine-guards",
    title: "Guards and frames",
    body: "Heavy frames that bolt on. Machine, fan, and equipment guards from the same cell.",
    points: [
      "3D bends and closed frames",
      "Welded assemblies, not loose sticks",
      "ITAR-registered floor for defense prints",
    ],
  },
  {
    href: "/powder-coating-hooks",
    title: "Powder coating hooks",
    body: "V, C, S, and custom hangers for the finishing line. Stock and print-built.",
    points: [
      "4–10 mm hook prices on the hook tree",
      "Custom builder for length and opening",
      "Same 100-piece production start",
    ],
  },
] as const;
