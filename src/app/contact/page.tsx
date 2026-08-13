import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Page, PageHero, TextLink } from "@/components/ui";
import { QUOTE_EMAIL } from "@/lib/company";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a quote for custom CNC wire forms.",
};

export default function ContactPage() {
  return (
    <Page className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <PageHero
          kicker="Contact"
          title="Request a quote"
          lede="All fields required. Include quantity, material, and diameter. Stock is 3/8, 7/16, and 1/2 in. Other sizes in 4–14 mm need tooling and coil."
        />
        <dl className="mt-10 space-y-5 text-sm">
          <div>
            <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">
              Shop
            </dt>
            <dd className="mt-1">
              <TextLink href="/cleveland">Cleveland, Ohio</TextLink>
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
