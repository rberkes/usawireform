import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { config } from "@/lib/config";
import { cx } from "@/lib/cx";
import { ClientQuoteCtas } from "./ClientQuoteCtas";

const NAVY = "bg-[#0b1f33]";

export function ClientHero({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <section className={`${NAVY} text-white`}>
      <Container className="py-16 sm:py-24">
        <p className="font-mono text-[12px] tracking-[0.22em] text-white/55 uppercase">
          {kicker}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl leading-[1.08] font-medium tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{lede}</p>
        <ClientQuoteCtas tone="dark" className="mt-8" />
        {children}
        <ClientCertBar />
      </Container>
    </section>
  );
}

export function ClientCertBar() {
  return (
    <p className="mt-10 font-mono text-[11px] tracking-wide text-white/50 uppercase">
      Certification + compliance{" "}
      <span className="text-white/80">
        {config.certifications.map((item) => item.name).join("  ·  ")}
      </span>
    </p>
  );
}

export function ClientSection({
  kicker,
  title,
  lede,
  children,
  inset = false,
}: {
  kicker?: string;
  title: string;
  lede?: string;
  children: ReactNode;
  inset?: boolean;
}) {
  return (
    <section className={inset ? "bg-inset" : "bg-background"}>
      <Container className="py-16 sm:py-20">
        {kicker ? (
          <p className="font-mono text-[12px] tracking-[0.22em] text-copper uppercase">
            {kicker}
          </p>
        ) : null}
        <h2
          className={cx(
            "max-w-3xl text-3xl tracking-tight sm:text-4xl",
            kicker ? "mt-3" : "",
          )}
        >
          {title}
        </h2>
        {lede ? (
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{lede}</p>
        ) : null}
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}

export function ClientHowItWorks({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="border border-line bg-background p-6">
          <p className="font-mono text-[11px] tracking-widest text-copper uppercase">
            0{index + 1}
          </p>
          <h3 className="mt-3 text-lg tracking-tight">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function ClientServiceCards({
  items,
}: {
  items: {
    href: string;
    title: string;
    body: string;
    points: readonly string[];
  }[];
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.href}
          className="flex flex-col border border-line bg-background p-6 sm:p-8"
        >
          <h3 className="text-xl tracking-tight">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
          <ul className="mt-4 flex-1 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted">
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Link
            href={item.href}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-copper hover:text-copper-dim"
          >
            Learn more
            <span aria-hidden>→</span>
          </Link>
        </article>
      ))}
    </div>
  );
}

export function ClientCtaBand({
  title,
  lede,
}: {
  title: string;
  lede: string;
}) {
  return (
    <section className={`${NAVY} text-white`}>
      <Container className="py-16 sm:py-20">
        <h2 className="max-w-3xl text-3xl tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">{lede}</p>
        <ClientQuoteCtas tone="dark" size="band" className="mt-8" />
      </Container>
    </section>
  );
}

export function ClientPage({ children }: { children: ReactNode }) {
  return <main className="flex-1">{children}</main>;
}
