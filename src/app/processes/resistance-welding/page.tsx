import Link from "next/link";
import { BandTable } from "@/components/BandTable";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Resistance Welding Wire Forms",
  description: "Resistance welding for 4–14 mm wire forms: cross-wire and projection welds, when to use it instead of MIG/TIG, and what the print should allow.",
  path: '/processes/resistance-welding',
  keywords: [
    "resistance welding",
    "wire forming process",
    "4-14 mm",
    "CNC",
  ],
});

const toc = [
  { id: "what", label: "What it is" },
  { id: "joints", label: "Joint types" },
  { id: "band", label: "4–14 mm" },
  { id: "vs", label: "Vs MIG / TIG" },
  { id: "print", label: "Print and flash" },
  { id: "next", label: "Related" },
];

export default function ResistanceWeldingPage() {
  return (
    <DocPage
      kicker="Process"
      title="Resistance welding"
      lede="Cross-wire and projection welds close a 4–14 mm form or attach a second piece without filler metal. Fast, repeatable, and the default joint on wire baskets and frames — when the alloy and the access allow it."
      toc={toc}
    >
      <h2 id="what">What resistance welding is</h2>
      <p>
        Two pieces of wire (or wire to a plate) are pressed together and a
        current is passed through the contact. Heat is generated at the
        interface; a nugget forms; the electrodes retract. No filler, no
        shielding gas, cycle time in fractions of a second.
      </p>
      <p>
        That is why wire baskets, racks, and many frames in this band are{" "}
        <Link href="/processes/2d-cnc-wire-forming">formed</Link> as open
        pieces and then welded, rather than forced through a fully closed CNC
        path. Leave a joint on the print. Do not discover the closure after
        the housing is tooled.
      </p>

      <h2 id="joints">Joint types that show up on wire forms</h2>
      <ul>
        <li>
          <strong>Cross-wire</strong> — round on round, usually at 90°. The
          classic wire-basket grid. Nugget size scales with diameter and force.
        </li>
        <li>
          <strong>Projection / coined</strong> — a flattened or dimpled
          feature concentrates current. Used when round-on-round is unstable
          or when welding wire to sheet.
        </li>
        <li>
          <strong>Butt / mash</strong> — ends or overlaps mashed into a
          single section. Appearance and strength both depend on electrode
          dress and force. Call the finished thickness if it matters.
        </li>
        <li>
          <strong>Wire to stamping</strong> — a form welded to a bracket.
          Projection on the sheet is usually the more honest joint.
        </li>
      </ul>

      <h2 id="band">What changes from 4 to 14 mm</h2>
      <BandTable
        heading="Weld"
        rows={{
          4: "Cross-wire is routine. Flash is small; still call if the joint is visible.",
          8: "Standard wire-basket and frame work. Electrode force and alignment are the process.",
          12: "Nuggets are large. Heat-affected zone can locally anneal high-tensile — fixture the span.",
          14: "Heavy current, heavy force. Some alloys want MIG/TIG instead. Do not assume a clip welder scales.",
        }}
      />

      <h2 id="vs">When resistance weld is the wrong joint</h2>
      <p>
        <Link href="/processes/mig-tig-assembly">MIG / TIG</Link> wins when
        the joint is not a clean cross, when the alloy is a poor resistance
        candidate (some stainless and high-nickel), when you need a fillet
        you can see and inspect as a weldment, or when access for electrodes
        is impossible.
      </p>
      <p>
        Resistance wins on grids, volume, and repeatability. It loses on
        one-off sculpture and on joints that have to look like a fabricated
        frame.
      </p>

      <h2 id="print">Print, flash, and inspection</h2>
      <ul>
        <li>Weld allowed — yes/no, and where. Closed CNC paths are not free.</li>
        <li>Joint type: cross-wire, mash, projection, wire-to-sheet</li>
        <li>Flash: as-welded, dressed, or none visible on a named face</li>
        <li>Pull or peel requirement if the joint is structural</li>
        <li>Finish: weld then plate, or plate then weld (usually the first)</li>
      </ul>
      <p>
        “Weld as required” is how you get a grid that rattles. Put the
        intersections on the drawing.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/processes/mesh-grids-and-cable-trays">
            Mesh grids and cable trays
          </Link>{" "}
          — the parts this weld is for
        </li>
        <li>
          <Link href="/processes/mig-tig-assembly">MIG / TIG assembly</Link>
        </li>
        <li>
          <Link href="/processes/end-forming">End forming</Link> — coined
          weld tabs
        </li>
        <li>
          <Link href="/processes/heavy-wire-forming">Heavy wire, 4–14 mm</Link>
        </li>
      </ul>

      <QuoteBand title="Have a frame or a grid to close?" />
    </DocPage>
  );
}
