import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";
import { catalog } from "@/lib/catalog";
import { industries } from "@/lib/site";
import { publishedProcesses } from "@/lib/processes";
import { allSeoPages } from "@/lib/seo";

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  
  // Static SEO pages from the seo/pages.ts registry
  const staticPages = allSeoPages().map((page) => ({
    url: page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: (page.changeFrequency ?? (page.path === "/" ? "weekly" : "monthly")) as ChangeFreq,
    priority: page.priority ?? (page.path === "/" ? 1 : 0.6),
  }));

  // All product pages - high priority for commerce
  const productPages = catalog.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.8,
  }));

  // All industry pages
  const industryPages = industries.map((industry) => ({
    url: `${SITE_URL}/industries/${industry.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.7,
  }));

  // All process pages
  const processPages = publishedProcesses().map((process) => ({
    url: `${SITE_URL}/processes/${process.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.7,
  }));

  // High-priority pages
  const highPriorityPaths = [
    "/instant-quote",
    "/contact",
    "/products",
    "/guide/design-for-wire-forming",
  ];

  // Combine and deduplicate
  const allUrls = new Map<string, MetadataRoute.Sitemap[number]>();

  // Add static pages first
  for (const page of staticPages) {
    allUrls.set(page.url, page);
  }

  // Override with more specific entries
  for (const page of productPages) {
    allUrls.set(page.url, page);
  }

  for (const page of industryPages) {
    allUrls.set(page.url, page);
  }

  for (const page of processPages) {
    allUrls.set(page.url, page);
  }

  // Boost high-priority pages
  for (const path of highPriorityPaths) {
    const url = `${SITE_URL}${path}`;
    const existing = allUrls.get(url);
    if (existing) {
      allUrls.set(url, { ...existing, priority: 0.9 });
    }
  }

  return Array.from(allUrls.values());
}
