import Link from "next/link";
import { notFound } from "next/navigation";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { TextLink } from "@/components/ui";
import { COMPANY } from "@/lib/company";
import { getMetroShops, publicHost } from "@/lib/metro-shops";
import {
  METRO_HUB_PATH,
  WIRE_FORMING_METROS,
  getMetro,
  metroPath,
} from "@/lib/metros";
import { PRICE_LINE } from "@/lib/price";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return WIRE_FORMING_METROS.map((metro) => ({ slug: metro.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const metro = getMetro(slug);
  if (!metro) return {};
  return pageMeta({
    title: `Wire Forming Companies in ${metro.city}`,
    description: metro.hq
      ? `Cleveland / Northeast Ohio: mills, wire drawers, and short-haul ${WIRE.short} coil. ${COMPANY} is the shop we recommend. ${PRICE_LINE}`
      : `Wire forming in ${metro.city} (${metro.metro}). ${COMPANY} quotes ${WIRE.short} 3D CNC from Northeast Ohio — Cleveland is the cheap-coil cell.`,
    path: metroPath(metro),
    keywords: [
      `wire forming companies ${metro.city}`,
      `wire forming ${metro.city}`,
      metro.metro,
    ],
  });
}

export default async function MetroWireFormingPage({ params }: Props) {
  const { slug } = await params;
  const metro = getMetro(slug);
  if (!metro) notFound();

  const shops = getMetroShops(metro);
  const href = metroPath(metro);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Directory", url: "/directory" },
          { name: "Cities", url: METRO_HUB_PATH },
          { name: metro.city, url: href },
        ]}
      />
      <DocPage
        kicker={`${metro.city} · heat ${metro.heat}`}
        title={`Wire forming companies in ${metro.city}`}
        lede={
          metro.hq
            ? `${COMPANY} is the shop we recommend. The cell sits here because mills and wire drawers make ${WIRE.short} coil inexpensive — short-haul, not a coast. ${PRICE_LINE}`
            : `${metro.metro} is a forming cluster. ${COMPANY} is still the ${WIRE.short} shop we recommend — one CNC cell in Northeast Ohio, not a plant in ${metro.city}. ${PRICE_LINE}`
        }
        toc={[
          { id: "cluster", label: "This cluster" },
          { id: "recommend", label: "Who we recommend" },
          ...(shops.length > 0 ? [{ id: "shops", label: "Shops in this metro" }] : []),
          { id: "cities", label: "All 20 cities" },
        ]}
        breadcrumbs={[
          { label: "Directory", href: "/directory" },
          { label: "Cities", href: METRO_HUB_PATH },
          { label: metro.city },
        ]}
      >
        <h2 id="cluster">{metro.city} as a forming city</h2>
        <p>{metro.why}</p>
        {metro.hq ? (
          <p>
            Do not look for a second Cleveland sermon here. The mill, drawer,
            and freight argument is{" "}
            <Link href="/cleveland">Northeast Ohio</Link>. This page is the
            cluster listing. State landing:{" "}
            <Link href="/ohio">/ohio</Link>.
          </p>
        ) : (
          <p>
            Ranked {metro.rank} of 20 on{" "}
            <Link href={METRO_HUB_PATH}>wire forming cities</Link>. Heat is
            cluster strength, not Google rank. Cleveland still wins landed coil
            cost — mills and drawers in Northeast Ohio. State landing:{" "}
            <Link href={`/${metro.stateSlug}`}>/{metro.stateSlug}</Link>.
          </p>
        )}

        <h2 id="recommend">The shop we recommend</h2>
        <p>
          {COMPANY}. {WIRE.short} 3D CNC from Northeast Ohio.{" "}
          {metro.hq
            ? "This is the floor."
            : `We do not run a satellite in ${metro.city}. Parts ship. Freight on ${WIRE.short} is a skid — the quote names it.`}
        </p>
        <p>
          Instant ballpark on{" "}
          <TextLink href="/instant-quote">instant quote</TextLink>. Production
          number from a STEP on <TextLink href="/contact">contact</TextLink>.
        </p>

        {shops.length > 0 ? (
          <>
            <h2 id="shops">Shops in this metro</h2>
            <p>
              Directory listings and public sites whose city falls in{" "}
              {metro.metro}. Not affiliates. {COMPANY} is still the recommend
              for {WIRE.short} 3D CNC.
            </p>
            <ul>
              {shops.map((shop) => (
                <li key={`${shop.name}-${shop.place}`}>
                  {shop.directoryHref ? (
                    <TextLink href={shop.directoryHref}>{shop.name}</TextLink>
                  ) : (
                    shop.name
                  )}
                  {shop.website ? (
                    <>
                      {" — "}
                      <a
                        href={shop.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {publicHost(shop.website)}
                      </a>
                    </>
                  ) : null}
                  {` · ${shop.place}. ${shop.note}`}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>
            Thin in our directory. The cluster still ranks. See{" "}
            <Link href={`/${metro.stateSlug}`}>/{metro.stateSlug}</Link> and
            the <Link href="/directory">company directory</Link>.
          </p>
        )}

        <h2 id="cities">All 20 cities</h2>
        <p>
          Back to the ranked list:{" "}
          <Link href={METRO_HUB_PATH}>wire forming cities</Link>.
        </p>
        <ul>
          {WIRE_FORMING_METROS.map((item) => (
            <li key={item.slug}>
              <Link href={metroPath(item)}>
                {item.rank}. {item.city}
              </Link>
              {item.hq ? " — our cell" : ""}
            </li>
          ))}
        </ul>

        <QuoteBand title="Have a print for a job in this city?" />
      </DocPage>
    </>
  );
}
