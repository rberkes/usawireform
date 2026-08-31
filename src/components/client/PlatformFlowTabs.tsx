"use client";

import { useId, useState } from "react";
import { PlatformFlow } from "@/components/client/PlatformFlow";
import {
  HOME_BUYER_STEPS,
  HOME_SUPPLIER_STEPS,
} from "@/lib/client-landing";
import { cx } from "@/lib/cx";

const TABS = [
  { id: "buyers", label: "Buyers", steps: HOME_BUYER_STEPS },
  { id: "suppliers", label: "Suppliers", steps: HOME_SUPPLIER_STEPS },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function PlatformFlowTabs({ className }: { className?: string }) {
  const [tab, setTab] = useState<TabId>("buyers");
  const baseId = useId();
  const current = TABS.find((item) => item.id === tab) ?? TABS[0];

  return (
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
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              className={cx(
                "px-5 py-3 text-center font-mono text-[11px] tracking-[0.22em] uppercase transition-colors",
                item.id === "suppliers" && "border-l border-white/15",
                selected
                  ? "bg-white text-[#0b1f33]"
                  : "text-white/55 hover:bg-white/5 hover:text-white",
              )}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-${tab}`}
      >
        <PlatformFlow steps={current.steps} framed={false} />
      </div>
    </div>
  );
}
