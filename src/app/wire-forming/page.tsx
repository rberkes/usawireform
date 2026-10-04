import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { DirectoryCompanyGrid } from "@/components/DirectoryCompanyCards";
import { ArticleSchema, FAQSchema } from "@/components/SeoSchemas";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { CNC_COMPARE, CNC_HUB, CNC_OEMS, oemPath } from "@/lib/cnc-oems";
import { directoryCompanies } from "@/lib/directory";
import { machineLevelDirectoryShops } from "@/lib/directory-profile";
import {
  WIRE_FORMING_FAQS,
  WIRE_FORMING_KEYWORDS,
  WIRE_FORMING_LEDE,
  WIRE_FORMING_TITLE,
  WIRE_FORMING_TOC,
} from "@/lib/wire-forming-guide";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Forming — Process, CNC, Fourslide, and U.S. Manufacturers",
  description:
    "What wire forming is: 2D vs 3D CNC, fourslide, multislide, coil-fed vs cut-to-length, diameter, bend radius, materials, springback, tolerances, welding, finishing, and how to pick a U.S. shop.",
  path: "/wire-forming",
  keywords: [...WIRE_FORMING_KEYWORDS],
});

export default function WireFormingPillarPage() {
  const shops = machineLevelDirectoryShops(directoryCompanies, 9);

  return (
    <>
      <ArticleSchema
        headline="Wire forming"
        description={WIRE_FORMING_LEDE}
        url="/wire-forming"
        datePublished="2026-10-04"
        dateModified="2026-10-04"
      />
      <FAQSchema questions={[...WIRE_FORMING_FAQS]} />
      <BreadcrumbJsonLd items={[{ name: "Wire forming", url: "/wire-forming" }]} />
      <DocPage
        kicker="The resource"
        title={WIRE_FORMING_TITLE}
        lede={WIRE_FORMING_LEDE}
        toc={[...WIRE_FORMING_TOC]}
      >
        <h2 id="what">What wire forming is</h2>
        <p>
          Wire forming starts with a coil — or a straight bar — of a specified
          alloy and diameter. A shop straightens that wire, feeds it a
          programmed length, bends it to a centerline, cuts it, and often adds
          end work or a weld. The part <em>is</em> the wire. There is no blank
          sheared from sheet, no chip cut from bar stock, and no mold. Geometry
          comes from bend sequence and tooling, not from a cutter path through
          solid.
        </p>
        <p>
          That is different from spring coiling, where the product is a coil
          with a rate; from stamping, where the product starts as strip; and
          from tube bending, where the section is hollow and wrinkle and
          mandrel rules apply. Overlap exists. Some CNC formers coil. Some
          fourslides stamp and form in one tool. The discipline is still
          specified wire, specified centerline, specified ends.
        </p>
        <p>
          Buyers search “wire forming,” “wire forming services,” and “wire
          forming companies” for the same job: a custom form that a catalog
          clip will not cover. The work shows up as frames, guards, handles,
          baskets, racks, carts, display wire, furnace fixtures, seat and
          headrest rods, heavy hooks, D-rings, and cable hangers. If the
          function is stored energy with a spring rate, you want a spring
          maker. If the function is a shape, it belongs here. Typical USA
          production: machine and fan guards, material-handling baskets and
          decks, POP and display wire, food-equipment racks, heat-treat and
          furnace fixtures, automotive seat and lock rods, powder-coating
          hooks, D-rings, hitch hardware, ground staples, and cable hangers
          for plants and mines. Same process family. Different diameter,
          alloy, and weld count.
        </p>
        <p>
          USA Wire Form is a U.S. matching layer on top of that trade:
          machine-level sourcing, not a brochure that says every shop does
          everything. Production on this floor is 4–14 mm 3D CNC in Northeast
          Ohio. The rest of the diameter and process map lives in the{" "}
          <Link href="/directory">directory</Link> and on the{" "}
          <Link href="/processes">process pages</Link>.
        </p>

        <h2 id="2d-3d">2D vs 3D forming</h2>
        <p>
          A 2D form stays in one plane. Think of a paper-clip path, a flat
          hook, a U-bolt developed from a single view, or a grid that only
          needs feed and bend.{" "}
          <Link href="/processes/2d-cnc-wire-forming">2D CNC wire forming</Link>{" "}
          is a table or a 2D head: programmed feed, programmed angle, cutoff.
          Revisions are a new program. Mid volume is the sweet spot.
        </p>
        <p>
          A 3D form leaves the plane. The machine adds a rotary or torsion
          axis so a bend can be clocked relative to the last one. Routing
          forms, spatial hooks, basket rims that turn a corner, and frames
          that have to clear a casting are 3D work.{" "}
          <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>{" "}
          is the lane. A print that looks 2D in the top view and has one
          rotated leg is already 3D. Send the STEP. Do not make the buyer
          guess from a flat PDF.
        </p>
        <p>
          Fourslide and multislide are almost always 2D. They can add a twist
          or a third-direction cam, but the economics assume a frozen planar
          path. If the print will change, or if a torsion axis is load-bearing,
          CNC is the safer first article. Machine class — not the company
          name — decides the lane. Filter shops by{" "}
          <Link href="/directory?iron=2d-cnc">2D CNC</Link> or{" "}
          <Link href="/directory?iron=3d-cnc">3D CNC</Link>.
        </p>
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
              <td>CNC with a rotary or torsion axis</td>
              <td>Routing forms, spatial hooks, frames</td>
            </tr>
            <tr>
              <td>
                <Link href="/processes/fourslide">Fourslide</Link>
              </td>
              <td>Cam tooling, often with a stamp</td>
              <td>Frozen high volume, simple geometry</td>
            </tr>
            <tr>
              <td>Multislide / Bihler</td>
              <td>More stations than a four-slide</td>
              <td>High volume plus pierce, thread, assemble</td>
            </tr>
            <tr>
              <td>
                <Link href="/processes/cut-to-length">Cut-to-length</Link>
              </td>
              <td>Decoil, straighten, shear or saw</td>
              <td>Straight blanks; magazine feed for long 3D</td>
            </tr>
            <tr>
              <td>Secondaries</td>
              <td>Ends, welds, plate, passivate</td>
              <td>When the form must install as-is</td>
            </tr>
          </tbody>
        </table>

        <h2 id="cnc">CNC forming</h2>
        <p>
          CNC moved the trade from dedicated cams to a program. Feed length,
          bend angle, and rotation are numbers. Pins, mandrels, and a cutoff
          are standard. First article is hours or days, not a twelve-week
          tool. That matters in the United States because prints move:
          automotive running changes, medical lot sizes, and industrial
          equipment that never quite freezes.
        </p>
        <p>
          CNC does not automatically beat fourslide on piece price at 500,000
          identical 2D clips. The call is volume, revision risk, and geometry.
          A 3D CNC also does not run every diameter. A Robomac 214TF class
          cell is a mid-to-heavy former. A spring CNC or a small WAFIOS /
          Itaya cell is a different machine. “We have CNC” on a homepage is
          not a capability. The model and the min/max wire are.
        </p>
        <p>
          Programming is not free-form sculpture. The centerline must be
          manufacturable: inside radius, minimum leg between bends, and a
          cutoff that the shear or saw can reach. Simulation on the OEM
          controller catches collisions before the first coil. A buyer who
          sends a solid sweep with no path, or a polyline with sharp corners
          labeled “break edge,” will get a clarifying email, not a price.
        </p>
        <p>
          Detail pages:{" "}
          <Link href="/cnc-wire-forming">CNC wire forming</Link>,{" "}
          <Link href="/cnc-wire-bending">CNC wire bending</Link>, and the{" "}
          <Link href={CNC_HUB}>CNC machine catalog</Link>. This floor runs a
          Numalliance Robomac 214TF. We do not sell the iron.
        </p>

        <h2 id="fourslide">Fourslide forming</h2>
        <p>
          A fourslide (4-slide) feeds wire or strip and forms it with
          cam-driven slides from four directions, often with a press station
          for pierce, coin, or cutoff. The part leaves complete. Cycle time
          on a frozen clip can be a fraction of a CNC bend sequence. The cost
          and the wait sit in the tool: design, harden, tryout, and recut
          when the print moves.
        </p>
        <p>
          Fourslide wins when geometry is simple, volume is high, and the
          print is frozen. It loses when the path is spatial, when a running
          change is likely, or when the first 5,000 pieces are the whole
          life. A buyer who only has a fourslide quote should ask what the
          tool costs and how long it takes. A buyer who only has a CNC quote
          should ask what the piece price does at 250,000.
        </p>
        <p>
          Named fourslide iron on a public page — Baird, Nilson, Finzer — is
          more useful than “slide forming.”{" "}
          <Link href="/processes/fourslide">Fourslide vs 3D CNC</Link> is the
          comparison. Directory filter:{" "}
          <Link href="/directory?iron=fourslide">fourslide shops</Link>.
        </p>

        <h2 id="multislide">Multislide</h2>
        <p>
          Multislide, verti-slide, and Bihler-class transfer machines add
          stations beyond a classic four-slide. They handle more operations
          in one tool: additional bends, stamps, threads, or assemblies. The
          same rule applies. The tool is the product until volume pays it
          back. Bihler NC and servo-slide machines blur the line with CNC —
          programmable slides, still a dedicated setup.
        </p>
        <p>
          If a listing says “multi-slide” and names Bihler, Baird #28/#33, or
          a verti-slide, an engineer can guess the job class. If it only
          says “high-volume wire forms,” ask which machine and what diameter
          it actually feeds. Filter:{" "}
          <Link href="/directory?iron=multi-slide">multi-slide / Bihler</Link>.
        </p>

        <h2 id="feed">Coil-fed vs cut-to-length</h2>
        <p>
          Most production CNC and almost all slide machines are coil-fed. The
          straightener sits upstream. Feed rolls meter length. Cutoff is in
          the cycle. Coil-fed wins on piece price and on consistency of
          straightness, because the wire never sits as a loose blank that
          someone has to load.
        </p>
        <p>
          Cut-to-length is a different cell: decoil, straighten, shear or
          saw, and stack straight blanks. Some jobs never bend — pins, stakes,
          furnace rods, blanks for a secondary bender. Some 3D jobs start as
          magazine-fed bars because the developed length exceeds the coil
          payoff or the head wants a pre-cut.{" "}
          <Link href="/processes/cut-to-length">Cut-to-length</Link> and{" "}
          <Link href="/processes/wire-straightening">straightening</Link> are
          the process pages. A shop that only lists “CNC” may still buy
          straightened bar. Ask.
        </p>
        <p>
          Coil policy matters to the buyer. Some plants stock 1018, 304, and
          galvanized and will not wait on a mill. Some form only customer
          coil. Source listings that file “we buy and stock coil” vs
          “customer coil only” save a week of email. That field belongs on
          the card, next to the machine, not in a PDF capabilities binder.
        </p>

        <h2 id="diameter">Wire diameter</h2>
        <p>
          Diameter is the first gate. Every head has a min and a max. Below
          the min the wire buckles or will not fill the gripper. Above the
          max the head stalls or the pin shears. Published OEM bands are
          optimistic. A 2–16 mm plate does not mean the shop wants 2 mm and
          16 mm on the same cell.
        </p>
        <p>
          Across U.S. wire forming companies the published range runs from
          about 0.010 in on medical, spring, and fourslide cells to 0.625 in
          and heavier on rod and 3D CNC. USA Wire Form’s production band is
          4–14 mm — roughly 0.157–0.551 in — with stock 3/8, 7/16, and 1/2
          in on the floor.{" "}
          <Link href="/sizes">Stock sizes</Link> and{" "}
          <Link href="/processes/heavy-wire-forming">heavy wire forming</Link>{" "}
          cover that cell. Lighter work belongs on a shop that names a small
          CNC or a fourslide, not on a 214TF.
        </p>
        <p>
          Call out diameter as a decimal or a fraction and stick to it.
          “About 3/8” is not a spec. Gauge numbers (8 ga, 11 ga) show up on
          staples and display wire; convert them on the print so the former
          and the buyer share one number. Developed length grows with
          diameter because bend deduction is a function of inside radius and
          stock size. Do not copy a 0.120 in developed length onto 0.375 in
          stock.
        </p>

        <h2 id="radius">Bend radius</h2>
        <p>
          Inside bend radius is a material and tooling limit, not a CAD
          convenience. Mild carbon in the mid band usually takes 1× diameter
          inside. Stainless and high-tensile want 1.5–2×. Soft copper and
          aluminum can go tighter; they also mark. “Sharp” on a print means
          the shop will substitute the tightest pin it trusts and tell you
          what that was.
        </p>
        <p>
          Outside radius is inside plus diameter. If a mating part cares
          about the outside, dimension the outside and let the inside float,
          or the other way around — not both, fighting each other through
          springback. Closely spaced bends need a straight between them that
          the pin and the gripper can actually hold. A 0.8× diameter straight
          between two 90s is a conversation, not a program.
        </p>
        <p>
          Rules and examples:{" "}
          <Link href="/guide/design-for-wire-forming">
            design for wire forming
          </Link>
          .
        </p>

        <h2 id="material">Material selection</h2>
        <p>
          The alloy is the springback, the weld, the finish, and the price.
          Low-carbon 1010 / 1018 is the default forming wire: soft, welds
          clean, 1× radius. Galvanized carbon is the same chemistry with a
          coating that marks in the straightener and burns back at every
          weld. Medium and high carbon (1030–1095, oil-tempered, music wire)
          are spring grades. They take more radius, more compensation, and
          often a stress relief. They are not a drop-in for 1018 frames.
        </p>
        <p>
          300-series stainless is the outdoor, food, and medical default. 304
          / 304L for general service. 316 / 316L when chlorides matter. 301
          and 302 work-harden and snap back more. 330 (N08330) is a
          high-nickel heat-treat alloy — furnace baskets, not “304 with a
          bigger number.”{" "}
          <Link href="/330-stainless-wire-bending-usa-parts">
            330 stainless USA parts
          </Link>{" "}
          is the lander. Aluminum (6061 and softer drawing grades), copper,
          and brass form, mark, and gall differently. Do not copy a steel
          radius onto C110 or C260.
        </p>
        <p>
          Grades, mill notes, and what this cell stocks:{" "}
          <Link href="/materials">materials</Link>. A directory listing that
          files stocked materials — 1010, 304, 316, spring, aluminum, copper,
          brass — is more useful than “all metals.”
        </p>

        <h2 id="springback">Springback</h2>
        <p>
          Wire returns some of the bend angle when the pin releases. Higher
          yield, larger radius, and 300-series stainless return more. The CNC
          program overbends. The fourslide tool is cut for the return. Either
          way the print must name the alloy and temper. “Stainless” is not
          enough. 304 annealed and 301 full-hard are different programs.
        </p>
        <p>
          Compensation is empirical. A shop proves first article on the
          actual coil lot. A second lot with a different tensile will move
          the angle. If an angle is critical-to-fit, fixture it and call the
          fixture on the print. If it is not, give the process ±2° and stop
          fighting the material.
        </p>

        <h2 id="tolerances">Tolerances</h2>
        <p>
          Wire forming is not Swiss turning. Typical non-critical linear
          dimensions land around ±0.015 in. Critical linear dimensions can
          hold ±0.005 in with a fixture and a stable coil. Non-critical
          angles ±2°. Critical angles ±0.5° to ±1° when the shop will
          inspect them that way. Hole-to-bend and weld-to-bend stack more
          than a single bend.
        </p>
        <p>
          Datums should come from the mating part, not from an arbitrary
          end. A 20-bend form with every segment ±0.005 in is a drawing that
          will not be quoted as written. Mark the three dimensions that
          assemble. Let the rest sit at process capability. Inspection:{" "}
          <Link href="/processes/inspection">inspection</Link>.
        </p>

        <h2 id="welding">Welding</h2>
        <p>
          A lot of “wire forms” are weldments. Cross-wire and projection
          nuggets are{" "}
          <Link href="/processes/resistance-welding">resistance welding</Link>
          — the right process for baskets, grids, and frames where the wires
          cross. MIG and TIG cover tacks and fillets a nugget cannot reach,
          closed frames, and stainless that a resistance schedule will
          discolor.{" "}
          <Link href="/processes/mig-tig-assembly">MIG / TIG assembly</Link>{" "}
          is the page.
        </p>
        <p>
          Welding changes the quote. A form that leaves the CNC and ships is
          one cell. A form that needs twenty cross-wire nuggets, a MIG
          close, and a grind is a different shop — or the same shop with a
          different hourly. Directory cards that say Resistance / MIG / TIG
          instead of “welding available” are the ones an engineer can use.
          Fixture cost shows up here too. A dedicated weld fixture is closer
          to fourslide economics than to a CNC program.
        </p>

        <h2 id="finishing">Finishing</h2>
        <p>
          Finish is none, zinc, zinc-nickel, nickel, chrome, e-coat, powder,
          black oxide, or passivate. Pre-coated coil (galvanized, some
          painted) looks cheap until the straightener marks it and the weld
          burns it back. Post-coat after form and weld is the usual
          production path for anything that has to look finished.
        </p>
        <p>
          Call the finish on the print, including thickness and whether a
          weld discoloration is allowed. Stainless that will be passivated
          should say so; as-welded 304 in a food zone is a different spec.{" "}
          <Link href="/processes/plating-and-coating">
            Plating and coating
          </Link>{" "}
          and{" "}
          <Link href="/processes/heat-treating">heat treating</Link> sit
          after the form. Heat-treat baskets and fixtures that will see a
          furnace are 330 work, not a powder-coat job.
        </p>

        <h2 id="prototype">Prototype vs production</h2>
        <p>
          Prototype on CNC is a program and a short coil. That is why 3D CNC
          ate a lot of fourslide prototypes. A shop that files “short runs
          and first articles” will cut five or fifty. A shop that files
          “production lots only” will not. MOQ in this trade is not
          standardized. This floor starts production at 100 pieces. Other
          directory plants file no piece minimum, or 1,000, or a dollar
          minimum. Read the card.
        </p>
        <p>
          Production adds coil buys, weld fixtures, finish lots, and packing.
          A prototype that was hand-adjusted on a Lubow table is not a
          production process. If the first article must represent production,
          say so and pay for the CNC program and the production coil, not a
          bench form. Volume breaks — 1,000, 10,000 — change piece price
          more than they change the machine.
        </p>

        <h2 id="machines">Machine selection</h2>
        <p>
          Pick the cell, then the shop. Diameter band first. 2D vs 3D
          second. Coil-fed vs magazine vs cut-to-length third. Then
          secondaries: weld, thread, flatten, coat, heat-treat. A WAFIOS BM,
          a Numalliance Robomac, an AIM 3D, an Itaya RX, a Baird fourslide,
          and a Bihler GRM are not interchangeable. They share a trade and
          split on diameter, axes, and whether the tool is a program or a
          cam set.
        </p>
        <p>
          Number of machines matters for capacity and for backup. A one-head
          shop can still be the right shop. A six-head shop with the wrong
          max diameter is the wrong shop. Available capacity — the weekly
          fullness a Source plant files — is more honest than “we can get
          you in.” Maximum feed length, current tooling, and coil sizes on
          the floor are the questions Thomas-style listings usually skip.
          Those are the questions this directory is built to hold.
        </p>
        <p>
          Concrete tells on a listing: Wafios BM 60, Numalliance Robomac 214,
          Itaya RX-40, AIM AFM 3D, Baird fourslide, Nilson, Bihler GRM-NC.
          Wire range as 0.080–0.551 in, not “light to heavy.” 3D CNC: yes.
          Coil fed: yes. Cut-to-length: yes. Welding: resistance / MIG / TIG.
          Materials: 1010 / 304 / 316 / spring. MOQ: 100. Certifications:
          ISO 9001. Industries: automotive / material handling / food
          equipment. That card is useful. “ABC Wire — Custom Wire Forms” is
          not.
        </p>
        <p>
          Compare OEM classes on the{" "}
          <Link href={CNC_COMPARE}>machine comparison</Link>. Type a model or
          a secondary on{" "}
          <Link href="/find-factories-by-machine">
            find factories by machine
          </Link>
          .
        </p>

        <h2 id="pricing">Typical pricing variables</h2>
        <p>
          Piece price is not mysterious. It is setup plus run plus material
          plus secondaries plus finish plus pack, divided by quantity. Setup
          is program time, first-article iterations, and any fixture.
          Fourslide setup is the tool. Run is cycle time times machine rate
          times yield. Material is coil cost, drop, and whether the shop
          already stocks the grade.
        </p>
        <p>
          Variables that move a quote more than buyers expect: alloy (316 vs
          1018, 330 vs 304), number of bends, developed length, tight
          radius, critical tolerances that force a fixture, weld count, grind
          or coin, plate vs powder, and whether the lot is 100 or 10,000.
          Freight is real on heavy wire but rarely the driver. Tooling on a
          non-stock diameter or a dedicated weld fixture can exceed the first
          lot.
        </p>
        <p>
          Instant ballpark from cuts, bends, and inches:{" "}
          <Link href="/instant-quote">instant quote</Link>. Production review
          of a STEP:{" "}
          <Link href="/source">upload a drawing</Link> or{" "}
          <Link href="/custom-wire-forming">custom wire forming services</Link>
          . How we quote tooling and coil: <Link href="/quoting">quoting</Link>.
        </p>

        <h2 id="dfm">Design for manufacturing</h2>
        <p>
          DFM for wire is a short list. Name the diameter and the full
          material spec. Model the centerline with real radii, not sharp
          polylines. Give every bend a holdable leg. Mark only the
          dimensions that assemble. Specify ends: square cut, chamfer, coin,
          flatten, thread, or a loop with an inside diameter and a gap.
          Specify finish. Send a STEP or a DXF plus a PDF. A wire centerline
          plus diameter is better than a solid sweep with no path.
        </p>
        <p>
          Common failures: copied sheet-metal bends, 0.5× diameter insides on
          stainless, closed loops that cannot be formed without a weld but
          are drawn as continuous wire, and stacks of ±0.005 in on
          non-mating segments. The design guide is the working checklist:{" "}
          <Link href="/guide/design-for-wire-forming">
            design for wire forming
          </Link>
          .
        </p>

        <h2 id="oems">Equipment manufacturers</h2>
        <p>
          The machines have OEMs. The shops buy them. We catalog the models
          so a buyer can read a listing that says “Robomac 214” or “WAFIOS
          BM 60” and know the class. Specs below are typical published
          ranges — confirm with the dealer. USA Wire Form does not sell
          machines.
        </p>
        <ul>
          {CNC_OEMS.map((oem) => (
            <li key={oem.slug}>
              <Link href={oemPath(oem)}>{oem.name}</Link>
              {" — "}
              {oem.country}. {oem.summary}
            </li>
          ))}
        </ul>
        <p>
          Full catalog: <Link href={CNC_HUB}>CNC manufacturers</Link>. This
          floor: <Link href="/equipment">Numalliance Robomac 214TF</Link>.
        </p>

        <h2 id="suppliers">Supplier selection</h2>
        <p>
          A useful wire forming company listing looks like an equipment
          card, not a tagline. Location. Named machines. Wire range. 2D vs
          3D. Coil-fed. Cut-to-length. Welding process. Materials on the
          floor. MOQ. Certifications. Industries. That is what an engineer
          can act on, and it is structured information most directories do
          not expose. Ask the shop for max feed length, coil sizes on the
          floor, tooling already cut, and how many heads of that class they
          run. A second identical CNC is backup. A fourslide tool that
          already exists for your clip is a different quote than a new tool.
        </p>
        <p>
          Thomas-style inventory is large. It usually does not lead with
          machine model, diameter min/max, axis class, number of heads,
          weekly capacity, max feed, weld equipment, or coil policy. Those
          are the fields Source asks a shop to file and the fields we show
          when a public page named the iron. Confirm before you send a
          print. Public pages go stale. A claimed Source listing is the shop
          talking about its own floor.
        </p>
        <p>
          Certifications (ISO 9001, PPAP, ITAR) and industry experience
          (automotive, food equipment, material handling, medical) are
          filters, not substitutes for the machine. A food-equipment plant
          without a 3D head will not run a spatial basket rim. An automotive
          tier with the wrong max diameter will not run 1/2 in rod. Match
          the print to the cell.
        </p>
        <p>
          Start here:{" "}
          <Link href="/custom-wire-forming">
            custom wire forming services
          </Link>
          , the{" "}
          <Link href="/directory">company directory</Link>,{" "}
          <Link href="/wire-form-factories-in-usa">USA factories</Link>, or{" "}
          <Link href="/wire-forming-companies-near-me">companies near me</Link>
          .
        </p>

        <h2 id="directory">Manufacturer directory</h2>
        <p>
          The shops below already publish machine-level facts — named iron,
          a diameter band, 2D/3D class, or buyer-fit. That is the Wikipedia
          half of this page meeting the Thomasnet half: process first, then
          plants that can actually run the work.
        </p>
        <div className="not-prose mt-6">
          <DirectoryCompanyGrid companies={shops} />
        </div>
        <p>
          See every listing, filter by iron, or type a model:{" "}
          <Link href="/directory">directory</Link>,{" "}
          <Link href="/directory?iron=3d-cnc">3D CNC</Link>,{" "}
          <Link href="/directory?iron=fourslide">fourslide</Link>,{" "}
          <Link href="/find-factories-by-machine">
            find factories by machine
          </Link>
          . Shops can file a cell free:{" "}
          <Link href="/source/shops">add a machine cell</Link>.
        </p>

        <h2 id="faq">FAQ</h2>
        {WIRE_FORMING_FAQS.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}

        <QuoteBand title="Have a form to run?" />
      </DocPage>
    </>
  );
}
