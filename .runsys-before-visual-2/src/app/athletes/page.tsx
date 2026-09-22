import type { Metadata } from "next";
import { AthleteCard } from "@/components/athletes/AthleteCard";
import { Container } from "@/components/ui/Container";
import { getRepository } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Athletes",
  description:
    "Discover athletes, their journeys, events, brand relationships, and available sponsorship opportunities.",
};

export default async function AthletesPage() {
  const athletes = await getRepository().getAthletes();

  return (
    <div>
      <section className="bg-[var(--runsys-ink)] py-24 text-white md:py-36">
        <Container>
          <div className="max-w-6xl">
            <div className="runsys-label text-[var(--runsys-accent)]">
              PEOPLE / ATHLETES
            </div>
            <h1 className="runsys-display mt-5 text-[clamp(4rem,10vw,9rem)]">
              PEOPLE
              <br />
              IN MOTION.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
              Athletes are not profiles here. They are the people, stories,
              events, and relationships that make the network move.
            </p>
          </div>
        </Container>
      </section>

      <section className="runsys-section">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <div className="runsys-label text-[var(--runsys-muted)]">
              {String(athletes.length).padStart(2, "0")} ATHLETES
            </div>
            <div className="runsys-label hidden md:block">
              DISCOVER / ENTER / FOLLOW
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {athletes.map((athlete, index) => (
              <AthleteCard
                key={athlete.id}
                athlete={athlete}
                priority={index < 2}
              />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
