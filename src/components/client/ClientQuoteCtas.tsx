import Link from "next/link";
import { cx } from "@/lib/cx";

export const INSTANT_QUOTE_HREF = "/instant-quote";
export const PRODUCTION_QUOTE_HREF = "/production-quote";
export const SOURCE_JOB_HREF = "/source#job";
export const SOURCE_SHOPS_HREF = "/source/shops";
export const SOURCE_EQUIPMENT_HREF = "/source/equipment";

const sizes = {
  hero: "px-7 py-3.5 text-base font-medium",
  band: "px-6 py-3 text-sm font-medium",
} as const;

function CtaAction({
  label,
  href,
  className,
  children,
}: {
  label: string;
  href: string;
  className: string;
  children: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <p className="font-mono text-[11px] tracking-[0.22em] uppercase">{label}</p>
      <Link href={href} className={cx(className, "w-full")}>
        {children}
      </Link>
    </div>
  );
}

export function ClientQuoteCtas({
  tone = "light",
  size = "hero",
  variant = "quote",
  className,
}: {
  tone?: "light" | "dark";
  size?: keyof typeof sizes;
  variant?: "quote" | "home";
  className?: string;
}) {
  const pad = sizes[size];
  const primary = cx(
    "inline-flex items-center justify-center rounded-sm text-center text-white transition-colors",
    pad,
    "bg-zoom hover:bg-zoom-dim",
  );
  const secondary = cx(
    "inline-flex items-center justify-center rounded-sm border text-center transition-colors",
    pad,
    tone === "dark"
      ? "border-white/80 text-white hover:bg-white hover:text-[#0b1f33]"
      : "border-line text-foreground hover:border-copper/50",
  );
  const note = tone === "dark" ? "text-white/60" : "text-muted";
  const labelTone = tone === "dark" ? "text-white/55" : "text-muted";

  const buttons =
    variant === "home" ? (
      <div className={cx("grid w-full max-w-xl grid-cols-1 gap-5 sm:max-w-2xl sm:grid-cols-2 sm:gap-6", labelTone)}>
        <CtaAction label="Buyers" href={SOURCE_JOB_HREF} className={primary}>
          Get a Quote
        </CtaAction>
        <CtaAction
          label="Suppliers"
          href={SOURCE_EQUIPMENT_HREF}
          className={secondary}
        >
          List your machine Free
        </CtaAction>
      </div>
    ) : (
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href={INSTANT_QUOTE_HREF} className={primary}>
          Get instant quote
        </Link>
        <Link href={PRODUCTION_QUOTE_HREF} className={secondary}>
          Upload a drawing
        </Link>
      </div>
    );

  return (
    <div className={cx("flex flex-col gap-3", className)}>
      {buttons}
      {variant === "home" ? (
        <p className={cx("max-w-xl text-sm leading-6", note)}>
          Quotes come from cells that can run the print. No STEP? We convert a
          PDF 3-view for free.
        </p>
      ) : null}
    </div>
  );
}
