/**
 * Names and shapes for the moments worth measuring. No browser imports live
 * here, so server actions and pages can build and read these without pulling
 * the tag into a server bundle.
 *
 * `purchase` and `generate_lead` are GA4 recommended names, so GA already
 * understands their revenue and funnel semantics. The rest are custom.
 */
export type SourceEvent =
  | "purchase"
  | "generate_lead"
  | "claim_listing"
  | "list_equipment";

/** What a completed Stripe checkout was for. */
export type PurchaseKind =
  | "lead_unlock"
  | "buyer_extra_quote"
  | "cells"
  | "secondaries"
  | "other";

export const PURCHASE_KIND_LABEL: Record<PurchaseKind, string> = {
  lead_unlock: "Shop lead unlock",
  buyer_extra_quote: "Buyer extra quote slot",
  cells: "Source cell plan",
  secondaries: "Secondary operations",
  other: "Source purchase",
};

export function parsePurchaseKind(value: string | undefined): PurchaseKind {
  switch (value) {
    case "lead_unlock":
    case "buyer_extra_quote":
    case "cells":
    case "secondaries":
      return value;
    default:
      return "other";
  }
}

export type PurchaseReport = {
  transactionId: string;
  kind: PurchaseKind;
  /** Dollars, not cents. */
  value: number;
  quantity: number;
};

/**
 * Stripe returns the buyer with a session id, which the dashboard trades for
 * the real outcome and then hands to the browser through these params. The
 * tracker strips them once it has reported the sale.
 */
export function purchaseQuery(report: PurchaseReport) {
  return new URLSearchParams({
    paid: report.transactionId,
    kind: report.kind,
    value: String(report.value),
    qty: String(report.quantity),
  }).toString();
}

export function parsePurchaseQuery(params: {
  paid?: string;
  kind?: string;
  value?: string;
  qty?: string;
}): PurchaseReport | null {
  if (!params.paid) return null;
  return {
    transactionId: params.paid,
    kind: parsePurchaseKind(params.kind),
    value: Number(params.value) || 0,
    quantity: Number(params.qty) || 1,
  };
}
