import Link from "next/link";
import type { Opportunity } from "@/types/domain";

export function AthleteOpportunities({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  return (
    <section className="runsys-section">
      <div className="runsys-container">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="runsys-label text-[var(--runsys-accent)]">
              05 / AVAILABLE
            </div>
            <h2 className="runsys-display mt-4 text-6xl md:text-8xl">
              OPEN
              <br />
              SPACES.
            </h2>
          </div>

          <Link
            href="/opportunities"
            className="runsys-label hidden border-b border-black pb-1 md:block"
          >
            All opportunities →
          </Link>
        </div>

        <div>
          {opportunities.map((opportunity) => (
            <Link
              key={opportunity.id}
              href={`/opportunities/${opportunity.slug}`}
              className="group grid gap-4 border-t border-[var(--runsys-border)] py-6 last:border-b md:grid-cols-12 md:items-center"
            >
              <div className="md:col-span-6">
                <div className="runsys-label text-[var(--runsys-muted)]">
                  {opportunity.inventoryType}
                  {opportunity.placement
                    ? ` · ${opportunity.placement}`
                    : ""}
                </div>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] group-hover:text-[var(--runsys-accent)]">
                  {opportunity.title}
                </h3>
              </div>

              <div className="text-sm text-[var(--runsys-muted)] md:col-span-3">
                {opportunity.duration}
              </div>

              <div className="runsys-label md:col-span-3 md:text-right">
                {opportunity.status}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
