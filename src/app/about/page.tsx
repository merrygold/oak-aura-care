import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Eye, Target, Ear, ShieldCheck, UserCheck, Globe } from "lucide-react";
import { buttonVariants, HIGH_INTENSITY, STATS, WHOM_WE_HELP } from "@/lib/data";
import { CtaSection, StatsBand, StorySection } from "@/components/sections";

export const metadata: Metadata = {
  title: { absolute: "About Oak & Aura Care" },
  description:
    "Meet a care team committed to consistency, cultural respect, clear communication and person-centred support.",
  openGraph: {
    title: "About Oak & Aura Care",
    description: "Care built on dignity, choice, consistency and genuine partnership.",
  },
};

const VALUES = [
  { icon: Ear, title: "Listen first", text: "Good support begins with understanding what matters to you — not what is easiest to provide." },
  { icon: ShieldCheck, title: "Protect choice", text: "You remain at the centre of every decision about your life, your home and your routines." },
  { icon: UserCheck, title: "Build trust", text: "Consistent people and clear communication create the confidence to live more independently." },
  { icon: Globe, title: "See the whole person", text: "Culture, relationships, emotional wellbeing and personal goals all belong in the plan." },
];

const WHAT_TO_EXPECT = [
  ["Continuity of workers", "We work hard to maintain consistent teams so you are supported by people who know you, your preferences and your routines."],
  ["Honest, plain-language updates", "We explain what is happening and why. Families and coordinators are kept informed without needing to chase."],
  ["Flexible as life changes", "Support is reviewed and adjusted as goals evolve, health changes or new opportunities arise. Nothing is locked in forever."],
  ["Holistic view of wellbeing", "Physical health, emotional wellbeing, social connection and cultural life all matter. We look at the whole picture, not just a task list."],
  ["Rapid response to concerns", "If something is not working, we address it quickly. You should never feel like a complaint will go unheard."],
  ["Clinical backing at every level", "A nurse or clinician is reachable behind every plan — so small health issues are caught before they become bigger ones."],
];

const ETHOS = [
  {
    icon: Target,
    title: "Our purpose",
    text: "To be a provider families recommend without hesitation, known for clinical depth and genuine human warmth in equal measure.",
  },
  {
    icon: Eye,
    title: "Our vision",
    text: "A community where every person, whatever their needs, lives in a home they love with support they trust.",
  },
  {
    icon: Compass,
    title: "Our mission",
    text: "To enhance the quality of life of every person in our care by putting them at the centre of everything we do.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">About us</p>
          <h1 className="mt-4 max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-6xl">
            Care with purpose, and room for your personality.
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-7 text-muted-foreground">
            Oak &amp; Aura Care supports people across disability, aged care and youth services. We
            partner with individuals and families to create support that feels respectful, useful
            and genuinely personal.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className={`${buttonVariants.primary} py-2 h-11 rounded-full px-5`} href="/contact">
              Meet our approach
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="glass-panel overflow-hidden rounded-[28px] p-3">
            <Image
              src="/Requested-Images/AboutHero.jpeg"
              alt="An older woman sharing a warm moment with a support worker in a sunny garden"
              width={1200}
              height={900}
              priority
              className="aspect-[4/3] w-full rounded-[20px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="glass-panel grid gap-10 rounded-[26px] p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight">
              Built by clinicians who saw the gap.
            </h2>
          </div>
          <div className="grid gap-4 text-sm leading-7 text-muted-foreground">
            <p>
              Oak &amp; Aura began with a simple observation. People with complex health needs were
              too often choosing between a hospital bed and support that was not equipped to keep
              them safe at home.
            </p>
            <p>
              We were founded to close that gap. Doctors, nurses and support workers work as one
              team, so disability support comes with real clinical backing and families can stop
              worrying about what might happen overnight.
            </p>
            <p>
              Today we support people in their own homes, in shared living and out in the
              community, always with the same promise: you are the focus of everything we do.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          {ETHOS.map((item, i) => (
            <div key={item.title} data-reveal data-reveal-delay={i * 90} className="glass-panel rounded-[22px] p-7">
              <span className="grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/25">
                <item.icon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-heading text-xl font-bold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div data-reveal>
          <StorySection
            image="/Requested-Images/team.jpeg"
            imageAlt="The Oak and Aura team of nurses, doctors and support workers standing together"
            eyebrow="Our people"
            heading="One team, from the clinic to the kitchen table."
            paragraphs={[
              "Behind every plan is a mixed team: doctors and nurses who watch over the clinical detail, and support workers who show up day after day and become familiar faces.",
              "We hire for warmth first, then train for skill. Every team member completes clinical and disability training, screening checks and ongoing supervision, so the person in your home is always someone you can trust.",
            ]}
            ctaHref="/careers"
            ctaLabel="Join our team"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="mb-9" data-reveal>
          <p className="eyebrow">Our values in practice</p>
          <h2 className="mt-2 font-heading text-3xl font-bold">What we stand for, in action.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              data-reveal
              data-reveal-delay={(i % 2) * 90}
              className="glass-panel rounded-[22px] p-7"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/25">
                <v.icon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-heading text-xl font-bold">{v.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="glass-panel grid gap-10 rounded-[26px] p-8 sm:p-10 lg:grid-cols-2">
          <div data-reveal>
            <p className="eyebrow">Who we support</p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight">
              A wide range of needs, one standard of care.
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {WHOM_WE_HELP.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div data-reveal data-reveal-delay="120">
            <p className="eyebrow">High intensity supports</p>
            <h2 className="mt-3 font-heading text-2xl font-bold">
              Trained, qualified and clinically supervised.
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {HIGH_INTENSITY.map((item) => (
                <p key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                    <svg
                      className="size-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      aria-hidden
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div data-reveal>
        <StatsBand stats={STATS} />
      </div>

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="mb-9" data-reveal>
          <p className="eyebrow">What you can expect</p>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            Steady support. Honest conversations.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            We set out to be a provider that families and coordinators can trust completely. Here
            is what that commitment looks like day to day.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_TO_EXPECT.map(([title, text], i) => (
            <div
              key={title as string}
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

      <CtaSection
        heading="Let’s talk about the right support for you."
        text="Tell us what matters to you. A member of our team will help you understand the next step."
      />
    </>
  );
}
