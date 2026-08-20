import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd, FAQJsonLd, JsonLd } from "@/components/JsonLd";
import { COMPANY, SITE_URL } from "@/lib/company";
import {
  METRO_HUB_PATH,
  WIRE_FORMING_METROS,
  metroPath,
  type WireFormingMetro,
} from "@/lib/metros";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";
import { cx } from "@/lib/cx";

export const metadata = pageMeta({
  title: "Wire Forming Cities in the USA",
  description:
    "Top 20 U.S. wire-forming cities. Los Angeles has the most shops. Cleveland has the mills and drawers — that is why 4–14 mm coil is inexpensive in Northeast Ohio.",
  path: METRO_HUB_PATH,
  keywords: [
    "wire forming cities",
    "wire forming companies by city",
    "Cleveland wire forming",
    "Northeast Ohio wire mills",
    "wire drawing Cleveland",
  ],
});

const faqs = [
  {
    question: "Why is Cleveland a strong wire-forming city?",
    answer:
      "Northeast Ohio still has steel mills and wire drawers. Rod becomes forming wire next door, then a local truck to the CNC. USA Wire Form sits in that cell. Shop count is not the argument — landed coil cost is.",
  },
  {
    question: "Why is coil cheaper in Cleveland than on the coasts?",
    answer:
      "A 4–14 mm form is mostly steel by weight. Freight on coil from a distant mill is a line item. Short-haul from a local mill and drawer is not. That is the Cleveland cost structure.",
  },
  {
    question: "Does USA Wire Form have plants in Los Angeles or Chicago?",
    answer:
      "No. One CNC cell in Northeast Ohio. Other cities on this list are forming clusters — fourslide shops, spring houses, OEM plants — not USA Wire Form satellites.",
  },
  {
    question: "How is this city list ranked?",
    answer:
      "Cluster strength: job-shop density, mill and drawer proximity, and known multi-plant formers. Not Google rank. Los Angeles leads shop count. Cleveland leads coil economics. Nashville ranks on plant scale even when it is thin in our directory.",
  },
];

const toc = [
  { id: "cleveland", label: "Why Cleveland" },
  { id: "mills", label: "Mills and drawers" },
  { id: "rank", label: "How we rank" },
  { id: "cities", label: "The 20 cities" },
  { id: "faq", label: "FAQ" },
  { id: "next", label: "Related" },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Top 20 U.S. wire-forming cities",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: WIRE_FORMING_METROS.length,
  itemListElement: WIRE_FORMING_METROS.map((metro) => ({
    "@type": "ListItem",
    position: metro.rank,
    name: metro.city,
    url: `${SITE_URL}${metroPath(metro)}`,
    description: metro.why,
  })),
};

