import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { getRepository } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "Discover performance, recovery, nutrition, apparel, and technology brands active across RUNSYS.",
};

export default async function BrandsPage() {
  const brands = await getRepository().getBrands();

  return (
    <div>
      <section className="bg-[var(--runsys-bone-secondary)] py-24 md:py-36">
        <Container>
          <div className="runsys-label text-[var(--runsys-accent)]">
            BRANDS / THE OTHER SIDE
          </div>
          <h1 className="runsys-display mt-5 max-w-6xl text-[clamp(4rem,10vw,9rem)]">
            WHO
            <br />
            CONNECTS.
          </h1>
        </Container>
      </section>

      <section className="runsys-section">
        <Container>
          <div className="grid gap-0 md:grid-cols-2">
            {brands.map((brand, index) => (
              <a
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className={`group border-t border-[var(--runsys-border)] p-6 ${
                  index % 2 === 1 ? "md:border-l" : ""
                }`}
              >
                <div className="runsys-label text-[var(--runsys-muted)]">
                  {brand.category} / {brand.location}
                </div>
                <h2 className="mt-10 text-4xl font-bold tracking-[-0.05em] transition-colors group-hover:text-[var(--runsys-accent)] md:text-5xl">
                  {brand.name}
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-6 text-[var(--runsys-muted)]">
                  {brand.description}
                </p>
                <div className="runsys-label mt-8">View relationship →</div>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
