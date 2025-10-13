// File: components/sections/Work.tsx

import React from "react";
import Image from "next/image";
import Section from "@/components/layout/Section";
import Badge from "@/components/ui/Badge";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experiences";
import { TEXT_MUTED, SPOTIFY_GREEN } from "@/theme/constants";
import { Github, ExternalLink } from "lucide-react";
import { IoPlayCircle } from "react-icons/io5";

export default function WorkSection() {
  return (
    <div className="space-y-6">
      {/* Projects */}
      <Section
        title="Projects"
        subtitle="Like playlists — skim the vibes, then dive in."
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((p, idx) => (
            <div
              key={idx}
              className="group rounded-xl overflow-hidden border border-zinc-800/70 bg-[#101010] relative transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col"
            >
              {/* Cover image */}
              <div className="relative h-60 w-full bg-zinc-900">
                <Image
                  src={p.imageSrc}
                  alt={p.imageAlt}
                  fill
                  className="object-cover object-center"
                />

                {/* gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                {/* Hover PlayCircle overlay */}
                <a
                  href={p.href ?? p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <IoPlayCircle
                    className="w-16 h-16 drop-shadow-lg hover:scale-110 transition-transform duration-300"
                    style={{ color: SPOTIFY_GREEN }}
                  />
                </a>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col h-full">
                <h4 className="text-white font-semibold leading-tight">
                  {p.title}
                </h4>
                <p className={`${TEXT_MUTED} text-sm mt-2`}>{p.description}</p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 mt-auto pt-4">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/90 hover:text-white inline-flex items-center gap-2 text-sm"
                  >
                    <Github size={16} /> View code
                  </a>

                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/90 hover:text-white inline-flex items-center gap-2 text-sm"
                    >
                      <ExternalLink size={16} /> Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section
        title="Experience"
        subtitle="Where I shipped, learned, and iterated fast."
      >
        <div className="space-y-3">
          {experiences.map((e, i) => (
            <div
              key={`${e.company}-${e.date}-${i}`}
              className="relative rounded-2xl border border-zinc-800/60 bg-[#101010] p-4 md:p-5 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              {/* subtle bottom glow */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

              <div className="grid grid-cols-[24px_1fr] gap-3">
                {/* index number */}
                <div className="flex items-start justify-center pt-1 text-zinc-500 font-semibold">
                  {i + 1}
                </div>

                {/* content */}
                <div>
                  {/* company pill */}
                  <span
                    className="inline-block rounded-md text-xs font-semibold px-2.5 py-1"
                    style={{
                      backgroundColor: `${SPOTIFY_GREEN}20`,
                      color: SPOTIFY_GREEN,
                    }}
                  >
                    {e.company}
                  </span>

                  {/* position */}
                  <h4 className="mt-2 text-white font-extrabold text-lg md:text-xl leading-tight">
                    {e.position}
                  </h4>

                  {/* date */}
                  <p className="mt-1 text-sm text-zinc-400">{e.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
