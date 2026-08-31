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
    "inline-flex items-center justify-center rounded-sm text-white transition-colors",
    pad,
    "bg-zoom hover:bg-zoom-dim",
  );
  const secondary = cx(
    "inline-flex items-center justify-center rounded-sm border transition-colors",
    pad,
    tone === "dark"
      ? "border-white/80 text-white hover:bg-white hover:text-[#0b1f33]"
      : "border-line text-foreground hover:border-copper/50",
  );
  const note = tone === "dark" ? "text-white/60" : "text-muted";

  const buttons =
    variant === "home" ? (
      <>
        <Link href={SOURCE_JOB_HREF} className={primary}>
          Upload STEP for quotes
        </Link>
        <Link href={SOURCE_EQUIPMENT_HREF} className={secondary}>
          List your machine
        </Link>
      </>
    ) : (
      <>
        <Link href={INSTANT_QUOTE_HREF} className={primary}>
          Get instant quote
        </Link>
        <Link href={PRODUCTION_QUOTE_HREF} className={secondary}>
          Upload a drawing
        </Link>
      </>
    );

  return (
    <div className={cx("flex flex-col gap-3", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {buttons}
      </div>
      {variant === "home" ? (
        <p className={cx("max-w-xl text-sm leading-6", note)}>
          Quotes come from cells that can run the print. No STEP? We convert a
          PDF 3-view for free.
        </p>
      ) : null}
    </div>
  );
}
