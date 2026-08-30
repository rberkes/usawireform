import { Container } from "@/components/ui";

export default function IndustriesLoading() {
  return (
    <main className="flex-1">
      <Container className="py-16 sm:py-24">
        <div className="animate-pulse">
          <div className="h-3 w-24 rounded bg-line" />
          <div className="mt-4 h-12 w-64 rounded bg-line" />
          <div className="mt-5 h-5 w-full max-w-xl rounded bg-line" />
          
          {/* Industry cards skeleton */}
          <div className="mt-8 grid gap-px bg-line sm:grid-cols-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-background p-7">
                <div className="h-5 w-28 rounded bg-line" />
                <div className="mt-3 space-y-2">
                  <div className="h-4 w-full rounded bg-line" />
                  <div className="h-4 w-3/4 rounded bg-line" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
