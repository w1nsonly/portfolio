// File: components/layout/Sidebar.tsx

"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/layout/Card";
import TabButton from "./TabButton";
import { SPOTIFY_GREEN, TEXT_MUTED } from "@/theme/constants";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa6";
import Image from "next/image";
import { Squash as Hamburger } from "hamburger-react";

export type TabItem = {
  key: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

interface SidebarProps {
  tabs: TabItem[];
  active: string;
  onChange: (key: string) => void;
}

export default function Sidebar({ tabs, active, onChange }: SidebarProps) {
  const [isOpen, setOpen] = useState(false);

  // Lock background scroll when the sheet is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <>
      {/* MOBILE TOP BAR — sticky and full width */}
      <aside className="sticky top-0 z-50 col-span-12 w-full md:hidden">
        <Card className="relative w-full">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-md overflow-hidden border border-zinc-700">
                <Image
                  src="/pfp.png"
                  alt="Winson Dong"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-zinc-300">Winson Dong</p>
            </div>

            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              easing="ease-in"
              rounded
            />
          </div>
        </Card>
      </aside>

      {/* RIGHT SIDE SHEET + OVERLAY (mobile) */}
      <div
        className={`md:hidden fixed inset-0 z-[60] ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Overlay */}
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 transition-opacity duration-200 ${
            isOpen ? "opacity-100" : "opacity-0"
          } bg-black/30 backdrop-blur-xs`}
        />

        {/* Sheet panel */}
        <nav
          role="dialog"
          aria-modal="true"
          className={[
            "absolute right-0 top-0 h-svh w-[45%] max-w-[14rem]",
            "border-l border-zinc-800/70 bg-[#101010]/90 shadow-lg",
            "transition-transform duration-300 will-change-transform",
            isOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <span className="text-base font-medium text-zinc-200">
              Navigate
            </span>
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="p-2 -mr-2 text-zinc-300 hover:text-white text-3xl"
            >
              x
            </button>
          </div>

          {/* Tabs */}
          <div className="px-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  onChange(t.key);
                  setOpen(false);
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
                className={`w-full text-left flex items-center gap-3 rounded-lg px-4 py-4 text-lg
                  hover:bg-white/5 active:bg-white/10 transition
                  ${active === t.key ? "bg-white/5" : ""}`}
              >
                <t.icon size={20} className="shrink-0" />
                <span className="leading-none">{t.key}</span>
              </button>
            ))}
          </div>

          <div className="my-3 mx-2 border-t border-zinc-800/70" />

          {/* Quick links */}
          <div className="px-4">
            <p className={`${TEXT_MUTED} text-xs mb-2`}>Quick links</p>
            <div className="flex gap-4 text-2xl">
              {socials.map((s) => (
                <a
                  key={s.title}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.title}
                  className="hover:text-[#1DB954] transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Resume docked at bottom */}
          <div className="absolute left-0 right-0 bottom-0 p-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center w-full rounded-full px-5 py-3 text-base font-semibold text-black"
              style={{ backgroundColor: SPOTIFY_GREEN }}
            >
              Resume
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                />
              </svg>
            </a>
          </div>
        </nav>
      </div>

      {/* DESKTOP COLUMN */}
      <aside className="sticky top-0 z-50 mt-10 hidden md:block col-span-3 xl:col-span-2 space-y-4 self-start">
        {/* Profile card */}
        <Card>
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-md overflow-hidden border border-zinc-700">
              <Image
                src="/pfp.png"
                alt="Winson Dong"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-zinc-300">Winson Dong</p>
          </div>
        </Card>

        {/* Navigation tabs */}
        <Card>
          <nav className="space-y-1">
            {tabs.map((t) => (
              <TabButton
                key={t.key}
                label={t.key}
                icon={t.icon}
                active={active === t.key}
                onClick={() => {
                  onChange(t.key);
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
              />
            ))}
          </nav>
        </Card>

        {/* Quick links + Resume */}
        <Card>
          <p className={`${TEXT_MUTED} text-xs mb-2`}>Quick links</p>
          <div className="flex gap-4 text-2xl">
            {socials.map((social) => (
              <a
                key={social.title}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#1DB954] transition-colors"
                aria-label={social.title}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center justify-center w-full rounded-full px-5 py-2 font-medium text-black transition"
            style={{ backgroundColor: SPOTIFY_GREEN }}
          >
            Resume
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="ml-2 h-5 w-5 shrink-0 transition-transform group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
              />
            </svg>
          </a>
        </Card>
      </aside>
    </>
  );
}

type SocialProps = {
  title: string;
  url: string;
  icon: React.ReactNode;
}[];

const socials: SocialProps = [
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/winsondong/",
    icon: <FaLinkedin />,
  },
  { title: "GitHub", url: "https://github.com/w1nsonly", icon: <FaGithub /> },
  {
    title: "Email",
    url: "mailto:mrwinsondong@gmail.com",
    icon: <FaEnvelope />,
  },
  {
    title: "Instagram",
    url: "https://instagram.com/w1nsonly",
    icon: <FaInstagram />,
  },
];
