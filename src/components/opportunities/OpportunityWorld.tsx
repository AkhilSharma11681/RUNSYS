import Image from "next/image";
import { EntityLink } from "@/components/spatial/EntityLink";
import { GlassSurface } from "@/components/materials/GlassSurface";
import { EntityMeta } from "@/components/ui/EntityMeta";
import { Signal } from "@/components/ui/Signal";
import type { VisualAthlete, VisualOpportunity } from "@/lib/visual-repository";

type OpportunityWorldProps = {
  opportunity: VisualOpportunity;
  athlete: VisualAthlete;
};

export function OpportunityWorld({
  opportunity,
  athlete,
}: OpportunityWorldProps) {
  return (
    <section className="opportunity-world spatial-scene">
      <div className="section-intro">
        <div>
          <div className="runsys-micro text-[var(--runsys-muted)]">
            Open space
          </div>
          <h2 className="section-title runsys-display">
            A commercial
            <br />
            object.
          </h2>
        </div>

        <p className="section-description">
          Sponsorship becomes tangible when athlete, placement, event, timing
          and rights become one connected opportunity.
        </p>
      </div>

      <div className="opportunity-stage">
        <EntityLink
          href={`/athletes/${athlete.slug}`}
          className="opportunity-media world-link"
        >
          <div className="opportunity-media-frame media-stage">
            <Image
              src={athlete.image}
              alt={athlete.name}
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="media-vignette" />
          </div>
        </EntityLink>

        <GlassSurface variant="dense" className="opportunity-card">
          <Signal tone="available">Available</Signal>

          <div className="runsys-micro mt-6 text-[var(--runsys-muted)]">
            {athlete.name} · {opportunity.eventName}
          </div>

          <h3 className="opportunity-title runsys-display">
            {opportunity.title}
          </h3>

          <div className="opportunity-meta-grid">
            <EntityMeta eyebrow="Placement" value={opportunity.placement} />
            <EntityMeta eyebrow="Duration" value={opportunity.duration} />
            <EntityMeta eyebrow="Rights" value={opportunity.rightsLabel} />
            <EntityMeta
              eyebrow="Exclusivity"
              value={opportunity.exclusivityLabel}
            />
          </div>

          <div className="opportunity-price">
            {opportunity.price}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <EntityLink
              href={`/opportunities/${opportunity.slug}`}
              className="editorial-action"
            >
              Explore opportunity
            </EntityLink>

            <EntityLink
              href={`/athletes/${athlete.slug}`}
              className="editorial-action editorial-action-secondary"
            >
              Enter athlete
            </EntityLink>
          </div>
        </GlassSurface>
      </div>
    </section>
  );
}
