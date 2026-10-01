/**
 * Capability, material, and industry taxonomies.
 *
 * These are the public URL families the directory graph hangs off.
 * Do not invent a page for every mathematical combination — only
 * slugs with real search intent and shops that actually match.
 */

import type { IronClass } from "./directory-iron";

export type TaxonomyKind = "capability" | "material" | "industry";

export type FormingCapability = {
  slug: string;
  title: string;
  h1: string;
  path: string;
  /** Older URLs that now 301 here. */
  aliases: string[];
  description: string;
  lede: string;
  /** Engineering page that explains the process, not the shop list. */
  engineeringHref?: string;
  iron?: IronClass[];
  match: RegExp;
  faqs?: { question: string; answer: string }[];
};

export type FormingMaterial = {
  slug: string;
  title: string;
  h1: string;
  path: string;
  aliases: string[];
  description: string;
  lede: string;
  grades: string[];
  match: RegExp;
  faqs?: { question: string; answer: string }[];
};

export type FormingIndustry = {
  slug: string;
  title: string;
  path: string;
  match: RegExp;
};

export const QUOTE_PATH = "/quote";

export const FORMING_CAPABILITIES: FormingCapability[] = [
  {
    slug: "cnc-wire-forming",
    title: "CNC Wire Forming",
    h1: "CNC wire forming shops",
    path: "/wire-forming/cnc-wire-forming",
    aliases: ["/cnc-wire-forming"],
    description:
      "CNC wire forming from coil: programmable 2D and 3D bends, named diameter bands, and the U.S. and Canadian shops that actually run a CNC cell.",
    lede:
      "A CNC cell straightens, feeds, bends, and cuts from coil. The shops below say CNC on a public page or filed a cell on Source — confirm the diameter and 2D vs 3D before you send a print.",
    engineeringHref: "/processes/2d-cnc-wire-forming",
    iron: ["cnc", "3d-cnc", "2d-cnc"],
    match: /\bcnc\b/i,
    faqs: [
      {
        question: "What is CNC wire forming?",
        answer:
          "A programmable cell that straightens wire from coil, feeds a measured length, bends to a centerline, and cuts. No cam set, no blank. 2D cells stay in one plane; 3D cells add a rotary or torsion axis.",
      },
      {
        question: "How is this different from fourslide?",
        answer:
          "Fourslide uses cam tooling and often stamps and forms in one hit. CNC wins on revisions and mid volume. Fourslide wins when the geometry is frozen and the annual volume pays for the cams.",
      },
    ],
  },
  {
    slug: "2d-wire-forming",
    title: "2D Wire Forming",
    h1: "2D wire forming shops",
    path: "/wire-forming/2d-wire-forming",
    aliases: [],
    description:
      "2D CNC wire forming: all bends in one plane. Shops that run a table or 2D bender, plus the diameter bands they publish.",
    lede:
      "Planar forms — rectangles, guards, seat outlines, display frames. Faster to program than a 3D path. The shops below name 2D CNC or a 2D cell.",
    engineeringHref: "/processes/2d-cnc-wire-forming",
    iron: ["2d-cnc"],
    match: /\b2[\s-]?d\b/i,
  },
  {
    slug: "3d-wire-forming",
    title: "3D Wire Forming",
    h1: "3D wire forming shops",
    path: "/wire-forming/3d-wire-forming",
    aliases: [],
    description:
      "3D CNC wire forming: bends in more than one plane. Shops that name a 3D cell, a Robomac, an AFM-3D, or a rotary-head former.",
    lede:
      "Routing forms, complex hooks, frames that leave the plane. A 3D cell adds a rotary or torsion axis. Confirm the machine and the diameter — “CNC” alone is not 3D.",
    engineeringHref: "/processes/3d-cnc-wire-forming",
    iron: ["3d-cnc"],
    match: /\b3[\s-]?d\b/i,
  },
  {
    slug: "wire-bending",
    title: "Wire Bending",
    h1: "Wire bending shops",
    path: "/wire-forming/wire-bending",
    aliases: ["/cnc-wire-bending"],
    description:
      "Wire bending from coil: CNC and manual cells that bend specified wire to a centerline. Shops in the USA Wire Form directory that name bending.",
    lede:
      "Bending is the same discipline as forming — specified wire, specified centerline, specified ends. Buyers search both names. The shops below use bending language on a public page.",
    engineeringHref: "/processes/wire-form-shapes",
    match: /wire\s*bend|cnc\s*bend|\bbending\b/i,
  },
  {
    slug: "wire-straightening",
    title: "Wire Straightening Shops",
    h1: "Wire straightening shops",
    path: "/wire-forming/wire-straightening",
    aliases: [],
    description:
      "Wire straightening and cut-to-length: rotary or roll straighteners and cutoff cells. Directory shops that name straighten, CTL, or cut-to-length.",
    lede:
      "Cast and helix in the coil become dimensional error in the form. A dedicated straightener and cutoff is a different cell than a 2D former that happens to cut.",
    engineeringHref: "/processes/wire-straightening",
    iron: ["straighten-cut"],
    match: /straighten|cut[\s-]?to[\s-]?length|\bctl\b/i,
  },
  {
    slug: "wire-welding",
    title: "Wire Welding",
    h1: "Wire welding shops",
    path: "/wire-forming/wire-welding",
    aliases: [],
    description:
      "Wire welding and welded assemblies: resistance, TIG, and MIG on formed wire. Directory shops that name welding as a secondary.",
    lede:
      "A formed wire often needs a weld — spot, projection, TIG, or MIG. The shops below name welding. Confirm process and material; 304 and 1018 do not weld the same way.",
    engineeringHref: "/processes/resistance-welding",
    match: /weld|mig|tig|spot\s*weld/i,
  },
  {
    slug: "prototype-wire-forming",
    title: "Prototype Wire Forming",
    h1: "Prototype wire forming shops",
    path: "/wire-forming/prototype-wire-forming",
    aliases: [],
    description:
      "Prototype and low-volume CNC wire forming. Shops that name prototypes, first articles, or design-and-build — not a fourslide cam for a 50-piece tryout.",
    lede:
      "A CNC program is the cheap first article. A fourslide cam is not. The shops below name prototypes or design-and-build on a public page.",
    engineeringHref: "/products/design-and-prototyping",
    match: /prototype|first\s*article|design[\s-]?and[\s-]?build|low[\s-]?volume/i,
  },
];

