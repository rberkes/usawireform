"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  applyCheckoutSession,
  checkoutUrls,
  ensureBillingPortal,
  ensurePaidPriceId,
  ensureSecondaryPriceId,
  getLiveSourceSubscription,
  getSourceSecondaryQtyForUser,
  getStripeCustomerId,
  setSubscriptionSecondaryQuantity,
} from "@/lib/source-billing";
import { isSourcePlanId, planById } from "@/lib/source-plans";
import {
  formatSecondaryPrice,
  parseSourceSecondaries,
} from "@/lib/source-secondaries";
import { getSourceProfile, setSourceProfileSecondaries } from "@/lib/source";
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

  if (customerId) {
    const live = await getLiveSourceSubscription(customerId);
    if (live) {
      const cell = live.items.data.find((item) => {
        const price = item.price;
        if (!price || typeof price === "string") return true;
        return (
          price.lookup_key !== "source_secondary" &&
          price.metadata?.source_addon !== "secondary"
        );
      });
      const metadata = {
        ...live.metadata,
        userId,
        source_plan: plan.id,
      };
      if (cell) {
        await stripe.subscriptions.update(live.id, {
          items: [{ id: cell.id, price: priceId }],
          proration_behavior: "create_prorations",
          metadata,
        });
      } else {
        await stripe.subscriptions.update(live.id, {
          items: [{ price: priceId, quantity: 1 }],
          proration_behavior: "create_prorations",
          metadata,
        });
      }
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

export async function saveSourceSecondaries(
  _prev: { success: boolean; message: string },
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  const { userId, email } = await requireUser();
  const ids = parseSourceSecondaries(formData.getAll("secondary"));
  const profile = await getSourceProfile(userId);
  if (!profile?.company) {
    return { success: false, message: "Save the shop first." };
  }

  if (!stripeConfigured()) {
    await setSourceProfileSecondaries(userId, ids);
    return {
      success: true,
      message:
        ids.length === 0
          ? "Secondaries cleared."
          : `Listed ${ids.length} ${ids.length === 1 ? "secondary" : "secondaries"}.`,
    };
  }

  const billed = await getSourceSecondaryQtyForUser(userId);
  const customerId = await getStripeCustomerId(userId);

  if (ids.length <= billed) {
    if (customerId && ids.length !== billed) {
      await setSubscriptionSecondaryQuantity({
        customerId,
        quantity: ids.length,
      });
    }
    await setSourceProfileSecondaries(userId, ids);
    return {
      success: true,
      message:
        ids.length === 0
          ? "Secondaries cleared."
          : `Listed ${ids.length} ${ids.length === 1 ? "secondary" : "secondaries"}. ${formatSecondaryPrice(ids.length)}.`,
    };
  }

  if (customerId) {
    const result = await setSubscriptionSecondaryQuantity({
      customerId,
      quantity: ids.length,
    });
    if (result.ok && !result.needsCheckout) {
      await setSourceProfileSecondaries(userId, ids);
      return {
        success: true,
        message: `Listed ${ids.length} secondaries. ${formatSecondaryPrice(ids.length)}.`,
      };
    }
  }

  const stripe = getStripe();
  const priceId = await ensureSecondaryPriceId();
  const urls = checkoutUrls();
  const joined = ids.join(",");
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    client_reference_id: userId,
    ...(customerId ? { customer: customerId } : { customer_email: email }),
    line_items: [{ price: priceId, quantity: ids.length }],
    success_url: urls.success,
    cancel_url: urls.cancelDashboard,
    allow_promotion_codes: true,
    metadata: { userId, source_secondaries: joined },
    subscription_data: {
      metadata: { userId, source_secondaries: joined },
    },
  });
  if (!session.url) {
    return { success: false, message: "Could not start checkout." };
  }
  redirect(session.url);
}
