import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/types/domain";

export function EventPreview({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <div className="runsys-media aspect-[16/10]">
        <Image
          src={event.image}
          alt={event.name}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          className="runsys-hover-image object-cover"
        />

        <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <div className="runsys-label text-white/70">{event.location}</div>
          <h3 className="mt-2 text-3xl font-bold tracking-[-0.05em]">
            {event.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
