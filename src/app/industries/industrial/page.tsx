import type { Metadata } from "next";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Industrial Wire Forming",
  description:
    "Industrial plant-floor wire forming in 3/8, 7/16, and 1/2 in: guards, partitions, trays, baskets, and hangers.",
};

export default function IndustrialPage() {
  return (
    <Page>
      <PageHero
        kicker="Industries"
        title="Industrial"
        lede="Forms the plant buys and installs. Guards, partitions, trays, baskets, and hangers in stock coil — not a slogan for every factory on earth."
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
              security mesh
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/cable-trays">Cable trays</TextLink>,{" "}
            <TextLink href="/products/heavy-duty-wire-baskets">
              wire baskets
            </TextLink>
            , and{" "}
            <TextLink href="/products/wire-racks">racks</TextLink>
          </li>
          <li>
            <TextLink href="/products/powder-coating-hooks">
              Powder-coating hooks
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
