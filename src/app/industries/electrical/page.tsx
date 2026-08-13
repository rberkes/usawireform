import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Electrical Wire Forming",
  description: "Electrical wire forming in 3/8, 7/16, and 1/2 in: cable trays, J-hooks, hangers, and routing forms — not 9-gauge clip wire.",
  path: '/industries/electrical',
  keywords: [
    "electrical",
    "electrical wire forming",
    "4-14 mm wire",
    "CNC wire forms",
  ],
});

export default function ElectricalPage() {
  return (
    <Page>
      <PageHero
        kicker="Industries"
        title="Electrical"
        lede="Plant and utility cable support in 4–14 mm. Trays, J-hooks, and hangers — not a light clip cell, and not a data-hall slogan."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Electrical forms here carry cable, not current. Stock diameters{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink>,{" "}
          <TextLink href="/materials">1018 zinc</TextLink> or 304. High-density
          hall trays live on{" "}
          <TextLink href="/industries/data-centers">
            AI and data centers
          </TextLink>
          . This page is the plant, the utility run, and the room that is
          not a white-space row.
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/cable-trays">Cable trays</TextLink>{" "}
            and{" "}
            <TextLink href="/products/mesh-grids">mesh grids</TextLink>
          </li>
          <li>
            <TextLink href="/products/j-hooks">J-hooks</TextLink>,{" "}
            <TextLink href="/products/cable-hangers">cable hangers</TextLink>
            , and{" "}
            <TextLink href="/products/u-hangers">U-hangers</TextLink>
          </li>
          <li>
            <TextLink href="/products/pipe-hangers">Pipe hangers</TextLink>{" "}
            and{" "}
            <TextLink href="/products/hose-hangers">hose hangers</TextLink>
          </li>
          <li>
            <TextLink href="/products/machine-guards">Guards</TextLink>{" "}
            around gear and bus
          </li>
        </ul>
      </Section>
      <StepQuoteBlock className="mt-16" title="Have a tray, a J-hook, or a hanger spec?" />
    </Page>
  );
}
