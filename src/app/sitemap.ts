import type { MetadataRoute } from "next";
import { catalog } from "@/lib/catalog";
import { publishedProcesses } from "@/lib/processes";
import { SITE_URL } from "@/lib/company";
import { industries, shopLines } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/wire-forming",
    "/wire-fabrication",
    "/cnc-wire-forming",
    "/cnc-wire-bending",
    "/rod-bending",
    "/wire-parts",
    "/processes",
    "/guide/design-for-wire-forming",
    "/sizes",
    "/materials",
    "/materials/300-series-stainless",
    "/capabilities",
    "/equipment",
    "/videos",
    "/about",
    "/cleveland",
    "/industries",
    ...industries.map((item) => `/industries/${item.slug}`),
    "/products",
    ...catalog.map((item) => `/products/${item.slug}`),
    ...shopLines.map((item) => `/products/${item.slug}`),
    "/quoting",
    "/instant-quote",
    "/secondary-operations",
    "/contact",
    "/privacy",
    "/site-map",
    ...publishedProcesses().map((process) => `/processes/${process.slug}`),
  ];

  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/products/") ? 0.7 : 0.6,
  }));
}
