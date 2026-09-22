import Image from "next/image";
import Link from "next/link";
import type { Athlete } from "@/types/domain";

export function AthleteHero({ athlete }: { athlete: Athlete }) {
  return (
    <section className="relative min-h-[calc(100svh-64px)] overflow-hidden bg-black text-white">
      <Image
        src={athlete.heroImage}
        alt={`${athlete.name}, ${athlete.discipline} athlete`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/5" />

      <div className="runsys-container relative flex min-h-[calc(100svh-64px)] flex-col justify-end pb-10 md:pb-14">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="runsys-label border border-white/40 px-3 py-2">
            {athlete.status}
          </span>
          <span className="runsys-label text-white/60">
            {athlete.location}
          </span>
        </div>

        <h1 className="runsys-display max-w-7xl text-[clamp(5rem,14vw,13rem)] text-white">
          {athlete.name}
        </h1>

        <div className="mt-8 grid gap-6 border-t border-white/25 pt-5 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="runsys-label text-white/50">DISCIPLINE</div>
            <div className="mt-2 text-xl">{athlete.discipline}</div>
          </div>

          <div className="md:col-span-5">
            <p className="max-w-xl text-base leading-7 text-white/70">
              {athlete.bio}
            </p>
          </div>

          <div className="md:col-span-3 md:text-right">
            <Link
              href="#journey"
              className="runsys-label inline-block border-b border-white pb-1"
            >
              Enter the journey ↓
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
