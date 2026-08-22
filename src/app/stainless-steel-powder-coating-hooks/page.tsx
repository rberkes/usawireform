import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { COMPANY } from "@/lib/company";
import { STOCK } from "@/lib/catalog";
import { PRICE_LINE } from "@/lib/price";
import { POWDER_HOOK_HUB, POWDER_HOOK_STYLES } from "@/lib/powder-coating-hooks";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Stainless Steel Powder Coating Hooks",
  description: `Stainless steel powder coating hooks in 304 / 316: V-hooks, C-hooks, CV-hooks, S-hooks, and 90° hooks from coil. ${WIRE.short}. Stock ${STOCK}. Corrosion-resistant finishing hooks.`,
  path: "/stainless-steel-powder-coating-hooks",
  keywords: [
    "stainless steel powder coating hooks",
    "stainless steel V-hooks",
    "stainless steel C-hooks",
    "stainless steel CV-hooks",
    "stainless steel S-hooks",
    "stainless steel 90 degree hooks",
    "304 powder coating hooks",
  ],
});

const faqs = [
  {
    question: "When do I need stainless steel powder coating hooks?",
    answer:
      "When wash chemistry, wet pretreatment, or outdoor storage eats carbon. 304 is the usual. 316 when chlorides are the spec.",
  },
  {
    question: "Do you form stainless V-hooks, C-hooks, and S-hooks?",
    answer: `Yes. Same styles as steel powder coating hooks, from 304 or 316 coil in ${WIRE.short}. 100-piece minimum. You buy the coil.`,
  },
];

export default function StainlessSteelPowderCoatingHooksPage() {
  return (
    <>
      <ServiceSchema
        name="Stainless Steel Powder Coating Hooks"
        description={`${COMPANY} stainless steel powder coating hooks in ${WIRE.short}: 304 / 316 V, C, CV, S, and 90° from coil.`}
        url="/stainless-steel-powder-coating-hooks"
        serviceType="Stainless steel powder coating hooks"
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: POWDER_HOOK_HUB.title, url: POWDER_HOOK_HUB.path },
          {
            name: "Stainless steel powder coating hooks",
            url: "/stainless-steel-powder-coating-hooks",
          },
        ]}
      />
      <DocPage
        kicker="Stainless"
        title="Stainless steel powder coating hooks"
        lede={`${PRICE_LINE} Longer-lasting finishing hooks for corrosive wash. 304 / 316 V-hooks, C-hooks, CV-hooks, S-hooks, and 90° hooks from coil in ${WIRE.short}.`}
        breadcrumbs={[
          { label: "Powder coating hooks", href: POWDER_HOOK_HUB.path },
          { label: "Stainless" },
        ]}
        toc={[
          { id: "why", label: "Why stainless" },
          { id: "grades", label: "304 and 316" },
          { id: "styles", label: "Styles" },
          { id: "faq", label: "FAQ" },
          { id: "next", label: "Related" },
        ]}
      >
        <h2 id="why">Why stainless</h2>
        <p>
          Stainless steel powder coating hooks survive washers, acid pretreat,
          and wet racks that rust carbon. They cost more coil. They last longer
          on the line. Carbon stays the everyday steel powder coating hook when
          the washer is mild.
        </p>

        <h2 id="grades">304 and 316</h2>
        <p>
          304 for most stainless steel V-hooks, C-hooks, CV-hooks, and S-hooks.
          316 when chlorides or marine-adjacent wash are named. Springback is
          higher than 1018 — the program compensates if the print names the
          alloy. Grades:{" "}
          <Link href="/materials/300-series-stainless">
            300-series stainless
          </Link>
          .
        </p>

        <h2 id="styles">Same styles, stainless coil</h2>
        <ul>
          {POWDER_HOOK_STYLES.map((style) => (
            <li key={style.id}>
              Stainless <Link href={style.path}>{style.title.toLowerCase()}</Link>
            </li>
          ))}
        </ul>
        <p>
          Custom openings or 90°:{" "}
          <Link href="/custom-powder-coating-hooks">
            custom powder coating hooks
          </Link>
          . Stock {STOCK} in {WIRE.short}. You buy the coil.
        </p>

        <h2 id="faq">FAQ</h2>
        {faqs.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}

        <h2 id="next">Related</h2>
        <ul>
          <li>
            <Link href={POWDER_HOOK_HUB.path}>{POWDER_HOOK_HUB.title}</Link>
          </li>
          <li>
            <Link href="/materials/300-series-stainless">
              300-series stainless
            </Link>
          </li>
          <li>
            <Link href="/stainless-steel-wire-basket">
              Stainless steel wire basket
            </Link>
          </li>
        </ul>

        <QuoteBand title="Have a stainless powder coating hook print?" />
      </DocPage>
    </>
  );
}
