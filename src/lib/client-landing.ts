import { PRICE_LINE } from "@/lib/price";
import { WIRE } from "@/lib/range";

export const CLIENT_STEPS = [
  {
    title: "Upload a CAD file",
    body: "Drop a STEP, STP, IGES, PDF, DXF, or SLDPRT. Diameter, alloy, and quantity help the desk open the file the first time.",
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
    title: "Parts ship from Ohio",
    body: "Production leaves the Northeast Ohio floor. Quotes are nationwide. 100-piece minimum.",
  },
] as const;

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
    href: "/products/heavy-duty-wire-baskets",
    title: "Wire baskets and trays",
    body: "Form, weld, and finish in one building. Heat-treat, parts, and cable paths.",
    points: [
      "Resistance and MIG where a nugget will not reach",
      "USA made baskets, racks, and cable trays",
      "Send a STEP for a production number",
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
