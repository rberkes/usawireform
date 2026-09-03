"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  applyCheckoutSession,
  checkoutUrls,
  ensureBillingPortal,
  ensureBuyerExtraShopPriceId,
  ensureLeadPriceId,
  ensurePaidPriceId,
  ensureSecondaryPackPriceId,
  getLiveSourceSubscription,
  getSourceSecondaryQtyForUser,
  getStripeCustomerId,
  setSubscriptionSecondaryPack,
} from "@/lib/source-billing";
import { extraQuoteSlotsRemaining, isSourcePlanId, planById, sourceBuyerSignInHref } from "@/lib/source-plans";
import { buyerOwnsJob, jobIsReleased, leadIsClosed, shopBoughtLead, shopMayBuyLead, shopWasMailedJob } from "@/lib/source-access";
import { parseRebidReason } from "@/lib/source-rebid";
import {
  getSourceJob,
  getSourceProfile,
  recordSourceLeadQuoteOutcome,
  setSourceProfileSecondaries,
} from "@/lib/source";
import { parseQuoteOutcome } from "@/lib/source-types";
import { requireBuyer } from "@/lib/source-gate";
import {
  SOURCE_SECONDARY_MAX,
  formatSecondaryPrice,
  isSourceSecondaryPrice,
  packForCount,
  parseSourceSecondaries,
} from "@/lib/source-secondaries";
import { getStripe, stripeConfigured } from "@/lib/stripe";

async function requireUser() {
  const { userId, isAuthenticated } = await auth();
  if (!isAuthenticated || !userId) {
    redirect("/sign-in?redirect_url=/source/dashboard");
  }
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) {
    throw new Error("Sign in with an email.");
  }
  return { userId, email, user };
}

export async function startSourceLeadCheckout(formData: FormData) {
  const pathname = String(formData.get("pathname") ?? "").trim();
  const { userId, email } = await requireUser();
  if (!pathname) redirect("/source/dashboard");
  if (!stripeConfigured()) redirect("/source/dashboard?lead=stripe");

  const job = await getSourceJob(pathname);
  if (!job) redirect("/source/dashboard");
  const offered = shopWasMailedJob(job, { userId, email });
  if (!offered) redirect("/source/dashboard");
  if (shopBoughtLead(job, { userId, email })) {
    redirect("/source/dashboard");
  }
  if (!shopMayBuyLead(job, { userId, email })) {
    redirect(
      leadIsClosed(job) ? "/source/dashboard?lead=closed" : "/source/dashboard?lead=wait",
    );
  }

  const stripe = getStripe();
  const priceId = await ensureLeadPriceId();
  const urls = checkoutUrls();
  const customerId = await getStripeCustomerId(userId);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    client_reference_id: userId,
    ...(customerId
      ? { customer: customerId }
      : { customer_email: email, customer_creation: "always" }),
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: urls.success,
    cancel_url: urls.cancelDashboard,
    allow_promotion_codes: true,
    metadata: {
      userId,
      source_lead: "1",
      job_pathname: pathname,
    },
  });
  if (!session.url) redirect("/source/dashboard");
  redirect(session.url);
}

/**
 * The shop that unlocked a lead reports what came of it. This is the only
 * signal that separates a working lead from a $49 the shop should get back.
 */
export async function reportSourceLeadOutcome(formData: FormData) {
  const pathname = String(formData.get("pathname") ?? "").trim();
  const outcome = parseQuoteOutcome(formData.get("outcome"));
  const { userId, email } = await requireUser();
  if (!pathname || !outcome) redirect("/source/dashboard");

  const result = await recordSourceLeadQuoteOutcome({
    pathname,
    userId,
    email,
    outcome,
  });
  if (!result.ok) redirect("/source/dashboard");
  revalidatePath("/source/dashboard");
  redirect("/source/dashboard?lead=logged");
}

