import { neon } from "@neondatabase/serverless";
import {
  athletes,
  brands,
  events,
  opportunities,
  stories,
} from "../src/data/seed.ts";

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log("Seeding RUNSYS into Neon...");

  for (const athlete of athletes) {
    await sql`
      INSERT INTO athletes (
        id,
        slug,
        name,
        sport,
        location,
        discipline,
        status,
        bio,
        hero_image,
        secondary_image,
        sponsorship_history,
        journey
      )
      VALUES (
        ${athlete.id},
        ${athlete.slug},
        ${athlete.name},
        ${athlete.sport},
        ${athlete.location},
        ${athlete.discipline},
        ${athlete.status},
        ${athlete.bio},
        ${athlete.heroImage},
        ${athlete.secondaryImage},
        ${athlete.sponsorshipHistory},
        ${JSON.stringify(athlete.journey)}
      )
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        name = EXCLUDED.name,
        sport = EXCLUDED.sport,
        location = EXCLUDED.location,
        discipline = EXCLUDED.discipline,
        status = EXCLUDED.status,
        bio = EXCLUDED.bio,
        hero_image = EXCLUDED.hero_image,
        secondary_image = EXCLUDED.secondary_image,
        sponsorship_history = EXCLUDED.sponsorship_history,
        journey = EXCLUDED.journey,
        updated_at = NOW()
    `;
  }

  for (const brand of brands) {
    await sql`
      INSERT INTO brands (
        id,
        slug,
        name,
        category,
        location,
        description,
        image
      )
      VALUES (
        ${brand.id},
        ${brand.slug},
        ${brand.name},
        ${brand.category},
        ${brand.location},
        ${brand.description},
        ${brand.image}
      )
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        name = EXCLUDED.name,
        category = EXCLUDED.category,
        location = EXCLUDED.location,
        description = EXCLUDED.description,
        image = EXCLUDED.image,
        updated_at = NOW()
    `;
  }

  for (const event of events) {
    await sql`
      INSERT INTO events (
        id,
        slug,
        name,
        location,
        date,
        sport,
        description,
        image
      )
      VALUES (
        ${event.id},
        ${event.slug},
        ${event.name},
        ${event.location},
        ${event.date},
        ${event.sport},
        ${event.description},
        ${event.image}
      )
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        name = EXCLUDED.name,
        location = EXCLUDED.location,
        date = EXCLUDED.date,
        sport = EXCLUDED.sport,
        description = EXCLUDED.description,
        image = EXCLUDED.image,
        updated_at = NOW()
    `;
  }

  for (const athlete of athletes) {
    for (const eventSlug of athlete.events) {
      const event = events.find((item) => item.slug === eventSlug);

      if (!event) {
        throw new Error(
          `Missing event "${eventSlug}" for athlete "${athlete.slug}"`,
        );
      }

      await sql`
        INSERT INTO event_athletes (event_id, athlete_id)
        VALUES (${event.id}, ${athlete.id})
        ON CONFLICT DO NOTHING
      `;
    }

    for (const brandSlug of athlete.brands) {
      const brand = brands.find((item) => item.slug === brandSlug);

      if (!brand) {
        throw new Error(
          `Missing brand "${brandSlug}" for athlete "${athlete.slug}"`,
        );
      }

      await sql`
        INSERT INTO athlete_brands (athlete_id, brand_id)
        VALUES (${athlete.id}, ${brand.id})
        ON CONFLICT DO NOTHING
      `;
    }
  }

  for (const event of events) {
    for (const athleteSlug of event.athleteSlugs) {
      const athlete = athletes.find((item) => item.slug === athleteSlug);

      if (!athlete) {
        throw new Error(
          `Missing athlete "${athleteSlug}" for event "${event.slug}"`,
        );
      }

      await sql`
        INSERT INTO event_athletes (event_id, athlete_id)
        VALUES (${event.id}, ${athlete.id})
        ON CONFLICT DO NOTHING
      `;
    }

    for (const brandSlug of event.brandSlugs) {
      const brand = brands.find((item) => item.slug === brandSlug);

      if (!brand) {
        throw new Error(
          `Missing brand "${brandSlug}" for event "${event.slug}"`,
        );
      }

      await sql`
        INSERT INTO event_brands (event_id, brand_id)
        VALUES (${event.id}, ${brand.id})
        ON CONFLICT DO NOTHING
      `;
    }
  }

  for (const opportunity of opportunities) {
    const athlete = athletes.find(
      (item) => item.slug === opportunity.athleteSlug,
    );
    const brand = brands.find(
      (item) => item.slug === opportunity.brandSlug,
    );
    const event = events.find(
      (item) => item.slug === opportunity.eventSlug,
    );

    if (!athlete || !brand || !event) {
      throw new Error(
        `Invalid relationship for opportunity "${opportunity.slug}"`,
      );
    }

    await sql`
      INSERT INTO opportunities (
        id,
        slug,
        title,
        inventory_type,
        placement,
        athlete_id,
        brand_id,
        event_id,
        duration,
        status,
        description,
        deliverables,
        rights,
        exclusivity,
        availability,
        pricing_type,
        pricing_amount,
        pricing_currency,
        image
      )
      VALUES (
        ${opportunity.id},
        ${opportunity.slug},
        ${opportunity.title},
        ${opportunity.inventoryType},
        ${opportunity.placement ?? null},
        ${athlete.id},
        ${brand.id},
        ${event.id},
        ${opportunity.duration},
        ${opportunity.status},
        ${opportunity.description},
        ${opportunity.deliverables},
        ${opportunity.rights},
        ${opportunity.exclusivity},
        ${opportunity.availability},
        ${opportunity.pricing.type},
        ${opportunity.pricing.amount ?? null},
        ${opportunity.pricing.currency ?? null},
        ${opportunity.image}
      )
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        title = EXCLUDED.title,
        inventory_type = EXCLUDED.inventory_type,
        placement = EXCLUDED.placement,
        athlete_id = EXCLUDED.athlete_id,
        brand_id = EXCLUDED.brand_id,
        event_id = EXCLUDED.event_id,
        duration = EXCLUDED.duration,
        status = EXCLUDED.status,
        description = EXCLUDED.description,
        deliverables = EXCLUDED.deliverables,
        rights = EXCLUDED.rights,
        exclusivity = EXCLUDED.exclusivity,
        availability = EXCLUDED.availability,
        pricing_type = EXCLUDED.pricing_type,
        pricing_amount = EXCLUDED.pricing_amount,
        pricing_currency = EXCLUDED.pricing_currency,
        image = EXCLUDED.image,
        updated_at = NOW()
    `;
  }

  for (const story of stories) {
    const athlete = athletes.find(
      (item) => item.slug === story.athleteSlug,
    );
    const brand = brands.find(
      (item) => item.slug === story.brandSlug,
    );
    const event = events.find(
      (item) => item.slug === story.eventSlug,
    );

    if (!athlete || !brand || !event) {
      throw new Error(`Invalid relationship for story "${story.slug}"`);
    }

    await sql`
      INSERT INTO stories (
        id,
        slug,
        title,
        eyebrow,
        description,
        image,
        athlete_id,
        brand_id,
        event_id
      )
      VALUES (
        ${story.id},
        ${story.slug},
        ${story.title},
        ${story.eyebrow},
        ${story.description},
        ${story.image},
        ${athlete.id},
        ${brand.id},
        ${event.id}
      )
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        title = EXCLUDED.title,
        eyebrow = EXCLUDED.eyebrow,
        description = EXCLUDED.description,
        image = EXCLUDED.image,
        athlete_id = EXCLUDED.athlete_id,
        brand_id = EXCLUDED.brand_id,
        event_id = EXCLUDED.event_id
    `;
  }

  console.log("RUNSYS seed completed successfully.");

  const counts = await sql`
    SELECT
      (SELECT COUNT(*) FROM athletes) AS athletes,
      (SELECT COUNT(*) FROM brands) AS brands,
      (SELECT COUNT(*) FROM events) AS events,
      (SELECT COUNT(*) FROM opportunities) AS opportunities,
      (SELECT COUNT(*) FROM stories) AS stories,
      (SELECT COUNT(*) FROM athlete_brands) AS athlete_brands,
      (SELECT COUNT(*) FROM event_athletes) AS event_athletes,
      (SELECT COUNT(*) FROM event_brands) AS event_brands
  `;

  console.table(counts);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
