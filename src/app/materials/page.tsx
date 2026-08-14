import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import {
  carbonAndSpring,
  copperAlloys,
  lowCarbon,
  stainless300,
} from "@/lib/materials";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Forming Materials from Coil",
  description: "Coil materials for 4–14 mm wire forming: cold-roll 1010 and 1018, medium and high spring steels, 300-series stainless including 330, brass, and copper.",
  path: '/materials',
  keywords: [
    "wire forming materials",
    "1018 wire",
    "300 series stainless",
  ],
});

const toc = [
  { id: "run", label: "What we run" },
  { id: "spec", label: "How to spec" },
  { id: "carbon", label: "1010, 1018, low carbon" },
  { id: "spring", label: "Spring steels" },
  { id: "stainless", label: "300-series stainless" },
  { id: "330", label: "330 coil" },
  { id: "copper", label: "Brass and copper" },
  { id: "coat", label: "Coatings" },
  { id: "sizes", label: "At 3/8, 7/16, 1/2" },
  { id: "next", label: "Related" },
];

function GradeTable({
  heading,
  rows,
}: {
  heading: string;
  rows: { grade: string; notes: string }[];
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Grade</th>
          <th>{heading}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.grade}>
            <td>{row.grade}</td>
            <td>{row.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function MaterialsPage() {
  return (
    <DocPage
      kicker="Materials"
      title="Coil materials we form"
      lede="Cold-roll 1010 and 1018, medium-to-high spring steels, the 300-series stainlesses including 330, brass, and copper — all from coil, in the 4–14 mm band, with 3/8, 7/16, and 1/2 in as stock diameters."
      toc={toc}
    >
      <h2 id="run">What we process from coil</h2>
      <p>
        Wire forming starts with a coil, not a bar. The cert on that coil
        is the process: alloy, tensile or temper, coating, and diameter.
        “Spring steel” and “stainless” are not grades. They are how
        first articles fail.
      </p>
      <p>
        Production here is {WIRE.label}, stock sizes{" "}
        <Link href="/sizes">3/8, 7/16, and 1/2 in</Link>. Other coil in
        the band still runs. Music-wire clips and 0.020 in 302 are a
        different cell — explained on the map, not quoted as 1/2 in
        work.
      </p>

      <h2 id="spec">What the print has to name</h2>
      <ul>
        <li>AISI / UNS / ASTM grade — 1018, 304, 330, C260, not a family name</li>
        <li>Tensile, temper, or condition (annealed, hard-drawn, oil-tempered)</li>
        <li>Coating: bare, galvanized class, pre-paint — and whether it is pre- or post-form</li>
        <li>Diameter as a number, not “or equivalent 7/16”</li>
      </ul>
      <p>
        Swapping 304 for 302, or 1010 for 1060, without a new article
        changes springback, weld, and sometimes the crack at the inside
        radius. Detail:{" "}
        <Link href="/guide/design-for-wire-forming">design for wire forming</Link>.
      </p>

      <h2 id="carbon">Cold-roll carbon: 1010, 1018, and neighbors</h2>
      <p>
        1010 and 1018 are the stock carbon coils. Cold-rolled / cold-drawn
        forming wire, not hot-roll bar. They weld with{" "}
        <Link href="/processes/resistance-welding">resistance</Link> and{" "}
        <Link href="/processes/mig-tig-assembly">MIG</Link>, take zinc
        and powder after form, and hold a 1× diameter inside radius on
        mild coil. Frames,{" "}
        <Link href="/processes/mesh-grids-and-cable-trays">
          grids and cable trays
        </Link>
        , guards, and most 2D/3D industrial forms start here.
      </p>
      <GradeTable heading="In the cell" rows={lowCarbon} />

      <h2 id="spring">Medium and high spring steels</h2>
      <p>
        Once carbon and draw go up, the part is a spring whether the
        print says so or not. Springback compensation lives in the
        program. Min inside radius moves toward 1.5–2× diameter.
        Hydrogen bake after acid zinc is not optional on high-tensile.
      </p>
      <p>
        We run medium-to-high spring steels from coil in this band when
        the head, the radius, and the tensile fit. Hard-drawn and
        oil-tempered industrial grades at 3/8–1/2 in are real jobs.
        ASTM A228 music wire is usually far below 4 mm — a different
        trade, still listed so it is not confused with 1018.
      </p>
      <GradeTable heading="In the cell" rows={carbonAndSpring} />

      <h2 id="stainless">300-series stainless, from coil</h2>
      <p>
        Austenitic 300-series is the stainless we form. Deep page:{" "}
        <Link href="/materials/300-series-stainless">
          300-series stainless
        </Link>
        . More springback than 1018, more galling in tools, passivate
        after form and weld — not paint. Do not write “SS” on a grid
        that has to live in a furnace. That is how 304 gets quoted as
        330.
      </p>
      <GradeTable heading="Coil notes" rows={stainless300} />
      <p>
        303 is a free-machining grade. It is not a forming coil we
        stock or recommend. If the print says 303 wire, ask whether
        they meant 304 or 302.
      </p>

      <h2 id="330">330 stainless in coil</h2>
      <p>
        330 (UNS N08330) is a nickel-chromium high-temperature alloy
        sold as wire and rod. It is the usual coil for heat-treat
        wire baskets, furnace fixtures, and grids that see air at
        temperature that would scale 304 in a week. It is not “high
        300-series.” Nickel content, price, and forming load are in
        another class.
      </p>
      <ul>
        <li>Stock topic for{" "}
          <Link href="/processes/heat-treating">heat-treat wire baskets</Link>{" "}
          and rod frames in this shop’s diameter band</li>
        <li>Inside radius on the generous side — treat it like high-Ni, not like 304</li>
        <li>
          <Link href="/processes/mig-tig-assembly">TIG</Link> is the
          honest join on a lot of 330 fixtures; confirm resistance weld
          before you assume a grid nugget
        </li>
        <li>Service temperature and load belong on the quote, not just “330 wire basket”</li>
      </ul>

      <h2 id="copper">Brass and copper</h2>
      <p>
        Soft coil, tight radii, easy to mark, easy to overbend. Electrical
        forms, grounding, decorative grids, and any part that cannot be
        steel. Tools and straighteners that are right for 1018 will
        skate or bruise C110. Keep a clean, dedicated setup.
      </p>
      <GradeTable heading="Coil notes" rows={copperAlloys} />
      <p>
        Finish is usually none, or a specified lacquer / plate. Welding
        copper and brass is not the same as welding 1018 — say if the
        joint is soldered, brazed, or fusion-welded.
      </p>

      <h2 id="coat">Coatings on steel coil</h2>
      <p>
        Pre-galvanized and pre-painted carbon is cheaper at volume and
        ugly at a tight inside radius. Welds burn the coat locally.
        Form-then-zinc or form-then-powder is the cleaner path on{" "}
        <Link href="/sizes">3/8–1/2 in</Link> frames and trays. Stainless
        is passivate. Full sequence:{" "}
        <Link href="/processes/plating-and-coating">plating and coating</Link>.
      </p>

      <h2 id="sizes">How grade meets 3/8, 7/16, and 1/2 in</h2>
      <table>
        <thead>
          <tr>
            <th>Size</th>
            <th>Typical coil</th>
            <th>Watch</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3/8 in</td>
            <td>1010 / 1018, 304, 316, C260, medium spring</td>
            <td>Pre-galv mesh; 301 work-hardening on a tight path</td>
          </tr>
          <tr>
            <td>7/16 in</td>
            <td>1018, 304, 330 rims, higher-carbon spring</td>
            <td>Do not swap 3/8 and 7/16 to “use stock”</td>
          </tr>
          <tr>
            <td>1/2 in</td>
            <td>1018 frames, 330 fixtures, heavy 304, high-carbon</td>
            <td>Head, IR, and weld force — this is fabrication that started as wire</td>
          </tr>
        </tbody>
      </table>
      <p>
        400-series (410, 430) and aluminum show up on prints. We will
        say whether that coil belongs in this cell. Inconel and other
        nickel alloys beyond 330 are a cert-and-conversation job, not
        a 1018 setup with the pressure turned up.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/wire-fabrication">Wire fabrication, 4–14 mm</Link>{" "}
          — carbon, stainless, ferrous, and non-ferrous
        </li>
        <li>
          <Link href="/materials/300-series-stainless">
            300-series stainless
          </Link>{" "}
          — 301 through 330
        </li>
        <li>
          <Link href="/sizes">3/8, 7/16, and 1/2 in</Link>
        </li>
        <li>
          <Link href="/quoting">Quotes, tooling, and coil</Link> — mill
          minimums when we do not carry the steel
        </li>
        <li>
          <Link href="/guide/design-for-wire-forming">Design for wire forming</Link>
        </li>
        <li>
          <Link href="/processes/heat-treating">Heat treating</Link> — 330
          wire baskets vs stress-relief
        </li>
        <li>
          <Link href="/processes/plating-and-coating">Plating and coating</Link>
        </li>
        <li>
          <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>
        </li>
        <li>
          <Link href="/materials/stainless-steel-304-wire-forming">
            304 stainless wire forming
          </Link>
        </li>
        <li>
          <Link href="/materials/stainless-steel-316-wire-forming">
            316 stainless wire forming
          </Link>
        </li>
        <li>
          <Link href="/materials/carbon-steel-wire-forming">
            Carbon steel wire forming
          </Link>
        </li>
      </ul>

      <QuoteBand title="Have a grade and a diameter?" />
    </DocPage>
  );
}
