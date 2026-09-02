import Link from "next/link";
import { cx } from "@/lib/cx";
import { HOME_QUOTE_NOTE } from "@/lib/client-landing";
import { SOURCE_SMART_CONNECT_LINE } from "@/lib/source-plans";

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
  audience = "both",
  className,
}: {
  tone?: "light" | "dark";
  size?: keyof typeof sizes;
  variant?: "quote" | "home";
  audience?: "buyers" | "suppliers" | "both";
  className?: string;
}) {
  const pad = sizes[size];
  const primary = cx(
    "inline-flex items-center justify-center rounded-sm text-center transition-colors",
    pad,
    tone === "dark"
      ? "bg-zoom text-white hover:bg-white hover:text-[#0b1f33]"
      : "bg-zoom text-white hover:bg-zoom-dim",
  );
  const secondary = cx(
    "inline-flex items-center justify-center rounded-sm border text-center transition-colors",
    pad,
    tone === "dark"
      ? "border-white/80 text-white hover:border-white hover:bg-white hover:text-[#0b1f33]"
      : "border-line text-foreground hover:border-copper/50",
  );
  const note = tone === "dark" ? "text-white/60" : "text-muted";
  const labelTone = tone === "dark" ? "text-white/55" : "text-muted";

  const showBuyers = audience !== "suppliers";
  const showSuppliers = audience !== "buyers";
  const twoUp = showBuyers && showSuppliers;

  const buttons =
    variant === "home" ? (
      <div
        className={cx(
          "grid w-full max-w-xl grid-cols-1 gap-5",
          twoUp ? "sm:max-w-2xl sm:grid-cols-2 sm:gap-6" : "sm:max-w-md",
          labelTone,
        )}
      >
        {showBuyers ? (
          twoUp ? (
            <CtaAction
              label="Buyers"
              href={SOURCE_JOB_HREF}
              className={primary}
            >
              Get a Quote
            </CtaAction>
          ) : (
            <Link href={SOURCE_JOB_HREF} className={cx(primary, "w-full sm:w-auto")}>
              Get a Quote
            </Link>
          )
        ) : null}
        {showSuppliers ? (
          twoUp ? (
            <CtaAction
              label="Suppliers"
              href={SOURCE_EQUIPMENT_HREF}
              className={secondary}
            >
              List Machines Free
            </CtaAction>
          ) : (
            <Link
              href={SOURCE_EQUIPMENT_HREF}
              className={cx(primary, "w-full sm:w-auto")}
            >
              List Machines Free
            </Link>
          )
        ) : null}
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
      {variant === "home" && size !== "band" ? (
        <p className={cx("max-w-xl text-sm leading-6", note)}>
          {audience === "suppliers"
            ? `File every cell free. Matched leads show in the shop dashboard. ${SOURCE_SMART_CONNECT_LINE}.`
            : HOME_QUOTE_NOTE}
        </p>
      ) : null}
    </div>
  );
}
