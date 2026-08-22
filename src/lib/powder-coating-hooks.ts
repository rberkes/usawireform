import { STOCK } from "@/lib/catalog";
import { WIRE } from "@/lib/range";

/** Search phrases Hook Authority ranks on — used on landers, not a boxed SKU list. */
export const POWDER_COATING_HOOK_KEYWORDS = [
  "powder coating hooks",
  "powder coating hook",
  "custom powder coating hooks",
  "steel powder coating hooks",
  "stainless steel powder coating hooks",
  "V-hooks",
  "C-hooks",
  "CV-hooks",
  "S-hooks",
  "90 degree hooks",
  "90° hooks",
  "heavy-duty powder coating hooks",
  "powder coating V-hooks",
  "powder coating C-hooks",
  "powder coating S-hooks",
  "finishing hooks",
  "coating line hooks",
  "paint line hooks",
] as const;

export type PowderHookStyleId =
  | "v-hooks"
  | "c-hooks"
  | "cv-hooks"
  | "s-hooks"
  | "90-degree-hooks";

export type PowderHookStyle = {
  id: PowderHookStyleId;
  path: `/${PowderHookStyleId}`;
  title: string;
  h1: string;
  kicker: string;
  description: string;
  lede: string;
  keywords: string[];
  bestFor: string;
  hang: string;
  body: string[];
  jobs: string[];
  faqs: { question: string; answer: string }[];
};

