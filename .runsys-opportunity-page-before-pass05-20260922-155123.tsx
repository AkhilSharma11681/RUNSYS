import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { InterestButton } from "@/components/opportunities/InterestButton";
import { getRepository } from "@/lib/repository";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const opportunities = await getRepository().getOpportunities();
  return opportunities.map((opportunity) => ({
    slug: opportunity.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const opportunity = await getRepository().getOpportunity(slug);

  return opportunity
    ? {
        title: opportunity.title,
        description: opportunity.description,
      }
    : {
        title: "Opportunity not found",
      };
}

export default async function OpportunityPage({ params }: PageProps) {
  const { slug } = await params;
  const repository = getRepository();

  const opportunity = await repository.getOpportunity(slug);

  if (!opportunity) {
    notFound();
  }

  const [athlete, brand, event] = await Promise.all([
    repository.getAthlete(opportunity.athleteSlug),
    repository.getBrand(opportunity.brandSlug),
    repository.getEvent(opportunity.eventSlug),
  ]);

  if (!athlete || !brand || !event) {
    notFound();
  }

  const price =
    opportunity.pricing.amount && opportunity.pricing.currency
      ? `${opportunity.pricing.currency} ${opportunity.pricing.amount.toLocaleString()}`
      : opportunity.pricing.type.replaceAll("_", " ");

  return (
    <article>
      <section className="relative min-h-[65svh] overflow-hidden bg-black text-white">
        <Image
          src={opportunity.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <Container>
          <div className="relative flex min-h-[65svh] flex-col justify-end pb-12">
            <div className="runsys-label text-[var(--runsys-accent)]">
              SPONSORSHIP OPPORTUNITY
            </div>

            <h1 className="runsys-display mt-5 max-w-6xl text-[clamp(4rem,9vw,8rem)]">
              {opportunity.title}
            </h1>

            <div className="mt-8 grid gap-6 border-t border-white/20 pt-5 md:grid-cols-4">
              <div>
                <div className="runsys-label text-white/40">WHO</div>
                <Link
                  href={`/athletes/${athlete.slug}`}
                  className="mt-2 block text-lg hover:text-[var(--runsys-accent)]"
                >
                  {athlete.name}
                </Link>
              </div>

              <div>
                <div className="runsys-label text-white/40">EVENT</div>
                <Link
                  href={`/events/${event.slug}`}
                  className="mt-2 block text-lg hover:text-[var(--runsys-accent)]"
                >
                  {event.name}
                </Link>
              </div>

              <div>
                <div className="runsys-label text-white/40">DURATION</div>
                <div className="mt-2 text-lg">{opportunity.duration}</div>
              </div>

              <div>
                <div className="runsys-label text-white/40">STATUS</div>
                <div className="mt-2 text-lg">{opportunity.status}</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="runsys-section">
        <Container>
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="runsys-label text-[var(--runsys-accent)]">
                THE SPACE
              </div>

              <h2 className="runsys-display mt-5 text-6xl md:text-8xl">
                WHAT
                <br />
                YOU&apos;RE
                <br />
                SPONSORING.
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--runsys-muted)]">
                {opportunity.description}
              </p>

              <div className="mt-12 grid gap-10 md:grid-cols-2">
                <div>
                  <div className="runsys-label">DELIVERABLES</div>
                  <ul className="mt-5 space-y-4">
                    {opportunity.deliverables.map((item) => (
                      <li
                        key={item}
                        className="border-t border-[var(--runsys-border)] pt-4 text-sm leading-6"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="runsys-label">RIGHTS</div>
                  <ul className="mt-5 space-y-4">
                    {opportunity.rights.map((item) => (
                      <li
                        key={item}
                        className="border-t border-[var(--runsys-border)] pt-4 text-sm leading-6"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <aside className="md:col-span-5">
              <div className="sticky top-24">
                <div className="border border-[var(--runsys-border)] p-6">
                  <div className="runsys-label text-[var(--runsys-muted)]">
                    BRAND
                  </div>
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="mt-2 block text-2xl font-bold tracking-[-0.04em] hover:text-[var(--runsys-accent)]"
                  >
                    {brand.name}
                  </Link>

                  <div className="mt-8 border-t border-[var(--runsys-border)] pt-6">
                    <div className="runsys-label text-[var(--runsys-muted)]">
                      AVAILABILITY
                    </div>
                    <p className="mt-2 text-sm leading-6">
                      {opportunity.availability}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[var(--runsys-border)] pt-6">
                    <div className="runsys-label text-[var(--runsys-muted)]">
                      EXCLUSIVITY
                    </div>
                    <p className="mt-2 text-sm leading-6">
                      {opportunity.exclusivity}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[var(--runsys-border)] pt-6">
                    <div className="runsys-label text-[var(--runsys-muted)]">
                      PRICE
                    </div>
                    <div className="mt-2 text-2xl font-bold uppercase tracking-[-0.03em]">
                      {price}
                    </div>
                  </div>

                  <div className="mt-8">
                    <InterestButton />
                  </div>

                  <div className="mt-4 text-center text-xs leading-5 text-[var(--runsys-muted)]">
                    Expressing interest starts a conversation. It does not
                    create a purchase or binding agreement.
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </article>
  );
}
