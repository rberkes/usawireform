/** Short buyer reason when they open another quote. No essay. Not sent to the shops that already quoted. */
export const SOURCE_REBID_REASONS = [
  {
    id: "better_price",
    buyer: "Need a better price",
    shop: "The buyer wants another quote — looking for a better price.",
  },
  {
    id: "faster_lead",
    buyer: "Need a shorter lead time",
    shop: "The buyer wants another quote — looking for a shorter lead time.",
  },
  {
    id: "different_process",
    buyer: "Need a different process or finish",
    shop: "The buyer wants another quote — looking for a different process or finish.",
  },
  {
    id: "more_capacity",
    buyer: "Need more capacity",
    shop: "The buyer wants another quote — looking for more capacity.",
  },
  {
    id: "other",
    buyer: "Want another quote",
    shop: "The buyer wants another quote.",
  },
] as const;

export type SourceRebidReason = (typeof SOURCE_REBID_REASONS)[number]["id"];

export function parseRebidReason(value?: string | null): SourceRebidReason {
  const hit = SOURCE_REBID_REASONS.find((row) => row.id === value);
  return hit?.id ?? "other";
}

export function rebidReasonShopLine(value?: string | null) {
  const id = parseRebidReason(value);
  return SOURCE_REBID_REASONS.find((row) => row.id === id)?.shop ?? SOURCE_REBID_REASONS[4].shop;
}

export function rebidReasonBuyerLabel(value?: string | null) {
  const id = parseRebidReason(value);
  return SOURCE_REBID_REASONS.find((row) => row.id === id)?.buyer ?? SOURCE_REBID_REASONS[4].buyer;
}
