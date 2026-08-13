import { Page, PageHero, Section, LinkList, TextLink } from "@/components/ui";
import { secondaryOperations } from "@/lib/processes";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Secondary Operations",
  description:
    "Secondary operations on 4–14 mm wire forms: end forming, resistance weld, MIG/TIG, rack plating, in-line powder, and inspection.",
  path: "/secondary-operations",
  keywords: [
    "wire forming secondary operations",
    "resistance welding",
    "rack plating",
  ],
});

export default function SecondaryOperationsPage() {
  const items = secondaryOperations();

  return (
    <Page>
      <PageHero
        kicker="Shop"
        title="Secondary operations"
        lede="Form first. Then the ops that make the part install: ends, weld, plate, powder, inspect. Same building as the CNC cell."
      />
      <p className="mt-6 max-w-2xl text-sm leading-7 text-muted">
        Piece-price estimates on{" "}
        <TextLink href="/instant-quote">instant quote</TextLink> cover cut,
        bend, and wire. Secondaries below are quoted from the print.
      </p>
      <Section>
        <LinkList
          className="mt-5"
          items={items.map((process) => ({
            href: `/processes/${process.slug}`,
            title: process.title,
            body: process.summary,
            note: process.weRun ? "We run this" : "Explain only",
          }))}
        />
      </Section>
    </Page>
  );
}
