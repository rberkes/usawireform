import { InstantQuote } from "@/components/InstantQuote";
import { PricePromise } from "@/components/PricePromise";
import { Page, PageHero, TextLink } from "@/components/ui";
import { PRICE_LINE } from "@/lib/price";
import { ESTIMATE, INCH_RATES } from "@/lib/quoting";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Instant Quote",
  description:
    `${PRICE_LINE} Estimate a 4–14 mm wire form: $2 cut, $0.09–$0.11/in, $175 setup. Coil not included.`,
  path: "/instant-quote",
  keywords: [
    "wire forming quote",
    "instant quote",
    "CNC wire form price",
    "lowest price wire forming",
    "no minimum order",
  ],
});

export default function InstantQuotePage() {
  return (
    <Page>
      <PageHero
        kicker="Quote"
        title="Instant estimate"
        lede={`$${ESTIMATE.cut} to cut. Forming ${INCH_RATES.map((row) => `${row.label} $${row.carbon.toFixed(2)}/in`).join(", ")}. Stainless 2×. Setup $${ESTIMATE.setup} per job. Coil steel is not in this number. $${ESTIMATE.bend} a bend. −${Math.round(ESTIMATE.qtyDiscount * 100)}% per ${ESTIMATE.qtyBreak.toLocaleString("en-US")} pcs, max ${Math.round(ESTIMATE.qtyDiscountCap * 100)}%. Not a production quote.`}
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
