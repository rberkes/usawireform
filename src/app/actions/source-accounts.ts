"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/app/admin/actions";
import { blobErrorMessage, blobReady } from "@/lib/blob";
import {
  attachJobsToBuyer,
  getSourceJob,
  getSourceProfile,
  saveSourceJob,
  saveSourceProfile,
  uniqueSourceSlug,
} from "@/lib/source";
import { buyerOwnsJob, leadIsClosed, waitlistedMailed } from "@/lib/source-access";
import { sendSourceBuyerSignupEmails, sendSourceNdaEmails, sendSourceBuyerVolumeEmail, sendSourceShopClosedEmails } from "@/lib/leads";
import {
  clerkEmailIsConfirmed,
  getBuyerAccount,
  saveBuyerAccount,
} from "@/lib/source-buyer";
import {
  formatBuyerJobsPerMonth,
  parseBuyerJobsPerMonth,
} from "@/lib/source-buyer-volume";
import { safeSourceNext } from "@/lib/source-gate";
import { SOURCE_NDA_VERSION } from "@/lib/source-nda";
import { setSourceRole } from "@/lib/source-role";

export type SourceAccountState = {
  success: boolean;
  message: string;
};

export async function acceptSourceNda(
  _prev: SourceAccountState,
  formData: FormData,
): Promise<SourceAccountState> {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/source/nda");
  await setSourceRole(userId, "supplier");

  const next = String(formData.get("next") ?? "").trim();
  const agreed = String(formData.get("agree") ?? "");
  const name = String(formData.get("name") ?? "").trim().slice(0, 80);
  const company = String(formData.get("company") ?? "").trim().slice(0, 120);
  if (agreed !== "yes" && agreed !== "on") {
    return { success: false, message: "Check the box to accept the agreement." };
  }
  if (!name) {
    return { success: false, message: "Type your name." };
  }
  if (!(await blobReady())) {
    return { success: false, message: "Could not store the agreement." };
  }

  const existing = await getSourceProfile(userId);
  const now = new Date().toISOString();
  const shopName = company || existing?.company || name;
  try {
    const slug =
      existing?.slug || (await uniqueSourceSlug(shopName, userId));
    await saveSourceProfile({
      userId,
      slug,
      company: shopName,
      name,
      phone: existing?.phone ?? "",
      city: existing?.city ?? "",
      state: existing?.state ?? "",
      website: existing?.website ?? "",
      blurb: existing?.blurb ?? "",
      published: existing?.published !== false,
      claimedDirectory: existing?.claimedDirectory,
      secondaries: existing?.secondaries ?? [],
      listedAt: existing?.listedAt || existing?.updatedAt || now,
      updatedAt: now,
      logoPath: existing?.logoPath,
      photoPath: existing?.photoPath,
      plantStreet: existing?.plantStreet,
      plantProofUrl: existing?.plantProofUrl,
      plantVerifiedAt: existing?.plantVerifiedAt,
      fit: existing?.fit,
      leadsAccess: existing?.leadsAccess,
      ndaAcceptedAt: now,
      ndaVersion: SOURCE_NDA_VERSION,
      ndaName: name,
    });
  } catch (error) {
    console.error("[Source NDA]", error);
    return {
      success: false,
      message: `Could not store the agreement (${blobErrorMessage(error)}).`,
    };
  }
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  if (email) {
    void sendSourceNdaEmails({
      to: email,
      company: shopName,
      name,
    }).catch((error) => console.error("[Source NDA mail]", error));
  }
  redirect(safeSourceNext(next) || "/source/dashboard");
}

