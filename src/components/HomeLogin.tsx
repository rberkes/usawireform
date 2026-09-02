"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { btn, fieldClass } from "@/components/ui";

export function HomeLogin() {
  const { isSignedIn } = useUser();

  return (
    <aside
      id="login"
      className="scroll-mt-24 rounded-sm border border-white/15 bg-white p-5 text-[#111] sm:p-6"
    >
      <p className="font-mono text-[11px] tracking-[0.22em] text-[#0b1f33]/55 uppercase">
        Log in
      </p>
      <h2 className="mt-2 text-xl font-medium tracking-tight">Source account</h2>
      <p className="mt-2 text-sm leading-6 text-[#111]/70">
        Shops and buyers. Active Wireworks and every other Source shop use this
        same login.
      </p>
      {isSignedIn ? (
        <p className="mt-6">
          <Link href="/source/enter" className={btn.primary}>
            Go to dashboard
          </Link>
        </p>
      ) : (
        <form action="/sign-in" method="get" className="mt-5 space-y-3">
          <input type="hidden" name="redirect_url" value="/source/enter" />
          <label className="block text-sm">
            Email
            <input
              className={`${fieldClass} mt-1.5`}
              type="email"
              name="email_address"
              autoComplete="email"
              required
            />
          </label>
          <button type="submit" className={`${btn.primary} w-full`}>
            Continue
          </button>
        </form>
      )}
      {isSignedIn ? null : (
        <p className="mt-4 text-sm leading-6 text-[#111]/70">
          New shop?{" "}
          <Link href="/sign-up?as=supplier" className="text-[#0b6bcb] hover:underline">
            Shop sign-up
          </Link>
          {" · "}
          <Link href="/sign-in?as=buyer" className="text-[#0b6bcb] hover:underline">
            Buyer log in
          </Link>
          {" · "}
          <Link href="/sign-up?as=buyer" className="text-[#0b6bcb] hover:underline">
            Buyer sign-up
          </Link>
          {" · "}
          <Link href="/sign-in" className="text-[#0b6bcb] hover:underline">
            Full log in
          </Link>
          .
        </p>
      )}
    </aside>
  );
}
