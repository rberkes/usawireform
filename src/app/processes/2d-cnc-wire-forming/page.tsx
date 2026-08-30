import Link from "next/link";
import { BandTable } from "@/components/BandTable";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "2D CNC Wire Forming",
  description: "2D CNC wire forming in 4–14 mm: planar bends, when to use it instead of 3D CNC or fourslide, design rules, and inspection.",
  path: '/processes/2d-cnc-wire-forming',
  keywords: [
    "2d cnc wire forming",
    "wire forming process",
    "4-14 mm",
    "CNC",
  ],
});

const toc = [
  { id: "what-it-is", label: "What it is" },
  { id: "how", label: "How the cell runs" },
  { id: "when", label: "When to use 2D" },
  { id: "band", label: "4–14 mm" },
  { id: "vs", label: "Vs 3D and fourslide" },
  { id: "design", label: "Design notes" },
  { id: "next", label: "Related processes" },
];

export default function TwoDCNCPage() {
  return (
    <DocPage
      kicker="Process"
      title="2D CNC wire forming"
      lede="Every bend in one plane. Same CNC feed-and-bend logic as 3D, without the rotary axis that takes the centerline out of plane. The right cell when the part can lie on a surface plate."
      toc={toc}
    >
      <h2 id="what-it-is">What 2D CNC wire forming is</h2>
      <p>
        A 2D CNC program feeds wire, bends it around pins or a rotary tool,
        and cuts it — with all bend planes coincident. The part can be laid
        on a surface plate or an optical comparator. Think flattened clips,
        links, planar S-hooks, retaining rings that are still “flat,”
        appliance and display wires, and many guard outlines.
      </p>
      <p>
        2D is not a lesser process. It is the correct process when the mating
        assembly only needs a planar form. Prove-out is faster, inspection is
        cheaper, and tool collisions are easier to see.
      </p>

      <h2 id="how">How the cell runs</h2>
      <p>
        Same family as{" "}
        <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link>: coil,{" "}
        <Link href="/processes/wire-straightening">straighten</Link>, feed,
        bend,{" "}
        <Link href="/processes/cut-to-length">cut</Link>. No torsion axis.
        That sounds like a missing feature. On a planar frame it is a
        deleted collision.
      </p>
      <p>
        Ends, welds, and finish are still secondaries. A 2D outline that
        closes into a rectangle is often formed open and{" "}
        <Link href="/processes/resistance-welding">resistance welded</Link>,
        not forced through a fully closed path.
      </p>

      <h2 id="when">When 2D is the right call</h2>
      <ul>
        <li>The print’s bends share one datum plane.</li>
        <li>
          Volume is prototype through mid production and the geometry may
          still change — CNC beats a{" "}
          <Link href="/processes/fourslide">fourslide</Link> tool.
        </li>
        <li>
          You need a 3D-looking part that is actually a 2D form plus one
          simple kick. Sometimes that kick is still a 2D program with a
          fixture bend; sometimes it is a short 3D program. That is a
          process call, not a CAD call.
        </li>
      </ul>
      <p>
        If the wire has to route around a motor, through a housing, or clear
        a harness in space, use 3D.
      </p>

      <h2 id="band">What changes from 4 to 14 mm</h2>
      <BandTable
        heading="2D CNC"
        rows={{
          4: "Fast programs, overlay inspection. Min legs still apply — do not pack clip-style zigzags.",
          8: "Typical guard and rack outlines. Weld closures are common.",
          12: "Heavy planar frames. Inside radius ≥ 1× diameter on mild carbon.",
          14: "Structural 2D. Treat legs and radii like fabrication, not like a paperclip.",
        }}
      />

      <h2 id="vs">2D CNC vs 3D vs fourslide</h2>
      <table>
        <thead>
          <tr>
            <th>Lane</th>
            <th>When it wins</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2D CNC</td>
            <td>Planar part, revisions, prototype through mid volume</td>
          </tr>
          <tr>
            <td>3D CNC</td>
            <td>Out-of-plane routing, hooks, spatial frames</td>
          </tr>
          <tr>
            <td>Fourslide</td>
            <td>Frozen high-volume 2D, usually well under 4 mm</td>
          </tr>
        </tbody>
      </table>

      <h2 id="design">Design notes specific to 2D</h2>
      <p>
        Bend radius, min leg, and springback rules are the same family as
        3D — see the{" "}
        <Link href="/guide/design-for-wire-forming">design guide</Link>. The
        extra constraint is stacking: a 2D clip with many reversing bends
        can still collide with tooling even though it is planar. Leave real
        straights between reversals, or expect a slower program.
      </p>
      <p>
        Inspection should be an overlay or a hard fixture to the mating hole
        pattern — not a chain of ±0.005 in on every leg. Put the tolerance
        on the interface.{" "}
        <Link href="/processes/inspection">Inspection</Link> is its own page.
      </p>

      <h2 id="next">Related processes</h2>
      <ul>
        <li>
          <Link href="/processes/wire-form-shapes">Wire form shapes</Link>{" "}
          — L, U, J, S, serpentine, cut-to-length
        </li>
        <li>
          <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>{" "}
          — out-of-plane bends
        </li>
        <li>
          <Link href="/processes/fourslide">Fourslide</Link> — frozen
          high-volume 2D
        </li>
        <li>
          <Link href="/processes/heavy-wire-forming">Heavy wire, 4–14 mm</Link>
        </li>
        <li>
          <Link href="/wire-forming">Wire forming in the USA</Link>
        </li>
      </ul>

      <QuoteBand title="Have a planar form to run?" />
    </DocPage>
  );
}
