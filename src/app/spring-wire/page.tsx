import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { PRICE_LINE } from "@/lib/price";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";
import {
  SPRING_WIRE_PAGES,
  SPRING_WIRE_ROOT,
  springWireHref,
} from "@/lib/spring-wire";

export const metadata = pageMeta({
  title: "Spring Wire for Wire Forming",
  description:
    "Spring wire from coil for 4–14 mm forms: ASTM A227 hard-drawn, A228 music wire, A229 oil-tempered, A231 CrV, A401 CrSi, stainless A313. Not 1018.",
  path: SPRING_WIRE_ROOT,
  keywords: [
    "spring wire",
    "ASTM A227",
    "A227 spring wire",
    "A229 oil tempered",
    "music wire",
    "wire forming spring steel",
  ],
});

const faqs = [
  {
    question: "What is ASTM A227 spring wire?",
    answer:
      "Hard-drawn carbon steel wire for mechanical springs. Class I or Class II. Not oil-tempered (that is A229) and not music wire (A228).",
  },
  {
    question: "Can you form A228 music wire?",
    answer: `Usual A228 diameters are under ${WIRE.minMm} mm. We explain it. We do not run music wire as 3/8 in stock. Heavy spring in band is A227, A229, A231, or A401.`,
  },
  {
    question: "Is 1018 spring wire?",
    answer:
      "No. 1018 is cold-roll forming wire. It takes a set. Clips and springs that must snap back need A227, A229, or a named alloy / stainless spring spec.",
  },
];

export default function SpringWireHub() {
  return (
    <>
      <ServiceSchema
        name="Spring wire"
        description="ASTM spring-wire grades from coil for 4–14 mm CNC wire forms."
        url={SPRING_WIRE_ROOT}
        serviceType="Spring wire forming"
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd items={[{ name: "Spring wire", url: SPRING_WIRE_ROOT }]} />
      <DocPage
        kicker="Materials"
        title="Spring wire"
        lede={`${PRICE_LINE} Hard-drawn A227, music wire A228, oil-tempered A229, chrome-vanadium A231, chrome-silicon A401, and stainless spring. Named ASTM grades from coil. Not “spring steel.” ${WIRE.short}. Northeast Ohio.`}
        toc={[
          { id: "grades", label: "Grades" },
          { id: "a227", label: "A227" },
          { id: "not", label: "Not 1018" },
          { id: "band", label: "4–14 mm" },
          { id: "faq", label: "FAQ" },
          { id: "next", label: "Related" },
        ]}
      >
        <h2 id="grades">Named grades, not a family</h2>
        <p>
          “Spring steel” is how first articles fail. The coil cert is an
          ASTM (or AISI) number, a class or temper, and a diameter. We form
          spring wire from coil in this band when the radius and the head
          fit. Hub for all coil:{" "}
          <Link href="/materials">materials</Link>.
        </p>
        <ul>
          {SPRING_WIRE_PAGES.map((page) => (
            <li key={page.slug}>
              <Link href={springWireHref(page.slug)}>{page.h1}</Link>
              {" — "}
              {page.lede}
            </li>
          ))}
        </ul>

        <h2 id="a227">Start with A227 if they said “227”</h2>
        <p>
          Buyers and coil tags often say “227.” That is{" "}
          <Link href="/spring-wire/a227">ASTM A227</Link> hard-drawn
          carbon spring wire, Class I or II. It is the common mechanical
          spring and snap-clip grade. Not music wire. Not oil-tempered MB
          unless they meant <Link href="/spring-wire/a229">A229</Link>.
        </p>
        <p>
          Hairpin cotters and R-clips that have to snap: A227 or A229, class
          on the print. Family:{" "}
          <Link href="/hairpin-cotter-pins">hairpin cotter pins</Link>.
        </p>

        <h2 id="not">1018 is not a spring</h2>
        <p>
          <Link href="/materials">1010 / 1018</Link> is stock forming
          wire for frames, trays, and most 2D/3D industrial forms. It welds
          clean and takes a 1× diameter inside radius on mild coil. It will
          take a set if you use it as a clip. Do not substitute it for A227
          on a snap retainer.
        </p>

        <h2 id="band">This cell</h2>
        <p>
          Production is {WIRE.label}. Stock{" "}
          <Link href="/sizes">3/8, 7/16, and 1/2 in</Link>. Inside radius
          on spring tempers starts near 1.5–2× diameter. Hydrogen bake
          after acid zinc on high tensile. You buy the coil. We do not sell
          leftover spring wire.
        </p>
        <p>
          Small springs (music wire, light A227, coiler work) sit under 4
          mm. That is a{" "}
          <Link href="/equipment/machine-comparison">spring CNC / coiler</Link>
          {" "}class, not the 214TF. We name it.{" "}
          <Link href="/source">Source</Link> if another shop filed that cell.
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
            <Link href="/materials">Materials</Link>
          </li>
          <li>
            <Link href="/materials/300-series-stainless">
              300-series stainless
            </Link>
          </li>
          <li>
            <Link href="/guide/design-for-wire-forming">Design guide</Link>
          </li>
          <li>
            <Link href="/hairpin-cotter-pins">Hairpin cotter pins</Link>
          </li>
          <li>
            <Link href="/processes/3d-cnc-wire-forming">3D CNC</Link>
          </li>
        </ul>

        <QuoteBand title="Have a spring-wire print?" />
      </DocPage>
    </>
  );
}
