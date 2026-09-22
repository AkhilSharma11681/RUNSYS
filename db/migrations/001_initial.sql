CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE athlete_status AS ENUM (
  'COMPETING',
  'TRAINING',
  'AVAILABLE'
);

CREATE TYPE inventory_type AS ENUM (
  'BODY',
  'EVENT',
  'CONTENT',
  'PRODUCT',
  'EXPERIENCE',
  'ATHLETE'
);

CREATE TYPE pricing_type AS ENUM (
  'FIXED',
  'STARTING_FROM',
  'REQUEST_QUOTE',
  'OPEN_TO_OFFERS',
  'NEGOTIABLE'
);

CREATE TYPE opportunity_status AS ENUM (
  'AVAILABLE',
  'INTERESTED',
  'NEGOTIATING',
  'CONTRACTED',
  'ACTIVE',
  'COMPLETED',
  'EXPIRED'
);

CREATE TABLE athletes (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  sport TEXT NOT NULL,
  location TEXT NOT NULL,
  discipline TEXT NOT NULL,
  status athlete_status NOT NULL,
  bio TEXT NOT NULL,
  hero_image TEXT NOT NULL,
  secondary_image TEXT NOT NULL,
  sponsorship_history TEXT[] NOT NULL DEFAULT '{}',
  journey JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE brands (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE events (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  date DATE NOT NULL,
  sport TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE event_athletes (
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  athlete_id TEXT NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, athlete_id)
);

CREATE TABLE event_brands (
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  brand_id TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, brand_id)
);

CREATE TABLE athlete_brands (
  athlete_id TEXT NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
  brand_id TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  PRIMARY KEY (athlete_id, brand_id)
);

CREATE TABLE opportunities (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  inventory_type inventory_type NOT NULL,
  placement TEXT,
  athlete_id TEXT NOT NULL REFERENCES athletes(id) ON DELETE RESTRICT,
  brand_id TEXT NOT NULL REFERENCES brands(id) ON DELETE RESTRICT,
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE RESTRICT,
  duration TEXT NOT NULL,
  status opportunity_status NOT NULL DEFAULT 'AVAILABLE',
  description TEXT NOT NULL,
  deliverables TEXT[] NOT NULL DEFAULT '{}',
  rights TEXT[] NOT NULL DEFAULT '{}',
  exclusivity TEXT NOT NULL,
  availability TEXT NOT NULL,
  pricing_type pricing_type NOT NULL,
  pricing_amount NUMERIC(12, 2),
  pricing_currency CHAR(3),
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE stories (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  eyebrow TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  athlete_id TEXT NOT NULL REFERENCES athletes(id) ON DELETE RESTRICT,
  brand_id TEXT NOT NULL REFERENCES brands(id) ON DELETE RESTRICT,
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id TEXT NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_athletes_status
  ON athletes(status);

CREATE INDEX idx_events_date
  ON events(date);

CREATE INDEX idx_opportunities_status
  ON opportunities(status);

CREATE INDEX idx_opportunities_athlete
  ON opportunities(athlete_id);

CREATE INDEX idx_opportunities_brand
  ON opportunities(brand_id);

CREATE INDEX idx_opportunities_event
  ON opportunities(event_id);

CREATE INDEX idx_opportunities_inventory
  ON opportunities(inventory_type);

CREATE INDEX idx_interests_opportunity
  ON interests(opportunity_id);

CREATE INDEX idx_stories_athlete
  ON stories(athlete_id);

CREATE INDEX idx_stories_brand
  ON stories(brand_id);

CREATE INDEX idx_stories_event
  ON stories(event_id);
