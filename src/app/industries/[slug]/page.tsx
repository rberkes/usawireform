import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { IndustryQuotePage } from "@/components/client/IndustryQuotePage";
import { QuotePath } from "@/components/QuotePath";
import { ShopRoster } from "@/components/ShopRoster";
import { Section, TextLink } from "@/components/ui";
import { inventorySummary, shopsForIndustry } from "@/lib/graph";
import { pageMeta } from "@/lib/seo";
import { getIndustryTaxonomy } from "@/lib/taxonomy";

const DYNAMIC_INDUSTRIES = ["medical", "aerospace", "retail-displays"] as const;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DYNAMIC_INDUSTRIES.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryTaxonomy(slug);
  if (!industry) return {};
  const shops = shopsForIndustry(industry.slug);
  return pageMeta({
    title: `${industry.title} Wire Forming`,
    description: `${shops.length} directory shops name ${industry.title.toLowerCase()}. Capabilities and machines from the listings — not a generated industry brochure.`,
    path: industry.path,
    keywords: [industry.title, `${industry.title} wire forming`, "wire forming shops"],
  });
}

export default async function TaxonomyIndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryTaxonomy(slug);
  if (!industry || !DYNAMIC_INDUSTRIES.includes(slug as (typeof DYNAMIC_INDUSTRIES)[number])) {
    notFound();
  }
  const shops = shopsForIndustry(industry.slug);
  const inventory = inventorySummary(shops);

  return (
    <IndustryQuotePage
      title={industry.title}
      lede={`${shops.length} directory shop${shops.length === 1 ? "" : "s"} name ${industry.title.toLowerCase()}. Confirm the diameter and the cert — this is the shop list, not a claim that every listing is qualified.`}
      ctaTitle={`Have a ${industry.title.toLowerCase()} print?`}
      top={
        <>
          <BreadcrumbJsonLd
            items={[
              { name: "Industries", url: "/industries" },
              { name: industry.title, url: industry.path },
            ]}
          />
          <Breadcrumbs
            items={[
              { label: "Industries", href: "/industries" },
              { label: industry.title },
            ]}
          />
        </>
      }
    >
      <Section title="Shops that name this industry">
        <ShopRoster
          shops={shops}
          empty="No directory shop has named this industry yet."
        />
      </Section>
      {inventory.capabilities.length > 0 ? (
        <p className="mt-8 text-sm leading-7 text-muted">
          Processes in this set:{" "}
          {inventory.capabilities.map((item, index) => (
            <span key={item.slug}>
              {index > 0 ? " · " : ""}
              <TextLink href={item.path}>{item.title}</TextLink>
            </span>
          ))}
          .
        </p>
      ) : null}
      <QuotePath title={`RFQ a ${industry.title.toLowerCase()} form`} />
    </IndustryQuotePage>
  );
}
