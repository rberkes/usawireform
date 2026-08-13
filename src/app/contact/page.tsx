import { ContactForm } from "@/components/ContactForm";
import { Page, PageHero, TextLink } from "@/components/ui";
import { QUOTE_EMAIL } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description: "Request a quote for custom CNC wire forms.",
  path: '/contact',
  keywords: [
    "request a quote",
    "STEP file upload",
    "wire forming quote",
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
              Production quote from a drawing. For a ballpark first, use the{" "}
              <TextLink href="/instant-quote">instant estimate</TextLink> —
              diameter, bends, length, and material.
            </>
          }
        />
        <dl className="mt-10 space-y-5 text-sm">
          <div>
            <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">
              Shop
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
