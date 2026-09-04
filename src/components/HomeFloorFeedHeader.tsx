import Link from "next/link";
import { Kicker } from "@/components/ui";

/** Shared by the feed and its placeholder so the heading never moves. */
export function HomeFloorFeedHeader() {
  return (
    <>
      <Kicker>Recent equipment added</Kicker>
      <h2 className="mt-3 text-2xl tracking-tight">Newest Machine Lines</h2>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
        Live from shops around the USA.{" "}
        <Link href="/source/equipment" className="text-copper hover:underline">
          List a cell free
        </Link>
        .
      </p>
    </>
  );
}
