import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema } from "@/components/SeoSchemas";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "CNC Wire Forming vs Fourslide: Which Process Wins?",
  description:
    "Compare CNC wire forming and fourslide for production parts. Learn when programmable CNC beats cam tooling on cost, flexibility, and lead time.",
  path: "/cnc-vs-fourslide",
  keywords: [
    "CNC vs fourslide",
    "fourslide vs CNC",
    "wire forming processes",
    "multislide wire forming",
    "CNC wire bending",
  ],
});

const toc = [
  { id: "overview", label: "Overview" },
  { id: "cnc", label: "CNC wire forming" },
  { id: "fourslide", label: "Fourslide / multislide" },
  { id: "tooling", label: "Tooling comparison" },
  { id: "geometry", label: "Geometry limits" },
  { id: "volume", label: "Volume sweet spots" },
  { id: "decision", label: "Decision framework" },
  { id: "faq", label: "FAQ" },
];

const faqs = [
  {
    question: "Is CNC wire forming replacing fourslide?",
    answer:
      "CNC has taken market share from fourslide, especially for mid-volume and 3D parts. But fourslide still wins for high-volume 2D parts with frozen designs. The processes coexist — they serve different volume and complexity niches.",
  },
  {
    question: "Which has faster tooling lead time?",
    answer:
      "CNC tooling typically takes 1–2 weeks. Fourslide cam tooling takes 4–12 weeks depending on complexity. For urgent projects or parts likely to revise, CNC's faster tooling is a major advantage.",
  },
  {
    question: "Can CNC match fourslide cycle times?",
    answer:
      "Fourslide is faster per piece (often 60–200 parts/minute vs 10–30 for CNC). But CNC setup is faster and tooling is cheaper. Total cost depends on volume — CNC often wins under 50,000 pieces even with slower cycles.",
  },
  {
    question: "What about 3D parts — can fourslide do them?",
    answer:
      "Traditional fourslide is limited to 2D bends in the slide plane. Some multislide machines add limited 3D capability, but CNC with a rotary axis handles true 3D geometry more naturally. Complex 3D routing forms are CNC territory.",
  },
];

