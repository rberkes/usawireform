import type { Metadata } from "next";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Railroad Wire Forming",
  description:
    "Railroad yard and shop wire forming in 7/16 and 1/2 in: guards, hangers, partitions, and baskets — not a light clip cell.",
};

export default function RailroadPage() {
  return (
    <Page>
      <PageHero
        kicker="Industries"
        title="Railroad"
        lede="Yards and shops in 7/16 and 1/2 in. Guards, hangers, partitions, and baskets. We form the geometry — not an AAR stamp."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Railroad work in this shop is the top of the band. Impact and
          long spans want{" "}
          <TextLink href="/sizes">7/16 and 1/2 in</TextLink>.{" "}
          <TextLink href="/materials">1018</TextLink> zinc or 304. Fleet
          partitions for highway vehicles sit on{" "}
          <TextLink href="/industries/automotive">Automotive</TextLink>.
          We do not invent a railroad approval we do not hold.
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
            <TextLink href="/products/j-hooks">J-hooks</TextLink> and{" "}
            <TextLink href="/products/cable-hangers">cable hangers</TextLink>
          </li>
          <li>
            <TextLink href="/products/heavy-duty-wire-baskets">
              Heavy-duty wire baskets
            </TextLink>
          </li>
        </ul>
      </Section>
      <StepQuoteBlock className="mt-16" title="Have a yard guard, hanger, or partition?" />
    </Page>
  );
}
