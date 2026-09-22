import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getRepository } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore the races, competitions, and events where athletes, brands, and sponsorship opportunities connect.",
};

export default async function EventsPage() {
  const events = await getRepository().getEvents();
  const featured = events[0];
  const secondary = events.slice(1);

  return (
    <main className="events-world">
      <section className="events-entry">
        <div className="events-entry-top">
          <span>RUNSYS / EVENTS</span>
          <span>PLACES IN MOTION</span>
        </div>

        <div className="events-entry-copy">
          <div className="runsys-micro text-[var(--runsys-muted)]">
            Athlete × Brand × Place × Time
          </div>

          <h1 className="events-entry-title runsys-display">
            Where
            <br />
            sport happens.
          </h1>

          <p>
            Events are not just dates on a calendar. They are the places where
            athletes, brands, audiences and commercial relationships converge.
          </p>
        </div>

        <div className="events-entry-bottom">
          <span>{events.length.toString().padStart(2, "0")} EVENTS</span>
          <span>EXPLORE THE CALENDAR</span>
        </div>
      </section>

      {featured ? (
        <section className="events-featured">
          <Link
            href={`/events/${featured.slug}`}
            className="events-featured-object"
          >
            <div className="events-featured-media">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className="events-featured-overlay" />

            <div className="events-featured-content">
              <div className="events-featured-top">
                <span>01 / {featured.sport}</span>
                <span>{featured.location}</span>
              </div>

              <div>
                <div className="runsys-micro">Featured event</div>

                <h2 className="events-featured-title runsys-display">
                  {featured.name}
                </h2>

                <p>{featured.description}</p>

                <div className="events-featured-network">
                  <span>{featured.athleteSlugs.length} ATHLETES</span>
                  <span>{featured.brandSlugs.length} BRANDS</span>
                  <span>{featured.date}</span>
                </div>

                <span className="events-featured-link">
                  Enter event world ↗
                </span>
              </div>
            </div>
          </Link>
        </section>
      ) : null}

      <section className="events-landscape">
        <div className="events-landscape-heading">
          <div>
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Event landscape
            </div>

            <h2 className="events-landscape-title runsys-display">
              Different
              <br />
              arenas.
            </h2>
          </div>

          <p>
            Every event creates a different network of athletes, brands,
            audiences and opportunities.
          </p>
        </div>

        <div className="events-grid">
          {secondary.map((event, index) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className={`event-landscape-card ${
                index % 2 === 1 ? "event-landscape-card-offset" : ""
              }`}
            >
              <div className="event-landscape-media">
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="event-landscape-overlay" />

              <div className="event-landscape-content">
                <div className="event-landscape-top">
                  <span>{`0${index + 2}`}</span>
                  <span>{event.sport}</span>
                </div>

                <div>
                  <div className="runsys-micro">{event.location}</div>

                  <h3>{event.name}</h3>

                  <div className="event-landscape-meta">
                    <span>{event.date}</span>
                    <span>{event.athleteSlugs.length} athletes</span>
                    <span>{event.brandSlugs.length} brands</span>
                  </div>

                  <div className="event-landscape-network">
                    <span>{event.location}</span>
                    <span>{event.sport}</span>
                    {event.athleteSlugs.slice(0, 2).map((athlete) => (
                      <span key={athlete}>
                        {athlete.replaceAll("-", " ")}
                      </span>
                    ))}
                    {event.brandSlugs.slice(0, 2).map((brand) => (
                      <span key={brand}>
                        {brand.replaceAll("-", " ")}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="event-landscape-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="events-definition">
        <div className="events-definition-line" />

        <div>
          <div className="runsys-micro text-[var(--runsys-muted)]">
            The event layer
          </div>

          <h2 className="events-definition-title runsys-display">
            Not a date.
            <br />
            A network.
          </h2>

          <p>
            An event brings together the people, brands and commercial
            opportunities that give sport its context.
          </p>
        </div>

        <div className="events-definition-index">
          <span>ATHLETE × BRAND × PLACE</span>
          <span>↘</span>
        </div>
      </section>
    </main>
  );
}
