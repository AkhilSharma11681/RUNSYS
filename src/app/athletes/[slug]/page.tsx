import Image from "next/image";
import { notFound } from "next/navigation";

import { BodyExplorer } from "@/components/body/BodyExplorer";
import { EntityLink } from "@/components/spatial/EntityLink";
import { GlassSurface } from "@/components/materials/GlassSurface";
import { DataSurface } from "@/components/materials/DataSurface";
import { InterestButton } from "@/components/opportunities/InterestButton";
import { Signal } from "@/components/ui/Signal";
import { EntityMeta } from "@/components/ui/EntityMeta";

import {
  getVisualAthletes,
  getVisualOpportunity,
} from "@/lib/visual-repository";

import { getRepository } from "@/lib/repository";

type AthletePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const athletes = await getVisualAthletes();

  return athletes.map((athlete) => ({
    slug: athlete.slug,
  }));
}

export default async function AthletePage({
  params,
}: AthletePageProps) {
  const { slug } = await params;

  const repository = await getRepository();
  const athlete = await repository.getAthlete(slug);

  if (!athlete) {
    notFound();
  }

  const visualAthletes = await getVisualAthletes();
  const visualAthlete =
    visualAthletes.find((item) => item.slug === slug);

  if (!visualAthlete) {
    notFound();
  }

  const [allOpportunities, allEvents, allBrands] =
    await Promise.all([
      repository.getOpportunities(),
      repository.getEvents(),
      repository.getBrands(),
    ]);

  const opportunities = allOpportunities.filter(
    (opportunity) => opportunity.athleteSlug === athlete.slug,
  );

  const firstOpportunity = opportunities[0]
    ? await getVisualOpportunity(opportunities[0].slug)
    : null;

  const events = allEvents.filter((event) =>
    athlete.events.includes(event.slug),
  );

  const brands = allBrands.filter((brand) =>
    athlete.brands.includes(brand.slug),
  );

  const sponsorshipHistory = athlete.sponsorshipHistory;

  return (
    <main className="athlete-world-page">
      <section className="athlete-immersion spatial-scene">
        <div className="athlete-immersion-media">
          <Image
            src={visualAthlete.image}
            alt={visualAthlete.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: "54% center",
              viewTransitionName: `athlete-${visualAthlete.slug}`,
            } as React.CSSProperties}
          />
        </div>

        <div className="athlete-immersion-atmosphere" />

        <div className="athlete-immersion-top">
          <EntityLink
            href="/"
            className="athlete-back-link"
          >
            ← RUNSYS
          </EntityLink>

          <div className="runsys-micro athlete-world-index">
            Athlete / 01
          </div>
        </div>

        <div className="athlete-immersion-identity">
          <div className="athlete-immersion-kicker">
            <Signal tone="active">
              {visualAthlete.status}
            </Signal>

            <span>
              {visualAthlete.sport}
            </span>

            <span>
              {visualAthlete.location}
            </span>
          </div>

          <h1 className="athlete-immersion-title runsys-display">
            {visualAthlete.name}
          </h1>

          <p className="athlete-immersion-statement">
            Athlete, competitor, participant in a living network
            of events, brands and opportunities.
          </p>
        </div>

        <div className="athlete-immersion-context">
          <GlassSurface
            variant="soft"
            className="athlete-context-surface"
          >
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Current position
            </div>

            <div className="athlete-context-value">
              {visualAthlete.location}
            </div>

            <div className="athlete-context-meta">
              {visualAthlete.sport} · {visualAthlete.status}
            </div>

            <div className="athlete-context-network">
              <span>{events.length} EVENTS</span>
              <span>{brands.length} BRANDS</span>
              <span>{opportunities.length} OPEN</span>
            </div>
          </GlassSurface>

          {firstOpportunity ? (
            <GlassSurface
              variant="dense"
              className="athlete-context-surface athlete-context-opportunity"
            >
              <div className="runsys-micro text-[var(--runsys-muted)]">
                Open sponsorship
              </div>

              <div className="athlete-context-value">
                {firstOpportunity.placement}
              </div>

              <div className="athlete-context-meta">
                {firstOpportunity.eventName} ·{" "}
                {firstOpportunity.price}
              </div>

              <EntityLink
                href={`/opportunities/${firstOpportunity.slug}`} transitionName={`opportunity-${firstOpportunity.slug}`}
                className="athlete-context-enter"
              >
                Enter opportunity ↗
              </EntityLink>
            </GlassSurface>
          ) : null}
        </div>

        <div className="athlete-immersion-scroll runsys-micro">
          Explore athlete
          <span />
        </div>
      </section>

      <section className="athlete-identity-world">
        <div className="athlete-world-spine" />

        <div className="athlete-identity-layout">
          <div>
            <div className="runsys-micro text-[var(--runsys-muted)]">
              The athlete
            </div>

            <h2 className="athlete-world-heading runsys-display">
              A person
              <br />
              in motion.
            </h2>
          </div>

          <div className="athlete-world-copy">
            <p>
              RUNSYS treats an athlete as a connected entity,
              not a profile card. Their movement creates
              relationships with events, brands, audiences and
              commercial opportunities.
            </p>

            <div className="athlete-signal-row">
              <span>Sport</span>
              <strong>{visualAthlete.sport}</strong>
            </div>

            <div className="athlete-signal-row">
              <span>Location</span>
              <strong>{visualAthlete.location}</strong>
            </div>

            <div className="athlete-signal-row">
              <span>Status</span>
              <strong>{visualAthlete.status}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="athlete-relationship-world">
        <div className="athlete-relationship-header">
          <div>
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Connected world
            </div>

            <h2 className="athlete-world-heading runsys-display">
              Where
              <br />
              they move.
            </h2>
          </div>

          <p>
            Events, brands and commercial opportunities become
            visible around the athlete.
          </p>
        </div>

        <div className="athlete-relationship-grid">
          <DataSurface className="athlete-relation-panel">
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Events
            </div>

            <div className="athlete-relation-number">
              {events.length.toString().padStart(2, "0")}
            </div>

            <div className="athlete-relation-list">
              {events.slice(0, 4).map((event) => (
                <EntityLink
                  key={event.slug}
                  href={`/events/${event.slug}`} transitionName={`event-${event.slug}`}
                  className="athlete-relation-link"
                >
                  <span>{event.name}</span>
                  <span>↗</span>
                </EntityLink>
              ))}
            </div>
          </DataSurface>

          <DataSurface className="athlete-relation-panel athlete-relation-panel-offset">
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Brands
            </div>

            <div className="athlete-relation-number">
              {brands.length.toString().padStart(2, "0")}
            </div>

            <div className="athlete-relation-list">
              {brands.slice(0, 4).map((brand) => (
                <EntityLink
                  key={brand.slug}
                  href={`/brands/${brand.slug}`} transitionName={`brand-${brand.slug}`}
                  className="athlete-relation-link"
                >
                  <span>{brand.name}</span>
                  <span>↗</span>
                </EntityLink>
              ))}
            </div>
          </DataSurface>

          <DataSurface className="athlete-relation-panel athlete-relation-panel-wide">
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Sponsorship history
            </div>

            <div className="athlete-relation-number">
              {sponsorshipHistory.length
                .toString()
                .padStart(2, "0")}
            </div>

            <div className="athlete-history-list">
              {sponsorshipHistory
                .slice(0, 4)
                .map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="athlete-history-item"
                  >
                    <div>
                      <div className="runsys-micro text-[var(--runsys-subtle)]">
                        Previous partnership
                      </div>
                      <div className="mt-2">
                        {item}
                      </div>
                    </div>

                    <div className="text-right text-[var(--runsys-muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                ))}
            </div>
          </DataSurface>
        </div>
      </section>

      {firstOpportunity ? (
        <section className="athlete-opportunity-world">
          <div className="athlete-opportunity-stage">
            <div className="athlete-opportunity-intro">
              <div className="runsys-micro text-[var(--runsys-muted)]">
                Live commercial space
              </div>

              <h2 className="athlete-world-heading runsys-display">
                Something
                <br />
                is open.
              </h2>

              <p>
                A sponsorship opportunity attached directly
                to this athlete, this event and this physical
                placement.
              </p>
            </div>

            <GlassSurface
              variant="dense"
              className="athlete-opportunity-object"
            >
              <div className="flex items-center justify-between gap-4">
                <Signal tone="available">
                  Available
                </Signal>

                <span className="runsys-micro text-[var(--runsys-subtle)]">
                  {firstOpportunity.eventName}
                </span>
              </div>

              <h3 className="athlete-opportunity-title runsys-display">
                {firstOpportunity.title}
              </h3>

              <div className="athlete-opportunity-data">
                <EntityMeta
                  eyebrow="Inventory"
                  value={firstOpportunity.inventoryType}
                />

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

                <EntityMeta
                  eyebrow="Pricing"
                  value={firstOpportunity.pricing.type.replaceAll("_", " ")}
                />
              </div>

              <div className="athlete-opportunity-price">
                {firstOpportunity.price}
              </div>

              <div className="flex flex-wrap gap-3">
                <InterestButton opportunitySlug={firstOpportunity.slug} />

                <EntityLink
                  href={`/opportunities/${firstOpportunity.slug}`} transitionName={`opportunity-${firstOpportunity.slug}`}
                  className="editorial-action editorial-action-secondary"
                >
                  Explore
                </EntityLink>
              </div>
            </GlassSurface>
          </div>
        </section>
      ) : null}

      {firstOpportunity ? (
        <section className="athlete-body-world">
          <BodyExplorer opportunity={firstOpportunity} />
        </section>
      ) : null}
    </main>
  );
}
