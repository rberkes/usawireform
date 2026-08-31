"use server";

import { redirect } from "next/navigation";
import { isAdmin } from "@/app/admin/actions";
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