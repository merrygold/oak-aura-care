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

export const PUNCHLINE = "Connecting hearts, changing lives.";

export type Service = {
  slug: string;
  title: string;
  category: string;
  blurb: string;
  intro: string;
  image: string;
  imageAlt: string;
  benefits: string[];
  helps: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "supported-independent-living",
    image: "/images/sil-home.webp",
    imageAlt: "A modern accessible home with a wide pathway and garden",
    title: "Supported independent living",
    category: "Home & living",
    blurb: "A home that fits your life, with support that grows your independence.",
    intro:
      "We help you find a place to call your own and build a support team around your goals, health needs and the way you like to live. Everyday independence becomes something you can count on.",
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
    image: "/images/transition-care.webp",
    imageAlt: "A clinician planning a hospital discharge with a couple at their kitchen table",
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
    image: "/images/hero-care.webp",
    imageAlt: "An older woman sharing tea and laughter with a support worker at home",
    title: "Disability accommodation",
    category: "Home & living",
    blurb: "Fully supported stays while you wait for a long-term home, or while carers rest.",
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
    image: "/images/nurse-visit.webp",
    imageAlt: "A nurse sitting beside a man in a wheelchair in his living room",
    title: "Clinical care at home",
    category: "Clinical care",
    blurb: "Nursing and medical guidance available around the clock, where you live.",
    intro:
      "Health questions do not keep office hours. Our clinical team monitors your progress, answers urgent medical concerns and arranges treatment quickly, so small issues never get the chance to become big ones.",
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
    image: "/images/community-activity.webp",
    imageAlt: "A man in a wheelchair shopping for fresh produce with his support worker",
    title: "Community access",
    category: "Community",
    blurb: "Support to get out and about: appointments, errands, friends and local life.",
    intro:
      "Whether it is getting to an appointment, running errands or catching up with people who matter to you, we provide the practical support that keeps you connected in and around your community.",
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
  {
    slug: "daily-living-support",
    image: "/Requested-Images/home.jpeg",
    imageAlt: "A support worker helping someone with daily living tasks comfortably at home",
    title: "Daily living & personal care",
    category: "Home & living",
    blurb: "Practical, respectful support with the everyday tasks that make independence possible.",
    intro:
      "Good daily living support removes the barriers between you and the life you want. We provide consistent, skilled assistance with personal care, household tasks and everyday routines — on your schedule and on your terms.",
    benefits: [
      "Stay independent in the home you love",
      "Consistent support from familiar, trusted faces",
      "Routines shaped to your preferences and goals",
    ],
    helps: [
      "Personal care including showering, grooming and dressing",
      "Meal preparation and household tasks",
      "Medication prompting and health routines",
      "Shopping, errands and community outings",
    ],
  },
  {
    slug: "support-coordination",
    image: "/images/team.webp",
    imageAlt: "A support coordinator reviewing an NDIS plan with a participant and their family",
    title: "Support coordination",
    category: "Planning",
    blurb: "Expert guidance to get the most from your NDIS plan and connect the right supports.",
    intro:
      "Your NDIS plan is a powerful tool — but navigating it takes knowledge and time. We work alongside you to understand your funding, connect the right providers and make sure your plan keeps pace with your life and goals.",
    benefits: [
      "Understand your plan and how to use your funding",
      "Connect with the right providers and services",
      "Prepare for plan reviews with confidence",
    ],
    helps: [
      "Understanding NDIS funding categories and budgets",
      "Finding and setting up the right service providers",
      "Crisis support and resolving service gaps",
      "Preparing for and attending NDIS plan reviews",
    ],
  },
  {
    slug: "behaviour-support",
    image: "/images/nurse-visit.webp",
    imageAlt: "A behaviour support practitioner meeting with a participant in a calm home setting",
    title: "Positive behaviour support",
    category: "Clinical care",
    blurb: "Evidence-based strategies that reduce distress and build quality of life.",
    intro:
      "We work with registered behaviour support practitioners to develop personalised strategies that address the reasons behind behaviour, reduce restrictive practices and strengthen everyday wellbeing for participants and their support network.",
    benefits: [
      "Reduce distress and challenging situations",
      "Improve communication and daily routines",
      "Build a safer, calmer home environment",
    ],
    helps: [
      "Functional behaviour assessments",
      "Personalised behaviour support plans",
      "Training for support workers and families",
      "Review and monitoring as strategies progress",
    ],
  },
];

export const SERVICE_CATEGORIES: { name: string; slugs: string[] }[] = [
  { name: "Home & living", slugs: ["supported-independent-living", "disability-accommodation", "daily-living-support"] },
  { name: "Clinical care", slugs: ["clinical-care-at-home", "hospital-and-aged-care-transitions", "behaviour-support"] },
  { name: "Community", slugs: ["community-access"] },
  { name: "Planning", slugs: ["support-coordination"] },
];

