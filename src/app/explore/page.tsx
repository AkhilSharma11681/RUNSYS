import Link from "next/link";
import { AthleteWorld } from "@/components/discovery/AthleteWorld";
import { EventWorld } from "@/components/events/EventWorld";
import {
  getVisualAthletes,
  getVisualEvents,
} from "@/lib/visual-repository";

export default async function ExplorePage() {
  const athletes = await getVisualAthletes();
  const events = await getVisualEvents();

  const featuredAthlete = athletes[0];
  const featuredEvent = events[0];

  return (
    <main className="explore-world">
      <section className="explore-entry">
        <div className="explore-entry-index">
          <span>RUNSYS / EXPLORE</span>
          <span>01 / 04</span>
        </div>

        <div className="explore-entry-copy">
          <div className="runsys-micro text-[var(--runsys-muted)]">
            Athlete × Brand × Event
          </div>

          <h1 className="explore-entry-title runsys-display">
            Enter the
            <br />
            world.
          </h1>

          <p className="explore-entry-description">
            Discover the people, events and commercial relationships shaping
            modern sport.
          </p>
        </div>

        <div className="explore-entry-meta">
          <span>DISCOVERY SYSTEM</span>
          <div className="explore-entry-actions">
            <Link href="/athletes">Athletes ↗</Link>
            <Link href="/events">Events ↗</Link>
            <span>SCROLL TO MOVE</span>
          </div>
        </div>
      </section>

      {featuredAthlete ? (
        <section className="explore-athlete-entry">
          <div className="explore-world-label">
            <span>01</span>
            <span>ATHLETES</span>
          </div>

          <AthleteWorld athletes={athletes} />
        </section>
      ) : null}

      {featuredEvent ? (
        <section className="explore-event-entry">
          <div className="explore-world-label">
            <span>02</span>
            <span>EVENTS</span>
          </div>

          <EventWorld event={featuredEvent} />
        </section>
      ) : null}

      <section className="explore-bridge">
        <div className="explore-bridge-line" />

        <div className="explore-bridge-copy">
          <div className="runsys-micro text-[var(--runsys-muted)]">
            The system is connected
          </div>

          <h2 className="explore-bridge-title runsys-display">
            Follow the
            <br />
            relationship.
          </h2>

          <p>
            An athlete leads to an event. An event leads to a brand. A brand
            leads to an opportunity. Keep moving through the network.
          </p>
        </div>

        <div className="explore-bridge-index">
          <span>03</span>
          <span>RELATIONSHIPS</span>
        </div>
      </section>
    </main>
  );
}
