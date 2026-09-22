import {
  athletes,
  brands,
  events,
  opportunities,
  stories,
} from "@/data/seed";
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

const repository: RunsysRepository = {
  async getAthletes() {
    return athletes;
  },

  async getAthlete(slug) {
    return athletes.find((athlete) => athlete.slug === slug);
  },

  async getEvents() {
    return events;
  },

  async getEvent(slug) {
    return events.find((event) => event.slug === slug);
  },

  async getBrands() {
    return brands;
  },

  async getBrand(slug) {
    return brands.find((brand) => brand.slug === slug);
  },

  async getOpportunities() {
    return opportunities;
  },

  async getOpportunity(slug) {
    return opportunities.find((opportunity) => opportunity.slug === slug);
  },

  async getStories() {
    return stories;
  },
};

export function getRepository(): RunsysRepository {
  return repository;
}
