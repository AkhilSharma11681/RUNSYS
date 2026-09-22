import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Join RUNSYS",
  description:
    "Choose how you want to enter the RUNSYS network.",
};

const roles = [
  {
    number: "01",
    label: "For athletes",
    title: "Put your world in motion.",
    description:
      "Build your presence, surface sponsorship opportunities, and connect your athletic journey with brands and events.",
    href: "/athletes",
    action: "Enter athlete world",
  },
  {
    number: "02",
    label: "For brands",
    title: "Find the right connection.",
    description:
      "Discover athletes, events, placements, and sponsorship opportunities that fit how your brand moves through sport.",
    href: "/brands",
    action: "Enter brand world",
  },
  {
    number: "03",
    label: "For partners",
    title: "Shape what happens next.",
    description:
      "Explore events, commercial opportunities, experiences, and the relationships connecting the RUNSYS network.",
    href: "/opportunities",
    action: "Explore opportunities",
  },
];

export default function JoinPage() {
  return (
    <main className="join-world">
      <section className="join-entry">
        <div className="join-entry-atmosphere" aria-hidden="true" />
        <div className="join-entry-grid" aria-hidden="true" />

        <div className="join-entry-inner">
          <div className="join-kicker">
            <span className="join-signal" aria-hidden="true" />
            ENTER RUNSYS
          </div>

          <div className="join-entry-copy">
            <p className="join-index">/ CONNECTION — CHOOSE YOUR WORLD</p>

            <h1>
              There is more
              <br />
              than one way <em>in.</em>
            </h1>

            <p className="join-intro">
              RUNSYS is a living network connecting the people, brands, events,
              and commercial relationships shaping modern sport.
            </p>
          </div>

          <div className="join-role-list">
            {roles.map((role) => (
              <Link key={role.number} href={role.href} className="join-role">
                <div className="join-role-index">
                  <span>{role.number}</span>
                  <span aria-hidden="true">↗</span>
                </div>

                <div className="join-role-label">{role.label}</div>

                <h2>{role.title}</h2>

                <p>{role.description}</p>

                <div className="join-role-action">
                  <span>{role.action}</span>
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="join-bridge">
        <div>
          <span className="join-section-label">THE NETWORK</span>
          <h2>
            One system.
            <br />
            Many <em>relationships.</em>
          </h2>
        </div>

        <p>
          Start anywhere. Follow the relationships. Every athlete, event,
          brand, and opportunity leads somewhere else.
        </p>
      </section>
    </main>
  );
}
