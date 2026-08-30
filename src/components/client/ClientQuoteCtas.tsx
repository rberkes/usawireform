import Link from "next/link";
import { cx } from "@/lib/cx";

export const INSTANT_QUOTE_HREF = "/instant-quote";
export const PRODUCTION_QUOTE_HREF = "/production-quote";

const sizes = {
  hero: "px-7 py-3.5 text-base font-medium",
  band: "px-6 py-3 text-sm font-medium",
} as const;

export function ClientQuoteCtas({
  tone = "light",
  size = "hero",
  className,
}: {
  tone?: "light" | "dark";
  size?: keyof typeof sizes;
  className?: string;
}) {
  const pad = sizes[size];
  const primary = cx(
    "inline-flex items-center justify-center rounded-sm text-white transition-colors",
    pad,
    tone === "dark"
      ? "bg-zoom hover:bg-zoom-dim"
      : "bg-zoom hover:bg-zoom-dim",
  );
  const secondary = cx(
    "inline-flex items-center justify-center rounded-sm border transition-colors",
    pad,
    tone === "dark"
      ? "border-white/80 text-white hover:bg-white hover:text-[#0b1f33]"
      : "border-line text-foreground hover:border-copper/50",
  );

  return (
    <div className={cx("flex flex-col gap-3 sm:flex-row sm:flex-wrap", className)}>
      <Link href={INSTANT_QUOTE_HREF} className={primary}>
        Get instant quote
      </Link>
      <Link href={PRODUCTION_QUOTE_HREF} className={secondary}>
        Start production quote
      </Link>
    </div>
  );
}
