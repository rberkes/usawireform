import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { COMPANY } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Forming Manufacturers",
  description:
    "USA Wire Form is a U.S. wire forming manufacturer: 4–14 mm 3D CNC from coil, weld, and finish. Northeast Ohio headquarters. Not a trading company.",
  path: "/wire-forming-manufacturers",
  keywords: [
    "wire forming manufacturers",
    "USA wire forming manufacturer",
    "CNC wire form manufacturer",
  ],
});

export default function ManufacturersPage() {
  return (
    <DocPage
      kicker="Manufacturer"
      title="Wire forming manufacturers"
      lede={`${COMPANY} manufactures 4–14 mm wire forms in the United States. Coil in, CNC bend, cut, weld, inspect. Headquarters in Northeast Ohio.`}
      toc={[
        { id: "who", label: "Who we are" },
        { id: "run", label: "What a manufacturer runs" },
        { id: "not", label: "What we are not" },
        { id: "next", label: "Related" },
      ]}
    >
      <h2 id="who">A manufacturer, not a broker</h2>
      <p>
        The forming cell is on our floor: Numalliance Robomac 214TF, straightening,
        cutoff, resistance weld, TIG/MIG, granite. Named list on{" "}
        <Link href="/equipment">equipment</Link>. 50+ years of industry
        experience. Production quotes start at 100 pieces.
      </p>
      <p>
        If you are comparing wire forming manufacturers, ask where the CNC sits,
        what diameter band they stock, and whether weld and finish leave the
        building. Ours do not, unless the spec forces an outside treat.
      </p>

      <h2 id="run">What this manufacturer runs</h2>
      <ul>
        <li>3D and 2D CNC from coil, 4–14 mm</li>
        <li>Stock 3/8, 7/16, 1/2 in</li>
        <li>
          <Link href="/330-stainless-wire-bending-usa-parts">330 stainless</Link>{" "}
          heat-treat baskets
        </li>
        <li>Carbon, 300-series, brass, copper —{" "}
          <Link href="/materials">materials</Link>
        </li>
        <li>
          <Link href="/secondary-operations">Secondaries</Link>: resistance weld,
          TIG, end forming, plate, powder
        </li>
      </ul>

      <h2 id="not">Not a mill, not a catalog of every SIC</h2>
      <p>
        We buy coil from U.S. mills and drawers. We are not a steel mill. “Steel
        wire manufacturers” as a mill search is a different trade — see{" "}
        <Link href="/steel-wire-manufacturers-in-usa">
          steel wire manufacturers in the USA
        </Link>
        . We form that wire into parts.
      </p>
      <p>
        Other U.S. shops, company cards:{" "}
        <Link href="/wire-form-factories-in-usa">
          wire form factories in the USA
        </Link>
        . Full list including Canada:{" "}
        <Link href="/directory">directory</Link>. Near you by ZIP:{" "}
        <Link href="/wire-forming-companies-near-me">companies near me</Link>.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/custom-wire-forming">Custom wire forming</Link>
        </li>
        <li>
          <Link href="/wire-forming-process">Wire forming process</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>

      <QuoteBand title="Manufacturer quote from a print?" />
    </DocPage>
  );
}
