import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Forming Process",
  description:
    "The wire forming process in 4–14 mm: straighten, CNC bend, cut-to-length, end work, resistance weld or TIG, inspect. From coil, not from bar leftovers.",
  path: "/wire-forming-process",
  keywords: [
    "wire forming process",
    "how wire forming works",
    "CNC wire forming steps",
  ],
});

export default function WireFormingProcessPage() {
  return (
    <DocPage
      kicker="Process"
      title="Wire forming process"
      lede="Coil to part: straighten, feed, bend, cut. Then the ops that make it install — ends, weld, finish. 4–14 mm on CNC. This page is the sequence. The library is the depth."
      toc={[
        { id: "sequence", label: "Sequence" },
        { id: "cnc", label: "CNC vs fourslide" },
        { id: "join", label: "Join and finish" },
        { id: "next", label: "Library" },
      ]}
    >
      <h2 id="sequence">The sequence</h2>
      <ol>
        <li>
          <Link href="/processes/wire-straightening">Straighten</Link> — cast and
          helix out of the coil before the first bend.
        </li>
        <li>
          <Link href="/processes/2d-cnc-wire-forming">2D</Link> or{" "}
          <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link> — feed and
          bend to the centerline.
        </li>
        <li>
          <Link href="/processes/cut-to-length">Cut-to-length</Link> — in-line
          shear or a separate cutoff. Up to 14 mm rod.
        </li>
        <li>
          <Link href="/processes/end-forming">End forming</Link> — chamfer,
          coin, flatten, pierce when the print mates to a hole or weld.
        </li>
        <li>
          Join —{" "}
          <Link href="/processes/resistance-welding">resistance weld</Link> or{" "}
          <Link href="/processes/mig-tig-assembly">TIG / MIG</Link>.
        </li>
        <li>
          <Link href="/processes/inspection">Inspect</Link> — fixture, overlay,
          or CMM on the interfaces, not ±0.005 on every leg.
        </li>
      </ol>
      <p>
        Full index: <Link href="/processes">processes</Link>. Heavy band:{" "}
        <Link href="/processes/heavy-wire-forming">4–14 mm</Link>. USA map:{" "}
        <Link href="/wire-forming">wire forming in the USA</Link>.
      </p>

      <h2 id="cnc">Why CNC for this shop</h2>
      <p>
        Fourslide wins on frozen high-volume 2D clips. This floor is mixed
        lots, revisions, and 3D geometry in 4–14 mm. CNC is the center of the
        cell. Fourslide is explained so we do not sell the wrong process —{" "}
        <Link href="/processes/fourslide">fourslide</Link>.
      </p>

      <h2 id="join">Secondaries in the same building</h2>
      <p>
        Low-cost forming fails when the form is cheap and weld lives three
        vendors away.{" "}
        <Link href="/secondary-operations">Secondary operations</Link> stay
        here: resistance, TIG, plate, powder, inspect. 330 furnace baskets
        usually TIG —{" "}
        <Link href="/330-stainless-wire-bending-usa-parts">330 stainless</Link>.
      </p>

      <h2 id="next">Library</h2>
      <ul>
        <li>
          <Link href="/custom-wire-forming">Custom wire forming</Link>
        </li>
        <li>
          <Link href="/guide/design-for-wire-forming">Design guide</Link>
        </li>
        <li>
          <Link href="/capabilities">Capabilities</Link>
        </li>
      </ul>

      <QuoteBand title="Process questions on a print?" />
    </DocPage>
  );
}
