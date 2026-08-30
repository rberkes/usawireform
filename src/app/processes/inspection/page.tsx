import Link from "next/link";
import { BandTable } from "@/components/BandTable";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Inspecting Wire Forms",
  description: "Inspection of 4–14 mm 2D and 3D CNC wire forms: fixtures, overlays, CMM, first article, and why chained ±0.005 in on every leg is the wrong print.",
  path: '/processes/inspection',
  keywords: [
    "inspection",
    "wire forming process",
    "4-14 mm",
    "CNC",
  ],
});

const toc = [
  { id: "what", label: "What to measure" },
  { id: "methods", label: "Fixtures, overlays, CMM" },
  { id: "band", label: "4–14 mm" },
  { id: "fa", label: "First article" },
  { id: "print", label: "Tolerancing" },
  { id: "next", label: "Related" },
];

export default function InspectionPage() {
  return (
    <DocPage
      kicker="Process"
      title="Inspection"
      lede="A wire form is a centerline in space. Measure the interfaces the assembly cares about. Chaining ±0.005 in down every leg is how you reject good parts and ship bad ones."
      toc={toc}
    >
      <h2 id="what">What to measure</h2>
      <p>
        Put datums on the mating part: hole pattern, hook span, clip gap,
        envelope that has to clear a cover. Those get a fixture or a CMM
        program. Non-mating bends float at process capability.
      </p>
      <p>
        After{" "}
        <Link href="/processes/resistance-welding">weld</Link> or{" "}
        <Link href="/processes/mig-tig-assembly">MIG / TIG</Link>, inspect
        the welded state. Form-only numbers will not survive a fillet on a
        12 mm frame.
      </p>
      <p>
        Detail on how to dimension:{" "}
        <Link href="/guide/design-for-wire-forming">design for wire forming</Link>.
      </p>

      <h2 id="methods">Fixtures, overlays, CMM</h2>
      <ul>
        <li>
          <strong>Hard fixture</strong> — the default for production 2D and
          for 3D parts with a few critical spans. Go/no-go. Cheap per piece,
          honest if the fixture matches the assembly.
        </li>
        <li>
          <strong>Overlay / optical</strong> — 2D forms on a comparator or
          scan. Fast prove-out. Weak on out-of-plane kick.
        </li>
        <li>
          <strong>CMM / scan</strong> — 3D centerlines, first article, PPAP.
          Slow. Use it to prove the fixture, not to 100% a 50,000-piece grid.
        </li>
        <li>
          <strong>Weld checks</strong> — peel or pull on a sample coupon for
          cross-wire; visual and size for fillets.
        </li>
      </ul>

      <h2 id="band">What changes from 4 to 14 mm</h2>
      <BandTable
        heading="Inspection"
        rows={{
          4: "Overlay still works on 2D. ±0.5 mm on a short clip is tight; ±0.15 mm on a span is a fixture job.",
          8: "Fixtures for hole patterns. CMM for 3D first article.",
          12: "Frames: fixture the interfaces. Do not CMM every radius on a production lot.",
          14: "Think fabrication tolerances. ±0.5 mm on a 400 mm span is a conversation, not a default.",
        }}
      />

      <h2 id="fa">First article</h2>
      <p>
        A first article on a 3D CNC form is a program, a straightener
        setting, and a springback guess that got lucky once. Freeze the
        material spec before you freeze the FA. Changing 304 to “equivalent”
        302 without a new article is how a clip stops snapping on.
      </p>
      <p>
        Send the same files you want production held to: PDF with critical
        dims, STEP or DXF of the centerline, material cert, finish. A photo
        is not an FA package.
      </p>

      <h2 id="print">Default starting tolerances</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Starting point</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Linear, non-critical</td>
            <td>±0.015 in / ±0.4 mm</td>
          </tr>
          <tr>
            <td>Linear, critical, fixtured</td>
            <td>±0.005 in / ±0.13 mm</td>
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
      <p>
        These are starting points for{" "}
        <Link href="/processes/heavy-wire-forming">4–14 mm CNC</Link>, not a
        promise on every alloy and every span. Tighter is a fixture and a
        conversation.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/guide/design-for-wire-forming">Design for wire forming</Link>
        </li>
        <li>
          <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>
        </li>
        <li>
          <Link href="/processes/2d-cnc-wire-forming">2D CNC wire forming</Link>
        </li>
      </ul>

      <QuoteBand title="Have a print with real datums?" />
    </DocPage>
  );
}
