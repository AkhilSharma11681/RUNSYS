import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getRepository } from "@/lib/repository";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const events = await getRepository().getEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getRepository().getEvent(slug);

  return event
    ? {
        title: event.name,
        description: event.description,
      }
    : {
        title: "Event not found",
      };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const repository = getRepository();

  const event = await repository.getEvent(slug);

  if (!event) {
    notFound();
  }

  const [athletes, brands] = await Promise.all([
    repository.getAthletes(),
    repository.getBrands(),
  ]);

  const eventAthletes = athletes.filter((athlete) =>
    event.athleteSlugs.includes(athlete.slug),
  );

  const eventBrands = brands.filter((brand) =>
    event.brandSlugs.includes(brand.slug),
  );

  return (
    <article>
      <section className="relative min-h-[75svh] overflow-hidden bg-black text-white">
        <Image
          src={event.image}
          alt={event.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <Container>
          <div className="relative flex min-h-[75svh] flex-col justify-end pb-12">
            <div className="runsys-label text-white/60">
              {event.location} / {event.date}
            </div>
            <h1 className="runsys-display mt-5 max-w-6xl text-[clamp(4rem,10vw,9rem)]">
              {event.name}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/70">
              {event.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="runsys-section">
        <Container>
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <div className="runsys-label text-[var(--runsys-accent)]">
                ATHLETES
              </div>

              <div className="mt-7">
                {eventAthletes.map((athlete) => (
                  <Link
                    key={athlete.id}
                    href={`/athletes/${athlete.slug}`}
                    className="block border-t border-[var(--runsys-border)] py-5 last:border-b"
                  >
                    <div className="runsys-label text-[var(--runsys-muted)]">
                      {athlete.discipline}
                    </div>
                    <div className="mt-2 text-2xl font-bold tracking-[-0.04em]">
                      {athlete.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="runsys-label text-[var(--runsys-accent)]">
                BRANDS
              </div>

              <div className="mt-7">
                {eventBrands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/brands/${brand.slug}`}
                    className="block border-t border-[var(--runsys-border)] py-5 last:border-b"
                  >
                    <div className="runsys-label text-[var(--runsys-muted)]">
                      {brand.category}
                    </div>
                    <div className="mt-2 text-2xl font-bold tracking-[-0.04em]">
                      {brand.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
