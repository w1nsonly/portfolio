// File: components/sections/Contact.tsx

"use client";
import React from "react";
import Section from "@/components/layout/Section";
import { SPOTIFY_GREEN } from "@/theme/constants";

export default function ContactSection() {
    
  return (
    <div className="space-y-6">
      <Section title="Contact" subtitle="My inbox is open. Let's connect.">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget as HTMLFormElement);
            const name = f.get("name");
            const email = f.get("email");
            const message = f.get("message");
            const body = encodeURIComponent(
              `Hi Winson,%0D%0A%0D%0A${message}%0D%0A%0D%0A— ${name} (${email})`
            );
            window.location.href = `mailto:winson@example.com?subject=Portfolio%20Inquiry&body=${body}`;
          }}
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            required
            placeholder="Your name"
            className="md:col-span-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <input
            name="email"
            required
            type="email"
            placeholder="Email"
            className="md:col-span-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Message"
            className="md:col-span-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg font-medium text-black"
              style={{ backgroundColor: SPOTIFY_GREEN }}
            >
              Send
            </button>
          </div>
        </form>
      </Section>
    </div>
  );
}
