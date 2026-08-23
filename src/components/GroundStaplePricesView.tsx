import Link from "next/link";
import { GroundStapleBranchNav } from "@/components/GroundStapleBranchNav";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema } from "@/components/SeoSchemas";
import {
  formatStapleUsd,
  STAPLE_BAG_LINE,
  stapleBagRows,
} from "@/lib/ground-staple-prices";
import { GROUND_STAPLE_HUB } from "@/lib/ground-staples";
import { WIRE } from "@/lib/range";

const PRICE_PATH = "/ground-staples/prices";

const faqs = [
  {
    question: "Why 8 gauge and not 11 gauge?",
    answer: `This cell is ${WIRE.label}. 11 ga (~0.120 in) and 9 ga (~0.148 in) sit under 4 mm. 8 ga (0.162 in / 4.11 mm) sits in the floor. That is the published landscape card we list.`,
  },
  {
    question: "How is the 8 ga price set?",
    answer:
      "Bag count and leg match the published USA 8 ga 6 in and 12 in cards. We take 5% off that each-price. Carbon. Steel in the lot. 100-piece minimum.",
  },
  {
    question: "Where are 3/8, 7/16, and 1/2 in?",
    answer:
      "Those diameters almost never have a public bag card. They run on the custom builder: shop steel, $1 per cut, $0.09 per developed inch on 3/8 in scaled by section, then 5% off.",
  },
];

export function GroundStaplePricesView() {
  const rows = stapleBagRows();
  const six = rows.filter((row) => row.legIn === 6);
  const twelve = rows.filter((row) => row.legIn === 12);

  return (
    <>
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: GROUND_STAPLE_HUB.title, url: GROUND_STAPLE_HUB.path },
          { name: "8 ga prices", url: PRICE_PATH },
        ]}
      />
      <DocPage
        kicker="Staples"
        title="Ground staple prices"
        lede={`${STAPLE_BAG_LINE} Northeast Ohio.`}
        breadcrumbs={[
          { label: "Ground staples", href: GROUND_STAPLE_HUB.path },
          { label: "8 ga prices" },
        ]}
        toc={[
          { id: "list", label: "Price list" },
          { id: "faq", label: "FAQ" },
        ]}
      >
        <h2 id="list">8 gauge — 6 in and 12 in</h2>
        <p>
          Compare to the published USA 8 ga landscape cards. Ours are 5% less at
          the same qty.{" "}
          <Link href="/ground-staples/8-gauge">8 gauge</Link>,{" "}
          <Link href="/ground-staples/8-gauge/6-inch">6 inch</Link>,{" "}
          <Link href="/ground-staples/8-gauge/12-inch">12 inch</Link>. Heavy
          stock Us:{" "}
          <Link href="/custom-ground-staples">custom builder</Link>.
        </p>
        <BagTable heading="6 in legs · 1 in crown · 8 ga" rows={six} />
        <BagTable heading="12 in legs · 1 in crown · 8 ga" rows={twelve} />

        <h2 id="faq">FAQ</h2>
        {faqs.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}

        <GroundStapleBranchNav slug={["prices"]} />
        <QuoteBand title="Need a length that is not on the card?" />
      </DocPage>
    </>
  );
}

function BagTable({
  heading,
  rows,
}: {
  heading: string;
  rows: ReturnType<typeof stapleBagRows>;
}) {
  return (
    <div className="not-prose my-8 overflow-x-auto">
      <p className="font-mono text-[11px] tracking-widest text-copper uppercase">
        {heading}
      </p>
      <table className="mt-2 w-full min-w-[32rem] text-sm">
        <thead>
          <tr className="border-b border-line text-left">
            <th className="py-2 pr-3 font-medium">Part no.</th>
            <th className="py-2 pr-3 font-medium">Qty</th>
            <th className="py-2 pr-3 font-medium">Lot</th>
            <th className="py-2 font-medium">Each</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.sku}-${row.qty}`} className="border-b border-line/70">
              <td className="py-2 pr-3 font-mono text-xs">{row.sku}</td>
              <td className="py-2 pr-3">{row.qty.toLocaleString("en-US")}</td>
              <td className="py-2 pr-3">{formatStapleUsd(row.lotUsd)}</td>
              <td className="py-2">{formatStapleUsd(row.ourEach)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
