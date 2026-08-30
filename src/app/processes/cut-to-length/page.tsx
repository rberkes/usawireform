import Link from "next/link";
import { BandTable } from "@/components/BandTable";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Cut-to-Length Wire",
  description: "Cut-to-length for 4–14 mm wire forming: in-line shear vs saw, end deformation, length tolerance, and when cutoff is a separate station.",
  path: '/processes/cut-to-length',
  keywords: [
    "cut to length",
    "wire forming process",
    "4-14 mm",
    "CNC",
  ],
});

const toc = [
  { id: "what", label: "What it is" },
  { id: "how", label: "Shear vs saw" },
  { id: "band", label: "4–14 mm" },
  { id: "print", label: "Ends and length" },
  { id: "next", label: "Related" },
];

export default function CutToLengthPage() {
  return (
    <DocPage
      kicker="Process"
      title="Cut-to-length"
      lede="Every CNC form ends in a cut. In 4–14 mm that cut is a process decision: shear is fast and leaves a fingerprint; saw is slower and cleaner. The print has to say what the end is allowed to look like."
      toc={toc}
    >
      <h2 id="what">What cut-to-length is</h2>
      <p>
        Cut-to-length is the station that separates the finished centerline
        from the coil. On a{" "}
        <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link> or{" "}
        <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link> cell it is
        usually in-line: feed, bend, cut. Some jobs are cut first and formed
        as blanks — short runs, huge diameters, or ends that need a saw face
        before any bend.
      </p>
      <p>
        Length tolerance is not the same as centerline tolerance. A ±1 mm cut
        on a 400 mm frame leg is often invisible. A ±1 mm cut on a pin that
        has to bottom in a hole is a reject.
      </p>

      <h2 id="how">Shear vs saw</h2>
      <p>
        <strong>Bushing shear / knife</strong> — the default on CNC wire
        formers. Fast, no chip, slight end deformation (a “smile” or a
        pulled face). Fine when the end is a weld prep, gets a chamfer, or
        disappears into a plastic boss. Wrong when the end is a bearing
        surface or a visible cosmetic face.
      </p>
      <p>
        <strong>Saw</strong> — square face, slower, chips to manage. Used
        when the end is inspected as a face, when deformation from shear
        would crack a coating, or when 12–14 mm high-tensile shears ugly.
      </p>
      <p>
        Square cut is the default. Chamfer, coin, flatten, and thread are{" "}
        <Link href="/processes/end-forming">end forming</Link>, usually after
        the cut — sometimes in the same cell, sometimes as a secondary.
      </p>

      <h2 id="band">What changes from 4 to 14 mm</h2>
      <BandTable
        heading="Cutoff"
        rows={{
          4: "In-line shear is typical. End smile is small; chamfer covers it.",
          8: "Shear still wins on cycle time. Call out if the end is a weld or a hole entry.",
          12: "Shear deformation is obvious. Saw or a dedicated end station if the face is critical.",
          14: "Heavy shear or saw. Light bushing nicks do not belong on this diameter.",
        }}
      />

      <h2 id="print">What the print should say</h2>
      <ul>
        <li>Overall length and which datum it is taken from</li>
        <li>End condition: square, shear-ok, sawn, chamfer, or “form after cut”</li>
        <li>Whether burr is allowed, and on which side</li>
        <li>If the cut face is a weld joint, say so — flash and fit-up change</li>
      </ul>
      <p>
        “Cut to length, deburr” is not enough on 12 mm stainless that has to
        slip into a tube. Put the end on the same drawing as the centerline.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/processes/wire-straightening">Wire straightening</Link>
        </li>
        <li>
          <Link href="/processes/end-forming">End forming</Link>
        </li>
        <li>
          <Link href="/processes/wire-form-shapes">Wire form shapes</Link>{" "}
          — the rest of the alphabet after a straight
        </li>
        <li>
          <Link href="/guide/design-for-wire-forming">Design for wire forming</Link>
        </li>
      </ul>

      <QuoteBand title="Have a length and an end condition?" />
    </DocPage>
  );
}
