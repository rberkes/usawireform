"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "wf_leads_admin";

function safeNext(value: string) {
  if (value.startsWith("/admin") && !value.startsWith("//")) return value;
  return "/admin";
}

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "").trim();
  const expected = (process.env.ADMIN_LEADS_PASSWORD ?? "").trim();
  const next = safeNext(String(formData.get("next") ?? "/admin"));
  if (!expected || password !== expected) {
    redirect(`${next}?error=1`);
  }
  const jar = await cookies();
  jar.set(COOKIE, "ok", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect(next);
}

export async function isAdmin() {
  const jar = await cookies();
  return jar.get(COOKIE)?.value === "ok";
}
