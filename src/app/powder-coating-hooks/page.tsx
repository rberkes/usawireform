import Link from "next/link";
import { HookFigure } from "@/components/VHookFigure";
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
      "Powder coating shops commonly use V-hooks, C-hooks, CV-hooks, S-hooks, 90° hooks, and square hanging hooks to hang parts during washing, coating, curing, and production handling.",
  },
  {
    question: "What wire sizes do you form powder coating hooks in?",
    answer: `Production is ${WIRE.label}. Stock tooling is ${STOCK}. 0.044–0.120 in catalog hooks are under 4 mm — no. 0.180 in and 0.250 in are in the band: /powder-coating-hook-prices, 2% under published bags.`,
  },
  {
    question: "Can you make custom powder coating hooks?",
    answer: `Yes. Style, length, openings, 90° rotation, and alloy are the print. 100-piece minimum. Listed 4–10 mm V, S, and C bags include carbon. Custom V and 90° V: we buy the steel. Custom C, CV, and S outside the grid: you buy the coil. Send a STEP or PDF on /contact.`,
  },
  {
    question: "Do you make stainless steel powder coating hooks?",
    answer:
      "Yes. 304 or 316 for wash chemistry and corrosion. Carbon for everyday steel powder coating hooks. Listed 4–10 mm bags are carbon. Stainless is a print.",
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
          { id: "prices", label: "4–10 mm prices" },
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
        <div className="not-prose my-8">
          <HookFigure type="v" label="V-hook" />
        </div>
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

        <h2 id="prices">4–10 mm bag prices</h2>
        <p>
          0.180 in and 0.250 in are in this cell (4.57 mm and 6.35 mm). We list
          those lengths — plus 4, 5, 6, 8, and 10 mm — at 2% under the published
          bag prices, same bag counts. Carbon, steel in the lot.{" "}
          <Link href="/powder-coating-hook-prices">
            Full V, S, and C price list
          </Link>
          . Squared hang:{" "}
          <Link href="/square-hanging-hooks">square hanging hooks</Link>
          , 5% under the published HSQV bags (0.180, 0.250, 0.375 in).
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
          Live 3-column estimate:{" "}
          <Link href="/heavy-duty-v-hooks">
            USA made heavy-duty powder coat V-hooks
          </Link>
          . Light line hooks at 0.044–0.120 in are not a quote here. 0.180 in
          and 0.250 in are —{" "}
          <Link href="/powder-coating-hook-prices">bag prices</Link>.
        </p>

        <h2 id="custom">Custom powder coating hooks</h2>
        <p>
          Nonstandard length, openings, 90° rotation, mixed CV, or a hook that
          is not a catalog V/C/S.{" "}
          <Link href="/custom-powder-coating-hooks">
            Custom powder coating hooks
          </Link>
          : builder on this site — style, wire in {WIRE.short}, overall length,
          leg ID. Listed 4–10 mm V, S, and C bags include carbon. Custom V: we
          buy the steel. Custom C, CV, and S outside the grid: you buy the coil.
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
            <Link href="/powder-coating-hook-prices">
              4–10 mm hook bag prices
            </Link>
          </li>
          <li>
            <Link href="/square-hanging-hooks">Square hanging hooks</Link>
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
