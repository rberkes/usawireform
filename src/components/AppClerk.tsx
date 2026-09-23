"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const ClerkShell = dynamic(() =>
  import("@/components/ClerkShell").then((mod) => mod.ClerkShell),
);

/**
 * Clerk's browser bundle is about 300 KB and was running before first paint.
 * Anonymous pages skip it. Sign-in, sign-up, and signed-in sessions mount it
 * on the first render of those routes.
 */
export function AppClerk({
  signedIn,
  children,
}: {
  signedIn: boolean;
  children: ReactNode;
}) {
  const path = usePathname() ?? "";
  const needsClerk =
    signedIn || path.startsWith("/sign-in") || path.startsWith("/sign-up");

  if (!needsClerk) return children;

  return <ClerkShell>{children}</ClerkShell>;
}
