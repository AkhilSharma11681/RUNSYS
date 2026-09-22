import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { EntityLink } from "@/components/spatial/EntityLink";
import { GlassSurface } from "@/components/materials/GlassSurface";
import { DataSurface } from "@/components/materials/DataSurface";
import { Signal } from "@/components/ui/Signal";
import { getRepository } from "@/lib/repository";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const brands = await getRepository().getBrands();

  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getRepository().getBrand(slug);

  return brand
    ? {
        title: brand.name,
        description: brand.description,
      }
    : {
        title: "Brand not found",
      };
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const repository = getRepository();

  const brand = await repository.getBrand(slug);

  if (!brand) {
    notFound();
  }

  const [athletes, events, opportunities] = await Promise.all([
    repository.getAthletes(),
    repository.getEvents(),
    repository.getOpportunities(),
  ]);

  const brandAthletes = athletes.filter((athlete) =>
    brand.athleteSlugs.includes(athlete.slug),
  );

  const brandEvents = events.filter((event) =>
    brand.eventSlugs.includes(event.slug),
  );

  const brandOpportunities = opportunities.filter(
    (opportunity) => opportunity.brandSlug === brand.slug,
  );

  return (
    <article className="brand-immersion">
      <section className="brand-immersion-hero">
        <div className="brand-immersion-media">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="brand-immersion-atmosphere" />

        <div className="brand-immersion-top">
          <EntityLink href="/brands" className="world-link">
            ← Brands
          </EntityLink>

          <span className="brand-world-index">
            BRAND / ENTITY
          </span>
        </div>

        <div className="brand-immersion-identity">
          <div className="brand-immersion-kicker">
            <Signal tone="neutral">{brand.category}</Signal>
            <span>{brand.location}</span>
          </div>

          <h1 className="brand-immersion-title runsys-display">
            {brand.name}
          </h1>

          <p className="brand-immersion-statement">
            {brand.description}
          </p>
        </div>

        <div className="brand-immersion-context">
          <GlassSurface variant="soft">
            <div className="brand-context-label">
              CURRENT NETWORK
            </div>

            <div className="brand-context-row">
              <span>ATHLETES</span>
              <strong>{brandAthletes.length.toString().padStart(2, "0")}</strong>
            </div>

            <div className="brand-context-row">
              <span>EVENTS</span>
              <strong>{brandEvents.length.toString().padStart(2, "0")}</strong>
            </div>

            <div className="brand-context-row">
              <span>OPEN</span>
              <strong>{brandOpportunities.length.toString().padStart(2, "0")}</strong>
            </div>
          </GlassSurface>
        </div>

        <div className="brand-immersion-scroll">
          <span>SCROLL</span>
          <span aria-hidden="true" />
        </div>
      </section>

      <section className="brand-positioning-world">
        <div className="brand-positioning-intro">
          <div className="runsys-micro text-[var(--runsys-muted)]">
            Brand presence
          </div>

          <h2 className="brand-section-title runsys-display">
            The brand
            <br />
            enters sport.
          </h2>

          <p>
            RUNSYS maps where a brand appears, who it works with and which
            sporting environments it enters.
          </p>
        </div>

        <DataSurface className="brand-positioning-data">
          <div className="brand-data-row">
            <span>Category</span>
            <strong>{brand.category}</strong>
          </div>

          <div className="brand-data-row">
            <span>Location</span>
            <strong>{brand.location}</strong>
          </div>

          <div className="brand-data-row">
            <span>Athlete relationships</span>
            <strong>{brandAthletes.length}</strong>
          </div>

          <div className="brand-data-row">
            <span>Event relationships</span>
            <strong>{brandEvents.length}</strong>
          </div>

          <div className="brand-data-row">
            <span>Commercial opportunities</span>
            <strong>{brandOpportunities.length}</strong>
          </div>
        </DataSurface>
      </section>

      <section className="brand-network-world">
        <div className="brand-network-heading">
          <div>
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Connected world
            </div>

            <h2 className="brand-section-title runsys-display">
              People,
              <br />
              places, moments.
            </h2>
          </div>

          <p>
            Every relationship is an entry point into another part of the
            RUNSYS system.
          </p>
        </div>

        <div className="brand-network-grid">
          <div className="brand-network-panel">
            <div className="brand-network-panel-top">
              <span>01 / ATHLETES</span>
              <span>{brandAthletes.length.toString().padStart(2, "0")}</span>
            </div>

            <div className="brand-network-list">
              {brandAthletes.length ? (
                brandAthletes.map((athlete) => (
                  <EntityLink
                    key={athlete.id}
                    href={`/athletes/${athlete.slug}`}
                    className="brand-network-link"
                  >
                    <div>
                      <strong>{athlete.name}</strong>
                      <span>{athlete.discipline}</span>
                    </div>
                    <span aria-hidden="true">↗</span>
                  </EntityLink>
                ))
              ) : (
                <div className="brand-empty-state">
                  No athlete relationships yet.
                </div>
              )}
            </div>
          </div>

          <div className="brand-network-panel brand-network-panel-offset">
            <div className="brand-network-panel-top">
              <span>02 / EVENTS</span>
              <span>{brandEvents.length.toString().padStart(2, "0")}</span>
            </div>

            <div className="brand-network-list">
              {brandEvents.length ? (
                brandEvents.map((event) => (
                  <EntityLink
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="brand-network-link"
                  >
                    <div>
                      <strong>{event.name}</strong>
                      <span>{event.location}</span>
                    </div>
                    <span aria-hidden="true">↗</span>
                  </EntityLink>
                ))
              ) : (
                <div className="brand-empty-state">
                  No event relationships yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="brand-opportunity-world">
        <div className="brand-opportunity-intro">
          <div>
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Commercial layer
            </div>

            <h2 className="brand-section-title runsys-display">
              Where the
              <br />
              relationship opens.
            </h2>
          </div>

          <p>
            Sponsorship opportunities turn the brand relationship into a
            defined commercial object.
          </p>
        </div>

        <div className="brand-opportunity-list">
          {brandOpportunities.length ? (
            brandOpportunities.map((opportunity) => (
              <EntityLink
                key={opportunity.id}
                href={`/opportunities/${opportunity.slug}`}
                className="brand-opportunity-row"
              >
                <div className="brand-opportunity-main">
                  <Signal
                    tone={
                      opportunity.status === "AVAILABLE"
                        ? "available"
                        : "neutral"
                    }
                  >
                    {opportunity.status}
                  </Signal>

                  <h3>{opportunity.title}</h3>

                  <p>{opportunity.description}</p>
                </div>

                <div className="brand-opportunity-meta">
                  <div>
                    <span>Inventory</span>
                    <strong>{opportunity.inventoryType}</strong>
                  </div>
                  <div>
                    <span>Duration</span>
                    <strong>{opportunity.duration}</strong>
                  </div>
                  <span aria-hidden="true" className="brand-opportunity-arrow">
                    ↗
                  </span>
                </div>
              </EntityLink>
            ))
          ) : (
            <GlassSurface variant="dense">
              <div className="brand-empty-opportunity">
                <div className="runsys-micro text-[var(--runsys-muted)]">
                  No open opportunities
                </div>

                <p>
                  This brand currently has no commercial opportunity published
                  through RUNSYS.
                </p>
              </div>
            </GlassSurface>
          )}
        </div>
      </section>
    </article>
  );
}
