import { Container } from "@/components/ui";

export default function ProcessesLoading() {
  return (
    <main className="flex-1">
      <Container className="py-16 sm:py-24">
        <div className="animate-pulse">
          <div className="h-3 w-20 rounded bg-line" />
          <div className="mt-4 h-12 w-72 rounded bg-line" />
          <div className="mt-5 h-5 w-full max-w-xl rounded bg-line" />
          
          {/* Process groups skeleton */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="mt-12">
              <div className="h-3 w-24 rounded bg-line" />
              <div className="mt-5 divide-y divide-line border-y border-line">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex items-baseline justify-between py-5">
                    <div className="h-5 w-48 rounded bg-line" />
                    <div className="h-4 w-64 rounded bg-line" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
