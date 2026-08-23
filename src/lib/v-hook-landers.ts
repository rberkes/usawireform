import { STOCK } from "@/lib/catalog";
import { COMPANY } from "@/lib/company";
import { WIRE } from "@/lib/range";
import type { HookMaterialId, HookTypeId, HookWireId } from "@/lib/hook-builder";

export type VHookLander = {
  path: `/${string}`;
  title: string;
  h1: string;
  kicker: string;
  description: string;
  lede: string;
  keywords: string[];
  builder?: {
    type: HookTypeId;
    wire: HookWireId;
    material?: HookMaterialId;
  };
  sections: { id: string; heading: string; body: string[] }[];
  faqs: { question: string; answer: string }[];
};

export const V_HOOK_LANDERS: VHookLander[] = [
  {
    path: "/powder-coating-v-hooks",
    title: "Powder Coating V-Hooks",
    h1: "Powder coating V-hooks",
    kicker: "Finishing hooks",
    description: `Powder coating V-hooks for wash, coat, cure, paint lines, e-coat, and racks. CNC from coil in ${WIRE.short}. Stock ${STOCK}. Custom length. 100-piece minimum.`,
    lede: "V-hooks for powder coating: a centered hang through washing, coating, curing, and production handling. Coating line hooks, paint line hooks, rack hooks, and curing oven hooks from coil — not a 9-gauge bag.",
    keywords: [
      "powder coating V-hooks",
      "V-hooks for powder coating",
      "powder coating hooks",
      "finishing hooks",
      "coating line hooks",
      "paint line hooks",
      "e-coat hooks",
      "rack hooks",
      "curing oven hooks",
      "wash line hooks",
      "conveyor hooks",
    ],
    builder: { type: "v", wire: "3/8 in" },
    sections: [
      {
        id: "line",
        heading: "Wash, coat, cure",
        body: [
          "Powder coating V-hooks locate the part so it stays put through the washer, the booth, and the oven. The crotch centers. The legs spread load. Grounding is metal-to-metal on the hang — name contact if the gun needs it.",
          "Same V for paint lines, e-coat, conveyor racks, and production hanging. Style is the hang. Diameter is the load.",
        ],
      },
      {
        id: "size",
        heading: "4–14 mm, not catalog 0.120 in",
        body: [
          `Catalog 0.080 in and 0.120 in V-hooks are below this cell. Production is ${WIRE.label}. 4 mm (0.157 in) is the step up from 0.120 in. Stock tooling is ${STOCK}. 3/8 in (0.375 in) is the everyday heavy powder coating V-hook.`,
          "We buy the steel. 3/8 in is 5% under boxed 0.375 in. 7/16 and 1/2 in are stock on this cell. 100-piece minimum. Lowest prices guaranteed — we will not be beat.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are powder coating V-hooks used for?",
        answer:
          "Hanging parts through washing, powder coating, painting, e-coat, and curing when the shop wants a centered, stable contact on a rack or conveyor.",
      },
      {
        question: "Do you form 0.120 in powder coating V-hooks?",
        answer: `No. 0.120 in is 3.05 mm — below ${WIRE.minMm} mm. The floor is 4 mm (0.157 in). Stock 3/8, 7/16, and 1/2 in.`,
      },
    ],
  },
  {
    path: "/375-v-hooks",
    title: '.375" V-Hooks',
    h1: '.375" V-hooks',
    kicker: "Stock 3/8 in",
    description: `.375" V-hooks (3/8 in) for powder coating and finishing lines. Stock tooling. CNC from coil. Custom overall length and leg ID. 100-piece minimum.`,
    lede: "3/8 in V-hooks — 0.375 in on the print. Stock tooling, powder coating and paint-line hang, custom length. The catalog size shops mean when they have outgrown 0.120 and 0.180.",
    keywords: [
      '.375" V-hooks',
      "3/8 V-hooks",
      "3/8 inch V-hooks",
      "0.375 V-hooks",
      "powder coating V-hooks",
      "steel V-hooks",
    ],
    builder: { type: "v", wire: "3/8 in" },
    sections: [
      {
        id: "stock",
        heading: "Stock 3/8 in",
        body: [
          "0.375 in is 9.53 mm. It sits in the band and on stock tooling — no new die for the wire size. Length, leg ID, and 90° rotation are still the print. We buy the steel — it is in the price, then 5% under boxed 0.375 in.",
          "Heavier than catalog 0.120 and 0.180. Lighter than 7/16 and 1/2 in when those are more hook than the part.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Are .375" V-hooks the same as 3/8 inch V-hooks?',
        answer:
          "Yes. 3/8 in = 0.375 in = 9.53 mm. Stock production size in this shop.",
      },
    ],
  },
  {
    path: "/steel-v-hooks",
    title: "Steel V-Hooks",
    h1: "Steel V-hooks",
    kicker: "Carbon coil",
    description: `Steel V-hooks for powder coating, paint, and finishing racks. 1018 or galvanized from coil in ${WIRE.short}. Stock ${STOCK}. 100-piece minimum.`,
    lede: "Everyday steel V-hooks: 1018 bright or mill into the booth, galvanized when the hook itself lives outside. Powder coating, paint line, and rack hang from coil.",
    keywords: [
      "steel V-hooks",
      "steel powder coating V-hooks",
      "powder coating V-hooks",
      "finishing hooks",
    ],
    builder: { type: "v", wire: "3/8 in", material: "1018" },
    sections: [
      {
        id: "alloy",
        heading: "1018 and galvanized",
        body: [
          "Steel V-hooks here are carbon coil. Bright or mill for line hooks that go into a booth. Galvanized when the V-hook is the finished part, not the hanger.",
          "Stainless is a different lander when the washer eats carbon.",
        ],
      },
    ],
    faqs: [
      {
        question: "What steel do you form V-hooks from?",
        answer:
          "1018 carbon is the usual. Galvanized carbon when the print wants it. We buy the steel — it is in the price. 100-piece minimum.",
      },
    ],
  },
  {
    path: "/stainless-steel-v-hooks",
    title: "Stainless Steel V-Hooks",
    h1: "Stainless steel V-hooks",
    kicker: "304 / 316",
    description: `Stainless steel V-hooks in 304 / 316 for powder coating wash lines and corrosive pretreat. CNC from coil in ${WIRE.short}. 100-piece minimum.`,
    lede: "Stainless steel V-hooks for wash chemistry that rusts carbon. 304 usual. 316 when chlorides are the spec. Same V locate, from coil.",
    keywords: [
      "stainless steel V-hooks",
      "stainless steel powder coating V-hooks",
      "304 V-hooks",
      "316 V-hooks",
    ],
    builder: { type: "v", wire: "3/8 in", material: "304" },
    sections: [
      {
        id: "why",
        heading: "Why stainless",
        body: [
          "Washers, acid pretreat, and wet racks eat carbon V-hooks. Stainless lasts on the line. Springback is higher — the program compensates if the print names 304 or 316. We buy the steel — 304 or 316 is in the price.",
        ],
      },
    ],
    faqs: [
      {
        question: "When do I need stainless steel V-hooks?",
        answer:
          "When wash chemistry or wet pretreatment rusts carbon. 304 is the usual. 316 when chlorides are named.",
      },
    ],
  },
  {
    path: "/90-degree-v-hooks",
    title: "90° V-Hooks",
    h1: "90° V-hooks",
    kicker: "Rotated hang",
    description: `90 degree V-hooks for powder coating racks: rotate the hang for clearance and part attitude. CNC from coil in ${WIRE.short}. Stock ${STOCK}.`,
    lede: "90° V-hooks take the V locate and crank it off the bar. Tight conveyor centers, oven face, rack clearance. Still a powder coating V-hook — one extra bend.",
    keywords: [
      "90 degree V-hooks",
      "90° V-hooks",
      "90 degree powder coating hooks",
      "powder coating V-hooks",
    ],
    builder: { type: "90v", wire: "3/8 in" },
    sections: [
      {
        id: "rotate",
        heading: "Off the bar",
        body: [
          "A 90 degree V-hook is a V with a right-angle offset so the part hangs beside the rack bar instead of in line with it. Call the rotation, both openings, and overall length. We buy the steel.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are 90° V-hooks for?",
        answer:
          "Rack clearance and part orientation through wash, coat, and cure when a straight V hangs into the next station or shadows the gun.",
      },
    ],
  },
  {
    path: "/heavy-duty-v-hooks",
    title: "USA Made Heavy-Duty Powder Coat V-Hooks",
    h1: "USA made heavy-duty powder coat V-hooks",
    kicker: '3/8" · 7/16" · 1/2"',
    description: `USA made heavy-duty powder coat V-hooks in 3/8, 7/16, and 1/2 in. We buy the steel. Live 3-column estimate. CNC in ${WIRE.short}. 100-piece minimum. Northeast Ohio.`,
    lede: "Heavy-duty powder coat V-hooks in the three stock sizes: 3/8, 7/16, and 1/2 in. Made in the USA. We buy the steel — it is in the price. 3/8 in is 5% under boxed 0.375 in. 7/16 and 1/2 in are stock on this cell.",
    keywords: [
      "USA made heavy-duty powder coat V-hooks",
      "heavy duty powder coat V-hooks",
      "heavy-duty V-hooks",
      "heavy duty powder coating V-hooks",
      "3/8 V-hooks",
      "7/16 V-hooks",
      "1/2 V-hooks",
      "powder coating V-hooks",
    ],
    sections: [
      {
        id: "sizes",
        heading: "3/8, 7/16, and 1/2 in",
        body: [
          "Three stock columns. We buy the steel. 3/8 in (0.375 in) is $1.00 per cut and $0.09 per developed inch, plus the wire, then 5% under boxed 0.375 in. Bends are in the drawing, not billed.",
          "7/16 in and 1/2 in are stock on this cell — not a boxed 0.375 catalog size. The inch rate is the 3/8 in rate times (d ÷ 3/8)², plus more steel, then the same 5% off.",
          `Catalog 0.044–0.120 in V-hooks are below this cell. 0.180 in and 0.250 in are 4.57 mm and 6.35 mm — bag prices on /powder-coating-hook-prices. Production is ${WIRE.label}. Steel is in the estimate.`,
        ],
      },
      {
        id: "usa",
        heading: "Made in the USA",
        body: [
          `${COMPANY} CNC-forms USA made heavy-duty powder coat V-hooks in Northeast Ohio. Dual V — rack crotch, shank, part trough. 100-piece minimum. Lowest prices guaranteed. We will not be beat.`,
        ],
      },
    ],
    faqs: [
      {
        question: "What sizes are USA made heavy-duty powder coat V-hooks?",
        answer: `Stock 3/8, 7/16, and 1/2 in. ${WIRE.short}. Not a boxed 0.120 in catalog hook.`,
      },
      {
        question: "How is 3/8 in priced?",
        answer:
          "One cut at $1.00, plus $0.09 per developed inch on 3/8 in, plus the steel we buy, then 5% off boxed 0.375 in. Quantity −5% at 1,000 and −10% at 10,000. Steel is included.",
      },
      {
        question: "How are 7/16 in and 1/2 in priced?",
        answer:
          "Same cut as 3/8 in. Those sizes are stock here. The inch rate scales with section: 7/16 in is (7/16 ÷ 3/8)² times the 3/8 in inch rate. 1/2 in is (1/2 ÷ 3/8)². Steel mass scales with diameter. Same 5% off. We buy the wire.",
      },
    ],
  },
  {
    path: "/custom-v-hooks",
    title: "Custom V-Hooks",
    h1: "Custom V-hooks",
    kicker: "Your print",
    description: `Custom V-hooks: length, leg ID, 90° rotation, and wire size on the print. CNC from coil in ${WIRE.short}. 100-piece minimum. Instant estimate in the builder.`,
    lede: "Custom V-hooks are a print, not a boxed SKU. Overall length, leg ID, diameter, alloy. We buy the steel. The builder estimates forming plus wire.",
    keywords: [
      "custom V-hooks",
      "custom powder coating V-hooks",
      "custom powder coating hooks",
      "V-hooks for powder coating",
    ],
    builder: { type: "v", wire: "3/8 in" },
    sections: [
      {
        id: "print",
        heading: "What to name",
        body: [
          "Style (V or 90° V), overall length, leg ID, wire diameter, alloy. STEP or PDF if the V is not the shop drawing. 100-piece minimum.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you make custom V-hooks?",
        answer: `Yes. Length, leg ID, 90° rotation, diameter, and alloy on the print. ${WIRE.short}. 100-piece minimum. We buy the steel.`,
      },
    ],
  },
];

export function vHookLander(path: VHookLander["path"]) {
  const page = V_HOOK_LANDERS.find((item) => item.path === path);
  if (!page) throw new Error(`Unknown V-hook lander: ${path}`);
  return page;
}
