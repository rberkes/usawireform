import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";
import { allSeoPages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return allSeoPages().map((page) => ({
    url: page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency ?? (page.path === "/" ? "weekly" : "monthly"),
    priority: page.priority ?? (page.path === "/" ? 1 : page.path.startsWith("/products/") ? 0.7 : 0.6),
  }));
}
