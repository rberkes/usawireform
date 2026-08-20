import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Mesh",
  description:
    "Wire mesh glossary and production: weave types, crimp, mesh count, openings, and welded wire cloth. USA Wire Form resistance-welds 4–14 mm grids — weavers run the fine cloth.",
  path: "/wire-mesh",
  keywords: [
    "wire mesh",
    "welded wire cloth",
    "plain weave",
    "dutch weave",
    "mesh count",
    "wire mesh openings",
    "welded wire mesh",
  ],
});

const toc = [
  { id: "split", label: "Woven vs welded" },
  { id: "run", label: "What we run" },
  { id: "weave", label: "Weave types" },
  { id: "crimp", label: "Crimp" },
  { id: "terms", label: "Mesh terms" },
  { id: "print", label: "What to put on the print" },
  { id: "next", label: "Related" },
];

export default function WireMeshPage() {
  return (
    <DocPage
      kicker="Wire mesh"
      title="Wire mesh"
      lede="Mesh is an opening pattern in wire. Weavers crimp and interlace it. We resistance-weld it. Same words — mesh, warp, shute, opening — different machines. This page is the glossary. The floor is 4–14 mm welded cloth, rims, and grids."
      toc={toc}
    >
      <h2 id="split">Woven cloth and welded cloth</h2>
      <p>
        <strong>Woven wire cloth</strong> is warp wires down the roll and
        shute (fill) wires across it, locked by crimp. Plain, Dutch, twill —
        that is a loom. Openings can be a few microns. That is not this cell.
      </p>
      <p>
        <strong>Welded wire cloth</strong> lays warp and shute flat, no
        crimp, and fuses every intersection. That is{" "}
        <Link href="/processes/resistance-welding">cross-wire resistance weld</Link>
        . Pitch is center-to-center, not “200 mesh.” Diameters live in our
        band: 4–14 mm, stock 3/8, 7/16, and 1/2 in. Process depth:{" "}
        <Link href="/processes/mesh-grids-and-cable-trays">
          mesh grids and cable trays
        </Link>
        .
      </p>
      <p>
        A print that says “wire mesh” without weave or weld, opening, and
        diameter is not a mesh spec. It is a request to invent one.
      </p>

      <h2 id="run">What this shop quotes</h2>
      <ul>
        <li>Welded square and rectangular openings in 4–14 mm</li>
        <li>Rims, returns, and frames on CNC — then the grid</li>
        <li>
          Baskets, shelves, guards, trays, fence panels —{" "}
          <Link href="/products/mesh-grids">mesh grids</Link>,{" "}
          <Link href="/stainless-steel-wire-basket">stainless baskets</Link>,{" "}
          <Link href="/stainless-steel-wire-shelf">stainless shelves</Link>
        </li>
        <li>
          Infill lighter than 4 mm called out as bought cloth or a no-quote
        </li>
      </ul>
      <p>
        Fine filter weaves, micronic cloth, and calendered 2-micron ratings
        belong to a weaver. We form the heavy members those screens hang on,
        or we skip the weave and weld the opening from coil.
      </p>

      <h2 id="weave">Weave types</h2>
      <p>
        Industry names. Weavers run them. Use them on a cloth PO. Do not
        paste “plain Dutch” onto a 1/2 in welded guard and expect the loom
        definition to hold.
      </p>
      <table>
        <thead>
          <tr>
            <th>Weave</th>
            <th>What it is</th>
            <th>This floor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Plain weave</td>
            <td>
              Each warp and each shute pass over one wire and under the next.
              Crimp happens in the weave.
            </td>
            <td>Weaver. Our analog is a square welded opening.</td>
          </tr>
          <tr>
            <td>Plain Dutch weave</td>
            <td>
              Warp generally larger than shute. Shute packed tight — dense
              cloth with wedge-shaped openings. Filter, not a guard.
            </td>
            <td>Not a 4–14 mm weld pattern.</td>
          </tr>
          <tr>
            <td>Reverse Dutch weave</td>
            <td>
              Higher wire count in the warp, smaller count in the shute —
              the reverse of plain and twilled Dutch.
            </td>
            <td>Weaver / filter house.</td>
          </tr>
          <tr>
            <td>Twilled weave</td>
            <td>
              Each warp and each shute pass over two wires and under the
              next pair. More flexible than plain at the same diameter.
            </td>
            <td>Weaver.</td>
          </tr>
          <tr>
            <td>Twilled Dutch double weave</td>
            <td>
              Twilled Dutch with smaller, overlapping shute wires — more
              shutes per linear inch, higher density.
            </td>
            <td>Micron-class cloth. Not this cell.</td>
          </tr>
          <tr>
            <td>Welded wire cloth</td>
            <td>
              Warp and shute lay flat. No crimp. Every crossing is a weld.
            </td>
            <td>
              This is the product. Resistance nugget at the intersection;
              MIG or TIG on the rim.
            </td>
          </tr>
          <tr>
            <td>Long slot</td>
            <td>
              Shute wires clustered so openings are rectangles, not squares.
            </td>
            <td>
              We quote rectangular pitch: long way parallel or perpendicular
              to the length — name it.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="crimp">Crimp</h2>
      <p>
        Crimp is the corrugation that locks woven wires where they cross.
        Welded cloth does not crimp. If the print says “double crimp mesh”
        and the diameter is 3/8 in, ask whether they meant a weld or a loom.
      </p>
      <table>
        <thead>
          <tr>
            <th>Crimp</th>
            <th>Lock</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Crimp</td>
            <td>
              Corrugations so perpendicular wires sit in a pocket when they
              cross.
            </td>
          </tr>
          <tr>
            <td>Double crimp</td>
            <td>
              Both warp and shute are pre-crimped before weaving. Each wire
              lays in each crimp.
            </td>
          </tr>
          <tr>
            <td>Intermediate crimp</td>
            <td>Warp and shute lay in every other crimp.</td>
          </tr>
          <tr>
            <td>Double intermediate crimp</td>
            <td>
              Usually the warp sits in every crimp of the shute, and the
              shute sits in every other crimp of the warp.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Pre-crimp is a weaving setup. On a welded grid the “lock” is the
        nugget. Specify weld type, not crimp style, unless you are buying
        roll cloth from a mill.
      </p>

      <h2 id="terms">Mesh terms</h2>
      <p>
        Mesh count is openings per linear inch, center of one wire to a
        point 1 in away — also called count. Opening (space, clear opening)
        is the gap between adjacent parallel wires. Opening is not mesh
        count. Diameter changes one without the other.
      </p>
      <table>
        <thead>
          <tr>
            <th>Term</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mesh / count</td>
            <td>
              Openings in a linear inch. Square mesh is the same count both
              ways. Fine counts are woven. We spec pitch (center-to-center)
              in inches or mm on welded work.
            </td>
          </tr>
          <tr>
            <td>Square mesh</td>
            <td>Same count (or pitch) in warp and shute.</td>
          </tr>
          <tr>
            <td>Rectangular openings</td>
            <td>
              Long dimension parallel or perpendicular to the length —
              call it out. Same idea as long-slot weave, welded.
            </td>
          </tr>
          <tr>
            <td>Clear opening / space</td>
            <td>
              Gap between adjacent parallel wires. Not affected by how you
              name the diameter — only by the actual diameter and pitch.
            </td>
          </tr>
          <tr>
            <td>Open area</td>
            <td>
              Open space as a percentage of the panel. Load, airflow, and
              OSHA reach-through all live here.
            </td>
          </tr>
          <tr>
            <td>Warp wires</td>
            <td>Run the length of the cloth as woven (or the long way of a panel).</td>
          </tr>
          <tr>
            <td>Shute / fill wires</td>
            <td>Run across the width as woven (cross wires on a welded grid).</td>
          </tr>
          <tr>
            <td>Gauge</td>
            <td>
              A wire-size nickname. Specify diameter in decimals (0.375 in,
              9.53 mm) — not “9 gauge.” Gauges disagree by standard.
            </td>
          </tr>
          <tr>
            <td>Market grades</td>
            <td>
              Common industrial cloth sizes for general work. A starting
              catalog, not a furnace-basket spec.
            </td>
          </tr>
          <tr>
            <td>Micronic mesh</td>
            <td>
              Woven filter cloth with a nominal micron rating (down to ~2
              µm) and designed flow. Not 4–14 mm.
            </td>
          </tr>
          <tr>
            <td>Calendered wire cloth</td>
            <td>
              Run through heavy rolls to reduce thickness or flatten
              intersections for a smoother face. A weaving finish.
            </td>
          </tr>
          <tr>
            <td>Selvage</td>
            <td>
              Finished edges down the roll so woven cloth does not unravel.
              Welded panels get a rim or a return instead.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Pitch on this floor is named in inches or millimeters, wire diameter
        in decimals, material by grade (1018, 304, 316,{" "}
        <Link href="/330-stainless-wire-bending-usa-parts">330</Link>
        ). “½ mesh” without a diameter is ambiguous. “1 in centers × 0.375 in
        304, welded” is a grid.
      </p>

      <h2 id="print">What to put on the print</h2>
      <ul>
        <li>Welded or woven — pick one</li>
        <li>Pitch or mesh count, both directions if they differ</li>
        <li>Clear opening if the job is a screen or a guard</li>
        <li>Wire diameter in decimals for warp and shute (they can differ)</li>
        <li>Rim diameter if the border is heavier than the infill</li>
        <li>Weld: resistance on crossings, MIG/TIG on corners and mounts</li>
        <li>Overall size, returns, mounts</li>
        <li>Alloy and finish after weld</li>
      </ul>
      <p>
        Design rules that still apply to a formed rim:{" "}
        <Link href="/guide/design-for-wire-forming">design for wire forming</Link>
        . Instant ballpark:{" "}
        <Link href="/instant-quote">instant quote</Link>.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/processes/mesh-grids-and-cable-trays">
            Mesh grids and cable trays
          </Link>{" "}
          — how we weld the panel
        </li>
        <li>
          <Link href="/products/mesh-grids">Mesh grids</Link> ·{" "}
          <Link href="/products/machine-guards">Machine guards</Link> ·{" "}
          <Link href="/products/security-mesh-fencing">Security mesh</Link>
        </li>
        <li>
          <Link href="/stainless-steel-wire-basket">Stainless steel wire basket</Link>{" "}
          ·{" "}
          <Link href="/stainless-steel-wire-shelf">Stainless steel wire shelf</Link>
        </li>
        <li>
          <Link href="/custom-wire-forming">Custom wire forming</Link>
        </li>
        <li>
          <Link href="/sizes">3/8 · 7/16 · 1/2 in</Link>
        </li>
      </ul>

      <QuoteBand title="Have a mesh pitch and a rim?" />
    </DocPage>
  );
}
