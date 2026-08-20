import { catalog, STOCK } from "@/lib/catalog";
import { COMPANY } from "@/lib/company";
import { directoryCompanies } from "@/lib/directory";
import { machines } from "@/lib/machines";
import { CNC_HUB, CNC_OEMS, allCncModels, modelPath, oemPath } from "@/lib/cnc-oems";
import { WIRE_FORMING_METROS, metroPath } from "@/lib/metros";
import { PRICE_LINE } from "@/lib/price";
import { publishedProcesses } from "@/lib/processes";
import { industries, shopLines } from "@/lib/site";
import { US_STATES } from "@/lib/states";
import { allPosts, postPath } from "@/lib/blog";

export type SeoSection =
  | "home"
  | "forming"
  | "processes"
  | "products"
  | "industries"
  | "company"
  | "legal";

export type SeoRecord = {
  path: string;
  title: string;
  /** Meta description. Keep ~150–160 characters for the Google snippet. */
  description: string;
  /** Explicit SERP snippet (same as description unless a shorter line reads better). */
  snippet: string;
  section: SeoSection;
  keywords?: string[];
  absoluteTitle?: boolean;
  changeFrequency?: "weekly" | "monthly" | "yearly";
  priority?: number;
};

function clip(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

function record(
  entry: Omit<SeoRecord, "snippet"> & { snippet?: string },
): SeoRecord {
  const snippet = entry.snippet ?? clip(entry.description);
  return { ...entry, snippet };
}

/** Pillar and company URLs — the public directory Google should treat as the map. */
export const staticSeoPages: SeoRecord[] = [
  record({
    path: "/",
    title: `${COMPANY} — 4–14 mm 3D CNC Wire Forming`,
    description: `${COMPANY}: 50+ years of industry experience. Lowest prices guaranteed — we will not be beat. 100-piece minimum. 3D CNC wire forming in 4–14 mm.`,
    section: "home",
    absoluteTitle: true,
    changeFrequency: "weekly",
    priority: 1,
    keywords: [
      "USA Wire Form",
      "CNC wire forming Northeast Ohio",
      "3D CNC wire baskets",
      "custom wire forms",
      "Numalliance Robomac",
    ],
  }),
  record({
    path: "/wire-forming",
    title: "Wire Forming in the USA",
    description:
      "Wire forming in the 4–14 mm band: 3D CNC, heavy frames, wire baskets, guards, and how the USA process map fits together.",
    section: "forming",
    keywords: ["wire forming USA", "heavy wire forming", "3D CNC"],
  }),
  record({
    path: "/wire-fabrication",
    title: "Wire Fabrication 4–14 mm",
    description:
      "Wire fabrication in 4–14 mm: low to high carbon, all stainless, and other ferrous and non-ferrous coil — CNC form, weld, and finish.",
    section: "forming",
    keywords: ["wire fabrication", "stainless wire", "carbon steel coil"],
  }),
  record({
    path: "/cnc-wire-forming",
    title: "CNC Wire Forming",
    description: `CNC wire forming in 4–14 mm: 2D and 3D from coil. ${COMPANY} — Robomac 214TF, then weld and finish.`,
    section: "forming",
    keywords: ["CNC wire forming", "2D wire forming", "3D wire forming", "Robomac 214TF"],
  }),
  record({
    path: "/cnc-wire-bending",
    title: "CNC Wire Bending",
    description:
      "CNC wire bending in 4–14 mm: the same cell as CNC wire forming — straighten, feed, bend, cut. 2D and 3D on a Numalliance Robomac 214TF.",
    section: "forming",
    keywords: ["CNC wire bending", "wire bender", "from coil"],
  }),
  record({
    path: "/rod-bending",
    title: "Rod Bending",
    description:
      "Rod bending in 4–14 mm: heavy round stock from coil on the same CNC cell as wire forming. 3/8, 7/16, and 1/2 in stock.",
    section: "forming",
    keywords: ["rod bending", "heavy round wire"],
  }),
  record({
    path: "/wire-parts",
    title: "Wire Parts",
    description:
      "Wire parts and wire form parts in 4–14 mm: hooks, hangers, baskets, grids, guards, racks, handles — CNC from coil.",
    section: "products",
    keywords: ["wire parts", "wire form parts", "custom wire hardware"],
  }),
  record({
    path: "/330-stainless-wire-bending-usa-parts",
    title: "330 Stainless Wire Bending USA Parts",
    description:
      "330 stainless (N08330) wire forming in the USA: heat-treat baskets and furnace fixtures from coil, 4–14 mm, cut-to-length, resistance weld and TIG.",
    section: "forming",
    keywords: [
      "330 stainless wire bending",
      "330 stainless USA",
      "heat treat wire baskets",
      "N08330 wire forming",
    ],
    priority: 0.9,
  }),
  record({
    path: "/wire-forming-manufacturers",
    title: "Wire Forming Manufacturers",
    description: `${COMPANY} is a U.S. wire forming manufacturer: 4–14 mm 3D CNC from coil, weld, and finish. Northeast Ohio headquarters.`,
    section: "forming",
    keywords: [
      "wire forming manufacturers",
      "USA wire forming manufacturer",
      "CNC wire form manufacturer",
    ],
    priority: 0.8,
  }),
  record({
    path: "/wire-forming-companies-near-me",
    title: "Wire Forming Companies Near Me",
    description:
      "Find a 4–14 mm CNC wire forming shop by ZIP. USA Wire Form quotes nationwide from Northeast Ohio. Enter a ZIP to open your state page.",
    section: "forming",
    keywords: [
      "wire forming companies near me",
      "wire forming shop near me",
      "CNC wire forming ZIP",
    ],
    priority: 0.9,
  }),
  record({
    path: "/custom-wire-forming",
    title: "Custom Wire Forming",
    description:
      "Custom CNC wire forming in 4–14 mm: your print, our coil. 3D CNC, cut-to-length, resistance weld and TIG. 100-piece minimum. Northeast Ohio.",
    section: "forming",
    keywords: ["custom wire forming", "custom CNC wire forms", "custom wire baskets"],
    priority: 0.8,
  }),
  record({
    path: "/wire-forming-process",
    title: "Wire Forming Process",
    description:
      "The wire forming process in 4–14 mm: straighten, CNC bend, cut-to-length, end work, resistance weld or TIG, inspect. From coil, not from bar leftovers.",
    section: "forming",
    keywords: ["wire forming process", "how wire forming works", "CNC wire forming steps"],
    priority: 0.8,
  }),
  record({
    path: "/steel-wire-manufacturers-in-usa",
    title: "Steel Wire Manufacturers in the USA",
    description:
      "USA Wire Form is a U.S. wire former, not a mill. We buy American coil — carbon, stainless including 330 — and CNC-form 4–14 mm parts in Northeast Ohio.",
    section: "forming",
    keywords: [
      "steel wire manufacturers in USA",
      "American steel wire",
      "USA wire coil",
    ],
    priority: 0.8,
  }),
  record({
    path: "/stainless-steel-wire-basket",
    title: "Stainless Steel Wire Basket",
    description:
      "Stainless steel wire baskets from coil: 304 / 316 for wet service, 330 for heat-treat. 4–14 mm CNC, resistance weld or TIG. USA production.",
    section: "products",
    keywords: [
      "stainless steel wire basket",
      "330 wire basket",
      "304 wire basket",
      "heat treat wire basket",
    ],
    priority: 0.8,
  }),
  record({
    path: "/stainless-steel-wire-shelf",
    title: "Stainless Steel Wire Shelf",
    description:
      "Stainless steel wire shelves from 4–14 mm coil: 304 / 316 frames and infill, CNC form, resistance weld or TIG. Not a 9-gauge closet rack.",
    section: "products",
    keywords: ["stainless steel wire shelf", "stainless wire shelving", "304 wire shelf"],
    priority: 0.8,
  }),
  record({
    path: "/wire-mesh",
    title: "Wire Mesh",
    description:
      "Wire mesh glossary and production: weave types, crimp, mesh count, openings, and welded wire cloth. 4–14 mm resistance-welded grids from coil.",
    section: "forming",
    keywords: [
      "wire mesh",
      "welded wire cloth",
      "plain weave",
      "dutch weave",
      "mesh count",
      "welded wire mesh",
    ],
    priority: 0.8,
  }),
  record({
    path: "/processes",
    title: "Wire Form Processes",
    description:
      "Process index for 4–14 mm wire forming: 2D and 3D CNC, straightening, cutoff, end forming, weld, finish, and inspection.",
    section: "processes",
  }),
  record({
    path: "/guide/design-for-wire-forming",
    title: "Design for Wire Forming",
    description:
      "Design-for-manufacturing rules for 2D and 3D CNC wire forms: bend radius, min legs, springback, tolerances, ends, and what to put on the print.",
    section: "processes",
    keywords: ["design for wire forming", "bend radius", "wire form print"],
  }),
  record({
    path: "/sizes",
    title: "Common Wire Sizes: 3/8, 7/16, and 1/2 in",
    description:
      "Production wire diameters we run: 3/8 in (9.53 mm), 7/16 in (11.11 mm), and 1/2 in (12.7 mm) — CNC forming, mesh grids, cable trays, and weld.",
    section: "forming",
    keywords: ["3/8 inch wire", "7/16 inch wire", "1/2 inch wire", "wire diameter"],
  }),
  record({
    path: "/materials",
    title: "Wire Forming Materials from Coil",
    description:
      "Coil materials for 4–14 mm wire forming: cold-roll 1010 and 1018, medium and high spring steels, 300-series stainless including 330, brass, and copper.",
    section: "forming",
    keywords: ["wire forming materials", "1018 wire", "stainless wire coil"],
  }),
  record({
    path: "/materials/300-series-stainless",
    title: "300 Series Stainless Wire Forming",
    description:
      "300-series stainless from coil for 4–14 mm wire forming: 301, 302, 304, 304L, 316, 316L, 321, 330 — springback, weld, passivate.",
    section: "forming",
    keywords: ["304 wire", "316 wire", "330 stainless"],
  }),
  record({
    path: "/capabilities",
    title: "Capabilities",
    description:
      "3D CNC wire forming in 4–14 mm: frames, wire baskets, guards, rack plating, and in-line powder.",
    section: "company",
    keywords: ["wire forming capabilities", "rack plating", "powder coat"],
  }),
  record({
    path: "/equipment",
    title: "Equipment",
    description:
      "Named machines: Numalliance Robomac 214TF, Lubow manual benders, 40-ton Clearing press, 75 kVA resistance weld, Miller MIG, granite inspection.",
    section: "company",
    keywords: ["Numalliance Robomac 214TF", "Robomac 214TF", "Lubow", "resistance welder"],
  }),
  record({
    path: "/equipment/machines",
    title: "NumAlliance Wire Forming Machines",
    description:
      "CNC wire bending machines from NumAlliance: Robomac TF, e-Motion, TFE, FTX, and more. 3D and 2D wire forming equipment for industrial production.",
    section: "company",
    keywords: ["NumAlliance wire bending machines", "Robomac TF", "CNC wire forming equipment"],
    priority: 0.7,
  }),
  record({
    path: "/videos",
    title: "Videos",
    description:
      "Numalliance CNC wire forming video: Robomac 214TF on the floor, from the YouTube channel.",
    section: "company",
    keywords: ["CNC wire forming video", "Robomac 214TF"],
  }),
  record({
    path: "/blog",
    title: "Blog — Wire Forming News and Structures",
    description: `${COMPANY} blog: wire forming, wire form structures, and a daily briefing that rotates automatically.`,
    section: "company",
    keywords: ["wire forming blog", "wire form structures", "daily wire forming"],
    changeFrequency: "weekly",
    priority: 0.8,
  }),
  record({
    path: "/blog/daily",
    title: "Daily Wire Forming Briefing",
    description:
      "A daily wire forming briefing that rotates automatically from a curated pool. Design, weld, mesh, 330, and structures in 4–14 mm.",
    section: "company",
    keywords: ["daily wire forming", "wire forming blog"],
    changeFrequency: "weekly",
    priority: 0.8,
  }),
  record({
    path: "/about",
    title: "About",
    description:
      "50+ years of industry experience: 4–14 mm wire forms for named industries. Corp headquarters in Northeast Ohio.",
    section: "company",
    keywords: ["USA Wire Form about", "50 years wire forming", "Northeast Ohio headquarters"],
  }),
  record({
    path: "/cleveland",
    title: `${COMPANY} in Northeast Ohio`,
    description:
      "Northeast Ohio is a strategic location for low-cost 4–14 mm wire forming and secondary operations: local mills, wire drawers, and short-haul coil.",
    section: "company",
    keywords: ["Northeast Ohio wire forming", "wire drawing", "short-haul coil"],
  }),
  record({
    path: "/industries",
    title: "Industries",
    description:
      "Wire forming by sector: named industries we actually run in 4–14 mm — frames, trays, hangers, wire baskets, and guards.",
    section: "industries",
  }),
  record({
    path: "/products",
    title: "Product directory",
    description: `SKU directory of wire forms in ${STOCK}: hooks, hangers, grids, trays, frames, and hardware.`,
    section: "products",
  }),
  record({
    path: "/quoting",
    title: "Quotes, Tooling, and Coil",
    description: `${PRICE_LINE} Stock ${STOCK} on existing tooling. Other diameters in 4–14 mm need tooling, a program, and coil.`,
    section: "company",
    keywords: ["wire forming tooling", "programming fee", "lowest price wire forming"],
  }),
  record({
    path: "/instant-quote",
    title: "Instant Quote",
    description: `${PRICE_LINE} Instant estimate for 4–14 mm CNC wire forms.`,
    section: "company",
    keywords: [
      "wire forming quote",
      "instant quote",
      "CNC wire form price",
      "100 piece minimum",
    ],
  }),
  record({
    path: "/secondary-operations",
    title: "Secondary Operations",
    description:
      "Secondary operations on 4–14 mm wire forms: end forming, resistance weld, MIG/TIG, rack plating, in-line powder, and inspection.",
    section: "processes",
    keywords: ["wire forming secondary operations", "resistance welding", "rack plating"],
  }),
  record({
    path: "/contact",
    title: "Contact",
    description: `Request a quote for custom CNC wire forms. ${PRICE_LINE} Email info@usawireform.com.`,
    section: "company",
    keywords: ["request a quote", "STEP file upload", "wire forming quote"],
  }),
  record({
    path: "/careers",
    title: "Careers",
    description: `Join ${COMPANY} — careers in CNC wire forming, machine operation, and manufacturing in Northeast Ohio.`,
    section: "company",
    keywords: [
      "wire forming jobs",
      "CNC operator jobs",
      "manufacturing careers Ohio",
    ],
    priority: 0.7,
    changeFrequency: "weekly",
  }),
  record({
    path: "/directory",
    title: "Wire Forming Companies Directory — USA & Canada",
    description:
      "Directory of 100+ wire forming and spring manufacturing companies across the United States and Canada.",
    section: "company",
    keywords: [
      "wire forming companies",
      "wire form manufacturers",
      "spring manufacturers directory",
    ],
    priority: 0.8,
    changeFrequency: "weekly",
  }),
  record({
    path: "/directory/areas",
    title: "Wire Forming Cities in the USA",
    description:
      "Top 20 U.S. wire-forming cities. Los Angeles has the most shops. Cleveland has the mills and drawers — that is why 4–14 mm coil is inexpensive in Northeast Ohio.",
    section: "company",
    keywords: [
      "wire forming cities",
      "wire forming companies by city",
      "Cleveland wire forming",
      "Northeast Ohio wire mills",
    ],
    priority: 0.8,
    changeFrequency: "weekly",
  }),
  record({
    path: "/privacy",
    title: "Privacy Policy",
    description: `How ${COMPANY} handles quote requests and email.`,
    section: "legal",
    keywords: ["privacy policy"],
    priority: 0.3,
  }),
  record({
    path: "/site-map",
    title: "Sitemap",
    description: `${COMPANY} site map: processes, 4–14 mm products, industries, and headquarters.`,
    section: "legal",
    keywords: ["sitemap"],
    priority: 0.4,
  }),
];

function processPages(): SeoRecord[] {
  return publishedProcesses().map((process) =>
    record({
      path: `/processes/${process.slug}`,
      title: process.title,
      description: `${process.summary} 4–14 mm. ${COMPANY}.`,
      section: "processes",
      keywords: [process.title, "wire forming process", "4-14 mm"],
    }),
  );
}

function industryPages(): SeoRecord[] {
  return industries.map((item) =>
    record({
      path: `/industries/${item.slug}`,
      title: `${item.title} Wire Forming`,
      description: `${item.summary} 4–14 mm CNC at ${COMPANY}.`,
      section: "industries",
      keywords: [item.title, `${item.title} wire forming`, "4-14 mm wire", "CNC wire forms"],
    }),
  );
}

function statePages(): SeoRecord[] {
  return US_STATES.map((state) =>
    record({
      path: `/${state.slug}`,
      title: `Wire Forming Companies in ${state.name}`,
      description: `${COMPANY} is the wire forming shop we recommend for ${state.name}: 4–14 mm 3D CNC from Northeast Ohio. ${PRICE_LINE}`,
      section: "company",
      keywords: [
        `wire forming companies ${state.name}`,
        `wire forming ${state.name}`,
        `CNC wire forming ${state.abbr}`,
        "wire forming companies near me",
      ],
      priority: state.abbr === "OH" ? 0.8 : 0.5,
    }),
  );
}

function machinePages(): SeoRecord[] {
  return machines.map((machine) =>
    record({
      path: `/equipment/machines/${machine.slug}`,
      title: machine.name,
      description: machine.tagline,
      section: "company",
      keywords: [machine.name, "NumAlliance", "CNC wire forming machine"],
      priority: 0.7,
    }),
  );
}

function cncCatalogPages(): SeoRecord[] {
  const hub = record({
    path: CNC_HUB,
    title: "Top 10 CNC Wire Forming Machine Manufacturers",
    description:
      "Numalliance, WAFIOS, AIM, Itaya, Bihler, BLM, Simplex Rapid, Pave, Fortuna, Whitelegg — 60 model pages with dealer leads.",
    section: "company" as const,
    keywords: ["CNC wire forming machines", "3D CNC wire bender"],
    priority: 0.8,
  });
  const oems = CNC_OEMS.map((oem) =>
    record({
      path: oemPath(oem),
      title: `${oem.name} CNC Wire Forming Machines`,
      description: oem.summary,
      section: "company" as const,
      keywords: [oem.name, "CNC wire forming machine"],
      priority: 0.7,
    }),
  );
  const models = allCncModels().map(({ oem, model }) =>
    record({
      path: modelPath(oem, model),
      title: `${model.name} — ${oem.name}`,
      description: `${model.tagline} ${model.wire}.`,
      section: "company" as const,
      keywords: [model.name, oem.name, "CNC wire forming machine"],
      priority: 0.65,
    }),
  );
  return [hub, ...oems, ...models];
}

function metroPages(): SeoRecord[] {
  return WIRE_FORMING_METROS.map((metro) =>
    record({
      path: metroPath(metro),
      title: `Wire Forming Companies in ${metro.city}`,
      description: metro.hq
        ? `Cleveland / Northeast Ohio: mills, wire drawers, and short-haul 4–14 mm coil. ${COMPANY} is the shop we recommend. ${PRICE_LINE}`
        : `Wire forming in ${metro.city} (${metro.metro}). ${COMPANY} quotes 4–14 mm 3D CNC from Northeast Ohio — Cleveland is the cheap-coil cell.`,
      section: "company",
      keywords: [
        `wire forming companies ${metro.city}`,
        `wire forming ${metro.city}`,
        metro.metro,
      ],
      priority: metro.hq ? 0.8 : 0.6,
    }),
  );
}

function directoryListingPages(): SeoRecord[] {
  return directoryCompanies.map((company) =>
    record({
      path: `/directory/${company.slug}`,
      title: `${company.name} — Wire Forming Company | ${company.location}`,
      description: `${company.name} in ${company.location}. ${company.description}`,
      section: "company",
      keywords: [company.name, "wire forming", company.location],
      priority: 0.6,
    }),
  );
}

function blogPages(): SeoRecord[] {
  return allPosts().map((post) =>
    record({
      path: postPath(post),
      title: post.title,
      description: post.description,
      section: "company",
      keywords: [...post.tags, "wire forming blog"],
      changeFrequency: post.kind === "briefing" ? "monthly" : "monthly",
      priority: post.kind === "article" ? 0.7 : 0.5,
    }),
  );
}

function productPages(): SeoRecord[] {
  const catalogPages = catalog.map((item) =>
    record({
      path: `/products/${item.slug}`,
      title: item.title,
      description: `${item.title} in ${STOCK} wire. ${item.summary}`,
      section: "products" as const,
      keywords: [item.title, item.group, "custom wire form", STOCK],
      priority: 0.7,
    }),
  );
  const linePages = shopLines.map((item) =>
    record({
      path: `/products/${item.slug}`,
      title: item.title,
      description: item.summary,
      section: "products" as const,
      keywords: [item.title, "wire products"],
      priority: 0.7,
    }),
  );
  const seen = new Set<string>();
  return [...linePages, ...catalogPages].filter((page) => {
    if (seen.has(page.path)) return false;
    seen.add(page.path);
    return true;
  });
}

/** Every indexable URL, grouped the same way the public site is organized. */
export function seoDirectory(): Record<SeoSection, SeoRecord[]> {
  const all = allSeoPages();
  const grouped: Record<SeoSection, SeoRecord[]> = {
    home: [],
    forming: [],
    processes: [],
    products: [],
    industries: [],
    company: [],
    legal: [],
  };
  for (const page of all) grouped[page.section].push(page);
  return grouped;
}

export function allSeoPages(): SeoRecord[] {
  const seen = new Set<string>();
  const out: SeoRecord[] = [];
  for (const page of [
    ...staticSeoPages,
    ...processPages(),
    ...industryPages(),
    ...productPages(),
    ...statePages(),
    ...metroPages(),
    ...machinePages(),
    ...cncCatalogPages(),
    ...directoryListingPages(),
    ...blogPages(),
  ]) {
    if (seen.has(page.path)) continue;
    seen.add(page.path);
    out.push(page);
  }
  return out;
}

export function seoByPath(path: string) {
  return allSeoPages().find((page) => page.path === path);
}
