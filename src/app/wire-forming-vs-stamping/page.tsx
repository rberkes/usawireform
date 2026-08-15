import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema } from "@/components/SeoSchemas";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Forming vs Stamping: Which Process for Your Part?",
  description:
    "Compare wire forming and stamping for metal parts. Learn when CNC wire forming beats stamping on cost, tooling, and design flexibility for 4–14 mm applications.",
  path: "/wire-forming-vs-stamping",
  keywords: [
    "wire forming vs stamping",
    "wire forming or stamping",
    "metal forming comparison",
    "CNC wire forming",
    "stamping vs wire bending",
  ],
});

const toc = [
  { id: "overview", label: "Overview" },
  { id: "process", label: "Process differences" },
  { id: "geometry", label: "Geometry and design" },
  { id: "tooling", label: "Tooling and cost" },
  { id: "volume", label: "Volume and lead time" },
  { id: "when-wire", label: "When to choose wire forming" },
  { id: "when-stamp", label: "When to choose stamping" },
  { id: "faq", label: "FAQ" },
];

const faqs = [
  {
    question: "Is wire forming cheaper than stamping?",
    answer:
      "Wire forming typically has lower tooling costs ($500–$2,000 vs $5,000–$50,000+ for stamping dies). For volumes under 50,000 pieces or parts that may change, wire forming is usually more cost-effective. Stamping wins on piece price at very high volumes with frozen designs.",
  },
  {
    question: "Can wire forming replace stamped parts?",
    answer:
      "Many stamped brackets, clips, and hardware can be redesigned as wire forms. Wire forming excels at load-bearing shapes, hooks, frames, and parts where the function follows a centerline. Flat panels with holes or complex sheet geometry still need stamping.",
  },
  {
    question: "What's the tooling lead time difference?",
    answer:
      "CNC wire forming tooling typically takes 1–2 weeks. Stamping dies take 6–16 weeks depending on complexity. For urgent projects or parts likely to change, wire forming's faster tooling is a significant advantage.",
  },
  {
    question: "Which process is better for prototypes?",
    answer:
      "Wire forming is better for prototypes. CNC programs can be modified quickly, and tooling costs are low enough to iterate. Stamping prototypes often require soft tooling or laser-cut blanks that don't represent production.",
  },
];

