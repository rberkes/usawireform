import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DirectoryLeadForm } from "@/components/DirectoryLeadForm";
import { DirectoryPhotoUpload } from "@/components/DirectoryPhotoUpload";
import { ServiceSchema } from "@/components/SeoSchemas";
import {
  ButtonLink,
  Kicker,
  Page,
} from "@/components/ui";
import {
  directoryCompanies,
  getDirectoryCompany,
  getCompaniesByRegion,
  publicHost,
} from "@/lib/directory";
import { pageMeta } from "@/lib/seo";
import { directoryPlantStatus } from "@/lib/plant-verify";
import {
  overlaySourceOnDirectory,
  sourceAccountLocksClaim,
  sourceClaimPath,
  sourceClaimable,
} from "@/lib/source-directory";
import { secondaryHref, secondaryLabel } from "@/lib/source-secondaries";
import { sourceFitSpecs } from "@/lib/source-fit";
import { getSourceDirectoryCompany, getSourceProfile } from "@/lib/source";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return directoryCompanies.map((company) => ({ slug: company.slug }));
}

export const dynamicParams = true;

async function resolveDirectoryCompany(slug: string) {
  const listed = getDirectoryCompany(slug);
  const sourced = await getSourceDirectoryCompany(slug);
  if (listed && sourced) {
    return {
      company: overlaySourceOnDirectory(listed, sourced.company),
      source: sourced.cells.length > 0,
      claimable: false,
    };
  }
  if (listed) {
    return {
      company: listed,
      source: false,
      claimable: sourceClaimable(listed),
    };
  }
  if (!sourced) return null;
  return { company: sourced.company, source: true, claimable: false };
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const resolved = await resolveDirectoryCompany(slug);
  if (!resolved) return {};
  const { company } = resolved;

  return pageMeta({
    title: `${company.name} — Wire Forming Company | ${company.location}`,
    description: `${company.name} in ${company.location}. ${company.description.slice(0, 150)}`,
    path: `/directory/${slug}`,
    keywords: [
      company.name,
      "wire forming",
      company.location,
      company.state,
      ...company.capabilities.slice(0, 3),
    ],
  });
}

