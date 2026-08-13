import type { Metadata } from "next";
import Link from "next/link";
import { BandTable } from "@/components/BandTable";
import { DocPage, QuoteBand } from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Fourslide Wire Forming",
  description:
    "Fourslide and multislide wire forming explained: cam tooling, when it beats CNC, and why it is usually the wrong cell for 4–14 mm frames.",
};

const toc = [
  { id: "what", label: "What it is" },
  { id: "when", label: "When it wins" },
  { id: "band", label: "Vs 4–14 mm CNC" },
  { id: "not", label: "What we do not quote" },
  { id: "next", label: "Related" },
];

export default function FourslidePage() {
  return (
    <DocPage
      kicker="Process"
      title="Fourslide / multislide"
      lede="Cam-driven slides that stamp and form wire or strip in one tool. The right cell for frozen high-volume 2D clips. The wrong cell for a 12 mm 3D frame — and the reason CNC exists."
      toc={toc}
    >
      <h2 id="what">What fourslide is</h2>
      <p>
        A fourslide (multislide) machine drives tools from several directions
        with cams. Wire or strip is fed, often stamped, then formed in a
        dedicated tool. Piece price at high volume is hard to beat. The cost
        sits in the tool and in the weeks it takes to cut it.
      </p>
      <p>
        That is the opposite of{" "}
        <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link>: a program
        instead of a cam, revisions in hours instead of a tool change, and a
        worse piece price once the geometry is frozen at hundreds of thousands.
      </p>

      <h2 id="when">When fourslide is the right call</h2>
      <ul>
        <li>The part is 2D or nearly 2D.</li>
        <li>Geometry is frozen — no running changes.</li>
        <li>Volume pays for the tool (often mid five figures and up, plus time).</li>
        <li>You need stamping and forming in one hit (pierced strip, coined features).</li>
        <li>Diameter is usually well under 4 mm. 4 mm is already the tall end of the trade.</li>
      </ul>
      <p>
        If those are not true, you are shopping CNC — or you are about to
        buy a tool you will recut three times.
      </p>

      <h2 id="band">How it sits next to 4–14 mm</h2>
      <BandTable
        heading="Fourslide vs CNC"
        rows={{
          4: "Overlap zone. Simple 2D clips can still be fourslide; 3D and revisions are CNC.",
          8: "Fourslide is uncommon. CNC is the default.",
          12: "Not a fourslide job. Frames, guards, wire baskets.",
          14: "Not a fourslide job.",
        }}
      />
      <p>
        This site’s production band is{" "}
        <Link href="/processes/heavy-wire-forming">4–14 mm CNC</Link>.
        Fourslide is on the map so a buyer can tell the difference — not
        because we run a cam tool for 0.030 in clips.
      </p>

      <h2 id="not">What we do not quote</h2>
      <p>
        Light fourslide clips, music-wire snaps, and strip stampings. We will
        say so. If the part is a 2D or 3D form in 4–14 mm, it belongs on CNC,
        then weld and finish as required.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/processes/2d-cnc-wire-forming">2D CNC wire forming</Link>
        </li>
        <li>
          <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>
        </li>
        <li>
          <Link href="/wire-forming">Wire forming in the USA</Link>
        </li>
      </ul>

      <QuoteBand title="Is it actually a CNC form?" />
    </DocPage>
  );
}
