import type { Metadata } from "next";
import { getVisualOpportunity } from "@/lib/visual-repository";

import { notFound } from "next/navigation";
import { AthleteHero } from "@/components/athletes/AthleteHero";
import { AthleteJourney } from "@/components/athletes/AthleteJourney";
import { AthleteRelationships } from "@/components/athletes/AthleteRelationships";
import { AthleteSponsorshipHistory } from "@/components/athletes/AthleteSponsorshipHistory";
import { BodyExplorer } from "@/components/body/BodyExplorer";
import { AthleteOpportunities } from "@/components/opportunities/AthleteOpportunities";
import { getRepository } from "@/lib/repository";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const athletes = await getRepository().getAthletes();
  return athletes.map((athlete) => ({ slug: athlete.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const athlete = await getRepository().getAthlete(slug);

  if (!athlete) {
    return {
      title: "Athlete not found",
    };
  }

  return {
    title: athlete.name,
    description: athlete.bio,
    openGraph: {
      title: `${athlete.name} — RUNSYS`,
      description: athlete.bio,
      images: [{ url: athlete.heroImage }],
    },
  };
}


async function AthleteBodyOpportunity({
  opportunity,
}: {
  opportunity: Awaited<
    ReturnType<
      Awaited<ReturnType<typeof import("@/lib/repository").getRepository>>["getOpportunity"]
    >
  >;
}) {
  if (!opportunity) return null;

  const visualOpportunity = await getVisualOpportunity(opportunity.slug);

  if (!visualOpportunity) return null;

  return <BodyExplorer opportunity={visualOpportunity} />;
}

export default async function AthletePage({ params }: PageProps) {
  const { slug } = await params;
  const repository = getRepository();

  const athlete = await repository.getAthlete(slug);

  if (!athlete) {
    notFound();
  }

  const [events, brands, allOpportunities] = await Promise.all([
    repository.getEvents(),
    repository.getBrands(),
    repository.getOpportunities(),
  ]);

  const opportunities = allOpportunities.filter(
    (opportunity) => opportunity.athleteSlug === athlete.slug,
  );

  return (
    <article>
      <AthleteHero athlete={athlete} />
      <AthleteJourney athlete={athlete} />
      <AthleteRelationships
        athlete={athlete}
        events={events}
        brands={brands}
      />
      <AthleteSponsorshipHistory athlete={athlete} />
      <AthleteOpportunities opportunities={opportunities} />
      {opportunities[0] ? (
        <AthleteBodyOpportunity opportunity={opportunities[0]} />
      ) : null}
    </article>
  );
}
