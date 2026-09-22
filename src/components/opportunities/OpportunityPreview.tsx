import Link from "next/link";
import type { Opportunity } from "@/types/domain";

export function OpportunityPreview({
  opportunity,
}: {
  opportunity: Opportunity;
}) {
  return (
    <Link
      href={`/opportunities/${opportunity.slug}`}
      className="group block border-t border-[var(--runsys-border)] py-5"
    >
      <div className="grid gap-4 md:grid-cols-12 md:items-center">
        <div className="md:col-span-6">
          <div className="runsys-label text-[var(--runsys-muted)]">
            {opportunity.inventoryType}
            {opportunity.placement ? ` · ${opportunity.placement}` : ""}
          </div>
          <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] transition-colors group-hover:text-[var(--runsys-accent)]">
            {opportunity.title}
          </h3>
        </div>

        <div className="text-sm text-[var(--runsys-muted)] md:col-span-3">
          {opportunity.duration}
        </div>

        <div className="md:col-span-3 md:text-right">
          <span className="runsys-label">{opportunity.status}</span>
        </div>
      </div>
    </Link>
  );
}
