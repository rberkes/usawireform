import { InstantQuote } from "@/components/InstantQuote";
import { Page, PageHero, TextLink } from "@/components/ui";
import { ESTIMATE } from "@/lib/quoting";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Instant Quote",
  description:
    "Estimate a 4–14 mm wire form from diameter, bends, length, and material. Shop rates: $2 cut, $1 per bend, $0.45 per inch on 3/8 in carbon.",
  path: "/instant-quote",
  keywords: [
    "wire forming quote",
    "instant quote",
    "CNC wire form price",
  ],
});

export default function InstantQuotePage() {
  return (
    <Page>
      <PageHero
        kicker="Quote"
        title="Instant estimate"
        lede={`Shop rates: $${ESTIMATE.cut} to cut, $${ESTIMATE.bend} a bend, $${ESTIMATE.inch.toFixed(2)} per inch of 3/8 in carbon. Diameter and material scale the wire line. Not a production quote.`}
      />
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
