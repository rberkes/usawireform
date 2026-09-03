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
  count?: number;
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
      {typeof count === "number" ? (
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
      ) : null}
    </Link>
  );
}

export function AdminInboxNav({
  current,
  quoteCount,
  directoryCount,
  sourceCount = 0,
  subscriberCount = 0,
  accountCount = 0,
  visitorCount,
}: {
  current: "quotes" | "directory" | "source" | "subscribers" | "accounts" | "live" | "visitors" | "architecture" | "preview";
  quoteCount: number;
  directoryCount: number;
  sourceCount?: number;
  subscriberCount?: number;
  accountCount?: number;
  visitorCount?: number;
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
        <InboxTab
          href="/admin/source"
          active={current === "source"}
          count={sourceCount}
          waiting={current !== "source" && sourceCount > 0}
        >
          Source
        </InboxTab>
        <InboxTab
          href="/admin/subscribers"
          active={current === "subscribers"}
          count={subscriberCount}
          waiting={current !== "subscribers" && subscriberCount > 0}
        >
          Subscribers
        </InboxTab>
        <InboxTab
          href="/admin/accounts"
          active={current === "accounts"}
          count={accountCount}
          waiting={false}
        >
          Accounts
        </InboxTab>
        <InboxTab
          href="/admin/preview"
          active={current === "preview"}
          waiting={false}
        >
          Role views
        </InboxTab>
        <InboxTab
          href="/admin/visitors"
          active={current === "visitors"}
          count={visitorCount}
          waiting={false}
        >
          Visitors
        </InboxTab>
        <InboxTab
          href="/admin/live"
          active={current === "live"}
          waiting={false}
        >
          Live pages
        </InboxTab>
        <InboxTab
          href="/admin/architecture"
          active={current === "architecture"}
          waiting={false}
        >
          Architecture
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
