import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { ArticleSchema, FAQSchema } from "@/components/SeoSchemas";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Specifying Cable Support Without a Patented Catalog",
  description:
    "How engineers specify trays, J-hooks, and bolted U-hangers instead of paying a premium for patented messenger-lock or snap-on hanger catalogs. Not legal advice.",
  path: "/guide/open-cable-support",
  keywords: [
    "cable support specification",
    "solar cable tray design",
    "J-hook cable support",
    "unpatented cable hangers",
    "specify cable tray vs hanger",
    "PV array cable management",
  ],
});

const faqs = [
  {
    question: "Did anyone patent galvanized steel for cable hangers?",
    answer:
      "No. Catalog patents cover a specific clip, lock, or snap-on geometry — and sometimes the look of that part. They list galvanized round wire, flat wire, stainless, or aluminum as materials the patented device may be made from. The mill coil is not locked up.",
  },
  {
    question: "How do I avoid paying a premium for a patented hanger catalog?",
    answer:
      "Do not specify that catalog. Specify ordinary hardware: a welded cable tray, a J-hook off structure, or a U-hanger that bolts to a named member. Those architectures are not a reverse of a patented messenger lock or torque-tube snap-on.",
  },
  {
    question: "Can I copy a patented hanger in round wire or a different color?",
    answer:
      "No. Utility patents cover function regardless of round vs flat wire and regardless of coating color. Design patents cover ornamental appearance. Changing one radius, the jacket color, or the mill grade is not a new design.",
  },
  {
    question: "Will USA Wire Form reverse a patented catalog SKU?",
    answer:
      "No. Send the customer’s own drawing for a tray, J-hook, U-hanger, staple, or guard. A competitor part number, a photo of that clip, or “make it like this” is declined.",
  },
  {
    question: "If I draw an original hanger, will you form it?",
    answer:
      "If it is your geometry, in 4–14 mm, and it is not a lookalike of a patented catalog clip, we will quote it. If it still practices a locking messenger arm, cooperating gripper hooks, or a snap-on tube grip, we still decline it. Counsel reviews the print when the risk is unclear — we are a forming shop, not a patent firm.",
  },
];

const toc = [
  { id: "not-advice", label: "Not legal advice" },
  { id: "what-is-patented", label: "What a catalog patents" },
  { id: "pay-or-specify", label: "Pay the SKU or specify open hardware" },
  { id: "architectures", label: "Architectures that stay open" },
  { id: "not-this", label: "What is not a workaround" },
  { id: "print", label: "What to put on the print" },
  { id: "faq", label: "FAQ" },
  { id: "next", label: "Related" },
];

