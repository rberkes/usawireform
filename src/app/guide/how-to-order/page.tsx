import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { FAQSchema, HowToSchema, ArticleSchema } from "@/components/SeoSchemas";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { DRAWING_FREE_STEP, DRAWING_LIST } from "@/lib/drawings";
import { PRICE_LINE } from "@/lib/price";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";
import { SOURCE_BUYER_QUOTE_LINE } from "@/lib/source-plans";

export const metadata = pageMeta({
  title: "How to Order Wire Forms",
  description:
    "How to order custom CNC wire forms: upload a STEP or PDF 3-view, use the website for the lowest price, and when a desk quote is required.",
  path: "/guide/how-to-order",
  keywords: [
    "how to order wire forms",
    "upload STEP wire form",
    "CNC wire forming quote",
    "custom wire form order",
  ],
});

const faqs = [
  {
    question: "What file formats can I upload?",
    answer: `${DRAWING_LIST}. ${DRAWING_FREE_STEP}`,
  },
  {
    question: "Why use the website instead of emailing a quote?",
    answer:
      "The site is the lowest price. A desk quote is only required for parts outside typical limits — wire outside 4–14 mm on this floor, or a process this cell does not run. Source still matches those prints to shops that filed the right iron.",
  },
  {
    question: "Do I need a STEP?",
    answer:
      "No. A PDF 3-view, DXF, or SolidWorks part is enough. We model a STEP free from a dimensioned print. Photos and office files are notes, not a quote file.",
  },
  {
    question: "What happens after I upload?",
    answer: `The desk holds the print. Shops are not emailed until we release it. ${SOURCE_BUYER_QUOTE_LINE}`,
  },
];

const howToSteps = [
  {
    name: "Prepare the file",
    text: `Use ${DRAWING_LIST}. A wire centerline plus diameter is better than a solid sweep. No STEP? A PDF 3-view is enough — we model it free.`,
  },
  {
    name: "Upload on the website",
    text: "Open /source and drop the file. That path is cheaper than a custom desk quote.",
  },
  {
    name: "Enter the job spec",
    text: "Wire size in mm or inches, 2D or 3D cell, quantity, and a 5-digit US ZIP so matching starts in your state.",
  },
  {
    name: "Choose drawing privacy",
    text: "Keep the STEP at the desk, or release it to a shop that unlocks the lead. The file is never attached to email.",
  },
  {
    name: "Read the receipt",
    text: "You get a named note from the desk. Instant estimate on this site is a ballpark for the Northeast Ohio 214TF — not a production quote.",
  },
];

export default function HowToOrderPage() {
  return (
    <>
      <FAQSchema questions={faqs} />
      <HowToSchema
        name="How to order custom CNC wire forms"
        description="Upload a STEP or PDF 3-view, use the website for the lowest price, and know when a desk quote is required."
        steps={howToSteps}
      />
      <ArticleSchema
        headline="How to Order Wire Forms"
        description="Getting started: file formats, website quoting, Source matching, and when the desk has to price the job."
        url="/guide/how-to-order"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", url: "/guide/design-for-wire-forming" },
          { name: "How to order", url: "/guide/how-to-order" },
        ]}
      />
      <DocPage
        kicker="Guide"
        title="How to order wire forms"
        lede="Upload the print. The website is the lowest price. A person only prices parts this cell cannot run."
        breadcrumbs={[
          { label: "Guides", href: "/guide/design-for-wire-forming" },
          { label: "How to order" },
        ]}
        toc={[
          { id: "upload", label: "Upload the file" },
          { id: "formats", label: "Formats" },
          { id: "price", label: "Website vs desk" },
          { id: "after", label: "After you send" },
          { id: "print", label: "What the print needs" },
          { id: "faq", label: "FAQ" },
          { id: "next", label: "Related" },
        ]}
      >
        <h2 id="upload">Upload the file</h2>
        <p>
          Start on{" "}
          <Link href="/source#job">Source</Link>. Drop a STEP or a drawing,
          enter wire size, 2D or 3D, quantity, and ZIP. That is the order path.
          Instant estimate on{" "}
          <Link href="/instant-quote">/instant-quote</Link> is a ballpark for
          this floor — cuts, bends, and inches on the Northeast Ohio 214TF. It
          is not a production quote.
        </p>
        <p>{PRICE_LINE}</p>

        <h2 id="formats">Formats we read</h2>
        <p>
          {DRAWING_LIST}. {DRAWING_FREE_STEP} Photos, spreadsheets, and office
          files are notes. They do not quote until a real drawing is on the
          job.
        </p>
        <ul>
          <li>STEP / STP / IGES — fastest path</li>
          <li>DXF / DWG — 2D profiles</li>
          <li>SLDPRT — SolidWorks part</li>
          <li>PDF 3-view — we model a STEP free</li>
        </ul>

        <h2 id="price">Website price vs a desk quote</h2>
        <p>
          Using the site gets the absolute best price. A desk quote is only
          required for parts outside typical limits ({WIRE.short} on this
          floor, or a process this cell does not run). Source still matches
          those prints to shops that filed the right iron — we do not invent
          capacity they did not list.
        </p>

        <h2 id="after">After you send</h2>
        <p>
          The desk holds the print. Shops are not notified until we release it.
          A STEP is never attached to email. {SOURCE_BUYER_QUOTE_LINE} You
          choose whether a quoting shop can open the file.
        </p>

        <h2 id="print">What the print needs</h2>
        <p>
          Wire diameter, alloy, inside bend radii, and the few dimensions that
          actually mate. The{" "}
          <Link href="/guide/design-for-wire-forming">design guide</Link> is the
          full list. Coil grades live in the{" "}
          <Link href="/materials">Material Catalog</Link>. Tooling and the
          100-piece minimum sit on{" "}
          <Link href="/quoting">Quotes, tooling, and coil</Link>.
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
            <Link href="/source#job">Upload a print</Link>
          </li>
          <li>
            <Link href="/guide/design-for-wire-forming">Design guide</Link>
          </li>
          <li>
            <Link href="/materials">Material Catalog</Link>
          </li>
          <li>
            <Link href="/quoting">Quotes, tooling, and coil</Link>
          </li>
          <li>
            <Link href="/instant-quote">Instant estimate</Link> — this floor
            only
          </li>
        </ul>

        <QuoteBand title="Have a form to run?" />
      </DocPage>
    </>
  );
}
