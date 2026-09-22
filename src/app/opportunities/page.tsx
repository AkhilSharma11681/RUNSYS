import type { Metadata } from "next";
import Link from "next/link";
import type { InventoryType } from "@/types/domain";
import Image from "next/image";
import { getRepository } from "@/lib/repository";
import { EntityLink } from "@/components/spatial/EntityLink";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Explore live sponsorship opportunities connecting athletes, brands, events, inventory, and time.",
};

type OpportunitiesPageProps = {
  searchParams: Promise<{
    inventory?: string;
  }>;
};

const inventoryLenses: Array<{
  value: InventoryType | "ALL";
  label: string;
}> = [
  { value: "ALL", label: "All" },
  { value: "BODY", label: "Body" },
  { value: "EVENT", label: "Event" },
  { value: "CONTENT", label: "Content" },
  { value: "PRODUCT", label: "Product" },
  { value: "EXPERIENCE", label: "Experience" },
  { value: "ATHLETE", label: "Athlete" },
];

export default async function OpportunitiesPage({
  searchParams,
}: OpportunitiesPageProps) {
  const params = await searchParams;
  const requestedInventory = params.inventory?.toUpperCase();
  const activeInventory = inventoryLenses.some(
    (lens) => lens.value === requestedInventory,
  )
    ? (requestedInventory as InventoryType)
    : "ALL";

  const repository = getRepository();

  const [allOpportunities, athletes, brands, events] = await Promise.all([
    repository.getOpportunities(),
    repository.getAthletes(),
    repository.getBrands(),
    repository.getEvents(),
  ]);

  const opportunities =
    activeInventory === "ALL"
      ? allOpportunities
      : allOpportunities.filter(
          (opportunity) => opportunity.inventoryType === activeInventory,
        );

  const featured = opportunities[0];
  const secondary = opportunities.slice(1);

  const athleteBySlug = new Map(athletes.map((item) => [item.slug, item]));
  const brandBySlug = new Map(brands.map((item) => [item.slug, item]));
  const eventBySlug = new Map(events.map((item) => [item.slug, item]));

  return (
    <main className="opportunities-world">
      <section className="opportunities-entry">
        <div className="opportunities-entry-top">
          <span>RUNSYS / OPPORTUNITIES</span>
          <span>COMMERCIAL INVENTORY</span>
        </div>

        <div className="opportunities-entry-copy">
          <div className="runsys-micro text-[var(--runsys-muted)]">
            Athlete × Brand × Event × Time
          </div>

          <h1 className="opportunities-entry-title runsys-display">
            Find the
            <br />
            connection.
          </h1>

          <p>
            Sponsorship becomes concrete when the person, place, inventory,
            rights and timing are all connected.
          </p>
        </div>

        <div className="opportunities-entry-bottom">
          <span>
            {opportunities.length.toString().padStart(2, "0")} OPEN OBJECTS
          </span>
          <span>SCROLL TO EXPLORE</span>
        </div>
      </section>

      <nav
        className="opportunity-lens"
        aria-label="Filter opportunities by inventory type"
      >
        <div className="opportunity-lens-label">
          <span>VIEW BY</span>
          <span>INVENTORY</span>
        </div>

        <div className="opportunity-lens-options">
          {inventoryLenses.map((lens) => {
            const active = lens.value === activeInventory;

            return (
              <Link
                key={lens.value}
                href={
                  lens.value === "ALL"
                    ? "/opportunities"
                    : `/opportunities?inventory=${lens.value}`
                }
                aria-current={active ? "page" : undefined}
                className={`opportunity-lens-link ${
                  active ? "opportunity-lens-link-active" : ""
                }`}
              >
                <span>{lens.label}</span>
                <span>
                  {lens.value === "ALL"
                    ? allOpportunities.length
                    : allOpportunities.filter(
                        (opportunity) =>
                          opportunity.inventoryType === lens.value,
                      ).length}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {featured ? (
        <section className="opportunities-featured">
          <Link
            href={`/opportunities/${featured.slug}`}
            className="opportunities-featured-object"
          >
            <div className="opportunities-featured-media">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className="opportunities-featured-overlay" />

            <div className="opportunities-featured-content">
              <div className="opportunities-featured-top">
                <span>01 / {featured.inventoryType}</span>
                <span>{featured.status}</span>
              </div>

              <div>
                <div className="runsys-micro">Commercial object</div>

                <h2 className="opportunities-featured-title runsys-display">
                  {featured.title}
                </h2>

                <p>{featured.description}</p>

                <div className="opportunity-index-relationships">
                  {athleteBySlug.get(featured.athleteSlug) ? (
                    <EntityLink
                      href={`/athletes/${featured.athleteSlug}`}
                      transitionName={`athlete-${featured.athleteSlug}`}
                    >
                      {athleteBySlug.get(featured.athleteSlug)?.name}
                    </EntityLink>
                  ) : null}

                  {eventBySlug.get(featured.eventSlug) ? (
                    <EntityLink
                      href={`/events/${featured.eventSlug}`}
                      transitionName={`event-${featured.eventSlug}`}
                    >
                      {eventBySlug.get(featured.eventSlug)?.name}
                    </EntityLink>
                  ) : null}

                  {brandBySlug.get(featured.brandSlug) ? (
                    <EntityLink
                      href={`/brands/${featured.brandSlug}`}
                      transitionName={`brand-${featured.brandSlug}`}
                    >
                      {brandBySlug.get(featured.brandSlug)?.name}
                    </EntityLink>
                  ) : null}
                </div>

                <span className="opportunities-featured-link">
                  Enter opportunity ↗
                </span>
              </div>
            </div>
          </Link>
        </section>
      ) : null}

      <section className="opportunities-landscape">
        <div className="opportunities-landscape-heading">
          <div className="opportunities-active-lens">
            {activeInventory === "ALL"
              ? "All commercial inventory"
              : `${activeInventory} inventory`}
          </div>
          <div>
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Commercial landscape
            </div>

            <h2 className="opportunities-landscape-title runsys-display">
              Different
              <br />
              forms of value.
            </h2>
          </div>

          <p>
            Body placement, product integration, content and experience can
            all become sponsorship inventory when the relationship is defined.
          </p>
        </div>

        {featured ? (
          <div className="opportunities-grid">
            {secondary.map((opportunity, index) => (
            <Link
              key={opportunity.id}
              href={`/opportunities/${opportunity.slug}`}
              className={`opportunity-landscape-card ${
                index % 2 === 1 ? "opportunity-landscape-card-offset" : ""
              }`}
            >
              <div className="opportunity-landscape-media">
                <Image
                  src={opportunity.image}
                  alt={opportunity.title}
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="opportunity-landscape-overlay" />

              <div className="opportunity-landscape-content">
                <div className="opportunity-landscape-top">
                  <span>{`0${index + 2}`}</span>
                  <span>{opportunity.inventoryType}</span>
                </div>

                <div>
                  <div className="runsys-micro">
                    {opportunity.status}
                  </div>

                  <h3>{opportunity.title}</h3>

                  <div className="opportunity-landscape-meta">
                    <span>{opportunity.duration}</span>
                    <span>{opportunity.availability}</span>
                  </div>

                  <div className="opportunity-index-relationships opportunity-index-relationships-compact">
                    {athleteBySlug.get(opportunity.athleteSlug) ? (
                      <span>
                        {athleteBySlug.get(opportunity.athleteSlug)?.name}
                      </span>
                    ) : null}
                    {eventBySlug.get(opportunity.eventSlug) ? (
                      <span>
                        {eventBySlug.get(opportunity.eventSlug)?.name}
                      </span>
                    ) : null}
                    {brandBySlug.get(opportunity.brandSlug) ? (
                      <span>
                        {brandBySlug.get(opportunity.brandSlug)?.name}
                      </span>
                    ) : null}
                  </div>
                </div>

                <span className="opportunity-landscape-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </Link>
            ))}
          </div>
        ) : (
          <div className="opportunities-empty">
            <div className="runsys-micro">No open objects</div>
            <p>
              There are no active opportunities in this inventory category
              right now.
            </p>
            <Link href="/opportunities">Return to all opportunities ↗</Link>
          </div>
        )}
      </section>

      <section className="opportunities-definition">
        <div className="opportunities-definition-line" />

        <div>
          <div className="runsys-micro text-[var(--runsys-muted)]">
            Commercial object
          </div>

          <h2 className="opportunities-definition-title runsys-display">
            Not a listing.
            <br />
            A relationship.
          </h2>

          <p>
            Every opportunity carries an athlete, brand, event, inventory
            type, timing, deliverables, rights and commercial terms.
          </p>
        </div>

        <div className="opportunities-definition-index">
          <span>ATHLETE × BRAND × EVENT</span>
          <span>↘</span>
        </div>
      </section>
    </main>
  );
}
