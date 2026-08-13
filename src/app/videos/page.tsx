import type { Metadata } from "next";
import { VideoGallery } from "@/components/VideoGallery";
import { btn, Page, PageHero, TextLink } from "@/components/ui";
import { getYoutubeFeed } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Numalliance CNC wire forming video: Robomac 214 and the shop cell, from the YouTube channel.",
};

export const revalidate = 3600;

export default async function VideosPage() {
  const feed = await getYoutubeFeed();

  return (
    <Page>
      <PageHero
        kicker="Videos"
        title="Numalliance CNC, on camera."
        lede={
          <>
            Robomac 214 and the rest of the forming cell — pulled from the
            shop YouTube channel. Process pages stay in the{" "}
            <TextLink href="/processes">library</TextLink>; this is the
            machine running.
          </>
        }
      >
        {feed.channelUrl ? (
          <a
            href={feed.channelUrl}
            className={btn.ghost}
            rel="noreferrer"
            target="_blank"
          >
            YouTube channel
          </a>
        ) : null}
      </PageHero>

      {feed.videos.length > 0 ? (
        <VideoGallery videos={feed.videos} />
      ) : (
        <p className="mt-12 max-w-xl text-sm leading-7 text-muted">
          The YouTube feed did not return videos. Try the channel link, or
          refresh after the next crawl.
        </p>
      )}
    </Page>
  );
}
