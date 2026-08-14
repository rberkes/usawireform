import { Container } from "@/components/ui";

export default function Loading() {
  return (
    <main className="flex-1">
      <Container className="py-16 sm:py-24">
        <div className="animate-pulse">
          {/* Kicker skeleton */}
          <div className="h-3 w-24 rounded bg-line" />
          {/* Title skeleton */}
          <div className="mt-4 h-12 w-3/4 max-w-lg rounded bg-line" />
          {/* Lede skeleton */}
          <div className="mt-5 space-y-2">
            <div className="h-5 w-full max-w-xl rounded bg-line" />
            <div className="h-5 w-2/3 max-w-md rounded bg-line" />
          </div>
          {/* Content skeleton */}
          <div className="mt-16 grid gap-4">
            <div className="h-24 rounded bg-line" />
            <div className="h-24 rounded bg-line" />
            <div className="h-24 rounded bg-line" />
          </div>
        </div>
      </Container>
    </main>
  );
}
