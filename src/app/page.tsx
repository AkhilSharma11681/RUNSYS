import Image from "next/image";
import { EntityLink } from "@/components/spatial/EntityLink";
import { GlassSurface } from "@/components/materials/GlassSurface";
import { AthleteWorld } from "@/components/discovery/AthleteWorld";
import { EventWorld } from "@/components/events/EventWorld";
import { OpportunityWorld } from "@/components/opportunities/OpportunityWorld";
import { BodyExplorer } from "@/components/body/BodyExplorer";
import { InterestButton } from "@/components/opportunities/InterestButton";
import {
  getVisualAthletes,
  getVisualEvents,
  getVisualOpportunity,
} from "@/lib/visual-repository";

export default async function HomePage() {
  const athletes = await getVisualAthletes();
  const events = await getVisualEvents();
  const opportunity = await getVisualOpportunity(
    "right-calf-hyrox-berlin",
  );

  const maya =
    athletes.find((athlete) => athlete.slug === "maya-keller") ??
    athletes[0];

  const berlin =
    events.find((event) => event.slug === "hyrox-berlin") ??
    events[0];

  return (
    <main className="site-shell">
      <section className="hero-world spatial-scene">
        <div className="hero-media spatial-layer spatial-layer-media">
          <Image
            src={maya.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: "58% center",
              viewTransitionName: `athlete-${maya.slug}`,
            } as React.CSSProperties}
          />
        </div>

        <div className="hero-content">
          <div className="hero-identity">
            <div className="hero-kicker">
              <span className="runsys-micro text-[var(--runsys-bone-soft)]">
                Living athlete world
              </span>
              <span className="signal signal-active">
                <span className="signal-dot" aria-hidden="true" />
                Currently moving
              </span>
            </div>

            <h1 className="hero-title runsys-display">
              {maya.name}
            </h1>

            <div className="hero-subline">
              <span>{maya.sport}</span>
              <span>·</span>
              <span>{maya.location}</span>
              <span>·</span>
              <span>{maya.status}</span>
            </div>

            <div className="hero-network">
              <span>
                <strong>{maya.events.length}</strong>
                EVENTS
              </span>
              <span>
                <strong>{maya.brands.length}</strong>
                BRANDS
              </span>
              <span>
                <strong>{maya.sponsorshipHistory.length}</strong>
                PARTNERSHIPS
              </span>
            </div>
          </div>
        </div>

        <div className="hero-context">
          <GlassSurface className="hero-context-card">
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Athlete → Event
            </div>
            <div className="hero-context-title">{berlin.name}</div>
            <div className="hero-context-meta">
              {berlin.location} · {berlin.date} · {berlin.brandSlugs.length} BRANDS
            </div>
          </GlassSurface>

          {opportunity ? (
            <GlassSurface className="hero-context-card">
              <div className="runsys-micro text-[var(--runsys-muted)]">
                Event → Opportunity
              </div>
              <div className="hero-context-title">
                {opportunity.placement}
              </div>
              <div className="hero-context-meta">
                {opportunity.duration} · {opportunity.price} · {opportunity.exclusivityLabel}
              </div>
            </GlassSurface>
          ) : null}
        </div>

        <div className="hero-scroll runsys-micro">
          Scroll to enter
        </div>
      </section>

      <div className="spatial-story">
        <div className="story-spine" aria-hidden="true">
          <span className="story-spine-line" />
          <span className="story-spine-label">RUNSYS / LIVE WORLD</span>
        </div>

        <div className="story-world story-athletes">
          <AthleteWorld athletes={athletes} />
        </div>

        <div className="story-world story-event">
          <EventWorld event={berlin} athlete={maya} />
        </div>

        {opportunity ? (
          <>
            <div className="story-world story-opportunity">
              <OpportunityWorld
                opportunity={opportunity}
                athlete={maya}
              />
            </div>

            <div className="story-world story-body">
              <section className="spatial-scene">
                <BodyExplorer opportunity={opportunity} />
              </section>
            </div>

            <div className="story-world story-action">
              <section className="section-world min-h-0 pb-32 pt-0">
                <div className="connection-world">
                  <div className="connection-index runsys-micro">
                    05 / 05 — Connection
                  </div>

                  <div className="connection-rule" />

                  <h2 className="connection-title runsys-display">
                    Make the
                    <br />
                    connection.
                  </h2>

                  <p className="connection-copy">
                    One athlete. One event. One placement.
                    <br />
                    Start the conversation.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <InterestButton opportunitySlug={opportunity.slug} />

                    <EntityLink
                      href={`/opportunities/${opportunity.slug}`}
                      className="editorial-action editorial-action-secondary"
                    >
                      Enter opportunity
                    </EntityLink>
                  </div>
                </div>
              </section>
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}
