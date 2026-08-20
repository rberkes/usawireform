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
};

const CLASS_RE: Record<IronClass, RegExp> = {
  "3d-cnc": /\b3[\s-]?d\s*cnc|\brobomac\b|\bnumalliance\b/i,
  "2d-cnc": /\b2[\s-]?d\s*cnc/i,
  cnc: /\bcnc\b/,
  fourslide: /four[\s-]?slide|4[\s-]?slide/i,
  "multi-slide": /multi[\s-]?slide|verti[\s-]?slide|\bbihler\b/i,
  "spring-cnc": /\bwafios\b|\bitaya\b|simplex rapid|spring cnc|\bcoiler\b|cnc coil/i,
};

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
  return IRON_FILTERS.map((filter) => filter.id).filter((id) =>
    CLASS_RE[id].test(text),
  );
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
