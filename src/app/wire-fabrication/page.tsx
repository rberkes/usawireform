import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { COMPANY } from "@/lib/company";
import { WIRE } from "@/lib/range";

export const metadata: Metadata = {
  title: "Wire Fabrication 4–14 mm",
  description:
    "Wire fabrication in 4–14 mm: low to high carbon, all stainless, and other ferrous and non-ferrous coil — CNC form, weld, and finish.",
};

const toc = [
  { id: "what", label: "What it is" },
  { id: "size", label: "4–14 mm" },
  { id: "carbon", label: "Low–high carbon" },
  { id: "stainless", label: "Stainless" },
  { id: "ferrous", label: "Other ferrous" },
  { id: "nonferrous", label: "Non-ferrous" },
  { id: "ops", label: "What we do to it" },
  { id: "next", label: "Related" },
];

export default function WireFabricationPage() {
  return (
    <DocPage
      kicker="Fabrication"
      title={`Wire fabrication, ${WIRE.metric}`}
      lede={`${COMPANY} fabricates wire in 4–14 mm: low to high carbon, stainless, and other ferrous and non-ferrous coil. Form, cut, weld, and finish so the part installs.`}
      toc={toc}
    >
      <h2 id="what">What wire fabrication is here</h2>
      <p>
        Fabrication is the form plus the work that makes it a part: cutoff,
        end forming,{" "}
        <Link href="/processes/resistance-welding">resistance weld</Link>,{" "}
        <Link href="/processes/mig-tig-assembly">MIG / TIG</Link>, pierce,
        and finish. The starting stock is round wire from coil, not plate
        or tube. Geometry is a centerline. The shop is{" "}
        <Link href="/">{COMPANY}</Link>.
      </p>
      <p>
        That is the same cell as{" "}
        <Link href="/wire-forming">wire forming</Link> — CNC first, then
        the secondaries. Below 4 mm or above 14 mm, we say so before the
        PO.
      </p>

      <h2 id="size">Diameter: 4–14 mm</h2>
      <p>
        Production is {WIRE.label}. Stock coil is{" "}
        <Link href="/sizes">3/8, 7/16, and 1/2 in</Link> (9.53 mm, 11.11
        mm, 12.7 mm). Other diameters in the band still fabricate; they
        need <Link href="/quoting">tooling and coil</Link> when we do not
        carry the steel.
      </p>
      <table>
        <thead>
          <tr>
            <th>Size</th>
            <th>Typical fabrication</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4–6 mm</td>
            <td>Hooks, lighter frames, 3D routing, display wire</td>
          </tr>
          <tr>
            <td>3/8 in (9.53 mm)</td>
            <td>Frames, tray wire, S-hooks, guard rims</td>
          </tr>
          <tr>
            <td>7/16 in (11.11 mm)</td>
            <td>Basket rims, J-hooks, structural grid borders</td>
          </tr>
          <tr>
            <td>1/2 in (12.7 mm) to 14 mm</td>
            <td>Heavy frames, D-rings, furnace fixtures, rod-frame work</td>
          </tr>
        </tbody>
      </table>

      <h2 id="carbon">Low to high carbon</h2>
      <p>
        Carbon steel is the default fabrication coil. Soft drawing grades
        through hard-drawn and oil-tempered spring wire — named on the
        print, not “steel wire.”
      </p>
      <ul>
        <li>
          <strong>Low carbon</strong> — 1006, 1008, 1010, 1018. Stock
          cold-roll. Welds clean. Frames, grids, trays, guards.
        </li>
        <li>
          <strong>Medium carbon</strong> — 1030–1045. More springback than
          1018. Stress-relieve after a tight 3D path if the print cares.
        </li>
        <li>
          <strong>High carbon</strong> — 1050–1095, hard-drawn, A229
          oil-tempered. Industrial spring and clip work at the light end
          of the band. Confirm the head at 3/8–1/2 in.
        </li>
      </ul>
      <p>
        Grade tables:{" "}
        <Link href="/materials">coil materials</Link>. Swapping 1010 for
        1060 without a new article changes radius, weld, and crack risk.
      </p>

      <h2 id="stainless">Stainless</h2>
      <p>
        Austenitic 300-series is the stainless we fabricate from coil —
        301, 302, 304 / 304L, 305, 316 / 316L, 317, 309 / 310, 321 / 347,
        and 330. Deep page:{" "}
        <Link href="/materials/300-series-stainless">
          300-series stainless
        </Link>
        . Passivate after form and weld. Do not write “SS” on a furnace
        grid; that is how 304 gets quoted as 330.
      </p>
      <p>
        400-series (410, 430) shows up on prints. It is stainless, and it
        is ferrous, and it is a different coil than 304. We will say
        whether that wire belongs in this cell. 303 is a free-machining
        grade, not a forming coil we recommend.
      </p>

      <h2 id="ferrous">Other ferrous</h2>
      <p>
        Beyond plain carbon and stainless: pre-galvanized low-carbon,
        alloy spring (6150, 5160, chrome-silicon), and coated coil that
        has to survive the straightener and the weld. Galvanize burns
        back at every nugget. Form-then-zinc or form-then-powder is the
        cleaner path on 3/8–1/2 in frames.
      </p>
      <p>
        Inconel and nickel alloys past 330 are a cert-and-conversation
        job, not a 1018 setup with the pressure turned up.
      </p>

      <h2 id="nonferrous">Non-ferrous</h2>
      <p>
        Brass and copper are not steels. They are coil we fabricate in
        the same 4–14 mm band: C110 ETP, C102 OFHC, C260 / C270 brass,
        C230 red brass, C510 phosphor bronze. Soft, easy to mark, easy
        to overbend. Electrical forms, grounding, and any part that
        cannot be steel. Tools that are right for 1018 will bruise C110.
      </p>
      <p>
        Name the alloy. Welding copper or brass is not a 1018 MIG
        setting. Say if the joint is soldered, brazed, or fusion-welded.
      </p>

      <h2 id="ops">What we do to the wire</h2>
      <ul>
        <li>
          <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link> and{" "}
          <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link>{" "}
          forming — Numalliance Robomac 214, plus Lubow manuals
        </li>
        <li>
          Cut-to-length and{" "}
          <Link href="/processes/end-forming">end forming</Link> — chamfer,
          coin, flatten, pierce, on the 40-ton Clearing press when the
          CNC will not
        </li>
        <li>Resistance weld (75 kVA) and Miller MIG assembly</li>
        <li>
          <Link href="/processes/plating-and-coating">
            Rack zinc, in-line powder, plate then powder
          </Link>
          ; passivate stainless
        </li>
        <li>
          <Link href="/processes/inspection">Inspection</Link> on granite,
          DRO, and height gauge
        </li>
      </ul>
      <p>
        The machine list is on{" "}
        <Link href="/equipment">equipment</Link>. What we quote is on{" "}
        <Link href="/capabilities">capabilities</Link>.
      </p>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/cleveland">Cleveland</Link> — mills, wire drawers,
          short-haul coil
        </li>
        <li>
          <Link href="/materials">Coil materials</Link> — named grades
        </li>
        <li>
          <Link href="/sizes">3/8, 7/16, and 1/2 in</Link>
        </li>
        <li>
          <Link href="/processes/heavy-wire-forming">
            Heavy wire forming, 4–14 mm
          </Link>
        </li>
        <li>
          <Link href="/wire-forming">Wire forming in the USA</Link>
        </li>
        <li>
          <Link href="/guide/design-for-wire-forming">
            Design for wire forming
          </Link>
        </li>
      </ul>

      <QuoteBand title="Have a grade and a diameter?" />
    </DocPage>
  );
}
