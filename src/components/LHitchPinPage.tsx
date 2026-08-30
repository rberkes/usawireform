import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ProductForm } from "@/components/ProductForm";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { STOCK } from "@/lib/catalog";
import type { LHitchPinLander } from "@/lib/l-hitch-pins";
import { PRICE_LINE } from "@/lib/price";
import { WIRE } from "@/lib/range";

const FAQS = [
  {
    question: "Do you make heavy-duty L hitch pins for trailers?",
    answer: `Yes. 2D CNC from coil in ${WIRE.short}. Stock ${STOCK}. Long leg, 90° stop, cutoff. A clip hole when the print has one.`,
  },
  {
    question: "Do you form 5/8 in hitch pins?",
    answer: `No. 5/8 in is 15.9 mm — over ${WIRE.maxMm} mm. 9/16 in is over too. 1/2 in (12.7 mm) is the heavy stock pin on this cell.`,
  },
  {
    question: "Is the hitch pin clip included?",
    answer:
      "No. The clip is a separate part. Most store clips are under 4 mm. We name that instead of quoting it as stock. Heavy clips in 3/8 to 1/2 in run here — see hitch pin clips.",
  },
  {
    question: "What do I send for a quote?",
    answer:
      "Long-leg length, short-leg length, wire size, alloy, and whether you need a clip hole. 100-piece minimum. You buy the coil except when we say otherwise.",
  },
];

export function LHitchPinPage({ lander }: { lander: LHitchPinLander }) {
  return (
    <>
      <ServiceSchema
        name={lander.title}
        description={lander.description}
        url={lander.path}
        serviceType="L hitch pins"
      />
      <FAQSchema questions={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Products", url: "/products" },
          { name: lander.title, url: lander.path },
        ]}
      />
      <DocPage
        kicker={lander.kicker}
        title={lander.h1}
        lede={`${PRICE_LINE} ${lander.lede}`}
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: lander.title },
        ]}
        toc={[
          { id: "form", label: "How we form them" },
          { id: "size", label: "Sizes" },
          { id: "clip", label: "The clip" },
          { id: "faq", label: "FAQ" },
          { id: "next", label: "Related" },
        ]}
      >
        <div className="not-prose my-8 max-w-md bg-inset">
          <ProductForm slug="l-pins" className="h-auto w-full p-8 sm:p-12" />
          <p className="border-t border-line px-5 py-3 font-mono text-[11px] tracking-widest text-muted uppercase">
            Formed from coil · {STOCK}
          </p>
        </div>

        <h2 id="form">How we form them</h2>
        <p>
          2D CNC on the Numalliance Robomac 214TF: feed, one 90° bend, cutoff.
          The long leg goes through the receiver or implement hole. The short
          leg is the stop. Ends stay as-cut unless the print wants a chamfer or
          a hole for a clip.
        </p>
        <p>
          This is a wire form, not a turned pin from bar. Same cell as{" "}
          <Link href="/products/l-pins">L hitch pins in the catalog</Link>
          {", "}
          <Link href="/products/trailer-latches">trailer latches</Link>, and{" "}
          <Link href="/powder-coating-hooks/s-hooks">S-hooks</Link>. Instant estimate stays this
          floor.
        </p>

        <h2 id="size">3/8, 7/16, and 1/2 in — not 5/8</h2>
        <p>
          Stock tooling is {STOCK}. Trailer receivers that want a heavy pin
          take 1/2 in on this cell. Implements and lighter hitches take 3/8 or
          7/16 in. Custom diameters inside {WIRE.short} are new tooling.
        </p>
        <p>
          5/8 in hitch pins are 15.9 mm. The ceiling here is {WIRE.maxMm} mm
          (0.551 in). We will not quote a 5/8 in pin as if it ran on the 214TF.
          Send that print to{" "}
          <Link href="/source">Source</Link> if another shop filed a heavier
          cell.
        </p>

        <h2 id="clip">The clip is a separate part</h2>
        <p>
          The hairpin or R-clip that keeps the pin in the hole is{" "}
          <Link href="/products/hitch-pin-clips">hitch pin clips</Link>. Most
          clips that retain a 1/2 in pin are 1/8 in wire — under 4 mm. We name
          that. If the clip itself is 3/8 to 1/2 in, it runs here.
        </p>

        <h2 id="faq">FAQ</h2>
        <dl>
          {FAQS.map((row) => (
            <div key={row.question} className="mt-6">
              <dt className="font-medium">{row.question}</dt>
              <dd className="mt-2 text-muted">{row.answer}</dd>
            </div>
          ))}
        </dl>

        <h2 id="next">Related</h2>
        <ul>
          <li>
            <Link href="/products/l-pins">Catalog: L hitch pins</Link>
          </li>
          <li>
            <Link href="/products/hitch-pin-clips">Hitch pin clips</Link>
          </li>
          <li>
            <Link href="/products/trailer-latches">Trailer latches</Link>
          </li>
          <li>
            <Link href="/products/pins-and-clips">Pins and clips</Link>
          </li>
          <li>
            <Link href="/sizes">Stock sizes</Link>
          </li>
        </ul>
        <QuoteBand title={lander.path === "/heavy-duty-l-hitch-pins" ? "Have a trailer pin to run?" : "Have an L hitch pin to run?"} />
      </DocPage>
    </>
  );
}