export default function CncVsFourslidePage() {
  return (
    <DocPage
      kicker="Comparison"
      title="CNC wire forming vs fourslide"
      lede="Two ways to bend wire in production — CNC runs a program, fourslide runs cams. The right choice depends on volume, geometry, and whether the design will change."
      toc={toc}
    >
      <BreadcrumbJsonLd
        items={[{ name: "CNC vs Fourslide", url: "/cnc-vs-fourslide" }]}
      />
      <FAQSchema questions={faqs} />

      <h2 id="overview">Overview</h2>
      <p>
        CNC wire forming and fourslide (multislide) both produce bent wire parts
        from coil, but they approach the problem differently. CNC uses servo
        motors and a program; fourslide uses mechanical cams and dedicated
        tooling. Each has a sweet spot.
      </p>
      <table>
        <thead>
          <tr>
            <th>Factor</th>
            <th>CNC Wire Forming</th>
            <th>Fourslide</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Motion control</td>
            <td>Servo motors, program</td>
            <td>Mechanical cams</td>
          </tr>
          <tr>
            <td>Tooling cost</td>
            <td>$500–$2,000</td>
            <td>$3,000–$15,000</td>
          </tr>
          <tr>
            <td>Tooling lead time</td>
            <td>1–2 weeks</td>
            <td>4–12 weeks</td>
          </tr>
          <tr>
            <td>Cycle time</td>
            <td>10–30 ppm</td>
            <td>60–200 ppm</td>
          </tr>
          <tr>
            <td>Geometry</td>
            <td>2D and 3D, complex routing</td>
            <td>2D primary, limited 3D</td>
          </tr>
          <tr>
            <td>Design changes</td>
            <td>Edit program</td>
            <td>Modify or rebuild cams</td>
          </tr>
          <tr>
            <td>Sweet spot</td>
            <td>100–100,000 pieces</td>
            <td>100,000+ frozen design</td>
          </tr>
        </tbody>
      </table>

      <h2 id="cnc">CNC wire forming</h2>
      <p>
        CNC wire forming machines use servo motors to control feed, bend, and
        rotation. The bend sequence lives in a program that can be modified
        without physical tooling changes. A{" "}
        <Link href="/processes/3d-cnc-wire-forming">3D CNC machine</Link> adds a
        rotary axis for bends out of the primary plane.
      </p>
      <h3>CNC advantages</h3>
      <ul>
        <li>
          <strong>Fast tooling:</strong> 1–2 weeks vs 4–12 weeks for fourslide
        </li>
        <li>
          <strong>Low tooling cost:</strong> $500–$2,000 vs $3,000–$15,000
        </li>
        <li>
          <strong>Design flexibility:</strong> program changes, not cam rebuilds
        </li>
        <li>
          <strong>3D capability:</strong> true multi-plane bending with rotary
          axis
        </li>
        <li>
          <strong>Quick changeover:</strong> run multiple part numbers in a shift
        </li>
      </ul>
      <h3>CNC limitations</h3>
      <ul>
        <li>Slower cycle times (10–30 ppm typical)</li>
        <li>Higher piece cost at very high volumes</li>
        <li>Less suited to combined stamp-and-form operations</li>
      </ul>

      <h2 id="fourslide">Fourslide / multislide</h2>
      <p>
        Fourslide machines use four slides (hence the name) driven by mechanical
        cams. The cams are cut for a specific part and produce the same motion
        cycle after cycle. Multislide machines add more slides for complex
        geometry.
      </p>
      <h3>Fourslide advantages</h3>
      <ul>
        <li>
          <strong>Fast cycle times:</strong> 60–200+ parts per minute
        </li>
        <li>
          <strong>Low piece cost:</strong> at high volumes, cam-driven is cheaper
        </li>
        <li>
          <strong>Combined operations:</strong> can stamp, pierce, and form in
          one setup
        </li>
        <li>
          <strong>Consistency:</strong> mechanical repeatability over millions of
          cycles
        </li>
      </ul>
      <h3>Fourslide limitations</h3>
      <ul>
        <li>Long tooling lead time (4–12 weeks)</li>
        <li>Higher tooling cost ($3,000–$15,000+)</li>
        <li>Design changes require cam modification</li>
        <li>Primarily 2D geometry</li>
        <li>Long setup time for changeovers</li>
      </ul>
      <p>
        See our{" "}
        <Link href="/processes/fourslide">fourslide process page</Link> for more
        detail on when cam tooling makes sense.
      </p>

      <h2 id="tooling">Tooling comparison</h2>
      <h3>CNC tooling</h3>
      <p>
        CNC wire forming uses bend tooling (pins, rollers, or mandrels) mounted
        in the machine. The program controls which tools engage and when. Adding
        a new part often means programming plus minor tooling — $500–$2,000 and
        1–2 weeks typical.
      </p>
      <p>
        Revisions are usually program edits. If bend radius or wire diameter
        changes, tooling may need modification, but it's incremental rather than
        a full rebuild.
      </p>

      <h3>Fourslide tooling</h3>
      <p>
        Fourslide requires dedicated cams machined for the specific part
        geometry. Cam design and manufacture takes 4–12 weeks and costs
        $3,000–$15,000 depending on complexity. The cams define the motion — the
        machine just follows them.
      </p>
      <p>
        Design changes mean cam modification or replacement. A geometry change
        that's a 15-minute program edit on CNC might be a 3-week cam revision
        on fourslide.
      </p>

      <h2 id="geometry">Geometry limits</h2>
      <table>
        <thead>
          <tr>
            <th>Geometry Type</th>
            <th>CNC</th>
            <th>Fourslide</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2D flat bends</td>
            <td>Yes</td>
            <td>Yes (optimized)</td>
          </tr>
          <tr>
            <td>3D routing</td>
            <td>Yes (with rotary)</td>
            <td>Limited</td>
          </tr>
          <tr>
            <td>Complex loops/eyes</td>
            <td>Yes</td>
            <td>Possible but slow</td>
          </tr>
          <tr>
            <td>Combined stamp + form</td>
            <td>Separate operations</td>
            <td>Yes (in-die)</td>
          </tr>
          <tr>
            <td>Wire diameter range</td>
            <td>1–14 mm typical</td>
            <td>0.5–6 mm typical</td>
          </tr>
          <tr>
            <td>Tight sequential bends</td>
            <td>Tooling dependent</td>
            <td>Excellent</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Key insight:</strong> Heavy wire (4–14 mm) tends toward CNC
        because fourslide machines are typically optimized for lighter gauges.
        Our 3/8, 7/16, and 1/2 in production runs on CNC for this reason.
      </p>

      <h2 id="volume">Volume sweet spots</h2>
      <table>
        <thead>
          <tr>
            <th>Annual Volume</th>
            <th>Better Process</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100–5,000</td>
            <td>CNC</td>
            <td>Tooling cost dominates</td>
          </tr>
          <tr>
            <td>5,000–50,000</td>
            <td>CNC (usually)</td>
            <td>Flexibility + reasonable piece cost</td>
          </tr>
          <tr>
            <td>50,000–100,000</td>
            <td>Evaluate both</td>
            <td>Depends on geometry and revision risk</td>
          </tr>
          <tr>
            <td>100,000–500,000</td>
            <td>Fourslide (if 2D, frozen)</td>
            <td>Cycle time advantage</td>
          </tr>
          <tr>
            <td>500,000+</td>
            <td>Fourslide (if 2D, frozen)</td>
            <td>Piece cost wins</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Revision risk matters:</strong> If the design might change, CNC
        is safer even at higher volumes. A running change on fourslide means
        weeks and thousands of dollars for new cams.
      </p>

      <h2 id="decision">Decision framework</h2>
      <h3>Choose CNC when:</h3>
      <ul>
        <li>Volume is under 100,000 pieces/year</li>
        <li>Design may change or has variants</li>
        <li>Part is 3D or has complex routing</li>
        <li>Wire is 4–14 mm (heavy for fourslide)</li>
        <li>Lead time is critical (1–2 weeks vs 4–12)</li>
        <li>You need to run multiple part numbers</li>
      </ul>

      <h3>Choose fourslide when:</h3>
      <ul>
        <li>Volume exceeds 100,000 pieces/year</li>
        <li>Design is frozen and won't change</li>
        <li>Part is 2D and fits fourslide geometry</li>
        <li>Wire is under 6 mm</li>
        <li>You need combined stamp-and-form in one hit</li>
        <li>Cycle time is the dominant cost factor</li>
      </ul>

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
          <Link href="/processes/fourslide">Fourslide / multislide</Link>
        </li>
        <li>
          <Link href="/wire-forming-vs-stamping">Wire forming vs stamping</Link>
        </li>
        <li>
          <Link href="/2d-vs-3d-wire-forming">2D vs 3D wire forming</Link>
        </li>
      </ul>

      <QuoteBand title="Need help choosing a process?" />
    </DocPage>
  );
}
