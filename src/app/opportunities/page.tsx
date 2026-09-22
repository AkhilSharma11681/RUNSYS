import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getRepository } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Explore live sponsorship opportunities connecting athletes, brands, events, inventory, and time.",
};

export default async function OpportunitiesPage() {
  const opportunities = await getRepository().getOpportunities();
  const featured = opportunities[0];
  const secondary = opportunities.slice(1);

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
                </div>

                <span className="opportunity-landscape-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
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
