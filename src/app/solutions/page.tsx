import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, Kicker, CardGrid } from "@/components/ui";
import { seoIndustries } from "@/lib/seo-pages/industries";
import { products } from "@/lib/seo-pages/products";
import { getIndustryProductCombos } from "@/lib/seo-pages/combinations";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Forming Solutions by Industry",
  description:
    "Custom wire forming solutions for automotive, aerospace, medical, food processing, and more. Industry-specific products designed for your requirements.",
  path: "/solutions",
  keywords: [
    "wire forming solutions",
    "industry wire forms",
    "custom wire forms by industry",
    "specialized wire products",
    "industrial wire forming",
  ],
});

export default function SolutionsPage() {
  const breadcrumbItems = [{ label: "Solutions" }];
  const combos = getIndustryProductCombos();

  return (
    <Page>
      <BreadcrumbJsonLd items={[{ name: "Solutions", url: "/solutions" }]} />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        kicker="Solutions"
        title="Wire forming for every industry."
        lede="50+ years of experience serving manufacturers across automotive, aerospace, medical, food processing, and more. We understand your industry's requirements."
      />

      <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-background p-6">
          <p className="font-mono text-2xl text-copper">{seoIndustries.length}</p>
          <p className="mt-1 text-sm text-muted">Industries served</p>
        </div>
        <div className="bg-background p-6">
          <p className="font-mono text-2xl text-copper">{products.length}</p>
          <p className="mt-1 text-sm text-muted">Product types</p>
        </div>
        <div className="bg-background p-6">
          <p className="font-mono text-2xl text-copper">{combos.length}</p>
          <p className="mt-1 text-sm text-muted">Solutions</p>
        </div>
        <div className="bg-background p-6">
          <p className="font-mono text-2xl text-copper">50+</p>
          <p className="mt-1 text-sm text-muted">Years experience</p>
        </div>
      </div>

      <Section kicker="By industry" title="Wire Forms for Your Industry">
        <div className="mt-6 grid gap-px bg-line sm:grid-cols-2">
          {seoIndustries.map((industry) => {
            const industryProducts = products.filter((p) =>
              p.industries.some(
                (ind) =>
                  industry.name.toLowerCase().includes(ind.toLowerCase()) ||
                  ind.toLowerCase().includes(industry.name.toLowerCase())
              )
            );

            return (
              <div key={industry.slug} className="bg-background p-6">
                <h3 className="font-medium">{industry.name}</h3>
                <p className="mt-2 text-sm text-muted">
                  {industry.description.slice(0, 120)}...
                </p>
                <div className="mt-4">
                  <p className="text-xs font-medium text-copper uppercase tracking-wide mb-2">
                    Products for {industry.name}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {industryProducts.slice(0, 4).map((product) => (
                      <Link
                        key={product.slug}
                        href={`/solutions/${product.slug}-for-${industry.slug}`}
                        className="text-xs text-muted hover:text-copper"
                      >
                        {product.pluralName}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section kicker="By product" title="Products Across Industries">
        <CardGrid
          columns={3}
          items={products.slice(0, 12).map((product) => ({
            href: `/products`,
            title: product.pluralName,
            body: `Available for ${product.industries.slice(0, 3).join(", ").toLowerCase()}.`,
          }))}
        />
      </Section>

      <Section kicker="Experience" title="Industry Certifications & Compliance">
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border border-line p-5">
            <h3 className="font-medium">Automotive</h3>
            <p className="mt-2 text-sm text-muted">PPAP capable, IATF 16949 ready</p>
          </div>
          <div className="border border-line p-5">
            <h3 className="font-medium">Aerospace</h3>
            <p className="mt-2 text-sm text-muted">AS9100 compliance, full traceability</p>
          </div>
          <div className="border border-line p-5">
            <h3 className="font-medium">Medical</h3>
            <p className="mt-2 text-sm text-muted">FDA compliance, biocompatible materials</p>
          </div>
          <div className="border border-line p-5">
            <h3 className="font-medium">Food Processing</h3>
            <p className="mt-2 text-sm text-muted">NSF certified, USDA standards</p>
          </div>
          <div className="border border-line p-5">
            <h3 className="font-medium">Defense</h3>
            <p className="mt-2 text-sm text-muted">MIL-SPEC, ITAR registered</p>
          </div>
          <div className="border border-line p-5">
            <h3 className="font-medium">HVAC</h3>
            <p className="mt-2 text-sm text-muted">UL/CSA compliance</p>
          </div>
        </div>
      </Section>

      <StepQuoteBlock className="mt-16" title="Ready to discuss your industry needs?" />
    </Page>
  );
}
