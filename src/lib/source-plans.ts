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

const PLAN_ALIASES: Record<string, SourcePlanId> = {
  fifteen: "ten",
  source_shop_10: "ten",
  source_shop_15: "ten",
  source_shop_20: "twenty",
};

export const SOURCE_PLANS: SourcePlan[] = [
  {
    id: "free",
    name: "One cell",
    cells: 1,
    priceCents: 0,
    lookupKey: null,
    blurb: "File one cell. No card.",
  },
  {
    id: "four",
    name: "Four cells",
    cells: 4,
    priceCents: 3000,
    lookupKey: "source_cells_4",
    blurb: "One free, three more.",
  },
  {
    id: "ten",
    name: "Ten cells",
    cells: 10,
    priceCents: 4900,
    lookupKey: "source_cells_10",
    blurb: "A small cell list.",
  },
  {
    id: "twenty",
    name: "Twenty cells",
    cells: 20,
    priceCents: 9900,
    lookupKey: "source_cells_20",
    blurb: "A full line.",
  },
];

export const SOURCE_PAID_PLANS = SOURCE_PLANS.filter((plan) => plan.priceCents > 0);

export const SOURCE_PLAN_LINE =
  "One cell free. How the plant operates is free. $30/mo for 4. $49/mo for 10. $99/mo for 20. Up to 3 secondaries $19/mo. Six maximum $49/mo.";

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

export function sourceAccountHref(email?: string) {
  const params = new URLSearchParams({
    redirect_url: "/source/dashboard",
  });
  if (email) params.set("email_address", email);
  return `/sign-up?${params.toString()}`;
}

export function sourceSignInHref() {
  return "/sign-in?redirect_url=/source/dashboard";
}
