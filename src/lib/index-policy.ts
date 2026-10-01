/**
 * What Google should index.
 *
 * Index quality over index quantity. A page stays in the sitemap and
 * out of `noindex` only when it carries facts a buyer or a crawler
 * cannot get from a sibling URL.
 */

import { directoryListingHasSubstance } from "./directory-substance";
import { directoryCompanies } from "./directory";
import { shopsInCity } from "./graph";
import { getOhioCity, ohioCityPath } from "./ohio-cities";
import { FORMING_CAPABILITIES, FORMING_MATERIALS } from "./taxonomy";

export type IndexDecision = {
  path: string;
  index: boolean;
  reason: string;
};

const NEVER_INDEX_PREFIXES = [
  "/admin",
  "/buyer",
  "/sign-in",
  "/sign-up",
  "/source/dashboard",
  "/source/account",
  "/source/claim",
  "/source/nda",
  "/source/enter",
  "/source/privacy",
  "/source/drawing",
  "/api/",
];

const NEVER_INDEX_PATHS = new Set([
  "/architecture",
]);

/** Cleveland metro lander is a duplicate of /ohio/cleveland. */
const CANONICAL_OVERRIDES: Record<string, string> = {
  "/directory/areas/cleveland": "/ohio/cleveland",
  "/cnc-wire-forming": "/wire-forming/cnc-wire-forming",
  "/cnc-wire-bending": "/wire-forming/wire-bending",
};

for (const item of FORMING_CAPABILITIES) {
  for (const alias of item.aliases) {
    CANONICAL_OVERRIDES[alias] = item.path;
  }
}

export function canonicalOverride(path: string) {
  return CANONICAL_OVERRIDES[path];
}

export function pathIsPrivate(path: string) {
  if (NEVER_INDEX_PATHS.has(path)) return true;
  return NEVER_INDEX_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`) || path.startsWith(prefix),
  );
}

export function directoryPathIndexable(slug: string) {
  const company = directoryCompanies.find((item) => item.slug === slug);
  if (!company) return { index: false, reason: "Unknown listing" };
  if (!directoryListingHasSubstance(company)) {
    return {
      index: false,
      reason: "Thin listing — no website, phone, iron, or original description",
    };
  }
  return { index: true, reason: "Listing has a fact of its own" };
}

export function ohioCityPathIndexable(slug: string) {
  const city = getOhioCity(slug);
  if (!city) return { index: false, reason: "Unknown city" };
  if (city.plant || shopsInCity(city).length > 0) {
    return { index: true, reason: "Named plant or a directory shop in this city" };
  }
  return {
    index: false,
    reason: "No local shop or named plant — demand-only lander",
  };
}

export function pageIndexDecision(path: string): IndexDecision {
  if (pathIsPrivate(path)) {
    return { path, index: false, reason: "Private or desk URL" };
  }
  if (CANONICAL_OVERRIDES[path]) {
    return {
      path,
      index: false,
      reason: `Canonical is ${CANONICAL_OVERRIDES[path]}`,
    };
  }
  const directory = path.match(/^\/directory\/([^/]+)$/);
  if (directory && directory[1] !== "areas" && directory[1] !== "new") {
    const decision = directoryPathIndexable(directory[1]);
    return { path, ...decision };
  }
  const ohio = path.match(/^\/ohio\/([^/]+)$/);
  if (ohio) {
    const decision = ohioCityPathIndexable(ohio[1]);
    return { path, ...decision };
  }
  return { path, index: true, reason: "Public URL with its own record" };
}

export function shouldIndexPath(path: string) {
  return pageIndexDecision(path).index;
}
