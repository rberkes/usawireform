import { notFound } from "next/navigation";
import Link from "next/link";
import { BreadcrumbJsonLd, ServiceJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, FactGrid, ChipList, CardGrid } from "@/components/ui";
import {
  getIndustryProductCombos,
  getIndustryProductCombo,
} from "@/lib/seo-pages/combinations";
import { seoIndustries } from "@/lib/seo-pages/industries";
import { products } from "@/lib/seo-pages/products";
import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return getIndustryProductCombos().map((combo) => ({
    slug: combo.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const combo = getIndustryProductCombo(slug);
    if (!combo) return {};

    const { industry, product } = combo;

    return pageMeta({
      title: `${product.pluralName} for ${industry.name}`,
      description: `Custom ${product.pluralName.toLowerCase()} designed for ${industry.name.toLowerCase()} applications. ${product.description.slice(0, 100)}...`,
      path: `/solutions/${slug}`,
      keywords: [
        `${industry.name.toLowerCase()} ${product.name.toLowerCase()}`,
        `${product.pluralName.toLowerCase()} for ${industry.name.toLowerCase()}`,
        `${industry.name.toLowerCase()} wire forms`,
        ...industry.wireNeeds.map((need) => `${need.toLowerCase()} ${product.name.toLowerCase()}`),
        ...product.applications.map((app) => `${industry.name.toLowerCase()} ${app.toLowerCase()}`),
      ],
    });
  });
}

export default async function IndustryProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const combo = getIndustryProductCombo(slug);
  if (!combo) notFound();

  const { industry, product } = combo;

  const breadcrumbItems = [
    { label: "Solutions", href: "/solutions" },
    { label: `${product.pluralName} for ${industry.name}` },
  ];

  const faqs = [
    {
      question: `What ${product.pluralName.toLowerCase()} do ${industry.name.toLowerCase()} companies need?`,
      answer: `${industry.name} operations typically need ${product.pluralName.toLowerCase()} for ${product.applications.slice(0, 3).join(", ").toLowerCase()}. ${industry.description}`,
    },
    {
      question: `What materials work best for ${industry.name.toLowerCase()} ${product.pluralName.toLowerCase()}?`,
      answer: `For ${industry.name.toLowerCase()} applications, we typically recommend ${industry.materials?.slice(0, 2).join(" or ") || product.materials.slice(0, 2).join(" or ")}. Material selection depends on your specific requirements including ${industry.wireNeeds.slice(0, 2).join(" and ").toLowerCase()}.`,
    },
    {
      question: `Can you meet ${industry.name.toLowerCase()} compliance requirements?`,
      answer: `Yes, we work with ${industry.name.toLowerCase()} companies regularly and understand requirements like ${industry.challenges.slice(0, 2).join(" and ")}. Our quality systems and documentation support industry certifications.`,
    },
  ];

  const relatedProducts = products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.industries.some(
          (ind) =>
            industry.name.toLowerCase().includes(ind.toLowerCase()) ||
            ind.toLowerCase().includes(industry.name.toLowerCase())
        )
    )
    .slice(0, 4);

  const relatedIndustries = seoIndustries
    .filter(
      (ind) =>
        ind.slug !== industry.slug &&
        product.industries.some(
          (pInd) =>
            ind.name.toLowerCase().includes(pInd.toLowerCase()) ||
            pInd.toLowerCase().includes(ind.name.toLowerCase())
        )
    )
    .slice(0, 4);

  return (
    <Page>
      <BreadcrumbJsonLd
        items={[
          { name: "Solutions", url: "/solutions" },
          { name: `${product.pluralName} for ${industry.name}`, url: `/solutions/${slug}` },
        ]}
      />
      <ServiceJsonLd
        name={`${product.pluralName} for ${industry.name}`}
        description={`Custom ${product.pluralName.toLowerCase()} designed for ${industry.name.toLowerCase()} applications.`}
        url={`/solutions/${slug}`}
      />
      <FAQJsonLd questions={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        kicker={industry.name}
        title={
          <>
            {product.pluralName} for{" "}
            <span className="text-copper">{industry.name}</span>
          </>
        }
        lede={`${product.description} Designed to meet ${industry.name.toLowerCase()} requirements.`}
      />

      <Section kicker="Industry needs" title={`Why ${industry.name} Needs ${product.pluralName}`}>
        <p className="mt-4 max-w-2xl text-muted leading-7">{industry.description}</p>
        <FactGrid
          items={industry.wireNeeds.map((need) => ({
            label: "Requirement",
            value: need,
          }))}
        />
      </Section>

      <Section kicker="Applications" title={`${product.pluralName} Applications in ${industry.name}`}>
        <ChipList items={product.applications} />
      </Section>

      <Section kicker="Common products" title={`${industry.name} Wire Products`}>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industry.commonProducts.map((item) => (
            <div key={item} className="border border-line p-5">
              <h3 className="font-medium">{item}</h3>
              <p className="mt-2 text-sm text-muted">
                Custom {item.toLowerCase()} for {industry.name.toLowerCase()} applications.
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Materials" title={`Materials for ${industry.name}`}>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {(industry.materials || product.materials).map((material) => (
            <div key={material} className="border border-line p-5">
              <h3 className="font-medium">{material}</h3>
              <p className="mt-2 text-sm text-muted">
                Suitable for {industry.name.toLowerCase()} {product.pluralName.toLowerCase()}.
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Challenges" title={`${industry.name} Challenges We Solve`}>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {industry.challenges.map((challenge) => (
            <div key={challenge} className="py-4">
              <p className="text-sm">{challenge}</p>
            </div>
          ))}
        </div>
        {industry.caseStudy && (
          <div className="mt-6 border-l-2 border-copper pl-4">
            <p className="text-sm italic text-muted">{industry.caseStudy}</p>
          </div>
        )}
      </Section>

      <Section kicker="FAQ" title={`${product.pluralName} for ${industry.name} Questions`}>
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
        <Section kicker="Related products" title={`More ${industry.name} Wire Products`}>
          <CardGrid
            items={relatedProducts.map((p) => ({
              href: `/solutions/${p.slug}-for-${industry.slug}`,
              title: p.pluralName,
              body: p.description.slice(0, 80) + "...",
            }))}
          />
        </Section>
      )}

      {relatedIndustries.length > 0 && (
        <Section kicker="Related industries" title={`${product.pluralName} for Other Industries`}>
          <div className="mt-6 flex flex-wrap gap-3">
            {relatedIndustries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/solutions/${product.slug}-for-${ind.slug}`}
                className="border border-line px-4 py-2 text-sm hover:border-copper hover:text-copper transition-colors"
              >
                {ind.name}
              </Link>
            ))}
          </div>
        </Section>
      )}

      <StepQuoteBlock
        className="mt-16"
        title={`Get a quote for ${industry.name} ${product.pluralName.toLowerCase()}`}
      />
    </Page>
  );
}
