"use server";

import { isAdmin } from "@/app/admin/actions";
import { setSourceLeadsComp } from "@/lib/source-leads";
import { revalidatePath } from "next/cache";

export async function setSubscriberLeads(formData: FormData) {
  if (!(await isAdmin())) return;
  const userId = String(formData.get("userId") ?? "").trim();
  const on = String(formData.get("on") ?? "") === "1";
  if (!userId) return;
  await setSourceLeadsComp(userId, on);
  revalidatePath("/admin/subscribers");
}
