import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CopyButton } from "@/components/CopyButton";
import { Kicker, TextLink } from "@/components/ui";
import { QUOTE_EMAIL } from "@/lib/company";
import { PRICE_LINE } from "@/lib/price";
import { pageMeta } from "@/lib/seo";

const ContactForm = dynamic(() => import("@/components/ContactForm").then(mod => ({ default: mod.ContactForm })), {
  ssr: true,
  loading: () => (
    <div className="border border-line bg-background p-6 sm:p-10 animate-pulse">
      <div className="h-3 w-28 bg-line/50 mb-4" />
      <div className="h-7 w-64 bg-line/40 mb-3" />
      <div className="h-4 w-full max-w-md bg-line/30 mb-8" />
      <div className="grid gap-5 sm:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 bg-line/30" />
        ))}
      </div>
      <div className="h-32 bg-line/30 mt-5" />
      <div className="h-10 w-32 bg-line/30 mt-6" />
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
    <main>
      <section className="relative overflow-hidden bg-foreground text-background">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <Breadcrumbs
            items={[{ label: "Contact" }]}
            tone="inverse"
            className="mb-8"
          />
          <h1 className="max-w-3xl text-4xl font-medium tracking-tight sm:text-6xl">
            Let&apos;s talk
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">
            Send a drawing for a production quote. {PRICE_LINE} Ballpark first?
            Use the{" "}
            <Link href="/instant-quote" className="text-copper hover:underline">
              instant estimate
            </Link>{" "}
            — diameter, bends, length, and material.
          </p>
        </div>
      </section>

      <div className="bg-inset">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-5 py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:gap-10 lg:py-16">
          <ContactForm />
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
            <DirectContact />
            <WhatToExpect />
          </aside>
        </div>
      </div>
    </main>
  );
}

function DirectContact() {
  return (
    <div className="bg-foreground p-6 text-background sm:p-8">
      <Kicker>Direct contact</Kicker>
      <h2 className="mt-3 text-2xl tracking-tight text-white">
        Email, headquarters, or a STEP
      </h2>
      <p className="mt-3 text-sm leading-6 text-white/60">
        Quotes, drawings, and mill questions all start here.
      </p>
      <ul className="mt-8 space-y-8">
        <ContactRow
          icon={<MailIcon />}
          title="Email our team"
          body="Sales and production quotes."
          value={QUOTE_EMAIL}
          copyLabel="email"
          href={`mailto:${QUOTE_EMAIL}`}
          action="Write an email"
        />
        <ContactRow
          icon={<PinIcon />}
          title="Headquarters"
          body="Mills, wire drawers, short-haul coil."
          value="Northeast Ohio"
          href="/cleveland"
          action="Why this location"
        />
        <ContactRow
          icon={<FileIcon />}
          title="Send a drawing"
          body="STEP, STP, IGES, PDF, DXF, SLDPRT"
          href="/instant-quote"
          action="Instant estimate"
        />
      </ul>
    </div>
  );
}

function ContactRow({
  icon,
  title,
  body,
  value,
  copyLabel,
  href,
  action,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  value?: string;
  copyLabel?: string;
  href: string;
  action: string;
}) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 text-copper" aria-hidden>
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-copper">{title}</p>
        {value ? (
          <p className="mt-1 flex items-center gap-1 text-sm text-white">
            <span className="truncate">{value}</span>
            {copyLabel ? <CopyButton value={value} label={copyLabel} /> : null}
          </p>
        ) : null}
        <p className="mt-1 text-sm leading-6 text-white/55">{body}</p>
        <TextLink href={href} className="mt-2 inline-flex items-center gap-1">
          {action}
          <span aria-hidden>→</span>
        </TextLink>
      </div>
    </li>
  );
}

function WhatToExpect() {
  return (
    <div className="border border-line bg-background p-6 sm:p-8">
      <Kicker>What to expect</Kicker>
      <h2 className="mt-3 text-2xl tracking-tight">
        A quote from people who form the wire
      </h2>
      <ul className="mt-8 space-y-6">
        {[
          {
            title: "Quote from the drawing",
            body: "STEP, DXF, or PDF in. Production price, coil, and tooling notes back.",
          },
          {
            title: "CNC and secondaries in one conversation",
            body: "Bend, pierce, resistance weld, MIG — the same cell quotes the print.",
          },
          {
            title: "4–14 mm, 100-piece minimum",
            body: "50+ years in this diameter band. Lowest prices guaranteed.",
          },
        ].map((item) => (
          <li key={item.title}>
            <h3 className="text-sm font-medium">{item.title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" stroke="currentColor" />
      <path d="M3 7l9 7 9-7" stroke="currentColor" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s7-6.2 7-11.2A7 7 0 0 0 5 9.8C5 14.8 12 21 12 21Z"
        stroke="currentColor"
      />
      <circle cx="12" cy="10" r="2.25" stroke="currentColor" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M7 3h7l5 5v13H7V3Z" stroke="currentColor" />
      <path d="M14 3v5h5" stroke="currentColor" />
    </svg>
  );
}
