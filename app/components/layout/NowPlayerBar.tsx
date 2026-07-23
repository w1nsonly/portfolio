// File: app/components/layout/NowPlayerBar.tsx

"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { SPOTIFY_GREEN, TEXT_MUTED } from "@/app/theme/constants";
import Image from "next/image";

// Playlist — drop mp3s in public/audio/ and add an entry for each one.
// `anime` is kept for reference (where each track is from) even though only
// the title and artist are rendered today.
const TRACKS = [
  {
    src: "/audio/departure.mp3",
    title: "departure!",
    artist: "Masatoshi Ono",
    anime: "Hunter x Hunter (2011) — Opening 1",
  },
  {
    src: "/audio/shinzou-wo-sasageyo.mp3",
    title: "Shinzou wo Sasageyo!",
    artist: "Linked Horizon",
    anime: "Attack on Titan Season 2 — Opening",
  },
  {
    src: "/audio/lost-in-paradise.mp3",
    title: "Lost in Paradise",
    artist: "ALI feat. AKLO",
    anime: "Jujutsu Kaisen — Ending 1",
  },
  {
    src: "/audio/grandeur.mp3",
    title: "Grandeur",
    artist: "Snow Man",
    anime: "Black Clover — Opening 13",
  },
  {
    src: "/audio/akuma-no-ko.mp3",
    title: "Akuma no Ko",
    artist: "Ai Higuchi",
    anime: "Attack on Titan Final Season — Ending 2",
  },
];

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
  const [trackIndex, setTrackIndex] = useState(0);
  // Play order into TRACKS. Starts unshuffled so the server and client render
  // the same markup, then gets shuffled on mount (see below).
  const [order, setOrder] = useState(() => TRACKS.map((_, i) => i));
  const draggingRef = useRef<null | "volume" | "seek">(null);
  const fixingDurationRef = useRef(false);
  // Whether the next loaded track should start playing on its own.
  const autoPlayNextRef = useRef(false);

  const track = TRACKS[order[trackIndex]];

  // Shuffle once per page load. Doing this after mount (rather than during
  // render) keeps hydration deterministic.
  useEffect(() => {
    setOrder((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    });
  }, []);

  // Keep the audio element's volume in sync with state.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Load the new source when the track changes, resuming playback if we were
  // already playing (or if the change came from a skip button).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(0);
    setDuration(0);
    audio.load();
    if (autoPlayNextRef.current) {
      autoPlayNextRef.current = false;
      audio.play().catch(() => setPlaying(false));
    }
  }, [track.src]);

  const goToTrack = useCallback((next: number) => {
    autoPlayNextRef.current = true;
    setTrackIndex((next + TRACKS.length) % TRACKS.length);
  }, []);

  const nextTrack = useCallback(() => {
    goToTrack(trackIndex + 1);
  }, [goToTrack, trackIndex]);

  // Standard behaviour: restart the song first, jump back only if near the start.
  const prevTrack = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    goToTrack(trackIndex - 1);
  }, [goToTrack, trackIndex]);

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
  const multiTrack = TRACKS.length > 1;

  const skipButtonClass =
    "text-zinc-400 hover:text-white transition disabled:opacity-30 disabled:hover:text-zinc-400";

  return (
    <div
      className="fixed bottom-0 inset-x-0 border-t border-zinc-800/60"
      style={{ backgroundColor: "#0e0e0e" }}
    >
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={nextTrack}
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
        <div className="h-20 flex items-center justify-between gap-4">
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
              <p className="text-sm font-medium truncate">DaDaDa, DaDaDa</p>
              <p className={`${TEXT_MUTED} text-xs truncate`}>
                Winson Dong · Software Engineer
              </p>
            </div>
          </div>

          {/* Center: transport controls stacked above the seek bar */}
          <div className="hidden md:flex flex-col items-center gap-1.5 flex-1 max-w-md relative">
            <div className="flex items-center gap-5">
              <button
                onClick={prevTrack}
                className={skipButtonClass}
                aria-label="Previous track"
                type="button"
              >
                <SkipBack size={16} fill="currentColor" />
              </button>
              <button
                onClick={togglePlay}
                className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition"
                aria-label={playing ? "Pause" : "Play"}
                type="button"
              >
                {playing ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button
                onClick={nextTrack}
                className={skipButtonClass}
                aria-label="Next track"
                type="button"
                disabled={!multiTrack}
              >
                <SkipForward size={16} fill="currentColor" />
              </button>
            </div>

            <div className="flex items-center gap-3 w-full">
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
                    style={{
                      width: `${progress}%`,
                      backgroundColor: SPOTIFY_GREEN,
                    }}
                  />
                </div>
              </div>
              <span className="text-[11px] tabular-nums text-zinc-400 w-9 shrink-0">
                {formatTime(duration)}
              </span>
            </div>

            <span className="hidden lg:inline absolute left-full bottom-0 ml-4 whitespace-nowrap text-xs text-zinc-400">
              ♪ {track.title} · {track.artist}
            </span>
          </div>

          <div className="flex items-center gap-4 flex-none md:flex-1 justify-end">
            {/* Transport for small screens (center section is hidden there) */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={prevTrack}
                className={skipButtonClass}
                aria-label="Previous track"
                type="button"
              >
                <SkipBack size={16} fill="currentColor" />
              </button>
              <button
                onClick={togglePlay}
                className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition"
                aria-label={playing ? "Pause" : "Play"}
                type="button"
              >
                {playing ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button
                onClick={nextTrack}
                className={skipButtonClass}
                aria-label="Next track"
                type="button"
                disabled={!multiTrack}
              >
                <SkipForward size={16} fill="currentColor" />
              </button>
            </div>
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
