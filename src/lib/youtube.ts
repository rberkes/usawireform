export type YoutubeVideo = {
  id: string;
  title: string;
  published: string;
  dateLabel: string;
};

export type YoutubeFeed = {
  videos: YoutubeVideo[];
  channelTitle: string | null;
  channelUrl: string | null;
};

/** Channel, playlist, or handle. Env `YOUTUBE_URL` overrides. */
export const YOUTUBE_URL =
  process.env.YOUTUBE_URL ??
  "https://www.youtube.com/@numalliance_cnc_for_sale/videos";

const REVALIDATE = 3600;
const VIDEOS_TAB = "EgZ2aWRlb3PyBgQKAjoA";
const YT_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

type Source =
  | { kind: "playlist"; id: string }
  | { kind: "channel"; id: string }
  | { kind: "handle"; handle: string };

export function parseYoutubeSource(raw: string): Source | null {
  const value = raw.trim();
  if (!value) return null;

  const list = value.match(/[?&]list=([\w-]+)/);
  if (list) return { kind: "playlist", id: list[1] };

  const channel = value.match(/youtube\.com\/channel\/(UC[\w-]+)/i);
  if (channel) return { kind: "channel", id: channel[1] };

  const handleUrl = value.match(/youtube\.com\/@([\w.-]+)/i);
  if (handleUrl) return { kind: "handle", handle: handleUrl[1] };

  if (value.startsWith("@")) return { kind: "handle", handle: value.slice(1) };
  if (/^UC[\w-]{20,}$/.test(value)) return { kind: "channel", id: value };
  if (/^(PL|UU|FL)[\w-]+$/.test(value)) return { kind: "playlist", id: value };
  if (/^[\w.-]+$/.test(value)) return { kind: "handle", handle: value };

  return null;
}

function sourceUrl(source: Source) {
  if (source.kind === "playlist") {
    return `https://www.youtube.com/playlist?list=${source.id}`;
  }
  if (source.kind === "channel") {
    return `https://www.youtube.com/channel/${source.id}`;
  }
  return `https://www.youtube.com/@${source.handle}`;
}

function videosPageUrl(source: Exclude<Source, { kind: "playlist" }>) {
  if (source.kind === "channel") {
    return `https://www.youtube.com/channel/${source.id}/videos`;
  }
  return `https://www.youtube.com/@${source.handle}/videos`;
}

function ytFetch(url: string, init: RequestInit = {}) {
  return fetch(url, {
    ...init,
    headers: {
      "user-agent": YT_UA,
      "accept-language": "en-US,en;q=0.9",
      ...init.headers,
    },
    next: { revalidate: REVALIDATE },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function collectLockups(node: unknown, out: Record<string, unknown>[]) {
  if (Array.isArray(node)) {
    for (const item of node) collectLockups(item, out);
    return;
  }
  if (!isRecord(node)) return;
  if (isRecord(node.lockupViewModel)) out.push(node.lockupViewModel);
  for (const value of Object.values(node)) collectLockups(value, out);
}

function stringAt(node: unknown, path: string[]): string {
  let current: unknown = node;
  for (const key of path) {
    if (!isRecord(current)) return "";
    current = current[key];
  }
  return typeof current === "string" ? current : "";
}

function dateFromLockup(lockup: Record<string, unknown>) {
  const meta = lockup.metadata;
  if (!isRecord(meta)) return "";
  const viewModel = isRecord(meta.lockupMetadataViewModel)
    ? meta.lockupMetadataViewModel.metadata
    : null;
  const content = isRecord(viewModel) ? viewModel.contentMetadataViewModel : null;
  const metadataRows = isRecord(content) ? content.metadataRows : null;
  if (!Array.isArray(metadataRows)) return "";
  const parts: string[] = [];
  for (const row of metadataRows) {
    if (!isRecord(row) || !Array.isArray(row.metadataParts)) continue;
    for (const part of row.metadataParts) {
      if (!isRecord(part) || !isRecord(part.text)) continue;
      const label =
        (typeof part.accessibilityLabel === "string" &&
          part.accessibilityLabel) ||
        (typeof part.text.content === "string" ? part.text.content : "");
      if (label) parts.push(label);
    }
  }
  return parts.find((part) => /ago|streamed|premier/i.test(part)) ?? "";
}

function cleanTitle(title: string) {
  return title
    .replace(/\bfor\s+sale\b/gi, "")
    .replace(/\(\s*\)/g, "")
    .replace(/\[\s*\]/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/^[\s\-–—:|/]+|[\s\-–—:|/]+$/g, "")
    .trim();
}

const HIDDEN_IDS = new Set([
  "ppjcbCgzJQo", // China Manufacturing
]);

function normalizedTitle(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function isHiddenVideo(video: YoutubeVideo) {
  if (HIDDEN_IDS.has(video.id)) return true;
  const title = normalizedTitle(`${video.title} ${cleanTitle(video.title)}`);
  return (
    title.includes("berkes") ||
    title.includes("chinamanufacturing") ||
    title.includes("tompetty") ||
    title.includes("pasadena")
  );
}

export function visibleVideos(videos: YoutubeVideo[]) {
  return videos.filter((video) => !isHiddenVideo(video));
}

function presentVideos(videos: YoutubeVideo[]) {
  return visibleVideos(videos).map((video) => ({
    ...video,
    title: cleanTitle(video.title) || video.title,
  }));
}

function videosFromLockups(data: unknown): YoutubeVideo[] {
  const lockups: Record<string, unknown>[] = [];
  collectLockups(data, lockups);
  const videos: YoutubeVideo[] = [];
  const seen = new Set<string>();

  for (const lockup of lockups) {
    const id = typeof lockup.contentId === "string" ? lockup.contentId : "";
    const title = stringAt(lockup, [
      "metadata",
      "lockupMetadataViewModel",
      "title",
      "content",
    ]);
    if (!id || id.length !== 11 || !title || seen.has(id)) continue;
    seen.add(id);
    const dateLabel = dateFromLockup(lockup);
    videos.push({ id, title, published: "", dateLabel });
  }

  return presentVideos(videos);
}

function channelTitleFromData(data: unknown) {
  if (!isRecord(data) || !isRecord(data.metadata)) return null;
  const title = stringAt(data.metadata, ["channelMetadataRenderer", "title"]);
  return title.trim() || null;
}

async function resolveHandle(handle: string): Promise<string | null> {
  const res = await ytFetch(`https://www.youtube.com/@${handle}`);
  if (!res.ok) return null;
  const html = await res.text();
  return (
    html.match(/https:\/\/www\.youtube\.com\/channel\/(UC[\w-]+)/)?.[1] ??
    html.match(/"externalId":"(UC[\w-]+)"/)?.[1] ??
    null
  );
}

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function tag(block: string, name: string) {
  const match = block.match(
    new RegExp(
      `<${name}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))</${name}>`,
    ),
  );
  return decodeXml((match?.[1] ?? match?.[2] ?? "").trim());
}

function dateLabel(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function parseRss(xml: string): { title: string | null; videos: YoutubeVideo[] } {
  const head = xml.split("<entry>")[0] ?? "";
  const title = tag(head, "title") || null;
  const videos: YoutubeVideo[] = [];

  for (const block of xml.split("<entry>").slice(1)) {
    const id =
      tag(block, "yt:videoId") || tag(block, "id").replace(/^yt:video:/, "");
    const videoTitle = tag(block, "title");
    const published = tag(block, "published");
    if (!id || !videoTitle) continue;
    videos.push({
      id,
      title: videoTitle,
      published,
      dateLabel: dateLabel(published),
    });
  }

  return { title, videos: presentVideos(videos) };
}

async function loadRss(source: Exclude<Source, { kind: "handle" }>) {
  const param = source.kind === "playlist" ? "playlist_id" : "channel_id";
  const res = await ytFetch(
    `https://www.youtube.com/feeds/videos.xml?${param}=${source.id}`,
    { headers: { accept: "application/atom+xml, application/xml, text/xml" } },
  );
  if (!res.ok) return null;
  const parsed = parseRss(await res.text());
  return parsed.videos.length ? parsed : null;
}

async function loadInnertube(channelId: string) {
  const res = await fetch(
    "https://www.youtube.com/youtubei/v1/browse?prettyPrint=false",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": YT_UA,
        "accept-language": "en-US,en;q=0.9",
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: "WEB",
            clientVersion: "2.20240801.00.00",
            hl: "en",
            gl: "US",
          },
        },
        browseId: channelId,
        params: VIDEOS_TAB,
      }),
      cache: "force-cache",
      next: { revalidate: REVALIDATE },
    },
  );
  if (!res.ok) return null;
  const data: unknown = await res.json();
  const videos = videosFromLockups(data);
  if (!videos.length) return null;
  return { title: channelTitleFromData(data), videos };
}

