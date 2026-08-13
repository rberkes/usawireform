import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { stainless300 } from "@/lib/materials";
import { WIRE } from "@/lib/range";

export const metadata: Metadata = {
  title: "300 Series Stainless Wire Forming",
  description:
    "300-series stainless from coil for 4–14 mm wire forming: 301, 302, 304, 304L, 316, 316L, 321, 330, and the rest — springback, weld, passivate, 3/8 to 1/2 in.",
};

const toc = [
  { id: "what", label: "What 300-series is" },
  { id: "grades", label: "Grades from coil" },
  { id: "pick", label: "302 vs 304 vs 316 vs 330" },
  { id: "form", label: "Forming" },
  { id: "weld", label: "Weld" },
  { id: "finish", label: "Passivate" },
  { id: "sizes", label: "3/8, 7/16, 1/2 in" },
  { id: "not", label: "Not these grades" },
  { id: "next", label: "Related" },
];

export default function Stainless300Page() {
  return (
    <DocPage
      kicker="Materials"
      title="300-series stainless, from coil"
      lede="Austenitic stainless wire for frames, grids, trays, and furnace fixtures. We form the 300-series — including 330 — in 4–14 mm, with 3/8, 7/16, and 1/2 in as stock diameters. “SS” is not a spec."
      toc={toc}
    >
      <h2 id="what">What 300-series actually is</h2>
      <p>
        300-series stainless is austenitic: chromium-nickel, non-magnetic
        in the annealed condition, work-hardening as you bend it. It
        comes as coil. That coil is what a{" "}
        <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link> or{" "}
        <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link> cell
        feeds. It is not 1018 with a better name, and it is not one
        alloy.
      </p>
      <p>
        Compared with{" "}
        <Link href="/materials">cold-roll 1010 / 1018</Link>: more
        springback, more tool galling, a larger minimum inside radius
        (start at 1.5–2× diameter), and passivate after form and weld —
        not zinc. Resistance weld still works on many crosses; TIG shows
        up on rims, 330, and thin-to-heavy joints.
      </p>
      <p>
        Production band: {WIRE.label}. Stock sizes:{" "}
        <Link href="/sizes">3/8, 7/16, and 1/2 in</Link>.
      </p>

      <h2 id="grades">Grades we see on coil</h2>
      <table>
        <thead>
          <tr>
            <th>Grade</th>
            <th>UNS</th>
            <th>Forming note</th>
          </tr>
        </thead>
        <tbody>
          {stainless300.map((row) => (
            <tr key={row.grade}>
              <td>{row.grade}</td>
              <td>{row.uns}</td>
              <td>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        308 is a filler metal, not a forming coil. If the print says
        308 wire, they likely mean a weld rod — or they meant 304.
      </p>

      <h2 id="pick">302 vs 304 vs 316 vs 330</h2>
      <table>
        <thead>
          <tr>
            <th>If you meant…</th>
            <th>Use</th>
            <th>Do not substitute</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>General stainless form, indoor/outdoor, food-adjacent</td>
            <td>304 or 304L</td>
            <td>201 “equiv,” 430, plated 1018</td>
          </tr>
          <tr>
            <td>A form that has to snap or hold a clip force</td>
            <td>302 (or 301 if the path is mild)</td>
            <td>Soft 304 annealed, hoping it will act like spring</td>
          </tr>
          <tr>
            <td>Chlorides, marine, chemical washdown</td>
            <td>316 / 316L</td>
            <td>304 with extra passivate</td>
          </tr>
          <tr>
            <td>Welded 304 that must stay low-carbon in the HAZ</td>
            <td>304L</td>
            <td>304 and a prayer after MIG</td>
          </tr>
          <tr>
            <td>Heat-treat wire basket, furnace fixture, high-temp air</td>
            <td>330 (N08330)</td>
            <td>“High 300,” 309, 310, or 321 as a silent swap</td>
          </tr>
          <tr>
            <td>A severe cold form that cracks 304</td>
            <td>305, or anneal + re-form</td>
            <td>A tighter CAD radius</td>
          </tr>
        </tbody>
      </table>
      <p>
        330 is listed with the 300s because buyers search it that way.
        Metallurgically it is a Ni-Cr high-temp alloy (N08330), not a
        304 with a bigger number. Price, nickel, forming load, and weld
        are in another class.{" "}
        <Link href="/processes/heat-treating">Heat-treat wire baskets</Link>{" "}
        start with the cert, not the mesh pitch.
      </p>

      <h2 id="form">Forming 300-series in this band</h2>
      <ul>
        <li>
          <strong>Inside radius</strong> — 1.5–2× diameter on 304/316
          at {WIRE.short}. 3/8 in wire → about 9/16–3/4 in IR. 1/2 in
          wire → 3/4–1 in. Mild-carbon 1× rules do not apply.
        </li>
        <li>
          <strong>Springback</strong> — the program overbends. Change
          304 to 302 (or hard to annealed) and the first article is
          scrap. Name tensile / temper on the print.
        </li>
        <li>
          <strong>Work hardening</strong> — 301 is the extreme. Each
          bend raises strength and the next bend’s load. A 3D path
          that is easy in 1018 can lock a 301 coil.
        </li>
        <li>
          <strong>Galling</strong> — stainless sticks to tooling.
          Lubrication, polish, and sometimes a different pin material.
          A carbon setup with the pressure turned up will mark the
          wire and grab.
        </li>
        <li>
          <strong>Straightener</strong> — leftover cast is worse on
          long 304 spans.{" "}
          <Link href="/processes/wire-straightening">Straighten</Link>{" "}
          for the tensile, not for 1018.
        </li>
      </ul>
      <p>
        Full geometry rules:{" "}
        <Link href="/guide/design-for-wire-forming">
          design for wire forming
        </Link>
        .
      </p>

      <h2 id="weld">Weld on 300-series grids and frames</h2>
      <p>
        <Link href="/processes/mesh-grids-and-cable-trays">
          Mesh grids and cable trays
        </Link>{" "}
        in 304 are usually resistance-welded at the crosses, then MIG
        or TIG on rims and mounts. 316 behaves similarly with more
        heat input discipline. 330 often wants TIG on the fixture
        joints — confirm a nugget before you assume a carbon grid
        welder scales.
      </p>
      <ul>
        <li>304 vs 304L: L if the weld spec cares about sensitization</li>
        <li>Filler: 308/308L for 304, 316L for 316, nickel-bearing for 330 — not “stainless rod”</li>
        <li>Flash and discoloration: as-welded, or cleaned / passivated after</li>
        <li>Distortion: fixture 3/8–1/2 in frames; stainless moves</li>
      </ul>
      <p>
        Process pages:{" "}
        <Link href="/processes/resistance-welding">resistance welding</Link>
        ,{" "}
        <Link href="/processes/mig-tig-assembly">MIG / TIG</Link>.
      </p>

      <h2 id="finish">Finish is passivate, not paint</h2>
      <p>
        After form and weld, 300-series is cleaned and passivated unless
        the print says mill finish. Zinc and powder are carbon finishes.
        A “stainless look” on 1018 is plating, not 304. Sequence:{" "}
        <Link href="/processes/plating-and-coating">plating and coating</Link>.
      </p>

      <h2 id="sizes">At 3/8, 7/16, and 1/2 in</h2>
      <table>
        <thead>
          <tr>
            <th>Size</th>
            <th>Common 300-series jobs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3/8 in (9.53 mm)</td>
            <td>304/316 trays, guard frames, medium mesh rims, 302 forms</td>
          </tr>
          <tr>
            <td>7/16 in (11.11 mm)</td>
            <td>Heavier 304 rims, 316 washdown frames, 330 wire-basket borders</td>
          </tr>
          <tr>
            <td>1/2 in (12.7 mm)</td>
            <td>Structural 304, 330 rod frames, furnace fixtures</td>
          </tr>
        </tbody>
      </table>
      <p>
        302 clip wire at 0.020–0.080 in is not this cell. Same family,
        different machine. We will say so.
      </p>

      <h2 id="not">What is not 300-series forming coil</h2>
      <ul>
        <li>
          <strong>303</strong> — free-machining, sulfur. Not a drawing
          coil we run. If you meant a form, you meant 304 or 302.
        </li>
        <li>
          <strong>400-series (410, 430)</strong> — ferritic / martensitic.
          Different magnetism, weld, and rust story. Ask before assuming
          the 300 cell.
        </li>
        <li>
          <strong>2205 and other duplex</strong> — not a 304 setup.
        </li>
        <li>
          <strong>Inconel and nickel beyond 330</strong> — cert and
          conversation, not a pressure increase on 304 tooling.
        </li>
      </ul>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/materials">All coil materials</Link>
        </li>
        <li>
          <Link href="/processes/heat-treating">Heat treating</Link> — 330
          wire baskets
        </li>
        <li>
          <Link href="/processes/mesh-grids-and-cable-trays">
            Mesh grids and cable trays
          </Link>
        </li>
        <li>
          <Link href="/sizes">3/8, 7/16, and 1/2 in</Link>
        </li>
        <li>
          <Link href="/guide/design-for-wire-forming">Design for wire forming</Link>
        </li>
      </ul>

      <QuoteBand title="Have a 300-series coil and a print?" />
    </DocPage>
  );
}
