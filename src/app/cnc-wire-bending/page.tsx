import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { WIRE } from "@/lib/range";

export const metadata: Metadata = {
  title: "CNC Wire Bending",
  description:
    "CNC wire bending in 4–14 mm: the same cell as CNC wire forming — straighten, feed, bend, cut. 2D and 3D on a Numalliance Robomac 214.",
};

const toc = [
  { id: "what", label: "Bending vs forming" },
  { id: "cell", label: "The cell" },
  { id: "2d3d", label: "2D and 3D" },
  { id: "band", label: "4–14 mm" },
  { id: "next", label: "Related" },
];

export default function CncWireBendingPage() {
  return (
    <DocPage
      kicker="Process"
      title="CNC wire bending"
      lede="CNC wire bending is CNC wire forming by another search. Round wire from coil, a programmed bend sequence, cutoff. This shop runs 4–14 mm on a Numalliance Robomac 214."
      toc={toc}
    >
      <h2 id="what">Bending and forming are the same cell</h2>
      <p>
        Buyers search “CNC wire bending.” Shops file it as{" "}
        <Link href="/wire-forming">wire forming</Link>. The machine does
        not care. Wire is straightened, fed, wrapped around a pin or
        mandrel to a commanded angle, rotated when the next bend leaves
        the plane, then cut. That is{" "}
        <Link href="/cnc-wire-forming">CNC wire forming</Link> and it is
        CNC wire bending.
      </p>
      <p>
        What it is not: press-brake plate, tube benders with a mandrel
        inside a hollow, or a bench fixture for one prototype.{" "}
        <Link href="/rod-bending">Rod bending</Link> in this band is the
        same head when the stock is still round coil.
      </p>

      <h2 id="cell">What actually bends it</h2>
      <p>
        Production bending here is the{" "}
        <Link href="/equipment">Robomac 214</Link>, plus Lubow manuals
        for short runs and secondary legs. Cycle: decoil, straighten,
        feed, bend, rotate, cut. Ends, welds, and finish are
        secondaries —{" "}
        <Link href="/wire-fabrication">wire fabrication</Link> — not a
        different bending machine.
      </p>

      <h2 id="2d3d">2D or 3D</h2>
      <p>
        If every bend lives in one plane, that is{" "}
        <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link>. If a
        bend leaves the plane, that is{" "}
        <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link>. Hooks,
        frames, basket rims, and routing parts in {WIRE.short} are
        usually 3D. Flat links and guards can stay 2D.
      </p>

      <h2 id="band">The 4–14 mm band</h2>
      <p>
        We bend {WIRE.label}. Stock is{" "}
        <Link href="/sizes">3/8, 7/16, and 1/2 in</Link>. Light clip
        wire and music-wire bends are under 4 mm — explained, not
        quoted as this cell. Design rules:{" "}
        <Link href="/guide/design-for-wire-forming">
          design for wire forming
        </Link>
        .
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/cnc-wire-forming">CNC wire forming</Link>
        </li>
        <li>
          <Link href="/rod-bending">Rod bending</Link>
        </li>
        <li>
          <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link>
        </li>
        <li>
          <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link>
        </li>
        <li>
          <Link href="/wire-parts">Wire parts</Link>
        </li>
      </ul>

      <QuoteBand title="Have a bend sequence and a wire size?" />
    </DocPage>
  );
}
