"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  applyCheckoutSession,
  checkoutUrls,
  ensureBillingPortal,
  ensurePaidPriceId,
  getSourcePlanForUser,
  getStripeCustomerId,
} from "@/lib/source-billing";
import { isSourcePlanId, planById } from "@/lib/source-plans";
import { getStripe, stripeConfigured } from "@/lib/stripe";

async function requireUser() {
  const { userId, isAuthenticated } = await auth();
  if (!isAuthenticated || !userId) {
    redirect("/sign-in?redirect_url=/source/upgrade");
  }
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) {
    throw new Error("Sign in with an email.");
  }
  return { userId, email, user };
}

export async function startSourceCheckout(formData: FormData) {
  const planId = String(formData.get("planId") ?? "");
  const { userId, email } = await requireUser();
  if (!isSourcePlanId(planId) || planId === "free") {
    redirect("/source/upgrade");
  }
  if (!stripeConfigured()) {
    redirect("/source/upgrade");
  }

  const plan = planById(planId);
  const stripe = getStripe();
  const priceId = await ensurePaidPriceId(plan);
  const urls = checkoutUrls();
  const customerId = await getStripeCustomerId(userId);
  const current = await getSourcePlanForUser(userId);

  if (customerId && current.id !== "free") {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });
    const live = subscriptions.data[0];
    const item = live?.items.data[0];
    if (live && item) {
      await stripe.subscriptions.update(live.id, {
        items: [{ id: item.id, price: priceId }],
        proration_behavior: "create_prorations",
        metadata: { userId, source_plan: plan.id },
      });
      redirect("/source/dashboard");
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    client_reference_id: userId,
    ...(customerId ? { customer: customerId } : { customer_email: email }),
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: urls.success,
    cancel_url: urls.cancel,
    allow_promotion_codes: true,
    metadata: { userId, source_plan: plan.id },
    subscription_data: {
      metadata: { userId, source_plan: plan.id },
    },
  });

  if (!session.url) {
    redirect("/source/upgrade");
  }
  redirect(session.url);
}

export async function openSourceBillingPortal() {
  const { userId } = await requireUser();
  if (!stripeConfigured()) {
    redirect("/source/upgrade");
  }
  const customerId = await getStripeCustomerId(userId);
  if (!customerId) {
    redirect("/source/upgrade");
  }
  await ensureBillingPortal();
  const session = await getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: checkoutUrls().portalReturn,
  });
  redirect(session.url);
}

export async function syncCheckoutSession(sessionId: string) {
  const { userId } = await requireUser();
  if (!sessionId || !stripeConfigured()) return;
  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  if (
    session.client_reference_id &&
    session.client_reference_id !== userId
  ) {
    return;
  }
  await applyCheckoutSession(session);
}
