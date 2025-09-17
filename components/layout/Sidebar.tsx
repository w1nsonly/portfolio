// File: components/layout/Sidebar.tsx

"use client";
import React, { useState } from "react";
import Card from "@/components/layout/Card";
import TabButton from "@/components/layout/TabButton";
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

  return (
    <>
      {/* MOBILE ONLY — sticky and full width */}
      <aside className="sticky top-0 z-50 col-span-12 w-full md:hidden ">
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

          {isOpen && (
            <>
              {/* click-away overlay */}
              <button
                aria-label="Close menu"
                className="fixed inset-0 z-40 cursor-default md:hidden"
                onClick={() => setOpen(false)}
              />
              {/* fixed dropdown so it never creates horizontal overflow */}
              <nav
                className="
                  fixed right-4 top-[72px] z-50
                  w-64 max-w-[calc(100vw-1rem)]
                  rounded-lg border border-zinc-800/70 bg-[#101010] shadow-xl md:hidden
                "
              >
                {/* Tabs */}
                <div className="p-3 border-b border-zinc-800/70">
                  <p className={`${TEXT_MUTED} text-xs mb-2`}>Navigate</p>
                  <div className="space-y-1">
                    {tabs.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => {
                          onChange(t.key);
                          setOpen(false);
                        }}
                        className={`w-full text-left rounded-md px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/5 ${
                          active === t.key ? "bg-white/5" : ""
                        }`}
                      >
                        <t.icon size={16} />
                        <span>{t.key}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="p-3 border-b border-zinc-800/70">
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
                </div>

                {/* Resume */}
                <div className="p-3">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center w-full rounded-full px-5 py-2 font-medium text-black transition"
                    style={{ backgroundColor: SPOTIFY_GREEN }}
                    onClick={() => setOpen(false)}
                  >
                    Resume
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4"
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
            </>
          )}
        </Card>
      </aside>

      {/* DESKTOP ONLY */}
      <aside className="hidden md:block col-span-3 xl:col-span-2 space-y-4 self-start">
        <Card>
          <nav className="space-y-1">
            {tabs.map((t) => (
              <TabButton
                key={t.key}
                label={t.key}
                icon={t.icon}
                active={active === t.key}
                onClick={() => onChange(t.key)}
              />
            ))}
          </nav>
        </Card>

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
              className="ml-2 h-4 w-4"
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
