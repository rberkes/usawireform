import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Forming in the USA",
  description: "Wire forming in the 4–14 mm band: 3D CNC, heavy frames, wire baskets, guards, and how the USA process map fits together.",
  path: '/wire-forming',
  keywords: [
    "wire forming USA",
    "heavy wire forming",
    "3D CNC",
  ],
});

const toc = [
  { id: "definition", label: "Definition" },
  { id: "map", label: "Process map" },
  { id: "cnc", label: "CNC forming" },
  { id: "usa", label: "USA production" },
  { id: "parts", label: "What parts look like" },
  { id: "next", label: "Related pages" },
];

export default function WireFormingPillarPage() {
  return (
    <DocPage
      kicker="Reference"
      title="Wire forming in the USA"
      lede="Wire forming takes round wire from coil and turns it into a specified 2D or 3D shape. Our corp headquarters runs 4–14 mm — frames, wire baskets, guards, trays, and routing forms — not music-wire clips."
      toc={toc}
    >
      <h2 id="definition">A working definition</h2>
      <p>
        Wire forming starts with a coil of specified alloy and diameter. Headquarters
        straightens that wire, feeds it, bends it to a centerline,
        cuts it, and often adds end work or a weld. The part is the wire. There
        is no blank, no chip, no mold. Geometry comes from bend sequence and
        tooling, not from a cutter path through solid stock.
      </p>
      <p>
        That is different from spring coiling (the product is a coil with a
        spring rate), from stamping (the product starts as strip), and from
        tube bending (hollow section, different wrinkle and support rules).
        Overlap exists — some CNC formers coil, some fourslides stamp and
        form — but the discipline is still: <strong>specified wire, specified
        centerline, specified ends</strong>.
      </p>

      <h2 id="map">The process map</h2>
      <p>USA wire form production usually sits in one of these lanes:</p>
      <table>
        <thead>
          <tr>
            <th>Lane</th>
            <th>What it is</th>
            <th>When it wins</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link>
            </td>
            <td>Planar CNC feed and bend</td>
            <td>Flat parts, revisions, mid volume</td>
          </tr>
          <tr>
            <td>
              <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link>
            </td>
            <td>CNC with a rotary / torsion axis</td>
            <td>Routing forms, complex hooks, frames</td>
          </tr>
          <tr>
            <td>Fourslide / multislide</td>
            <td>Cam tooling, often with stamping</td>
            <td>Frozen high volume, simple geometry</td>
          </tr>
          <tr>
            <td>Hand / fixture</td>
            <td>Benches, jigs, low control</td>
            <td>One-offs only — not production</td>
          </tr>
          <tr>
            <td>Secondaries</td>
            <td>Ends, welds, plate, passivate</td>
            <td>When the form must install as-is</td>
          </tr>
        </tbody>
      </table>
      <p>
        Process pages for each lane:{" "}
        <Link href="/processes">all wire form processes</Link>.
      </p>

      <h2 id="cnc">Why CNC is the center of gravity</h2>
      <p>
        CNC wire forming moved the trade from dedicated cams to a program.
        That matters in the USA because prints move. Automotive running
        changes, medical lot sizes, and industrial equipment that never quite
        freezes are a bad fit for a twelve-week tool. They are a good fit for
        a 3D CNC prove-out measured in days.
      </p>
      <p>
        CNC does not automatically beat fourslide on piece price at 500,000
        identical 2D clips. The call is volume, revision risk, and geometry.
        The 3D lane is{" "}
        <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>.
      </p>

      <h2 id="usa">USA production</h2>
      <p>
        Our corp headquarters has 50+ years of industry experience in Northeast Ohio.
        The region sits on mills and wire drawers, so 4–14 mm coil is
        short-haul and forming plus secondaries stay in one building —{" "}
        <Link href="/cleveland">why Northeast Ohio</Link>.
        Wire forms are what we run here: 2D and 3D CNC in 4–14 mm, then
        resistance weld, MIG, and TIG. Prints move. Lots are mixed.
        That is why CNC is the center of the floor, and why the work is
        domestic — the sectors on the{" "}
        <Link href="/industries">industries</Link> pages, plus{" "}
        <Link href="/products">the 3/8, 7/16, and 1/2 in directory</Link>{" "}
        we sell ourselves.
      </p>
      <p>
        If a diameter or a process is outside 4–14 mm, we will still
        describe it on the process pages, and the quote will say no.
      </p>

      <h2 id="parts">What the parts actually are</h2>
      <ul>
        <li>Frames, guards, and handles</li>
        <li>Wire baskets, racks, carts, and display wire</li>
        <li>Heat-treat and furnace rod frames</li>
        <li>
          Seat frames, headrest and lock rods —{" "}
          <Link href="/industries/automotive">automotive</Link>
        </li>
        <li>Heavy hooks, S-hooks, D-rings, and load-bearing routing</li>
        <li>J-hooks and cable hangers for mines, solar, and plants</li>
      </ul>
      <p>
        If the function is a stored energy coil with a rate, you want a spring
        maker (usually well under 4 mm). If the function is a shape in 4–14 mm
        wire, it belongs here. Detail:{" "}
        <Link href="/processes/heavy-wire-forming">heavy wire forming</Link>.
      </p>

      <h2 id="next">Related pages</h2>
      <ul>
        <li>
          <Link href="/wire-fabrication">Wire fabrication, 4–14 mm</Link>
        </li>
        <li>
          <Link href="/processes/heavy-wire-forming">
            Heavy wire forming, 4–14 mm
          </Link>
        </li>
        <li>
          <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>
        </li>
        <li>
          <Link href="/processes/2d-cnc-wire-forming">2D CNC wire forming</Link>
        </li>
        <li>
          <Link href="/guide/design-for-wire-forming">
            Design for wire forming
          </Link>
        </li>
        <li>
          <Link href="/processes">Process index</Link> — straighten, cut,
          end form, weld, finish, inspect
        </li>
      </ul>

      <QuoteBand />
    </DocPage>
  );
}
