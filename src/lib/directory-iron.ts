import type { DirectoryCompany } from "./directory-types";

export const IRON_FILTERS = [
  {
    id: "3d-cnc",
    label: "3D CNC",
    hint: "Spatial CNC from coil or bar",
  },
  {
    id: "2d-cnc",
    label: "2D CNC",
    hint: "Planar table / 2D bender",
  },
  {
    id: "cnc",
    label: "CNC (unspecified)",
    hint: "Shop says CNC; 2D vs 3D not on the page",
  },
  {
    id: "fourslide",
    label: "Fourslide",
    hint: "Cam four-slide / 4-slide",
  },
  {
    id: "multi-slide",
    label: "Multi-slide / Bihler",
    hint: "Multi-slide, verti-slide, Bihler transfer",
  },
  {
    id: "spring-cnc",
    label: "Spring CNC",
    hint: "Coiler / torsion CNC — WAFIOS, Itaya, Simplex class",
  },
] as const;

export type IronClass = (typeof IRON_FILTERS)[number]["id"];

type IronNote = {
  classes: IronClass[];
  machines: string[];
  source: string;
};

/**
 * Equipment named on a public shop page (Google → the shop’s own site).
 * Not Thomas. Not a floor walk. Confirm with the shop.
 */
export const DIRECTORY_IRON: Record<string, IronNote> = {
  "midwest-wire-products": {
    classes: ["fourslide", "multi-slide"],
    machines: ["Fourslide", "Multislide", "Vertical slide"],
    source:
      "https://www.wireforming.com/manufacturing-capabilities/fourslide-and-multislide/",
  },
  "associated-spring": {
    classes: ["fourslide", "multi-slide"],
    machines: ["Four-slide", "Multi-slide"],
    source:
      "https://associatedspring.com/products/stampings/four-slide-multi-slide-stampings.aspx",
  },
  "lee-spring": {
    classes: ["fourslide"],
    machines: ["Fourslide"],
    source: "https://www.leespring.com/wireforms-stampings",
  },
  "argo-spring-manufacturing": {
    classes: ["fourslide", "cnc"],
    machines: ["Four-slide", "CNC"],
    source: "https://argospringmfg.com/products/precision-wire-forms/",
  },
  "gemco-manufacturing": {
    classes: ["fourslide", "multi-slide"],
    machines: ["Fourslide", "Multi-slide", "Power press"],
    source: "https://www.gemcomfg.com/fourslide-stamping/learn-more/",
  },
  "wire-products-company": {
    classes: ["2d-cnc", "3d-cnc", "fourslide", "spring-cnc"],
    machines: ["CNC bending (2D and 3D)", "Four-slide", "CNC coiling"],
    source: "https://wire-products.com/wire-forms/",
  },
  "keats-manufacturing": {
    classes: ["fourslide", "multi-slide", "cnc"],
    machines: ["Four-slide", "Multi-slide", "CNC"],
    source: "https://www.keatsmfg.com",
  },
  "ohio-wire-form-spring": {
    classes: ["fourslide", "cnc"],
    machines: ["Four-slide", "CNC"],
    source: "https://ohiowireform.com",
  },
  "stewart-efi": {
    classes: ["fourslide", "multi-slide"],
    machines: [
      "US Baird",
      "Nilson",
      "Bihler",
      "Finzer",
      "Torin",
      "Sleeper-Hartley",
    ],
    source:
      "https://stewartefi.com/custom-metal-stamping-services/slide-formed-components/",
  },
  "ajax-spring": {
    classes: ["fourslide"],
    machines: ["Nilson Automatic Four Slide"],
    source: "https://ajaxspring.com/four-slide/",
  },
  "wardzala-industries": {
    classes: ["cnc", "fourslide"],
    machines: ["CNC wire forming", "Fourslide"],
    source: "https://www.wardzalaind.com/capabilities/cnc-wire-forming/",
  },
  "marshall-manufacturing": {
    classes: ["2d-cnc", "3d-cnc"],
    machines: ["2D/3D CNC wire and tube bending"],
    source:
      "https://www.marshallmfg.com/marshall-manufacturing-capabilities/cnc-wire-tube-bending/",
  },
  "supro-spring": {
    classes: ["cnc", "fourslide"],
    machines: ["CNC wire forming", "Four slide"],
    source: "https://suprospring.com/",
  },
  "advance-wire-forming": {
    classes: ["cnc"],
    machines: ["CNC equipment"],
    source: "https://advancewireforming.com/",
  },
  "four-slide-technology": {
    classes: ["fourslide", "multi-slide"],
    machines: ["Four-slide", "Multi-slide"],
    source: "https://www.four-slide.com/",
  },
  "bihler-of-america": {
    classes: ["multi-slide", "fourslide"],
    machines: ["Bihler GRM-NC", "RM-NC", "4Slide-NC", "GRM 80"],
    source: "https://bihler.com/",
  },
  "apex-wire-products": {
    classes: ["2d-cnc", "3d-cnc"],
    machines: ["2D CNC wire forming", "3D CNC wire forming"],
    source: "https://www.apexwireproducts.com/cnc-wire-forming-services/",
  },
  "progress-wire-products": {
    classes: ["2d-cnc", "3d-cnc"],
    machines: [
      "Two-dimensional CNC wire forming",
      "Three-dimensional CNC wire forming",
    ],
    source: "http://www.progresswire.com/capabilities.html",
  },
  "tusco-manufacturing": {
    classes: ["3d-cnc"],
    machines: ["AIM AFM3D1-TUF 3D CNC wire former"],
    source: "https://www.tuscomfg.com/capabilities/wire-forming/",
  },
  "oregon-wire": {
    classes: ["3d-cnc"],
    machines: ["3D CNC wire forming"],
    source: "https://www.oregonwire.co/what-is-wire-forming/",
  },
};