export const POWDER_HOOK_STYLES: PowderHookStyle[] = [
  {
    id: "v-hooks",
    path: "/v-hooks",
    title: "V-Hooks",
    h1: "V-hooks",
    kicker: "Powder coating hooks",
    description: `V-hooks for powder coating, paint, and finishing lines. CNC from coil in ${WIRE.short}. Stock ${STOCK}. Custom length and included angle. 100-piece minimum.`,
    lede: "A V that centers the hang. Dual legs, a crotch, a length. Powder coating V-hooks, paint-line V-hooks, and rack V-hooks — we buy the steel.",
    keywords: [
      "V-hooks",
      "V hooks",
      "powder coating V-hooks",
      "V-hooks for powder coating",
      "steel V-hooks",
      "stainless steel V-hooks",
      "90 degree V-hooks",
    ],
    bestFor:
      "Parts that need a settled, centered hang through wash, coat, and cure.",
    hang: "The crotch locates. Legs spread load. Opening and included angle are the print.",
    body: [
      "V-hooks are 2D CNC: feed, two sharp 45° Vs, a shank, cutoff. Rack V on top, part V on the bottom, 180° rotational symmetry. Length, opening, and point or blunt ends belong on the drawing. Carbon for everyday powder coating hooks. 304 or 316 when the washer or the chemistry eats bright basic.",
      `This shop forms V-hooks in ${WIRE.label}. Stock tooling is ${STOCK}. Light catalog V-hooks at 0.080–0.250 in are a different cell — the quote says no under ${WIRE.minMm} mm.`,
    ],
    jobs: [
      "Powder coating V-hooks for rack and conveyor lines",
      "Paint-line and e-coat V-hooks",
      "Heavy-duty V-hooks for large parts",
      "Stainless steel V-hooks for corrosive wash",
    ],
    faqs: [
      {
        question: "What are V-hooks used for?",
        answer:
          "V-hooks hang parts through washing, powder coating, painting, and curing when the shop wants a centered, stable contact. The V locates; the legs spread the load.",
      },
      {
        question: "Can you form custom V-hooks?",
        answer: `Yes. Length, included angle, wire diameter, and alloy are the print. Production is ${WIRE.short}. 100-piece minimum. We buy the steel — it is in the price.`,
      },
    ],
  },
  {
    id: "c-hooks",
    path: "/c-hooks",
    title: "C-Hooks",
    h1: "C-hooks",
    kicker: "Powder coating hooks",
    description: `C-hooks for powder coating and finishing racks. Open C hang for load, unload, and clearance. CNC from coil in ${WIRE.short}. Stock ${STOCK}.`,
    lede: "An open C. Clearance on the rack, a simple hang, a fast load. Powder coating C-hooks and paint-line C-hooks from coil.",
    keywords: [
      "C-hooks",
      "C hooks",
      "powder coating C-hooks",
      "steel C-hooks",
      "stainless steel C-hooks",
      "90 degree C-hooks",
    ],
    bestFor:
      "Wide parts, rack clearance, and lines where operators load and strip all day.",
    hang: "Open throat. Gap and inside radius on the print. Pointed ends when the spec wants a bite.",
    body: [
      "C-hooks are an open ring in 2D CNC. Gap, inside radius, and whether the ends are pointed or radiused are the quote. They are the usual powder coating hook when the part needs clearance more than a locked hang.",
      `Stock ${STOCK}. Other sizes in ${WIRE.short} need tooling. Under ${WIRE.minMm} mm is not this cell. Bright carbon into the booth; 304 when the washer is wet chemistry.`,
    ],
    jobs: [
      "Powder coating C-hooks for wide parts",
      "Finishing-rack C-hooks",
      "Paint-line and curing-oven C-hooks",
      "Stainless steel C-hooks for wash lines",
    ],
    faqs: [
      {
        question: "When should I use C-hooks instead of V-hooks?",
        answer:
          "C-hooks when you need an open hang and rack clearance. V-hooks when the part has to sit centered and stay put through wash, coat, and cure.",
      },
      {
        question: "Do you make stainless steel C-hooks?",
        answer: `Yes, from 304 or 316 coil in ${WIRE.short}. You buy the coil. 100-piece minimum.`,
      },
    ],
  },
  {
    id: "cv-hooks",
    path: "/cv-hooks",
    title: "CV-Hooks",
    h1: "CV-hooks",
    kicker: "Powder coating hooks",
    description: `CV-hooks for powder coating lines: C clearance plus a V locate. CNC from coil in ${WIRE.short}. Stock ${STOCK}. Custom CV and 90° CV.`,
    lede: "C plus V. Clearance of a C-hook, locate of a V-hook. Powder coating CV-hooks when the rack needs both.",
    keywords: [
      "CV-hooks",
      "CV hooks",
      "powder coating CV-hooks",
      "steel CV-hooks",
      "stainless steel CV-hooks",
      "90 degree CV-hooks",
    ],
    bestFor:
      "Repeatable placement with enough opening to load without fighting the rack.",
    hang: "One end opens like a C. The other locates like a V. Both openings on the print.",
    body: [
      "CV-hooks mix the two common powder coating hook shapes. One opening for load and clearance, one for a settled hang. Length, both insides, and wire size are the drawing. 2D CNC from coil.",
      `90° CV-hooks rotate the hang for tight rack spacing or a different part attitude through the oven. Call the rotation on the print. Same ${WIRE.short} band.`,
    ],
    jobs: [
      "Powder coating CV-hooks for mixed part families",
      "90° CV-hooks for tight racks",
      "Stainless steel CV-hooks",
      "Heavy-duty CV-hooks in 3/8, 7/16, and 1/2 in",
    ],
    faqs: [
      {
        question: "What is a CV-hook?",
        answer:
          "A CV-hook combines a C opening and a V locate on one wire form. Shops use them when they want clearance and a repeatable hang on the same powder coating hook.",
      },
      {
        question: "Can you form 90° CV-hooks?",
        answer: `Yes. Rotation, both openings, length, and diameter on the print. ${WIRE.short}. 100-piece minimum.`,
      },
    ],
  },
  {
    id: "s-hooks",
    path: "/s-hooks",
    title: "S-Hooks",
    h1: "S-hooks",
    kicker: "Powder coating hooks",
    description: `S-hooks for powder coating, plant hang, and lift. CNC from coil in ${WIRE.short}. Stock ${STOCK}. Open or closed eyes. 100-piece minimum.`,
    lede: "Two opposite curves. Hang from a bar, hold a part. Powder coating S-hooks, plant S-hooks, and closed-eye hardware from coil.",
    keywords: [
      "S-hooks",
      "S hooks",
      "powder coating S-hooks",
      "steel S-hooks",
      "stainless steel S-hooks",
      "heavy-duty S-hooks",
    ],
    bestFor:
      "Fast line loading, general hang, and shops that already live on S-hooks.",
    hang: "Two eyes, even or offset. Open for speed. Closed when the hook has to stay on a ring.",
    body: [
      "S-hooks are the versatile powder coating hook: two radii, a shank, cutoff. They also run as plant hang and strap hardware — same cell, different print. Eyes even or offset. Closed eyes when the hook must not walk off a D-ring.",
      `Stock ${STOCK} in ${WIRE.short}. A 9-gauge store S-hook is not a production quote here. Shop catalog geometry is on the S-hooks product page.`,
    ],
    jobs: [
      "Powder coating S-hooks for line loading",
      "Industrial hang and lift S-hooks",
      "Closed-eye S-hooks for D-rings",
      "Stainless steel S-hooks",
    ],
    faqs: [
      {
        question: "Are powder coating S-hooks the same as plant S-hooks?",
        answer:
          "Same shape family. Powder coating S-hooks usually stay open for speed on the line. Plant and lift S-hooks may close an eye, name a load geometry, and run heavier wire. Send the print.",
      },
      {
        question: "What wire sizes do you form S-hooks in?",
        answer: `${WIRE.label}. Stock ${STOCK}. Under ${WIRE.minMm} mm, the quote says no.`,
      },
    ],
  },
  {
    id: "90-degree-hooks",
    path: "/90-degree-hooks",
    title: "90 Degree Hooks",
    h1: "90° hooks",
    kicker: "Powder coating hooks",
    description: `90° powder coating hooks: 90 degree V-hooks, C-hooks, and CV-hooks. Rotate the hang for rack clearance. CNC from coil in ${WIRE.short}.`,
    lede: "A 90° crank in the hang. 90 degree V-hooks, 90 degree C-hooks, and 90 degree CV-hooks when the rack is tight or the part needs a different attitude in the oven.",
    keywords: [
      "90 degree hooks",
      "90° hooks",
      "90 degree V-hooks",
      "90 degree C-hooks",
      "90 degree CV-hooks",
      "90° powder coating hooks",
    ],
    bestFor:
      "Tight conveyor centers, odd part orientation, and ovens that need the face presented a certain way.",
    hang: "Same V, C, or CV openings, rotated 90°. Call the rotation, both insides, and length.",
    body: [
      "90° hooks are still powder coating hooks — V, C, or CV — with a right-angle offset so the part hangs off the bar instead of in line with it. That is a 2D or 3D CNC program, not a different product family.",
      `Wire stays ${WIRE.short}. Stock ${STOCK}. Stainless when the washer demands it. 90° V: we buy the steel. 90° C and CV: you buy the coil.`,
    ],
    jobs: [
      "90° V-hooks for centered hang off the bar",
      "90° C-hooks for clearance",
      "90° CV-hooks for mixed locate and open",
      "Stainless 90 degree hooks",
    ],
    faqs: [
      {
        question: "What are 90 degree hooks?",
        answer:
          "90° powder coating hooks take a V, C, or CV shape and rotate the hang 90° relative to the rack bar. Shops use them for clearance and part orientation through wash, coat, and cure.",
      },
      {
        question: "Do you form 90° V-hooks, C-hooks, and CV-hooks?",
        answer: `Yes. Name the style, the rotation, openings, length, and diameter. ${WIRE.short}. 100-piece minimum.`,
      },
    ],
  },
];

export function powderHookStyle(id: PowderHookStyleId) {
  const style = POWDER_HOOK_STYLES.find((item) => item.id === id);
  if (!style) throw new Error(`Unknown powder hook style: ${id}`);
  return style;
}

export const POWDER_HOOK_HUB = {
  path: "/powder-coating-hooks",
  title: "Powder Coating Hooks",
  description: `Powder coating hooks made in the USA: S-hooks, V-hooks, C-hooks, CV-hooks, 90° hooks, and custom heavy-duty wire hooks. CNC from coil in ${WIRE.short}. Stock ${STOCK}. 100-piece minimum.`,
} as const;
