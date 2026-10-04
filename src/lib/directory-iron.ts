import type { DirectoryCompany } from "./directory-types";
import type { SourceBuyerFit } from "./source-fit";

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
    id: "straighten-cut",
    label: "Straighten & Cut to Length",
    hint: "Dedicated straightener and cutoff — not a 2D former",
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
  wireDiameters?: string;
  certifications?: string[];
  industries?: string[];
  plantStreet?: string;
  /** Extra public-page tokens so welding / coil inference can fire. */
  extras?: string[];
  /** Only when the shop published the cell — never guessed. */
  buyerFit?: SourceBuyerFit;
};

function mergeLabels(existing?: string[], extra?: string[]) {
  const out = [...(existing ?? [])];
  for (const item of extra ?? []) {
    if (!out.some((row) => row.toLowerCase() === item.toLowerCase())) {
      out.push(item);
    }
  }
  return out.length > 0 ? out : existing;
}

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
    wireDiameters: ".060–.500 in",
    certifications: ["ISO 9001:2015"],
  },
  "associated-spring": {
    classes: ["fourslide", "multi-slide"],
    machines: ["Four-slide", "Multi-slide"],
    source: "https://www.associatedspring.com/",
  },
  "lee-spring": {
    classes: ["fourslide"],
    machines: ["Fourslide (.005–.187 in wire)"],
    source: "https://www.leespring.com/wireforms-stampings",
    wireDiameters: "Wire forms .010–.236 in · fourslide .005–.187 in",
    plantStreet: "140 58th Street, Brooklyn, NY 11220",
  },
  "argo-spring-manufacturing": {
    classes: ["fourslide", "cnc"],
    machines: ["Nilson four-slide (#00 to #4)", "CNC"],
    source: "https://argospringmfg.com/products/precision-wire-forms/",
    wireDiameters: "0.003–0.375 in",
    certifications: ["ISO 9001:2015", "AS9100"],
    industries: [
      "Aerospace",
      "Automotive",
      "Agriculture",
      "Medical",
      "Defense",
    ],
    plantStreet: "13930 Shoemaker Avenue, Norwalk, CA 90650",
    extras: ["MIG welding", "TIG welding", "from coil"],
  },
  "gemco-manufacturing": {
    classes: ["fourslide", "multi-slide"],
    machines: ["Fourslide", "Multi-slide", "Power press"],
    source: "https://www.gemcomfg.com/fourslide-stamping/learn-more/",
    plantStreet: "555 West Queen Street, Southington, CT 06489",
  },
  "wire-products-company": {
    classes: ["2d-cnc", "3d-cnc", "fourslide", "multi-slide", "spring-cnc", "straighten-cut"],
    machines: [
      "5 CNC wire formers (.020–.472 in, 2D and 3D)",
      "20 four-slide (.005–.500 in)",
      "9 multi-slide",
      "32 spring coilers (.003–.312 in)",
      "3 straighten & cut (.010–.250 in)",
    ],
    source: "https://wire-products.com/wire-forms/",
    wireDiameters: ".005–.500 in",
    certifications: ["AS 9100 D", "ISO 9001:2015"],
    industries: ["Aerospace", "Defense", "Automotive", "Medical", "Commercial"],
    plantStreet: "14601 Industrial Parkway, Cleveland, OH 44135",
    extras: ["MIG welding", "TIG welding", "Resistance welding", "from coil"],
    buyerFit: { minOrderKind: "none" },
  },
  "keats-manufacturing": {
    classes: ["fourslide", "multi-slide", "cnc"],
    machines: [
      "Nilson four-slides (to 0.180 in)",
      "US Baird four-slides and 28/33/35MS multislides",
      "Finzer Z 200",
      "Wunsch #1500 / #2000",
    ],
    source: "https://www.keatsmfg.com/about/",
    wireDiameters: "To 0.180 in (S3F Nilson)",
    certifications: ["ISO 9001", "ISO 14001", "IATF 16949"],
    industries: ["Automotive", "Electronics", "Appliance", "Aerospace", "Medical"],
    plantStreet: "350 Holbrook Drive, Wheeling, IL 60090",
  },
  "ohio-wire-form-spring": {
    classes: ["fourslide", "cnc"],
    machines: ["Four-slide", "CNC"],
    source: "https://ohiowireform.com",
    plantStreet: "2270 South High Street, Columbus, OH 43207",
    buyerFit: { minOrderKind: "none" },
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
      "https://stewartefi.com/custom-metal-stamping-services/slide-forming/",
    certifications: ["ISO 9001:2015", "IATF 16949:2016", "ITAR"],
    industries: ["Automotive", "Electrical", "Medical", "Military"],
    plantStreet: "45 Old Waterbury Road, Thomaston, CT 06787",
  },
  "ajax-spring": {
    classes: ["fourslide"],
    machines: ["Nilson Automatic Four Slide"],
    source: "https://ajaxspring.com/four-slide/",
    wireDiameters: ".005–.250 in",
    plantStreet: "700 Ajax Drive, Madison Heights, MI 48071",
    industries: ["Automotive", "Medical", "Electronics"],
  },
  "wardzala-industries": {
    classes: ["cnc", "fourslide", "multi-slide"],
    machines: ["CNC wire forming (.062–.500 in)", "Fourslide (.040–.375 in)", "Multislide"],
    source: "https://www.wardzalaind.com/capabilities/cnc-wire-forming/",
    wireDiameters: ".040–.500 in",
    plantStreet: "9330 W. Grand Ave., Franklin Park, IL 60131",
    industries: ["Display", "Automotive", "Electronics", "Household"],
    extras: ["Mesh welding", "Spot welding", "Butt welding"],
  },
  "marshall-manufacturing": {
    classes: ["2d-cnc", "3d-cnc"],
    machines: ["2D/3D CNC wire and tube bending"],
    source:
      "https://www.marshallmfg.com/marshall-manufacturing-capabilities/cnc-wire-tube-bending/",
    wireDiameters: "Wire .062–.156 in · tube .062–.187 in",
    plantStreet: "3820 Chandler Drive, Minneapolis, MN 55421",
    industries: ["Medical devices"],
    extras: ["Laser welding", "Stainless steel", "Titanium"],
  },
  "supro-spring": {
    classes: ["cnc", "fourslide"],
    machines: ["CNC wire forming (to 12 mm / .472 in)", "Four slide"],
    source: "http://www.suprospring.com/cnc-wire-forming.html",
    wireDiameters: "CNC to 12 mm (.472 in)",
    plantStreet: "6440 Norwalk Rd. Unit N, Medina, OH 44256",
    extras: ["Stainless steel", "Copper", "Aluminum"],
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
    certifications: ["ISO 9001:2015"],
    industries: ["Automotive", "Medical", "Electric vehicles"],
    plantStreet: "33946 Doreka, Fraser, MI 48026",
  },
  "bihler-of-america": {
    classes: ["multi-slide", "fourslide"],
    machines: ["Bihler GRM-NC", "RM-NC", "4Slide-NC", "GRM 80"],
    source: "https://bihler.com/",
    certifications: ["ISO 9001:2015"],
    plantStreet: "85 Industrial Drive, Bldg. B, Phillipsburg, NJ 08865",
  },
  "apex-wire-products": {
    classes: ["2d-cnc", "3d-cnc"],
    machines: ["2D CNC wire forming", "3D CNC wire forming"],
    source: "https://www.apexwireproducts.com/cnc-wire-forming-services/",
    wireDiameters: "0.008–0.75 in",
    plantStreet: "9030 Gage Avenue, Franklin Park, IL 60131",
    industries: ["Medical", "Food service", "Industrial", "Transportation"],
    extras: [
      "from coil",
      "Welding",
      "Aluminum",
      "Steel",
      "Stainless steel",
    ],
    buyerFit: { prototypePolicy: "yes" },
  },
  "progress-wire-products": {
    classes: ["2d-cnc", "3d-cnc", "straighten-cut"],
    machines: [
      "Two-dimensional CNC wire forming (up to 5/16 in)",
      "Three-dimensional CNC wire forming (up to 5/16 in)",
      "CNC straighten & cut (.060–.375 in)",
    ],
    source: "http://www.progresswire.com/capabilities.html",
    wireDiameters: "Up to 5/16 in CNC · .060–.375 in straighten & cut",
    plantStreet: "532 Co Rd 1600, Ashland, OH 44805",
    extras: ["MIG welding", "Spot welding"],
  },
  "tusco-manufacturing": {
    classes: ["3d-cnc"],
    machines: ["AIM AFM3D1-TUF 3D CNC wire former"],
    source: "https://www.tuscomfg.com/capabilities/wire-forming/",
    wireDiameters: "12 ga–5/16 in (stocked bright basic)",
    industries: ["OEM", "Medical", "Retail fixtures"],
    extras: ["from coil", "Resistance welding", "Carbon steel", "Stainless steel"],
  },
  "oregon-wire": {
    classes: ["3d-cnc"],
    machines: ["3D CNC wire forming"],
    source: "https://www.oregonwire.co/what-is-wire-forming/",
    plantStreet: "13030 NE Whitaker Way, Portland, OR 97230",
  },
  "metco-fourslide": {
    classes: ["fourslide"],
    machines: ["Fourslide"],
    source: "https://metcofourslide.com",
    certifications: ["ISO 9001:2015", "AS9100D"],
    plantStreet: "17540 S Denver Avenue, Gardena, CA 90248",
    extras: ["Welding"],
  },
  "southington-tool-manufacturing": {
    classes: ["fourslide", "3d-cnc", "spring-cnc"],
    machines: [
      "20+ fourslides (strip and wire to .187 in)",
      "WAFIOS FMU 16 24-axis",
      "WAFIOS FMU 1 12-axis",
      "WAFIOS FTU 1.3 / FTU 3.3",
    ],
    source: "https://www.stmc.com/capabilities/cnc-wire-forming/",
    wireDiameters: "Fourslide to .187 in · CNC 0.010–0.120 in",
    certifications: ["ISO 9001", "ISO 13485"],
    industries: ["Medical", "Aerospace", "Automotive"],
    plantStreet: "300 Atwater Street, Plantsville, CT 06479",
  },
  "dynamic-manufacturing-bristol": {
    classes: ["fourslide"],
    machines: ["Fourslide"],
    source: "https://www.dymco.com/page/four-slide-and-stamping",
    plantStreet: "95 Valley Street, Suite 408, Bristol, CT 06010",
  },
  "northwest-fourslide": {
    classes: ["fourslide"],
    machines: ["Fourslide"],
    source: "https://nw4s.com/about-us/",
    wireDiameters: "Wire under 0.188 in",
    certifications: ["AS9100"],
    industries: ["Aerospace", "Defense", "Medical", "Electronics", "Automotive"],
    plantStreet: "888 Wild Dove Way, Lewiston, ID 83501",
  },
  "bel-air-manufacturing": {
    classes: ["fourslide"],
    machines: ["Fourslide"],
    source: "https://www.belairmfg.com/Four-Slide",
    plantStreet: "3525 W. Potomac Ave., Chicago, IL 60651",
  },
  "william-dudek-manufacturing": {
    classes: ["fourslide", "multi-slide"],
    machines: ["Fourslide", "Multi-slide"],
    source: "https://www.dudekmfg.com/capabilities/",
    wireDiameters: "Wire forms to 0.473 in (12 mm)",
    plantStreet: "4901 W Armitage Ave, Chicago, IL 60639",
  },
  "formco-metal-products": {
    classes: ["fourslide", "multi-slide"],
    machines: [
      "0 / 00 / #1 / RWI U.S. Baird four-slides",
      "0 / S2F / S3F Nilson four-slides",
    ],
    source: "https://formcometal.com/capabilities/four-slide-stamping/",
    wireDiameters: ".003–.187 in",
    certifications: ["ISO 9001:2015", "IATF 16949:2016", "AS9100D"],
    industries: ["Automotive", "Industrial", "Defense", "Medical"],
    plantStreet: "566 Clayton Court, Wood Dale, IL 60191",
  },
  "forward-metal-craft": {
    classes: ["fourslide", "multi-slide", "cnc"],
    machines: [
      "Fourslide / multislide (.010–.500 in)",
      "CNC wire forming (to 4 mm music wire)",
    ],
    source:
      "https://forwardmetalcraft.com/fourslide-stamping-overview-michigan-indiana-chicago-detroit-milwaukee.php",
    wireDiameters: ".010–.500 in fourslide · CNC to 4 mm music wire",
    certifications: ["ISO 9001:2015"],
    industries: ["Automotive", "Furniture"],
    plantStreet: "329 Summer Ave. NW, Grand Rapids, MI 49504",
  },
  "keats-southwest": {
    classes: ["fourslide", "multi-slide"],
    machines: [
      "Nilson #0 / S1F / S2F / 752",
      "US Baird #1 and 28/33/35MS",
      "Finzer Z 200",
    ],
    source: "https://www.keatsmfg.com/about/",
    wireDiameters: "To 0.150 in (33/35MS Baird)",
    certifications: ["ISO 9001", "ISO 14001", "IATF 16949"],
    plantStreet: "11425 Rojas Drive, El Paso, TX 79936",
  },
  "marlin-steel": {
    classes: ["2d-cnc", "3d-cnc"],
    machines: [
      "AIM 3D benders",
      "Robomac 3D benders",
      "IP Automation i10-S² 3D CNC",
      "Ultimatum 100 2D benders",
    ],
    source: "https://www.marlinwire.com/custom-wire-forms",
    wireDiameters: "0.003–0.625 in",
    certifications: ["ISO 9001:2015"],
    industries: ["Aerospace", "Defense", "Medical", "Food processing", "Automotive"],
    plantStreet: "2648 Merchant Drive, Baltimore, MD 21230",
    extras: ["Welding", "304 stainless", "316 stainless", "330 stainless", "Inconel"],
  },
  "newcomb-spring": {
    classes: ["cnc", "spring-cnc"],
    machines: [
      "Wafios FMU 6.7",
      "Wafios BM40 CNC horizontal wire bender",
      "CNC spring coilers (.007–.625 in)",
    ],
    source: "https://newcombspring.com/capabilities/metal-spring-forming-equipment",
    wireDiameters: ".007–.629 in",
    certifications: ["ISO 9001:2015"],
  },
  "james-spring-wire": {
    classes: ["fourslide", "cnc"],
    machines: ["Fourslides", "CNC formers"],
    source: "https://www.jamesspring.com",
    wireDiameters: ".006–.250 in",
    plantStreet: "6 N Bacton Hill Rd, Malvern, PA 19355",
    industries: ["Aerospace", "Medical", "Filtration", "Electronics", "Industrial"],
  },
};

