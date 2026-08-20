import Link from "next/link";
import { BandTable } from "@/components/BandTable";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema } from "@/components/SeoSchemas";
import { COMPANY } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Fourslide vs 3D CNC Wire Forming",
  description:
    "Fourslide and multislide tooling, cost, and geometry limits versus 3D CNC on a Numalliance Robomac 214TF. Why we do not cut a cam tool for 4–14 mm frames.",
  path: "/processes/fourslide",
  keywords: [
    "fourslide",
    "four slide manufacturing",
    "fourslide vs CNC",
    "multislide wire forming",
    "3D CNC wire forming",
    "Robomac 214TF",
    "wire forming tooling cost",
  ],
});

const faqs = [
  {
    question: "What is fourslide manufacturing?",
    answer:
      "A fourslide (multislide) machine feeds wire or strip and forms it with dedicated cam-driven tools from several directions. Piece price at frozen high volume can be low. The cost and the wait sit in the tool.",
  },
  {
    question: "Why is 3D CNC cheaper to start than fourslide?",
    answer:
      "CNC uses standard pins, mandrels, and cutoff — plus a program. Fourslide needs a custom tool set, tryout, and often recuts. First parts on a Robomac 214TF leave while that tool is still in design.",
  },
  {
    question: "Does fourslide beat CNC on cycle time?",
    answer:
      "At a frozen, mostly 2D, light-wire clip, sometimes. That comparison is a separate page. Tooling and cost are the argument here: production can already be on the CNC before a fourslide tool exists.",
  },
  {
    question: "Do you run fourslide?",
    answer: `No. ${COMPANY} runs 4–14 mm 3D CNC on a Numalliance Robomac 214TF. Fourslide is on this site so a buyer can tell the processes apart.`,
  },
];

const toc = [
  { id: "what", label: "What fourslide is" },
  { id: "wins", label: "Where fourslide still belongs" },
  { id: "limits", label: "Limitations vs 3D CNC" },
  { id: "tooling", label: "Tooling" },
  { id: "cost", label: "Cost" },
  { id: "geometry", label: "Geometry" },
  { id: "cell", label: "Robomac 214TF" },
  { id: "band", label: "Vs 4–14 mm" },
  { id: "speed", label: "Speed (later)" },
  { id: "not", label: "What we do not quote" },
  { id: "faq", label: "FAQ" },
  { id: "next", label: "Related" },
];

