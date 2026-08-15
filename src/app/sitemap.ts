import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";
import { catalog } from "@/lib/catalog";
import { publishedCaseStudies } from "@/lib/case-studies";
import { directoryCompanies } from "@/lib/directory";
import { industries } from "@/lib/site";
import { machines } from "@/lib/machines";
import { publishedProcesses } from "@/lib/processes";
import { allSeoPages } from "@/lib/seo";

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a stable date for content that doesn't change frequently
  // This helps Google trust your lastModified values
  const staticContentDate = new Date("2025-01-15");
  const recentUpdateDate = new Date("2025-08-01");
  
  // Static SEO pages from the seo/pages.ts registry
  const staticPages = allSeoPages().map((page) => ({
    url: page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`,
    lastModified: page.path === "/" ? recentUpdateDate : staticContentDate,
    changeFrequency: (page.changeFrequency ?? (page.path === "/" ? "weekly" : "monthly")) as ChangeFreq,
    priority: page.priority ?? (page.path === "/" ? 1 : 0.6),
  }));

  // All product pages - high priority for commerce
  const productPages = catalog.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: staticContentDate,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.8,
  }));

  // All industry pages
  const industryPages = industries.map((industry) => ({
    url: `${SITE_URL}/industries/${industry.slug}`,
    lastModified: staticContentDate,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.7,
  }));

  // All process pages
  const processPages = publishedProcesses().map((process) => ({
    url: `${SITE_URL}/processes/${process.slug}`,
    lastModified: staticContentDate,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.7,
  }));

  // Machine pages - NumAlliance equipment
  const machineIndexPage = {
    url: `${SITE_URL}/equipment/machines`,
    lastModified: staticContentDate,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.7,
  };

  const machinePages = machines.map((machine) => ({
    url: `${SITE_URL}/equipment/machines/${machine.slug}`,
    lastModified: staticContentDate,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.7,
  }));

  // Careers page - updates more frequently
  const careersPage = {
    url: `${SITE_URL}/careers`,
    lastModified: recentUpdateDate,
    changeFrequency: "weekly" as ChangeFreq,
    priority: 0.7,
  };

  // Directory index page
  const directoryIndexPage = {
    url: `${SITE_URL}/directory`,
    lastModified: recentUpdateDate,
    changeFrequency: "weekly" as ChangeFreq,
    priority: 0.8,
  };

  // All directory company pages
  const directoryPages = directoryCompanies.map((company) => ({
    url: `${SITE_URL}/directory/${company.slug}`,
    lastModified: staticContentDate,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.6,
  }));

  // High-priority pages
  const highPriorityPaths = [
    "/instant-quote",
    "/contact",
    "/products",
    "/guide/design-for-wire-forming",
    "/careers",
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

  // Add machine pages
  allUrls.set(machineIndexPage.url, machineIndexPage);
  for (const page of machinePages) {
    allUrls.set(page.url, page);
  }

  // Add careers page
  allUrls.set(careersPage.url, careersPage);

  // Add directory pages
  allUrls.set(directoryIndexPage.url, directoryIndexPage);
  for (const page of directoryPages) {
    allUrls.set(page.url, page);
  }

  // Case study pages
  const caseStudyIndexPage = {
    url: `${SITE_URL}/case-studies`,
    lastModified: recentUpdateDate,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.8,
  };
  allUrls.set(caseStudyIndexPage.url, caseStudyIndexPage);

  for (const study of publishedCaseStudies()) {
    allUrls.set(`${SITE_URL}/case-studies/${study.slug}`, {
      url: `${SITE_URL}/case-studies/${study.slug}`,
      lastModified: recentUpdateDate,
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.7,
    });
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
