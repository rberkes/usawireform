import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { COMPANY } from "@/lib/company";
import { PRICE_LINE } from "@/lib/price";
import {
  POWDER_COATING_HOOK_KEYWORDS,
  POWDER_HOOK_HUB,
  POWDER_HOOK_STYLES,
} from "@/lib/powder-coating-hooks";
import { STOCK } from "@/lib/catalog";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: POWDER_HOOK_HUB.title,
  description: POWDER_HOOK_HUB.description,
  path: POWDER_HOOK_HUB.path,
  keywords: [...POWDER_COATING_HOOK_KEYWORDS],
});

const faqs = [
  {
    question: "What kind of hooks do powder coating shops use?",
    answer:
      "Powder coating shops commonly use V-hooks, C-hooks, CV-hooks, S-hooks, and 90° hooks to hang parts during washing, coating, curing, and production handling.",
  },
  {
    question: "What wire sizes do you form powder coating hooks in?",
    answer: `Production is ${WIRE.label}. Stock tooling is ${STOCK}. Light catalog hooks under ${WIRE.minMm} mm are a different cell — the quote says no.`,
  },
  {
    question: "Can you make custom powder coating hooks?",
    answer: `Yes. Style, length, openings, 90° rotation, and alloy are the print. 100-piece minimum. You buy the coil. Send a STEP or PDF on /contact.`,
  },
  {
    question: "Do you make stainless steel powder coating hooks?",
    answer:
      "Yes. 304 or 316 coil for wash chemistry and corrosion. Carbon for everyday steel powder coating hooks. You supply the coil.",
  },
];

export default function PowderCoatingHooksPage() {
  return (
    <>
      <ServiceSchema
        name="Powder Coating Hooks"
        description={POWDER_HOOK_HUB.description}
        url={POWDER_HOOK_HUB.path}
        serviceType="Powder coating hooks"
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[{ name: POWDER_HOOK_HUB.title, url: POWDER_HOOK_HUB.path }]}
      />
      <DocPage
        kicker="Hooks"
        title="Powder coating hooks"
        lede={`${PRICE_LINE} ${COMPANY} forms powder coating hooks from coil: S-hooks, V-hooks, C-hooks, CV-hooks, 90° hooks, and custom heavy-duty wire hooks for finishing shops, coating lines, racks, and curing ovens. ${WIRE.short}. Northeast Ohio.`}
        toc={[
          { id: "styles", label: "Hook styles" },
          { id: "steel", label: "Steel" },
          { id: "stainless", label: "Stainless" },
          { id: "heavy", label: "Heavy-duty" },
          { id: "custom", label: "Custom" },
          { id: "choose", label: "How to choose" },
          { id: "faq", label: "FAQ" },
          { id: "next", label: "Related" },
        ]}
      >
        <h2 id="styles">S, V, C, CV, and 90°</h2>
        <p>
          Powder coating hooks carry a part through wash, coat, and cure. Style
          is the hang: V for a centered locate, C for an open throat, CV when
          you want both, S for speed, 90° when the rack is tight.{" "}
          {COMPANY} CNC-forms them from coil — not a boxed 9-gauge catalog.
        </p>
        <ul>
          {POWDER_HOOK_STYLES.map((style) => (
            <li key={style.id}>
              <Link href={style.path}>{style.title}</Link> — {style.bestFor}
            </li>
          ))}
          <li>
            <Link href="/powder-coating-v-hooks">Powder coating V-hooks</Link>{" "}
            — finishing, paint line, e-coat, rack, and curing oven V-hooks, with
            a live builder.
          </li>
        </ul>
        <p>
          Compare styles:{" "}
          <Link href="/guide/s-hooks-vs-v-hooks-vs-c-hooks">
            S-hooks vs V-hooks vs C-hooks
          </Link>
          .
        </p>

        <h2 id="steel">Steel powder coating hooks</h2>
        <p>
          Everyday steel powder coating hooks are carbon coil — 1018 or the
          grade on the print. Bright or mill into the booth. Zinc or powder
          after form when the hook itself is the finished part, not the hanger
          on the line. Stock {STOCK}.
        </p>

        <h2 id="stainless">Stainless steel powder coating hooks</h2>
        <p>
          Stainless steel powder coating hooks last longer in corrosive wash and
          wet pretreatment. 304 or 316 from coil. Same V, C, CV, S, and 90°
          family.{" "}
          <Link href="/stainless-steel-powder-coating-hooks">
            Stainless steel powder coating hooks
          </Link>
          .
        </p>

        <h2 id="heavy">Heavy-duty powder coating hooks</h2>
        <p>
          This cell is the heavy end: {WIRE.label}. Finishing shops hanging
          large parts, fixtures, and racks use 3/8, 7/16, and 1/2 in wire.
          Light line hooks at 0.080–0.250 in are not a quote here.
        </p>

        <h2 id="custom">Custom powder coating hooks</h2>
        <p>
          Nonstandard length, openings, 90° rotation, mixed CV, or a hook that
          is not a catalog V/C/S.{" "}
          <Link href="/custom-powder-coating-hooks">
            Custom powder coating hooks
          </Link>
          : builder on this site — style, wire in {WIRE.short}, overall length,
          leg ID. Estimate is forming only. You buy the coil.
        </p>

        <h2 id="choose">How to choose</h2>
        <p>
          Pick style from part weight, rack spacing, orientation, coating
          coverage, grounding, and how the part moves through washing, coating,
          curing, and unload. Name diameter, alloy, overall length, and the
          openings on the print. Design rules:{" "}
          <Link href="/guide/design-for-wire-forming">
            design for wire forming
          </Link>
          .
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
            <Link href="/products/powder-coating-hooks">
              Product directory — powder-coating hooks
            </Link>
          </li>
          <li>
            <Link href="/products/s-hooks">S-hooks (catalog)</Link>
          </li>
          <li>
            <Link href="/processes/plating-and-coating">
              Plating and coating
            </Link>
          </li>
          <li>
            <Link href="/custom-cnc-wire-forming-services">
              Custom CNC wire forming services
            </Link>
          </li>
        </ul>

        <QuoteBand title="Have a powder coating hook print?" />
      </DocPage>
    </>
  );
}
