import Link from "next/link";
import {
  ClientCtaBand,
  ClientHero,
  ClientPage,
} from "@/components/client/ClientLanding";
import { ClientQuoteCtas } from "@/components/client/ClientQuoteCtas";
import { StateMark } from "@/components/StateIcon";
import { Container } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { HOME_CTA_LEDE, HOME_CTA_TITLE } from "@/lib/client-landing";
import { COMPANY } from "@/lib/company";
import { pageMeta } from "@/lib/seo";
import {
  SUPPLIER_CITY_HUB,
  TOP_SUPPLIER_CITIES,
  supplierCityPath,
} from "@/lib/supplier-cities";

export const metadata = pageMeta({
  title: "Wire Form Suppliers in Major U.S. Cities",
  description:
    "Top 10 U.S. wire-forming cities — Los Angeles, Chicago, Cleveland, Houston, Grand Rapids, Milwaukee, Detroit, Hartford, Pittsburgh, and Dallas. State icon shows where the shops sit.",
  path: SUPPLIER_CITY_HUB,
  keywords: [
    "wire form suppliers",
    "wire forming companies by city",
    "Chicago wire form suppliers",
    "Los Angeles wire forming",
    "Cleveland wire forming",
  ],
});

export default function SupplierCitiesHub() {
  return (
    <ClientPage>
      <BreadcrumbJsonLd
        items={[{ name: "Suppliers by city", url: SUPPLIER_CITY_HUB }]}
      />
      <ClientHero
        kicker="Top 10 cities"
        title="Wire form suppliers by city."
        lede={`${COMPANY} matches buyer prints to shops that can run them. Each city page lists suppliers in that metro. The state icon on the right is where those quotes come from.`}
        cta={<ClientQuoteCtas variant="home" tone="dark" className="mt-8" />}
      />

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <p className="font-mono text-[12px] tracking-[0.22em] text-copper uppercase">
            Major manufacturing cities
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl tracking-tight sm:text-4xl">
            Ten forming metros. State on the right.
          </h2>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {TOP_SUPPLIER_CITIES.map((city) => (
              <li key={city.slug}>
                <Link
                  href={supplierCityPath(city)}
                  className="relative flex items-center gap-6 py-7 pr-24 hover:bg-inset sm:pr-28"
                >
                  <span className="w-8 font-mono text-[11px] tracking-widest text-muted uppercase">
                    {String(city.rank).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xl tracking-tight">
                      {city.city}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {city.metro}
                    </span>
                  </span>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2">
                    <StateMark
                      abbr={city.stateAbbr}
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
