import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page, PageHero, Section, Kicker } from "@/components/ui";
import { cx } from "@/lib/cx";
import {
  directoryCompanies,
  DIRECTORY_REGIONS,
  getCompaniesByRegion,
  publicHost,
} from "@/lib/directory";
import {
  IRON_FILTERS,
  companyHasIron,
  isIronClass,
} from "@/lib/directory-iron";
import { CNC_COMPARE } from "@/lib/cnc-oems";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Forming Companies Directory — USA & Canada",
  description:
    "Directory of wire forming shops: 3D CNC, 2D CNC, fourslide, multi-slide, and spring CNC. Equipment tags come from public pages, not a floor walk.",
  path: "/directory",
  keywords: [
    "wire forming companies",
    "wire form manufacturers",
    "fourslide companies",
    "3D CNC wire forming shops",
    "multi-slide wire forming",
  ],
});

type Props = { searchParams: Promise<{ iron?: string }> };

export default async function DirectoryPage({ searchParams }: Props) {
  const { iron } = await searchParams;
  const filter = isIronClass(iron) ? iron : undefined;
  const usaCount = directoryCompanies.filter((c) => c.country === "USA").length;
  const canadaCount = directoryCompanies.filter((c) => c.country === "Canada").length;
  const activeFilter = IRON_FILTERS.find((item) => item.id === filter);
  const ironCounts = Object.fromEntries(
    IRON_FILTERS.map((item) => [
      item.id,
      directoryCompanies.filter((company) => companyHasIron(company, item.id)).length,
    ]),
  ) as Record<(typeof IRON_FILTERS)[number]["id"], number>;
  const matched = filter
    ? directoryCompanies.filter((company) => companyHasIron(company, filter))
    : directoryCompanies;
  const matchedUsa = matched.filter((company) => company.country === "USA").length;

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

      <div className="mt-10">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          Filter by iron
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/directory"
            className={cx(
              "border px-3 py-1.5 text-sm",
              !filter
                ? "border-copper bg-copper/10 text-foreground"
                : "border-line text-muted hover:border-copper hover:text-foreground",
            )}
          >
            All shops
          </Link>
          {IRON_FILTERS.map((item) => (
            <Link
              key={item.id}
              href={`/directory?iron=${item.id}`}
              className={cx(
                "border px-3 py-1.5 text-sm",
                filter === item.id
                  ? "border-copper bg-copper/10 text-foreground"
                  : "border-line text-muted hover:border-copper hover:text-foreground",
              )}
            >
              {item.label}
              <span className="ml-1.5 font-mono text-[11px] text-muted">
                {ironCounts[item.id]}
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          {activeFilter
            ? `${matched.length} shops in this directory name ${activeFilter.label} on a public page (${matchedUsa} USA). ${activeFilter.hint}. Named machines are from the shop’s own page — confirm before you send a print. Machine classes: `
            : "Named machines come from public equipment pages, not Thomas and not a floor walk. Confirm with the shop. A shop that only says “CNC” sits in CNC (unspecified) until the page names 2D vs 3D. Machine classes: "}
          <Link href={CNC_COMPARE} className="text-copper hover:underline">
            comparison chart
          </Link>
          .
        </p>
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-7 text-muted">
        Different capabilities, different diameters, different regions. If we cannot run a
        job, one of these shops might. The industry magazine is{" "}
        <a
          href="https://www.wireformingtech.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-copper hover:underline"
        >
          Wire Forming Technology International
        </a>
        . Ranked cities:{" "}
        <Link href="/directory/areas" className="text-copper hover:underline">
          wire forming cities
        </Link>
        .
      </p>

      <div className="mt-8 border border-line bg-inset/30 p-4 text-xs leading-5 text-muted">
        <p>
          <strong className="text-foreground">Disclaimer:</strong> The companies listed in this directory are not affiliated with, endorsed by, or verified by USA Wire Form. Equipment notes are copied from public pages and go stale. Contact the shop to confirm what is on the floor.
        </p>
      </div>

      {DIRECTORY_REGIONS.map((region) => {
        const companies = getCompaniesByRegion(region).filter((company) =>
          filter ? companyHasIron(company, filter) : true,
        );
        if (companies.length === 0) return null;

        return (
          <Section key={region} title={`${region} (${companies.length})`}>
            <div className="mt-4 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => (
                <div
                  key={company.slug}
                  className="flex flex-col bg-background p-4 hover:bg-inset transition-colors"
                >
                  <Link
                    href={`/directory/${company.slug}`}
                    className="font-medium hover:text-copper transition-colors line-clamp-1"
                  >
                    {company.name}
                  </Link>
                  <p className="mt-1 text-xs text-muted">{company.location}</p>
                  {company.website ? (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-xs text-copper hover:underline"
                    >
                      {publicHost(company.website)}
                    </a>
                  ) : null}
                  <p className="mt-2 text-sm text-muted line-clamp-2">
                    {company.description.slice(0, 100)}...
                  </p>
                  {(company.machines ?? company.capabilities).length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {(company.machines ?? company.capabilities).slice(0, 4).map((cap) => (
                        <span
                          key={cap}
                          className="inline-block bg-inset px-2 py-0.5 text-[10px] text-muted"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
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
            others in heavy 1/2&quot; industrial forms. Some run high-volume fourslide,
            others 3D CNC.
          </p>
          <p>
            When a job falls outside our 4–14 mm sweet spot, we want to help you find
            the right partner. Equipment tags are what the shop published — not a claim
            we walked the floor.
          </p>
        </div>
      </section>
    </Page>
  );
}
