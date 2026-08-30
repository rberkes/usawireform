import Link from "next/link";
import { PowderHookBranchNav } from "@/components/PowderHookBranchNav";
import { SquareHangPriceTable } from "@/components/SquareHangPriceTable";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema } from "@/components/SeoSchemas";
import { POWDER_HOOK_HUB } from "@/lib/powder-coating-hooks";
import { WIRE } from "@/lib/range";
import { SQUARE_HANG_LINE } from "@/lib/square-hanging-hooks";

const PATH = "/powder-coating-hooks/square-hanging-hooks";

const faqs = [
  {
    question: "What is a square hanging hook?",
    answer:
      "A finishing hook with squared corners on the hang. The flats last longer on the bar and cut hook marks vs a round V. Same job as an HSQV catalog hook.",
  },
  {
    question: "Why 5% under the published bags?",
    answer:
      "1-lot and 10-lot prices are 5% under the published square-hanging cards at the same length. Carbon. Steel in the lot. USAWF-SH-375-24 is 100 pcs — their 50-pc bag doubled, then 5% off.",
  },
  {
    question: "Do you run 0.120 in square hanging hooks?",
    answer: `No. 0.120 in is 3.05 mm. This cell is ${WIRE.label}. 0.180 in, 0.250 in, and 0.375 in are in the band.`,
  },
];

export function PowderHookSquareView() {
  return (
    <>
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: POWDER_HOOK_HUB.title, url: POWDER_HOOK_HUB.path },
          { name: "Square hanging hooks", url: PATH },
        ]}
      />
      <DocPage
        kicker="Hooks"
        title="Square hanging hooks"
        lede={`${SQUARE_HANG_LINE} 0.180, 0.250, and 0.375 in. Northeast Ohio.`}
        breadcrumbs={[
          { label: "Powder coating hooks", href: POWDER_HOOK_HUB.path },
          { label: "Square hanging hooks" },
        ]}
        toc={[
          { id: "prices", label: "Prices" },
          { id: "faq", label: "FAQ" },
        ]}
      >
        <h2 id="prices">0.180, 0.250, 0.375 in</h2>
        <p>
          Same length grid as the published square-hanging bags. We do not run
          0.120 in. Round V, S, and C stay on{" "}
          <Link href="/powder-coating-hooks/prices">4–10 mm hook prices</Link>
          . 3/8 in dual-V calculator:{" "}
          <Link href="/heavy-duty-v-hooks">heavy-duty V-hooks</Link>.
        </p>
        <div className="not-prose my-8">
          <SquareHangPriceTable />
        </div>

        <h2 id="faq">FAQ</h2>
        {faqs.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}

        <PowderHookBranchNav slug={["square-hanging-hooks"]} />
        <QuoteBand title="Need a square hang that is not on the card?" />
      </DocPage>
    </>
  );
}
