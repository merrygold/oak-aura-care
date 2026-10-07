import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Home, Users, Heart, MapPin } from "lucide-react";
import { buttonVariants } from "@/lib/data";
import { CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "SIL vacancy enquiries",
  description:
    "Talk with Oak & Aura Care about current Supported Independent Living options and finding the right home match.",
  openGraph: {
    title: "SIL vacancy enquiries | Oak & Aura Care",
    description: "Explore supported living around your needs, routines and preferred way of life.",
  },
};

const WHAT_SIL_MEANS = [
  {
    icon: Home,
    title: "Your own home",
    text: "SIL participants live in a home they choose — not a facility. The home is furnished, accessible and set up around your needs.",
  },
  {
    icon: Users,
    title: "Support built around you",
    text: "A dedicated support team works shifts around your schedule. Some homes have shared support, others are individual — we match the model to you.",
  },
  {
    icon: Heart,
    title: "Choices that stay yours",
    text: "Meals, routines, visitors, how you spend your day — these decisions remain yours. Support is there to help, not to decide.",
  },
  {
    icon: MapPin,
    title: "Located where life happens",
    text: "Our SIL homes are in liveable suburbs with transport, services and community connection close by.",
  },
];

const CONSIDERATIONS = [
  {
    title: "The person",
    text: "Your routines, communication style, support needs and what makes home feel right to you.",
  },
  {
    title: "The household",
    text: "Compatibility with housemates (where shared), shared spaces, location and the rhythm of everyday life.",
  },
  {
    title: "The support",
    text: "Staffing ratios, access arrangements, transport needs and how support can flex as your needs change over time.",
  },
];

const PROCESS = [
  ["Have a conversation", "Tell us about the person, their goals, current situation and what they are looking for in a home."],
  ["Assessment & matching", "We complete a needs assessment and look at current or upcoming homes that could be a good fit."],
  ["Home visit", "The participant and their support network visit the home, meet potential housemates and ask questions."],
  ["Transition planning", "We plan the move, set up services and supports, and ensure a smooth, well-paced transition."],
];

export default function VacanciesPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">SIL vacancies</p>
          <h1 className="mt-4 max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-6xl">
            A good home match starts with a good conversation.
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-7 text-muted-foreground">
            Supported Independent Living should feel safe, comfortable and compatible with the way
            you want to live. Contact us to talk through current availability and what a good
            match looks like for you.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className={`${buttonVariants.primary} py-2 h-11 rounded-full px-5`} href="/contact">
              Ask about current options
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="glass-panel overflow-hidden rounded-[28px] p-3">
            <Image
              src="/Requested-Images/VacanciesHome.jpeg"
              alt="Exterior of a modern accessible Australian home with ramp access and tidy garden"
              width={1200}
              height={900}
              priority
              className="aspect-[4/3] w-full rounded-[20px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* What SIL means */}
      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="mb-9" data-reveal>
          <p className="eyebrow">What SIL looks like</p>
          <h2 className="mt-2 max-w-2xl font-heading text-3xl font-bold sm:text-4xl">
            A home that supports independence, not dependence.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            Supported Independent Living is funded through the NDIS and provides shared or
            individual support in a home setting. Here is what that means in practice.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {WHAT_SIL_MEANS.map((item, i) => (
            <div
              key={item.title}
              data-reveal
              data-reveal-delay={(i % 2) * 90}
              className="glass-panel rounded-[22px] p-7"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/25">
                <item.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story split — home photo */}
      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="glass-panel overflow-hidden rounded-[26px]">
          <div className="grid md:grid-cols-2">
            <Image
              src="/Requested-Images/VacanciesLounge.jpeg"
              alt="Modern accessible lounge room designed for supported independent living"
              width={1200}
              height={1008}
              className="h-full min-h-80 w-full object-cover"
            />
            <div className="p-8 sm:p-10">
              <p className="eyebrow">What we consider</p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight">
                A match built on more than availability.
              </h2>
              <div className="mt-6 grid gap-5">
                {CONSIDERATIONS.map((c) => (
                  <div key={c.title}>
                    <h3 className="font-heading text-base font-bold">{c.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="mb-9" data-reveal>
          <p className="eyebrow">How it works</p>
          <h2 className="mt-2 font-heading text-3xl font-bold">From first call to first day home.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map(([title, text], i) => (
            <div key={title} data-reveal data-reveal-delay={(i % 4) * 80} className="glass-panel rounded-[22px] p-7">
              <span className="font-heading text-3xl font-extrabold text-primary/25">0{i + 1}</span>
              <h3 className="mt-3 font-heading text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Info note */}
      <section className="mx-auto max-w-[1600px] px-6 pb-6">
        <div className="rounded-[22px] border border-accent/30 bg-accent/10 p-6">
          <p className="font-heading font-bold">Current vacancy details are confirmed directly by our team.</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            SIL availability changes regularly. Contact us for an up-to-date conversation about
            what suits your participant right now rather than relying on a listing.
          </p>
        </div>
      </section>

      <CtaSection
        heading="Tell us what a good home looks like."
        text="We'll talk through current options, compatibility and next steps — with no pressure and no out-of-date listings."
      />
    </>
  );
}
