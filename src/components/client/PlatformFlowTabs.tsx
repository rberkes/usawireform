import Link from "next/link";
import { PlatformFlow } from "@/components/client/PlatformFlow";
import {
  HOME_BUYER_STEPS,
  HOME_QUOTE_NOTE,
  HOME_SUPPLIER_STEPS,
} from "@/lib/client-landing";
import {
  SOURCE_EQUIPMENT_HREF,
  SOURCE_JOB_HREF,
} from "@/components/client/ClientQuoteCtas";
import { cx } from "@/lib/cx";

const TABS = [
  { id: "buyers", label: "Buyers", steps: HOME_BUYER_STEPS },
  { id: "suppliers", label: "Suppliers", steps: HOME_SUPPLIER_STEPS },
] as const;

export type HomeAudienceTab = (typeof TABS)[number]["id"];

export function PlatformFlowTabs({
  tab = "buyers",
  className,
}: {
  tab?: HomeAudienceTab;
  className?: string;
}) {
  const current = TABS.find((item) => item.id === tab) ?? TABS[0];

  return (
    <>
      <div
        className={cx(
          "mt-10 overflow-hidden rounded-sm border border-white/15",
          className,
        )}
      >
        <div
          role="tablist"
          aria-label="Buyers or suppliers"
          className="grid grid-cols-2 border-b border-white/15"
        >
          {TABS.map((item) => {
            const selected = item.id === tab;
            return (
              <form
                key={item.id}
                action="/"
                method="get"
                className={item.id === "suppliers" ? "border-l border-white/15" : undefined}
              >
                {item.id === "suppliers" ? (
                  <input type="hidden" name="tab" value="suppliers" />
                ) : null}
                <button
                  type="submit"
                  role="tab"
                  id={`home-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="home-tab-panel"
                  className={cx(
                    "w-full px-5 py-3 text-center font-mono text-[11px] tracking-[0.22em] uppercase transition-colors",
                    selected
                      ? "bg-white text-[#0b1f33]"
                      : "text-white/55 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {item.label}
                </button>
              </form>
            );
          })}
        </div>
        <div className="border-b border-white/15 px-5 py-5 sm:px-6">
          {tab === "buyers" ? (
            <Link
              href={SOURCE_JOB_HREF}
              className="inline-flex w-full max-w-md items-center justify-center rounded-sm bg-zoom px-7 py-3.5 text-center text-base font-medium text-white transition-colors hover:bg-white hover:text-[#0b1f33]"
            >
              Get a Quote
            </Link>
          ) : (
            <div className="flex max-w-md flex-col gap-3">
              <Link
                href={SOURCE_EQUIPMENT_HREF}
                className="inline-flex w-full items-center justify-center rounded-sm bg-zoom px-7 py-3.5 text-center text-base font-medium text-white transition-colors hover:bg-white hover:text-[#0b1f33]"
              >
                Add your equipment free
              </Link>
              <Link
                href="/#login"
                className="text-center text-sm text-white/70 hover:text-white hover:underline"
              >
                Already filed? Log in
              </Link>
            </div>
          )}
        </div>
        <div
          role="tabpanel"
          id="home-tab-panel"
          aria-labelledby={`home-tab-${tab}`}
        >
          <PlatformFlow steps={current.steps} framed={false} />
        </div>
      </div>
      <p className="mt-4 max-w-xl text-sm leading-6 text-white/60">
        {tab === "buyers"
          ? HOME_QUOTE_NOTE
          : "File every cell free. Matched leads show in the shop dashboard."}
      </p>
    </>
  );
}