export const FORMING_MATERIALS: FormingMaterial[] = [
  {
    slug: "stainless-steel",
    title: "Stainless Steel Wire Forming",
    h1: "Stainless steel wire forming",
    path: "/materials/stainless-steel",
    aliases: [],
    description:
      "Stainless steel wire forming: 304, 316, 330 and other 300-series coil. Shops that name stainless, and the grades they publish.",
    lede:
      "“Stainless” is not a grade. 304, 316, and 330 (N08330) form, spring back, and weld differently. The shops below name stainless on a public page.",
    grades: ["304 / 304L", "316 / 316L", "330 (N08330)", "301 / 302"],
    match: /stainless|304|316|330|n08330|300[\s-]?series/i,
    faqs: [
      {
        question: "Which stainless grades are common in wire forming?",
        answer:
          "304 / 304L for general and food. 316 / 316L for chlorides. 330 (N08330) for heat-treat baskets and furnace fixtures. 301 and 302 work-harden faster and show up on clips and springs.",
      },
    ],
  },
  {
    slug: "304-stainless",
    title: "304 Stainless Wire Forming",
    h1: "304 stainless wire forming",
    path: "/materials/304-stainless",
    aliases: [],
    description:
      "304 / 304L stainless wire forming from coil. Food, architectural, and outdoor forms. Shops that name 304, not just “stainless.”",
    lede:
      "304 is the default 300-series forming wire. 304L when weld carbide precipitation is a spec. Confirm the shop has run 304 at your diameter — it springs back more than 1018.",
    grades: ["304", "304L"],
    match: /\b304\b|304l/i,
  },
  {
    slug: "carbon-steel",
    title: "Carbon Steel Wire Forming",
    h1: "Carbon steel wire forming",
    path: "/materials/carbon-steel",
    aliases: [],
    description:
      "Carbon steel wire forming: 1010, 1018, and higher-carbon coil. Shops that name carbon, steel wire, or a specific AISI grade.",
    lede:
      "1010 and 1018 are the default cold-roll forming wires. Medium and high carbon change radius and springback. The shops below name carbon or a steel grade.",
    grades: ["1010", "1018", "1030–1045", "1050–1095"],
    match: /carbon|1018|1010|1008|steel wire|cold[\s-]?roll/i,
  },
  {
    slug: "aluminum",
    title: "Aluminum Wire Forming",
    h1: "Aluminum wire forming",
    path: "/materials/aluminum",
    aliases: [],
    description:
      "Aluminum wire forming from coil. Shops that name aluminum or aluminium — a smaller set than carbon or stainless.",
    lede:
      "Aluminum marks, galls, and springs back unlike 1018. Not every CNC cell is set up for it. The list below is shops that actually name aluminum.",
    grades: ["1100", "1350", "5056", "6061 wire"],
    match: /alumin(i)?um/i,
  },
  {
    slug: "music-wire",
    title: "Music Wire Forming",
    h1: "Music wire forming",
    path: "/materials/music-wire",
    aliases: [],
    description:
      "Music wire (ASTM A228) forming and spring work. High tensile, usually well under 4 mm. Shops that name music wire or A228.",
    lede:
      "A228 is very high tensile. Usual diameters sit under the 4–14 mm production band. USA Wire Form explains it; we do not pretend it is 1/2 in frame wire. The shops below name music wire.",
    grades: ["ASTM A228"],
    match: /music\s*wire|a228/i,
  },
  {
    slug: "galvanized",
    title: "Galvanized Wire Forming",
    h1: "Galvanized wire forming",
    path: "/materials/galvanized",
    aliases: [],
    description:
      "Galvanized wire forming from pre-coated coil. Shops that name galvanized or zinc-coated wire — and the weld burn-back that comes with it.",
    lede:
      "Pre-galvanized coil marks in the straightener and burns back at every weld. Some shops form bare and plate after. The shops below name galvanized.",
    grades: ["Pre-galvanized", "Hot-dip after form"],
    match: /galvaniz|zinc[\s-]?coat/i,
  },
];

