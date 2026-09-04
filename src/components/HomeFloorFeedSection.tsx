import { HomeFloorFeed } from "@/components/HomeFloorFeed";
import { HomeFloorFeedHeader } from "@/components/HomeFloorFeedHeader";
import { listRecentSourceFloorCells } from "@/lib/source";
import { HOME_FLOOR_CARD_COUNT } from "@/lib/source-floor-feed";

/**
 * The feed reads every filing out of blob storage, which is slow enough that
 * awaiting it in the page body suspended the whole route and handed the
 * browser `app/loading.tsx` instead of the real page. Holding it behind its
 * own boundary lets the hero and the rest of the page paint immediately.
 *
 * The placeholder reserves a card-sized box per slot so filling the grid in
 * does not push the page down.
 */
export function HomeFloorFeedFallback() {
  return (
    <section className="mt-0">
      <HomeFloorFeedHeader />
      <ul
        className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3"
        aria-hidden
      >
        {Array.from({ length: HOME_FLOOR_CARD_COUNT }, (_, slot) => (
          <li key={slot} className="min-h-[178px] bg-background px-5 py-5">
            <div className="h-3 w-20 rounded bg-line" />
            <div className="mt-4 h-6 w-3/4 rounded bg-line" />
            <div className="mt-4 h-4 w-full rounded bg-line" />
            <div className="mt-2 h-4 w-2/3 rounded bg-line" />
            <div className="mt-4 h-3 w-28 rounded bg-line" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function HomeFloorFeedSection() {
  const cells = await listRecentSourceFloorCells(HOME_FLOOR_CARD_COUNT);
  return <HomeFloorFeed initial={cells} />;
}
