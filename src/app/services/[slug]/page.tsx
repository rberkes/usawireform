import { notFound } from "next/navigation";
import Link from "next/link";
import { BreadcrumbJsonLd, ServiceJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, FactGrid, StatRow, ChipList } from "@/components/ui";
import {
  getProductLocationCombos,
  getProductLocationCombo,
} from "@/lib/seo-pages/combinations";
import { products } from "@/lib/seo-pages/products";
import { cities } from "@/lib/seo-pages/cities";
import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProductLocationCombos().map((combo) => ({
    slug: combo.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const combo = getProductLocationCombo(slug);
    if (!combo) return {};

    const { product, city } = combo;

    return pageMeta({
      title: `${product.pluralName} in ${city.name}, ${city.stateCode}`,
      description: `Custom ${product.pluralName.toLowerCase()} for ${city.name} businesses. ${product.description.slice(0, 100)}... ${city.shippingNote}.`,
      path: `/services/${slug}`,
      keywords: [
        `${product.name.toLowerCase()} ${city.name}`,
        `${product.pluralName.toLowerCase()} ${city.stateCode}`,
        `custom ${product.name.toLowerCase()} ${city.name}`,
        `${product.category.toLowerCase()} ${city.name}`,
        ...product.applications.map((app) => `${app.toLowerCase()} ${city.name}`),
        ...city.keyIndustries.map((ind) => `${ind.toLowerCase()} ${product.name.toLowerCase()}`),
      ],
    });
  });
}

export default async function ProductLocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const combo = getProductLocationCombo(slug);
  if (!combo) notFound();

  const { product, city } = combo;

  const breadcrumbItems = [
    { label: "Services", href: "/services" },
    { label: `${product.pluralName} in ${city.name}` },
  ];

  const matchingIndustries = product.industries.filter((ind) =>
    city.keyIndustries.some(
      (cityInd) =>
        ind.toLowerCase().includes(cityInd.toLowerCase()) ||
        cityInd.toLowerCase().includes(ind.toLowerCase())
    )
  );

  const faqs = [
    {
      question: `Where can I get ${product.pluralName.toLowerCase()} in ${city.name}?`,
      answer: `We manufacture custom ${product.pluralName.toLowerCase()} for ${city.name} businesses from our Ohio facility. ${city.shippingNote}. We serve ${city.keyIndustries.slice(0, 3).join(", ")} and other industries throughout ${city.name}.`,
    },
    {
      question: `What materials are ${product.pluralName.toLowerCase()} made from?`,
      answer: `Our ${product.pluralName.toLowerCase()} are available in ${product.materials.join(", ")}. Material selection depends on your application requirements including corrosion resistance, temperature, and load.`,
    },
    {
      question: `How long does it take to get ${product.pluralName.toLowerCase()} shipped to ${city.name}?`,
      answer: `${city.shippingNote}. Production time depends on quantity and complexity—typically 2-4 weeks for custom orders. We offer expedited production for rush needs.`,
    },
  ];

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  const nearbyCities = cities
    .filter((c) => c.region === city.region && c.slug !== city.slug)
    .slice(0, 6);

  return (
    <Page>
      <BreadcrumbJsonLd
        items={[
          { name: "Services", url: "/services" },
          { name: `${product.pluralName} in ${city.name}`, url: `/services/${slug}` },
        ]}
      />
      <ServiceJsonLd
        name={`${product.pluralName} for ${city.name}`}
        description={`Custom ${product.pluralName.toLowerCase()} manufactured for ${city.name}, ${city.state} businesses.`}
        areaServed={`${city.name}, ${city.state}`}
        url={`/services/${slug}`}
      />
      <FAQJsonLd questions={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        kicker={product.category}
        title={
          <>
            {product.pluralName} for{" "}
            <span className="text-copper">{city.name}</span>
          </>
        }
        lede={`${product.description} Shipped to ${city.name} with ${city.shippingNote.toLowerCase()}.`}
      />

      <StatRow
        className="mt-12"
        items={[
          { value: city.shippingNote.split(" ")[0], label: `To ${city.name}` },
          { value: product.materials.length.toString(), label: "Material options" },
          { value: product.applications.length.toString(), label: "Applications" },
          { value: "4-14", label: "mm wire range" },
        ]}
      />

      <Section kicker="Why us" title={`${product.pluralName} Built for ${city.name}'s Industries`}>
        <p className="mt-4 max-w-2xl text-muted leading-7">
          {city.wireFormingRelevance}
        </p>
        {matchingIndustries.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium">Industries we serve in {city.name}:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {matchingIndustries.map((ind) => (
                <span key={ind} className="border border-copper/30 bg-copper/5 px-3 py-1 text-sm text-copper">
                  {ind}
                </span>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section kicker="Applications" title={`How ${city.name} Uses ${product.pluralName}`}>
        <ChipList items={product.applications} />
      </Section>

      <Section kicker="Materials" title="Available Materials">
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {product.materials.map((material) => (
            <div key={material} className="border border-line p-5">
              <h3 className="font-medium">{material}</h3>
              <p className="mt-2 text-sm text-muted">
                Available for {product.pluralName.toLowerCase()} shipped to {city.name}.
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Features" title={`${product.pluralName} Features`}>
        <FactGrid
          items={product.features.map((feature) => ({
            label: "Feature",
            value: feature,
          }))}
        />
      </Section>

      <Section kicker="Delivery" title={`Shipping to ${city.name}`}>
        <div className="mt-6 border border-line p-6 sm:p-8">
          <p className="text-lg font-medium">{city.shippingNote}</p>
          {city.nearbyManufacturing && (
            <p className="mt-2 text-muted">{city.nearbyManufacturing}</p>
          )}
          <p className="mt-4 text-sm text-muted">
            We ship {product.pluralName.toLowerCase()} to {city.name} and all surrounding areas via UPS, FedEx, and LTL freight.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-sm bg-copper px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-copper-dim"
          >
            Get a Quote for {city.name}
          </Link>
        </div>
      </Section>

      <Section kicker="FAQ" title={`${product.pluralName} Questions from ${city.name}`}>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <h3 className="font-medium">{faq.question}</h3>
              <p className="mt-2 text-sm text-muted leading-6">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      {relatedProducts.length > 0 && (
        <Section kicker="Related" title={`Other ${product.category} for ${city.name}`}>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/services/${p.slug}-${city.slug}`}
                className="border border-line p-5 hover:border-copper transition-colors"
              >
                <h3 className="font-medium">{p.pluralName}</h3>
                <p className="mt-2 text-sm text-muted">{p.description.slice(0, 80)}...</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section title={`${product.pluralName} in Nearby Cities`}>
        <div className="mt-6 flex flex-wrap gap-3">
          {nearbyCities.map((c) => (
            <Link
              key={c.slug}
              href={`/services/${product.slug}-${c.slug}`}
              className="border border-line px-4 py-2 text-sm hover:border-copper hover:text-copper transition-colors"
            >
              {c.name}, {c.stateCode}
            </Link>
          ))}
        </div>
      </Section>

      <StepQuoteBlock className="mt-16" title={`Quote for ${product.pluralName} in ${city.name}`} />
    </Page>
  );
}
