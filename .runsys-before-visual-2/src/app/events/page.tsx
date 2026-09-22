import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { EventPreview } from "@/components/events/EventPreview";
import { getRepository } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore the races, competitions, and events where athletes, brands, and sponsorship opportunities connect.",
};

export default async function EventsPage() {
  const events = await getRepository().getEvents();

  return (
    <div>
      <section className="bg-[var(--runsys-ink)] py-24 text-white md:py-36">
        <Container>
          <div className="runsys-label text-[var(--runsys-accent)]">
            EVENTS / PLACES IN MOTION
          </div>
          <h1 className="runsys-display mt-5 text-[clamp(4rem,10vw,9rem)]">
            WHAT&apos;S
            <br />
            NEXT.
          </h1>
        </Container>
      </section>

      <section className="runsys-section">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {events.map((event) => (
              <EventPreview key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
