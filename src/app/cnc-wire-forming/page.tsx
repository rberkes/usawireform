import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { COMPANY } from "@/lib/company";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "CNC Wire Forming",
  description: `CNC wire forming in 4–14 mm: 2D and 3D from coil. ${COMPANY} — Robomac 214TF, then weld and finish.`,
  path: "/cnc-wire-forming",
  keywords: ["CNC wire forming", "2D wire forming", "3D wire forming", "Robomac 214TF"],
});

const toc = [
  { id: "what", label: "What it is" },
  { id: "2d3d", label: "2D vs 3D" },
  { id: "band", label: "4–14 mm" },
  { id: "next", label: "Related" },
];

export default function CncWireFormingPage() {
  return (
    <DocPage
      kicker="Process"
      title="CNC wire forming"
      lede="Programmable bends in round wire from coil. 2D when the part is planar. 3D when it is not. Production here is 4–14 mm."
      toc={toc}
    >
      <h2 id="what">What CNC wire forming is</h2>
      <p>
        A CNC wire former takes coil, takes out cast, feeds a length,
        and bends that length around tooling. Cutoff is usually last.
        The output is a centerline in space — a hook, a frame, a basket
        rim — not a stamping and not a machined bar. Same cell as{" "}
        <Link href="/cnc-wire-bending">CNC wire bending</Link>.
      </p>
      <p>
        {COMPANY} runs this on a{" "}
        <Link href="/equipment">Numalliance Robomac 214TF</Link>. Process
        theory:{" "}
        <Link href="/wire-forming">wire forming in the USA</Link>.
        Fabrication around the form:{" "}
        <Link href="/wire-fabrication">wire fabrication</Link>.
      </p>

      <h2 id="2d3d">Pick the axis count from the print</h2>
      <ul>
        <li>
          <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link> —
          all bends in one plane. Faster prove-out. Guards, links, flat
          frames.
        </li>
        <li>
          <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link> —
          a rotary axis so the next bend is not coplanar. Hooks, routing
          parts, 3D frames, basket geometry.
        </li>
      </ul>
      <p>
        Fourslide is a different machine for frozen high-volume 2D. We
        explain it so CNC is not sold for that job —{" "}
        <Link href="/processes/fourslide">fourslide</Link>.
      </p>

      <h2 id="band">{WIRE.metric}</h2>
      <p>
        Stock coil is{" "}
        <Link href="/sizes">3/8, 7/16, and 1/2 in</Link>. Other
        diameters in {WIRE.short} still form with{" "}
        <Link href="/quoting">tooling and coil</Link>. Below 4 mm or
        above 14 mm, the quote says so.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/cnc-wire-bending">CNC wire bending</Link>
        </li>
        <li>
          <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>
        </li>
        <li>
          <Link href="/processes/2d-cnc-wire-forming">2D CNC wire forming</Link>
        </li>
        <li>
          <Link href="/rod-bending">Rod bending</Link>
        </li>
        <li>
          <Link href="/guide/design-for-wire-forming">Design guide</Link>
        </li>
      </ul>

      <QuoteBand title="Have a STEP and a diameter?" />
    </DocPage>
  );
}
