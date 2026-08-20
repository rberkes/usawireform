import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StepQuoteBlock } from "@/components/StepUpload";
import { CardGrid, Page, PageHero } from "@/components/ui";
import { industries } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Industries",
  description: "Wire forming by sector: USA made cable trays, USA made wire baskets, USA made D-rings, USA made security fencing — named industries in 4–14 mm. Not every SIC code.",
  path: '/industries',
  keywords: [
    "USA made cable trays",
    "USA made wire baskets",
    "USA made D-rings",
    "USA made security fencing",
    "wire forming industries",
    "OEM wire forms",
  ],
});

export default function IndustriesPage() {
  const breadcrumbItems = [{ label: "Industries" }];

  return (
    <Page>
      <BreadcrumbJsonLd items={[{ name: "Industries", url: "/industries" }]} />
      <Breadcrumbs items={breadcrumbItems} />
      <PageHero
        kicker="Industries"
        title="Where the forms go."
        lede="Named sectors we actually run — USA made cable trays, USA made wire baskets, USA made D-rings, USA made security fencing — not a list of every SIC code in the country."
      />
      <CardGrid
        items={industries.map((item) => ({
          href: `/industries/${item.slug}`,
          title: item.title,
          body: item.summary,
        }))}
      />
      <StepQuoteBlock className="mt-16" title="Have a print from the field?" />
    </Page>
  );
}
