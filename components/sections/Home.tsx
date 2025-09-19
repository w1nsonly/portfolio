// File: components/sections/Home.tsx

import React from "react";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

export default function HomeSection() {
  
  return (
    <div className="space-y-6">
      <div className="relative rounded-2xl overflow-hidden border border-zinc-800/60">
        {/* Aspect-ratio wrapper keeps the banner contained on all screens */}
        <div className="relative w-full h-[260px] sm:h-[400px]">
          <Image
            src="/banner.gif"
            alt="Winson Dong"
            fill
            priority
            className="object-cover"
          />

          {/* Soft top→bottom vignette like Spotify */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/70" />

          {/* Text overlay */}
          <div className="absolute left-4 bottom-4 sm:left-8 sm:bottom-8">
            <div className="flex flex-col gap-2 sm:gap-3">
              {/* Verified pill */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/85">
                <BadgeCheck size={18} className="text-emerald-400" />
                <span>Verified</span>
              </div>

              {/* Name */}
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                w1nsonly
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-white/70">
                Boston University • Software Engineer Intern (Full-Stack) @ Hidden Laier
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
