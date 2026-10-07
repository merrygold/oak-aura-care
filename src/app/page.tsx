import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SERVICES, buttonVariants } from "@/lib/data";

const FEATURED = [
  "supported-independent-living",
  "hospital-and-aged-care-transitions",
  "disability-accommodation",
  "clinical-care-at-home",
  "community-access",
];

export default function Home() {
  const featured = FEATURED.map((slug) => SERVICES.find((s) => s.slug === slug)!);

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
          className="absolute inset-0 -z-10 bg-gradient-to-b from-foreground/75 via-foreground/45 to-foreground/80"
          aria-hidden="true"
        />
        <div className="mx-auto flex min-h-[78vh] max-w-[1600px] flex-col items-start justify-center px-6 py-24 text-background">
          <p className="reveal mb-4 inline-flex items-center gap-2 rounded-full border border-background/30 bg-background/10 px-3 py-1 text-xs font-bold uppercase text-background backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-leaf" />
            Registered NDIS provider
          </p>
          <h1 className="reveal font-heading text-5xl font-extrabold leading-[1.02] drop-shadow-sm sm:text-6xl md:text-7xl">
            Connecting hearts,
            <br />
            changing lives.
          </h1>
          <p className="reveal mt-5 max-w-md text-base leading-7 text-background/85">
            Oak &amp; Aura supports people across disability, aged care and daily living—warm,
            practical, and always centred on the person.
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

      <div className="mx-auto max-w-[1600px] px-6">
        <div className="glass-panel rounded-[22px] px-6 py-5 text-sm font-medium leading-6 text-muted-foreground">
          <strong className="text-foreground">Oak &amp; Aura Care</strong> works with individuals and
          families to shape respectful support around personal goals, preferences and everyday life.
        </div>
      </div>

      <section className="mx-auto max-w-[1600px] px-6 py-16">
        <div className="mb-9 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Find your support</p>
            <h2 className="mt-2 max-w-2xl font-heading text-3xl font-bold sm:text-4xl">
              Everything here, where you’d expect to find it.
            </h2>
          </div>
          <Link className="hidden text-sm font-bold text-primary md:inline" href="/services">
            See all supports →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((service) => (
            <Link
              key={service.slug}
              className="glass-panel group rounded-[22px] p-6 transition-transform hover:-translate-y-1"
              href={`/services/${service.slug}`}
            >
              <p className="eyebrow text-leaf">{service.category}</p>
              <h3 className="mt-3 font-heading text-xl font-bold">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
                Read more
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="glass-panel overflow-hidden rounded-[26px]">
          <div className="grid md:grid-cols-2">
            <Image
              src="/images/transition-care.jpg"
              alt="A family and support coordinator discussing a hospital transition plan"
              width={1200}
              height={1008}
              className="h-full min-h-80 w-full object-cover"
            />
            <div className="p-8 sm:p-10">
              <p className="eyebrow">Hospital to home</p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight">
                A clearer path through a complex transition.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                When someone leaves hospital or residential care, we help connect the decisions,
                people and practical supports around their move home.
              </p>
              <Link
                className={`${buttonVariants.primary} h-9 px-4 py-2 mt-6 rounded-full`}
                href="/transitions"
              >
                Explore transition support
                <ArrowRight aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <p className="eyebrow">How we work</p>
        <h2 className="mt-2 font-heading text-3xl font-bold">Four calm steps, shaped around you.</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Listen", "We start with your priorities and the people who know you best."],
            ["02", "Plan", "Together, we turn goals into clear and practical support."],
            ["03", "Connect", "We match the right people and services around your life."],
            ["04", "Adapt", "Support changes with you, through regular conversation."],
          ].map(([num, title, text]) => (
            <div key={num} className="glass-panel rounded-[20px] p-6">
              <span className="font-heading text-3xl font-extrabold text-primary/25">{num}</span>
              <h3 className="mt-3 font-heading font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="glass-panel overflow-hidden rounded-[26px]">
          <div className="grid md:grid-cols-2">
            <Image
              src="/images/daily-living.jpg"
              alt="A participant preparing breakfast with a support worker"
              width={1200}
              height={1008}
              className="h-full min-h-80 w-full object-cover"
            />
            <div className="p-8 sm:p-10">
              <p className="eyebrow">What good support feels like</p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight">
                Beside you—not taking over.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Our role is to make room for your choices, build on your strengths and support the
                everyday moments that lead to greater confidence.
              </p>
              <Link
                className={`${buttonVariants.outline} h-9 px-4 py-2 mt-6 rounded-full`}
                href="/about"
              >
                Our approach
                <ArrowRight aria-hidden />
              </Link>
            </div>
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
          <Link className={`${buttonVariants.accent} h-9 px-4 py-2 shrink-0 rounded-full`} href="/vacancies">
            Explore SIL enquiries
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-12">
        <div className="glass-panel rounded-[28px] p-8 text-center sm:p-12">
          <h2 className="mx-auto max-w-2xl font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
            Start a conversation that goes somewhere.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            Tell us what matters to you. A member of our team will help you understand the next
            step.
          </p>
          <div className="mt-7">
            <Link className={`${buttonVariants.primary} py-2 h-11 rounded-full px-5`} href="/contact">
              Start a conversation
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
