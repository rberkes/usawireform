/**
 * Directory relationships: shop ↔ capability ↔ material ↔ machine ↔ place.
 *
 * Pages should call these helpers instead of re-matching free text.
 * A listing with a Robomac and stainless 3D work should automatically
 * connect Cleveland → Ohio → 3D → Stainless → Numalliance → Robomac.
 */

import { CNC_OEMS, type CncModel, type CncOem } from "./cnc-oems";
import type { DirectoryCompany } from "./directory-types";
import { directoryCompanies } from "./directory";
import { companyHasIron, type IronClass } from "./directory-iron";
import {
  companyDistanceToOhioCity,
  companyMatchesCity,
  parseCompanyPlace,
} from "./geo";
import { getStateByAbbr } from "./states";
import {
  FORMING_CAPABILITIES,
  FORMING_INDUSTRIES,
  FORMING_MATERIALS,
  QUOTE_PATH,
  type FormingCapability,
  type FormingIndustry,
  type FormingMaterial,
} from "./taxonomy";
import { getOhioCity, ohioCityPath, type OhioCity } from "./ohio-cities";

export type GraphKind =
  | "city"
  | "state"
  | "capability"
  | "material"
  | "oem"
  | "machine"
  | "industry"
  | "shop"
  | "quote"
  | "engineering";

export type GraphNode = {
  href: string;
  label: string;
  kind: GraphKind;
};

function companyText(company: DirectoryCompany) {
  return [
    company.description,
    company.wireDiameters ?? "",
    ...(company.capabilities ?? []),
    ...(company.machines ?? []),
    ...(company.industries ?? []),
    ...(company.secondaries ?? []),
    ...(company.certifications ?? []),
  ].join(" ");
}

export function companyCapabilities(company: DirectoryCompany): FormingCapability[] {
  const text = companyText(company);
  return FORMING_CAPABILITIES.filter((item) => {
    if (item.iron?.some((id) => companyHasIron(company, id as IronClass))) {
      return true;
    }
    return item.match.test(text);
  });
}

export function companyMaterials(company: DirectoryCompany): FormingMaterial[] {
  const text = companyText(company);
  return FORMING_MATERIALS.filter((item) => item.match.test(text));
}

export function companyIndustries(company: DirectoryCompany): FormingIndustry[] {
  const named = (company.industries ?? []).join(" ");
  const text = `${named} ${company.description}`;
  return FORMING_INDUSTRIES.filter((item) => item.match.test(text));
}

/** Catalog slugs that are class names, not a machine a shop would publish. */
const GENERIC_MODEL_SLUGS = new Set([
  "3d-cnc",
  "2d-cnc",
  "wire-former",
  "2d-former",
  "spring-former",
  "heavy-wire",
  "compact",
  "cell",
  "straightener",
  "decoiler",
  "twin-head",
  "twin-head-standard",
  "multi-axis",
  "multi-axis-spring",
  "cnc-coiler",
  "cnc-former",
  "smart",
  "elect",
  "custom-cell",
  "robot-tend",
  "strip-former",
  "torsion-cnc",
]);

function tokensForModel(model: CncModel) {
  if (GENERIC_MODEL_SLUGS.has(model.slug)) return [];
  const name = model.name.toLowerCase();
  const slug = model.slug.replace(/-/g, " ");
  const compact = model.slug.replace(/-/g, "");
  return [...new Set([name, slug, compact].filter((token) => token.length >= 5))];
}

function oemMentioned(text: string, oem: CncOem) {
  const name = oem.name.toLowerCase();
  if (name.length >= 5 && text.includes(name)) return true;
  if (oem.slug === "blm-group") return /\bblm\b/.test(text);
  if (oem.slug === "aim") return /\baim\b/.test(text) && /\b(cnc|inc|machine|former)\b/.test(text);
  if (oem.slug === "pave") return /\bpave\b/.test(text) && /\b(cnc|wire|machine)\b/.test(text);
  return text.includes(name);
}

export function companyOems(company: DirectoryCompany): CncOem[] {
  const text = companyText(company).toLowerCase();
  return CNC_OEMS.filter((oem) => {
    if (oemMentioned(text, oem)) return true;
    return oem.models.some((model) =>
      tokensForModel(model).some((token) => text.includes(token)),
    );
  });
}

export function companyModels(company: DirectoryCompany): { oem: CncOem; model: CncModel }[] {
  const text = companyText(company).toLowerCase();
  const hits: { oem: CncOem; model: CncModel }[] = [];
  for (const oem of CNC_OEMS) {
    for (const model of oem.models) {
      if (tokensForModel(model).some((token) => text.includes(token))) {
        hits.push({ oem, model });
      }
    }
  }
  return hits;
}

export function shopsForCapability(slug: string, shops = directoryCompanies) {
  const capability = FORMING_CAPABILITIES.find((item) => item.slug === slug);
  if (!capability) return [];
  return shops.filter((shop) => companyCapabilities(shop).some((item) => item.slug === slug));
}

export function shopsForMaterial(slug: string, shops = directoryCompanies) {
  return shops.filter((shop) => companyMaterials(shop).some((item) => item.slug === slug));
}

export function shopsForIndustry(slug: string, shops = directoryCompanies) {
  return shops.filter((shop) => companyIndustries(shop).some((item) => item.slug === slug));
}

