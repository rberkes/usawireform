/**
 * Technical index audit.
 *
 * Counts public URLs, finds duplicate titles, thin listings, geo
 * landers with no local inventory, sitemap/noindex mismatches, and
 * graph coverage. Run from `/admin/index` or `npm run index:audit`.
 */

import { CNC_OEMS, allCncModels, oemPath, modelPath } from "./cnc-oems";
import { directoryCompanies } from "./directory";
import { directoryListingHasSubstance } from "./directory-substance";
import {
  companyCapabilities,
  companyMaterials,
  companyModels,
  companyOems,
  shopsForCapability,
  shopsForMaterial,
  shopsForModel,
  shopsForOem,
  shopsInCity,
} from "./graph";
import { pageIndexDecision, shouldIndexPath } from "./index-policy";
import { OHIO_CITIES, ohioCityPath } from "./ohio-cities";
import { allSeoPages } from "./seo/pages";
import { FORMING_CAPABILITIES, FORMING_MATERIALS, QUOTE_PATH } from "./taxonomy";
import { US_STATES } from "./states";

export type AuditFinding = {
  severity: "error" | "warn" | "info";
  area: string;
  title: string;
  detail: string;
  paths?: string[];
};

export type IndexAudit = {
  generatedAt: string;
  counts: {
    seoPages: number;
    indexable: number;
    noindex: number;
    shops: number;
    substantialShops: number;
    thinShops: number;
    ohioCities: number;
    ohioCitiesIndexed: number;
    capabilities: number;
    materials: number;
    oems: number;
    models: number;
    states: number;
  };
  coverage: {
    shopsWithCapability: number;
    shopsWithMaterial: number;
    shopsWithOem: number;
    shopsWithModel: number;
    capabilityPages: { slug: string; shops: number }[];
    materialPages: { slug: string; shops: number }[];
    oemPages: { slug: string; shops: number }[];
  };
  findings: AuditFinding[];
};

function clipList(paths: string[], max = 8) {
  return paths.slice(0, max);
}

