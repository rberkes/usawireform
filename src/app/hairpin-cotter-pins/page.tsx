import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import {
  HAIRPIN_PAGES,
  HAIRPIN_ROOT,
  hairpinHref,
} from "@/lib/hairpin-cotter-pins";
import { PRICE_LINE } from "@/lib/price";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Hairpin Cotter Pins",
  description:
    "Hairpin cotter pins, R-clips, hitch pin clips, internal and external retainers from coil. Light catalog clips under 4 mm named. Heavy 3/8–1/2 in on this cell.",
  path: HAIRPIN_ROOT,
  keywords: [
    "hairpin cotter pins",
    "hair pin cotter pins",
    "R-clips",
    "hitch pin clips",
    "wire forming clips",
  ],
});

const faqs = [
  {
    question: "Is a hairpin cotter pin the same as a split cotter pin?",
    answer:
      "No. A split cotter is a folded pin with two tines, often hammered and bent. A hairpin cotter is a spring clip: loop and legs, pull to remove. R-clips and hitch pin clips are hairpins.",
  },
  {
    question: "Do you make 1/8 in hitch pin clips?",
    answer: `Typical 1/8 in clips sit under ${WIRE.minMm} mm. We name that. Heavy hairpins in 3/8, 7/16, and 1/2 in run here. ${WIRE.label}.`,
  },
  {
    question: "What wire for a hairpin that has to snap back?",
    answer:
      "ASTM A227 hard-drawn or A229 oil-tempered, class on the print. 1018 takes a set. Stainless clips: 302 spring or A313, not annealed 304.",
  },
];

export default function HairpinCotterPinsHub() {
  return (
    <>
      <ServiceSchema
        name="Hairpin cotter pins"
        description="Hairpin cotter pins, R-clips, and hitch pin clips from coil in 4–14 mm."
        url={HAIRPIN_ROOT}
        serviceType="Hairpin cotter pins"
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[{ name: "Hairpin cotter pins", url: HAIRPIN_ROOT }]}
      />
      <DocPage
        kicker="Clips"
        title="Hairpin cotter pins"
        lede={`${PRICE_LINE} Hairpin cotters, R-clips, and hitch pin clips from coil. Most hardware-store clips are light spring wire under 4 mm — we say so. Heavy retainers in 3/8, 7/16, and 1/2 in run on this cell. Northeast Ohio.`}
        toc={[
          { id: "names", label: "Names" },
          { id: "types", label: "Types" },
          { id: "vs", label: "Not a split cotter" },
          { id: "wire", label: "Wire" },
          { id: "band", label: "4–14 mm" },
          { id: "faq", label: "FAQ" },
          { id: "next", label: "Related" },
        ]}
      >
        <h2 id="names">Hairpin, R-clip, hitch pin clip</h2>
        <p>
          Buyers search all three. In the shop they are the same family: a
          2D spring clip with a loop and two legs that retains a pin. Pull
          the loop. No hammer. The pin is a separate part —{" "}
          <Link href="/l-hitch-pins">L hitch pins</Link> when it is an L.
        </p>
        <p>
          Catalog card:{" "}
          <Link href="/products/hitch-pin-clips">hitch pin clips</Link>.
          These pages split the styles so a print for an internal clip is
          not quoted as an external groove retainer.
        </p>

        <h2 id="types">Types we name</h2>
        <ul>
          {HAIRPIN_PAGES.map((page) => (
            <li key={page.slug}>
              <Link href={hairpinHref(page.slug)}>{page.h1}</Link>
              {" — "}
              {page.lede}
            </li>
          ))}
        </ul>

        <h2 id="vs">Not a split cotter pin</h2>
        <p>
          A split cotter (sometimes just “cotter pin” in a fastener catalog)
          is a folded pin. Tines go through a hole and get bent over. It is
          not a hairpin. We form round-wire hairpins and R-clips from coil.
          We do not run a split-cotter heading cell. If the print is a
          split pin, say so on the RFQ so we do not program a hairpin.
        </p>

        <h2 id="wire">Spring wire, not 1018 by default</h2>
        <p>
          A clip that has to snap back is{" "}
          <Link href="/spring-wire/a227">ASTM A227</Link> hard-drawn or{" "}
          <Link href="/spring-wire/a229">A229</Link> oil-tempered. Stainless
          clips: <Link href="/spring-wire/stainless">302 spring / A313</Link>
          , not annealed 304. 1018 is for formed stops that may take a set.
          Name the ASTM. “Spring steel” is not a buy.
        </p>

        <h2 id="band">This cell</h2>
        <p>
          Production is {WIRE.label}. Stock {WIRE.short} sizes:{" "}
          <Link href="/sizes">3/8, 7/16, and 1/2 in</Link>. Typical 1/8 in
          hitch pin clips are under 4 mm — we name them and do not quote
          them as stock on the 214TF. Heavy hairpins in band: 2D CNC,
          100-piece minimum, customer coil.
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
            <Link href="/products/hitch-pin-clips">
              Catalog: hitch pin clips
            </Link>
          </li>
          <li>
            <Link href="/l-hitch-pins">L hitch pins</Link>
          </li>
          <li>
            <Link href="/products/pins-and-clips">Pins and clips</Link>
          </li>
          <li>
            <Link href="/spring-wire">Spring wire</Link>
          </li>
          <li>
            <Link href="/processes/2d-cnc-wire-forming">2D CNC</Link>
          </li>
        </ul>

        <QuoteBand title="Have a hairpin or R-clip print?" />
      </DocPage>
    </>
  );
}
