import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/cx";

export const fieldClass =
  "w-full rounded-sm border border-line bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted/60 focus:border-copper";

export const btn = {
  primary:
    "inline-flex items-center justify-center rounded-sm bg-copper px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-copper-dim",
  ghost:
    "inline-flex items-center justify-center rounded-sm border border-line px-5 py-2.5 text-sm text-foreground transition-colors hover:border-copper/50",
  compact:
    "inline-flex items-center justify-center rounded-sm bg-copper px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-copper-dim",
  quote:
    "inline-flex items-center justify-center rounded-sm bg-zoom px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zoom-dim",
} as const;

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: keyof typeof btn }) {
  return <button className={cx(btn[variant], className)} {...props} />;
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof btn;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={cx(btn[variant], className)}>
      {children}
    </Link>
  );
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-5", className)}>
      {children}
    </div>
  );
}

export function Page({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cx(
        "mx-auto w-full max-w-6xl flex-1 px-5 py-16 sm:py-24",
        className,
      )}
    >
      {children}
    </main>
  );
}

export function Kicker({
  children,
  className,
  tone = "copper",
}: {
  children: ReactNode;
  className?: string;
  tone?: "copper" | "muted";
}) {
  return (
    <p
      className={cx(
        "font-mono text-[12px] tracking-[0.22em] uppercase",
        tone === "muted" ? "text-muted" : "text-copper",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function PageHero({
  kicker,
  title,
  lede,
  large = false,
  children,
}: {
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  large?: boolean;
  children?: ReactNode;
}) {
  return (
    <header>
      <Kicker>{kicker}</Kicker>
      <h1
        className={cx(
          "mt-4",
          typeof title === "string" &&
            "max-w-3xl font-medium tracking-tight",
          typeof title === "string" &&
            (large
              ? "text-4xl leading-[1.08] sm:text-6xl"
              : "text-4xl leading-[1.12] sm:text-5xl"),
        )}
      >
        {title}
      </h1>
      {lede ? (
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{lede}</p>
      ) : null}
      {children ? (
        <div className="mt-8 flex flex-wrap gap-3">{children}</div>
      ) : null}
    </header>
  );
}

export function Section({
  kicker,
  title,
  children,
  className,
  id,
}: {
  kicker?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cx("mt-16", className)}>
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      {title ? (
        <h2 className={cx("text-2xl tracking-tight", kicker ? "mt-3" : "")}>
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("border border-line bg-inset p-6 sm:p-8", className)}>
      {children}
    </div>
  );
}

export function StatRow({
  items,
  className,
}: {
  items: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <dl
      className={cx(
        "grid grid-cols-2 border-y border-line sm:grid-cols-4",
        className,
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.label}
          className={cx(
            "py-6",
            index % 2 === 1 ? "border-l border-line pl-5" : "pr-5 sm:pr-0",
            "sm:border-l sm:border-line sm:px-5 sm:first:border-l-0 sm:first:pl-0",
          )}
        >
          <dd className="font-mono text-copper">{item.value}</dd>
          <dt className="mt-1 text-sm text-muted">{item.label}</dt>
        </div>
      ))}
    </dl>
  );
}

export function FactGrid({
  items,
  className,
}: {
  items: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <dl className={cx("grid gap-px bg-line sm:grid-cols-3", className ?? "mt-16")}>
      {items.map((item) => (
        <div key={item.label} className="bg-background px-6 py-8">
          <dt className="font-mono text-[11px] tracking-widest text-copper uppercase">
            {item.label}
          </dt>
          <dd className="mt-3 text-sm leading-6">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function LinkList({
  items,
  className,
}: {
  items: { href?: string; title: string; body: string; note?: string }[];
  className?: string;
}) {
  return (
    <ul className={cx("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => {
        const row = (
          <>
            <span className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
              <span
                className={cx(
                  "font-medium",
                  item.href ? "group-hover:text-copper" : "text-foreground/80",
                )}
              >
                {item.title}
              </span>
              {item.note ? (
                <span className="font-mono text-[11px] tracking-widest text-muted uppercase">
                  {item.note}
                </span>
              ) : null}
            </span>
            <span className="max-w-xl text-sm leading-6 text-muted">
              {item.body}
            </span>
          </>
        );

        return (
          <li key={item.title}>
            {item.href ? (
              <Link
                href={item.href}
                className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between"
              >
                {row}
              </Link>
            ) : (
              <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                {row}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function CardGrid({
  items,
  columns = 2,
}: {
  items: { href: string; title: string; body: string }[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cx(
        "mt-8 grid gap-px bg-line",
        columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
      )}
    >
      {items.map((item) => (
        <Link
          key={`${item.href}-${item.title}`}
          href={item.href}
          className="bg-background p-7 hover:bg-inset"
        >
          <h3 className="font-medium">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
        </Link>
      ))}
    </div>
  );
}

export function SpecList({
  rows,
}: {
  rows: { label: string; value: string }[];
}) {
  return (
    <dl className="mt-8 divide-y divide-line border-y border-line">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
        >
          <dt className="font-mono text-[12px] tracking-widest text-muted uppercase">
            {row.label}
          </dt>
          <dd className="text-sm">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ChipList({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="border border-line px-4 py-3 text-sm text-foreground/90"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const classNames = cx("text-copper hover:underline", className);
  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={classNames}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}
