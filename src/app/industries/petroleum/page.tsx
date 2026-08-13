import type { Metadata } from "next";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Petroleum Wire Forming",
  description:
    "Petroleum and pad wire forming in 3/8, 7/16, and 1/2 in: outdoor hangers, guards, and trays. Galvanized, 304, or 330.",
};

export default function PetroleumPage() {
  return (
    <Page>
      <PageHero
        kicker="Industries"
        title="Petroleum"
        lede="Outdoor pad hardware in 4–14 mm. Hangers, guards, and trays. Galvanized, 304, or 330 when heat is the spec — not a wellhead catalog."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Petroleum forms here live outside: weather, heat, and long
          spans. Stock diameters{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink>.{" "}
          <TextLink href="/materials">1018 galvanized</TextLink>, 304, or
          330 when the fixture sees furnace heat. Washdown baskets inside
          a process building sit on{" "}
          <TextLink href="/industries/chemical">Chemical</TextLink>.
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/j-hooks">J-hooks</TextLink>,{" "}
            <TextLink href="/products/cable-hangers">cable hangers</TextLink>
            , and{" "}
            <TextLink href="/products/u-hangers">U-hangers</TextLink>
          </li>
          <li>
            <TextLink href="/products/machine-guards">Guards</TextLink> and{" "}
            <TextLink href="/products/conveyor-guards">
              conveyor guards
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/cable-trays">Cable trays</TextLink>{" "}
            and{" "}
            <TextLink href="/products/mesh-grids">grids</TextLink>
          </li>
          <li>
            Heat-adjacent frames in 330 when the print names it
          </li>
        </ul>
      </Section>
      <StepQuoteBlock className="mt-16" title="Have a pad hanger, guard, or tray?" />
    </Page>
  );
}