const CLASS_RE: Record<IronClass, RegExp> = {
  "3d-cnc":
    /\b3[\s-]?d\s*cnc|\bthree[\s-]?dimensional(?:\s+and\s+two[\s-]?dimensional)?\s+cnc|\brobomac\b|\bnumalliance\b|\bafm[\s-]?3d|\bftx\d/i,
  "2d-cnc":
    /\b2[\s-]?d\s*cnc|\btwo[\s-]?dimensional(?:\s+and\s+three[\s-]?dimensional)?\s+cnc/i,
  cnc: /\bcnc\b/,
  fourslide: /four[\s-]?slide|4[\s-]?slide/i,
  "multi-slide": /multi[\s-]?slide|verti[\s-]?slide|\bbihler\b/i,
  "spring-cnc": /\bwafios\b|\bitaya\b|simplex rapid|spring cnc|\bcoiler\b|cnc coil/i,
};

/** Shops that say CNC and 3D forming, without the exact “3D CNC” phrase. */
function infers3dCnc(text: string) {
  if (!/\bcnc\b/i.test(text)) return false;
  if (
    /\b3[\s-]?d\s+(?:wire\s+)?(?:forming|bending|former|bender|forms|parts)\b/i.test(
      text,
    )
  ) {
    return true;
  }
  if (/\b2[\s-]?d\s+and\s+3[\s-]?d\b/i.test(text)) return true;
  return /\bthree[\s-]?dimensional\b/i.test(text);
}

function infers2dCnc(text: string) {
  if (!/\bcnc\b/i.test(text)) return false;
  if (/\b2[\s-]?d\s+(?:wire\s+)?(?:forming|bending|former|bender|forms|parts)\b/i.test(text)) {
    return true;
  }
  return /\b2[\s-]?d\s+and\s+3[\s-]?d\b/i.test(text);
}

export function applyDirectoryIron(
  company: DirectoryCompany,
): DirectoryCompany {
  const note = DIRECTORY_IRON[company.slug];
  if (!note) return company;
  const capabilities = [...company.capabilities];
  for (const machine of note.machines) {
    if (!capabilities.some((cap) => cap.toLowerCase() === machine.toLowerCase())) {
      capabilities.push(machine);
    }
  }
  return {
    ...company,
    machines: note.machines,
    equipmentSource: note.source,
    capabilities,
  };
}

export function companyIronClasses(company: DirectoryCompany): IronClass[] {
  const note = DIRECTORY_IRON[company.slug];
  if (note) return note.classes;
  const text = [
    ...company.capabilities,
    company.description,
    ...(company.machines ?? []),
  ].join(" ");
  const classes = IRON_FILTERS.map((filter) => filter.id).filter((id) =>
    CLASS_RE[id].test(text),
  );
  if (!classes.includes("3d-cnc") && infers3dCnc(text)) classes.push("3d-cnc");
  if (!classes.includes("2d-cnc") && infers2dCnc(text)) classes.push("2d-cnc");
  return classes;
}

export function companyHasIron(company: DirectoryCompany, id: IronClass) {
  const classes = companyIronClasses(company);
  if (id === "cnc") {
    return (
      classes.includes("cnc") ||
      classes.includes("3d-cnc") ||
      classes.includes("2d-cnc")
    );
  }
  return classes.includes(id);
}

export function isIronClass(value: string | undefined): value is IronClass {
  return IRON_FILTERS.some((filter) => filter.id === value);
}
