import "server-only";

import { clerkClient } from "@clerk/nextjs/server";
import type Stripe from "stripe";
import { SOURCE_PAID_PLANS, planById, planByLookupKey, type SourcePlan, type SourcePlanId } from "@/lib/source-plans";
import {
  SOURCE_SECONDARY_LOOKUP,
  isSourceSecondaryPrice,
  packByLookupKey,
  parseSourceSecondaries,
  type SourceSecondaryPack,
} from "@/lib/source-secondaries";
import { getSourceProfile, setSourceProfileSecondaries } from "@/lib/source";
import { appOrigin, getStripe, stripeConfigured } from "@/lib/stripe";

const PRICE_CACHE = new Map<string, string>();

function subscriptionIsLive(status: Stripe.Subscription.Status) {
  return status === "active" || status === "trialing" || status === "past_due";
}

function isSecondaryPrice(price?: Stripe.Price | Stripe.DeletedPrice | string | null) {
  if (!price || typeof price === "string" || !("lookup_key" in price)) return false;
  return isSourceSecondaryPrice({
    lookup_key: price.lookup_key,
    metadata: price.metadata,
  });
}

function secondaryItems(subscription: Stripe.Subscription) {
  return subscription.items.data.filter((item) => isSecondaryPrice(item.price));
}

function cellPlanItem(subscription: Stripe.Subscription) {
  return subscription.items.data.find((item) => !isSecondaryPrice(item.price));
}

export function planFromSubscription(subscription: Stripe.Subscription): SourcePlan {
  if (!subscriptionIsLive(subscription.status)) {
    return planById("free");
  }
  const item = cellPlanItem(subscription);
  const lookup = item?.price && typeof item.price !== "string" ? item.price.lookup_key : undefined;
  const meta =
    (item?.price && typeof item.price !== "string"
      ? item.price.metadata?.source_plan
      : undefined) || subscription.metadata?.source_plan;
  if (lookup && planByLookupKey(lookup).id !== "free") {
    return planByLookupKey(lookup);
  }
  return planById(meta);
}

export function secondaryQtyFromSubscription(subscription: Stripe.Subscription) {
  if (!subscriptionIsLive(subscription.status)) return 0;
  const items = secondaryItems(subscription);
  let cap = 0;
  for (const item of items) {
    const price = item.price;
    if (!price || typeof price === "string") continue;
    const pack = packByLookupKey(price.lookup_key);
    if (pack) {
      cap = Math.max(cap, pack.slots);
      continue;
    }
    if (
      price.lookup_key === SOURCE_SECONDARY_LOOKUP ||
      price.metadata?.source_addon === "secondary"
    ) {
      cap = Math.max(cap, item.quantity ?? 0);
    }
  }
  return cap;
}

export async function ensurePaidPriceId(plan: SourcePlan) {
  if (!plan.lookupKey || plan.priceCents <= 0) {
    throw new Error("That plan is not billed.");
  }
  const cached = PRICE_CACHE.get(plan.lookupKey);
  if (cached) return cached;

  const stripe = getStripe();
  const existing = await stripe.prices.list({
    lookup_keys: [plan.lookupKey],
    active: true,
    limit: 1,
  });
  if (existing.data[0]?.id) {
    PRICE_CACHE.set(plan.lookupKey, existing.data[0].id);
    return existing.data[0].id;
  }

  const product = await stripe.products.create({
    name: `Source — ${plan.cells} cells`,
    description: `Shop dashboard. Up to ${plan.cells} filed CNC cells.`,
    metadata: { source_plan: plan.id },
  });
  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: plan.priceCents,
    recurring: { interval: "month" },
    lookup_key: plan.lookupKey,
    transfer_lookup_key: true,
    metadata: { source_plan: plan.id },
  });
  PRICE_CACHE.set(plan.lookupKey, price.id);
  return price.id;
}

