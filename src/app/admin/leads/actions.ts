"use server";

import { redirect } from "next/navigation";
import { trySetAdminCookie, clearAdminCookie } from "@/lib/admin-auth";

export type LoginState = { error?: string };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const ok = await trySetAdminCookie(password);
  if (!ok) return { error: "Incorrect password." };
  redirect("/admin/leads");
}

export async function logoutAction(): Promise<void> {
  await clearAdminCookie();
  redirect("/admin/leads");
}
