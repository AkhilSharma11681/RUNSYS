"use client";

import { useState } from "react";
import { GlassSurface } from "@/components/materials/GlassSurface";
import { Signal } from "@/components/ui/Signal";
import type { VisualOpportunity } from "@/lib/visual-repository";

type BodyPlacement = "calf" | "forearm";

type BodyExplorerProps = {
  opportunity: VisualOpportunity;
};

export function BodyExplorer({ opportunity }: BodyExplorerProps) {
  const initialPlacement: BodyPlacement = opportunity.placement
    .toLowerCase()
    .includes("calf")
    ? "calf"
    : "forearm";

  const [selected, setSelected] = useState<BodyPlacement>(initialPlacement);

  const isCalf = selected === "calf";

  return (
    <section className="body-world" aria-labelledby="body-world-title">
      <div className="section-intro body-world-intro">
        <div>
          <div className="runsys-micro text-[var(--runsys-muted)]">
            Physical inventory
          </div>

          <h2 id="body-world-title" className="section-title runsys-display">
            Where the
            <br />
            brand lives.
          </h2>
        </div>

        <p className="section-description">
          Sponsorship is not abstract inventory. Select a physical region to
          see the opportunity attached to the athlete.
        </p>
      </div>

      <div className="body-stage">
        <div className="body-map-shell">
          <div className="body-map-label body-map-label-top">
            ATHLETE / BODY
          </div>

          <div
            className="body-map"
            aria-label="Interactive athlete body map"
          >
            <div className="body-axis" aria-hidden="true" />

            <div className="body-silhouette" aria-hidden="true">
              <div className="body-head" />
              <div className="body-neck" />
              <div className="body-torso" />
              <div className="body-arm body-arm-left" />
              <div className="body-arm body-arm-right" />
              <div className="body-leg body-leg-left" />
              <div className="body-leg body-leg-right" />
            </div>

            <button
              type="button"
              aria-label="Select right calf sponsorship placement"
              aria-pressed={isCalf}
              className={`body-hotspot body-hotspot-calf ${
                isCalf ? "body-hotspot-selected" : ""
              }`}
              onClick={() => setSelected("calf")}
            >
              <span className="body-hotspot-dot" />
              <span className="body-hotspot-line" />
              <span className="body-hotspot-label">RIGHT CALF</span>
            </button>

            <button
              type="button"
              aria-label="Select right forearm sponsorship placement"
              aria-pressed={!isCalf}
              className={`body-hotspot body-hotspot-forearm ${
                !isCalf ? "body-hotspot-selected" : ""
              }`}
              onClick={() => setSelected("forearm")}
            >
              <span className="body-hotspot-dot" />
              <span className="body-hotspot-line" />
              <span className="body-hotspot-label">RIGHT FOREARM</span>
            </button>
          </div>

          <div className="body-map-label body-map-label-bottom">
            SELECT A REGION
          </div>
        </div>

        <GlassSurface
          variant="dense"
          className={`body-context ${
            isCalf ? "body-context-calf" : "body-context-forearm"
          }`}
        >
          <div className="body-context-topline">
            <Signal tone={isCalf ? "available" : "neutral"}>
              {isCalf ? "Available inventory" : "Placement context"}
            </Signal>

            <span className="body-context-index">
              0{isCalf ? "1" : "2"} / 02
            </span>
          </div>

          <div className="body-context-heading">
            <div>
              <div className="runsys-micro text-[var(--runsys-muted)]">
                Physical placement
              </div>

              <h3 className="body-context-title">
                {isCalf ? "Right calf" : "Right forearm"}
              </h3>
            </div>

            <div className="body-context-price">
              <span className="runsys-micro text-[var(--runsys-muted)]">
                Value
              </span>

              <strong>{isCalf ? opportunity.price : "—"}</strong>
            </div>
          </div>

          <div className="body-context-rule" />

          <div className="body-context-list">
            <div className="body-context-row">
              <div className="runsys-micro text-[var(--runsys-muted)]">
                Event
              </div>
              <div>{opportunity.eventName}</div>
            </div>

            <div className="body-context-row">
              <div className="runsys-micro text-[var(--runsys-muted)]">
                Time
              </div>
              <div>{opportunity.duration}</div>
            </div>

            <div className="body-context-row">
              <div className="runsys-micro text-[var(--runsys-muted)]">
                Opportunity
              </div>
              <div>
                {isCalf ? opportunity.title : "Contextual placement"}
              </div>
            </div>

            <div className="body-context-row">
              <div className="runsys-micro text-[var(--runsys-muted)]">
                Availability
              </div>
              <div>{isCalf ? opportunity.availability : "Explore"}</div>
            </div>
          </div>

          <div className="body-context-footer">
            <span>SPONSORSHIP INVENTORY</span>
            <span>{opportunity.inventoryType}</span>
          </div>
        </GlassSurface>
      </div>
    </section>
  );
}
