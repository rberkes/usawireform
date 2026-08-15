import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema } from "@/components/SeoSchemas";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "2D vs 3D Wire Forming: When Do You Need the Third Axis?",
  description:
    "Compare 2D and 3D CNC wire forming. Learn when flat-plane bending is enough and when you need rotary axis capability for frames, routing, and complex geometry.",
  path: "/2d-vs-3d-wire-forming",
  keywords: [
    "2D vs 3D wire forming",
    "3D wire bending",
    "2D wire forming",
    "CNC wire forming",
    "rotary axis wire forming",
  ],
});

const toc = [
  { id: "overview", label: "Overview" },
  { id: "2d", label: "2D wire forming" },
  { id: "3d", label: "3D wire forming" },
  { id: "geometry", label: "Geometry examples" },
  { id: "cost", label: "Cost differences" },
  { id: "decision", label: "How to decide" },
  { id: "faq", label: "FAQ" },
];

const faqs = [
  {
    question: "Is 3D wire forming more expensive than 2D?",
    answer:
      "3D wire forming typically costs 10–30% more per piece due to longer cycle times and more complex programming. But if the alternative is multiple 2D operations plus welding or assembly, 3D can be cheaper overall. Evaluate total cost, not just forming cost.",
  },
  {
    question: "Can a 2D part be run on a 3D machine?",
    answer:
      "Yes. A 3D CNC machine can run 2D parts — it just doesn't use the rotary axis. Some shops run everything on 3D machines for flexibility. The machine cost is higher, but you avoid moving parts between machines.",
  },
  {
    question: "What's a rotary axis in wire forming?",
    answer:
      "The rotary axis (sometimes called torsion or twist axis) rotates the wire around its centerline between bends. This allows the next bend to happen in a different plane. Without it, all bends stay in the same 2D plane.",
  },
  {
    question: "How do I know if my part needs 3D?",
    answer:
      "Look at your part from the end of the wire. If all bends point up/down or left/right in the same plane, it's 2D. If some bends point toward you or away, it's 3D. Another test: can you lay the part flat on a table with all features touching? If yes, likely 2D.",
  },
];

