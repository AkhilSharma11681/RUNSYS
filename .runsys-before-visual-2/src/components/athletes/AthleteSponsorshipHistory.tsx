import type { Athlete } from "@/types/domain";

export function AthleteSponsorshipHistory({
  athlete,
}: {
  athlete: Athlete;
}) {
  return (
    <section className="runsys-section">
      <div className="runsys-container">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="runsys-label text-[var(--runsys-accent)]">
              04 / SPONSORSHIP
            </div>
            <h2 className="runsys-display mt-4 text-6xl md:text-8xl">
              WHAT
              <br />
              HAPPENED.
            </h2>
          </div>

          <div className="md:col-span-8">
            {athlete.sponsorshipHistory.length ? (
              athlete.sponsorshipHistory.map((item, index) => (
                <div
                  key={item}
                  className="border-t border-[var(--runsys-border)] py-6 last:border-b"
                >
                  <div className="grid gap-4 md:grid-cols-12 md:items-center">
                    <div className="runsys-label text-[var(--runsys-muted)] md:col-span-2">
                      0{index + 1}
                    </div>
                    <div className="text-2xl font-bold tracking-[-0.04em] md:col-span-7">
                      {item}
                    </div>
                    <div className="text-sm text-[var(--runsys-muted)] md:col-span-3 md:text-right">
                      COMPLETED
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="border-y border-[var(--runsys-border)] py-6 text-sm text-[var(--runsys-muted)]">
                Sponsorship history will appear as verified partnerships are
                completed.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
