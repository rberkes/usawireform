import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Industrial Wire Forming",
  description: "Plant-floor wire: USA made cable trays, USA made wire baskets, USA made wire racks, USA made security fencing, and hangers in 3/8 to 1/2 in.",
  path: '/industries/industrial',
  keywords: [
    "USA made cable trays",
    "USA made wire baskets",
    "USA made wire racks",
    "USA made security fencing",
    "industrial",
    "industrial wire forming",
    "4-14 mm wire",
    "CNC wire forms",
  ],
});

export default function IndustrialPage() {
  return (
    <Page>
      <PageHero
        kicker="Industries"
        title="Industrial"
        lede="USA made cable trays, USA made wire baskets, USA made wire racks, USA made security fencing, plus guards and hangers in stock coil."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Industrial here means the floor: parts that stay in the building.
          Stock diameters{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink>,{" "}
          <TextLink href="/materials">1018</TextLink> zinc or powder, 304
          when washdown says so. OEM components that ship inside someone
          else’s product live on{" "}
          <TextLink href="/industries/manufacturing-oem">
            Manufacturing / OEM
          </TextLink>
          .
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/machine-guards">Machine guards</TextLink>{" "}
            and{" "}
            <TextLink href="/products/conveyor-guards">
              conveyor guards
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/partition-grids">
              Partition grids
            </TextLink>{" "}
            and{" "}
            <TextLink href="/products/security-mesh-fencing">
              USA made security fencing
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/cable-trays">USA made cable trays</TextLink>
            ,{" "}
            <TextLink href="/products/heavy-duty-wire-baskets">
              USA made wire baskets
            </TextLink>
            , and{" "}
            <TextLink href="/products/wire-racks">USA made wire racks</TextLink>
          </li>
          <li>
            <TextLink href="/powder-coating-hooks">
              Powder coating hooks
            </TextLink>{" "}
            and{" "}
            <TextLink href="/products/j-hooks">J-hooks</TextLink>
          </li>
        </ul>
      </Section>
      <StepQuoteBlock className="mt-16" title="Have a plant guard, tray, or basket?" />
    </Page>
  );
}
