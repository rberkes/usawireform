import { listRecentSourceFloorCells } from "@/lib/source";
import { HOME_FLOOR_CARD_COUNT } from "@/lib/source-floor-feed";

export const dynamic = "force-dynamic";

export async function GET() {
  const cells = await listRecentSourceFloorCells(HOME_FLOOR_CARD_COUNT);
  return Response.json(
    { cells },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
