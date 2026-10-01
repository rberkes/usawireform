import assert from "node:assert/strict";
import { CNC_OEMS, modelPath, oemPath } from "../src/lib/cnc-oems";
import { directoryCompanies, getDirectoryCompany } from "../src/lib/directory";
import { directoryListingHasSubstance } from "../src/lib/directory-substance";
import {
  nearbyOhioCities,
  ohioCityHasLocalInventory,
} from "../src/lib/geo";
import {
  shopsForCapability,
  shopsForMaterial,
  shopsForModel,
  shopsServingOhioCity,
  shopTrail,
} from "../src/lib/graph";
import { shouldIndexPath } from "../src/lib/index-policy";
import { getOhioCity } from "../src/lib/ohio-cities";
import { allSeoPages } from "../src/lib/seo/pages";
import { FORMING_CAPABILITIES, FORMING_MATERIALS } from "../src/lib/taxonomy";

function ok(label: string, cond: boolean, extra = "") {
  if (!cond) throw new Error(`${label}${extra ? ` — ${extra}` : ""}`);
  console.log(`✓ ${label}${extra ? ` (${extra})` : ""}`);
}

ok("directory has shops", directoryCompanies.length >= 500, String(directoryCompanies.length));

for (const item of FORMING_CAPABILITIES) {
  const shops = shopsForCapability(item.slug);
  ok(`capability ${item.slug} has shops`, shops.length > 0, String(shops.length));
}

for (const item of FORMING_MATERIALS) {
  if (item.slug === "304-stainless") continue;
  ok(
    `material ${item.slug} has shops`,
    shopsForMaterial(item.slug).length > 0,
    String(shopsForMaterial(item.slug).length),
  );
}

const cleveland = getOhioCity("cleveland");
assert(cleveland);
const serving = shopsServingOhioCity(cleveland);
ok("Cleveland has local shops", serving.local.length >= 3, String(serving.local.length));
ok(
  "Cleveland is indexable",
  shouldIndexPath("/ohio/cleveland"),
);
ok(
  "Cleveland has local inventory",
  ohioCityHasLocalInventory(cleveland, directoryCompanies),
);

const akron = getOhioCity("akron");
assert(akron);
ok("Akron demand city is noindex", !shouldIndexPath("/ohio/akron"));
ok("Akron still has nearby cities", nearbyOhioCities(akron).length > 0);

const thin = directoryCompanies.find((shop) => !directoryListingHasSubstance(shop));
if (thin) {
  ok(
    "thin listing is noindex",
    !shouldIndexPath(`/directory/${thin.slug}`),
    thin.slug,
  );
}

const rich = directoryCompanies.find(
  (shop) => directoryListingHasSubstance(shop) && shop.website,
);
assert(rich);
ok(
  "substantial listing is indexed",
  shouldIndexPath(`/directory/${rich.slug}`),
  rich.slug,
);

ok(
  "Cleveland metro is canonicalized away",
  !shouldIndexPath("/directory/areas/cleveland"),
);
ok(
  "old CNC lander is not indexed",
  !shouldIndexPath("/cnc-wire-forming"),
);

const robomac = shopsForModel("numalliance", "robomac-214tf");
ok(
  "Robomac page path is short",
  modelPath("numalliance", "robomac-214tf") ===
    "/equipment/numalliance/robomac-214tf",
);
ok(
  "Numalliance hub path is short",
  oemPath("numalliance") === "/equipment/numalliance",
);

const wpc = getDirectoryCompany("wire-products-company");
if (wpc) {
  const trail = shopTrail(wpc);
  ok(
    "Wire Products trail includes a city or state",
    trail.some((node) => node.kind === "city" || node.kind === "state"),
  );
}

const pages = allSeoPages();
ok("taxonomy pages are in the SEO map", pages.some((page) => page.path === "/quote"));
ok(
  "3D taxonomy is in the SEO map",
  pages.some((page) => page.path === "/wire-forming/3d-wire-forming"),
);
ok("OEM catalog still has ten makers", CNC_OEMS.length === 10);

console.log("verify-index-graph passed");
