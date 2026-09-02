export const SOURCE_PLAN_IDS = ["free", "four", "ten", "twenty"] as const;

export type SourcePlanId = (typeof SOURCE_PLAN_IDS)[number];

export type SourcePlan = {
  id: SourcePlanId;
  name: string;
  cells: number;
  priceCents: number;
  lookupKey: string | null;
  blurb: string;
};

/** One-time unlock. Up to this many matched shops can buy each job. */
export const SOURCE_LEAD_PRICE_CENTS = 4900;
export const SOURCE_LEAD_LOOKUP = "source_lead_once";
export const SOURCE_LEAD_BUYERS_MAX = 10;
/** Shop-facing name for paid lead unlocks. */
export const SOURCE_SMART_CONNECT = "AI Smart Connect™";
export const SOURCE_SMART_CONNECT_LINE =
  "Unlock Buyer Leads with AI Smart Connect™";
/** Soft form cap so the row UI stays usable. Listing itself is not gated. */
export const SOURCE_CELL_SOFT_CAP = 80;

const PLAN_ALIASES: Record<string, SourcePlanId> = {
  fifteen: "ten",
  source_shop_10: "ten",
  source_shop_15: "ten",
  source_shop_20: "twenty",
};

export const SOURCE_PLANS: SourcePlan[] = [
  {
    id: "free",
    name: "Free listing",
    cells: SOURCE_CELL_SOFT_CAP,
    priceCents: 0,
    lookupKey: null,
    blurb: `List every cell free. Matched jobs show in the dashboard. ${SOURCE_SMART_CONNECT_LINE}.`,
  },
  {
    id: "four",
    name: "Four cells",
    cells: 4,
    priceCents: 3000,
    lookupKey: "source_cells_4",
    blurb: "Legacy cell plan. New shops buy leads at $49 instead.",
  },
  {
    id: "ten",
    name: "Ten cells",
    cells: 10,
    priceCents: 4900,
    lookupKey: "source_cells_10",
    blurb: "Legacy cell plan. New shops buy leads at $49 instead.",
  },
  {
    id: "twenty",
    name: "Twenty cells",
    cells: 20,
    priceCents: 9900,
    lookupKey: "source_cells_20",
    blurb: "Legacy cell plan. New shops buy leads at $49 instead.",
  },
];

export const SOURCE_PAID_PLANS = SOURCE_PLANS.filter((plan) => plan.priceCents > 0);

export const SOURCE_PLAN_LINE =
  `List every cell free. Matched leads show in the shop dashboard. ${SOURCE_SMART_CONNECT_LINE}. Up to 10 shops can buy each job.`;

export const SOURCE_FIT_LINE =
  "Min order, setup, stocked materials, and lead are free on the listing so a buyer can see how the factory operates.";

export function isSourcePlanId(value: string | undefined | null): value is SourcePlanId {
  return SOURCE_PLAN_IDS.includes(value as SourcePlanId);
}

function resolvePlanId(id: string | undefined | null): SourcePlanId | null {
  if (!id) return null;
  if (isSourcePlanId(id)) return id;
  const aliased = PLAN_ALIASES[id];
  return aliased ?? null;
}

export function planById(id: string | undefined | null): SourcePlan {
  const resolved = resolvePlanId(id);
  if (resolved) {
    return SOURCE_PLANS.find((plan) => plan.id === resolved) ?? SOURCE_PLANS[0];
  }
  return SOURCE_PLANS[0];
}

export function planByLookupKey(key: string | null | undefined): SourcePlan {
  if (!key) return SOURCE_PLANS[0];
  const match = SOURCE_PLANS.find((plan) => plan.lookupKey === key);
  if (match) return match;
  return planById(PLAN_ALIASES[key]);
}

export function formatPlanPrice(cents: number) {
  if (cents === 0) return "Free";
  return `$${(cents / 100).toFixed(0)}/mo`;
}

export function formatLeadPrice() {
  return `$${(SOURCE_LEAD_PRICE_CENTS / 100).toFixed(0)}`;
}

export function sourceAccountHref(email?: string) {
  const params = new URLSearchParams({
    as: "supplier",
    redirect_url: "/source/enter",
  });
  if (email) params.set("email_address", email);
  return `/sign-up?${params.toString()}`;
}

export function sourceSignInHref() {
  return "/sign-in?redirect_url=/source/enter";
}

/** Homepage login card. Dedicated /sign-in stays for mail and password reset. */
export function sourceHomeLoginHref() {
  return "/#login";
}

export function sourceBuyerSignUpHref() {
  return "/sign-up?as=buyer&redirect_url=/source/enter";
}
