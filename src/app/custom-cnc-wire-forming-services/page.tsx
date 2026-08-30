import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { COMPANY } from "@/lib/company";
import { PRICE_LINE } from "@/lib/price";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Custom CNC Wire Forming Services",
  description: `${COMPANY} custom CNC wire forming services in ${WIRE.short}: your print, from coil, 2D and 3D on a Robomac 214TF. 100-piece minimum. Northeast Ohio.`,
  path: "/custom-cnc-wire-forming-services",
  keywords: [
    "custom CNC wire forming services",
    "CNC wire forming services",
    "custom wire forming",
    "custom CNC wire forms",
    "4-14 mm wire forming",
    "Northeast Ohio wire forming",
  ],
});

const faqs = [
  {
    question: "What are custom CNC wire forming services?",
    answer:
      "A print with a diameter, alloy, and centerline. We program a CNC former, prove first article, and run the lot. Not a catalog SKU. 100-piece minimum.",
  },
  {
    question: "What wire sizes do you form?",
    answer:
      "Production is 4–14 mm (0.157–0.551 in). Stock tooling is 3/8, 7/16, and 1/2 in. Other sizes in that band need new tooling. Below 4 mm or above 14 mm, the quote says no.",
  },
  {
    question: "Do you supply the coil?",
    answer:
      "No. You buy the coil and bring it to Northeast Ohio. We form it. If it comes in a coil — carbon, stainless including 330, aluminum including 6061-T6 — we process it.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Send a STEP, STP, IGES, PDF, DXF, or SLDPRT on /contact with quantity, diameter, and material. Instant ballpark is cuts, bends, and inches on /instant-quote. All instant quotes are subject to quote department review.",
  },
];

const toc = [
  { id: "service", label: "The service" },
  { id: "includes", label: "What is included" },
  { id: "band", label: "4–14 mm" },
  { id: "not", label: "What we do not run" },
  { id: "quote", label: "How to quote" },
  { id: "faq", label: "FAQ" },
  { id: "next", label: "Related" },
];

export default function CustomCncWireFormingServicesPage() {
  return (
    <>
      <ServiceSchema
        name="Custom CNC Wire Forming Services"
        description={`Custom CNC wire forming services in ${WIRE.short}: 2D and 3D from coil, cut-to-length, resistance weld and TIG. 100-piece minimum. Northeast Ohio.`}
        url="/custom-cnc-wire-forming-services"
        serviceType="Custom CNC Wire Forming Services"
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Custom CNC Wire Forming Services", url: "/custom-cnc-wire-forming-services" },
        ]}
      />
      <DocPage
        kicker="Services"
        title="Custom CNC wire forming services"
        lede={`${PRICE_LINE} Your centerline, from coil, on a Numalliance Robomac 214TF. ${WIRE.short} 2D and 3D CNC, then the secondaries that make it install. Northeast Ohio. Quotes nationwide.`}
        toc={toc}
      >
        <h2 id="service">Print in, form out</h2>
        <p>
          Custom CNC wire forming services means a specified alloy, diameter, and
          centerline — not a part number from a rack. {COMPANY} programs the
          Robomac, proves first article, then runs the lot. A revision that
          changes the centerline is a new program. Design rules live on{" "}
          <Link href="/guide/design-for-wire-forming">design for wire forming</Link>
          .
        </p>
        <p>
          Catalog families — hooks, grids,{" "}
          <Link href="/products/heavy-duty-wire-baskets">wire baskets</Link>,
          frames, hangers — are still custom when the print is yours. The{" "}
          <Link href="/products">product directory</Link> is the shape language.
          The drawing is the contract. Process walkthrough:{" "}
          <Link href="/wire-forming-process">wire forming process</Link>.
        </p>

        <h2 id="includes">What the service includes</h2>
        <ul>
          <li>
            <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link> when every
            bend shares one plane.
          </li>
          <li>
            <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link> when the
            next bend is out of plane — hooks, routing parts, basket rims.
          </li>
          <li>
            <Link href="/processes/cut-to-length">Cut-to-length</Link> through{" "}
            {WIRE.maxMm} mm rod, in-line with the former.
          </li>
          <li>
            <Link href="/secondary-operations">Secondaries</Link> in the same
            building: resistance weld, TIG/MIG, end forming, plate, powder,
            inspect.
          </li>
        </ul>
        <p>
          Floor iron is named on <Link href="/equipment">equipment</Link>. We
          form customer coil. We do not sell machines or steel.
        </p>

        <h2 id="band">{WIRE.metric}</h2>
        <p>
          Production is {WIRE.label}. Stock tooling is{" "}
          <Link href="/sizes">3/8, 7/16, and 1/2 in</Link>. Other diameters in{" "}
          {WIRE.short} still form — they need{" "}
          <Link href="/quoting">tooling and coil</Link>. Carbon, 300-series
          including 330, brass, copper, aluminum on coil including 6061-T6 —{" "}
          <Link href="/materials">materials</Link>. You buy the coil and bring it
          in.
        </p>
        <p>
          Heat-treat fixtures in 330:{" "}
          <Link href="/330-stainless-wire-bending-usa-parts">
            330 stainless USA parts
          </Link>
          . We form the basket. We do not run a furnace on every job.
        </p>

        <h2 id="not">What this service is not</h2>
        <ul>
          <li>
            Below {WIRE.minMm} mm or above {WIRE.maxMm} mm — the quote says no.
          </li>
          <li>
            <Link href="/processes/fourslide">Fourslide</Link> — we explain it so
            CNC is not sold for that frozen high-volume 2D job. We do not run
            fourslide.
          </li>
          <li>
            A mill. We buy American coil.{" "}
            <Link href="/steel-wire-manufacturers-in-usa">
              Steel wire manufacturers in the USA
            </Link>{" "}
            is a different trade.
          </li>
        </ul>

        <h2 id="quote">How to start a job</h2>
        <p>
          Send STEP, STP, IGES, PDF, DXF, or SLDPRT on{" "}
          <Link href="/contact">contact</Link> with quantity, diameter, material,
          and the interfaces that actually mate. Instant ballpark from cuts,
          bends, and inches: <Link href="/instant-quote">instant quote</Link>.
          Subject to quote department review. 100 pieces to start. −5% at 1,000.
          −10% at 10,000.
        </p>

        <h2 id="faq">FAQ</h2>
        {faqs.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}

        <h2 id="next">Related</h2>
        <ul>
          <li>
            <Link href="/custom-wire-forming">Custom wire forming</Link>
          </li>
          <li>
            <Link href="/cnc-wire-forming">CNC wire forming</Link>
          </li>
          <li>
            <Link href="/wire-forming-manufacturers">
              Wire forming manufacturers
            </Link>
          </li>
          <li>
            <Link href="/powder-coating-hooks">Powder coating hooks</Link>
          </li>
          <li>
            <Link href="/capabilities">Capabilities</Link>
          </li>
        </ul>

        <QuoteBand title="Have a print for custom CNC wire forming services?" />
      </DocPage>
    </>
  );
}
