import Image from "next/image";
import { EntityLink } from "@/components/spatial/EntityLink";
import { GlassSurface } from "@/components/materials/GlassSurface";
import { Signal } from "@/components/ui/Signal";
import type { VisualAthlete, VisualEvent } from "@/lib/visual-repository";

type EventWorldProps = {
  event: VisualEvent;
  athlete?: VisualAthlete;
};

export function EventWorld({ event, athlete }: EventWorldProps) {
  return (
    <section className="event-world spatial-scene">
      <div className="section-intro">
        <div>
          <div className="runsys-micro text-[var(--runsys-muted)]">
            What&apos;s next
          </div>
          <h2 className="section-title runsys-display">
            {event.name}
          </h2>
        </div>

        <p className="section-description">
          An event is a living ecosystem: athletes arrive, brands activate,
          campaigns happen and sponsorship inventory becomes visible.
        </p>
      </div>

      <div className="event-stage">
        <EntityLink
          href={`/events/${event.slug}`}
          className="event-primary world-link"
          transitionName={`event-${event.slug}`}
        >
          <div className="event-primary-media media-stage">
            <Image
              src={event.image}
              alt={event.name}
              fill
              sizes="(max-width: 900px) 100vw, 66vw"
              className="object-cover"
              style={{
                viewTransitionName: `event-${event.slug}`,
              } as React.CSSProperties}
            />
            <div className="media-vignette" />
          </div>

          <GlassSurface variant="dense" className="event-primary-copy">
            <Signal tone="active">{event.date}</Signal>
            <h3 className="event-primary-title runsys-display">
              {event.name}
            </h3>
            <p className="hero-context-meta">
              {event.location}
            </p>
          </GlassSurface>
        </EntityLink>

        {athlete ? (
          <EntityLink
            href={`/athletes/${athlete.slug}`}
            className="event-side world-link"
          >
            <div className="event-side-media media-stage">
              <Image
                src={athlete.image}
                alt={athlete.name}
                fill
                sizes="300px"
                className="object-cover"
              />
              <div className="media-vignette" />
            </div>
            <div className="event-side-copy">
              <div className="runsys-micro text-[var(--runsys-muted)]">
                Athlete in the field
              </div>
              <div className="mt-2 text-2xl tracking-[-0.04em]">
                {athlete.name}
              </div>
            </div>
          </EntityLink>
        ) : null}
      </div>
    </section>
  );
}
