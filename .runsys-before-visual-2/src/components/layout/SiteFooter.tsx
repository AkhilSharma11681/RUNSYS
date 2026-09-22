import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--runsys-border)] bg-[var(--runsys-ink)] text-[var(--runsys-bone)]">
      <div className="runsys-container py-16">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div>
            <div className="runsys-display text-5xl md:text-7xl">RUNSYS</div>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
              The living infrastructure connecting athletes, brands, events,
              and sponsorship opportunities.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer">
            <Link href="/athletes" className="runsys-label hover:text-white">
              Athletes
            </Link>
            <Link href="/events" className="runsys-label hover:text-white">
              Events
            </Link>
            <Link
              href="/opportunities"
              className="runsys-label hover:text-white"
            >
              Opportunities
            </Link>
            <Link href="/brands" className="runsys-label hover:text-white">
              Brands
            </Link>
          </nav>
        </div>

        <div className="mt-16 border-t border-white/15 pt-5 text-[10px] uppercase tracking-[0.12em] text-white/40">
          RUNSYS — ATHLETES × BRANDS × EVENTS
        </div>
      </div>
    </footer>
  );
}
