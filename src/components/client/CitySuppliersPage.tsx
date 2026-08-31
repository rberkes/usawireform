import Link from "next/link";
import {
  ClientCtaBand,
  ClientHero,
  ClientPage,
  PlatformFlow,
} from "@/components/client/ClientLanding";
import { ClientQuoteCtas } from "@/components/client/ClientQuoteCtas";
import { StateMark } from "@/components/StateIcon";
import { Container } from "@/components/ui";
import { HOME_CTA_LEDE, HOME_CTA_TITLE, HOME_PLATFORM_STEPS } from "@/lib/client-landing";
import { publicHost, type MetroShop } from "@/lib/metro-shops";
import type { WireFormingMetro } from "@/lib/metros";
import { getStateByAbbr, statePath } from "@/lib/states";
import {
  TOP_SUPPLIER_CITIES,
  supplierCityPath,
} from "@/lib/supplier-cities";

export function CitySuppliersPage({
  city,
  shops,
}: {
  city: WireFormingMetro;
  shops: MetroShop[];
}) {
  const state = getStateByAbbr(city.stateAbbr);
  const stateHref = state ? statePath(state) : `/${city.stateSlug}`;

  return (
    <ClientPage>
      <ClientHero
        kicker={`${city.city} · ${city.stateAbbr}`}
        title={`Wire form suppliers in ${city.city}`}
        lede={`Shops in ${city.metro} that form wire. Get a quote from cells that can run the print — or list your machine free. The state icon is ${state?.name ?? city.stateAbbr}: that is where these suppliers sit.`}
        mark={<StateMark abbr={city.stateAbbr} href={stateHref} size="hero" />}
        cta={<ClientQuoteCtas variant="home" tone="dark" className="mt-8" />}
      />

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <p className="font-mono text-[12px] tracking-[0.22em] text-copper uppercase">
            {city.metro}
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl tracking-tight sm:text-4xl">
            {shops.length} {shops.length === 1 ? "supplier" : "suppliers"} in this
            metro.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            {city.why} Quotes go to shops with the right machine and open
            capacity — not a broker desk.
          </p>

          {shops.length > 0 ? (
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {shops.map((shop) => (
                <li
                  key={`${shop.name}-${shop.place}`}
                  className="flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <div className="min-w-0">
                    <p className="text-lg tracking-tight">
                      {shop.directoryHref ? (
                        <Link
                          href={shop.directoryHref}
                          className="hover:text-copper"
                        >
                          {shop.name}
                        </Link>
                      ) : (
                        shop.name
                      )}
                    </p>
                    <p className="mt-1 text-sm text-muted">{shop.place}</p>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                      {shop.note}
                    </p>
                  </div>
                  {shop.website ? (
                    <a
                      href={shop.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 font-mono text-[11px] tracking-wide text-copper uppercase hover:underline"
                    >
                      {publicHost(shop.website)}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 border-y border-line py-8 text-sm leading-6 text-muted">
              Thin in the directory today. List a machine free and this city page
              fills in.
            </p>
          )}
        </Container>
      </section>

      <section className="bg-inset">
        <Container className="py-16 sm:py-20">
          <p className="font-mono text-[12px] tracking-[0.22em] text-copper uppercase">
            How matching works
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl tracking-tight sm:text-4xl">
            List equipment. Match the print. Quote the job.
          </h2>
          <PlatformFlow
            steps={HOME_PLATFORM_STEPS}
            className="mt-10 border-line bg-[#0b1f33] text-white"
          />
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <p className="font-mono text-[12px] tracking-[0.22em] text-copper uppercase">
            Top 10 cities
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl tracking-tight sm:text-4xl">
            More supplier cities.
          </h2>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {TOP_SUPPLIER_CITIES.map((item) => (
              <li key={item.slug}>
                <Link
                  href={supplierCityPath(item)}
                  className="relative flex items-center gap-6 py-6 pr-24 hover:bg-inset"
                >
                  <span className="w-8 font-mono text-[11px] tracking-widest text-muted uppercase">
                    {String(item.rank).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg tracking-tight">
                      {item.city}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {item.metro}
                    </span>
                  </span>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2">
                    <StateMark
                      abbr={item.stateAbbr}
                      size="card"
                      tone="onLight"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ClientCtaBand
        title={HOME_CTA_TITLE}
        lede={HOME_CTA_LEDE}
        cta={
          <ClientQuoteCtas
            variant="home"
            tone="dark"
            size="band"
            className="mt-8"
          />
        }
      />
    </ClientPage>
  );
}
