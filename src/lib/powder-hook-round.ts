import { STOCK } from "@/lib/catalog";
import { WIRE } from "@/lib/range";
import type { PowderHookNode } from "@/lib/powder-hook-tree";

const CELL = WIRE.label;
const TOOLING = STOCK;

/**
 * Round-wire 4–14 mm finishing hooks we actually form from coil.
 * Not Mighty Hook peg racks, Z-bars, TSR lock-ins, flat-stock jam, or 0.044–0.150 in catalog SKUs.
 */
export const POWDER_HOOK_ROUND_WIRE: PowderHookNode[] = [
  {
    slug: ["super-v-hooks"],
    title: "Super V-Hooks",
    h1: "Super V-hooks",
    description: `Super V-hooks from round coil in ${WIRE.short}. Same dual-V family as V-hooks, deeper Vs. Stock ${TOOLING}. We buy the steel. 100-piece minimum.`,
    lede: "A heavier dual V. Rack crotch and part trough, more opening. Round wire. Not a boxed SKU number.",
    cluster: "style",
    weight: 4,
    keywords: [
      "Super V-hooks",
      "super V hooks",
      "double V-hooks",
      "heavy V-hooks powder coating",
    ],
    alsoCalled: ["double-V hooks", "deep V-hooks", "Super V powder coating hooks"],
    sections: [
      {
        id: "what",
        heading: "What a Super V is here",
        body: [
          "Hook Authority sells Super V-hooks as a named bag. On this floor a Super V is still a round-wire dual V: sharp 45° rack hang on top, part V on the bottom, longer or wider opening than a standard V. 2D CNC from coil. Same cell as /powder-coating-hooks/v-hooks.",
          `Production is ${CELL}. Stock ${TOOLING}. 0.044–0.120 in catalog Super V bags are under 4 mm — we do not run those. 0.180 in, 0.250 in, 0.312 in, and 3/8–1/2 in Super V prints in band, yes.`,
        ],
      },
      {
        id: "print",
        heading: "What the print names",
        body: [
          "Overall length, both V openings (or included angles), wire diameter, alloy. Point or blunt ends. 100-piece minimum. We buy the steel on Super V the same as V — it is in the estimate.",
          "We do not clone a Hook Authority Super V SKU string. Send length and openings.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a Super V different from a V-hook?",
        answer:
          "Same family. Super V is a deeper or heavier dual V. If the print is a standard V, use the V-hook builder. If the Vs are larger, send the Super V print.",
      },
      {
        question: "Do you sell Hook Authority Super V bags?",
        answer: "No. We form round-wire Super V-hooks from coil in 4–14 mm.",
      },
    ],
  },
  {
    slug: ["locking-v-hooks"],
    title: "Locking V-Hooks",
    h1: "Locking V-hooks",
    description: `Locking V-hooks from round coil in ${WIRE.short}: a V plus an extra bend so the hook stays on the bar. Not an EPSI catalog SKU. 100-piece minimum.`,
    lede: "A V that does not walk off the bar. Extra bend. Round wire. 4–14 mm.",
    cluster: "style",
    weight: 4,
    keywords: [
      "locking V-hooks",
      "locking V hooks",
      "powder coating locking hooks",
      "bar lock V-hook",
    ],
    alsoCalled: ["lock-on V-hooks", "stay-on V-hooks", "bar-lock V-hooks"],
    sections: [
      {
        id: "what",
        heading: "Round-wire lock, not a catalog clip",
        body: [
          "EPSI and other houses sell locking V-hooks, often in light wire, so the hang cannot lift off the crossbar. On this floor a locking V is a round-wire V plus one more bend (or a closed wrap) that traps the bar. 2D CNC. We do not stamp a lock tab and we do not copy an EPSI SKU.",
          `If the print is 0.080 in locking V, that is under ${WIRE.minMm} mm — we name it and do not quote it as stock. If the wire is ${WIRE.short}, send the lock geometry: wrap ID, extra bend, overall, both Vs.`,
        ],
      },
      {
        id: "vs",
        heading: "Locking V vs 90° V vs snap",
        body: [
          "90° V rotates the hang. It does not lock. Snap-hooks close on the bar with spring. A locking V is a V path with a mechanical stay. Three different prints.",
          "V and 90° V: we buy the steel. A locking V is extra bends — you buy the coil unless the print is still a V we price as V. Send the drawing; the quote will say which.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you copy an EPSI locking V?",
        answer:
          "We form the round-wire path in 4–14 mm from a print. We do not stock EPSI locking SKUs or 0.080 in bags.",
      },
    ],
  },
  {
    slug: ["z-hooks"],
    title: "Z-Hooks",
    h1: "Z-hooks",
    description: `Z-hooks from round coil in ${WIRE.short}: a Z path, two offsets. We form the hook. We do not make Mighty Hook Z-Bar-LT, Z-Bar-HV, or lock-in clips for those bars.`,
    lede: "A round-wire Z. Two cranks. 2D CNC. Not a Z-bar system.",
    cluster: "style",
    weight: 4,
    keywords: [
      "Z-hooks",
      "Z hooks powder coating",
      "Z-bar hooks",
      "offset finishing hooks",
    ],
    alsoCalled: ["offset hooks", "crank hooks", "Z finishing hooks"],
    sections: [
      {
        id: "what",
        heading: "The wire form, not the bar",
        body: [
          "Mighty Hook’s Z-hooks are made to lock into their Z-Bar-LT and Z-Bar-HV. Arrow, diamond, HV, jam, and out styles on that bar are their hanging system. We do not fabricate Z-bars, and we do not form the light lock-in clips that only fit those bars.",
          `What we form is a round-wire Z: two offsets, a shank, cutoff. Same alphabet as /processes/wire-form-shapes. ${CELL}. Stock ${TOOLING}. 100-piece minimum. You buy the coil.`,
        ],
      },
      {
        id: "print",
        heading: "What to send",
        body: [
          "Both offset heights, both radii or bend angles, overall length, which way the ends point, wire diameter, alloy. STEP or a dimensioned 2D. If the part only works in a Mighty Hook Z-bar slot, that print stays with Mighty Hook.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you make Z-Bar-LT or Z-Bar-HV hooks?",
        answer:
          "No. Those lock into Mighty Hook bars. We form round-wire Z-hooks from coil in 4–14 mm that hang as a Z path, not as a proprietary clip.",
      },
      {
        question: "Is a Z-hook the same as a 90° hook?",
        answer:
          "No. 90° rotates a V, C, or CV off the bar. A Z is two offsets in plane. Different print.",
      },
    ],
  },
  {
    slug: ["jam-hooks"],
    title: "Jam Hooks",
    h1: "Jam hooks",
    description: `Round-wire jam hooks in ${WIRE.short} for large-ID internal hang. 2D CNC from coil. Not Mighty Hook JM-1–3 flat stock. Not 0.105 in JM-4/5.`,
    lede: "Internal hang: the hook springs inside a hole or tube. Round wire, 4–14 mm. Large IDs.",
    cluster: "style",
    weight: 4,
    keywords: [
      "jam hooks",
      "jam hooks powder coating",
      "internal hanging hooks",
      "tube jam hooks",
    ],
    alsoCalled: ["internal jam hooks", "tube hooks", "ID hang hooks"],
    sections: [
      {
        id: "what",
        heading: "Round wire inside a hole",
        body: [
          "A jam hook hangs the part from the inside: it springs against a tube wall or a hole. Mighty Hook JM-1, JM-2, and JM-3 are stainless flat stock with sharp corners. We do not run flat stock. JM-4 and JM-5 are 0.105 in hard-drawn round wire — under 4 mm. We do not run those SKUs.",
          `This cell forms round-wire jam hooks in ${CELL} when the ID is large enough for 4–14 mm wire and a real spring or press fit. Stock ${TOOLING}. 100-piece minimum. You buy the coil. Spring temper (A227 / A229) when it has to snap back after strip.`,
        ],
      },
      {
        id: "print",
        heading: "What the print names",
        body: [
          "Tube or hole ID range, hook length, extra tension bend if there is one, wire diameter, alloy. 60-inch customs exist in the trade — we still need the ID and the wire in band. If the ID is sized for 0.105 in wire, that is not this floor.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you make Mighty Hook JM-1 jam hooks?",
        answer:
          "No. JM-1–3 are flat stock. JM-4/5 are 0.105 in round wire, under 4 mm. We form round-wire jam hooks in 4–14 mm for large IDs from a print.",
      },
      {
        question: "Do you make spring hooks at 0.076 in?",
        answer:
          "No. That is a spring-cell diameter. Heavy round-wire internal hang in 4–14 mm, yes — send the ID.",
      },
    ],
  },
  {
    slug: ["snap-hooks"],
    title: "Snap Hooks",
    h1: "Snap hooks",
    description: `Round-wire snap hooks in ${WIRE.short} that close on a bar. Spring temper when the print wants snap-back. Not 0.044–0.120 in catalog snap SKUs.`,
    lede: "A round-wire hook that snaps onto the bar. 4–14 mm. Not a light Mighty Hook snap bag.",
    cluster: "style",
    weight: 4,
    keywords: [
      "snap hooks",
      "powder coating snap hooks",
      "bar snap hooks",
      "finishing snap hooks",
    ],
    alsoCalled: [
      "front-style snap hooks",
      "back-style snap hooks",
      "90 degree snap hooks",
    ],
    sections: [
      {
        id: "what",
        heading: "Snap on the bar, from coil",
        body: [
          "Mighty Hook snap hooks (front, back, 90°) are light hard-drawn clips that squeeze onto their bars. Catalog diameters sit under 4 mm. We do not form 0.044–0.120 in snap SKUs and we do not copy their bar lock.",
          `What we form is a round-wire snap: a path that closes on a named bar diameter, in ${CELL}. Stock ${TOOLING}. Spring wire (A227 or A229, class on the print) when it must snap for the life of the rack. 1018 if it is a formed stay that may take a set. 100-piece minimum. You buy the coil.`,
        ],
      },
      {
        id: "vs",
        heading: "Snap vs S vs locking V",
        body: [
          "S-hooks hang; they do not snap closed. Locking V adds a stay to a V. A snap hook’s job is the close on the bar. Front, back, and 90° are orientations — name which way the opening faces. Send bar Ø, opening, overall, wire.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you sell Mighty Hook front-style snap hooks?",
        answer:
          "No. Those are light catalog clips. We form round-wire snap hooks in 4–14 mm from a print.",
      },
    ],
  },
  {
    slug: ["j-hooks"],
    title: "J-Hooks",
    h1: "J-hooks",
    description: `Round-wire J-hooks in ${WIRE.short} for finishing hang and plant hang. 2D/3D CNC from coil. Stock ${TOOLING}. Not a stamped flat J.`,
    lede: "A long leg and a hook. Round coil. Powder line or plant hang — same cell.",
    cluster: "style",
    weight: 3,
    keywords: [
      "J-hooks",
      "J hooks powder coating",
      "finishing J-hooks",
      "round wire J-hooks",
    ],
    alsoCalled: ["J hangers", "open J-hooks", "plant J-hooks"],
    sections: [
      {
        id: "what",
        heading: "Round-wire J",
        body: [
          "A J-hook is 2D CNC: long leg, radius, short hook, cutoff. Finishing shops use them when a V or S is the wrong hang. Plant shops use the same form for cable, hose, and pipe. Catalog card: /products/j-hooks.",
          `Stamped flat Js with a wide saddle are not this cell. ${CELL}. Stock ${TOOLING}. 100-piece minimum. You buy the coil.`,
        ],
      },
      {
        id: "print",
        heading: "What to name",
        body: [
          "Long-leg length, hook opening, inside radius, wire diameter, alloy, whether the top is an eye or a straight. Single, double, or stacked only when the print shows it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are finishing J-hooks different from plant J-hooks?",
        answer:
          "Same round-wire form. Finish vs plant is the hang and the coating, not a different machine.",
      },
    ],
  },
];
