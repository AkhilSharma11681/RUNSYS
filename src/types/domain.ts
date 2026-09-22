export type AthleteStatus = "COMPETING" | "TRAINING" | "AVAILABLE";

export type InventoryType =
  | "BODY"
  | "EVENT"
  | "CONTENT"
  | "PRODUCT"
  | "EXPERIENCE"
  | "ATHLETE";

export type PricingType =
  | "FIXED"
  | "STARTING_FROM"
  | "REQUEST_QUOTE"
  | "OPEN_TO_OFFERS"
  | "NEGOTIABLE";

export type OpportunityStatus =
  | "AVAILABLE"
  | "INTERESTED"
  | "NEGOTIATING"
  | "CONTRACTED"
  | "ACTIVE"
  | "COMPLETED"
  | "EXPIRED";

export type Athlete = {
  id: string;
  slug: string;
  name: string;
  sport: string;
  location: string;
  discipline: string;
  status: AthleteStatus;
  bio: string;
  heroImage: string;
  secondaryImage: string;
  events: string[];
  brands: string[];
  sponsorshipHistory: string[];
  journey: {
    year: string;
    title: string;
    description: string;
  }[];
};

export type Event = {
  id: string;
  slug: string;
  name: string;
  location: string;
  date: string;
  sport: string;
  description: string;
  image: string;
  athleteSlugs: string[];
  brandSlugs: string[];
};

export type Brand = {
  id: string;
  slug: string;
  name: string;
  category: string;
  location: string;
  description: string;
  image: string;
  athleteSlugs: string[];
  eventSlugs: string[];
};

export type Opportunity = {
  id: string;
  slug: string;
  title: string;
  inventoryType: InventoryType;
  placement?: string;
  athleteSlug: string;
  brandSlug: string;
  eventSlug: string;
  duration: string;
  status: OpportunityStatus;
  description: string;
  deliverables: string[];
  rights: string[];
  exclusivity: string;
  availability: string;
  pricing: {
    type: PricingType;
    amount?: number;
    currency?: string;
  };
  image: string;
};

export type Story = {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  athleteSlug: string;
  brandSlug: string;
  eventSlug: string;
};
