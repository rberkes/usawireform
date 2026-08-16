import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CardGrid, Page, PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Forming Guides",
  description:
    "Guides for 4–14 mm CNC wire forming: design-for-manufacturing rules, and how to specify cable support without a patented hanger catalog.",
  path: "/guide",
  keywords: ["wire forming guide", "cable support specification", "DFM wire forms"],
});

export default function GuideIndexPage() {
  return (
    <Page>
      <BreadcrumbJsonLd items={[{ name: "Guide", url: "/guide" }]} />
      <Breadcrumbs items={[{ label: "Guide" }]} />
      <PageHero
        kicker="Guide"
        title="Guides for the print, not a slogan."
        lede="How to draw a 4–14 mm form this shop can run — and how to specify cable support without buying someone else’s patented clip."
      />
      <CardGrid
        items={[
          {
            href: "/guide/design-for-wire-forming",
            title: "Design for wire forming",
            body: "Bend radius, legs, springback, tolerances, ends, and what to put on the CAD.",
          },
          {
            href: "/guide/open-cable-support",
            title: "Open cable support",
            body: "Trays, J-hooks, and bolted U-hangers when you do not want to pay a catalog patent premium.",
          },
        ]}
      />
    </Page>
  );
}
