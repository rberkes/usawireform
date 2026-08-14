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
} from "@/components/ui";
import {
  directoryCompanies,
  getDirectoryCompany,
  getCompaniesByRegion,
} from "@/lib/directory";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return directoryCompanies.map((company) => ({ slug: company.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const company = getDirectoryCompany(slug);
  if (!company) return {};

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
  const company = getDirectoryCompany(slug);
  if (!company) notFound();

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
                  Visit website →
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
              <DirectoryLeadForm
                companyName={company.name}
                companySlug={company.slug}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 border border-line bg-inset/30 p-4 text-xs leading-5 text-muted">
          <p>
            <strong className="text-foreground">Disclaimer:</strong> {company.name} is not affiliated with, endorsed by, or verified by USA Wire Form. Company names and trademarks belong to their respective owners. This listing is provided for informational purposes only. Contact {company.name} directly to verify their capabilities, credentials, and current business status.
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
