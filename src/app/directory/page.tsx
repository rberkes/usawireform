import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  DirectoryCompanyCards,
  DirectoryIronFilters,
} from "@/components/DirectoryCompanyCards";
import { Page, PageHero, Kicker } from "@/components/ui";
import { directoryCompanies } from "@/lib/directory";
import {
  IRON_FILTERS,
  companyHasIron,
  isIronClass,
} from "@/lib/directory-iron";
import { pageMeta } from "@/lib/seo";
import { listPublishedSourceDirectoryCompanies } from "@/lib/source";
import { mergeDirectoryList } from "@/lib/source-directory";
import type { DirectoryCompany } from "@/lib/directory-types";

export const dynamic = "force-dynamic";

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
  const sourced = await listPublishedSourceDirectoryCompanies();
  const companies: DirectoryCompany[] = mergeDirectoryList(
    directoryCompanies,
    sourced,
  );
  const usaCount = companies.filter((c) => c.country === "USA").length;
  const canadaCount = companies.filter((c) => c.country === "Canada").length;
  const ironCounts = Object.fromEntries(
    IRON_FILTERS.map((item) => [
      item.id,
      companies.filter((company) => companyHasIron(company, item.id)).length,
    ]),
  ) as Record<(typeof IRON_FILTERS)[number]["id"], number>;
  const matched = filter
    ? companies.filter((company) => companyHasIron(company, filter))
    : companies;
  const matchedUsa = matched.filter((company) => company.country === "USA").length;

  return (
    <Page>
      <BreadcrumbJsonLd items={[{ name: "Directory", url: "/directory" }]} />
      <Breadcrumbs items={[{ label: "Directory" }]} />

      <PageHero
        kicker="Industry Directory"
        title="Wire Forming Companies"
        lede={`${companies.length} wire forming factories across the United States and Canada — part of the resource for the trade. Equipment tags come from public pages or cells the shop filed on Source.`}
      />
      <p className="mt-6 max-w-xl text-sm leading-6 text-muted">
        Click a factory to open its listing. US shops:{" "}
        <strong className="font-medium text-foreground">Claim this page</strong>{" "}
        is on that listing — then file cells on Source. Source is USA for now.
        Europe later, on its own platform.{" "}
        <Link href="/directory/new" className="text-copper hover:underline">
          Newest Source shops
        </Link>
        . USA-only cards:{" "}
        <Link
          href="/wire-form-factories-in-usa"
          className="text-copper hover:underline"
        >
          wire form factories in the USA
        </Link>
        . Type a machine or a secondary:{" "}
        <Link
          href="/find-factories-by-machine"
          className="text-copper hover:underline"
        >
          find factories by machine
        </Link>
        .
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border border-line p-4">
          <p className="font-mono text-3xl text-copper">{companies.length}</p>
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

      <DirectoryIronFilters
        basePath="/directory"
        filter={filter}
        ironCounts={ironCounts}
        matchedCount={matched.length}
        matchedUsa={matchedUsa}
      />

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

      <DirectoryCompanyCards companies={matched} />

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
