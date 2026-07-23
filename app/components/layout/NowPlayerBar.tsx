// File: app/components/layout/NowPlayerBar.tsx

"use client";
import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { SPOTIFY_GREEN, TEXT_MUTED } from "@/app/theme/constants";
import Image from "next/image";

// Drop an audio file at public/audio/now-playing.mp3 — the path stays fixed.
const TRACK_SRC = "/audio/now-playing.mp3";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function NowPlayingBar() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeTrackRef = useRef<HTMLDivElement>(null);
  const seekTrackRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.66);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const draggingRef = useRef<null | "volume" | "seek">(null);
  const fixingDurationRef = useRef(false);

  // Keep the audio element's volume in sync with state.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false)); // e.g. no source / autoplay blocked
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const ratioFromClientX = (clientX: number, el: HTMLDivElement | null) => {
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  };

  const setVolumeFromClientX = (clientX: number) => {
    setVolume(ratioFromClientX(clientX, volumeTrackRef.current));
  };

  const setSeekFromClientX = (clientX: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const t = ratioFromClientX(clientX, seekTrackRef.current) * duration;
    audio.currentTime = t;
    setCurrentTime(t);
  };

  // Shared drag handling for the volume and seek sliders.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (draggingRef.current === "volume") setVolumeFromClientX(e.clientX);
      else if (draggingRef.current === "seek") setSeekFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  const muted = volume === 0;
  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="fixed bottom-0 inset-x-0 border-t border-zinc-800/60"
      style={{ backgroundColor: "#0e0e0e" }}
    >
      <audio
        ref={audioRef}
        src={TRACK_SRC}
        loop
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onLoadedMetadata={(e) => {
          const audio = e.currentTarget;
          if (Number.isFinite(audio.duration)) {
            setDuration(audio.duration);
          } else {
            // Some MP3s report Infinity here — nudge the browser to compute
            // the real length, then reset in the timeupdate below.
            fixingDurationRef.current = true;
            audio.currentTime = 1e101;
          }
        }}
        onDurationChange={(e) => {
          if (Number.isFinite(e.currentTarget.duration))
            setDuration(e.currentTarget.duration);
        }}
        onTimeUpdate={(e) => {
          const audio = e.currentTarget;
          if (fixingDurationRef.current) {
            fixingDurationRef.current = false;
            setDuration(audio.duration);
            audio.currentTime = 0;
            setCurrentTime(0);
            return;
          }
          if (draggingRef.current !== "seek") setCurrentTime(audio.currentTime);
        }}
      />
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
              <Image
                src="/designs/album_cover.png"
                alt="Album cover"
                fill
                sizes="40px"
                className="object-cover [object-position:50%_75%]"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">A Quiet Perseverance</p>
              <p className={`${TEXT_MUTED} text-xs truncate`}>
                Winson Dong · Software Engineer
              </p>
            </div>
          </div>

          {/* Center: play control + seek bar */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-md relative">
            <button
              onClick={togglePlay}
              className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition shrink-0"
              aria-label={playing ? "Pause" : "Play"}
              type="button"
            >
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <span className="text-[11px] tabular-nums text-zinc-400 w-9 text-right shrink-0">
              {formatTime(currentTime)}
            </span>
            <div
              ref={seekTrackRef}
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(currentTime)}
              tabIndex={0}
              onPointerDown={(e) => {
                draggingRef.current = "seek";
                setSeekFromClientX(e.clientX);
              }}
              onKeyDown={(e) => {
                const audio = audioRef.current;
                if (!audio) return;
                if (e.key === "ArrowRight")
                  audio.currentTime = Math.min(duration, audio.currentTime + 5);
                if (e.key === "ArrowLeft")
                  audio.currentTime = Math.max(0, audio.currentTime - 5);
              }}
              className="group flex-1 h-3 flex items-center cursor-pointer touch-none"
            >
              <div className="relative w-full h-1 rounded-full bg-zinc-700">
                <div
                  className="absolute inset-y-0 left-0 h-1 rounded-full"
                  style={{ width: `${progress}%`, backgroundColor: SPOTIFY_GREEN }}
                />
              </div>
            </div>
            <span className="text-[11px] tabular-nums text-zinc-400 w-9 shrink-0">
              {formatTime(duration)}
            </span>
            <span className="hidden lg:inline absolute left-full top-1/2 -translate-y-1/2 ml-4 whitespace-nowrap text-xs text-zinc-400">
              ♪ 10 Bands · Drake
            </span>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end">
            {/* Play control for small screens (center section is hidden there) */}
            <button
              onClick={togglePlay}
              className="md:hidden rounded-full p-2 bg-white/10 hover:bg-white/20 transition"
              aria-label={playing ? "Pause" : "Play"}
              type="button"
            >
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <div className="hidden sm:flex items-center gap-2 text-zinc-400">
              <button
                onClick={() => setVolume((v) => (v === 0 ? 0.66 : 0))}
                aria-label={muted ? "Unmute" : "Mute"}
                type="button"
                className="hover:text-white transition"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <div
                ref={volumeTrackRef}
                role="slider"
                aria-label="Volume"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(volume * 100)}
                tabIndex={0}
                onPointerDown={(e) => {
                  draggingRef.current = "volume";
                  setVolumeFromClientX(e.clientX);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowUp")
                    setVolume((v) => Math.min(1, v + 0.05));
                  if (e.key === "ArrowLeft" || e.key === "ArrowDown")
                    setVolume((v) => Math.max(0, v - 0.05));
                }}
                className="group w-28 h-3 flex items-center cursor-pointer touch-none"
              >
                <div className="relative w-full h-1 rounded-full bg-zinc-700">
                  <div
                    className="absolute inset-y-0 left-0 h-1 rounded-full"
                    style={{
                      width: `${volume * 100}%`,
                      backgroundColor: SPOTIFY_GREEN,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
