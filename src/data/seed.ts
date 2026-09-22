import type {
  Athlete,
  Brand,
  Event,
  Opportunity,
  Story,
} from "@/types/domain";

export const athletes: Athlete[] = [
  {
    id: "athlete-maya",
    slug: "maya-keller",
    name: "Maya Keller",
    sport: "Hybrid Racing",
    location: "Berlin, Germany",
    discipline: "HYROX",
    status: "COMPETING",
    bio: "A Berlin-based hybrid athlete moving between hard training, race days, and the culture surrounding them.",
    heroImage:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1800&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=85",
    events: ["hyrox-berlin", "hyrox-london"],
    brands: ["northline", "form-athletics"],
    sponsorshipHistory: ["Training Campaign", "Race Recovery Series"],
    journey: [
      {
        year: "2022",
        title: "First HYROX",
        description: "Entered her first hybrid race and began documenting the process.",
      },
      {
        year: "2024",
        title: "Berlin",
        description: "Built a training rhythm around the Berlin race circuit.",
      },
      {
        year: "2026",
        title: "Open inventory",
        description: "Selected sponsorship spaces are now available around race season.",
      },
    ],
  },
  {
    id: "athlete-luca",
    slug: "luca-moretti",
    name: "Luca Moretti",
    sport: "Hybrid Racing",
    location: "Milan, Italy",
    discipline: "HYROX",
    status: "TRAINING",
    bio: "Performance athlete combining structured training with a sharp visual identity.",
    heroImage:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1800&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=85",
    events: ["hyrox-berlin"],
    brands: ["form-athletics"],
    sponsorshipHistory: ["Race Kit"],
    journey: [
      {
        year: "2023",
        title: "Competitive debut",
        description: "Moved from independent training into competition.",
      },
      {
        year: "2025",
        title: "Race kit",
        description: "Started working with performance apparel partners.",
      },
      {
        year: "2026",
        title: "Berlin",
        description: "Training toward another HYROX race season.",
      },
    ],
  },
  {
    id: "athlete-anika",
    slug: "anika-rao",
    name: "Anika Rao",
    sport: "Distance Running",
    location: "Mumbai, India",
    discipline: "Marathon",
    status: "COMPETING",
    bio: "Distance runner building a community around long-form training and city racing.",
    heroImage:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1800&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1200&q=85",
    events: ["mumbai-marathon"],
    brands: ["kinetic-fuel"],
    sponsorshipHistory: ["Training Nutrition Series"],
    journey: [
      {
        year: "2021",
        title: "First marathon",
        description: "Completed her first marathon and began documenting training.",
      },
      {
        year: "2024",
        title: "Mumbai",
        description: "Made the Mumbai race calendar part of her annual rhythm.",
      },
      {
        year: "2026",
        title: "Long run season",
        description: "Opening selected content inventory around race preparation.",
      },
    ],
  },
  {
    id: "athlete-daniel",
    slug: "daniel-brooks",
    name: "Daniel Brooks",
    sport: "CrossFit",
    location: "London, UK",
    discipline: "Functional Fitness",
    status: "TRAINING",
    bio: "Functional fitness athlete focused on competition, recovery, and sustainable performance.",
    heroImage:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1800&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85",
    events: ["crossfit-season"],
    brands: ["rove-recovery"],
    sponsorshipHistory: ["Recovery Partnership"],
    journey: [
      {
        year: "2022",
        title: "First competition",
        description: "Entered the competitive functional fitness circuit.",
      },
      {
        year: "2025",
        title: "Recovery focus",
        description: "Built a training system around measurable recovery.",
      },
      {
        year: "2026",
        title: "Competition season",
        description: "Preparing for another full competition calendar.",
      },
    ],
  },
  {
    id: "athlete-sofia",
    slug: "sofia-mendes",
    name: "Sofia Mendes",
    sport: "Endurance",
    location: "Lisbon, Portugal",
    discipline: "Hybrid Endurance",
    status: "AVAILABLE",
    bio: "Endurance athlete exploring the space between racing, travel, and modern sports culture.",
    heroImage:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1800&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1546484959-fb2f7b9b8d3c?auto=format&fit=crop&w=1200&q=85",
    events: ["hyrox-london"],
    brands: [],
    sponsorshipHistory: [],
    journey: [
      {
        year: "2023",
        title: "Endurance circuit",
        description: "Started competing across multiple endurance formats.",
      },
      {
        year: "2025",
        title: "Cross-border racing",
        description: "Expanded competition beyond Portugal.",
      },
      {
        year: "2026",
        title: "New partnerships",
        description: "Opening selected inventory for aligned partners.",
      },
    ],
  },
];

