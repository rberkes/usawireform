import Link from "next/link";
import {
  ClientCtaBand,
  ClientHero,
  ClientHowItWorks,
  ClientSection,
  ClientServiceCards,
} from "@/components/client/ClientLanding";
import { ClientQuoteCtas } from "@/components/client/ClientQuoteCtas";
import { AskBox } from "@/components/AskBox";
import { CapabilityStrip } from "@/components/CapabilityStrip";
import { PricePromise } from "@/components/PricePromise";
import { SocialProof } from "@/components/SocialProof";
import { FAQSchema } from "@/components/SeoSchemas";
import { Page, StatRow } from "@/components/ui";
import { BuyerPricingExamples } from "@/components/home/BuyerPricingExamples";
import { BuyerUploadCard } from "@/components/home/BuyerUploadCard";
import { HomeFaq } from "@/components/home/HomeFaq";
import {
  CLIENT_SERVICES,
  CLIENT_STEPS,
  HOME_CTA_LEDE,
  HOME_HERO_KICKER,
  HOME_HERO_LEDE,
  HOME_HERO_TITLE,
} from "@/lib/client-landing";
import { BUYER_HOME_FAQS } from "@/lib/home-faq";
import { ESTIMATE_MATERIALS } from "@/lib/quoting";
import { publicSupplierUrl } from "@/lib/hosts";
import { WIRE } from "@/lib/range";

const CAPABILITIES = [
  ...CLIENT_SERVICES,
  {
    href: "/ground-staples",
    title: "Ground staples",
    body: "8 gauge landscape and sod staples, plus custom Us on this cell.",
    points: [
      "8 ga 6 in and 12 in bags on the price ladder",
      "Custom builder for leg length",
      "Same 100-piece production start",
    ],
  },
];

const TRUST = [
  {
    title: "Made in the USA",
    body: "This floor is Northeast Ohio. Source quotes come from U.S. plants that filed a real cell — not a sales desk.",
  },
  {
    title: "Your files stay yours",
    body: "A STEP is never attached to email. Shops open a released file in the dashboard only after they buy the lead.",
  },
  {
    title: "No CAD? We convert it",
    body: "PDF 3-view, sketch, or dimensioned drawing. We model a STEP free so the job can be quoted.",
  },
  {
    title: "Lowest prices guaranteed",
    body: "Show a competing quote on the same print. Our prices will not be beat. 100-piece production minimum.",
  },
];

export function BuyerHome() {
  return (
    <>
      <FAQSchema questions={[...BUYER_HOME_FAQS]} />
      <ClientHero
        kicker={HOME_HERO_KICKER}
        title={HOME_HERO_TITLE}
        lede={HOME_HERO_LEDE}
        cta={
          <ClientQuoteCtas
            variant="home"
            audience="buyers"
            tone="dark"
            className="mt-8"
          />
        }
        aside={<BuyerUploadCard />}
      />

      <ClientSection
        kicker="Full capability"
        title="Wire forming at your fingertips."
        lede={`2D and 3D CNC from coil, cut-to-length, hooks, staples, baskets, and welded frames. This floor runs ${WIRE.short}. The network matches prints that need another cell.`}
      >
        <ClientServiceCards items={CAPABILITIES} />
      </ClientSection>

      <ClientSection
        kicker="Pricing examples"
        title="See how quantity moves the piece price."
        lede="Listed bags include steel. Instant estimate is forming only. Upload the print for a production quote."
        inset
      >
        <BuyerPricingExamples />
        <p className="mt-6 text-sm leading-6 text-muted">
          Examples are current listed or rate-card numbers and can move.{" "}
          <Link href="/source#job" className="text-copper hover:underline">
            Upload a file
          </Link>{" "}
          for a quote on your print.
        </p>
      </ClientSection>

      <ClientSection
        kicker="Materials"
        title="If it comes in a coil, we process it."
        lede="Carbon, spring, 300-series stainless, 330, aluminum including 6061-T6, brass, and copper. You buy the coil, or we quote it with the job."
      >
        <div className="flex flex-wrap gap-2">
          {ESTIMATE_MATERIALS.map((item) => (
            <Link
              key={item.id}
              href="/materials"
              className="border border-line bg-background px-3 py-2 text-sm text-foreground hover:border-copper/50 hover:text-copper"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm leading-6 text-muted">
          Grades, mill notes, and what this cell actually runs —{" "}
          <Link href="/materials" className="text-copper hover:underline">
            materials
          </Link>
          .
        </p>
      </ClientSection>

      <ClientSection
        kicker="How it works"
        title="From file to finished form."
        inset
      >
        <ClientHowItWorks steps={[...CLIENT_STEPS]} />
      </ClientSection>

      <Page className="py-16 sm:py-20">
        <StatRow
          items={[
            { value: WIRE.metric, label: "This-floor diameter band" },
            { value: "100 pcs", label: "Production minimum" },
            { value: "2 quotes", label: "Included on a Source print" },
            { value: "Northeast Ohio", label: "Headquarters + production" },
          ]}
        />
        <div className="mt-16">
          <PricePromise />
        </div>
        <div className="mt-16">
          <CapabilityStrip />
        </div>
        <div className="mt-16">
          <AskBox />
        </div>
      </Page>

      <ClientSection
        kicker="Why this desk"
        title="More than a quote form."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {TRUST.map((item) => (
            <article key={item.title} className="border border-line p-6">
              <h3 className="text-lg tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </ClientSection>

      <SocialProof />

      <ClientSection kicker="FAQ" title="Before you send the print.">
        <HomeFaq items={BUYER_HOME_FAQS} />
      </ClientSection>

      <ClientCtaBand
        title="Start the first job today."
        lede={HOME_CTA_LEDE}
        cta={
          <ClientQuoteCtas
            variant="home"
            audience="buyers"
            tone="dark"
            size="band"
            className="mt-8"
          />
        }
      />

      <section className="border-t border-line bg-inset">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
              Run a wire shop?
            </p>
            <p className="mt-1 text-sm leading-6 text-muted">
              File cells free. Jobs that fit your iron show in the shop
              dashboard.
            </p>
          </div>
          <Link
            href={publicSupplierUrl("/suppliers")}
            className="text-sm font-medium text-copper hover:text-copper-dim"
          >
            Open the supplier portal →
          </Link>
        </div>
      </section>
    </>
  );
}