export default function WireFormingCitiesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Directory", url: "/directory" },
          { name: "Cities", url: METRO_HUB_PATH },
        ]}
      />
      <FAQJsonLd questions={faqs} />
      <JsonLd data={itemListJsonLd} />
      <DocPage
        kicker="Cities"
        title="Twenty forming cities. Cleveland is the cheap coil."
        lede={`${COMPANY} is in Northeast Ohio because the mills and the wire drawers are there. ${WIRE.short} coil is a local truck — that is why the piece price is low. Los Angeles has more shops. Cleveland has the steel.`}
        toc={toc}
        breadcrumbs={[
          { label: "Directory", href: "/directory" },
          { label: "Cities" },
        ]}
      >
        <h2 id="cleveland">Why Cleveland is the strong city</h2>
        <p>
          The forming trade bunches up. It is not fifty equal cities.{" "}
          <Link href="/california">Los Angeles</Link> wins shop count —
          fourslide, CNC, and spring houses packed through the Inland Empire.{" "}
          <Link href="/illinois">Chicago</Link> is the Midwest coil belt.{" "}
          Cleveland is rank 3 on that density map and rank 1 on landed steel.
        </p>
        <p>
          We bias Cleveland because that is the cell we run, and because the
          bias is the economics: mills, drawers, short-haul coil. Promote the
          city that makes {WIRE.short} inexpensive, not the city with the most
          storefronts. Detail on{" "}
          <Link href="/cleveland">Northeast Ohio</Link>. State landing:{" "}
          <Link href="/ohio">/ohio</Link>.
        </p>
        <p>
          One floor. Not a satellite in every metro on this list. Other cities
          are clusters we ship into — they are not USA Wire Form plants.
        </p>

        <h2 id="mills">Mills and drawers — why coil is inexpensive here</h2>
        <p>
          A {WIRE.short} form is mostly steel by weight. The quote follows the
          coil: mill, draw, freight in, then form, weld, and finish. Put the
          CNC next to the rod and the drawers and you cut the legs that do not
          add a bend.
        </p>
        <p>
          Northeast Ohio still makes steel. Integrated mill capacity is in the
          region and the Cuyahoga. Rod and bar that become forming wire do not
          have to start on a coast and ride a railcar across the country before
          they see a die. For {WIRE.short} carbon — 1010, 1018, and the
          medium-to-high grades — mill proximity is inbound cost and lead time.
        </p>
        <p>
          Rod is not forming wire. Drawers take mill rod down to diameter,
          tensile, and coating — the coil that actually hits the straightener.
          The Ohio–Pennsylvania corridor is where that trade lives. We buy from
          that chain. A skid of {WIRE.short} coil is thousands of pounds.
          Trucking it from a distant mill is a line item. Trucking it across
          town is not.
        </p>
        <p>
          That is the CLE argument we need on this page: cost of coils is
          inexpensive because the mills are there, and the drawers are there,
          and the forming cell is in the same region. The rest of the{" "}
          <Link href="/quoting">quote</Link> is CNC, secondaries, and freight
          out to the plant that bolts the part on.
        </p>

        <h2 id="rank">How this list is ranked</h2>
        <p>
          Heat is cluster strength: directory density, mill/drawer proximity,
          and known multi-plant formers. It is not a census of every fourslide
          in America, and it is not a Google ranking. Nashville Wire is huge in
          the trade and thin in our roster — it still ranks. San Jose is dense
          in light precision wire and is not a {WIRE.short} frame belt.
        </p>
        <p>
          Shop counts are listings already on our{" "}
          <Link href="/directory">company directory</Link> grouped to the metro.
          Each city opens its shop list. Cleveland’s mill-and-drawer essay stays
          on <Link href="/cleveland">/cleveland</Link>.
        </p>

        <h2 id="cities">The 20 cities</h2>
        <ol className="!m-0 !list-none !p-0 divide-y divide-line border-y border-line">
          {WIRE_FORMING_METROS.map((metro) => (
            <MetroRow key={metro.slug} metro={metro} />
          ))}
        </ol>

        <h2 id="faq">FAQ</h2>
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}

        <h2 id="next">Related</h2>
        <ul>
          <li>
            <Link href="/cleveland">Northeast Ohio</Link> — mills, drawers,
            short-haul coil
          </li>
          <li>
            <Link href="/ohio">Ohio wire forming</Link> — state landing
          </li>
          <li>
            <Link href="/directory">Company directory</Link> — shops by region
          </li>
          <li>
            <Link href="/wire-forming-companies-near-me">Companies near me</Link>{" "}
            — ZIP lookup
          </li>
          <li>
            <Link href="/steel-wire-manufacturers-in-usa">
              Steel wire manufacturers in the USA
            </Link>{" "}
            — we form coil, we are not a mill
          </li>
          <li>
            <Link href="/">USA Wire Form</Link> — {WIRE.short} 3D CNC
          </li>
        </ul>

        <QuoteBand title="Have a print and a coil spec?" />
      </DocPage>
    </>
  );
}

function MetroRow({ metro }: { metro: WireFormingMetro }) {
  const href = metroPath(metro);
  const note = metro.hq ? "Our cell" : metro.metro;

  return (
    <li
      id={metro.slug}
      className={cx(
        "!mt-0 scroll-mt-24 py-5",
        metro.hq && "border-l-2 border-copper pl-4",
      )}
    >
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-[11px] tracking-widest text-muted uppercase">
          {String(metro.rank).padStart(2, "0")}
        </span>
        <Link href={href} className="font-medium text-foreground">
          {metro.city}
        </Link>
        <span className="font-mono text-[11px] tracking-widest text-muted uppercase">
          {note}
        </span>
      </p>
      <p className="mt-2 !text-[13px] leading-6">{metro.why}</p>
      <div
        className="mt-3 h-1 max-w-xs bg-line"
        role="img"
        aria-label={`Cluster heat ${metro.heat} of 10`}
      >
        <div
          className="h-1 bg-copper"
          style={{ width: `${metro.heat * 10}%` }}
        />
      </div>
    </li>
  );
}
