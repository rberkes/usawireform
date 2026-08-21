import Link from "next/link";
import { cx } from "@/lib/cx";

function InboxTab({
  href,
  active,
  count,
  waiting,
  children,
}: {
  href: string;
  active: boolean;
  count: number;
  waiting: boolean;
  children: string;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex items-center gap-2 border px-4 py-2 text-sm",
        active
          ? "border-foreground bg-foreground text-background"
          : waiting
            ? "border-copper bg-copper text-white"
            : "border-line text-muted hover:border-copper hover:text-foreground",
      )}
    >
      {children}
      <span
        className={cx(
          "min-w-5 text-center font-mono text-[11px] tracking-widest",
          active
            ? "text-background/70"
            : waiting
              ? "text-white"
              : "text-muted",
        )}
      >
        {count}
      </span>
    </Link>
  );
}

export function AdminInboxNav({
  current,
  quoteCount,
  directoryCount,
}: {
  current: "quotes" | "directory";
  quoteCount: number;
  directoryCount: number;
}) {
  return (
    <div className="mt-8 space-y-4">
      <nav className="flex flex-wrap gap-2" aria-label="Admin inboxes">
        <InboxTab
          href="/admin"
          active={current === "quotes"}
          count={quoteCount}
          waiting={current !== "quotes" && quoteCount > 0}
        >
          Quote files
        </InboxTab>
        <InboxTab
          href="/admin/leads"
          active={current === "directory"}
          count={directoryCount}
          waiting={current !== "directory" && directoryCount > 0}
        >
          Directory
        </InboxTab>
      </nav>
      {current === "directory" && quoteCount > 0 ? (
        <p className="border border-copper bg-copper px-4 py-3 text-sm text-white">
          {quoteCount === 1
            ? "1 quote with a STEP is waiting."
            : `${quoteCount} quotes with STEP files are waiting.`}{" "}
          These are RFQs from Contact and product pages, not directory intros.{" "}
          <Link href="/admin" className="font-medium underline underline-offset-2">
            Open quote files
          </Link>
        </p>
      ) : null}
      {current === "quotes" && directoryCount > 0 ? (
        <p className="border border-copper bg-copper px-4 py-3 text-sm text-white">
          {directoryCount === 1
            ? "1 directory intro is waiting."
            : `${directoryCount} directory intros are waiting.`}{" "}
          Those are company-page forms, not STEP quotes.{" "}
          <Link
            href="/admin/leads"
            className="font-medium underline underline-offset-2"
          >
            Open directory
          </Link>
        </p>
      ) : null}
    </div>
  );
}
