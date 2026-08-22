"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function SourceAccountNav() {
  return (
    <div className="flex items-center">
      <SignedIn>
        <UserButton
          appearance={{
            elements: { userButtonAvatarBox: "h-8 w-8" },
          }}
        />
      </SignedIn>
      <SignedOut>
        <SignInButton
          mode="redirect"
          forceRedirectUrl="/source/dashboard"
          signUpForceRedirectUrl="/source/dashboard"
        >
          <Link
            href="/sign-in?redirect_url=/source/dashboard"
            className="px-2 py-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            Source
          </Link>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
