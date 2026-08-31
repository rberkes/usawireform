import { headers } from "next/headers";

export type LeadOrigin = {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  postal?: string;
  timezone?: string;
  referrer?: string;
  landing?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  gclid?: string;
  foundVia: string;
  place: string;
};

type ClientTouch = {
  referrer?: string;
  landing?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  gclid?: string;
};

function decodeHeader(value: string | null) {
  if (!value?.trim()) return undefined;
  try {
    return decodeURIComponent(value.trim());
  } catch {
    return value.trim();
  }
}

function clean(value: unknown, max = 400) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./i, "");
  } catch {
    return url.replace(/^https?:\/\//i, "").split("/")[0] || url;
  }
}

function parseClient(raw: string | undefined): ClientTouch {
  if (!raw?.trim()) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return {
      referrer: clean(parsed.referrer, 500),
      landing: clean(parsed.landing, 300),
      utmSource: clean(parsed.utmSource, 80),
      utmMedium: clean(parsed.utmMedium, 80),
      utmCampaign: clean(parsed.utmCampaign, 120),
      utmTerm: clean(parsed.utmTerm, 200),
      gclid: clean(parsed.gclid, 120),
    };
  } catch {
    return {};
  }
}

function foundViaLabel(touch: ClientTouch): string {
  const landing = touch.landing;
  if (touch.gclid) {
    const term = touch.utmTerm ? ` · “${touch.utmTerm}”` : "";
    return `Google Ads${term}${landing ? ` → ${landing}` : ""}`;
  }
  const campaign = [touch.utmSource, touch.utmMedium, touch.utmCampaign]
    .filter(Boolean)
    .join(" / ");
  if (campaign) {
    const term = touch.utmTerm ? ` · “${touch.utmTerm}”` : "";
    return `${campaign}${term}${landing ? ` → ${landing}` : ""}`;
  }
  const ref = touch.referrer;
  if (!ref) return landing ? `Direct · ${landing}` : "Direct or unknown";
  const host = hostOf(ref);
  const path = landing ? ` → ${landing}` : "";
  if (/google\./i.test(host)) return `Google${path}`;
  if (/bing\./i.test(host)) return `Bing${path}`;
  if (/yahoo\./i.test(host)) return `Yahoo${path}`;
  if (/duckduckgo/i.test(host)) return `DuckDuckGo${path}`;
  if (/(^|\.)usawireform\.com$/i.test(host) || host === "localhost") {
    return landing ? `On-site → ${landing}` : "On-site";
  }
  return `${host}${path}`;
}

function placeLabel(parts: {
  city?: string;
  region?: string;
  country?: string;
  postal?: string;
}) {
  const line = [parts.city, parts.region, parts.country, parts.postal]
    .filter(Boolean)
    .join(", ");
  return line || "Unknown location";
}

export function originMailRows(origin: LeadOrigin) {
  return [
    { label: "From", value: origin.place },
    { label: "Found via", value: origin.foundVia },
    ...(origin.ip ? [{ label: "IP", value: origin.ip }] : []),
  ];
}

export async function readLeadOrigin(input?: {
  formData?: FormData;
  clientJson?: string;
}): Promise<LeadOrigin> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    h.get("x-real-ip")?.trim() ||
    h.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    undefined;

  const client = parseClient(
    input?.clientJson ??
      (input?.formData
        ? String(input.formData.get("originClient") ?? "")
        : undefined),
  );
  const referrer =
    client.referrer || decodeHeader(h.get("referer")) || undefined;
  const touch: ClientTouch = { ...client, referrer };

  return {
    ip: ip && ip !== "unknown" ? ip : undefined,
    city: decodeHeader(h.get("x-vercel-ip-city")),
    region: decodeHeader(h.get("x-vercel-ip-country-region")),
    country: decodeHeader(h.get("x-vercel-ip-country")),
    postal: decodeHeader(h.get("x-vercel-ip-postal-code")),
    timezone: decodeHeader(h.get("x-vercel-ip-timezone")),
    referrer,
    landing: touch.landing,
    utmSource: touch.utmSource,
    utmMedium: touch.utmMedium,
    utmCampaign: touch.utmCampaign,
    utmTerm: touch.utmTerm,
    gclid: touch.gclid,
    foundVia: foundViaLabel(touch),
    place: placeLabel({
      city: decodeHeader(h.get("x-vercel-ip-city")),
      region: decodeHeader(h.get("x-vercel-ip-country-region")),
      country: decodeHeader(h.get("x-vercel-ip-country")),
    }),
  };
}
