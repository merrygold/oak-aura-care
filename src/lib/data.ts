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
    slug: "mental-health",
    title: "Mental health",
    category: "Wellbeing",
    blurb: "Steady, respectful support for difficult days and stronger routines.",
    intro:
      "We work alongside you to build confidence, connection and practical ways to manage everyday wellbeing—at a pace that feels right.",
    benefits: [
      "Feel more confident in daily life",
      "Strengthen routines and social connection",
      "Work toward goals with consistent support",
    ],
    helps: [
      "One-to-one community support",
      "Daily routine and wellbeing planning",
      "Connecting with local and clinical supports",
      "Practical help during periods of change",
    ],
  },
  {
    slug: "accommodation",
    title: "Accommodation service",
    category: "Daily living",
    blurb: "A safe place to live, matched to how you want to be supported.",
    intro:
      "Finding the right home is about more than a property. We consider your routines, relationships, support needs and the life you want to build.",
    benefits: [
      "Feel secure and comfortable at home",
      "Choose a living arrangement that suits you",
      "Build independence with the right level of support",
    ],
    helps: [
      "Exploring suitable living options",
      "Transition and move-in planning",
      "Individualised in-home support",
      "Coordination with families and support teams",
    ],
  },
  {
    slug: "community-participation",
    title: "Community participation",
    category: "Community",
    blurb: "Activities, relationships and experiences that feel meaningful to you.",
    intro:
      "Whether you want to try something new or reconnect with a familiar place, we make community participation comfortable and achievable.",
    benefits: [
      "Meet people with shared interests",
      "Build confidence outside the home",
      "Take part in local life on your terms",
    ],
    helps: [
      "Social and recreational activities",
      "Appointments and community access",
      "Travel and public transport practice",
      "Building confidence in new settings",
    ],
  },
  {
    slug: "daily-living-skills",
    title: "Daily living skills",
    category: "Independence",
    blurb: "Practical skills for greater choice, confidence and independence.",
    intro:
      "We turn everyday goals into manageable steps, practising in real settings until each skill feels useful and familiar.",
    benefits: [
      "Feel more capable at home",
      "Make everyday choices with confidence",
      "Create routines that support your goals",
    ],
    helps: [
      "Meal planning and cooking",
      "Budgeting and shopping",
      "Personal routines and home care",
      "Using transport and community services",
    ],
  },
  {
    slug: "respite-care",
    title: "Respite care",
    category: "Daily living",
    blurb: "A genuine break for participants, families and carers.",
    intro:
      "Thoughtful short-term support offers a change of pace while keeping familiar routines, preferences and care needs at the centre.",
    benefits: [
      "Enjoy a safe change of environment",
      "Give carers time to rest and recharge",
      "Try new activities with trusted support",
    ],
    helps: [
      "Planned short stays",
      "In-home respite",
      "Community-based activities",
      "Personal care and daily routines",
    ],
  },
  {
    slug: "plan-management",
    title: "Plan management",
    category: "Independence",
    blurb: "Clear help with budgets, invoices and the details behind your plan.",
    intro:
      "We help you understand where your funding is going and keep administration organised, without taking choice out of your hands.",
    benefits: [
      "Understand your available budget",
      "Reduce time spent on administration",
      "Choose from a broader range of providers",
    ],
    helps: [
      "Invoice processing and claims",
      "Regular budget updates",
      "Provider payment coordination",
      "Clear answers about plan spending",
    ],
  },
  {
    slug: "individual-living",
    title: "Individual living",
    category: "Daily living",
    blurb: "Personalised support at home, built around your choices and routines.",
    intro:
      "Your home should feel like yours. We provide practical, flexible support that respects privacy, preferences and independence.",
    benefits: [
      "Have more control over daily routines",
      "Feel safe and settled at home",
      "Grow independence at your own pace",
    ],
    helps: [
      "Personal care and daily routines",
      "Household tasks and meal preparation",
      "Community access",
      "Flexible support matched to your needs",
    ],
  },
  {
    slug: "support-coordination",
    title: "Support coordination",
    category: "Independence",
    blurb: "One dependable guide to help your NDIS plan work in real life.",
    intro:
      "We help connect the people, services and decisions around your plan, so you can focus on progress rather than chasing details.",
    benefits: [
      "Understand and use your plan",
      "Build a reliable support network",
      "Respond confidently when needs change",
    ],
    helps: [
      "Provider research and connection",
      "Service agreement guidance",
      "Preparing for plan reviews",
      "Building your confidence to coordinate supports",
    ],
  },
];

export const SERVICE_CATEGORIES: { name: string; slugs: string[] }[] = [
  { name: "Daily living", slugs: ["accommodation", "respite-care", "individual-living"] },
  { name: "Independence", slugs: ["daily-living-skills", "plan-management", "support-coordination"] },
  { name: "Community", slugs: ["community-participation"] },
  { name: "Wellbeing", slugs: ["mental-health"] },
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
