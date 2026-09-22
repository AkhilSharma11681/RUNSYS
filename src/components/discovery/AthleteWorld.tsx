import Image from "next/image";
import { EntityLink } from "@/components/spatial/EntityLink";
import type { VisualAthlete } from "@/lib/visual-repository";

type AthleteWorldProps = {
  athletes: VisualAthlete[];
};

export function AthleteWorld({ athletes }: AthleteWorldProps) {
  return (
    <section className="section-world">
      <div className="section-intro">
        <div>
          <div className="runsys-micro text-[var(--runsys-muted)]">
            Currently moving
          </div>
          <h2 className="section-title runsys-display">
            People
            <br />
            in motion.
          </h2>
        </div>

        <p className="section-description">
          Athletes are not profiles sitting in a directory. They are the
          people around whom events, brands and sponsorship opportunities
          connect.
        </p>
      </div>

      <div className="athlete-field">
        {athletes.map((athlete, index) => (
          <div
            className="athlete-field-item"
            key={athlete.slug}
            style={{
              ["--athlete-index" as string]: index,
            }}
          >
            <EntityLink
              href={`/athletes/${athlete.slug}`}
              className="athlete-entity world-link"
              transitionName={`athlete-${athlete.slug}`}
            >
              <div className="athlete-entity-media">
                <Image
                  src={athlete.image}
                  alt={`${athlete.name}, ${athlete.sport}`}
                  fill
                  sizes="(max-width: 900px) 50vw, 40vw"
                  className="object-cover"
                  style={{
                    viewTransitionName: `athlete-${athlete.slug}`,
                  } as React.CSSProperties}
                />
                <div className="media-vignette" />
              </div>

              <div className="athlete-entity-info">
                <div>
                  <h3 className="athlete-entity-name">{athlete.name}</h3>
                  <div className="athlete-entity-detail">
                    {athlete.sport} · {athlete.location}
                  </div>
                </div>
                <span className="entity-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </EntityLink>
          </div>
        ))}
      </div>
    </section>
  );
}
