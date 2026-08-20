import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Stainless Steel Wire Shelf",
  description:
    "Stainless steel wire shelves from 4–14 mm coil: 304 / 316 frames and infill, CNC form, resistance weld or TIG. Not a 9-gauge closet rack.",
  path: "/stainless-steel-wire-shelf",
  keywords: [
    "stainless steel wire shelf",
    "stainless wire shelving",
    "304 wire shelf",
  ],
});

export default function StainlessShelfPage() {
  return (
    <DocPage
      kicker="Shelves"
      title="Stainless steel wire shelf"
      lede="A shelf in this shop is a formed frame and a welded grid in 4–14 mm wire — 304 or 316 when wet, carbon when it is a plant rack. CNC from coil, then weld. Closet 9-gauge is not the quote."
      toc={[
        { id: "what", label: "What we build" },
        { id: "grade", label: "Grade" },
        { id: "make", label: "Form and weld" },
        { id: "next", label: "Related" },
      ]}
    >
      <h2 id="what">Industrial shelf, not retail wire</h2>
      <p>
        Load, span, and washdown drive diameter. Stock production wire is 3/8,
        7/16, and 1/2 in. Catalog cousin:{" "}
        <Link href="/products/wire-shelves">wire shelves</Link>. Custom length
        or a stainless spec is{" "}
        <Link href="/custom-wire-forming">custom wire forming</Link>.
      </p>

      <h2 id="grade">When it is stainless</h2>
      <p>
        304 for general wet and food-adjacent. 316 when chlorides sit on the
        grid. 330 is the wrong shelf alloy unless the shelf lives in a furnace
        — then it is a fixture, see{" "}
        <Link href="/330-stainless-wire-bending-usa-parts">330 parts</Link> and{" "}
        <Link href="/stainless-steel-wire-basket">stainless baskets</Link>.
      </p>

      <h2 id="make">CNC frame, welded infill</h2>
      <p>
        Frame members run on 3D CNC. Infill is resistance-welded on carbon and
        many 304 grids; TIG on the joints that resistance will not take. Same
        secondaries as baskets:{" "}
        <Link href="/secondary-operations">secondary operations</Link>. Process
        depth:{" "}
        <Link href="/processes/mesh-grids-and-cable-trays">
          mesh grids and trays
        </Link>
        .
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/products/wire-racks">Wire racks</Link>
        </li>
        <li>
          <Link href="/wire-forming-process">Wire forming process</Link>
        </li>
        <li>
          <Link href="/contact">Quote</Link>
        </li>
      </ul>

      <QuoteBand title="Stainless shelf dimensions?" />
    </DocPage>
  );
}
