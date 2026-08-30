import Link from "next/link";
import { BandTable } from "@/components/BandTable";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Straightening",
  description: "Wire straightening for 4–14 mm CNC forming: rotary vs roll, coil cast and helix, and why a weak straightener prints banana into every span.",
  path: '/processes/wire-straightening',
  keywords: [
    "wire straightening",
    "wire forming process",
    "4-14 mm",
    "CNC",
  ],
});

const toc = [
  { id: "what", label: "What it is" },
  { id: "why", label: "Why it comes first" },
  { id: "methods", label: "Rotary vs roll" },
  { id: "band", label: "4–14 mm" },
  { id: "print", label: "What to spec" },
  { id: "next", label: "Related" },
];

export default function WireStraighteningPage() {
  return (
    <DocPage
      kicker="Process"
      title="Wire straightening"
      lede="Coil is not a straight stick. Cast and helix left in the wire become bow, twist, and missed hole patterns after the first bend. Straightening is the first station on a real 4–14 mm cell."
      toc={toc}
    >
      <h2 id="what">What wire straightening is</h2>
      <p>
        Wire arrives as a coil. That coil has a natural curvature (cast) and
        a corkscrew (helix). A straightener takes those out — or most of them —
        so the feed length that reaches the bend head is a known, repeatable
        centerline.
      </p>
      <p>
        On light spring wire, a cheap two-plane roll stack can be enough. In
        the{" "}
        <Link href="/processes/heavy-wire-forming">4–14 mm band</Link>, coil
        energy is high. A weak straightener does not fail loudly. It prints a
        banana into every long span and a twist into every 3D form.
      </p>

      <h2 id="why">Why it comes before the first bend</h2>
      <p>
        Bend programs assume the incoming wire is straight. Compensation for
        springback lives in the angle. Compensation for a crooked feed lives
        nowhere — it shows up as a first-article that will not sit in the
        fixture.
      </p>
      <ul>
        <li>Long legs and frames magnify leftover cast.</li>
        <li>3D rotation turns leftover helix into out-of-plane error.</li>
        <li>
          Pre-coated wire (galvanized, painted) marks if the straightener is
          too tight or too dirty.
        </li>
      </ul>

      <h2 id="methods">Rotary vs roll</h2>
      <p>
        <strong>Roll (two-plane)</strong> — stacked rollers in vertical and
        horizontal planes. Common, adjustable, good when the alloy is mild and
        the diameter is mid-band. Setup is a craft: too little pressure leaves
        cast; too much work-hardens the surface and marks stainless.
      </p>
      <p>
        <strong>Rotary</strong> — the wire passes through rotating dies or
        rollers that wipe cast more uniformly around the circumference. Used
        when residual bow has to be low on long spans, or when the coil is
        ugly. Rotary units are larger, and they have to match the diameter —
        a 14 mm rotary is not a 4 mm rotary with the pressure turned up.
      </p>
      <p>
        Some cells combine a rotary take-out with a finish roll stack. The
        print never sees this. The fixture does.
      </p>

      <h2 id="band">What changes from 4 to 14 mm</h2>
      <BandTable
        heading="Straightener reality"
        rows={{
          4: "Two-plane roll is usually enough. Watch coating mark on pre-galv.",
          8: "Cast energy is real. Roll stack must be sized for the tensile, not just the diameter.",
          12: "Long frame spans need a serious straightener. Leftover bow is a fixture fail.",
          14: "Rotary or heavy roll. Light spring straighteners do not belong on this coil.",
        }}
      />

      <h2 id="print">What to spec (and what not to)</h2>
      <p>
        You do not call out “rotary straightener” on a part print. You call
        out straightness where it matters: bow per length on a long leg, twist
        relative to a datum, and the hole or weld pattern the form has to hit.
      </p>
      <p>
        If the wire is pre-coated, say so. Straightener pressure that is right
        for bare 1018 will skate or crack a zinc layer. If the coil is
        high-tensile, say the spec — straightening a spring-temper rod as if it
        were mild steel is how you get a part that looks straight on the bench
        and walks after the first bend.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/processes/cut-to-length">Cut-to-length</Link> — cutoff
          after a straight feed
        </li>
        <li>
          <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>
        </li>
        <li>
          <Link href="/guide/design-for-wire-forming">Design for wire forming</Link>
        </li>
      </ul>

      <QuoteBand title="Have a coil and a print?" />
    </DocPage>
  );
}
