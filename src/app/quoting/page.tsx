import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { STOCK } from "@/lib/catalog";
import { PRICE_LINE } from "@/lib/price";
import {
  ESTIMATE,
  QUOTE,
  coilMinRange,
  programmingFee,
  toolingRange,
} from "@/lib/quoting";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Quotes, Tooling, and Coil",
  description: `${PRICE_LINE} Stock ${STOCK} runs on existing tooling. Other diameters in ${WIRE.short} need tooling (${toolingRange}, ${QUOTE.year}). Setup ${programmingFee}. Coil buy-in ${coilMinRange} when we do not carry the steel.`,
  path: "/quoting",
  keywords: [
    "wire forming tooling",
    "programming fee",
    "lowest price wire forming",
  ],
  ],
});

const toc = [
  { id: "price", label: "Price" },
  { id: "stock", label: "Stock vs tooling" },
  { id: "tooling", label: "Tooling" },
  { id: "programming", label: "Setup" },
  { id: "coil", label: "Coil we do not carry" },
  { id: "next", label: "Related" },
];

export default function QuotingPage() {
  return (
    <DocPage
      kicker="Shop"
      title="Quotes, tooling, and coil"
      lede={`${PRICE_LINE} ${STOCK} is on the floor. Other sizes in ${WIRE.short} still form — they need tooling, a program, and a coil. ${QUOTE.year} pricing.`}
      toc={toc}
    >
      <h2 id="price">Lowest prices. 100-piece minimum.</h2>
      <p>
        {PRICE_LINE} Instant estimates start at {ESTIMATE.qtyMin} pcs. 5%
        off at 1,000. 10% off at 10,000. See the{" "}
        <Link href="/instant-quote">instant estimate</Link>.
      </p>

      <h2 id="stock">Stock vs everything else</h2>
      <p>
        Production coil is{" "}
        <Link href="/sizes">3/8, 7/16, and 1/2 in</Link>. The cell will
        form the rest of {WIRE.label} when the print is in band. That is
        not the same as stocking it. A {QUOTE.exampleNonStockMm} mm
        diameter is inside {WIRE.short} and is not a size we run as
        standard — it needs tooling.
      </p>
      <p>
        Below {WIRE.minMm} mm or above {WIRE.maxMm} mm, the quote says
        no.{" "}
        <Link href="/processes/heavy-wire-forming">Heavy wire forming</Link>{" "}
        is the band page.
      </p>

      <h2 id="tooling">Tooling for non-stock wire</h2>
      <p>
        Wire outside {STOCK} is {toolingRange} in tooling ({QUOTE.year}{" "}
        pricing). The number moves with diameter, tensile, and how many
        pins and cutters the path needs. It is not a piece-price adder
        we hide in the form — it is on the quote as tooling.
      </p>
      <p>
        Example: {QUOTE.exampleNonStockMm} mm. In band. Not 3/8, 7/16, or
        1/2 in. Tooling applies.
      </p>

      <h2 id="programming">Setup</h2>
      <p>
        {programmingFee} to set up the job. That covers the program, a
        diameter change, and a coil change: feed, bends, cutoff,
        first-article prove-out on the cell. Revisions that change the
        centerline are a new setup. It is a lot fee, not a piece-price
        adder. The{" "}
        <Link href="/instant-quote">instant estimate</Link> includes it.
      </p>

      <h2 id="coil">Coil we do not carry</h2>
      <p>
        If we do not carry the steel for a single run, we ask the client
        to purchase the material. That mill buy-in is not an order-quantity
        minimum on formed parts. We run that coil out — we do not sit
        on a leftover diameter or alloy from a one-off.
      </p>
      <p>
        Mill minimums are typically {coilMinRange}, depending on the
        supplier. Name the grade on the print. The coil list is{" "}
        <Link href="/materials">materials</Link>.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/sizes">3/8, 7/16, and 1/2 in</Link> — stock
          diameters
        </li>
        <li>
          <Link href="/materials">Coil materials</Link>
        </li>
        <li>
          <Link href="/instant-quote">Instant estimate</Link> — cut, bend,
          and wire from shop rates
        </li>
        <li>
          <Link href="/contact">Request a quote</Link> — STEP, STP, IGES,
          PDF, DXF, or SLDPRT
        </li>
        <li>
          <Link href="/capabilities">Capabilities</Link>
        </li>
      </ul>

      <QuoteBand title="Have a diameter and a print?" />
    </DocPage>
  );
}
