import { notFound } from "next/navigation";
import Link from "next/link";
import { BreadcrumbJsonLd, ServiceJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, FactGrid, ChipList, CardGrid } from "@/components/ui";
import { materials, getMaterialBySlug } from "@/lib/seo-pages/materials";
import { products } from "@/lib/seo-pages/products";
import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return materials.map((material) => ({
    slug: material.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const material = getMaterialBySlug(slug);
    if (!material) return {};

    return pageMeta({
      title: `${material.name} Wire Forming`,
      description: `Custom CNC wire forming in ${material.name.toLowerCase()}. ${material.description}`,
      path: `/materials/${slug}`,
      keywords: [
        `${material.name.toLowerCase()} wire forming`,
        `${material.shortName.toLowerCase()} wire forms`,
        `custom ${material.name.toLowerCase()} wire`,
        ...material.properties.map((prop) => `${prop.toLowerCase()} wire`),
        ...material.applications.map((app) => `${material.shortName.toLowerCase()} ${app.toLowerCase()}`),
      ],
    });
  });
}

export default async function MaterialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);
  if (!material) notFound();

  const breadcrumbItems = [
    { label: "Materials", href: "/materials" },
    { label: material.name },
  ];

  const compatibleProducts = products.filter((p) =>
    p.materials.some(
      (mat) =>
        material.name.toLowerCase().includes(mat.toLowerCase()) ||
        mat.toLowerCase().includes(material.name.toLowerCase()) ||
        material.shortName.toLowerCase().includes(mat.toLowerCase())
    )
  );

  const faqs = [
    {
      question: `What products can be made from ${material.name}?`,
      answer: `${material.name} is ideal for ${material.applications.slice(0, 4).join(", ").toLowerCase()}. We can form ${material.name.toLowerCase()} into wire baskets, frames, guards, racks, hooks, and custom shapes in 4-14 mm wire diameters.`,
    },
    {
      question: `What are the properties of ${material.name} wire?`,
      answer: `${material.name} wire offers ${material.properties.join(", ").toLowerCase()}. ${material.description}`,
    },
    {
      question: `What specifications does your ${material.name} wire meet?`,
      answer: `We use ${material.name} wire meeting ${material.specifications.join(", ")}. Material certifications available on request.`,
    },
  ];

  const otherMaterials = materials.filter((m) => m.slug !== material.slug);

  return (
    <Page>
      <BreadcrumbJsonLd
        items={[
          { name: "Materials", url: "/materials" },
          { name: material.name, url: `/materials/${slug}` },
        ]}
      />
      <ServiceJsonLd
        name={`${material.name} Wire Forming`}
        description={`Custom CNC wire forming in ${material.name.toLowerCase()}.`}
        url={`/materials/${slug}`}
      />
      <FAQJsonLd questions={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        kicker="Materials"
        title={
          <>
            <span className="text-copper">{material.name}</span> Wire Forming
          </>
        }
        lede={material.description}
      />

      <Section kicker="Properties" title={`${material.name} Properties`}>
        <ChipList items={material.properties} />
      </Section>

      <Section kicker="Applications" title={`${material.name} Applications`}>
        <FactGrid
          items={material.applications.map((app) => ({
            label: "Application",
            value: app,
          }))}
        />
      </Section>

      <Section kicker="Industries" title={`Industries Using ${material.name}`}>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {material.industries.map((industry) => (
            <div key={industry} className="border border-line p-5">
              <h3 className="font-medium">{industry}</h3>
              <p className="mt-2 text-sm text-muted">
                {material.name} wire forms for {industry.toLowerCase()} applications.
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Specifications" title="Material Specifications">
        <div className="mt-6 divide-y divide-line border-y border-line">
          {material.specifications.map((spec) => (
            <div key={spec} className="py-4 flex justify-between items-center">
              <span className="font-mono text-sm">{spec}</span>
              <span className="text-xs text-copper">Available</span>
            </div>
          ))}
        </div>
      </Section>

      {compatibleProducts.length > 0 && (
        <Section kicker="Products" title={`${material.name} Wire Products`}>
          <CardGrid
            columns={3}
            items={compatibleProducts.slice(0, 9).map((product) => ({
              href: `/products`,
              title: product.pluralName,
              body: `Available in ${material.shortName}.`,
            }))}
          />
        </Section>
      )}

      <Section kicker="FAQ" title={`${material.name} Wire Forming Questions`}>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <h3 className="font-medium">{faq.question}</h3>
              <p className="mt-2 text-sm text-muted leading-6">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Other materials" title="Explore Other Materials">
        <div className="mt-6 flex flex-wrap gap-3">
          {otherMaterials.map((mat) => (
            <Link
              key={mat.slug}
              href={`/materials/${mat.slug}`}
              className="border border-line px-4 py-2 text-sm hover:border-copper hover:text-copper transition-colors"
            >
              {mat.name}
            </Link>
          ))}
        </div>
      </Section>

      <StepQuoteBlock
        className="mt-16"
        title={`Get a quote for ${material.name} wire forms`}
      />
    </Page>
  );
}
