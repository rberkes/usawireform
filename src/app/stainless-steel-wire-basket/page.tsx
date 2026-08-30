import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "USA made wire baskets — Stainless Steel",
  description:
    "USA made wire baskets in stainless: 304 / 316 for wet service. USA made heat treat baskets in 330. 4–14 mm CNC, resistance weld or TIG. Northeast Ohio.",
  path: "/stainless-steel-wire-basket",
  keywords: [
    "USA made wire baskets",
    "USA made heat treat baskets",
    "stainless steel wire basket",
    "330 wire basket",
    "304 wire basket",
    "heat treat wire basket",
  ],
});

export default function StainlessBasketPage() {
  return (
    <DocPage
      kicker="Baskets"
      title="USA made wire baskets, stainless"
      lede="USA made wire baskets are the alloy plus the weld. 304/316 for washdown. USA made heat treat baskets in 330 for the furnace. Formed from coil in 4–14 mm, then resistance weld or TIG — not a chrome-plated carbon grid."
      toc={[
        { id: "grade", label: "Pick the grade" },
        { id: "make", label: "How it is made" },
        { id: "size", label: "Sizes" },
        { id: "next", label: "Related" },
      ]}
    >
      <h2 id="grade">304, 316, or 330</h2>
      <p>
        Washdown, food-adjacent, outdoor: 304 or 316, passivate named. Furnace
        and heat-treat service:{" "}
        <Link href="/330-stainless-wire-bending-usa-parts">330 (N08330)</Link>
        . Mixing those on one line is how baskets fail in the first oven cycle.
        Grade table:{" "}
        <Link href="/materials/300-series-stainless">300-series stainless</Link>
        .
      </p>

      <h2 id="make">From coil, then weld</h2>
      <p>
        USA made wire baskets start as CNC-formed members. Intersections are{" "}
        <Link href="/processes/resistance-welding">resistance welded</Link>{" "}
        when the alloy allows. 330 and some 300-series joints go to{" "}
        <Link href="/processes/mig-tig-assembly">TIG</Link>. Rims, handles,
        stacking frames — same cell. Product family:{" "}
        <Link href="/products/heavy-duty-wire-baskets">
          USA made wire baskets
        </Link>
        .
      </p>

      <h2 id="size">4–14 mm, stock 3/8 · 7/16 · 1/2 in</h2>
      <p>
        Light residential 9-gauge is not this shop. Production baskets in this
        band are industrial: plant, furnace, washdown, harvest. Custom
        dimensions: <Link href="/custom-wire-forming">custom wire forming</Link>
        .
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/330-stainless-wire-bending-usa-parts">330 stainless baskets</Link>
        </li>
        <li>
          <Link href="/stainless-steel-wire-shelf">Stainless steel wire shelf</Link>
        </li>
        <li>
          <Link href="/processes/heat-treating">Heat treating / furnace baskets</Link>
        </li>
        <li>
          <Link href="/processes/mesh-grids-and-cable-trays">Mesh grids</Link>
        </li>
        <li>
          <Link href="/wire-mesh">Wire mesh</Link> — weaves, openings, welded cloth
        </li>
      </ul>

      <QuoteBand title="Stainless basket print?" />
    </DocPage>
  );
}
