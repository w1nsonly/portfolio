// File: app/components/sections/Work.tsx

import React from "react";
import Image from "next/image";
import Section from "@/app/components/layout/Section";
import Badge from "@/app/components/ui/Badge";
import ExperiencePlaylist from "@/app/components/sections/ExperiencePlaylist";
import { projects } from "@/app/data/projects";
import { TEXT_MUTED, SPOTIFY_GREEN } from "@/app/theme/constants";
import { Github, ExternalLink } from "lucide-react";
import { IoPlayCircle } from "react-icons/io5";

export default function WorkSection() {
  return (
    <div className="space-y-6">
      {/* Experience */}
      <ExperiencePlaylist />

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
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/90 hover:text-white inline-flex items-center gap-2 text-sm"
                    >
                      <Github size={16} /> View code
                    </a>
                  )}

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
    </div>
  );
}
