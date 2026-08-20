import Link from "next/link";
import { BandTable } from "@/components/BandTable";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Mesh Wire Grids and Cable Trays",
  description: "Secondary operations for 4–14 mm mesh wire grids and cable trays: resistance welding, MIG, and TIG — rims, intersections, mounts, and splices.",
  path: '/processes/mesh-grids-and-cable-trays',
  keywords: [
    "mesh grids and cable trays",
    "wire forming process",
    "4-14 mm",
    "CNC",
  ],
});

const toc = [
  { id: "what", label: "What we run" },
  { id: "grids", label: "Mesh grids" },
  { id: "trays", label: "Cable trays" },
  { id: "weld", label: "Resistance, MIG, TIG" },
  { id: "band", label: "4–14 mm" },
  { id: "print", label: "What to send" },
  { id: "next", label: "Related" },
];

export default function MeshGridsCableTraysPage() {
  return (
    <DocPage
      kicker="Secondary"
      title="Mesh grids and cable trays"
      lede="Welded wire mesh, machine-guard grids, and cable trays. The form is cut and bent first. The job is the joint: resistance weld on the intersections, MIG or TIG on rims, mounts, and splices."
      toc={toc}
    >
      <h2 id="what">What this page is</h2>
      <p>
        Grids and trays are not a single CNC path. They are a lot of
        straight (or lightly formed) wires joined so they carry load and
        hold an opening. The secondary is the product.
      </p>
      <p>
        We run that secondary in the{" "}
        <Link href="/processes/heavy-wire-forming">4–14 mm</Link> band:{" "}
        <Link href="/processes/resistance-welding">resistance welding</Link>{" "}
        for cross-wire mesh,{" "}
        <Link href="/processes/mig-tig-assembly">MIG and TIG</Link> for
        frames, lips, hangers, and anything a nugget cannot reach. Forming
        of rims, returns, and tray sidewalls is{" "}
        <Link href="/processes/2d-cnc-wire-forming">2D</Link> or{" "}
        <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link> as the
        print requires.
      </p>
      <p>
        Infill lighter than 4 mm is called out on the quote. Structural
        wires, rims, and tray sides stay in band.
      </p>

      <h2 id="grids">Mesh wire grids</h2>
      <p>
        A grid is a rim plus an opening pattern. Typical work: machine
        guards, partitions, shelves, wire-basket bottoms, fence panels, and
        fixture decks. Line wires and cross wires meet at every
        intersection. That intersection is a resistance-weld candidate
        until the alloy, the access, or the spec says otherwise.
      </p>
      <ul>
        <li>
          <strong>Rim / border</strong> — heavier wire or a formed frame.
          Often MIG or TIG at corners, resistance weld where the mesh
          meets the rim.
        </li>
        <li>
          <strong>Mesh</strong> — pitch (center-to-center), wire diameter,
          and whether the pattern is square, rectangular, or a flattened
          “security” mesh.
        </li>
        <li>
          <strong>Returns and mounts</strong> — bent lips, feet, and
          brackets. 2D or 3D form, then a fillet or a projection weld to
          the grid.
        </li>
      </ul>
      <p>
        A drawing that says “welded wire mesh” without pitch, rim
        diameter, and weld type is not a grid print. It is a request to
        invent one. Weave names, crimp, and mesh count:{" "}
        <Link href="/wire-mesh">wire mesh</Link>.
      </p>

      <h2 id="trays">Cable trays</h2>
      <p>
        Wire cable trays are a U-shaped grid: bottom mesh, two sidewalls,
        often a folded lip, plus splices and hangers. The industry
        pattern is resistance-welded intersections along the length,
        then formed into the channel. Mounts, dropouts, and covers are
        where MIG and TIG show up.
      </p>
      <ul>
        <li>
          <strong>Channel</strong> — width, height, and whether the
          sidewall is a 90° return or a radius.
        </li>
        <li>
          <strong>Span and load</strong> — wire diameter and pitch are
          structural, not cosmetic. 4 mm on a wide tray is a different
          part from 8 mm on a short run.
        </li>
        <li>
          <strong>Splices and accessories</strong> — couplers, wall
          brackets, dropouts. Usually MIG or TIG to a formed tab, not a
          cross-wire nugget.
        </li>
        <li>
          <strong>Finish</strong> — zinc after weld is the usual carbon
          path. Stainless is passivate. Pre-galv mesh burns at every
          intersection — see{" "}
          <Link href="/processes/plating-and-coating">plating</Link>.
        </li>
      </ul>

      <h2 id="weld">Which weld, and why</h2>
      <table>
        <thead>
          <tr>
            <th>Joint</th>
            <th>Process</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Line wire × cross wire (mesh)</td>
            <td>Resistance (cross-wire)</td>
            <td>Speed, repeatability, no filler. The default grid joint.</td>
          </tr>
          <tr>
            <td>Mesh to rim, round on round</td>
            <td>Resistance, or MIG if access is poor</td>
            <td>Nugget if electrodes fit; fillet if they do not.</td>
          </tr>
          <tr>
            <td>Rim corners, tray lips, hangers</td>
            <td>MIG</td>
            <td>Fillets on carbon and most stainless frames. Faster than TIG on production.</td>
          </tr>
          <tr>
            <td>Stainless, 330, visible cosmetic, thin-to-heavy</td>
            <td>TIG</td>
            <td>Heat control. Less blow-through on 4 mm into an 8–12 mm rim.</td>
          </tr>
          <tr>
            <td>Wire to plate or punched bracket</td>
            <td>Resistance projection, or MIG/TIG</td>
            <td>Projection if the sheet is tooled for it; fusion if it is a one-off mount.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Resistance weld is not a worse MIG. MIG is not a fancier resistance
        weld. TIG is not “stainless only.” Pick the joint the geometry and
        the alloy can actually make — then put that process on the print.
      </p>
      <p>
        Sequence: weld the grid flat when you can, then form the tray
        channel or the guard return. Forming a closed 3D mesh and then
        trying to get electrodes inside it is how a simple tray becomes a
        TIG sculpture.
      </p>

      <h2 id="band">What changes from 4 to 14 mm</h2>
      <BandTable
        heading="Grids and trays"
        rows={{
          4: "Common mesh and light tray wire. Resistance weld is routine. TIG if the rim is much heavier than the infill.",
          8: "Standard industrial tray and guard rim. Cross-wire plus MIG corners.",
          12: "Heavy decks and structural rims. Nuggets are large; fixture the panel or it bows.",
          14: "Frame and border, not infill. Treat corners as fabrication. Confirm the resistance cell before you assume a grid welder scales.",
        }}
      />

      <h2 id="print">What to send</h2>
      <ul>
        <li>Overall size, mesh pitch, and which wires are rim vs infill</li>
        <li>Wire diameter and material for each (they are often different)</li>
        <li>Weld type by joint: resistance, MIG, TIG — not “weld as required”</li>
        <li>Flash: as-welded on the mesh, dressed on a named face</li>
        <li>Tray: width, height, length, lip, splice method, hanger locations</li>
        <li>Finish and whether it is after weld</li>
        <li>Load or opening spec if the grid is a guard</li>
      </ul>
      <p>
        A STEP of a solid block with a mesh texture is not a grid. A DXF
        of the pitch plus a rim section is.{" "}
        <Link href="/processes/inspection">Inspect</Link> pitch, overall,
        and a peel sample on the mesh — not every nugget on a 2 m tray.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/wire-mesh">Wire mesh</Link> — weaves, crimp, mesh
          count, welded vs woven
        </li>
        <li>
          <Link href="/products/cable-trays">Cable trays</Link> ·{" "}
          <Link href="/products/heavy-duty-wire-baskets">
            Heavy-duty wire baskets
          </Link>{" "}
          ·{" "}
          <Link href="/products/security-mesh-fencing">
            Security mesh fencing
          </Link>{" "}
          ·{" "}
          <Link href="/products/trellis-systems">
            Trellis and growing structures
          </Link>
        </li>
        <li>
          <Link href="/sizes">3/8, 7/16, and 1/2 in</Link> — stock
          diameters
        </li>
        <li>
          <Link href="/processes/resistance-welding">Resistance welding</Link>{" "}
          — cross-wire and projection
        </li>
        <li>
          <Link href="/processes/mig-tig-assembly">MIG / TIG assembly</Link>{" "}
          — fillets, distortion, sequence
        </li>
        <li>
          <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link> ·{" "}
          <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link> — rims
          and tray returns
        </li>
        <li>
          <Link href="/processes/plating-and-coating">Plating and coating</Link>
        </li>
        <li>
          <Link href="/capabilities">Capabilities</Link>
        </li>
      </ul>

      <QuoteBand title="Have a grid or a tray to weld?" />
    </DocPage>
  );
}
