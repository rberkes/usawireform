import { InstantQuote } from "@/components/InstantQuote";
import { PricePromise } from "@/components/PricePromise";
import { FAQSchema } from "@/components/SeoSchemas";
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

const faqs = [
  {
    question: "How accurate is the instant wire forming quote?",
    answer: "The instant estimate is a ballpark for budgeting — $1.00 per cut, $0.50 per bend, $0.05 per inch of wire. For a production quote with exact pricing, send your drawing to our production desk.",
  },
  {
    question: "What wire diameters can you form?",
    answer: "Our production band is 4–14 mm (approximately 5/32\" to 9/16\"). Stock diameters are 3/8\", 7/16\", and 1/2\". Non-stock sizes require tooling and coil minimums.",
  },
  {
    question: "What is the minimum order quantity?",
    answer: "100 pieces minimum for production runs. The instant calculator works for any quantity, but production quotes start at 100 pieces.",
  },
  {
    question: "Does the instant quote include material cost?",
    answer: "No. The instant estimate covers forming only — cuts, bends, and wire length. You buy the coil separately, or we can quote coil with your production order.",
  },
  {
    question: "How do I get a production quote with exact pricing?",
    answer: "Send a STEP file, SolidWorks file, or 3-view PDF to our production desk. Include quantity, material, and finish requirements. We respond within 24 hours.",
  },
];

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

/** Static page — no dynamic data. */
export const revalidate = false;

export default function InstantQuotePage() {
  return (
    <>
      <FAQSchema questions={faqs} />
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

        <ClientSection
          kicker="Popular products"
          title="Common wire forms we run"
        >
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <TextLink href="/powder-coating-hooks" className="block border border-line p-4 hover:border-copper">
              <span className="font-medium">Powder coating hooks</span>
              <span className="mt-1 block text-sm text-muted">V-hooks, C-hooks, S-hooks for coating lines</span>
            </TextLink>
            <TextLink href="/ground-staples" className="block border border-line p-4 hover:border-copper">
              <span className="font-medium">Ground staples</span>
              <span className="mt-1 block text-sm text-muted">Landscape fabric, sod, and turf anchors</span>
            </TextLink>
            <TextLink href="/products/wire-baskets" className="block border border-line p-4 hover:border-copper">
              <span className="font-medium">Wire baskets</span>
              <span className="mt-1 block text-sm text-muted">Industrial and heat-treat baskets</span>
            </TextLink>
            <TextLink href="/products/wire-guards" className="block border border-line p-4 hover:border-copper">
              <span className="font-medium">Wire guards</span>
              <span className="mt-1 block text-sm text-muted">Machine guards and safety enclosures</span>
            </TextLink>
            <TextLink href="/products/wire-racks" className="block border border-line p-4 hover:border-copper">
              <span className="font-medium">Wire racks</span>
              <span className="mt-1 block text-sm text-muted">Display and storage racks</span>
            </TextLink>
            <TextLink href="/products/wire-frames" className="block border border-line p-4 hover:border-copper">
              <span className="font-medium">Wire frames</span>
              <span className="mt-1 block text-sm text-muted">Structural frames and supports</span>
            </TextLink>
          </div>
        </ClientSection>

        <ClientCtaBand
          title="Need a person on the print?"
          lede={CLIENT_CTA_LEDE}
        />
      </ClientPage>
    </>
  );
}
