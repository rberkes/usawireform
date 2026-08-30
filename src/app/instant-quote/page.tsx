import { InstantQuote } from "@/components/InstantQuote";
import { PricePromise } from "@/components/PricePromise";
import {
  ClientCtaBand,
  ClientHero,
  ClientPage,
  ClientSection,
} from "@/components/client/ClientLanding";
import { TextLink } from "@/components/ui";
import { CLIENT_CTA_LEDE } from "@/lib/client-landing";
import { PRICE_LINE, QUOTE_REVIEW } from "@/lib/price";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Instant Quote",
  description:
    `Get an instant wire forming estimate in seconds. ${PRICE_LINE} Enter diameter, bends, length & quantity for 4–14 mm CNC wire forms. No signup required.`,
  path: "/instant-quote",
  keywords: [
    "wire forming quote",
    "instant quote",
    "CNC wire form price",
    "lowest price wire forming",
    "100 piece minimum",
    "wire forming calculator",
  ],
});

export default function InstantQuotePage() {
  return (
    <ClientPage>
      <ClientHero
        kicker="Quote"
        title="Instant estimate"
        lede={`$1.00 per cut, $0.50 per bend, $0.05 per inch. Email yourself the number. Instant is a ballpark. Production quote is a person on the print. ${QUOTE_REVIEW}`}
      />

      <ClientSection
        kicker="Calculator"
        title="Cuts, bends, and inches"
        lede={`${PRICE_LINE} You buy the coil. This number is forming only.`}
      >
        <PricePromise titled={false} />
        <div className="mt-10">
          <InstantQuote />
        </div>
        <p className="mt-10 max-w-2xl text-sm leading-6 text-muted">
          For a production number, start a{" "}
          <TextLink href="/production-quote">production quote</TextLink> or send
          a drawing on <TextLink href="/contact">contact</TextLink>. Non-stock
          diameters and coil we do not carry are on{" "}
          <TextLink href="/quoting">tooling and coil</TextLink>. Weld and finish
          are{" "}
          <TextLink href="/secondary-operations">secondary operations</TextLink>
          .
        </p>
      </ClientSection>

      <ClientCtaBand
        title="Need a person on the print?"
        lede={CLIENT_CTA_LEDE}
      />
    </ClientPage>
  );
}
