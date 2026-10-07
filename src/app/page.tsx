import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Stethoscope, Home as HomeIcon, HeartPulse, MessagesSquare } from "lucide-react";
import {
  DIFFERENCE,
  FAQS,
  PUNCHLINE,
  SERVICES,
  STATS,
  TESTIMONIALS,
  WHOM_WE_HELP,
  HIGH_INTENSITY,
  buttonVariants,
} from "@/lib/data";
import {
  CtaSection,
  LocationStrip,
  StatsBand,
  StorySection,
  TestimonialGrid,
} from "@/components/sections";
import { FaqAccordion } from "@/components/FaqAccordion";

const DIFFERENCE_ICONS = [Stethoscope, HomeIcon, HeartPulse, MessagesSquare] as const;

const LOCATIONS = [
  { name: "Greater Sydney", detail: "In-home support, SIL homes and community access across metropolitan Sydney." },
  { name: "Surrounding regions", detail: "Regular outreach through nearby regional communities, planned around you." },
  { name: "Hospitals statewide", detail: "Transition planning with hospital teams across NSW before your discharge." },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <video
          className="absolute inset-0 -z-20 size-full object-cover"
          src="/videos/hero-loop.mp4"
          poster="/images/hero-video-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-foreground/55 via-foreground/28 to-foreground/60"
          aria-hidden="true"
        />
        <div className="mx-auto flex min-h-[82vh] max-w-[1600px] flex-col items-start justify-center px-6 py-24 text-background">
          <p className="reveal mb-4 inline-flex items-center gap-2 rounded-full border border-background/30 bg-background/10 px-3 py-1 text-xs font-bold uppercase text-background backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-leaf" />
            Registered NDIS provider
          </p>
          <h1 className="reveal font-heading text-5xl font-extrabold leading-[1.02] drop-shadow-sm sm:text-6xl md:text-7xl">
            {PUNCHLINE.split(",")[0]},
            <br />
            {PUNCHLINE.split(",")[1].trim().replace(/\.$/, "")}.
          </h1>
          <p className="reveal mt-5 max-w-md text-base leading-7 text-background/85">
            Oak &amp; Aura supports people across disability, aged care and daily living with
            doctor guided care, warm support workers and plans built around one person: you.
          </p>
          <div className="reveal mt-7 flex flex-wrap gap-3">
            <Link
              className={`${buttonVariants.primary} py-2 h-11 rounded-full px-5`}
              href="/services"
            >
              Explore services
              <ArrowRight aria-hidden />
            </Link>
            <Link
              className={`${buttonVariants.outline} py-2 h-11 rounded-full px-5 !border-background/40 !text-background hover:!bg-background/15`}
              href="/contact"
            >
              Book a chat
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1600px] px-6 pt-10">
        <div className="glass-panel rounded-[22px] px-6 py-5 text-sm font-medium leading-6 text-muted-foreground">
          <strong className="text-foreground">Oak &amp; Aura Care</strong> works with individuals
          and families to shape respectful support around personal goals, preferences and everyday
          life.
        </div>
      </div>

      <div className="pt-12" data-reveal>
        <StatsBand stats={STATS} />
      </div>

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="mb-9 flex items-end justify-between gap-6" data-reveal>
          <div>
            <p className="eyebrow">How we help</p>
            <h2 className="mt-2 max-w-2xl font-heading text-3xl font-bold sm:text-4xl">
              Personalised support, from daily living to complex care.
            </h2>
          </div>
          <Link className="hidden text-sm font-bold text-primary md:inline" href="/services">
            See all supports →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Link
              key={service.slug}
              data-reveal
              data-reveal-delay={(i % 3) * 80}
              className="glass-panel group flex flex-col overflow-hidden rounded-[22px] transition-transform hover:-translate-y-1"
              href={`/services/${service.slug}`}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow text-leaf">{service.category}</p>
                <h3 className="mt-3 font-heading text-xl font-bold">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  {service.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
                  Read more
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          ))}
          <div
            data-reveal
            data-reveal-delay="160"
            className="flex flex-col justify-between rounded-[22px] bg-primary p-6 text-primary-foreground"
          >
            <div>
              <h3 className="font-heading text-xl font-bold">Not sure where to start?</h3>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/85">
                Tell us about your situation and we will point you to the right support, even if
                that is not us.
              </p>
            </div>
            <Link
              className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary-foreground px-5 text-sm font-bold text-primary transition-colors hover:bg-primary-foreground/90"
              href="/contact"
            >
              Ask a question
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="mb-9 max-w-2xl" data-reveal>
          <p className="eyebrow">The Oak &amp; Aura difference</p>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            What makes care here feel different.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENCE.map((item, i) => {
            const Icon = DIFFERENCE_ICONS[i % DIFFERENCE_ICONS.length];
            return (
              <div
                key={item.title}
                data-reveal
                data-reveal-delay={(i % 4) * 80}
                className="glass-panel rounded-[22px] p-7"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/25">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div data-reveal>
        <StorySection
          image="/images/story-margaret.webp"
          imageAlt="Margaret baking together with her granddaughter at home"
          eyebrow="From hospital to home"
          heading="Margaret came home six weeks after her injury. Her plan, her pace."
          paragraphs={[
            "When Margaret left rehabilitation, she needed tracheostomy care, wound management and a team who could respond at any hour. Hospitals told her a clinical facility was the only option.",
            "Instead, we planned every detail with her family and hospital team, set up her home, and matched support workers who knew her routine. Today she cooks lunch on Sundays and her grandchildren visit on weekends.",
          ]}
          ctaHref="/transitions"
          ctaLabel="Explore transition support"
        />
      </div>

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="glass-panel grid gap-10 rounded-[26px] p-8 sm:p-10 lg:grid-cols-2">
          <div data-reveal>
            <p className="eyebrow">Who we support</p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight">
              Experience where it counts.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Our team supports people with a wide range of needs and backgrounds. Whatever your
              situation, the starting point is the same: listening to what a good life looks like
              for you.
            </p>
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
          <div data-reveal data-reveal-delay="120" className="rounded-[22px] border border-border/70 p-7">
            <p className="eyebrow">High intensity supports</p>
            <h3 className="mt-3 font-heading text-xl font-bold">
              Clinical care, delivered at home.
            </h3>
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

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">In their words</p>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            Families who feel the difference every day.
          </h2>
        </div>
        <TestimonialGrid testimonials={TESTIMONIALS} />
      </section>

      <div data-reveal>
        <LocationStrip regions={LOCATIONS} />
      </div>

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Common questions</p>
            <h2 className="mt-2 font-heading text-3xl font-bold">Answers, before you even ask.</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Still unsure about something? A quick call with our team will clear it up, with no
              obligation.
            </p>
            <Link
              className={`${buttonVariants.outline} mt-6 h-10 rounded-full px-5`}
              href="/contact"
            >
              Ask us anything
              <ArrowRight aria-hidden />
            </Link>
          </div>
          <div className="lg:col-span-8" data-reveal data-reveal-delay="120">
            <FaqAccordion items={FAQS} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-6">
        <div className="glass-panel flex flex-col gap-6 rounded-[24px] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">SIL vacancies</p>
            <h2 className="mt-2 max-w-xl font-heading text-2xl font-bold">
              Looking for the right supported living arrangement?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Speak with our team about current options and what a good home match looks like for
              you.
            </p>
          </div>
          <Link
            className={`${buttonVariants.accent} h-9 shrink-0 rounded-full px-4 py-2`}
            href="/vacancies"
          >
            Explore SIL enquiries
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </section>

      <CtaSection
        heading="Start a conversation that goes somewhere."
        text="Tell us what matters to you. A member of our team will help you understand the next step."
      />
    </>
  );
}
