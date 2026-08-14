import { notFound } from "next/navigation";
import Link from "next/link";
import { BreadcrumbJsonLd, LocalBusinessJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, FactGrid, CardGrid, StatRow } from "@/components/ui";
import { cities, getCityBySlug } from "@/lib/seo-pages/cities";
import { products } from "@/lib/seo-pages/products";
import { pageMeta } from "@/lib/seo";
import { COMPANY } from "@/lib/company";
import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  return params.then(({ city: citySlug }) => {
    const city = getCityBySlug(citySlug);
    if (!city) return {};

    return pageMeta({
      title: `Wire Forming in ${city.name}, ${city.stateCode}`,
      description: `Custom CNC wire forming services in ${city.name}, ${city.state}. ${city.wireFormingRelevance.slice(0, 120)}...`,
      path: `/locations/${city.slug}`,
      keywords: [
        `wire forming ${city.name}`,
        `CNC wire forming ${city.stateCode}`,
        `custom wire forms ${city.name}`,
        `wire baskets ${city.name}`,
        `wire manufacturer ${city.state}`,
        ...city.keyIndustries.map((ind) => `${ind.toLowerCase()} wire forms ${city.name}`),
      ],
    });
  });
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const breadcrumbItems = [
    { label: "Locations", href: "/locations" },
    { label: `${city.name}, ${city.stateCode}` },
  ];

  const relevantProducts = products.filter((p) =>
    p.industries.some((ind) =>
      city.keyIndustries.some(
        (cityInd) =>
          ind.toLowerCase().includes(cityInd.toLowerCase()) ||
          cityInd.toLowerCase().includes(ind.toLowerCase())
      )
    )
  );

  const faqs = [
    {
      question: `Do you ship wire forms to ${city.name}?`,
      answer: `Yes, we ship to ${city.name}, ${city.state} and all surrounding areas. ${city.shippingNote}. We've been serving ${city.name}'s ${city.keyIndustries[0]?.toLowerCase()} industry and other sectors for decades.`,
    },
    {
      question: `What wire forming services are available in ${city.name}?`,
      answer: `We provide full CNC wire forming services to ${city.name} including wire baskets, machine guards, racks, frames, hooks, and custom forms in 4-14 mm wire. All work is done in our Ohio facility and shipped directly to your ${city.name} location.`,
    },
    {
      question: `How fast can you deliver wire forms to ${city.name}?`,
      answer: `${city.shippingNote}. For rush orders, we can expedite both production and shipping to meet your deadlines.`,
    },
  ];

  return (
    <Page>
      <BreadcrumbJsonLd
        items={[
          { name: "Locations", url: "/locations" },
          { name: `${city.name}, ${city.stateCode}`, url: `/locations/${city.slug}` },
        ]}
      />
      <LocalBusinessJsonLd
        name={COMPANY}
        description={`Custom CNC wire forming services for ${city.name}, ${city.state}`}
        areaServed={`${city.name}, ${city.state}`}
      />
      <FAQJsonLd questions={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        kicker={`Wire Forming in ${city.state}`}
        title={
          <>
            CNC Wire Forming for{" "}
            <span className="text-copper">{city.name}</span>
          </>
        }
        lede={city.wireFormingRelevance}
      />

      <StatRow
        className="mt-12"
        items={[
          { value: city.shippingNote.split(" ")[0], label: "Shipping" },
          { value: city.population, label: "Metro population" },
          { value: city.keyIndustries.length.toString(), label: "Key industries" },
          { value: "50+", label: "Years experience" },
        ]}
      />

      <Section kicker="Local economy" title={`${city.name}'s Industrial Landscape`}>
        <p className="mt-4 max-w-2xl text-muted leading-7">
          {city.nickname && `Known as "${city.nickname}," `}
          {city.name} is a major hub for {city.keyIndustries.slice(0, 3).join(", ").toLowerCase()}.
          {city.industrialFacts[0] && ` ${city.industrialFacts[0]}.`}
        </p>
        <FactGrid
          items={city.industrialFacts.map((fact, i) => ({
            label: `Fact ${i + 1}`,
            value: fact,
          }))}
        />
      </Section>

      <Section kicker="Industries we serve" title={`Wire Forms for ${city.name}'s Industries`}>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {city.keyIndustries.map((industry) => (
            <div key={industry} className="border border-line p-5">
              <h3 className="font-medium">{industry}</h3>
              <p className="mt-2 text-sm text-muted">
                Custom wire forms designed for {city.name}'s {industry.toLowerCase()} operations.
              </p>
            </div>
          ))}
        </div>
      </Section>

      {relevantProducts.length > 0 && (
        <Section kicker="Products" title={`Wire Products for ${city.name}`}>
          <CardGrid
            items={relevantProducts.slice(0, 6).map((product) => ({
              href: `/products`,
              title: product.pluralName,
              body: product.description.slice(0, 100) + "...",
            }))}
            columns={3}
          />
        </Section>
      )}

      <Section kicker="Shipping" title={`Delivery to ${city.name}`}>
        <div className="mt-6 border border-line p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-lg font-medium">{city.shippingNote}</p>
              {city.nearbyManufacturing && (
                <p className="mt-2 text-muted">{city.nearbyManufacturing}</p>
              )}
              <p className="mt-4 text-sm text-muted">
                We ship to all {city.name} area businesses via UPS, FedEx, and LTL freight.
                Expedited options available for rush orders.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-sm bg-copper px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-copper-dim"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section kicker="FAQ" title={`Wire Forming Questions from ${city.name}`}>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <h3 className="font-medium">{faq.question}</h3>
              <p className="mt-2 text-sm text-muted leading-6">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Nearby Locations">
        <div className="mt-6 flex flex-wrap gap-3">
          {cities
            .filter((c) => c.region === city.region && c.slug !== city.slug)
            .slice(0, 8)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="border border-line px-4 py-2 text-sm hover:border-copper hover:text-copper transition-colors"
              >
                {c.name}, {c.stateCode}
              </Link>
            ))}
        </div>
      </Section>

      <StepQuoteBlock className="mt-16" title={`Get a quote for ${city.name} delivery`} />
    </Page>
  );
}
