import type { Metadata } from "next";
import { COMPANY, SITE_URL } from "@/lib/company";
import { CORE_KEYWORDS } from "./keywords";
import type { SeoRecord } from "./pages";

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
  image,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  absoluteTitle?: boolean;
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
}): Metadata {
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const fullTitle = absoluteTitle ? title : undefined;
  const shareImage = image
    ? {
        url: image.url,
        width: image.width,
        height: image.height,
        alt: image.alt,
      }
    : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: unique([
      ...keywords,
      title.replace(/\s+—.*$/, ""),
      ...CORE_KEYWORDS,
    ]),
    authors: [{ name: COMPANY, url: SITE_URL }],
    creator: COMPANY,
    publisher: COMPANY,
    category: "manufacturing",
    alternates: { canonical: path === "/" ? "/" : path },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: fullTitle ?? title,
      description,
      url: canonical,
      siteName: COMPANY,
      locale: "en_US",
      type: "website",
      ...(shareImage ? { images: [shareImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle ?? title,
      description,
      ...(shareImage ? { images: [shareImage] } : {}),
    },
  };
}

export function pageSeo(record: SeoRecord): Metadata {
  return pageMeta({
    title: record.title,
    description: record.description,
    path: record.path,
    keywords: record.keywords,
    absoluteTitle: record.absoluteTitle,
  });
}
