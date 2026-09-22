import { getDb } from "./db/neon";
import type {
  Athlete,
  Brand,
  Event,
  Opportunity,
  Story,
} from "@/types/domain";

export interface RunsysRepository {
  getAthletes(): Promise<Athlete[]>;
  getAthlete(slug: string): Promise<Athlete | undefined>;
  getEvents(): Promise<Event[]>;
  getEvent(slug: string): Promise<Event | undefined>;
  getBrands(): Promise<Brand[]>;
  getBrand(slug: string): Promise<Brand | undefined>;
  getOpportunities(): Promise<Opportunity[]>;
  getOpportunity(slug: string): Promise<Opportunity | undefined>;
  getStories(): Promise<Story[]>;
}

type AthleteRow = {
  id: string;
  slug: string;
  name: string;
  sport: string;
  location: string;
  discipline: string;
  status: Athlete["status"];
  bio: string;
  hero_image: string;
  secondary_image: string;
  sponsorship_history: string[];
  journey: Athlete["journey"];
};

type BrandRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  location: string;
  description: string;
  image: string;
};

type EventRow = {
  id: string;
  slug: string;
  name: string;
  location: string;
  date: string;
  sport: string;
  description: string;
  image: string;
};

type OpportunityRow = {
  id: string;
  slug: string;
  title: string;
  inventory_type: Opportunity["inventoryType"];
  placement: string | null;
  athlete_slug: string;
  brand_slug: string;
  event_slug: string;
  duration: string;
  status: Opportunity["status"];
  description: string;
  deliverables: string[];
  rights: string[];
  exclusivity: string;
  availability: string;
  pricing_type: Opportunity["pricing"]["type"];
  pricing_amount: number | null;
  pricing_currency: string | null;
  image: string;
};

type StoryRow = {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  athlete_slug: string;
  brand_slug: string;
  event_slug: string;
};

async function queryRows<T>(
  query: PromiseLike<unknown>,
): Promise<T[]> {
  return (await query) as T[];
}

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return getDb();
}

function mapAthlete(row: AthleteRow): Athlete {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    sport: row.sport,
    location: row.location,
    discipline: row.discipline,
    status: row.status,
    bio: row.bio,
    heroImage: row.hero_image,
    secondaryImage: row.secondary_image,
    events: [],
    brands: [],
    sponsorshipHistory: row.sponsorship_history,
    journey: row.journey,
  };
}

function mapBrand(row: BrandRow): Brand {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    location: row.location,
    description: row.description,
    image: row.image,
    athleteSlugs: [],
    eventSlugs: [],
  };
}

function mapEvent(row: EventRow): Event {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    location: row.location,
    date: row.date,
    sport: row.sport,
    description: row.description,
    image: row.image,
    athleteSlugs: [],
    brandSlugs: [],
  };
}

async function hydrateAthlete(
  row: AthleteRow,
): Promise<Athlete> {
  const sql = getSql();

  const [events, brands] = await Promise.all([
    queryRows<{ slug: string }>(sql`
      SELECT e.slug
      FROM event_athletes ea
      JOIN events e ON e.id = ea.event_id
      WHERE ea.athlete_id = ${row.id}
      ORDER BY e.date
    `),
    queryRows<{ slug: string }>(sql`
      SELECT b.slug
      FROM athlete_brands ab
      JOIN brands b ON b.id = ab.brand_id
      WHERE ab.athlete_id = ${row.id}
      ORDER BY b.name
    `),
  ]);

  return {
    ...mapAthlete(row),
    events: events.map((item) => item.slug),
    brands: brands.map((item) => item.slug),
  };
}

async function hydrateBrand(
  row: BrandRow,
): Promise<Brand> {
  const sql = getSql();

  const [athletes, events] = await Promise.all([
    queryRows<{ slug: string }>(sql`
      SELECT a.slug
      FROM athlete_brands ab
      JOIN athletes a ON a.id = ab.athlete_id
      WHERE ab.brand_id = ${row.id}
      ORDER BY a.name
    `),
    queryRows<{ slug: string }>(sql`
      SELECT e.slug
      FROM event_brands eb
      JOIN events e ON e.id = eb.event_id
      WHERE eb.brand_id = ${row.id}
      ORDER BY e.date
    `),
  ]);

  return {
    ...mapBrand(row),
    athleteSlugs: athletes.map((item) => item.slug),
    eventSlugs: events.map((item) => item.slug),
  };
}