function extractInitialData(html: string): unknown | null {
  const marker = "var ytInitialData = ";
  const start = html.indexOf(marker);
  if (start === -1) return null;
  const jsonStart = start + marker.length;
  if (html[jsonStart] !== "{") return null;
  let depth = 0;
  for (let i = jsonStart; i < html.length; i++) {
    const char = html[i];
    if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        try {
          return JSON.parse(html.slice(jsonStart, i + 1)) as unknown;
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

async function loadChannelPage(source: Exclude<Source, { kind: "playlist" }>) {
  const res = await ytFetch(videosPageUrl(source));
  if (!res.ok) return null;
  const data = extractInitialData(await res.text());
  if (!data) return null;
  const videos = videosFromLockups(data);
  if (!videos.length) return null;
  return { title: channelTitleFromData(data), videos };
}

export async function getYoutubeFeed(): Promise<YoutubeFeed> {
  const empty: YoutubeFeed = {
    videos: [],
    channelTitle: null,
    channelUrl: null,
  };

  const source = parseYoutubeSource(YOUTUBE_URL);
  if (!source) return empty;

  try {
    if (source.kind === "playlist") {
      const rss = await loadRss(source);
      const channelUrl = sourceUrl(source);
      if (!rss) return { ...empty, channelUrl };
      return {
        videos: rss.videos,
        channelTitle: rss.title,
        channelUrl,
      };
    }

    const channelId =
      source.kind === "channel" ? source.id : await resolveHandle(source.handle);
    const channelUrl = channelId
      ? `https://www.youtube.com/channel/${channelId}`
      : sourceUrl(source);
    const rss = channelId
      ? await loadRss({ kind: "channel", id: channelId })
      : null;
    if (rss?.videos.length) {
      return {
        videos: rss.videos,
        channelTitle: rss.title,
        channelUrl,
      };
    }

    const innertube = channelId ? await loadInnertube(channelId) : null;
    if (innertube) {
      return {
        videos: innertube.videos,
        channelTitle: innertube.title,
        channelUrl,
      };
    }

    const page = await loadChannelPage(source);
    if (page) {
      return {
        videos: page.videos,
        channelTitle: page.title,
        channelUrl,
      };
    }

    return { ...empty, channelUrl };
  } catch {
    return { ...empty, channelUrl: sourceUrl(source) };
  }
}

export function youtubeThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function youtubeWatch(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function youtubeEmbed(id: string, autoplay = false) {
  const query = autoplay ? "?autoplay=1" : "";
  return `https://www.youtube-nocookie.com/embed/${id}${query}`;
}
