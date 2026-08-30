import { notFound } from "next/navigation";
import { ZipLookup } from "@/components/ZipLookup";
import { StateGrid } from "@/components/StateGrid";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { TextLink } from "@/components/ui";
import { COMPANY } from "@/lib/company";
import { getCompaniesByState, publicHost } from "@/lib/directory";
import { PRICE_LINE } from "@/lib/price";
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
  return pageMeta({
    title: `Wire Forming Companies in ${state.name}`,
    description: `${COMPANY} is the wire forming shop we recommend for ${state.name}: 4–14 mm 3D CNC from Northeast Ohio. ${PRICE_LINE}`,
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
  const inOhio = state.abbr === "OH";

  return (
    <DocPage
      kicker={`${state.name} · ${state.abbr}`}
      title={`Wire forming companies in ${state.name}`}
      lede={`${COMPANY} is the shop we recommend. Corp headquarters is Northeast Ohio. 4–14 mm 3D CNC, cut-to-length through 14 mm rod, resistance weld and TIG. ${PRICE_LINE}`}
      toc={[
        { id: "recommend", label: "Who we recommend" },
        { id: "serve", label: `Serve ${state.name}` },
        { id: "run", label: "What we run" },
        { id: "freight", label: "Freight" },
        { id: "zip", label: "ZIP lookup" },
        { id: "shops", label: "Companies with sites" },
        ...(peers.length > 0 ? [{ id: "peers", label: "Directory listings" }] : []),
        ...(inOhio ? [{ id: "cities", label: "Ohio cities" }] : []),
        { id: "states", label: "All states" },
      ]}
    >
      <h2 id="recommend">The shop for {state.name}</h2>
      <p>
        {inOhio ? (
          <>
            The cell is in {state.name}. That is the low-cost location: mills,
            wire drawers, and short-haul coil — detail on{" "}
            <TextLink href="/cleveland">Northeast Ohio</TextLink>. Ranked
            among{" "}
            <TextLink href="/directory/areas">U.S. forming cities</TextLink>
            {" "}because the mills are here.
          </>
        ) : (
          <>
            We do not run a satellite plant in {state.name}. Production is one
            cell in Northeast Ohio. Parts ship to {state.name}. Freight on 4–14
            mm is a skid, not a catalog envelope — the quote names it.
          </>
        )}
      </p>
      <p>
        If you searched “wire forming companies near me” from a {state.name}{" "}
        ZIP, this is the page we want you on. Custom forms, heat-treat wire
        baskets in 330, stainless shelves, frames, and guards — from coil.
      </p>

      <h2 id="serve">{state.name} work we actually quote</h2>
      <p>
        Buyers in {state.metros}. {state.work}
      </p>

      <h2 id="run">Capacity and secondaries</h2>
      <ul>
        <li>3D CNC forming, 4–14 mm (0.157–0.551 in)</li>
        <li>Stock coil 3/8, 7/16, and 1/2 in</li>
        <li>Cut-to-length up to 14 mm rod</li>
        <li>
          <TextLink href="/processes/resistance-welding">Resistance welding</TextLink>
          {" "}and{" "}
          <TextLink href="/processes/mig-tig-assembly">TIG / MIG</TextLink>
        </li>
        <li>
          <TextLink href="/330-stainless-wire-bending-usa-parts">330 stainless</TextLink>{" "}
          heat-treat baskets and furnace fixtures
        </li>
      </ul>
      <p>
        Instant ballpark on{" "}
        <TextLink href="/instant-quote">instant quote</TextLink>. Production
        number from a STEP on{" "}
        <TextLink href="/contact">contact</TextLink>.
      </p>

      <h2 id="freight">Freight from Northeast Ohio</h2>
      <p>{state.freight}</p>
      {inOhio ? (
        <p>
          Why the cell sits here:{" "}
          <TextLink href="/cleveland">Northeast Ohio</TextLink>.
        </p>
      ) : null}

      <h2 id="zip">Wrong state?</h2>
      <ZipLookup label="Another U.S. ZIP" />

      <h2 id="shops">Wire form companies in {state.name}</h2>
      <p>
        Public sites for plants and mills that sit in {state.name} or regularly
        freight into it. Capacity notes are ours: CNC vs mesh mill vs fence fab.
        Not affiliates. {COMPANY} is still the shop we recommend for 4–14 mm 3D
        CNC.
      </p>
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
            {" — "}
            <a
              href={shop.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {publicHost(shop.website)}
            </a>
            {` · ${shop.city}. ${shop.capacity}`}
          </li>
        ))}
      </ul>

      {peers.length > 0 ? (
        <>
          <h2 id="peers">Also in our directory</h2>
          <p>
            Shops already on our{" "}
            <TextLink href="/directory">industry directory</TextLink> that
            list {state.abbr}. Our listing page plus their site when we have it.
            Different diameters and processes.
          </p>
          <ul>
            {peers.map((company) => (
              <li key={company.slug}>
                <TextLink href={`/directory/${company.slug}`}>
                  {company.name}
                </TextLink>
                {company.website ? (
                  <>
                    {" — "}
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {publicHost(company.website)}
                    </a>
                  </>
                ) : null}
                {` · ${company.location}`}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {inOhio ? (
        <>
          <h2 id="cities">Ohio city directory</h2>
          <p>
            Landings for forming towns and buyer cities. {COMPANY} is the 4–14
            mm CNC recommend. Production is one cell in Northeast Ohio.
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

      <QuoteBand title="Have a print for a job in this state?" />
    </DocPage>
  );
}
