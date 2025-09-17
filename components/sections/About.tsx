// File: components/sections/About.tsx

"use client";
import React, { useEffect, useMemo, useState } from "react";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";
import { SPOTIFY_GREEN } from "@/theme/constants";
import Image from "next/image";

/* Greeting options (one is chosen per refresh) */
const GREETINGS = ["Hello, World.", "Hey there.", "<Hello />", "Greetings!"];

/* Rotating titles with typing effect */
const TITLES = ["Software Engineer", "Full Stack Developer"];
const LONGEST_TITLE = "Full Stack Developer"; // ghost text to reserve width

/* --- Typewriter hook for TITLES only --- */
function useTypewriter(
  phrases: string[],
  {
    typeSpeed = 100,
    deleteSpeed = 80,
    holdAtEnd = 1100,
    holdAtStart = 400,
  }: {
    typeSpeed?: number;
    deleteSpeed?: number;
    holdAtEnd?: number;
    holdAtStart?: number;
  } = {}
) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[i];

    if (!deleting && text === full) {
      const t = setTimeout(() => setDeleting(true), holdAtEnd);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      const t = setTimeout(() => {
        setI((p) => (p + 1) % phrases.length);
        setDeleting(false);
      }, holdAtStart);
      return () => clearTimeout(t);
    }

    const next = deleting
      ? full.slice(0, text.length - 1)
      : full.slice(0, text.length + 1);

    const t = setTimeout(
      () => setText(next),
      deleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(t);
  }, [
    text,
    deleting,
    i,
    phrases,
    typeSpeed,
    deleteSpeed,
    holdAtEnd,
    holdAtStart,
  ]);

  return text;
}

export default function AboutSection() {
  // Pick ONE greeting per refresh (no typing)
  const greeting = useMemo(
    () => GREETINGS[Math.floor(Math.random() * GREETINGS.length)],
    []
  );

  // Title keeps type/delete loop
  const title = useTypewriter(TITLES);

  return (
    <div className="space-y-8">
      <Section title="About Me" subtitle="Senior CS @ Boston University">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left visual */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="md:col-span-1"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800/60 transition-transform duration-500 hover:scale-103">
              <Image
                src="/winson.jpg"
                alt="Winson Dong"
                fill
                className="object-cover object-bottom"
                priority
              />
            </div>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="md:col-span-2 text-center"
          >
            {/* Greeting: fades/slides in once, no typing */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-2xl md:text-4xl font-extrabold tracking-tight text-white"
            >
              {greeting}
            </motion.div>

            {/* Name (stays put) */}
            <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight">
              <span>I&apos;m&nbsp;</span>
              <span style={{ color: SPOTIFY_GREEN }}>Winson Dong</span>
            </h1>

            {/* Title with typing effect — layout locked */}
            <div
              className="mt-4 relative mx-auto"
              // Reserve vertical height so greeting/name never shift
              style={{ minHeight: "2.6rem" }}
            >
              {/* Ghost text to reserve horizontal width (invisible but takes space) */}
              <span className="text-2xl md:text-3xl font-mono invisible select-none">
                {LONGEST_TITLE}
              </span>

              {/* Actual typing content, overlayed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-mono text-zinc-100">
                  {title}
                </span>
                <span
                  className="ml-1 inline-block"
                  style={{
                    width: "2px",
                    height: "1.6em",
                    backgroundColor: "#fff",
                    animation: "blink 1s step-end infinite",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto max-w-5xl"
      >
        <p className="text-zinc-100/95 text-lg md:text-md leading-relaxed md:leading-8">
          Born and raised in Mount Sterling, Kentucky, {"I've"} always carried
          with me a love for basketball, family, and continuous growth. Now a
          senior Computer Science student at Boston University, I channel that
          same energy into building impactful technology. {"I'm"} currently
          interning as a Fullstack Development Intern at{" "}
          <span style={{ color: SPOTIFY_GREEN }}>Hidden Laier</span>. Alongside
          my technical work, I thrive on learning new tools, experimenting with
          side projects, and finding ways to make software more human-centered.
          Beyond coding, I enjoy pushing myself in the gym and following
          basketball, both of which keep me grounded and motivated. With
          small-town roots and a drive for innovation, I aim to craft software
          {"that's"} reliable, intuitive, and meaningful.
        </p>
      </motion.div>

      {/* caret blink animation */}
      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
