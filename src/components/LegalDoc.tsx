import type { ReactNode } from "react";
import Link from "next/link";
import { COMPANY, QUOTE_EMAIL } from "@/lib/company";
import { LEGAL_EFFECTIVE, LEGAL_PATHS } from "@/lib/legal";
import { TextLink } from "./ui";

export function LegalArticle({ children }: { children: ReactNode }) {
  return (
    <article className="mt-10 max-w-3xl space-y-10 text-base leading-7 text-muted">
      {children}
    </article>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-medium tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-3 space-y-4">{children}</div>
    </section>
  );
}

export function LegalToc({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <nav aria-label="On this page" className="border border-line bg-inset p-5">
      <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
        On this page
      </p>
      <ol className="mt-3 columns-1 gap-x-8 sm:columns-2">
        {items.map((item, index) => (
          <li key={item.id} className="break-inside-avoid py-1 text-sm">
            <a href={`#${item.id}`} className="text-foreground/90 hover:text-copper">
              <span className="mr-2 font-mono text-[11px] text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function LegalUpdated() {
  return (
    <p className="font-mono text-[12px] tracking-wide text-muted uppercase">
      Effective {LEGAL_EFFECTIVE}
    </p>
  );
}

export function LegalContact() {
  return (
    <p>
      Questions about these terms:{" "}
      <TextLink href={`mailto:${QUOTE_EMAIL}`}>{QUOTE_EMAIL}</TextLink>.{" "}
      {COMPANY}, Northeast Ohio.{" "}
      <TextLink href="/contact">Send a print</TextLink> if the question is a
      job.
    </p>
  );
}

export function FormLegalNotice({ className = "mt-4" }: { className?: string }) {
  return (
    <p className={`text-xs leading-5 text-muted ${className}`}>
      By submitting, you agree to the{" "}
      <Link href={LEGAL_PATHS.terms} className="underline hover:text-copper">
        User Agreement
      </Link>{" "}
      and{" "}
      <Link href={LEGAL_PATHS.privacy} className="underline hover:text-copper">
        Privacy Policy
      </Link>
      . Your drawing is for quoting and production only. We do not sell it.
    </p>
  );
}
