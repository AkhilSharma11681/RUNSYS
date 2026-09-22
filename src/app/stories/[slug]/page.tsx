import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getRepository } from "@/lib/repository";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const stories = await getRepository().getStories();
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = (await getRepository().getStories()).find(
    (item) => item.slug === slug,
  );

  return story
    ? {
        title: story.title,
        description: story.description,
      }
    : {
        title: "Story not found",
      };
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const repository = getRepository();
  const story = (await repository.getStories()).find(
    (item) => item.slug === slug,
  );

  if (!story) {
    notFound();
  }

  const [athletes, brands, events] = await Promise.all([
    repository.getAthletes(),
    repository.getBrands(),
    repository.getEvents(),
  ]);

  const athlete = athletes.find((item) => item.slug === story.athleteSlug);
  const brand = brands.find((item) => item.slug === story.brandSlug);
  const event = events.find((item) => item.slug === story.eventSlug);

  return (
    <main className="story-world">
      <section className="story-entry">
        <div className="story-entry-media">
          <Image
            src={story.image}
            alt={story.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="story-entry-overlay" />

        <div className="story-entry-top">
          <span>RUNSYS / STORY</span>
          <span>{story.eyebrow}</span>
        </div>

        <div className="story-entry-content">
          <div className="runsys-micro">Culture / Sport / Relationship</div>

          <h1 className="story-entry-title runsys-display">
            {story.title}
          </h1>

          <p>{story.description}</p>
        </div>

        <div className="story-entry-bottom">
          <span>SCROLL TO ENTER</span>
          <span>↘</span>
        </div>
      </section>

      <section className="story-context">
        <div className="story-context-heading">
          <div className="runsys-micro text-[var(--runsys-muted)]">
            The relationship
          </div>

          <h2 className="story-context-title runsys-display">
            A story
            <br />
            connects worlds.
          </h2>
        </div>

        <div className="story-context-copy">
          <p>
            Stories reveal the human and cultural layer behind the commercial
            relationship.
          </p>
        </div>

        <div className="story-context-network">
          {athlete ? (
            <Link
              href={`/athletes/${athlete.slug}`}
              className="story-context-entity"
            >
              <span>ATHLETE</span>
              <strong>{athlete.name}</strong>
              <small>{athlete.discipline}</small>
            </Link>
          ) : null}

          {brand ? (
            <Link
              href={`/brands/${brand.slug}`}
              className="story-context-entity"
            >
              <span>BRAND</span>
              <strong>{brand.name}</strong>
              <small>{brand.category}</small>
            </Link>
          ) : null}

          {event ? (
            <Link
              href={`/events/${event.slug}`}
              className="story-context-entity"
            >
              <span>EVENT</span>
              <strong>{event.name}</strong>
              <small>{event.location}</small>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="story-editorial">
        <div className="story-editorial-index">
          <span>01</span>
          <span>THE STORY</span>
        </div>

        <div className="story-editorial-body">
          <p className="story-editorial-lead">
            {story.description}
          </p>

          <p>
            Sport becomes culture when people, places and brands create
            something that exists beyond the transaction. This is where the
            RUNSYS relationship becomes visible.
          </p>
        </div>
      </section>

      <section className="story-close">
        <div className="story-close-line" />

        <div>
          <div className="runsys-micro text-[var(--runsys-muted)]">
            Continue exploring
          </div>

          <h2 className="story-close-title runsys-display">
            Follow the
            <br />
            relationship.
          </h2>
        </div>

        <div className="story-close-links">
          {athlete ? (
            <Link href={`/athletes/${athlete.slug}`}>
              Enter athlete ↗
            </Link>
          ) : null}

          {brand ? (
            <Link href={`/brands/${brand.slug}`}>
              Enter brand ↗
            </Link>
          ) : null}

          {event ? (
            <Link href={`/events/${event.slug}`}>
              Enter event ↗
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  );
}
