import type { Metadata } from "next";
import { StepQuoteBlock } from "@/components/StepUpload";
import { CardGrid, Page, PageHero } from "@/components/ui";
import { industries } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Wire forming by sector: named industries we actually run in 4–14 mm — frames, trays, hangers, wire baskets, and guards. Not every SIC code.",
};

export default function IndustriesPage() {
  return (
    <Page>
      <PageHero
        kicker="Industries"
        title="Where the forms go."
        lede="50+ years of industry experience, applied to the sectors we actually run — not a list of every SIC code in the country."
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