export default function WireFormingVsStampingPage() {
  return (
    <DocPage
      kicker="Comparison"
      title="Wire forming vs stamping"
      lede="Two ways to make a metal part — one starts with coil wire, one starts with flat strip. The right choice depends on geometry, volume, and how frozen the design is."
      toc={toc}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Wire Forming vs Stamping", url: "/wire-forming-vs-stamping" },
        ]}
      />
      <FAQSchema questions={faqs} />

      <h2 id="overview">Overview</h2>
      <p>
        Wire forming and stamping both produce metal parts from coil stock, but
        they start from different raw materials and follow different rules.
        Understanding the trade-offs helps you choose the right process — and
        avoid expensive tooling mistakes.
      </p>
      <table>
        <thead>
          <tr>
            <th>Factor</th>
            <th>Wire Forming</th>
            <th>Stamping</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Raw material</td>
            <td>Round wire coil (4–14 mm typical)</td>
            <td>Flat strip or sheet</td>
          </tr>
          <tr>
            <td>Part geometry</td>
            <td>Centerline shapes: hooks, frames, brackets</td>
            <td>Flat parts with bends, holes, draws</td>
          </tr>
          <tr>
            <td>Tooling cost</td>
            <td>$500–$2,000 typical</td>
            <td>$5,000–$50,000+</td>
          </tr>
          <tr>
            <td>Tooling lead time</td>
            <td>1–2 weeks</td>
            <td>6–16 weeks</td>
          </tr>
          <tr>
            <td>Design changes</td>
            <td>Program edit, minor tooling</td>
            <td>Die modification or rebuild</td>
          </tr>
          <tr>
            <td>Sweet spot volume</td>
            <td>100–100,000 pieces</td>
            <td>10,000–1,000,000+ pieces</td>
          </tr>
        </tbody>
      </table>

      <h2 id="process">Process differences</h2>
      <h3>Wire forming</h3>
      <p>
        Wire forming starts with round wire from a coil. The wire is
        straightened, fed through tooling, bent to a programmed sequence, and
        cut. The part <em>is</em> the wire — there's no blank, no scrap skeleton,
        no chip. Geometry comes from the bend sequence, not from cutting material
        away.
      </p>
      <p>
        Modern{" "}
        <Link href="/processes/3d-cnc-wire-forming">CNC wire forming</Link> adds
        a rotary axis, allowing bends in multiple planes. This produces 3D
        frames, routing forms, and complex hooks that would require multiple
        stamping operations and assembly.
      </p>

      <h3>Stamping</h3>
      <p>
        Stamping starts with flat strip fed through a progressive die. Punches
        blank, pierce, form, and cut the material in sequence. The part starts
        as a 2D shape and gains 3D features through bends and draws.
      </p>
      <p>
        Stamping excels at flat parts with holes, tabs, and formed features —
        brackets, panels, enclosures, and clips where the base geometry is
        sheet-derived.
      </p>

      <h2 id="geometry">Geometry and design rules</h2>
      <p>
        The fundamental difference: wire forming follows a <strong>centerline</strong>,
        stamping starts from a <strong>flat pattern</strong>.
      </p>

      <h3>Wire forming strengths</h3>
      <ul>
        <li>Load-bearing shapes: hooks, rings, loops, handles</li>
        <li>3D routing: frames that travel in X, Y, and Z</li>
        <li>Welded assemblies: baskets, guards, racks, trays</li>
        <li>Long spans without stiffening</li>
        <li>Round cross-section for grip, appearance, or load</li>
      </ul>

      <h3>Stamping strengths</h3>
      <ul>
        <li>Flat panels with hole patterns</li>
        <li>Complex 2D profiles</li>
        <li>Drawn features: cups, bosses, embosses</li>
        <li>Thin material (under 3 mm typical)</li>
        <li>Parts that mate to flat surfaces</li>
      </ul>

      <h2 id="tooling">Tooling and cost structure</h2>
      <h3>Wire forming tooling</h3>
      <p>
        CNC wire forming uses bend tooling, straightener rolls, and a feed
        system. Tooling for a new part typically costs $500–$2,000 and arrives
        in 1–2 weeks. The CNC program defines the bend sequence — changing the
        part often means editing the program, not rebuilding tooling.
      </p>
      <p>
        This low tooling cost makes wire forming economical for mid-volume
        production and parts that may change. A $1,500 tool amortizes differently
        than a $25,000 progressive die.
      </p>

      <h3>Stamping tooling</h3>
      <p>
        Progressive dies are precision machined steel. A simple die starts
        around $5,000; complex progressive dies run $25,000–$100,000+. Lead time
        is 6–16 weeks. Design changes often require die modification at
        thousands of dollars per revision.
      </p>
      <p>
        This cost structure makes stamping economical when volumes are high
        enough to amortize the die and the design is frozen. Running changes
        in stamped automotive parts are notoriously expensive.
      </p>

      <h2 id="volume">Volume and lead time</h2>
      <table>
        <thead>
          <tr>
            <th>Volume Range</th>
            <th>Better Process</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1–100</td>
            <td>Wire forming</td>
            <td>Low tooling, quick setup</td>
          </tr>
          <tr>
            <td>100–10,000</td>
            <td>Wire forming</td>
            <td>Tooling cost dominates</td>
          </tr>
          <tr>
            <td>10,000–50,000</td>
            <td>Depends on geometry</td>
            <td>Evaluate both processes</td>
          </tr>
          <tr>
            <td>50,000–500,000</td>
            <td>Stamping (if flat geometry)</td>
            <td>Die cost amortized</td>
          </tr>
          <tr>
            <td>500,000+</td>
            <td>Stamping (if flat geometry)</td>
            <td>Piece price wins</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Caveat:</strong> These ranges assume the geometry fits the
        process. A 3D frame that would require five stamping operations plus
        assembly may be cheaper as a wire form even at high volume.
      </p>

      <h2 id="when-wire">When to choose wire forming</h2>
      <ul>
        <li>
          <strong>Centerline geometry:</strong> hooks, frames, handles, routing
          forms, baskets
        </li>
        <li>
          <strong>3D shapes:</strong> parts that travel in multiple planes
        </li>
        <li>
          <strong>Design flexibility:</strong> parts that may change or have
          multiple variants
        </li>
        <li>
          <strong>Mid-volume:</strong> 100–50,000 pieces where tooling cost
          matters
        </li>
        <li>
          <strong>Fast tooling:</strong> 1–2 weeks vs 6–16 weeks for stamping
        </li>
        <li>
          <strong>Heavy wire:</strong> 4–14 mm diameter where wire forming
          machinery is optimized
        </li>
      </ul>
      <p>
        See <Link href="/products">our product directory</Link> for examples of
        wire-formed parts.
      </p>

      <h2 id="when-stamp">When to choose stamping</h2>
      <ul>
        <li>
          <strong>Flat geometry:</strong> panels, brackets with hole patterns,
          enclosures
        </li>
        <li>
          <strong>Drawn features:</strong> cups, bosses, complex 3D sheet shapes
        </li>
        <li>
          <strong>Very high volume:</strong> 100,000+ identical parts with
          frozen design
        </li>
        <li>
          <strong>Thin material:</strong> under 3 mm where stamping machinery
          is optimized
        </li>
        <li>
          <strong>Complex 2D profiles:</strong> shapes that would require
          multiple wire sections welded together
        </li>
      </ul>

      <h2 id="faq">Frequently asked questions</h2>
      {faqs.map((faq) => (
        <div key={faq.question} className="mb-6">
          <h3 className="text-base font-semibold">{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}

      <h2>Related pages</h2>
      <ul>
        <li>
          <Link href="/wire-forming">Wire forming overview</Link>
        </li>
        <li>
          <Link href="/cnc-vs-fourslide">CNC vs fourslide comparison</Link>
        </li>
        <li>
          <Link href="/processes/3d-cnc-wire-forming">3D CNC wire forming</Link>
        </li>
        <li>
          <Link href="/guide/design-for-wire-forming">
            Design for wire forming
          </Link>
        </li>
      </ul>

      <QuoteBand title="Have a part to evaluate?" />
    </DocPage>
  );
}
