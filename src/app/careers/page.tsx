import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, BookOpen, Users, Shield, Clock, Star } from "lucide-react";
import { buttonVariants } from "@/lib/data";
import { CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: { absolute: "Careers at Oak & Aura Care" },
  description:
    "Build a meaningful care career with a team focused on dignity, consistency and individual choice.",
  openGraph: {
    title: "Careers at Oak & Aura Care",
    description:
      "Join a purpose-led team supporting people to live with greater choice and confidence.",
  },
};

const BENEFITS = [
  {
    icon: Heart,
    title: "Meaningful every day",
    text: "You will see the difference your support makes — in someone's confidence, routine and sense of home.",
  },
  {
    icon: BookOpen,
    title: "Training that counts",
    text: "Paid clinical and disability training, ongoing supervision and a clear path to build your skills over time.",
  },
  {
    icon: Users,
    title: "A real team behind you",
    text: "Nurses, coordinators and experienced workers are always reachable — you are never the only one responsible.",
  },
  {
    icon: Shield,
    title: "Safe environments",
    text: "Thorough onboarding, risk planning and open conversations about what to do when things are uncertain.",
  },
  {
    icon: Clock,
    title: "Flexible hours",
    text: "We offer a range of shifts and arrangements so support work can fit around your life and commitments.",
  },
  {
    icon: Star,
    title: "Cultural inclusion",
    text: "We actively recruit people from diverse backgrounds because culture and language matter to the people we support.",
  },
];

const ROLES = [
  {
    title: "Support worker",
    description:
      "Assist participants with daily living, personal care, community access and household tasks. This is the heart of what we do.",
    requirements: ["Certificate III or IV in Individual Support (or working towards)", "Current NDIS Worker Screening Check", "Driver licence (preferred)"],
  },
  {
    title: "Community nurse",
    description:
      "Provide clinical oversight, complex care and nursing support in participants' homes and shared living settings.",
    requirements: ["Registered or enrolled nurse (AHPRA)", "Community or disability nursing experience preferred", "Current driver licence"],
  },
  {
    title: "Support coordinator",
    description:
      "Help participants understand their NDIS plans, connect with providers and navigate changes as their goals evolve.",
    requirements: ["Experience in disability, social work or community services", "Knowledge of the NDIS and funding categories", "Strong communication and problem-solving skills"],
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">Careers</p>
          <h1 className="mt-4 max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-6xl">
            Bring your skill. Keep your humanity.
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-7 text-muted-foreground">
            We welcome thoughtful, dependable people who want to support individuals, families and
            carers with respect, consistency and genuine care.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className={`${buttonVariants.primary} py-2 h-11 rounded-full px-5`} href="/contact">
              Express your interest
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="glass-panel overflow-hidden rounded-[28px] p-3">
            <Image
              src="/images/team.webp"
              alt="The Oak and Aura Care team of nurses and support workers together"
              width={1200}
              height={900}
              priority
              className="aspect-[4/3] w-full rounded-[20px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why join us */}
      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="mb-9" data-reveal>
          <p className="eyebrow">Why join us</p>
          <h2 className="mt-2 max-w-2xl font-heading text-3xl font-bold sm:text-4xl">
            More than a job. A place to grow.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            Oak &amp; Aura Care is built on the belief that great support workers deserve great
            support themselves. Here is what that looks like in practice.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              data-reveal
              data-reveal-delay={(i % 3) * 80}
              className="glass-panel rounded-[22px] p-7"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/25">
                <b.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold">{b.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="mb-9" data-reveal>
          <p className="eyebrow">Current role types</p>
          <h2 className="mt-2 font-heading text-3xl font-bold">
            Where you might fit in.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            We are regularly looking for people across these roles. Contact us to find out what is
            currently available and whether your experience is a good match.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {ROLES.map((role, i) => (
            <div
              key={role.title}
              data-reveal
              data-reveal-delay={i * 80}
              className="glass-panel rounded-[22px] p-7"
            >
              <h3 className="font-heading text-xl font-bold capitalize">{role.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{role.description}</p>
              <ul className="mt-5 grid gap-2">
                {role.requirements.map((req) => (
                  <li key={req} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                    <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                      <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Story split */}
      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="glass-panel overflow-hidden rounded-[26px]">
          <div className="grid md:grid-cols-2">
            <Image
              src="/images/nurse-visit.webp"
              alt="A support worker talking warmly with a participant at home"
              width={1200}
              height={1008}
              className="h-full min-h-80 w-full object-cover"
            />
            <div className="p-8 sm:p-10">
              <p className="eyebrow">Before you apply</p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight">
                Care work carries real responsibility.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Every person we support relies on their team. We look for candidates who are
                reliable, thoughtful about professional boundaries and genuinely motivated by the
                work — not just the hours.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Requirements vary by role and include relevant experience or qualifications, NDIS
                Worker Screening Check, and a driver licence for community-based roles. All new
                staff complete a comprehensive onboarding and induction program before working
                unsupervised.
              </p>
              <Link
                className={`${buttonVariants.primary} mt-6 h-9 rounded-full px-4 py-2`}
                href="/contact"
              >
                Send your details
                <ArrowRight aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Interested in joining Oak & Aura Care?"
        text="Send your details and tell us what kind of work you're looking for. We'll share current opportunities and next steps."
      />
    </>
  );
}
