import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Mining Wire Forming",
  description: "Heavy mining wire: 7/16 and 1/2 in guards, USA made cable trays, USA made wire baskets, and J-hooks for harsh service.",
  path: '/industries/mining',
  keywords: [
    "USA made cable trays",
    "USA made wire baskets",
    "mining",
    "mining wire forming",
    "4-14 mm wire",
    "CNC wire forms",
  ],
});

export default function MiningPage() {
  return (
    <Page>
      <PageHero
        kicker="Industries"
        title="Mining"
        lede="Impact, abrasion, and long spans. 7/16 and 1/2 in: guards, USA made cable trays, USA made wire baskets, hangers — not a light clip cell."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Mining hardware in this shop is the top of the{" "}
          <TextLink href="/processes/heavy-wire-forming">4–14 mm</TextLink>{" "}
          band.{" "}
          <TextLink href="/materials">1018 and higher-carbon</TextLink> for
          guards and decks; 304 or 330 when corrosion or heat is the spec.
          Weld is structural:{" "}
          <TextLink href="/processes/resistance-welding">
            resistance
          </TextLink>{" "}
          on mesh,{" "}
          <TextLink href="/processes/mig-tig-assembly">MIG / TIG</TextLink>{" "}
          on rims. Inside radius follows the{" "}
          <TextLink href="/guide/design-for-wire-forming">design guide</TextLink>
          , not a sharp CAD corner.
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/machine-guards">Machine guards</TextLink>{" "}
            and{" "}
            <TextLink href="/products/conveyor-guards">
              conveyor guards
            </TextLink>{" "}
            in 7/16 and 1/2 in
          </li>
          <li>
            <TextLink href="/products/j-hooks">J-hooks</TextLink> and{" "}
            <TextLink href="/products/cable-hangers">cable hangers</TextLink>{" "}
            for roof, rib, and plant cable
          </li>
          <li>
            <TextLink href="/products/cable-trays">USA made cable trays</TextLink>{" "}
            and grids for plant and underground service
          </li>
          <li>
            <TextLink href="/products/heavy-duty-wire-baskets">
              USA made wire baskets
            </TextLink>
          </li>
          <li>Screens and welded mesh panels with a real rim</li>
        </ul>
      </Section>
      <StepQuoteBlock className="mt-16" title="Have a heavy guard, grid, or hanger?" />
    </Page>
  );
}
