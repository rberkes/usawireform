import { VideoGallery } from "@/components/VideoGallery";
import { btn, Page, PageHero, TextLink } from "@/components/ui";
import { VideoListSchema } from "@/components/SeoSchemas";
import { getYoutubeFeed, visibleVideos, youtubeThumb, youtubeWatch, youtubeEmbed } from "@/lib/youtube";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Videos",
  description: "Numalliance CNC wire forming video: Robomac 214TF and the shop cell, from the YouTube channel.",
  path: '/videos',
  keywords: [
    "CNC wire forming video",
    "Robomac 214TF",
  ],
});

export const revalidate = 0;

export default async function VideosPage() {
  const feed = await getYoutubeFeed();
  const videos = visibleVideos(feed.videos);

  const videoSchemaData = videos.slice(0, 10).map((video) => ({
    name: video.title,
    description: `CNC wire forming video: ${video.title}. Numalliance Robomac wire bending machinery demonstration.`,
    thumbnailUrl: youtubeThumb(video.id),
    uploadDate: video.published || new Date().toISOString(),
    contentUrl: youtubeWatch(video.id),
    embedUrl: youtubeEmbed(video.id),
  }));

  return (
    <>
      {videoSchemaData.length > 0 && <VideoListSchema videos={videoSchemaData} />}
      <Page>
      <PageHero
        kicker="Videos"
        title="Numalliance CNC, on camera."
        lede={
          <>
            Robomac 214TF and the rest of the forming cell — pulled from the
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

      {videos.length > 0 ? (
        <VideoGallery videos={videos} />
      ) : (
        <p className="mt-12 max-w-xl text-sm leading-7 text-muted">
          The YouTube feed did not return videos. Try the channel link, or
          refresh after the next crawl.
        </p>
      )}
    </Page>
    </>
  );
}
