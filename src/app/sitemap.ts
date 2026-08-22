import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";
import { allSeoPages } from "@/lib/seo";
import { listPublishedSourceDirectoryCompanies } from "@/lib/source";

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
  "/custom-cnc-wire-forming-services",
  "/powder-coating-hooks",
  "/powder-coating-v-hooks",
  "/heavy-duty-v-hooks",
  "/wire-mesh",
  "/blog",
  "/models",
  "/ohio",
  "/directory/areas",
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  try {
    const sourced = await listPublishedSourceDirectoryCompanies();
    for (const company of sourced) {
      const url = `${SITE_URL}/directory/${company.slug}`;
      if (allUrls.has(url)) continue;
      allUrls.set(url, {
        url,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  } catch (error) {
    console.error("[sitemap source shops]", error);
  }

  return Array.from(allUrls.values());
}