export function shopsForOem(oemSlug: string, shops = directoryCompanies) {
  return shops.filter((shop) => companyOems(shop).some((oem) => oem.slug === oemSlug));
}

export function shopsForModel(
  oemSlug: string,
  modelSlug: string,
  shops = directoryCompanies,
) {
  return shops.filter((shop) =>
    companyModels(shop).some(
      (hit) => hit.oem.slug === oemSlug && hit.model.slug === modelSlug,
    ),
  );
}

export function shopsInCity(city: OhioCity, shops = directoryCompanies) {
  return shops.filter((shop) => companyMatchesCity(shop, city));
}

export function shopsServingOhioCity(city: OhioCity, shops = directoryCompanies) {
  const local = shopsInCity(city, shops);
  const state = shops.filter((shop) => shop.state === "OH" && !local.includes(shop));
  return {
    local,
    state: state
      .map((shop) => ({
        shop,
        miles: companyDistanceToOhioCity(shop, city),
      }))
      .sort((a, b) => (a.miles ?? 999) - (b.miles ?? 999)),
  };
}

export type InventorySummary = {
  capabilities: FormingCapability[];
  materials: FormingMaterial[];
  industries: FormingIndustry[];
  oems: CncOem[];
  models: { oem: CncOem; model: CncModel }[];
  wireRanges: string[];
  certifications: string[];
};

export function inventorySummary(shops: DirectoryCompany[]): InventorySummary {
  const capabilities = new Map<string, FormingCapability>();
  const materials = new Map<string, FormingMaterial>();
  const industries = new Map<string, FormingIndustry>();
  const oems = new Map<string, CncOem>();
  const models = new Map<string, { oem: CncOem; model: CncModel }>();
  const wire = new Set<string>();
  const certs = new Set<string>();

  for (const shop of shops) {
    for (const item of companyCapabilities(shop)) capabilities.set(item.slug, item);
    for (const item of companyMaterials(shop)) materials.set(item.slug, item);
    for (const item of companyIndustries(shop)) industries.set(item.slug, item);
    for (const oem of companyOems(shop)) oems.set(oem.slug, oem);
    for (const hit of companyModels(shop)) {
      models.set(`${hit.oem.slug}/${hit.model.slug}`, hit);
    }
    if (shop.wireDiameters) wire.add(shop.wireDiameters);
    for (const cert of shop.certifications ?? []) certs.add(cert);
  }

  return {
    capabilities: [...capabilities.values()],
    materials: [...materials.values()],
    industries: [...industries.values()],
    oems: [...oems.values()],
    models: [...models.values()],
    wireRanges: [...wire],
    certifications: [...certs],
  };
}

export function shopTrail(company: DirectoryCompany): GraphNode[] {
  const nodes: GraphNode[] = [];
  const place = parseCompanyPlace(company);
  const state = getStateByAbbr(company.state);

  if (company.state === "OH") {
    const ohioCity = getOhioCity(
      place.city.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    );
    if (ohioCity) {
      nodes.push({
        href: ohioCityPath(ohioCity),
        label: ohioCity.name,
        kind: "city",
      });
    }
  } else if (place.city) {
    nodes.push({
      href: state ? `/${state.slug}` : "/directory",
      label: place.city,
      kind: "city",
    });
  }

  if (state) {
    nodes.push({ href: `/${state.slug}`, label: state.name, kind: "state" });
  }

  const caps = companyCapabilities(company);
  const preferred =
    caps.find((item) => item.slug === "3d-wire-forming") ??
    caps.find((item) => item.slug === "cnc-wire-forming") ??
    caps[0];
  if (preferred) {
    nodes.push({ href: preferred.path, label: preferred.title, kind: "capability" });
  }

  const materials = companyMaterials(company);
  const material =
    materials.find((item) => item.slug === "stainless-steel") ?? materials[0];
  if (material) {
    nodes.push({ href: material.path, label: material.title, kind: "material" });
  }

  const models = companyModels(company);
  const oems = companyOems(company);
  if (models[0]) {
    const { oem, model } = models[0];
    nodes.push({
      href: `/equipment/${oem.slug}`,
      label: oem.name,
      kind: "oem",
    });
    nodes.push({
      href: `/equipment/${oem.slug}/${model.slug}`,
      label: model.name,
      kind: "machine",
    });
  } else if (oems[0]) {
    nodes.push({
      href: `/equipment/${oems[0].slug}`,
      label: oems[0].name,
      kind: "oem",
    });
  }

  nodes.push({
    href: `/directory/${company.slug}`,
    label: company.name,
    kind: "shop",
  });

  return uniqueNodes(nodes);
}

export function relatedLinks(company: DirectoryCompany): GraphNode[] {
  const nodes: GraphNode[] = shopTrail(company).filter((node) => node.kind !== "shop");
  for (const item of companyIndustries(company).slice(0, 3)) {
    nodes.push({ href: item.path, label: item.title, kind: "industry" });
  }
  nodes.push({ href: QUOTE_PATH, label: "Upload a print", kind: "quote" });
  return uniqueNodes(nodes);
}

function uniqueNodes(nodes: GraphNode[]) {
  const seen = new Set<string>();
  const out: GraphNode[] = [];
  for (const node of nodes) {
    if (seen.has(node.href)) continue;
    seen.add(node.href);
    out.push(node);
  }
  return out;
}
