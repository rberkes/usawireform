import Image from "next/image";
import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ServiceSchema, FAQSchema } from "@/components/SeoSchemas";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "3D CNC Wire Forming",
  description: "3D CNC wire forming in 4–14 mm: how the cell works, design rules, and what to send on a print. Northeast Ohio production with 50+ years experience.",
  path: '/processes/3d-cnc-wire-forming',
  image: {
    url: "/shop/robomac-214tf.jpg",
    width: 1536,
    height: 1024,
    alt: "Numalliance Robomac 214TF 3D CNC wire forming machine",
  },
  keywords: [
    "3D CNC wire forming",
    "3D wire bending",
    "CNC wire forming service",
    "wire forming process",
    "4-14 mm wire",
    "custom wire forms",
    "Northeast Ohio wire forming",
  ],
});

const faqs = [
  {
    question: "Is 3D CNC wire forming the same as 3D CNC wire bending?",
    answer: "In this trade, yes. Machine builders say bender; shops say former. Same cell: straighten, feed, rotate, bend, cut.",
  },
  {
    question: "What wire diameter runs on a 3D CNC former?",
    answer: "Light cells start around 0.5 mm. Our production band is 4–14 mm (0.157–0.551 in). Many brochure heads stop at 12 mm; 14 mm is the top of industrial wire CNC.",
  },
  {
    question: "Can a benchtop CNC wire bender make these parts?",
    answer: "No. Spring-temper, stainless, and 4–14 mm carbon need an industrial head, a real straightener, and a cutoff that does not deform the end.",
  },
  {
    question: "What is the minimum bend radius for 3D CNC wire forming?",
    answer: "Inside radius of about 1× wire diameter is a common floor for carbon spring wire. Stainless and harder tempers often want closer to 2× to avoid cracking on the outside fiber.",
  },
  {
    question: "What tolerances can 3D CNC wire forming achieve?",
    answer: "Linear dimensions: ±0.005\" to ±0.015\". Bend angles: ±0.5° to ±2°. Tighter tolerances need a fixture and stable material.",
  },
];

const toc = [
  { id: "what-it-is", label: "What it is" },
  { id: "how-it-works", label: "How the cell works" },
  { id: "not-this", label: "Not these processes" },
  { id: "2d-vs-3d", label: "2D vs 3D" },
  { id: "vs-fourslide", label: "CNC vs fourslide" },
  { id: "design-rules", label: "Design rules" },
  { id: "tolerances", label: "Tolerances" },
  { id: "materials", label: "Materials" },
  { id: "usa", label: "USA production" },
  { id: "files", label: "What to send" },
  { id: "faq", label: "FAQ" },
];

