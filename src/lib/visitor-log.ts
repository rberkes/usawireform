import { get, list, put } from "@vercel/blob";
import { blobAuth, blobReady, BLOB_ACCESS } from "@/lib/blob";

export const VISITOR_COOKIE = "wf_vid";
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export type VisitorKind = "page" | "click";
export type NetworkKind = "corp" | "isp" | "cloud" | "unknown";

export type VisitorHit = {
  kind: VisitorKind;
  at: string;
  path: string;
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  referrer?: string;
  ua?: string;
  session?: string;
  href?: string;
  label?: string;
  host?: string;
  network: NetworkKind;
  bot?: boolean;
};

export type VisitorHitRow = VisitorHit & { pathname: string };

const PREFIX = "visitors/";
const recent = new Map<string, number>();
const DEDUPE_MS = 20_000;

const ISP_HOST =
  /(?:comcast|verizon|att\.net|sbcglobal|cox\.net|spectrum|charter|centurylink|frontier|windstream|t-mobile|telus|shawcable|rogers\.|virginmedia|sky\.com|bt\.net|wanadoo|proxad|bellsouth|qwest|sonic\.net|optimum|cableone|mediacom|suddenlink|rr\.com|res\.rr)/i;
const CLOUD_HOST =
  /(?:amazonaws|googleusercontent|cloudflare|azure|microsoftonline|digitalocean|linode|ovh|hetzner|akamai|fastly|googlebot|crawl)/i;
const BOT_UA =
  /bot|crawler|spider|preview|slurp|bingpreview|facebookexternal|linkedinbot|whatsapp|telegram|discord|bytespider|gptbot|claudebot|applebot|semrush|ahrefs|mj12bot|dotbot/i;

function decodeHeader(value: string | null) {
  if (!value?.trim()) return undefined;
  try {
    return decodeURIComponent(value.trim());
  } catch {
    return value.trim();
  }
}

function clip(value: string | undefined, max: number) {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

export function visitorIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    headers.get("x-real-ip")?.trim() ||
    headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    undefined
  );
}

export function geoFromHeaders(headers: Headers) {
  return {
    city: decodeHeader(headers.get("x-vercel-ip-city")),
    region: decodeHeader(headers.get("x-vercel-ip-country-region")),
    country: decodeHeader(headers.get("x-vercel-ip-country")),
  };
}

export function isLikelyBot(ua?: string) {
  return Boolean(ua && BOT_UA.test(ua));
}

export function shouldSkipVisit(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (request.method !== "GET" && request.method !== "POST") return true;
  if (path.startsWith("/admin")) return true;
  if (path.startsWith("/api/")) return true;
  if (path.startsWith("/_next")) return true;
  if (path === "/favicon.ico") return true;
  if (request.headers.get("next-router-prefetch") === "1") return true;
  if (request.headers.get("purpose") === "prefetch") return true;
  if (request.headers.get("sec-purpose")?.includes("prefetch")) return true;
  return false;
}

function networkKind(host?: string): NetworkKind {
  if (!host) return "unknown";
  if (CLOUD_HOST.test(host)) return "cloud";
  if (ISP_HOST.test(host)) return "isp";
  return "corp";
}

async function reverseHost(ip: string) {
  try {
    const { promises: dns } = await import("node:dns");
    const names = await Promise.race([
      dns.reverse(ip),
      new Promise<string[]>((_, reject) => {
        setTimeout(() => reject(new Error("dns timeout")), 800);
      }),
    ]);
    return clip(names[0], 160);
  } catch {
    return undefined;
  }
}

function dedupeKey(hit: Pick<VisitorHit, "kind" | "path" | "session" | "ip" | "href">) {
  return [hit.kind, hit.session || hit.ip || "", hit.path, hit.href || ""].join("|");
}

function shouldDedupe(hit: VisitorHit) {
  if (hit.kind !== "page") return false;
  const key = dedupeKey(hit);
  const now = Date.now();
  const last = recent.get(key);
  if (last && now - last < DEDUPE_MS) return true;
  recent.set(key, now);
  if (recent.size > 400) {
    for (const [item, at] of recent) {
      if (now - at > DEDUPE_MS) recent.delete(item);
    }
  }
  return false;
}

export function newVisitorId() {
  return crypto.randomUUID();
}

