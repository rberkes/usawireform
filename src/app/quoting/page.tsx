import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { STOCK } from "@/lib/catalog";
import {
  QUOTE,
  coilMinRange,
  programmingFee,
  toolingRange,
} from "@/lib/quoting";
import { WIRE } from "@/lib/range";

export const metadata: Metadata = {
  title: "Quotes, Tooling, and Coil",
  description: `Stock ${STOCK} runs on existing tooling. Other diameters in ${WIRE.short} need tooling (${toolingRange}, ${QUOTE.year}). Programming ${programmingFee}. Coil buy-in ${coilMinRange} when we do not carry the steel.`,
};

const toc = [
  { id: "stock", label: "Stock vs tooling" },
  { id: "tooling", label: "Tooling" },
  { id: "programming", label: "Programming" },
  { id: "coil", label: "Coil we do not carry" },
  { id: "next", label: "Related" },
];

export default function QuotingPage() {
  return (
    <DocPage
      kicker="Shop"
      title="Quotes, tooling, and coil"
      lede={`${STOCK} is on the floor. Other sizes in ${WIRE.short} still form — they need tooling, a program, and a coil. ${QUOTE.year} pricing.`}
      toc={toc}
    >
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

      <h2 id="programming">Programming</h2>
      <p>
        {programmingFee} to set up the job. That is the program: feed,
        bends, cutoff, first-article prove-out on the cell. Revisions
        that change the centerline are a new setup.
      </p>

      <h2 id="coil">Coil we do not carry</h2>
      <p>
        If we do not carry the steel for a single run, we ask the client
        to purchase the material. We run that coil out — we do not sit
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