export const events: Event[] = [
  {
    id: "event-berlin",
    slug: "hyrox-berlin",
    name: "HYROX Berlin",
    location: "Berlin, Germany",
    date: "2026-10-18",
    sport: "Hybrid Racing",
    description:
      "A high-energy race environment connecting elite performance, community, and modern sports culture.",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1800&q=85",
    athleteSlugs: ["maya-keller", "luca-moretti"],
    brandSlugs: ["northline", "form-athletics"],
  },
  {
    id: "event-london",
    slug: "hyrox-london",
    name: "HYROX London",
    location: "London, UK",
    date: "2026-11-08",
    sport: "Hybrid Racing",
    description:
      "One of the season's major city race environments, bringing athletes and performance brands together.",
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1800&q=85",
    athleteSlugs: ["maya-keller", "sofia-mendes"],
    brandSlugs: ["northline"],
  },
  {
    id: "event-mumbai",
    slug: "mumbai-marathon",
    name: "Mumbai Marathon",
    location: "Mumbai, India",
    date: "2027-01-17",
    sport: "Road Running",
    description:
      "A major city marathon with a strong relationship between runners, spectators, and the city itself.",
    image:
      "https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1800&q=85",
    athleteSlugs: ["anika-rao"],
    brandSlugs: ["kinetic-fuel"],
  },
  {
    id: "event-crossfit",
    slug: "crossfit-season",
    name: "CrossFit Competition Season",
    location: "London, UK",
    date: "2026-09-01",
    sport: "Functional Fitness",
    description:
      "A season-long competition environment built around training, recovery, and performance.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85",
    athleteSlugs: ["daniel-brooks"],
    brandSlugs: ["rove-recovery"],
  },
];

export const brands: Brand[] = [
  {
    id: "brand-northline",
    slug: "northline",
    name: "Northline",
    category: "Performance Apparel",
    location: "Berlin, Germany",
    description:
      "A performance apparel label working at the intersection of training and modern athletic culture.",
    image:
      "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1600&q=85",
    athleteSlugs: ["maya-keller"],
    eventSlugs: ["hyrox-berlin", "hyrox-london"],
  },
  {
    id: "brand-form",
    slug: "form-athletics",
    name: "Form Athletics",
    category: "Training Equipment",
    location: "Milan, Italy",
    description:
      "Training equipment designed around the rituals and intensity of serious athletes.",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1600&q=85",
    athleteSlugs: ["maya-keller", "luca-moretti"],
    eventSlugs: ["hyrox-berlin"],
  },
  {
    id: "brand-pace",
    slug: "pacelab",
    name: "PaceLab",
    category: "Running Technology",
    location: "Amsterdam, Netherlands",
    description:
      "A running technology studio focused on helping athletes understand and improve performance.",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1600&q=85",
    athleteSlugs: [],
    eventSlugs: [],
  },
  {
    id: "brand-rove",
    slug: "rove-recovery",
    name: "ROVE Recovery",
    category: "Recovery",
    location: "London, UK",
    description:
      "Recovery products and protocols for athletes who train hard and compete often.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=85",
    athleteSlugs: ["daniel-brooks"],
    eventSlugs: ["crossfit-season"],
  },
  {
    id: "brand-kinetic",
    slug: "kinetic-fuel",
    name: "Kinetic Fuel",
    category: "Sports Nutrition",
    location: "Mumbai, India",
    description:
      "Sports nutrition built for athletes navigating long training cycles and race days.",
    image:
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=1600&q=85",
    athleteSlugs: ["anika-rao"],
    eventSlugs: ["mumbai-marathon"],
  },
];

