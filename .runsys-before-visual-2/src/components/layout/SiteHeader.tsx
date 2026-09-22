import Link from "next/link";

const navigation = [
  { label: "Explore", href: "/explore" },
  { label: "Athletes", href: "/athletes" },
  { label: "Events", href: "/events" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Brands", href: "/brands" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-black/10 bg-[rgba(243,240,232,0.92)] backdrop-blur-md">
        <div className="runsys-container flex h-16 items-center justify-between gap-8">
          <Link
            href="/"
            className="text-[18px] font-black tracking-[-0.06em]"
            aria-label="RUNSYS home"
          >
            RUNSYS
          </Link>

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Primary navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="runsys-label text-[var(--runsys-ink)] transition-opacity hover:opacity-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/join"
            className="runsys-label border border-[var(--runsys-ink)] px-4 py-2 transition-colors hover:bg-[var(--runsys-ink)] hover:text-[var(--runsys-bone)]"
          >
            Join
          </Link>
        </div>
      </div>
    </header>
  );
}
