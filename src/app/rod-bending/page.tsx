import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { WIRE } from "@/lib/range";

export const metadata: Metadata = {
  title: "Rod Bending",
  description:
    "Rod bending in 4–14 mm: heavy round stock from coil on the same CNC cell as wire forming. 3/8, 7/16, and 1/2 in stock.",
};

const toc = [
  { id: "what", label: "Rod vs wire" },
  { id: "band", label: "What we bend" },
  { id: "not", label: "Not this" },
  { id: "next", label: "Related" },
];

export default function RodBendingPage() {
  return (
    <DocPage
      kicker="Process"
      title="Rod bending"
      lede="Rod bending in this shop is heavy round wire from coil — 4–14 mm — on the CNC cell. Same head as wire forming. Not a rebar bender and not a tube bender."
      toc={toc}
    >
      <h2 id="what">Rod and wire at this diameter</h2>
      <p>
        Past about 3/8 in, buyers call it rod. The mill still ships coil.
        We straighten it, feed it, and bend it on the{" "}
        <Link href="/cnc-wire-forming">CNC wire former</Link>. 1/2 in
        (12.7 mm) and 14 mm are rod-like in the hand and still wire in
        the cell. {WIRE.label}.
      </p>
      <p>
        Carbon, stainless, and other ferrous coil — named grades on{" "}
        <Link href="/materials">materials</Link>. Ends may be coined or
        pierced on the Clearing press. Closures weld. That is{" "}
        <Link href="/wire-fabrication">fabrication</Link>, not a second
        vendor.
      </p>

      <h2 id="band">What we actually bend</h2>
      <ul>
        <li>
          Stock{" "}
          <Link href="/sizes">3/8, 7/16, and 1/2 in</Link> — frames,
          D-rings, lift hooks, furnace fixtures
        </li>
        <li>Other diameters in 4–14 mm with tooling and coil buy-in</li>
        <li>
          2D and 3D paths —{" "}
          <Link href="/cnc-wire-bending">CNC wire bending</Link>
        </li>
      </ul>
      <p>
        Rebar chairs and supports in this band are a product:{" "}
        <Link href="/products/rebar-supports">rebar supports</Link>. The
        rod is still formed wire, not a jobsite bender.
      </p>

      <h2 id="not">What this is not</h2>
      <ul>
        <li>Tube and pipe bending — hollow, different wrinkle rules</li>
        <li>Hot rebar benders on a slab</li>
        <li>Bar that starts as straight mill length above 14 mm</li>
        <li>Light music-wire and clip rod under 4 mm</li>
      </ul>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/processes/heavy-wire-forming">
            Heavy wire forming, 4–14 mm
          </Link>
        </li>
        <li>
          <Link href="/cnc-wire-forming">CNC wire forming</Link>
        </li>
        <li>
          <Link href="/products/wire-frames">Wire frames</Link>
        </li>
        <li>
          <Link href="/guide/design-for-wire-forming">Design guide</Link>
        </li>
      </ul>

      <QuoteBand title="Have a rod diameter and a centerline?" />
    </DocPage>
  );
}
