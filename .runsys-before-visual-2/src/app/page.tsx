import Image from "next/image";
import Link from "next/link";
import { AthleteCard } from "@/components/athletes/AthleteCard";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { EventPreview } from "@/components/events/EventPreview";
import { OpportunityPreview } from "@/components/opportunities/OpportunityPreview";
import { getRepository } from "@/lib/repository";

export default async function HomePage() {
  const repository = getRepository();

  const [athletes, events, opportunities, stories] = await Promise.all([
    repository.getAthletes(),
    repository.getEvents(),
    repository.getOpportunities(),
    repository.getStories(),
  ]);

  const hero = athletes[0];

  return (
    <div>
      <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-[var(--runsys-ink)] text-white">
        <Image
          src={hero.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-75"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/10" />

        <Container>
          <div className="relative flex min-h-[calc(100vh-64px)] flex-col justify-end pb-10 md:pb-14">
            <div className="max-w-5xl">
              <div className="runsys-label mb-5 text-white/60">
                ATHLETES × BRANDS × EVENTS
              </div>

              <h1 className="runsys-display text-[clamp(4rem,11vw,10rem)] text-white">
                SPORTS
                <br />
                IN MOTION.
              </h1>

              <div className="mt-8 flex flex-col justify-between gap-8 border-t border-white/25 pt-5 md:flex-row md:items-end">
                <p className="max-w-xl text-base leading-7 text-white/70 md:text-lg">
                  Discover the people, events, brands, stories, and sponsorship
                  spaces shaping modern sport.
                </p>

                <Link
                  href="/explore"
                  className="runsys-label w-fit border border-white px-5 py-3 transition-colors hover:bg-white hover:text-black"
                >
                  Enter RUNSYS →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="runsys-section">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="runsys-label text-[var(--runsys-accent)]">
                01 / PEOPLE
              </div>
              <h2 className="runsys-display mt-4 text-6xl md:text-8xl">
                CURRENTLY
                <br />
                MOVING.
              </h2>
            </div>

            <Link
              href="/athletes"
              className="runsys-label hidden border-b border-black pb-1 md:block"
            >
              All athletes →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {athletes.slice(0, 3).map((athlete, index) => (
              <AthleteCard
                key={athlete.id}
                athlete={athlete}
                priority={index === 0}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="runsys-section bg-[var(--runsys-bone-secondary)]">
        <Container>
          <div className="mb-10">
            <div className="runsys-label text-[var(--runsys-accent)]">
              02 / EVENTS
            </div>
            <h2 className="runsys-display mt-4 text-6xl md:text-8xl">
              WHAT&apos;S
              <br />
              NEXT.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {events.slice(0, 2).map((event) => (
              <EventPreview key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </section>

      <section className="runsys-section">
        <Container>
          <div className="mb-10">
            <div className="runsys-label text-[var(--runsys-accent)]">
              03 / OPPORTUNITIES
            </div>
            <h2 className="runsys-display mt-4 text-6xl md:text-8xl">
              OPEN
              <br />
              SPACES.
            </h2>
          </div>

          <div>
            {opportunities.slice(0, 4).map((opportunity) => (
              <OpportunityPreview
                key={opportunity.id}
                opportunity={opportunity}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="runsys-section bg-[var(--runsys-ink)] text-white">
        <Container>
          <div className="mb-12">
            <div className="runsys-label text-[var(--runsys-accent)]">
              04 / CONNECTION
            </div>
            <h2 className="runsys-display mt-4 max-w-5xl text-6xl md:text-8xl">
              FOLLOW
              <br />
              THE CONNECTION.
            </h2>
          </div>

          <div className="grid gap-0 border-y border-white/20 md:grid-cols-3">
            {[
              ["01", "Maya Keller", "Athlete"],
              ["02", "HYROX Berlin", "Event"],
              ["03", "Northline", "Brand"],
            ].map(([number, name, type]) => (
              <div
                key={number}
                className="border-b border-white/20 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <div className="runsys-label text-white/40">{number}</div>
                <div className="mt-14 text-3xl font-bold tracking-[-0.04em]">
                  {name}
                </div>
                <div className="mt-2 text-sm text-white/50">{type}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="runsys-section">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="runsys-label text-[var(--runsys-accent)]">
                05 / STORIES
              </div>
              <h2 className="runsys-display mt-4 text-6xl md:text-8xl">
                RECENTLY
                <br />
                HAPPENED.
              </h2>
            </div>
          </div>

          {stories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.slug}`}
              className="group grid gap-8 md:grid-cols-2 md:items-center"
            >
              <div className="runsys-media aspect-[4/3]">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="runsys-hover-image object-cover"
                />
              </div>

              <div>
                <div className="runsys-label text-[var(--runsys-accent)]">
                  {story.eyebrow}
                </div>
                <h3 className="runsys-display mt-4 text-5xl md:text-7xl">
                  {story.title}
                </h3>
                <p className="mt-6 max-w-lg text-base leading-7 text-[var(--runsys-muted)]">
                  {story.description}
                </p>
                <div className="runsys-label mt-8">
                  Read story →
                </div>
              </div>
            </Link>
          ))}
        </Container>
      </section>

      <section className="border-t border-[var(--runsys-border)]">
        <Container>
          <div className="grid gap-10 py-16 md:grid-cols-2 md:items-center">
            <div>
              <div className="runsys-label text-[var(--runsys-accent)]">
                06 / DISCOVERY
              </div>
              <h2 className="runsys-display mt-4 text-6xl md:text-8xl">
                KEEP
                <br />
                MOVING.
              </h2>
            </div>

            <div className="md:pl-16">
              <p className="text-lg leading-8 text-[var(--runsys-muted)]">
                Follow the relationship. Athlete to event. Event to brand.
                Brand to opportunity. Opportunity back to the people creating
                the culture.
              </p>

              <Link
                href="/explore"
                className="runsys-label mt-8 inline-block border-b border-black pb-1"
              >
                Explore the world →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Divider />
    </div>
  );
}
