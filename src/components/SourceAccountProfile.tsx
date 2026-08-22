"use client";

import { UserProfile } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-appearance";

export function SourceAccountProfile() {
  return (
    <UserProfile
      appearance={clerkAppearance}
      path="/source/account"
      routing="path"
    />
  );
}
