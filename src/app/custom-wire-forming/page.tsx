import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Custom Wire Forming",
  description:
    "Custom CNC wire forming in 4–14 mm: your print, our coil. 3D CNC, cut-to-length, resistance weld and TIG. 100-piece minimum. Northeast Ohio.",
  path: "/custom-wire-forming",
  keywords: [
    "custom wire forming",
    "custom CNC wire forms",
    "USA made wire baskets",
    "USA made heat treat baskets",
    "custom wire baskets",
  ],
});

export default function CustomWireFormingPage() {
  return (
    <DocPage
      kicker="Custom"
      title="Custom wire forming"
      lede="Your centerline, our coil. 4–14 mm 3D CNC, then the secondaries that make it install. Stock catalog parts exist. Custom is the job when the print is yours."
      toc={[
        { id: "print", label: "What custom means" },
        { id: "band", label: "Band" },
        { id: "send", label: "What to send" },
        { id: "next", label: "Related" },
      ]}
    >
      <h2 id="print">Print in, part out</h2>
      <p>
        Custom wire forming is a specified alloy, diameter, and centerline —
        not a SKU from a rack. We program the Robomac, prove first article, then
        run. Revisions that change the centerline are a new program. Rules:{" "}
        <Link href="/guide/design-for-wire-forming">design for wire forming</Link>
        .
      </p>
      <p>
        Catalog families (hooks, grids,{" "}
        <Link href="/stainless-steel-wire-basket">USA made wire baskets</Link>,{" "}
        <Link href="/stainless-steel-wire-shelf">shelves</Link>) are still
        custom when you change a dimension, a weld, or a grade. The{" "}
        <Link href="/products">product directory</Link> is the shape language.
        The print is the contract.
      </p>

      <h2 id="band">4–14 mm, including 330</h2>
      <p>
        Production is 4–14 mm from coil, cut-to-length through 14 mm rod. Stock
        diameters 3/8, 7/16, 1/2 in. USA made heat treat baskets in 330:{" "}
        <Link href="/330-stainless-wire-bending-usa-parts">330 stainless USA parts</Link>
        . Carbon and 304 for everything that is not a furnace.
      </p>

      <h2 id="send">What to send</h2>
      <p>
        STEP, STP, IGES, PDF, DXF, or SLDPRT —{" "}
        <Link href="/contact">contact</Link>. Quantity, material, diameter.
        Instant ballpark:{" "}
        <Link href="/instant-quote">instant quote</Link>. Tooling on non-stock
        sizes: <Link href="/quoting">quoting</Link>.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/wire-forming-manufacturers">Wire forming manufacturers</Link>
        </li>
        <li>
          <Link href="/wire-forming-process">Wire forming process</Link>
        </li>
        <li>
          <Link href="/wire-forming-companies-near-me">Companies near me</Link>
        </li>
      </ul>

      <QuoteBand title="Custom print ready?" />
    </DocPage>
  );
}
