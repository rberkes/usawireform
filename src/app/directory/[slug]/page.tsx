import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DirectoryLeadForm } from "@/components/DirectoryLeadForm";
import { ServiceSchema } from "@/components/SeoSchemas";
import {
  Page,
  PageHero,
  Section,
  Kicker,
  SpecList,
  ButtonLink,
} from "@/components/ui";
import {
  directoryCompanies,
  getDirectoryCompany,
  getCompaniesByRegion,
  publicHost,
} from "@/lib/directory";
import { pageMeta } from "@/lib/seo";
import { overlaySourceOnDirectory, sourceClaimPath, sourceClaimable } from "@/lib/source-directory";
import { secondaryHref, secondaryLabel } from "@/lib/source-secondaries";
import { getSourceDirectoryCompany } from "@/lib/source";

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

  const relatedCompanies = getCompaniesByRegion(company.region)
    .filter((c) => c.slug !== slug)
    .slice(0, 6);

  const specs: { label: string; value: string }[] = [
    { label: "Location", value: company.location },
    { label: "Region", value: company.region },
    { label: "Country", value: company.country },
  ];

  if (company.wireDiameters) {
    specs.push({ label: "Wire diameters", value: company.wireDiameters });
  }
  if (company.established) {
    specs.push({ label: "Established", value: company.established });
  }
  if (company.certifications && company.certifications.length > 0) {
    specs.push({ label: "Certifications", value: company.certifications.join(", ") });
  }
  if (company.website) {
    specs.push({ label: "Website", value: publicHost(company.website) });
  }
  if (company.phone) {
    specs.push({ label: "Phone", value: company.phone });
  }
  if (company.machines && company.machines.length > 0) {
    specs.push({ label: "Public equipment notes", value: company.machines.join(", ") });
  }

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

        {claimable ? (
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            <ButtonLink href={sourceClaimPath(company.slug)}>
              Claim this page
            </ButtonLink>
            <p className="text-sm leading-6 text-muted">
              US shops: file CNC cells on this listing. One cell free.
            </p>
          </div>
        ) : null}

        <div className="grid gap-12 lg:grid-cols-[1fr,400px] lg:gap-16">
          <div>
            <PageHero
              kicker={`${company.region} · ${company.country}`}
              title={company.name}
              lede={company.location}
            />

            <p className="mt-6 text-sm leading-7 text-muted">
              {company.description}
            </p>

            {company.website && (
              <p className="mt-4">
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-copper hover:underline"
                >
                  {publicHost(company.website)} →
                </a>
              </p>
            )}
            {company.linkedin && (
              <p className="mt-2">
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-copper hover:underline"
                >
                  Company LinkedIn →
                </a>
              </p>
            )}

            <Section title="Specifications">
              <SpecList rows={specs} />
            </Section>

            <Section title="Capabilities">
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {company.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-start gap-2 text-sm leading-6"
                  >
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-copper" />
                    {cap}
                  </li>
                ))}
              </ul>
            </Section>

            {company.secondaries && company.secondaries.length > 0 ? (
              <Section title="Secondaries">
                <p className="mt-3 text-sm leading-6 text-muted">
                  Main secondary operations the shop listed on Source. Confirm
                  with the chair before you send a print.
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {company.secondaries.map((id) => {
                    const href = secondaryHref(id);
                    const label = secondaryLabel(id);
                    return (
                      <li
                        key={id}
                        className="flex items-start gap-2 text-sm leading-6"
                      >
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-copper" />
                        {href ? (
                          <Link href={href} className="hover:text-copper">
                            {label}
                          </Link>
                        ) : (
                          label
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Section>
            ) : null}

            {company.machines && company.machines.length > 0 ? (
              <Section title={source ? "Filed cells" : "What the shop published"}>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {source
                    ? "OEM, type, and wire band from the shop on Source. Not a floor walk by us."
                    : "Named iron from a public page. Not a floor audit. Confirm before you send a print."}
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {company.machines.map((machine) => (
                    <li
                      key={machine}
                      className="flex items-start gap-2 text-sm leading-6"
                    >
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-copper" />
                      {machine}
                    </li>
                  ))}
                </ul>
                {company.equipmentSource ? (
                  <p className="mt-4 text-sm text-muted">
                    Source:{" "}
                    <a
                      href={company.equipmentSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-copper hover:underline"
                    >
                      {publicHost(company.equipmentSource)}
                    </a>
                  </p>
                ) : null}
              </Section>
            ) : null}

            {company.industries && company.industries.length > 0 && (
              <Section title="Industries Served">
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {company.industries.map((ind) => (
                    <li
                      key={ind}
                      className="border border-line px-3 py-2 text-sm"
                    >
                      {ind}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="border border-line bg-inset/30 p-6">
              {source ? (
                <div className="space-y-4">
                  <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
                    Source
                  </p>
                  <p className="text-sm leading-6 text-muted">
                    Jobs match the cells this shop filed. We introduce — emails
                    stay with the desk.
                  </p>
                  <Link
                    href="/source/job"
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
          </div>
        </div>

        <div className="mt-12 border border-line bg-inset/30 p-4 text-xs leading-5 text-muted">
          <p>
            <strong className="text-foreground">Disclaimer:</strong>{" "}
            {source
              ? `${company.name} filed its own cells on Source. USA Wire Form did not walk the floor. Confirm with the shop before you send a print.`
              : `${company.name} is not affiliated with, endorsed by, or verified by USA Wire Form. Company names and trademarks belong to their respective owners. This listing is provided for informational purposes only. Contact ${company.name} directly to verify their capabilities, credentials, current equipment, and current business status.`}
          </p>
        </div>

        {relatedCompanies.length > 0 && (
          <section className="mt-20 border-t border-line pt-12">
            <Kicker>More in {company.region}</Kicker>
            <h2 className="mt-3 text-2xl tracking-tight">
              Other wire forming companies nearby
            </h2>
            <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
              {relatedCompanies.map((related) => (
                <Link
                  key={related.slug}
                  href={`/directory/${related.slug}`}
                  className="group bg-background p-4 hover:bg-inset transition-colors"
                >
                  <h3 className="font-medium group-hover:text-copper transition-colors">
                    {related.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{related.location}</p>
                  <p className="mt-2 text-sm text-muted line-clamp-2">
                    {related.description.slice(0, 80)}...
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 border-t border-line pt-12">
          <div className="max-w-2xl">
            <Kicker>Need something different?</Kicker>
            <h2 className="mt-3 text-2xl tracking-tight">
              We form 4–14 mm wire in Northeast Ohio
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              If your project falls in our diameter range, we&apos;d be happy to quote it.
              3D CNC wire forming, resistance welding, and secondary operations — all
              in-house in Cleveland.
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                href="/instant-quote"
                className="bg-copper px-6 py-3 text-sm font-medium text-background hover:bg-copper/90 transition-colors"
              >
                Get instant quote
              </Link>
              <Link
                href="/contact"
                className="border border-line px-6 py-3 text-sm font-medium hover:border-copper hover:text-copper transition-colors"
              >
                Send a STEP
              </Link>
            </div>
          </div>
        </section>
      </Page>
    </>
  );
}
