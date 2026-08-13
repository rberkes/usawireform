import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Chemical Wire Forming",
  description: "Chemical-plant wire forming in 3/8, 7/16, and 1/2 in: 304 / 316 washdown baskets, racks, and guards. Finish named.",
  path: '/industries/chemical',
  keywords: [
    "chemical",
    "chemical wire forming",
    "4-14 mm wire",
    "CNC wire forms",
  ],
});

export default function ChemicalPage() {
  return (
    <Page>
      <PageHero
        kicker="Industries"
        title="Chemical"
        lede="Washdown and corrosion in 4–14 mm. 304 and 316 baskets, racks, and guards. We name the alloy and the finish — not a coatings-lab rating."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Chemical service in this shop is stainless or a named plate.{" "}
          <TextLink href="/materials/300-series-stainless">304 / 316</TextLink>
          , stock diameters{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink>. Carbon
          with{" "}
          <TextLink href="/processes/plating-and-coating">
            zinc-nickel
          </TextLink>{" "}
          only when the print says so. Pad and outdoor oilfield forms sit
          on{" "}
          <TextLink href="/industries/petroleum">Petroleum</TextLink>.
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/heavy-duty-wire-baskets">
              Washdown and immersion wire baskets
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/wire-racks">Racks</TextLink> and{" "}
            <TextLink href="/products/wire-shelves">shelves</TextLink> in
            304
          </li>
          <li>
            <TextLink href="/products/machine-guards">Guards</TextLink> and{" "}
            <TextLink href="/products/partition-grids">
              partition grids
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/wire-carts">304 washdown carts</TextLink>
          </li>
        </ul>
      </Section>
      <StepQuoteBlock className="mt-16" title="Have a 304 basket, rack, or guard print?" />
    </Page>
  );
}
