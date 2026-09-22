import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { OpportunityPreview } from "@/components/opportunities/OpportunityPreview";
import { getRepository } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Explore live sponsorship opportunities connecting athletes, brands, events, inventory, and time.",
};

export default async function OpportunitiesPage() {
  const opportunities = await getRepository().getOpportunities();

  return (
    <div>
      <section className="bg-[var(--runsys-ink)] py-24 text-white md:py-36">
        <Container>
          <div className="runsys-label text-[var(--runsys-accent)]">
            SPONSORSHIP / OPEN SPACES
          </div>
          <h1 className="runsys-display mt-5 max-w-6xl text-[clamp(4rem,10vw,9rem)]">
            FIND
            <br />
            THE SPACE.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-white/60 md:text-lg">
            Sponsorship becomes concrete when the athlete, inventory, event,
            timing, rights, and relationship are clear.
          </p>
        </Container>
      </section>

      <section className="runsys-section">
        <Container>
          {opportunities.map((opportunity) => (
            <OpportunityPreview
              key={opportunity.id}
              opportunity={opportunity}
            />
          ))}
        </Container>
      </section>
    </div>
  );
}
