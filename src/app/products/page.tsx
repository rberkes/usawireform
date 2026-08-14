import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StepQuoteBlock } from "@/components/StepUpload";
import { CardGrid, Page, PageHero, Section } from "@/components/ui";
import { catalog, catalogGroups, catalogByGroup, STOCK } from "@/lib/catalog";
import { shopLines } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Form Products",
  description: `Custom wire form products in ${STOCK}: hooks, rings, hangers, frames, guards, baskets, and hardware. 4–14 mm CNC forming.`,
  path: "/products",
  keywords: [
    "wire form products",
    "custom wire forms",
    "S-hooks",
    "D-rings",
    "wire baskets",
    "machine guards",
  ],
});

export default function ProductsPage() {
  const groups = catalogByGroup();
  const breadcrumbItems = [{ label: "Products" }];

  return (
    <Page>
      <BreadcrumbJsonLd items={[{ name: "Products", url: "/products" }]} />
      <Breadcrumbs items={breadcrumbItems} />
      <PageHero
        kicker="Catalog"
        title="Wire form products"
        lede={`Heavy wire products in ${STOCK} — hooks, rings, hangers, frames, guards, and baskets. 100+ forms in the production catalog.`}
      />

      {groups.map((group) => (
        <Section key={group.group} kicker={group.group} className="mt-12 first:mt-8">
          <CardGrid
            columns={3}
            items={group.items.map((item) => ({
              href: `/products/${item.slug}`,
              title: item.title,
              body: item.summary,
            }))}
          />
        </Section>
      ))}

      {/* Shop lines */}
      <Section kicker="Shop lines" className="mt-16">
        <CardGrid
          columns={2}
          items={shopLines.map((line) => ({
            href: `/products/${line.slug}`,
            title: line.title,
            body: line.summary,
          }))}
        />
      </Section>

      <StepQuoteBlock className="mt-16" title="Have a product to quote?" />
    </Page>
  );
}
