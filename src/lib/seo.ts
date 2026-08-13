import type { Metadata } from "next";
import { COMPANY, QUOTE_EMAIL, SITE_URL } from "@/lib/company";

/** Shared terms. Google largely ignores meta keywords; they still help other crawlers and consistency. */
export const CORE_KEYWORDS = [
  "USA Wire Form",
  "CNC wire forming",
  "3D CNC wire forming",
  "wire forming",
  "4-14 mm wire",
  "3/8 inch wire",
  "7/16 inch wire",
  "1/2 inch wire",
  "Northeast Ohio wire forming",
  "wire baskets",
  "wire frames",
  "wire guards",
  "lowest price wire forming",
];

function unique(values: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const key = value.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(value.trim());
  }
  return out;
}

export function pageMeta({
  title,
  description,
  path,
  keywords = [],
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  absoluteTitle?: boolean;
}): Metadata {
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const fullTitle = absoluteTitle ? title : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: unique([...keywords, title.replace(/\s+—.*$/, ""), ...CORE_KEYWORDS]),
    authors: [{ name: COMPANY, url: SITE_URL }],
    creator: COMPANY,
    publisher: COMPANY,
    category: "manufacturing",
    alternates: { canonical: path === "/" ? "/" : path },
    robots: { index: true, follow: true },
    openGraph: {
      title: fullTitle ?? title,
      description,
      url: canonical,
      siteName: COMPANY,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: fullTitle ?? title,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Manufacturer",
        "@id": `${SITE_URL}/#organization`,
        name: COMPANY,
        url: SITE_URL,
        email: QUOTE_EMAIL,
        description:
          "3D CNC wire forming in 4–14 mm: frames, wire baskets, and guards. Lowest prices guaranteed. 100-piece minimum. Northeast Ohio.",
        address: {
          "@type": "PostalAddress",
          addressRegion: "OH",
          addressCountry: "US",
        },
        areaServed: { "@type": "Country", name: "United States" },
        knowsAbout: [
          "CNC wire forming",
          "3D CNC wire bending",
          "wire baskets",
          "wire guards",
          "resistance welding",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: COMPANY,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };
}

export function productJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };
}
