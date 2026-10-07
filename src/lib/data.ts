export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/activities", label: "Activities" },
  { href: "/vacancies", label: "SIL vacancies" },
  { href: "/careers", label: "Careers" },
];

export const PHONE = "+61 452 119 743";
export const PHONE_HREF = "tel:+61452119743";
export const EMAIL = "info@onacare.com.au";
export const LOCATION = "Sydney NSW 2000";

export type Service = {
  slug: string;
  title: string;
  category: string;
  blurb: string;
  intro: string;
  benefits: string[];
  helps: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "supported-independent-living",
    title: "Supported independent living",
    category: "Home & living",
    blurb: "A home that fits your life, with support that grows your independence.",
    intro:
      "We help you find a place to call your own and build a support team around your goals, health needs and the way you like to live—so everyday independence feels achievable.",
    benefits: [
      "Live in a home chosen around your preferences",
      "Receive support shaped to your health and routines",
      "Build independence with a team that knows you well",
    ],
    helps: [
      "Finding and setting up the right home",
      "Everyday support with personal and household routines",
      "Experience with complex disability and medical needs",
      "Regular reviews as your goals and needs change",
    ],
  },
  {
    slug: "hospital-and-aged-care-transitions",
    title: "Hospital & aged care transitions",
    category: "Clinical care",
    blurb: "Careful planning that brings you home from hospital or aged care, safely.",
    intro:
      "Leaving hospital or residential care is a big step. Our clinical and support teams plan every detail with you, your family and health professionals, so the move home is calm, coordinated and safe.",
    benefits: [
      "Feel prepared well before leaving day",
      "Keep doctors, nurses and supports on the same page",
      "Settle in at home with fewer setbacks",
    ],
    helps: [
      "Discharge planning with hospital and aged care teams",
      "High-intensity supports such as wound, catheter and feeding care",
      "Equipment and home set-up before arrival",
      "Follow-up monitoring once you are home",
    ],
  },
  {
    slug: "disability-accommodation",
    title: "Disability accommodation",
    category: "Home & living",
    blurb: "Fully supported stays while you wait for a long-term home—or take a break.",
    intro:
      "Sometimes you need a supported place to stay between chapters of life. Skilled staff provide comfortable accommodation for short or interim periods, giving participants and carers genuine breathing room.",
    benefits: [
      "A comfortable, fully supported place to stay",
      "Time for carers to rest and recharge",
      "A bridge while your permanent home is arranged",
    ],
    helps: [
      "Short-term and interim supported accommodation",
      "Skilled staff matched to your support needs",
      "Personal care and daily routines during your stay",
      "Planning for your longer-term living arrangement",
    ],
  },
  {
    slug: "clinical-care-at-home",
    title: "Clinical care at home",
    category: "Clinical care",
    blurb: "Nursing and medical guidance available around the clock, where you live.",
    intro:
      "Health questions don't keep office hours. Our clinical team monitors your progress, answers urgent medical concerns and arranges treatment quickly—so small issues never get the chance to become big ones.",
    benefits: [
      "Reach a clinician at any hour, day or night",
      "Health concerns managed before they escalate",
      "Care coordinated with your own doctors",
    ],
    helps: [
      "Ongoing health monitoring at home",
      "Nursing support with medication, wounds and continence",
      "Urgent medical advice when you need reassurance",
      "Coordination with GPs, specialists and hospitals",
    ],
  },
  {
    slug: "community-access",
    title: "Community access",
    category: "Community",
    blurb: "Support to get out and about—appointments, errands, friends and local life.",
    intro:
      "Whether it's getting to an appointment, running errands or catching up with people who matter to you, we provide the practical support that keeps you connected in and around your community.",
    benefits: [
      "Stay connected to people and places you value",
      "Get to appointments without the stress",
      "Take part in local life with confidence",
    ],
    helps: [
      "Support to attend appointments and events",
      "Shopping, errands and everyday outings",
      "Visits to family and friends",
      "Building confidence with travel and transport",
    ],
  },
];

export const SERVICE_CATEGORIES: { name: string; slugs: string[] }[] = [
  { name: "Home & living", slugs: ["supported-independent-living", "disability-accommodation"] },
  { name: "Clinical care", slugs: ["clinical-care-at-home", "hospital-and-aged-care-transitions"] },
  { name: "Community", slugs: ["community-access"] },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export const buttonBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

export const buttonVariants = {
  primary: `${buttonBase} bg-primary text-primary-foreground shadow-sm hover:bg-primary/88`,
  outline: `${buttonBase} border border-input shadow-sm hover:bg-accent hover:text-accent-foreground bg-card/60`,
  accent: `${buttonBase} shadow-sm bg-accent text-accent-foreground hover:bg-accent/85`,
} as const;
