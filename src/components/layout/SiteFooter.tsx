import Link from "next/link";

const navigation = [
  { label: "Explore", href: "/explore" },
  { label: "Athletes", href: "/athletes" },
  { label: "Events", href: "/events" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Brands", href: "/brands" },
];

export function SiteFooter() {
  return (
    <footer className="runsys-footer">
      <div className="runsys-footer-inner">
        <div className="runsys-footer-top">
          <div className="runsys-footer-identity">
            <div className="runsys-footer-mark" aria-hidden="true" />

            <div>
              <div className="runsys-footer-wordmark">RUNSYS</div>

              <p>
                The living infrastructure connecting athletes, brands, events,
                and sponsorship opportunities.
              </p>
            </div>
          </div>

          <nav className="runsys-footer-nav" aria-label="Footer navigation">
            <div className="runsys-footer-nav-label">Explore RUNSYS</div>

            {navigation.map((item, index) => (
              <Link key={item.href} href={item.href}>
                <span>{`0${index + 1}`}</span>
                <strong>{item.label}</strong>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="runsys-footer-bottom">
          <span>ATHLETES × BRANDS × EVENTS</span>
          <span>THE NETWORK IS ALWAYS MOVING</span>
          <span>© RUNSYS</span>
        </div>
      </div>
    </footer>
  );
}
