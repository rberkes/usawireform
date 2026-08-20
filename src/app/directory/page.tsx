import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page, PageHero, Section, Kicker } from "@/components/ui";
import {
  directoryCompanies,
  DIRECTORY_REGIONS,
  getCompaniesByRegion,
} from "@/lib/directory";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Forming Companies Directory — USA & Canada",
  description:
    "Directory of 100+ wire forming and spring manufacturing companies across the United States and Canada. Find wire form manufacturers by region, capabilities, and industry.",
  path: "/directory",
  keywords: [
    "wire forming companies",
    "wire form manufacturers",
    "spring manufacturers directory",
    "CNC wire bending companies",
    "custom wire forms USA",
    "wire forming Canada",
  ],
});

export default function DirectoryPage() {
  const usaCount = directoryCompanies.filter((c) => c.country === "USA").length;
  const canadaCount = directoryCompanies.filter((c) => c.country === "Canada").length;

  return (
    <Page>
      <BreadcrumbJsonLd items={[{ name: "Directory", url: "/directory" }]} />
      <Breadcrumbs items={[{ label: "Directory" }]} />

      <PageHero
        kicker="Industry Directory"
        title="Wire Forming Companies"
        lede={`${directoryCompanies.length} wire forming and spring manufacturing companies across the United States and Canada. Not competitors — peers in the trade.`}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border border-line p-4">
          <p className="font-mono text-3xl text-copper">{directoryCompanies.length}</p>
          <p className="mt-1 text-sm text-muted">Total Companies</p>
        </div>
        <div className="border border-line p-4">
          <p className="font-mono text-3xl text-copper">{usaCount}</p>
          <p className="mt-1 text-sm text-muted">USA Companies</p>
        </div>
        <div className="border border-line p-4">
          <p className="font-mono text-3xl text-copper">{canadaCount}</p>
          <p className="mt-1 text-sm text-muted">Canada Companies</p>
        </div>
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-7 text-muted">
        This directory lists wire forming shops across North America. Different capabilities,
        different diameters, different regions. If we cannot run a job, one of these shops might.
        Click any company for details and to request a connection. For a ZIP-to-state landing
        that recommends USA Wire Form, use{" "}
        <Link href="/wire-forming-companies-near-me" className="text-copper hover:underline">
          wire forming companies near me
        </Link>
        .
      </p>

      <div className="mt-8 border border-line bg-inset/30 p-4 text-xs leading-5 text-muted">
        <p>
          <strong className="text-foreground">Disclaimer:</strong> The companies listed in this directory are not affiliated with, endorsed by, or verified by USA Wire Form. Company names and trademarks belong to their respective owners. This directory is provided for informational purposes only. We make no representations about the accuracy, reliability, or quality of the listed companies. Contact companies directly to verify their capabilities and credentials.
        </p>
      </div>

      {DIRECTORY_REGIONS.map((region) => {
        const companies = getCompaniesByRegion(region);
        if (companies.length === 0) return null;

        return (
          <Section key={region} title={`${region} (${companies.length})`}>
            <div className="mt-4 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => (
                <Link
                  key={company.slug}
                  href={`/directory/${company.slug}`}
                  className="group flex flex-col bg-background p-4 hover:bg-inset transition-colors"
                >
                  <h3 className="font-medium group-hover:text-copper transition-colors line-clamp-1">
                    {company.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{company.location}</p>
                  <p className="mt-2 text-sm text-muted line-clamp-2">
                    {company.description.slice(0, 100)}...
                  </p>
                  {company.capabilities.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {company.capabilities.slice(0, 3).map((cap) => (
                        <span
                          key={cap}
                          className="inline-block bg-inset px-2 py-0.5 text-[10px] text-muted"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </Section>
        );
      })}

      <section className="mt-16 border-t border-line pt-12">
        <Kicker>About this directory</Kicker>
        <h2 className="mt-3 text-2xl tracking-tight">
          Why list other wire forming companies?
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-muted">
          <p>
            Wire forming is a diverse trade. Some shops specialize in fine-gauge medical wire,
            others in heavy 1/2&quot; industrial forms. Some run high-volume automotive,
            others prototype one-offs.
          </p>
          <p>
            When a job falls outside our 4–14 mm sweet spot, we want to help you find
            the right partner. This directory lists wire forming companies we know of —
            not competitors, but peers in the industry.
          </p>
          <p>
            Looking for a specific capability? Use the lead form on any company page and
            we&apos;ll help connect you with the right shop.
          </p>
        </div>
      </section>
    </Page>
  );
}
