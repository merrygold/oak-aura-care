import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/lib/data";
import { CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Community activities",
  description:
    "Community activities shaped around interests, connection, confidence and everyday goals.",
  openGraph: {
    title: "Community activities | Oak & Aura Care",
    description: "Meaningful ways to connect, learn and take part in your community.",
  },
};

const ACTIVITIES = [
  {
    title: "Create",
    text: "Arts, crafts, music, cooking and hands-on projects that build expression and practical skills.",
    examples: ["Painting & drawing", "Music and rhythm", "Cooking & baking", "Pottery and craft"],
  },
  {
    title: "Move",
    text: "Gentle recreation, outdoor time and active interests suited to every ability level.",
    examples: ["Walks & nature outings", "Bowling & sports", "Hydrotherapy", "Dance & movement"],
  },
  {
    title: "Connect",
    text: "Social groups, shared experiences and community events that build friendship and belonging.",
    examples: ["Group lunches", "Cultural events", "Markets & festivals", "Social clubs"],
  },
  {
    title: "Learn",
    text: "Everyday life skills, digital confidence and trying something entirely new.",
    examples: ["Money and budgeting", "Technology skills", "Transport training", "Cooking classes"],
  },
];

const WHY_ACTIVITIES = [
  ["More than fun", "Activities build skills, habits and relationships that carry into everyday life — not just a calendar filler."],
  ["Starting small is fine", "We help participants find a comfortable entry point. You do not have to be confident to begin."],
  ["Consistent support", "You work with familiar support workers who know your preferences, communication style and goals."],
  ["Community that sticks", "We look for activities with regular groups so participants build ongoing connections, not one-off experiences."],
  ["Flexible and personal", "Programs are shaped around interests, not the other way around. If it matters to you, it matters to us."],
  ["NDIS-aligned", "Activities are funded under Capacity Building and Core Support budgets and can be included in most plans."],
];

export default function ActivitiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">Our activities</p>
          <h1 className="mt-4 max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-6xl">
            More ways to take part, and feel part of something.
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-7 text-muted-foreground">
            Community participation starts with your interests. We support you to discover
            activities, build confidence and form connections that continue well beyond the program.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className={`${buttonVariants.primary} py-2 h-11 rounded-full px-5`} href="/contact">
              Ask what's coming up
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="glass-panel overflow-hidden rounded-[28px] p-3">
            <Image
              src="/Requested-Images/ActivitiesHero.jpeg"
              alt="Participants and support workers engaged in a joyful group craft activity"
              width={1200}
              height={900}
              priority
              className="aspect-[4/3] w-full rounded-[20px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Activity types */}
      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="mb-9" data-reveal>
          <p className="eyebrow">Choose your kind of day</p>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            Activities built around what you enjoy.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            Every activity area has options from gentle and social to active and skill-building.
            We help you find the right starting point.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIVITIES.map((a, i) => (
            <div key={a.title} data-reveal data-reveal-delay={(i % 4) * 80} className="glass-panel rounded-[22px] p-6">
              <h2 className="font-heading text-2xl font-extrabold text-primary">{a.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{a.text}</p>
              <ul className="mt-5 grid gap-1.5">
                {a.examples.map((ex) => (
                  <li key={ex} className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Activities shown are representative. Contact the team for the current program and availability in your area.
        </p>
      </section>

      {/* Story split */}
      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="glass-panel overflow-hidden rounded-[26px]">
          <div className="grid md:grid-cols-2">
            <Image
              src="/Requested-Images/community.jpeg"
              alt="A participant and support worker laughing together at a community market"
              width={1200}
              height={1008}
              className="h-full min-h-80 w-full object-cover"
            />
            <div className="p-8 sm:p-10">
              <p className="eyebrow">How we do it</p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight">
                Support that gets out of the way.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Good activity support is present when you need it and invisible when you don't.
                We train our workers to encourage independence, manage participation respectfully
                and fade back once confidence is built.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                We also work with participants to identify activities that connect to longer-term
                goals — building friendships, growing skills, increasing community presence — so
                every outing has meaning beyond the activity itself.
              </p>
              <Link
                className={`${buttonVariants.primary} mt-6 h-9 rounded-full px-4 py-2`}
                href="/contact"
              >
                Start a conversation
                <ArrowRight aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why activities matter */}
      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="mb-9" data-reveal>
          <p className="eyebrow">Why it matters</p>
          <h2 className="mt-2 font-heading text-3xl font-bold">
            More than getting out of the house.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_ACTIVITIES.map(([title, text], i) => (
            <div
              key={title}
              data-reveal
              data-reveal-delay={(i % 3) * 80}
              className="glass-panel rounded-[22px] p-7"
            >
              <h3 className="font-heading text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who can take part */}
      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="glass-panel rounded-[26px] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div data-reveal>
              <p className="eyebrow">Who can take part</p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight">
                Open to all participants with community support in their plan.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Activities are available to Oak &amp; Aura participants with Core Support or
                Capacity Building funding for community access. We also work with participants
                who want to gradually build their activity hours or try something new before
                committing to a regular schedule.
              </p>
              <Link
                className={`${buttonVariants.outline} mt-6 h-10 rounded-full px-5`}
                href="/contact"
              >
                Ask a question
                <ArrowRight aria-hidden />
              </Link>
            </div>
            <div data-reveal data-reveal-delay="120" className="grid gap-4 content-start">
              {[
                ["Your goals come first", "We plan activities that connect to what matters to you — socially, practically and personally."],
                ["No prior experience needed", "Whether it is your first community outing or your hundredth, we meet you where you are."],
                ["Carers welcome", "Family members and carers can observe or participate in early sessions where appropriate."],
              ].map(([t, d]) => (
                <div key={t as string} className="rounded-[18px] border border-border/70 p-5">
                  <p className="font-heading text-sm font-bold">{t}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        heading="What would you like to try?"
        text="Tell us about your interests, comfort level and goals. We'll help find a good next step."
      />
    </>
  );
}