export const STATS: { value: string; label: string }[] = [
  { value: "24/7", label: "Nursing and medical guidance, every day of the year" },
  { value: "60+", label: "Years of combined clinical experience behind your care" },
  { value: "1:1", label: "Support ratios built around your individual plan" },
  { value: "100%", label: "Focus on the goals that matter most to you" },
];

export const DIFFERENCE: { title: string; text: string }[] = [
  {
    title: "Doctor led clinical care",
    text: "Our support is guided by experienced doctors and nurses, so your health is managed proactively and nothing important slips through.",
  },
  {
    title: "Live how and where you choose",
    text: "From the home you live in to the team who supports you, the decisions stay yours. We match support to your life, not the other way around.",
  },
  {
    title: "Complex care specialists",
    text: "We are known for supporting people with high-intensity needs and for planning safe, well coordinated hospital transitions.",
  },
  {
    title: "Transparent and collaborative",
    text: "Families, coordinators and health professionals stay informed and involved. Clear communication is part of the service, not an extra.",
  },
];

export const WHOM_WE_HELP: string[] = [
  "Spinal cord injury",
  "Acquired brain injury",
  "Intellectual disability",
  "Developmental disorders",
  "Psychosocial disability",
  "Early onset dementia",
  "Neurological conditions",
  "Complex behaviours of concern",
  "Mental health conditions",
  "Physical disability",
  "Autism spectrum disorder",
  "Youth & young adults",
];

export const HIGH_INTENSITY: string[] = [
  "Complex bowel care",
  "Enteral (PEG) feeding",
  "Tracheostomy support",
  "Urinary catheter care",
  "Subcutaneous injections",
  "Complex wound management",
];

export const TESTIMONIALS: { quote: string; name: string; role: string }[] = [
  {
    quote:
      "The team treated my brother like family from day one. Knowing a nurse is only ever a phone call away has changed how our whole household sleeps at night.",
    name: "Margaret",
    role: "Sister of a participant",
  },
  {
    quote:
      "After my hospital stay I thought a nursing home was my only option. Instead, I came home. They planned everything and my support workers still turn up with a smile.",
    name: "David",
    role: "Participant",
  },
  {
    quote:
      "As a support coordinator I have worked with many providers. The difference here is the clinical depth. Referrals are handled properly and families are kept in the loop.",
    name: "Priya",
    role: "Support coordinator",
  },
  {
    quote:
      "I can finally take a proper break knowing my son is in safe hands. When I came back he had learned two new recipes and made a new friend next door.",
    name: "Elaine",
    role: "Parent and carer",
  },
  {
    quote:
      "They did not just find me a house, they helped me make it a home. I choose my meals, my outings and my routines. It sounds simple, but it means everything.",
    name: "Josh",
    role: "Participant",
  },
  {
    quote:
      "The communication is outstanding. Every question gets a straight answer, usually the same day. That kind of honesty is rare in this industry.",
    name: "Robert",
    role: "Family member",
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Are you a registered NDIS provider?",
    a: "Yes. We meet the NDIS Practice Standards and our supports can be included in NDIS plans, including Agency-managed, plan-managed and self-managed participants.",
  },
  {
    q: "Can you really support complex medical needs at home?",
    a: "Yes. Nursing and medical guidance sits behind every plan. Our team is experienced with high-intensity supports such as tracheostomy care, enteral feeding, catheter management and complex wound care.",
  },
  {
    q: "How quickly can support begin?",
    a: "It depends on your situation, but we move quickly. After an initial conversation we complete an assessment, match your team and agree a start date. Urgent hospital transitions are prioritised.",
  },
  {
    q: "Do you help with planning a hospital discharge?",
    a: "Yes. We work directly with hospitals, allied health and families to plan equipment, home set-up and staffing before the day you leave, then monitor progress once you are home.",
  },
  {
    q: "Do you offer support coordination?",
    a: "Yes. Our support coordinators help you understand your NDIS plan, connect with the right providers and prepare for plan reviews. We make sure your funding works as hard as possible for your goals.",
  },
  {
    q: "Which areas do you cover?",
    a: "We support people across Greater Sydney and surrounding regions. If you are a little further out, contact us anyway and we will tell you honestly what we can arrange.",
  },
  {
    q: "How do we get started?",
    a: "Call, email or send an enquiry. We start with a relaxed conversation about your goals and needs, then walk you through the options, costs and next steps with no pressure.",
  },
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
