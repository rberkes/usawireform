import { InstantQuote } from "@/components/InstantQuote";
import { PricePromise } from "@/components/PricePromise";
import { Page, PageHero, TextLink } from "@/components/ui";
import { PRICE_LINE } from "@/lib/price";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Instant Quote",
  description:
    `${PRICE_LINE} Instant estimate for 4–14 mm CNC wire forms.`,
  path: "/instant-quote",
  keywords: [
    "wire forming quote",
    "instant quote",
    "CNC wire form price",
    "lowest price wire forming",
    "100 piece minimum",
  ],
});

export default function InstantQuotePage() {
  return (
    <Page>
      <PageHero
        kicker="Quote"
        title="Instant estimate"
        lede="Fill diameter, bends, length, material, and quantity. Not a production quote."
      />
      <PricePromise titled={false} className="mt-10" />
      <div className="mt-10">
        <InstantQuote />
      </div>
      <p className="mt-10 max-w-2xl text-sm leading-6 text-muted">
        For a production number, send a drawing on{" "}
        <TextLink href="/contact">contact</TextLink>
        . Non-stock diameters and coil we do not carry are on{" "}
        <TextLink href="/quoting">tooling and coil</TextLink>. Weld and finish
        are{" "}
        <TextLink href="/secondary-operations">secondary operations</TextLink>.
      </p>
    </Page>
  );
}
