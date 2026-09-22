import Link from "next/link";
import { AthleteWorld } from "@/components/discovery/AthleteWorld";
import { EventWorld } from "@/components/events/EventWorld";
import {
  getVisualAthletes,
  getVisualEvents,
} from "@/lib/visual-repository";
import { getRepository } from "@/lib/repository";

export default async function ExplorePage() {
  const repository = getRepository();

  const [athletes, events, brands, opportunities] =
    await Promise.all([
      getVisualAthletes(),
      getVisualEvents(),
      repository.getBrands(),
      repository.getOpportunities(),
    ]);

  const featuredAthlete = athletes[0];
  const featuredEvent = events[0];
  const featuredBrand = brands[0];
  const featuredOpportunity = opportunities[0];

  return (
    <main className="explore-world">
      <section className="explore-entry">
        <div className="explore-entry-index">
          <span>RUNSYS / EXPLORE</span>
          <span>01 / 04</span>
        </div>

        <div className="explore-entry-copy">
          <div className="runsys-micro text-[var(--runsys-muted)]">
            Athlete × Brand × Event
          </div>

          <h1 className="explore-entry-title runsys-display">
            Enter the
            <br />
            world.
          </h1>

          <p className="explore-entry-description">
            Discover the people, events and commercial relationships shaping
            modern sport.
          </p>
        </div>

        <div className="explore-entry-meta">
          <span>DISCOVERY SYSTEM</span>
          <div className="explore-entry-actions">
            <Link href="/athletes">Athletes ↗</Link>
            <Link href="/events">Events ↗</Link>
            <Link href="/brands">Brands ↗</Link>
            <Link href="/opportunities">Opportunities ↗</Link>
            <span>SCROLL TO MOVE</span>
          </div>
        </div>
      </section>

      {featuredAthlete ? (
        <section className="explore-athlete-entry">
          <div className="explore-world-label">
            <span>01</span>
            <span>ATHLETES</span>
          </div>

          <AthleteWorld athletes={athletes} />
        </section>
      ) : null}

      {featuredEvent ? (
        <section className="explore-event-entry">
          <div className="explore-world-label">
            <span>02</span>
            <span>EVENTS</span>
          </div>

          <EventWorld event={featuredEvent} />
        </section>
      ) : null}

      {featuredBrand || featuredOpportunity ? (
        <section className="explore-network-entry">
          <div className="explore-network-orbit" aria-hidden="true">
            <span className="explore-network-orbit-line explore-network-orbit-line-a" />
            <span className="explore-network-orbit-line explore-network-orbit-line-b" />
            <span className="explore-network-orbit-node explore-network-orbit-node-a" />
            <span className="explore-network-orbit-node explore-network-orbit-node-b" />
            <span className="explore-network-orbit-node explore-network-orbit-node-c" />
          </div>
          <div className="explore-world-label">
            <span>03</span>
            <span>COMMERCIAL NETWORK</span>
          </div>

          <div className="explore-network-copy">
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Live from RUNSYS
            </div>

            <h2 className="explore-bridge-title runsys-display">
              Sport becomes
              <br />
              opportunity.
            </h2>

            <p>
              Move from the sporting environment into the brands and
              commercial opportunities already connected to it.
            </p>

            <div className="explore-network-signals">
              <span>ATHLETE</span>
              <span>EVENT</span>
              <span>BRAND</span>
              <span>OPPORTUNITY</span>
            </div>

            <div className="explore-network-actions">
              {featuredBrand ? (
                <Link href={`/brands/${featuredBrand.slug}`}>
                  Enter {featuredBrand.name} ↗
                </Link>
              ) : null}

              {featuredOpportunity ? (
                <Link href={`/opportunities/${featuredOpportunity.slug}`}>
                  Explore opportunity ↗
                </Link>
              ) : null}
            </div>

            <div className="explore-network-field">
              {brands.slice(0, 4).map((brand, index) => (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.slug}`}
                  className={`explore-network-node explore-network-node-${index + 1}`}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{brand.name}</strong>
                  <small>BRAND</small>
                </Link>
              ))}

              {opportunities.slice(0, 4).map((opportunity, index) => (
                <Link
                  key={opportunity.id}
                  href={`/opportunities/${opportunity.slug}`}
                  className={`explore-network-node explore-network-opportunity-node-${index + 1}`}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{opportunity.title}</strong>
                  <small>{opportunity.inventoryType}</small>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="explore-bridge">
        <div className="explore-bridge-line" />

        <div className="explore-bridge-copy">
          <div className="runsys-micro text-[var(--runsys-muted)]">
            The system is connected
          </div>

          <h2 className="explore-bridge-title runsys-display">
            Follow the
            <br />
            relationship.
          </h2>

          <p>
            An athlete leads to an event. An event leads to a brand. A brand
            leads to an opportunity. Keep moving through the network.
          </p>
        </div>

        <div className="explore-bridge-index">
          <span>04</span>
          <span>RELATIONSHIPS</span>
        </div>
      </section>
    </main>
  );
}
