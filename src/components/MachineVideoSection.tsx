"use client";

import Image from "next/image";
import { useState } from "react";
import { youtubeEmbed, youtubeThumb } from "@/lib/youtube";

export type MachineVideo = {
  id: string;
  title: string;
};

export function MachineVideoSection({
  videos,
  machineName,
}: {
  videos: MachineVideo[];
  machineName: string;
}) {
  const [playing, setPlaying] = useState<string | null>(null);

  if (videos.length === 0) {
    return (
      <p className="text-sm text-muted">
        No videos currently available for {machineName}. Check back later or
        visit the NumAlliance YouTube channel for the latest machine
        demonstrations.
      </p>
    );
  }

  return (
    <div className="grid gap-px bg-line sm:grid-cols-2">
      {videos.map((video) => {
        const active = playing === video.id;
        return (
          <div key={video.id} className="bg-background">
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
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-3 left-3 bg-background px-2 py-1 font-mono text-[11px] tracking-widest text-copper uppercase">
                    Play
                  </span>
                </button>
              )}
            </div>
            <div className="px-4 py-3">
              <p className="text-sm font-medium">{video.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
