"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { startSourceCheckout } from "@/app/actions/source-billing";
import { Button, ButtonLink, Panel } from "@/components/ui";
import {
  SOURCE_PAID_PLANS,
  formatPlanPrice,
  type SourcePlanId,
} from "@/lib/source-plans";

export function SourceUpgradePlans({
  currentPlanId,
}: {
  currentPlanId: SourcePlanId;
}) {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-3">
      {SOURCE_PAID_PLANS.map((plan) => {
        const current = plan.id === currentPlanId;
        return (
          <Panel key={plan.id} className="flex flex-col p-5 sm:p-6">
            <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
              {plan.name}
            </p>
            <p className="mt-3 text-3xl font-medium tracking-tight">
              {formatPlanPrice(plan.priceCents)}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Up to {plan.cells} cells. {plan.blurb}
            </p>
            <div className="mt-6">
              {current ? (
                <p className="text-sm text-foreground">Current plan.</p>
              ) : (
                <>
                  <SignedIn>
                    <form action={startSourceCheckout}>
                      <input type="hidden" name="planId" value={plan.id} />
                      <Button type="submit" className="w-full">
                        {currentPlanId === "free" ? "Subscribe" : "Switch to this"}
                      </Button>
                    </form>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton
                      mode="redirect"
                      forceRedirectUrl="/source/upgrade"
                      signUpForceRedirectUrl="/source/upgrade"
                    >
                      <ButtonLink href="/sign-in?redirect_url=/source/upgrade" className="w-full">
                        Sign in to subscribe
                      </ButtonLink>
                    </SignInButton>
                  </SignedOut>
                </>
              )}
            </div>
          </Panel>
        );
      })}
    </div>
  );
}
