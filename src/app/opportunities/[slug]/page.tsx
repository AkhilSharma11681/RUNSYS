import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntityLink } from "@/components/spatial/EntityLink";
import { GlassSurface } from "@/components/materials/GlassSurface";
import { DataSurface } from "@/components/materials/DataSurface";
import { Signal } from "@/components/ui/Signal";
import { EntityMeta } from "@/components/ui/EntityMeta";
import { InterestButton } from "@/components/opportunities/InterestButton";

import { getRepository } from "@/lib/repository";
import { getVisualOpportunity } from "@/lib/visual-repository";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const opportunities = await getRepository().getOpportunities();

  return opportunities.map((opportunity) => ({
    slug: opportunity.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const opportunity = await getRepository().getOpportunity(slug);

  return opportunity
    ? {
        title: opportunity.title,
        description: opportunity.description,
      }
    : {
        title: "Opportunity not found",
      };
}

export default async function OpportunityPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const repository = getRepository();

  const opportunity = await repository.getOpportunity(slug);

  if (!opportunity) {
    notFound();
  }

  const [athlete, brand, event, visualOpportunity] =
    await Promise.all([
      repository.getAthlete(opportunity.athleteSlug),
      repository.getBrand(opportunity.brandSlug),
      repository.getEvent(opportunity.eventSlug),
      getVisualOpportunity(opportunity.slug),
    ]);

  if (!athlete || !brand || !event || !visualOpportunity) {
    notFound();
  }

  return (
    <main className="opportunity-world-page">
      <section className="opportunity-immersion spatial-scene">
        <div className="opportunity-immersion-media">
          <Image
            src={visualOpportunity.image}
            alt={visualOpportunity.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: "center center",
              viewTransitionName: `opportunity-${visualOpportunity.slug}`,
            } as React.CSSProperties}
          />
        </div>

        <div className="opportunity-immersion-atmosphere" />

        <div className="opportunity-immersion-top">
          <EntityLink
            href={`/events/${event.slug}`}
            className="opportunity-back-link"
          >
            ← {event.name}
          </EntityLink>

          <div className="runsys-micro opportunity-world-index">
            Opportunity / 01
          </div>
        </div>

        <div className="opportunity-immersion-identity">
          <div className="opportunity-immersion-kicker">
            <Signal tone="available">
              {visualOpportunity.status}
            </Signal>

            <span>{visualOpportunity.inventoryType}</span>
            <span>{visualOpportunity.placement}</span>
          </div>

          <h1 className="opportunity-immersion-title runsys-display">
            {visualOpportunity.title}
          </h1>

          <p className="opportunity-immersion-statement">
            A defined commercial relationship between an
            athlete, brand, event, inventory and time.
          </p>
        </div>

        <GlassSurface
          variant="dense"
          className="opportunity-immersion-context"
        >
          <div className="runsys-micro text-[var(--runsys-muted)]">
            Commercial object
          </div>

          <div className="opportunity-context-value">
            {visualOpportunity.price}
          </div>

          <div className="opportunity-context-meta">
            {visualOpportunity.duration} ·{" "}
            {visualOpportunity.exclusivityLabel}
          </div>
        </GlassSurface>

        <div className="opportunity-immersion-scroll runsys-micro">
          Explore opportunity
          <span />
        </div>
      </section>

      <section className="opportunity-object-world">
        <div className="opportunity-object-layout">
          <div className="opportunity-object-intro">
            <div className="runsys-micro text-[var(--runsys-muted)]">
              The commercial object
            </div>

            <h2 className="opportunity-world-heading runsys-display">
              One space.
              <br />
              Many relationships.
            </h2>

            <p>
              This is not a product listing. It is a defined
              sponsorship opportunity attached to real people,
              a real event and specific commercial rights.
            </p>
          </div>

          <GlassSurface
            variant="dense"
            className="opportunity-object-card"
          >
            <div className="opportunity-object-status">
              <Signal tone="available">
                {visualOpportunity.status}
              </Signal>

              <span className="runsys-micro text-[var(--runsys-subtle)]">
                {visualOpportunity.eventName}
              </span>
            </div>

            <h3 className="opportunity-object-title runsys-display">
              {visualOpportunity.title}
            </h3>

            <div className="opportunity-object-grid">
              <EntityMeta
                eyebrow="Athlete"
                value={athlete.name}
              />

              <EntityMeta
                eyebrow="Brand"
                value={brand.name}
              />

              <EntityMeta
                eyebrow="Event"
                value={event.name}
              />

              <EntityMeta
                eyebrow="Placement"
                value={visualOpportunity.placement}
              />

              <EntityMeta
                eyebrow="Duration"
                value={visualOpportunity.duration}
              />

              <EntityMeta
                eyebrow="Rights"
                value={visualOpportunity.rightsLabel}
              />
            </div>
          </GlassSurface>
        </div>
      </section>

      <section className="opportunity-relationship-world">
        <div className="opportunity-relationship-intro">
          <div>
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Relationship layer
            </div>

            <h2 className="opportunity-world-heading runsys-display">
              Follow
              <br />
              the connection.
            </h2>
          </div>

          <p>
            Every opportunity exists inside a larger network.
            Move through the athlete, event and brand instead
            of losing the context.
          </p>
        </div>

        <div className="opportunity-relationship-grid">
          <EntityLink
            href={`/athletes/${athlete.slug}`}
            className="opportunity-relation-card"
          >
            <div className="opportunity-relation-media">
              <Image
                src={athlete.heroImage}
                alt={athlete.name}
                fill
                sizes="(max-width: 700px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="media-vignette" />
            </div>

            <div className="opportunity-relation-copy">
              <div className="runsys-micro">
                Athlete
              </div>
              <strong>{athlete.name}</strong>
              <span>Enter athlete world ↗</span>
            </div>
          </EntityLink>

          <EntityLink
            href={`/events/${event.slug}`}
            className="opportunity-relation-card opportunity-relation-card-event"
          >
            <div className="opportunity-relation-media">
              <Image
                src={event.image}
                alt={event.name}
                fill
                sizes="(max-width: 700px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="media-vignette" />
            </div>

            <div className="opportunity-relation-copy">
              <div className="runsys-micro">
                Event
              </div>
              <strong>{event.name}</strong>
              <span>Enter event world ↗</span>
            </div>
          </EntityLink>

          <EntityLink
            href={`/brands/${brand.slug}`}
            className="opportunity-relation-card opportunity-relation-card-brand"
          >
            <div className="opportunity-relation-media">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                sizes="(max-width: 700px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="media-vignette" />
            </div>

            <div className="opportunity-relation-copy">
              <div className="runsys-micro">
                Brand
              </div>
              <strong>{brand.name}</strong>
              <span>Enter brand world ↗</span>
            </div>
          </EntityLink>
        </div>
      </section>

      <section className="opportunity-detail-world">
        <div className="opportunity-detail-layout">
          <div>
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Rights & delivery
            </div>

            <h2 className="opportunity-world-heading runsys-display">
              What
              <br />
              exists here.
            </h2>

            <p className="opportunity-detail-description">
              {opportunity.description}
            </p>
          </div>

          <div className="opportunity-detail-surfaces">
            <DataSurface className="opportunity-detail-surface">
              <div className="runsys-micro">
                Deliverables
              </div>

              <div className="opportunity-detail-list">
                {opportunity.deliverables.map((item) => (
                  <div
                    key={item}
                    className="opportunity-detail-item"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </DataSurface>

            <DataSurface className="opportunity-detail-surface">
              <div className="runsys-micro">
                Rights
              </div>

              <div className="opportunity-detail-list">
                {opportunity.rights.map((item) => (
                  <div
                    key={item}
                    className="opportunity-detail-item"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </DataSurface>
          </div>
        </div>
      </section>

      <section className="opportunity-action-world">
        <div className="opportunity-action-stage">
          <div>
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Make the connection
            </div>

            <h2 className="opportunity-action-title runsys-display">
              Interested
              <br />
              in this space?
            </h2>

            <p>
              Expressing interest starts a conversation. It does
              not create a purchase or binding agreement.
            </p>
          </div>

          <GlassSurface
            variant="dense"
            className="opportunity-action-card"
          >
            <div className="runsys-micro text-[var(--runsys-muted)]">
              {visualOpportunity.placement}
            </div>

            <div className="opportunity-action-price">
              {visualOpportunity.price}
            </div>

            <div className="opportunity-action-meta">
              <span>{visualOpportunity.duration}</span>
              <span>{visualOpportunity.rightsLabel}</span>
              <span>
                {visualOpportunity.exclusivityLabel}
              </span>
            </div>

            <InterestButton opportunitySlug={opportunity.slug} />

            <div className="mt-4 text-center text-xs leading-5 text-[var(--runsys-muted)]">
              No purchase is created. Your interest simply
              opens the conversation.
            </div>
          </GlassSurface>
        </div>
      </section>
    </main>
  );
}
