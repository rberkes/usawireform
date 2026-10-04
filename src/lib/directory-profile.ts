import { companyHasIron, companyIronClasses } from "@/lib/directory-iron";
import type { DirectoryCompany } from "@/lib/directory-types";
import { directoryListingHasSubstance } from "@/lib/directory-substance";
import {
  formatCoilPolicy,
  formatMinOrder,
  formatStockedMaterials,
  sourceFitSpecs,
} from "@/lib/source-fit";
import { sourceClaimable } from "@/lib/source-directory";
import { secondaryLabel } from "@/lib/source-secondaries";

export type DirectoryShopFact = {
  label: string;
  value: string;
};

function haystack(company: DirectoryCompany) {
  return [
    company.description,
    ...company.capabilities,
    ...(company.machines ?? []),
    ...(company.secondaries ?? []).map(secondaryLabel),
  ].join(" ");
}

function inferWelding(company: DirectoryCompany): string | undefined {
  const hay = haystack(company);
  const found: string[] = [];
  if (/resistance|spot weld|projection weld|cross[\s-]?wire/i.test(hay)) {
    found.push("Resistance");
  }
  if (/\bmig\b/i.test(hay)) found.push("MIG");
  if (/\btig\b/i.test(hay)) found.push("TIG");
  if (/laser weld/i.test(hay)) found.push("Laser");
  if (found.length === 0 && /weld/i.test(hay)) found.push("Welding");
  return found.length > 0 ? found.join(" / ") : undefined;
}

function inferCoilFed(company: DirectoryCompany): string | undefined {
  const filed = formatCoilPolicy(company.buyerFit);
  if (filed) return filed;
  const hay = haystack(company);
  if (/coil[\s-]?fed|from coil|decoil|coil feed/i.test(hay)) return "Yes";
  return undefined;
}

function inferCutToLength(company: DirectoryCompany): string | undefined {
  if (companyHasIron(company, "straighten-cut")) return "Yes";
  if (/cut[\s-]?to[\s-]?length|straighten(?:ing)?[\s&/-]+(?:and\s+)?cut/i.test(haystack(company))) {
    return "Yes";
  }
  return undefined;
}

function yesNo(value: boolean) {
  return value ? "Yes" : undefined;
}

/**
 * Engineer-facing facts a Thomas-style listing usually hides: named iron,
 * diameter band, 2D vs 3D, coil vs cut-to-length, weld process, materials,
 * MOQ, certs. Only emit a row when we actually have the fact — never invent
 * a machine model or a min order.
 */
export function directoryShopFacts(
  company: DirectoryCompany,
  opts: { includeLocation?: boolean } = {},
): DirectoryShopFact[] {
  const facts: DirectoryShopFact[] = [];
  if (opts.includeLocation !== false) {
    facts.push({ label: "Location", value: company.location });
  }
  if (company.machines && company.machines.length > 0) {
    facts.push({ label: "Machines", value: company.machines.join(", ") });
  }
  if (company.wireDiameters) {
    facts.push({ label: "Wire range", value: company.wireDiameters });
  }

  const classes = companyIronClasses(company);
  const cnc3d = yesNo(classes.includes("3d-cnc"));
  if (cnc3d) facts.push({ label: "3D CNC", value: cnc3d });
  const cnc2d = yesNo(classes.includes("2d-cnc"));
  if (cnc2d) facts.push({ label: "2D CNC", value: cnc2d });
  if (classes.includes("fourslide")) facts.push({ label: "Fourslide", value: "Yes" });
  if (classes.includes("multi-slide")) facts.push({ label: "Multislide", value: "Yes" });

  const coil = inferCoilFed(company);
  if (coil) facts.push({ label: "Coil fed", value: coil });
  const cut = inferCutToLength(company);
  if (cut) facts.push({ label: "Cut-to-length", value: cut });

  const welding = inferWelding(company);
  if (welding) facts.push({ label: "Welding", value: welding });

  const materials = formatStockedMaterials(company.buyerFit);
  if (materials) facts.push({ label: "Materials", value: materials });

  const moq = formatMinOrder(company.buyerFit);
  if (moq) facts.push({ label: "MOQ", value: moq });

  if (company.certifications && company.certifications.length > 0) {
    facts.push({ label: "Certifications", value: company.certifications.join(", ") });
  }
  if (company.industries && company.industries.length > 0) {
    facts.push({ label: "Industries", value: company.industries.join(" / ") });
  }
  if (company.established) {
    facts.push({ label: "Established", value: company.established });
  }
  if (company.weeklyCapacity) {
    facts.push({ label: "Capacity", value: company.weeklyCapacity });
  }
  if (company.plantStreet) {
    facts.push({ label: "Plant", value: company.plantStreet });
  }
  if (company.phone) {
    facts.push({ label: "Phone", value: company.phone });
  }

  const used = new Set(facts.map((fact) => fact.label));
  const fitAliases: Record<string, string> = {
    "Minimum order": "MOQ",
    "Stocked materials": "Materials",
    Coil: "Coil fed",
  };
  for (const row of sourceFitSpecs(company.buyerFit)) {
    const label = fitAliases[row.label] ?? row.label;
    if (used.has(label) || used.has(row.label)) continue;
    facts.push({ label, value: row.value });
    used.add(label);
  }

  return facts;
}

/** Compact card view — skip location (already on the card) and cap long lists. */
export function directoryCardFacts(company: DirectoryCompany): DirectoryShopFact[] {
  return directoryShopFacts(company, { includeLocation: false }).slice(0, 8);
}

export function directoryFactScore(company: DirectoryCompany) {
  let score = 0;
  if (company.machines && company.machines.length > 0) score += 4;
  if (company.wireDiameters) score += 3;
  if (company.buyerFit) score += 2;
  if (company.certifications && company.certifications.length > 0) score += 1;
  if (company.industries && company.industries.length > 0) score += 1;
  if (company.secondaries && company.secondaries.length > 0) score += 1;
  if (companyIronClasses(company).length > 0) score += 1;
  if (company.filedOnSource) score += 2;
  return score;
}

/** USA shops with enough machine-level facts to show an engineer. */
export function machineLevelDirectoryShops(
  companies: DirectoryCompany[],
  limit = 12,
): DirectoryCompany[] {
  return companies
    .filter((company) => company.country === "USA")
    .filter((company) => directoryListingHasSubstance(company))
    .filter((company) => directoryFactScore(company) >= 3)
    .sort((a, b) => directoryFactScore(b) - directoryFactScore(a))
    .slice(0, limit);
}

/**
 * Claimable USA shops that already publish equipment. Filing cells adds
 * capacity, coil policy, and MOQ — those also feed matching.
 */
export function prioritySourceClaimShops(
  companies: DirectoryCompany[],
  limit = 12,
): DirectoryCompany[] {
  return companies
    .filter((company) => sourceClaimable(company))
    .filter((company) => Boolean(company.equipmentSource))
    .sort((a, b) => directoryFactScore(b) - directoryFactScore(a))
    .slice(0, limit);
}
