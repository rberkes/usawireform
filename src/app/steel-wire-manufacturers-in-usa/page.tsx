import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Steel Wire Manufacturers in the USA",
  description:
    "USA Wire Form is a U.S. wire former, not a mill. We buy American coil — carbon, stainless including 330 — and CNC-form 4–14 mm parts in Northeast Ohio.",
  path: "/steel-wire-manufacturers-in-usa",
  keywords: [
    "steel wire manufacturers in USA",
    "American steel wire",
    "USA wire coil",
  ],
});

export default function SteelWireManufacturersPage() {
  return (
    <DocPage
      kicker="USA coil"
      title="Steel wire manufacturers in the USA"
      lede="Mills and drawers make wire. We form it. Headquarters sits in the steel corridor so 4–14 mm coil is short-haul — then CNC, cut, and weld. Honest split. Same country."
      toc={[
        { id: "split", label: "Mill vs former" },
        { id: "why", label: "Why Ohio" },
        { id: "grades", label: "Grades we form" },
        { id: "next", label: "Related" },
      ]}
    >
      <h2 id="split">We are not a mill</h2>
      <p>
        “Steel wire manufacturers in the USA” usually means rod mills and wire
        drawers. USA Wire Form is the next plant: specified coil in, specified
        centerline out. Calling ourselves a mill would be a lie. Buying U.S.
        coil and forming it in Ohio is the work.
      </p>
      <p>
        If you need mill-direct rod or a drawing house, that is a different PO.
        If you need frames, baskets, guards, or 330 furnace fixtures from that
        coil, that is this shop —{" "}
        <Link href="/wire-forming-manufacturers">wire forming manufacturers</Link>
        .
      </p>

      <h2 id="why">Why the corridor</h2>
      <p>
        Northeast Ohio still has mill capacity and drawers. Short-haul coil is
        inbound cost, not a slogan. Location:{" "}
        <Link href="/cleveland">Northeast Ohio</Link>. State pages:{" "}
        <Link href="/ohio">/ohio</Link> and{" "}
        <Link href="/wire-forming-companies-near-me">near me</Link>.
      </p>

      <h2 id="grades">What we run from that coil</h2>
      <ul>
        <li>1010 / 1018 carbon — stock forming wire</li>
        <li>Medium and high carbon / spring grades</li>
        <li>300-series including 304, 316, and 330 (N08330)</li>
        <li>Brass and copper when the print is electrical or decorative</li>
      </ul>
      <p>
        Band is 4–14 mm, cut-to-length through 14 mm rod. List:{" "}
        <Link href="/materials">materials</Link>. 330 furnace work:{" "}
        <Link href="/330-stainless-wire-bending-usa-parts">330 stainless parts</Link>
        .
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/custom-wire-forming">Custom wire forming</Link>
        </li>
        <li>
          <Link href="/wire-fabrication">Wire fabrication</Link>
        </li>
        <li>
          <Link href="/directory">Other U.S. shops</Link>
        </li>
      </ul>

      <QuoteBand title="U.S. coil, U.S. form?" />
    </DocPage>
  );
}
