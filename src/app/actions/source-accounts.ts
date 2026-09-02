"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { blobErrorMessage, blobReady } from "@/lib/blob";
import { getBuyerAccount, saveBuyerAccount } from "@/lib/source-buyer";
import { safeSourceNext } from "@/lib/source-gate";
import { SOURCE_NDA_VERSION } from "@/lib/source-nda";
import { setSourceRole } from "@/lib/source-role";
import {
  attachJobsToBuyer,
  getSourceProfile,
  saveSourceProfile,
  uniqueSourceSlug,
} from "@/lib/source";

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
  redirect(safeSourceNext(next) || "/source/dashboard");
}

export async function saveSourceBuyerAccount(
  _prev: SourceAccountState,
  formData: FormData,
): Promise<SourceAccountState> {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/buyer/dashboard");
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
  try {
    await saveBuyerAccount({
      userId,
      company,
      name,
      email,
      phone,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    });
    await attachJobsToBuyer(userId, email);
  } catch (error) {
    console.error("[Source buyer]", error);
    return {
      success: false,
      message: `Could not store the buyer (${blobErrorMessage(error)}).`,
    };
  }
  return { success: true, message: "Buyer account saved." };
}