export async function ensureSecondaryPackPriceId(pack: SourceSecondaryPack) {
  const cached = PRICE_CACHE.get(pack.lookupKey);
  if (cached) return cached;

  const stripe = getStripe();
  const existing = await stripe.prices.list({
    lookup_keys: [pack.lookupKey],
    active: true,
    limit: 1,
  });
  if (existing.data[0]?.id) {
    PRICE_CACHE.set(pack.lookupKey, existing.data[0].id);
    return existing.data[0].id;
  }

  const product = await stripe.products.create({
    name: `Source — ${pack.name.toLowerCase()}`,
    description: pack.blurb,
    metadata: { source_addon: "secondary", source_secondary_pack: pack.id },
  });
  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: pack.priceCents,
    recurring: { interval: "month" },
    lookup_key: pack.lookupKey,
    transfer_lookup_key: true,
    metadata: { source_addon: "secondary", source_secondary_pack: pack.id },
  });
  PRICE_CACHE.set(pack.lookupKey, price.id);
  return price.id;
}

async function liveSubscriptionForCustomer(customerId: string) {
  const stripe = getStripe();
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "all",
    limit: 10,
    expand: ["data.items.data.price"],
  });
  return subscriptions.data.find((row) => subscriptionIsLive(row.status)) ?? null;
}

export async function getLiveSourceSubscription(customerId: string) {
  return liveSubscriptionForCustomer(customerId);
}

export async function setSubscriptionSecondaryPack({
  customerId,
  pack,
}: {
  customerId: string;
  pack: SourceSecondaryPack | undefined;
}) {
  const stripe = getStripe();
  const live = await liveSubscriptionForCustomer(customerId);
  if (!live) return { ok: false as const, needsCheckout: true as const };
  const existing = secondaryItems(live);
  const metadata = {
    ...live.metadata,
    source_secondary_pack: pack?.id ?? "",
  };

  if (!pack) {
    if (existing.length === 0) {
      return { ok: true as const, needsCheckout: false as const };
    }
    const cell = cellPlanItem(live);
    if (!cell) {
      await stripe.subscriptions.cancel(live.id);
      return { ok: true as const, needsCheckout: false as const };
    }
    await stripe.subscriptions.update(live.id, {
      items: existing.map((item) => ({ id: item.id, deleted: true })),
      proration_behavior: "create_prorations",
      metadata,
    });
    return { ok: true as const, needsCheckout: false as const };
  }

  const priceId = await ensureSecondaryPackPriceId(pack);
  const [keep, ...drop] = existing;
  const items: Stripe.SubscriptionUpdateParams.Item[] = keep
    ? [
        { id: keep.id, price: priceId, quantity: 1 },
        ...drop.map((item) => ({ id: item.id, deleted: true as const })),
      ]
    : [{ price: priceId, quantity: 1 }];

  await stripe.subscriptions.update(live.id, {
    items,
    proration_behavior: "create_prorations",
    metadata,
  });
  return { ok: true as const, needsCheckout: false as const };
}

async function clampProfileSecondaries({
  userId,
  subscription,
  pending,
}: {
  userId: string;
  subscription: Stripe.Subscription;
  pending?: string[];
}) {
  const qty = secondaryQtyFromSubscription(subscription);
  const profile = await getSourceProfile(userId);
  const current = parseSourceSecondaries(profile?.secondaries);
  const next = parseSourceSecondaries(pending?.length ? pending : current);
  await setSourceProfileSecondaries(userId, next.slice(0, qty));
}

async function writePlanToClerk({
  userId,
  planId,
  customerId,
  subscriptionId,
}: {
  userId: string;
  planId: SourcePlanId;
  customerId?: string;
  subscriptionId?: string;
}) {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { sourcePlan: planId },
    privateMetadata: {
      stripeCustomerId: customerId ?? "",
      stripeSubscriptionId: subscriptionId ?? "",
    },
  });
}

export async function syncSubscriptionToClerk({
  userId,
  subscription,
  customerId,
}: {
  userId: string;
  subscription: Stripe.Subscription;
  customerId: string;
}) {
  const plan = planFromSubscription(subscription);
  await writePlanToClerk({
    userId,
    planId: plan.id,
    customerId,
    subscriptionId: subscriptionIsLive(subscription.status)
      ? subscription.id
      : "",
  });
  return plan;
}

