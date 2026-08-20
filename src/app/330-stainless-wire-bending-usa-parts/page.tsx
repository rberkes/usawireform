import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "330 Stainless Wire Bending USA Parts",
  description:
    "330 stainless (N08330) wire forming in the USA: heat-treat baskets and furnace fixtures from coil, 4–14 mm, cut-to-length, resistance weld and TIG. Not 304 with a bigger number.",
  path: "/330-stainless-wire-bending-usa-parts",
  keywords: [
    "330 stainless wire bending",
    "330 stainless USA",
    "heat treat wire baskets",
    "N08330 wire forming",
  ],
});

const toc = [
  { id: "why", label: "Why 330" },
  { id: "baskets", label: "Heat-treat baskets" },
  { id: "capacity", label: "Capacity" },
  { id: "weld", label: "Weld" },
  { id: "coil", label: "From coil" },
  { id: "next", label: "Related" },
];

export default function Stainless330Page() {
  return (
    <DocPage
      kicker="330 · N08330"
      title="330 stainless wire bending, USA parts"
      lede="Heat-treat wire baskets and furnace fixtures in 330 (N08330). Formed from coil in 4–14 mm — cut-to-length through 14 mm rod — then resistance weld or TIG. 304 is the wrong alloy for a furnace."
      toc={toc}
    >
      <h2 id="why">Why we run 330</h2>
      <p>
        Buyers search “330 stainless.” Metallurgically it is a nickel-chromium
        high-temp alloy, UNS N08330, not a 300-series cousin of 304. It holds
        strength and oxidation resistance in furnace air where 304 sags and
        scales. That is why heat-treat wire baskets, rod frames, and fixtures
        are quoted in 330, not “stainless.”
      </p>
      <p>
        We will form other 300-series — 304, 316, 321 — when the service is
        wet, food, or outdoor. Furnace service is 330 until the print names a
        nickel alloy. More grades on{" "}
        <Link href="/materials/300-series-stainless">300-series stainless</Link>
        . Carbon and spring steels stay on{" "}
        <Link href="/materials">materials</Link>.
      </p>
      <p>
        Springback is real. 330 does not copy a 1018 radius. The print should
        name inside radius, not “make it like the carbon version in stainless.”
      </p>

      <h2 id="baskets">Heat-treat wire baskets</h2>
      <p>
        Two jobs share the words heat treat. We quote the product: the basket
        that goes into someone else’s furnace. Stress-relieving a carbon form
        after bend is a different line — see{" "}
        <Link href="/processes/heat-treating">heat treating</Link>.
      </p>
      <p>
        A 330 basket is diameter, mesh or rod spacing, weld, and whether the
        grid has to survive ~1800 °F without droop. Rims are often 7/16 or 1/2
        in. Infill can be lighter if the print allows. We form the members on
        the Robomac, then join. Typical product family:{" "}
        <Link href="/products/heavy-duty-wire-baskets">
          heavy-duty wire baskets
        </Link>
        .
      </p>

      <h2 id="capacity">What the cell will run</h2>
      <ul>
        <li>4–14 mm (0.157–0.551 in) from coil</li>
        <li>Stock production diameters 3/8, 7/16, and 1/2 in</li>
        <li>Cut-to-length up to 14 mm rod</li>
        <li>2D and 3D CNC on the Numalliance Robomac</li>
        <li>100-piece minimum on production quotes</li>
      </ul>
      <p>
        Below 4 mm or above 14 mm, the quote says no. Light music-wire clips
        are not this shop. Equipment list:{" "}
        <Link href="/equipment">equipment</Link>. Band page:{" "}
        <Link href="/processes/heavy-wire-forming">heavy wire forming</Link>.
      </p>

      <h2 id="weld">Resistance weld vs TIG</h2>
      <p>
        Cross-wire resistance weld is fast on carbon baskets. 330 often is not
        a clean resistance candidate — nickel content, heat input, and electrode
        life. Then the joint is{" "}
        <Link href="/processes/mig-tig-assembly">TIG</Link> with a nickel-bearing
        filler, not “stainless rod.” Resistance weld still applies on carbon
        rims and on 300-series that the print allows —{" "}
        <Link href="/processes/resistance-welding">resistance welding</Link>.
      </p>
      <p>
        Secondary operations live in the same building: cutoff, end work, MIG,
        TIG, inspect. Finish on 330 is usually as-welded / pickled / passivate
        as specified — not a zinc that will not survive the furnace. Map:{" "}
        <Link href="/secondary-operations">secondary operations</Link>.
      </p>

      <h2 id="coil">From coil, not bar stock leftovers</h2>
      <p>
        Parts start as coil. Straighten, feed, bend, cut. Cut-to-length is
        in-line or a separate shear when the blank is long —{" "}
        <Link href="/processes/cut-to-length">cut-to-length</Link>. We do not
        pretend a 14 mm 330 rod is a 9-gauge clip.
      </p>
      <p>
        USA production. Headquarters in{" "}
        <Link href="/cleveland">Northeast Ohio</Link>, next to the steel
        corridor. State pages if you searched by location:{" "}
        <Link href="/wire-forming-companies-near-me">companies near me</Link>.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/stainless-steel-wire-basket">Stainless steel wire basket</Link>
        </li>
        <li>
          <Link href="/custom-wire-forming">Custom wire forming</Link>
        </li>
        <li>
          <Link href="/contact">Send a STEP</Link>
        </li>
      </ul>

      <QuoteBand title="330 basket or fixture print?" />
    </DocPage>
  );
}
