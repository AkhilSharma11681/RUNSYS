import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getRepository } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Athletes",
  description:
    "Discover athletes, their journeys, events, brand relationships, and available sponsorship opportunities.",
};

export default async function AthletesPage() {
  const athletes = await getRepository().getAthletes();
  const featured = athletes[0];
  const secondary = athletes.slice(1);

  return (
    <main className="athletes-world">
      <section className="athletes-entry">
        <div className="athletes-entry-top">
          <span>RUNSYS / ATHLETES</span>
          <span>PEOPLE IN MOTION</span>
        </div>

        <div className="athletes-entry-copy">
          <div className="runsys-micro text-[var(--runsys-muted)]">
            Person × Discipline × Journey × Network
          </div>

          <h1 className="athletes-entry-title runsys-display">
            Meet the
            <br />
            people.
          </h1>

          <p>
            Athletes are not profiles here. They are people with journeys,
            disciplines, events, brands and opportunities moving through the
            same world.
          </p>
        </div>

        <div className="athletes-entry-bottom">
          <span>{athletes.length.toString().padStart(2, "0")} ATHLETES</span>
          <span>DISCOVER / ENTER / FOLLOW</span>
        </div>
      </section>

      {featured ? (
        <section className="athletes-featured">
          <Link
            href={`/athletes/${featured.slug}`}
            className="athletes-featured-object"
          >
            <div className="athletes-featured-media">
              <Image
                src={featured.heroImage}
                alt={featured.name}
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
            </div>

            <div className="athletes-featured-overlay" />

            <div className="athletes-featured-content">
              <div className="athletes-featured-top">
                <span>01 / {featured.sport}</span>
                <span>{featured.location}</span>
              </div>

              <div>
                <div className="runsys-micro">{featured.status}</div>

                <h2 className="athletes-featured-title runsys-display">
                  {featured.name}
                </h2>

                <p>{featured.bio}</p>

                <div className="athletes-featured-network">
                  <span>{featured.events.length} EVENTS</span>
                  <span>{featured.brands.length} BRANDS</span>
                  <span>{featured.sponsorshipHistory.length} PARTNERSHIPS</span>
                </div>

                <span className="athletes-featured-link">
                  Enter athlete world ↗
                </span>
              </div>
            </div>
          </Link>
        </section>
      ) : null}

      <section className="athletes-landscape">
        <div className="athletes-landscape-heading">
          <div>
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Athlete landscape
            </div>

            <h2 className="athletes-landscape-title runsys-display">
              Different
              <br />
              journeys.
            </h2>
          </div>

          <p>
            Different disciplines, places and stages of progression. Each
            athlete enters the network from a different point.
          </p>
        </div>

        <div className="athletes-grid">
          {secondary.map((athlete, index) => (
            <Link
              key={athlete.id}
              href={`/athletes/${athlete.slug}`}
              className={`athlete-landscape-card ${
                index % 2 === 1 ? "athlete-landscape-card-offset" : ""
              }`}
            >
              <div className="athlete-landscape-media">
                <Image
                  src={athlete.heroImage}
                  alt={athlete.name}
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="athlete-landscape-overlay" />

              <div className="athlete-landscape-content">
                <div className="athlete-landscape-top">
                  <span>{`0${index + 2}`}</span>
                  <span>{athlete.discipline}</span>
                </div>

                <div>
                  <div className="runsys-micro">
                    {athlete.location}
                  </div>

                  <h3>{athlete.name}</h3>

                  <div className="athlete-landscape-meta">
                    <span>{athlete.sport}</span>
                    <span>{athlete.status}</span>
                    <span>{athlete.events.length} events</span>
                    <span>{athlete.brands.length} brands</span>
                  </div>

                  <div className="athlete-landscape-network">
                    {athlete.events.slice(0, 2).map((event) => (
                      <span key={event}>{event.replaceAll("-", " ")}</span>
                    ))}
                    {athlete.brands.slice(0, 2).map((brand) => (
                      <span key={brand}>{brand.replaceAll("-", " ")}</span>
                    ))}
                  </div>
                </div>

                <span className="athlete-landscape-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="athletes-definition">
        <div className="athletes-definition-line" />

        <div>
          <div className="runsys-micro text-[var(--runsys-muted)]">
            The athlete layer
          </div>

          <h2 className="athletes-definition-title runsys-display">
            Not a profile.
            <br />
            A world.
          </h2>

          <p>
            Every athlete carries a journey, a network of events and brands,
            and the commercial possibilities that emerge from those
            relationships.
          </p>
        </div>

        <div className="athletes-definition-index">
          <span>PERSON × JOURNEY × NETWORK</span>
          <span>↘</span>
        </div>
      </section>
    </main>
  );
}
