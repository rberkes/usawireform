"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "wf_leads_admin";

export async function loginLeadsAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_LEADS_PASSWORD ?? "";
  if (!expected || password !== expected) {
    redirect("/admin/leads?error=1");
  }
  const jar = await cookies();
  jar.set(COOKIE, "ok", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin/leads");
}

export async function isLeadsAdmin() {
  const jar = await cookies();
  return jar.get(COOKIE)?.value === "ok";
}
