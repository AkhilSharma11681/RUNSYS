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
  const brands = await getRepository().getBrands();
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getRepository().getBrand(slug);

  return brand
    ? {
        title: brand.name,
        description: brand.description,
      }
    : {
        title: "Brand not found",
      };
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const repository = getRepository();

  const brand = await repository.getBrand(slug);

  if (!brand) {
    notFound();
  }

  const [athletes, events, opportunities] = await Promise.all([
    repository.getAthletes(),
    repository.getEvents(),
    repository.getOpportunities(),
  ]);

  const brandAthletes = athletes.filter((athlete) =>
    brand.athleteSlugs.includes(athlete.slug),
  );

  const brandEvents = events.filter((event) =>
    brand.eventSlugs.includes(event.slug),
  );

  const brandOpportunities = opportunities.filter(
    (opportunity) => opportunity.brandSlug === brand.slug,
  );

  return (
    <article>
      <section className="relative min-h-[70svh] overflow-hidden bg-black text-white">
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <Container>
          <div className="relative flex min-h-[70svh] flex-col justify-end pb-12">
            <div className="runsys-label text-white/60">
              {brand.category} / {brand.location}
            </div>
            <h1 className="runsys-display mt-5 text-[clamp(4rem,10vw,9rem)]">
              {brand.name}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/70">
              {brand.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="runsys-section">
        <Container>
          <div className="grid gap-16 md:grid-cols-3">
            <div>
              <div className="runsys-label text-[var(--runsys-accent)]">
                ATHLETES
              </div>
              <div className="mt-7">
                {brandAthletes.map((athlete) => (
                  <Link
                    key={athlete.id}
                    href={`/athletes/${athlete.slug}`}
                    className="block border-t border-[var(--runsys-border)] py-5 last:border-b"
                  >
                    <div className="text-xl font-bold tracking-[-0.04em]">
                      {athlete.name}
                    </div>
                    <div className="mt-1 text-sm text-[var(--runsys-muted)]">
                      {athlete.discipline}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="runsys-label text-[var(--runsys-accent)]">
                EVENTS
              </div>
              <div className="mt-7">
                {brandEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="block border-t border-[var(--runsys-border)] py-5 last:border-b"
                  >
                    <div className="text-xl font-bold tracking-[-0.04em]">
                      {event.name}
                    </div>
                    <div className="mt-1 text-sm text-[var(--runsys-muted)]">
                      {event.location}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="runsys-label text-[var(--runsys-accent)]">
                OPPORTUNITIES
              </div>
              <div className="mt-7">
                {brandOpportunities.map((opportunity) => (
                  <Link
                    key={opportunity.id}
                    href={`/opportunities/${opportunity.slug}`}
                    className="block border-t border-[var(--runsys-border)] py-5 last:border-b"
                  >
                    <div className="text-xl font-bold tracking-[-0.04em]">
                      {opportunity.title}
                    </div>
                    <div className="mt-1 text-sm text-[var(--runsys-muted)]">
                      {opportunity.status}
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
