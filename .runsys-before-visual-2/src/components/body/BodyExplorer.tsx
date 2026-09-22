"use client";

import { useState } from "react";
import Link from "next/link";

type Placement = {
  id: string;
  label: string;
  side: "front" | "back";
  top: string;
  left: string;
  available: boolean;
  opportunitySlug?: string;
};

const placements: Placement[] = [
  {
    id: "right-shoulder",
    label: "Right Shoulder",
    side: "front",
    top: "25%",
    left: "28%",
    available: false,
  },
  {
    id: "left-shoulder",
    label: "Left Shoulder",
    side: "front",
    top: "25%",
    left: "72%",
    available: false,
  },
  {
    id: "right-calf",
    label: "Right Calf",
    side: "front",
    top: "76%",
    left: "60%",
    available: true,
    opportunitySlug: "right-calf-hyrox-berlin",
  },
  {
    id: "left-calf",
    label: "Left Calf",
    side: "front",
    top: "76%",
    left: "40%",
    available: false,
  },
];

export function BodyExplorer() {
  const [side, setSide] = useState<"front" | "back">("front");
  const [selected, setSelected] = useState<Placement | null>(null);

  const visiblePlacements = placements.filter((placement) => placement.side === side);

  return (
    <section className="runsys-section bg-[var(--runsys-ink)] text-white">
      <div className="runsys-container">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="runsys-label text-[var(--runsys-accent)]">
              06 / BODY INVENTORY
            </div>

            <h2 className="runsys-display mt-4 text-6xl md:text-8xl">
              THE
              <br />
              BODY.
            </h2>

            <p className="mt-7 max-w-sm text-sm leading-6 text-white/50">
              Physical sponsorship spaces are treated as part of the athlete&apos;s
              story. Explore placement, availability, time, event, and
              opportunity.
            </p>

            <div className="mt-8 flex gap-2">
              {(["front", "back"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setSide(value);
                    setSelected(null);
                  }}
                  className={`runsys-label border px-4 py-3 ${
                    side === value
                      ? "border-white bg-white text-black"
                      : "border-white/30 text-white/60 hover:border-white"
                  }`}
                  aria-pressed={side === value}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="grid gap-8 md:grid-cols-[1fr_280px] md:items-center">
              <div
                className="relative mx-auto aspect-[3/5] w-full max-w-[360px] overflow-hidden border border-white/15 bg-white/[0.03]"
                aria-label={`${side} body sponsorship map`}
              >
                <div className="absolute left-1/2 top-[8%] h-[13%] w-[18%] -translate-x-1/2 rounded-[50%] border border-white/25" />
                <div className="absolute left-1/2 top-[20%] h-[34%] w-[36%] -translate-x-1/2 rounded-[45%_45%_35%_35%] border border-white/25" />
                <div className="absolute left-[30%] top-[24%] h-[32%] w-[9%] -rotate-6 border border-white/20" />
                <div className="absolute right-[30%] top-[24%] h-[32%] w-[9%] rotate-6 border border-white/20" />
                <div className="absolute left-[36%] top-[52%] h-[38%] w-[10%] -rotate-1 border border-white/20" />
                <div className="absolute right-[36%] top-[52%] h-[38%] w-[10%] rotate-1 border border-white/20" />

                {visiblePlacements.map((placement) => (
                  <button
                    key={placement.id}
                    type="button"
                    onClick={() => setSelected(placement)}
                    className={`absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 border ${
                      placement.available
                        ? "border-[var(--runsys-accent)] bg-[var(--runsys-accent)]/20"
                        : "border-white/20 bg-white/5"
                    }`}
                    style={{
                      top: placement.top,
                      left: placement.left,
                    }}
                    aria-label={`${placement.label}${placement.available ? " — available" : " — unavailable"}`}
                  >
                    <span
                      className={`mx-auto block h-2 w-2 ${
                        placement.available
                          ? "bg-[var(--runsys-accent)]"
                          : "bg-white/30"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="border-t border-white/15 pt-6 md:border-t-0 md:border-l md:pl-7">
                {selected ? (
                  <div>
                    <div className="runsys-label text-white/40">
                      PLACEMENT
                    </div>
                    <h3 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
                      {selected.label}
                    </h3>

                    <div className="mt-8">
                      <div className="runsys-label text-white/40">
                        AVAILABILITY
                      </div>
                      <div className="mt-2 text-sm">
                        {selected.available ? "AVAILABLE" : "UNAVAILABLE"}
                      </div>
                    </div>

                    {selected.available && selected.opportunitySlug ? (
                      <Link
                        href={`/opportunities/${selected.opportunitySlug}`}
                        className="runsys-label mt-8 inline-block border border-white px-4 py-3 transition-colors hover:bg-white hover:text-black"
                      >
                        View opportunity →
                      </Link>
                    ) : null}
                  </div>
                ) : (
                  <div>
                    <div className="runsys-label text-white/40">
                      SELECT A HOTSPOT
                    </div>
                    <p className="mt-4 text-sm leading-6 text-white/50">
                      Choose a highlighted body region to inspect its
                      sponsorship availability.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 border-t border-white/15 pt-4 text-xs leading-5 text-white/40">
              Accessible alternative: each hotspot is a keyboard-focusable
              control with a text label and availability state.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
