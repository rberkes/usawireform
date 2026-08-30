import Link from "next/link";
import { BandTable } from "@/components/BandTable";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "End Forming",
  description: "End forming for 4–14 mm wire: chamfer, coin, flatten, pierce, swage, and thread so the wire mates to a hole, screw, or weld.",
  path: '/processes/end-forming',
  keywords: [
    "end forming",
    "wire forming process",
    "4-14 mm",
    "CNC",
  ],
});

const toc = [
  { id: "what", label: "What it is" },
  { id: "ops", label: "The operations" },
  { id: "band", label: "4–14 mm" },
  { id: "print", label: "Print callouts" },
  { id: "next", label: "Related" },
];

export default function EndFormingPage() {
  return (
    <DocPage
      kicker="Process"
      title="End forming"
      lede="A wire form is a centerline plus ends. Chamfer, coin, flatten, pierce, swage, and thread are how 4–14 mm wire actually installs — not decoration on the CAD solid."
      toc={toc}
    >
      <h2 id="what">What end forming is</h2>
      <p>
        End forming changes the last few diameters of the wire so it can enter
        a hole, take a screw, weld to a plate, or stop against a shoulder. It
        is a secondary to{" "}
        <Link href="/processes/2d-cnc-wire-forming">2D</Link> and{" "}
        <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link>, and it is
        often the reason a “simple bend” is not simple.
      </p>
      <p>
        In-line end work on the CNC cell is fastest when the op is a chamfer
        or a light coin. Dedicated presses, pointing dies, and thread rollers
        show up when the end is the product: a flattened weld tab, a pierced
        eye, a rolled thread.
      </p>

      <h2 id="ops">The operations</h2>
      <ul>
        <li>
          <strong>Chamfer / point</strong> — lead-in for insertion. Call the
          included angle and the remaining face diameter.
        </li>
        <li>
          <strong>Coin / flatten</strong> — a paddle for a weld, a rivet, or
          a stamped mark. Thickness and width after coin, not “flatten end.”
        </li>
        <li>
          <strong>Pierce</strong> — a hole through a flattened end or through
          the round. Edge distance matters; 4 mm wire has little of it.
        </li>
        <li>
          <strong>Swage / reduce</strong> — diameter down so the end enters a
          tube or a smaller hole. Length of reduction and blend radius.
        </li>
        <li>
          <strong>Thread</strong> — roll or cut. Roll is stronger on mild
          carbon; cut is more common when the end was already coined. Spec
          the thread, class, and usable length.
        </li>
        <li>
          <strong>Loop / eye</strong> — a closed or open eye as the end.
          Inside diameter, gap, and whether a weld is allowed. Fully closed
          eyes can trap on CNC tooling — see the{" "}
          <Link href="/guide/design-for-wire-forming">design guide</Link>.
        </li>
      </ul>

      <h2 id="band">What changes from 4 to 14 mm</h2>
      <BandTable
        heading="End work"
        rows={{
          4: "Chamfer and light coin in-line. Pierced eyes need a real flatten first.",
          8: "Flattened weld tabs are common. Thread rolls need a straight behind the thread.",
          12: "Swage and heavy coin want a press, not a hope on the CNC head.",
          14: "Ends are structural. Call face, thickness, and weld prep. Do not imply a clip-style dime flatten.",
        }}
      />

      <h2 id="print">Print callouts that get quoted</h2>
      <ul>
        <li>Which end (or both), and a datum from the mating part</li>
        <li>Before/after dimensions on flatten and swage</li>
        <li>Thread spec and incomplete-thread allowance</li>
        <li>Burr and coating: pre-coated wire will crack at a tight coin</li>
        <li>Whether the end is formed before or after plating</li>
      </ul>
      <p>
        A STEP of the bent solid with a sharp cutoff is not an end spec. If
        the end mates, draw the end.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/processes/cut-to-length">Cut-to-length</Link>
        </li>
        <li>
          <Link href="/processes/resistance-welding">Resistance welding</Link>{" "}
          — coined tabs often exist to be welded
        </li>
        <li>
          <Link href="/processes/plating-and-coating">Plating and coating</Link>
        </li>
      </ul>

      <QuoteBand title="Have an end that has to mate?" />
    </DocPage>
  );
}
