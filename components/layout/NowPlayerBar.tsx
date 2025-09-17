// File: components/layout/NowPlayerBar.tsx

"use client";
import React, { useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { SPOTIFY_GREEN, TEXT_MUTED } from "@/theme/constants";
import Image from "next/image";

export default function NowPlayingBar() {
  const [playing, setPlaying] = useState(true);

  return (
    <div
      className="fixed bottom-0 inset-x-0 border-t border-zinc-800/60"
      style={{ backgroundColor: "#0e0e0e" }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 rounded overflow-hidden">
              <Image
                src="/album_cover.png"
                alt="Album cover"
                fill
                sizes="40px"
                className="object-cover [object-position:50%_75%]" 
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">Winson — Portfolio</p>
              <p className={`${TEXT_MUTED} text-xs truncate`}>
                Made with React, Tailwind, and just enough Motion
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition"
              aria-label={playing ? "Pause" : "Play"}
              type="button"
            >
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <div className="hidden sm:flex items-center gap-2 text-zinc-400">
              <Volume2 size={16} />
              <div className="w-28 h-1 rounded-full bg-zinc-700">
                <div
                  className="w-2/3 h-1 rounded-full"
                  style={{ backgroundColor: SPOTIFY_GREEN }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
