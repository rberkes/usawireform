import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { COMPANY } from "@/lib/company";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: `${COMPANY} in Northeast Ohio`,
  description: "Northeast Ohio is a strategic location for low-cost 4–14 mm wire forming and secondary operations: local mills, wire drawers, and short-haul coil.",
  path: '/cleveland',
  keywords: [
    "Northeast Ohio wire forming",
    "wire drawing",
    "short-haul coil",
  ],
});

const toc = [
  { id: "why", label: "Why Northeast Ohio" },
  { id: "mills", label: "Mills and rod" },
  { id: "drawers", label: "Wire drawers" },
  { id: "freight", label: "Freight" },
  { id: "secondaries", label: "Secondaries in-house" },
  { id: "cost", label: "Where cost actually is" },
  { id: "next", label: "Related" },
];

export default function ClevelandPage() {
  return (
    <DocPage
      kicker="Location"
      title="Northeast Ohio is the coil, not a zip code."
      lede={`Wire forming is heavy. ${COMPANY} sits next to mills and wire drawers so 4–14 mm coil, CNC forming, and secondary operations stay short-haul — that is the low-cost shop, not a cheaper bend.`}
      toc={toc}
    >
      <h2 id="why">Why this region</h2>
      <p>
        A 4–14 mm form is mostly steel by weight. The quote follows the
        coil: mill, draw, freight in, then form, weld, and finish. Put
        the cell next to the rod and the drawers and you cut the legs
        that do not add a bend. That is why{" "}
        <Link href="/">{COMPANY}</Link> is in Northeast Ohio —
        Lake Erie, the steel corridor, and the Midwest plants that buy
        the parts.
      </p>
      <p>
        50+ years of industry experience in this region is time spent on
        that supply chain, not a slogan about a skyline.
      </p>

      <h2 id="mills">Local mills</h2>
      <p>
        Northeast Ohio still makes steel. Integrated mill capacity is in
        the region and the Cuyahoga. Rod and bar that become forming wire do
        not have to start on a coast and ride a railcar across the
        country before they see a die. For {WIRE.short} carbon — 1010,
        1018, and the medium-to-high grades — mill proximity is inbound
        cost and lead time, not a brochure fact.
      </p>
      <p>
        When we do not carry a diameter,{" "}
        <Link href="/quoting">coil buy-in</Link> is a mill minimum. A
        mill that is a local truck is a different conversation than a
        mill that is two time zones away.
      </p>

      <h2 id="drawers">Wire drawing companies</h2>
      <p>
        Rod is not forming wire. Drawers take mill rod down to diameter,
        tensile, and coating — the coil that actually hits the
        straightener. Northeast Ohio and the Ohio–Pennsylvania corridor
        are where that trade lives: carbon, galvanized, stainless, and
        the spring grades. We buy coil from that chain, not from a
        catalog that ships from a warehouse that already paid the
        freight twice.
      </p>
      <p>
        Low carbon through high carbon,{" "}
        <Link href="/materials/300-series-stainless">stainless</Link>,
        and other ferrous and non-ferrous coil in{" "}
        <Link href="/wire-fabrication">wire fabrication</Link> all start
        as a draw. Sitting next to the drawers is how 3/8, 7/16, and 1/2
        in stay stock instead of a special.
      </p>

      <h2 id="freight">Short-haul, not coast-to-coast</h2>
      <p>
        Northeast Ohio is I-90, I-80 / the Turnpike, I-71, and I-77. Lake
        Erie takes bulk. Rail still serves the mill. A skid of 4–14 mm
        coil is thousands of pounds. Trucking it from a distant mill is
        a line item; trucking it across town is not.
      </p>
      <p>
        Outbound is the same map. Automotive, industrial, agriculture,
        and plant work in the Midwest is a day’s truck, not a coast.
        The sectors we name under{" "}
        <Link href="/industries">industries</Link> are mostly that
        geography.
      </p>

      <h2 id="secondaries">Forming and secondaries in one building</h2>
      <p>
        Low-cost wire forming fails when the form is cheap and the rest
        of the part is three other vendors. A frame that leaves the shop
        for weld, then Ohio again for zinc, then somewhere else for
        powder, has paid freight three times and queued three times.
      </p>
      <p>
        This floor does the secondary in the same cell:{" "}
        <Link href="/processes/resistance-welding">resistance weld</Link>
        ,{" "}
        <Link href="/processes/mig-tig-assembly">MIG / TIG</Link>, pierce
        on the Clearing press,{" "}
        <Link href="/processes/plating-and-coating">
          rack zinc and in-line powder
        </Link>
        , passivate stainless. CNC on the Robomac, then the ops that
        make it install. One inbound coil, one outbound crate. That is
        the cost structure — listed on{" "}
        <Link href="/capabilities">capabilities</Link> and{" "}
        <Link href="/equipment">equipment</Link>.
      </p>

      <h2 id="cost">Where the money actually goes</h2>
      <ul>
        <li>Coil — mill and draw, then freight to the straightener</li>
        <li>Form — CNC program, pins, and cycle on 4–14 mm</li>
        <li>Join and end work — weld, coin, pierce</li>
        <li>Finish — plate, powder, or passivate</li>
        <li>Freight out — to the plant that bolts it on</li>
      </ul>
      <p>
        Northeast Ohio attacks the first and last lines and collapses the
        middle into one shop. Piece price follows. It is not a discount
        on a 9-gauge clip from a catalog. It is heavy wire, short-haul
        steel, and secondaries that do not leave the building.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/about">About</Link> — the shop
        </li>
        <li>
          <Link href="/wire-fabrication">Wire fabrication, 4–14 mm</Link>
        </li>
        <li>
          <Link href="/quoting">Quotes, tooling, and coil</Link>
        </li>
        <li>
          <Link href="/materials">Coil materials</Link>
        </li>
        <li>
          <Link href="/wire-forming">Wire forming in the USA</Link>
        </li>
      </ul>

      <QuoteBand title="Have a print and a coil spec?" />
    </DocPage>
  );
}
