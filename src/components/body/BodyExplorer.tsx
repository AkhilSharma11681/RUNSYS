"use client";

import { useState } from "react";
import { GlassSurface } from "@/components/materials/GlassSurface";
import { Signal } from "@/components/ui/Signal";
import { EntityLink } from "@/components/spatial/EntityLink";
import type { VisualOpportunity } from "@/lib/visual-repository";

type BodyPlacement = "calf" | "forearm";

type BodyExplorerProps = {
  opportunity: VisualOpportunity;
};

function placementType(value: string): BodyPlacement | null {
  const placement = value.toLowerCase();

  if (placement.includes("calf")) return "calf";
  if (placement.includes("forearm")) return "forearm";

  return null;
}

export function BodyExplorer({ opportunity }: BodyExplorerProps) {
  const availablePlacement = placementType(opportunity.placement);
  const initialPlacement = availablePlacement ?? "calf";

  const [selected, setSelected] = useState<BodyPlacement>(initialPlacement);

  const isCalf = selected === "calf";
  const isForearm = selected === "forearm";
  const hasCalfInventory = availablePlacement === "calf";
  const hasForearmInventory = availablePlacement === "forearm";

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

            {hasCalfInventory ? (
              <button
                type="button"
                aria-label="Select calf sponsorship placement"
                aria-pressed={isCalf}
                className={`body-hotspot body-hotspot-calf ${
                  isCalf ? "body-hotspot-selected" : ""
                }`}
                onClick={() => setSelected("calf")}
              >
                <span className="body-hotspot-dot" />
                <span className="body-hotspot-line" />
                <span className="body-hotspot-label">
                  {opportunity.placement}
                </span>
              </button>
            ) : null}

            {hasForearmInventory ? (
              <button
                type="button"
                aria-label="Select forearm sponsorship placement"
                aria-pressed={isForearm}
                className={`body-hotspot body-hotspot-forearm ${
                  isForearm ? "body-hotspot-selected" : ""
                }`}
                onClick={() => setSelected("forearm")}
              >
                <span className="body-hotspot-dot" />
                <span className="body-hotspot-line" />
                <span className="body-hotspot-label">
                  {opportunity.placement}
                </span>
              </button>
            ) : null}
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
            <Signal tone="available">
              Available inventory
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
                {opportunity.placement}
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
                Athlete
              </div>
              <EntityLink
                href={`/athletes/${opportunity.athleteSlug}`}
                transitionName={`athlete-${opportunity.athleteSlug}`}
                className="body-context-link"
              >
                View athlete ↗
              </EntityLink>
            </div>

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
                {isCalf ? (
                  <EntityLink
                    href={`/opportunities/${opportunity.slug}`}
                    transitionName={`opportunity-${opportunity.slug}`}
                    className="body-context-link"
                  >
                    {opportunity.title} ↗
                  </EntityLink>
                ) : (
                  "Contextual placement"
                )}
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

          {availablePlacement ? (
            <div className="body-context-action">
              <EntityLink
                href={`/opportunities/${opportunity.slug}`}
                transitionName={`opportunity-${opportunity.slug}`}
                className="editorial-action"
              >
                Enter commercial object ↗
              </EntityLink>
            </div>
          ) : null}
        </GlassSurface>
      </div>
    </section>
  );
}
