import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntityLink } from "@/components/spatial/EntityLink";
import { GlassSurface } from "@/components/materials/GlassSurface";
import { DataSurface } from "@/components/materials/DataSurface";
import { Signal } from "@/components/ui/Signal";
import { EntityMeta } from "@/components/ui/EntityMeta";

import { getRepository } from "@/lib/repository";
import {
  getVisualAthletes,
  getVisualEvents,
  getVisualOpportunity,
} from "@/lib/visual-repository";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const events = await getRepository().getEvents();

  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getRepository().getEvent(slug);

  return event
    ? {
        title: event.name,
        description: event.description,
      }
    : {
        title: "Event not found",
      };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const repository = getRepository();

  const event = await repository.getEvent(slug);

  if (!event) {
    notFound();
  }

  const [visualEvents, visualAthletes, brands, opportunities] =
    await Promise.all([
      getVisualEvents(),
      getVisualAthletes(),
      repository.getBrands(),
      repository.getOpportunities(),
    ]);

  const visualEvent = visualEvents.find(
    (item) => item.slug === event.slug,
  );

  if (!visualEvent) {
    notFound();
  }

  const eventAthletes = visualAthletes.filter((athlete) =>
    event.athleteSlugs.includes(athlete.slug),
  );

  const eventBrands = brands.filter((brand) =>
    event.brandSlugs.includes(brand.slug),
  );

  const eventOpportunities = opportunities.filter(
    (opportunity) => opportunity.eventSlug === event.slug,
  );

  const firstOpportunity = eventOpportunities[0]
    ? await getVisualOpportunity(eventOpportunities[0].slug)
    : null;

  return (
    <main className="event-world-page">
      <section className="event-immersion spatial-scene">
        <div className="event-immersion-media">
          <Image
            src={visualEvent.image}
            alt={visualEvent.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: "center center",
              viewTransitionName: `event-${visualEvent.slug}`,
            } as React.CSSProperties}
          />
        </div>

        <div className="event-immersion-atmosphere" />

        <div className="event-immersion-top">
          <EntityLink
            href="/events"
            className="event-back-link"
          >
            ← Events
          </EntityLink>

          <div className="runsys-micro event-world-index">
            Event / 01
          </div>
        </div>

        <div className="event-immersion-identity">
          <div className="event-immersion-kicker">
            <Signal tone="active">
              {visualEvent.date}
            </Signal>

            <span>{visualEvent.sport}</span>
            <span>{visualEvent.location}</span>
          </div>

          <h1 className="event-immersion-title runsys-display">
            {visualEvent.name}
          </h1>

          <p className="event-immersion-statement">
            A live environment where athletes, brands and
            commercial opportunities intersect.
          </p>
        </div>

        <GlassSurface
          variant="soft"
          className="event-immersion-context"
        >
          <div className="runsys-micro text-[var(--runsys-muted)]">
            Event position
          </div>

          <div className="event-context-value">
            {visualEvent.location}
          </div>

          <div className="event-context-meta">
            {visualEvent.date} · {visualEvent.sport}
          </div>
        </GlassSurface>

        <div className="event-immersion-scroll runsys-micro">
          Explore event
          <span />
        </div>
      </section>

      <section className="event-ecosystem-world">
        <div className="event-ecosystem-intro">
          <div>
            <div className="runsys-micro text-[var(--runsys-muted)]">
              The ecosystem
            </div>

            <h2 className="event-world-heading runsys-display">
              Everyone
              <br />
              arrives here.
            </h2>
          </div>

          <p>
            The event is the connective layer. Athletes compete,
            brands activate and sponsorship opportunities become
            tangible.
          </p>
        </div>

        <div className="event-ecosystem-grid">
          <DataSurface className="event-ecosystem-panel">
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Athletes
            </div>

            <div className="event-ecosystem-number">
              {eventAthletes.length.toString().padStart(2, "0")}
            </div>

            <div className="event-entity-list">
              {eventAthletes.slice(0, 5).map((athlete) => (
                <EntityLink
                  key={athlete.slug}
                  href={`/athletes/${athlete.slug}`}
                  className="event-entity-link"
                >
                  <span>{athlete.name}</span>
                  <span>↗</span>
                </EntityLink>
              ))}
            </div>
          </DataSurface>

          <DataSurface className="event-ecosystem-panel event-panel-offset">
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Brands
            </div>

            <div className="event-ecosystem-number">
              {eventBrands.length.toString().padStart(2, "0")}
            </div>

            <div className="event-entity-list">
              {eventBrands.slice(0, 5).map((brand) => (
                <EntityLink
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="event-entity-link"
                >
                  <span>{brand.name}</span>
                  <span>↗</span>
                </EntityLink>
              ))}
            </div>
          </DataSurface>

          <DataSurface className="event-ecosystem-panel event-panel-wide">
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Opportunities
            </div>

            <div className="event-ecosystem-number">
              {eventOpportunities.length
                .toString()
                .padStart(2, "0")}
            </div>

            <div className="event-opportunity-list">
              {eventOpportunities.slice(0, 5).map((opportunity) => (
                <EntityLink
                  key={opportunity.slug}
                  href={`/opportunities/${opportunity.slug}`}
                  className="event-opportunity-link"
                >
                  <div>
                    <div className="runsys-micro text-[var(--runsys-subtle)]">
                      {opportunity.inventoryType}
                    </div>
                    <div className="mt-2">
                      {opportunity.title}
                    </div>
                  </div>

                  <span>↗</span>
                </EntityLink>
              ))}
            </div>
          </DataSurface>
        </div>
      </section>

      {firstOpportunity ? (
        <section className="event-opportunity-world">
          <div className="event-opportunity-intro">
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Commercial layer
            </div>

            <h2 className="event-world-heading runsys-display">
              The event
              <br />
              creates inventory.
            </h2>

            <p>
              Sponsorship is represented as a relationship
              between an athlete, brand, event, placement,
              rights and time.
            </p>
          </div>

          <GlassSurface
            variant="dense"
            className="event-opportunity-object"
          >
            <div className="flex items-center justify-between gap-4">
              <Signal tone="available">
                {firstOpportunity.status}
              </Signal>

              <span className="runsys-micro text-[var(--runsys-subtle)]">
                {firstOpportunity.eventName}
              </span>
            </div>

            <h3 className="event-opportunity-title runsys-display">
              {firstOpportunity.title}
            </h3>

            <div className="event-opportunity-data">
              <EntityMeta
                eyebrow="Placement"
                value={firstOpportunity.placement}
              />

              <EntityMeta
                eyebrow="Duration"
                value={firstOpportunity.duration}
              />

              <EntityMeta
                eyebrow="Rights"
                value={firstOpportunity.rightsLabel}
              />

              <EntityMeta
                eyebrow="Exclusivity"
                value={firstOpportunity.exclusivityLabel}
              />
            </div>

            <div className="event-opportunity-footer">
              <span>{firstOpportunity.price}</span>

              <EntityLink
                href={`/opportunities/${firstOpportunity.slug}`}
                className="editorial-action editorial-action-secondary"
              >
                Enter opportunity ↗
              </EntityLink>
            </div>
          </GlassSurface>
        </section>
      ) : null}
    </main>
  );
}
