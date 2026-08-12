// File: app/components/sections/ExperiencePlaylist.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Card from "@/app/components/layout/Card";
import Badge from "@/app/components/ui/Badge";
import { experiences } from "@/app/data/experiences";
import { TEXT_MUTED, SPOTIFY_GREEN } from "@/app/theme/constants";
import { IoPlay, IoPause } from "react-icons/io5";

function Equalizer() {
  return (
    <span className="eq-bars" aria-label="Currently playing">
      <span />
      <span />
      <span />
    </span>
  );
}

export default function ExperiencePlaylist() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const allExpanded = expanded.size === experiences.length;

  const toggleRow = (i: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const toggleAll = () => {
    setExpanded(
      allExpanded ? new Set() : new Set(experiences.map((_, i) => i))
    );
  };

  return (
    <Card className="border border-zinc-800/60">
      {/* Playlist header */}
      <div className="flex items-center gap-4 p-2 md:p-4">
        {/* Album art */}
        <div className="relative h-20 w-20 md:h-28 md:w-28 shrink-0 overflow-hidden rounded-md shadow-lg shadow-black/50">
          <Image
            src="/designs/experience_cover.jpg"
            alt="Experience playlist cover"
            fill
            sizes="(min-width: 768px) 112px, 80px"
            className="object-cover"
            style={{ objectPosition: "30% center" }}
          />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
            Playlist
          </p>
          <h2 className="mt-1 text-2xl md:text-4xl font-extrabold text-white leading-tight">
            Experience
          </h2>
          <p className={`${TEXT_MUTED} mt-1 text-xs md:text-sm truncate`}>
            Winson Dong · {experiences.length} roles · 2022 – Present
          </p>

          {/* Play all / Collapse all */}
          <button
            onClick={toggleAll}
            className="mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-black transition-transform duration-200 hover:scale-105"
            style={{ backgroundColor: SPOTIFY_GREEN }}
          >
            {allExpanded ? (
              <>
                <IoPause className="h-4 w-4" /> Collapse all
              </>
            ) : (
              <>
                <IoPlay className="h-4 w-4" /> Play all
              </>
            )}
          </button>
        </div>
      </div>

      {/* Column header */}
      <div className="-mx-2 md:mx-3 mt-2 grid grid-cols-[14px_1fr_124px] md:grid-cols-[24px_1fr_160px] items-center gap-2.5 md:gap-3 border-b border-zinc-800/70 px-2 md:px-2 pb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        <span className="text-center">#</span>
        <span>Role</span>
        <span className="text-center">Dates</span>
      </div>

      {/* Track list */}
      <ul className="-mx-2 px-0 md:mx-0 md:px-4 pt-1 pb-2">
        {experiences.map((e, i) => {
          const isOpen = expanded.has(i);
          return (
            <li key={`${e.company}-${e.date}`}>
              <button
                onClick={() => toggleRow(i)}
                aria-expanded={isOpen}
                className={`group grid w-full grid-cols-[14px_1fr_124px] md:grid-cols-[24px_1fr_160px] items-center gap-2.5 md:gap-3 overflow-hidden rounded-lg px-2 md:px-2 py-2.5 text-left transition-colors hover:bg-white/5 ${
                  isOpen ? "bg-white/5" : ""
                }`}
              >
                {/* index / equalizer */}
                <span className="flex items-center justify-center text-sm text-zinc-500 tabular-nums">
                  {isOpen ? <Equalizer /> : i + 1}
                </span>

                {/* company + title */}
                <span className="min-w-0">
                  <span
                    className="block truncate font-semibold"
                    style={{ color: isOpen ? SPOTIFY_GREEN : "white" }}
                  >
                    {e.company}
                  </span>
                  <span className="block truncate text-xs md:text-sm text-zinc-400">
                    {e.position}
                  </span>
                </span>

                {/* dates */}
                <span className="text-center text-xs md:text-sm text-zinc-400 whitespace-nowrap">
                  {e.date}
                </span>
              </button>

              {/* Expanded detail */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="ml-[32px] mr-3 border-l border-zinc-800 pl-4 pb-3 pt-3 md:ml-[36px] md:mr-6">
                    <ul className="list-disc space-y-1.5 pl-4 text-xs md:text-sm text-zinc-300 marker:text-zinc-600">
                      {e.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {e.tech.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