async function hydrateEvent(
  row: EventRow,
): Promise<Event> {
  const sql = getSql();

  const [athletes, brands] = await Promise.all([
    queryRows<{ slug: string }>(sql`
      SELECT a.slug
      FROM event_athletes ea
      JOIN athletes a ON a.id = ea.athlete_id
      WHERE ea.event_id = ${row.id}
      ORDER BY a.name
    `),
    queryRows<{ slug: string }>(sql`
      SELECT b.slug
      FROM event_brands eb
      JOIN brands b ON b.id = eb.brand_id
      WHERE eb.event_id = ${row.id}
      ORDER BY b.name
    `),
  ]);

  return {
    ...mapEvent(row),
    athleteSlugs: athletes.map((item) => item.slug),
    brandSlugs: brands.map((item) => item.slug),
  };
}

function mapOpportunity(row: OpportunityRow): Opportunity {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    inventoryType: row.inventory_type,
    placement: row.placement ?? undefined,
    athleteSlug: row.athlete_slug,
    brandSlug: row.brand_slug,
    eventSlug: row.event_slug,
    duration: row.duration,
    status: row.status,
    description: row.description,
    deliverables: row.deliverables,
    rights: row.rights,
    exclusivity: row.exclusivity,
    availability: row.availability,
    pricing: {
      type: row.pricing_type,
      amount: row.pricing_amount ?? undefined,
      currency: row.pricing_currency ?? undefined,
    },
    image: row.image,
  };
}

function mapStory(row: StoryRow): Story {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    eyebrow: row.eyebrow,
    description: row.description,
    image: row.image,
    athleteSlug: row.athlete_slug,
    brandSlug: row.brand_slug,
    eventSlug: row.event_slug,
  };
}

