import Link from "next/link";
import { GroundStapleKeywordCloud } from "@/components/GroundStapleKeywordCloud";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { COMPANY } from "@/lib/company";
import { PRICE_LINE } from "@/lib/price";
import {
  GROUND_STAPLE_KEYWORDS,
  GROUND_STAPLE_HUB,
} from "@/lib/ground-staples";
import {
  GROUND_STAPLE_PLAYERS,
  GROUND_STAPLE_TREE,
} from "@/lib/ground-staple-tree";
import { STOCK } from "@/lib/catalog";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: GROUND_STAPLE_HUB.title,
  description: GROUND_STAPLE_HUB.description,
  path: GROUND_STAPLE_HUB.path,
  keywords: [...GROUND_STAPLE_KEYWORDS],
});

const faqs = [
  {
    question: "Do you make 11 gauge sod staples?",
    answer:
      "No. 11 ga and 9 ga sit under 4 mm. 8 ga (0.162 in / 4.11 mm) is the lightest staple on this floor. Heavy stock is 3/8, 7/16, and 1/2 in.",
  },
  {
    question: "What ground staples do you form?",
    answer: `Production is ${WIRE.label}. Stock tooling is ${STOCK}. Listed 8 ga 6 in and 12 in bags are 5% under published USA 8 ga cards. Custom 1/4 in and stock Us use mill math on the builder. 100-piece minimum.`,
  },
  {
    question: "Can you make custom ground staples?",
    answer:
      "Yes. Leg, crown, corner radius, diameter, and alloy on the print. Square-top only. We buy the steel. 100-piece minimum. Builder: /custom-ground-staples.",
  },
  {
    question: "Do you make stainless ground staples?",
    answer:
      "Yes. 304 or 316 on the builder. Mill math, not the 8 ga bag. Carbon galv is the outdoor default.",
  },
];

export default function GroundStaplesHubPage() {
  return (
    <>
      <ServiceSchema
        name="Ground Staples"
        description={GROUND_STAPLE_HUB.description}
        url={GROUND_STAPLE_HUB.path}
        serviceType="Ground staples"
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[{ name: GROUND_STAPLE_HUB.title, url: GROUND_STAPLE_HUB.path }]}
      />
      <DocPage
        kicker="Staples"
        title="Ground staples"
        lede={`${PRICE_LINE} ${COMPANY} forms ground staples from coil: 8 gauge landscape U-pins plus heavy 1/4, 3/8, 7/16, and 1/2 in for fabric, sod, erosion, irrigation, and solar. ${WIRE.short}. Northeast Ohio.`}
        toc={[
          { id: "names", label: "Names" },
          { id: "cloud", label: "Keyword cloud" },
          { id: "prices", label: "8 ga prices" },
          { id: "market", label: "The market" },
          { id: "heavy", label: "Heavy-duty" },
          { id: "out", label: "11 ga / 9 ga" },
          { id: "custom", label: "Custom" },
          { id: "faq", label: "FAQ" },
          { id: "next", label: "Related" },
        ]}
      >
        <h2 id="names">Sod, landscape, fabric, U</h2>
        <p>
          A ground staple is a U. Sod crews say sod staple. Landscape crews say
          landscape staple. Fabric houses say fabric pin. Irrigation says
          round-top. Same form. Wire size is the print. {COMPANY} CNC-forms them
          from coil — not an 11 ga sod box.
        </p>
        <ul>
          <li>
            <Link href="/ground-staples/sod-staples">Sod staples</Link> — turf
            and sod. 8 ga in band. 11 ga boxes out.
          </li>
          <li>
            <Link href="/ground-staples/landscape-staples">
              Landscape staples
            </Link>{" "}
            — fabric, edging, drip, blanket.
          </li>
          <li>
            <Link href="/ground-staples/fabric-staples">Fabric staples</Link> /{" "}
            <Link href="/ground-staples/square-top">square-top</Link> — weed
            barrier and geotextile.
          </li>
          <li>
            <Link href="/ground-staples/round-top">Round-top</Link> /{" "}
            <Link href="/ground-staples/irrigation">irrigation</Link> — drip and
            pipe.
          </li>
          <li>
            <Link href="/ground-staples/heavy-duty">
              Heavy-duty ground staples
            </Link>{" "}
            — 3/8,{" "}
            <Link href="/ground-staples/7-16">7/16</Link>,{" "}
            <Link href="/ground-staples/1-2">1/2 in</Link> stock.
          </li>
        </ul>
        <p>
          {GROUND_STAPLE_TREE.length} pages sit under this root.
        </p>

        <h2 id="cloud">Keyword cloud</h2>
        <p>
          Names landscape and erosion crews actually type. Size is how central
          the term is here — not a purchased search-volume number.
        </p>
        <div className="not-prose my-8">
          <GroundStapleKeywordCloud />
        </div>

        <h2 id="prices">8 ga bag prices</h2>
        <p>
          8 gauge (4.11 mm) 6 in and 12 in landscape staples sit in this cell.
          We list those bags 5% under the published USA 8 ga cards, same qty.
          Carbon, steel in the lot.{" "}
          <Link href="/ground-staples/prices">Full 8 ga price list</Link>. Heavy
          1/4 in and stock {STOCK}:{" "}
          <Link href="/custom-ground-staples">builder</Link>.
        </p>

        <h2 id="market">Who else sells these</h2>
        <p>
          The landscape-staple market is pin mills, fabric houses, and import
          bags. This floor is a 4–14 mm CNC cell. Instant estimate is this cell.{" "}
          <Link href="/ground-staples/market">Full market map</Link>.
        </p>
        <ul>
          {GROUND_STAPLE_PLAYERS.map((player) => (
            <li key={player.url}>
              <a
                href={player.url}
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                {player.name}
              </a>
              {" — "}
              {player.vsUs}
            </li>
          ))}
        </ul>

        <h2 id="heavy">Heavy-duty</h2>
        <p>
          Stock tooling is {STOCK}. 7/16 in and 1/2 in almost never have a
          public bag. We form them as CNC Us, buy the steel, then 5% off mill
          math.{" "}
          <Link href="/ground-staples/heavy-duty">Heavy-duty ground staples</Link>
          .
        </p>

        <h2 id="out">11 gauge and 9 gauge</h2>
        <p>
          11 ga (~0.120 in) and 9 ga (~0.148 in) are under 4 mm. We name those
          searches so they land here, then we refuse the quote. The step up is{" "}
          <Link href="/ground-staples/8-gauge">8 gauge</Link>.
        </p>

        <h2 id="custom">Custom</h2>
        <p>
          Leg, crown, corner radius, diameter, alloy. Square-top only.{" "}
          <Link href="/custom-ground-staples">Custom ground staples</Link>:
          live drawing and estimate. 8 ga 6/12 in carbon bags use the card.
          Other prints: shop steel.
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
            <Link href="/ground-staples/prices">8 ga staple prices</Link>
          </li>
          <li>
            <Link href="/ground-staples/market">Staple market</Link>
          </li>
          <li>
            <Link href="/custom-ground-staples">Custom staple builder</Link>
          </li>
          <li>
            <Link href="/products/ground-staples">
              Product directory — ground staples
            </Link>
          </li>
          <li>
            <Link href="/powder-coating-hooks">Powder coating hooks</Link>
          </li>
        </ul>

        <QuoteBand title="Have a ground-staple print?" />
      </DocPage>
    </>
  );
}
