"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { SourceAccountNav } from "@/components/SourceAccountNav";
import { clerkAppearance } from "@/lib/clerk-appearance";

export function SignedInAccount({
  shopName,
  shopSlug,
  role,
}: {
  shopName?: string;
  shopSlug?: string;
  role?: "supplier" | "buyer";
}) {
  return (
    <ClerkProvider appearance={clerkAppearance} afterSignOutUrl="/">
      <SourceAccountNav shopName={shopName} shopSlug={shopSlug} role={role} />
    </ClerkProvider>
  );
}
