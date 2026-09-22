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
          </div>
        </div>

        <div className="hero-context">
          <GlassSurface className="hero-context-card">
            <div className="runsys-micro text-[var(--runsys-muted)]">
              Next event
            </div>
            <div className="hero-context-title">{berlin.name}</div>
            <div className="hero-context-meta">
              {berlin.location} · {berlin.date}
            </div>
          </GlassSurface>

          {opportunity ? (
            <GlassSurface className="hero-context-card">
              <div className="runsys-micro text-[var(--runsys-muted)]">
                Sponsorship space
              </div>
              <div className="hero-context-title">
                {opportunity.placement}
              </div>
              <div className="hero-context-meta">
                {opportunity.duration} · {opportunity.price}
              </div>
            </GlassSurface>
          ) : null}
        </div>

        <div className="hero-scroll runsys-micro">
          Scroll to enter
        </div>
      </section>

      <AthleteWorld athletes={athletes} />

      <EventWorld event={berlin} athlete={maya} />

      {opportunity ? (
        <>
          <OpportunityWorld opportunity={opportunity} athlete={maya} />

          <section className="spatial-scene">
            <BodyExplorer opportunity={opportunity} />
          </section>

          <section className="section-world min-h-0 pb-32 pt-0">
            <div className="mx-auto max-w-[900px] border-t border-[var(--runsys-border)] pt-16">
              <div className="runsys-micro text-[var(--runsys-muted)]">
                Connected action
              </div>

              <h2 className="runsys-display mt-5 max-w-[700px] text-[clamp(48px,7vw,96px)] leading-[0.88] tracking-[-0.065em]">
                Make the
                <br />
                connection.
              </h2>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <InterestButton />

                <EntityLink
                  href={`/opportunities/${opportunity.slug}`}
                  className="editorial-action editorial-action-secondary"
                >
                  Enter opportunity
                </EntityLink>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
