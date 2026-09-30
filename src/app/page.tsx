import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { CapabilityStrip } from "@/components/CapabilityStrip";
import { ClientQuoteCtas } from "@/components/client/ClientQuoteCtas";
import {
  ClientCtaBand,
  ClientHero,
  PlatformFlow,
} from "@/components/client/ClientLanding";
import {
  HomeFloorFeedFallback,
  HomeFloorFeedSection,
} from "@/components/HomeFloorFeedSection";
import {
  HOME_CAD_CTA_LEDE,
  HOME_CAD_CTA_TITLE,
  HOME_CAD_HERO_LEDE,
  HOME_CAD_SPLIT,
  HOME_CAD_STEPS,
} from "@/lib/client-landing";
import { PricePromise } from "@/components/PricePromise";
import { SocialProof } from "@/components/SocialProof";
import { StateGrid } from "@/components/StateGrid";
import { ZipLookup } from "@/components/ZipLookup";
import { LinkList, Page, Section, StatRow, TextLink } from "@/components/ui";
import { BrandLockup } from "@/components/WireMark";
import { COMPANY } from "@/lib/company";
import { PRICE_LINE, QUOTE_REVIEW } from "@/lib/price";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: `CNC Wire Forming Quote — Upload a STEP | ${COMPANY}`,
  description: `${COMPANY}: Upload a round-wire STEP for 214TF DFM and a shop-formula estimate. ${PRICE_LINE} Instant is this cell. Source is other floors.`,
  path: "/",
  absoluteTitle: true,
  image: {
    url: "/shop/robomac-214tf.jpg",
    width: 1536,
    height: 1024,
    alt: "Numalliance Robomac 214TF 3D CNC wire forming machine",
  },
  keywords: [
    "CNC wire forming quote",
    "upload STEP wire form",
    "instant wire forming quote",
    "Robomac 214TF",
    "USA Wire Form",
    "4-14 mm wire forming",
    "Northeast Ohio wire forming",
  ],
});

/** ISR: cache the page for 5 minutes so the floor feed stays reasonably fresh. */
export const revalidate = 300;

export default async function Home() {
  return (
    <>
      <ClientHero
        kicker="Instant quote"
        title={<BrandLockup size="hero" tone="onDark" />}
        lede={HOME_CAD_HERO_LEDE}
        cta={<ClientQuoteCtas variant="cad" tone="dark" className="mt-8" />}
      >
        <PlatformFlow steps={HOME_CAD_STEPS} />
      </ClientHero>
      <Page>
        <PricePromise titled={false} className="mt-0" />

        <StatRow
          className="mt-16"
          items={[
            { value: WIRE.metric, label: "Production band" },
            { value: "1018 $0.05/in", label: "Filed forming rate" },
            { value: "100 pc", label: "Production minimum" },
            { value: "Northeast Ohio", label: "This cell" },
          ]}
        />

        <Section
          kicker="This cell"
          title="Numalliance Robomac 214TF."
        >
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
            3D CNC from coil, 4–14 mm. Two heads: wipe / pin and push rings.
            Instant quote is this machine. {QUOTE_REVIEW}
          </p>
          <Link href="/equipment" className="group mt-8 block">
            <div className="relative aspect-[3/2] overflow-hidden bg-inset">
              <Image
                src="/shop/robomac-214tf.jpg"
                alt="Numalliance Robomac 214TF — 3D CNC from coil, 4–14 mm"
                fill
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-muted group-hover:text-copper">
              Floor photo — 4–14 mm from coil.
            </p>
          </Link>
        </Section>

        <CapabilityStrip />

        <Section kicker="Parts we run" title="Hooks, staples, baskets, guards.">
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <TextLink
              href="/powder-coating-hooks"
              className="block border border-line p-4 hover:border-copper"
            >
              <span className="font-medium">Powder coating hooks</span>
              <span className="mt-1 block text-sm text-muted">
                V, C, CV, S — shop steel mill card
              </span>
            </TextLink>
            <TextLink
              href="/ground-staples"
              className="block border border-line p-4 hover:border-copper"
            >
              <span className="font-medium">Ground staples</span>
              <span className="mt-1 block text-sm text-muted">
                8 ga bags and heavy custom
              </span>
            </TextLink>
            <TextLink
              href="/products/wire-baskets"
              className="block border border-line p-4 hover:border-copper"
            >
              <span className="font-medium">Wire baskets</span>
              <span className="mt-1 block text-sm text-muted">
                Heat-treat and parts baskets
              </span>
            </TextLink>
            <TextLink
              href="/products/wire-guards"
              className="block border border-line p-4 hover:border-copper"
            >
              <span className="font-medium">Guards and frames</span>
              <span className="mt-1 block text-sm text-muted">
                3D frames that bolt on
              </span>
            </TextLink>
          </div>
        </Section>

        <Section
          kicker="Other floors"
          title="Need a different cell?"
        >
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
            {HOME_CAD_SPLIT} Source matches shops that filed the machine and have
            open capacity.
          </p>
          <LinkList
            className="mt-8"
            items={[
              {
                href: "/source",
                title: "Find a shop",
                body: "Cell class, wire size, ZIP. Quotes from floors that can run it.",
              },
              {
                href: "/source/equipment",
                title: "List machines free",
                body: "File OEM, year, capacity, and stocked sizes.",
              },
              {
                href: "/find-factories-by-machine",
                title: "Find factories by machine",
                body: "Type Robomac, fourslide, TIG. Plants drop as you type.",
              },
            ]}
          />
          <div className="mt-12">
            <Suspense fallback={<HomeFloorFeedFallback />}>
              <HomeFloorFeedSection />
            </Suspense>
          </div>
        </Section>

        <Section kicker="Locations" title="Quotes nationwide. Cell in Ohio.">
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
            Production leaves Northeast Ohio. Each U.S. state page is the landing
            for that ZIP.{" "}
            <Link
              href="/wire-forming-companies-near-me"
              className="text-copper hover:underline"
            >
              Companies near me
            </Link>
            .
          </p>
          <div className="mt-6">
            <ZipLookup />
          </div>
          <StateGrid />
        </Section>
      </Page>

      <ClientCtaBand
        title={HOME_CAD_CTA_TITLE}
        lede={HOME_CAD_CTA_LEDE}
        cta={<ClientQuoteCtas variant="cad" tone="dark" size="band" className="mt-8" />}
      />

      <SocialProof className="mt-8" />
    </>
  );
}
