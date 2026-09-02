import { COMPANY } from "./company";
import {
  IRON_FILTERS,
  companyIronClasses,
  type IronClass,
} from "./directory-iron";
import type { DirectoryCompany } from "./directory-types";
import { isFactoryListing } from "./plant-verify";
import {
  isSecondaryTerm,
  SECONDARY_TERMS,
  shopSecondaryHay,
  THIS_FLOOR_SECONDARY_HAY,
} from "./secondary-ops";

export const MACHINE_SEARCH_PATH = "/find-factories-by-machine";
export const MACHINE_SEARCH_LIMIT = 4;
export const MACHINE_SEARCH_API = "/api/machine-factories";

export type MachineDoc = {
  id: string;
  oem: string;
  model: string;
  kind: string;
  minMm: string;
  maxMm: string;
  hay: string;
  classes: IronClass[];
  shopSlug: string;
  href: string;
  shopName: string;
  location: string;
  country: "USA" | "Canada";
  filedOnSource: boolean;
  thisFloor?: boolean;
  source: "floor" | "public-page" | "source-cell";
};

export type MachineTerm = {
  id: string;
  label: string;
  aliases: string[];
  /** Shop must name one of these tokens. Do not map an OEM onto a whole class. */
  requireTokens?: string[];
  ironClass?: IronClass;
  seeAllHref?: string;
  hint?: boolean;
};

export type MachineSearchFactoryHit = {
  slug: string;
  href: string;
  name: string;
  location: string;
  why: string;
  thisFloor?: boolean;
};

export type MachineSearchResult = {
  query: string;
  term: { id: string; label: string; secondary?: boolean } | null;
  hits: MachineSearchFactoryHit[];
  shopTotal: number;
  machineTotal: number;
  seeAllHref?: string;
  seeAllLabel?: string;
};

const FACTORIES = "/wire-form-factories-in-usa";

const KIND_BY_CLASS: Record<IronClass, string> = {
  "3d-cnc": "3D CNC",
  "2d-cnc": "2D CNC",
  "straighten-cut": "Straighten & Cut to Length",
  cnc: "CNC",
  fourslide: "Fourslide",
  "multi-slide": "Multi-slide",
  "spring-cnc": "Spring CNC",
};

const CLASS_BY_KIND = Object.fromEntries(
  IRON_FILTERS.map((filter) => [KIND_BY_CLASS[filter.id].toLowerCase(), filter.id]),
) as Record<string, IronClass>;

