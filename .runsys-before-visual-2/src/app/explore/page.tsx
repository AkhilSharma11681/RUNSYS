import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getRepository } from "@/lib/repository";

export default async function ExplorePage() {
  const repository = getRepository();
  const [athletes, events, brands, opportunities] = await Promise.all([
    repository.getAthletes(),
    repository.getEvents(),
    repository.getBrands(),
    repository.getOpportunities(),
  ]);

  return (
    <div>
      <section className="bg-[var(--runsys-ink)] py-24 text-white md:py-36">
        <Container>
          <div className="runsys-label text-[var(--runsys-accent)]">
            EXPLORE / FOLLOW THE CONNECTION
          </div>

          <h1 className="runsys-display mt-5 text-[clamp(4rem,10vw,9rem)]">
            DON&apos;T
            <br />
            JUST BROWSE.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
            Move through the network. Every athlete, event, brand, and
            opportunity is connected to something else.
          </p>
        </Container>
      </section>

      <section className="runsys-section">
        <Container>
          <div className="grid gap-0 md:grid-cols-2">
            <Link
              href="/athletes"
              className="group border-t border-[var(--runsys-border)] p-6 md:border-r"
            >
              <div className="runsys-label">01 / ATHLETES</div>
              <h2 className="runsys-display mt-16 text-6xl md:text-8xl group-hover:text-[var(--runsys-accent)]">
                PEOPLE
                <br />
                MOVE.
              </h2>
              <div className="runsys-label mt-10">{athletes.length} people →</div>
            </Link>

            <Link
              href="/events"
              className="group border-t border-[var(--runsys-border)] p-6"
            >
              <div className="runsys-label">02 / EVENTS</div>
              <h2 className="runsys-display mt-16 text-6xl md:text-8xl group-hover:text-[var(--runsys-accent)]">
                PLACES
                <br />
                MOVE.
              </h2>
              <div className="runsys-label mt-10">{events.length} events →</div>
            </Link>

            <Link
              href="/brands"
              className="group border-t border-[var(--runsys-border)] p-6 md:border-r"
            >
              <div className="runsys-label">03 / BRANDS</div>
              <h2 className="runsys-display mt-16 text-6xl md:text-8xl group-hover:text-[var(--runsys-accent)]">
                IDEAS
                <br />
                MOVE.
              </h2>
              <div className="runsys-label mt-10">{brands.length} brands →</div>
            </Link>

            <Link
              href="/opportunities"
              className="group border-t border-[var(--runsys-border)] p-6"
            >
              <div className="runsys-label">04 / OPPORTUNITIES</div>
              <h2 className="runsys-display mt-16 text-6xl md:text-8xl group-hover:text-[var(--runsys-accent)]">
                SPACES
                <br />
                MOVE.
              </h2>
              <div className="runsys-label mt-10">
                {opportunities.length} opportunities →
              </div>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