export function runIndexAudit(): IndexAudit {
  const pages = allSeoPages();
  const indexable = pages.filter((page) => shouldIndexPath(page.path));
  const noindex = pages.filter((page) => !shouldIndexPath(page.path));
  const substantialShops = directoryCompanies.filter(directoryListingHasSubstance);
  const thinShops = directoryCompanies.filter((shop) => !directoryListingHasSubstance(shop));
  const ohioIndexed = OHIO_CITIES.filter((city) => shouldIndexPath(ohioCityPath(city)));

  const titleMap = new Map<string, string[]>();
  for (const page of indexable) {
    const key = page.title.trim().toLowerCase();
    const list = titleMap.get(key) ?? [];
    list.push(page.path);
    titleMap.set(key, list);
  }
  const duplicateTitles = [...titleMap.entries()].filter(([, paths]) => paths.length > 1);

  const longTitles = indexable.filter((page) => page.title.length > 65);
  const shortDescriptions = indexable.filter((page) => page.description.length < 70);
  const longDescriptions = indexable.filter((page) => page.description.length > 170);

  const templateStateTitles = indexable.filter((page) =>
    /^Wire Forming Companies in /.test(page.title),
  );

  const findings: AuditFinding[] = [];

  if (duplicateTitles.length > 0) {
    findings.push({
      severity: "warn",
      area: "titles",
      title: `${duplicateTitles.length} duplicate titles among indexable pages`,
      detail:
        "Google uses the title to tell pages apart. Two indexable URLs with the same title look like one page.",
      paths: clipList(duplicateTitles.flatMap(([, paths]) => paths), 12),
    });
  }

  if (templateStateTitles.length > 8) {
    findings.push({
      severity: "warn",
      area: "geo",
      title: `${templateStateTitles.length} state titles still use the same sentence`,
      detail:
        "State pages should lead with shop count and local inventory, not a location-swapped H1.",
      paths: clipList(templateStateTitles.map((page) => page.path)),
    });
  }

  if (thinShops.length > 0) {
    findings.push({
      severity: "info",
      area: "directory",
      title: `${thinShops.length} listings are noindex until they have a fact`,
      detail:
        "Reachable from /directory and claimable. Kept out of the sitemap on purpose.",
      paths: clipList(thinShops.map((shop) => `/directory/${shop.slug}`)),
    });
  }

  const thinOhio = OHIO_CITIES.filter((city) => !shouldIndexPath(ohioCityPath(city)));
  if (thinOhio.length > 0) {
    findings.push({
      severity: "info",
      area: "geo",
      title: `${thinOhio.length} Ohio city pages are noindex (no local shop or named plant)`,
      detail:
        "They still render nearby shops. Do not scale this pattern to 20,000 cities.",
      paths: thinOhio.map((city) => ohioCityPath(city)),
    });
  }

  if (longTitles.length > 0) {
    findings.push({
      severity: "info",
      area: "titles",
      title: `${longTitles.length} titles are longer than 65 characters`,
      detail: "Google typically truncates around 60–65 characters.",
      paths: clipList(longTitles.map((page) => page.path)),
    });
  }

  if (shortDescriptions.length > 0) {
    findings.push({
      severity: "info",
      area: "snippets",
      title: `${shortDescriptions.length} meta descriptions are under 70 characters`,
      detail: "Short snippets waste the SERP real estate.",
      paths: clipList(shortDescriptions.map((page) => page.path)),
    });
  }

  if (longDescriptions.length > 40) {
    findings.push({
      severity: "info",
      area: "snippets",
      title: `${longDescriptions.length} meta descriptions are over 170 characters`,
      detail: "They will be truncated. Prefer ~150–160.",
      paths: clipList(longDescriptions.map((page) => page.path)),
    });
  }

  const capabilityPages = FORMING_CAPABILITIES.map((item) => ({
    slug: item.slug,
    shops: shopsForCapability(item.slug).length,
  }));
  const emptyCaps = capabilityPages.filter((item) => item.shops === 0);
  if (emptyCaps.length > 0) {
    findings.push({
      severity: "error",
      area: "taxonomy",
      title: `${emptyCaps.length} capability pages match zero shops`,
      detail: "A taxonomy page with no shops is a brochure. Do not publish it.",
      paths: emptyCaps.map((item) => `/wire-forming/${item.slug}`),
    });
  }

  const materialPages = FORMING_MATERIALS.map((item) => ({
    slug: item.slug,
    shops: shopsForMaterial(item.slug).length,
  }));
  const emptyMaterials = materialPages.filter((item) => item.shops === 0);
  if (emptyMaterials.length > 0) {
    findings.push({
      severity: "warn",
      area: "taxonomy",
      title: `${emptyMaterials.length} material pages match zero shops`,
      detail: "Keep the page only if the engineering content stands alone.",
      paths: emptyMaterials.map((item) => `/materials/${item.slug}`),
    });
  }

  const oemPages = CNC_OEMS.map((oem) => ({
    slug: oem.slug,
    shops: shopsForOem(oem.slug).length,
  }));

  const sitemapNoindex = noindex.filter((page) =>
    page.path.startsWith("/directory/") || page.path.startsWith("/ohio/"),
  );
  if (sitemapNoindex.length > 0) {
    findings.push({
      severity: "info",
      area: "sitemap",
      title: `${sitemapNoindex.length} noindex URLs must stay out of the XML sitemap`,
      detail: "sitemap.ts uses shouldIndexPath(). If a URL appears in both, that is a bug.",
      paths: clipList(sitemapNoindex.map((page) => page.path)),
    });
  }

  findings.push({
    severity: "info",
    area: "robots",
    title: "robots.txt blocks desk URLs and AI training crawlers",
    detail:
      "Googlebot is allowed. /admin, /buyer, Clerk, and Source desks are disallowed. Leftover /architecture stays disallowed.",
  });

  findings.push({
    severity: "info",
    area: "canonicals",
    title: "Root layout must not set a site-wide canonical to /",
    detail:
      "A layout-level alternates.canonical of / would tell Google every page is the homepage. pageMeta() sets a per-path canonical.",
  });

  findings.push({
    severity: "info",
    area: "rfq",
    title: `RFQ hub is ${QUOTE_PATH}`,
    detail:
      "Commercial pages should point here: upload CAD → manufacturability → match shops → quote. Instant quote and Source stay as the two doors.",
  });

  const shopsWithCapability = directoryCompanies.filter(
    (shop) => companyCapabilities(shop).length > 0,
  ).length;
  const shopsWithMaterial = directoryCompanies.filter(
    (shop) => companyMaterials(shop).length > 0,
  ).length;
  const shopsWithOem = directoryCompanies.filter((shop) => companyOems(shop).length > 0).length;
  const shopsWithModel = directoryCompanies.filter((shop) => companyModels(shop).length > 0).length;

  return {
    generatedAt: new Date().toISOString(),
    counts: {
      seoPages: pages.length,
      indexable: indexable.length,
      noindex: noindex.length,
      shops: directoryCompanies.length,
      substantialShops: substantialShops.length,
      thinShops: thinShops.length,
      ohioCities: OHIO_CITIES.length,
      ohioCitiesIndexed: ohioIndexed.length,
      capabilities: FORMING_CAPABILITIES.length,
      materials: FORMING_MATERIALS.length,
      oems: CNC_OEMS.length,
      models: allCncModels().length,
      states: US_STATES.length,
    },
    coverage: {
      shopsWithCapability,
      shopsWithMaterial,
      shopsWithOem,
      shopsWithModel,
      capabilityPages,
      materialPages,
      oemPages,
    },
    findings,
  };
}

