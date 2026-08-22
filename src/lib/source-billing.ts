import "server-only";

import { clerkClient } from "@clerk/nextjs/server";
import type Stripe from "stripe";
import { SOURCE_PAID_PLANS, planById, planByLookupKey, type SourcePlan, type SourcePlanId } from "@/lib/source-plans";
import { appOrigin, getStripe, stripeConfigured } from "@/lib/stripe";

const PRICE_CACHE = new Map<string, string>();

function subscriptionIsLive(status: Stripe.Subscription.Status) {
  return status === "active" || status === "trialing" || status === "past_due";
}

export function planFromSubscription(subscription: Stripe.Subscription): SourcePlan {
  if (!subscriptionIsLive(subscription.status)) {
    return planById("free");
  }
  const item = subscription.items.data[0];
  const lookup = item?.price?.lookup_key;
  const meta =
    item?.price?.metadata?.source_plan ||
    subscription.metadata?.source_plan;
  return planByLookupKey(lookup) !== planById("free")
    ? planByLookupKey(lookup)
    : planById(meta);
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
  await syncSubscriptionToClerk({ userId, subscription, customerId });
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
      const stripe = getStripe();
      const subscriptions = await stripe.subscriptions.list({
        customer: privateMeta.stripeCustomerId,
        status: "all",
        limit: 10,
        expand: ["data.items.data.price"],
      });
      const live = subscriptions.data.find((row) =>
        subscriptionIsLive(row.status),
      );
      if (live) return planFromSubscription(live);
      return planById("free");
    } catch (error) {
      console.error("[Source billing] plan lookup", error);
    }
  }

  return planById(publicMeta.sourcePlan);
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
