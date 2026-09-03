/**
 * Floors the operator owns.
 *
 * These never enter a teaser pool, so no listed shop can be outbid by the desk
 * that ranked it. That promise has to hold across brands: on a neutral platform
 * domain the owned floor carries a different name than the site, so this list
 * is deliberately NOT derived from SITE_HOST or COMPANY. Deriving it from the
 * site would quietly stop excluding anyone the day the platform is rebranded —
 * the precise failure this check exists to prevent.
 *
 * Add a floor here the day the operator acquires or opens it. Env additions let
 * one deploy serve several brands without a code change.
 */
const BUILT_IN_DOMAINS = ["usawireform.com"];
const BUILT_IN_NAMES = ["USA Wire Form"];

function envList(raw: string | undefined) {
  return (raw ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function key(value: string | undefined | null) {
  return (value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

const houseDomains = new Set(
  [...BUILT_IN_DOMAINS, ...envList(process.env.SOURCE_HOUSE_DOMAINS)].map(
    (item) => item.trim().toLowerCase().replace(/^@/, ""),
  ),
);

const houseNames = new Set(
  [...BUILT_IN_NAMES, ...envList(process.env.SOURCE_HOUSE_NAMES)].map(key),
);

/** Is this filing one of the operator's own floors? */
export function isHouseShop(
  row: { email?: string | null; company?: string | null } | null | undefined,
) {
  if (!row) return false;
  const email = (row.email ?? "").trim().toLowerCase();
  const domain = email.split("@")[1];
  if (domain && houseDomains.has(domain)) return true;
  const company = key(row.company);
  return Boolean(company) && houseNames.has(company);
}

/** Desk copy and the shop-facing promise both read this. */
export function houseShopNames() {
  return [...BUILT_IN_NAMES, ...envList(process.env.SOURCE_HOUSE_NAMES)];
}