export async function startSourceBuyerExtraCheckout(formData: FormData) {
  const pathname = String(formData.get("pathname") ?? "").trim();
  const qtyRaw = Number(formData.get("qty") ?? 0);
  const { userId } = await auth();
  if (!userId) redirect(sourceBuyerSignInHref());
  await requireBuyer(userId);
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) redirect("/buyer/dashboard");
  if (!pathname) redirect("/buyer/dashboard");
  if (!stripeConfigured()) redirect("/buyer/dashboard?extra=stripe");

  const job = await getSourceJob(pathname);
  if (!job || !buyerOwnsJob(job, { userId, email })) {
    redirect("/buyer/dashboard");
  }
  if (!jobIsReleased(job)) redirect("/buyer/dashboard");

  if (leadIsClosed(job)) redirect("/buyer/dashboard");

  const remaining = extraQuoteSlotsRemaining({
    mailed: job.mailedTo?.length ?? 0,
    purchased: job.purchasedBy?.length ?? 0,
    extraShops: job.buyerExtraShops,
    closed: Boolean(job.closedAt),
  });
  const qty = Math.min(remaining, Math.max(1, Math.floor(qtyRaw || 1)));
  if (qty < 1) redirect("/buyer/dashboard");
  const reason = parseRebidReason(String(formData.get("reason") ?? ""));

  const stripe = getStripe();
  const priceId = await ensureBuyerExtraShopPriceId();
  const urls = checkoutUrls();
  const customerId = await getStripeCustomerId(userId);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    client_reference_id: userId,
    ...(customerId
      ? { customer: customerId }
      : { customer_email: email, customer_creation: "always" }),
    line_items: [{ price: priceId, quantity: qty }],
    success_url: urls.buyerSuccess,
    cancel_url: urls.buyerCancel,
    allow_promotion_codes: true,
    metadata: {
      userId,
      source_buyer_extra: "1",
      job_pathname: pathname,
      extra_qty: String(qty),
      rebid_reason: reason,
    },
  });
  if (!session.url) redirect("/buyer/dashboard");
  redirect(session.url);
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
        return !isSourceSecondaryPrice({
          lookup_key: price.lookup_key,
          metadata: price.metadata,
        });
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
  if (ids.length > SOURCE_SECONDARY_MAX) {
    return {
      success: false,
      message: `Six secondaries maximum. Uncheck down to ${SOURCE_SECONDARY_MAX}.`,
    };
  }
  const pack = packForCount(ids.length);

  if (!stripeConfigured()) {
    await setSourceProfileSecondaries(userId, ids);
    return {
      success: true,
      message:
        ids.length === 0
          ? "Secondaries cleared."
          : `Listed ${ids.length} ${ids.length === 1 ? "secondary" : "secondaries"}. ${formatSecondaryPrice(ids.length)}.`,
    };
  }

  const billed = await getSourceSecondaryQtyForUser(userId);
  const customerId = await getStripeCustomerId(userId);
  const needed = pack?.slots ?? 0;
  const alreadyOnPack = Boolean(pack) && billed === needed;

  if (ids.length === 0 || alreadyOnPack) {
    if (customerId && billed !== needed) {
      await setSubscriptionSecondaryPack({ customerId, pack });
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
    const result = await setSubscriptionSecondaryPack({
      customerId,
      pack,
    });
    if (result.ok && !result.needsCheckout) {
      await setSourceProfileSecondaries(userId, ids);
      return {
        success: true,
        message: `Listed ${ids.length} secondaries. ${formatSecondaryPrice(ids.length)}.`,
      };
    }
  }

  if (!pack) {
    await setSourceProfileSecondaries(userId, ids);
    return { success: true, message: "Secondaries cleared." };
  }

  const stripe = getStripe();
  const priceId = await ensureSecondaryPackPriceId(pack);
  const urls = checkoutUrls();
  const joined = ids.join(",");
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    client_reference_id: userId,
    ...(customerId ? { customer: customerId } : { customer_email: email }),
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: urls.success,
    cancel_url: urls.cancelDashboard,
    allow_promotion_codes: true,
    metadata: {
      userId,
      source_secondaries: joined,
      source_secondary_pack: pack.id,
    },
    subscription_data: {
      metadata: {
        userId,
        source_secondaries: joined,
        source_secondary_pack: pack.id,
      },
    },
  });
  if (!session.url) {
    return { success: false, message: "Could not start checkout." };
  }
  redirect(session.url);
}
