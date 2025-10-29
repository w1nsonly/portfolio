// File: app/components/sections/Contact.tsx
"use client";
import React, { useState } from "react";
import Section from "@/app/components/layout/Section";
import { SPOTIFY_GREEN } from "@/app/theme/constants";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [msg, setMsg] = useState("");

  return (
    <div className="space-y-6">
      <Section title="Message me" subtitle="My inbox is open. Let's connect.">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            setStatus("sending");
            setMsg("");

            const f = new FormData(form);

            try {
              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: f.get("name"),
                  email: f.get("email"),
                  message: f.get("message"),
                  website: f.get("website"),
                }),
              });
              const json = await res.json();
              if (!res.ok || !json.ok) throw new Error(json.error || "Failed");

              setStatus("ok");
              setMsg("Message sent!");
              form.reset();
            } catch (err) {
              setStatus("error");
              const message =
                err instanceof Error
                  ? err.message
                  : typeof err === "string"
                    ? err
                    : "Something went wrong";
              setMsg(message);
            }
          }}
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="website"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

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

          <div className="md:col-span-2 flex items-center justify-between">
            <span className="text-sm text-zinc-400" aria-live="polite">
              {status === "sending" ? "Sending…" : msg}
            </span>
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-4 py-2 rounded-lg font-medium text-black disabled:opacity-60"
              style={{ backgroundColor: SPOTIFY_GREEN }}
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>
          </div>
        </form>
      </Section>
    </div>
  );
}
