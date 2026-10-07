import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  FAQS,
  SERVICE_CATEGORIES,
  SERVICES,
  WHOM_WE_HELP,
  buttonVariants,
} from "@/lib/data";
import { CtaSection } from "@/components/sections";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Disability & care services",
  description:
    "Explore personalised support for daily living, wellbeing, independence and community participation.",
  openGraph: {
    title: "Disability & care services | Oak & Aura Care",
    description: "Explore support built around your life, goals and choices.",
  },
};

function ServiceCard({ slug }: { slug: string }) {
  const service = SERVICES.find((s) => s.slug === slug)!;
  return (
    <div className="glass-panel group flex flex-col overflow-hidden rounded-[22px] transition-transform hover:-translate-y-1">
      <Link href={`/services/${service.slug}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col p-7 pb-4">
          <p className="eyebrow text-leaf">{service.category}</p>
          <h2 className="mt-3 font-heading text-2xl font-bold">{service.title}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.blurb}</p>
        </div>
      </Link>
      <div className="flex gap-2 px-7 pb-6 pt-1">
        <Link
          href={`/referral?service=${service.slug}`}
          className={`${buttonVariants.primary} h-9 rounded-full px-4 text-xs`}
        >
          Request
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
        <Link
          href={`/services/${service.slug}`}
          className={`${buttonVariants.outline} h-9 rounded-full px-4 text-xs`}
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="eyebrow">Our services</p>
          <h1 className="mt-4 max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-6xl">
            The right support should fit the life you want.
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-7 text-muted-foreground">
            Explore practical, person-centred support designed to strengthen choice, confidence and
            connection.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className={`${buttonVariants.primary} py-2 h-11 rounded-full px-5`} href="/contact">
              Talk through your options
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {SERVICE_CATEGORIES.map((category) => (
        <section key={category.name} className="mx-auto max-w-[1600px] px-6 py-10">
          <p className="eyebrow">{category.name}</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {category.slugs.map((slug) => (
              <ServiceCard key={slug} slug={slug} />
            ))}
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="glass-panel rounded-[26px] p-8 sm:p-10">
          <div className="max-w-2xl" data-reveal>
            <p className="eyebrow">Who we support</p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight">
              Whatever the need, the plan starts with you.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              We support people with a wide range of needs, from everyday assistance through to
              high-intensity clinical care. If your situation is not listed, ask us.
            </p>
          </div>
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
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Common questions</p>
            <h2 className="mt-2 font-heading text-3xl font-bold">Good to know.</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Everything families usually ask us before getting started.
            </p>
            <Link
              className={`${buttonVariants.outline} mt-6 h-10 rounded-full px-5`}
              href="/contact"
            >
              Ask your own question
              <ArrowRight aria-hidden />
            </Link>
          </div>
          <div className="lg:col-span-8" data-reveal data-reveal-delay="120">
            <FaqAccordion items={FAQS} />
          </div>
        </div>
      </section>

      <CtaSection
        heading="Let’s talk about the right support for you."
        text="Tell us what matters to you. A member of our team will help you understand the next step."
      />
    </>
  );
}