/** Class and OEM terms an engineer actually types. Aliases only — not invented shops. */
export const MACHINE_TERMS: MachineTerm[] = [
  {
    id: "fourslide",
    label: "Fourslide",
    aliases: [
      "fourslide",
      "four-slide",
      "four slide",
      "4slide",
      "4-slide",
      "4 slide",
      "four sl",
    ],
    ironClass: "fourslide",
    seeAllHref: `${FACTORIES}?iron=fourslide`,
    hint: true,
  },
  {
    id: "multi-slide",
    label: "Multi-slide",
    aliases: [
      "multi-slide",
      "multislide",
      "multi slide",
      "verti-slide",
      "vertislide",
      "vertical slide",
    ],
    ironClass: "multi-slide",
    seeAllHref: `${FACTORIES}?iron=multi-slide`,
    hint: true,
  },
  {
    id: "3d-cnc",
    label: "3D CNC",
    aliases: ["3d cnc", "3-d cnc", "three dimensional cnc", "spatial cnc"],
    ironClass: "3d-cnc",
    seeAllHref: `${FACTORIES}?iron=3d-cnc`,
    hint: true,
  },
  {
    id: "2d-cnc",
    label: "2D CNC",
    aliases: ["2d cnc", "2-d cnc", "two dimensional cnc", "2d table"],
    ironClass: "2d-cnc",
    seeAllHref: `${FACTORIES}?iron=2d-cnc`,
  },
  {
    id: "straighten-cut",
    label: "Straighten & Cut to Length",
    aliases: [
      "straighten and cut",
      "straighten & cut",
      "straighten and cut to length",
      "straighten cut to length",
      "cut to length",
      "cut-to-length",
    ],
    ironClass: "straighten-cut",
    seeAllHref: `${FACTORIES}?iron=straighten-cut`,
    hint: true,
  },
  {
    id: "spring-cnc",
    label: "Spring CNC",
    aliases: ["spring cnc", "cnc coiler", "cnc coiling", "coiler"],
    ironClass: "spring-cnc",
    seeAllHref: `${FACTORIES}?iron=spring-cnc`,
  },
  {
    id: "cnc",
    label: "CNC",
    aliases: ["cnc"],
    ironClass: "cnc",
    seeAllHref: `${FACTORIES}?iron=cnc`,
  },
  {
    id: "robomac",
    label: "Robomac",
    aliases: ["robomac", "214tf", "r214tf", "r214", "214 tf"],
    requireTokens: ["robomac", "214tf", "r214tf", "r214"],
    hint: true,
  },
  {
    id: "numalliance",
    label: "Numalliance",
    aliases: ["numalliance", "num alliance"],
    requireTokens: ["numalliance", "robomac", "ftx"],
  },
  {
    id: "baird",
    label: "Baird",
    aliases: ["baird", "us baird", "u.s. baird"],
    requireTokens: ["baird"],
    hint: true,
  },
  {
    id: "nilson",
    label: "Nilson",
    aliases: ["nilson"],
    requireTokens: ["nilson"],
  },
  {
    id: "lubow",
    label: "Lubow",
    aliases: ["lubow", "lebow", "le bow"],
    requireTokens: ["lubow", "lebow"],
  },
  {
    id: "bihler",
    label: "Bihler",
    aliases: ["bihler", "grm-nc", "grm nc", "grm80", "grm 80", "rm-nc", "4slide-nc"],
    requireTokens: ["bihler", "grm", "rm-nc", "4slide-nc"],
    hint: true,
  },
  {
    id: "wafios",
    label: "WAFIOS",
    aliases: ["wafios"],
    requireTokens: ["wafios"],
    seeAllHref: `${FACTORIES}?iron=spring-cnc`,
    hint: true,
  },
  {
    id: "itaya",
    label: "Itaya",
    aliases: ["itaya"],
    requireTokens: ["itaya"],
    seeAllHref: `${FACTORIES}?iron=spring-cnc`,
  },
  {
    id: "aim",
    label: "AIM",
    aliases: ["aim", "afm3d", "afm 3d"],
    requireTokens: ["aim", "afm"],
  },
  {
    id: "torin",
    label: "Torin",
    aliases: ["torin"],
    requireTokens: ["torin"],
  },
  {
    id: "finzer",
    label: "Finzer",
    aliases: ["finzer"],
    requireTokens: ["finzer"],
  },
  {
    id: "sleeper-hartley",
    label: "Sleeper-Hartley",
    aliases: ["sleeper-hartley", "sleeper hartley"],
    requireTokens: ["sleeper"],
  },
];

export const SEARCH_TERMS: MachineTerm[] = [...MACHINE_TERMS, ...SECONDARY_TERMS];

export const MACHINE_HINTS = SEARCH_TERMS.filter((term) => term.hint);

const STOP = new Set([
  "wire",
  "form",
  "forms",
  "shop",
  "steel",
  "metal",
  "company",
  "manufacturing",
  "custom",
  "precision",
  "plant",
  "factory",
]);

const NAMED_OEM =
  /baird|nilson|bihler|robomac|numalliance|wafios|itaya|\baim\b|torin|finzer|sleeper/i;

