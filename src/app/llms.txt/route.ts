import { llmsIndex } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsIndex(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
