import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";
import { allSeoPages } from "@/lib/seo";
import { directoryCompanies } from "@/lib/directory";
import { directoryListingHasSubstance } from "@/lib/directory-substance";
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
  "/ground-staples",
  "/powder-coating-v-hooks",
  "/heavy-duty-v-hooks",
  "/wire-mesh",
  "/blog",
  "/models",
  "/ohio",
  "/directory/areas",
  "/wire-form-factories-in-usa",
  "/find-factories-by-machine",
]);

/**
 * Listing pages that carry no fact of their own are served with `noindex`, so
 * submitting them here would ask Google to crawl what we just told it to skip.
 * They stay linked from `/directory` and the HTML site map.
 */
function noindexDirectoryPaths() {
  const paths = new Set<string>();
  for (const company of directoryCompanies) {
    if (!directoryListingHasSubstance(company)) {
      paths.add(`/directory/${company.slug}`);
    }
  }
  return paths;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const allUrls = new Map<string, MetadataRoute.Sitemap[number]>();
  const skip = noindexDirectoryPaths();

  for (const page of allSeoPages()) {
    if (skip.has(page.path)) continue;
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
