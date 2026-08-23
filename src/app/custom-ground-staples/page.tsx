import Link from "next/link";
import { GroundStapleBuilder } from "@/components/GroundStapleBuilder";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page, PageHero } from "@/components/ui";
import { COMPANY } from "@/lib/company";
import { STOCK } from "@/lib/catalog";
import { PRICE_LINE } from "@/lib/price";
import { GROUND_STAPLE_HUB } from "@/lib/ground-staples";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Custom Ground Staples",
  description: `${COMPANY} custom ground staples from coil: 8 ga landscape U-pins plus heavy 1/4, 3/8, 7/16, and 1/2 in. Leg, crown, and top on the print. ${WIRE.short}. 100-piece minimum.`,
  path: "/custom-ground-staples",
  keywords: [
    "custom ground staples",
    "custom landscape staples",
    "custom sod staples",
    "custom U-pins",
    "custom fabric staples",
  ],
});

const faqs = [
  {
    question: "Can you make custom ground staples?",
    answer: `Yes. Leg, crown, square or round top, diameter, and alloy. ${WIRE.short}. Stock ${STOCK}. 100-piece minimum.`,
  },
  {
    question: "Do you have an online staple builder?",
    answer:
      "Yes. 8 ga with a 1 in crown and 6 or 12 in legs on carbon uses the published USA 8 ga bag, 5% under. Other sizes: $1 per cut, $0.09 per developed inch on 3/8 in (heavier wire scales by section), plus the steel we buy, then 5% off. 100-piece minimum. Instant quotes are subject to quote department review.",
  },
  {
    question: "Do you form 11 gauge sod staples?",
    answer: "No. 11 ga and 9 ga are under 4 mm. 8 ga is the lightest card.",
  },
];

export default function CustomGroundStaplesPage() {
  return (
    <>
      <ServiceSchema
        name="Custom Ground Staples"
        description={`${COMPANY} custom ground staples in ${WIRE.short}: your print, from coil, 2D CNC. 100-piece minimum.`}
        url="/custom-ground-staples"
        serviceType="Custom ground staples"
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: GROUND_STAPLE_HUB.title, url: GROUND_STAPLE_HUB.path },
          { name: "Custom ground staples", url: "/custom-ground-staples" },
        ]}
      />
      <Page>
        <Breadcrumbs
          items={[
            { label: "Ground staples", href: GROUND_STAPLE_HUB.path },
            { label: "Custom" },
          ]}
        />
        <PageHero
          kicker="Custom"
          title="Custom ground staples"
          lede={`${PRICE_LINE} Build a U. Live drawing and estimate. ${WIRE.short}. We buy the steel.`}
        />
        <div className="mt-12">
          <GroundStapleBuilder />
        </div>
        <div className="article mt-14 max-w-2xl">
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
              <Link href="/ground-staples/prices">8 ga prices</Link>
            </li>
            <li>
              <Link href="/ground-staples/heavy-duty">
                Heavy-duty ground staples
              </Link>
            </li>
            <li>
              <Link href={GROUND_STAPLE_HUB.path}>{GROUND_STAPLE_HUB.title}</Link>
            </li>
          </ul>
        </div>
      </Page>
    </>
  );
}
