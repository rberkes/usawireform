import Link from "next/link";
import { SquareHangPriceTable } from "@/components/SquareHangPriceTable";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema } from "@/components/SeoSchemas";
import { POWDER_HOOK_HUB } from "@/lib/powder-coating-hooks";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";
import { SQUARE_HANG_LINE } from "@/lib/square-hanging-hooks";

export const metadata = pageMeta({
  title: "Square Hanging Hooks — 5% Under Catalog Bags",
  description: `${SQUARE_HANG_LINE} 0.180, 0.250, and 0.375 in. CNC from coil in Northeast Ohio.`,
  path: "/square-hanging-hooks",
  keywords: [
    "square hanging hooks",
    "HSQV hooks",
    "powder coating square hooks",
    "0.180 square hanging hook",
    "0.250 square hanging hook",
    "0.375 square hanging hook",
  ],
});

const faqs = [
  {
    question: "What is a square hanging hook?",
    answer:
      "A finishing hook with squared corners on the hang. The flats last longer on the bar and cut hook marks vs a round V. Same job as an HSQV catalog hook.",
  },
  {
    question: "Why 5% under the published bags?",
    answer:
      "1-lot and 10-lot prices are 5% under the published HSQV cards at the same length. Carbon. Steel in the lot. SH375-24 is 100 pcs — their 50-pc bag doubled, then 5% off.",
  },
  {
    question: "Do you run 0.120 in square hanging hooks?",
    answer: `No. 0.120 in is 3.05 mm. This cell is ${WIRE.label}. 0.180 in, 0.250 in, and 0.375 in are in the band.`,
  },
];

export default function SquareHangingHooksPage() {
  return (
    <>
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: POWDER_HOOK_HUB.title, url: POWDER_HOOK_HUB.path },
          { name: "Square hanging hooks", url: "/square-hanging-hooks" },
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
          <Link href="/powder-coating-hook-prices">
            4–10 mm hook prices
          </Link>
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

        <QuoteBand title="Need a square hang that is not on the card?" />
      </DocPage>
    </>
  );
}
