import { StepQuoteBlock } from "@/components/StepUpload";
import { CardGrid, Page, PageHero, Section, TextLink } from "@/components/ui";
import { catalog, catalogByGroup, STOCK } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";
import { shopLines } from "@/lib/site";

export const metadata = pageMeta({
  title: "Product directory",
  description: `SKU directory of wire forms in ${STOCK}: hooks, hangers, grids, trays, frames, and hardware.`,
  path: "/products",
  keywords: ["wire form catalog", "wire hooks", "wire hangers", "wire trays"],
});

export default function ProductsPage() {
  return (
    <Page>
      <PageHero
        kicker={`${STOCK} · directory`}
        title={`${catalog.length} part families in stock coil.`}
        lede={
          <>
            Every SKU here is formed from 3/8, 7/16, or 1/2 in wire. No
            part numbers until a print is frozen. Process detail lives in
            the <TextLink href="/processes">library</TextLink>.
          </>
        }
      />
      {catalogByGroup().map(({ group, items }) => (
        <Section key={group} title={group}>
          <CardGrid
            items={items.map((item) => ({
              href: `/products/${item.slug}`,
              title: item.title,
              body: item.summary,
            }))}
          />
        </Section>
      ))}
      <Section title="Shop lines">
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          Our own goods, run on the same cells. Not a SKU in the
          directory above.
        </p>
        <CardGrid
          items={shopLines.map((item) => ({
            href: `/products/${item.slug}`,
            title: item.title,
            body: item.summary,
          }))}
        />
      </Section>
      <StepQuoteBlock className="mt-16" title="Need a hook, hanger, grid, or frame?" />
    </Page>
  );
}
