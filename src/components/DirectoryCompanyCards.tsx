import Link from "next/link";
import { Section } from "@/components/ui";
import { cx } from "@/lib/cx";
import { DIRECTORY_REGIONS, publicHost } from "@/lib/directory";
import { directoryPlantStatus } from "@/lib/plant-verify";
import { CNC_COMPARE } from "@/lib/cnc-oems";
import {
  IRON_FILTERS,
  type IronClass,
} from "@/lib/directory-iron";
import type { DirectoryCompany } from "@/lib/directory-types";
import { sourceFitCardLine } from "@/lib/source-fit";

export function DirectoryCompanyCard({ company }: { company: DirectoryCompany }) {
  const fitLine = sourceFitCardLine(company.buyerFit);

  return (
    <div className="flex flex-col bg-background p-4 hover:bg-inset transition-colors">
      {company.logoUrl ? (
        <img
          src={company.logoUrl}
          alt=""
          className="mb-3 h-10 w-auto max-w-[8rem] object-contain"
        />
      ) : null}
      <Link
        href={`/directory/${company.slug}`}
        className="font-medium hover:text-copper transition-colors line-clamp-1"
      >
        {company.name}
      </Link>
      {directoryPlantStatus(company) === "plant" ? (
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-copper">
          Plant
        </p>
      ) : null}
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
      {fitLine ? (
        <p className="mt-2 text-xs leading-5 text-muted">{fitLine}</p>
      ) : null}
      {company.weeklyCapacity ? (
        <p className="mt-1 text-xs leading-5 text-muted">
          {company.weeklyCapacity}
        </p>
      ) : null}
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
  );
}

export function DirectoryCompanyCards({
  companies,
}: {
  companies: DirectoryCompany[];
}) {
  return (
    <>
      {DIRECTORY_REGIONS.map((region) => {
        const regionCompanies = companies.filter(
          (company) => company.region === region,
        );
        if (regionCompanies.length === 0) return null;

        return (
          <Section key={region} title={`${region} (${regionCompanies.length})`}>
            <div className="mt-4 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
              {regionCompanies.map((company) => (
                <DirectoryCompanyCard key={company.slug} company={company} />
              ))}
            </div>
          </Section>
        );
      })}
    </>
  );
}

export function DirectoryIronFilters({
  basePath,
  filter,
  ironCounts,
  matchedCount,
  matchedUsa,
  hint,
}: {
  basePath: string;
  filter?: IronClass;
  ironCounts: Record<IronClass, number>;
  matchedCount: number;
  matchedUsa: number;
  hint?: string;
}) {
  const activeFilter = IRON_FILTERS.find((item) => item.id === filter);

  return (
    <div className="mt-10">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
        Filter by iron
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href={basePath}
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
            href={`${basePath}?iron=${item.id}`}
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
          ? `${matchedCount} shops on this page name ${activeFilter.label} on a public page (${matchedUsa} USA). ${activeFilter.hint}. Named machines are from the shop’s own page — confirm before you send a print. Machine classes: `
          : hint ??
            "Named machines come from public equipment pages, not Thomas and not a floor walk. Confirm with the shop. A shop that only says “CNC” sits in CNC (unspecified) until the page names 2D vs 3D. Machine classes: "}
        <Link href={CNC_COMPARE} className="text-copper hover:underline">
          comparison chart
        </Link>
        .
      </p>
    </div>
  );
}
