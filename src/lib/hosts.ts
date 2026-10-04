import { SITE_HOST, SITE_URL } from "@/lib/company";

/** Shop portal host. Same Vercel project; DNS is a CNAME to Vercel. */
export const SUPPLIER_SUBDOMAIN = "suppliers";
export const SUPPLIER_HOST = `${SUPPLIER_SUBDOMAIN}.${SITE_HOST}`;
export const SUPPLIER_URL = `https://${SUPPLIER_HOST}`;

export const AUDIENCE_HEADER = "x-site-audience";

export type SiteAudience = "buyer" | "supplier";

/**
 * Set `SUPPLIER_HOST_LIVE=1` in Vercel after `suppliers.usawireform.com`
 * resolves. Until then, the shop portal lives at `/suppliers` on the apex
 * so bookmarks and preview deploys keep working.
 */
export function supplierHostLive() {
  const flag = (
    process.env.NEXT_PUBLIC_SUPPLIER_HOST_LIVE ||
    process.env.SUPPLIER_HOST_LIVE ||
    ""
  )
    .trim()
    .toLowerCase();
  return flag === "1" || flag === "true" || flag === "yes";
}

export function normalizeHost(host: string) {
  return host.split(":")[0]?.trim().toLowerCase() ?? "";
}

export function hostnameFromRequest(req: { headers: Headers }) {
  const forwarded = req.headers.get("x-forwarded-host");
  const raw = forwarded?.split(",")[0]?.trim() || req.headers.get("host") || "";
  return normalizeHost(raw);
}

export function isSupplierHostname(host: string) {
  const h = normalizeHost(host);
  if (!h) return false;
  if (h === SUPPLIER_HOST || h === "suppliers.localhost") return true;
  const override = process.env.SUPPLIER_HOST?.trim().toLowerCase();
  return Boolean(override && h === override);
}

export function isBuyerHostname(host: string) {
  const h = normalizeHost(host);
  return h === SITE_HOST || h === `www.${SITE_HOST}` || h === "localhost" || h === "127.0.0.1";
}

/** Shop-only product paths. `/source` (exact) is the buyer RFQ and stays on the apex. */
export const SUPPLIER_PATHS = [
  "/suppliers",
  "/source/shops",
  "/source/equipment",
  "/source/upgrade",
  "/source/claim",
  "/source/nda",
  "/source/dashboard",
  "/source/account",
  "/source/enter",
  "/source/drawing",
] as const;

export function pathMatches(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function isSupplierPath(pathname: string) {
  return SUPPLIER_PATHS.some((prefix) => pathMatches(pathname, prefix));
}

export function isSharedPath(pathname: string) {
  return (
    pathMatches(pathname, "/api") ||
    pathMatches(pathname, "/admin") ||
    pathMatches(pathname, "/sign-in") ||
    pathMatches(pathname, "/sign-up") ||
    pathMatches(pathname, "/directory") ||
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname === "/site-map" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  );
}

export function staysOnSupplierHost(pathname: string) {
  if (pathname === "/" || pathname === "") return true;
  if (isSupplierPath(pathname)) return true;
  return isSharedPath(pathname);
}

export function shouldRedirectToSupplierHost(pathname: string) {
  if (!supplierHostLive()) return false;
  return isSupplierPath(pathname);
}

export function resolveAudience(input: {
  host: string;
  pathname: string;
}): SiteAudience {
  if (isSupplierHostname(input.host)) return "supplier";
  if (isSupplierPath(input.pathname)) return "supplier";
  return "buyer";
}

export function buyerOrigin() {
  return SITE_URL;
}

export function supplierOrigin() {
  return supplierHostLive() ? SUPPLIER_URL : SITE_URL;
}

export function buyerAbsoluteUrl(pathAndSearch: string) {
  const path = pathAndSearch.startsWith("/") ? pathAndSearch : `/${pathAndSearch}`;
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export function supplierAbsoluteUrl(pathAndSearch: string) {
  const path = pathAndSearch.startsWith("/") ? pathAndSearch : `/${pathAndSearch}`;
  if (!supplierHostLive()) {
    if (path === "/" || path === "/suppliers") return `${SITE_URL}/suppliers`;
    return `${SITE_URL}${path}`;
  }
  if (path === "/suppliers" || path === "/") return SUPPLIER_URL;
  return `${SUPPLIER_URL}${path}`;
}

export function publicSupplierUrl(path: string) {
  return supplierAbsoluteUrl(path);
}

export function clerkAuthorizedParties() {
  const parties = new Set<string>([
    SITE_URL,
    `https://www.${SITE_HOST}`,
    SUPPLIER_URL,
  ]);
  const vercel = process.env.VERCEL_URL?.trim() || process.env.NEXT_PUBLIC_VERCEL_URL?.trim();
  if (vercel) parties.add(vercel.startsWith("http") ? vercel : `https://${vercel}`);
  if (process.env.NODE_ENV !== "production") {
    parties.add("http://localhost:3000");
    parties.add("http://127.0.0.1:3000");
    parties.add("http://suppliers.localhost:3000");
  }
  return [...parties];
}

export type SiteChromeHrefs = {
  audience: SiteAudience;
  buyerHome: string;
  supplierHome: string;
};

export function siteChromeHrefs(input: {
  audience: SiteAudience;
  onSupplierHost: boolean;
}): SiteChromeHrefs {
  const live = supplierHostLive();
  const buyerHome = input.onSupplierHost && live ? SITE_URL : "/";
  const supplierHome = input.onSupplierHost
    ? "/"
    : live
      ? SUPPLIER_URL
      : "/suppliers";
  return {
    audience: input.audience,
    buyerHome,
    supplierHome,
  };
}
