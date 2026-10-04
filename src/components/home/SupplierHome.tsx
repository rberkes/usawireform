import Link from "next/link";
import { Suspense } from "react";
import {
  ClientCtaBand,
  ClientHero,
  ClientHowItWorks,
  ClientSection,
} from "@/components/client/ClientLanding";
import { HomeLogin } from "@/components/HomeLogin";
import {
  HomeFloorFeedFallback,
  HomeFloorFeedSection,
} from "@/components/HomeFloorFeedSection";
import { HomeFaq } from "@/components/home/HomeFaq";
import { FAQSchema } from "@/components/SeoSchemas";
import { ButtonLink, StatRow } from "@/components/ui";
import { SUPPLIER_HOME_FAQS } from "@/lib/home-faq";
import { HOME_SUPPLIER_STEPS } from "@/lib/client-landing";
import { buyerAbsoluteUrl } from "@/lib/hosts";
import {
  SOURCE_PLAN_LINE,
  SOURCE_SMART_CONNECT_LINE,
  formatLeadPrice,
} from "@/lib/source-plans";
import { directoryCompanies } from "@/lib/directory";

const STEPS = [
  {
    title: "Claim the plant",
    body: "US shops keep the directory URL. Three checks: numbered plant street, a public floor page, and you attest this is not a sales office.",
  },
  {
    title: "File every cell free",
    body: "OEM, year, capacity, and stocked wire sizes. Min order, setup, and lead stay free on the listing so a buyer can see how the plant runs.",
  },
  {
    title: "Unlock the lead you want",
    body: `${SOURCE_SMART_CONNECT_LINE} — ${formatLeadPrice()} when the print fits. Six shops see the teaser. First two to unlock get contact.`,
  },
];

export function SupplierHome() {
  const shops = directoryCompanies.length;

  return (
    <>
      <FAQSchema questions={[...SUPPLIER_HOME_FAQS]} />
      <ClientHero
        kicker="Supplier portal"
        title="Jobs that fit the machines you already run."
        lede="File the cell. Buyers send a STEP. Matching is machine class, diameter, and this week’s fullness — not a blast to every shop on the list."
        cta={false}
        aside={<HomeLogin />}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/source/equipment" variant="quote">
            File equipment free
          </ButtonLink>
          <ButtonLink href="/source/shops" variant="ghost" className="border-white/40 text-white hover:bg-white hover:text-[#0b1f33]">
            Claim your listing
          </ButtonLink>
        </div>
        <p className="mt-4 max-w-xl text-sm leading-6 text-white/60">
          {SOURCE_PLAN_LINE}
        </p>
      </ClientHero>

      <Suspense fallback={<HomeFloorFeedFallback />}>
        <HomeFloorFeedSection />
      </Suspense>

      <ClientSection
        id="how"
        kicker="How it works"
        title="Capability in. Work that fits out."
      >
        <ClientHowItWorks steps={STEPS} />
      </ClientSection>

      <ClientSection
        id="leads"
        kicker="Leads"
        title={`${formatLeadPrice()} when you want the contact.`}
        lede="Listing is free. You pay when a matched print is worth opening. The STEP is never attached to email."
        inset
      >
        <StatRow
          items={[
            { value: String(shops), label: "Shops already in the directory" },
            { value: formatLeadPrice(), label: "Unlock a matched lead" },
            { value: "6", label: "Shops in the teaser pool" },
            { value: "2", label: "First unlocks get contact" },
          ]}
        />
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/source/upgrade">AI Smart Connect™</ButtonLink>
          <ButtonLink href="/source/dashboard" variant="ghost">
            Shop dashboard
          </ButtonLink>
        </div>
      </ClientSection>

      <ClientSection kicker="Three steps" title="Same matching the buyer sees.">
        <ClientHowItWorks steps={[...HOME_SUPPLIER_STEPS]} />
      </ClientSection>

      <ClientSection kicker="FAQ" title="Before you file a cell.">
        <HomeFaq items={SUPPLIER_HOME_FAQS} />
      </ClientSection>

      <ClientCtaBand
        title="File the first cell today."
        lede="Every cell is free. Matched leads show in the shop dashboard. You decide which prints to unlock."
        cta={
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/source/equipment" variant="quote">
              File equipment free
            </ButtonLink>
            <ButtonLink
              href="/sign-in?as=supplier&redirect_url=/source/enter"
              variant="ghost"
              className="border-white/40 text-white hover:bg-white hover:text-[#0b1f33]"
            >
              Shop log in
            </ButtonLink>
          </div>
        }
      />

      <section className="border-t border-line bg-inset">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
              Need parts formed?
            </p>
            <p className="mt-1 text-sm leading-6 text-muted">
              The buyer site is for prints, catalog parts, and instant quote.
            </p>
          </div>
          <Link
            href={buyerAbsoluteUrl("/")}
            className="text-sm font-medium text-copper hover:text-copper-dim"
          >
            Go to the buyer site →
          </Link>
        </div>
      </section>
    </>
  );
}