export function auditMarkdown(audit: IndexAudit) {
  const lines = [
    `# Index audit`,
    ``,
    `Generated ${audit.generatedAt}`,
    ``,
    `## Counts`,
    ``,
    `- Public SEO records: ${audit.counts.seoPages}`,
    `- Indexable: ${audit.counts.indexable}`,
    `- noindex: ${audit.counts.noindex}`,
    `- Directory shops: ${audit.counts.shops} (${audit.counts.substantialShops} with substance, ${audit.counts.thinShops} thin)`,
    `- Ohio city pages indexed: ${audit.counts.ohioCitiesIndexed} / ${audit.counts.ohioCities}`,
    `- Capability pages: ${audit.counts.capabilities}`,
    `- Material pages: ${audit.counts.materials}`,
    `- OEM / model pages: ${audit.counts.oems} / ${audit.counts.models}`,
    ``,
    `## Graph coverage`,
    ``,
    `- Shops mapped to a capability: ${audit.coverage.shopsWithCapability}`,
    `- Shops mapped to a material: ${audit.coverage.shopsWithMaterial}`,
    `- Shops mapped to an OEM: ${audit.coverage.shopsWithOem}`,
    `- Shops mapped to a named model: ${audit.coverage.shopsWithModel}`,
    ``,
    `## Findings`,
    ``,
  ];
  for (const finding of audit.findings) {
    lines.push(`### [${finding.severity}] ${finding.title}`);
    lines.push(``);
    lines.push(finding.detail);
    if (finding.paths?.length) {
      lines.push(``);
      for (const path of finding.paths) lines.push(`- ${path}`);
    }
    lines.push(``);
  }
  return lines.join("\n");
}

export function modelShopCounts() {
  return allCncModels().map(({ oem, model }) => ({
    path: modelPath(oem, model),
    shops: shopsForModel(oem.slug, model.slug).length,
  }));
}

export function oemShopCounts() {
  return CNC_OEMS.map((oem) => ({
    path: oemPath(oem),
    shops: shopsForOem(oem.slug).length,
  }));
}

export function localOhioShopCounts() {
  return OHIO_CITIES.map((city) => ({
    path: ohioCityPath(city),
    shops: shopsInCity(city).length,
    index: shouldIndexPath(ohioCityPath(city)),
  }));
}

export { pageIndexDecision };
