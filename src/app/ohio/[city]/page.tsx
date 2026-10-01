import Link from "next/link";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { QuotePath } from "@/components/QuotePath";
import { ShopRoster } from "@/components/ShopRoster";
import { TextLink } from "@/components/ui";
import { COMPANY } from "@/lib/company";
import { getCompaniesByState } from "@/lib/directory";
import {
  nearbyOhioCities,
  ohioCityHasLocalInventory,
} from "@/lib/geo";
import { inventorySummary, shopsServingOhioCity } from "@/lib/graph";
import { ohioCityPathIndexable } from "@/lib/index-policy";
import {
  OHIO_CITIES,
  OHIO_CITY_HUB,
  getOhioCity,
  ohioCityPath,
} from "@/lib/ohio-cities";
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
  const { local, state } = shopsServingOhioCity(city);
  const nearby = state.filter((row) => (row.miles ?? 999) <= 40);
  const indexable = ohioCityPathIndexable(city.slug).index;
  const shopLine =
    local.length > 0
      ? `${local.length} directory shop${local.length === 1 ? "" : "s"} in ${city.name}`
      : `${nearby.length} shops within 40 miles`;
  return pageMeta({
    title: `Wire Forming in ${city.name}, Ohio`,
    description: `${shopLine}. Capabilities, machines, and wire ranges from the directory — not a location-swapped brochure. ${COMPANY} runs 4–14 mm CNC in Northeast Ohio.`,
    path: ohioCityPath(city),
    keywords: [
      `wire forming ${city.name} Ohio`,
      `CNC wire forming ${city.name}`,
      `wire forms ${city.name} OH`,
    ],
    noindex: !indexable,
  });
}

export default async function OhioCityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = getOhioCity(slug);
  if (!city) notFound();

  const href = ohioCityPath(city);
  const { local, state } = shopsServingOhioCity(city);
  const nearby = nearbyOhioCities(city);
  const serving = state.filter((row) => (row.miles ?? 999) <= 60);
  const inventory = inventorySummary([
    ...local,
    ...serving.map((row) => row.shop),
  ]);
  const distances = Object.fromEntries(
    serving.map((row) => [row.shop.slug, row.miles]),
  );
  const hasLocal = ohioCityHasLocalInventory(city, getCompaniesByState("OH"));

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
        lede={
          local.length > 0
            ? `${local.length} directory shop${local.length === 1 ? "" : "s"} sit in ${city.name}. ${city.work}`
            : `${city.name} is a buyer city in ${city.region}. Shops that can freight here are listed with distance when we have coordinates.`
        }
        toc={[
          { id: "local", label: "Shops in this city" },
          { id: "inventory", label: "Capabilities" },
          { id: "nearby", label: "Nearby" },
          { id: "rfq", label: "RFQ" },
        ]}
        breadcrumbs={[
          { label: "Ohio", href: OHIO_CITY_HUB },
          { label: city.name },
        ]}
      >
        {city.plant ? (
          <p>
            Named floor in {city.name}: {city.plant}. Confirm the diameter
            band — a fourslide clip cell is not a 4–14 mm 3D CNC.
          </p>
        ) : null}

        <h2 id="local">Shops in {city.name}</h2>
        <ShopRoster
          shops={local}
          empty={
            hasLocal
              ? undefined
              : `No directory listing currently records a plant inside ${city.name}. Nearby Ohio shops are below.`
          }
        />

        {serving.length > 0 ? (
          <>
            <h3 className="mt-10 text-base font-medium">
              Other Ohio shops that can serve {city.name}
            </h3>
            <ShopRoster
              shops={serving.slice(0, 12).map((row) => row.shop)}
              distances={distances}
            />
          </>
        ) : null}

        <h2 id="inventory">What is actually on the floor</h2>
        {inventory.capabilities.length > 0 ? (
          <p>
            Processes in this set:{" "}
            {inventory.capabilities.map((item, index) => (
              <span key={item.slug}>
                {index > 0 ? " · " : ""}
                <Link href={item.path} className="text-copper hover:underline">
                  {item.title}
                </Link>
              </span>
            ))}
            .
          </p>
        ) : (
          <p>No capability tags on the local listings yet.</p>
        )}
        {inventory.models.length > 0 ? (
          <p>
            Named machines:{" "}
            {inventory.models.map((hit, index) => (
              <span key={`${hit.oem.slug}/${hit.model.slug}`}>
                {index > 0 ? " · " : ""}
                <Link
                  href={`/equipment/${hit.oem.slug}/${hit.model.slug}`}
                  className="text-copper hover:underline"
                >
                  {hit.model.name}
                </Link>
              </span>
            ))}
            .
          </p>
        ) : null}
        {inventory.wireRanges.length > 0 ? (
          <p>Published wire ranges: {inventory.wireRanges.join(" · ")}.</p>
        ) : null}
        {inventory.industries.length > 0 ? (
          <p>
            Industries named:{" "}
            {inventory.industries.map((item, index) => (
              <span key={item.slug}>
                {index > 0 ? ", " : ""}
                <TextLink href={item.path}>{item.title}</TextLink>
              </span>
            ))}
            .
          </p>
        ) : null}
        {inventory.certifications.length > 0 ? (
          <p>Certifications on file: {inventory.certifications.join(" · ")}.</p>
        ) : null}

        <h2 id="nearby">Nearby Ohio cities</h2>
        <ul>
          {nearby.slice(0, 8).map((row) => (
            <li key={row.city.slug}>
              <Link href={ohioCityPath(row.city)}>{row.city.name}</Link>
              {` · ${row.miles} mi`}
              {row.city.plant ? ` — ${row.city.plant}` : ""}
            </li>
          ))}
        </ul>
        <p>
          State hub: <TextLink href={OHIO_CITY_HUB}>Ohio</TextLink>. Coil
          economics: <TextLink href="/cleveland">Northeast Ohio</TextLink>.
        </p>

        <div id="rfq">
          <QuotePath title={`RFQ a form for ${city.name}`} />
        </div>
      </DocPage>
    </>
  );
}
