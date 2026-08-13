import type { Metadata } from "next";
import Link from "next/link";
import { BandTable } from "@/components/BandTable";
import { DocPage, QuoteBand } from "@/components/DocPage";

export const metadata: Metadata = {
  title: "MIG TIG Wire Form Assembly",
  description:
    "MIG and TIG assembly of 4–14 mm wire forms: when filler metal beats resistance weld, distortion, and what to put on the print.",
};

const toc = [
  { id: "what", label: "What it is" },
  { id: "when", label: "When to use it" },
  { id: "band", label: "4–14 mm" },
  { id: "print", label: "Print and distortion" },
  { id: "next", label: "Related" },
];

export default function MigTigPage() {
  return (
    <DocPage
      kicker="Process"
      title="MIG / TIG assembly"
      lede="Filler-metal welds for 4–14 mm frames, fixtures, and joints that a resistance welder cannot reach or should not run. Tack, then fusion — and expect the form to move."
      toc={toc}
    >
      <h2 id="what">What MIG / TIG assembly is on a wire form</h2>
      <p>
        After the centerline is bent, some parts still need a joint that is
        not a cross-wire nugget: a frame corner, a wire to a plate, a
        stainless fixture, a repairable field weld. MIG (GMAW) and TIG
        (GTAW) put filler into that joint.
      </p>
      <p>
        This is fabrication sitting on top of forming. Cycle time is slower
        than{" "}
        <Link href="/processes/resistance-welding">resistance welding</Link>.
        Distortion is higher. Inspection looks like a weldment: size, length,
        and sometimes dye penetrant — not a peel test on a grid.
      </p>

      <h2 id="when">When filler is the right call</h2>
      <ul>
        <li>The joint is not a clean wire-on-wire cross.</li>
        <li>Alloy is a poor resistance candidate (some 300-series, 330, nickel).</li>
        <li>You need a fillet you can specify and see.</li>
        <li>Electrode access for resistance weld is blocked by the 3D path.</li>
        <li>The assembly includes tube, plate, or a bought-in stamping.</li>
      </ul>
      <p>
        Tacks exist to hold a fixture. They are not a substitute for the
        specified weld. If the print says “tack weld,” say how many and
        where, or you will get whatever held in the shop fixture.
      </p>

      <h2 id="band">What changes from 4 to 14 mm</h2>
      <BandTable
        heading="Fusion weld"
        rows={{
          4: "Easy to blow through. TIG or small MIG; heat input is the process.",
          8: "Standard frame tacks and fillets. Fixture the span or the bow shows up after cool-down.",
          12: "Real weldment. Preheat and sequence matter on carbon; stainless still moves.",
          14: "Treat it as structural fabrication. Resistance weld may still win on a grid — not on a corner.",
        }}
      />

      <h2 id="print">Print, sequence, and distortion</h2>
      <ul>
        <li>Weld symbol, size, and length — not “weld to suit”</li>
        <li>Filler / process if the alloy demands it (especially stainless and nickel)</li>
        <li>Finish: as-welded, ground flush on a named face, then plate</li>
        <li>Datums after weld, not only after form — the part will move</li>
      </ul>
      <p>
        A 3D CNC program can be perfect and the MIG pass still pulls a 12 mm
        frame out of the hole pattern.{" "}
        <Link href="/processes/inspection">Inspect</Link> the welded state,
        or fixture during weld and check after.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/processes/mesh-grids-and-cable-trays">
            Mesh grids and cable trays
          </Link>
        </li>
        <li>
          <Link href="/processes/resistance-welding">Resistance welding</Link>
        </li>
        <li>
          <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>
        </li>
        <li>
          <Link href="/processes/heat-treating">Heat treating</Link> — stress
          relief after a heavy weldment
        </li>
      </ul>

      <QuoteBand title="Have a frame that needs a fillet?" />
    </DocPage>
  );
}