export default function TwoDVsThreeDPage() {
  return (
    <DocPage
      kicker="Comparison"
      title="2D vs 3D wire forming"
      lede="All wire bends happen in a plane — the question is whether all your bends can share the same plane, or whether the wire needs to rotate between bends to reach a new plane."
      toc={toc}
    >
      <BreadcrumbJsonLd
        items={[{ name: "2D vs 3D Wire Forming", url: "/2d-vs-3d-wire-forming" }]}
      />
      <FAQSchema questions={faqs} />

      <h2 id="overview">Overview</h2>
      <p>
        The difference between 2D and 3D wire forming is whether the machine can
        rotate the wire around its axis between bends. This rotation — the
        "rotary axis" or "torsion axis" — allows bends to happen in different
        planes, creating true 3D geometry.
      </p>
      <table>
        <thead>
          <tr>
            <th>Factor</th>
            <th>2D Wire Forming</th>
            <th>3D Wire Forming</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bend planes</td>
            <td>Single plane</td>
            <td>Multiple planes</td>
          </tr>
          <tr>
            <td>Machine axis</td>
            <td>Feed + bend</td>
            <td>Feed + bend + rotary</td>
          </tr>
          <tr>
            <td>Programming</td>
            <td>Simpler</td>
            <td>More complex</td>
          </tr>
          <tr>
            <td>Cycle time</td>
            <td>Faster</td>
            <td>10–30% slower typical</td>
          </tr>
          <tr>
            <td>Part examples</td>
            <td>S-hooks, flat brackets, rings</td>
            <td>Frames, routing forms, handles</td>
          </tr>
          <tr>
            <td>Piece cost</td>
            <td>Lower</td>
            <td>10–30% higher typical</td>
          </tr>
        </tbody>
      </table>

      <h2 id="2d">2D wire forming</h2>
      <p>
        In 2D wire forming, all bends happen in the same plane. The machine
        feeds wire, bends it, feeds more, bends again — but every bend
        points in the same direction relative to the bend before it.
      </p>
      <p>
        Think of it this way: a 2D part can be drawn on paper with a single
        continuous line. When you're done, the entire part lies flat.
      </p>
      <h3>2D part examples</h3>
      <ul>
        <li>
          <Link href="/products/s-hooks">S-hooks</Link> — two bends, same plane
        </li>
        <li>
          <Link href="/products/d-rings">D-rings</Link> — closed loop, flat
        </li>
        <li>
          <Link href="/products/j-hooks">J-hooks</Link> — hook geometry, single plane
        </li>
        <li>
          <Link href="/products/u-hangers">U-hangers</Link> — two legs, one radius
        </li>
        <li>
          <Link href="/products/ground-staples">Ground staples</Link> — U shape,
          flat
        </li>
        <li>
          <Link href="/products/l-pins">L-pins</Link> — 90° bend, single plane
        </li>
      </ul>
      <p>
        See <Link href="/processes/2d-cnc-wire-forming">2D CNC wire forming</Link>{" "}
        for process details.
      </p>

      <h2 id="3d">3D wire forming</h2>
      <p>
        In 3D wire forming, the machine rotates the wire between some bends,
        allowing the next bend to happen in a different plane. This creates
        parts that travel through X, Y, and Z — parts that can't lie flat.
      </p>
      <p>
        The rotary axis is the key capability. It twists the wire (around its
        own centerline) so the bend tooling attacks from a new angle. The
        result is geometry that routes through space.
      </p>
      <h3>3D part examples</h3>
      <ul>
        <li>
          <Link href="/products/wire-frames">Wire frames</Link> — closed 3D
          outlines
        </li>
        <li>
          <Link href="/products/handles">Handles</Link> — offset grip, stands off
          the surface
        </li>
        <li>
          <Link href="/products/cable-hangers">Cable hangers</Link> — messenger
          grip plus drop
        </li>
        <li>
          <Link href="/products/heavy-duty-wire-baskets">Wire baskets</Link> —
          rim plus welded mesh
        </li>
        <li>
          <Link href="/products/machine-guards">Machine guards</Link> — frame with
          standoffs
        </li>
        <li>
          <Link href="/products/lift-hooks">Lift hooks</Link> — throat, eye, out
          of plane
        </li>
      </ul>
      <p>
        See <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>{" "}
        for process details.
      </p>

      <h2 id="geometry">Geometry examples</h2>
      <h3>Clearly 2D</h3>
      <p>
        These parts have all bends in one plane. They can be manufactured on
        either 2D or 3D machines, but 2D is more cost-effective:
      </p>
      <ul>
        <li>Flat brackets with multiple bends</li>
        <li>Hooks that lie flat (S, J, C shapes)</li>
        <li>Rings and closed loops</li>
        <li>Zigzag or serpentine forms in one plane</li>
        <li>Wire shelves before they get a lip</li>
      </ul>

      <h3>Clearly 3D</h3>
      <p>
        These parts travel through multiple planes. They require 3D capability:
      </p>
      <ul>
        <li>Frames with corners (think: rectangle that stands up)</li>
        <li>Handles that stand off a panel</li>
        <li>Routing forms that follow a 3D path</li>
        <li>Baskets with rims and vertical sides</li>
        <li>Guards with mounting tabs out of the mesh plane</li>
        <li>Seat frames, headrest rods, automotive interior parts</li>
      </ul>

      <h3>The gray zone</h3>
      <p>
        Some parts could go either way depending on design decisions:
      </p>
      <ul>
        <li>
          <strong>Hook with an offset eye:</strong> If the eye is in the hook
          plane, it's 2D. If the eye stands perpendicular, it's 3D.
        </li>
        <li>
          <strong>Bracket with a mounting tab:</strong> Tab in-plane is 2D.
          Tab perpendicular is 3D.
        </li>
        <li>
          <strong>Guard frame:</strong> Flat frame is 2D. Frame with standoffs
          or mounting returns is 3D.
        </li>
      </ul>
      <p>
        In these cases, consider whether the 3D feature is essential. Sometimes
        a slight design change converts a 3D part to 2D and reduces cost.
      </p>

      <h2 id="cost">Cost differences</h2>
      <h3>Why 3D costs more</h3>
      <ul>
        <li>
          <strong>Cycle time:</strong> Rotary moves between bends add seconds.
          A 2D part at 20/minute might be 15/minute in 3D.
        </li>
        <li>
          <strong>Programming:</strong> 3D bend sequences are more complex to
          develop and prove out.
        </li>
        <li>
          <strong>Machine cost:</strong> 3D CNC machines cost more, and shops
          amortize that into hourly rates.
        </li>
        <li>
          <strong>Springback:</strong> 3D parts have more complex springback
          interactions. First-article tuning takes longer.
        </li>
      </ul>
      <p>
        Typical premium: <strong>10–30% higher piece cost</strong> for 3D vs
        equivalent 2D complexity.
      </p>

      <h3>When 3D saves money</h3>
      <p>
        3D can be cheaper than the alternative when:
      </p>
      <ul>
        <li>
          <strong>Multiple 2D operations:</strong> If a "2D approach" requires
          multiple bends plus welding, one 3D operation may be cheaper.
        </li>
        <li>
          <strong>Assembly elimination:</strong> A 3D form that replaces a
          welded assembly saves labor and weld cost.
        </li>
        <li>
          <strong>Scrap reduction:</strong> Getting geometry right in one hit
          reduces handling and scrap.
        </li>
      </ul>

      <h2 id="decision">How to decide</h2>
      <h3>The flat-table test</h3>
      <p>
        Can you lay your part flat on a table with all features touching the
        surface? If yes, it's likely 2D. If the part rocks, wobbles, or has
        features pointing up, it's 3D.
      </p>

      <h3>The end-view test</h3>
      <p>
        Look at your part from the end of the wire (as if looking down the
        centerline). If all bends go up/down or left/right, it's 2D. If some
        bends come toward you or go away, it's 3D.
      </p>

      <h3>The CAD test</h3>
      <p>
        In your CAD model, check if the wire centerline stays in one plane
        (XY, XZ, or YZ) throughout the part. If it leaves that plane, it's 3D.
      </p>

      <h3>When to ask</h3>
      <p>
        If you're not sure, send the print. A wire forming shop can tell you in
        minutes whether the part is 2D, 3D, or whether a small design change
        would shift it from one to the other.
      </p>

      <h2 id="faq">Frequently asked questions</h2>
      {faqs.map((faq) => (
        <div key={faq.question} className="mb-6">
          <h3 className="text-base font-semibold">{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}

      <h2>Related pages</h2>
      <ul>
        <li>
          <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>
        </li>
        <li>
          <Link href="/processes/2d-cnc-wire-forming">2D CNC wire forming</Link>
        </li>
        <li>
          <Link href="/cnc-vs-fourslide">CNC vs fourslide comparison</Link>
        </li>
        <li>
          <Link href="/wire-forming-vs-stamping">Wire forming vs stamping</Link>
        </li>
        <li>
          <Link href="/guide/design-for-wire-forming">
            Design for wire forming
          </Link>
        </li>
      </ul>

      <QuoteBand title="Not sure if your part is 2D or 3D?" />
    </DocPage>
  );
}
