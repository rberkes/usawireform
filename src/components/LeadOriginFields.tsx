"use client";

import { useEffect, useState } from "react";

const KEY = "usawf_origin_v1";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

type Touch = {
  referrer: string;
  landing: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  gclid: string;
  at: number;
};

function readStored(): Touch | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Touch>;
    if (typeof parsed.at !== "number" || Date.now() - parsed.at > MAX_AGE_MS) {
      localStorage.removeItem(KEY);
      return null;
    }
    return {
      referrer: String(parsed.referrer ?? ""),
      landing: String(parsed.landing ?? ""),
      utmSource: String(parsed.utmSource ?? ""),
      utmMedium: String(parsed.utmMedium ?? ""),
      utmCampaign: String(parsed.utmCampaign ?? ""),
      utmTerm: String(parsed.utmTerm ?? ""),
      gclid: String(parsed.gclid ?? ""),
      at: parsed.at,
    };
  } catch {
    return null;
  }
}

function currentTouch(): Touch {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  return {
    referrer: document.referrer || "",
    landing: `${url.pathname}${url.search}`,
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmTerm: params.get("utm_term") || "",
    gclid: params.get("gclid") || "",
    at: Date.now(),
  };
}

function hasSource(touch: Touch) {
  return Boolean(
    touch.referrer ||
      touch.utmSource ||
      touch.utmMedium ||
      touch.utmCampaign ||
      touch.utmTerm ||
      touch.gclid,
  );
}

/** First-touch: keep the original referrer / UTM for 30 days. */
export function captureLeadOrigin(): string {
  if (typeof window === "undefined") return "";
  const incoming = currentTouch();
  const stored = readStored();
  const next =
    stored && hasSource(stored)
      ? stored
      : stored && !hasSource(incoming)
        ? stored
        : {
            ...incoming,
            landing: stored?.landing || incoming.landing,
            at: stored?.at || incoming.at,
          };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode */
  }
  return JSON.stringify(next);
}

/** Runs on every page so a Google hit on the homepage still counts later. */
export function LeadOriginCapture() {
  useEffect(() => {
    captureLeadOrigin();
  }, []);
  return null;
}

export function LeadOriginFields() {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(captureLeadOrigin());
  }, []);
  return <input type="hidden" name="originClient" value={value} />;
}
