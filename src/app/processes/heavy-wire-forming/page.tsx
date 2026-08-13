import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { WIRE } from "@/lib/range";

export const metadata: Metadata = {
  title: "Heavy Wire Forming 4–14 mm",
  description:
    "Heavy wire forming from 4 mm to 14 mm (0.157–0.551 in): 3D CNC, frames, wire baskets, guards, bend radii, machines, and what light-wire shops cannot run.",
};

const toc = [
  { id: "band", label: "The 4–14 mm band" },
  { id: "why", label: "Why this range" },
  { id: "machines", label: "What can actually bend it" },
  { id: "design", label: "Design rules at this diameter" },
  { id: "parts", label: "What the parts are" },
  { id: "not", label: "Outside the band" },
  { id: "next", label: "Related pages" },
];

export default function HeavyWirePage() {
  return (
    <DocPage
      kicker="Process"
      title={`Heavy wire forming, ${WIRE.metric}`}
      lede={`${WIRE.label}. 3D CNC and secondary work for frames, wire baskets, guards, and routing forms — not music-wire clips.`}
      toc={toc}
    >
      <h2 id="band">The 4–14 mm band</h2>
      <p>
        Wire forming as a trade runs from hair-thin spring wire to rod that
        behaves like bar. Most “CNC wire forming” pages quote 0.020–0.375 in
        and then stop. This library is the other side of that line.
      </p>
      <table>
        <thead>
          <tr>
            <th>Diameter</th>
            <th>Inch</th>
            <th>Typical work</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4 mm</td>
            <td>0.157 in</td>
            <td>Display, appliance, lighter frames, 3D hooks</td>
          </tr>
          <tr>
            <td>6–8 mm</td>
            <td>0.236–0.315 in</td>
            <td>Seat frames, racks, guards, wire-basket stock</td>
          </tr>
          <tr>
            <td>10–12 mm</td>
            <td>0.394–0.472 in</td>
            <td>Heavy frames, material handling, furnace fixtures</td>
          </tr>
          <tr>
            <td>14 mm</td>
            <td>0.551 in</td>
            <td>Structural wire, heavy wire baskets, rod-frame work</td>
          </tr>
        </tbody>
      </table>
      <p>
        4 mm is already past most fourslide and light AIM cells. 14 mm is past
        a typical BLM 12 mm head. The process still looks like CNC wire
        forming — straighten, feed, rotate, bend, cut — but the machine, the
        straightener, the cutoff, and the print rules all change.
      </p>

      <h2 id="why">Why diameter comes first</h2>
      <p>
        A 1 mm clip and a 12 mm wire-basket frame are not the same trade.
        Springback, min radius, tool occupancy, and weld heat all scale
        with section. We quote {WIRE.metric} because that is the cell:
        which head, which pin, which alloy, which fixture.
      </p>
      <p>
        Below 4 mm is light CNC, fourslide, and spring work. Above 14 mm
        is bar and fabrication. We will say so rather than stretch the
        brochure.
      </p>

      <h2 id="machines">What can actually bend 4–14 mm</h2>
      <ul>
        <li>
          <strong>4–8 mm</strong> — production 3D CNC (AIM / IP Automation
          class, Numalliance, BLM) if tensile and radius fit the head.
        </li>
        <li>
          <strong>8–12 mm</strong> — heavy 3D CNC. Brochure max is not the same
          as a tight 3D path in stainless. Confirm the head, not the PDF.
        </li>
        <li>
          <strong>12–14 mm</strong> — the top of industrial wire CNC. Some
          European heads stop at 12 mm. 14 mm often wants the heaviest 3D cell
          or a press / fixture assist on the worst bends.
        </li>
      </ul>
      <p>
        Benchtop benders (Pensa and similar) and Arduino builds are not in
        this band. Neither is a light spring former. See{" "}
        <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>{" "}
        for the machine map.
      </p>

      <h2 id="design">Design rules that change at this diameter</h2>
      <p>
        The{" "}
        <Link href="/guide/design-for-wire-forming">design guide</Link> still
        applies. The numbers get large:
      </p>
      <ul>
        <li>
          <strong>Inside radius</strong> — start at 1× diameter on mild carbon
          (14 mm wire → 14 mm IR). Stainless and high-tensile: closer to 1.5–2×.
          A “sharp” CAD corner at 12 mm is a crack, not a bend.
        </li>
        <li>
          <strong>Min leg</strong> — 2–3× diameter is 28–42 mm of straight
          between bends at 14 mm. Tight zigzags that work at 2 mm do not
          translate.
        </li>
        <li>
          <strong>Straightening</strong> — coil set energy is high. A weak
          straightener prints banana into every span.
        </li>
        <li>
          <strong>Cutoff</strong> — a real shear or saw, not a light bushing
          nick. End deformation has to be called out if the end is a weld or
          a hole entry.
        </li>
        <li>
          <strong>Weld</strong> — frames and wire baskets in this band are often
          formed + welded, not a single closed CNC path. Leave a gap or a
          joint on the print.
        </li>
        <li>
          <strong>Tolerance</strong> — ±0.5 mm on a 400 mm span is a different
          conversation than ±0.005 in on a clip. Fixture the interfaces.
        </li>
      </ul>

      <h2 id="parts">What 4–14 mm parts actually are</h2>
      <ul>
        <li>
          Seat frames, headrest and lock rods, visor skeletons —{" "}
          <Link href="/industries/automotive">automotive</Link>
        </li>
        <li>Machine guards, frames, and handles</li>
        <li>Wire baskets, racks, carts, and display wire</li>
        <li>Heat-treat and furnace fixtures (rod frame, often 330 / nickel)</li>
        <li>HVAC and material-handling forms</li>
        <li>Heavy hooks, loops, and routing that has to carry load</li>
        <li>S-hooks, D-rings, J-hooks, and cable hangers</li>
      </ul>
      <p>
        If the function is a stored-energy coil with a rate, that is a spring
        shop — usually well under 4 mm. If the function is a shape in heavy
        wire, it belongs here.
      </p>

      <h2 id="not">Outside the band</h2>
      <p>
        Below 4 mm: light CNC, fourslide, and spring cells. This site will
        still explain those processes so the map is complete, but production
        quotes start at 4 mm.
      </p>
      <p>
        Above 14 mm: bar, tube, and fabrication. Different machines, different
        prints. We will say so rather than stretch the brochure.
      </p>

      <h2 id="next">Related pages</h2>
      <ul>
        <li>
          <Link href="/sizes">3/8, 7/16, and 1/2 in</Link> — stock sizes
          we run
        </li>
        <li>
          <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>
        </li>
        <li>
          <Link href="/processes/2d-cnc-wire-forming">2D CNC wire forming</Link>
        </li>
        <li>
          <Link href="/processes/end-forming">End forming</Link>
        </li>
        <li>
          <Link href="/processes/inspection">Inspection</Link>
        </li>
        <li>
          <Link href="/guide/design-for-wire-forming">Design for wire forming</Link>
        </li>
        <li>
          <Link href="/processes/resistance-welding">Resistance welding</Link>
        </li>
        <li>
          <Link href="/processes">Process index</Link>
        </li>
      </ul>

      <QuoteBand title="Have a 4–14 mm form to run?" />
    </DocPage>
  );
}