export const opportunities: Opportunity[] = [
  {
    id: "opportunity-maya-calf",
    slug: "right-calf-hyrox-berlin",
    title: "Right Calf × HYROX Berlin",
    inventoryType: "BODY",
    placement: "Right Calf",
    athleteSlug: "maya-keller",
    brandSlug: "northline",
    eventSlug: "hyrox-berlin",
    duration: "90 days",
    status: "AVAILABLE",
    description:
      "A visible race-season sponsorship placement connected to Maya's HYROX Berlin campaign.",
    deliverables: [
      "Visible right-calf placement during HYROX Berlin",
      "Campaign photography",
      "One post-race social activation",
    ],
    rights: [
      "Campaign usage rights for 90 days",
      "Digital campaign usage",
      "Event photography usage",
    ],
    exclusivity: "Performance apparel category exclusive during the campaign.",
    availability: "Available from 2026-09-20 to 2026-12-19.",
    pricing: {
      type: "STARTING_FROM",
      amount: 1800,
      currency: "EUR",
    },
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: "opportunity-luca-kit",
    slug: "race-kit-hyrox-berlin",
    title: "Race Kit × HYROX Berlin",
    inventoryType: "PRODUCT",
    placement: "Race Kit",
    athleteSlug: "luca-moretti",
    brandSlug: "form-athletics",
    eventSlug: "hyrox-berlin",
    duration: "Race season",
    status: "AVAILABLE",
    description:
      "Race-day product integration built around Luca's HYROX Berlin competition.",
    deliverables: [
      "Race kit integration",
      "Training content",
      "Race-day photography",
    ],
    rights: ["Digital campaign usage for the race season."],
    exclusivity: "Training equipment category.",
    availability: "Available for the Berlin race window.",
    pricing: {
      type: "REQUEST_QUOTE",
    },
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: "opportunity-anika-reel",
    slug: "marathon-training-reel",
    title: "Training Reel × Mumbai Marathon",
    inventoryType: "CONTENT",
    athleteSlug: "anika-rao",
    brandSlug: "kinetic-fuel",
    eventSlug: "mumbai-marathon",
    duration: "30 days",
    status: "AVAILABLE",
    description:
      "A short-form training story built around Anika's marathon preparation.",
    deliverables: [
      "One training reel",
      "One supporting story sequence",
    ],
    rights: ["Organic social usage for 30 days."],
    exclusivity: "Sports nutrition category.",
    availability: "Available during marathon preparation.",
    pricing: {
      type: "NEGOTIABLE",
    },
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: "opportunity-daniel-recovery",
    slug: "recovery-partnership-crossfit",
    title: "Recovery Partnership × CrossFit Season",
    inventoryType: "EXPERIENCE",
    athleteSlug: "daniel-brooks",
    brandSlug: "rove-recovery",
    eventSlug: "crossfit-season",
    duration: "Competition season",
    status: "AVAILABLE",
    description:
      "A season-long recovery partnership embedded into Daniel's competition preparation.",
    deliverables: [
      "Recovery routine content",
      "Training-day integration",
      "Competition-season story",
    ],
    rights: ["Digital campaign usage during the active partnership."],
    exclusivity: "Recovery category.",
    availability: "Available for the 2026 competition season.",
    pricing: {
      type: "OPEN_TO_OFFERS",
    },
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1800&q=85",
  },
];

export const stories: Story[] = [
  {
    id: "story-northline-maya",
    slug: "northline-maya-training",
    title: "Training becomes campaign",
    eyebrow: "Athlete × Brand",
    description:
      "How Maya Keller's training rhythm became the starting point for a Northline campaign.",
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1600&q=85",
    athleteSlug: "maya-keller",
    brandSlug: "northline",
    eventSlug: "hyrox-london",
  },
];
