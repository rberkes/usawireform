import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";
import { allSeoPages } from "@/lib/seo";

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

/** Paths that should outrank sibling landers in the XML sitemap. */
const highPriorityPaths = new Set([
  "/",
  "/instant-quote",
  "/contact",
  "/products",
  "/guide/design-for-wire-forming",
  "/careers",
  "/330-stainless-wire-bending-usa-parts",
  "/wire-forming-companies-near-me",
  "/custom-wire-forming",
  "/wire-mesh",
  "/blog",
  "/ohio",
  "/directory/areas",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const allUrls = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const page of allSeoPages()) {
    const url = page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`;
    const boosted = highPriorityPaths.has(page.path);
    allUrls.set(url, {
      url,
      lastModified: now,
      changeFrequency: (page.changeFrequency ??
        (page.path === "/" ? "weekly" : "monthly")) as ChangeFreq,
      priority: boosted
        ? page.path === "/"
          ? 1
          : 0.9
        : (page.priority ?? (page.path === "/" ? 1 : 0.6)),
    });
  }

  return Array.from(allUrls.values());
}