const CLASS_RE: Record<IronClass, RegExp> = {
  "3d-cnc":
    /\b3[\s-]?d\s*cnc|\bthree[\s-]?dimensional(?:\s+and\s+two[\s-]?dimensional)?\s+cnc|\brobomac\b|\bnumalliance\b|\bafm[\s-]?3d|\bftx\d/i,
  "2d-cnc":
    /\b2[\s-]?d\s*cnc|\btwo[\s-]?dimensional(?:\s+and\s+three[\s-]?dimensional)?\s+cnc/i,
  "straighten-cut":
    /straighten(?:ing)?[\s&/-]+(?:and\s+)?cut|cut[\s-]?to[\s-]?length|\bctl\b/i,
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
  const capabilities = mergeLabels(company.capabilities, [
    ...note.machines,
    ...(note.extras ?? []),
  ]) ?? [...company.capabilities];
  return {
    ...company,
    machines: note.machines,
    equipmentSource: note.source,
    wireDiameters: note.wireDiameters ?? company.wireDiameters,
    certifications: mergeLabels(company.certifications, note.certifications),
    industries: mergeLabels(company.industries, note.industries),
    plantStreet: company.plantStreet ?? note.plantStreet,
    plantProofUrl: company.plantProofUrl ?? note.source,
    buyerFit: company.buyerFit ?? note.buyerFit,
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
