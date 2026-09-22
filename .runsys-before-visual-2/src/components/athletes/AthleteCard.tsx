import Image from "next/image";
import Link from "next/link";
import type { Athlete } from "@/types/domain";

type AthleteCardProps = {
  athlete: Athlete;
  priority?: boolean;
};

export function AthleteCard({ athlete, priority = false }: AthleteCardProps) {
  return (
    <Link
      href={`/athletes/${athlete.slug}`}
      className="group block"
      aria-label={`View ${athlete.name}`}
    >
      <div className="runsys-media aspect-[4/5]">
        <Image
          src={athlete.heroImage}
          alt={`${athlete.name}, ${athlete.discipline} athlete`}
          fill
          priority={priority}
          sizes="(max-width: 900px) 80vw, 33vw"
          className="runsys-hover-image object-cover"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-20 text-white">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold tracking-[-0.04em]">
                {athlete.name}
              </h3>
              <p className="mt-1 text-sm text-white/70">
                {athlete.discipline} · {athlete.location}
              </p>
            </div>

            <span className="runsys-label border border-white/40 px-2 py-1">
              {athlete.status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