export default function OpenCableSupportPage() {
  const breadcrumbItems = [
    { label: "Guide", href: "/guide" },
    { label: "Open cable support" },
  ];

  return (
    <>
      <FAQSchema questions={faqs} />
      <ArticleSchema
        headline="Specifying Cable Support Without a Patented Catalog"
        description="Engineer-facing guide: specify trays, J-hooks, and bolted U-hangers instead of patented messenger-lock or snap-on hanger catalogs. Not legal advice."
        url="/guide/open-cable-support"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guide", url: "/guide" },
          { name: "Open cable support", url: "/guide/open-cable-support" },
        ]}
      />
      <DocPage
        kicker="Guide"
        title="Specifying cable support without a patented catalog"
        lede="A catalog OEM can patent a clip and charge for it. That is their right. You pay that premium when you need that clip. When you do not, specify a tray, a J-hook, or a bolted U — and draw it as your own hardware."
        toc={toc}
        breadcrumbs={breadcrumbItems}
      >
        <h2 id="not-advice">This is not legal advice</h2>
        <p>
          This page is how a 4–14 mm forming shop talks to engineers about
          prints. It is not a clearance opinion, a freedom-to-operate study, or
          a promise that a given drawing is unencumbered. Patent counsel
          reviews geometry when the job is close to a known catalog. We form
          what we will quote; we do not opine on claims.
        </p>

        <h2 id="what-is-patented">What a catalog actually patents</h2>
        <p>
          Utility patents cover a <em>device and a method</em> — a captive lock
          on a messenger, cooperating hooks that squeeze onto a strand, a
          spring grip that snaps over a torque tube, a copper-composite
          messenger used as a ground path. Design patents cover the{" "}
          <em>look</em> of a specific part. Neither one patents galvanized
          steel, 1018, Class 3 zinc, or “a hanger that holds cable.”
        </p>
        <p>
          Claims often list materials the patented part may be made from:
          round galvanized, flat galvanized, stainless, aluminum, with or
          without plastisol. That list is not a lock on the mill. It is the
          catalog saying “our clip, in these metals.” Run the same coil into a
          tray or a J-hook and you are not using their clip.
        </p>

        <h2 id="pay-or-specify">Pay the SKU, or specify something else</h2>
        <p>
          If the array needs that exact lock, that exact snap-on, or that
          listed messenger-as-ground package, buy it from the patent holder.
          The premium is the product.
        </p>
        <p>
          If the job is “keep jacketed cable off the dirt for twenty-five
          years,” that is a support problem, not a clip problem. Specify
          hardware that is ordinary in plants and halls: a welded channel, an
          open hook off a member, a U that bolts. Then own the drawing.
        </p>

        <h2 id="architectures">Architectures that stay on the open side</h2>
        <p>
          These are the forms this shop will quote for{" "}
          <Link href="/industries/solar">solar</Link> and{" "}
          <Link href="/industries/electrical">electrical</Link> support. They
          hang or bolt from <em>structure</em>. They are not a reverse of a
          messenger-lock or tube-snap catalog.
        </p>
        <h3>Welded wire cable tray</h3>
        <p>
          Mesh bottom, sidewalls, lip, splices. Pitch, width, and hangers on{" "}
          <Link href="/products/cable-trays">the tray print</Link>. Usual coil{" "}
          <Link href="/materials">1018</Link>, zinc after weld; 304 when the
          owner spec is stainless. The cable sits in a channel. Nothing clips
          a messenger with a patented arm.
        </p>
        <h3>J-hook off a purlin, pier, or rack</h3>
        <p>
          An open <Link href="/products/j-hooks">J</Link> that hangs from a
          named member. Throat and wire diameter on the drawing. String,
          feeder, AC, or data. If it can fall off when bumped, it is the old
          open hang — not a captive lock.
        </p>
        <h3>U-hanger or U-bolt to a named OD</h3>
        <p>
          Two legs and a radius.{" "}
          <Link href="/products/u-hangers">Inside width</Link> matches the
          pipe, conduit, or rack tube. Ends square, flattened, or threaded.
          It clamps or bolts. It does not flex-snap over a torque tube as a
          spring catalog.
        </p>
        <h3>Pad guards, grids, and staples</h3>
        <p>
          Inverter-pad <Link href="/products/machine-guards">guards</Link>,
          mesh, and <Link href="/products/ground-staples">ground staples</Link>{" "}
          to the customer’s print. Not a listed EGC messenger kit and not a
          mid-pier clamp set from someone else’s grounding patent.
        </p>
        <p>
          Other trades use strut, conduit, and trench. Those are not this
          cell. They are still valid ways to avoid a clip SKU if the
          electrical spec allows them.
        </p>

        <h2 id="not-this">What is not a workaround</h2>
        <ul>
          <li>Round wire instead of flat wire on the same lock</li>
          <li>Black powder instead of orange plastisol on the same shape</li>
          <li>1018 instead of spring steel on the same cooperating hooks</li>
          <li>One radius changed, one carrier added, same snap-on tube grip</li>
          <li>“Make it like this photo” or a competitor part number on the RFQ</li>
        </ul>
        <p>
          Those moves still practice the device or still copy the look. We
          will not quote them. If you need that function, buy the catalog.
        </p>

        <h2 id="print">What to put on the print</h2>
        <ul>
          <li>Your company as the design owner — not a reverse of a SKU</li>
          <li>
            Architecture: tray, J-hook, or U-hanger, and what it hangs or
            bolts from
          </li>
          <li>Wire diameter, alloy, and finish — see the{" "}
            <Link href="/guide/design-for-wire-forming">design guide</Link>
          </li>
          <li>Inside radii modeled; critical-to-fit dims only</li>
          <li>Jacket after form if the part must stay off the circuit</li>
        </ul>
        <p>
          Send STEP or DXF plus PDF. A catalog tear-sheet is not a print. 100-piece
          minimum on production.
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
            <Link href="/industries/solar">Solar trays and array hardware</Link>{" "}
            — what we form, and what we decline
          </li>
          <li>
            <Link href="/guide/design-for-wire-forming">
              Design for wire forming
            </Link>{" "}
            — radii, legs, files
          </li>
          <li>
            <Link href="/products/cable-trays">Cable trays</Link> ·{" "}
            <Link href="/products/j-hooks">J-hooks</Link> ·{" "}
            <Link href="/products/u-hangers">U-hangers</Link>
          </li>
          <li>
            <Link href="/processes/plating-and-coating">
              Plating and coating
            </Link>{" "}
            — zinc and jackets after the bend
          </li>
        </ul>

        <QuoteBand title="Have a tray, J-hook, or U-hanger print?" />
      </DocPage>
    </>
  );
}
