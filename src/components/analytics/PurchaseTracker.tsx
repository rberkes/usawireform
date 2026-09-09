"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { track } from "@/lib/analytics";
import {
  PURCHASE_KIND_LABEL,
  type PurchaseReport,
} from "@/lib/analytics-events";

const SEEN_PREFIX = "ga_purchase:";

/**
 * Records a completed checkout once, then cleans the URL so a refresh or a
 * shared link cannot count the same sale twice.
 */
export function PurchaseTracker({ report }: { report: PurchaseReport }) {
  const router = useRouter();
  const pathname = usePathname();
  const { transactionId, kind, value, quantity } = report;

  useEffect(() => {
    if (!transactionId) return;
    const key = `${SEEN_PREFIX}${transactionId}`;

    let alreadyCounted = false;
    try {
      alreadyCounted = window.localStorage.getItem(key) === "1";
    } catch {
      /* private mode: accept the small double-count risk */
    }

    if (!alreadyCounted) {
      track("purchase", {
        transaction_id: transactionId,
        currency: "USD",
        value,
        items: [
          {
            item_id: kind,
            item_name: PURCHASE_KIND_LABEL[kind],
            price: quantity > 0 ? value / quantity : value,
            quantity,
          },
        ],
      });
      try {
        window.localStorage.setItem(key, "1");
      } catch {
        /* nothing to do */
      }
    }

    router.replace(pathname);
  }, [transactionId, kind, value, quantity, router, pathname]);

  return null;
}