export default function ThreeDCNCPage() {
  const breadcrumbItems = [
    { label: "Processes", href: "/processes" },
    { label: "3D CNC Wire Forming" },
  ];

  return (
    <>
      <ServiceSchema
        name="3D CNC Wire Forming"
        description="Custom 3D CNC wire forming service for 4-14mm wire. Frames, hooks, routing forms, and wire-basket geometry with 50+ years of industry experience."
        url="/processes/3d-cnc-wire-forming"
        serviceType="Wire Forming Service"
        image="/shop/robomac-214tf.jpg"
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Processes", url: "/processes" },
          { name: "3D CNC Wire Forming", url: "/processes/3d-cnc-wire-forming" },
        ]}
      />
      <DocPage
        kicker="Process"
        title="3D CNC wire forming"
        lede="Wire fed, straightened, and bent in more than one plane under CNC control. On this site that means 4–14 mm frames, hooks, routing forms, and wire-basket geometry — not light clips."
        toc={toc}
        breadcrumbs={breadcrumbItems}
      >
        <figure className="-mt-4 mb-10">
          <div className="relative aspect-[3/2] overflow-hidden bg-inset">
            <Image
              src="/shop/robomac-214tf.jpg"
              alt="Numalliance Robomac 214TF — 3D CNC wire forming from coil, 4–14 mm"
              fill
              priority
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover object-[center_42%]"
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            Numalliance Robomac 214TF. The 3D CNC cell for 4–14 mm from coil.
          </figcaption>
        </figure>
        <h2 id="what-it-is">What 3D CNC wire forming is</h2>
        <p>
          A 3D CNC wire former takes wire from a coil, removes cast and helix,
          feeds a programmed length, then bends that length around pins, mandrels,
          or a rotary head. After a bend, the wire (or the tooling) indexes in
          rotation so the next bend happens in a new plane. Cutoff is usually the
          last station.
        </p>
        <p>
          The output is a single piece of wire with a defined 3D centerline —
          not a stamping, not a machined bar, not a welded assembly unless a
          secondary op is added. That is why the process wins on parts that are
          mostly "a path in space": retainers, J-hooks, brake and seat clips,
          cable guides, wire-basket frames, and medical or electronic forms that have
          to clear other components.
        </p>
        <p>
          If every bend lives in one plane, the same family of machines can run{" "}
          <Link href="/processes/2d-cnc-wire-forming">2D CNC wire forming</Link>.
          3D is the extra rotary axis — and the extra collision, springback, and
          inspection problem that comes with it.
        </p>

        <h2 id="how-it-works">How the cell works</h2>
        <h3>Decoil and straighten</h3>
        <p>
          Wire arrives in coil. Coil set (cast) and helix will print into every
          dimension if they are not taken out. Straighteners are rotary (spinners)
          or roll. Setup is material-specific: diameter, tensile, and coating
          change how aggressively you can work the wire before you mark it or
          work-harden the surface.
        </p>
        <h3>Feed</h3>
        <p>
          Servo feed rollers push a programmed length to the forming head. Feed
          error becomes length error between bends. Coatings and oil change grip.
          This is why a first-article tweak often looks like "add 0.3 mm of feed
          before bend 4," not a drawing change.
        </p>
        <h3>Bend, rotate, repeat</h3>
        <p>
          A bend is a rotation of a tool around a pin or a wrap around a mandrel
          to a commanded angle. 3D forming then applies a torsion / rotation
          axis so the next bend is not coplanar. The program is a sequence:
          feed → bend → rotate → feed → bend → cut. Tooling access and wire
          springback both have to be true at every step, or the last bends stack
          error from the first ones.
        </p>
        <h3>Cutoff and end work</h3>
        <p>
          Cutoff may be shear, bushing cut, or a dedicated tool. Ends can leave
          the former square, or go to a secondary for chamfer, coin, flatten,
          pierce, or thread. Closed shapes sometimes need a designed gap, a
          weld, or a bend sequence that does not trap the part on the tooling.
        </p>

        <h2 id="not-this">What this is not</h2>
        <p>
          Shopping modules for this search mix in the wrong machines. Separate
          them on the print and in the RFQ:
        </p>
        <ul>
          <li>
            <strong>CNC wire EDM (wire cut)</strong> — a brass wire burns a path
            through plate. It does not bend wire.
          </li>
          <li>
            <strong>Desktop CNC mills / routers</strong> — they cut stock. They
            do not form coil.
          </li>
          <li>
            <strong>Sheet-metal forming</strong> — brake, punch, weld. Adjacent
            shop, different process.
          </li>
          <li>
            <strong>Small-diameter tube bending</strong> — mandrel, wrinkle,
            wall thinning. Not solid wire.
          </li>
        </ul>

        <h2 id="2d-vs-3d">When 3D is required — and when 2D is enough</h2>
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>2D CNC</th>
              <th>3D CNC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Do all bends share one plane?</td>
              <td>Yes — stay 2D</td>
              <td>No — 3D</td>
            </tr>
            <tr>
              <td>Programming and prove-out</td>
              <td>Shorter</td>
              <td>Longer; more collision checks</td>
            </tr>
            <tr>
              <td>Inspection</td>
              <td>Overlay / optical on a plane</td>
              <td>Fixture, CMM, or 3D scan</td>
            </tr>
            <tr>
              <td>Typical parts</td>
              <td>Flat clips, links, 2D hooks</td>
              <td>Routing forms, 3D hooks, frames</td>
            </tr>
          </tbody>
        </table>
        <p>
          A part that <em>looks</em> 3D on a shaded CAD view is sometimes still a
          2D form with one out-of-plane kick. Call that out. Forcing a simple
          part onto a 3D program adds time without adding capability.
        </p>

        <h2 id="vs-fourslide">3D CNC vs fourslide / multislide</h2>
        <p>
          Fourslide is a dedicated cam tool. CNC is a program and standard
          pins. Tooling and cost — not cycle time — are why a{" "}
          <Link href="/equipment">Robomac 214TF</Link> wins the 4–14 mm
          jobs on this floor. Full argument:{" "}
          <Link href="/processes/fourslide">fourslide vs 3D CNC</Link>.
        </p>

        <h2 id="design-rules">Design rules that actually matter</h2>
        <p>
          These are starting points, not a substitute for the material cert and
          a first article. See also the{" "}
          <Link href="/guide/design-for-wire-forming">
            design-for-wire-forming guide
          </Link>
          .
        </p>
        <h3>Bend radius</h3>
        <p>
          Inside radius of about 1× wire diameter is a common floor for carbon
          spring wire. Stainless and harder tempers often want closer to 2× to
          avoid cracking on the outside fiber. Tighter than 1D is a process
          discussion, not a default.
        </p>
        <h3>Minimum leg between bends</h3>
        <p>
          The tool has to occupy space. A straight between two bends that is
          shorter than about 2–3× diameter is where programs get ugly: tool
          collisions, poor wrap, or a bend that has to be made as a compound
          move. If the print needs a tight zigzag, say so early.
        </p>
        <h3>Springback</h3>
        <p>
          Higher yield strength means more springback. CNC overbends to land on
          the print angle. That compensation is empirical per alloy, diameter,
          and tooling radius. It is why a material callout of "spring steel"
          is not enough — A228 music wire and 302 stainless do not overbend the
          same.
        </p>
        <h3>Closed forms and trapped parts</h3>
        <p>
          If the centerline closes on itself, the part can lock on the mandrel.
          Options: a small designed gap, a weld after forming, a cutoff that
          opens the loop, or a bend order that strips the part. Do not assume
          the machine can "just form a rectangle and drop it."
        </p>
        <h3>Ends</h3>
        <p>
          Square-cut ends are cheapest. Chamfer if the wire has to enter a hole.
          Flatten or coin if it has to rivet or weld. Thread if it is a fastener.
          Put end work on the print as a specification, not a note to the buyer.
        </p>

        <h2 id="tolerances">Tolerances worth putting on a print</h2>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Typical starting point</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Linear (leg, span)</td>
              <td>±0.005" to ±0.015"</td>
              <td>Tighter needs a fixture and a stable material</td>
            </tr>
            <tr>
              <td>Bend angle</td>
              <td>±0.5° to ±2°</td>
              <td>Springback-dominated; call out critical angles only</td>
            </tr>
            <tr>
              <td>Wire diameter</td>
              <td>Mill tolerance</td>
              <td>Do not tighten this in forming; buy the grade</td>
            </tr>
            <tr>
              <td>Positional (3D)</td>
              <td>Fixture / RFS</td>
              <td>Datum from the mating part, not from coil set</td>
            </tr>
          </tbody>
        </table>
        <p>
          Tightening every dimension on a 3D form does not make a better part.
          It makes a more expensive inspection. Mark the interfaces that mate
          to plastic, sheet metal, or a fastener. Leave the rest at process
          capability.
        </p>

        <h2 id="materials">Materials that run well in 3D CNC</h2>
        <ul>
          <li>
            <strong>ASTM A228 music wire</strong> — high tensile, sharp springback,
            common for clips and small forms.
          </li>
          <li>
            <strong>Stainless 302 / 304 / 316 / 330</strong> — coil grades;
            more springback and galling than carbon. Full list:{" "}
            <Link href="/materials/300-series-stainless">
              300-series stainless
            </Link>
            .
          </li>
          <li>
            <strong>Oil-tempered and hard-drawn carbon</strong> — larger diameters,
            industrial clips and frames.
          </li>
          <li>
            <strong>Galvanized and pre-coated</strong> — coating can mark in the
            straightener and tools; specify if appearance is cosmetic.
          </li>
          <li>
            <strong>Copper, brass, aluminum</strong> — softer, different min radii,
            used for electrical and lightweight forms.
          </li>
        </ul>
        <p>
          Finish (zinc, nickel, powder, passivate) is usually after form, except
          when pre-plated wire is required. The full coil list — 1010 / 1018,
          spring steels, 300-series including 330, brass, and copper — is{" "}
          <Link href="/materials">materials</Link>.
        </p>

        <h2 id="usa">Why this process sits in USA production</h2>
        <p>
          3D CNC wire forming is a setup-and-program trade, not a labor-hour
          race. The cost is in prove-out, material certs, and whether the part
          still matches the mating assembly after a revision. That is why it
          holds in the United States for:
        </p>
        <ul>
          <li>Automotive and off-highway clips with PPAP and running changes</li>
          <li>Medical and electronics forms with short lead time and lot control</li>
          <li>Defense and industrial equipment where the print will move</li>
          <li>Reshored appliance, HVAC, and furniture hardware</li>
        </ul>
        <p>
          Overseas fourslide can still win a frozen, high-volume 2D clip. A 3D
          form that changes twice in a year usually should not leave the country
          for a tool that takes twelve weeks to recut. For the wider process
          map, start at{" "}
          <Link href="/wire-forming">wire forming in the USA</Link>.
        </p>

        <h2 id="files">What to send to get a real 3D CNC quote</h2>
        <ol>
          <li>PDF with diameters, radii, and critical-to-fit dimensions</li>
          <li>DXF or STEP of the wire centerline (not just a shaded solid)</li>
          <li>Material spec — alloy, tensile or temper, coating</li>
          <li>Finish and any end work</li>
          <li>Quantity: first article, annual, and whether the print is frozen</li>
        </ol>
        <p>
          A physical sample is enough to reverse a centerline if the CAD is
          missing. A photo is not.
        </p>

        <h2 id="faq">FAQ</h2>
        <h3>Is 3D CNC wire forming the same as 3D CNC wire bending?</h3>
        <p>
          In this trade, yes. Builders say bender; shops say former. Same cell:
          straighten, feed, rotate, bend, cut.
        </p>
        <h3>What wire diameter runs on a 3D CNC former?</h3>
        <p>
          Light cells start around 0.5 mm. This site's production band is{" "}
          <Link href="/processes/heavy-wire-forming">4–14 mm</Link> (0.157–0.551
          in). Many brochure heads stop at 12 mm; 14 mm is the top of industrial
          wire CNC. Diameter, tensile, and bend radius all have to fit the head
          — not just the PDF max.
        </p>
        <h3>Can a benchtop CNC wire bender make these parts?</h3>
        <p>
          No. Spring-temper, stainless, and 4–14 mm carbon need an industrial
          head, a real straightener, and a cutoff that does not deform the end.
          That is the cell this shop runs.
        </p>

        <QuoteBand title="Have a 3D form to run?" />
      </DocPage>
    </>
  );
}
