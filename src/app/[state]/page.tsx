import { notFound } from "next/navigation";
import { ZipLookup } from "@/components/ZipLookup";
import { StateGrid } from "@/components/StateGrid";
import { DocPage } from "@/components/DocPage";
import { QuotePath } from "@/components/QuotePath";
import { ShopRoster } from "@/components/ShopRoster";
import { TextLink } from "@/components/ui";
import { COMPANY } from "@/lib/company";
import { getCompaniesByState } from "@/lib/directory";
import { inventorySummary } from "@/lib/graph";
import { pageMeta } from "@/lib/seo";
import { getStateShops } from "@/lib/state-shops";
import { getState, US_STATES } from "@/lib/states";
import { OHIO_CITIES, ohioCityPath } from "@/lib/ohio-cities";

type Props = { params: Promise<{ state: string }> };

export function generateStaticParams() {
  return US_STATES.map((state) => ({ state: state.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { state: slug } = await params;
  const state = getState(slug);
  if (!state) return {};
  const peers = getCompaniesByState(state.abbr);
  return pageMeta({
    title:
      peers.length > 0
        ? `${peers.length} Wire Forming Shops in ${state.name}`
        : `Wire Forming for ${state.name} — Freight from Ohio`,
    description:
      peers.length > 0
        ? `${peers.length} directory shops in ${state.name}. Capabilities, machines, and wire ranges from public listings — plus 4–14 mm CNC from Northeast Ohio.`
        : `No directory shop is listed inside ${state.name} yet. ${COMPANY} quotes 4–14 mm 3D CNC from Northeast Ohio and freights in.`,
    path: `/${state.slug}`,
    keywords: [
      `wire forming companies ${state.name}`,
      `wire forming ${state.name}`,
      `CNC wire forming ${state.abbr}`,
      "wire forming companies near me",
    ],
  });
}

export default async function StateWireFormingPage({ params }: Props) {
  const { state: slug } = await params;
  const state = getState(slug);
  if (!state) notFound();

  const shops = getStateShops(state.abbr);
  const peers = getCompaniesByState(state.abbr);
  const inventory = inventorySummary(peers);
  const inOhio = state.abbr === "OH";

  return (
    <DocPage
      kicker={`${state.name} · ${state.abbr}`}
      title={
        peers.length > 0
          ? `${peers.length} wire forming shops in ${state.name}`
          : `Wire forming for ${state.name}`
      }
      lede={
        peers.length > 0
          ? `Directory listings that sit in ${state.name}. ${state.work}`
          : `No directory plant is on file inside ${state.name} yet. ${COMPANY} quotes 4–14 mm 3D CNC from Northeast Ohio. ${state.freight}`
      }
      toc={[
        { id: "shops", label: "Directory shops" },
        { id: "inventory", label: "What they run" },
        { id: "freight", label: "Freight" },
        { id: "zip", label: "ZIP lookup" },
        ...(inOhio ? [{ id: "cities", label: "Ohio cities" }] : []),
        { id: "states", label: "All states" },
      ]}
    >
      <h2 id="shops">Directory shops in {state.name}</h2>
      <ShopRoster
        shops={peers}
        empty={`No USA Wire Form directory listing currently records a plant in ${state.name}. Public sites we still name for buyers are below when we have them.`}
      />

      {shops.length > 0 ? (
        <>
          <h3 className="mt-10 text-base font-medium">
            Other public sites that freight {state.name}
          </h3>
          <ul>
            {shops.map((shop) => (
              <li key={`${shop.website}-${shop.city}`}>
                <a
                  href={shop.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shop.name}
                </a>
                {` — ${shop.city}. ${shop.capacity}`}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h2 id="inventory">Capabilities, machines, wire</h2>
      {inventory.capabilities.length > 0 ? (
        <p>
          Processes named on these listings:{" "}
          {inventory.capabilities.map((item, index) => (
            <span key={item.slug}>
              {index > 0 ? " · " : ""}
              <TextLink href={item.path}>{item.title}</TextLink>
            </span>
          ))}
          .
        </p>
      ) : (
        <p>
          Capability tags are still thin in {state.name}. That is a filing
          problem, not a reason to generate more city URLs.
        </p>
      )}
      {inventory.oems.length > 0 ? (
        <p>
          Named OEMs:{" "}
          {inventory.oems.map((oem, index) => (
            <span key={oem.slug}>
              {index > 0 ? ", " : ""}
              <TextLink href={`/equipment/${oem.slug}`}>{oem.name}</TextLink>
            </span>
          ))}
          .
        </p>
      ) : null}
      {inventory.wireRanges.length > 0 ? (
        <p>Published wire ranges: {inventory.wireRanges.join(" · ")}.</p>
      ) : null}
      {inventory.materials.length > 0 ? (
        <p>
          Materials named:{" "}
          {inventory.materials.map((item, index) => (
            <span key={item.slug}>
              {index > 0 ? ", " : ""}
              <TextLink href={item.path}>
                {item.title.replace(/ Wire Forming$/, "")}
              </TextLink>
            </span>
          ))}
          .
        </p>
      ) : null}

      <h2 id="freight">Freight from Northeast Ohio</h2>
      <p>{state.freight}</p>
      {inOhio ? (
        <p>
          Why the cell sits here:{" "}
          <TextLink href="/cleveland">Northeast Ohio coil</TextLink>.
        </p>
      ) : (
        <p>
          {COMPANY} does not run a satellite plant in {state.name}. Production
          is one 4–14 mm cell in Northeast Ohio when that band is the job.
        </p>
      )}

      <h2 id="zip">Wrong state?</h2>
      <ZipLookup label="Another U.S. ZIP" />

      {inOhio ? (
        <>
          <h2 id="cities">Ohio city directory</h2>
          <p>
            City pages that have a named plant or a local listing stay in the
            index. Demand-only towns stay reachable and noindex.
          </p>
          <ul>
            {OHIO_CITIES.map((city) => (
              <li key={city.slug}>
                <TextLink href={ohioCityPath(city)}>{city.name}</TextLink>
                {city.plant ? ` — ${city.region}` : ` · ${city.region}`}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h2 id="states">Every state</h2>
      <StateGrid />

      <QuotePath title={`RFQ a form that ships to ${state.name}`} />
    </DocPage>
  );
}
