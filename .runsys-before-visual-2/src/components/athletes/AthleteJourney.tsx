import type { Athlete } from "@/types/domain";

export function AthleteJourney({ athlete }: { athlete: Athlete }) {
  return (
    <section id="journey" className="runsys-section">
      <div className="runsys-container">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="runsys-label text-[var(--runsys-accent)]">
              01 / JOURNEY
            </div>
            <h2 className="runsys-display mt-4 text-6xl md:text-8xl">
              THE
              <br />
              ROAD.
            </h2>
          </div>

          <div className="md:col-span-8">
            <div>
              {athlete.journey.map((item) => (
                <div
                  key={`${item.year}-${item.title}`}
                  className="grid grid-cols-[80px_1fr] gap-6 border-t border-[var(--runsys-border)] py-7 last:border-b"
                >
                  <div className="runsys-label text-[var(--runsys-accent)]">
                    {item.year}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold tracking-[-0.04em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--runsys-muted)]">
                      {item.description}
                    </p>
                  </div>

                  <div className="col-span-2 ml-[80px] h-px bg-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
