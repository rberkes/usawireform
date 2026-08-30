import { Container } from "@/components/ui";

export default function ProductsLoading() {
  return (
    <main className="flex-1">
      <Container className="py-16 sm:py-24">
        <div className="animate-pulse">
          <div className="h-3 w-32 rounded bg-line" />
          <div className="mt-4 h-12 w-48 rounded bg-line" />
          <div className="mt-5 h-5 w-full max-w-lg rounded bg-line" />
          
          {/* Product grid skeleton */}
          <div className="mt-8 grid gap-px bg-line sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-background p-7">
                <div className="h-5 w-32 rounded bg-line" />
                <div className="mt-3 space-y-2">
                  <div className="h-4 w-full rounded bg-line" />
                  <div className="h-4 w-2/3 rounded bg-line" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
