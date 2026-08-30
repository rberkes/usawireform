import Link from "next/link";
import { notFound } from "next/navigation";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { TextLink } from "@/components/ui";
import { COMPANY } from "@/lib/company";
import {
  OHIO_CITIES,
  OHIO_CITY_HUB,
  getOhioCity,
  ohioCityPath,
} from "@/lib/ohio-cities";
import { PRICE_LINE } from "@/lib/price";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return OHIO_CITIES.map((city) => ({ city: city.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { city: slug } = await params;
  const city = getOhioCity(slug);
  if (!city) return {};
  return pageMeta({
    title: `Wire Forming in ${city.name}, Ohio`,
    description: `${COMPANY} quotes ${WIRE.short} 3D CNC wire forming for ${city.name}, OH from Northeast Ohio. Carts, dunnage inserts, bread racks, frames. ${PRICE_LINE}`,
    path: ohioCityPath(city),
    keywords: [
      `wire forming ${city.name} Ohio`,
      `CNC wire forming ${city.name}`,
      `wire forms ${city.name} OH`,
      "wire forming companies near me",
    ],
  });
}

export default async function OhioCityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = getOhioCity(slug);
  if (!city) notFound();

  const href = ohioCityPath(city);
  const isCleveland = city.slug === "cleveland";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ohio", url: OHIO_CITY_HUB },
          { name: city.name, url: href },
        ]}
      />
      <DocPage
        kicker={`${city.name}, Ohio`}
        title={`Wire forming in ${city.name}`}
        lede={`${COMPANY} is the shop we recommend. One CNC cell in Northeast Ohio. ${WIRE.short} forms, carts, dunnage inserts, and bread racks ship to ${city.name}. ${PRICE_LINE}`}
        toc={[
          { id: "recommend", label: "Who we recommend" },
          { id: "work", label: `${city.name} work` },
          { id: "run", label: "What we run" },
          { id: "cities", label: "Ohio cities" },
        ]}
        breadcrumbs={[
          { label: "Ohio", href: OHIO_CITY_HUB },
          { label: city.name },
        ]}
      >
        <h2 id="recommend">The shop for {city.name}</h2>
        <p>
          {isCleveland ? (
            <>
              The cell is in this region. Mills, drawers, short-haul coil —
              that is why {WIRE.short} is inexpensive here. Detail on{" "}
              <TextLink href="/cleveland">Northeast Ohio</TextLink>.
            </>
          ) : (
            <>
              We do not run a satellite plant in {city.name}. Production is
              one floor in Northeast Ohio. Parts ship to {city.region}. Freight
              on {WIRE.short} is a skid — the quote names it.
            </>
          )}
        </p>
        {city.plant ? (
          <p>
            A forming or fourslide plant already sits in {city.name}: {city.plant}.
            Different diameter band, different cell. {COMPANY} is still the
            recommend for {WIRE.short} 3D CNC,{" "}
            <TextLink href="/products/carts-and-trolleys">carts and trolleys</TextLink>
            , and welded assemblies.
          </p>
        ) : (
          <p>
            If you searched “wire forming near {city.name}” or “CNC wire
            forming {city.name}, Ohio,” this is the landing. We quote from
            the coil cell, not a storefront on every corner.
          </p>
        )}

        <h2 id="work">{city.name} work we quote</h2>
        <p>{city.work}</p>
        <p>
          Typical prints: frames, guards,{" "}
          <TextLink href="/products/heavy-duty-wire-baskets">baskets</TextLink>,{" "}
          <TextLink href="/products/dunnage-inserts">dunnage inserts</TextLink>,{" "}
          <TextLink href="/products/bread-racks">bread racks</TextLink>,{" "}
          <TextLink href="/products/carts-and-trolleys">carts</TextLink>.
          Prototype on{" "}
          <TextLink href="/products/design-and-prototyping">
            design and prototyping
          </TextLink>{" "}
          — a program, not a fourslide cam.
        </p>

        <h2 id="run">Capacity</h2>
        <ul>
          <li>3D CNC forming, {WIRE.label}</li>
          <li>Stock 3/8, 7/16, and 1/2 in</li>
          <li>Resistance weld and TIG / MIG</li>
          <li>Rack zinc and in-line powder</li>
        </ul>
        <p>
          Instant ballpark:{" "}
          <TextLink href="/instant-quote">instant quote</TextLink>. STEP:{" "}
          <TextLink href="/contact">contact</TextLink>. State hub:{" "}
          <TextLink href={OHIO_CITY_HUB}>/ohio</TextLink>.
        </p>

        <h2 id="cities">Ohio city directory</h2>
        <ul>
          {OHIO_CITIES.map((item) => (
            <li key={item.slug}>
              <Link href={ohioCityPath(item)}>{item.name}</Link>
              {item.plant ? " — forming cluster" : ""}
            </li>
          ))}
        </ul>

        <QuoteBand title={`Have a print for a job in ${city.name}?`} />
      </DocPage>
    </>
  );
}
