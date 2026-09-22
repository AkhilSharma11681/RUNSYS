"use client";

import { useState } from "react";

export function InterestButton() {
  const [state, setState] = useState<"idle" | "open" | "sent">("idle");

  if (state === "sent") {
    return (
      <div className="border border-[var(--runsys-accent)] bg-[var(--runsys-accent)]/10 p-5">
        <div className="runsys-label text-[var(--runsys-accent)]">
          INTEREST RECEIVED
        </div>
        <p className="mt-3 text-sm leading-6">
          Your interest has been recorded. The next step can be handled
          directly with the opportunity owner.
        </p>
      </div>
    );
  }

  if (state === "open") {
    return (
      <div className="border border-[var(--runsys-border)] p-5">
        <div className="runsys-label">EXPRESS INTEREST</div>

        <label className="mt-5 block">
          <span className="runsys-label text-[var(--runsys-muted)]">
            MESSAGE
          </span>
          <textarea
            className="mt-2 min-h-32 w-full resize-none border border-[var(--runsys-border)] bg-transparent p-3 text-sm outline-none focus:border-[var(--runsys-accent)]"
            placeholder="Tell the opportunity owner why this is relevant."
          />
        </label>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setState("sent")}
            className="runsys-label bg-[var(--runsys-ink)] px-5 py-3 text-white transition-opacity hover:opacity-75"
          >
            Send interest
          </button>

          <button
            type="button"
            onClick={() => setState("idle")}
            className="runsys-label border border-[var(--runsys-border)] px-5 py-3"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setState("open")}
      className="runsys-label w-full bg-[var(--runsys-accent)] px-6 py-5 text-left transition-transform hover:-translate-y-0.5"
    >
      Express Interest →
    </button>
  );
}
