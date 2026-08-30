import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Form Shapes",
  description: "Wire form shapes in 4–14 mm: cut-to-length, L, U, J, S, C, V, serpentine, eyes, rings, and closed frames. Stock 3/8, 7/16, and 1/2 in.",
  path: '/processes/wire-form-shapes',
  keywords: [
    "wire form shapes",
    "wire forming process",
    "4-14 mm",
    "CNC",
  ],
});

const toc = [
  { id: "straight", label: "Cut-to-length" },
  { id: "letters", label: "L, U, J, S, C, V, Z" },
  { id: "eyes", label: "Eyes, rings, clips" },
  { id: "serpentine", label: "Serpentine" },
  { id: "frames", label: "Closed frames" },
  { id: "3d", label: "3D paths" },
  { id: "not", label: "Not these" },
  { id: "print", label: "What the print says" },
  { id: "next", label: "Related" },
];

export default function WireFormShapesPage() {
  return (
    <DocPage
      kicker="Process"
      title="Wire form shapes"
      lede="A form is a centerline. These are the shapes we run in 4–14 mm — 3/8, 7/16, and 1/2 in stock — before weld and finish. Name the letter, the radii, and the wire size."
      toc={toc}
    >
      <p>
        Most 2D jobs are a short alphabet: L, U, J, S, C, V, plus a
        straight. Serpentine and closed frames are the same cell with more
        bends.{" "}
        <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link> when it
        lies on a plate.{" "}
        <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link> when a
        bend leaves the plane. Radii and min legs:{" "}
        <Link href="/guide/design-for-wire-forming">design guide</Link>.
      </p>

      <h2 id="straight">Straight / cut-to-length</h2>
      <p>
        No bend. Coil, straighten, cut. Pins, blanks, and rods that get
        formed later. Length and end face are the quote. Detail:{" "}
        <Link href="/processes/cut-to-length">cut-to-length</Link>. Chamfer,
        flatten, pierce, or thread is{" "}
        <Link href="/processes/end-forming">end forming</Link>.
      </p>

      <h2 id="letters">Letter forms</h2>

      <h3>L</h3>
      <p>
        One 90°.{" "}
        <Link href="/l-hitch-pins">L hitch pins</Link>, offsets, and simple
        brackets. Name both leg lengths and the inside radius.
      </p>

      <h3>U</h3>
      <p>
        Two legs, one radius.{" "}
        <Link href="/products/u-hangers">U-hangers</Link> and clamp Us,{" "}
        <Link href="/ground-staples">ground staples</Link>,{" "}
        <Link href="/products/u-anchors">concrete lifting U-anchors</Link>.
        Inside width, leg length, wire size. A forged headed U-anchor is
        not this cell.
      </p>

      <h3>J</h3>
      <p>
        A long leg and a hook.{" "}
        <Link href="/products/j-hooks">J-hooks</Link>,{" "}
        <Link href="/products/cable-hangers">cable hangers</Link>,{" "}
        <Link href="/products/hose-hangers">hose hangers</Link>. Throat and
        whether the top is an eye or a straight.
      </p>

      <h3>S</h3>
      <p>
        Two bends, opposite ways.{" "}
        <Link href="/powder-coating-hooks/s-hooks">S-hooks</Link>. Eyes even or offset.
        Closed eyes when the print wants them to stay on a ring.
      </p>

      <h3>C</h3>
      <p>
        An open ring.{" "}
        <Link href="/products/hog-rings">Hog rings</Link>, powder-line{" "}
        <Link href="/powder-coating-hooks/c-hooks">C-hooks</Link>, keepers.
        Open gap and whether the ends are pointed.
      </p>

      <h3>V</h3>
      <p>
        Dual V: rack crotch on top, part trough on the bottom, sharp 45° bends.
        Line{" "}
        <Link href="/powder-coating-hooks/v-hooks">V-hooks</Link>. Opening and overall on the print —
        not a Z and not a radiused crotch.
      </p>

      <h3>Z / offset</h3>
      <p>
        Two 90° bends the same way, a crank in the middle. Offsets, steps,
        and some{" "}
        <Link href="/products/brackets">brackets</Link>. Two radii and the
        offset height.
      </p>

      <h2 id="eyes">Eyes, rings, clips</h2>
      <ul>
        <li>
          <strong>Eye / P</strong> — a wrap on the end of a leg.{" "}
          <Link href="/products/eye-forms">Eye forms</Link>. Inside
          diameter and whether it is closed or welded.
        </li>
        <li>
          <strong>D-ring</strong> — flat span, round back.{" "}
          <Link href="/products/d-rings">D-rings</Link>. Formed wire, not a
          forged trailer D.
        </li>
        <li>
          <strong>O / closed ring</strong> — round loop, usually welded.{" "}
          <Link href="/products/closed-rings">Closed rings</Link>,{" "}
          <Link href="/products/connecting-links">connecting links</Link>,{" "}
          <Link href="/products/load-loops">load loops</Link>.
        </li>
        <li>
          <strong>Hairpin / R-clip</strong> —{" "}
          <Link href="/products/hitch-pin-clips">hitch pin clips</Link>.
          Typical catalog clips sit under 4 mm; stock coil when the clip
          itself is 3/8 to 1/2 in.
        </li>
      </ul>

      <h2 id="serpentine">Serpentine / zigzag / wave</h2>
      <p>
        Repeating bends in one plane: a wave, a zigzag, a set of equal
        pitches. HVAC and furniture snakes, reinforcement in a grid, a
        spring-looking path that is not a spring. Pitch, amplitude, overall
        length, and how many reversals. Leave real straights between
        reversals — see the{" "}
        <Link href="/guide/design-for-wire-forming">design guide</Link>.
      </p>
      <p>
        Mattress and 9-gauge furniture zigzag is under 4 mm. We will name
        that. In 3/8 to 1/2 in a serpentine is a heavy wave, often welded
        into a{" "}
        <Link href="/products/wire-frames">frame</Link> or a{" "}
        <Link href="/products/mesh-grids">grid</Link>.
      </p>

      <h2 id="frames">Closed frames and rectangles</h2>
      <p>
        Four corners (or more) that meet. Formed open, then{" "}
        <Link href="/processes/resistance-welding">resistance</Link> or{" "}
        <Link href="/processes/mig-tig-assembly">MIG / TIG</Link> at the
        joint.{" "}
        <Link href="/products/wire-frames">Wire frames</Link>, guard
        outlines, furniture,{" "}
        <Link href="/products/trellis-systems">trellis</Link> rims. Do not
        program a fully closed path that traps the part on the pin.
      </p>

      <h2 id="3d">3D paths</h2>
      <p>
        The same letters, plus a rotation out of plane: a J with a kick, a
        handle with an offset, a seat or rack outline. That is{" "}
        <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link>, not a
        different alphabet.
      </p>

      <h2 id="not">Not these shapes</h2>
      <ul>
        <li>
          A coil with a rate — that is a spring maker, usually well under
          4 mm.
        </li>
        <li>
          Forged spherical-head lifting anchors and headed U-feet — a
          forge, not CNC coil.
        </li>
        <li>
          Stamped over-center latches, rolled-flat J-hooks, chain-link
          from a roll.
        </li>
      </ul>

      <h2 id="print">What the print should say</h2>
      <ul>
        <li>The letter or a centerline — not a shaded solid with no path</li>
        <li>
          Diameter:{" "}
          <Link href="/sizes">3/8, 7/16, or 1/2 in</Link> when it is stock
        </li>
        <li>Inside radii, not sharp CAD corners</li>
        <li>Open vs closed, and whether a weld is allowed</li>
        <li>
          Ends: square, shear-ok, chamfer, flatten, eye —{" "}
          <Link href="/processes/end-forming">end forming</Link>
        </li>
      </ul>
      <p>
        A DXF or STEP of the centerline plus a PDF with the critical dims.
        A photo is not a print.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link> ·{" "}
          <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link>
        </li>
        <li>
          <Link href="/processes/cut-to-length">Cut-to-length</Link> ·{" "}
          <Link href="/processes/end-forming">End forming</Link>
        </li>
        <li>
          <Link href="/guide/design-for-wire-forming">
            Design for wire forming
          </Link>
        </li>
        <li>
          <Link href="/products">Product directory</Link> — the SKU for
          each letter
        </li>
        <li>
          <Link href="/sizes">3/8, 7/16, and 1/2 in</Link>
        </li>
      </ul>

      <QuoteBand title="Have a centerline — L, U, J, or a wave?" />
    </DocPage>
  );
}
