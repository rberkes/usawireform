"use client";

import { useEffect } from "react";
import { Button, ButtonLink, Container, Kicker } from "@/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("[App Error]", error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center">
      <Container className="py-24 text-center">
        <Kicker tone="muted">Error</Kicker>
        <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
          Something went wrong
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-muted">
          We encountered an unexpected error. Please try again or contact us if
          the problem persists.
        </p>
        {error.digest && (
          <p className="mt-4 font-mono text-xs text-muted">
            Error ID: {error.digest}
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
          <ButtonLink href="/" variant="ghost">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact support
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
