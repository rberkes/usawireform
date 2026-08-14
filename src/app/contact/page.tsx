import dynamic from "next/dynamic";
import { Page, PageHero, TextLink } from "@/components/ui";
import { QUOTE_EMAIL } from "@/lib/company";
import { PRICE_LINE } from "@/lib/price";
import { pageMeta } from "@/lib/seo";

const ContactForm = dynamic(() => import("@/components/ContactForm").then(mod => ({ default: mod.ContactForm })), {
  ssr: true,
  loading: () => (
    <div className="border border-line bg-inset p-6 sm:p-8 animate-pulse">
      <div className="h-4 w-32 bg-line/50 rounded mb-5" />
      <div className="grid gap-5 sm:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 bg-line/30 rounded" />
        ))}
      </div>
      <div className="h-32 bg-line/30 rounded mt-5" />
      <div className="h-10 w-32 bg-line/30 rounded mt-6" />
    </div>
  ),
});

export const metadata = pageMeta({
  title: "Contact",
  description: `Request a production quote for custom CNC wire forms. ${PRICE_LINE} Upload STEP, DXF or PDF files. Response within 24 hours from our Northeast Ohio facility.`,
  path: '/contact',
  keywords: [
    "request a quote",
    "STEP file upload",
    "wire forming quote",
    "wire form RFQ",
    "custom wire form quote",
  ],
});

export default function ContactPage() {
  return (
    <Page className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <PageHero
          kicker="Contact"
          title="Request a quote"
          lede={
            <>
              Production quote from a drawing. {PRICE_LINE} For a ballpark
              first, use the{" "}
              <TextLink href="/instant-quote">instant estimate</TextLink> —
              diameter, bends, length, and material.
            </>
          }
        />
        <dl className="mt-10 space-y-5 text-sm">
          <div>
            <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">
              Headquarters
            </dt>
            <dd className="mt-1">
              <TextLink href="/cleveland">Northeast Ohio</TextLink>
              {" — mills, wire drawers, short-haul coil"}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">
              Quotes
            </dt>
            <dd className="mt-1">
              <TextLink href={`mailto:${QUOTE_EMAIL}`}>
                {QUOTE_EMAIL}
              </TextLink>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">
              Tooling & coil
            </dt>
            <dd className="mt-1">
              <TextLink href="/quoting">
                Non-stock tooling, programming, mill minimums
              </TextLink>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">
              Files
            </dt>
            <dd className="mt-1 text-foreground/90">
              STEP, STP, IGES, PDF, DXF, SLDPRT
            </dd>
          </div>
        </dl>
      </div>
      <ContactForm />
    </Page>
  );
}
