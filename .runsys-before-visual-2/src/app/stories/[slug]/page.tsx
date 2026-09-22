import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
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
  const story = (await getRepository().getStories()).find(
    (item) => item.slug === slug,
  );

  if (!story) {
    notFound();
  }

  return (
    <article>
      <section className="relative min-h-[70svh] overflow-hidden bg-black text-white">
        <Image
          src={story.image}
          alt={story.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <Container>
          <div className="relative flex min-h-[70svh] flex-col justify-end pb-12">
            <div className="runsys-label text-[var(--runsys-accent)]">
              {story.eyebrow}
            </div>

            <h1 className="runsys-display mt-5 max-w-6xl text-[clamp(4rem,10vw,9rem)]">
              {story.title}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">
              {story.description}
            </p>
          </div>
        </Container>
      </section>
    </article>
  );
}