async function clerkUserIdFromCustomer(customerId: string, fallback?: string) {
  if (fallback) return fallback;
  const stripe = getStripe();
  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted) return undefined;
  return customer.metadata?.clerkUserId || undefined;
}

export async function applyStripeSubscription(subscription: Stripe.Subscription) {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;
  const userId = await clerkUserIdFromCustomer(
    customerId,
    subscription.metadata?.userId,
  );
  if (!userId) {
    console.error("[Source billing] subscription has no Clerk user", {
      subscriptionId: subscription.id,
      customerId,
    });
    return;
  }
  const stripe = getStripe();
  let live = subscription;
  try {
    live = await stripe.subscriptions.retrieve(subscription.id, {
      expand: ["items.data.price"],
    });
  } catch {
    /* use the webhook payload */
  }
  await syncSubscriptionToClerk({ userId, subscription: live, customerId });
  await clampProfileSecondaries({
    userId,
    subscription: live,
  });
}

export async function applyCheckoutSession(session: Stripe.Checkout.Session) {
  const userId =
    session.client_reference_id || session.metadata?.userId || undefined;
  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id;
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;
  if (!userId || !customerId) return;

  const stripe = getStripe();
  await stripe.customers.update(customerId, {
    metadata: { clerkUserId: userId },
  });

  if (!subscriptionId) {
    await writePlanToClerk({ userId, planId: "free", customerId });
    return;
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["items.data.price"],
  });
  await syncSubscriptionToClerk({ userId, subscription, customerId });
  await clampProfileSecondaries({
    userId,
    subscription,
    pending: parseSourceSecondaries(
      (
        session.metadata?.source_secondaries ||
        subscription.metadata?.source_secondaries ||
        ""
      ).split(","),
    ),
  });
}

export async function getSourcePlanForUser(userId: string): Promise<SourcePlan> {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const privateMeta = user.privateMetadata as {
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  };
  const publicMeta = user.publicMetadata as { sourcePlan?: string };

  if (stripeConfigured() && privateMeta.stripeCustomerId) {
    try {
      const live = await liveSubscriptionForCustomer(
        privateMeta.stripeCustomerId,
      );
      if (live) return planFromSubscription(live);
      return planById("free");
    } catch (error) {
      console.error("[Source billing] plan lookup", error);
    }
  }

  return planById(publicMeta.sourcePlan);
}

export async function getSourceSecondaryQtyForUser(userId: string) {
  const customerId = await getStripeCustomerId(userId);
  if (!customerId || !stripeConfigured()) return 0;
  try {
    const live = await liveSubscriptionForCustomer(customerId);
    return live ? secondaryQtyFromSubscription(live) : 0;
  } catch (error) {
    console.error("[Source billing] secondary lookup", error);
    return 0;
  }
}

export async function getStripeCustomerId(userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const privateMeta = user.privateMetadata as { stripeCustomerId?: string };
  return privateMeta.stripeCustomerId?.trim() || undefined;
}

export function checkoutUrls() {
  const origin = appOrigin();
  return {
    success: `${origin}/source/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel: `${origin}/source/upgrade`,
    cancelDashboard: `${origin}/source/dashboard`,
    portalReturn: `${origin}/source/dashboard`,
  };
}

export async function ensureBillingPortal() {
  const stripe = getStripe();
  const existing = await stripe.billingPortal.configurations.list({ limit: 1 });
  if (existing.data[0]) return;
  await stripe.billingPortal.configurations.create({
    business_profile: { headline: "Source shop plans" },
    features: {
      customer_update: {
        enabled: true,
        allowed_updates: ["email", "address"],
      },
      invoice_history: { enabled: true },
      payment_method_update: { enabled: true },
      subscription_cancel: { enabled: true, mode: "at_period_end" },
    },
  });
}

export { SOURCE_PAID_PLANS };
