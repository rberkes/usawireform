"use client";

import Image from "next/image";
import { useState } from "react";
import type { YoutubeVideo } from "@/lib/youtube";
import { youtubeEmbed, youtubeThumb } from "@/lib/youtube";

export function VideoGallery({ videos }: { videos: YoutubeVideo[] }) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <ul className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => {
        const active = playing === video.id;
        return (
          <li key={video.id} className="bg-background">
            <div className="relative aspect-video bg-inset">
              {active ? (
                <iframe
                  src={youtubeEmbed(video.id, true)}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(video.id)}
                  className="absolute inset-0"
                  aria-label={`Play ${video.title}`}
                >
                  <Image
                    src={youtubeThumb(video.id)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-3 left-3 bg-background px-2 py-1 font-mono text-[11px] tracking-widest text-copper uppercase">
                    Play
                  </span>
                </button>
              )}
            </div>
            <div className="px-5 py-4">
              <h2 className="font-medium tracking-tight">{video.title}</h2>
              {video.dateLabel ? (
                <p className="mt-1 font-mono text-[11px] tracking-widest text-muted uppercase">
                  {video.dateLabel}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