export async function saveSourceBuyerAccount(
  _prev: SourceAccountState,
  formData: FormData,
): Promise<SourceAccountState> {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?as=buyer&redirect_url=/buyer/dashboard");
  await setSourceRole(userId, "buyer");

  const user = await currentUser();
  const email =
    String(formData.get("email") ?? "").trim() ||
    user?.primaryEmailAddress?.emailAddress ||
    "";
  const company = String(formData.get("company") ?? "").trim().slice(0, 120);
  const name = String(formData.get("name") ?? "").trim().slice(0, 80);
  const phone = String(formData.get("phone") ?? "").trim().slice(0, 40);
  if (!company) {
    return { success: false, message: "Enter the buying company." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Enter a valid email." };
  }
  if (!(await blobReady())) {
    return { success: false, message: "Could not store the buyer account." };
  }

  const existing = await getBuyerAccount(userId);
  const now = new Date().toISOString();
  const emailConfirmed = clerkEmailIsConfirmed(user);
  try {
    await saveBuyerAccount({
      userId,
      company,
      name,
      email,
      phone,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      verifiedAt: existing?.verifiedAt,
      emailConfirmedAt: emailConfirmed
        ? existing?.emailConfirmedAt || now
        : existing?.emailConfirmedAt,
      jobsPerMonth: existing?.jobsPerMonth,
      jobsPerMonthAt: existing?.jobsPerMonthAt,
    });
    await attachJobsToBuyer(userId, email);
  } catch (error) {
    console.error("[Source buyer]", error);
    return {
      success: false,
      message: `Could not store the buyer (${blobErrorMessage(error)}).`,
    };
  }
  if (!existing) {
    void sendSourceBuyerSignupEmails({ to: email, company, name }).catch(
      (error) => console.error("[Source buyer signup mail]", error),
    );
  }
  return { success: true, message: "Buyer account saved." };
}

export async function saveSourceBuyerVolume(
  _prev: SourceAccountState,
  formData: FormData,
): Promise<SourceAccountState> {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?as=buyer&redirect_url=/buyer/dashboard");
  await setSourceRole(userId, "buyer");

  const user = await currentUser();
  const existing = await getBuyerAccount(userId);
  if (!existing?.company) {
    return { success: false, message: "Save the buyer account first." };
  }

  const jobsPerMonth = parseBuyerJobsPerMonth(formData.get("jobsPerMonth"));
  const prev = parseBuyerJobsPerMonth(existing.jobsPerMonth ?? 0);
  const now = new Date().toISOString();
  try {
    await saveBuyerAccount({
      ...existing,
      jobsPerMonth,
      jobsPerMonthAt: now,
      updatedAt: now,
    });
  } catch (error) {
    console.error("[Source buyer volume]", error);
    return {
      success: false,
      message: `Could not store the volume (${blobErrorMessage(error)}).`,
    };
  }

  if (jobsPerMonth !== prev) {
    const email =
      existing.email || user?.primaryEmailAddress?.emailAddress || "";
    void sendSourceBuyerVolumeEmail({
      to: email,
      company: existing.company,
      name: existing.name,
      jobsPerMonth,
      previous: existing.jobsPerMonth == null ? undefined : prev,
    }).catch((error) => console.error("[Source buyer volume mail]", error));
  }

  return {
    success: true,
    message: `Saved ${formatBuyerJobsPerMonth(jobsPerMonth)}.`,
  };
}

export async function setSourceBuyerVerified(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/accounts");
  const userId = String(formData.get("userId") ?? "").trim();
  const verified = String(formData.get("verified") ?? "") === "1";
  if (!userId) redirect("/admin/accounts#buyers");
  const existing = await getBuyerAccount(userId);
  if (!existing) redirect("/admin/accounts#buyers");
  const now = new Date().toISOString();
  await saveBuyerAccount({
    ...existing,
    verifiedAt: verified ? now : undefined,
    updatedAt: now,
  });
  redirect("/admin/accounts#buyers");
}

export async function closeSourceBuyerJob(formData: FormData) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?as=buyer&redirect_url=/buyer/dashboard");
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const pathname = String(formData.get("pathname") ?? "").trim();
  if (!pathname) redirect("/buyer/dashboard");
  const job = await getSourceJob(pathname);
  if (!job || !buyerOwnsJob(job, { userId, email })) {
    redirect("/buyer/dashboard");
  }
  if (leadIsClosed(job)) redirect("/buyer/dashboard");
  const wait = waitlistedMailed(job);
  const now = new Date().toISOString();
  await saveSourceJob({ ...job, closedAt: now }, job.pathname);
  if (wait.length > 0) {
    await sendSourceShopClosedEmails({
      shops: wait,
      spec: {
        diameterRaw: job.diameterRaw,
        diameterMm: job.diameterMm,
        kind: job.kind,
      },
    });
  }
  redirect("/buyer/dashboard");
}
