import Link from "next/link";
import { BandTable } from "@/components/BandTable";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Heat Treating Wire Forms",
  description: "Heat treating of 4–14 mm wire forms, vs USA made heat treat baskets as a product from 330 coil.",
  path: '/processes/heat-treating',
  keywords: [
    "USA made heat treat baskets",
    "USA made wire baskets",
    "heat treating",
    "wire forming process",
    "4-14 mm",
    "CNC",
  ],
});

const toc = [
  { id: "two", label: "Two different things" },
  { id: "form", label: "Treating the form" },
  { id: "baskets", label: "Heat-treat wire baskets" },
  { id: "band", label: "4–14 mm" },
  { id: "next", label: "Related" },
];

export default function HeatTreatingPage() {
  return (
    <DocPage
      kicker="Process"
      title="Heat treating"
      lede="Two jobs share this name: stress-relieving a bent wire, and USA made heat treat baskets that go into someone else’s furnace. This site quotes the second as a product. The first is specified when the alloy and the weld demand it."
      toc={toc}
    >
      <h2 id="two">Two different things</h2>
      <p>
        <strong>Heat treating the form</strong> — anneal or stress-relieve
        after severe bends or after{" "}
        <Link href="/processes/mig-tig-assembly">weld</Link>, so the part
        does not walk in service or crack at a cold-worked radius.
      </p>
      <p>
        <strong>USA made heat treat baskets and rod frames</strong> — wire products
        that live in a furnace. Material is the process: 330 stainless,
        Inconel, and other high-temp alloys, usually in the upper half of{" "}
        <Link href="/processes/heavy-wire-forming">4–14 mm</Link>, often
        welded into a grid. The wire basket is the part. The furnace is the
        customer’s.
      </p>
      <p>
        Mixing those on one capabilities line is how catalog sites confuse
        buyers. They are not the same quote.
      </p>

      <h2 id="form">When the form itself needs heat</h2>
      <ul>
        <li>Heavy cold work in high-tensile or stainless at a tight radius</li>
        <li>Welded frames that must hold a hole pattern after cool-down</li>
        <li>A spec that calls out stress relief or a hardness after form</li>
      </ul>
      <p>
        Mild 1018 frames usually do not get a furnace trip. 302/304 with a
        1× diameter inside radius might. If the print is silent, do not
        assume a heat treat — it changes cost, color, and sometimes coating
        adhesion.
      </p>
      <p>
        We explain the requirement and will say when a job needs a treat we
        do not run in-cell. Production quotes stay in the forming and join
        work unless the spec is explicit.
      </p>

      <h2 id="baskets">USA made heat treat baskets</h2>
      <p>
        USA made heat treat baskets are a product of their own: diameter, alloy,
        weld, and whether the grid has to survive 1800 °F without sagging.
        Carbon steel is the wrong answer. 330 and nickel alloys are the
        usual right ones. Design rules still apply —{" "}
        <Link href="/guide/design-for-wire-forming">radii and legs</Link>{" "}
        — but the material cert is the first page of the quote. See{" "}
        <Link href="/products/heavy-duty-wire-baskets">
          USA made heat treat baskets
        </Link>
        .
      </p>
      <p>
        Send the print with alloy and service temperature. Do not send
        “stainless wire basket” and expect 330.
      </p>

      <h2 id="band">Diameter still matters</h2>
      <BandTable
        heading="Heat"
        rows={{
          4: "Stress relief is uncommon. Light wire baskets exist; high-temp grids are usually heavier.",
          8: "Common furnace-fixture wire. Alloy and weld beat diameter in the quote.",
          12: "Rod-frame and heavy wire-basket territory. Sag and weld quality at temperature.",
          14: "Structural furnace fixtures. Not a clip. Spec alloy, temp, and load.",
        }}
      />

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/materials/300-series-stainless">
            300-series stainless
          </Link>{" "}
          — including 330 coil
        </li>
        <li>
          <Link href="/processes/resistance-welding">Resistance welding</Link>
        </li>
        <li>
          <Link href="/processes/mig-tig-assembly">MIG / TIG assembly</Link>
        </li>
        <li>
          <Link href="/products/heavy-duty-wire-baskets">
            USA made heat treat baskets
          </Link>
        </li>
        <li>
          <Link href="/330-stainless-wire-bending-usa-parts">
            330 stainless USA parts
          </Link>
        </li>
      </ul>

      <QuoteBand title="Have a wire basket or a stress-relief spec?" />
    </DocPage>
  );
}
