import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StepQuoteBlock } from "@/components/StepUpload";
import { ProductForm } from "@/components/ProductForm";
import { CardGrid, Page, PageHero, Section, TextLink } from "@/components/ui";
import { catalogByGroup, STOCK } from "@/lib/catalog";
import { shopLines } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { USA_MADE } from "@/lib/usa-made";

export const metadata = pageMeta({
  title: "Wire Form Products",
  description: `USA made wire baskets, USA made D-rings, USA made cable trays, USA made wire racks, USA made security fencing, USA made ground staples, and 100+ forms in ${STOCK}. Northeast Ohio.`,
  path: "/products",
  keywords: [
    "wire form products",
    "custom wire forms",
    "USA made D-rings",
    "USA made wire racks",
    "USA made cable trays",
    "USA made security fencing",
    "USA made wire baskets",
    "USA made heat treat baskets",
    "USA made ground staples",
    "USA made ground samples",
    "USA made wire stakes",
    "S-hooks",
    "D-rings",
    "wire baskets",
    "machine guards",
    "wire hooks",
    "wire hangers",
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
        lede={`USA made wire baskets, USA made D-rings, USA made cable trays, USA made wire racks, USA made security fencing, USA made ground staples, USA made wire stakes — plus 100+ forms in ${STOCK}.`}
      />

      <Section kicker="USA made" className="mt-12">
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Exact terms buyers search. Each line is a part we form from coil in
          Northeast Ohio — not a mill, not an import SKU.
        </p>
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          {USA_MADE.map((entry) => (
            <li key={entry.slug}>
              {entry.phrases.map((phrase, index) => (
                <span key={phrase}>
                  {index > 0 ? " · " : ""}
                  <TextLink href={entry.href}>{phrase}</TextLink>
                </span>
              ))}
            </li>
          ))}
          <li>
            <TextLink href="/330-stainless-wire-bending-usa-parts">
              USA made heat treat baskets
            </TextLink>
            {" "}
            in 330
          </li>
        </ul>
      </Section>

      {groups.map((group) => (
        <Section key={group.group} kicker={group.group} className="mt-12 first:mt-8">
          <CardGrid
            columns={3}
            items={group.items.map((item) => ({
              href: `/products/${item.slug}`,
              title: item.title,
              body: item.summary,
              visual: (
                <ProductForm
                  slug={item.slug}
                  className="h-full w-full p-4"
                />
              ),
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
