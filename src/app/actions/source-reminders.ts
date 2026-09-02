"use server";

import { redirect } from "next/navigation";
import { isAdmin } from "@/app/admin/actions";
import { deleteUnusedMockInvites } from "@/lib/purge-test-records";
import { sendDueSourceRegistrationReminders } from "@/lib/source-reminders";

export async function runSourceRegistrationReminders() {
  if (!(await isAdmin())) {
    redirect("/admin/accounts");
  }
  const result = await sendDueSourceRegistrationReminders({ immediate: true });
  const params = new URLSearchParams({
    reminded: String(result.sent),
    held: String(result.held),
    missing: String(result.missingEmail),
    failed: String(result.failed),
  });
  redirect(`/admin/accounts?${params}`);
}

export async function removeIncompleteSourceShop(formData: FormData) {
  if (!(await isAdmin())) {
    redirect("/admin/accounts");
  }
  const email = String(formData.get("email") ?? "").trim();
  const kind = String(formData.get("kind") ?? "").trim();
  if (!email || kind !== "invite") {
    redirect("/admin/accounts");
  }
  await deleteUnusedMockInvites(email);
  redirect("/admin/accounts");
}
