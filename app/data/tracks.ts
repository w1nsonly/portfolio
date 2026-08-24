// File: data/tracks.ts

export type Track = {
  src: string;
  title: string;
  artist: string;
  /** Where the track is from — kept for reference, not rendered today. */
  anime: string;
};

// Drop mp3s in public/audio/ and add an entry for each one.
export const tracks: Track[] = [
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
