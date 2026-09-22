import Link from "next/link";
import type { Athlete, Brand, Event } from "@/types/domain";

type Props = {
  athlete: Athlete;
  events: Event[];
  brands: Brand[];
};

export function AthleteRelationships({ athlete, events, brands }: Props) {
  const athleteEvents = events.filter((event) =>
    athlete.events.includes(event.slug),
  );

  const athleteBrands = brands.filter((brand) =>
    athlete.brands.includes(brand.slug),
  );

  return (
    <section className="runsys-section bg-[var(--runsys-bone-secondary)]">
      <div className="runsys-container">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <div className="runsys-label text-[var(--runsys-accent)]">
              02 / EVENTS
            </div>
            <h2 className="runsys-display mt-4 text-6xl md:text-7xl">
              WHERE
              <br />
              THEY MOVE.
            </h2>

            <div className="mt-10">
              {athleteEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="group block border-t border-[var(--runsys-border)] py-5 last:border-b"
                >
                  <div className="runsys-label text-[var(--runsys-muted)]">
                    {event.location} / {event.date}
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-5">
                    <h3 className="text-2xl font-bold tracking-[-0.04em]">
                      {event.name}
                    </h3>
                    <span className="text-[var(--runsys-accent)] transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="runsys-label text-[var(--runsys-accent)]">
              03 / BRANDS
            </div>
            <h2 className="runsys-display mt-4 text-6xl md:text-7xl">
              WHO
              <br />
              CONNECTS.
            </h2>

            <div className="mt-10">
              {athleteBrands.length > 0 ? (
                athleteBrands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/brands/${brand.slug}`}
                    className="group block border-t border-[var(--runsys-border)] py-5 last:border-b"
                  >
                    <div className="runsys-label text-[var(--runsys-muted)]">
                      {brand.category}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-5">
                      <h3 className="text-2xl font-bold tracking-[-0.04em]">
                        {brand.name}
                      </h3>
                      <span className="text-[var(--runsys-accent)] transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="border-y border-[var(--runsys-border)] py-6 text-sm text-[var(--runsys-muted)]">
                  No active brand relationship currently listed.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
