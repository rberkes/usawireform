import Link from "next/link";
import { HookBagPriceTable } from "@/components/HookBagPriceTable";
import { PowderHookBranchNav } from "@/components/PowderHookBranchNav";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema } from "@/components/SeoSchemas";
import { HOOK_BAG_LINE } from "@/lib/hook-bag-prices";
import { POWDER_HOOK_HUB } from "@/lib/powder-coating-hooks";
import { WIRE } from "@/lib/range";

const PRICE_PATH = "/powder-coating-hooks/prices";

const faqs = [
  {
    question: "Why 4–10 mm and not the thin catalog sizes?",
    answer: `This cell is ${WIRE.label}. 0.044, 0.062, 0.076, and 0.120 in finishing hooks sit under 4 mm. 0.180 in (4.57 mm) and 0.250 in (6.35 mm) sit in the band. Metric steps 4, 5, 6, 8, and 10 mm use the same length grid.`,
  },
  {
    question: "How is the price set?",
    answer:
      "Bag count and length match the published 0.180 in and 0.250 in cards. We take 2% off that bag price. Other diameters in 4–10 mm use the nearest of those two cards, scaled by wire area, then the same 2%. Carbon. Steel in the lot.",
  },
  {
    question: "Is 100 pieces the minimum?",
    answer:
      "Yes. Listed lots are 100–1,000. Every line is at or above 100. Custom length or stainless is a print — send it.",
  },
];

export function PowderHookPricesView() {
  return (
    <>
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: POWDER_HOOK_HUB.title, url: POWDER_HOOK_HUB.path },
          { name: "4–10 mm prices", url: PRICE_PATH },
        ]}
      />
      <DocPage
        kicker="Hooks"
        title="Powder coating hook prices"
        lede={`${HOOK_BAG_LINE} V, S, and C. Northeast Ohio.`}
        breadcrumbs={[
          { label: "Powder coating hooks", href: POWDER_HOOK_HUB.path },
          { label: "4–10 mm prices" },
        ]}
        toc={[
          { id: "list", label: "Price list" },
          { id: "faq", label: "FAQ" },
        ]}
      >
        <h2 id="list">V, S, and C — 4 to 10 mm</h2>
        <p>
          Compare the 0.180 in and 0.250 in rows to the published bag cards.
          Ours are 2% less at the same qty.{" "}
          <Link href="/powder-coating-hooks/v-hooks">V-hooks</Link>,{" "}
          <Link href="/powder-coating-hooks/s-hooks">S-hooks</Link>,{" "}
          <Link href="/powder-coating-hooks/c-hooks">C-hooks</Link>. Heavy
          3/8–1/2 in V stays on{" "}
          <Link href="/heavy-duty-v-hooks">heavy-duty V-hooks</Link>. Squared
          hang bags:{" "}
          <Link href="/powder-coating-hooks/square-hanging-hooks">
            square hanging hooks
          </Link>
          , 5% under the published HSQV cards. EPSI HV/HC/HS/HCV/HV90 0.180
          and 0.250 in boxes:{" "}
          <Link href="/powder-coating-hooks/epsi">5% under EPSI</Link>.
        </p>
        <div className="not-prose my-8">
          <HookBagPriceTable />
        </div>

        <h2 id="faq">FAQ</h2>
        {faqs.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}

        <PowderHookBranchNav slug={["prices"]} />
        <QuoteBand title="Need a length that is not on the card?" />
      </DocPage>
    </>
  );
}
