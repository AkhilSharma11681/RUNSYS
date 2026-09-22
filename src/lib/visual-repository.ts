import { getRepository } from "@/lib/repository";
import type {
  Athlete,
  Event,
  Opportunity,
} from "@/types/domain";

export type VisualAthlete = Athlete & {
  image: string;
};

export type VisualEvent = Event & {
  image: string;
};

export type VisualOpportunity = Opportunity & {
  eventName: string;
  price: string;
  placement: string;
  duration: string;
  rightsLabel: string;
  exclusivityLabel: string;
};

type UnknownRecord = Record<string, unknown>;

function record(value: unknown): UnknownRecord {
  return typeof value === "object" && value !== null
    ? (value as UnknownRecord)
    : {};
}

function stringValue(
  value: unknown,
  fallback = "",
): string {
  return typeof value === "string" && value.trim()
    ? value
    : fallback;
}

function firstString(
  values: unknown[],
  fallback = "",
): string {
  for (const value of values) {
    const result = stringValue(value);
    if (result) return result;
  }

  return fallback;
}

function mediaOf(entity: unknown): string {
  const item = record(entity);

  return firstString(
    [
      item.image,
      item.imageUrl,
      item.coverImage,
      item.heroImage,
      item.avatar,
      item.photo,
      item.media,
    ],
    "",
  );
}

function athleteImage(athlete: Athlete): string {
  const direct = mediaOf(athlete);

  if (direct) return direct;

  const item = record(athlete);

  const media = item.media;

  if (Array.isArray(media)) {
    const first = media[0];

    if (typeof first === "string") return first;

    const nested = mediaOf(first);

    if (nested) return nested;
  }

  return "";
}

function eventImage(event: Event): string {
  const direct = mediaOf(event);

  if (direct) return direct;

  const item = record(event);
  const media = item.media;

  if (Array.isArray(media)) {
    const first = media[0];

    if (typeof first === "string") return first;

    const nested = mediaOf(first);

    if (nested) return nested;
  }

  return "";
}

function opportunityPlacement(
  opportunity: Opportunity,
): string {
  return firstString(
    [
      opportunity.placement,
      record(opportunity).inventory,
      record(opportunity).region,
      record(opportunity).location,
    ],
    "Placement",
  );
}

function opportunityDuration(
  opportunity: Opportunity,
): string {
  return firstString(
    [
      record(opportunity).duration,
      record(opportunity).term,
      record(opportunity).timePeriod,
      record(opportunity).period,
    ],
    "90 days",
  );
}

function opportunityPrice(
  opportunity: Opportunity,
): string {
  const item = record(opportunity);

  const value = firstString(
    [
      item.price,
      item.amount,
      item.value,
      item.priceLabel,
      item.pricing,
    ],
  );

  return value || "Request quote";
}

function opportunityRights(
  opportunity: Opportunity,
): string {
  const rights = opportunity.rights;

  if (Array.isArray(rights)) {
    return rights.length ? rights.join(" · ") : "Defined rights";
  }

  if (typeof rights === "string") {
    return rights;
  }

  return firstString(
    [record(opportunity).rightsLabel],
    "Defined rights",
  );
}

function opportunityExclusivity(
  opportunity: Opportunity,
): string {
  return firstString(
    [
      record(opportunity).exclusivity,
      record(opportunity).exclusivityLabel,
    ],
    "Defined separately",
  );
}

export async function getVisualAthletes(): Promise<VisualAthlete[]> {
  const repository = await getRepository();

  const athletes = await repository.getAthletes();

  return athletes.map((athlete) => ({
    ...athlete,
    image: athleteImage(athlete),
  }));
}

export async function getVisualEvents(): Promise<VisualEvent[]> {
  const repository = await getRepository();

  const events = await repository.getEvents();

  return events.map((event) => ({
    ...event,
    image: eventImage(event),
  }));
}

export async function getVisualOpportunity(
  slug: string,
): Promise<VisualOpportunity | null> {
  const repository = await getRepository();

  const opportunity = await repository.getOpportunity(slug);

  if (!opportunity) return null;

  const item = record(opportunity);

  const eventName = firstString(
    [
      item.eventName,
      item.event,
      item.eventTitle,
    ],
    "Event",
  );

  return {
    ...opportunity,
    eventName,
    price: opportunityPrice(opportunity),
    placement: opportunityPlacement(opportunity),
    duration: opportunityDuration(opportunity),
    rightsLabel: opportunityRights(opportunity),
    exclusivityLabel: opportunityExclusivity(opportunity),
  };
}
