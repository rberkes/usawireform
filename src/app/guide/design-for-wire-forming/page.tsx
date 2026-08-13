import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Design for Wire Forming",
  description: "Design-for-manufacturing rules for 2D and 3D CNC wire forms: bend radius, min legs, springback, tolerances, ends, and what to put on the print.",
  path: '/guide/design-for-wire-forming',
  keywords: [
    "design for wire forming",
    "bend radius",
    "springback",
    "DFM wire",
  ],
});

const toc = [
  { id: "print", label: "What the print must say" },
  { id: "radius", label: "Bend radius" },
  { id: "legs", label: "Legs and reversals" },
  { id: "springback", label: "Springback" },
  { id: "tol", label: "Tolerancing" },
  { id: "ends", label: "Ends and closures" },
  { id: "files", label: "CAD and files" },
  { id: "next", label: "Related" },
];

export default function DesignGuidePage() {
  return (
    <DocPage
      kicker="Guide"
      title="Design for wire forming"
      lede="A wire form is a centerline plus a diameter plus ends. These rules are written for 4–14 mm CNC — the radii and legs get large. Light-wire clip rules do not scale."
      toc={toc}
    >
      <h2 id="print">What the print must say</h2>
      <ul>
        <li>Wire diameter and material spec (alloy, tensile or temper, coating)</li>
        <li>Inside bend radii — not “sharp” and not a broken edge from CAD</li>
        <li>Critical-to-fit dimensions only, with datums from the mating part</li>
        <li>End condition: square, chamfer, coin, flatten, thread, loop</li>
        <li>Finish: none, zinc, nickel, powder, passivate — and whether it is pre-coated wire</li>
        <li>Open vs closed, and whether a weld is allowed</li>
      </ul>
      <p>
        “Spring steel, form to match sample” is not a print. It is a request
        for a reverse-engineering job, which is valid, but quote it as one.
      </p>

      <h2 id="radius">Bend radius</h2>
      <p>
        CAD likes zero-radius polylines. Wire does not. In the{" "}
        <Link href="/processes/heavy-wire-forming">4–14 mm band</Link>:
      </p>
      <ul>
        <li>Mild carbon: inside radius ≥ 1× diameter (14 mm wire → 14 mm IR)</li>
        <li>Stainless and high-tensile: often ≥ 1.5–2× diameter</li>
        <li>Soft copper / aluminum: can go tighter, but watch marking</li>
      </ul>
      <p>
        The outside fiber is in tension. Too tight a pin and you crack
        stainless or take the coating off carbon. If the assembly needs a
        sharper corner than the wire will take, that is a flattened section,
        a weldment, or a different process — not a smaller CAD radius.
      </p>
      <p>
        Details by process:{" "}
        <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link> and{" "}
        <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link>.
      </p>

      <h2 id="legs">Minimum legs and reversing bends</h2>
      <p>
        Tools need room. A straight between bends under about 2–3× diameter
        is where 3D programs get slow or impossible without special tooling.
        Reversing zigzags in 2D have the same problem in plane.
      </p>
      <p>
        If the function is “pack as many bends as possible into a short
        clip,” talk to the former before you freeze the plastic housing
        around it.
      </p>

      <h2 id="springback">Springback is a material property</h2>
      <p>
        The machine commands an angle. The wire returns some of it. Higher
        yield, larger radius, and certain stainless grades return more.
        Compensation lives in the program, not on the print — but the print
        must name the alloy, or the compensation is a guess.
      </p>
      <p>
        Changing from A228 to 302 “equivalent” without a new first article
        is how a clip stops snapping onto the mating rib.
      </p>

      <h2 id="tol">Tolerancing like a formed part</h2>
      <p>
        Do not chain ±0.005" down a 3D centerline. Pick the interfaces:
      </p>
      <ul>
        <li>Hole-to-hook span that locates the part</li>
        <li>Clip gap that sets retention force</li>
        <li>Overall envelope that has to clear a cover</li>
      </ul>
      <p>
        Put those on a fixture or a CMM program. Let non-mating bends float
        at process capability. Tightening everything raises scrap without
        raising function.
      </p>
      <table>
        <thead>
          <tr>
            <th>Default (starting)</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Linear, non-critical</td>
            <td>±0.015"</td>
          </tr>
          <tr>
            <td>Linear, critical</td>
            <td>±0.005" with a fixture</td>
          </tr>
          <tr>
            <td>Angle, non-critical</td>
            <td>±2°</td>
          </tr>
          <tr>
            <td>Angle, critical</td>
            <td>±0.5° to ±1°</td>
          </tr>
        </tbody>
      </table>

      <h2 id="ends">Ends, loops, and closed forms</h2>
      <p>
        Square cut is the default. Chamfer for insertion. Flatten/coin for
        weld or rivet. Thread for a fastener. Loops need an inside diameter
        and a gap (or a weld) called out.
      </p>
      <p>
        Fully closed rectangles and rings can trap on CNC tooling. Either
        leave a gap, add a weld as a secondary, or accept a two-piece
        assembly. Do not discover this after the housing is tooled.
      </p>

      <h2 id="files">CAD that a former can use</h2>
      <ul>
        <li>A wire centerline (curve) plus diameter is better than a solid sweep with no path</li>
        <li>STEP or DXF plus a PDF with the critical dims</li>
        <li>Bend radii modeled, not sharp polylines</li>
        <li>One material spec, not “or equivalent”</li>
      </ul>
      <p>
        If CAD does not exist, a sample can be reverse-measured. A photo
        cannot.
      </p>

      <h2 id="next">Related processes</h2>
      <ul>
        <li>
          <Link href="/processes/wire-form-shapes">Wire form shapes</Link>{" "}
          — L, U, J, S, C, serpentine, frames
        </li>
        <li>
          <Link href="/materials">Coil materials</Link> — 1010, 1018,
          300-series, 330, brass, copper
        </li>
        <li>
          <Link href="/processes/end-forming">End forming</Link>
        </li>
        <li>
          <Link href="/processes/inspection">Inspection</Link>
        </li>
        <li>
          <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link> ·{" "}
          <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link>
        </li>
        <li>
          <Link href="/processes">Process index</Link>
        </li>
      </ul>

      <QuoteBand />
    </DocPage>
  );
}
