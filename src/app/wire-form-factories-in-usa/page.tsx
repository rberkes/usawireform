import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  DirectoryCompanyCards,
  DirectoryIronFilters,
} from "@/components/DirectoryCompanyCards";
import { PlantCheckList } from "@/components/PlantCheckList";
import { Page, PageHero, Kicker } from "@/components/ui";
import { directoryCompanies } from "@/lib/directory";
import { isFactoryListing } from "@/lib/plant-verify";
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

const PATH = "/wire-form-factories-in-usa";

export const metadata = pageMeta({
  title: "Wire Form Factories in the USA",
  description:
    "Company cards for wire form factories in the United States. Sales and sourcing offices are out. Three checks: street plant, floor proof, not a desk.",
  path: PATH,
  keywords: [
    "wire form factories in USA",
    "wire forming factories United States",
    "USA wire form manufacturers",
    "CNC wire forming shops USA",
    "fourslide factories USA",
  ],
});

type Props = { searchParams: Promise<{ iron?: string }> };

export default async function WireFormFactoriesUsaPage({ searchParams }: Props) {
  const { iron } = await searchParams;
  const filter = isIronClass(iron) ? iron : undefined;
  const sourced = await listPublishedSourceDirectoryCompanies();
  const all: DirectoryCompany[] = mergeDirectoryList(
    directoryCompanies,
    sourced,
  );
  const companies = all.filter(
    (company) => company.country === "USA" && isFactoryListing(company),
  );
  const canadaCount = all.filter((company) => company.country === "Canada").length;
  const stateCount = new Set(companies.map((company) => company.state)).size;
  const ironCounts = Object.fromEntries(
    IRON_FILTERS.map((item) => [
      item.id,
      companies.filter((company) => companyHasIron(company, item.id)).length,
    ]),
  ) as Record<(typeof IRON_FILTERS)[number]["id"], number>;
  const matched = filter
    ? companies.filter((company) => companyHasIron(company, filter))
    : companies;

  return (
    <Page>
      <BreadcrumbJsonLd
        items={[{ name: "Wire form factories in the USA", url: PATH }]}
      />
      <Breadcrumbs items={[{ label: "Wire form factories in the USA" }]} />

      <PageHero
        kicker="USA factories"
        title="Wire form factories in the USA"
        lede={`${companies.length} U.S. plants. Sales offices, sourcing desks, and reps are out. Three checks — street, floor proof, not a desk.`}
      />
      <PlantCheckList />
      <p className="mt-6 max-w-xl text-sm leading-6 text-muted">
        Type a machine — fourslide, Robomac, Baird — on{" "}
        <Link
          href="/find-factories-by-machine"
          className="text-copper hover:underline"
        >
          find factories by machine
        </Link>
        . Click a factory to open its listing. Canada shops stay on the{" "}
        <Link href="/directory" className="text-copper hover:underline">
          full directory
        </Link>
        {canadaCount ? ` (${canadaCount})` : ""}. US shops:{" "}
        <strong className="font-medium text-foreground">Claim this page</strong>{" "}
        is on that listing — then file cells on Source.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border border-line p-4">
          <p className="font-mono text-3xl text-copper">{companies.length}</p>
          <p className="mt-1 text-sm text-muted">USA factories</p>
        </div>
        <div className="border border-line p-4">
          <p className="font-mono text-3xl text-copper">{stateCount}</p>
          <p className="mt-1 text-sm text-muted">States</p>
        </div>
        <div className="border border-line p-4">
          <p className="font-mono text-3xl text-copper">{ironCounts.fourslide}</p>
          <p className="mt-1 text-sm text-muted">Fourslide tagged</p>
        </div>
      </div>

      <DirectoryIronFilters
        basePath={PATH}
        filter={filter}
        ironCounts={ironCounts}
        matchedCount={matched.length}
        matchedUsa={matched.length}
      />

      <p className="mt-8 max-w-2xl text-sm leading-7 text-muted">
        Ranked cities:{" "}
        <Link href="/directory/areas" className="text-copper hover:underline">
          wire forming cities
        </Link>
        . Near you by ZIP:{" "}
        <Link
          href="/wire-forming-companies-near-me"
          className="text-copper hover:underline"
        >
          companies near me
        </Link>
        .
      </p>

      <div className="mt-8 border border-line bg-inset/30 p-4 text-xs leading-5 text-muted">
        <p>
          <strong className="text-foreground">Disclaimer:</strong> Sales and
          sourcing offices are excluded. A <strong className="text-foreground">Plant</strong>{" "}
          badge means the shop passed the three checks or filed a cell on
          Source. Equipment notes go stale. Confirm with the shop before you
          send a print.
        </p>
      </div>

      <DirectoryCompanyCards companies={matched} />

      <section className="mt-16 border-t border-line pt-12">
        <Kicker>This floor</Kicker>
        <h2 className="mt-3 text-2xl tracking-tight">
          One cell in Northeast Ohio. The rest of the map is the trade.
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-muted">
          <p>
            USA Wire Form runs 4–14 mm 3D CNC on this floor. The cards above are
            other U.S. factories: springs, fourslide, multi-slide, 2D CNC, 3D
            CNC. Different bands, different iron.
          </p>
          <p>
            Send a print to this shop when it fits the cell. If it does not, use{" "}
            <Link href="/source" className="text-copper hover:underline">
              Source
            </Link>{" "}
            or open a factory card.
          </p>
        </div>
      </section>
    </Page>
  );
}
