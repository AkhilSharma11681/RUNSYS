import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getRepository } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "Discover performance, recovery, nutrition, apparel, and technology brands active across RUNSYS.",
};

export default async function BrandsPage() {
  const repository = getRepository();
  const [brands, opportunities] = await Promise.all([
    repository.getBrands(),
    repository.getOpportunities(),
  ]);

  const featured = brands[0];
  const secondary = brands.slice(1);

  const opportunitiesByBrand = new Map<string, number>();

  for (const opportunity of opportunities) {
    opportunitiesByBrand.set(
      opportunity.brandSlug,
      (opportunitiesByBrand.get(opportunity.brandSlug) ?? 0) + 1,
    );
  }

  return (
    <main className="brands-world">
      <section className="brands-entry">
        <div className="brands-entry-top">
          <span>RUNSYS / BRANDS</span>
          <span>THE OTHER SIDE</span>
        </div>

        <div className="brands-entry-copy">
          <div className="runsys-micro text-[var(--runsys-muted)]">
            Brands × Athletes × Events
          </div>

          <h1 className="brands-entry-title runsys-display">
            The brands
            <br />
            behind motion.
          </h1>

          <p>
            Discover the companies entering sport through people, places,
            products and experiences.
          </p>
        </div>

        <div className="brands-entry-bottom">
          <span>{brands.length.toString().padStart(2, "0")} BRANDS</span>
          <span>SCROLL TO EXPLORE</span>
        </div>
      </section>

      {featured ? (
        <section className="brands-featured">
          <Link
            href={`/brands/${featured.slug}`}
            className="brands-featured-media"
          >
            <Image
              src={featured.image}
              alt={featured.name}
              fill
              sizes="100vw"
              className="object-cover"
            />

            <div className="brands-featured-overlay" />

            <div className="brands-featured-content">
              <div className="runsys-micro">
                01 / {featured.category}
              </div>

              <h2 className="brands-featured-title runsys-display">
                {featured.name}
              </h2>

              <p>{featured.description}</p>

              <div className="brands-featured-network">
                <span>
                  <strong>{featured.athleteSlugs.length.toString().padStart(2, "0")}</strong>
                  ATHLETES
                </span>
                <span>
                  <strong>{featured.eventSlugs.length.toString().padStart(2, "0")}</strong>
                  EVENTS
                </span>
                <span>
                  <strong>{(opportunitiesByBrand.get(featured.slug) ?? 0).toString().padStart(2, "0")}</strong>
                  OPPORTUNITIES
                </span>
              </div>

              <span className="brands-featured-link">
                Enter brand world ↗
              </span>
            </div>
          </Link>
        </section>
      ) : null}

      <section className="brands-landscape">
        <div className="brands-landscape-heading">
          <div>
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Brand landscape
            </div>

            <h2 className="brands-landscape-title runsys-display">
              Different
              <br />
              ways into sport.
            </h2>
          </div>

          <p>
            Every brand has a different relationship with athletes, events and
            commercial opportunities.
          </p>
        </div>

        <div className="brands-landscape-grid">
          {secondary.map((brand, index) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className={`brands-landscape-card ${
                index % 3 === 1 ? "brands-landscape-card-offset" : ""
              }`}
            >
              <div className="brands-landscape-media">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="brands-landscape-overlay" />

              <div className="brands-landscape-card-content">
                <div className="brands-landscape-card-top">
                  <span>{`0${index + 2}`}</span>
                  <span>{brand.category}</span>
                </div>

                <div>
                  <h3>{brand.name}</h3>
                  <p>{brand.location}</p>
                </div>

                <div className="brands-landscape-network">
                  <span>{brand.athleteSlugs.length} ATHLETES</span>
                  <span>{brand.eventSlugs.length} EVENTS</span>
                  <span>{opportunitiesByBrand.get(brand.slug) ?? 0} OPPORTUNITIES</span>
                </div>

                <span className="brands-landscape-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="brands-bridge">
        <div className="brands-bridge-line" />

        <div>
          <div className="runsys-micro text-[var(--runsys-muted)]">
            Connected system
          </div>

          <h2 className="brands-bridge-title runsys-display">
            A brand is
            <br />
            a relationship.
          </h2>

          <p>
            Follow a brand into the athletes it supports, the events it enters
            and the opportunities it creates.
          </p>
        </div>

        <div className="brands-bridge-index">
          <span>BRANDS / NETWORK</span>
          <span>↘</span>
        </div>
      </section>
    </main>
  );
}
