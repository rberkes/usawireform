import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import {
  QUOTE,
  coilMinRange,
  programmingFee,
  toolingRange,
} from "@/lib/quoting";
import { COMMON_SIZES, WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Common Wire Sizes: 3/8, 7/16, and 1/2 in",
  description:
    "Production wire diameters we run: 3/8 in (9.53 mm), 7/16 in (11.11 mm), and 1/2 in (12.7 mm) — CNC forming, mesh grids, cable trays, and weld.",
  path: "/sizes",
  keywords: [
    "3/8 inch wire",
    "7/16 inch wire",
    "1/2 inch wire",
    "wire diameter",
  ],
});

const toc = [
  { id: "stock", label: "Stock sizes" },
  { id: "three-eight", label: "3/8 in" },
  { id: "seven-sixteen", label: "7/16 in" },
  { id: "half", label: "1/2 in" },
  { id: "design", label: "Radius and legs" },
  { id: "band", label: "Rest of 4–14 mm" },
  { id: "tooling", label: "Tooling and coil" },
  { id: "next", label: "Related" },
];

export default function SizesPage() {
  return (
    <DocPage
      kicker="Sizes we run"
      title="3/8, 7/16, and 1/2 inch wire"
      lede="These three diameters are the stock production sizes on the floor. They sit in the middle of the 4–14 mm band — heavy enough for frames, grids, and trays, still CNC-formable."
      toc={toc}
    >
      <h2 id="stock">Stock production sizes</h2>
      <p>
        The library is written for {WIRE.label}. Quotes most often land on
        these three US fractions. Metric coil that matches is accepted;
        call the actual diameter on the print, not “equivalent.”
      </p>
      <table>
        <thead>
          <tr>
            <th>Fraction</th>
            <th>Decimal</th>
            <th>Metric</th>
            <th>Typical work</th>
          </tr>
        </thead>
        <tbody>
          {COMMON_SIZES.map((size) => (
            <tr key={size.fraction}>
              <td>{size.fraction}</td>
              <td>{size.decimal}</td>
              <td>{size.mm}</td>
              <td>{size.typical}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Carbon, stainless, and coated wire in these diameters. Full grade
        list: <Link href="/materials">materials</Link>. Finish and
        weld follow the print —{" "}
        <Link href="/processes/resistance-welding">resistance</Link>,{" "}
        <Link href="/processes/mig-tig-assembly">MIG or TIG</Link> — not
        a default by size.
      </p>

      <h2 id="three-eight">3/8 in (9.53 mm)</h2>
      <p>
        The workhorse. Light enough for a dense{" "}
        <Link href="/processes/mesh-grids-and-cable-trays">
          mesh or cable tray
        </Link>
        , stiff enough for machine-guard frames and 2D/3D forms that a
        4–6 mm clip wire cannot be. Inside radius starts at 3/8 in on
        mild carbon; stainless wants more.
      </p>
      <ul>
        <li>Cable-tray longitudinals and medium-pitch mesh</li>
        <li>Guard frames, handles, and planar outlines</li>
        <li>Wire-basket rims when the infill is lighter than the border</li>
        <li>3D hooks and routing that still have to carry load</li>
        <li>S-hooks and planar J-hooks</li>
      </ul>
      <p>
        Resistance cross-wire is routine at 3/8. MIG corners on a rim
        are the usual secondary. TIG when the rim is a jump up in
        diameter or the alloy is picky.
      </p>

      <h2 id="seven-sixteen">7/16 in (11.11 mm)</h2>
      <p>
        The step between “tray wire” and “structural.” Used when 3/8
        sags on the span and 1/2 is more steel than the assembly needs.
        Same CNC family as 3/8; straightener, cutoff, and weld force
        all go up.
      </p>
      <ul>
        <li>Heavier frames and grid borders</li>
        <li>Wire-basket and rack rims</li>
        <li>Short, high-load tray runs</li>
        <li>Guards that take a hit, not just a look</li>
        <li>Mining J-hooks and heavier hangers</li>
      </ul>
      <p>
        Do not substitute 7/16 for 3/8 (or the reverse) to “use stock.”
        Hole patterns, weld nuggets, and min legs all move. A running
        change of 1/16 in is a new first article.
      </p>

      <h2 id="half">1/2 in (12.7 mm)</h2>
      <p>
        Near the top of industrial wire CNC — under the 14 mm (0.551 in)
        ceiling, above most brochure 12 mm heads if the path is tight
        3D in stainless. Treat 1/2 in as fabrication that happens to
        start as wire: real inside radius, real legs, saw or heavy
        shear on the end.
      </p>
      <ul>
        <li>Structural frames and rod-style fixtures</li>
        <li>Heavy cable-tray sides and load-bearing rims</li>
        <li>Heat-treat / furnace frames in high-temp alloy</li>
        <li>Guards and decks where 7/16 still flexes</li>
        <li>Heavy D-rings and load-bearing closed forms</li>
      </ul>
      <p>
        Cross-wire resistance weld still works on 1/2 × 1/2; confirm
        the cell. Corners and mounts are MIG or TIG. A “clip-style”
        flatten on a 1/2 in end is the wrong picture — see{" "}
        <Link href="/processes/end-forming">end forming</Link>.
      </p>

      <h2 id="design">Radius and legs at these diameters</h2>
      <table>
        <thead>
          <tr>
            <th>Size</th>
            <th>Min IR (mild carbon)</th>
            <th>Min IR (stainless / high-tensile)</th>
            <th>Min straight between bends</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3/8 in</td>
            <td>3/8 in</td>
            <td>~9/16–3/4 in</td>
            <td>3/4–1-1/8 in</td>
          </tr>
          <tr>
            <td>7/16 in</td>
            <td>7/16 in</td>
            <td>~5/8–7/8 in</td>
            <td>7/8–1-5/16 in</td>
          </tr>
          <tr>
            <td>1/2 in</td>
            <td>1/2 in</td>
            <td>~3/4–1 in</td>
            <td>1–1-1/2 in</td>
          </tr>
        </tbody>
      </table>
      <p>
        Full rules:{" "}
        <Link href="/guide/design-for-wire-forming">
          design for wire forming
        </Link>
        . CAD with a sharp corner at 1/2 in is a crack, not a bend.
      </p>

      <h2 id="band">The rest of 4–14 mm</h2>
      <p>
        3/8, 7/16, and 1/2 are stock. Other diameters in {WIRE.short}{" "}
        still form — they are not on the floor as production coil.{" "}
        {QUOTE.exampleNonStockMm} mm is the usual example: inside the
        band, not a standard size we run, tooling required. We will not
        silently swap it for 7/16.
      </p>
      <p>
        Below 4 mm or above 14 mm: the page can still explain it; the
        quote will say no. Detail:{" "}
        <Link href="/processes/heavy-wire-forming">heavy wire forming</Link>
        . Money and coil buy-in:{" "}
        <Link href="/quoting">quotes, tooling, and coil</Link>.
      </p>

      <h2 id="tooling">Tooling, programming, and coil</h2>
      <p>
        Non-stock wire in {WIRE.short} is {toolingRange} in tooling (
        {QUOTE.year} pricing). Setup is {programmingFee} per job. If we
        do not carry the steel for a single run, the
        client buys the coil — typically {coilMinRange} depending on
        the supplier — and we run that material out.
      </p>
      <p>
        Full terms:{" "}
        <Link href="/quoting">quotes, tooling, and coil</Link>.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/quoting">Quotes, tooling, and coil</Link>
        </li>
        <li>
          <Link href="/materials">Coil materials</Link>
        </li>
        <li>
          <Link href="/processes/heavy-wire-forming">
            Heavy wire forming, 4–14 mm
          </Link>
        </li>
        <li>
          <Link href="/processes/mesh-grids-and-cable-trays">
            Mesh grids and cable trays
          </Link>
        </li>
        <li>
          <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link> ·{" "}
          <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link>
        </li>
        <li>
          <Link href="/capabilities">Capabilities</Link>
        </li>
      </ul>

      <QuoteBand title="Have a 3/8, 7/16, or 1/2 in form?" />
    </DocPage>
  );
}