export async function recordVisit(
  hit: VisitorHit,
  request?: Request,
): Promise<boolean> {
  if (shouldDedupe(hit)) return false;
  if (!(await blobReady(request))) return false;
  const day = hit.at.slice(0, 10);
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  await put(`${PREFIX}${day}/${id}.json`, JSON.stringify(hit), {
    access: BLOB_ACCESS,
    addRandomSuffix: true,
    contentType: "application/json",
    ...(await blobAuth(request)),
  });
  return true;
}

export async function hitFromRequest(
  request: Request,
  extra: {
    kind: VisitorKind;
    path: string;
    href?: string;
    label?: string;
    session?: string;
  },
): Promise<VisitorHit> {
  const headers = request.headers;
  const ip = visitorIp(headers);
  const ua = clip(headers.get("user-agent") || undefined, 240);
  const host = ip ? await reverseHost(ip) : undefined;
  return {
    kind: extra.kind,
    at: new Date().toISOString(),
    path: extra.path.slice(0, 300),
    ip,
    ...geoFromHeaders(headers),
    referrer: clip(decodeHeader(headers.get("referer")) || undefined, 400),
    ua,
    session: extra.session,
    href: clip(extra.href, 400),
    label: clip(extra.label, 80),
    host,
    network: networkKind(host),
    bot: isLikelyBot(ua),
  };
}

export function placeLabel(hit: Pick<VisitorHit, "city" | "region" | "country">) {
  return [hit.city, hit.region, hit.country].filter(Boolean).join(", ") || "Unknown";
}

export function networkLabel(hit: VisitorHit) {
  if (hit.network === "corp" && hit.host) return `Company · ${hit.host}`;
  if (hit.network === "isp" && hit.host) return `Home/ISP · ${hit.host}`;
  if (hit.network === "cloud" && hit.host) return `Cloud/bot · ${hit.host}`;
  if (hit.host) return hit.host;
  return hit.network === "unknown" ? "No reverse DNS" : hit.network;
}

export async function listRecentVisits(limit = 150): Promise<VisitorHitRow[]> {
  if (!(await blobReady())) return [];
  const blobs = [];
  let cursor: string | undefined;
  do {
    const page = await list({
      prefix: PREFIX,
      cursor,
      limit: 100,
      ...(await blobAuth()),
    });
    blobs.push(...page.blobs);
    cursor = page.hasMore && blobs.length < 400 ? page.cursor : undefined;
  } while (cursor);

  const newest = blobs
    .filter((item) => item.pathname.endsWith(".json"))
    .sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt))
    .slice(0, limit);

  const rows: VisitorHitRow[] = [];
  for (const blob of newest) {
    const file = await get(blob.pathname, {
      access: "private",
      useCache: false,
      ...(await blobAuth()),
    });
    if (!file?.stream || file.statusCode !== 200) continue;
    try {
      const payload = JSON.parse(
        await new Response(file.stream).text(),
      ) as Partial<VisitorHit>;
      rows.push({
        kind: payload.kind === "click" ? "click" : "page",
        at:
          String(payload.at ?? "") ||
          (blob.uploadedAt instanceof Date
            ? blob.uploadedAt.toISOString()
            : String(blob.uploadedAt)),
        path: String(payload.path ?? ""),
        ip: payload.ip ? String(payload.ip) : undefined,
        city: payload.city ? String(payload.city) : undefined,
        region: payload.region ? String(payload.region) : undefined,
        country: payload.country ? String(payload.country) : undefined,
        referrer: payload.referrer ? String(payload.referrer) : undefined,
        ua: payload.ua ? String(payload.ua) : undefined,
        session: payload.session ? String(payload.session) : undefined,
        href: payload.href ? String(payload.href) : undefined,
        label: payload.label ? String(payload.label) : undefined,
        host: payload.host ? String(payload.host) : undefined,
        network:
          payload.network === "corp" ||
          payload.network === "isp" ||
          payload.network === "cloud"
            ? payload.network
            : "unknown",
        bot: Boolean(payload.bot),
        pathname: blob.pathname,
      });
    } catch {
      /* skip */
    }
  }
  return rows;
}

export async function countRecentVisits() {
  const rows = await listRecentVisits(80);
  return rows.length;
}