export function foldMachineQuery(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function compactFold(value: string) {
  return foldMachineQuery(value).replace(/ /g, "");
}

function kindFromClass(id: IronClass) {
  return KIND_BY_CLASS[id];
}

function classFromKind(kind: string): IronClass | undefined {
  const folded = foldMachineQuery(kind);
  if (CLASS_BY_KIND[folded]) return CLASS_BY_KIND[folded];
  if (folded.includes("four") && folded.includes("slide")) return "fourslide";
  if (folded.includes("multi") && folded.includes("slide")) return "multi-slide";
  if (folded.includes("3d")) return "3d-cnc";
  if (folded.includes("2d")) return "2d-cnc";
  if (
    (folded.includes("straighten") && folded.includes("cut")) ||
    (folded.includes("cut") && folded.includes("length"))
  ) {
    return "straighten-cut";
  }
  if (folded.includes("spring") || folded.includes("coil")) return "spring-cnc";
  if (folded === "cnc") return "cnc";
  return undefined;
}

function tokenInHay(hay: string, token: string) {
  const folded = foldMachineQuery(token);
  if (!folded) return false;
  if (` ${hay} `.includes(` ${folded} `)) return true;
  if (folded.includes(" ") && hay.includes(folded)) return true;
  // Short tokens ("tig", "mig") must be whole words. Prefix matching
  // would treat "tight" as TIG.
  if (folded.length < 5) return false;
  return hay.split(" ").some((word) => word.startsWith(folded));
}

function termScore(term: MachineTerm, query: string) {
  let best = 0;
  for (const alias of term.aliases) {
    const aliasFold = foldMachineQuery(alias);
    if (!aliasFold) continue;
    if (aliasFold === query) best = Math.max(best, 100);
    else if (aliasFold.startsWith(query)) {
      best = Math.max(best, 86 - Math.min(aliasFold.length - query.length, 20));
    } else if (query.startsWith(aliasFold) && aliasFold.length >= 3) {
      const next = query[aliasFold.length];
      if (next === undefined || next === " ") {
        best = Math.max(best, 72);
      }
    } else if (query.length >= 3 && aliasFold.includes(query)) {
      best = Math.max(best, 55);
    }
  }
  return best;
}

function pickTerm(query: string) {
  let best: MachineTerm | null = null;
  let bestScore = 0;
  for (const term of SEARCH_TERMS) {
    const score = termScore(term, query);
    if (score > bestScore) {
      best = term;
      bestScore = score;
    }
  }
  if (bestScore < 50) return null;
  return best;
}

function isClassLabel(value: string) {
  const compact = compactFold(value);
  return (
    compact === "fourslide" ||
    compact === "4slide" ||
    compact === "multislide" ||
    compact === "cnc" ||
    compact === "3dcnc" ||
    compact === "2dcnc" ||
    compact === "straightencuttolength" ||
    compact === "springcnc"
  );
}

function parseFiledNote(note: string) {
  const parts = note.split("·").map((part) => part.trim()).filter(Boolean);
  if (parts.length < 3) return null;
  const band = parts.find((part) => /mm/i.test(part)) ?? "";
  const span = band.match(/([\d.]+)\s*[–-]\s*([\d.]+)/);
  const kind = parts.find((part) => classFromKind(part)) ?? "";
  const oem = parts[0] ?? "";
  const model = parts[1] && parts[1] !== kind ? parts[1] : "";
  if (!oem && !model && !kind) return null;
  return {
    oem,
    model,
    kind,
    minMm: span?.[1] ?? "",
    maxMm: span?.[2] ?? "",
  };
}

function machineId(shopSlug: string, oem: string, model: string, kind: string) {
  return [shopSlug, compactFold(oem), compactFold(model), compactFold(kind)]
    .filter(Boolean)
    .join("::");
}

function hayFor(oem: string, model: string, kind: string, extra = "") {
  return foldMachineQuery([oem, model, kind, extra].join(" "));
}

function whyFor(doc: MachineDoc, term: MachineTerm | null) {
  if (term && isSecondaryTerm(term)) return term.label;
  const model = doc.model.trim();
  const oem = doc.oem.trim();
  if (oem && model) {
    const foldedModel = foldMachineQuery(model);
    const foldedOem = foldMachineQuery(oem);
    if (foldedModel.startsWith(foldedOem) || foldedModel.includes(foldedOem)) {
      return model;
    }
    return `${oem} ${model}`;
  }
  if (model && !isClassLabel(model)) return model;
  return doc.kind || model || "Named on the public page";
}

function scoreDoc(doc: MachineDoc, query: string, named: boolean) {
  let score = 0;
  if (doc.thisFloor) score += 80;
  if (named) score += 40;
  if (NAMED_OEM.test(`${doc.oem} ${doc.model}`)) score += 18;
  if (doc.source === "source-cell") score += 14;
  if (doc.filedOnSource) score += 8;
  if (doc.country === "USA") score += 6;
  if (query && compactFold(`${doc.oem} ${doc.model}`).includes(compactFold(query))) {
    score += 10;
  }
  return score;
}

function kindMatchesClass(doc: MachineDoc, iron: IronClass) {
  const kindClass = classFromKind(doc.kind);
  if (iron === "cnc") {
    return kindClass === "cnc" || kindClass === "3d-cnc" || kindClass === "2d-cnc";
  }
  return kindClass === iron;
}

function docMatchesTerm(doc: MachineDoc, term: MachineTerm) {
  if (term.requireTokens?.length) {
    const named = term.requireTokens.some((token) => tokenInHay(doc.hay, token));
    if (named) return true;
    if (!term.ironClass) return false;
  }
  if (term.ironClass) {
    if (kindMatchesClass(doc, term.ironClass)) return true;
    return (
      doc.classes.includes(term.ironClass) &&
      NAMED_OEM.test(`${doc.oem} ${doc.model}`)
    );
  }
  return false;
}

function docMatchesQuery(doc: MachineDoc, query: string) {
  if (doc.hay.includes(query)) return true;
  return compactFold(`${doc.oem} ${doc.model} ${doc.kind}`).includes(
    query.replace(/ /g, ""),
  );
}

function namedHit(doc: MachineDoc, query: string) {
  const blob = foldMachineQuery(`${doc.oem} ${doc.model}`);
  if (!blob) return false;
  if (isClassLabel(blob)) return false;
  return blob.includes(query) || compactFold(blob).includes(query.replace(/ /g, ""));
}

function pushDoc(docs: MachineDoc[], seen: Set<string>, doc: Omit<MachineDoc, "id" | "hay"> & { hay?: string }) {
  const id = machineId(doc.shopSlug, doc.oem, doc.model, doc.kind);
  if (seen.has(id)) return;
  seen.add(id);
  docs.push({
    ...doc,
    id,
    hay: doc.hay ?? hayFor(doc.oem, doc.model, doc.kind),
  });
}

const THIS_FLOOR_DOC: Omit<MachineDoc, "id"> = {
  oem: "Numalliance",
  model: "Robomac 214TF",
  kind: "3D CNC",
  minMm: "4",
  maxMm: "14",
  hay: foldMachineQuery(
    `Numalliance Robomac 214TF R214TF 3D CNC from coil 4-14 mm ${THIS_FLOOR_SECONDARY_HAY}`,
  ),
  classes: ["3d-cnc"],
  shopSlug: "this-floor",
  href: "/equipment",
  shopName: COMPANY,
  location: "Northeast Ohio",
  country: "USA",
  filedOnSource: false,
  thisFloor: true,
  source: "floor",
};

/** One document per named cell. Class-only tags stay one row, not a fake floor list. */
export function machineDocsFromCompanies(companies: DirectoryCompany[]): MachineDoc[] {
  const docs: MachineDoc[] = [];
  const seen = new Set<string>();
  pushDoc(docs, seen, THIS_FLOOR_DOC);

  for (const company of companies) {
    if (!isFactoryListing(company)) continue;
    const classes = companyIronClasses(company);
    const shop = {
      shopSlug: company.slug,
      href: `/directory/${company.slug}`,
      shopName: company.name,
      location: company.location,
      country: company.country,
      filedOnSource: Boolean(company.filedOnSource),
      classes,
    };
    const secondaryHay = shopSecondaryHay(company);
    const notes = company.machines ?? [];
    let added = 0;
    for (const note of notes) {
      const filed = company.filedOnSource ? parseFiledNote(note) : null;
      if (filed) {
        pushDoc(docs, seen, {
          ...shop,
          oem: filed.oem,
          model: filed.model,
          kind: filed.kind,
          minMm: filed.minMm,
          maxMm: filed.maxMm,
          hay: hayFor(filed.oem, filed.model, filed.kind, secondaryHay),
          source: "source-cell",
        });
        added += 1;
        continue;
      }
      const kindClass = classFromKind(note);
      pushDoc(docs, seen, {
        ...shop,
        oem: "",
        model: note,
        kind: kindClass ? kindFromClass(kindClass) : note,
        minMm: "",
        maxMm: "",
        hay: hayFor("", note, kindClass ? kindFromClass(kindClass) : note, secondaryHay),
        source: "public-page",
      });
      added += 1;
    }
    if (added === 0) {
      for (const iron of companyIronClasses(company)) {
        pushDoc(docs, seen, {
          ...shop,
          oem: "",
          model: kindFromClass(iron),
          kind: kindFromClass(iron),
          minMm: "",
          maxMm: "",
          hay: hayFor("", kindFromClass(iron), kindFromClass(iron), secondaryHay),
          source: "public-page",
        });
        added += 1;
      }
    }
    if (added === 0 && foldMachineQuery(secondaryHay)) {
      pushDoc(docs, seen, {
        ...shop,
        oem: "",
        model: "Secondaries",
        kind: "Secondary",
        minMm: "",
        maxMm: "",
        hay: foldMachineQuery(secondaryHay),
        source: company.filedOnSource ? "source-cell" : "public-page",
      });
    }
  }

  return docs;
}

export function searchFactoriesByMachine(
  query: string,
  docs: MachineDoc[],
): MachineSearchResult {
  const trimmed = query.trim();
  const folded = foldMachineQuery(trimmed);
  if (folded.length < 2 || STOP.has(folded)) {
    return {
      query: trimmed,
      term: null,
      hits: [],
      shopTotal: 0,
      machineTotal: 0,
    };
  }

  const term = pickTerm(folded);
  const matched = docs.filter((doc) =>
    term ? docMatchesTerm(doc, term) : docMatchesQuery(doc, folded),
  );

  const ranked = matched
    .map((doc) => ({
      doc,
      named: namedHit(doc, folded),
      score: scoreDoc(doc, folded, namedHit(doc, folded)),
    }))
    .sort((a, b) => {
      const diff = b.score - a.score;
      if (diff !== 0) return diff;
      return a.doc.shopName.localeCompare(b.doc.shopName);
    });

  const shops = new Map<string, MachineSearchFactoryHit>();
  for (const row of ranked) {
    if (shops.has(row.doc.shopSlug)) continue;
    shops.set(row.doc.shopSlug, {
      slug: row.doc.shopSlug,
      href: row.doc.href,
      name: row.doc.shopName,
      location: row.doc.location,
      why: whyFor(row.doc, term),
      thisFloor: row.doc.thisFloor,
    });
  }

  const shopTotal = shops.size;
  const seeAllHref =
    shopTotal > MACHINE_SEARCH_LIMIT ? term?.seeAllHref : undefined;
  const seeAllLabel =
    seeAllHref && term
      ? `See all ${shopTotal} ${term.label} plants`
      : undefined;

  return {
    query: trimmed,
    term: term
      ? { id: term.id, label: term.label, secondary: isSecondaryTerm(term) }
      : null,
    hits: [...shops.values()].slice(0, MACHINE_SEARCH_LIMIT),
    shopTotal,
    machineTotal: matched.length,
    seeAllHref,
    seeAllLabel,
  };
}