export default async function DirectoryCompanyPage({ params }: Props) {
  const { slug } = await params;
  const resolved = await resolveDirectoryCompany(slug);
  if (!resolved) notFound();
  const { company, source, claimable } = resolved;
  const { userId } = await auth();
  const mine = userId ? await getSourceProfile(userId) : null;
  const isOwner = Boolean(mine?.slug && mine.slug === company.slug);
  const signedInAsOther =
    Boolean(mine?.company) &&
    mine?.slug !== company.slug &&
    sourceAccountLocksClaim(mine);

  const relatedCompanies = getCompaniesByRegion(company.region)
    .filter((c) => c.slug !== slug)
    .slice(0, 6);

  const specs: { label: string; value: string }[] = [
    { label: "Location", value: company.location },
  ];
  if (company.wireDiameters) {
    specs.push({ label: "Wire", value: company.wireDiameters });
  }
  if (company.established) {
    specs.push({ label: "Established", value: company.established });
  }
  if (company.certifications && company.certifications.length > 0) {
    specs.push({ label: "Certifications", value: company.certifications.join(", ") });
  }
  if (company.plantStreet) {
    specs.push({ label: "Plant", value: company.plantStreet });
  }
  if (company.phone) {
    specs.push({ label: "Phone", value: company.phone });
  }
  specs.push(...sourceFitSpecs(company.buyerFit));
  if (company.weeklyCapacity) {
    specs.push({ label: "This week", value: company.weeklyCapacity });
  }

  const plantStatus = directoryPlantStatus(company);

  return (
    <>
      <ServiceSchema
        name={`${company.name} - Wire Forming Company`}
        description={company.description}
        url={`/directory/${slug}`}
        serviceType="Wire Forming Manufacturing"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Directory", url: "/directory" },
          { name: company.name, url: `/directory/${slug}` },
        ]}
      />
      <Page>
        <Breadcrumbs
          items={[
            { label: "Directory", href: "/directory" },
            { label: company.name },
          ]}
        />

        {claimable && signedInAsOther && mine ? (
          <div className="mb-8 max-w-xl space-y-3">
            <p className="text-sm leading-6 text-muted">
              Signed in as{" "}
              <strong className="font-medium text-foreground">{mine.company}</strong>
              . This login cannot claim {company.name}.
            </p>
            <ButtonLink href="/source/dashboard" variant="ghost">
              Shop dashboard
            </ButtonLink>
          </div>
        ) : claimable && !isOwner ? (
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            <ButtonLink href={sourceClaimPath(company.slug)}>
              Claim this page
            </ButtonLink>
            <ButtonLink href="/#login" variant="ghost">
              Log in
            </ButtonLink>
          </div>
        ) : null}

        {isOwner ? (
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/source/dashboard" variant="ghost">
              Shop dashboard
            </ButtonLink>
            <p className="text-sm text-muted">
              This is your public listing. Buyers see the photo, cells, and note below.
            </p>
          </div>
        ) : null}

        <div className="overflow-hidden border border-line bg-inset/30">
          {company.photoUrl ? (
            <img
              src={company.photoUrl}
              alt={`${company.name} plant`}
              className="aspect-[16/7] w-full object-cover"
            />
          ) : (
            <div className="flex min-h-52 items-end bg-[#0b1f33] px-6 py-8 sm:min-h-64 sm:px-10">
              <p className="max-w-lg text-sm leading-6 text-white/70">
                {isOwner
                  ? "Upload a floor photo so buyers see the plant, not a blank card."
                  : company.location}
              </p>
            </div>
          )}
          {isOwner ? (
            <div className="border-t border-line bg-background px-5 py-4 sm:px-8">
              <DirectoryPhotoUpload
                slug={company.slug}
                hasPhoto={Boolean(company.photoUrl)}
              />
            </div>
          ) : null}
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-16">
          <div>
            <div className="flex flex-wrap items-start gap-5">
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  className="h-14 w-auto max-w-[10rem] object-contain"
                />
              ) : null}
              <div>
                <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
                  {company.location}
                  {plantStatus === "plant" ? " · Plant" : ""}
                  {source ? " · Source" : ""}
                </p>
                <h1 className="mt-2 text-4xl font-medium tracking-tight sm:text-5xl">
                  {company.name}
                </h1>
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
              {company.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {company.website ? (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-copper hover:underline"
                >
                  {publicHost(company.website)}
                </a>
              ) : null}
              {company.linkedin ? (
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-copper hover:underline"
                >
                  LinkedIn
                </a>
              ) : null}
              {company.phone ? (
                <a href={`tel:${company.phone}`} className="text-copper hover:underline">
                  {company.phone}
                </a>
              ) : null}
            </div>

            {company.capabilities.length > 0 ? (
              <ul className="mt-8 flex flex-wrap gap-2">
                {company.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="border border-line px-3 py-1.5 text-sm"
                  >
                    {cap}
                  </li>
                ))}
              </ul>
            ) : null}

            {company.machines && company.machines.length > 0 ? (
              <section className="mt-12">
                <h2 className="text-lg font-medium tracking-tight">
                  {source ? "Filed cells" : "Equipment"}
                </h2>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {company.machines.map((machine) => (
                    <li key={machine} className="py-3 text-sm leading-6">
                      {machine}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {company.secondaries && company.secondaries.length > 0 ? (
              <section className="mt-12">
                <h2 className="text-lg font-medium tracking-tight">Secondaries</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {company.secondaries.map((id) => {
                    const href = secondaryHref(id);
                    const label = secondaryLabel(id);
                    return (
                      <li key={id}>
                        {href ? (
                          <Link
                            href={href}
                            className="border border-line px-3 py-1.5 text-sm hover:border-copper"
                          >
                            {label}
                          </Link>
                        ) : (
                          <span className="border border-line px-3 py-1.5 text-sm">
                            {label}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null}

            {company.industries && company.industries.length > 0 ? (
              <section className="mt-12">
                <h2 className="text-lg font-medium tracking-tight">Industries</h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {company.industries.join(" · ")}
                </p>
              </section>
            ) : null}

            {specs.length > 1 ? (
              <dl className="mt-12 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {specs.map((row) => (
                  <div key={row.label}>
                    <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-6">{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="border border-line p-6">
              {source ? (
                <div className="space-y-4">
                  <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
                    Source
                  </p>
                  <p className="text-sm leading-6 text-muted">
                    Jobs match the cells this shop filed. We introduce — emails
                    stay with the desk.
                  </p>
                  {company.weeklyCapacity ? (
                    <p className="text-sm leading-6">{company.weeklyCapacity}</p>
                  ) : null}
                  <Link
                    href="/source"
                    className="inline-flex items-center justify-center rounded-sm bg-copper px-5 py-2.5 text-sm font-medium text-white hover:bg-copper-dim"
                  >
                    Match a job
                  </Link>
                </div>
              ) : (
                <DirectoryLeadForm
                  companyName={company.name}
                  companySlug={company.slug}
                />
              )}
            </div>
          </aside>
        </div>

        <p className="mt-14 max-w-2xl text-xs leading-5 text-muted">
          {source
            ? `${company.name} filed its own cells on Source. Confirm with the shop before you send a print.`
            : `${company.name} names and marks belong to their owners. Confirm capabilities with the shop.`}
        </p>

        {relatedCompanies.length > 0 ? (
          <section className="mt-16 border-t border-line pt-12">
            <Kicker>Nearby</Kicker>
            <h2 className="mt-3 text-2xl tracking-tight">Other shops in {company.region}</h2>
            <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
              {relatedCompanies.map((related) => (
                <Link
                  key={related.slug}
                  href={`/directory/${related.slug}`}
                  className="group bg-background p-5 hover:bg-inset"
                >
                  <h3 className="font-medium group-hover:text-copper">
                    {related.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{related.location}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </Page>
    </>
  );
}
