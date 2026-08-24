// File: components/ui/InlineLinkText.tsx

import React from "react";
import { SPOTIFY_GREEN } from "@/app/theme/constants";

const LINK_RE = /\[([^\]]+)\]\(((?:https?|mailto):[^)]+)\)/g;

/** Renders text, turning [label](url) into an inline green underlined link. */
export default function InlineLinkText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;

  for (const m of text.matchAll(LINK_RE)) {
    const start = m.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      <a
        key={`${m[2]}-${start}`}
        href={m[2]}
        target={m[2].startsWith("mailto:") ? undefined : "_blank"}
        rel={m[2].startsWith("mailto:") ? undefined : "noreferrer"}
        className="font-medium underline underline-offset-2 transition-opacity hover:opacity-80"
        style={{ color: SPOTIFY_GREEN }}
      >
        {m[1]}
      </a>
    );
    last = start + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return <>{parts}</>;
}
