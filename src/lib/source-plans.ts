export const SOURCE_PLAN_IDS = ["free", "ten", "fifteen", "twenty"] as const;

export type SourcePlanId = (typeof SOURCE_PLAN_IDS)[number];

export type SourcePlan = {
  id: SourcePlanId;
  name: string;
  cells: number;
  priceCents: number;
  lookupKey: string | null;
  blurb: string;
};

export const SOURCE_PLANS: SourcePlan[] = [
  {
    id: "free",
    name: "Three cells",
    cells: 3,
    priceCents: 0,
    lookupKey: null,
    blurb: "File the floor. No card.",
  },
  {
    id: "ten",
    name: "Ten cells",
    cells: 10,
    priceCents: 3900,
    lookupKey: "source_shop_10",
    blurb: "A small cell list.",
  },
  {
    id: "fifteen",
    name: "Fifteen cells",
    cells: 15,
    priceCents: 5900,
    lookupKey: "source_shop_15",
    blurb: "Most floors.",
  },
  {
    id: "twenty",
    name: "Twenty cells",
    cells: 20,
    priceCents: 9900,
    lookupKey: "source_shop_20",
    blurb: "A full line.",
  },
];

export const SOURCE_PAID_PLANS = SOURCE_PLANS.filter((plan) => plan.priceCents > 0);

export function isSourcePlanId(value: string | undefined | null): value is SourcePlanId {
  return SOURCE_PLAN_IDS.includes(value as SourcePlanId);
}

export function planById(id: string | undefined | null): SourcePlan {
  if (isSourcePlanId(id)) {
    return SOURCE_PLANS.find((plan) => plan.id === id) ?? SOURCE_PLANS[0];
  }
  return SOURCE_PLANS[0];
}

export function planByLookupKey(key: string | null | undefined): SourcePlan {
  if (!key) return SOURCE_PLANS[0];
  return SOURCE_PLANS.find((plan) => plan.lookupKey === key) ?? SOURCE_PLANS[0];
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