export const FORMING_INDUSTRIES: FormingIndustry[] = [
  { slug: "automotive", title: "Automotive", path: "/industries/automotive", match: /auto|vehicle|truck|trailer/i },
  { slug: "agriculture", title: "Agriculture", path: "/industries/agriculture", match: /agri|farm|lawn|garden/i },
  { slug: "architectural", title: "Architectural", path: "/industries/architectural", match: /architect|building|construction/i },
  { slug: "chemical", title: "Chemical", path: "/industries/chemical", match: /chemical|petro/i },
  { slug: "data-centers", title: "AI and data centers", path: "/industries/data-centers", match: /data[\s-]?center|semiconductor/i },
  { slug: "electrical", title: "Electrical", path: "/industries/electrical", match: /electric|utility|power/i },
  { slug: "industrial", title: "Industrial", path: "/industries/industrial", match: /industrial|oem|mro|manufactur/i },
  { slug: "marine", title: "Marine", path: "/industries/marine", match: /marine|boat|ship/i },
  { slug: "mining", title: "Mining", path: "/industries/mining", match: /mining|mine\b/i },
  { slug: "petroleum", title: "Petroleum", path: "/industries/petroleum", match: /oil|gas|energy|petroleum/i },
  { slug: "railroad", title: "Railroad", path: "/industries/railroad", match: /rail|locomotive/i },
  { slug: "solar", title: "Solar", path: "/industries/solar", match: /solar|photovoltaic/i },
  { slug: "medical", title: "Medical", path: "/industries/medical", match: /medical|health|surgical|hospital/i },
  { slug: "aerospace", title: "Aerospace", path: "/industries/aerospace", match: /aero|aviation|aircraft/i },
  { slug: "retail-displays", title: "Retail displays", path: "/industries/retail-displays", match: /retail|display|fixture|point[\s-]?of[\s-]?purchase|\bpop\b/i },
];

const EQUIPMENT_RESERVED = new Set([
  "machines",
  "machine-comparison",
  "cnc-manufacturers",
]);

export function isReservedEquipmentSlug(slug: string) {
  return EQUIPMENT_RESERVED.has(slug);
}

export function getCapability(slug: string) {
  return FORMING_CAPABILITIES.find((item) => item.slug === slug);
}

export function getMaterial(slug: string) {
  return FORMING_MATERIALS.find((item) => item.slug === slug);
}

export function getIndustryTaxonomy(slug: string) {
  return FORMING_INDUSTRIES.find((item) => item.slug === slug);
}

export function capabilityByPath(path: string) {
  return FORMING_CAPABILITIES.find(
    (item) => item.path === path || item.aliases.includes(path),
  );
}

export function allTaxonomyPaths() {
  return [
    ...FORMING_CAPABILITIES.map((item) => item.path),
    ...FORMING_MATERIALS.map((item) => item.path),
    QUOTE_PATH,
  ];
}
