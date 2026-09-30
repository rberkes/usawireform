import { CadDfmQuote } from "@/components/CadDfmQuote";
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
import { PRICE_LINE, QUOTE_REVIEW } from "@/lib/price";
import { MATERIALS } from "@/lib/robomac/tables";
import { QUOTE_FORMULA } from "@/lib/robomac/quote";
import { pageMeta } from "@/lib/seo";

const faqs = [
  {
    question: "How does the STEP quote work?",
    answer:
      "Upload a round-wire STEP. The Robomac 214TF twin reads the centerline, runs DFM (PASS / REVIEW / FAIL), and prices the shop formula: developed inches × $0.05 for 1018 plus material plus 30% markup on material. Material $/lb is not filed yet, so 1018 is forming only. FAIL is not a buyable price.",
  },
  {
    question: "What if I do not have a STEP?",
    answer:
      "The typed calculator on this page is still the Ask card: $1.00 per cut, $0.50 per bend, $0.05 per inch. You buy the coil. That card is forming only and is not the shop CAD formula.",
  },
  {
    question: "What wire diameters can you form?",
    answer:
      "Our production band is 4–14 mm (approximately 5/32\" to 9/16\"). Stock diameters are 3/8\", 7/16\", and 1/2\". Non-stock sizes require tooling and coil minimums.",
  },
  {
    question: "What is the minimum order quantity?",
    answer:
      "100 pieces minimum for production runs. Quantity breaks: −5% at 1,000 and −10% at 10,000.",
  },
  {
    question: "Does the CAD quote include material cost?",
    answer:
      "The shop formula is inches + material + 30% markup on material. Material $/lb is a later input. Until the desk files it, a 1018 STEP quote is forming only at $0.05/in. 304, 330, and 6061-T6 have no inch rate — DFM runs, no piece price.",
  },
  {
    question: "How do I get a production quote with exact pricing?",
    answer:
      "Email the STEP estimate from this page, or send a STEP, SolidWorks file, or 3-view PDF to the production desk with quantity, material, and finish. We respond within 24 hours.",
  },
];

export const metadata = pageMeta({
  title: "Instant Quote",
  description:
    `Upload a STEP for 214TF DFM and a shop-formula estimate. ${PRICE_LINE} 1018 is $0.05/in. No STEP? Count cuts, bends, and inches. No signup required.`,
  path: "/instant-quote",
  keywords: [
    "wire forming quote",
    "instant quote",
    "STEP DFM",
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
          title="Upload a STEP"
          lede={`Round-wire STEP → 214TF DFM → shop formula. ${QUOTE_FORMULA}. 1018 is $0.05/in. Material $/lb is not filed — forming only. FAIL is not a buyable price. ${QUOTE_REVIEW}`}
        />

        <ClientSection
          kicker="CAD"
          title="STEP → DFM → shop quote"
          lede="Analytic cylinders and tori. Geometry is truth. AI does not decide pass/fail."
        >
          <CadDfmQuote
            materials={MATERIALS.map((row) => ({
              id: row.id,
              label: row.label,
              shopRun: row.shopRun,
            }))}
          />
        </ClientSection>

        <ClientSection
          kicker="No STEP"
          title="Cuts, bends, and inches"
          lede={`${PRICE_LINE} This is the Ask card — $1/cut, $0.50/bend, $0.05/in. You buy the coil. It is not the CAD shop formula.`}
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
          lede={`Email the STEP estimate from this page, or send a drawing on /contact. Instant is a ballpark. Production quote is a person on the print. ${QUOTE_REVIEW}`}
        />
      </ClientPage>
    </>
  );
}