export default function FourslidePage() {
  const breadcrumbItems = [
    { label: "Processes", href: "/processes" },
    { label: "Fourslide vs 3D CNC" },
  ];

  return (
    <>
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Processes", url: "/processes" },
          { name: "Fourslide vs 3D CNC", url: "/processes/fourslide" },
        ]}
      />
      <DocPage
        kicker="Process"
        title="Fourslide manufacturing vs 3D CNC"
        lede="Cam tools from four directions. The right cell for a frozen, mostly 2D clip on light wire. The wrong cell for a 4–14 mm 3D frame. This page is tooling and cost. Cycle time waits in the next queue."
        toc={toc}
        breadcrumbs={breadcrumbItems}
      >
        <h2 id="what">What fourslide is</h2>
        <p>
          A fourslide — also called multislide — feeds wire or strip into a
          station where slides come in from several sides. Cams time those
          slides. Each slide carries a dedicated forming tool: a punch, a
          form, a cutoff, sometimes a pierce or a coin. One hit of the
          machine is one part, if the tool is right.
        </p>
        <p>
          That is stamping logic applied to wire. The machine does not
          “know” the print. The steel in the tool <em>is</em> the print.
          Change the bend and you change the steel.
        </p>
        <p>
          Names in the trade: Baird, Nilson, U.S. Baird, Aida fourslide,
          plus shops that still call every cam former a fourslide. Strip
          fourslide and wire fourslide share the same idea. Neither is a{" "}
          <Link href="/processes/3d-cnc-wire-forming">3D CNC former</Link>.
        </p>

        <h2 id="wins">Where fourslide still belongs</h2>
        <p>
          We are not going to pretend CNC owns every clip in America.
          Fourslide is the right call when all of this is true:
        </p>
        <ul>
          <li>The part is 2D or nearly 2D.</li>
          <li>The print is frozen. No running changes.</li>
          <li>
            You need work a CNC bend head does not do in-cycle: pierce,
            coin, stamp a feature in strip, flatten in the same hit.
          </li>
          <li>
            Diameter is usually well under 4 mm. 4 mm is already the tall
            end of that trade.
          </li>
          <li>
            Volume is high enough that the tool is paid for and then some.
          </li>
        </ul>
        <p>
          If any of those fail, you are shopping CNC — or you are about to
          buy a tool you will recut.
        </p>

        <h2 id="limits">Why 3D CNC wins the jobs we actually quote</h2>
        <p>
          {COMPANY} quotes 4–14 mm frames, guards, baskets, and routing
          forms from coil. Stock is 3/8, 7/16, and 1/2 in. That band, that
          geometry, and prints that move are fourslide’s weak side. 3D CNC
          is the strong side.
        </p>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Fourslide</th>
              <th>3D CNC (Robomac 214TF)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>What makes the shape</td>
              <td>Hard tool + cams</td>
              <td>Program + standard pins</td>
            </tr>
            <tr>
              <td>First parts</td>
              <td>After the tool exists</td>
              <td>After the program proves</td>
            </tr>
            <tr>
              <td>A print change</td>
              <td>Recut or new tool</td>
              <td>Edit the sequence</td>
            </tr>
            <tr>
              <td>3D centerline</td>
              <td>Awkward or impossible</td>
              <td>The machine’s job</td>
            </tr>
            <tr>
              <td>4–14 mm stock</td>
              <td>Wrong cell</td>
              <td>Production band</td>
            </tr>
            <tr>
              <td>Tool in the quote</td>
              <td>Yes — amortized or NRE</td>
              <td>No dedicated die</td>
            </tr>
          </tbody>
        </table>

        <h2 id="tooling">Tooling</h2>
        <p>
          This is the whole argument. Fourslide is a toolroom process that
          happens to run on a forming press. 3D CNC is a program that
          happens to use pins.
        </p>

        <h3>What a fourslide tool actually is</h3>
        <p>
          One SKU, one tool set. Typical stack:
        </p>
        <ul>
          <li>Feed and straightener setup dedicated to that wire or strip</li>
          <li>Cutoff — often a dedicated punch and die</li>
          <li>
            Forming tools on the slides: left, right, front, back, sometimes
            more on a multislide
          </li>
          <li>Cams ground or cut to time those slides</li>
          <li>
            Stripper, stock guide, maybe a pierce or coin if the print
            stamps as well as bends
          </li>
        </ul>
        <p>
          That steel is not a catalog pin. A toolmaker designs it, a shop
          cuts it, the machine tries it, springback is wrong, they recut.
          Weeks is normal. Months is not rare on a nasty form. The print
          is frozen on paper while that happens. Then the customer changes
          a leg 2 mm and the tool is wrong again.
        </p>
        <p>
          Tooling is also a collision with geometry. The slides have to
          occupy space. Tight zigs, returns in a third plane, a closed
          frame that traps on a mandrel — the tool cannot go there, or it
          needs a second operation, or it needs an assembly of two formed
          pieces. That is how fourslide “3D” jobs quietly become weldments.
        </p>

        <h3>What 3D CNC tooling actually is</h3>
        <p>
          On a{" "}
          <Link href="/equipment">Numalliance Robomac 214TF</Link> the
          bending head moves around the wire. Tools are standard radius
          pins, mandrels, and a cutoff. Numalliance’s line is built for
          simple tool configuration — not a cam set per SKU. You pick a
          pin that matches the inside radius, you write the sequence:
          feed, bend, rotate, feed, bend, cut. Prove-out is overbend for
          springback, not a second tool order.
        </p>
        <p>
          A custom pin happens. A one-off cutoff bushing happens. That is
          still a pin, not a fourslide die set. The next job uses the same
          drawer.
        </p>
        <p>
          Revision: change the program. Collision check. First article.
          The tool drawer does not move.
        </p>

        <h2 id="cost">Cost</h2>
        <p>
          Fourslide piece price looks cheap in a spreadsheet that already
          hid the tool. Put the tool back in.
        </p>
        <ul>
          <li>
            <strong>NRE / tool.</strong> A real fourslide tool is often
            mid five figures, sometimes more, plus tryout. Someone pays
            that — on the PO as tooling, or buried in piece price with a
            volume bet.
          </li>
          <li>
            <strong>Time is money the quote rarely names.</strong> Design,
            cut, tryout, recut. Production has not started. Engineering
            changes during that window recut the same steel.
          </li>
          <li>
            <strong>Sunk cost.</strong> The program dies, the OEM revises
            the clip, the volume never shows. The tool is still in the
            rack. CNC’s “tool” was a file.
          </li>
          <li>
            <strong>Mixed diameters and mixed SKUs.</strong> Fourslide
            wants one frozen part on one setup. A shop quoting 4–14 mm
            frames, three stock diameters, and running changes cannot
            amortize a cam tool per print.
          </li>
          <li>
            <strong>Inspection and PPAP on a moving print.</strong> Every
            recut is a new capability study. CNC overbend is a parameter,
            not a die recut.
          </li>
        </ul>
        <p>
          On the 214TF the quote is coil, program, first article, then
          production.{" "}
          <Link href="/quoting">100-piece minimum</Link>. No die line
          unless a true custom pin is required — and that pin still is not
          a fourslide set. Lowest prices we will not be beat is a
          production claim on CNC, not a promise that we will eat a
          $40,000 tool for a 2D clip we do not run.
        </p>
        <p>
          Total cost of a part that changes twice in year one: fourslide
          loses even if cycle time later looks pretty. You paid for two
          tools and you still have not shipped the revision. CNC shipped
          the first revision while the first fourslide tool was in CAD.
        </p>

        <h2 id="geometry">Geometry fourslide cannot honestly take</h2>
        <ul>
          <li>
            True 3D centerlines — routing forms, stacking feet, out-of-plane
            returns, frames that are not flat.
          </li>
          <li>
            Closed rectangles and basket rims that have to strip off a
            mandrel. CNC plans the bend order. Fourslide often becomes
            weld-after-form anyway.
          </li>
          <li>
            Heavy 3/8, 7/16, and 1/2 in stock. That is{" "}
            <Link href="/processes/heavy-wire-forming">4–14 mm CNC</Link>,
            not a clip cell.
          </li>
          <li>
            Short legs between bends that need the head to move around the
            wire instead of four slides fighting for the same space.
          </li>
        </ul>
        <p>
          If the print is a light 2D clip with a coined pad, fourslide may
          still be the cell. If the print is a guard, a shelf frame, a
          330 basket, a cable-tray rib — it was never fourslide.
        </p>

        <h2 id="cell">The cell we actually run: Robomac 214TF</h2>
        <p>
          Floor machine: Numalliance Robomac 214TF (TF 214). 3D from coil.
          Bending head free around the wire. Production band 4–14 mm. Stock
          coil 3/8, 7/16, 1/2 in. Then{" "}
          <Link href="/processes/resistance-welding">resistance weld</Link>
          {" "}and{" "}
          <Link href="/processes/mig-tig-assembly">TIG / MIG</Link> when
          the form has to close or take a second piece.
        </p>
        <p>
          Programming is a sequence on the machine, not a cam grind. First
          article is overbend and feed, not a second tool order. That is
          why a 3D CNC shop can be in production while a fourslide house
          is still quoting the die.
        </p>
        <p>
          Named list: <Link href="/equipment">equipment</Link>. Process
          theory for the 3D cell:{" "}
          <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>.
        </p>

        <h2 id="band">How it sits next to 4–14 mm</h2>
        <BandTable
          heading="Fourslide vs CNC"
          rows={{
            4: "Overlap zone. Simple 2D clips can still be fourslide; 3D and revisions are CNC.",
            8: "Fourslide is uncommon. CNC is the default.",
            12: "Not a fourslide job. Frames, guards, wire baskets.",
            14: "Not a fourslide job.",
          }}
        />

        <h2 id="speed">Speed — parked for the next page</h2>
        <p>
          Fourslide ads talk parts per minute. Fine. We can put a million
          parts across a Robomac 214TF before a fourslide tool is even
          made — and that is before you count what the tool costs. Cycle
          time after the tool exists is a different argument. It gets its
          own page. This one is tooling and cost.
        </p>

        <h2 id="not">What we do not quote</h2>
        <p>
          Light fourslide clips, music-wire snaps, and strip stampings. We
          will say so. If the part is a 2D or 3D form in 4–14 mm, it
          belongs on the 214TF, then weld and finish as required.
        </p>

        <h2 id="faq">FAQ</h2>
        <h3>What is fourslide manufacturing?</h3>
        <p>
          Cam-driven slides forming wire or strip in a dedicated tool. High
          volume, frozen 2D, usually light wire. Not a 3D CNC program.
        </p>
        <h3>Is fourslide cheaper than CNC?</h3>
        <p>
          Piece price can be, after the tool is paid for, on the right
          clip. Landed cost including tool, tryout, and revisions usually
          is not — especially in 4–14 mm and 3D. We quote CNC without a
          die in the job.
        </p>
        <h3>Do you run fourslide?</h3>
        <p>
          No. Explain only. Production is the Robomac 214TF.
        </p>

        <h2 id="next">Related</h2>
        <ul>
          <li>
            <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>
          </li>
          <li>
            <Link href="/processes/2d-cnc-wire-forming">2D CNC wire forming</Link>
          </li>
          <li>
            <Link href="/equipment">Numalliance Robomac 214TF</Link>
          </li>
          <li>
            <Link href="/wire-forming">Wire forming in the USA</Link>
          </li>
        </ul>

        <QuoteBand title="Is it actually a CNC form?" />
      </DocPage>
    </>
  );
}