const repository: RunsysRepository = {
  async getAthletes() {
    const sql = getSql();

    const [rows, eventRows, brandRows] = await Promise.all([
      queryRows<AthleteRow>(sql`
        SELECT
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
        FROM athletes
        ORDER BY name
      `),
      queryRows<{ athlete_id: string; slug: string }>(sql`
        SELECT ea.athlete_id, e.slug
        FROM event_athletes ea
        JOIN events e ON e.id = ea.event_id
        ORDER BY e.date
      `),
      queryRows<{ athlete_id: string; slug: string }>(sql`
        SELECT ab.athlete_id, b.slug
        FROM athlete_brands ab
        JOIN brands b ON b.id = ab.brand_id
        ORDER BY b.name
      `),
    ]);

    const eventsByAthlete = new Map<string, string[]>();
    const brandsByAthlete = new Map<string, string[]>();

    for (const row of eventRows) {
      const values = eventsByAthlete.get(row.athlete_id) ?? [];
      values.push(row.slug);
      eventsByAthlete.set(row.athlete_id, values);
    }

    for (const row of brandRows) {
      const values = brandsByAthlete.get(row.athlete_id) ?? [];
      values.push(row.slug);
      brandsByAthlete.set(row.athlete_id, values);
    }

    return rows.map((row) => ({
      ...mapAthlete(row),
      events: eventsByAthlete.get(row.id) ?? [],
      brands: brandsByAthlete.get(row.id) ?? [],
    }));
  },

  async getAthlete(slug) {
    const sql = getSql();

    const rows = await queryRows<AthleteRow>(sql`
      SELECT
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
      FROM athletes
      WHERE slug = ${slug}
      LIMIT 1
    `);

    return rows[0] ? hydrateAthlete(rows[0]) : undefined;
  },

  async getEvents() {
    const sql = getSql();

    const [rows, athleteRows, brandRows] = await Promise.all([
      queryRows<EventRow>(sql`
        SELECT
          id,
          slug,
          name,
          location,
          date::text,
          sport,
          description,
          image
        FROM events
        ORDER BY date
      `),
      queryRows<{ event_id: string; slug: string }>(sql`
        SELECT ea.event_id, a.slug
        FROM event_athletes ea
        JOIN athletes a ON a.id = ea.athlete_id
        ORDER BY a.name
      `),
      queryRows<{ event_id: string; slug: string }>(sql`
        SELECT eb.event_id, b.slug
        FROM event_brands eb
        JOIN brands b ON b.id = eb.brand_id
        ORDER BY b.name
      `),
    ]);

    const athletesByEvent = new Map<string, string[]>();
    const brandsByEvent = new Map<string, string[]>();

    for (const row of athleteRows) {
      const values = athletesByEvent.get(row.event_id) ?? [];
      values.push(row.slug);
      athletesByEvent.set(row.event_id, values);
    }

    for (const row of brandRows) {
      const values = brandsByEvent.get(row.event_id) ?? [];
      values.push(row.slug);
      brandsByEvent.set(row.event_id, values);
    }

    return rows.map((row) => ({
      ...mapEvent(row),
      athleteSlugs: athletesByEvent.get(row.id) ?? [],
      brandSlugs: brandsByEvent.get(row.id) ?? [],
    }));
  },

  async getEvent(slug) {
    const sql = getSql();

    const rows = await queryRows<EventRow>(sql`
      SELECT
        id,
        slug,
        name,
        location,
        date::text,
        sport,
        description,
        image
      FROM events
      WHERE slug = ${slug}
      LIMIT 1
    `);

    return rows[0] ? hydrateEvent(rows[0]) : undefined;
  },

  async getBrands() {
    const sql = getSql();

    const [rows, athleteRows, eventRows] = await Promise.all([
      queryRows<BrandRow>(sql`
        SELECT
          id,
          slug,
          name,
          category,
          location,
          description,
          image
        FROM brands
        ORDER BY name
      `),
      queryRows<{ brand_id: string; slug: string }>(sql`
        SELECT ab.brand_id, a.slug
        FROM athlete_brands ab
        JOIN athletes a ON a.id = ab.athlete_id
        ORDER BY a.name
      `),
      queryRows<{ brand_id: string; slug: string }>(sql`
        SELECT eb.brand_id, e.slug
        FROM event_brands eb
        JOIN events e ON e.id = eb.event_id
        ORDER BY e.date
      `),
    ]);

    const athletesByBrand = new Map<string, string[]>();
    const eventsByBrand = new Map<string, string[]>();

    for (const row of athleteRows) {
      const values = athletesByBrand.get(row.brand_id) ?? [];
      values.push(row.slug);
      athletesByBrand.set(row.brand_id, values);
    }

    for (const row of eventRows) {
      const values = eventsByBrand.get(row.brand_id) ?? [];
      values.push(row.slug);
      eventsByBrand.set(row.brand_id, values);
    }

    return rows.map((row) => ({
      ...mapBrand(row),
      athleteSlugs: athletesByBrand.get(row.id) ?? [],
      eventSlugs: eventsByBrand.get(row.id) ?? [],
    }));
  },

  async getBrand(slug) {
    const sql = getSql();

    const rows = await queryRows<BrandRow>(sql`
      SELECT
        id,
        slug,
        name,
        category,
        location,
        description,
        image
      FROM brands
      WHERE slug = ${slug}
      LIMIT 1
    `);

    return rows[0] ? hydrateBrand(rows[0]) : undefined;
  },

  async getOpportunities() {
    const sql = getSql();

    const rows = await queryRows<OpportunityRow>(sql`
      SELECT
        o.id,
        o.slug,
        o.title,
        o.inventory_type,
        o.placement,
        a.slug AS athlete_slug,
        b.slug AS brand_slug,
        e.slug AS event_slug,
        o.duration,
        o.status,
        o.description,
        o.deliverables,
        o.rights,
        o.exclusivity,
        o.availability,
        o.pricing_type,
        o.pricing_amount,
        o.pricing_currency,
        o.image
      FROM opportunities o
      JOIN athletes a ON a.id = o.athlete_id
      JOIN brands b ON b.id = o.brand_id
      JOIN events e ON e.id = o.event_id
      ORDER BY o.created_at DESC
    `);

    return rows.map(mapOpportunity);
  },

  async getOpportunity(slug) {
    const sql = getSql();

    const rows = await queryRows<OpportunityRow>(sql`
      SELECT
        o.id,
        o.slug,
        o.title,
        o.inventory_type,
        o.placement,
        a.slug AS athlete_slug,
        b.slug AS brand_slug,
        e.slug AS event_slug,
        o.duration,
        o.status,
        o.description,
        o.deliverables,
        o.rights,
        o.exclusivity,
        o.availability,
        o.pricing_type,
        o.pricing_amount,
        o.pricing_currency,
        o.image
      FROM opportunities o
      JOIN athletes a ON a.id = o.athlete_id
      JOIN brands b ON b.id = o.brand_id
      JOIN events e ON e.id = o.event_id
      WHERE o.slug = ${slug}
      LIMIT 1
    `);

    return rows[0] ? mapOpportunity(rows[0]) : undefined;
  },

  async getStories() {
    const sql = getSql();

    const rows = await queryRows<StoryRow>(sql`
      SELECT
        s.id,
        s.slug,
        s.title,
        s.eyebrow,
        s.description,
        s.image,
        a.slug AS athlete_slug,
        b.slug AS brand_slug,
        e.slug AS event_slug
      FROM stories s
      JOIN athletes a ON a.id = s.athlete_id
      JOIN brands b ON b.id = s.brand_id
      JOIN events e ON e.id = s.event_id
      ORDER BY s.created_at DESC
    `);

    return rows.map(mapStory);
  },
};

export function getRepository(): RunsysRepository {
  return repository;
}
