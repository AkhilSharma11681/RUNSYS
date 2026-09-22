"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { label: "Explore", href: "/explore" },
  { label: "Athletes", href: "/athletes" },
  { label: "Events", href: "/events" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Brands", href: "/brands" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`site-header${open ? " site-header-open" : ""}`}>
      <div className="site-header-inner">
        <Link href="/" className="site-logo" aria-label="RUNSYS home">
          <span className="site-logo-mark" aria-hidden="true" />
          <span>RUNSYS</span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "site-nav-active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                <span>{item.label}</span>
                {active && <i aria-hidden="true" />}
              </Link>
            );
          })}
        </nav>

        <div className="site-header-actions">
          <Link className="site-join" href="/join">
            <span>Join</span>
            <span aria-hidden="true">↗</span>
          </Link>

          <button
            className="site-menu-toggle"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="site-mobile-navigation">
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "mobile-navigation-active" : undefined}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span>0{index + 1}</span>
                <strong>{item.label}</strong>
                <span aria-hidden="true">↗</span>
              </Link>
            );
          })}

          <Link href="/join" onClick={() => setOpen(false)}>
            <span>06</span>
            <strong>Join RUNSYS</strong>
            <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
