import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/lib/data";
import { CtaSection } from "@/components/sections";

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
  ["Listen first", "Good support begins with understanding what matters to you."],
  ["Protect choice", "You remain at the centre of every decision about your life."],
  ["Build trust", "Consistent people and clear communication create confidence."],
  ["See the whole person", "Culture, relationships, wellbeing and goals all belong in the plan."],
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">About us</p>
          <h1 className="mt-4 max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-6xl">
            Care with purpose—and room for your personality.
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
              src="/images/hero-care.jpg"
              alt="An older woman enjoying a relaxed conversation with a care worker"
              width={1200}
              height={900}
              priority
              className="aspect-[4/3] w-full rounded-[20px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-12">
        <p className="eyebrow">Our values in practice</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {VALUES.map(([title, text]) => (
            <div key={title} className="glass-panel rounded-[22px] p-7">
              <h2 className="font-heading text-xl font-bold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-8 px-6 py-12 md:grid-cols-2">
        <div>
          <p className="eyebrow">What you can expect</p>
          <h2 className="mt-3 font-heading text-3xl font-bold">
            Steady support. Honest conversations.
          </h2>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          We aim for continuity wherever possible, respond when needs change and explain the next
          step in plain language. Our work considers physical, emotional, social and cultural
          wellbeing—not just a list of tasks.
        </p>
      </section>

      <CtaSection
        heading="Let’s talk about the right support for you."
        text="Tell us what matters to you. A member of our team will help you understand the next step."
      />
    </>
  );
}
