import Link from "next/link";
import { HookBuilder } from "@/components/HookBuilder";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page, PageHero } from "@/components/ui";
import { COMPANY } from "@/lib/company";
import { STOCK } from "@/lib/catalog";
import { PRICE_LINE } from "@/lib/price";
import { POWDER_HOOK_HUB, POWDER_HOOK_STYLES } from "@/lib/powder-coating-hooks";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Custom Powder Coating Hooks",
  description: `${COMPANY} custom powder coating hooks: V-hooks, C-hooks, CV-hooks, S-hooks, and 90° hooks from coil. Length, openings, and wire size on the print. ${WIRE.short}. 100-piece minimum.`,
  path: "/custom-powder-coating-hooks",
  keywords: [
    "custom powder coating hooks",
    "custom V-hooks",
    "custom C-hooks",
    "custom CV-hooks",
    "custom S-hooks",
    "custom 90 degree hooks",
    "custom wire hooks",
    "custom hook builder",
  ],
});

const faqs = [
  {
    question: "Can you make custom powder coating hooks?",
    answer: `Yes. Custom V-hooks, C-hooks, CV-hooks, S-hooks, and 90° hooks. Length, openings, rotation, diameter, and alloy on the print. ${WIRE.short}. 100-piece minimum.`,
  },
  {
    question: "Do you have an online custom hook builder?",
    answer:
      "Yes. Pick style, wire size in 4–14 mm, overall length, and leg ID. The estimate is $1 per cut, $0.50 per bend, $0.05 per developed inch. Material is not included. 100-piece minimum. All instant quotes are subject to quote department review.",
  },
  {
    question: "Who supplies the wire?",
    answer:
      "You buy the coil and bring it to Northeast Ohio. We form it. Carbon, stainless, or another coil alloy in the 4–14 mm band.",
  },
];

export default function CustomPowderCoatingHooksPage() {
  return (
    <>
      <ServiceSchema
        name="Custom Powder Coating Hooks"
        description={`${COMPANY} custom powder coating hooks in ${WIRE.short}: your print, from coil, 2D CNC. 100-piece minimum.`}
        url="/custom-powder-coating-hooks"
        serviceType="Custom powder coating hooks"
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: POWDER_HOOK_HUB.title, url: POWDER_HOOK_HUB.path },
          {
            name: "Custom powder coating hooks",
            url: "/custom-powder-coating-hooks",
          },
        ]}
      />
      <Page>
        <Breadcrumbs
          items={[
            { label: "Powder coating hooks", href: POWDER_HOOK_HUB.path },
            { label: "Custom" },
          ]}
        />
        <PageHero
          kicker="Custom"
          title="Custom powder coating hooks"
          lede={`${PRICE_LINE} Build a V, C, CV, S, or 90° hook. Live drawing and forming estimate. ${WIRE.short}. You buy the coil.`}
        />
        <div className="mt-12">
          <HookBuilder />
        </div>
        <div className="article mt-14 max-w-2xl">
          <h2 id="styles">Styles</h2>
          <ul>
            {POWDER_HOOK_STYLES.map((style) => (
              <li key={style.id}>
                Custom <Link href={style.path}>{style.title.toLowerCase()}</Link>
              </li>
            ))}
          </ul>
          <p>
            A hook outside those families is still a wire form.{" "}
            <Link href="/custom-cnc-wire-forming-services">
              Custom CNC wire forming services
            </Link>
            . Stock {STOCK}. Other diameters in {WIRE.short} need{" "}
            <Link href="/quoting">tooling</Link>.
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
              <Link href="/powder-coating-v-hooks">Powder coating V-hooks</Link>
            </li>
            <li>
              <Link href="/custom-v-hooks">Custom V-hooks</Link>
            </li>
            <li>
              <Link href={POWDER_HOOK_HUB.path}>{POWDER_HOOK_HUB.title}</Link>
            </li>
          </ul>
        </div>
      </Page>
    </>
  );
}
